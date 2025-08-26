/**
 * PROJECT GALLERY ENHANCEMENT SYSTEM
 * Advanced gallery with zoom, navigation, lightbox, and interactive features
 */

class ProjectGallery {
  constructor() {
    this.currentImageIndex = 0;
    this.images = [];
    this.currentFilter = 'all';
    this.isLightboxOpen = false;
    this.zoomLevel = 1;
    this.maxZoom = 3;
    this.minZoom = 0.5;
    
    // Gallery data with enhanced project information
    this.galleryData = {
      'core-bancario': {
        title: '🏦 Core Bancario Coltefinanciera',
        category: 'fintech',
        featured: true,
        images: [
          {
            src: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20banking%20core%20system%20dashboard%20with%20real-time%20transaction%20monitoring%20futuristic%20interface%20blue%20cyan%20colors&image_size=landscape_16_9',
            title: 'Dashboard Principal del Core Bancario',
            description: 'Sistema de monitoreo en tiempo real de transacciones bancarias con arquitectura de microservicios.'
          },
          {
            src: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=banking%20transaction%20processing%20system%20interface%20with%20data%20visualization%20charts%20modern%20fintech%20design&image_size=landscape_16_9',
            title: 'Procesamiento de Transacciones',
            description: 'Motor de procesamiento de transacciones con capacidad de 10,000+ TPS y validación en tiempo real.'
          }
        ],
        description: 'Migración y optimización del core bancario de Coltefinanciera, procesando 1.2M+ transacciones con 99.9% de integridad.',
        technologies: ['Python', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Apache Kafka'],
        metrics: {
          transactions: '1.2M+',
          uptime: '99.9%',
          performance: '+40%'
        },
        beforeAfter: {
          before: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=old%20legacy%20banking%20system%20interface%20outdated%20design%20slow%20performance%20monolithic%20architecture&image_size=landscape_16_9',
          after: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20banking%20core%20system%20dashboard%20with%20real-time%20transaction%20monitoring%20futuristic%20interface%20blue%20cyan%20colors&image_size=landscape_16_9'
        }
      },
      'ai-predictive': {
        title: '🤖 Sistema Predictivo IA',
        category: 'ai-ml',
        featured: false,
        images: [
          {
            src: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=artificial%20intelligence%20machine%20learning%20dashboard%20with%20predictive%20analytics%20neural%20network%20visualization%20futuristic%20interface&image_size=landscape_16_9',
            title: 'Dashboard de IA Predictiva',
            description: 'Sistema de machine learning para predicción de riesgos financieros con precisión del 94%.'
          }
        ],
        description: 'Modelo de IA para predicción de riesgos crediticios con algoritmos de deep learning y procesamiento en tiempo real.',
        technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Apache Spark', 'MLflow'],
        metrics: {
          accuracy: '94%',
          predictions: '50K+/día',
          reduction: '35% riesgo'
        }
      },
      'cybersecurity-iso': {
        title: '🛡️ Implementación ISO 27001',
        category: 'cybersecurity',
        featured: false,
        images: [
          {
            src: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cybersecurity%20dashboard%20ISO%2027001%20compliance%20security%20monitoring%20threat%20detection%20interface%20dark%20theme&image_size=landscape_16_9',
            title: 'Centro de Comando de Seguridad',
            description: 'Sistema de monitoreo de seguridad 24/7 con detección automática de amenazas y respuesta en tiempo real.'
          }
        ],
        description: 'Implementación completa de ISO 27001 con sistemas de monitoreo continuo y respuesta automática a incidentes.',
        technologies: ['SIEM', 'Python', 'Elasticsearch', 'Kibana', 'Splunk'],
        metrics: {
          compliance: '100%',
          incidents: '-80%',
          response: '< 5 min'
        }
      },
      'data-pipeline': {
        title: '📊 Pipeline de Datos Financieros',
        category: 'data-engineering',
        featured: false,
        images: [
          {
            src: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=data%20engineering%20pipeline%20visualization%20ETL%20process%20real-time%20data%20streaming%20analytics%20dashboard%20modern%20interface&image_size=landscape_16_9',
            title: 'Pipeline ETL en Tiempo Real',
            description: 'Arquitectura de datos escalable procesando 500GB+ diarios con latencia sub-segundo.'
          }
        ],
        description: 'Pipeline de datos de alta performance para procesamiento de información financiera en tiempo real.',
        technologies: ['Apache Airflow', 'Spark', 'Kafka', 'Snowflake', 'dbt'],
        metrics: {
          volume: '500GB+/día',
          latency: '< 1s',
          availability: '99.95%'
        }
      },
      'mobile-fintech': {
        title: '📱 App Fintech Móvil',
        category: 'mobile',
        featured: false,
        images: [
          {
            src: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20fintech%20app%20interface%20modern%20banking%20application%20user%20friendly%20design%20financial%20dashboard%20smartphone&image_size=portrait_16_9',
            title: 'Interfaz Móvil Fintech',
            description: 'Aplicación móvil con biometría avanzada y transacciones instantáneas para 100K+ usuarios activos.'
          }
        ],
        description: 'Aplicación fintech móvil con autenticación biométrica y procesamiento de pagos en tiempo real.',
        technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Stripe'],
        metrics: {
          users: '100K+',
          transactions: '1M+/mes',
          rating: '4.8/5'
        }
      },
      'blockchain-wallet': {
        title: '₿ Wallet Blockchain',
        category: 'blockchain',
        featured: false,
        images: [
          {
            src: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=blockchain%20cryptocurrency%20wallet%20interface%20bitcoin%20ethereum%20trading%20dashboard%20secure%20digital%20assets%20management&image_size=landscape_16_9',
            title: 'Wallet Multi-Criptomoneda',
            description: 'Wallet segura para múltiples criptomonedas con trading integrado y staking automático.'
          }
        ],
        description: 'Wallet blockchain con soporte multi-moneda, trading integrado y funciones DeFi avanzadas.',
        technologies: ['Solidity', 'Web3.js', 'React', 'Node.js', 'IPFS'],
        metrics: {
          assets: '50+ tokens',
          security: 'Auditoría AAA',
          volume: '$10M+ TVL'
        }
      }
    };
    
    this.init();
  }

  init() {
    this.enhancePortfolioGallery();
    this.createLightbox();
    this.setupEventListeners();
    this.initializeFilters();
  }

  enhancePortfolioGallery() {
    const portfolioSection = document.querySelector('#portfolio');
    if (!portfolioSection) return;
    
    // Find existing portfolio items container
    let portfolioContainer = portfolioSection.querySelector('.portfolio-container');
    if (!portfolioContainer) {
      portfolioContainer = portfolioSection.querySelector('.container');
    }
    
    if (portfolioContainer) {
      // Create enhanced gallery
      const enhancedGallery = this.createEnhancedGallery();
      
      // Insert after existing content or replace
      const existingGallery = portfolioContainer.querySelector('.portfolio-isotope');
      if (existingGallery) {
        existingGallery.insertAdjacentHTML('afterend', enhancedGallery);
      } else {
        portfolioContainer.insertAdjacentHTML('beforeend', enhancedGallery);
      }
    }
  }

  createEnhancedGallery() {
    return `
      <div class="project-gallery fade-in">
        <div class="gallery-header">
          <h3 class="gallery-title">🚀 Galería Interactiva de Proyectos</h3>
          <div class="gallery-controls">
            <button class="gallery-btn" id="grid-view" title="Vista de Cuadrícula">
              <i class="bi bi-grid-3x3"></i> Cuadrícula
            </button>
            <button class="gallery-btn" id="list-view" title="Vista de Lista">
              <i class="bi bi-list"></i> Lista
            </button>
            <button class="gallery-btn" id="fullscreen-btn" title="Pantalla Completa">
              <i class="bi bi-fullscreen"></i> Expandir
            </button>
          </div>
        </div>
        
        <div class="gallery-filters">
          <button class="filter-btn active" data-filter="all">🌟 Todos</button>
          <button class="filter-btn" data-filter="fintech">🏦 Fintech</button>
          <button class="filter-btn" data-filter="ai-ml">🤖 IA/ML</button>
          <button class="filter-btn" data-filter="cybersecurity">🛡️ Ciberseguridad</button>
          <button class="filter-btn" data-filter="data-engineering">📊 Data Engineering</button>
          <button class="filter-btn" data-filter="mobile">📱 Móvil</button>
          <button class="filter-btn" data-filter="blockchain">₿ Blockchain</button>
        </div>
        
        <div class="gallery-grid" id="gallery-grid">
          ${this.generateGalleryItems()}
        </div>
      </div>
    `;
  }

  generateGalleryItems() {
    return Object.entries(this.galleryData).map(([key, project]) => {
      const mainImage = project.images[0];
      const featuredClass = project.featured ? 'featured' : '';
      
      return `
        <div class="gallery-item ${featuredClass} slide-up" data-category="${project.category}" data-project="${key}">
          <img 
            src="${mainImage.src}" 
            alt="${project.title}"
            class="gallery-image"
            loading="lazy"
          />
          
          <div class="gallery-overlay">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            
            <div class="tech-tags">
              ${project.technologies.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <div class="gallery-actions">
              <button class="action-btn zoom-btn" data-action="zoom" data-project="${key}">
                <i class="bi bi-zoom-in"></i> Ver Detalles
              </button>
              ${project.beforeAfter ? `
                <button class="action-btn compare-btn" data-action="compare" data-project="${key}">
                  <i class="bi bi-arrow-left-right"></i> Antes/Después
                </button>
              ` : ''}
              <button class="action-btn metrics-btn" data-action="metrics" data-project="${key}">
                <i class="bi bi-graph-up"></i> Métricas
              </button>
            </div>
          </div>
          
          <div class="zoom-controls">
            <button class="zoom-btn" data-action="zoom-in" title="Acercar">
              <i class="bi bi-plus"></i>
            </button>
            <button class="zoom-btn" data-action="zoom-out" title="Alejar">
              <i class="bi bi-dash"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  createLightbox() {
    const lightboxHTML = `
      <div class="gallery-lightbox" id="gallery-lightbox">
        <div class="lightbox-content">
          <button class="lightbox-close" id="lightbox-close">
            <i class="bi bi-x"></i>
          </button>
          
          <button class="lightbox-nav lightbox-prev" id="lightbox-prev">
            <i class="bi bi-chevron-left"></i>
          </button>
          
          <button class="lightbox-nav lightbox-next" id="lightbox-next">
            <i class="bi bi-chevron-right"></i>
          </button>
          
          <div class="lightbox-image-container">
            <img src="" alt="" class="lightbox-image" id="lightbox-image" />
          </div>
          
          <div class="lightbox-info">
            <h3 class="lightbox-title" id="lightbox-title"></h3>
            <p class="lightbox-description" id="lightbox-description"></p>
            
            <div class="lightbox-meta">
              <div class="tech-tags" id="lightbox-tech"></div>
              <div class="project-metrics" id="lightbox-metrics"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }

  setupEventListeners() {
    // Gallery item clicks
    document.addEventListener('click', (e) => {
      // Filter buttons
      if (e.target.closest('.filter-btn')) {
        this.handleFilterClick(e.target.closest('.filter-btn'));
      }
      
      // Gallery actions
      if (e.target.closest('.action-btn')) {
        this.handleActionClick(e.target.closest('.action-btn'));
      }
      
      // Gallery controls
      if (e.target.closest('.gallery-btn')) {
        this.handleControlClick(e.target.closest('.gallery-btn'));
      }
      
      // Zoom controls
      if (e.target.closest('.zoom-btn')) {
        this.handleZoomClick(e.target.closest('.zoom-btn'));
      }
      
      // Lightbox controls
      if (e.target.closest('#lightbox-close')) {
        this.closeLightbox();
      }
      
      if (e.target.closest('#lightbox-prev')) {
        this.previousImage();
      }
      
      if (e.target.closest('#lightbox-next')) {
        this.nextImage();
      }
      
      // Gallery item direct click
      if (e.target.closest('.gallery-item') && !e.target.closest('.action-btn, .zoom-btn')) {
        const projectKey = e.target.closest('.gallery-item').dataset.project;
        this.openLightbox(projectKey, 0);
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.isLightboxOpen) {
        switch (e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
            this.previousImage();
            break;
          case 'ArrowRight':
            this.nextImage();
            break;
        }
      }
    });
    
    // Lightbox background click
    document.addEventListener('click', (e) => {
      if (e.target.id === 'gallery-lightbox') {
        this.closeLightbox();
      }
    });
  }

  initializeFilters() {
    this.images = Object.entries(this.galleryData).map(([key, project]) => ({
      key,
      ...project
    }));
  }

  handleFilterClick(button) {
    // Update active filter
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filter = button.dataset.filter;
    this.currentFilter = filter;
    
    // Filter gallery items
    this.filterGalleryItems(filter);
  }

  filterGalleryItems(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
      const category = item.dataset.category;
      const shouldShow = filter === 'all' || category === filter;
      
      if (shouldShow) {
        item.style.display = 'block';
        setTimeout(() => {
          item.classList.add('scale-in');
        }, index * 100);
      } else {
        item.style.display = 'none';
        item.classList.remove('scale-in');
      }
    });
  }

  handleActionClick(button) {
    const action = button.dataset.action;
    const projectKey = button.dataset.project;
    
    switch (action) {
      case 'zoom':
        this.openLightbox(projectKey, 0);
        break;
      case 'compare':
        this.showBeforeAfter(projectKey);
        break;
      case 'metrics':
        this.showMetrics(projectKey);
        break;
    }
  }

  handleControlClick(button) {
    const id = button.id;
    
    switch (id) {
      case 'grid-view':
        this.setGridView();
        break;
      case 'list-view':
        this.setListView();
        break;
      case 'fullscreen-btn':
        this.toggleFullscreen();
        break;
    }
  }

  handleZoomClick(button) {
    const action = button.dataset.action;
    const galleryItem = button.closest('.gallery-item');
    
    switch (action) {
      case 'zoom-in':
        this.zoomImage(galleryItem, 1.2);
        break;
      case 'zoom-out':
        this.zoomImage(galleryItem, 0.8);
        break;
    }
  }

  zoomImage(galleryItem, factor) {
    const image = galleryItem.querySelector('.gallery-image');
    const currentScale = parseFloat(image.style.transform.replace(/[^0-9.]/g, '')) || 1;
    const newScale = Math.max(this.minZoom, Math.min(this.maxZoom, currentScale * factor));
    
    image.style.transform = `scale(${newScale})`;
    image.style.transformOrigin = 'center';
  }

  openLightbox(projectKey, imageIndex = 0) {
    const project = this.galleryData[projectKey];
    if (!project) return;
    
    this.currentImageIndex = imageIndex;
    this.currentProject = projectKey;
    this.isLightboxOpen = true;
    
    const lightbox = document.getElementById('gallery-lightbox');
    const image = document.getElementById('lightbox-image');
    const title = document.getElementById('lightbox-title');
    const description = document.getElementById('lightbox-description');
    const tech = document.getElementById('lightbox-tech');
    const metrics = document.getElementById('lightbox-metrics');
    
    // Set image
    const currentImage = project.images[imageIndex];
    image.src = currentImage.src;
    image.alt = currentImage.title;
    
    // Set content
    title.textContent = project.title;
    description.textContent = currentImage.description;
    
    // Set technologies
    tech.innerHTML = project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');
    
    // Set metrics
    metrics.innerHTML = Object.entries(project.metrics).map(([key, value]) => 
      `<div class="metric-item"><strong>${value}</strong> ${key}</div>`
    ).join('');
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    this.isLightboxOpen = false;
  }

  previousImage() {
    if (!this.currentProject) return;
    
    const project = this.galleryData[this.currentProject];
    const newIndex = this.currentImageIndex > 0 ? this.currentImageIndex - 1 : project.images.length - 1;
    this.openLightbox(this.currentProject, newIndex);
  }

  nextImage() {
    if (!this.currentProject) return;
    
    const project = this.galleryData[this.currentProject];
    const newIndex = this.currentImageIndex < project.images.length - 1 ? this.currentImageIndex + 1 : 0;
    this.openLightbox(this.currentProject, newIndex);
  }

  showBeforeAfter(projectKey) {
    const project = this.galleryData[projectKey];
    if (!project.beforeAfter) return;
    
    // Create before/after modal
    const modalHTML = `
      <div class="before-after-modal" id="before-after-modal">
        <div class="modal-content">
          <button class="modal-close" onclick="this.closest('.before-after-modal').remove()">
            <i class="bi bi-x"></i>
          </button>
          
          <h3>📊 Comparación: Antes vs Después</h3>
          <p>${project.title}</p>
          
          <div class="before-after-container">
            <div class="before-after-slider" id="before-after-slider">
              <img src="${project.beforeAfter.before}" alt="Antes" class="before-image" />
              <img src="${project.beforeAfter.after}" alt="Después" class="after-image" />
              <div class="slider-handle" id="slider-handle"></div>
            </div>
          </div>
          
          <div class="comparison-labels">
            <span class="before-label">⬅️ Antes</span>
            <span class="after-label">Después ➡️</span>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.initBeforeAfterSlider();
  }

  initBeforeAfterSlider() {
    const slider = document.getElementById('before-after-slider');
    const handle = document.getElementById('slider-handle');
    const afterImage = slider.querySelector('.after-image');
    
    let isDragging = false;
    
    const updateSlider = (x) => {
      const rect = slider.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
      
      handle.style.left = `${percentage}%`;
      afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
    };
    
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        updateSlider(e.clientX);
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }

  showMetrics(projectKey) {
    const project = this.galleryData[projectKey];
    
    // Create metrics modal
    const modalHTML = `
      <div class="metrics-modal" id="metrics-modal">
        <div class="modal-content">
          <button class="modal-close" onclick="this.closest('.metrics-modal').remove()">
            <i class="bi bi-x"></i>
          </button>
          
          <h3>📊 Métricas del Proyecto</h3>
          <h4>${project.title}</h4>
          
          <div class="metrics-grid">
            ${Object.entries(project.metrics).map(([key, value]) => `
              <div class="metric-card">
                <div class="metric-value">${value}</div>
                <div class="metric-label">${key}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="technologies-section">
            <h5>🛠️ Tecnologías Utilizadas</h5>
            <div class="tech-grid">
              ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  setGridView() {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.style.display = 'grid';
    
    document.querySelectorAll('.gallery-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('grid-view').classList.add('active');
  }

  setListView() {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.style.display = 'flex';
    galleryGrid.style.flexDirection = 'column';
    
    document.querySelectorAll('.gallery-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('list-view').classList.add('active');
  }

  toggleFullscreen() {
    const gallery = document.querySelector('.project-gallery');
    
    if (!document.fullscreenElement) {
      gallery.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}

// Initialize Project Gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.projectGallery = new ProjectGallery();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectGallery;
}