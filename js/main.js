/* ===== Dairy Milk - Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initParallax();
    initParticles();
    initSmoothScroll();
    initCookieBanner();
});

/* ===== Sticky Navbar ===== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/* ===== Mobile Menu ===== */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (!hamburger || !mobileNav) return;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
}

/* ===== Scroll Reveal (Intersection Observer) ===== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');

    if (!revealElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/* ===== Parallax Effect ===== */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    if (!parallaxElements.length) return;

    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.3;
            const rect = el.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const offset = (centerY - window.innerHeight / 2) * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

/* ===== Golden Particles ===== */
function initParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 8 + 6}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;

        container.appendChild(particle);
    }
}

/* ===== Smooth Scroll ===== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        });
    });
}

/* ===== Cookie Banner ===== */
function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (!banner) return;

    const accepted = localStorage.getItem('dairy-milk-cookies-accepted');

    if (!accepted) {
        setTimeout(() => {
            banner.classList.add('show');
        }, 2000);
    }

    const acceptBtn = banner.querySelector('.cookie-accept');
    const declineBtn = banner.querySelector('.cookie-decline');

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('dairy-milk-cookies-accepted', 'true');
            banner.classList.remove('show');
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('dairy-milk-cookies-accepted', 'declined');
            banner.classList.remove('show');
        });
    }
}
