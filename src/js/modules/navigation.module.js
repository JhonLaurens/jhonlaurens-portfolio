/**
 * Navigation Module
 * Handles all navigation-related functionality
 */

import { DOM, Performance, Logger } from '../utils/helpers.js';
import { APP_CONFIG } from '../config/app.config.js';

/**
 * Navigation Manager Class
 */
class NavigationManager {
  constructor() {
    this.navbar = null;
    this.navLinks = [];
    this.mobileNavToggle = null;
    this.scrollOffset = APP_CONFIG.ui.navigation.offset;
    this.isScrolling = false;
    this.activeSection = null;
    
    // Throttled scroll handler
    this.handleScroll = Performance.throttle(this.onScroll.bind(this), 100);
    
    Logger.info('Navigation Manager initialized');
  }

  /**
   * Initialize navigation functionality
   */
  init() {
    try {
      this.cacheElements();
      this.bindEvents();
      this.initSmoothScrolling();
      this.initScrollSpy();
      this.initMobileMenu();
      this.updateActiveLink();
      
      Logger.success('Navigation initialized successfully');
    } catch (error) {
      Logger.error('Failed to initialize navigation', error);
    }
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.navbar = DOM.select('#navmenu');
    this.navLinks = DOM.selectAll('#navmenu a');
    this.allHashLinks = DOM.selectAll('a[href^="#"]:not([href="#"])');
    this.mobileNavToggle = DOM.select('.header-toggle');
    this.sections = DOM.selectAll('section[id]');
    
    if (!this.navbar) {
      Logger.warn('Navbar element not found');
    }
    
    Logger.info(`Cached ${this.navLinks.length} navigation links`);
    Logger.info(`Cached ${this.allHashLinks.length} hash links`);
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Scroll event for navbar styling and scrollspy
    DOM.on(window, 'scroll', this.handleScroll);
    
    // Hash link clicks (navigation + hero buttons)
    this.allHashLinks.forEach(link => {
      DOM.on(link, 'click', this.handleNavLinkClick.bind(this));
    });
    
    // Mobile menu toggle
    if (this.mobileNavToggle) {
      DOM.on(this.mobileNavToggle, 'click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.toggleMobileMenu();
      });
    }
    
    // Close mobile menu on link click
    this.navLinks.forEach(link => {
      DOM.on(link, 'click', this.closeMobileMenu.bind(this));
    });
    
    // Close mobile menu on outside click
    DOM.on(document, 'click', this.handleOutsideClick.bind(this));
    
    // Handle browser back/forward
    DOM.on(window, 'hashchange', this.handleHashChange.bind(this));
    
    Logger.info('Navigation events bound successfully');
  }

  /**
   * Handle navigation link clicks
   * @param {Event} event - Click event
   */
  handleNavLinkClick(event) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');
    
    // Only handle hash links
    if (!href || !href.startsWith('#')) {
      return;
    }
    
    event.preventDefault();
    
    const targetId = href.substring(1);
    const targetElement = DOM.select(`#${targetId}`);
    
    if (targetElement) {
      this.scrollToSection(targetElement);
      this.updateURL(href);
      this.closeMobileMenu();
      
      Logger.info(`Navigated to section: ${targetId}`);
    } else {
      Logger.warn(`Target section not found: ${targetId}`);
    }
  }

  /**
   * Handle hash change events
   */
  handleHashChange() {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = DOM.select(hash);
      if (targetElement) {
        this.scrollToSection(targetElement);
      }
    }
  }

  /**
   * Handle outside clicks to close mobile menu
   * @param {Event} event - Click event
   */
  handleOutsideClick(event) {
    if (!this.navbar || !this.navbar.parentElement.classList.contains('header-show')) {
      return;
    }
    const isClickInsideNav = this.navbar.contains(event.target);
    const isToggleButton = this.mobileNavToggle && this.mobileNavToggle.contains(event.target);
    
    if (!isClickInsideNav && !isToggleButton) {
      this.closeMobileMenu();
    }
  }

  /**
   * Initialize smooth scrolling
   */
  initSmoothScrolling() {
    if (!APP_CONFIG.ui.navigation.smoothScroll) {
      Logger.info('Smooth scrolling disabled in configuration');
      return;
    }
    
    // Handle initial hash on page load
    if (window.location.hash) {
      setTimeout(() => {
        const targetElement = DOM.select(window.location.hash);
        if (targetElement) {
          this.scrollToSection(targetElement);
        }
      }, 100);
    }
    
    Logger.info('Smooth scrolling initialized');
  }

  /**
   * Initialize scroll spy functionality
   */
  initScrollSpy() {
    // Initial update
    this.updateActiveLink();
    
    Logger.info('Scroll spy initialized');
  }

  /**
   * Initialize mobile menu functionality
   */
  initMobileMenu() {
    if (!this.mobileNavToggle) {
      Logger.warn('Mobile nav toggle not found');
      return;
    }
    
    // Ensure mobile menu is closed on desktop
    const checkScreenSize = () => {
      if (window.innerWidth > 991) {
        this.closeMobileMenu();
      }
    };
    
    DOM.on(window, 'resize', Performance.debounce(checkScreenSize, 250));
    
    Logger.info('Mobile menu initialized');
  }

  /**
   * Scroll to a specific section
   * @param {Element} element - Target element
   */
  scrollToSection(element) {
    if (!element) return;
    
    this.isScrolling = true;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - this.scrollOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Reset scrolling flag after animation
    setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  /**
   * Update URL without triggering page reload
   * @param {string} hash - Hash to set
   */
  updateURL(hash) {
    if (history.pushState) {
      history.pushState(null, null, hash);
    } else {
      window.location.hash = hash;
    }
  }

  /**
   * Handle scroll events
   */
  onScroll() {
    this.updateNavbarStyle();
    
    if (!this.isScrolling) {
      this.updateActiveLink();
    }
  }

  /**
   * Update navbar styling based on scroll position
   */
  updateNavbarStyle() {
    if (!this.navbar) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      this.navbar.classList.add('navbar-scrolled');
    } else {
      this.navbar.classList.remove('navbar-scrolled');
    }
  }

  /**
   * Update active navigation link based on current section
   */
  updateActiveLink() {
    if (!this.sections.length || !this.navLinks.length) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    let currentSection = null;
    
    // Find the current section
    this.sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + scrollTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollTop >= sectionTop - this.scrollOffset - 200 && 
          scrollTop < sectionTop + sectionHeight - this.scrollOffset) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Handle case when at the bottom of the page
    if (scrollTop + windowHeight >= document.documentElement.scrollHeight - 100) {
      const lastSection = this.sections[this.sections.length - 1];
      if (lastSection) {
        currentSection = lastSection.getAttribute('id');
      }
    }
    
    // Update active link if section changed
    if (currentSection && currentSection !== this.activeSection) {
      this.setActiveLink(currentSection);
      this.activeSection = currentSection;
    }
  }

  /**
   * Set active navigation link
   * @param {string} sectionId - Section ID to activate
   */
  setActiveLink(sectionId) {
    // Remove active class from all links
    this.navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current link
    const activeLink = DOM.select(`#navmenu a[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      Logger.info(`Active section: ${sectionId}`);
    }
  }

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu() {
    if (!this.navbar || !this.mobileNavToggle) return;
    
    const isOpen = this.navbar.parentElement.classList.contains('header-show');
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  /**
   * Open mobile menu
   */
  openMobileMenu() {
    if (!this.navbar || !this.mobileNavToggle) return;
    
    this.navbar.parentElement.classList.add('header-show');
    this.mobileNavToggle.classList.add('bi-x');
    this.mobileNavToggle.classList.remove('bi-list');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    Logger.info('Mobile menu opened');
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    if (!this.navbar || !this.mobileNavToggle) return;
    
    this.navbar.parentElement.classList.remove('header-show');
    this.mobileNavToggle.classList.remove('bi-x');
    this.mobileNavToggle.classList.add('bi-list');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    Logger.info('Mobile menu closed');
  }

  /**
   * Get current active section
   * @returns {string|null}
   */
  getCurrentSection() {
    return this.activeSection;
  }

  /**
   * Navigate to specific section programmatically
   * @param {string} sectionId - Section ID to navigate to
   */
  navigateToSection(sectionId) {
    const targetElement = DOM.select(`#${sectionId}`);
    if (targetElement) {
      this.scrollToSection(targetElement);
      this.updateURL(`#${sectionId}`);
      this.closeMobileMenu();
    }
  }

  /**
   * Destroy navigation manager
   */
  destroy() {
    // Remove event listeners
    DOM.off(window, 'scroll', this.handleScroll);
    DOM.off(window, 'hashchange', this.handleHashChange);
    
    this.navLinks.forEach(link => {
      DOM.off(link, 'click', this.handleNavLinkClick);
    });
    
    if (this.mobileNavToggle) {
      DOM.off(this.mobileNavToggle, 'click', this.toggleMobileMenu);
    }
    
    DOM.off(document, 'click', this.handleOutsideClick);
    
    Logger.info('Navigation manager destroyed');
  }
}

// Create and export instance
const navigationManager = new NavigationManager();

// Export for global access (backward compatibility)
if (typeof window !== 'undefined') {
  window.NavigationManager = navigationManager;
}

export default navigationManager;
export { NavigationManager };