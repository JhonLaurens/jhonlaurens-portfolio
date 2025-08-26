/**
 * BUDGET CALCULATOR SYSTEM
 * Interactive budget estimation tool for project pricing
 */

class BudgetCalculator {
  constructor() {
    this.pricing = {
      projectTypes: {
        'web-basic': { base: 800, multiplier: 1.0, timeline: '2-4 semanas' },
        'web-advanced': { base: 2500, multiplier: 1.5, timeline: '6-10 semanas' },
        'mobile-app': { base: 3500, multiplier: 2.0, timeline: '8-12 semanas' },
        'core-banking': { base: 15000, multiplier: 3.5, timeline: '16-24 semanas' },
        'ai-ml': { base: 5000, multiplier: 2.5, timeline: '10-16 semanas' },
        'cybersecurity': { base: 4000, multiplier: 2.2, timeline: '8-14 semanas' },
        'data-engineering': { base: 6000, multiplier: 2.8, timeline: '12-18 semanas' },
        'blockchain': { base: 8000, multiplier: 3.0, timeline: '14-20 semanas' },
        'ecommerce': { base: 3000, multiplier: 1.8, timeline: '6-12 semanas' },
        'custom': { base: 2000, multiplier: 1.5, timeline: '4-8 semanas' }
      },
      features: {
        'responsive-design': { price: 300, category: 'frontend' },
        'admin-panel': { price: 800, category: 'backend' },
        'user-auth': { price: 600, category: 'backend' },
        'payment-integration': { price: 1200, category: 'integration' },
        'api-development': { price: 1500, category: 'backend' },
        'database-design': { price: 800, category: 'backend' },
        'real-time-features': { price: 1000, category: 'advanced' },
        'third-party-apis': { price: 700, category: 'integration' },
        'seo-optimization': { price: 400, category: 'frontend' },
        'analytics-tracking': { price: 500, category: 'integration' },
        'security-audit': { price: 1500, category: 'security' },
        'performance-optimization': { price: 800, category: 'optimization' },
        'testing-qa': { price: 1000, category: 'quality' },
        'documentation': { price: 600, category: 'documentation' },
        'deployment-setup': { price: 500, category: 'deployment' },
        'maintenance-support': { price: 200, category: 'support' }
      },
      complexity: {
        1: { multiplier: 0.8, label: 'Básico' },
        2: { multiplier: 1.0, label: 'Estándar' },
        3: { multiplier: 1.3, label: 'Intermedio' },
        4: { multiplier: 1.6, label: 'Avanzado' },
        5: { multiplier: 2.0, label: 'Experto' }
      },
      urgency: {
        'standard': { multiplier: 1.0, label: 'Estándar (sin prisa)' },
        'priority': { multiplier: 1.3, label: 'Prioritario (+30%)' },
        'urgent': { multiplier: 1.6, label: 'Urgente (+60%)' }
      }
    };
    
    this.currentEstimate = {
      projectType: '',
      features: [],
      complexity: 2,
      urgency: 'standard',
      total: 0,
      timeline: '',
      breakdown: {}
    };
    
    this.init();
  }

  init() {
    this.createCalculatorSection();
    this.setupEventListeners();
    this.updateEstimate();
  }

  createCalculatorSection() {
    // Find insertion point after testimonials or portfolio
    let insertionPoint = document.getElementById('testimonials') || document.getElementById('portfolio');
    
    if (insertionPoint) {
      const calculatorSection = document.createElement('section');
      calculatorSection.id = 'budget-calculator';
      calculatorSection.className = 'budget-calculator-section';
      calculatorSection.innerHTML = this.generateCalculatorHTML();
      
      insertionPoint.parentNode.insertBefore(calculatorSection, insertionPoint.nextSibling);
    }
  }

  generateCalculatorHTML() {
    return `
      <div class="budget-calculator-container container">
        <div class="calculator-header" data-aos="fade-up">
          <h2>💰 Calculadora de Presupuestos</h2>
          <p>Obtén una estimación personalizada para tu proyecto. Selecciona las características que necesitas y recibe un presupuesto detallado al instante.</p>
        </div>
        
        <div class="calculator-main">
          <div class="calculator-form" data-aos="fade-right">
            <form id="budget-form">
              <!-- Project Type Selection -->
              <div class="form-group">
                <label for="project-type">🎯 Tipo de Proyecto</label>
                <div class="description">Selecciona el tipo de proyecto que mejor describe tu necesidad</div>
                <select id="project-type" class="form-control" required>
                  <option value="">Selecciona un tipo de proyecto...</option>
                  <option value="web-basic">Sitio Web Básico</option>
                  <option value="web-advanced">Aplicación Web Avanzada</option>
                  <option value="mobile-app">Aplicación Móvil</option>
                  <option value="core-banking">Core Bancario/Financiero</option>
                  <option value="ai-ml">Inteligencia Artificial/ML</option>
                  <option value="cybersecurity">Ciberseguridad</option>
                  <option value="data-engineering">Ingeniería de Datos</option>
                  <option value="blockchain">Blockchain/Web3</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="custom">Proyecto Personalizado</option>
                </select>
              </div>
              
              <!-- Features Selection -->
              <div class="form-group">
                <label>🚀 Características Adicionales</label>
                <div class="description">Selecciona las funcionalidades que necesitas para tu proyecto</div>
                <div class="checkbox-group" id="features-group">
                  ${this.generateFeaturesHTML()}
                </div>
              </div>
              
              <!-- Complexity Slider -->
              <div class="form-group">
                <label for="complexity">⚙️ Nivel de Complejidad</label>
                <div class="description">Ajusta según la complejidad técnica requerida</div>
                <div class="slider-group">
                  <input type="range" id="complexity" class="slider" min="1" max="5" value="2">
                  <div class="slider-value" id="complexity-value">Estándar</div>
                </div>
              </div>
              
              <!-- Urgency Selection -->
              <div class="form-group">
                <label for="urgency">⏰ Urgencia del Proyecto</label>
                <div class="description">Los proyectos urgentes requieren recursos adicionales</div>
                <select id="urgency" class="form-control">
                  <option value="standard">Estándar (sin prisa)</option>
                  <option value="priority">Prioritario (+30%)</option>
                  <option value="urgent">Urgente (+60%)</option>
                </select>
              </div>
              
              <!-- Additional Requirements -->
              <div class="form-group">
                <label for="requirements">📝 Requisitos Adicionales</label>
                <div class="description">Describe cualquier requisito específico o funcionalidad especial</div>
                <textarea id="requirements" class="form-control" rows="4" placeholder="Describe cualquier requisito específico, integraciones especiales, o funcionalidades únicas que necesites..."></textarea>
              </div>
              
              <button type="button" id="calculate-btn" class="calculate-btn">
                🧮 Calcular Presupuesto
              </button>
            </form>
          </div>
          
          <div class="results-panel" data-aos="fade-left">
            <div class="results-header">
              <h3>📊 Estimación de Presupuesto</h3>
            </div>
            
            <div class="total-estimate">
              <div class="estimate-amount" id="total-amount">$0</div>
              <div class="estimate-range" id="estimate-range">Rango: $0 - $0</div>
              <div class="estimate-timeline" id="estimate-timeline">⏱️ Tiempo estimado: --</div>
            </div>
            
            <div class="breakdown-section">
              <h4 style="color: #00d4ff; margin-bottom: 20px; font-family: 'Rajdhani', sans-serif;">💼 Desglose de Costos</h4>
              <ul class="breakdown-list" id="breakdown-list">
                <li class="breakdown-item">
                  <span class="breakdown-name">Selecciona un proyecto para ver el desglose</span>
                  <span class="breakdown-price">--</span>
                </li>
              </ul>
            </div>
            
            <div class="contact-cta">
              <h4>🤝 ¿Listo para comenzar?</h4>
              <p>Esta es una estimación inicial. Contacta para una cotización detallada y personalizada.</p>
              <a href="#contact" class="cta-btn">💬 Solicitar Cotización</a>
            </div>
            
            <div class="disclaimer">
              <strong>⚠️ Nota importante:</strong> Esta es una estimación automatizada basada en parámetros estándar. El costo final puede variar según los requisitos específicos, complejidad real del proyecto y alcance detallado. Se recomienda una consulta personalizada para obtener una cotización precisa.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  generateFeaturesHTML() {
    return Object.entries(this.pricing.features).map(([key, feature]) => {
      const featureName = this.getFeatureName(key);
      return `
        <div class="checkbox-item">
          <input type="checkbox" id="feature-${key}" value="${key}">
          <div class="feature-info">
            <div class="feature-name">${featureName}</div>
            <div class="feature-price">+$${feature.price}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  getFeatureName(key) {
    const names = {
      'responsive-design': '📱 Diseño Responsivo',
      'admin-panel': '👨‍💼 Panel de Administración',
      'user-auth': '🔐 Autenticación de Usuarios',
      'payment-integration': '💳 Integración de Pagos',
      'api-development': '🔌 Desarrollo de APIs',
      'database-design': '🗄️ Diseño de Base de Datos',
      'real-time-features': '⚡ Funciones en Tiempo Real',
      'third-party-apis': '🔗 APIs de Terceros',
      'seo-optimization': '🔍 Optimización SEO',
      'analytics-tracking': '📈 Seguimiento de Analytics',
      'security-audit': '🛡️ Auditoría de Seguridad',
      'performance-optimization': '🚀 Optimización de Rendimiento',
      'testing-qa': '🧪 Testing y QA',
      'documentation': '📚 Documentación',
      'deployment-setup': '🚀 Configuración de Despliegue',
      'maintenance-support': '🔧 Soporte y Mantenimiento'
    };
    return names[key] || key;
  }

  setupEventListeners() {
    // Project type change
    document.addEventListener('change', (e) => {
      if (e.target.id === 'project-type') {
        this.currentEstimate.projectType = e.target.value;
        this.updateEstimate();
      }
      
      if (e.target.id === 'urgency') {
        this.currentEstimate.urgency = e.target.value;
        this.updateEstimate();
      }
      
      if (e.target.type === 'checkbox' && e.target.id.startsWith('feature-')) {
        this.updateFeatures();
        this.updateEstimate();
      }
    });
    
    // Complexity slider
    document.addEventListener('input', (e) => {
      if (e.target.id === 'complexity') {
        this.currentEstimate.complexity = parseInt(e.target.value);
        this.updateComplexityDisplay();
        this.updateEstimate();
      }
    });
    
    // Calculate button
    document.addEventListener('click', (e) => {
      if (e.target.id === 'calculate-btn') {
        this.calculateAndDisplay();
      }
    });
  }

  updateFeatures() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    this.currentEstimate.features = Array.from(checkboxes).map(cb => cb.value);
  }

  updateComplexityDisplay() {
    const complexityValue = document.getElementById('complexity-value');
    if (complexityValue) {
      const complexity = this.pricing.complexity[this.currentEstimate.complexity];
      complexityValue.textContent = complexity.label;
    }
  }

  updateEstimate() {
    if (!this.currentEstimate.projectType) {
      this.displayEmptyEstimate();
      return;
    }
    
    const calculation = this.calculateTotal();
    this.displayEstimate(calculation);
  }

  calculateTotal() {
    const projectType = this.pricing.projectTypes[this.currentEstimate.projectType];
    if (!projectType) return { total: 0, breakdown: {}, timeline: '' };
    
    let breakdown = {
      'Proyecto Base': projectType.base
    };
    
    let total = projectType.base;
    
    // Add features
    this.currentEstimate.features.forEach(featureKey => {
      const feature = this.pricing.features[featureKey];
      if (feature) {
        const featureName = this.getFeatureName(featureKey);
        breakdown[featureName] = feature.price;
        total += feature.price;
      }
    });
    
    // Apply complexity multiplier
    const complexityMultiplier = this.pricing.complexity[this.currentEstimate.complexity].multiplier;
    if (complexityMultiplier !== 1.0) {
      const complexityAdjustment = total * (complexityMultiplier - 1);
      breakdown['Ajuste por Complejidad'] = Math.round(complexityAdjustment);
      total *= complexityMultiplier;
    }
    
    // Apply urgency multiplier
    const urgencyMultiplier = this.pricing.urgency[this.currentEstimate.urgency].multiplier;
    if (urgencyMultiplier !== 1.0) {
      const urgencyAdjustment = total * (urgencyMultiplier - 1);
      breakdown['Ajuste por Urgencia'] = Math.round(urgencyAdjustment);
      total *= urgencyMultiplier;
    }
    
    return {
      total: Math.round(total),
      breakdown,
      timeline: projectType.timeline,
      range: {
        min: Math.round(total * 0.8),
        max: Math.round(total * 1.2)
      }
    };
  }

  displayEstimate(calculation) {
    const totalAmount = document.getElementById('total-amount');
    const estimateRange = document.getElementById('estimate-range');
    const estimateTimeline = document.getElementById('estimate-timeline');
    const breakdownList = document.getElementById('breakdown-list');
    
    if (totalAmount) {
      totalAmount.textContent = `$${calculation.total.toLocaleString()}`;
    }
    
    if (estimateRange) {
      estimateRange.textContent = `Rango: $${calculation.range.min.toLocaleString()} - $${calculation.range.max.toLocaleString()}`;
    }
    
    if (estimateTimeline) {
      estimateTimeline.textContent = `⏱️ Tiempo estimado: ${calculation.timeline}`;
    }
    
    if (breakdownList) {
      const breakdownHTML = Object.entries(calculation.breakdown).map(([name, price]) => `
        <li class="breakdown-item">
          <span class="breakdown-name">${name}</span>
          <span class="breakdown-price">$${price.toLocaleString()}</span>
        </li>
      `).join('');
      
      breakdownList.innerHTML = breakdownHTML + `
        <li class="breakdown-item">
          <span class="breakdown-name"><strong>Total Estimado</strong></span>
          <span class="breakdown-price"><strong>$${calculation.total.toLocaleString()}</strong></span>
        </li>
      `;
    }
  }

  displayEmptyEstimate() {
    const totalAmount = document.getElementById('total-amount');
    const estimateRange = document.getElementById('estimate-range');
    const estimateTimeline = document.getElementById('estimate-timeline');
    const breakdownList = document.getElementById('breakdown-list');
    
    if (totalAmount) totalAmount.textContent = '$0';
    if (estimateRange) estimateRange.textContent = 'Rango: $0 - $0';
    if (estimateTimeline) estimateTimeline.textContent = '⏱️ Tiempo estimado: --';
    if (breakdownList) {
      breakdownList.innerHTML = `
        <li class="breakdown-item">
          <span class="breakdown-name">Selecciona un proyecto para ver el desglose</span>
          <span class="breakdown-price">--</span>
        </li>
      `;
    }
  }

  calculateAndDisplay() {
    const form = document.getElementById('budget-form');
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (!this.currentEstimate.projectType) {
      alert('Por favor selecciona un tipo de proyecto antes de calcular.');
      return;
    }
    
    // Add visual feedback
    calculateBtn.textContent = '🔄 Calculando...';
    calculateBtn.disabled = true;
    
    setTimeout(() => {
      this.updateEstimate();
      
      // Add animation to results
      const resultsPanel = document.querySelector('.results-panel');
      if (resultsPanel) {
        resultsPanel.classList.add('pulse');
        setTimeout(() => {
          resultsPanel.classList.remove('pulse');
        }, 2000);
      }
      
      calculateBtn.textContent = '🧮 Calcular Presupuesto';
      calculateBtn.disabled = false;
      
      // Scroll to results on mobile
      if (window.innerWidth <= 992) {
        resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1000);
  }

  // Public method to get current estimate (for external use)
  getCurrentEstimate() {
    return {
      ...this.currentEstimate,
      calculation: this.calculateTotal()
    };
  }
}

// Initialize Budget Calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.budgetCalculator = new BudgetCalculator();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BudgetCalculator;
}