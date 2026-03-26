import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = `🌀 Antigravity Sync`;
    statusBarItem.tooltip = 'Synchroniser votre Brain avec le Cloud (PC/Mac)';
    statusBarItem.command = 'antigravitySync.menu';
    context.subscriptions.push(statusBarItem);
    statusBarItem.show();

    const syncCommand = vscode.commands.registerCommand('antigravitySync.menu', async () => {
        const options = [
            { label: '📤 Push to Cloud', description: 'Envoyer les modifications locales vers Git' },
            { label: '📥 Pull from Cloud', description: 'Récupérer les dernières évolutions du Brain' }
        ];
        
        const choice = await vscode.window.showQuickPick(options, { 
            placeHolder: '🌌 Antigravity Brain : Synchronisation' 
        });

        if (!choice) return;

        const antigravityPath = path.join(os.homedir(), '.gemini', 'antigravity');

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Antigravity ${choice.label}`,
            cancellable: false
        }, async (progress) => {
            return new Promise<void>((resolve) => {
                let cmd = "";
                if (choice.label.includes('Push')) {
                    progress.report({ message: "Indexation et envoi des souvenirs..." });
                    cmd = `cd "${antigravityPath}" && git add . && git commit -m "🌀 Brain Sync: [${new Date().toLocaleString()}]" && git push`;
                } else {
                    progress.report({ message: "Récupération de la conscience collective..." });
                    cmd = `cd "${antigravityPath}" && git pull --rebase`;
                }

                exec(cmd, (error, stdout, stderr) => {
                    if (error && !stdout.includes("nothing to commit")) {
                        vscode.window.showErrorMessage(`❌ Échec de la synchronisation : ${stderr || error.message}`);
                    } else {
                        vscode.window.showInformationMessage(`✅ Antigravity : ${choice.label} terminé avec succès.`);
                    }
                    resolve();
                });
            });
        });
    });

    context.subscriptions.push(syncCommand);
}

export function deactivate() {}
