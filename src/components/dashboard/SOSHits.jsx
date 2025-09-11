import React, { useState } from 'react';
import { Download, AlertTriangle, Clock, CheckCircle, Search, Users, MapPin } from 'lucide-react';
import StatCard from './StatCard';

const SOSHits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('today');

  const stats = [
    {
      title: 'Total SOS Alerts',
      value: '124',
      icon: AlertTriangle,
      color: 'red',
      subtitle: 'Last 30 days'
    },
    {
      title: 'Pending Response',
      value: '23',
      icon: Clock,
      color: 'yellow',
      subtitle: 'Requires attention'
    },
    {
      title: 'Resolved Cases',
      value: '101',
      icon: CheckCircle,
      color: 'green',
      subtitle: 'Successfully handled'
    }
  ];

  const sosAlerts = [
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

  const filteredAlerts = sosAlerts.filter(alert => {
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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">SOS Alerts</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Monitor and respond to emergency alerts from tourists.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span className="hidden sm:inline">Enable Alerts</span>
            <span className="sm:hidden">Alerts</span>
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
                        <button className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors">
                          View
                        </button>
                        {alert.status === 'pending' && (
                          <button className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded transition-colors">
                            Respond
                          </button>
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
                      <button className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors text-sm">
                        View
                      </button>
                      {alert.status === 'pending' && (
                        <button className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded transition-colors text-sm">
                          Respond
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
              <span className="font-medium">{sosAlerts.length}</span> results
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
