import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export function activate(context: vscode.ExtensionContext) {
    const antigravityPath = path.join(os.homedir(), '.gemini', 'antigravity');
    const machineName = os.hostname();
    const outputChannel = vscode.window.createOutputChannel('Antigravity Sync');
    let isSyncing = false;

    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = `$(sync) Antigravity`;
    statusBarItem.tooltip = 'Connexion au Cloud...';
    statusBarItem.command = 'antigravity.syncMenu';
    context.subscriptions.push(statusBarItem, outputChannel);
    statusBarItem.show();

    // Sync Hub Provider
    const syncHubProvider = new SyncHubProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(SyncHubProvider.viewType, syncHubProvider)
    );

    // Command: Open Hub
    context.subscriptions.push(vscode.commands.registerCommand('antigravity.openSyncHub', () => {
        vscode.commands.executeCommand('workbench.view.extension.antigravity-sync-sidebar');
    }));

    // Helper: Run Git command safely and handle warnings/noise
    const gitExec = async (args: string[], useSSH: boolean = false) => {
        const env = { ...process.env };
        if (useSSH) {
            env.GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no";
        }
        
        outputChannel.appendLine(`[Git] > git ${args.join(' ')}`);
        
        try {
            const { stdout, stderr } = await execFileAsync('git', args, { cwd: antigravityPath, env });
            
            // Log everything for debugging
            if (stdout) outputChannel.appendLine(`[Stdout] ${stdout.trim()}`);
            if (stderr) {
                // Filter out common noise like LF/CRLF warnings
                const filteredStderr = stderr.split('\n')
                    .filter(line => !line.includes('LF will be replaced by CRLF') && line.trim().length > 0)
                    .join('\n');
                if (filteredStderr) outputChannel.appendLine(`[Stderr] ${filteredStderr.trim()}`);
            }
            
            return { stdout, stderr };
        } catch (error: any) {
            // Even on error, filter the noise in stderr for the UI
            if (error.stderr) {
                const filteredStderr = error.stderr.split('\n')
                    .filter((line: string) => !line.includes('LF will be replaced by CRLF') && line.trim().length > 0)
                    .join('\n');
                error.stderr = filteredStderr;
            }
            throw error;
        }
    };

    // Polling Logic
    const pollSyncStatus = async () => {
        if (isSyncing) return;
        try {
            const { stdout: branchRaw } = await gitExec(['branch', '--show-current']);
            const currentBranch = branchRaw.trim() || 'master';

            try { 
                await gitExec(['fetch', 'origin', currentBranch], true); 
            } catch (e: any) {
                if (e.stderr?.includes("Permission denied")) {
                    statusBarItem.text = `$(lock) Brain: Access Denied`;
                    statusBarItem.color = '#ff4444';
                    statusBarItem.tooltip = `🚨 Erreur SSH : Permission denied.\nGitHub refuse la clé publique.\nCliquez pour changer en HTTPS.`;
                    return;
                }
                // Other fetch errors might just mean offline
            }

            const { stdout: statusRaw } = await gitExec(['status', '--porcelain']);
            const isDirty = statusRaw.trim().length > 0;

            let behind = 0;
            let ahead = 0;
            let remoteExists = false;

            try {
                await gitExec(['show-ref', '--quiet', '--verify', `refs/remotes/origin/${currentBranch}`]);
                remoteExists = true;
                const { stdout: revRaw } = await gitExec(['rev-list', '--left-right', '--count', `origin/${currentBranch}...${currentBranch}`]);
                const counts = revRaw.trim().split(/\s+/).map(Number);
                behind = counts[0] || 0;
                ahead = counts[1] || 0;
            } catch (e) {
                remoteExists = false;
            }

            if (!remoteExists) {
                statusBarItem.text = `$(cloud) Brain: First Sync`;
                statusBarItem.color = '#7adcf0';
                statusBarItem.tooltip = `🔌 Prêt pour la première connexion à GitHub.\nBranche locale: [${currentBranch}]\nCliquez pour Push.`;
            } else if (behind > 0) {
                statusBarItem.text = `$(cloud-download) Brain Behind (-${behind})`;
                statusBarItem.color = '#ff5555';
                statusBarItem.tooltip = `🚨 Conscience distante [${currentBranch}] en avance.\nPull requis.`;
            } else if (isDirty || ahead > 0) {
                statusBarItem.text = `$(cloud-upload) Brain Dirty (+${ahead})`;
                statusBarItem.color = '#ffcc00';
                statusBarItem.tooltip = `📤 Nouveaux souvenirs sur [${currentBranch}] à archiver.\nPush recommandé.`;
                
                // Auto-Sync Logic
                const config = vscode.workspace.getConfiguration('antigravity');
                if (config.get('autoSync', false)) {
                    performPush(currentBranch);
                }
            } else {
                statusBarItem.text = `$(pass) Brain Synced`;
                statusBarItem.color = '#00ff88';
                statusBarItem.tooltip = `✅ Brain synchronisé sur [${currentBranch}].\nDernier check: ${new Date().toLocaleTimeString()}`;
            }
            
            syncHubProvider.updateState(statusBarItem.text, statusBarItem.color || '', statusBarItem.tooltip as string);
        } catch (error: any) {
            statusBarItem.text = `$(warning) Brain (Offline)`;
            statusBarItem.color = '#777777';
            statusBarItem.tooltip = `Erreur d'analyse: ${error.message}`;
            syncHubProvider.updateState(statusBarItem.text, statusBarItem.color, statusBarItem.tooltip);
        }
    };

    const performPush = async (currentBranch: string) => {
        if (isSyncing) return;
        isSyncing = true;
        const previousText = statusBarItem.text;
        const previousColor = statusBarItem.color;

        statusBarItem.text = `$(sync~spin) Archiving...`;
        statusBarItem.color = '#ffcc00';
        syncHubProvider.updateState(statusBarItem.text, statusBarItem.color, "Archivage en cours vers le Cloud...");

        try {
            const stamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            const commitMsg = `🌀 Brain Sync [${machineName}]: ${stamp}`;
            await gitExec(['add', '.']);
            
            // Check if there's actually something to commit to avoid error
            const { stdout: statusRaw } = await gitExec(['status', '--porcelain']);
            if (statusRaw.trim().length > 0) {
                await gitExec(['commit', '-m', commitMsg]);
                await gitExec(['push', '-u', 'origin', currentBranch], true);
                outputChannel.appendLine(`[Success] Auto-Archive completed: ${stamp}`);
            }
        } catch (error: any) {
            outputChannel.appendLine(`[Error] Push failed: ${error.stderr || error.message}`);
        } finally {
            isSyncing = false;
            pollSyncStatus();
        }
    };

    const pollTimer = setInterval(pollSyncStatus, 5 * 60 * 1000);
    context.subscriptions.push({ dispose: () => clearInterval(pollTimer) });
    pollSyncStatus();

    // Watching files with debounce
    let watchTimeout: NodeJS.Timeout | undefined;
    const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(antigravityPath, '+(skills|scripts|rules|knowledge|scratch|stats)/**/*'));
    const debouncedPoll = () => {
        if (watchTimeout) clearTimeout(watchTimeout);
        watchTimeout = setTimeout(() => pollSyncStatus(), 5000); // 5 sec debounce
    };

    watcher.onDidChange(debouncedPoll);
    watcher.onDidCreate(debouncedPoll);
    watcher.onDidDelete(debouncedPoll);
    context.subscriptions.push(watcher);

    // Command: Configure
    const configCommand = vscode.commands.registerCommand('antigravity.syncConfig', async () => {
        const url = await vscode.window.showInputBox({
            prompt: 'URL SSH/HTTPS du dépôt Git privé (Brain Sync)',
            placeHolder: 'git@github.com:user/repo.git'
        });

        if (url) {
            try {
                try {
                    await gitExec(['remote', 'set-url', 'origin', url]);
                } catch (e) {
                    await gitExec(['remote', 'add', 'origin', url]);
                }
                vscode.window.showInformationMessage(`✅ Remote Cloud configuré : ${url}`);
                pollSyncStatus();
            } catch (e) {
                vscode.window.showErrorMessage(`❌ Échec : ${e}`);
            }
        }
    });

    // Command: Menu
    const menuCommand = vscode.commands.registerCommand('antigravity.syncMenu', async () => {
        const { stdout: branchRaw } = await gitExec(['branch', '--show-current']);
        const currentBranch = branchRaw.trim() || 'master';
        const config = vscode.workspace.getConfiguration('antigravity');
        const isAutoSync = config.get('autoSync', false);

        const options: vscode.QuickPickItem[] = [
            { label: '📤 Archiver mes souvenirs (Push)', description: `Vers [${currentBranch}]` },
            { label: '📥 Récupérer la conscience (Pull)', description: `D'après [${currentBranch}]` },
            { label: isAutoSync ? '🔴 Désactiver Auto-Sync' : '🟢 Activer Auto-Sync', description: 'Mode Sentinelle' },
            { label: '⚙️ Configuration Cloud', description: 'Changer la destination' },
            { label: '📋 Voir les logs (Output)', description: 'Ouvrir le canal de sortie' },
            { label: '🔍 Check Status Now', description: 'Vérifier la connexion' }
        ];
        
        const choice = await vscode.window.showQuickPick(options, { placeHolder: `🌌 Antigravity Sync Hub [${currentBranch}]` });

        if (!choice) return;
        if (choice.label.includes('Check')) { pollSyncStatus(); return; }
        if (choice.label.includes('Config')) { vscode.commands.executeCommand('antigravity.syncConfig'); return; }
        if (choice.label.includes('logs')) { outputChannel.show(); return; }
        if (choice.label.includes('Auto-Sync')) {
            config.update('autoSync', !isAutoSync, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(`🔄 Mode Sentinelle : ${!isAutoSync ? 'ACTIVÉ' : 'DÉSACTIVÉ'}`);
            pollSyncStatus();
            return;
        }

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Sync [${currentBranch}]...`,
            cancellable: false
        }, async (progress) => {
            isSyncing = true;
            try {
                if (choice.label.includes('Push')) {
                    progress.report({ message: "Émission vers le Cloud..." });
                    await performPush(currentBranch);
                } else {
                    progress.report({ message: "Fusion neuronale..." });
                    await gitExec(['pull', '--rebase', 'origin', currentBranch], true);
                    vscode.window.showInformationMessage(`✅ Brain : Pull terminé.`);
                }
                pollSyncStatus();
            } catch (error: any) {
                if (error.stdout?.includes("nothing to commit")) {
                    vscode.window.showInformationMessage("ℹ️ Aucun changement.");
                } else if (error.stderr?.includes("CONFLICT")) {
                    vscode.window.showErrorMessage("🚨 Conflit détecté ! Résolution manuelle requise.");
                    outputChannel.show();
                } else if (error.stderr?.includes("Permission denied")) {
                    const btn = 'Passer en HTTPS';
                    const act = await vscode.window.showErrorMessage("🚨 Erreur SSH (Permission denied). Pourriez-vous passer par l'authentification HTTPS ?", btn);
                    if (act === btn) {
                        try {
                            const { stdout: remoteUrlRaw } = await gitExec(['remote', 'get-url', 'origin']);
                            const currentUrl = remoteUrlRaw.trim();
                            if (currentUrl.startsWith('git@github.com:')) {
                                const httpsUrl = currentUrl.replace('git@github.com:', 'https://github.com/').replace('.git', '');
                                await gitExec(['remote', 'set-url', 'origin', httpsUrl]);
                                vscode.window.showInformationMessage(`✅ Cloud basculé en HTTPS : ${httpsUrl}`);
                                pollSyncStatus();
                            } else {
                                vscode.commands.executeCommand('antigravity.syncConfig');
                            }
                        } catch (e) {
                            vscode.commands.executeCommand('antigravity.syncConfig');
                        }
                    }
                } else {
                    vscode.window.showErrorMessage(`❌ Échec : ${error.stderr || error.message}`);
                    outputChannel.show();
                }
            } finally {
                isSyncing = false;
            }
        });
    });

    context.subscriptions.push(configCommand, menuCommand);
}

class SyncHubProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'antigravity-sync-hub';
    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(webviewView: vscode.WebviewView) {
        this._view = webviewView;
        webviewView.webview.options = { enableScripts: true };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {
                case 'sync': vscode.commands.executeCommand('antigravity.syncMenu'); break;
                case 'config': vscode.commands.executeCommand('antigravity.syncConfig'); break;
            }
        });
    }

    public updateState(status: string, color: string, tooltip: string) {
        if (this._view) {
            this._view.webview.postMessage({ type: 'update', status, color, tooltip });
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        padding: 15px;
                        color: var(--vscode-foreground);
                        font-family: var(--vscode-font-family);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        background: transparent;
                        overflow-x: hidden;
                    }
                    .card {
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 12px;
                        padding: 20px;
                        width: 100%;
                        box-sizing: border-box;
                        backdrop-filter: blur(10px);
                        text-align: center;
                    }
                    .status-icon {
                        font-size: 42px;
                        margin-bottom: 12px;
                        display: block;
                        filter: drop-shadow(0 0 10px rgba(0, 242, 254, 0.5));
                        animation: pulse 3s infinite ease-in-out;
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 0.8; }
                        50% { transform: scale(1.05); opacity: 1; }
                        100% { transform: scale(1); opacity: 0.8; }
                    }
                    .status-text {
                        font-size: 1.1rem;
                        font-weight: 600;
                        margin-bottom: 6px;
                    }
                    .status-detail {
                        font-size: 0.8rem;
                        opacity: 0.6;
                        margin-bottom: 20px;
                        line-height: 1.4;
                        word-wrap: break-word;
                    }
                    button {
                        background: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 10px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                        width: 100%;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                    }
                    button:hover {
                        background: var(--vscode-button-hoverBackground);
                        transform: translateY(-1px);
                    }
                    button:active {
                        transform: translateY(0);
                    }
                    .secondary-btn {
                        background: transparent;
                        border: 1px solid var(--vscode-button-background);
                        color: var(--vscode-button-background);
                        margin-top: 10px;
                    }
                    .secondary-btn:hover {
                        background: rgba(255, 255, 255, 0.05);
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 0.65rem;
                        opacity: 0.3;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <div id="icon" class="status-icon">🌀</div>
                    <div id="status" class="status-text">Initialisation...</div>
                    <div id="tooltip" class="status-detail">Connexion au Brain...</div>
                    <button onclick="vscode.postMessage({type: 'sync'})">
                        <span>⚡</span> Synchroniser
                    </button>
                    <button class="secondary-btn" onclick="vscode.postMessage({type: 'config'})">
                        <span>⚙️</span> Configuration
                    </button>
                </div>
                <div class="footer">
                    Antigravity Brain Sync<br>
                    Engine v1.5.1
                </div>
                <script>
                    const vscode = acquireVsCodeApi();
                    window.addEventListener('message', event => {
                        const message = event.data;
                        if (message.type === 'update') {
                            const statusEl = document.getElementById('status');
                            const tooltipEl = document.getElementById('tooltip');
                            const iconEl = document.getElementById('icon');
                            
                            let text = message.status;
                            let icon = '🌀';
                            
                            if (text.includes('$(pass)')) {
                                icon = '✅';
                                text = text.replace('$(pass)', '').trim();
                                iconEl.style.filter = 'drop-shadow(0 0 10px rgba(0, 255, 136, 0.5))';
                            } else if (text.includes('$(cloud-download)')) {
                                icon = '📥';
                                text = text.replace('$(cloud-download)', '').trim();
                                iconEl.style.filter = 'drop-shadow(0 0 10px rgba(255, 85, 85, 0.5))';
                            } else if (text.includes('$(cloud-upload)')) {
                                icon = '📤';
                                text = text.replace('$(cloud-upload)', '').trim();
                                iconEl.style.filter = 'drop-shadow(0 0 10px rgba(255, 204, 0, 0.5))';
                            } else if (text.includes('$(warning)')) {
                                icon = '⚠️';
                                text = text.replace('$(warning)', '').trim();
                                iconEl.style.filter = 'drop-shadow(0 0 10px rgba(255, 68, 68, 0.5))';
                            } else if (text.includes('$(lock)')) {
                                icon = '🔒';
                                text = text.replace('$(lock)', '').trim();
                                iconEl.style.filter = 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))';
                            }
                            
                            statusEl.innerText = text;
                            tooltipEl.innerText = message.tooltip;
                            iconEl.innerText = icon;
                        }
                    });
                </script>
            </body>
            </html>`;
    }
}

export function deactivate() {}