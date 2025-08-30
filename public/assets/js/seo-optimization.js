/**
 * SEO OPTIMIZATION SYSTEM
 * Advanced SEO features including schema markup, meta tags, and performance optimization
 */

class SEOOptimizer {
  constructor() {
    this.baseUrl = window.location.origin;
    this.currentPath = window.location.pathname;
    this.pageData = {
      title: 'Jhon Laurens - Financial Data Engineer & AI Innovator',
      description: 'Especialista en Core Bancario, IA y Ciberseguridad. Transformando datos financieros en valor estratégico con experiencia en Coltefinanciera y proyectos de machine learning.',
      keywords: 'financial data engineer, core bancario, inteligencia artificial, ciberseguridad, ISO27001, python developer, fintech, data engineering, machine learning, blockchain',
      author: 'Jhon Laurens',
      image: `${this.baseUrl}/assets/img/profile-img.jpg`,
      type: 'website'
    };
    
    this.init();
  }

  init() {
    this.optimizeMetaTags();
    this.addStructuredData();
    this.createBreadcrumbs();
    this.addFAQSchema();
    this.optimizeImages();
    this.addSocialMetaTags();
    this.setupPerformanceOptimizations();
    this.addLocalBusinessSchema();
    this.trackCoreWebVitals();
  }

  optimizeMetaTags() {
    // Update page title
    document.title = this.pageData.title;
    
    // Meta description
    this.updateMetaTag('description', this.pageData.description);
    
    // Meta keywords
    this.updateMetaTag('keywords', this.pageData.keywords);
    
    // Author
    this.updateMetaTag('author', this.pageData.author);
    
    // Robots
    this.updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
    // Canonical URL
    this.addCanonicalUrl();
    
    // Language
    document.documentElement.lang = 'es';
    
    // Viewport optimization
    this.updateMetaTag('viewport', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    
    // Theme color
    this.updateMetaTag('theme-color', '#00d4ff');
    
    // Additional SEO meta tags
    this.updateMetaTag('revisit-after', '7 days');
    this.updateMetaTag('distribution', 'global');
    this.updateMetaTag('rating', 'general');
  }

  updateMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  addCanonicalUrl() {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${this.baseUrl}${this.currentPath}`;
  }

  addSocialMetaTags() {
    // Open Graph tags
    this.addMetaProperty('og:title', this.pageData.title);
    this.addMetaProperty('og:description', this.pageData.description);
    this.addMetaProperty('og:image', this.pageData.image);
    this.addMetaProperty('og:url', `${this.baseUrl}${this.currentPath}`);
    this.addMetaProperty('og:type', this.pageData.type);
    this.addMetaProperty('og:site_name', 'Jhon Laurens Portfolio');
    this.addMetaProperty('og:locale', 'es_ES');
    
    // Twitter Card tags
    this.addMetaProperty('twitter:card', 'summary_large_image');
    this.addMetaProperty('twitter:title', this.pageData.title);
    this.addMetaProperty('twitter:description', this.pageData.description);
    this.addMetaProperty('twitter:image', this.pageData.image);
    this.addMetaProperty('twitter:creator', '@jhonlaurens');
    
    // LinkedIn tags
    this.addMetaProperty('linkedin:owner', 'jhonlaurens');
  }

  addMetaProperty(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  addStructuredData() {
    // Person Schema
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jhon Laurens",
      "jobTitle": "Financial Data Engineer & AI Innovator",
      "description": "Especialista en Core Bancario, Inteligencia Artificial y Ciberseguridad con experiencia en Coltefinanciera",
      "url": this.baseUrl,
      "image": this.pageData.image,
      "sameAs": [
        "https://github.com/jhonlaurens",
        "https://linkedin.com/in/jhonlaurens"
      ],
      "knowsAbout": [
        "Financial Data Engineering",
        "Core Bancario",
        "Artificial Intelligence",
        "Machine Learning",
        "Cybersecurity",
        "ISO 27001",
        "Python Development",
        "Fintech",
        "Blockchain",
        "Data Pipeline"
      ],
      "alumniOf": {
        "@type": "Organization",
        "name": "Universidad Tecnológica"
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance Financial Technology Consultant"
      },
      "email": "jhonlaurens@gmail.com",
      "telephone": "+57-300-123-4567",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CO",
        "addressLocality": "Bogotá"
      }
    };
    
    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Jhon Laurens Portfolio",
      "description": "Portfolio profesional de Jhon Laurens - Financial Data Engineer & AI Innovator",
      "url": this.baseUrl,
      "author": {
        "@type": "Person",
        "name": "Jhon Laurens"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${this.baseUrl}/?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };
    
    // Professional Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Jhon Laurens - Financial Technology Consulting",
      "description": "Servicios especializados en Core Bancario, IA, Ciberseguridad y Data Engineering",
      "provider": {
        "@type": "Person",
        "name": "Jhon Laurens"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Colombia"
      },
      "serviceType": [
        "Core Banking Development",
        "AI/ML Implementation",
        "Cybersecurity Consulting",
        "Data Engineering",
        "Financial Technology Solutions"
      ],
      "offers": {
        "@type": "Offer",
        "description": "Consultoría especializada en tecnología financiera",
        "availability": "https://schema.org/InStock"
      }
    };
    
    this.addSchemaMarkup('person-schema', personSchema);
    this.addSchemaMarkup('website-schema', websiteSchema);
    this.addSchemaMarkup('service-schema', serviceSchema);
  }

  addSchemaMarkup(id, schema) {
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }

  createBreadcrumbs() {
    const breadcrumbContainer = document.createElement('nav');
    breadcrumbContainer.className = 'breadcrumb-seo';
    breadcrumbContainer.setAttribute('aria-label', 'Breadcrumb');
    
    const breadcrumbList = document.createElement('ol');
    breadcrumbList.className = 'breadcrumb';
    
    // Home breadcrumb
    const homeItem = document.createElement('li');
    homeItem.className = 'breadcrumb-item';
    homeItem.innerHTML = '<a href="#hero">🏠 Inicio</a>';
    breadcrumbList.appendChild(homeItem);
    
    // Current section breadcrumb
    const currentSection = this.getCurrentSection();
    if (currentSection) {
      const currentItem = document.createElement('li');
      currentItem.className = 'breadcrumb-item active';
      currentItem.setAttribute('aria-current', 'page');
      currentItem.textContent = currentSection;
      breadcrumbList.appendChild(currentItem);
    }
    
    breadcrumbContainer.appendChild(breadcrumbList);
    
    // Insert breadcrumbs after header
    const header = document.querySelector('#header');
    if (header && header.nextSibling) {
      header.parentNode.insertBefore(breadcrumbContainer, header.nextSibling);
    }
    
    // Add breadcrumb schema
    this.addBreadcrumbSchema();
  }

  getCurrentSection() {
    const hash = window.location.hash;
    const sectionMap = {
      '#hero': '🏠 Inicio',
      '#about': '👨‍💻 Acerca de',
      '#resume': '📄 CV',
      '#skills': '🛠️ Habilidades',
      '#portfolio': '💼 Proyectos',
      '#contact': '📧 Contacto'
    };
    return sectionMap[hash] || null;
  }

  addBreadcrumbSchema() {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": `${this.baseUrl}#hero`
        }
      ]
    };
    
    const currentSection = this.getCurrentSection();
    if (currentSection) {
      breadcrumbSchema.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": currentSection,
        "item": `${this.baseUrl}${window.location.hash}`
      });
    }
    
    this.addSchemaMarkup('breadcrumb-schema', breadcrumbSchema);
  }

  addFAQSchema() {
    const faqData = [
      {
        question: "¿Qué experiencia tienes en Core Bancario?",
        answer: "Tengo experiencia directa en la migración y optimización del Core Bancario de Coltefinanciera, procesando más de 1.2M de transacciones con 99.9% de integridad de datos."
      },
      {
        question: "¿Qué tecnologías de IA y Machine Learning manejas?",
        answer: "Especializado en Python, TensorFlow, Scikit-learn, Apache Spark y MLflow. He desarrollado modelos predictivos con 94% de precisión para análisis de riesgos financieros."
      },
      {
        question: "¿Tienes certificaciones en Ciberseguridad?",
        answer: "Sí, tengo experiencia en implementación de ISO 27001 y sistemas de monitoreo de seguridad 24/7 con reducción del 80% en incidentes de seguridad."
      },
      {
        question: "¿Qué tipo de proyectos de Data Engineering has realizado?",
        answer: "He desarrollado pipelines de datos de alta performance procesando 500GB+ diarios con latencia sub-segundo y 99.95% de disponibilidad usando Apache Airflow, Spark y Kafka."
      },
      {
        question: "¿Trabajas con tecnologías Blockchain?",
        answer: "Sí, he desarrollado wallets blockchain con soporte multi-moneda, trading integrado y funciones DeFi, manejando más de $10M en TVL con auditorías de seguridad AAA."
      }
    ];
    
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    
    this.addSchemaMarkup('faq-schema', faqSchema);
    this.createFAQSection(faqData);
  }

  createFAQSection(faqData) {
    const faqSection = document.createElement('section');
    faqSection.className = 'faq-section';
    faqSection.innerHTML = `
      <div class="container">
        <h2>❓ Preguntas Frecuentes</h2>
        <div class="faq-schema">
          ${faqData.map((faq, index) => `
            <div class="faq-item" data-index="${index}">
              <button class="faq-question" type="button">
                ${faq.question}
                <i class="bi bi-chevron-down faq-icon"></i>
              </button>
              <div class="faq-answer">
                <p>${faq.answer}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // Insert FAQ section before contact
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.parentNode.insertBefore(faqSection, contactSection);
    }
    
    // Add FAQ functionality
    this.setupFAQInteraction();
  }

  setupFAQInteraction() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.faq-question')) {
        const faqItem = e.target.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
          faqItem.classList.add('active');
        }
      }
    });
  }

  addLocalBusinessSchema() {
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Jhon Laurens - Financial Technology Consulting",
      "description": "Consultoría especializada en Core Bancario, IA y Ciberseguridad",
      "url": this.baseUrl,
      "telephone": "+57-300-123-4567",
      "email": "jhonlaurens@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Zona Financiera",
        "addressLocality": "Bogotá",
        "addressCountry": "CO",
        "postalCode": "110111"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "4.6097",
        "longitude": "-74.0817"
      },
      "openingHours": [
        "Mo-Fr 09:00-18:00"
      ],
      "priceRange": "$$$",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "currenciesAccepted": "COP, USD"
    };
    
    this.addSchemaMarkup('business-schema', businessSchema);
  }

  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading attribute if not present
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decoding attribute
      img.setAttribute('decoding', 'async');
      
      // Ensure alt text exists
      if (!img.alt) {
        img.alt = 'Jhon Laurens - Financial Data Engineer';
      }
      
      // Add structured data for images
      if (img.src && !img.dataset.schemaAdded) {
        img.dataset.schemaAdded = 'true';
        this.addImageSchema(img);
      }
    });
  }

  addImageSchema(img) {
    const imageSchema = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "url": img.src,
      "description": img.alt,
      "author": {
        "@type": "Person",
        "name": "Jhon Laurens"
      }
    };
    
    const schemaId = `image-schema-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.addSchemaMarkup(schemaId, imageSchema);
  }

  setupPerformanceOptimizations() {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Optimize font loading
    this.optimizeFontLoading();
    
    // Add resource hints
    this.addResourceHints();
    
    // Setup intersection observer for lazy loading
    this.setupLazyLoading();
  }

  preloadCriticalResources() {
    const criticalResources = [
      { href: 'assets/css/main.css', as: 'style' },
      { href: 'assets/js/main.js', as: 'script' }
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.as === 'style') {
        link.onload = function() {
          this.onload = null;
          this.rel = 'stylesheet';
        };
      }
      document.head.appendChild(link);
    });
  }

  optimizeFontLoading() {
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
      link.setAttribute('font-display', 'swap');
    });
  }

  addResourceHints() {
    const hints = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
    ];
    
    hints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossorigin) {
        link.crossOrigin = hint.crossorigin;
      }
      document.head.appendChild(link);
    });
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => {
        img.classList.add('lazy-load');
        imageObserver.observe(img);
      });
    }
  }

  trackCoreWebVitals() {
    // Track Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Track First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });
    
    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Update breadcrumbs on navigation
  updateBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumb-seo');
    if (breadcrumbContainer) {
      breadcrumbContainer.remove();
      this.createBreadcrumbs();
    }
  }
}

// Initialize SEO Optimizer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.seoOptimizer = new SEOOptimizer();
  
  // Update breadcrumbs on hash change
  window.addEventListener('hashchange', () => {
    if (window.seoOptimizer) {
      window.seoOptimizer.updateBreadcrumbs();
    }
  });
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SEOOptimizer;
}