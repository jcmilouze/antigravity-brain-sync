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
            const shortName = model.split(':')[0].toUpperCase();
            
            // Percentage logic: if active, show some "usage", else 100% (ready)
            const percentage = isLoaded ? 20 : 100; 
            const themeClass = isLoaded ? 'active-theme' : 'idle-theme';
            const statusText = isLoaded ? 'Active Session' : 'Not started';

            localRowsHtml += `
                <div class="stat-card ${themeClass}">
                    <div class="card-header">${shortName}</div>
                    <div class="card-percentage">${percentage}%</div>
                    <div class="segmented-bar">
                        <div class="segment ${percentage >= 20 ? 'filled' : ''}"></div>
                        <div class="segment ${percentage >= 40 ? 'filled' : ''}"></div>
                        <div class="segment ${percentage >= 60 ? 'filled' : ''}"></div>
                        <div class="segment ${percentage >= 80 ? 'filled' : ''}"></div>
                        <div class="segment ${percentage >= 100 ? 'filled' : ''}"></div>
                    </div>
                    <div class="card-time">${formatTime(time)}</div>
                    <div class="card-status">${statusText}</div>
                    ${isLoaded ? `<div class="vram-tag">${formatSize(vram)} VRAM</div>` : ''}
                </div>
            `;
        });

        const totalVramBytes = ps?.models.reduce((acc, m) => acc + (m.size_vram || 0), 0) || 0;
        const vramLimitBytes = 24 * 1024 * 1024 * 1024; // 24GB RTX 4090
        const vramPercentage = Math.min(100, Math.round((totalVramBytes / vramLimitBytes) * 100));

        panel.webview.html = getWebviewContent(localRowsHtml, formatTime(totalSeconds), formatSize(totalVramBytes), vramPercentage);
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

function getWebviewContent(cardsHtml: string, totalTime: string, currentVram: string, vramPercentage: number) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                :root {
                    --bg: #1a1b1e;
                    --card-bg: #25262b;
                    --cyan: #3bc9db;
                    --pink: #ff6b6b;
                    --text-main: #c1c2c5;
                    --text-dim: #909296;
                }
                body {
                    background-color: var(--bg);
                    color: var(--text-main);
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    margin: 0;
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }

                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    padding-bottom: 24px;
                }

                .logo-section {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .logo {
                    font-size: 16px;
                    font-weight: 900;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #fff;
                }

                .status-badge {
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    color: var(--cyan);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .status-badge::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    background: var(--cyan);
                    border-radius: 50%;
                    box-shadow: 0 0 10px var(--cyan);
                }

                nav {
                    display: flex;
                    gap: 32px;
                }

                nav span {
                    font-size: 12px;
                    font-weight: 700;
                    color: var(--text-dim);
                    cursor: pointer;
                    transition: color 0.3s;
                }

                nav span:hover, nav span.active {
                    color: #fff;
                }

                .vram-section {
                    background: var(--card-bg);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .vram-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .vram-label {
                    font-size: 11px;
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }

                .vram-val {
                    font-size: 11px;
                    font-weight: 700;
                    color: var(--text-dim);
                }

                .vram-track {
                    height: 6px;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .vram-fill {
                    height: 100%;
                    background: linear-gradient(90deg, var(--cyan), #22d3ee);
                    border-radius: 10px;
                    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 20px;
                }

                .stat-card {
                    position: relative;
                    background: var(--card-bg);
                    border-radius: 12px;
                    padding: 32px 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.03);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow: hidden;
                }

                .stat-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(255, 255, 255, 0.1);
                    background: #2c2d32;
                }

                .active-theme { border-bottom: 2px solid var(--cyan); }
                .idle-theme { border-bottom: 2px solid var(--pink); }

                .card-header {
                    font-size: 12px;
                    font-weight: 850;
                    letter-spacing: 1.5px;
                    color: #fff;
                    text-transform: uppercase;
                }

                .card-percentage {
                    font-size: 38px;
                    font-weight: 900;
                    letter-spacing: -2px;
                    color: #fff;
                    line-height: 1;
                }

                .segmented-bar {
                    display: flex;
                    gap: 4px;
                    margin: 4px 0;
                }

                .segment {
                    width: 22px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 2px;
                }

                .active-theme .segment.filled { background: var(--cyan); box-shadow: 0 0 10px rgba(59, 201, 219, 0.3); }
                .idle-theme .segment.filled { background: var(--pink); box-shadow: 0 0 10px rgba(255, 107, 107, 0.3); }

                .card-time {
                    font-size: 11px;
                    font-weight: 700;
                    color: var(--text-dim);
                }

                .card-status {
                    font-size: 10px;
                    font-weight: 800;
                    color: var(--text-dim);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .vram-tag {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    background: rgba(59, 201, 219, 0.1);
                    color: var(--cyan);
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 9px;
                    font-weight: 700;
                }

                .footer {
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                }

                .btn-sync {
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: var(--text-dim);
                    padding: 10px 24px;
                    border-radius: 8px;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .btn-sync:hover {
                    border-color: #fff;
                    color: #fff;
                }
            </style>
        </head>
        <body>
            <header>
                <div class="logo-section">
                    <div class="logo">Antigravity</div>
                    <div class="status-badge">CONNECTED</div>
                </div>
                <nav>
                    <span class="active">Dashboard</span>
                    <span>History</span>
                    <span>Models</span>
                </nav>
            </header>

            <section class="vram-section">
                <div class="vram-header">
                    <div class="vram-label">Global VRAM Load</div>
                    <div class="vram-val">${currentVram} / 24.0 GB</div>
                </div>
                <div class="vram-track">
                    <div class="vram-fill" style="width: ${vramPercentage}%"></div>
                </div>
            </section>

            <div class="grid">
                ${cardsHtml}
            </div>

            <div class="footer">
                <button class="btn-sync" onclick="refresh()">REBOOT SYNC</button>
            </div>

            <script>
                const vscode = acquireVsCodeApi();
                function unload(model) {
                    vscode.postMessage({ command: 'unload', model: model });
                }
                function refresh() {
                    vscode.postMessage({ command: 'refresh' });
                }
                setInterval(() => {
                    vscode.postMessage({ command: 'refresh' });
                }, 5000);
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
