import * as vscode from 'vscode';
import * as http from 'http';

// Interface for Ollama /api/ps response
interface OllamaPsResponse {
    models: {
        name: string;
        model: string;
        size: number;
        digest: string;
        details: any;
        expires_at: string;
        size_vram: number;
    }[];
}

// Interface for Ollama /api/tags response
interface OllamaTagsResponse {
    models: {
        name: string;
        model: string;
        size: number;
        details: any;
    }[];
}

interface LlmUsageStats {
    [modelName: string]: number; // Time in seconds
}

let statusBarItem: vscode.StatusBarItem;
let intervalId: NodeJS.Timeout | undefined;
const POLL_INTERVAL_MS = 10000; // Poll every 10 seconds

export function activate(context: vscode.ExtensionContext) {
    console.log('Antigravity LLM Tracker is now active!');

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'llm-usage-tracker.statusBarActions';
    context.subscriptions.push(statusBarItem);

    // Register commands
    let showCommand = vscode.commands.registerCommand('llm-usage-tracker.showDashboard', () => {
        showDashboard(context);
    });
    
    let resetCommand = vscode.commands.registerCommand('llm-usage-tracker.resetStats', () => {
        vscode.window.showWarningMessage('Reset all LLM usage statistics?', 'Yes', 'No').then((selection: string | undefined) => {
            if (selection === 'Yes') {
                context.globalState.update('llmUsageStats', {});
                context.globalState.update('llmUsageVram', {});
                updateStatusBar({}, "IDLE");
                vscode.window.showInformationMessage('LLM tracking statistics have been reset.');
            }
        });
    });

    let unloadAllCommand = vscode.commands.registerCommand('llm-usage-tracker.unloadAll', () => {
        unloadAllModels();
    });

    let actionsCommand = vscode.commands.registerCommand('llm-usage-tracker.statusBarActions', () => {
        showStatusBarActions(context);
    });

    context.subscriptions.push(showCommand, resetCommand, unloadAllCommand, actionsCommand);

    // Start polling Ollama
    intervalId = setInterval(() => {
        pollOllama(context);
    }, POLL_INTERVAL_MS);

    // Initial poll
    pollOllama(context);
}

async function fetchOllamaJson<T>(path: string): Promise<T | null> {
    return new Promise((resolve) => {
        const options = {
            hostname: '127.0.0.1',
            port: 11434,
            path: path,
            method: 'GET',
            timeout: 2000
        };

        const req = http.request(options, (res: http.IncomingMessage) => {
            let data = '';
            res.on('data', (chunk: any) => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        resolve(JSON.parse(data) as T);
                    } catch (e) {
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            });
        });

        req.on('error', () => resolve(null));
        req.on('timeout', () => {
            req.destroy();
            resolve(null);
        });
        req.end();
    });
}

async function pollOllama(context: vscode.ExtensionContext) {
    const psResponse = await fetchOllamaJson<OllamaPsResponse>('/api/ps');
    
    if (psResponse) {
        recordUsage(context, psResponse);
    } else {
        updateStatusBar(context.globalState.get('llmUsageStats') || {}, "Off");
    }
}

function recordUsage(context: vscode.ExtensionContext, response: OllamaPsResponse) {
    let stats: LlmUsageStats = context.globalState.get('llmUsageStats') || {};
    let vramMap: { [model: string]: number } = context.globalState.get('llmUsageVram') || {};
    
    let currentModelStr = "IDLE";
    
    if (response.models && response.models.length > 0) {
        response.models.forEach((model: any) => {
            if (!stats[model.name]) {
                stats[model.name] = 0;
            }
            stats[model.name] += (POLL_INTERVAL_MS / 1000);
            vramMap[model.name] = model.size_vram || 0;
        });
        
        currentModelStr = response.models[0].name.split(':')[0];
    }
    
    const totalVramBytes = response.models.reduce((acc: number, m: any) => acc + (m.size_vram || 0), 0);
    const vramStr = formatSize(totalVramBytes);
    
    context.globalState.update('llmUsageStats', stats);
    context.globalState.update('llmUsageVram', vramMap);
    updateStatusBar(stats, currentModelStr, vramStr);
}

function updateStatusBar(stats: LlmUsageStats, activeModel: string = "IDLE", currentVram: string = "0 GB") {
    let topModel = "";
    let maxTime = -1;
    
    for (const [name, time] of Object.entries(stats)) {
        if (time > maxTime) {
            maxTime = time;
            topModel = name;
        }
    }
    
    const topModelName = topModel ? topModel.split(':')[0] : "None";
    
    if (activeModel === "Off") {
        statusBarItem.text = `$(hubot) Ollama Offline`;
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    } else if (activeModel === "IDLE") {
        statusBarItem.text = `$(hubot) OLLAMA: IDLE | $(database) ${currentVram}`;
        statusBarItem.backgroundColor = undefined;
    } else {
        statusBarItem.text = `$(pulse) OLLAMA: ${activeModel.toUpperCase()} | $(database) ${currentVram} | $(trash)`;
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    }
    
    statusBarItem.show();
}

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

function formatSize(bytes: number): string {
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
}

async function unloadModel(modelName: string) {
    return new Promise((resolve) => {
        const body = JSON.stringify({ name: modelName, keep_alive: 0 });
        const options = {
            hostname: '127.0.0.1',
            port: 11434,
            path: '/api/generate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': body.length
            }
        };

        const req = http.request(options, (res: http.IncomingMessage) => {
            res.on('data', () => {});
            res.on('end', () => resolve(true));
        });

        req.on('error', () => resolve(false));
        req.write(body);
        req.end();
    });
}

async function unloadAllModels() {
    const ps = await fetchOllamaJson<OllamaPsResponse>('/api/ps');
    if (ps && ps.models) {
        for (const model of ps.models) {
            await unloadModel(model.name);
        }
        vscode.window.showInformationMessage('All models unloaded from VRAM.');
    }
}

async function showStatusBarActions(context: vscode.ExtensionContext) {
    const ps = await fetchOllamaJson<OllamaPsResponse>('/api/ps');
    const items: vscode.QuickPickItem[] = [
        { label: '$(dashboard) Show Dashboard', description: 'Open the visual usage tracker' },
        { label: '$(trash) Unload All Models', description: 'Clear VRAM' }
    ];

    if (ps && ps.models && ps.models.length > 0) {
        items.push({ label: '', kind: vscode.QuickPickItemKind.Separator });
        ps.models.forEach(m => {
            const size = formatSize(m.size_vram || 0);
            items.push({ 
                label: `$(close) Unload ${m.name}`, 
                description: `Using ${size}`,
                detail: m.name 
            });
        });
    }

    const selection = await vscode.window.showQuickPick(items, {
        placeHolder: 'Antigravity LLM Controller'
    });

    if (!selection) return;

    if (selection.label.includes('Show Dashboard')) {
        vscode.commands.executeCommand('llm-usage-tracker.showDashboard');
    } else if (selection.label.includes('Unload All')) {
        await unloadAllModels();
    } else if (selection.detail) {
        await unloadModel(selection.detail);
        vscode.window.showInformationMessage(`Unloaded ${selection.detail}`);
    }
}

async function showDashboard(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
        'llmUsageDashboard',
        '🛸 Antigravity Dashboard',
        vscode.ViewColumn.One,
        { enableScripts: true, retainContextWhenHidden: true }
    );

    const updateWebview = async () => {
        const stats: LlmUsageStats = context.globalState.get('llmUsageStats') || {};
        const vramMap: { [model: string]: number } = context.globalState.get('llmUsageVram') || {};
        const tags = await fetchOllamaJson<OllamaTagsResponse>('/api/tags');
        const ps = await fetchOllamaJson<OllamaPsResponse>('/api/ps');
        
        const sortedStats = Object.entries(stats).sort((a, b) => b[1] - a[1]);
        let totalSeconds = 0;
        let maxSeconds = sortedStats.length > 0 ? sortedStats[0][1] : 1;
        
        const loadedModels = new Set(ps?.models.map((m: any) => m.name) || []);
        
        let localRowsHtml = '';
        sortedStats.forEach(([model, time], index) => {
            totalSeconds += time;
            const vram = vramMap[model] || 0;
            const isLoaded = loadedModels.has(model);
            const percentage = Math.max(2, Math.round((time / maxSeconds) * 100));
            
            localRowsHtml += `
                <div class="chart-row ${isLoaded ? 'loaded' : ''}">
                    <div class="model-info">
                        <div class="model-name">
                            #${index + 1} ${model}
                            ${isLoaded ? '<span class="status-badge active">LOADED</span>' : ''}
                        </div>
                        <div class="header-version">ANTIGRAVITY CORE v1.1.0</div>
                        <div class="model-meta">Last VRAM: ${formatSize(vram)}</div>
                    </div>
                    <div class="bar-container">
                        <div class="bar local-bar" style="width: ${percentage}%;"></div>
                        <span class="bar-label">${formatTime(time)}</span>
                    </div>
                    <div class="actions">
                        ${isLoaded ? `<button class="btn-unload" onclick="unload('${model}')">Unload</button>` : ''}
                    </div>
                </div>
            `;
        });

        let libraryHtml = '';
        if (tags?.models) {
            tags.models.forEach((m: any) => {
                const isLoaded = loadedModels.has(m.name);
                libraryHtml += `
                    <div class="lib-item">
                        <div class="lib-header">
                            <span class="lib-name">${m.name}</span>
                            <span class="lib-size">${formatSize(m.size)}</span>
                        </div>
                        <div class="lib-footer">
                            <span class="status-dot ${isLoaded ? 'dot-active' : ''}"></span>
                            ${isLoaded ? 'Active in VRAM' : 'Installed'}
                        </div>
                    </div>
                `;
            });
        }

        const totalVramBytes = ps?.models.reduce((acc, m) => acc + (m.size_vram || 0), 0) || 0;
        const vramLimitBytes = 24 * 1024 * 1024 * 1024; // 24GB RTX 4090
        const vramPercentage = Math.min(100, Math.round((totalVramBytes / vramLimitBytes) * 100));

        panel.webview.html = getWebviewContent(localRowsHtml, libraryHtml, formatTime(totalSeconds), formatSize(totalVramBytes), vramPercentage);
    };

    panel.webview.onDidReceiveMessage(async (message: any) => {
        if (message.command === 'unload') {
            await unloadModel(message.model);
            updateWebview();
        } else if (message.command === 'refresh') {
            updateWebview();
        }
    });

    updateWebview();
}

function getWebviewContent(rowsHtml: string, libraryHtml: string, totalTime: string, currentVram: string, vramPercentage: number) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                :root {
                    --bg: #0d1117;
                    --card-bg: rgba(22, 27, 34, 0.7);
                    --accent: #238636;
                    --accent-glow: rgba(35, 134, 54, 0.3);
                    --text: #e6edf3;
                    --text-muted: #8b949e;
                    --border: 1px solid rgba(48, 54, 61, 0.8);
                    --error: #da3633;
                }
                
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    background-color: var(--bg);
                    color: var(--text);
                    padding: 40px;
                    line-height: 1.5;
                    margin: 0;
                }

                .container { max-width: 900px; margin: 0 auto; }

                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40px;
                    animation: fadeInDown 0.8s ease-out;
                }

                h1 {
                    font-size: 28px;
                    font-weight: 700;
                    background: linear-gradient(135deg, #fff 0%, #8b949e 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -1px;
                }

                .summary-card {
                    background: var(--card-bg);
                    backdrop-filter: blur(10px);
                    border: var(--border);
                    padding: 24px;
                    border-radius: 16px;
                    margin-bottom: 40px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                    position: relative;
                    overflow: hidden;
                }
                .summary-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; width: 4px; height: 100%;
                    background: var(--accent);
                }

                h2 {
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: var(--text-muted);
                    margin-top: 40px;
                    margin-bottom: 20px;
                }

                .chart-row {
                    display: flex;
                    align-items: center;
                    background: var(--card-bg);
                    padding: 16px 24px;
                    border-radius: 12px;
                    margin-bottom: 12px;
                    border: var(--border);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .chart-row:hover {
                    transform: translateX(8px);
                    border-color: rgba(56, 139, 253, 0.4);
                    background: rgba(48, 54, 61, 0.4);
                }
                .chart-row.loaded {
                    border-color: var(--accent);
                    background: rgba(35, 134, 54, 0.05);
                    box-shadow: 0 0 20px var(--accent-glow);
                }

                .model-info { width: 300px; }
                .model-name { font-weight: 600; font-size: 15px; display: flex; align-items: center; gap: 8px; }
                .model-meta { font-size: 12px; color: var(--text-muted); margin-top: 4px; }

                .bar-container {
                    flex-grow: 1;
                    height: 8px;
                    background: #161b22;
                    border-radius: 4px;
                    margin: 0 30px;
                    position: relative;
                    overflow: hidden;
                }
                .bar {
                    height: 100%;
                    background: linear-gradient(90deg, #238636 0%, #2ea043 100%);
                    box-shadow: 0 0 10px rgba(46, 160, 67, 0.4);
                    border-radius: 4px;
                    transition: width 1.5s cubic-bezier(0.19, 1, 0.22, 1);
                }
                .bar-label {
                    position: absolute;
                    top: -20px;
                    right: 0;
                    font-size: 11px;
                    font-weight: 600;
                    color: var(--text-muted);
                }

                .vram-capacity {
                    height: 12px;
                    background: #161b22;
                    border-radius: 6px;
                    margin-top: 15px;
                    overflow: hidden;
                    position: relative;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .vram-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #388bfd 0%, #238636 100%);
                    transition: width 1s ease-in-out;
                }
                .vram-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                    color: var(--text-muted);
                    margin-top: 6px;
                    font-weight: 600;
                }

                .status-badge {
                    font-size: 10px;
                    font-weight: 800;
                    padding: 2px 8px;
                    border-radius: 40px;
                    background: var(--accent);
                    color: white;
                    text-transform: uppercase;
                }

                .btn-unload {
                    background: transparent;
                    color: #f85149;
                    border: 1px solid rgba(248, 81, 73, 0.4);
                    padding: 6px 14px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                .btn-unload:hover {
                    background: #f85149;
                    color: white;
                }

                .grid-library {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    gap: 20px;
                }
                .lib-item {
                    background: var(--card-bg);
                    padding: 20px;
                    border-radius: 12px;
                    border: var(--border);
                    transition: border 0.2s;
                    position: relative;
                }
                .lib-item:hover { border-color: rgba(139, 148, 158, 0.5); }
                .lib-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
                .lib-name { font-weight: 700; font-size: 14px; }
                .lib-size { font-size: 12px; color: var(--text-muted); }
                
                .status-dot { width: 10px; height: 10px; border-radius: 50%; background: #30363d; margin-right: 10px; }
                .dot-active { background: #238636; box-shadow: 0 0 8px var(--accent); animation: pulse 2s infinite; }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .refresh-btn {
                    padding: 8px 16px;
                    background: #21262d;
                    border: var(--border);
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .refresh-btn:hover { background: #30363d; }
            </style>
        </head>
        <body>
            <div class="container">
                <header>
                    <h1>ANTIGRAVITY COMMAND</h1>
                    <div class="refresh-btn" onclick="refresh()">REBOOT SYNC</div>
                </header>

                <div class="summary-card">
                    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 8px;">TOTAL LOCAL UPTIME</div>
                    <div style="font-size: 36px; font-weight: 800; letter-spacing: -1px;">${totalTime}</div>
                    
                    <div style="margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px;">
                        <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 1px;">VRAM USAGE (24GB TOTAL)</div>
                        <div class="vram-capacity">
                            <div class="vram-fill" style="width: ${vramPercentage}%;"></div>
                        </div>
                        <div class="vram-label">
                            <span>${currentVram} USED</span>
                            <span>${vramPercentage}%</span>
                        </div>
                    </div>
                </div>

                <h2>SYSTEM STATUS / LIVE VRAM</h2>
                <div class="leaderboard">
                    ${rowsHtml}
                </div>

                <h2>REPO ASSETS / LIBRARY</h2>
                <div class="grid-library">
                    ${libraryHtml}
                </div>

                <footer style="margin-top: 80px; padding: 40px 0; border-top: var(--border); opacity: 0.4; font-size: 11px; text-align: center; letter-spacing: 1px;">
                    ANTIGRAVITY CORE v1.0.2 — OLLAMA FIRST PROTOCOL ACTIVE
                </footer>
            </div>

            <script>
                const vscode = acquireVsCodeApi();
                function unload(model) {
                    vscode.postMessage({ command: 'unload', model: model });
                }
                function refresh() {
                    vscode.postMessage({ command: 'refresh' });
                }
            </script>
        </body>
        </html>
    `;
}

export function deactivate() {
    if (intervalId) {
        clearInterval(intervalId);
    }
}
