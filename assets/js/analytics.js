/**
 * ANALYTICS SYSTEM
 * Basic analytics implementation for tracking user behavior and conversions
 */

class PortfolioAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.startTime = Date.now();
    this.events = [];
    this.conversions = [];
    this.pageViews = [];
    this.interactions = [];
    
    // Configuration
    this.config = {
      trackScrollDepth: true,
      trackTimeOnPage: true,
      trackClicks: true,
      trackFormSubmissions: true,
      trackDownloads: true,
      trackExternalLinks: true,
      batchSize: 10,
      sendInterval: 30000, // 30 seconds
      storageKey: 'portfolio_analytics',
      debug: false
    };
    
    this.init();
  }

  init() {
    this.trackPageView();
    this.setupEventListeners();
    this.startSessionTracking();
    this.setupPeriodicSending();
    this.trackInitialMetrics();
    
    if (this.config.debug) {
      console.log('Portfolio Analytics initialized', {
        sessionId: this.sessionId,
        userId: this.userId
      });
    }
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getUserId() {
    let userId = localStorage.getItem('portfolio_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('portfolio_user_id', userId);
    }
    return userId;
  }

  trackEvent(eventName, properties = {}) {
    const event = {
      id: this.generateEventId(),
      name: eventName,
      properties: {
        ...properties,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        userId: this.userId,
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language
      }
    };
    
    this.events.push(event);
    this.saveToStorage();
    
    if (this.config.debug) {
      console.log('Event tracked:', event);
    }
    
    // Check if this is a conversion event
    this.checkConversion(event);
    
    return event;
  }

  generateEventId() {
    return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  trackPageView() {
    const pageView = {
      id: this.generateEventId(),
      type: 'page_view',
      url: window.location.href,
      title: document.title,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      referrer: document.referrer
    };
    
    this.pageViews.push(pageView);
    this.trackEvent('page_view', {
      page_title: document.title,
      page_url: window.location.href
    });
  }

  setupEventListeners() {
    // Track clicks
    if (this.config.trackClicks) {
      document.addEventListener('click', (e) => {
        this.trackClick(e);
      });
    }
    
    // Track scroll depth
    if (this.config.trackScrollDepth) {
      this.setupScrollTracking();
    }
    
    // Track form submissions
    if (this.config.trackFormSubmissions) {
      this.setupFormTracking();
    }
    
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('page_hidden');
      } else {
        this.trackEvent('page_visible');
      }
    });
    
    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.trackSessionEnd();
    });
    
    // Track hash changes (SPA navigation)
    window.addEventListener('hashchange', () => {
      this.trackEvent('navigation', {
        from: this.previousHash || '',
        to: window.location.hash,
        type: 'hash_change'
      });
      this.previousHash = window.location.hash;
    });
  }

  trackClick(event) {
    const element = event.target;
    const tagName = element.tagName.toLowerCase();
    
    // Get element identifier
    const elementId = element.id || element.className || tagName;
    const elementText = element.textContent?.trim().substring(0, 100) || '';
    
    // Track different types of clicks
    let clickType = 'general_click';
    let properties = {
      element_tag: tagName,
      element_id: elementId,
      element_text: elementText,
      element_classes: element.className
    };
    
    // Navigation clicks
    if (element.closest('nav') || element.closest('.navmenu')) {
      clickType = 'navigation_click';
      properties.nav_item = elementText;
    }
    
    // CTA buttons
    else if (element.classList.contains('btn') || tagName === 'button') {
      clickType = 'button_click';
      properties.button_type = element.type || 'button';
      properties.button_text = elementText;
    }
    
    // Links
    else if (tagName === 'a') {
      clickType = 'link_click';
      properties.link_url = element.href;
      properties.link_text = elementText;
      
      // External links
      if (element.href && !element.href.includes(window.location.hostname)) {
        clickType = 'external_link_click';
        properties.external_domain = new URL(element.href).hostname;
      }
    }
    
    // Social media links
    if (element.closest('.social-links')) {
      clickType = 'social_click';
      properties.social_platform = this.getSocialPlatform(element.href);
    }
    
    // Portfolio items
    if (element.closest('.portfolio-item') || element.closest('.project-item')) {
      clickType = 'portfolio_click';
      properties.project_name = element.closest('.portfolio-item, .project-item')?.querySelector('h4, .project-title')?.textContent || '';
    }
    
    // Contact actions
    if (element.closest('#contact') || element.classList.contains('contact-btn')) {
      clickType = 'contact_action';
    }
    
    this.trackEvent(clickType, properties);
  }

  getSocialPlatform(url) {
    if (!url) return 'unknown';
    
    const platforms = {
      'github.com': 'github',
      'linkedin.com': 'linkedin',
      'twitter.com': 'twitter',
      'facebook.com': 'facebook',
      'instagram.com': 'instagram'
    };
    
    for (const [domain, platform] of Object.entries(platforms)) {
      if (url.includes(domain)) {
        return platform;
      }
    }
    
    return 'other';
  }

  setupScrollTracking() {
    let maxScrollDepth = 0;
    let scrollMilestones = [25, 50, 75, 90, 100];
    let trackedMilestones = new Set();
    
    const trackScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);
      
      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;
      }
      
      // Track scroll milestones
      scrollMilestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          this.trackEvent('scroll_depth', {
            percentage: milestone,
            max_depth: maxScrollDepth
          });
        }
      });
    };
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScroll, 100);
    });
  }

  setupFormTracking() {
    // Track form interactions
    document.addEventListener('focus', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        this.trackEvent('form_field_focus', {
          field_name: e.target.name || e.target.id,
          field_type: e.target.type,
          form_id: e.target.closest('form')?.id || 'unknown'
        });
      }
    }, true);
    
    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.tagName === 'FORM') {
        this.trackEvent('form_submission', {
          form_id: form.id || 'unknown',
          form_action: form.action,
          form_method: form.method,
          field_count: form.elements.length
        });
        
        // This is a conversion event
        this.trackConversion('form_submission', {
          form_type: form.id || 'contact_form'
        });
      }
    });
  }

  trackConversion(type, properties = {}) {
    const conversion = {
      id: this.generateEventId(),
      type: type,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      properties: properties
    };
    
    this.conversions.push(conversion);
    
    this.trackEvent('conversion', {
      conversion_type: type,
      ...properties
    });
    
    if (this.config.debug) {
      console.log('Conversion tracked:', conversion);
    }
  }

  checkConversion(event) {
    const conversionEvents = {
      'contact_action': 'contact_intent',
      'external_link_click': 'external_engagement',
      'social_click': 'social_engagement',
      'portfolio_click': 'portfolio_engagement',
      'button_click': 'cta_engagement'
    };
    
    if (conversionEvents[event.name]) {
      this.trackConversion(conversionEvents[event.name], event.properties);
    }
  }

  startSessionTracking() {
    // Track time on page
    if (this.config.trackTimeOnPage) {
      setInterval(() => {
        const timeOnPage = Date.now() - this.startTime;
        this.trackEvent('time_on_page', {
          duration_ms: timeOnPage,
          duration_minutes: Math.round(timeOnPage / 60000)
        });
      }, 60000); // Every minute
    }
  }

  trackSessionEnd() {
    const sessionDuration = Date.now() - this.startTime;
    
    this.trackEvent('session_end', {
      session_duration_ms: sessionDuration,
      session_duration_minutes: Math.round(sessionDuration / 60000),
      total_events: this.events.length,
      total_conversions: this.conversions.length
    });
    
    // Send any remaining data
    this.sendAnalytics(true);
  }

  trackInitialMetrics() {
    // Track device and browser info
    this.trackEvent('session_start', {
      device_type: this.getDeviceType(),
      browser: this.getBrowser(),
      os: this.getOS(),
      connection_type: this.getConnectionType(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      local_time: new Date().toISOString()
    });
    
    // Track performance metrics
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      this.trackEvent('page_performance', {
        load_time_ms: loadTime,
        dom_ready_time_ms: timing.domContentLoadedEventEnd - timing.navigationStart,
        first_paint_time_ms: timing.responseStart - timing.navigationStart
      });
    }
  }

  getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  getBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  }

  getOS() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Other';
  }

  getConnectionType() {
    if (navigator.connection) {
      return navigator.connection.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  saveToStorage() {
    try {
      const data = {
        events: this.events.slice(-100), // Keep last 100 events
        conversions: this.conversions,
        sessionId: this.sessionId,
        userId: this.userId,
        lastUpdated: Date.now()
      };
      
      localStorage.setItem(this.config.storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save analytics data to storage:', error);
    }
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem(this.config.storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        return parsed;
      }
    } catch (error) {
      console.warn('Failed to load analytics data from storage:', error);
    }
    return null;
  }

  setupPeriodicSending() {
    setInterval(() => {
      this.sendAnalytics();
    }, this.config.sendInterval);
  }

  sendAnalytics(force = false) {
    if (this.events.length < this.config.batchSize && !force) {
      return;
    }
    
    const payload = {
      sessionId: this.sessionId,
      userId: this.userId,
      events: this.events.splice(0, this.config.batchSize),
      conversions: this.conversions.splice(0),
      timestamp: Date.now(),
      url: window.location.href
    };
    
    if (this.config.debug) {
      console.log('Analytics payload:', payload);
    }
    
    // In a real implementation, you would send this to your analytics server
    // For now, we'll just log it and store it locally
    this.logAnalytics(payload);
  }

  logAnalytics(payload) {
    // Store analytics data locally for demonstration
    const analyticsLog = JSON.parse(localStorage.getItem('analytics_log') || '[]');
    analyticsLog.push(payload);
    
    // Keep only last 50 entries
    if (analyticsLog.length > 50) {
      analyticsLog.splice(0, analyticsLog.length - 50);
    }
    
    localStorage.setItem('analytics_log', JSON.stringify(analyticsLog));
    
    if (this.config.debug) {
      console.log('Analytics data logged locally');
    }
  }

  // Public methods for manual tracking
  trackCustomEvent(name, properties) {
    return this.trackEvent(name, properties);
  }

  trackCustomConversion(type, properties) {
    return this.trackConversion(type, properties);
  }

  getAnalyticsData() {
    return {
      events: this.events,
      conversions: this.conversions,
      sessionId: this.sessionId,
      userId: this.userId,
      sessionDuration: Date.now() - this.startTime
    };
  }

  getStoredAnalytics() {
    return JSON.parse(localStorage.getItem('analytics_log') || '[]');
  }

  clearAnalytics() {
    this.events = [];
    this.conversions = [];
    localStorage.removeItem(this.config.storageKey);
    localStorage.removeItem('analytics_log');
  }

  // Debug methods
  enableDebug() {
    this.config.debug = true;
  }

  disableDebug() {
    this.config.debug = false;
  }

  getDebugInfo() {
    return {
      config: this.config,
      sessionId: this.sessionId,
      userId: this.userId,
      eventsCount: this.events.length,
      conversionsCount: this.conversions.length,
      sessionDuration: Date.now() - this.startTime
    };
  }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioAnalytics = new PortfolioAnalytics();
  
  // Expose analytics methods globally for easy access
  window.trackEvent = (name, properties) => {
    return window.portfolioAnalytics.trackCustomEvent(name, properties);
  };
  
  window.trackConversion = (type, properties) => {
    return window.portfolioAnalytics.trackCustomConversion(type, properties);
  };
  
  // Debug helpers (only in development)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.analyticsDebug = {
      enable: () => window.portfolioAnalytics.enableDebug(),
      disable: () => window.portfolioAnalytics.disableDebug(),
      info: () => window.portfolioAnalytics.getDebugInfo(),
      data: () => window.portfolioAnalytics.getAnalyticsData(),
      stored: () => window.portfolioAnalytics.getStoredAnalytics(),
      clear: () => window.portfolioAnalytics.clearAnalytics()
    };
    
    console.log('Analytics debug helpers available:', Object.keys(window.analyticsDebug));
  }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioAnalytics;
}