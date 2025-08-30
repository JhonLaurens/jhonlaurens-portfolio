/**
 * DYNAMIC CONTACT FORM SYSTEM
 * Enhanced contact form with dynamic fields based on project type
 */

class DynamicContactForm {
  constructor() {
    this.projectTypes = {
      'web-basic': {
        icon: '🌐',
        title: 'Sitio Web Básico',
        description: 'Landing pages, sitios corporativos',
        fields: ['pages', 'design-preference', 'content-management'],
        budgetRange: [800, 3000],
        timeline: ['2-4 semanas', '4-6 semanas', '6-8 semanas']
      },
      'web-advanced': {
        icon: '⚡',
        title: 'Aplicación Web',
        description: 'Sistemas complejos, dashboards',
        fields: ['functionality', 'user-roles', 'integrations', 'database-requirements'],
        budgetRange: [2500, 8000],
        timeline: ['6-10 semanas', '10-14 semanas', '14-18 semanas']
      },
      'mobile-app': {
        icon: '📱',
        title: 'App Móvil',
        description: 'iOS, Android, multiplataforma',
        fields: ['platforms', 'app-features', 'backend-needs', 'app-store'],
        budgetRange: [3500, 12000],
        timeline: ['8-12 semanas', '12-16 semanas', '16-20 semanas']
      },
      'core-banking': {
        icon: '🏦',
        title: 'Core Bancario',
        description: 'Sistemas financieros, compliance',
        fields: ['compliance-requirements', 'transaction-volume', 'security-level', 'integration-systems'],
        budgetRange: [15000, 50000],
        timeline: ['16-24 semanas', '24-32 semanas', '32-40 semanas']
      },
      'ai-ml': {
        icon: '🤖',
        title: 'IA/Machine Learning',
        description: 'Modelos predictivos, automatización',
        fields: ['data-sources', 'ml-objectives', 'model-complexity', 'deployment-scale'],
        budgetRange: [5000, 20000],
        timeline: ['10-16 semanas', '16-22 semanas', '22-28 semanas']
      },
      'cybersecurity': {
        icon: '🛡️',
        title: 'Ciberseguridad',
        description: 'Auditorías, implementación ISO27001',
        fields: ['security-scope', 'compliance-standards', 'current-infrastructure', 'risk-assessment'],
        budgetRange: [4000, 15000],
        timeline: ['8-14 semanas', '14-20 semanas', '20-26 semanas']
      },
      'consultation': {
        icon: '💡',
        title: 'Consultoría',
        description: 'Asesoría técnica, arquitectura',
        fields: ['consultation-type', 'project-scope', 'team-size', 'consultation-duration'],
        budgetRange: [500, 5000],
        timeline: ['1-2 semanas', '2-4 semanas', '4-8 semanas']
      }
    };
    
    this.dynamicFields = {
      'pages': {
        type: 'select',
        label: '📄 Número de Páginas',
        options: ['1-5 páginas', '6-10 páginas', '11-20 páginas', '20+ páginas']
      },
      'design-preference': {
        type: 'select',
        label: '🎨 Preferencia de Diseño',
        options: ['Minimalista', 'Corporativo', 'Creativo/Artístico', 'E-commerce', 'Blog/Contenido']
      },
      'content-management': {
        type: 'radio',
        label: '📝 Sistema de Gestión de Contenido',
        options: ['Sí, necesito CMS', 'No, contenido estático', 'No estoy seguro']
      },
      'functionality': {
        type: 'checkbox',
        label: '⚙️ Funcionalidades Requeridas',
        options: ['Autenticación de usuarios', 'Panel de administración', 'API REST', 'Base de datos', 'Pagos en línea', 'Chat en tiempo real', 'Notificaciones']
      },
      'user-roles': {
        type: 'select',
        label: '👥 Tipos de Usuario',
        options: ['Usuario único', '2-3 roles diferentes', '4-6 roles diferentes', 'Sistema complejo de permisos']
      },
      'integrations': {
        type: 'checkbox',
        label: '🔗 Integraciones Necesarias',
        options: ['Redes sociales', 'Sistemas de pago', 'CRM', 'ERP', 'APIs externas', 'Servicios de email', 'Analytics']
      },
      'database-requirements': {
        type: 'textarea',
        label: '🗄️ Requisitos de Base de Datos',
        placeholder: 'Describe el tipo de datos que manejarás, volumen estimado, etc.'
      },
      'platforms': {
        type: 'checkbox',
        label: '📱 Plataformas Objetivo',
        options: ['iOS (iPhone/iPad)', 'Android', 'Web App (PWA)', 'Aplicación híbrida']
      },
      'app-features': {
        type: 'checkbox',
        label: '🚀 Características de la App',
        options: ['Geolocalización', 'Cámara/Fotos', 'Notificaciones push', 'Modo offline', 'Sincronización en la nube', 'Pagos in-app', 'Redes sociales']
      },
      'backend-needs': {
        type: 'radio',
        label: '⚡ Necesidades de Backend',
        options: ['Backend completo necesario', 'Integración con backend existente', 'Solo frontend (app estática)']
      },
      'app-store': {
        type: 'radio',
        label: '🏪 Publicación en Tiendas',
        options: ['Sí, incluir publicación', 'No, solo desarrollo', 'Asesoría para publicación']
      },
      'compliance-requirements': {
        type: 'checkbox',
        label: '📋 Requisitos de Compliance',
        options: ['PCI DSS', 'SOX', 'GDPR', 'Regulaciones locales', 'ISO 27001', 'Auditorías internas']
      },
      'transaction-volume': {
        type: 'select',
        label: '💳 Volumen de Transacciones',
        options: ['< 1,000/día', '1,000 - 10,000/día', '10,000 - 100,000/día', '> 100,000/día']
      },
      'security-level': {
        type: 'select',
        label: '🔒 Nivel de Seguridad',
        options: ['Estándar', 'Alto (datos sensibles)', 'Crítico (infraestructura financiera)', 'Máximo (core bancario)']
      },
      'integration-systems': {
        type: 'textarea',
        label: '🔗 Sistemas de Integración',
        placeholder: 'Describe los sistemas existentes que requieren integración (Core bancario, CRM, etc.)'
      },
      'data-sources': {
        type: 'checkbox',
        label: '📊 Fuentes de Datos',
        options: ['Bases de datos internas', 'APIs externas', 'Archivos CSV/Excel', 'Datos en tiempo real', 'Datos históricos', 'Sensores IoT']
      },
      'ml-objectives': {
        type: 'textarea',
        label: '🎯 Objetivos del Modelo ML',
        placeholder: 'Describe qué problema quieres resolver con IA/ML (predicciones, clasificación, etc.)'
      },
      'model-complexity': {
        type: 'select',
        label: '🧠 Complejidad del Modelo',
        options: ['Básico (regresión/clasificación simple)', 'Intermedio (ensemble methods)', 'Avanzado (deep learning)', 'Investigación (modelos experimentales)']
      },
      'deployment-scale': {
        type: 'select',
        label: '🚀 Escala de Despliegue',
        options: ['Prototipo/POC', 'Producción pequeña', 'Producción mediana', 'Producción enterprise']
      },
      'security-scope': {
        type: 'checkbox',
        label: '🛡️ Alcance de Seguridad',
        options: ['Auditoría de vulnerabilidades', 'Implementación ISO 27001', 'Pentesting', 'Capacitación de personal', 'Políticas de seguridad', 'Monitoreo continuo']
      },
      'compliance-standards': {
        type: 'checkbox',
        label: '📜 Estándares de Compliance',
        options: ['ISO 27001', 'NIST', 'COBIT', 'ITIL', 'SOC 2', 'Regulaciones locales']
      },
      'current-infrastructure': {
        type: 'textarea',
        label: '🏗️ Infraestructura Actual',
        placeholder: 'Describe tu infraestructura tecnológica actual y sistemas de seguridad existentes'
      },
      'risk-assessment': {
        type: 'radio',
        label: '⚠️ Evaluación de Riesgos',
        options: ['Nunca realizada', 'Hace más de 2 años', 'Hace 1-2 años', 'Reciente (< 1 año)']
      },
      'consultation-type': {
        type: 'select',
        label: '💡 Tipo de Consultoría',
        options: ['Arquitectura de software', 'Estrategia tecnológica', 'Revisión de código', 'Optimización de performance', 'Migración de sistemas', 'Capacitación técnica']
      },
      'project-scope': {
        type: 'textarea',
        label: '📋 Alcance del Proyecto',
        placeholder: 'Describe el proyecto o problema que necesitas resolver'
      },
      'team-size': {
        type: 'select',
        label: '👥 Tamaño del Equipo',
        options: ['Solo yo', '2-5 personas', '6-15 personas', '16-50 personas', '50+ personas']
      },
      'consultation-duration': {
        type: 'select',
        label: '⏱️ Duración Estimada',
        options: ['Sesión única (2-4 horas)', 'Consultoría corta (1-2 semanas)', 'Consultoría media (1 mes)', 'Consultoría extendida (2-3 meses)']
      }
    };
    
    this.selectedProjectType = '';
    this.selectedBudget = 0;
    this.selectedTimeline = '';
    
    this.init();
  }

  init() {
    this.enhanceContactForm();
    this.setupEventListeners();
  }

  enhanceContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    // Get existing form
    const existingForm = contactForm.querySelector('#contact-form');
    if (!existingForm) return;
    
    // Create enhanced form structure
    const enhancedFormHTML = this.generateEnhancedFormHTML();
    
    // Replace form content but keep the form element
    existingForm.innerHTML = enhancedFormHTML;
  }

  generateEnhancedFormHTML() {
    return `
      <!-- Project Type Selection -->
      <div class="project-type-selector">
        <label>🎯 ¿Qué tipo de proyecto tienes en mente?</label>
        <div class="project-types">
          ${this.generateProjectTypeCards()}
        </div>
      </div>
      
      <!-- Dynamic Fields Container -->
      <div class="dynamic-fields" id="dynamic-fields">
        <!-- Fields will be populated based on project type -->
      </div>
      
      <!-- Budget Range -->
      <div class="dynamic-field budget-field" style="display: none;">
        <label>💰 Presupuesto Estimado</label>
        <div class="budget-range">
          <input type="range" class="budget-slider" id="budget-slider" min="500" max="50000" value="5000" step="500">
          <div class="budget-display" id="budget-display">$5,000</div>
        </div>
      </div>
      
      <!-- Timeline Selection -->
      <div class="dynamic-field timeline-field" style="display: none;">
        <label>⏰ Cronograma Preferido</label>
        <div class="timeline-options" id="timeline-options">
          <!-- Timeline options will be populated dynamically -->
        </div>
      </div>
      
      <!-- Standard Contact Fields -->
      <div class="row gy-4">
        <div class="col-md-6">
          <input
            type="text"
            name="name"
            class="form-control"
            placeholder="Tu Nombre *"
            required
          />
        </div>
        
        <div class="col-md-6">
          <input
            type="email"
            class="form-control"
            name="email"
            placeholder="Tu Email *"
            required
          />
        </div>
        
        <div class="col-md-6">
          <input
            type="tel"
            class="form-control"
            name="phone"
            placeholder="Teléfono (opcional)"
          />
        </div>
        
        <div class="col-md-6">
          <input
            type="text"
            class="form-control"
            name="company"
            placeholder="Empresa (opcional)"
          />
        </div>
        
        <div class="col-12">
          <input
            type="text"
            class="form-control"
            name="subject"
            placeholder="Asunto del Proyecto *"
            required
          />
        </div>
        
        <div class="col-12">
          <textarea
            class="form-control"
            name="message"
            rows="6"
            placeholder="Cuéntanos más sobre tu proyecto, objetivos específicos, requisitos técnicos, etc. *"
            required
          ></textarea>
        </div>
        
        <div class="col-12 text-center">
          <div class="form-status" id="form-status"></div>
          <button type="submit" class="btn">🚀 Enviar Propuesta de Proyecto</button>
        </div>
      </div>
    `;
  }

  generateProjectTypeCards() {
    return Object.entries(this.projectTypes).map(([key, type]) => `
      <div class="project-type-card" data-project-type="${key}">
        <span class="icon">${type.icon}</span>
        <div class="title">${type.title}</div>
        <div class="description">${type.description}</div>
      </div>
    `).join('');
  }

  setupEventListeners() {
    // Project type selection
    document.addEventListener('click', (e) => {
      if (e.target.closest('.project-type-card')) {
        this.handleProjectTypeSelection(e.target.closest('.project-type-card'));
      }
      
      if (e.target.closest('.timeline-option')) {
        this.handleTimelineSelection(e.target.closest('.timeline-option'));
      }
    });
    
    // Budget slider
    document.addEventListener('input', (e) => {
      if (e.target.id === 'budget-slider') {
        this.updateBudgetDisplay(e.target.value);
      }
    });
    
    // Form submission
    document.addEventListener('submit', (e) => {
      if (e.target.id === 'contact-form') {
        e.preventDefault();
        this.handleFormSubmission(e.target);
      }
    });
  }

  handleProjectTypeSelection(card) {
    // Remove previous selection
    document.querySelectorAll('.project-type-card').forEach(c => c.classList.remove('selected'));
    
    // Add selection to clicked card
    card.classList.add('selected');
    
    // Get project type
    const projectType = card.dataset.projectType;
    this.selectedProjectType = projectType;
    
    // Show dynamic fields
    this.showDynamicFields(projectType);
    
    // Show budget and timeline
    this.showBudgetAndTimeline(projectType);
  }

  showDynamicFields(projectType) {
    const dynamicFieldsContainer = document.getElementById('dynamic-fields');
    const projectConfig = this.projectTypes[projectType];
    
    if (!projectConfig || !dynamicFieldsContainer) return;
    
    // Clear existing fields
    dynamicFieldsContainer.innerHTML = '';
    
    // Add fields for this project type
    projectConfig.fields.forEach((fieldKey, index) => {
      const fieldConfig = this.dynamicFields[fieldKey];
      if (fieldConfig) {
        const fieldHTML = this.generateFieldHTML(fieldKey, fieldConfig);
        const fieldElement = document.createElement('div');
        fieldElement.className = 'dynamic-field';
        fieldElement.innerHTML = fieldHTML;
        
        // Add with animation delay
        setTimeout(() => {
          fieldElement.classList.add('show');
        }, index * 100);
        
        dynamicFieldsContainer.appendChild(fieldElement);
      }
    });
  }

  generateFieldHTML(fieldKey, fieldConfig) {
    const { type, label, options, placeholder } = fieldConfig;
    
    switch (type) {
      case 'select':
        return `
          <label>${label}</label>
          <select name="${fieldKey}" class="form-control">
            <option value="">Selecciona una opción...</option>
            ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
          </select>
        `;
        
      case 'radio':
        return `
          <label>${label}</label>
          <div class="radio-group">
            ${options.map((option, index) => `
              <div class="radio-option">
                <input type="radio" id="${fieldKey}_${index}" name="${fieldKey}" value="${option}">
                <label for="${fieldKey}_${index}" style="color: rgba(255,255,255,0.8); margin-left: 8px; cursor: pointer;">${option}</label>
              </div>
            `).join('')}
          </div>
        `;
        
      case 'checkbox':
        return `
          <label>${label}</label>
          <div class="checkbox-group">
            ${options.map((option, index) => `
              <div class="checkbox-option">
                <input type="checkbox" id="${fieldKey}_${index}" name="${fieldKey}[]" value="${option}">
                <label for="${fieldKey}_${index}" style="color: rgba(255,255,255,0.8); margin-left: 8px; cursor: pointer;">${option}</label>
              </div>
            `).join('')}
          </div>
        `;
        
      case 'textarea':
        return `
          <label>${label}</label>
          <textarea name="${fieldKey}" class="form-control" rows="4" placeholder="${placeholder || ''}"></textarea>
        `;
        
      default:
        return `
          <label>${label}</label>
          <input type="text" name="${fieldKey}" class="form-control" placeholder="${placeholder || ''}">
        `;
    }
  }

  showBudgetAndTimeline(projectType) {
    const projectConfig = this.projectTypes[projectType];
    const budgetField = document.querySelector('.budget-field');
    const timelineField = document.querySelector('.timeline-field');
    const budgetSlider = document.getElementById('budget-slider');
    const timelineOptions = document.getElementById('timeline-options');
    
    if (budgetField && budgetSlider) {
      // Update budget range
      budgetSlider.min = projectConfig.budgetRange[0];
      budgetSlider.max = projectConfig.budgetRange[1];
      budgetSlider.value = Math.round((projectConfig.budgetRange[0] + projectConfig.budgetRange[1]) / 2);
      
      this.updateBudgetDisplay(budgetSlider.value);
      
      // Show budget field
      budgetField.style.display = 'block';
      setTimeout(() => budgetField.classList.add('show'), 100);
    }
    
    if (timelineField && timelineOptions) {
      // Update timeline options
      timelineOptions.innerHTML = projectConfig.timeline.map(timeline => `
        <div class="timeline-option" data-timeline="${timeline}">${timeline}</div>
      `).join('');
      
      // Show timeline field
      timelineField.style.display = 'block';
      setTimeout(() => timelineField.classList.add('show'), 200);
    }
  }

  handleTimelineSelection(option) {
    // Remove previous selection
    document.querySelectorAll('.timeline-option').forEach(o => o.classList.remove('selected'));
    
    // Add selection
    option.classList.add('selected');
    this.selectedTimeline = option.dataset.timeline;
  }

  updateBudgetDisplay(value) {
    const budgetDisplay = document.getElementById('budget-display');
    if (budgetDisplay) {
      budgetDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
    }
    this.selectedBudget = parseInt(value);
  }

  async handleFormSubmission(form) {
    const formStatus = document.getElementById('form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    this.showFormStatus('loading', '🔄 Enviando tu propuesta...');
    submitBtn.disabled = true;
    
    try {
      // Collect form data
      const formData = new FormData(form);
      
      // Add dynamic data
      formData.append('project_type', this.selectedProjectType);
      formData.append('budget_estimate', this.selectedBudget);
      formData.append('timeline_preference', this.selectedTimeline);
      
      // Collect dynamic field values
      const dynamicData = this.collectDynamicFieldData();
      formData.append('project_details', JSON.stringify(dynamicData));
      
      // Simulate form submission (replace with actual endpoint)
      await this.submitForm(formData);
      
      // Show success
      this.showFormStatus('success', '✅ ¡Propuesta enviada exitosamente! Te contactaremos pronto.');
      
      // Reset form after delay
      setTimeout(() => {
        form.reset();
        this.resetForm();
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showFormStatus('error', '❌ Error al enviar. Por favor intenta nuevamente.');
    } finally {
      submitBtn.disabled = false;
    }
  }

  collectDynamicFieldData() {
    const dynamicData = {};
    
    // Collect all dynamic field values
    const dynamicFields = document.querySelectorAll('#dynamic-fields input, #dynamic-fields select, #dynamic-fields textarea');
    
    dynamicFields.forEach(field => {
      if (field.type === 'checkbox') {
        if (field.checked) {
          if (!dynamicData[field.name]) dynamicData[field.name] = [];
          dynamicData[field.name].push(field.value);
        }
      } else if (field.type === 'radio') {
        if (field.checked) {
          dynamicData[field.name] = field.value;
        }
      } else {
        if (field.value) {
          dynamicData[field.name] = field.value;
        }
      }
    });
    
    return dynamicData;
  }

  async submitForm(formData) {
    // Simulate API call - replace with actual endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% success rate)
        if (Math.random() > 0.1) {
          resolve({ success: true });
        } else {
          reject(new Error('Simulated network error'));
        }
      }, 2000);
    });
  }

  showFormStatus(type, message) {
    const formStatus = document.getElementById('form-status');
    if (!formStatus) return;
    
    formStatus.className = `form-status ${type} show`;
    formStatus.textContent = message;
  }

  resetForm() {
    // Reset selections
    this.selectedProjectType = '';
    this.selectedBudget = 0;
    this.selectedTimeline = '';
    
    // Hide dynamic fields
    document.querySelectorAll('.project-type-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    document.getElementById('dynamic-fields').innerHTML = '';
    document.querySelector('.budget-field').style.display = 'none';
    document.querySelector('.timeline-field').style.display = 'none';
    
    // Hide form status
    const formStatus = document.getElementById('form-status');
    if (formStatus) {
      formStatus.classList.remove('show');
    }
  }
}

// Initialize Dynamic Contact Form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.dynamicContactForm = new DynamicContactForm();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DynamicContactForm;
}