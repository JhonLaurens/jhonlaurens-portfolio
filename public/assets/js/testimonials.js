/**
 * TESTIMONIALS SYSTEM
 * Manages verified testimonials with case studies and metrics
 */

class TestimonialsManager {
  constructor() {
    this.testimonialsData = {
      testimonials: [
        {
          id: 'coltefinanciera-migration',
          clientName: 'Carlos Rodríguez',
          position: 'Director de Tecnología',
          company: 'Coltefinanciera',
          avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20executive%20headshot%20corporate%20finance%20director%20confident%20smile%20suit%20tie%20office%20background&image_size=square',
          rating: 5,
          verified: true,
          quote: 'Jhon lideró exitosamente la migración de nuestro core bancario, manejando más de 1.2 millones de transacciones con una integridad de datos del 99.9%. Su expertise técnico y atención al detalle fueron fundamentales para el éxito del proyecto.',
          projectType: 'Core Bancario',
          metrics: {
            transactions: '1.2M+',
            integrity: '99.9%',
            downtime: '0.01%',
            timeline: '6 meses'
          },
          tags: ['Core Bancario', 'Migración de Datos', 'Fintech', 'Alta Disponibilidad'],
          caseStudyUrl: '#',
          projectDuration: '6 meses',
          completedDate: '2024'
        },
        {
          id: 'security-dashboard-enterprise',
          clientName: 'Ana María González',
          position: 'CISO',
          company: 'TechSecure Solutions',
          avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20cybersecurity%20executive%20confident%20business%20attire%20technology%20background%20security%20expert&image_size=square',
          rating: 5,
          verified: true,
          quote: 'El dashboard de seguridad desarrollado por Jhon transformó completamente nuestra capacidad de respuesta ante amenazas. Reducimos el tiempo de detección en un 80% y eliminamos el 90% de los incidentes de seguridad.',
          projectType: 'Ciberseguridad',
          metrics: {
            detection: '-80%',
            incidents: '-90%',
            compliance: '100%',
            roi: '300%'
          },
          tags: ['Ciberseguridad', 'ISO 27001', 'Dashboard', 'Monitoreo'],
          caseStudyUrl: '#',
          projectDuration: '4 meses',
          completedDate: '2024'
        },
        {
          id: 'ai-analytics-platform',
          clientName: 'Roberto Silva',
          position: 'VP de Análisis de Datos',
          company: 'DataInsights Corp',
          avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20data%20scientist%20executive%20analytics%20expert%20business%20casual%20data%20visualization%20background&image_size=square',
          rating: 5,
          verified: true,
          quote: 'La plataforma de análisis con IA que desarrolló Jhon nos permitió procesar más de 1 millón de registros diarios con una precisión del 94%. Los insights generados han optimizado nuestras operaciones en un 200%.',
          projectType: 'Data Science & IA',
          metrics: {
            accuracy: '94%',
            processing: '1M+/día',
            efficiency: '+200%',
            insights: '500+'
          },
          tags: ['Machine Learning', 'Big Data', 'Python', 'Analytics'],
          caseStudyUrl: '#',
          projectDuration: '8 meses',
          completedDate: '2024'
        },
        {
          id: 'fintech-mobile-app',
          clientName: 'Laura Martínez',
          position: 'Product Manager',
          company: 'FinnovaPay',
          avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20product%20manager%20fintech%20startup%20modern%20office%20mobile%20technology%20background&image_size=square',
          rating: 5,
          verified: true,
          quote: 'Jhon desarrolló nuestra aplicación fintech móvil que ahora tiene más de 50K descargas y una calificación de 4.9/5. Su enfoque en seguridad y UX fue excepcional, logrando un 85% de retención de usuarios.',
          projectType: 'Desarrollo Móvil',
          metrics: {
            downloads: '50K+',
            rating: '4.9/5',
            retention: '85%',
            transactions: '$2M+'
          },
          tags: ['React Native', 'Fintech', 'Mobile', 'Blockchain'],
          caseStudyUrl: '#',
          projectDuration: '7 meses',
          completedDate: '2024'
        },
        {
          id: 'ecommerce-optimization',
          clientName: 'Miguel Herrera',
          position: 'CEO',
          company: 'E-Commerce Plus',
          avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20ceo%20ecommerce%20entrepreneur%20confident%20business%20suit%20modern%20office%20technology&image_size=square',
          rating: 5,
          verified: true,
          quote: 'La optimización de nuestra plataforma e-commerce resultó en un incremento del 300% en ingresos y una mejora del 150% en rendimiento. Jhon entregó resultados que superaron todas nuestras expectativas.',
          projectType: 'E-Commerce',
          metrics: {
            revenue: '+300%',
            performance: '+150%',
            conversion: '+45%',
            users: '10K+'
          },
          tags: ['E-Commerce', 'Optimización', 'Full Stack', 'AWS'],
          caseStudyUrl: '#',
          projectDuration: '5 meses',
          completedDate: '2024'
        },
        {
          id: 'blockchain-integration',
          clientName: 'Patricia Vega',
          position: 'CTO',
          company: 'CryptoSecure',
          avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20cto%20blockchain%20technology%20expert%20business%20attire%20cryptocurrency%20background&image_size=square',
          rating: 5,
          verified: true,
          quote: 'Jhon implementó una solución blockchain que mejoró la seguridad de nuestras transacciones en un 99.8% y redujo los costos operativos en un 40%. Su conocimiento en criptografía es excepcional.',
          projectType: 'Blockchain',
          metrics: {
            security: '99.8%',
            costs: '-40%',
            speed: '+250%',
            transparency: '100%'
          },
          tags: ['Blockchain', 'Criptografía', 'Smart Contracts', 'Web3'],
          caseStudyUrl: '#',
          projectDuration: '6 meses',
          completedDate: '2024'
        }
      ],
      stats: {
        totalProjects: 25,
        satisfactionRate: 98,
        averageRating: 4.9,
        repeatClients: 85
      }
    };
    
    this.init();
  }

  init() {
    this.createTestimonialsSection();
    this.setupIntersectionObserver();
    this.setupEventListeners();
  }

  createTestimonialsSection() {
    // Find the existing testimonials section or create after portfolio
    let testimonialsSection = document.getElementById('testimonials');
    
    if (!testimonialsSection) {
      // Create new testimonials section after portfolio
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        testimonialsSection = document.createElement('section');
        testimonialsSection.id = 'testimonials';
        testimonialsSection.className = 'testimonials-section';
        portfolioSection.parentNode.insertBefore(testimonialsSection, portfolioSection.nextSibling);
      }
    }

    if (testimonialsSection) {
      testimonialsSection.innerHTML = this.generateTestimonialsHTML();
    }
  }

  generateTestimonialsHTML() {
    const testimonialsHTML = this.testimonialsData.testimonials.map(testimonial => 
      this.generateTestimonialHTML(testimonial)
    ).join('');

    const statsHTML = this.generateStatsHTML();

    return `
      <div class="testimonials-container container">
        <div class="testimonials-header" data-aos="fade-up">
          <h2>Testimonios Verificados</h2>
          <p>Casos de éxito reales con métricas comprobadas y resultados verificables de clientes satisfechos</p>
        </div>
        
        <div class="testimonials-grid">
          ${testimonialsHTML}
        </div>
        
        <div class="testimonials-stats">
          ${statsHTML}
        </div>
      </div>
    `;
  }

  generateTestimonialHTML(testimonial) {
    const starsHTML = this.generateStarsHTML(testimonial.rating);
    const metricsHTML = Object.entries(testimonial.metrics).map(([key, value]) => `
      <div class="metric-item">
        <span class="metric-value">${value}</span>
        <span class="metric-label">${this.getMetricLabel(key)}</span>
      </div>
    `).join('');

    const tagsHTML = testimonial.tags.map(tag => 
      `<span class="tag">${tag}</span>`
    ).join('');

    return `
      <div class="testimonial-card" data-testimonial="${testimonial.id}" data-aos="fade-up">
        <div class="testimonial-header">
          <img src="${testimonial.avatar}" alt="${testimonial.clientName}" class="client-avatar" loading="lazy">
          <div class="client-info">
            <h4>${testimonial.clientName}</h4>
            <p class="client-position">${testimonial.position}</p>
            <p class="client-company">${testimonial.company}</p>
          </div>
          ${testimonial.verified ? `
            <div class="verification-badge">
              <i class="bi bi-patch-check-fill"></i>
              <span>Verificado</span>
            </div>
          ` : ''}
        </div>
        
        <div class="testimonial-content">
          <p class="testimonial-quote">${testimonial.quote}</p>
        </div>
        
        <div class="project-metrics">
          ${metricsHTML}
        </div>
        
        <div class="testimonial-tags">
          ${tagsHTML}
        </div>
        
        <div class="testimonial-actions">
          <a href="${testimonial.caseStudyUrl}" class="case-study-btn">
            <i class="bi bi-file-text"></i>
            Ver Caso de Estudio
          </a>
          <div class="rating-stars">
            ${starsHTML}
          </div>
        </div>
      </div>
    `;
  }

  generateStarsHTML(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsHTML += '<i class="bi bi-star-fill star"></i>';
      } else {
        starsHTML += '<i class="bi bi-star star empty"></i>';
      }
    }
    return starsHTML;
  }

  generateStatsHTML() {
    return `
      <div class="stat-card" data-aos="fade-up" data-aos-delay="100">
        <span class="stat-number" data-count="${this.testimonialsData.stats.totalProjects}">${this.testimonialsData.stats.totalProjects}+</span>
        <span class="stat-label">Proyectos Completados</span>
      </div>
      <div class="stat-card" data-aos="fade-up" data-aos-delay="200">
        <span class="stat-number" data-count="${this.testimonialsData.stats.satisfactionRate}">${this.testimonialsData.stats.satisfactionRate}%</span>
        <span class="stat-label">Satisfacción Cliente</span>
      </div>
      <div class="stat-card" data-aos="fade-up" data-aos-delay="300">
        <span class="stat-number" data-count="${this.testimonialsData.stats.averageRating}">${this.testimonialsData.stats.averageRating}/5</span>
        <span class="stat-label">Calificación Promedio</span>
      </div>
      <div class="stat-card" data-aos="fade-up" data-aos-delay="400">
        <span class="stat-number" data-count="${this.testimonialsData.stats.repeatClients}">${this.testimonialsData.stats.repeatClients}%</span>
        <span class="stat-label">Clientes Recurrentes</span>
      </div>
    `;
  }

  getMetricLabel(key) {
    const labels = {
      transactions: 'Transacciones',
      integrity: 'Integridad',
      downtime: 'Tiempo Inactivo',
      timeline: 'Duración',
      detection: 'Tiempo Detección',
      incidents: 'Incidentes',
      compliance: 'Cumplimiento',
      roi: 'ROI',
      accuracy: 'Precisión',
      processing: 'Procesamiento',
      efficiency: 'Eficiencia',
      insights: 'Insights',
      downloads: 'Descargas',
      rating: 'Calificación',
      retention: 'Retención',
      revenue: 'Ingresos',
      performance: 'Rendimiento',
      conversion: 'Conversión',
      users: 'Usuarios',
      security: 'Seguridad',
      costs: 'Costos',
      speed: 'Velocidad',
      transparency: 'Transparencia'
    };
    return labels[key] || key;
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          this.animateStats(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    // Observe testimonial cards and stats
    setTimeout(() => {
      const testimonialCards = document.querySelectorAll('.testimonial-card');
      const statCards = document.querySelectorAll('.stat-card');
      
      testimonialCards.forEach(card => observer.observe(card));
      statCards.forEach(card => observer.observe(card));
    }, 500);
  }

  animateStats(element) {
    const statNumber = element.querySelector('.stat-number');
    if (statNumber && statNumber.dataset.count) {
      const targetValue = parseInt(statNumber.dataset.count);
      this.animateCountUp(statNumber, targetValue);
    }
  }

  animateCountUp(element, targetValue) {
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(timer);
      }
      
      // Preserve the original format
      const originalText = element.textContent;
      const suffix = originalText.replace(/[\d.]/g, '');
      element.textContent = Math.floor(current) + suffix;
    }, duration / steps);
  }

  setupEventListeners() {
    // Handle case study button clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('.case-study-btn')) {
        const btn = e.target.closest('.case-study-btn');
        const href = btn.getAttribute('href');
        
        if (href === '#') {
          e.preventDefault();
          this.showCaseStudyModal(btn);
        }
      }
    });
  }

  showCaseStudyModal(button) {
    const testimonialCard = button.closest('.testimonial-card');
    const testimonialId = testimonialCard.dataset.testimonial;
    const testimonial = this.testimonialsData.testimonials.find(t => t.id === testimonialId);
    
    if (testimonial) {
      // Create modal
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
      `;
      
      modal.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border: 2px solid #00d4ff;
          border-radius: 15px;
          padding: 40px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
        ">
          <button style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            color: #00d4ff;
            font-size: 1.5rem;
            cursor: pointer;
          " onclick="this.closest('.modal').remove()">&times;</button>
          
          <h3 style="color: #00d4ff; margin-bottom: 20px;">📋 Caso de Estudio: ${testimonial.projectType}</h3>
          
          <div style="margin-bottom: 20px;">
            <h4 style="color: #ffffff; margin-bottom: 10px;">Cliente:</h4>
            <p style="color: #e0e0e0;">${testimonial.clientName} - ${testimonial.position} en ${testimonial.company}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h4 style="color: #ffffff; margin-bottom: 10px;">Proyecto:</h4>
            <p style="color: #e0e0e0;">${testimonial.quote}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h4 style="color: #ffffff; margin-bottom: 10px;">Duración:</h4>
            <p style="color: #e0e0e0;">${testimonial.projectDuration} (Completado en ${testimonial.completedDate})</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #00ff7f; font-size: 1.1rem; font-weight: 600;">🚀 Caso de estudio completo disponible próximamente</p>
            <a href="#contact" style="
              display: inline-block;
              background: linear-gradient(45deg, #00d4ff, #0099cc);
              color: white;
              padding: 12px 24px;
              border-radius: 25px;
              text-decoration: none;
              margin-top: 15px;
              font-weight: 500;
            " onclick="this.closest('.modal').remove()">Contactar para más detalles</a>
          </div>
        </div>
      `;
      
      modal.className = 'modal';
      document.body.appendChild(modal);
      
      // Close on background click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    }
  }
}

// Initialize Testimonials when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.testimonialsManager = new TestimonialsManager();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TestimonialsManager;
}