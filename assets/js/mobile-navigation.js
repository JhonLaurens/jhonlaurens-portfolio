/*--------------------------------------------------------------
# Enhanced Mobile Navigation JavaScript
# Handles breadcrumbs, improved menu interactions, and accessibility
--------------------------------------------------------------*/

class EnhancedMobileNavigation {
  constructor() {
    this.currentSection = 'hero';
    this.sections = [
      { id: 'hero', name: 'Inicio', icon: '🏠' },
      { id: 'about', name: 'Acerca de', icon: '👤' },
      { id: 'resume', name: 'CV', icon: '📄' },
      { id: 'skills', name: 'Habilidades', icon: '💻' },
      { id: 'portfolio', name: 'Proyectos', icon: '🎨' },
      { id: 'contact', name: 'Contacto', icon: '📧' }
    ];
    this.init();
  }

  init() {
    this.createBreadcrumbContainer();
    this.createMobileBackdrop();
    this.setupEventListeners();
    this.setupScrollSpy();
    this.setupAccessibilityFeatures();
    this.updateBreadcrumb();
  }

  createBreadcrumbContainer() {
    const breadcrumbHTML = `
      <div class="breadcrumb-container" id="breadcrumbContainer">
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb" id="breadcrumbList">
            <!-- Breadcrumb items will be inserted here -->
          </ol>
        </nav>
        <div class="section-indicator"></div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', breadcrumbHTML);
  }

  createMobileBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';
    backdrop.id = 'mobileNavBackdrop';
    document.body.appendChild(backdrop);

    backdrop.addEventListener('click', () => {
      this.closeMobileMenu();
    });
  }

  setupEventListeners() {
    const headerToggle = document.querySelector('.header-toggle');
    const navLinks = document.querySelectorAll('.navmenu a[href^="#"]');

    // Enhanced header toggle functionality
    if (headerToggle) {
      headerToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });

      // Add keyboard support
      headerToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleMobileMenu();
        }
      });
    }

    // Enhanced navigation link functionality
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').substring(1);
        this.navigateToSection(targetId);
        
        // Close mobile menu on navigation
        if (window.innerWidth < 1200) {
          setTimeout(() => this.closeMobileMenu(), 300);
        }
      });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1200) {
        this.closeMobileMenu();
        this.hideBreadcrumb();
      } else {
        this.showBreadcrumb();
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }

  setupScrollSpy() {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.updateCurrentSection(sectionId);
        }
      });
    }, observerOptions);

    // Observe all sections
    this.sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });
  }

  setupAccessibilityFeatures() {
    // Add ARIA labels and roles
    const headerToggle = document.querySelector('.header-toggle');
    if (headerToggle) {
      headerToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      headerToggle.setAttribute('aria-expanded', 'false');
      headerToggle.setAttribute('role', 'button');
      headerToggle.setAttribute('tabindex', '0');
    }

    const navMenu = document.querySelector('.navmenu');
    if (navMenu) {
      navMenu.setAttribute('aria-label', 'Navegación principal');
    }
  }

  toggleMobileMenu() {
    const header = document.querySelector('.header');
    const headerToggle = document.querySelector('.header-toggle');
    const backdrop = document.getElementById('mobileNavBackdrop');
    
    if (header && headerToggle && backdrop) {
      const isOpen = header.classList.contains('header-show');
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    }
  }

  openMobileMenu() {
    const header = document.querySelector('.header');
    const headerToggle = document.querySelector('.header-toggle');
    const backdrop = document.getElementById('mobileNavBackdrop');
    
    header.classList.add('header-show');
    backdrop.classList.add('show');
    headerToggle.setAttribute('aria-expanded', 'true');
    headerToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstNavLink = document.querySelector('.navmenu a');
    if (firstNavLink) {
      setTimeout(() => firstNavLink.focus(), 100);
    }
  }

  closeMobileMenu() {
    const header = document.querySelector('.header');
    const headerToggle = document.querySelector('.header-toggle');
    const backdrop = document.getElementById('mobileNavBackdrop');
    
    header.classList.remove('header-show');
    backdrop.classList.remove('show');
    headerToggle.setAttribute('aria-expanded', 'false');
    headerToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  updateCurrentSection(sectionId) {
    if (this.currentSection !== sectionId) {
      this.currentSection = sectionId;
      this.updateBreadcrumb();
      this.updateActiveNavItem();
    }
  }

  updateBreadcrumb() {
    const breadcrumbList = document.getElementById('breadcrumbList');
    if (!breadcrumbList) return;

    const currentSectionData = this.sections.find(s => s.id === this.currentSection);
    if (!currentSectionData) return;

    const breadcrumbHTML = `
      <li class="breadcrumb-item">
        <a href="#hero">
          <span class="breadcrumb-icon">🏠</span>
          <span class="breadcrumb-text">Inicio</span>
        </a>
      </li>
      ${this.currentSection !== 'hero' ? `
        <li class="breadcrumb-item active">
          <span class="breadcrumb-icon">${currentSectionData.icon}</span>
          <span class="breadcrumb-text">${currentSectionData.name}</span>
        </li>
      ` : ''}
    `;

    breadcrumbList.innerHTML = breadcrumbHTML;

    // Add click handlers to breadcrumb links
    const breadcrumbLinks = breadcrumbList.querySelectorAll('a[href^="#"]');
    breadcrumbLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.navigateToSection(targetId);
      });
    });
  }

  updateActiveNavItem() {
    const navLinks = document.querySelectorAll('.navmenu a[href^="#"]');
    navLinks.forEach(link => {
      const targetId = link.getAttribute('href').substring(1);
      if (targetId === this.currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  navigateToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerHeight = window.innerWidth < 1200 ? 80 : 0;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  showBreadcrumb() {
    const breadcrumbContainer = document.getElementById('breadcrumbContainer');
    if (breadcrumbContainer && window.innerWidth < 1200) {
      breadcrumbContainer.classList.add('show');
    }
  }

  hideBreadcrumb() {
    const breadcrumbContainer = document.getElementById('breadcrumbContainer');
    if (breadcrumbContainer) {
      breadcrumbContainer.classList.remove('show');
    }
  }

  // Public method to get current section
  getCurrentSection() {
    return this.currentSection;
  }

  // Public method to navigate programmatically
  goToSection(sectionId) {
    this.navigateToSection(sectionId);
  }
}

// Initialize enhanced mobile navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.enhancedMobileNav = new EnhancedMobileNavigation();
  
  // Show breadcrumb on mobile devices
  if (window.innerWidth < 1200) {
    setTimeout(() => {
      window.enhancedMobileNav.showBreadcrumb();
    }, 500);
  }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedMobileNavigation;
}