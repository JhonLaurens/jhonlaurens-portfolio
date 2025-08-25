// Supabase Configuration
// Project: portafolio-jhonlaurens
const SUPABASE_URL = "https://edtcguoujjysnbasoxsk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdGNndW91amp5c25iYXNveHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMTY4NjIsImV4cCI6MjA3MDU5Mjg2Mn0.-IsoiGzO-QCPE01pSyclZEF4ZuWggQbwhSHs5JtGlOo";

// Initialize Supabase client
class SupabaseClient {
  constructor() {
    this.url = SUPABASE_URL;
    this.key = SUPABASE_ANON_KEY;
    this.headers = {
      apikey: this.key,
      Authorization: `Bearer ${this.key}`,
      "Content-Type": "application/json",
    };
  }

  // Generic method to make requests to Supabase
  async request(endpoint, options = {}) {
    const url = `${this.url}/rest/v1/${endpoint}`;
    const config = {
      headers: this.headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response has content
      const contentLength = response.headers.get("content-length");
      if (contentLength === "0" || contentLength === null) {
        // For INSERT operations, return success if status is ok
        return { success: true, message: "Operation completed successfully" };
      }

      const text = await response.text();
      if (!text) {
        return { success: true, message: "Operation completed successfully" };
      }

      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.warn("Response is not JSON, returning as text:", text);
        return { success: true, data: text };
      }
    } catch (error) {
      console.error("Supabase request error:", error);
      throw error;
    }
  }

  // Get data from a table
  async select(table, columns = "*", filters = {}) {
    let endpoint = `${table}?select=${columns}`;

    // Add filters
    Object.entries(filters).forEach(([key, value]) => {
      endpoint += `&${key}=eq.${value}`;
    });

    return await this.request(endpoint, {
      method: "GET",
    });
  }

  // Insert data into a table
  async insert(table, data) {
    return await this.request(table, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Update data in a table
  async update(table, data, filters = {}) {
    let endpoint = table;

    // Add filters
    const filterParams = Object.entries(filters)
      .map(([key, value]) => `${key}=eq.${value}`)
      .join("&");

    if (filterParams) {
      endpoint += `?${filterParams}`;
    }

    return await this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // Delete data from a table
  async delete(table, filters = {}) {
    let endpoint = table;

    // Add filters
    const filterParams = Object.entries(filters)
      .map(([key, value]) => `${key}=eq.${value}`)
      .join("&");

    if (filterParams) {
      endpoint += `?${filterParams}`;
    }

    return await this.request(endpoint, {
      method: "DELETE",
    });
  }
}

// Create global instance
const supabase = new SupabaseClient();

// Example usage functions
const DatabaseManager = {
  // Save contact form data
  async saveContact(contactData) {
    try {
      const result = await supabase.insert("contacts", {
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
        created_at: contactData.created_at || new Date().toISOString(),
      });

      console.log("Contact saved successfully:", result);

      // Handle different response types
      if (result && (result.success || result.message)) {
        return { success: true, data: result };
      } else if (result && result.length >= 0) {
        // Array response (even if empty) means success
        return { success: true, data: result };
      } else {
        // If we get here and no error was thrown, assume success
        return { success: true, data: result };
      }
    } catch (error) {
      console.error("Error saving contact:", error);
      return { success: false, error: error.message };
    }
  },

  // Alias for saveContact to match main.js usage
  async saveContactData(contactData) {
    return await this.saveContact(contactData);
  },

  // Example: Get portfolio projects
  async getProjects() {
    try {
      const projects = await supabase.select("projects");
      console.log("Projects loaded:", projects);
      return projects;
    } catch (error) {
      console.error("Error loading projects:", error);
      throw error;
    }
  },

  // Example: Save visitor analytics
  async saveVisitorData(visitorData) {
    try {
      const result = await supabase.insert("visitors", {
        ip_address: visitorData.ip,
        user_agent: visitorData.userAgent,
        page_visited: visitorData.page,
        visit_time: new Date().toISOString(),
      });
      return result;
    } catch (error) {
      console.error("Error saving visitor data:", error);
      throw error;
    }
  },
};

// Make it available globally
window.supabase = supabase;
window.DatabaseManager = DatabaseManager;
