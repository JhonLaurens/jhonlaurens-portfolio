/**
 * Contact Form Module
 * Handles contact form functionality with validation and submission
 */

import { DOM, Validator, Logger } from '../utils/helpers.js';
import { APP_CONFIG } from '../config/app.config.js';

/**
 * Contact Form Manager Class
 */
class ContactFormManager {
  constructor() {
    this.form = null;
    this.fields = {};
    this.submitButton = null;
    this.loadingElement = null;
    this.messageElement = null;
    this.isSubmitting = false;
    this.validationRules = APP_CONFIG.contact.validation;
    
    Logger.info('Contact Form Manager initialized');
  }

  /**
   * Initialize contact form functionality
   */
  init() {
    try {
      this.cacheElements();
      this.bindEvents();
      this.initValidation();
      
      Logger.success('Contact form initialized successfully');
    } catch (error) {
      Logger.error('Failed to initialize contact form', error);
    }
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.form = DOM.select('#contact-form, .php-email-form');
    
    if (!this.form) {
      Logger.warn('Contact form not found');
      return;
    }

    // Cache form fields
    this.fields = {
      name: DOM.select('input[name="name"]', this.form),
      email: DOM.select('input[name="email"]', this.form),
      subject: DOM.select('input[name="subject"]', this.form),
      message: DOM.select('textarea[name="message"]', this.form)
    };

    // Cache form elements
    this.submitButton = DOM.select('button[type="submit"]', this.form);
    this.loadingElement = DOM.select('.loading', this.form);
    this.sentMessageElement = DOM.select('.sent-message', this.form);
    this.errorMessageElement = DOM.select('.error-message', this.form);
    
    // Ensure message elements are hidden initially
    if (this.sentMessageElement) {
      this.sentMessageElement.style.display = 'none';
    }
    if (this.errorMessageElement) {
      this.errorMessageElement.style.display = 'none';
    }
    if (this.loadingElement) {
      this.loadingElement.style.display = 'none';
    }
    
    Logger.info('Contact form elements cached');
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    if (!this.form) return;

    // Form submission
    DOM.on(this.form, 'submit', this.handleSubmit.bind(this));
    
    // Real-time validation
    Object.entries(this.fields).forEach(([fieldName, field]) => {
      if (field) {
        DOM.on(field, 'blur', () => this.validateField(fieldName));
        DOM.on(field, 'input', () => this.clearFieldError(fieldName));
      }
    });
    
    Logger.info('Contact form events bound');
  }

  /**
   * Initialize form validation
   */
  initValidation() {
    // Add validation attributes
    Object.entries(this.fields).forEach(([fieldName, field]) => {
      if (!field) return;
      
      const rules = this.validationRules[fieldName];
      if (rules) {
        if (rules.min) field.setAttribute('minlength', rules.min);
        if (rules.max) field.setAttribute('maxlength', rules.max);
        if (rules.pattern) field.setAttribute('pattern', rules.pattern.source);
      }
    });
    
    Logger.info('Form validation initialized');
  }

  /**
   * Handle form submission
   * @param {Event} event - Submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    
    if (this.isSubmitting) {
      Logger.warn('Form submission already in progress');
      return;
    }
    
    try {
      this.isSubmitting = true;
      this.showLoading();
      this.clearMessages();
      
      // Validate form
      const validation = this.validateForm();
      if (!validation.isValid) {
        this.showError('Por favor, corrige los errores en el formulario.');
        this.focusFirstError();
        return;
      }
      
      // Prepare form data
      const formData = this.getFormData();
      
      // Check if DatabaseManager is available and initialized
      if (!window.DatabaseManager) {
        throw new Error('DatabaseManager is not available. Please refresh the page.');
      }
      
      if (!window.DatabaseManager.isInitialized) {
        Logger.warn('DatabaseManager not initialized, attempting to initialize...');
        await window.DatabaseManager.init();
      }
      
      // Submit to database
      const result = await window.DatabaseManager.saveContact(formData);
      
      if (result.success) {
        this.showSuccess('¡Mensaje enviado correctamente! Te contactaré pronto.');
        this.resetForm();
        
        // Track form submission
        this.trackFormSubmission(true);
        
        Logger.success('Contact form submitted successfully');
      } else {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }
      
    } catch (error) {
      Logger.error('Contact form submission failed', error);
      this.showError('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      this.trackFormSubmission(false, error.message);
    } finally {
      this.isSubmitting = false;
      this.hideLoading();
    }
  }

  /**
   * Validate entire form
   * @returns {Object} Validation result
   */
  validateForm() {
    const errors = [];
    
    // Validate each field
    Object.keys(this.fields).forEach(fieldName => {
      const fieldValidation = this.validateField(fieldName);
      if (!fieldValidation.isValid) {
        errors.push(...fieldValidation.errors);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate individual field
   * @param {string} fieldName - Field name to validate
   * @returns {Object} Validation result
   */
  validateField(fieldName) {
    const field = this.fields[fieldName];
    const rules = this.validationRules[fieldName];
    const errors = [];
    
    if (!field || !rules) {
      return { isValid: true, errors: [] };
    }
    
    const value = field.value.trim();
    
    // Required validation
    if (!Validator.isRequired(value)) {
      errors.push(`${this.getFieldLabel(fieldName)} es requerido`);
      this.showFieldError(fieldName, errors[0]);
      return { isValid: false, errors };
    }
    
    // Length validation
    if (rules.min || rules.max) {
      if (!Validator.isValidLength(value, rules.min || 0, rules.max || Infinity)) {
        const message = rules.min && rules.max 
          ? `${this.getFieldLabel(fieldName)} debe tener entre ${rules.min} y ${rules.max} caracteres`
          : rules.min 
            ? `${this.getFieldLabel(fieldName)} debe tener al menos ${rules.min} caracteres`
            : `${this.getFieldLabel(fieldName)} no puede exceder ${rules.max} caracteres`;
        errors.push(message);
      }
    }
    
    // Email validation
    if (fieldName === 'email' && !Validator.isValidEmail(value)) {
      errors.push('Por favor, ingresa un email válido');
    }
    
    // Show/hide field error
    if (errors.length > 0) {
      this.showFieldError(fieldName, errors[0]);
    } else {
      this.clearFieldError(fieldName);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get field label for error messages
   * @param {string} fieldName - Field name
   * @returns {string} Field label
   */
  getFieldLabel(fieldName) {
    const labels = {
      name: 'Nombre',
      email: 'Email',
      subject: 'Asunto',
      message: 'Mensaje'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Show field-specific error
   * @param {string} fieldName - Field name
   * @param {string} message - Error message
   */
  showFieldError(fieldName, message) {
    const field = this.fields[fieldName];
    if (!field) return;
    
    // Add error class to field
    field.classList.add('is-invalid', 'error');
    
    // Find or create error element
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error text-danger small mt-1';
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

  /**
   * Clear field error
   * @param {string} fieldName - Field name
   */
  clearFieldError(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return;
    
    // Remove error classes
    field.classList.remove('is-invalid', 'error');
    
    // Hide error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  /**
   * Focus first field with error
   */
  focusFirstError() {
    const firstErrorField = DOM.select('.is-invalid, .error', this.form);
    if (firstErrorField) {
      firstErrorField.focus();
    }
  }

  /**
   * Get form data
   * @returns {Object} Form data
   */
  getFormData() {
    const data = {};
    
    Object.entries(this.fields).forEach(([fieldName, field]) => {
      if (field) {
        data[fieldName] = field.value.trim();
      }
    });
    
    return data;
  }

  /**
   * Reset form to initial state
   */
  resetForm() {
    if (!this.form) return;
    
    this.form.reset();
    
    // Clear all field errors
    Object.keys(this.fields).forEach(fieldName => {
      this.clearFieldError(fieldName);
    });
    
    Logger.info('Contact form reset');
  }

  /**
   * Show loading state
   */
  showLoading() {
    if (this.loadingElement) {
      this.loadingElement.style.display = 'block';
    }
    
    if (this.submitButton) {
      this.submitButton.disabled = true;
      this.submitButton.textContent = 'Enviando...';
    }
  }

  /**
   * Hide loading state
   */
  hideLoading() {
    if (this.loadingElement) {
      this.loadingElement.style.display = 'none';
    }
    
    if (this.submitButton) {
      this.submitButton.disabled = false;
      this.submitButton.textContent = 'Enviar Mensaje';
    }
  }

  /**
   * Show success message
   * @param {string} message - Success message
   */
  showSuccess(message) {
    this.clearMessages();
    
    if (this.sentMessageElement) {
      this.sentMessageElement.textContent = message;
      this.sentMessageElement.style.display = 'block';
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        this.clearMessages();
      }, 5000);
    }
  }

  /**
   * Show error message
   * @param {string} message - Error message
   */
  showError(message) {
    this.clearMessages();
    
    if (this.errorMessageElement) {
      this.errorMessageElement.textContent = message;
      this.errorMessageElement.style.display = 'block';
    }
  }

  /**
   * Clear all messages
   */
  clearMessages() {
    if (this.sentMessageElement) {
      this.sentMessageElement.style.display = 'none';
      this.sentMessageElement.textContent = '';
    }
    if (this.errorMessageElement) {
      this.errorMessageElement.style.display = 'none';
      this.errorMessageElement.textContent = '';
    }
  }

  /**
   * Track form submission for analytics
   * @param {boolean} success - Whether submission was successful
   * @param {string} error - Error message if failed
   */
  trackFormSubmission(success, error = null) {
    if (!APP_CONFIG.features.analytics) return;
    
    try {
      // Track with Google Analytics if available
      if (typeof gtag === 'function') {
        gtag('event', 'form_submit', {
          event_category: 'Contact',
          event_label: success ? 'Success' : 'Error',
          value: success ? 1 : 0
        });
      }
      
      // Log for debugging
      Logger.info('Form submission tracked', { success, error });
    } catch (trackingError) {
      Logger.warn('Failed to track form submission', trackingError);
    }
  }

  /**
   * Get form validation status
   * @returns {boolean} Whether form is valid
   */
  isFormValid() {
    return this.validateForm().isValid;
  }

  /**
   * Destroy contact form manager
   */
  destroy() {
    if (!this.form) return;
    
    // Remove event listeners
    DOM.off(this.form, 'submit', this.handleSubmit);
    
    Object.entries(this.fields).forEach(([fieldName, field]) => {
      if (field) {
        DOM.off(field, 'blur', this.validateField);
        DOM.off(field, 'input', this.clearFieldError);
      }
    });
    
    Logger.info('Contact form manager destroyed');
  }
}

// Create and export instance
const contactFormManager = new ContactFormManager();

// Export for global access (backward compatibility)
if (typeof window !== 'undefined') {
  window.ContactFormManager = contactFormManager;
}

export default contactFormManager;
export { ContactFormManager };