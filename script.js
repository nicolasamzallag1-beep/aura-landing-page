// ===========================
// Smooth Scroll Enhancement
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Navigation Scroll Effect
// ===========================
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.padding = '0.75rem 0';
        nav.style.boxShadow = '0 4px 20px rgba(31, 38, 135, 0.1)';
    } else {
        nav.style.padding = '1.5rem 0';
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards, testimonial cards, and sections
const animatedElements = document.querySelectorAll(
    '.feature-card, .testimonial-card, .about-content, .cta-content'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===========================
// Parallax Effect for Hero Visual
// ===========================
const heroVisual = document.querySelector('.hero-visual');
const floatingCards = document.querySelectorAll('.floating-card');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;

    if (heroVisual) {
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});

// ===========================
// Mouse Move Effect on Hero Cards
// ===========================
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatingCards.forEach((card, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===========================
// Button Ripple Effect
// ===========================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');

    const rippleElement = button.querySelector('.ripple');
    if (rippleElement) {
        rippleElement.remove();
    }

    button.appendChild(ripple);
}

const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-download');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 600ms ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Stats Counter Animation
// ===========================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            // Animate each stat
            animateCounter(statNumbers[0], 500000);
            statNumbers[1].textContent = '4.9';
            animateCounter(statNumbers[2], 10000000);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===========================
// Testimonial Card Hover Effect
// ===========================
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.background = 'rgba(255, 255, 255, 0.85)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.background = 'var(--glass-bg)';
    });
});

// ===========================
// Feature Card Tilt Effect
// ===========================
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================
// Lazy Loading Images (if any are added)
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===========================
// Performance Optimization
// ===========================
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    // Any additional scroll logic here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===========================
// Zen Music Player with Web Audio API
// ===========================
class ZenMusicPlayer {
    constructor() {
        this.audioContext = null;
        this.oscillators = [];
        this.gainNodes = [];
        this.isPlaying = false;
        this.masterGain = null;

        this.initializeUI();
    }

    initializeUI() {
        const musicBtn = document.getElementById('musicBtn');
        const musicPlayer = document.getElementById('musicPlayer');

        if (musicBtn) {
            musicBtn.addEventListener('click', () => this.toggle());
        }
    }

    createAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 0;
        }
    }

    createZenSoundscape() {
        // Create multiple oscillators for a rich ambient sound
        const frequencies = [
            { freq: 174, type: 'sine', volume: 0.15 },      // Root frequency
            { freq: 261.63, type: 'sine', volume: 0.12 },   // C note (calm)
            { freq: 329.63, type: 'sine', volume: 0.10 },   // E note (harmony)
            { freq: 392, type: 'sine', volume: 0.08 },      // G note (peace)
            { freq: 523.25, type: 'sine', volume: 0.06 }    // High C (ethereal)
        ];

        frequencies.forEach((config, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.type = config.type;
            oscillator.frequency.value = config.freq;

            // Add slight detuning for richness
            oscillator.detune.value = Math.random() * 10 - 5;

            gainNode.gain.value = config.volume;

            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);

            oscillator.start();

            // Add subtle frequency modulation for organic feel
            const lfoFreq = 0.1 + Math.random() * 0.2;
            const lfo = this.audioContext.createOscillator();
            const lfoGain = this.audioContext.createGain();

            lfo.frequency.value = lfoFreq;
            lfoGain.gain.value = 2;

            lfo.connect(lfoGain);
            lfoGain.connect(oscillator.frequency);
            lfo.start();

            this.oscillators.push(oscillator);
            this.oscillators.push(lfo);
            this.gainNodes.push(gainNode);
        });
    }

    fadeIn(duration = 2) {
        if (this.masterGain) {
            const currentTime = this.audioContext.currentTime;
            this.masterGain.gain.cancelScheduledValues(currentTime);
            this.masterGain.gain.setValueAtTime(0, currentTime);
            this.masterGain.gain.linearRampToValueAtTime(0.3, currentTime + duration);
        }
    }

    fadeOut(duration = 1.5) {
        if (this.masterGain) {
            const currentTime = this.audioContext.currentTime;
            this.masterGain.gain.cancelScheduledValues(currentTime);
            this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, currentTime);
            this.masterGain.gain.linearRampToValueAtTime(0, currentTime + duration);

            setTimeout(() => this.stop(), duration * 1000);
        }
    }

    play() {
        this.createAudioContext();

        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        this.createZenSoundscape();
        this.fadeIn();
        this.isPlaying = true;
        this.updateUI();
    }

    stop() {
        this.oscillators.forEach(osc => {
            try {
                osc.stop();
                osc.disconnect();
            } catch (e) {
                // Oscillator might already be stopped
            }
        });

        this.oscillators = [];
        this.gainNodes = [];
        this.isPlaying = false;
        this.updateUI();
    }

    toggle() {
        if (this.isPlaying) {
            this.fadeOut();
        } else {
            this.play();
        }
    }

    updateUI() {
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');
        const musicPlayer = document.getElementById('musicPlayer');

        if (this.isPlaying) {
            playIcon?.classList.add('hidden');
            pauseIcon?.classList.remove('hidden');
            musicPlayer?.classList.add('playing');
        } else {
            playIcon?.classList.remove('hidden');
            pauseIcon?.classList.add('hidden');
            musicPlayer?.classList.remove('playing');
        }
    }
}

// Initialize the zen music player
const zenMusic = new ZenMusicPlayer();

// ===========================
// Zen Carousel Auto-play
// ===========================
class ZenCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.carousel-dots .dot');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // Add click handlers to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });

        // Pause on hover
        const carousel = document.querySelector('.zen-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        // Start auto-play
        this.startAutoPlay();
    }

    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }
}

// Initialize the zen carousel
const zenCarousel = new ZenCarousel();

console.log('🌟 AURA - Votre sanctuaire de bien-être mental est prêt');
console.log('🎵 Lecteur de musique zen initialisé');
console.log('🎠 Carrousel zen initialisé');
