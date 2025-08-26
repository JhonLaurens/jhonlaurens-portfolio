/**
 * ACCESSIBILITY CONTROLS SYSTEM
 * Provides comprehensive accessibility features for users with special needs
 */

class AccessibilityManager {
  constructor() {
    this.settings = {
      reduceMotion: false,
      highContrast: 'normal',
      largeText: false,
      enhancedFocus: false,
      keyboardNav: false
    };
    
    this.init();
  }

  init() {
    this.loadSettings();
    this.createAccessibilityPanel();
    this.createSkipLinks();
    this.setupEventListeners();
    this.applySettings();
    this.detectPreferences();
  }

  createAccessibilityPanel() {
    const panel = document.createElement('div');
    panel.className = 'accessibility-panel';
    panel.id = 'accessibility-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Controles de Accesibilidad');
    
    panel.innerHTML = `
      <h3>Controles de Accesibilidad</h3>
      
      <div class="accessibility-control">
        <label for="reduce-motion">Reducir Animaciones</label>
        <div class="accessibility-switch" id="reduce-motion" role="switch" aria-checked="false" tabindex="0">
          <span class="sr-only">Activar/Desactivar reducción de animaciones</span>
        </div>
      </div>
      
      <div class="accessibility-control">
        <label for="contrast-select">Contraste:</label>
        <select id="contrast-select" class="contrast-selector" aria-label="Seleccionar modo de contraste">
          <option value="normal">Normal</option>
          <option value="high">Alto Contraste</option>
          <option value="dark">Contraste Oscuro</option>
          <option value="light">Contraste Claro</option>
        </select>
      </div>
      
      <div class="accessibility-control">
        <label for="large-text">Texto Grande</label>
        <div class="accessibility-switch" id="large-text" role="switch" aria-checked="false" tabindex="0">
          <span class="sr-only">Activar/Desactivar texto grande</span>
        </div>
      </div>
      
      <div class="accessibility-control">
        <label for="enhanced-focus">Foco Mejorado</label>
        <div class="accessibility-switch" id="enhanced-focus" role="switch" aria-checked="false" tabindex="0">
          <span class="sr-only">Activar/Desactivar indicadores de foco mejorados</span>
        </div>
      </div>
      
      <div class="accessibility-control">
        <label for="keyboard-nav">Navegación por Teclado</label>
        <div class="accessibility-switch" id="keyboard-nav" role="switch" aria-checked="false" tabindex="0">
          <span class="sr-only">Activar/Desactivar navegación mejorada por teclado</span>
        </div>
      </div>
    `;
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'accessibility-toggle';
    toggleButton.id = 'accessibility-toggle';
    toggleButton.innerHTML = '♿';
    toggleButton.setAttribute('aria-label', 'Abrir controles de accesibilidad');
    toggleButton.setAttribute('aria-expanded', 'false');
    
    document.body.appendChild(toggleButton);
    document.body.appendChild(panel);
  }

  createSkipLinks() {
    const skipLinks = document.createElement('div');
    skipLinks.innerHTML = `
      <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
      <a href="#navigation" class="skip-link">Saltar a la navegación</a>
      <a href="#contact" class="skip-link">Saltar al contacto</a>
    `;
    
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }

  setupEventListeners() {
    const toggle = document.getElementById('accessibility-toggle');
    const panel = document.getElementById('accessibility-panel');
    
    // Toggle panel
    toggle.addEventListener('click', () => this.togglePanel());
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.togglePanel();
      }
    });
    
    // Switch controls
    const switches = panel.querySelectorAll('.accessibility-switch');
    switches.forEach(switchEl => {
      switchEl.addEventListener('click', () => this.toggleSwitch(switchEl));
      switchEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleSwitch(switchEl);
        }
      });
    });
    
    // Contrast selector
    const contrastSelect = document.getElementById('contrast-select');
    contrastSelect.addEventListener('change', (e) => {
      this.settings.highContrast = e.target.value;
      this.applySettings();
      this.saveSettings();
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !toggle.contains(e.target)) {
        this.closePanel();
      }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        this.togglePanel();
      }
      
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        this.closePanel();
      }
    });
  }

  togglePanel() {
    const panel = document.getElementById('accessibility-panel');
    const toggle = document.getElementById('accessibility-toggle');
    const isOpen = panel.classList.contains('open');
    
    if (isOpen) {
      this.closePanel();
    } else {
      panel.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar controles de accesibilidad');
      
      // Focus first control
      const firstControl = panel.querySelector('.accessibility-switch, select');
      if (firstControl) firstControl.focus();
    }
  }

  closePanel() {
    const panel = document.getElementById('accessibility-panel');
    const toggle = document.getElementById('accessibility-toggle');
    
    panel.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir controles de accesibilidad');
  }

  toggleSwitch(switchEl) {
    const isActive = switchEl.classList.contains('active');
    const setting = switchEl.id.replace('-', '');
    
    if (isActive) {
      switchEl.classList.remove('active');
      switchEl.setAttribute('aria-checked', 'false');
      this.settings[setting] = false;
    } else {
      switchEl.classList.add('active');
      switchEl.setAttribute('aria-checked', 'true');
      this.settings[setting] = true;
    }
    
    this.applySettings();
    this.saveSettings();
  }

  applySettings() {
    const body = document.body;
    
    // Remove all accessibility classes
    body.classList.remove(
      'reduce-motion', 'high-contrast', 'dark-contrast', 
      'light-contrast', 'large-text', 'enhanced-focus', 'keyboard-nav'
    );
    
    // Apply settings
    if (this.settings.reduceMotion) {
      body.classList.add('reduce-motion');
      this.disableAnimations();
    }
    
    if (this.settings.highContrast !== 'normal') {
      body.classList.add(this.settings.highContrast + '-contrast');
    }
    
    if (this.settings.largeText) {
      body.classList.add('large-text');
    }
    
    if (this.settings.enhancedFocus) {
      body.classList.add('enhanced-focus');
    }
    
    if (this.settings.keyboardNav) {
      body.classList.add('keyboard-nav');
      this.enhanceKeyboardNavigation();
    }
  }

  disableAnimations() {
    // Disable CSS animations and transitions
    const style = document.createElement('style');
    style.id = 'accessibility-motion-disable';
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    
    // Remove existing style if present
    const existing = document.getElementById('accessibility-motion-disable');
    if (existing) existing.remove();
    
    if (this.settings.reduceMotion) {
      document.head.appendChild(style);
    }
  }

  enhanceKeyboardNavigation() {
    // Add tabindex to interactive elements that might not have it
    const interactiveElements = document.querySelectorAll(
      '.portfolio-item, .service-item, .card:not([tabindex])'
    );
    
    interactiveElements.forEach((el, index) => {
      if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
      }
    });
  }

  detectPreferences() {
    // Detect system preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.settings.reduceMotion = true;
      const reduceMotionSwitch = document.getElementById('reduce-motion');
      if (reduceMotionSwitch) {
        reduceMotionSwitch.classList.add('active');
        reduceMotionSwitch.setAttribute('aria-checked', 'true');
      }
    }
    
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      this.settings.highContrast = 'high';
      const contrastSelect = document.getElementById('contrast-select');
      if (contrastSelect) contrastSelect.value = 'high';
    }
    
    this.applySettings();
  }

  saveSettings() {
    try {
      localStorage.setItem('accessibility-settings', JSON.stringify(this.settings));
    } catch (e) {
      console.warn('No se pudieron guardar las configuraciones de accesibilidad');
    }
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
        
        // Update UI to match loaded settings
        setTimeout(() => this.updateUI(), 100);
      }
    } catch (e) {
      console.warn('No se pudieron cargar las configuraciones de accesibilidad');
    }
  }

  updateUI() {
    // Update switches
    Object.keys(this.settings).forEach(key => {
      if (typeof this.settings[key] === 'boolean') {
        const switchEl = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
        if (switchEl) {
          if (this.settings[key]) {
            switchEl.classList.add('active');
            switchEl.setAttribute('aria-checked', 'true');
          } else {
            switchEl.classList.remove('active');
            switchEl.setAttribute('aria-checked', 'false');
          }
        }
      }
    });
    
    // Update contrast selector
    const contrastSelect = document.getElementById('contrast-select');
    if (contrastSelect) {
      contrastSelect.value = this.settings.highContrast;
    }
  }

  // Public method to announce changes to screen readers
  announce(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Initialize accessibility manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.accessibilityManager = new AccessibilityManager();
  
  // Add ARIA labels to existing elements
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach((item, index) => {
    if (!item.hasAttribute('aria-label')) {
      const title = item.querySelector('h4, .portfolio-title');
      if (title) {
        item.setAttribute('aria-label', `Proyecto: ${title.textContent}`);
      }
    }
  });
  
  // Enhance form accessibility
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (!input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (label) {
          input.setAttribute('aria-labelledby', label.id || `label-${input.id}`);
          if (!label.id) label.id = `label-${input.id}`;
        } else if (input.placeholder) {
          input.setAttribute('aria-label', input.placeholder);
        }
      }
    });
  });
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AccessibilityManager;
}