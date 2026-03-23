import * as vscode from 'vscode';
import * as http from 'http';

let statusBarItem: vscode.StatusBarItem;
let intervalId: any;
let currentModels: any[] = [];
let allInstalledModels: string[] = [];

export function activate(context: vscode.ExtensionContext) {
    console.log('Antigravity Ollama Monitor is active!');

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'antigravity-ollama.mainMenu';
    context.subscriptions.push(statusBarItem);

    // Initial check
    checkOllama();
    updateInstalledModels();

    // Poll every 3 seconds
    intervalId = setInterval(() => {
        checkOllama();
        if (allInstalledModels.length === 0) updateInstalledModels();
    }, 3000);

    // Register Main Menu command
    let menuCommand = vscode.commands.registerCommand('antigravity-ollama.mainMenu', async () => {
        await updateInstalledModels(); // Refresh available models

        const items: vscode.QuickPickItem[] = [
            { label: '$(refresh) Refresh Status', description: 'Force update' }
        ];

        // Section: Active Models (Unload)
        if (currentModels.length > 0) {
            items.push({ label: 'ACTIVE MODELS', kind: vscode.QuickPickItemKind.Separator });
            currentModels.forEach(m => {
                items.push({ 
                    label: `$(trash) Unload ${m.name}`, 
                    description: 'Libérer la VRAM',
                    detail: `Memory usage: ${Math.round(m.size / 1024 / 1024 / 1024 * 100) / 100} GB`
                });
            });
        }

        // Section: Swap/Load Models
        items.push({ label: 'INSTALLED MODELS (SWAP)', kind: vscode.QuickPickItemKind.Separator });
        allInstalledModels.forEach(name => {
            const isActive = currentModels.some(m => m.name === name);
            items.push({ 
                label: `$(symbol-event) ${isActive ? '(Loaded) ' : ''}${name}`, 
                description: isActive ? 'Déjà chargé' : 'Cliquer pour charger en VRAM'
            });
        });

        const selection = await vscode.window.showQuickPick(items, {
            placeHolder: 'Antigravity: Ollama Operations'
        });

        if (selection) {
            if (selection.label.includes('Refresh')) {
                checkOllama();
            } else if (selection.label.includes('Unload')) {
                const modelToUnload = selection.label.split('Unload ')[1];
                unloadModel(modelToUnload);
            } else if (selection.label.includes('symbol-event')) {
                const modelToLoad = selection.label.split(') ')[1] || selection.label.split('event) ')[1];
                if (!selection.label.includes('(Loaded)')) {
                    loadModel(modelToLoad);
                }
            }
        }
    });

    context.subscriptions.push(menuCommand);
}

async function updateInstalledModels() {
    return new Promise((resolve) => {
        const req = http.get('http://127.0.0.1:11434/api/tags', (res) => {
            let data = '';
            res.on('data', (c) => data += c);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const parsed = JSON.parse(data);
                        allInstalledModels = parsed.models?.map((m: any) => m.name) || [];
                    } catch (e) {}
                }
                resolve(true);
            });
        });
        req.on('error', () => resolve(false));
    });
}

async function loadModel(modelName: string) {
    vscode.window.showInformationMessage(`Chargement de ${modelName} en VRAM...`);
    try {
        const req = http.request({
            hostname: '127.0.0.1',
            port: 11434,
            path: '/api/generate',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            res.on('data', () => {});
            res.on('end', () => {
                vscode.window.showInformationMessage(`${modelName} est maintenant prêt.`);
                setTimeout(checkOllama, 1500);
            });
        });

        // Sending an empty prompt with a keep_alive (5m) to force the load
        req.write(JSON.stringify({ 
            model: modelName, 
            prompt: '', 
            keep_alive: "5m" 
        }));
        req.end();
    } catch (err) {
        vscode.window.showErrorMessage('Erreur lors du chargement du modèle.');
    }
}

async function unloadModel(modelName: string) {
    vscode.window.showInformationMessage(`Unloading ${modelName} from VRAM...`);
    try {
        const req = http.request({
            hostname: '127.0.0.1',
            port: 11434,
            path: '/api/generate',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            res.on('data', () => {});
            res.on('end', () => {
                vscode.window.showInformationMessage(`${modelName} successfully unloaded.`);
                setTimeout(checkOllama, 1000);
            });
        });

        req.write(JSON.stringify({ 
            model: modelName, 
            prompt: '', 
            keep_alive: 0 
        }));
        req.end();
    } catch (err) {
        vscode.window.showErrorMessage('Error unloading model.');
    }
}

async function checkOllama() {
    try {
        const options = {
            hostname: '127.0.0.1',
            port: 11434,
            path: '/api/ps',
            method: 'GET',
            timeout: 1000
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const parsed = JSON.parse(data);
                    currentModels = parsed.models || [];
                    const working = currentModels.length > 0;
                    
                    if (working) {
                        const modelName = currentModels[0].name.split(':')[0].toUpperCase();
                        updateStatusBar('working', modelName, currentModels);
                    } else {
                        updateStatusBar('online');
                    }
                } else {
                    updateStatusBar('offline');
                }
            });
        });

        req.on('error', () => updateStatusBar('offline'));
        req.on('timeout', () => {
            req.destroy();
            updateStatusBar('offline');
        });
        req.end();
    } catch (err) {
        updateStatusBar('offline');
    }
}

function updateStatusBar(state: 'offline' | 'online' | 'working', modelName?: string, models?: any[]) {
    if (!statusBarItem) return;

    switch (state) {
        case 'working':
            statusBarItem.text = `$(pulse) OLLAMA: ${modelName}`;
            statusBarItem.color = '#06B6D4'; // Cyan
            statusBarItem.tooltip = `Modèles chargés:\n${models?.map(m => `- ${m.name}`).join('\n')}\n(Cliquez pour menu)`;
            break;
        case 'online':
            statusBarItem.text = `$(circle-filled) OLLAMA IDLE`;
            statusBarItem.color = '#10B981'; // Emerald
            statusBarItem.tooltip = 'Ollama est prêt (Aucun modèle chargé)';
            break;
        case 'offline':
            statusBarItem.text = `$(circle-outline) OLLAMA OFFLINE`;
            statusBarItem.color = '#EF4444'; // Red
            statusBarItem.tooltip = 'Ollama n\'est pas joignable sur http://localhost:11434';
            break;
    }
    statusBarItem.show();
}

export function deactivate() {
    if (intervalId) clearInterval(intervalId);
}
