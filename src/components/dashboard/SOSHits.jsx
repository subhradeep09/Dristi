import React, { useState, useEffect } from 'react';
import { Download, AlertTriangle, Clock, CheckCircle, Search, Users, MapPin, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import StatCard from './StatCard';
import LoadingSpinner from '../LoadingSpinner';
import { useData } from '../../contexts/useData';
import { useWebSocket } from '../../contexts/useWebSocket';

const SOSHits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('today');
  const [refreshing, setRefreshing] = useState(false);

  // Get data from contexts
  const { 
    sosAlerts, 
    refreshData, 
    updateSOSAlert,
    globalLoading,
    errors 
  } = useData();
  
  const { 
    wsConnected, 
    alerts: wsAlerts, 
    liveUpdates 
  } = useWebSocket();

  // Refresh SOS data on component mount
  useEffect(() => {
    refreshData(['sosAlerts']);
  }, [refreshData]);

  // Handle manual refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData(['sosAlerts']);
    setRefreshing(false);
  };

  // Handle SOS alert status update
  const handleStatusUpdate = async (alertId, newStatus) => {
    try {
      await updateSOSAlert(alertId, { status: newStatus });
      // Data will automatically refresh
    } catch (error) {
      console.error('Failed to update SOS alert:', error);
    }
  };

  // Combine API SOS alerts with WebSocket alerts
  const allSOSAlerts = [
    ...sosAlerts.recent || [],
    ...wsAlerts.filter(alert => alert.type === 'SOS').map(wsAlert => ({
      id: `ws-${wsAlert.timestamp}`,
      touristId: wsAlert.aadhaar_number || 'Unknown',
      name: wsAlert.name || 'Unknown Tourist',
      avatar: wsAlert.name ? wsAlert.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'UT',
      location: wsAlert.location_name || 'Unknown Location',
      alertTime: new Date(wsAlert.timestamp).toLocaleTimeString(),
      status: 'pending',
      severity: 'high',
      coordinates: `${wsAlert.latitude}°N, ${wsAlert.longitude}°E`,
      isRealTime: true
    }))
  ];

  // Calculate dynamic stats from real data
  const stats = [
    {
      title: 'Total SOS Alerts',
      value: globalLoading ? '...' : allSOSAlerts.length.toString(),
      icon: AlertTriangle,
      color: 'red',
      subtitle: 'All time'
    },
    {
      title: 'Pending Response',
      value: globalLoading ? '...' : allSOSAlerts.filter(alert => alert.status === 'pending').length.toString(),
      icon: Clock,
      color: 'yellow',
      subtitle: 'Requires attention'
    },
    {
      title: 'Resolved Cases',
      value: globalLoading ? '...' : allSOSAlerts.filter(alert => alert.status === 'resolved').length.toString(),
      icon: CheckCircle,
      color: 'green',
      subtitle: 'Successfully handled'
    }
  ];

  // Fallback SOS alerts for when API data is not available
  const fallbackSOSAlerts = [
    {
      id: 1,
      touristId: 'TG001234',
      name: 'John Smith',
      avatar: 'JS',
      location: 'Mount Everest Base Camp',
      alertTime: '2 mins ago',
      status: 'pending',
      severity: 'high',
      coordinates: '27.9881°N, 86.9250°E'
    },
    {
      id: 2,
      touristId: 'TG001235',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      location: 'Tiger Reserve Zone B',
      alertTime: '15 mins ago',
      status: 'responded',
      severity: 'medium',
      coordinates: '28.7041°N, 77.1025°E'
    },
    {
      id: 3,
      touristId: 'TG001236',
      name: 'Mike Chen',
      avatar: 'MC',
      location: 'Restricted Valley Area',
      alertTime: '1 hour ago',
      status: 'resolved',
      severity: 'low',
      coordinates: '28.3949°N, 84.1240°E'
    },
    {
      id: 4,
      touristId: 'TG001237',
      name: 'Emma Davis',
      avatar: 'ED',
      location: 'Northern Trek Route',
      alertTime: '2 hours ago',
      status: 'pending',
      severity: 'high',
      coordinates: '28.2380°N, 83.9956°E'
    },
    {
      id: 5,
      touristId: 'TG001238',
      name: 'Alex Kumar',
      avatar: 'AK',
      location: 'Wildlife Sanctuary',
      alertTime: '3 hours ago',
      status: 'responded',
      severity: 'medium',
      coordinates: '27.7172°N, 85.3240°E'
    }
  ];

  // Use API data if available, otherwise fallback data
  const displayAlerts = allSOSAlerts.length > 0 ? allSOSAlerts : fallbackSOSAlerts;

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium',
      responded: 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium',
      resolved: 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium'
    };
    return styles[status] || styles.pending;
  };

  const getSeverityBadge = (severity) => {
    const styles = {
      high: 'bg-red-500 text-white px-2 py-1 rounded text-xs font-medium',
      medium: 'bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium',
      low: 'bg-green-500 text-white px-2 py-1 rounded text-xs font-medium'
    };
    return styles[severity] || styles.medium;
  };

  const filteredAlerts = displayAlerts.filter(alert => {
    const matchesSearch = alert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.touristId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            SOS Alerts
            {wsConnected ? (
              <Wifi className="inline-block w-5 h-5 text-green-500 ml-2" title="WebSocket Connected" />
            ) : (
              <WifiOff className="inline-block w-5 h-5 text-red-500 ml-2" title="WebSocket Disconnected" />
            )}
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Monitor and respond to emergency alerts from tourists.
            {allSOSAlerts.some(alert => alert.isRealTime) && (
              <span className="text-green-600 font-medium ml-2">
                ({allSOSAlerts.filter(alert => alert.isRealTime).length} real-time)
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
            onClick={() => {
              const dataStr = JSON.stringify(filteredAlerts, null, 2);
              const blob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `sos-alerts-${new Date().toISOString().slice(0,10)}.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm disabled:opacity-50"
            onClick={handleRefresh}
            disabled={refreshing || globalLoading}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing || globalLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">
              {refreshing || globalLoading ? 'Refreshing...' : 'Refresh'}
            </span>
            <span className="sm:hidden">
              {refreshing || globalLoading ? 'Loading...' : 'Refresh'}
            </span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* SOS Alerts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Emergency Alerts</h2>
          </div>

          {/* Tabs and Filters */}
          <div className="flex flex-col gap-4">
            <div className="flex overflow-x-auto border-b border-gray-200">
              <button
                onClick={() => setActiveTab('today')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'today'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Today
              </button>
              <button
                onClick={() => setActiveTab('week')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'week'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                This Week
              </button>
              <button
                onClick={() => setActiveTab('month')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'month'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                This Month
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="responded">Responded</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tourist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alert Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {alert.avatar}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{alert.name}</div>
                          <div className="text-sm text-gray-500">{alert.touristId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <div className="text-sm text-gray-900">{alert.location}</div>
                          <div className="text-xs text-gray-500">{alert.coordinates}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {alert.alertTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getSeverityBadge(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(alert.status)}>
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors"
                          onClick={() => {
                            // Open location in new tab
                            const [lat, lng] = alert.coordinates.split(',').map(coord => 
                              parseFloat(coord.replace(/[^\d.-]/g, ''))
                            );
                            window.open(`https://www.google.com/maps/@${lat},${lng},15z`, '_blank');
                          }}
                        >
                          View
                        </button>
                        {alert.status === 'pending' && (
                          <button 
                            className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded transition-colors"
                            onClick={() => handleStatusUpdate(alert.id, 'responded')}
                          >
                            Respond
                          </button>
                        )}
                        {alert.status === 'responded' && (
                          <button 
                            className="text-purple-600 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded transition-colors"
                            onClick={() => handleStatusUpdate(alert.id, 'resolved')}
                          >
                            Resolve
                          </button>
                        )}
                        {alert.isRealTime && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            🔴 LIVE
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4 p-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {alert.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{alert.name}</div>
                      <div className="text-xs text-gray-500">{alert.touristId}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={getSeverityBadge(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className={getStatusBadge(alert.status)}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900">{alert.location}</div>
                      <div className="text-xs text-gray-500 truncate">{alert.coordinates}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">{alert.alertTime}</div>
                    <div className="flex gap-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors text-sm"
                        onClick={() => {
                          // Open location in new tab
                          const [lat, lng] = alert.coordinates.split(',').map(coord => 
                            parseFloat(coord.replace(/[^\d.-]/g, ''))
                          );
                          window.open(`https://www.google.com/maps/@${lat},${lng},15z`, '_blank');
                        }}
                      >
                        View
                      </button>
                      {alert.status === 'pending' && (
                        <button 
                          className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded transition-colors text-sm"
                          onClick={() => handleStatusUpdate(alert.id, 'responded')}
                        >
                          Respond
                        </button>
                      )}
                      {alert.status === 'responded' && (
                        <button 
                          className="text-purple-600 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded transition-colors text-sm"
                          onClick={() => handleStatusUpdate(alert.id, 'resolved')}
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAlerts.length}</span> of{' '}
              <span className="font-medium">{displayAlerts.length}</span> results
              {globalLoading && <LoadingSpinner />}
            </div>
            <div className="flex justify-center sm:justify-end gap-1 overflow-x-auto">
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 whitespace-nowrap">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded whitespace-nowrap">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 whitespace-nowrap">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 whitespace-nowrap">
                3
              </button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 whitespace-nowrap">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSHits;
