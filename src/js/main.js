/**
 * SnapFolio Main Application
 * Entry point for the portfolio application
 */

import { APP_CONFIG, validateConfig } from './config/app.config.js';
import { Logger, Performance, DOM } from './utils/helpers.js';
import navigationManager from './modules/navigation.module.js';
import contactFormManager from './modules/contact.module.js';
import languageManager from './modules/translations.module.js';
import databaseManager from './services/supabase.service.js';

/**
 * Main Application Class
 */
class SnapFolioApp {
  constructor() {
    this.isInitialized = false;
    this.modules = new Map();
    this.startTime = performance.now();
    
    Logger.info('SnapFolio App constructor called');
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      Logger.info('🚀 Initializing SnapFolio Application...');
      
      // Validate configuration
      const configValidation = validateConfig();
      if (!configValidation.isValid) {
        Logger.error('Configuration validation failed:', configValidation.errors);
        this.showConfigurationError(configValidation.errors);
        return;
      }
      
      // Initialize core modules
      await this.initializeModules();
      
      // Initialize third-party libraries
      this.initializeLibraries();
      
      // Initialize analytics
      this.initializeAnalytics();
      
      // Setup global error handling
      this.setupErrorHandling();
      
      // Setup performance monitoring
      this.setupPerformanceMonitoring();
      
      // Mark as initialized
      this.isInitialized = true;
      
      const initTime = performance.now() - this.startTime;
      Logger.success(`✅ SnapFolio initialized successfully in ${initTime.toFixed(2)}ms`);
      
      // Track initialization
      this.trackAppInitialization(true, initTime);
      
    } catch (error) {
      Logger.error('❌ Failed to initialize SnapFolio:', error);
      this.trackAppInitialization(false, 0, error.message);
      this.showInitializationError(error);
    }
  }

  /**
   * Initialize core application modules
   */
  async initializeModules() {
    const moduleInitializers = [
      { name: 'database', manager: databaseManager, priority: 1 },
      { name: 'language', manager: languageManager, priority: 2 },
      { name: 'navigation', manager: navigationManager, priority: 3 },
      { name: 'contact', manager: contactFormManager, priority: 4 }
    ];

    // Sort by priority
    moduleInitializers.sort((a, b) => a.priority - b.priority);

    for (const { name, manager } of moduleInitializers) {
      try {
        Logger.info(`Initializing ${name} module...`);
        
        if (typeof manager.init === 'function') {
          await manager.init();
          this.modules.set(name, manager);
          Logger.success(`${name} module initialized`);
        } else {
          Logger.warn(`${name} module does not have init method`);
        }
      } catch (error) {
        Logger.error(`Failed to initialize ${name} module:`, error);
        // Continue with other modules
      }
    }
  }

  /**
   * Initialize third-party libraries
   */
  initializeLibraries() {
    try {
      // Initialize AOS (Animate On Scroll)
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          mirror: false,
          offset: 100
        });
        Logger.info('AOS initialized');
      }

      // Initialize Typed.js
      this.initializeTyped();

      // Initialize GLightbox
      if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
          selector: '.glightbox',
          touchNavigation: true,
          loop: true,
          autoplayVideos: false
        });
        Logger.info('GLightbox initialized');
      }

      // Initialize Swiper
      this.initializeSwiper();

      // Initialize Isotope (Portfolio filter)
      this.initializeIsotope();

      // Initialize PureCounter
      if (typeof PureCounter !== 'undefined') {
        new PureCounter();
        Logger.info('PureCounter initialized');
      }

      // Initialize Waypoints
      this.initializeWaypoints();

      Logger.success('Third-party libraries initialized');
    } catch (error) {
      Logger.error('Error initializing libraries:', error);
    }
  }

  /**
   * Initialize Typed.js
   */
  initializeTyped() {
    const typedElement = DOM.select('.typed');
    if (!typedElement || typeof Typed === 'undefined') {
      return;
    }

    try {
      const currentTranslations = languageManager.getCurrentTranslations();
      const typedStrings = currentTranslations.hero?.roles || [
        'Desarrollador de Software',
        'Especialista en Seguridad',
        'Consultor Tecnológico'
      ];

      window.typedInstance = new Typed('.typed', {
        strings: typedStrings,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
      });

      Logger.info('Typed.js initialized');
    } catch (error) {
      Logger.error('Error initializing Typed.js:', error);
    }
  }

  /**
   * Initialize Swiper
   */
  initializeSwiper() {
    if (typeof Swiper === 'undefined') return;

    try {
      // Portfolio Swiper
      const portfolioSwiper = DOM.select('.portfolio-details-slider');
      if (portfolioSwiper) {
        new Swiper(portfolioSwiper, {
          speed: 400,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          }
        });
      }

      // Testimonials Swiper
      const testimonialsSwiper = DOM.select('.testimonials-slider');
      if (testimonialsSwiper) {
        new Swiper(testimonialsSwiper, {
          speed: 600,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          slidesPerView: 'auto',
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20
            }
          }
        });
      }

      Logger.info('Swiper initialized');
    } catch (error) {
      Logger.error('Error initializing Swiper:', error);
    }
  }

  /**
   * Initialize Isotope for portfolio filtering
   */
  initializeIsotope() {
    if (typeof Isotope === 'undefined') return;

    try {
      const portfolioContainer = DOM.select('.portfolio-container');
      const portfolioFilters = DOM.selectAll('#portfolio-flters li');

      if (portfolioContainer) {
        // Initialize Isotope
        const iso = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });

        // Filter functionality
        portfolioFilters.forEach(filter => {
          DOM.on(filter, 'click', function(e) {
            e.preventDefault();
            
            // Remove active class from all filters
            portfolioFilters.forEach(f => f.classList.remove('filter-active'));
            
            // Add active class to clicked filter
            this.classList.add('filter-active');
            
            // Filter items
            const filterValue = this.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });
          });
        });

        Logger.info('Isotope initialized');
      }
    } catch (error) {
      Logger.error('Error initializing Isotope:', error);
    }
  }

  /**
   * Initialize Waypoints
   */
  initializeWaypoints() {
    if (typeof Waypoint === 'undefined') return;

    try {
      // Skills progress bars
      const skillsSection = DOM.select('#skills');
      if (skillsSection) {
        new Waypoint({
          element: skillsSection,
          handler: function() {
            const progressBars = DOM.selectAll('.progress .progress-bar');
            progressBars.forEach(bar => {
              const value = bar.getAttribute('aria-valuenow');
              bar.style.width = value + '%';
            });
          },
          offset: '80%'
        });
      }

      Logger.info('Waypoints initialized');
    } catch (error) {
      Logger.error('Error initializing Waypoints:', error);
    }
  }

  /**
   * Initialize analytics
   */
  initializeAnalytics() {
    if (!APP_CONFIG.features.analytics) {
      Logger.info('Analytics disabled in configuration');
      return;
    }

    try {
      // Google Analytics
      const gaTrackingId = APP_CONFIG.analytics.googleAnalytics.trackingId;
      if (gaTrackingId && typeof gtag === 'function') {
        gtag('config', gaTrackingId, {
          page_title: document.title,
          page_location: window.location.href
        });
        Logger.info('Google Analytics initialized');
      }

      // Track visitor data
      this.trackVisitorData();

      Logger.success('Analytics initialized');
    } catch (error) {
      Logger.error('Error initializing analytics:', error);
    }
  }

  /**
   * Track visitor data
   */
  async trackVisitorData() {
    try {
      const visitorData = {
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || null
      };

      await databaseManager.saveVisitorData(visitorData);
    } catch (error) {
      Logger.warn('Failed to track visitor data:', error);
    }
  }

  /**
   * Track app initialization
   */
  trackAppInitialization(success, initTime, error = null) {
    try {
      if (typeof gtag === 'function') {
        gtag('event', 'app_initialization', {
          event_category: 'Performance',
          event_label: success ? 'Success' : 'Error',
          value: Math.round(initTime),
          custom_map: {
            init_time: initTime,
            error_message: error
          }
        });
      }
    } catch (trackingError) {
      Logger.warn('Failed to track app initialization:', trackingError);
    }
  }

  /**
   * Setup global error handling
   */
  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      Logger.error('Global error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      Logger.error('Unhandled promise rejection:', event.reason);
    });

    Logger.info('Global error handling setup');
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    if (!APP_CONFIG.app.debugMode) return;

    try {
      // Monitor page load performance
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            Logger.info('Page Performance:', {
              domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
              loadComplete: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
              totalTime: Math.round(perfData.loadEventEnd - perfData.fetchStart)
            });
          }
        }, 0);
      });

      Logger.info('Performance monitoring setup');
    } catch (error) {
      Logger.warn('Failed to setup performance monitoring:', error);
    }
  }

  /**
   * Show configuration error
   */
  showConfigurationError(errors) {
    const errorMessage = `
      <div class="alert alert-danger" role="alert">
        <h4>Configuration Error</h4>
        <p>The application could not start due to configuration issues:</p>
        <ul>
          ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
        <p>Please check your environment variables and try again.</p>
      </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', errorMessage);
  }

  /**
   * Show initialization error
   */
  showInitializationError(error) {
    if (APP_CONFIG.app.debugMode) {
      const errorMessage = `
        <div class="alert alert-warning" role="alert">
          <h4>Initialization Warning</h4>
          <p>Some features may not work properly due to initialization errors.</p>
          <details>
            <summary>Error Details</summary>
            <pre>${error.message}\n${error.stack}</pre>
          </details>
        </div>
      `;
      
      document.body.insertAdjacentHTML('afterbegin', errorMessage);
    }
  }

  /**
   * Get module by name
   */
  getModule(name) {
    return this.modules.get(name);
  }

  /**
   * Check if app is initialized
   */
  isReady() {
    return this.isInitialized;
  }

  /**
   * Destroy the application
   */
  destroy() {
    try {
      // Destroy all modules
      this.modules.forEach((module, name) => {
        if (typeof module.destroy === 'function') {
          module.destroy();
          Logger.info(`${name} module destroyed`);
        }
      });

      // Clear modules
      this.modules.clear();

      // Destroy typed instance
      if (window.typedInstance) {
        window.typedInstance.destroy();
        window.typedInstance = null;
      }

      this.isInitialized = false;
      Logger.info('SnapFolio App destroyed');
    } catch (error) {
      Logger.error('Error destroying app:', error);
    }
  }
}

// Create app instance
const app = new SnapFolioApp();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

// Export for global access
if (typeof window !== 'undefined') {
  window.SnapFolioApp = app;
}

export default app;