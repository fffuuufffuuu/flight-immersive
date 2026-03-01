document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
    initParallax();
    initTimelineNav();
    initSmoothScroll();
    initSectionObserver();
    initInteractiveEffects();
});

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    function createParticles() {
        const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
        createParticles();
    });
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.content-block, .reveal-up, .reveal-left, .reveal-right, .timeline-event, .pioneer-card');
    animatedElements.forEach(el => observer.observe(el));
}

function initSectionObserver() {
    const sections = document.querySelectorAll('.content-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => sectionObserver.observe(section));
}

function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const floatingElements = document.querySelectorAll('.floating-balloon, .floating-kite');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrolled < heroHeight) {
            parallaxLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.1;
                layer.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            floatingElements.forEach((el, index) => {
                const speed = (index + 1) * 0.05;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

function initTimelineNav() {
    const sections = document.querySelectorAll('section[id]');
    const markers = document.querySelectorAll('.timeline-marker');
    const progressBar = document.getElementById('progress-bar');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / totalHeight) * 100;
        
        if (progressBar) {
            progressBar.style.height = `${Math.min(scrollPercent, 100)}%`;
        }
        
        let currentSectionIndex = 0;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionIndex = index;
                
                markers.forEach((marker, markerIndex) => {
                    marker.classList.remove('active');
                    
                    if (marker.dataset.section === sectionId) {
                        marker.classList.add('active');
                    }
                    
                    const markerSectionIndex = Array.from(sections).findIndex(
                        s => s.id === marker.dataset.section
                    );
                    
                    if (markerSectionIndex < index) {
                        marker.classList.add('passed');
                    } else {
                        marker.classList.remove('passed');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initInteractiveEffects() {
    const heroContent = document.querySelector('.hero-content');
    
    document.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (heroContent && scrolled < window.innerHeight) {
            const opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            heroContent.style.opacity = Math.max(0, opacity);
        }
    });
    
    const artifactCard = document.querySelector('.artifact-card-3d');
    if (artifactCard) {
        artifactCard.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const inner = this.querySelector('.artifact-inner');
            if (inner.style.transform === 'rotateY(180deg)') {
                inner.style.transform = 'rotateY(0deg)';
            } else {
                inner.style.transform = 'rotateY(180deg)';
            }
        });
    }
    
    const eventCards = document.querySelectorAll('.event-card, .pioneer-card, .info-card, .image-frame');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.setProperty('--mouse-x', e.offsetX + 'px');
            this.style.setProperty('--mouse-y', e.offsetY + 'px');
        });
    });
    
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.querySelector('.marker-dot').style.transform = 'scale(1.4)';
        });
        
        marker.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.querySelector('.marker-dot').style.transform = '';
            }
        });
    });
    
    initScrollProgress();
}

function initScrollProgress() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;
    
    let lastScrollY = 0;
    let ticking = false;
    
    function updateProgress() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / docHeight) * 100;
        
        progressBar.style.height = `${Math.min(progress, 100)}%`;
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    });
}

const style = document.createElement('style');
style.textContent = `
    .typing-cursor {
        display: inline-block;
        width: 3px;
        height: 1em;
        background: currentColor;
        margin-left: 2px;
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .timeline-marker {
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .marker-dot {
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .timeline-marker:hover .marker-dot {
        animation: dotPulse 0.6s ease-out;
    }
    
    @keyframes dotPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.5); }
        100% { transform: scale(1.4); }
    }
    
    .content-section {
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section-header {
        transition: all 0.6s ease;
    }
    
    .section-content {
        transition: all 0.6s ease 0.2s;
    }
`;
document.head.appendChild(style);

const lazyImages = document.querySelectorAll('img[loading="lazy"]');
lazyImages.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
});

console.log('Flight Before the Airplane - Immersive Experience Loaded');
