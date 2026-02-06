/**
 * Application Configuration
 * Centralized configuration management for SnapFolio
 */

// Environment variables with fallbacks
const getEnvVar = (key, defaultValue = '') => {
  // Check if import.meta.env is available (Vite environment)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  // Fallback to defaultValue if import.meta.env is not available
  return defaultValue;
};



export const APP_CONFIG = {
  // Application Info
  app: {
    name: (import.meta && import.meta.env && import.meta.env.VITE_APP_NAME) || 'SnapFolio',
    version: (import.meta && import.meta.env && import.meta.env.VITE_APP_VERSION) || '1.0.0',
    environment: (import.meta && import.meta.env && import.meta.env.VITE_APP_ENVIRONMENT) || 'development',
    debugMode: ((import.meta && import.meta.env && import.meta.env.VITE_DEBUG_MODE) || 'true') === 'true'
  },

  // API Configuration
  api: {
    supabase: {
      url: import.meta?.env?.VITE_SUPABASE_URL || 'https://edtcguoujjysnbasoxsk.supabase.co',
      anonKey: import.meta?.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdGNndW91amp5c25iYXNveHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMTY4NjIsImV4cCI6MjA3MDU5Mjg2Mn0.-IsoiGzO-QCPE01pSyclZEF4ZuWggQbwhSHs5JtGlOo'
    }
  },

  // Feature Flags
  features: {
    animations: true,
    translations: true,
    analytics: getEnvVar('VITE_GA_TRACKING_ID') !== '',
    pwa: getEnvVar('VITE_ENABLE_PWA', 'false') === 'true',
    serviceWorker: getEnvVar('VITE_ENABLE_SERVICE_WORKER', 'false') === 'true',
    mockApi: getEnvVar('VITE_MOCK_API', 'false') === 'true'
  },

  // UI Configuration
  ui: {
    theme: {
      default: 'dark',
      animations: {
        duration: 300,
        easing: 'ease-in-out'
      }
    },
    navigation: {
      smoothScroll: true,
      offset: 70
    },
    gallery: {
      lightbox: true,
      autoplay: false,
      loop: true
    }
  },

  // Contact Form Configuration
  contact: {
    email: getEnvVar('VITE_CONTACT_EMAIL'),
    recaptcha: {
      siteKey: getEnvVar('VITE_RECAPTCHA_SITE_KEY'),
      enabled: getEnvVar('VITE_RECAPTCHA_SITE_KEY') !== ''
    },
    validation: {
      name: { min: 2, max: 50 },
      email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      subject: { min: 5, max: 100 },
      message: { min: 10, max: 1000 }
    }
  },

  // Performance Configuration
  performance: {
    lazyLoading: true,
    imageOptimization: true,
    caching: {
      enabled: true,
      duration: 24 * 60 * 60 * 1000 // 24 hours
    }
  },

  // Analytics Configuration
  analytics: {
    googleAnalytics: {
      trackingId: getEnvVar('VITE_GA_TRACKING_ID'),
      enabled: getEnvVar('VITE_GA_TRACKING_ID') !== ''
    },
    events: {
      trackPageViews: true,
      trackFormSubmissions: true,
      trackDownloads: true,
      trackExternalLinks: true
    }
  },

  // SEO Configuration
  seo: {
    defaultTitle: 'Jhon Laurens - Desarrollador de Software',
    titleTemplate: '%s | Jhon Laurens Portfolio',
    defaultDescription: 'Portfolio profesional de Jhon Laurens, Desarrollador de Software y Especialista en Seguridad de la Información.',
    keywords: ['desarrollador', 'software', 'seguridad', 'portfolio', 'javascript', 'react', 'node.js'],
    author: 'Jhon Laurens',
    siteUrl: 'https://jhonlaurens.vercel.app',
    image: '/assets/img/profile/profile-square-2.webp'
  },

  // Error Handling
  errors: {
    showStackTrace: getEnvVar('VITE_APP_ENVIRONMENT') === 'development',
    logToConsole: getEnvVar('VITE_DEBUG_MODE', 'true') === 'true',
    reportToService: getEnvVar('VITE_APP_ENVIRONMENT') === 'production'
  }
};

// Validation function to check required configuration
export const validateConfig = () => {
  const errors = [];

  // Check required Supabase configuration
  if (!APP_CONFIG.api.supabase.url) {
    errors.push('VITE_SUPABASE_URL is required');
  }
  if (!APP_CONFIG.api.supabase.anonKey) {
    errors.push('VITE_SUPABASE_ANON_KEY is required');
  }

  // Log configuration status
  if (APP_CONFIG.app.debugMode) {
    console.group('🔧 App Configuration');
    console.log('Environment:', APP_CONFIG.app.environment);
    console.log('Version:', APP_CONFIG.app.version);
    console.log('Features:', APP_CONFIG.features);
    if (errors.length > 0) {
      console.error('Configuration Errors:', errors);
    } else {
      console.log('✅ Configuration is valid');
    }
    console.groupEnd();
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Export individual configurations for convenience
export const { app, api, features, ui, contact, performance, analytics, seo, errors } = APP_CONFIG;