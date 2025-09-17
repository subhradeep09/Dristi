// API Service for handling all REST API calls
class ApiService {
  constructor() {
    // Replace with your actual API base URL
    this.baseURL = 'https://drishti-y8b6.onrender.com/api';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
  }

  // Generic request handler with error handling
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Cache management
  getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache(key = null) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Dashboard Statistics
  async getDashboardStats() {
    const cacheKey = 'dashboard-stats';
    const cached = this.getCachedData(cacheKey);
    if (cached) return { success: true, data: cached };

    const response = await this.request('/dashboard/stats');
    if (response.success) {
      this.setCachedData(cacheKey, response.data);
    }
    return response;
  }

  // Tourist Data
  async getTourists(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/tourists${queryParams ? `?${queryParams}` : ''}`;
    return await this.request(endpoint);
  }

  async getTouristById(id) {
    return await this.request(`/tourists/${id}`);
  }

  async getActiveTourists() {
    const cacheKey = 'active-tourists';
    const cached = this.getCachedData(cacheKey);
    if (cached) return { success: true, data: cached };

    const response = await this.request('/tourists/active');
    if (response.success) {
      this.setCachedData(cacheKey, response.data);
    }
    return response;
  }

  // SOS Alerts
  async getSOSAlerts(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/sos-alerts${queryParams ? `?${queryParams}` : ''}`;
    return await this.request(endpoint);
  }

  async getRecentSOSAlerts(limit = 10) {
    return await this.request(`/sos-alerts/recent?limit=${limit}`);
  }

  async updateSOSAlert(id, data) {
    return await this.request(`/sos-alerts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // Geofencing
  async getGeofences() {
    return await this.request('/geofences');
  }

  async createGeofence(data) {
    return await this.request('/geofences', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateGeofence(id, data) {
    return await this.request(`/geofences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // SMS Broadcast
  async sendBroadcast(data) {
    return await this.request('/sms/broadcast', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getBroadcastHistory(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/sms/history${queryParams ? `?${queryParams}` : ''}`;
    return await this.request(endpoint);
  }

  // Heatmap Data
  async getHeatmapData(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/analytics/heatmap${queryParams ? `?${queryParams}` : ''}`;
    return await this.request(endpoint);
  }

  // Location Analytics
  async getLocationAnalytics(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/analytics/locations${queryParams ? `?${queryParams}` : ''}`;
    return await this.request(endpoint);
  }

  // User Registration
  async registerUser(userData) {
    return await this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  // Admin Authentication
  async adminLogin(credentials) {
    const response = await this.request('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (response.success && response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
    }
    
    return response;
  }

  async verifyAdminToken() {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, error: 'No token found' };

    return await this.request('/auth/admin/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Utility method to refresh all cached data
  async refreshAllData() {
    this.clearCache();
    const promises = [
      this.getDashboardStats(),
      this.getActiveTourists(),
      this.getRecentSOSAlerts(),
      this.getGeofences(),
      this.getBroadcastHistory({ limit: 10 })
    ];

    try {
      const results = await Promise.allSettled(promises);
      console.log('✅ All data refreshed:', results);
      return results;
    } catch (error) {
      console.error('❌ Error refreshing data:', error);
      throw error;
    }
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;