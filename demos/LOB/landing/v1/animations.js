/* ============================================
   LOB Group - Motion-Rich Animations
   GSAP-Powered Premium Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCursorGlow();
    initNavbar();
    initMobileMenu();
    initMagneticButtons();
    initSmoothScroll();

    // GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initGSAPAnimations();
        initHorizontalScroll();
        initCounters();
        initParallax();
    } else {
        // Fallback for no GSAP
        initFallbackAnimations();
        initCountersFallback();
    }
});

/* ============================================
   Cursor Glow Effect
   ============================================ */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        // Smooth lerp
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

/* ============================================
   Navbar Scroll Effect
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide on scroll down, show on scroll up (optional, uncomment if desired)
        // if (currentScroll > lastScroll && currentScroll > 200) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }

        lastScroll = currentScroll;
    }, { passive: true });
}

/* ============================================
   Mobile Menu
   ============================================ */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!toggle || !mobileMenu) return;

    toggle.addEventListener('click', () => {
        const isActive = toggle.classList.toggle('active');
        mobileMenu.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ============================================
   Magnetic Buttons
   ============================================ */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic');
    if (window.matchMedia('(max-width: 768px)').matches) return;

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            const navbar = document.getElementById('navbar');
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        });
    });
}

/* ============================================
   GSAP Animations
   ============================================ */
function initGSAPAnimations() {
    // Set default ease
    gsap.defaults({ ease: 'power3.out' });

    // Platforms section
    gsap.from('.platforms-section .section-header', {
        scrollTrigger: {
            trigger: '.platforms-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    // Technology section
    gsap.from('.technology-section .section-header', {
        scrollTrigger: {
            trigger: '.technology-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    // Tech stat cards
    gsap.from('.tech-stat', {
        scrollTrigger: {
            trigger: '.tech-grid',
            start: 'top 75%'
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1
    });

    // Principles section
    gsap.from('.principles-section .section-header', {
        scrollTrigger: {
            trigger: '.principles-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    // Principle cards
    gsap.from('.principle-card', {
        scrollTrigger: {
            trigger: '.principles-grid',
            start: 'top 75%'
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.12
    });

    // CTA section
    gsap.from('.cta-content', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 75%'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
}

/* ============================================
   Horizontal Scroll Gallery
   ============================================ */
function initHorizontalScroll() {
    const track = document.querySelector('.horizontal-track');
    if (!track) return;

    const cards = track.querySelectorAll('.platform-card');
    const totalWidth = Array.from(cards).reduce((acc, card) => {
        return acc + card.offsetWidth + 32; // 32px gap
    }, 0);

    // Create horizontal scroll animation
    const scrollTween = gsap.to(track, {
        x: () => -(totalWidth - window.innerWidth + 64),
        ease: 'none',
        scrollTrigger: {
            trigger: '.platforms-section',
            start: 'top top',
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1
        }
    });

    // Animate cards as they enter
    cards.forEach((card, i) => {
        gsap.from(card, {
            opacity: 0.3,
            scale: 0.9,
            duration: 0.5,
            scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left 85%',
                end: 'left 50%',
                scrub: true
            }
        });
    });
}

/* ============================================
   Counter Animations
   ============================================ */
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to({ value: 0 }, {
                    value: target,
                    duration: 2.5,
                    ease: 'power2.out',
                    onUpdate: function () {
                        counter.textContent = Math.round(this.targets()[0].value);
                    }
                });
            }
        });
    });
}

function initCountersFallback() {
    const counters = document.querySelectorAll('[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounterManual(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounterManual(element, target) {
    const duration = 2500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);

        element.textContent = Math.round(target * eased);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ============================================
   Parallax Effects
   ============================================ */
function initParallax() {
    // Background orbs parallax
    gsap.to('.orb-1', {
        y: -300,
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
        }
    });

    gsap.to('.orb-2', {
        y: 300,
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
        }
    });

    // Grid overlay parallax
    gsap.to('.grid-overlay', {
        backgroundPositionY: '100px',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2
        }
    });
}

/* ============================================
   Fallback Animations (Intersection Observer)
   ============================================ */
function initFallbackAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add reveal class to animatable elements
    const animatables = document.querySelectorAll(
        '.section-header, .tech-stat, .principle-card, .platform-card, .cta-content'
    );

    animatables.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ============================================
   Reduced Motion Support
   ============================================ */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable GSAP animations
    if (typeof gsap !== 'undefined') {
        gsap.globalTimeline.timeScale(0);
    }

    // Force all revealing elements to be visible
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('active');
    });
}

/* ============================================
   Performance: Pause on Tab Hidden
   ============================================ */
document.addEventListener('visibilitychange', () => {
    if (typeof gsap !== 'undefined') {
        if (document.hidden) {
            gsap.globalTimeline.pause();
        } else {
            gsap.globalTimeline.resume();
        }
    }
});

/* ============================================
   Window Resize Handler
   ============================================ */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 250);
});
