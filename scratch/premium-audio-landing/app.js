// AURA PRO MAX — Simulation Logic

function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('open');
    }, 10);
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('open');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
}

// Close modal on click outside
window.onclick = function(event) {
    if (event.target.className === 'modal-overlay open') {
        event.target.classList.remove('open');
        setTimeout(() => {
            event.target.style.display = 'none';
        }, 500);
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<span class="aura-icon">A</span> ${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

function saveProfile() {
    const sliders = document.querySelectorAll('.slider-group input');
    const profile = Array.from(sliders).map(s => s.value);
    localStorage.setItem('aura_sound_signature', JSON.stringify(profile));
    
    showNotification("Signature Acoustique synchronisée avec votre identité AURA.");
    setTimeout(() => closeModal('control-center'), 1500);
}

function simulateLogin() {
    const email = document.querySelector('.premium-input').value;
    if (email.includes('@')) {
        showNotification("Authentification biométrique réussie. Bienvenue dans le Cercle.");
        setTimeout(() => {
            window.location.hash = "#exclusive-content";
            closeModal('member-portal');
        }, 2000);
    } else {
        showNotification("Email d'invitation non reconnu par notre conciergerie.", "error");
    }
}

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 40px;
        right: 40px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #fff;
        padding: 20px 40px;
        border-radius: 12px;
        z-index: 3000;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        align-items: center;
        gap: 15px;
    }
    .notification.show { transform: translateY(0); opacity: 1; }
    .notification.error { border-color: rgba(255, 0, 0, 0.3); }
    .aura-icon { font-weight: 800; color: #D4AF37; }
`;
document.head.appendChild(style);
