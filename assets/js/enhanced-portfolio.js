/**
 * ENHANCED PORTFOLIO SYSTEM
 * Manages interactive portfolio with metrics, case studies, and detailed project information
 */

class EnhancedPortfolio {
  constructor() {
    this.portfolioData = {
      projects: [
        {
          id: 'ecommerce-platform',
          title: 'Plataforma E-commerce Avanzada',
          category: 'Desarrollo Full Stack',
          status: 'completed',
          description: 'Desarrollo completo de una plataforma de comercio electrónico con funcionalidades avanzadas de gestión de inventario, procesamiento de pagos y análisis de ventas en tiempo real.',
          image: 'assets/img/portfolio/portfolio-1.webp',
          metrics: {
            performance: '+150%',
            users: '10,000+',
            revenue: '+300%',
            uptime: '99.9%'
          },
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'AWS', 'Docker'],
          challenges: [
            'Escalabilidad para manejar picos de tráfico durante eventos de ventas',
            'Integración segura de múltiples pasarelas de pago',
            'Optimización de rendimiento para carga rápida de productos'
          ],
          solutions: [
            'Implementación de microservicios con auto-escalado en AWS',
            'Sistema de autenticación robusto con JWT y OAuth2',
            'Cache distribuido con Redis para optimizar consultas de base de datos'
          ],
          results: {
            conversionRate: '+45%',
            loadTime: '-60%',
            customerSatisfaction: '4.8/5',
            monthlyRevenue: '+$50K'
          },
          timeline: [
            { date: 'Mes 1', event: 'Análisis de requisitos y diseño de arquitectura' },
            { date: 'Mes 2-3', event: 'Desarrollo del backend y APIs' },
            { date: 'Mes 4-5', event: 'Desarrollo del frontend y UX/UI' },
            { date: 'Mes 6', event: 'Testing, optimización y despliegue' }
          ],
          liveUrl: '#',
          caseStudyUrl: '#'
        },
        {
          id: 'security-dashboard',
          title: 'Dashboard de Seguridad Empresarial',
          category: 'Ciberseguridad',
          status: 'completed',
          description: 'Sistema integral de monitoreo de seguridad que proporciona análisis en tiempo real de amenazas, gestión de vulnerabilidades y reportes de cumplimiento normativo.',
          image: 'assets/img/portfolio/portfolio-2.webp',
          metrics: {
            threats: '500+',
            response: '-80%',
            compliance: '100%',
            incidents: '-90%'
          },
          technologies: ['Python', 'Django', 'PostgreSQL', 'Elasticsearch', 'Kibana', 'Docker'],
          challenges: [
            'Procesamiento en tiempo real de grandes volúmenes de logs de seguridad',
            'Correlación inteligente de eventos para detectar amenazas avanzadas',
            'Cumplimiento con múltiples marcos normativos (ISO 27001, NIST)'
          ],
          solutions: [
            'Pipeline de procesamiento de datos con Apache Kafka y Elasticsearch',
            'Algoritmos de machine learning para detección de anomalías',
            'Módulos automatizados de generación de reportes de cumplimiento'
          ],
          results: {
            detectionTime: '-75%',
            falsePositives: '-60%',
            complianceScore: '98%',
            costSavings: '$200K/año'
          },
          timeline: [
            { date: 'Mes 1', event: 'Análisis de infraestructura y requisitos de seguridad' },
            { date: 'Mes 2-4', event: 'Desarrollo del motor de correlación y APIs' },
            { date: 'Mes 5-6', event: 'Implementación del dashboard y visualizaciones' },
            { date: 'Mes 7', event: 'Integración con sistemas existentes y testing' }
          ],
          liveUrl: '#',
          caseStudyUrl: '#'
        },
        {
          id: 'data-analytics-platform',
          title: 'Plataforma de Análisis de Datos',
          category: 'Data Science',
          status: 'ongoing',
          description: 'Plataforma avanzada de análisis de datos que utiliza machine learning para generar insights empresariales, predicciones de mercado y optimización de procesos.',
          image: 'assets/img/portfolio/portfolio-3.webp',
          metrics: {
            accuracy: '94%',
            processing: '1M+',
            insights: '500+',
            efficiency: '+200%'
          },
          technologies: ['Python', 'TensorFlow', 'Apache Spark', 'Tableau', 'AWS SageMaker', 'Kubernetes'],
          challenges: [
            'Procesamiento eficiente de datasets masivos (>100GB)',
            'Desarrollo de modelos predictivos con alta precisión',
            'Visualización intuitiva de datos complejos para stakeholders no técnicos'
          ],
          solutions: [
            'Arquitectura distribuida con Apache Spark para procesamiento paralelo',
            'Ensemble de modelos de ML con validación cruzada y hyperparameter tuning',
            'Dashboards interactivos con drill-down capabilities y filtros dinámicos'
          ],
          results: {
            decisionSpeed: '+150%',
            predictionAccuracy: '94%',
            operationalCosts: '-30%',
            dataProcessing: '+500%'
          },
          timeline: [
            { date: 'Mes 1-2', event: 'Diseño de arquitectura de datos y ETL pipelines' },
            { date: 'Mes 3-5', event: 'Desarrollo de modelos de ML y algoritmos predictivos' },
            { date: 'Mes 6-7', event: 'Implementación de dashboards y visualizaciones' },
            { date: 'Mes 8', event: 'Testing, optimización y despliegue en producción' }
          ],
          liveUrl: '#',
          caseStudyUrl: '#'
        },
        {
          id: 'mobile-fintech-app',
          title: 'Aplicación Fintech Móvil',
          category: 'Desarrollo Móvil',
          status: 'completed',
          description: 'Aplicación móvil innovadora para servicios financieros con funcionalidades de banca digital, inversiones automatizadas y gestión de presupuestos personales.',
          image: 'assets/img/portfolio/portfolio-4.webp',
          metrics: {
            downloads: '50K+',
            rating: '4.9/5',
            transactions: '$2M+',
            retention: '85%'
          },
          technologies: ['React Native', 'Node.js', 'MongoDB', 'Blockchain', 'Biometric Auth', 'Push Notifications'],
          challenges: [
            'Implementación de seguridad bancaria de nivel empresarial',
            'Integración con múltiples APIs financieras y regulatorias',
            'Experiencia de usuario fluida en dispositivos con recursos limitados'
          ],
          solutions: [
            'Autenticación biométrica y encriptación end-to-end',
            'Middleware personalizado para normalizar APIs de terceros',
            'Optimización de rendimiento con lazy loading y caching inteligente'
          ],
          results: {
            userAcquisition: '+300%',
            transactionVolume: '+250%',
            customerSupport: '-40%',
            appPerformance: '+180%'
          },
          timeline: [
            { date: 'Mes 1', event: 'Research de mercado y diseño UX/UI' },
            { date: 'Mes 2-4', event: 'Desarrollo del core de la aplicación' },
            { date: 'Mes 5-6', event: 'Integración de APIs y testing de seguridad' },
            { date: 'Mes 7', event: 'Beta testing y lanzamiento en stores' }
          ],
          liveUrl: '#',
          caseStudyUrl: '#'
        }
      ]
    };
    
    this.init();
  }

  init() {
    this.createEnhancedPortfolioSection();
    this.setupIntersectionObserver();
    this.setupEventListeners();
  }

  createEnhancedPortfolioSection() {
    const portfolioSection = document.getElementById('portfolio');
    if (!portfolioSection) return;

    // Create new enhanced portfolio content
    const enhancedContent = this.generateEnhancedPortfolioHTML();
    
    // Replace existing portfolio content
    const container = portfolioSection.querySelector('.container');
    if (container) {
      container.innerHTML = enhancedContent;
    }
  }

  generateEnhancedPortfolioHTML() {
    const projectsHTML = this.portfolioData.projects.map(project => 
      this.generateProjectHTML(project)
    ).join('');

    return `
      <div class="section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>Casos de estudio detallados con métricas cuantificables y resultados comprobados</p>
      </div>
      
      <div class="enhanced-portfolio">
        ${projectsHTML}
      </div>
    `;
  }

  generateProjectHTML(project) {
    const metricsHTML = Object.entries(project.metrics).map(([key, value]) => `
      <div class="metric-item" data-metric="${key}">
        <span class="metric-value">${value}</span>
        <span class="metric-label">${this.getMetricLabel(key)}</span>
      </div>
    `).join('');

    const techStackHTML = project.technologies.map(tech => 
      `<span class="tech-tag">${tech}</span>`
    ).join('');

    const challengesHTML = project.challenges.map(challenge => 
      `<li>${challenge}</li>`
    ).join('');

    const solutionsHTML = project.solutions.map(solution => 
      `<li>${solution}</li>`
    ).join('');

    const timelineHTML = project.timeline.map(item => `
      <div class="timeline-item">
        <span class="timeline-date">${item.date}:</span>
        <span class="timeline-event">${item.event}</span>
      </div>
    `).join('');

    const resultsHTML = Object.entries(project.results).map(([key, value]) => `
      <div class="result-item">
        <span class="result-value">${value}</span>
        <span class="result-description">${this.getResultLabel(key)}</span>
      </div>
    `).join('');

    return `
      <div class="portfolio-enhanced-item" data-project="${project.id}" data-aos="fade-up">
        <div class="portfolio-header">
          <div class="portfolio-title-section">
            <h3>${project.title}</h3>
            <span class="portfolio-category">${project.category}</span>
          </div>
          <div class="portfolio-status">
            <span class="status-badge status-${project.status}">
              ${project.status === 'completed' ? 'Completado' : 'En Progreso'}
            </span>
          </div>
        </div>
        
        <p class="portfolio-description">${project.description}</p>
        
        <div class="portfolio-metrics">
          ${metricsHTML}
        </div>
        
        <div class="portfolio-technologies">
          <h4 style="color: #00d4ff; margin-bottom: 10px;">Tecnologías Utilizadas:</h4>
          <div class="tech-stack">
            ${techStackHTML}
          </div>
        </div>
        
        <div class="portfolio-challenges">
          <h4 class="challenge-title">🚧 Desafíos Principales:</h4>
          <ul>
            ${challengesHTML}
          </ul>
        </div>
        
        <div class="portfolio-solutions">
          <h4 class="solution-title">✅ Soluciones Implementadas:</h4>
          <ul>
            ${solutionsHTML}
          </ul>
        </div>
        
        <div class="portfolio-results">
          <h4 class="results-title">
            <i class="bi bi-graph-up"></i>
            Resultados Obtenidos
          </h4>
          <div class="results-grid">
            ${resultsHTML}
          </div>
        </div>
        
        <div class="portfolio-timeline">
          <h4 style="color: #00d4ff; margin-bottom: 15px;">📅 Timeline del Proyecto:</h4>
          ${timelineHTML}
        </div>
        
        <div class="portfolio-actions">
          <a href="${project.liveUrl}" class="portfolio-btn btn-primary">
            <i class="bi bi-eye"></i>
            Ver Proyecto
          </a>
          <a href="${project.caseStudyUrl}" class="portfolio-btn btn-secondary">
            <i class="bi bi-file-text"></i>
            Caso de Estudio
          </a>
          <a href="#contact" class="portfolio-btn btn-secondary">
            <i class="bi bi-chat-dots"></i>
            Discutir Proyecto
          </a>
        </div>
      </div>
    `;
  }

  getMetricLabel(key) {
    const labels = {
      performance: 'Mejora Rendimiento',
      users: 'Usuarios Activos',
      revenue: 'Incremento Ingresos',
      uptime: 'Disponibilidad',
      threats: 'Amenazas Detectadas',
      response: 'Tiempo Respuesta',
      compliance: 'Cumplimiento',
      incidents: 'Reducción Incidentes',
      accuracy: 'Precisión Modelo',
      processing: 'Registros Procesados',
      insights: 'Insights Generados',
      efficiency: 'Eficiencia Operativa',
      downloads: 'Descargas',
      rating: 'Calificación',
      transactions: 'Volumen Transacciones',
      retention: 'Retención Usuarios'
    };
    return labels[key] || key;
  }

  getResultLabel(key) {
    const labels = {
      conversionRate: 'Tasa de Conversión',
      loadTime: 'Tiempo de Carga',
      customerSatisfaction: 'Satisfacción Cliente',
      monthlyRevenue: 'Ingresos Mensuales',
      detectionTime: 'Tiempo Detección',
      falsePositives: 'Falsos Positivos',
      complianceScore: 'Score Cumplimiento',
      costSavings: 'Ahorro en Costos',
      decisionSpeed: 'Velocidad Decisiones',
      predictionAccuracy: 'Precisión Predicciones',
      operationalCosts: 'Costos Operativos',
      dataProcessing: 'Procesamiento Datos',
      userAcquisition: 'Adquisición Usuarios',
      transactionVolume: 'Volumen Transacciones',
      customerSupport: 'Tickets Soporte',
      appPerformance: 'Rendimiento App'
    };
    return labels[key] || key;
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateMetrics(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    // Observe all portfolio items
    setTimeout(() => {
      const portfolioItems = document.querySelectorAll('.portfolio-enhanced-item');
      portfolioItems.forEach(item => observer.observe(item));
    }, 500);
  }

  animateMetrics(portfolioItem) {
    const metrics = portfolioItem.querySelectorAll('.metric-item');
    metrics.forEach((metric, index) => {
      setTimeout(() => {
        metric.classList.add('animate');
        this.animateCountUp(metric.querySelector('.metric-value'));
      }, index * 200);
    });
  }

  animateCountUp(element) {
    const text = element.textContent;
    const hasNumber = /\d/.test(text);
    
    if (hasNumber) {
      const number = parseInt(text.replace(/[^\d]/g, ''));
      const suffix = text.replace(/[\d,]/g, '');
      const duration = 1500;
      const steps = 30;
      const increment = number / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          current = number;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString() + suffix;
      }, duration / steps);
    }
  }

  setupEventListeners() {
    // Add click handlers for portfolio actions
    document.addEventListener('click', (e) => {
      if (e.target.closest('.portfolio-btn')) {
        const btn = e.target.closest('.portfolio-btn');
        const href = btn.getAttribute('href');
        
        if (href === '#') {
          e.preventDefault();
          this.showComingSoon();
        }
      }
    });
  }

  showComingSoon() {
    // Create a simple modal or notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: #00d4ff;
      padding: 20px 40px;
      border-radius: 10px;
      border: 2px solid #00d4ff;
      z-index: 10000;
      text-align: center;
      backdrop-filter: blur(10px);
    `;
    notification.innerHTML = `
      <h3 style="margin: 0 0 10px 0;">🚀 Próximamente</h3>
      <p style="margin: 0;">Esta funcionalidad estará disponible pronto</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  }
}

// Initialize Enhanced Portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.enhancedPortfolio = new EnhancedPortfolio();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedPortfolio;
}