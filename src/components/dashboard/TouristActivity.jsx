import React, { useState } from 'react';
import { Download, Users, UserCheck, Users2, Search, Filter, Eye, MapPin, Phone } from 'lucide-react';
import StatCard from './StatCard';

const TouristActivity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const stats = [
    {
      title: 'Total Registered',
      value: '12,847',
      icon: Users,
      color: 'blue',
      subtitle: '+234 this week'
    },
    {
      title: 'Logged In Today',
      value: '2,341',
      icon: UserCheck,
      color: 'green',
      subtitle: '+15% from yesterday'
    },
    {
      title: 'Currently Online',
      value: '847',
      icon: Users2,
      color: 'purple',
      subtitle: 'Real-time count'
    }
  ];

  const tourists = [
    {
      id: 'TG001234',
      name: 'John Smith',
      avatar: 'JS',
      loginTime: '09:24 AM',
      status: 'online',
      location: 'Mount Everest Base',
      digitalId: 'TG001234'
    },
    {
      id: 'TG001235',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      loginTime: '08:45 AM',
      status: 'online',
      location: 'Tiger Reserve Zone',
      digitalId: 'TG001235'
    },
    {
      id: 'TG001236',
      name: 'Mike Chen',
      avatar: 'MC',
      loginTime: '10:12 AM',
      status: 'offline',
      location: 'Border Area 7',
      digitalId: 'TG001236'
    },
    {
      id: 'TG001237',
      name: 'Emma Davis',
      avatar: 'ED',
      loginTime: '07:30 AM',
      status: 'online',
      location: 'Wildlife Sanctuary',
      digitalId: 'TG001237'
    },
    {
      id: 'TG001238',
      name: 'Alex Kumar',
      avatar: 'AK',
      loginTime: '11:05 AM',
      status: 'online',
      location: 'Valley Trek Route',
      digitalId: 'TG001238'
    }
  ];

  const getStatusBadge = (status) => {
    return status === 'online' 
      ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
  };

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.digitalId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tourist.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tourist Activity</h1>
          <p className="text-gray-600 mt-1">Monitor tourist registrations, logins, and real-time activity.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Download className="w-4 h-4" />
          Export Data
        </button>
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

      {/* Activity Trends Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Activity Trends</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg font-medium">7 Days</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 rounded-lg">30 Days</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 rounded-lg">3 Months</button>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
              📊
            </div>
            <p className="text-lg font-medium">Interactive chart showing tourist activity trends</p>
            <p className="text-sm">Registrations and logins over time</p>
          </div>
        </div>
      </div>

      {/* Active Tourists Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Tourists</h2>
          </div>
          
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tourists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">TOURIST</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">DIGITAL ID</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">LOGIN TIME</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">STATUS</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">LAST LOCATION</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTourists.map((tourist) => (
                <tr key={tourist.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {tourist.avatar}
                      </div>
                      <span className="font-medium text-gray-900">{tourist.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{tourist.digitalId}</td>
                  <td className="py-4 px-6 text-gray-600">{tourist.loginTime}</td>
                  <td className="py-4 px-6">
                    <span className={getStatusBadge(tourist.status)}>
                      {tourist.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{tourist.location}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800">
                        <MapPin className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing 1 to 5 of 847 results
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristActivity;