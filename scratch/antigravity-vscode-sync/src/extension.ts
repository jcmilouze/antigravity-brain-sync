import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
    const antigravityPath = path.join(os.homedir(), '.gemini', 'antigravity');
    const machineName = os.hostname();
    
    // Status Bar Item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = `$(sync) Antigravity`;
    statusBarItem.tooltip = 'Analyse du Brain...';
    statusBarItem.command = 'antigravity.syncMenu';
    context.subscriptions.push(statusBarItem);
    statusBarItem.show();

    // Helper: Run Git command in brain directory
    const gitExec = async (cmd: string) => {
        return execAsync(`cd "${antigravityPath}" && ${cmd}`);
    };

    // Polling Logic
    const pollSyncStatus = async () => {
        try {
            // 0. Detect Current Branch
            const { stdout: branchRaw } = await gitExec(`git branch --show-current`);
            const currentBranch = branchRaw.trim() || 'main';

            // 1. Fetch remote but fail silently if no network
            try {
                await gitExec(`git fetch origin ${currentBranch}`);
            } catch (e) {}

            // 2. Check Local Changes (Dirty state)
            const { stdout: statusRaw } = await gitExec(`git status --porcelain`);
            const isDirty = statusRaw.trim().length > 0;

            // 3. Check Ahead/Behind counts with detected branch
            const { stdout: revRaw } = await gitExec(`git rev-list --left-right --count origin/${currentBranch}...${currentBranch}`);
            const counts = revRaw.trim().split(/\s+/).map(Number);
            const behind = counts[0] || 0;
            const ahead = counts[1] || 0;

            // 4. Update UI
            if (behind > 0) {
                statusBarItem.text = `$(cloud-download) Antigravity Behind (-${behind})`;
                statusBarItem.color = '#ff5555';
                statusBarItem.tooltip = `🚨 Le Cloud [${currentBranch}] est en avance.\nPull required.\n\nFichiers modifiés localement: ${isDirty ? 'OUI' : 'NON'}`;
            } else if (isDirty || ahead > 0) {
                statusBarItem.text = `$(cloud-upload) Antigravity Dirty (+${ahead})`;
                statusBarItem.color = '#ffcc00';
                statusBarItem.tooltip = `📤 Ton PC [${currentBranch}] a de nouveaux souvenirs.\nPush recommended.\n\nFichiers à commit: ${isDirty ? 'OUI' : 'NON'}`;
            } else {
                statusBarItem.text = `$(pass) Antigravity [${currentBranch}]`;
                statusBarItem.color = '#00ff88';
                statusBarItem.tooltip = `✅ Brain synchronisé sur [${currentBranch}].\nDernier check: ${new Date().toLocaleTimeString()}`;
            }

        } catch (error: any) {
            statusBarItem.text = `$(warning) Antigravity (Local Only)`;
            statusBarItem.color = '#777777';
            statusBarItem.tooltip = `Erreur lors de l'analyse: ${error.message}`;
        }
    };

    // Auto-poll every 5 minutes
    const pollTimer = setInterval(pollSyncStatus, 5 * 60 * 1000);
    context.subscriptions.push({ dispose: () => clearInterval(pollTimer) });
    pollSyncStatus();

    // Watcher: trigger poll if a file changes
    const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(antigravityPath, '+(skills|scripts)/**/*'));
    watcher.onDidChange(pollSyncStatus);
    watcher.onDidCreate(pollSyncStatus);
    watcher.onDidDelete(pollSyncStatus);
    context.subscriptions.push(watcher);

    // Command: Configure
    const configCommand = vscode.commands.registerCommand('antigravity.syncConfig', async () => {
        const url = await vscode.window.showInputBox({
            prompt: 'URL SSH/HTTPS du dépôt Git privé (Brain Sync)',
            placeHolder: 'git@github.com:user/repo.git'
        });

        if (url) {
            try {
                await gitExec(`(git remote set-url origin "${url}" || git remote add origin "${url}")`);
                vscode.window.showInformationMessage(`✅ Remote Cloud aligné : ${url}`);
                pollSyncStatus();
            } catch (e) {
                vscode.window.showErrorMessage(`❌ Échec : ${e}`);
            }
        }
    });

    // Command: Menu
    const menuCommand = vscode.commands.registerCommand('antigravity.syncMenu', async () => {
        const { stdout: branchRaw } = await gitExec(`git branch --show-current`);
        const currentBranch = branchRaw.trim() || 'main';

        const options: vscode.QuickPickItem[] = [
            { label: '📤 Archiver mes souvenirs (Push)', description: `Envoie sur [${currentBranch}]` },
            { label: '📥 Récupérer la conscience (Pull)', description: `Depuis [${currentBranch}] (Rebase)` },
            { label: '⚙️ Configuration Cloud', description: 'Changer de dépôt distant' },
            { label: '🔍 Check Status Now', description: 'Vérifier maintenant' }
        ];
        
        const choice = await vscode.window.showQuickPick(options, { placeHolder: '🌌 Antigravity Brain Control Center' });

        if (!choice) return;
        if (choice.label.includes('Check')) { pollSyncStatus(); return; }
        if (choice.label.includes('Config')) { vscode.commands.executeCommand('antigravity.syncConfig'); return; }

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Antigravity : ${choice.label}`,
            cancellable: false
        }, async (progress) => {
            try {
                if (choice.label.includes('Push')) {
                    progress.report({ message: "Écriture des synapses..." });
                    await gitExec(`git add . && git commit -m "🌀 Brain Sync [${machineName}]: ${new Date().toLocaleString()}" && git push origin ${currentBranch}`);
                } else {
                    progress.report({ message: "Inclusion des souvenirs distants..." });
                    await gitExec(`git pull --rebase origin ${currentBranch}`);
                }
                vscode.window.showInformationMessage(`✅ Antigravity Core : ${choice.label} terminé.`);
                pollSyncStatus();
            } catch (error: any) {
                if (error.stdout?.includes("nothing to commit")) {
                    vscode.window.showInformationMessage("ℹ️ Aucun changement détecté.");
                } else if (error.stderr?.includes("CONFLICT")) {
                    vscode.window.showErrorMessage("🚨 Conflits critiques ! Allez dans l'onglet Git.");
                } else {
                    vscode.window.showErrorMessage(`❌ Échec : ${error.stderr || error.message}`);
                }
            }
        });
    });

    context.subscriptions.push(configCommand, menuCommand);
}

export function deactivate() {}