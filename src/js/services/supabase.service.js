/**
 * Supabase Service
 * Centralized service for all Supabase operations
 */

import { APP_CONFIG } from '../config/app.config.js';
import { Logger } from '../utils/helpers.js';

/**
 * Supabase Client Class
 * Handles all API communications with Supabase
 */
class SupabaseClient {
  constructor() {
    this.baseUrl = APP_CONFIG.api.supabase.url;
    this.apiKey = APP_CONFIG.api.supabase.anonKey;
    this.headers = {
      'Content-Type': 'application/json',
      'apikey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`
    };

    // Validate configuration
    if (!this.baseUrl || !this.apiKey) {
      Logger.error('Supabase configuration is missing. Please check your environment variables.');
      throw new Error('Supabase configuration is incomplete');
    }

    Logger.info('Supabase client initialized successfully');
  }

  /**
   * Generic request method
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>}
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}/rest/v1/${endpoint}`;
    const config = {
      headers: { ...this.headers, ...options.headers },
      ...options
    };

    try {
      Logger.info(`Making ${config.method || 'GET'} request to: ${endpoint}`);
      
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const responseText = await response.text();
        
        let errorData = {};
        try {
          errorData = JSON.parse(responseText);
        } catch (parseError) {
          Logger.error(`Failed to parse error response as JSON:`, parseError);
        }
        
        throw new Error(
          errorData.message || 
          responseText ||
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const responseText = await response.text();
      
      let data = null;
      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          Logger.error(`Failed to parse response as JSON:`, parseError);
          throw new Error(`Invalid JSON response: ${parseError.message}`);
        }
      } else {
        data = {};
      }
      
      Logger.success(`Request successful: ${endpoint}`);
      return { data, error: null };
      
    } catch (error) {
      Logger.error(`Request failed: ${endpoint}`, error);
      return { data: null, error: error.message };
    }
  }

  /**
   * Select data from table
   * @param {string} table - Table name
   * @param {Object} options - Query options
   * @returns {Promise<Object>}
   */
  async select(table, options = {}) {
    const {
      columns = '*',
      filters = {},
      orderBy = null,
      limit = null,
      offset = null
    } = options;

    let endpoint = `${table}?select=${columns}`;

    // Add filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        endpoint += `&${key}=eq.${encodeURIComponent(value)}`;
      }
    });

    // Add ordering
    if (orderBy) {
      endpoint += `&order=${orderBy}`;
    }

    // Add limit
    if (limit) {
      endpoint += `&limit=${limit}`;
    }

    // Add offset
    if (offset) {
      endpoint += `&offset=${offset}`;
    }

    return this.request(endpoint);
  }

  /**
   * Insert data into table
   * @param {string} table - Table name
   * @param {Object|Array} data - Data to insert
   * @returns {Promise<Object>}
   */
  async insert(table, data) {
    return this.request(table, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Prefer': 'return=representation'
      }
    });
  }

  /**
   * Update data in table
   * @param {string} table - Table name
   * @param {Object} data - Data to update
   * @param {Object} filters - Update filters
   * @returns {Promise<Object>}
   */
  async update(table, data, filters = {}) {
    let endpoint = table;
    
    // Add filters
    const filterParams = Object.entries(filters)
      .map(([key, value]) => `${key}=eq.${encodeURIComponent(value)}`)
      .join('&');
    
    if (filterParams) {
      endpoint += `?${filterParams}`;
    }

    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Prefer': 'return=representation'
      }
    });
  }

  /**
   * Delete data from table
   * @param {string} table - Table name
   * @param {Object} filters - Delete filters
   * @returns {Promise<Object>}
   */
  async delete(table, filters = {}) {
    let endpoint = table;
    
    // Add filters
    const filterParams = Object.entries(filters)
      .map(([key, value]) => `${key}=eq.${encodeURIComponent(value)}`)
      .join('&');
    
    if (filterParams) {
      endpoint += `?${filterParams}`;
    }

    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  /**
   * Execute RPC (Remote Procedure Call)
   * @param {string} functionName - Function name
   * @param {Object} params - Function parameters
   * @returns {Promise<Object>}
   */
  async rpc(functionName, params = {}) {
    return this.request(`rpc/${functionName}`, {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }
}

/**
 * Database Manager
 * High-level database operations
 */
class DatabaseManager {
  constructor(client) {
    this.client = client;
    this.isInitialized = false;
  }

  /**
   * Initialize the database manager
   */
  async init() {
    try {
      Logger.info('Initializing Database Manager...');
      
      // Test connection
      const healthCheck = await this.healthCheck();
      if (healthCheck.success) {
        this.isInitialized = true;
        Logger.success('Database Manager initialized successfully');
      } else {
        throw new Error(healthCheck.error);
      }
    } catch (error) {
      Logger.error('Failed to initialize Database Manager:', error);
      throw error;
    }
  }

  /**
   * Save contact form submission
   * @param {Object} contactData - Contact form data
   * @returns {Promise<Object>}
   */
  async saveContact(contactData) {
    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'subject', 'message'];
      const missingFields = requiredFields.filter(field => !contactData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Prepare data for insertion
      const data = {
        name: contactData.name.trim(),
        email: contactData.email.trim().toLowerCase(),
        subject: contactData.subject.trim(),
        message: contactData.message.trim(),
        created_at: new Date().toISOString(),
        ip_address: await this.getClientIP(),
        user_agent: navigator.userAgent,
        status: 'new'
      };

      Logger.info('Saving contact form submission', { email: data.email });
      
      const result = await this.client.insert('contacts', data);
      
      if (result.error) {
        throw new Error(result.error);
      }

      Logger.success('Contact form submitted successfully');
      return { success: true, data: result.data };
      
    } catch (error) {
      Logger.error('Failed to save contact form', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get portfolio projects
   * @param {Object} options - Query options
   * @returns {Promise<Object>}
   */
  async getProjects(options = {}) {
    try {
      const {
        category = null,
        featured = null,
        limit = 10,
        orderBy = 'created_at.desc'
      } = options;

      const filters = {};
      if (category) filters.category = category;
      if (featured !== null) filters.featured = featured;

      const result = await this.client.select('projects', {
        filters,
        orderBy,
        limit
      });

      if (result.error) {
        throw new Error(result.error);
      }

      Logger.success(`Retrieved ${result.data?.length || 0} projects`);
      return { success: true, data: result.data || [] };
      
    } catch (error) {
      Logger.error('Failed to get projects', error);
      return { success: false, error: error.message, data: [] };
    }
  }

  /**
   * Save visitor analytics data
   * @param {Object} visitorData - Visitor data
   * @returns {Promise<Object>}
   */
  async saveVisitorData(visitorData) {
    try {
      if (!APP_CONFIG.features.analytics) {
        Logger.info('Analytics disabled, skipping visitor data save');
        return { success: true, skipped: true };
      }

      const data = {
        page_url: window.location.href,
        page_title: document.title,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ip_address: await this.getClientIP(),
        session_id: this.getSessionId(),
        visited_at: new Date().toISOString(),
        ...visitorData
      };

      const result = await this.client.insert('visitor_analytics', data);
      
      if (result.error) {
        // Don't throw error for analytics failures
        Logger.warn('Failed to save visitor data', result.error);
        return { success: false, error: result.error };
      }

      Logger.info('Visitor data saved successfully');
      return { success: true, data: result.data };
      
    } catch (error) {
      Logger.warn('Failed to save visitor data', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get client IP address
   * @returns {Promise<string>}
   */
  async getClientIP() {
    try {
      // In production, this would be handled by the server
      // For now, return a placeholder
      return 'client-ip';
    } catch (error) {
      Logger.warn('Failed to get client IP', error);
      return 'unknown';
    }
  }

  /**
   * Get or create session ID
   * @returns {string}
   */
  getSessionId() {
    let sessionId = sessionStorage.getItem('snapfolio_session_id');
    
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('snapfolio_session_id', sessionId);
    }
    
    return sessionId;
  }

  /**
   * Health check for database connection
   * @returns {Promise<Object>}
   */
  async healthCheck() {
    try {
      const result = await this.client.select('contacts', {
        limit: 1,
        columns: 'id'
      });
      
      return {
        success: !result.error,
        status: result.error ? 'error' : 'healthy',
        error: result.error || null
      };
    } catch (error) {
      return {
        success: false,
        status: 'error',
        error: error.message
      };
    }
  }
}

// Create and export instances
const supabaseClient = new SupabaseClient();
const databaseManager = new DatabaseManager(supabaseClient);

// Export for global access (backward compatibility)
if (typeof window !== 'undefined') {
  window.supabase = supabaseClient;
  window.DatabaseManager = databaseManager;
}

export { supabaseClient as supabase, databaseManager as DatabaseManager };
export default databaseManager;