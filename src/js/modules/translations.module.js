/**
 * Translations Module
 * Handles internationalization and language switching
 */

import { DOM, Storage, Logger } from '../utils/helpers.js';
import { APP_CONFIG } from '../config/app.config.js';

/**
 * Translation data
 */
const TRANSLATIONS = {
  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      services: 'Servicios',
      portfolio: 'Portafolio',
      contact: 'Contacto'
    },
    // Hero section
    hero: {
      greeting: 'Hola, soy',
      name: 'Jhon Laurens',
      roles: [
        'Desarrollador de Software',
        'Especialista en Seguridad',
        'Consultor Tecnológico'
      ],
      cta: 'Conoce mi trabajo'
    },
    // Hero buttons
    'hero-btn-work': 'Ver Mi Trabajo',
    'hero-btn-contact': 'Contactar',
    // About section
    about: {
      title: 'Acerca de Mí',
      subtitle: 'Desarrollador de Software & Especialista en Seguridad de la Información',
      description: 'Soy un desarrollador apasionado con experiencia en crear soluciones tecnológicas innovadoras y seguras. Me especializo en desarrollo full-stack y seguridad de la información.',
      details: {
        birthday: 'Cumpleaños',
        website: 'Sitio Web',
        phone: 'Teléfono',
        city: 'Ciudad',
        age: 'Edad',
        degree: 'Título',
        email: 'Email',
        freelance: 'Freelance'
      },
      stats: {
        projects: 'Proyectos Completados',
        experience: 'Años de Experiencia',
        clients: 'Clientes Satisfechos',
        awards: 'Certificaciones'
      }
    },
    // Services section
    services: {
      title: 'Servicios',
      subtitle: 'Soluciones tecnológicas profesionales adaptadas a tus necesidades',
      items: {
        webDev: {
          title: 'Desarrollo Web',
          description: 'Desarrollo de aplicaciones web modernas y responsivas utilizando las últimas tecnologías.'
        },
        mobileDev: {
          title: 'Desarrollo Móvil',
          description: 'Creación de aplicaciones móviles nativas e híbridas para iOS y Android.'
        },
        security: {
          title: 'Seguridad de la Información',
          description: 'Auditorías de seguridad, implementación de medidas de protección y consultoría.'
        },
        consulting: {
          title: 'Consultoría Tecnológica',
          description: 'Asesoramiento estratégico en tecnología para optimizar procesos empresariales.'
        },
        cloud: {
          title: 'Soluciones en la Nube',
          description: 'Migración y gestión de infraestructura en plataformas cloud como AWS y Azure.'
        },
        automation: {
          title: 'Automatización',
          description: 'Desarrollo de scripts y herramientas para automatizar procesos repetitivos.'
        }
      }
    },
    // Portfolio section
    portfolio: {
      title: 'Portafolio',
      subtitle: 'Algunos de mis trabajos más destacados',
      filters: {
        all: 'Todos',
        web: 'Web',
        mobile: 'Móvil',
        security: 'Seguridad'
      }
    },
    // Contact section
    contact: {
      title: 'Contacto',
      subtitle: '¿Tienes un proyecto en mente? ¡Hablemos!',
      info: {
        location: 'Ubicación',
        email: 'Email',
        phone: 'Teléfono'
      },
      form: {
        name: 'Tu Nombre',
        email: 'Tu Email',
        subject: 'Asunto',
        message: 'Mensaje',
        send: 'Enviar Mensaje',
        sending: 'Enviando...',
        success: '¡Mensaje enviado correctamente! Te contactaré pronto.',
        error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
      }
    },
    // Footer
    footer: {
      copyright: 'Todos los derechos reservados',
      designed: 'Diseñado por'
    },
    // Common
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      close: 'Cerrar',
      more: 'Ver más',
      less: 'Ver menos',
      download: 'Descargar',
      share: 'Compartir'
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact'
    },
    // Hero section
    hero: {
      greeting: 'Hello, I\'m',
      name: 'Jhon Laurens',
      roles: [
        'Software Developer',
        'Security Specialist',
        'Technology Consultant'
      ],
      cta: 'See my work'
    },
    // Hero buttons
    'hero-btn-work': 'View My Work',
    'hero-btn-contact': 'Get In Touch',
    // About section
    about: {
      title: 'About Me',
      subtitle: 'Software Developer & Information Security Specialist',
      description: 'I am a passionate developer with experience in creating innovative and secure technological solutions. I specialize in full-stack development and information security.',
      details: {
        birthday: 'Birthday',
        website: 'Website',
        phone: 'Phone',
        city: 'City',
        age: 'Age',
        degree: 'Degree',
        email: 'Email',
        freelance: 'Freelance'
      },
      stats: {
        projects: 'Completed Projects',
        experience: 'Years of Experience',
        clients: 'Satisfied Clients',
        awards: 'Certifications'
      }
    },
    // Services section
    services: {
      title: 'Services',
      subtitle: 'Professional technology solutions tailored to your needs',
      items: {
        webDev: {
          title: 'Web Development',
          description: 'Development of modern and responsive web applications using the latest technologies.'
        },
        mobileDev: {
          title: 'Mobile Development',
          description: 'Creation of native and hybrid mobile applications for iOS and Android.'
        },
        security: {
          title: 'Information Security',
          description: 'Security audits, implementation of protection measures and consulting.'
        },
        consulting: {
          title: 'Technology Consulting',
          description: 'Strategic technology advisory to optimize business processes.'
        },
        cloud: {
          title: 'Cloud Solutions',
          description: 'Migration and management of infrastructure on cloud platforms like AWS and Azure.'
        },
        automation: {
          title: 'Automation',
          description: 'Development of scripts and tools to automate repetitive processes.'
        }
      }
    },
    // Portfolio section
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Some of my most outstanding work',
      filters: {
        all: 'All',
        web: 'Web',
        mobile: 'Mobile',
        security: 'Security'
      }
    },
    // Contact section
    contact: {
      title: 'Contact',
      subtitle: 'Have a project in mind? Let\'s talk!',
      info: {
        location: 'Location',
        email: 'Email',
        phone: 'Phone'
      },
      form: {
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully! I will contact you soon.',
        error: 'Error sending message. Please try again.'
      }
    },
    // Footer
    footer: {
      copyright: 'All rights reserved',
      designed: 'Designed by'
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
      more: 'See more',
      less: 'See less',
      download: 'Download',
      share: 'Share'
    }
  }
};

/**
 * Language Manager Class
 */
class LanguageManager {
  constructor() {
    this.currentLanguage = 'es'; // Default language
    this.supportedLanguages = ['es', 'en'];
    this.languageButtons = [];
    this.typedInstance = null;
    this.storageKey = 'snapfolio_language';
    
    Logger.info('Language Manager initialized');
  }

  /**
   * Initialize language functionality
   */
  init() {
    try {
      this.loadSavedLanguage();
      this.cacheElements();
      this.bindEvents();
      this.translatePage();
      this.updateLanguageButtons();
      
      Logger.success('Language manager initialized successfully');
    } catch (error) {
      Logger.error('Failed to initialize language manager', error);
    }
  }

  /**
   * Load saved language from storage
   */
  loadSavedLanguage() {
    const savedLanguage = Storage.get(this.storageKey);
    if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (this.supportedLanguages.includes(browserLang)) {
        this.currentLanguage = browserLang;
      }
    }
    
    Logger.info(`Language loaded: ${this.currentLanguage}`);
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.languageButtons = DOM.selectAll('[data-lang]');
    
    Logger.info(`Cached ${this.languageButtons.length} language buttons`);
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    this.languageButtons.forEach(button => {
      DOM.on(button, 'click', this.handleLanguageChange.bind(this));
    });
    
    Logger.info('Language events bound');
  }

  /**
   * Handle language change
   * @param {Event} event - Click event
   */
  handleLanguageChange(event) {
    event.preventDefault();
    
    const button = event.currentTarget;
    const newLanguage = button.getAttribute('data-lang');
    
    if (newLanguage && newLanguage !== this.currentLanguage) {
      this.setLanguage(newLanguage);
    }
  }

  /**
   * Set current language
   * @param {string} language - Language code
   */
  setLanguage(language) {
    if (!this.supportedLanguages.includes(language)) {
      Logger.warn(`Unsupported language: ${language}`);
      return;
    }
    
    this.currentLanguage = language;
    Storage.set(this.storageKey, language);
    
    this.translatePage();
    this.updateLanguageButtons();
    this.updateTypedStrings();
    
    // Dispatch language change event
    const event = new CustomEvent('languageChanged', {
      detail: { language, translations: this.getCurrentTranslations() }
    });
    document.dispatchEvent(event);
    
    Logger.success(`Language changed to: ${language}`);
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get current translations
   * @returns {Object} Current language translations
   */
  getCurrentTranslations() {
    return TRANSLATIONS[this.currentLanguage] || TRANSLATIONS.es;
  }

  /**
   * Get translation by key path
   * @param {string} keyPath - Dot-separated key path (e.g., 'nav.home')
   * @param {string} fallback - Fallback text
   * @returns {string} Translated text
   */
  translate(keyPath, fallback = '') {
    const keys = keyPath.split('.');
    let translation = this.getCurrentTranslations();
    
    for (const key of keys) {
      if (translation && typeof translation === 'object' && key in translation) {
        translation = translation[key];
      } else {
        Logger.warn(`Translation not found: ${keyPath}`);
        return fallback || keyPath;
      }
    }
    
    return typeof translation === 'string' ? translation : fallback || keyPath;
  }

  /**
   * Translate entire page
   */
  translatePage() {
    const elementsToTranslate = DOM.selectAll('[data-translate]');
    
    elementsToTranslate.forEach(element => {
      const keyPath = element.getAttribute('data-translate');
      const translation = this.translate(keyPath);
      
      if (translation) {
        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          if (element.type === 'submit' || element.type === 'button') {
            element.value = translation;
          } else {
            element.placeholder = translation;
          }
        } else {
          element.textContent = translation;
        }
      }
    });
    
    // Translate elements with data-translate-html (for HTML content)
    const htmlElements = DOM.selectAll('[data-translate-html]');
    htmlElements.forEach(element => {
      const keyPath = element.getAttribute('data-translate-html');
      const translation = this.translate(keyPath);
      
      if (translation) {
        element.innerHTML = translation;
      }
    });
    
    Logger.info('Page translated successfully');
  }

  /**
   * Update language toggle buttons
   */
  updateLanguageButtons() {
    this.languageButtons.forEach(button => {
      const buttonLang = button.getAttribute('data-lang');
      
      if (buttonLang === this.currentLanguage) {
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
      } else {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Update typed.js strings if instance exists
   */
  updateTypedStrings() {
    // Find typed element
    const typedElement = DOM.select('.typed');
    if (!typedElement) return;
    
    try {
      // Get new strings for current language
      const newStrings = this.translate('hero.roles', []);
      
      if (Array.isArray(newStrings) && newStrings.length > 0) {
        // Destroy existing typed instance
        if (window.typedInstance) {
          window.typedInstance.destroy();
        }
        
        // Create new typed instance with updated strings
        if (typeof Typed !== 'undefined') {
          window.typedInstance = new Typed('.typed', {
            strings: newStrings,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
          });
          
          Logger.info('Typed strings updated for language change');
        }
      }
    } catch (error) {
      Logger.warn('Failed to update typed strings', error);
    }
  }

  /**
   * Add translation to existing translations
   * @param {string} language - Language code
   * @param {string} keyPath - Dot-separated key path
   * @param {string} translation - Translation text
   */
  addTranslation(language, keyPath, translation) {
    if (!this.supportedLanguages.includes(language)) {
      Logger.warn(`Cannot add translation for unsupported language: ${language}`);
      return;
    }
    
    const keys = keyPath.split('.');
    let current = TRANSLATIONS[language];
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[keys[keys.length - 1]] = translation;
    
    Logger.info(`Translation added: ${language}.${keyPath}`);
  }

  /**
   * Get supported languages
   * @returns {Array} Array of supported language codes
   */
  getSupportedLanguages() {
    return [...this.supportedLanguages];
  }

  /**
   * Check if language is supported
   * @param {string} language - Language code to check
   * @returns {boolean} Whether language is supported
   */
  isLanguageSupported(language) {
    return this.supportedLanguages.includes(language);
  }

  /**
   * Destroy language manager
   */
  destroy() {
    // Remove event listeners
    this.languageButtons.forEach(button => {
      DOM.off(button, 'click', this.handleLanguageChange);
    });
    
    // Destroy typed instance
    if (window.typedInstance) {
      window.typedInstance.destroy();
      window.typedInstance = null;
    }
    
    Logger.info('Language manager destroyed');
  }
}

// Create and export instance
const languageManager = new LanguageManager();

// Export for global access (backward compatibility)
if (typeof window !== 'undefined') {
  window.LanguageManager = languageManager;
  window.translations = TRANSLATIONS;
}

export default languageManager;
export { LanguageManager, TRANSLATIONS };