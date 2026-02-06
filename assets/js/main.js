/**
 * Template Name: SnapFolio
 * Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
 * Updated: Jul 21 2025 with Bootstrap v5.3.7
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function() {
  'use strict';

  // Utility functions
  const utils = {
    /**
     * Safely query a DOM element
     * @param {string} selector - CSS selector
     * @returns {Element|null} - Found element or null
     */
    querySelector: (selector) => {
      try {
        return document.querySelector(selector);
      } catch (error) {
        console.warn(`Invalid selector: ${selector}`);
        return null;
      }
    },

    /**
     * Safely query multiple DOM elements
     * @param {string} selector - CSS selector
     * @returns {NodeList} - Found elements
     */
    querySelectorAll: (selector) => {
      try {
        return document.querySelectorAll(selector);
      } catch (error) {
        console.warn(`Invalid selector: ${selector}`);
        return [];
      }
    },

    /**
     * Add event listener with error handling
     * @param {Element} element - Target element
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     */
    addEventListenerSafe: (element, event, handler) => {
      if (element && typeof handler === 'function') {
        element.addEventListener(event, handler);
      }
    }
  };

  /**
   * Header toggle functionality
   */
  const initHeaderToggle = () => {
    const headerToggleBtn = utils.querySelector('.header-toggle');
    const header = utils.querySelector('#header');

    if (!headerToggleBtn || !header) return;

    const toggleHeader = () => {
      header.classList.toggle('header-show');
      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
    };

    utils.addEventListenerSafe(headerToggleBtn, 'click', toggleHeader);
  };

  /**
   * Hide mobile nav on same-page/hash links
   */
  const initMobileNavHide = () => {
    const navLinks = utils.querySelectorAll('#navmenu a');
    const header = utils.querySelector('#header');
    const headerToggleBtn = utils.querySelector('.header-toggle');

    if (!header || !headerToggleBtn) return;

    const hideHeader = () => {
      if (header.classList.contains('header-show')) {
        header.classList.remove('header-show');
        headerToggleBtn.classList.add('bi-list');
        headerToggleBtn.classList.remove('bi-x');
      }
    };

    navLinks.forEach(navLink => {
      utils.addEventListenerSafe(navLink, 'click', hideHeader);
    });
  };

  /**
   * Toggle mobile nav dropdowns
   */
  const initMobileDropdowns = () => {
    const dropdownToggles = utils.querySelectorAll('.navmenu .toggle-dropdown');

    const toggleDropdown = function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      
      const parentNode = this.parentNode;
      const nextSibling = parentNode?.nextElementSibling;
      
      if (parentNode) {
        parentNode.classList.toggle('active');
      }
      if (nextSibling) {
        nextSibling.classList.toggle('dropdown-active');
      }
    };

    dropdownToggles.forEach(toggle => {
      utils.addEventListenerSafe(toggle, 'click', toggleDropdown);
    });
  };

  /**
   * Preloader functionality
   */
  const initPreloader = () => {
    const preloader = utils.querySelector('#preloader');
    
    if (preloader) {
      const removePreloader = () => {
        preloader.remove();
      };
      
      utils.addEventListenerSafe(window, 'load', removePreloader);
    }
  };

  /**
   * Scroll to top button functionality
   */
  const initScrollTop = () => {
    const scrollTopBtn = utils.querySelector('.scroll-top');
    
    if (!scrollTopBtn) return;

    const toggleScrollTopVisibility = () => {
      const shouldShow = window.scrollY > 100;
      scrollTopBtn.classList.toggle('active', shouldShow);
    };

    const scrollToTop = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    utils.addEventListenerSafe(scrollTopBtn, 'click', scrollToTop);
    utils.addEventListenerSafe(window, 'load', toggleScrollTopVisibility);
    utils.addEventListenerSafe(document, 'scroll', toggleScrollTopVisibility);
  };

  /**
   * Animation on scroll initialization
   */
  const initAOS = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  };

  /**
   * Initialize Typed.js
   */
  const initTyped = () => {
    const typedElement = utils.querySelector('.typed');
    
    if (!typedElement || typeof Typed === 'undefined') return;

    const typedItems = typedElement.getAttribute('data-typed-items');
    if (!typedItems) return;

    const typedStrings = typedItems.split(',').map(str => str.trim());
    
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  };

  /**
   * Initialize Pure Counter
   */
  const initPureCounter = () => {
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }
  };

  /**
   * Animate skills items on reveal
   */
  const initSkillsAnimation = () => {
    if (typeof Waypoint === 'undefined') return;

    const skillsElements = utils.querySelectorAll('.skills-animation');
    
    skillsElements.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function() {
          const progressBars = item.querySelectorAll('.progress .progress-bar');
          progressBars.forEach(bar => {
            const value = bar.getAttribute('aria-valuenow');
            if (value) {
              bar.style.width = `${value}%`;
            }
          });
        }
      });
    });
  };

  /**
   * Initialize GLightbox
   */
  const initGLightbox = () => {
    if (typeof GLightbox !== 'undefined') {
      GLightbox({
        selector: '.glightbox'
      });
    }
  };

  /**
   * Initialize Isotope layout and filters
   */
  const initIsotope = () => {
    if (typeof Isotope === 'undefined' || typeof imagesLoaded === 'undefined') return;

    const isotopeLayouts = utils.querySelectorAll('.isotope-layout');
    
    isotopeLayouts.forEach((isotopeItem) => {
      const layout = isotopeItem.getAttribute('data-layout') || 'masonry';
      const filter = isotopeItem.getAttribute('data-default-filter') || '*';
      const sort = isotopeItem.getAttribute('data-sort') || 'original-order';
      const container = isotopeItem.querySelector('.isotope-container');
      
      if (!container) return;

      let isotopeInstance;
      
      imagesLoaded(container, () => {
        isotopeInstance = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      const filterButtons = isotopeItem.querySelectorAll('.isotope-filters li');
      
      filterButtons.forEach((button) => {
        const handleFilterClick = function() {
          // Remove active class from all buttons
          const activeButton = isotopeItem.querySelector('.isotope-filters .filter-active');
          if (activeButton) {
            activeButton.classList.remove('filter-active');
          }
          
          // Add active class to clicked button
          this.classList.add('filter-active');
          
          // Apply filter
          if (isotopeInstance) {
            const filterValue = this.getAttribute('data-filter');
            isotopeInstance.arrange({ filter: filterValue });
          }
          
          // Reinitialize AOS if available
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        };
        
        utils.addEventListenerSafe(button, 'click', handleFilterClick);
      });
    });
  };

  /**
   * Initialize Swiper sliders
   */
  const initSwiper = () => {
    if (typeof Swiper === 'undefined') return;

    const swiperElements = utils.querySelectorAll('.init-swiper');
    
    swiperElements.forEach((swiperElement) => {
      const configElement = swiperElement.querySelector('.swiper-config');
      if (!configElement) return;
      
      try {
        const config = JSON.parse(configElement.innerHTML.trim());
        
        // Initialize Swiper with configuration
        new Swiper(swiperElement, config);
        
      } catch (error) {
        console.error('Error initializing Swiper:', error, swiperElement);
      }
    });
  };

  /**
   * Mobile dropdown functionality
   */
  const initMobileDropdowns = () => {
    const dropdownToggles = utils.querySelectorAll('.navmenu .toggle-dropdown');
    
    dropdownToggles.forEach((toggle) => {
      utils.addEventListenerSafe(toggle, 'click', (e) => {
        e.preventDefault();
        const dropdown = toggle.parentNode.nextElementSibling;
        if (dropdown) {
          dropdown.classList.toggle('dropdown-active');
          toggle.classList.toggle('bi-chevron-up');
          toggle.classList.toggle('bi-chevron-down');
        }
      });
    });
  };

  /**
   * Smooth scrolling for hash links
   */
  const initHashLinkScrolling = () => {
    const hashLinks = utils.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    hashLinks.forEach((link) => {
      utils.addEventListenerSafe(link, 'click', (e) => {
        const targetId = link.getAttribute('href');
        const targetElement = utils.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 60;
          const elementPosition = targetElement.offsetTop;
          const offsetPosition = elementPosition - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  /**
   * Navigation menu scrollspy
   */
  const initNavMenuScrollspy = () => {
    const navLinks = utils.querySelectorAll('#navmenu a[href^="#"]');
    if (navLinks.length === 0) return;

    const sections = [];
    navLinks.forEach((link) => {
      const targetId = link.getAttribute('href');
      const targetElement = utils.querySelector(targetId);
      if (targetElement) {
        sections.push({
          element: targetElement,
          link: link,
          id: targetId
        });
      }
    });

    const updateActiveLink = () => {
      const scrollPosition = window.scrollY + 200;
      
      let activeSection = null;
      sections.forEach((section) => {
        const sectionTop = section.element.offsetTop;
        const sectionBottom = sectionTop + section.element.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          activeSection = section;
        }
      });
      
      // Remove active class from all links
      navLinks.forEach((link) => {
        link.classList.remove('active');
      });
      
      // Add active class to current section link
      if (activeSection) {
        activeSection.link.classList.add('active');
      }
    };

    utils.addEventListenerSafe(window, 'scroll', updateActiveLink);
    utils.addEventListenerSafe(window, 'load', updateActiveLink);
  };

  /**
   * Contact Form Handler with Supabase
   */
  const initContactForm = () => {
    const contactForm = utils.querySelector('#contact-form');
    if (!contactForm) return;

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const elements = {
        loading: contactForm.querySelector('.loading'),
        error: contactForm.querySelector('.error-message'),
        success: contactForm.querySelector('.sent-message'),
        submit: contactForm.querySelector('button[type="submit"]')
      };

      // Reset UI state
      const setElementDisplay = (element, display) => {
        if (element) element.style.display = display;
      };
      
      setElementDisplay(elements.loading, 'block');
      setElementDisplay(elements.error, 'none');
      setElementDisplay(elements.success, 'none');
      
      if (elements.submit) {
        elements.submit.disabled = true;
      }
      
      try {
        // Validate required fields
        const requiredFields = ['name', 'email', 'subject', 'message'];
        const contactData = {};
        
        for (const field of requiredFields) {
          const value = formData.get(field);
          if (!value || !value.trim()) {
            throw new Error(`El campo ${field} es requerido`);
          }
          contactData[field] = value.trim();
        }
        
        contactData.created_at = new Date().toISOString();
        
        // Check if DatabaseManager is available
        if (!window.DatabaseManager || typeof window.DatabaseManager.saveContactData !== 'function') {
          throw new Error('Sistema de base de datos no disponible');
        }
        
        // Save to Supabase
        const result = await window.DatabaseManager.saveContactData(contactData);
        
        if (result.success) {
          setElementDisplay(elements.loading, 'none');
          setElementDisplay(elements.success, 'block');
          contactForm.reset();
        } else {
          throw new Error(result.error || 'Error al enviar el mensaje');
        }
        
      } catch (error) {
        console.error('Contact form error:', error);
        setElementDisplay(elements.loading, 'none');
        
        if (elements.error) {
          elements.error.textContent = error.message || 'Error al enviar el mensaje. Por favor, intenta de nuevo.';
          setElementDisplay(elements.error, 'block');
        }
      } finally {
        if (elements.submit) {
          elements.submit.disabled = false;
        }
      }
    };

    utils.addEventListenerSafe(contactForm, 'submit', handleFormSubmit);
  };

  // Initialize all components when DOM is ready
  const initializeApp = () => {
    initHeaderToggle();
    initMobileNavHide();
    initMobileDropdowns();
    initPreloader();
    initScrollTop();
    initTyped();
    initPureCounter();
    initSkillsAnimation();
    initGLightbox();
    initIsotope();
    initHashLinkScrolling();
    initNavMenuScrollspy();
    initContactForm();
  };

  // Initialize AOS and Swiper after window load
  const initializeAfterLoad = () => {
    initAOS();
    initSwiper();
  };

  // Start the application
  if (document.readyState === 'loading') {
    utils.addEventListenerSafe(document, 'DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }
  
  utils.addEventListenerSafe(window, 'load', initializeAfterLoad);

})();