// content.js
const shadowHost = document.createElement('div');
shadowHost.id = 'antigravity-shadow-host';
document.body.appendChild(shadowHost);

const shadowRoot = shadowHost.attachShadow({ mode: 'closed' });

// Inyect CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  :host {
    all: initial;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    pointer-events: none;
  }
  .indicator-container {
    background: rgba(20, 20, 25, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    pointer-events: auto;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .indicator-container:hover {
    transform: translateY(-4px);
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #4B4B4B;
    transition: background 0.5s ease, box-shadow 0.5s ease;
  }
  .dot.online { background: #10B981; box-shadow: 0 0 10px #10B981; }
  .dot.working { 
    background: #06B6D4; 
    box-shadow: 0 0 15px #06B6D4;
    animation: pulse 1s infinite alternate;
  }
  .dot.offline { background: #EF4444; }

  .label {
    color: #FFF;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.4); opacity: 1; box-shadow: 0 0 20px #06B6D4; }
  }
`;
shadowRoot.appendChild(styleSheet);

const container = document.createElement('div');
container.className = 'indicator-container';
container.innerHTML = `
  <div class="dot offline" id="status-dot"></div>
  <div class="label" id="status-label">OLLAMA</div>
`;
shadowRoot.appendChild(container);

const dot = container.querySelector('#status-dot');
const label = container.querySelector('#status-label');

function updateUI(status) {
  if (!status.online) {
    dot.className = 'dot offline';
    label.textContent = 'OLLAMA OFFLINE';
    label.style.color = '#EF4444';
  } else if (status.working) {
    dot.className = 'dot working';
    label.textContent = `OLLAMA: ${status.activeModel || 'BUSY'}`;
    label.style.color = '#06B6D4';
  } else {
    dot.className = 'dot online';
    label.textContent = 'OLLAMA IDLE';
    label.style.color = '#10B981';
  }
}

// Initial pull
chrome.runtime.sendMessage({ type: 'GET_OLLAMA_STATUS' }, (response) => {
  if (response) updateUI(response);
});

// Listen for updates
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'OLLAMA_UPDATE') {
    updateUI(message.status);
  }
});
