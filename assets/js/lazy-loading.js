/**
 * Enhanced Lazy Loading System
 * Optimizes image loading performance with intersection observer
 * and progressive enhancement for better user experience
 */

class LazyLoadingManager {
  constructor() {
    this.imageObserver = null;
    this.effectsObserver = null;
    this.loadedImages = new Set();
    this.init();
  }

  init() {
    // Check for Intersection Observer support
    if ('IntersectionObserver' in window) {
      this.setupImageObserver();
      this.setupEffectsObserver();
      this.observeImages();
      this.observeEffects();
    } else {
      // Fallback for older browsers
      this.loadAllImages();
    }

    // Preload critical images
    this.preloadCriticalImages();
  }

  setupImageObserver() {
    const imageOptions = {
      root: null,
      rootMargin: '50px 0px',
      threshold: 0.01
    };

    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.imageObserver.unobserve(entry.target);
        }
      });
    }, imageOptions);
  }

  setupEffectsObserver() {
    const effectsOptions = {
      root: null,
      rootMargin: '100px 0px',
      threshold: 0.1
    };

    this.effectsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.enableEffects(entry.target);
          this.effectsObserver.unobserve(entry.target);
        }
      });
    }, effectsOptions);
  }

  observeImages() {
    // Observe all images except critical ones
    const images = document.querySelectorAll('img[data-src], img:not([data-critical])');
    
    images.forEach(img => {
      // Skip if already has loading="lazy" and src is set
      if (img.getAttribute('loading') === 'lazy' && img.src) {
        return;
      }

      // Convert src to data-src for lazy loading
      if (img.src && !img.dataset.src && !img.dataset.critical) {
        img.dataset.src = img.src;
        img.src = this.createPlaceholder(img);
        img.classList.add('lazy-loading');
      }

      this.imageObserver.observe(img);
    });
  }

  observeEffects() {
    // Observe elements with heavy effects
    const effectElements = document.querySelectorAll(
      '.portfolio-wrap, .hero-visual, .profile-card, [data-aos]'
    );
    
    effectElements.forEach(element => {
      this.effectsObserver.observe(element);
    });
  }

  loadImage(img) {
    const src = img.dataset.src || img.src;
    
    if (this.loadedImages.has(src)) {
      return;
    }

    // Create a new image to preload
    const imageLoader = new Image();
    
    imageLoader.onload = () => {
      // Fade in effect
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease-in-out';
      
      img.src = src;
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-loaded');
      
      // Trigger fade in
      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });
      
      this.loadedImages.add(src);
      
      // Dispatch custom event
      img.dispatchEvent(new CustomEvent('imageLoaded', {
        detail: { src: src }
      }));
    };
    
    imageLoader.onerror = () => {
      img.classList.add('lazy-error');
      console.warn('Failed to load image:', src);
    };
    
    imageLoader.src = src;
  }

  enableEffects(element) {
    // Enable AOS animations
    if (element.hasAttribute('data-aos')) {
      element.classList.add('aos-animate');
    }

    // Enable portfolio hover effects
    if (element.classList.contains('portfolio-wrap')) {
      element.classList.add('effects-enabled');
    }

    // Enable other heavy effects
    element.classList.add('lazy-effects-loaded');
  }

  createPlaceholder(img) {
    // Create a simple SVG placeholder
    const width = img.getAttribute('width') || 400;
    const height = img.getAttribute('height') || 300;
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial, sans-serif' font-size='14'%3ELoading...%3C/text%3E%3C/svg%3E`;
  }

  preloadCriticalImages() {
    // Preload hero and above-the-fold images
    const criticalImages = document.querySelectorAll('img[data-critical], .hero-section img, .profile-image img');
    
    criticalImages.forEach(img => {
      if (img.src) {
        const preloader = new Image();
        preloader.src = img.src;
        this.loadedImages.add(img.src);
      }
    });
  }

  loadAllImages() {
    // Fallback for browsers without Intersection Observer
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
      }
    });
  }

  // Public method to manually load an image
  forceLoadImage(selector) {
    const img = document.querySelector(selector);
    if (img) {
      this.loadImage(img);
    }
  }

  // Public method to get loading statistics
  getStats() {
    return {
      loadedImages: this.loadedImages.size,
      totalImages: document.querySelectorAll('img').length,
      observerSupported: 'IntersectionObserver' in window
    };
  }
}

// Performance optimization for effects
class EffectsOptimizer {
  constructor() {
    this.reducedMotion = this.checkReducedMotion();
    this.init();
  }

  init() {
    if (this.reducedMotion) {
      this.disableAnimations();
    }
    
    this.optimizeScrollEffects();
  }

  checkReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  disableAnimations() {
    // Add CSS class to disable animations
    document.documentElement.classList.add('reduce-motion');
    
    // Disable AOS animations
    if (window.AOS) {
      AOS.init({ disable: true });
    }
  }

  optimizeScrollEffects() {
    // Throttle scroll events
    let ticking = false;
    
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Your scroll effects here
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', optimizedScroll, { passive: true });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize lazy loading
  window.lazyLoader = new LazyLoadingManager();
  
  // Initialize effects optimizer
  window.effectsOptimizer = new EffectsOptimizer();
  
  // Add loading states CSS if not present
  if (!document.querySelector('#lazy-loading-styles')) {
    const styles = document.createElement('style');
    styles.id = 'lazy-loading-styles';
    styles.textContent = `
      .lazy-loading {
        filter: blur(5px);
        transition: filter 0.3s ease-in-out;
      }
      
      .lazy-loaded {
        filter: none;
      }
      
      .lazy-error {
        background: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
      }
      
      .lazy-error::after {
        content: '⚠️ Image failed to load';
        color: #666;
        font-size: 14px;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .reduce-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(styles);
  }
  
  console.log('🚀 Lazy Loading System initialized');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LazyLoadingManager, EffectsOptimizer };
}