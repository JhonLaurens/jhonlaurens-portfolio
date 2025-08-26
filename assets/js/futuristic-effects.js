/*--------------------------------------------------------------
# Futuristic Effects JavaScript
# Dynamic particles, animations and cyberpunk interactions
--------------------------------------------------------------*/

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = null;
        this.init();
    }

    init() {
        // Create particles container
        this.container = document.createElement('div');
        this.container.className = 'particles-container';
        document.body.appendChild(this.container);

        // Create particles
        this.createParticles();
        
        // Start animation loop
        this.animate();
    }

    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 6 + 's';
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    animate() {
        this.particles.forEach(particle => {
            // Random movement
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);
            
            // Boundary check and reset
            if (currentTop > 100) {
                particle.style.top = '-5%';
                particle.style.left = Math.random() * 100 + '%';
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Cyberpunk Text Effects
class CyberpunkText {
    static glitchEffect(element) {
        const text = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let iterations = 0;
        const maxIterations = 10;
        
        const interval = setInterval(() => {
            element.textContent = text
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            iterations += 1;
            
            if (iterations > maxIterations) {
                clearInterval(interval);
                element.textContent = text;
            }
        }, 50);
    }

    static typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Neon Glow Effects
class NeonEffects {
    static addHoverGlow(elements) {
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.3s ease';
                element.style.boxShadow = '0 0 30px currentColor';
                element.style.transform = 'scale(1.05)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = '';
                element.style.transform = 'scale(1)';
            });
        });
    }

    static pulseEffect(element) {
        let opacity = 0.5;
        let increasing = true;
        
        setInterval(() => {
            if (increasing) {
                opacity += 0.02;
                if (opacity >= 1) increasing = false;
            } else {
                opacity -= 0.02;
                if (opacity <= 0.5) increasing = true;
            }
            
            element.style.opacity = opacity;
        }, 50);
    }
}

// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.drops = [];
        this.init();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.1';
        
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        // Initialize drops
        const columns = this.canvas.width / 20;
        for (let i = 0; i < columns; i++) {
            this.drops[i] = 1;
        }
        
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set text properties
        this.ctx.fillStyle = '#00f5ff';
        this.ctx.font = '15px monospace';
        
        // Draw characters
        for (let i = 0; i < this.drops.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            this.ctx.fillText(text, i * 20, this.drops[i] * 20);
            
            // Reset drop randomly
            if (this.drops[i] * 20 > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Cyberpunk Loading Screen
class CyberpunkLoader {
    static show() {
        const loader = document.createElement('div');
        loader.className = 'loading-screen';
        loader.innerHTML = `
            <div class="cyber-loader"></div>
        `;
        document.body.appendChild(loader);
        
        return loader;
    }
    
    static hide(loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    }
}

// Interactive Background
class InteractiveBackground {
    constructor() {
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX / window.innerWidth;
            this.mouse.y = e.clientY / window.innerHeight;
            
            this.updateBackground();
        });
    }

    updateBackground() {
        const body = document.body;
        const intensity = 0.1;
        
        // Create dynamic gradient based on mouse position
        const gradient = `
            radial-gradient(circle at ${this.mouse.x * 100}% ${this.mouse.y * 100}%, 
                rgba(0, 245, 255, ${intensity}) 0%, 
                transparent 50%),
            radial-gradient(circle at ${(1 - this.mouse.x) * 100}% ${(1 - this.mouse.y) * 100}%, 
                rgba(191, 0, 255, ${intensity}) 0%, 
                transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #050505 100%)
        `;
        
        body.style.background = gradient;
    }
}

// Enhanced Scroll Effects
class ScrollEffects {
    constructor() {
        this.lastScrollY = 0;
        this.scrollDirection = 'down';
        this.scrollSpeed = 0;
        this.isScrolling = false;
        this.scrollElements = [];
        this.ticking = false;
        
        this.init();
    }

    init() {
        // Get all elements that should have scroll effects
        this.scrollElements = document.querySelectorAll(
            '.hero-content, .about-content, .resume-item, .portfolio-item, .service-item, h1, h2, h3, .btn, .card'
        );
        
        // Add scroll listener with throttling
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        
        // Initialize intersection observer for better performance
        this.initIntersectionObserver();
        
        // Initial setup
        this.updateScrollEffects();
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollData();
                this.updateScrollEffects();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateScrollData() {
        const currentScrollY = window.pageYOffset;
        this.scrollSpeed = Math.abs(currentScrollY - this.lastScrollY);
        this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        this.lastScrollY = currentScrollY;
        this.isScrolling = true;
        
        // Clear scrolling state after delay
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 150);
    }

    updateScrollEffects() {
        const scrollProgress = this.lastScrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const viewportHeight = window.innerHeight;
        
        this.scrollElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;
            const elementCenter = elementTop + elementHeight / 2;
            
            // Calculate visibility and position ratios
            const visibilityRatio = Math.max(0, Math.min(1, 
                (viewportHeight - elementTop) / (viewportHeight + elementHeight)
            ));
            
            const centerDistance = Math.abs(elementCenter - viewportHeight / 2) / (viewportHeight / 2);
            const centerProximity = 1 - Math.min(1, centerDistance);
            
            // Apply enhanced scroll effects
            this.applyScrollTransforms(element, {
                visibilityRatio,
                centerProximity,
                scrollDirection: this.scrollDirection,
                scrollSpeed: this.scrollSpeed,
                isScrolling: this.isScrolling,
                index
            });
        });
        
        // Update background effects
        this.updateBackgroundEffects(scrollProgress);
    }

    applyScrollTransforms(element, data) {
        const { visibilityRatio, centerProximity, scrollDirection, scrollSpeed, isScrolling, index } = data;
        
        // Optimized transform calculations for better readability
        const translateY = (1 - visibilityRatio) * 20 * (scrollDirection === 'down' ? 1 : -1);
        const scale = 0.95 + (visibilityRatio * 0.05);
        const opacity = Math.max(0.3, visibilityRatio);
        const rotateX = (1 - visibilityRatio) * 5 * (scrollDirection === 'down' ? 1 : -1);
        
        // Optimized glow intensity for better readability
        const glowIntensity = centerProximity * Math.min(0.5, scrollSpeed / 20);
        const glowColor = scrollDirection === 'down' ? '0, 245, 255' : '191, 0, 255';
        
        // Reduced animation delay for smoother experience
        const delay = index * 0.02;
        
        // Apply transforms with smoother transitions
        element.style.transition = isScrolling 
            ? `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`
            : 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        element.style.transform = `
            translateY(${translateY}px) 
            scale(${scale}) 
            rotateX(${rotateX}deg)
            perspective(1000px)
        `;
        
        element.style.opacity = opacity;
        
        // Subtle glow effects that don't interfere with readability
        if (glowIntensity > 0.05) {
            element.style.boxShadow = `
                0 0 ${10 + glowIntensity * 15}px rgba(${glowColor}, ${glowIntensity * 0.3}),
                0 0 ${20 + glowIntensity * 30}px rgba(${glowColor}, ${glowIntensity * 0.15})
            `;
        } else {
            element.style.boxShadow = '';
        }
        
        // Subtle text glow for headings that preserves readability
        if (element.tagName.match(/^H[1-6]$/)) {
            element.style.textShadow = glowIntensity > 0.05 
                ? `0 0 ${5 + glowIntensity * 10}px rgba(${glowColor}, ${glowIntensity * 0.4})`
                : '';
        }
    }

    updateBackgroundEffects(scrollProgress) {
        const body = document.body;
        const intensity = 0.1 + (scrollProgress * 0.05);
        
        // Dynamic background based on scroll position
        const primaryColor = this.scrollDirection === 'down' ? '0, 245, 255' : '191, 0, 255';
        const secondaryColor = this.scrollDirection === 'down' ? '191, 0, 255' : '0, 245, 255';
        
        const gradient = `
            radial-gradient(circle at 20% ${20 + scrollProgress * 60}%, 
                rgba(${primaryColor}, ${intensity}) 0%, 
                transparent 50%),
            radial-gradient(circle at 80% ${80 - scrollProgress * 60}%, 
                rgba(${secondaryColor}, ${intensity}) 0%, 
                transparent 50%),
            linear-gradient(${135 + scrollProgress * 45}deg, 
                #0a0a0a 0%, 
                #050505 50%, 
                #0a0a0a 100%)
        `;
        
        body.style.background = gradient;
    }

    initIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-viewport');
                } else {
                    entry.target.classList.remove('in-viewport');
                }
            });
        }, options);
        
        this.scrollElements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Sound Effects (optional)
class CyberpunkSounds {
    static playHoverSound() {
        // Create audio context for subtle sound effects
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen
    const loader = CyberpunkLoader.show();
    
    // Initialize effects after a short delay
    setTimeout(() => {
        // Initialize enhanced scroll effects
        new ScrollEffects();
        
        // Initialize particle system
        new ParticleSystem();
        
        // Initialize matrix rain (optional, can be heavy)
        // new MatrixRain();
        
        // Initialize interactive background
        new InteractiveBackground();
        
        // Add glow effects to buttons
        const buttons = document.querySelectorAll('.btn, .social-links a');
        NeonEffects.addHoverGlow(buttons);
        
        // Add smooth hover effects to headings
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            heading.addEventListener('mouseenter', () => {
                heading.style.transition = 'all 0.3s ease';
                heading.style.transform = 'scale(1.05)';
                heading.style.textShadow = '0 0 20px currentColor, 0 0 40px currentColor';
            });
            
            heading.addEventListener('mouseleave', () => {
                heading.style.transform = 'scale(1)';
                heading.style.textShadow = '';
            });
        });
        
        // Add hover sounds to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                // CyberpunkSounds.playHoverSound(); // Uncomment for sound effects
            });
        });
        
        // Hide loading screen
        CyberpunkLoader.hide(loader);
    }, 500);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParticleSystem,
        CyberpunkText,
        NeonEffects,
        MatrixRain,
        CyberpunkLoader,
        InteractiveBackground,
        CyberpunkSounds
    };
}