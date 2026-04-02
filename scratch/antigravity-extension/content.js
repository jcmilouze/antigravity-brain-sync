// content.js - Antigravity V2.0.0
const shadowHost = document.createElement('div');
shadowHost.id = 'antigravity-tracker-host';
document.body.appendChild(shadowHost);

const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

// Inject Advanced CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  :host {
    all: initial;
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 2147483647;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    pointer-events: none;
    user-select: none;
  }
  .island {
    background: rgba(26, 27, 30, 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    pointer-events: auto;
    cursor: default;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    min-width: 140px;
    border-bottom: 2px solid transparent;
  }
  .island:hover {
    transform: translateY(-4px);
    background: rgba(26, 27, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.15);
    padding: 12px 20px;
  }

  /* Status Colors */
  .active-theme { border-bottom-color: #3bc9db; } /* Cyan */
  .idle-theme { border-bottom-color: #ff6b6b; }   /* Pink */

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  .active-theme .status-dot { background: #3bc9db; box-shadow: 0 0 10px #3bc9db; animation: pulse 2s infinite; }
  .idle-theme .status-dot { background: #ff6b6b; }

  .label-container {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .label {
    color: #fff;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .subtext {
    color: rgba(255, 255, 255, 0.4);
    font-size: 9px;
    font-weight: 600;
  }

  .models-summary {
    display: none;
    margin-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 8px;
    flex-direction: column;
    gap: 6px;
  }
  .island:hover .models-summary { display: flex; }

  .mini-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  .mini-name { color: #fff; font-size: 9px; font-weight: 700; }
  
  .segmented-bar {
    display: flex;
    gap: 2px;
  }
  .segment {
    width: 6px;
    height: 3px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1px;
  }
  .active-theme .segment.filled { background: #3bc9db; }
  .idle-theme .segment.filled { background: #ff6b6b; }

  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }
`;
shadowRoot.appendChild(styleSheet);

const island = document.createElement('div');
island.className = 'island idle-theme'; 
island.innerHTML = `
  <div class="status-dot"></div>
  <div class="label-container">
    <div class="label" id="label">Ollama Idle</div>
    <div class="subtext" id="subtext">0.0 GB VRAM</div>
  </div>
  <div class="models-summary" id="models-list"></div>
`;
shadowRoot.appendChild(island);

const label = island.querySelector('#label');
const subtext = island.querySelector('#subtext');
const modelsList = island.querySelector('#models-list');

function updateUI(status) {
    if (!status) return;

    if (!status.online) {
        island.className = 'island idle-theme';
        label.textContent = 'Disconnected';
        subtext.textContent = 'Waiting for Ollama...';
        modelsList.innerHTML = '';
        return;
    }

    const isActive = status.models.length > 0;
    island.className = `island ${isActive ? 'active-theme' : 'idle-theme'}`;

    // Affiche le nom du modèle actif en temps réel, ou "Ollama Idle"
    if (isActive) {
        const activeModel = status.models[0];
        const shortName = activeModel.name.split(':')[0];
        label.textContent = shortName.toUpperCase();
        const vramGB = ((activeModel.size_vram || 0) / (1024 * 1024 * 1024)).toFixed(1);
        subtext.textContent = `${vramGB} GB VRAM · ${activeModel.name.includes(':') ? activeModel.name.split(':')[1] : 'latest'}`;
    } else {
        label.textContent = 'Ollama Idle';
        subtext.textContent = `${(status.vramUsed / 1024).toFixed(1)} GB libre`;
    }

    // Détail au survol : tous les modèles chargés
    modelsList.innerHTML = '';
    status.models.forEach(m => {
        const shortName = m.name.split(':')[0].toUpperCase();
        const vramGB = ((m.size_vram || 0) / (1024 * 1024 * 1024)).toFixed(1);
        const mini = document.createElement('div');
        mini.className = 'mini-card';
        mini.innerHTML = `
            <span class="mini-name">🟢 ${shortName}</span>
            <span class="mini-name" style="opacity:0.5">${vramGB} GB</span>
        `;
        modelsList.appendChild(mini);
    });

    // Si aucun modèle chargé, affiche le top 3 des modèles utilisés récemment
    if (!isActive) {
        const stats = status.usageStats || {};
        const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 3);
        sorted.forEach(([name, secs]) => {
            const shortName = name.split(':')[0].toUpperCase();
            const mins = Math.round(secs / 60);
            const mini = document.createElement('div');
            mini.className = 'mini-card';
            mini.innerHTML = `
                <span class="mini-name" style="opacity:0.5">○ ${shortName}</span>
                <span class="mini-name" style="opacity:0.3">${mins}m</span>
            `;
            modelsList.appendChild(mini);
        });
    }
}

// Au chargement : demande l'état frais directement au background (évite le cache périmé)
chrome.runtime.sendMessage({ type: 'GET_OLLAMA_STATUS' }, (response) => {
    if (response) updateUI(response);
});

// Periodic update
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'OLLAMA_UPDATE') {
        updateUI(msg.status);
    }
});
