/**
 * Utility Helper Functions
 * Common utility functions used throughout the application
 */

import { APP_CONFIG } from '../config/app.config.js';

/**
 * DOM Utilities
 */
export const DOM = {
  /**
   * Safe querySelector with error handling
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (default: document)
   * @returns {Element|null}
   */
  select(selector, context = document) {
    try {
      return context.querySelector(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
      return null;
    }
  },

  /**
   * Safe querySelectorAll with error handling
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (default: document)
   * @returns {NodeList}
   */
  selectAll(selector, context = document) {
    try {
      return context.querySelectorAll(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
      return [];
    }
  },

  /**
   * Add event listener with error handling
   * @param {Element} element - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   */
  on(element, event, handler, options = {}) {
    if (!element || typeof handler !== 'function') {
      console.warn('Invalid element or handler for event listener');
      return;
    }
    
    try {
      element.addEventListener(event, handler, options);
    } catch (error) {
      console.error('Error adding event listener:', error);
    }
  },

  /**
   * Remove event listener with error handling
   * @param {Element} element - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   */
  off(element, event, handler) {
    if (!element || typeof handler !== 'function') {
      console.warn('Invalid element or handler for event listener removal');
      return;
    }
    
    try {
      element.removeEventListener(event, handler);
    } catch (error) {
      console.error('Error removing event listener:', error);
    }
  },

  /**
   * Check if element is visible in viewport
   * @param {Element} element - Target element
   * @returns {boolean}
   */
  isInViewport(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Smooth scroll to element
   * @param {Element|string} target - Target element or selector
   * @param {number} offset - Scroll offset
   */
  scrollTo(target, offset = APP_CONFIG.ui.navigation.offset) {
    const element = typeof target === 'string' ? this.select(target) : target;
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Validation Utilities
 */
export const Validator = {
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  isValidEmail(email) {
    return APP_CONFIG.contact.validation.email.pattern.test(email);
  },

  /**
   * Validate string length
   * @param {string} str - String to validate
   * @param {number} min - Minimum length
   * @param {number} max - Maximum length
   * @returns {boolean}
   */
  isValidLength(str, min, max) {
    const length = str ? str.trim().length : 0;
    return length >= min && length <= max;
  },

  /**
   * Validate required field
   * @param {any} value - Value to validate
   * @returns {boolean}
   */
  isRequired(value) {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },

  /**
   * Sanitize HTML input
   * @param {string} str - String to sanitize
   * @returns {string}
   */
  sanitizeHtml(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }
};

/**
 * Storage Utilities
 */
export const Storage = {
  /**
   * Set item in localStorage with error handling
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @returns {boolean} Success status
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
      return false;
    }
  },

  /**
   * Get item from localStorage with error handling
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if not found
   * @returns {any}
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} Success status
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
      return false;
    }
  },

  /**
   * Clear all localStorage
   * @returns {boolean} Success status
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
      return false;
    }
  }
};

/**
 * Performance Utilities
 */
export const Performance = {
  /**
   * Debounce function execution
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @param {boolean} immediate - Execute immediately
   * @returns {Function}
   */
  debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  /**
   * Throttle function execution
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function}
   */
  throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Lazy load images
   * @param {string} selector - Image selector
   */
  lazyLoadImages(selector = 'img[data-src]') {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      DOM.selectAll(selector).forEach(img => imageObserver.observe(img));
    }
  }
};

/**
 * URL Utilities
 */
export const URL = {
  /**
   * Get URL parameters
   * @param {string} param - Parameter name
   * @returns {string|null}
   */
  getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  /**
   * Set URL parameter
   * @param {string} param - Parameter name
   * @param {string} value - Parameter value
   */
  setParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
  },

  /**
   * Remove URL parameter
   * @param {string} param - Parameter name
   */
  removeParam(param) {
    const url = new URL(window.location);
    url.searchParams.delete(param);
    window.history.pushState({}, '', url);
  }
};

/**
 * Logger Utility
 */
export const Logger = {
  /**
   * Log info message
   * @param {string} message - Log message
   * @param {...any} args - Additional arguments
   */
  info(message, ...args) {
    if (APP_CONFIG.app.debugMode) {
      console.log(`ℹ️ ${message}`, ...args);
    }
  },

  /**
   * Log warning message
   * @param {string} message - Warning message
   * @param {...any} args - Additional arguments
   */
  warn(message, ...args) {
    if (APP_CONFIG.app.debugMode) {
      console.warn(`⚠️ ${message}`, ...args);
    }
  },

  /**
   * Log error message
   * @param {string} message - Error message
   * @param {...any} args - Additional arguments
   */
  error(message, ...args) {
    console.error(`❌ ${message}`, ...args);
  },

  /**
   * Log success message
   * @param {string} message - Success message
   * @param {...any} args - Additional arguments
   */
  success(message, ...args) {
    if (APP_CONFIG.app.debugMode) {
      console.log(`✅ ${message}`, ...args);
    }
  }
};