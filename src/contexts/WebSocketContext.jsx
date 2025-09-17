import React, { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketContext } from './WebSocketContextDefinition';

export const WebSocketProvider = ({ children }) => {
  // Connection state
  const [wsConnected, setWsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // 'connecting', 'connected', 'disconnected', 'error'
  
  // Data states
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [touristLocations, setTouristLocations] = useState(new Map());
  const [sosAlerts, setSosAlerts] = useState([]);
  const [geofenceAlerts, setGeofenceAlerts] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  
  // WebSocket connection refs
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 10;
  const baseReconnectDelay = 5000; // 5 seconds

  // WebSocket URL
  const WS_URL = "wss://drishti-y8b6.onrender.com/dashboard";

  // Send message helper
  const sendMessage = useCallback((message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const messageWithTimestamp = {
        ...message,
        timestamp: new Date().toISOString(),
        clientId: 'dashboard-global-websocket'
      };
      
      try {
        const messageString = JSON.stringify(messageWithTimestamp);
        wsRef.current.send(messageString);
        console.log('📤 WebSocket message sent:', messageWithTimestamp);
        return true;
      } catch (sendError) {
        console.error('❌ Error sending WebSocket message:', sendError);
        return false;
      }
    } else {
      const readyStateNames = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
      const currentState = wsRef.current ? readyStateNames[wsRef.current.readyState] : 'NO_CONNECTION';
      console.warn('⚠️ WebSocket is not connected. Current state:', currentState);
      return false;
    }
  }, []);

  // Handle incoming messages
  const handleMessage = useCallback((message) => {
    try {
      console.log("📨 WebSocket message received:", message.data);
      const parsedMessage = JSON.parse(message.data);

      if (parsedMessage.type === "dashboard_update" && parsedMessage.data) {
        const data = parsedMessage.data;
        console.log("📊 Dashboard update received:", data);
        
        // Add to live updates
        const newUpdate = {
          id: Date.now() + Math.random(),
          timestamp: new Date(),
          type: 'dashboard_update',
          data: data
        };
        
        setLiveUpdates(prev => [newUpdate, ...prev.slice(0, 99)]); // Keep last 100 updates
        
        // Handle SOS alerts
        if (data.type === "SOS") {
          console.log("🚨 SOS Alert received:", data);
          const sosAlert = {
            id: Date.now() + Math.random(),
            type: "SOS",
            userId: data.aadhaar_number,
            location: { lat: data.latitude, lng: data.longitude },
            timestamp: new Date(data.timestamp || Date.now()),
            message: `SOS alert from user ${data.aadhaar_number}`,
            severity: 'high',
            locationName: data.location_name || 'Unknown Location'
          };
          
          setAlerts(prev => [sosAlert, ...prev.slice(0, 49)]); // Keep last 50 alerts
          setSosAlerts(prev => [sosAlert, ...prev.slice(0, 19)]); // Keep last 20 SOS alerts
          
          // Show browser notification if permissions granted
          if (Notification.permission === 'granted') {
            new Notification('🚨 SOS Alert', {
              body: `Emergency alert from tourist at ${data.latitude}, ${data.longitude}`,
              icon: '/dristi-icon.svg'
            });
          }
        } 
        // Handle geofence breaches
        else if (data.geofence_breached) {
          console.log("⚠️ Geofence breach detected:", data);
          const geofenceAlert = {
            id: Date.now() + Math.random(),
            type: "GEOFENCE_BREACH",
            userId: data.aadhaar_number,
            location: { lat: data.latitude, lng: data.longitude },
            timestamp: new Date(data.timestamp || Date.now()),
            message: `Tourist ${data.aadhaar_number} breached geofence`,
            severity: 'medium',
            locationName: data.location_name || 'Unknown Location'
          };
          
          setAlerts(prev => [geofenceAlert, ...prev.slice(0, 49)]);
          setGeofenceAlerts(prev => [geofenceAlert, ...prev.slice(0, 19)]); // Keep last 20 geofence alerts
          
          if (Notification.permission === 'granted') {
            new Notification('⚠️ Geofence Breach', {
              body: `Tourist has moved outside designated area`,
              icon: '/dristi-icon.svg'
            });
          }
        }
        // Handle tourist location updates
        else if (data.aadhaar_number && data.latitude && data.longitude) {
          console.log("📍 Tourist location update:", data);
          setTouristLocations(prev => {
            const newMap = new Map(prev);
            newMap.set(data.aadhaar_number, {
              lat: data.latitude,
              lng: data.longitude,
              timestamp: new Date(data.timestamp || Date.now()),
              location_name: data.location_name || 'Unknown Location',
              userId: data.aadhaar_number
            });
            return newMap;
          });
        }
      }
      // Handle other message types
      else if (parsedMessage.type === "tourist_update") {
        console.log("👤 Tourist activity update:", parsedMessage.data);
        const newUpdate = {
          id: Date.now() + Math.random(),
          timestamp: new Date(),
          type: 'tourist_update',
          data: parsedMessage.data
        };
        setLiveUpdates(prev => [newUpdate, ...prev.slice(0, 99)]);
      }
      else if (parsedMessage.type === "connection_confirmed") {
        console.log("✅ Connection confirmed by server:", parsedMessage.data);
      }
      else if (parsedMessage.type === "dashboard_stats") {
        console.log("📈 Dashboard stats update:", parsedMessage.data);
        setDashboardStats(prev => ({
          ...prev,
          ...parsedMessage.data
        }));
      }
      else {
        console.log("📋 Other message type:", parsedMessage.type, parsedMessage);
        const newUpdate = {
          id: Date.now() + Math.random(),
          timestamp: new Date(),
          type: parsedMessage.type || 'unknown',
          data: parsedMessage.data || parsedMessage
        };
        setLiveUpdates(prev => [newUpdate, ...prev.slice(0, 99)]);
      }
    } catch (err) {
      console.error("❌ Error parsing WebSocket message:", err);
      console.error("Raw message:", message.data);
    }
  }, []);

  // Connect to WebSocket
  const connect = useCallback(() => {
    // Don't connect if already connecting or connected
    if (wsRef.current && 
        (wsRef.current.readyState === WebSocket.CONNECTING || 
         wsRef.current.readyState === WebSocket.OPEN)) {
      return;
    }

    console.log('🔄 Attempting WebSocket connection...');
    setConnectionStatus('connecting');
    
    // Clear any existing connection
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("✅ WebSocket connected successfully");
        setWsConnected(true);
        setConnectionStatus('connected');
        reconnectAttemptsRef.current = 0; // Reset reconnect attempts
        
        // Clear any pending reconnection attempts
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }

        // Send initial connection message
        const connectMessage = {
          type: 'connection_init',
          data: {
            clientType: 'dashboard',
            timestamp: new Date().toISOString()
          }
        };
        sendMessage(connectMessage);
      };

      ws.onmessage = handleMessage;

      ws.onclose = (event) => {
        console.log("⚠️ WebSocket disconnected:", event.code, event.reason);
        setWsConnected(false);
        setConnectionStatus('disconnected');
        
        // Only attempt reconnection if it wasn't a deliberate close and we haven't exceeded max attempts
        if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = Math.min(baseReconnectDelay * Math.pow(1.5, reconnectAttemptsRef.current), 30000); // Max 30 seconds
          console.log(`🔄 Attempting to reconnect in ${delay/1000} seconds... (Attempt ${reconnectAttemptsRef.current + 1}/${maxReconnectAttempts})`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            if (wsRef.current === ws) { // Only reconnect if this is still the current connection
              connect();
            }
          }, delay);
        } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          console.error('❌ Max reconnection attempts reached. Stopping reconnection.');
          setConnectionStatus('error');
        }
      };

      ws.onerror = (error) => {
        console.error("❌ WebSocket error:", error);
        setWsConnected(false);
        setConnectionStatus('error');
      };

    } catch (error) {
      console.error('❌ Error creating WebSocket connection:', error);
      setConnectionStatus('error');
    }
  }, [sendMessage, handleMessage]);

  // Disconnect WebSocket
  const disconnect = useCallback(() => {
    console.log('🔌 Manually disconnecting WebSocket');
    
    // Clear any pending reconnection
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    // Close connection
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.close(1000, 'Manual disconnect');
      } catch (closeError) {
        console.warn('⚠️ Error closing WebSocket:', closeError.message);
      }
    }
    
    wsRef.current = null;
    setWsConnected(false);
    setConnectionStatus('disconnected');
    reconnectAttemptsRef.current = 0;
  }, []);

  // Reconnect WebSocket
  const reconnect = useCallback(() => {
    console.log('🔄 Manual reconnection requested');
    reconnectAttemptsRef.current = 0;
    disconnect();
    setTimeout(connect, 1000); // Wait 1 second before reconnecting
  }, [connect, disconnect]);

  // Clear data functions
  const clearLiveUpdates = useCallback(() => setLiveUpdates([]), []);
  const clearAlerts = useCallback(() => {
    setAlerts([]);
    setSosAlerts([]);
    setGeofenceAlerts([]);
  }, []);
  const clearTouristLocations = useCallback(() => setTouristLocations(new Map()), []);

  // Get filtered data functions
  const getRecentAlerts = useCallback((limit = 10) => alerts.slice(0, limit), [alerts]);
  const getRecentUpdates = useCallback((limit = 20) => liveUpdates.slice(0, limit), [liveUpdates]);
  const getActiveTouristLocations = useCallback(() => {
    const now = new Date();
    const activeLocations = new Map();
    
    touristLocations.forEach((location, userId) => {
      const timeDiff = now - location.timestamp;
      const isActive = timeDiff < 5 * 60 * 1000; // Consider active if updated within 5 minutes
      
      if (isActive) {
        activeLocations.set(userId, {
          ...location,
          isActive: true,
          lastSeenMinutes: Math.floor(timeDiff / 60000)
        });
      }
    });
    
    return activeLocations;
  }, [touristLocations]);

  // Initialize connection on mount
  useEffect(() => {
    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }
    
    // Connect to WebSocket
    connect();
    
    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up WebSocket connection');
      
      // Clear any pending reconnection
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      // Close connection
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.close(1000, 'Component unmounting');
        } catch (closeError) {
          console.warn('⚠️ Error closing WebSocket during cleanup:', closeError.message);
        }
      }
      
      wsRef.current = null;
      setWsConnected(false);
      setConnectionStatus('disconnected');
    };
  }, [connect]);

  // Debug functions for development
  useEffect(() => {
    // Expose debug functions to global scope
    window.globalWebSocket = {
      // Connection management
      connect,
      disconnect,
      reconnect,
      getConnectionState: () => ({
        connected: wsConnected,
        status: connectionStatus,
        readyState: wsRef.current?.readyState,
        url: wsRef.current?.url,
        reconnectAttempts: reconnectAttemptsRef.current
      }),
      
      // Send messages
      sendMessage,
      sendTestMessage: (type = 'test') => {
        const testMessages = {
          test: {
            type: 'test',
            data: 'Hello from Global WebSocket!',
            timestamp: new Date().toISOString()
          },
          sos: {
            type: 'dashboard_update',
            data: {
              type: 'SOS',
              aadhaar_number: 'GLOBAL_TEST_' + Date.now(),
              latitude: 27.5860 + (Math.random() - 0.5) * 0.01,
              longitude: 91.8590 + (Math.random() - 0.5) * 0.01,
              timestamp: new Date().toISOString(),
              location_name: 'Test SOS Location'
            }
          },
          geofence: {
            type: 'dashboard_update',
            data: {
              aadhaar_number: 'GLOBAL_TEST_' + Date.now(),
              latitude: 27.5860 + (Math.random() - 0.5) * 0.01,
              longitude: 91.8590 + (Math.random() - 0.5) * 0.01,
              geofence_breached: true,
              timestamp: new Date().toISOString(),
              location_name: 'Outside Geofence Area'
            }
          }
        };
        
        const message = testMessages[type] || testMessages.test;
        return sendMessage(message);
      },
      
      // Data access
      getLiveData: () => ({
        wsConnected,
        connectionStatus,
        liveUpdates: liveUpdates.slice(0, 10),
        alerts: alerts.slice(0, 5),
        sosAlerts: sosAlerts.slice(0, 5),
        geofenceAlerts: geofenceAlerts.slice(0, 5),
        touristLocations: Object.fromEntries(touristLocations),
        activeTouristLocations: Object.fromEntries(getActiveTouristLocations()),
        stats: dashboardStats
      }),
      
      // Data management
      clearLiveUpdates,
      clearAlerts,
      clearTouristLocations
    };
    
    return () => {
      delete window.globalWebSocket;
    };
  }, [wsConnected, connectionStatus, liveUpdates, alerts, sosAlerts, geofenceAlerts, touristLocations, dashboardStats, 
      connect, disconnect, reconnect, sendMessage, clearLiveUpdates, clearAlerts, clearTouristLocations, getActiveTouristLocations]);

  const contextValue = {
    // Connection state
    wsConnected,
    connectionStatus,
    
    // Data
    liveUpdates,
    alerts,
    sosAlerts,
    geofenceAlerts,
    touristLocations,
    dashboardStats,
    
    // Connection methods
    connect,
    disconnect,
    reconnect,
    sendMessage,
    
    // Data methods
    clearLiveUpdates,
    clearAlerts,
    clearTouristLocations,
    getRecentAlerts,
    getRecentUpdates,
    getActiveTouristLocations
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};