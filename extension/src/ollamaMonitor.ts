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
        return name.length > 20 ? name.slice(0, 18) + '…' : name;
    }
}
