import React from 'react';
import { useWebSocket } from '../../contexts/useWebSocket';

const WebSocketStatus = ({ showDetails = false }) => {
  const { 
    wsConnected, 
    connectionStatus, 
    liveUpdates, 
    alerts, 
    sendMessage,
    getRecentAlerts,
    getRecentUpdates 
  } = useWebSocket();

  // Function to send test message
  const sendTestMessage = () => {
    const testMessage = {
      type: 'test',
      data: 'Hello from WebSocket Status Component!',
      timestamp: new Date().toISOString()
    };
    
    const sent = sendMessage(testMessage);
    if (sent) {
      console.log('✅ Test message sent successfully');
    } else {
      console.log('❌ Failed to send test message');
    }
  };

  const recentAlerts = getRecentAlerts(3);
  const recentUpdates = getRecentUpdates(5);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">WebSocket Status</h3>
        <button
          onClick={sendTestMessage}
          className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          Test Connection
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${wsConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <p className="text-xs text-gray-600">Connection</p>
          <p className={`text-sm font-medium ${wsConnected ? 'text-green-600' : 'text-red-600'}`}>
            {connectionStatus}
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
          <p className="text-xs text-gray-600">Live Updates</p>
          <p className="text-sm font-medium text-blue-600">{liveUpdates.length}</p>
        </div>
        
        <div className="text-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
          <p className="text-xs text-gray-600">Active Alerts</p>
          <p className="text-sm font-medium text-red-600">{alerts.length}</p>
        </div>
        
        <div className="text-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
          <p className="text-xs text-gray-600">Status</p>
          <p className="text-sm font-medium text-green-600">
            {wsConnected ? 'Live' : 'Offline'}
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-4">
          {/* Recent Alerts */}
          {recentAlerts.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Alerts</h4>
              <div className="space-y-2">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-2 bg-red-50 rounded text-sm">
                    <div className="flex justify-between items-start">
                      <span className="text-red-800 font-medium">{alert.type}</span>
                      <span className="text-red-600 text-xs">
                        {alert.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-red-700 text-xs mt-1">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Updates */}
          {recentUpdates.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Updates</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {recentUpdates.map((update) => (
                  <div key={update.id} className="p-2 bg-gray-50 rounded text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium capitalize">
                        {update.type.replace('_', ' ')}
                      </span>
                      <span className="text-gray-500">
                        {update.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Debug Info (only in development) */}
      {import.meta.env.DEV && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Debug: Use <code>window.globalWebSocket</code> in console for testing
          </p>
        </div>
      )}
    </div>
  );
};

export default WebSocketStatus;