import React from 'react';
import { Users, UserCheck, Users2, AlertTriangle, MapPin, TrendingUp, Settings, Eye, Radio, Clock, MessageSquare } from 'lucide-react';
import { useBroadcast } from '../../contexts/BroadcastContext';
import StatCard from './StatCard';

const Dashboard = () => {
  const { broadcastHistory } = useBroadcast();
  // Sample data
  const stats = [
    {
      title: 'Total Registered',
      value: '12,847',
      icon: Users,
      color: 'blue',
      subtitle: '+234 this week',
      trend: { type: 'up', value: '12%' }
    },
    {
      title: 'Active Today',
      value: '2,341',
      icon: UserCheck,
      color: 'green',
      subtitle: '+15% from yesterday',
      trend: { type: 'up', value: '15%' }
    },
    {
      title: 'Currently Online',
      value: '847',
      icon: Users2,
      color: 'purple',
      subtitle: 'Real-time count'
    },
    {
      title: 'SOS Alerts',
      value: '23',
      icon: AlertTriangle,
      color: 'red',
      subtitle: 'Last 24 hours',
      trend: { type: 'down', value: '8%' }
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      name: 'John Smith',
      location: 'Mount Everest Base',
      time: '2 mins ago',
      status: 'pending',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      location: 'Tiger Reserve Zone',
      time: '15 mins ago',
      status: 'responded',
      avatar: 'SJ'
    },
    {
      id: 3,
      name: 'Mike Chen',
      location: 'Border Area 7',
      time: '1 hour ago',
      status: 'resolved',
      avatar: 'MC'
    },
    {
      id: 4,
      name: 'Emma Davis',
      location: 'Restricted Valley',
      time: '2 hours ago',
      status: 'pending',
      avatar: 'ED'
    },
    {
      id: 5,
      name: 'Alex Kumar',
      location: 'Wildlife Sanctuary',
      time: '3 hours ago',
      status: 'resolved',
      avatar: 'AK'
    }
  ];

  const quickActions = [
    { 
      label: 'View Heatmap', 
      icon: MapPin, 
      color: 'blue',
      description: 'Real-time tourist distribution'
    },
    { 
      label: 'SOS Alerts', 
      icon: AlertTriangle, 
      color: 'red',
      description: 'Emergency response center'
    },
    { 
      label: 'Tourist Activity', 
      icon: Users, 
      color: 'green',
      description: 'Monitor active tourists'
    },
    { 
      label: 'Geo-Fencing', 
      icon: MapPin, 
      color: 'purple',
      description: 'Manage restricted zones'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium',
      responded: 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium',
      resolved: 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
    };
    return styles[status] || styles.pending;
  };

  const getNotificationIcon = (priority) => {
    const styles = {
      high: 'text-red-500 bg-red-50',
      medium: 'text-yellow-500 bg-yellow-50',
      low: 'text-blue-500 bg-blue-50'
    };
    return styles[priority] || styles.low;
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            subtitle={stat.subtitle}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent SOS Alerts */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent SOS Alerts</h2>
              <span className="text-sm text-gray-500">Last 24 hours</span>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {alert.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{alert.name}</p>
                      <p className="text-sm text-gray-500">{alert.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={getStatusBadge(alert.status)}>{alert.status}</span>
                    <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Broadcast History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Broadcast History</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {broadcastHistory.map((broadcast) => {
              const Icon = broadcast.icon;
              return (
                <div key={broadcast.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`p-2 rounded-lg ${getNotificationIcon(broadcast.priority)} flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{broadcast.title}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                        broadcast.priority === 'high' ? 'bg-red-100 text-red-800' :
                        broadcast.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {broadcast.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{broadcast.message}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{broadcast.time}</p>
                      <p className="text-xs text-gray-500">
                        {broadcast.recipientsCount.toLocaleString()} recipients
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {broadcastHistory.length > 6 && (
              <div className="text-center pt-3 border-t border-gray-100">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Load More History
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const colorClasses = {
              blue: 'bg-blue-500 hover:bg-blue-600',
              red: 'bg-red-500 hover:bg-red-600',
              green: 'bg-green-500 hover:bg-green-600',
              purple: 'bg-purple-500 hover:bg-purple-600'
            };
            
            return (
              <button
                key={index}
                className={`${colorClasses[action.color]} text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 text-left group`}
              >
                <Icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1">{action.label}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;