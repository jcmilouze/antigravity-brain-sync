/**
 * AURA PRO MAX — Operational Logic v2.0
 * Optimized for RTX 4090 Rendering
 */

// --- Global State ---
let auraState = {
    isMember: localStorage.getItem('aura_member_status') === 'true',
    lastScrollY: window.scrollY,
    lerpScrollY: window.scrollY
};

// --- Core Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initParallax();
    updateUIFromState();
    setupEventListeners();
});

function setupEventListeners() {
    // Navigation highlighting
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-links a').forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
}

// --- Smooth Scroll & Parallax Logic ---
function initSmoothScroll() {
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
    
    const scrollLoop = () => {
        auraState.lerpScrollY = lerp(auraState.lerpScrollY, window.scrollY, 0.08);
        applyParallax(auraState.lerpScrollY);
        requestAnimationFrame(scrollLoop);
    };
    
    scrollLoop();
}

function applyParallax(y) {
    // Hero Parallax
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${y * 0.15}px) rotateY(${y * 0.01}deg)`;
    }

    // Case Parallax
    const caseImage = document.querySelector('.case-image');
    if (caseImage) {
        const rect = caseImage.parentElement.getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) * 0.1;
        caseImage.style.transform = `translateY(${-offset}px) scale(${1 + offset * 0.001})`;
    }

    // Obsidian Chip Glow & Scale
    const chip = document.querySelector('.chip-img');
    if (chip) {
        const glow = Math.sin(y * 0.005) * 20 + 40;
        chip.style.filter = `drop-shadow(0 0 ${glow}px rgba(255,255,255,0.2))`;
    }
}

// --- UI / Modal Logic ---
function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('open'));
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('open');
    setTimeout(() => { modal.style.display = 'none'; }, 500);
}

function updateUIFromState() {
    const ctaBtn = document.querySelector('.cta-button');
    const memberLink = document.querySelector('.nav-links .btn-buy');
    
    if (auraState.isMember) {
        if (ctaBtn) ctaBtn.textContent = "Accéder à l'Espace Cercle";
        if (memberLink) memberLink.textContent = "Mon Profil AURA";
    }
}

function simulateLogin() {
    const input = document.querySelector('.premium-input');
    if (input.value.includes('@')) {
        auraState.isMember = true;
        localStorage.setItem('aura_member_status', 'true');
        showNotification("Identité confirmée. Accès au Cercle autorisé.");
        updateUIFromState();
        setTimeout(() => closeModal('member-portal'), 1500);
    } else {
        showNotification("Échec de l'authentification biométrique.", "error");
    }
}

function saveProfile() {
    showNotification("Signature acoustique enregistrée sur la puce Obsidian.");
    setTimeout(() => closeModal('control-center'), 1500);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<span class="aura-icon">A</span> ${message}`;
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => notification.classList.add('show'));
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}
