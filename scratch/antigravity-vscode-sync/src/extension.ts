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

    // Status Bar Item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = `$(sync) Antigravity`;
    statusBarItem.tooltip = 'Connexion au Cloud...';
    statusBarItem.command = 'antigravity.syncMenu';
    context.subscriptions.push(statusBarItem, outputChannel);
    statusBarItem.show();

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
        } catch (error: any) {
            statusBarItem.text = `$(warning) Brain (Offline)`;
            statusBarItem.color = '#777777';
            statusBarItem.tooltip = `Erreur d'analyse: ${error.message}`;
        }
    };

    const performPush = async (currentBranch: string) => {
        if (isSyncing) return;
        isSyncing = true;
        const previousText = statusBarItem.text;
        const previousColor = statusBarItem.color;

        statusBarItem.text = `$(sync~spin) Archiving...`;
        statusBarItem.color = '#ffcc00';

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

export function deactivate() {}