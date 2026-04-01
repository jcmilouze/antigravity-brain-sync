var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode2 = __toESM(require("vscode"));
var os = __toESM(require("os"));
var path = __toESM(require("path"));
var import_child_process = require("child_process");

// src/ollamaMonitor.ts
var vscode = __toESM(require("vscode"));
var OllamaMonitor = class {
  constructor(context) {
    this.context = context;
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      99
    );
    this.statusBarItem.command = "antigravity.ollamaRefresh";
    context.subscriptions.push(this.statusBarItem);
    const refreshCommand = vscode.commands.registerCommand(
      "antigravity.ollamaRefresh",
      () => this.refresh()
    );
    context.subscriptions.push(refreshCommand);
    this.statusBarItem.show();
    this.refresh();
    this.timer = setInterval(() => this.refresh(), 6e4);
    context.subscriptions.push({ dispose: () => clearInterval(this.timer) });
  }
  statusBarItem;
  timer;
  lastStatus = { online: false, available: [], running: [] };
  async refresh() {
    const url = vscode.workspace.getConfiguration("antigravity").get("ollamaUrl", "http://localhost:11434");
    try {
      const [tagsRes, psRes] = await Promise.all([
        this.fetchWithTimeout(`${url}/api/tags`, 2e3),
        this.fetchWithTimeout(`${url}/api/ps`, 2e3)
      ]);
      const tagsData = await tagsRes.json();
      const psData = await psRes.json();
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
  async fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ms);
    try {
      const res = await fetch(url, { signal: controller.signal });
      return res;
    } finally {
      clearTimeout(timeout);
    }
  }
  updateStatusBar() {
    const { online, available, running } = this.lastStatus;
    if (!online) {
      this.statusBarItem.text = "\u{1F534} Ollama offline";
      this.statusBarItem.tooltip = "Ollama non disponible \u2014 cliquer pour r\xE9essayer";
      return;
    }
    let text = "\u{1F7E2} Ollama";
    if (running.length === 0) {
      text += "  aucun mod\xE8le actif";
    } else {
      const displayed = running.slice(0, 2).map((m) => this.shortName(m.name));
      text += "  " + displayed.join("  ");
      if (running.length > 2) {
        text += `  [+${running.length - 2}]`;
      }
    }
    this.statusBarItem.text = text;
    const lines = [`Ollama \u2014 ${available.length} mod\xE8le(s) disponible(s)`, ""];
    if (running.length > 0) {
      lines.push("En RAM :");
      for (const m of running) {
        const vram = m.size_vram > 0 ? ` \u2014 ${(m.size_vram / 1073741824).toFixed(1)} GB VRAM` : "";
        lines.push(`\u2022 ${m.name}${vram}`);
      }
    } else {
      lines.push("Aucun mod\xE8le charg\xE9 en RAM");
    }
    const runningNames = new Set(running.map((m) => m.name));
    const notLoaded = available.filter((m) => !runningNames.has(m.name));
    if (notLoaded.length > 0) {
      lines.push("", "Disponibles (non charg\xE9s) :");
      for (const m of notLoaded) {
        lines.push(`\u2022 ${m.name}`);
      }
    }
    lines.push("", "Cliquer pour rafra\xEEchir");
    this.statusBarItem.tooltip = lines.join("\n");
  }
  shortName(name) {
    return name.length > 20 ? name.slice(0, 18) + "\u2026" : name;
  }
};

// src/extension.ts
function activate(context) {
  const statusBarItem = vscode2.window.createStatusBarItem(vscode2.StatusBarAlignment.Right, 100);
  statusBarItem.text = `\u{1F300} Antigravity Sync`;
  statusBarItem.tooltip = "Synchroniser votre Brain avec le Cloud (PC/Mac)";
  statusBarItem.command = "antigravitySync.menu";
  context.subscriptions.push(statusBarItem);
  statusBarItem.show();
  const syncCommand = vscode2.commands.registerCommand("antigravitySync.menu", async () => {
    const options = [
      { label: "\u{1F4E4} Push to Cloud", description: "Envoyer les modifications locales vers Git" },
      { label: "\u{1F4E5} Pull from Cloud", description: "R\xE9cup\xE9rer les derni\xE8res \xE9volutions du Brain" }
    ];
    const choice = await vscode2.window.showQuickPick(options, {
      placeHolder: "\u{1F30C} Antigravity Brain : Synchronisation"
    });
    if (!choice)
      return;
    const antigravityPath = path.join(os.homedir(), ".gemini", "antigravity");
    vscode2.window.withProgress({
      location: vscode2.ProgressLocation.Notification,
      title: `Antigravity ${choice.label}`,
      cancellable: false
    }, async (progress) => {
      return new Promise((resolve) => {
        let cmd = "";
        if (choice.label.includes("Push")) {
          progress.report({ message: "Indexation et envoi des souvenirs..." });
          cmd = `cd "${antigravityPath}" && git add . && git commit -m "\u{1F300} Brain Sync: [${(/* @__PURE__ */ new Date()).toLocaleString()}]" && git push`;
        } else {
          progress.report({ message: "R\xE9cup\xE9ration de la conscience collective..." });
          cmd = `cd "${antigravityPath}" && git pull --rebase`;
        }
        (0, import_child_process.exec)(cmd, (error, stdout, stderr) => {
          if (error && !stdout.includes("nothing to commit")) {
            vscode2.window.showErrorMessage(`\u274C \xC9chec de la synchronisation : ${stderr || error.message}`);
          } else {
            vscode2.window.showInformationMessage(`\u2705 Antigravity : ${choice.label} termin\xE9 avec succ\xE8s.`);
          }
          resolve();
        });
      });
    });
  });
  context.subscriptions.push(syncCommand);
  new OllamaMonitor(context);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
