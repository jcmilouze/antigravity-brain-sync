# Ollama Monitor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter un item status bar VS Code qui affiche l'état d'Ollama local (online/offline, modèles en RAM, VRAM) avec refresh auto 60s et refresh manuel au click.

**Architecture:** Nouvelle classe `OllamaMonitor` dans `src/ollamaMonitor.ts` — responsabilité unique (fetch + status bar). Elle est instanciée dans `activate()` de `extension.ts` et ajoutée aux subscriptions pour cleanup automatique. Aucune dépendance externe — fetch natif Node.js.

**Tech Stack:** TypeScript, VS Code Extension API, Node.js fetch, esbuild (bundle)

---

## File Map

| Fichier | Action | Responsabilité |
|---------|--------|----------------|
| `src/ollamaMonitor.ts` | Créer | Classe OllamaMonitor — fetch Ollama APIs, gestion StatusBarItem |
| `src/extension.ts` | Modifier | Instanciation OllamaMonitor dans activate() |
| `package.json` | Modifier | Ajout config `antigravity.ollamaUrl` + commande `antigravity.ollamaRefresh` |

---

### Task 1: Ajouter la config et la commande dans package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Ajouter la configuration et la commande**

Remplacer le contenu de `package.json` par :

```json
{
  "name": "antigravity-vscode-sync",
  "displayName": "Antigravity Cloud Sync",
  "description": "Synchronize Antigravity memory and skills via private Git repository",
  "version": "1.1.0",
  "publisher": "mimilouze",
  "repository": {
    "type": "git",
    "url": "https://github.com/jcmilouze/antigravity-brain-sync.git"
  },
  "license": "MIT",
  "engines": {
    "vscode": "^1.90.0"
  },
  "categories": ["Other"],
  "activationEvents": ["*"],
  "main": "./dist/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "antigravity.syncPush",
        "title": "Antigravity: Push Brain (to Cloud)"
      },
      {
        "command": "antigravity.syncPull",
        "title": "Antigravity: Pull Brain (from Cloud)"
      },
      {
        "command": "antigravity.ollamaRefresh",
        "title": "Antigravity: Rafraîchir statut Ollama"
      }
    ],
    "configuration": {
      "title": "Antigravity",
      "properties": {
        "antigravity.ollamaUrl": {
          "type": "string",
          "default": "http://localhost:11434",
          "description": "URL du serveur Ollama local"
        }
      }
    }
  },
  "scripts": {
    "vscode:prepublish": "npm run package",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "package": "esbuild src/extension.ts --bundle --outfile=dist/extension.js --external:vscode --format=cjs --platform=node"
  },
  "devDependencies": {
    "@types/node": "^20.12.7",
    "@types/vscode": "^1.90.0",
    "esbuild": "^0.20.2",
    "typescript": "^5.4.5"
  }
}
```

- [ ] **Step 2: Vérifier la syntaxe JSON**

```bash
cd C:\Users\mimilouze\.gemini\antigravity\extension
node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('JSON OK')"
```
Expected: `JSON OK`

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "feat: add ollamaRefresh command and ollamaUrl config to package.json"
```

---

### Task 2: Créer src/ollamaMonitor.ts

**Files:**
- Create: `src/ollamaMonitor.ts`

- [ ] **Step 1: Créer le fichier**

Créer `src/ollamaMonitor.ts` avec ce contenu complet :

```typescript
import * as vscode from 'vscode';

interface OllamaModel {
    name: string;
    size: number;
}

interface OllamaRunningModel {
    name: string;
    size_vram: number;
    expires_at: string;
}

interface OllamaStatus {
    online: boolean;
    available: OllamaModel[];
    running: OllamaRunningModel[];
}

export class OllamaMonitor {
    private statusBarItem: vscode.StatusBarItem;
    private timer: NodeJS.Timeout | undefined;
    private lastStatus: OllamaStatus = { online: false, available: [], running: [] };

    constructor(private context: vscode.ExtensionContext) {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            99
        );
        this.statusBarItem.command = 'antigravity.ollamaRefresh';
        context.subscriptions.push(this.statusBarItem);

        const refreshCommand = vscode.commands.registerCommand(
            'antigravity.ollamaRefresh',
            () => this.refresh()
        );
        context.subscriptions.push(refreshCommand);

        this.statusBarItem.show();
        this.refresh();
        this.timer = setInterval(() => this.refresh(), 60_000);
        context.subscriptions.push({ dispose: () => clearInterval(this.timer) });
    }

    async refresh(): Promise<void> {
        const url = vscode.workspace
            .getConfiguration('antigravity')
            .get<string>('ollamaUrl', 'http://localhost:11434');

        try {
            const [tagsRes, psRes] = await Promise.all([
                this.fetchWithTimeout(`${url}/api/tags`, 2000),
                this.fetchWithTimeout(`${url}/api/ps`, 2000)
            ]);

            const tagsData = await tagsRes.json() as { models: OllamaModel[] };
            const psData = await psRes.json() as { models: OllamaRunningModel[] };

            this.lastStatus = {
                online: true,
                available: tagsData.models || [],
                running: psData.models || []
            };
        } catch {
            this.lastStatus = { online: false, available: [], running: [] };
        }

        this.updateStatusBar();
    }

    private async fetchWithTimeout(url: string, ms: number): Promise<Response> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), ms);
        try {
            const res = await fetch(url, { signal: controller.signal });
            return res;
        } finally {
            clearTimeout(timeout);
        }
    }

    private updateStatusBar(): void {
        const { online, available, running } = this.lastStatus;

        if (!online) {
            this.statusBarItem.text = '🔴 Ollama offline';
            this.statusBarItem.tooltip = 'Ollama non disponible — cliquer pour réessayer';
            return;
        }

        // Build inline text: show up to 2 running models
        let text = '🟢 Ollama';
        if (running.length === 0) {
            text += '  aucun modèle actif';
        } else {
            const displayed = running.slice(0, 2).map(m => this.shortName(m.name));
            text += '  ' + displayed.join('  ');
            if (running.length > 2) {
                text += `  [+${running.length - 2}]`;
            }
        }
        this.statusBarItem.text = text;

        // Build tooltip
        const lines: string[] = [`Ollama — ${available.length} modèle(s) disponible(s)`, ''];
        if (running.length > 0) {
            lines.push('En RAM :');
            for (const m of running) {
                const vram = m.size_vram > 0
                    ? ` — ${(m.size_vram / 1_073_741_824).toFixed(1)} GB VRAM`
                    : '';
                lines.push(`• ${m.name}${vram}`);
            }
        } else {
            lines.push('Aucun modèle chargé en RAM');
        }

        const runningNames = new Set(running.map(m => m.name));
        const notLoaded = available.filter(m => !runningNames.has(m.name));
        if (notLoaded.length > 0) {
            lines.push('', 'Disponibles (non chargés) :');
            for (const m of notLoaded) {
                lines.push(`• ${m.name}`);
            }
        }

        lines.push('', 'Cliquer pour rafraîchir');
        this.statusBarItem.tooltip = lines.join('\n');
    }

    private shortName(name: string): string {
        // "qwen2.5-coder:32b" → "qwen2.5-coder:32b" (keep as-is, truncate if >20 chars)
        return name.length > 20 ? name.slice(0, 18) + '…' : name;
    }
}
```

- [ ] **Step 2: Vérifier la compilation TypeScript**

```bash
cd C:\Users\mimilouze\.gemini\antigravity\extension
npx tsc --noEmit
```
Expected: aucune erreur

- [ ] **Step 3: Commit**

```bash
git add src/ollamaMonitor.ts
git commit -m "feat: add OllamaMonitor class with status bar, fetch /api/tags and /api/ps"
```

---

### Task 3: Intégrer OllamaMonitor dans extension.ts

**Files:**
- Modify: `src/extension.ts`

- [ ] **Step 1: Ajouter l'import et l'instanciation**

Remplacer le contenu de `src/extension.ts` par :

```typescript
import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import { exec } from 'child_process';
import { OllamaMonitor } from './ollamaMonitor';

export function activate(context: vscode.ExtensionContext) {
    // --- Antigravity Sync ---
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

    // --- Ollama Monitor ---
    new OllamaMonitor(context);
}

export function deactivate() {}
```

- [ ] **Step 2: Vérifier la compilation**

```bash
cd C:\Users\mimilouze\.gemini\antigravity\extension
npx tsc --noEmit
```
Expected: aucune erreur

- [ ] **Step 3: Commit**

```bash
git add src/extension.ts
git commit -m "feat: instantiate OllamaMonitor in activate()"
```

---

### Task 4: Build et package VSIX

**Files:**
- Generated: `dist/extension.js`
- Generated: `antigravity-vscode-sync-1.1.0.vsix`

- [ ] **Step 1: Installer vsce si absent**

```bash
cd C:\Users\mimilouze\.gemini\antigravity\extension
npx vsce --version 2>/dev/null || npm install -g @vscode/vsce
```

- [ ] **Step 2: Build le bundle**

```bash
npm run package
```
Expected: `dist/extension.js` créé sans erreur

- [ ] **Step 3: Packager en VSIX**

```bash
npx vsce package --no-dependencies
```
Expected: `antigravity-vscode-sync-1.1.0.vsix` créé dans le dossier

- [ ] **Step 4: Installer dans VS Code**

```bash
code --install-extension antigravity-vscode-sync-1.1.0.vsix
```
Expected: `Extension 'antigravity-vscode-sync' was successfully installed.`

- [ ] **Step 5: Vérifier dans VS Code**

- Recharger VS Code (`Ctrl+Shift+P` → `Developer: Reload Window`)
- Vérifier la status bar droite : `🟢 Ollama  qwen2.5-coder:32b` (si Ollama tourne) ou `🔴 Ollama offline`
- Hover → tooltip avec liste des modèles
- Click → refresh immédiat

- [ ] **Step 6: Commit final**

```bash
git add dist/ antigravity-vscode-sync-1.1.0.vsix
git commit -m "build: v1.1.0 with Ollama Monitor status bar"
```

---

## Test manuel rapide

Avec Ollama qui tourne :
```bash
# Vérifier que les endpoints répondent
curl http://localhost:11434/api/tags | python -c "import sys,json; [print(m['name']) for m in json.load(sys.stdin)['models']]"
curl http://localhost:11434/api/ps | python -c "import sys,json; print(json.load(sys.stdin))"
```

Sans Ollama : couper le service → status bar doit passer à `🔴 Ollama offline` dans les 60s.
