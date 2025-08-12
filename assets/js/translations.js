// Language translations
const translations = {
  es: {
    // Navigation
    'nav-home': 'Inicio',
    'nav-about': 'Acerca de',
    'nav-resume': 'CV',
    'nav-skills': 'Habilidades',
    'nav-portfolio': 'Proyectos',
    'nav-contact': 'Contacto',
    
    // Hero Section
    'hero-title': 'Desarrollador de Software',
    'hero-intro': 'Soy un',
    'hero-description': 'Apasionado por crear experiencias digitales excepcionales que combinan diseño innovador con desarrollo funcional. Hagamos realidad tu visión.',
    'hero-btn-work': 'Ver Mi Trabajo',
    'hero-btn-contact': 'Contactar',
    
    // About Section
    'about-title': 'Acerca de',
    'about-subtitle': 'Desarrollador de Software & Especialista en Seguridad de la Información',
    'about-description': 'Soy un desarrollador de software apasionado con experiencia en desarrollo full-stack y seguridad de la información. Me especializo en crear soluciones tecnológicas innovadoras y seguras.',
    
    // Services Section
    'services-title': 'Servicios',
    'services-subtitle': 'Soluciones tecnológicas innovadoras y seguras',
    'services-description': 'Ofrezco servicios especializados en desarrollo de software y seguridad de la información para impulsar tu negocio.',
    
    // Portfolio Section
    'portfolio-title': 'Proyectos',
    'portfolio-description': 'Explora mi colección de proyectos de desarrollo de software y seguridad de la información.',
    
    // Contact Section
    'contact-title': 'Contacto',
    'contact-description': 'Colaboremos en soluciones tecnológicas innovadoras y seguras.',
    'contact-info': 'Información de Contacto',
    'contact-form-title': 'Ponte en Contacto',
    'contact-name': 'Nombre',
    'contact-email': 'Email',
    'contact-subject': 'Asunto',
    'contact-message': 'Mensaje',
    'contact-send': 'Enviar Mensaje',
    'contact-loading': 'Cargando',
    'contact-success': 'Tu mensaje ha sido enviado. ¡Gracias!',
    
    // Footer
    'footer-rights': 'Todos los Derechos Reservados'
  },
  
  en: {
    // Navigation
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-resume': 'Resume',
    'nav-skills': 'Skills',
    'nav-portfolio': 'Portfolio',
    'nav-contact': 'Contact',
    
    // Hero Section
    'hero-title': 'Software Developer',
    'hero-intro': "I'm a",
    'hero-description': 'Passionate about creating exceptional digital experiences that blend innovative design with functional development. Let\'s bring your vision to life.',
    'hero-btn-work': 'View My Work',
    'hero-btn-contact': 'Get In Touch',
    
    // About Section
    'about-title': 'About',
    'about-subtitle': 'Software Developer & Information Security Specialist',
    'about-description': 'I am a passionate software developer with experience in full-stack development and information security. I specialize in creating innovative and secure technological solutions.',
    
    // Services Section
    'services-title': 'Services',
    'services-subtitle': 'Innovative and secure technological solutions',
    'services-description': 'I offer specialized services in software development and information security to boost your business.',
    
    // Portfolio Section
    'portfolio-title': 'Portfolio',
    'portfolio-description': 'Explore my collection of software development and information security projects.',
    
    // Contact Section
    'contact-title': 'Contact',
    'contact-description': 'Let\'s collaborate on innovative and secure technological solutions.',
    'contact-info': 'Contact Information',
    'contact-form-title': 'Get In Touch',
    'contact-name': 'Name',
    'contact-email': 'Email',
    'contact-subject': 'Subject',
    'contact-message': 'Message',
    'contact-send': 'Send Message',
    'contact-loading': 'Loading',
    'contact-success': 'Your message has been sent. Thank you!',
    
    // Footer
    'footer-rights': 'All Rights Reserved'
  }
};

// Language management
class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'es';
    this.init();
  }
  
  init() {
    this.updateLanguageButton();
    this.translatePage();
    this.bindEvents();
  }
  
  bindEvents() {
    const toggleButton = document.getElementById('languageToggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggleLanguage());
    }
  }
  
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    localStorage.setItem('language', this.currentLanguage);
    this.updateLanguageButton();
    this.translatePage();
  }
  
  updateLanguageButton() {
    const langText = document.getElementById('langText');
    if (langText) {
      langText.textContent = this.currentLanguage === 'es' ? 'EN' : 'ES';
    }
  }
  
  translatePage() {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
      const key = element.getAttribute('data-lang');
      if (translations[this.currentLanguage] && translations[this.currentLanguage][key]) {
        element.textContent = translations[this.currentLanguage][key];
      }
    });
    
    // Update typed.js items if present
    this.updateTypedItems();
  }
  
  updateTypedItems() {
    const typedElement = document.querySelector('.typed');
    if (typedElement) {
      const typedItems = this.currentLanguage === 'es' 
        ? 'Desarrollador de Software, Desarrollador Full Stack, Especialista en Seguridad de la Información, Desarrollador Python'
        : 'Software Developer, Full Stack Developer, Information Security Specialist, Python Developer';
      
      typedElement.setAttribute('data-typed-items', typedItems);
      
      // Reinitialize typed.js if it exists
      if (window.typed) {
        window.typed.destroy();
        window.typed = new Typed('.typed', {
          strings: typedItems.split(', '),
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000,
          loop: true
        });
      }
    }
  }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.languageManager = new LanguageManager();
});