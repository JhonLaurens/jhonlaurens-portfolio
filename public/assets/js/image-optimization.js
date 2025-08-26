// Optimización de Carga de Imágenes

// Lazy loading mejorado para imágenes de perfil
function optimizeImageLoading() {
  const profileImages = document.querySelectorAll('.profile-image img[loading="lazy"]');
  
  profileImages.forEach(img => {
    // Crear observer para lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          
          // Precargar imagen
          const tempImg = new Image();
          tempImg.onload = () => {
            image.src = tempImg.src;
            image.classList.add('loaded');
            observer.unobserve(image);
          };
          
          tempImg.onerror = () => {
            // Fallback en caso de error
            image.alt = 'Imagen no disponible';
            image.style.background = 'linear-gradient(45deg, #1a1a1a, #2a2a2a)';
            observer.unobserve(image);
          };
          
          tempImg.src = image.dataset.src || image.src;
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });
    
    imageObserver.observe(img);
  });
}

// Optimización de calidad de imagen según el dispositivo
function adaptImageQuality() {
  const images = document.querySelectorAll('.profile-image img');
  const isHighDPI = window.devicePixelRatio > 1;
  const isSlowConnection = navigator.connection && navigator.connection.effectiveType === 'slow-2g';
  
  images.forEach(img => {
    // Ajustar calidad según conexión y dispositivo
    if (isSlowConnection) {
      img.style.imageRendering = 'auto';
    } else if (isHighDPI) {
      img.style.imageRendering = '-webkit-optimize-contrast';
    }
    
    // Añadir efecto de carga suave
    img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
}

// Precargar imágenes críticas
function preloadCriticalImages() {
  const criticalImages = [
    'assets/img/profile/profile-new.jpg',
    'assets/img/professional-portrait.jpg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Manejo de errores de carga de imagen
function handleImageErrors() {
  const images = document.querySelectorAll('.profile-image img');
  
  images.forEach(img => {
    img.addEventListener('error', function() {
      // Crear placeholder SVG
      const placeholder = `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#2a2a2a"/>
          <circle cx="100" cy="80" r="25" fill="#555"/>
          <path d="M60 140 Q100 120 140 140 L140 200 L60 200 Z" fill="#555"/>
          <text x="100" y="180" text-anchor="middle" fill="#888" font-family="Arial" font-size="12">Jhon Laurens</text>
        </svg>
      `)}`;
      
      this.src = placeholder;
      this.alt = 'Perfil de Jhon Laurens';
    });
  });
}

// Inicializar optimizaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  preloadCriticalImages();
  optimizeImageLoading();
  adaptImageQuality();
  handleImageErrors();
});

// Reinicializar en cambios de tamaño de ventana
window.addEventListener('resize', function() {
  adaptImageQuality();
});

// Exportar funciones para uso externo
window.ImageOptimization = {
  optimize: optimizeImageLoading,
  adaptQuality: adaptImageQuality,
  preload: preloadCriticalImages,
  handleErrors: handleImageErrors
};