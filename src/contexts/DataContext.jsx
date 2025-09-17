import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useWebSocket } from './useWebSocket';
import { DataContext } from './DataContextDefinition';
import apiService from '../services/apiService';

export const DataProvider = ({ children }) => {
  // WebSocket connection
  const { 
    wsConnected, 
    liveUpdates, 
    alerts: wsAlerts, 
    touristLocations: wsLocations,
    sendMessage 
  } = useWebSocket();

  // API Data States
  const [dashboardStats, setDashboardStats] = useState({
    totalRegistered: 0,
    activeToday: 0,
    currentlyOnline: 0,
    sosAlerts: 0,
    loading: true,
    lastUpdated: null
  });

  const [tourists, setTourists] = useState({
    data: [],
    active: [],
    loading: true,
    lastUpdated: null
  });

  const [sosAlerts, setSosAlerts] = useState({
    data: [],
    recent: [],
    loading: true,
    lastUpdated: null
  });

  const [geofences, setGeofences] = useState({
    data: [],
    loading: true,
    lastUpdated: null
  });

  const [broadcastHistory, setBroadcastHistory] = useState({
    data: [],
    loading: true,
    lastUpdated: null
  });

  const [heatmapData, setHeatmapData] = useState({
    data: null,
    loading: true,
    lastUpdated: null
  });

  // Loading and error states
  const [globalLoading, setGlobalLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Polling intervals
  const pollIntervalRef = useRef();
  const [pollingEnabled, setPollingEnabled] = useState(true);
  const POLLING_INTERVAL = 30000; // 30 seconds

  // Utility function to update state safely
  const updateState = useCallback((setter, newData, loading = false) => {
    setter(prevState => ({
      ...prevState,
      ...newData,
      loading,
      lastUpdated: new Date()
    }));
  }, []);

  // Error handler
  const handleError = useCallback((key, error) => {
    console.error(`Data error for ${key}:`, error);
    setErrors(prev => ({ ...prev, [key]: error }));
  }, []);

  // Clear error
  const clearError = useCallback((key) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  }, []);

  // Fetch Dashboard Stats
  const fetchDashboardStats = useCallback(async () => {
    try {
      clearError('dashboardStats');
      const response = await apiService.getDashboardStats();
      
      if (response.success) {
        updateState(setDashboardStats, response.data, false);
      } else {
        handleError('dashboardStats', response.error);
      }
    } catch (error) {
      handleError('dashboardStats', error.message);
    }
  }, [updateState, handleError, clearError]);

  // Fetch Tourists Data
  const fetchTourists = useCallback(async () => {
    try {
      clearError('tourists');
      const [allTourists, activeTourists] = await Promise.all([
        apiService.getTourists(),
        apiService.getActiveTourists()
      ]);

      if (allTourists.success && activeTourists.success) {
        updateState(setTourists, {
          data: allTourists.data,
          active: activeTourists.data
        }, false);
      } else {
        handleError('tourists', allTourists.error || activeTourists.error);
      }
    } catch (error) {
      handleError('tourists', error.message);
    }
  }, [updateState, handleError, clearError]);

  // Fetch SOS Alerts
  const fetchSOSAlerts = useCallback(async () => {
    try {
      clearError('sosAlerts');
      const [allAlerts, recentAlerts] = await Promise.all([
        apiService.getSOSAlerts(),
        apiService.getRecentSOSAlerts(20)
      ]);

      if (allAlerts.success && recentAlerts.success) {
        updateState(setSosAlerts, {
          data: allAlerts.data,
          recent: recentAlerts.data
        }, false);
      } else {
        handleError('sosAlerts', allAlerts.error || recentAlerts.error);
      }
    } catch (error) {
      handleError('sosAlerts', error.message);
    }
  }, [updateState, handleError, clearError]);

  // Fetch Geofences
  const fetchGeofences = useCallback(async () => {
    try {
      clearError('geofences');
      const response = await apiService.getGeofences();
      
      if (response.success) {
        updateState(setGeofences, { data: response.data }, false);
      } else {
        handleError('geofences', response.error);
      }
    } catch (error) {
      handleError('geofences', error.message);
    }
  }, [updateState, handleError, clearError]);

  // Fetch Broadcast History
  const fetchBroadcastHistory = useCallback(async () => {
    try {
      clearError('broadcastHistory');
      const response = await apiService.getBroadcastHistory({ limit: 50 });
      
      if (response.success) {
        updateState(setBroadcastHistory, { data: response.data }, false);
      } else {
        handleError('broadcastHistory', response.error);
      }
    } catch (error) {
      handleError('broadcastHistory', error.message);
    }
  }, [updateState, handleError, clearError]);

  // Fetch Heatmap Data
  const fetchHeatmapData = useCallback(async (params = {}) => {
    try {
      clearError('heatmapData');
      updateState(setHeatmapData, {}, true); // Set loading
      
      const response = await apiService.getHeatmapData(params);
      
      if (response.success) {
        updateState(setHeatmapData, { data: response.data }, false);
      } else {
        handleError('heatmapData', response.error);
      }
    } catch (error) {
      handleError('heatmapData', error.message);
    }
  }, [updateState, handleError, clearError]);

  // Refresh all data
  const refreshAllData = useCallback(async () => {
    console.log('🔄 Refreshing all dashboard data...');
    setGlobalLoading(true);
    
    try {
      await Promise.all([
        fetchDashboardStats(),
        fetchTourists(),
        fetchSOSAlerts(),
        fetchGeofences(),
        fetchBroadcastHistory()
      ]);
      
      console.log('✅ All data refreshed successfully');
    } catch (error) {
      console.error('❌ Error refreshing data:', error);
    } finally {
      setGlobalLoading(false);
    }
  }, [fetchDashboardStats, fetchTourists, fetchSOSAlerts, fetchGeofences, fetchBroadcastHistory]);

  // Selective data refresh
  const refreshData = useCallback(async (dataTypes = []) => {
    const refreshFunctions = {
      dashboardStats: fetchDashboardStats,
      tourists: fetchTourists,
      sosAlerts: fetchSOSAlerts,
      geofences: fetchGeofences,
      broadcastHistory: fetchBroadcastHistory,
      heatmapData: () => fetchHeatmapData()
    };

    const promises = dataTypes.map(type => refreshFunctions[type]?.());
    await Promise.all(promises.filter(Boolean));
  }, [fetchDashboardStats, fetchTourists, fetchSOSAlerts, fetchGeofences, fetchBroadcastHistory, fetchHeatmapData]);

  // Handle WebSocket updates
  useEffect(() => {
    if (!wsConnected) return;

    // Process WebSocket alerts and update relevant data
    wsAlerts.forEach(alert => {
      if (alert.type === 'SOS') {
        // Add new SOS alert to the list
        setSosAlerts(prev => ({
          ...prev,
          recent: [alert, ...prev.recent.slice(0, 19)], // Keep last 20
          lastUpdated: new Date()
        }));

        // Update dashboard stats
        setDashboardStats(prev => ({
          ...prev,
          sosAlerts: prev.sosAlerts + 1,
          lastUpdated: new Date()
        }));
      }

      if (alert.type === 'GEOFENCE_BREACH') {
        // Trigger geofence data refresh
        fetchGeofences();
      }
    });

    // Update tourist locations from WebSocket
    if (wsLocations.size > 0) {
      setTourists(prev => ({
        ...prev,
        // Merge WebSocket locations with existing data
        active: prev.active.map(tourist => {
          const wsLocation = wsLocations.get(tourist.aadhaar_number);
          if (wsLocation) {
            return {
              ...tourist,
              currentLocation: wsLocation,
              lastSeen: wsLocation.timestamp
            };
          }
          return tourist;
        }),
        lastUpdated: new Date()
      }));
    }
  }, [wsConnected, wsAlerts, wsLocations, fetchGeofences]);

  // Polling for periodic data refresh
  useEffect(() => {
    if (!pollingEnabled) return;

    const poll = () => {
      // Only refresh if WebSocket is not connected or as backup
      if (!wsConnected) {
        console.log('🔄 Polling data (WebSocket disconnected)');
        refreshData(['dashboardStats', 'tourists', 'sosAlerts']);
      } else {
        // Light refresh when WebSocket is connected
        refreshData(['dashboardStats']);
      }
    };

    pollIntervalRef.current = setInterval(poll, POLLING_INTERVAL);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [pollingEnabled, wsConnected, refreshData]);

  // Initial data load
  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // API Methods for dashboard components
  const apiMethods = {
    // Tourist operations
    getTouristById: apiService.getTouristById.bind(apiService),
    
    // SOS operations
    updateSOSAlert: async (id, data) => {
      const response = await apiService.updateSOSAlert(id, data);
      if (response.success) {
        await fetchSOSAlerts(); // Refresh SOS data
      }
      return response;
    },

    // Geofence operations
    createGeofence: async (data) => {
      const response = await apiService.createGeofence(data);
      if (response.success) {
        await fetchGeofences(); // Refresh geofence data
      }
      return response;
    },

    updateGeofence: async (id, data) => {
      const response = await apiService.updateGeofence(id, data);
      if (response.success) {
        await fetchGeofences(); // Refresh geofence data
      }
      return response;
    },

    // SMS Broadcast
    sendBroadcast: async (data) => {
      const response = await apiService.sendBroadcast(data);
      if (response.success) {
        await fetchBroadcastHistory(); // Refresh broadcast history
      }
      return response;
    },

    // User registration
    registerUser: apiService.registerUser.bind(apiService),

    // Admin auth
    adminLogin: apiService.adminLogin.bind(apiService),
    verifyAdminToken: apiService.verifyAdminToken.bind(apiService)
  };

  const contextValue = {
    // Data states
    dashboardStats,
    tourists,
    sosAlerts,
    geofences,
    broadcastHistory,
    heatmapData,

    // WebSocket data (real-time)
    wsConnected,
    liveUpdates,
    wsAlerts,
    wsLocations,

    // Loading states
    globalLoading,
    errors,

    // Control
    pollingEnabled,
    setPollingEnabled,

    // Methods
    refreshAllData,
    refreshData,
    fetchHeatmapData,
    clearError,
    sendMessage, // WebSocket send message

    // API methods
    ...apiMethods
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};