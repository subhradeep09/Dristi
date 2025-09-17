# 🚀 Dynamic Dashboard Data Management Guide

This guide shows you how to use the dynamic data system that combines **API endpoints** and **WebSocket real-time updates** across all dashboard pages.

## 📋 Table of Contents
1. [System Architecture](#system-architecture)
2. [API Configuration](#api-configuration)
3. [Using Data in Components](#using-data-in-components)
4. [Real-time Updates](#real-time-updates)
5. [Data Refresh Strategies](#data-refresh-strategies)
6. [Error Handling](#error-handling)
7. [Examples](#examples)

## 🏗️ System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Service   │    │  WebSocket       │    │  Data Context   │
│   (REST APIs)   │ ──▶│  (Real-time)     │ ──▶│  (Combined)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Initial Data    │    │ Live Updates     │    │ Dashboard       │
│ Polling         │    │ Notifications    │    │ Components      │
│ CRUD Operations │    │ Real-time Alerts │    │ Synchronized    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## ⚙️ API Configuration

### 1. Update API Base URL

Edit `src/services/apiService.js`:

```javascript
constructor() {
  // Replace with your actual API base URL
  this.baseURL = 'https://your-api-domain.com/api';
  // or for local development:
  // this.baseURL = 'http://localhost:3000/api';
}
```

### 2. Add Authentication (if needed)

```javascript
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  },
};
```

### 3. Configure WebSocket URL

Edit `src/contexts/WebSocketContext.jsx`:

```javascript
// Update WebSocket URL
const WS_URL = "wss://your-websocket-domain.com/dashboard";
```

## 🎯 Using Data in Components

### Basic Usage

```jsx
import React from 'react';
import { useData } from '../../contexts/useData';
import { useWebSocket } from '../../contexts/useWebSocket';

const MyDashboardComponent = () => {
  // API Data (with caching and polling)
  const { 
    dashboardStats,     // Dashboard statistics
    tourists,           // Tourist data
    sosAlerts,          // SOS alerts from API
    geofences,          // Geofence data
    broadcastHistory,   // SMS broadcast history
    heatmapData,        // Heatmap analytics
    refreshAllData,     // Manual refresh function
    globalLoading,      // Global loading state
    errors              // Error states
  } = useData();

  // Real-time WebSocket Data
  const { 
    wsConnected,        // Connection status
    liveUpdates,        // Real-time updates
    alerts: wsAlerts,   // Real-time alerts
    touristLocations,   // Live location tracking
    sendMessage         // Send WebSocket messages
  } = useWebSocket();

  return (
    <div>
      {/* Use the data in your component */}
      <h1>Total Tourists: {dashboardStats.totalRegistered}</h1>
      <p>Connection: {wsConnected ? 'Connected' : 'Disconnected'}</p>
      <p>Live Updates: {liveUpdates.length}</p>
    </div>
  );
};
```

### Advanced Data Operations

```jsx
const MyComponent = () => {
  const { 
    refreshData,          // Selective refresh
    fetchHeatmapData,     // Fetch specific data
    createGeofence,       // CRUD operations
    updateSOSAlert,
    sendBroadcast
  } = useData();

  // Refresh specific data types
  const handleRefresh = async () => {
    await refreshData(['tourists', 'sosAlerts']);
  };

  // Create new geofence
  const handleCreateGeofence = async (geofenceData) => {
    const response = await createGeofence(geofenceData);
    if (response.success) {
      console.log('Geofence created successfully');
      // Data will auto-refresh
    }
  };

  // Send SMS broadcast
  const handleSendBroadcast = async (message) => {
    const response = await sendBroadcast({
      message: message,
      recipients: 'all_active'
    });
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh Data</button>
      {/* Your component JSX */}
    </div>
  );
};
```

## ⚡ Real-time Updates

### WebSocket Message Handling

The system automatically handles these message types:

1. **SOS Alerts**
```javascript
{
  type: "dashboard_update",
  data: {
    type: "SOS",
    aadhaar_number: "123456789012",
    latitude: 27.5860,
    longitude: 91.8590,
    timestamp: "2024-01-15T10:30:00Z",
    location_name: "Tawang Monastery"
  }
}
```

2. **Geofence Breaches**
```javascript
{
  type: "dashboard_update",
  data: {
    aadhaar_number: "123456789012",
    latitude: 27.5860,
    longitude: 91.8590,
    geofence_breached: true,
    timestamp: "2024-01-15T10:30:00Z",
    location_name: "Outside Safe Zone"
  }
}
```

3. **Location Updates**
```javascript
{
  type: "dashboard_update",
  data: {
    aadhaar_number: "123456789012",
    latitude: 27.5860,
    longitude: 91.8590,
    timestamp: "2024-01-15T10:30:00Z",
    location_name: "Current Location"
  }
}
```

### Custom Message Sending

```jsx
const { sendMessage } = useWebSocket();

// Send custom message
const sendTestMessage = () => {
  const success = sendMessage({
    type: 'custom_action',
    data: {
      action: 'refresh_tourist_data',
      timestamp: new Date().toISOString()
    }
  });
  
  if (success) {
    console.log('Message sent successfully');
  }
};
```

## 🔄 Data Refresh Strategies

### 1. Automatic Polling

```javascript
// Automatic polling every 30 seconds when WebSocket is disconnected
// Polling can be controlled:
const { pollingEnabled, setPollingEnabled } = useData();

// Disable polling
setPollingEnabled(false);

// Re-enable polling
setPollingEnabled(true);
```

### 2. Manual Refresh

```jsx
const RefreshButton = () => {
  const { refreshAllData, globalLoading } = useData();

  return (
    <button 
      onClick={refreshAllData}
      disabled={globalLoading}
    >
      {globalLoading ? 'Refreshing...' : 'Refresh All Data'}
    </button>
  );
};
```

### 3. Selective Refresh

```jsx
const SelectiveRefresh = () => {
  const { refreshData } = useData();

  const refreshTourists = () => refreshData(['tourists']);
  const refreshAlerts = () => refreshData(['sosAlerts', 'geofences']);
  const refreshStats = () => refreshData(['dashboardStats']);

  return (
    <div>
      <button onClick={refreshTourists}>Refresh Tourists</button>
      <button onClick={refreshAlerts}>Refresh Alerts</button>
      <button onClick={refreshStats}>Refresh Stats</button>
    </div>
  );
};
```

## ❌ Error Handling

### Display Errors

```jsx
const ErrorDisplay = () => {
  const { errors, clearError } = useData();

  if (Object.keys(errors).length === 0) return null;

  return (
    <div className="error-container">
      <h3>Data Loading Errors:</h3>
      {Object.entries(errors).map(([key, error]) => (
        <div key={key} className="error-item">
          <span>{key}: {error}</span>
          <button onClick={() => clearError(key)}>×</button>
        </div>
      ))}
    </div>
  );
};
```

### Retry Logic

```jsx
const RetryableComponent = () => {
  const { errors, refreshData } = useData();

  const handleRetry = (dataType) => {
    refreshData([dataType]);
  };

  return (
    <div>
      {errors.tourists && (
        <div className="error-message">
          <p>Failed to load tourists data</p>
          <button onClick={() => handleRetry('tourists')}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};
```

## 📝 Examples

### 1. Tourist Activity Page

```jsx
const TouristActivity = () => {
  const { 
    dashboardStats, 
    tourists, 
    refreshData 
  } = useData();
  
  const { wsConnected, liveUpdates } = useWebSocket();

  // Real-time tourist count
  const onlineTourists = dashboardStats.currentlyOnline || 0;
  const totalTourists = dashboardStats.totalRegistered || 0;

  return (
    <div>
      <div className="stats">
        <div>Total: {totalTourists.toLocaleString()}</div>
        <div>Online: {onlineTourists.toLocaleString()}</div>
        <div>Status: {wsConnected ? 'Live' : 'Offline'}</div>
      </div>
      
      <div className="tourist-list">
        {tourists.data.map(tourist => (
          <div key={tourist.id}>
            {tourist.name} - {tourist.status}
          </div>
        ))}
      </div>
      
      <button onClick={() => refreshData(['tourists'])}>
        Refresh Tourists
      </button>
    </div>
  );
};
```

### 2. SOS Alerts Dashboard

```jsx
const SOSAlerts = () => {
  const { sosAlerts, updateSOSAlert } = useData();
  const { wsAlerts } = useWebSocket();

  // Combine API and WebSocket alerts
  const allAlerts = [
    ...sosAlerts.recent,
    ...wsAlerts.filter(alert => alert.type === 'SOS')
  ];

  const handleAlertResponse = async (alertId, status) => {
    const response = await updateSOSAlert(alertId, { status });
    if (response.success) {
      // Data will automatically refresh
      console.log('Alert updated successfully');
    }
  };

  return (
    <div>
      <h2>SOS Alerts ({allAlerts.length})</h2>
      {allAlerts.map(alert => (
        <div key={alert.id} className="alert-item">
          <div>{alert.message}</div>
          <div>{alert.timestamp}</div>
          <button onClick={() => handleAlertResponse(alert.id, 'responded')}>
            Respond
          </button>
        </div>
      ))}
    </div>
  );
};
```

### 3. Real-time Heatmap

```jsx
const Heatmap = () => {
  const { heatmapData, fetchHeatmapData } = useData();
  const { touristLocations } = useWebSocket();

  useEffect(() => {
    // Fetch initial heatmap data
    fetchHeatmapData({
      timeRange: '24h',
      region: 'northeast'
    });
  }, [fetchHeatmapData]);

  // Update heatmap with real-time locations
  useEffect(() => {
    if (touristLocations.size > 0) {
      // Convert WebSocket locations to heatmap points
      const livePoints = Array.from(touristLocations.values()).map(location => ({
        lat: location.lat,
        lng: location.lng,
        intensity: 1
      }));
      
      // Update heatmap with live data
      updateHeatmapLayer(livePoints);
    }
  }, [touristLocations]);

  return (
    <div>
      <div className="heatmap-controls">
        <button onClick={() => fetchHeatmapData({ timeRange: '1h' })}>
          Last Hour
        </button>
        <button onClick={() => fetchHeatmapData({ timeRange: '24h' })}>
          Last 24 Hours
        </button>
      </div>
      
      <div id="heatmap-container">
        {heatmapData.loading ? 'Loading...' : 'Heatmap Ready'}
      </div>
    </div>
  );
};
```

## 🧪 Testing & Debugging

### Debug WebSocket

Open browser console and use:

```javascript
// Check connection status
window.globalWebSocket.getConnectionState()

// Send test message
window.globalWebSocket.sendTestMessage('sos')

// View live data
window.globalWebSocket.getLiveData()

// Manual reconnect
window.globalWebSocket.reconnect()
```

### API Testing

```javascript
// Test API endpoints
window.apiService = {
  getDashboardStats: () => apiService.getDashboardStats(),
  getTourists: () => apiService.getTourists(),
  // ... other methods
}
```

## 🚀 Performance Tips

1. **Use useMemo for expensive computations**
```jsx
const filteredTourists = useMemo(() => {
  return tourists.data.filter(tourist => 
    tourist.status === 'active'
  );
}, [tourists.data]);
```

2. **Selective data refresh**
```jsx
// Instead of refreshing all data
await refreshAllData();

// Refresh only what you need
await refreshData(['tourists', 'sosAlerts']);
```

3. **Control polling**
```jsx
// Disable polling on inactive pages
useEffect(() => {
  if (!isPageActive) {
    setPollingEnabled(false);
  }
  return () => setPollingEnabled(true);
}, [isPageActive]);
```

This system provides a robust foundation for dynamic dashboard updates combining the reliability of REST APIs with the real-time capabilities of WebSockets! 🎉