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
    label.textContent = isActive ? 'Ollama Active' : 'Ollama Idle';
    subtext.textContent = `${(status.vramUsed / 1024).toFixed(1)} GB VRAM`;

    // Update models summary hover
    modelsList.innerHTML = '';
    const stats = status.usageStats || {};
    const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 3);

    sorted.forEach(([name]) => {
        const isLoaded = status.models.some(m => m.name === name);
        const shortName = name.split(':')[0].toUpperCase();
        const percentage = isLoaded ? 20 : 100;
        
        let segmentsHtml = '';
        for(let i=1; i<=5; i++) {
            const filled = (percentage >= (i * 20)) ? 'filled' : '';
            segmentsHtml += `<div class="segment ${filled}"></div>`;
        }

        const mini = document.createElement('div');
        mini.className = 'mini-card';
        mini.innerHTML = `
            <span class="mini-name">${isActive ? '🚀' : '○'} ${shortName}</span>
            <div class="segmented-bar">${segmentsHtml}</div>
        `;
        modelsList.appendChild(mini);
    });
}

// Initial status
chrome.storage.local.get(['ollamaStatus'], (data) => {
    updateUI(data.ollamaStatus);
});

// Periodic update
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'OLLAMA_UPDATE') {
        updateUI(msg.status);
    }
});
