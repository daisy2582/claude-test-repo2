/* ===== Dubai Kunafa Chocolate - Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initParallax();
    initParticles();
    initSmoothScroll();
    initCookieBanner();
    initScrollProgress();
    initBackToTop();
    initSparkleTrail();
    initTiltCards();
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

    const accepted = localStorage.getItem('dubai-kunafa-cookies-accepted');

    if (!accepted) {
        setTimeout(() => {
            banner.classList.add('show');
        }, 2000);
    }

    const acceptBtn = banner.querySelector('.cookie-accept');
    const declineBtn = banner.querySelector('.cookie-decline');

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('dubai-kunafa-cookies-accepted', 'true');
            banner.classList.remove('show');
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('dubai-kunafa-cookies-accepted', 'declined');
            banner.classList.remove('show');
        });
    }
}

/* ===== Scroll Progress Bar ===== */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

/* ===== Back to Top Button ===== */
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    const showThreshold = 400;

    function toggleButton() {
        if (window.scrollY > showThreshold) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleButton, { passive: true });
    toggleButton();

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===== Golden Sparkle Cursor Trail ===== */
function initSparkleTrail() {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = document.querySelector('.sparkle-container');
    if (!container) return;

    let lastSparkleTime = 0;
    const sparkleInterval = 50; // ms between sparkles
    const maxSparkles = 30;
    let sparkleCount = 0;

    const goldColors = [
        '#FFD700',
        '#D4AF37',
        '#B8860B',
        '#F5E6C8',
        '#FFFFFF'
    ];

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkleTime < sparkleInterval) return;
        if (sparkleCount >= maxSparkles) return;

        lastSparkleTime = now;
        sparkleCount++;

        createSparkle(e.clientX, e.clientY);
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        const size = Math.random() * 6 + 3;
        const color = goldColors[Math.floor(Math.random() * goldColors.length)];
        const dx = (Math.random() - 0.5) * 40;
        const dy = (Math.random() - 0.5) * 40 - 20; // bias upward

        sparkle.classList.add('sparkle');
        sparkle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 ${size * 2}px ${color};
            --dx: ${dx}px;
            --dy: ${dy}px;
        `;

        container.appendChild(sparkle);

        // Occasionally create a star-shaped sparkle
        if (Math.random() > 0.7) {
            const star = document.createElement('div');
            const starSize = Math.random() * 10 + 6;
            const starDx = (Math.random() - 0.5) * 50;
            const starDy = (Math.random() - 0.5) * 50 - 15;

            star.classList.add('sparkle-star');
            star.innerHTML = '&#10022;';
            star.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                font-size: ${starSize}px;
                color: ${color};
                text-shadow: 0 0 ${starSize}px ${color};
                --dx: ${starDx}px;
                --dy: ${starDy}px;
            `;
            container.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, 1000);
        }

        setTimeout(() => {
            sparkle.remove();
            sparkleCount--;
        }, 800);
    }
}

/* ===== 3D Tilt Card Effect ===== */
function initTiltCards() {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = document.querySelectorAll('[data-tilt]');
    if (!cards.length) return;

    cards.forEach(card => {
        const maxTilt = 8; // degrees
        const maxGlare = 0.15;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

            // Add dynamic glow based on cursor position
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            card.style.boxShadow = `
                0 20px 60px rgba(184,134,11,0.15),
                ${(x - centerX) * 0.1}px ${(y - centerY) * 0.1}px 30px rgba(212,175,55,${maxGlare}),
                inset 0 0 0 1px var(--gold)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';

            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}
