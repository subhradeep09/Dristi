import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MapPin, Shield, AlertTriangle } from 'lucide-react';

const GeoFencing = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const zones = [
    {
      id: 1,
      name: 'Wildlife Sanctuary',
      type: 'Restricted',
      status: 'Active',
      created: '2025-08-15',
      violations: 12,
      coordinates: '28.7041°N, 77.1025°E',
      description: 'Protected wildlife area with strict access control'
    },
    {
      id: 2,
      name: 'Mountain Base Camp',
      type: 'Caution',
      status: 'Active',
      created: '2025-08-20',
      violations: 5,
      coordinates: '27.9881°N, 86.9250°E',
      description: 'High altitude camping zone requiring permits'
    },
    {
      id: 3,
      name: 'Heritage Temple Area',
      type: 'Restricted',
      status: 'Active',
      created: '2025-09-01',
      violations: 8,
      coordinates: '28.3949°N, 84.1240°E',
      description: 'Archaeological site with limited visitor access'
    },
    {
      id: 4,
      name: 'Trekking Route B4',
      type: 'Caution',
      status: 'Active',
      created: '2025-09-05',
      violations: 3,
      coordinates: '28.2380°N, 83.9956°E',
      description: 'Challenging trek route requiring experience'
    }
  ];

  const recentViolations = [
    {
      id: 1,
      tourist: 'John D.',
      zone: 'Wildlife Sanctuary',
      time: '5 mins ago',
      status: 'Active'
    },
    {
      id: 2,
      tourist: 'Sarah K.',
      zone: 'Heritage Temple Area',
      time: '15 mins ago',
      status: 'Resolved'
    },
    {
      id: 3,
      tourist: 'Mike R.',
      zone: 'Mountain Base Camp',
      time: '25 mins ago',
      status: 'Active'
    }
  ];

  const getZoneTypeBadge = (type) => {
    return type === 'Restricted' 
      ? 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium';
  };

  const getStatusBadge = (status) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
  };

  const getViolationStatusBadge = (status) => {
    return status === 'Active' 
      ? 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
  };

  const filteredZones = zones.filter(zone =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Geo-Fencing Zones</h1>
          <p className="text-gray-600 mt-1">Manage and monitor restricted areas and tourist movement boundaries.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Add Zone
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Zone Management</h2>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center relative">
              {/* Map Placeholder */}
              <div className="text-center text-gray-500">
                <div className="w-20 h-20 mx-auto mb-4 text-6xl">
                  🗺️
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Map goes here</h3>
                <p className="text-sm text-gray-500">Integration with mapping service pending</p>
              </div>
              
              {/* Zone Types Legend */}
              <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-sm border">
                <h4 className="font-medium text-gray-900 mb-2">Zone Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Restricted Zone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Caution Zone</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search zones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Recent Violations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Recent Violations</h3>
            </div>
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {recentViolations.map((violation) => (
                <div key={violation.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{violation.tourist}</p>
                    <p className="text-xs text-gray-500">{violation.zone}</p>
                    <p className="text-xs text-gray-400">{violation.time}</p>
                  </div>
                  <span className={getViolationStatusBadge(violation.status)}>
                    {violation.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Zones Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Zones</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">ZONE NAME</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">TYPE</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">STATUS</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">VIOLATIONS</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">CREATED</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredZones.map((zone) => (
                <tr key={zone.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{zone.name}</p>
                      <p className="text-sm text-gray-500">{zone.coordinates}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={getZoneTypeBadge(zone.type)}>
                      {zone.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={getStatusBadge(zone.status)}>
                      {zone.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-red-600 font-medium">{zone.violations}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{zone.created}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm hover:bg-blue-200">
                        Edit
                      </button>
                      <button className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm hover:bg-red-200">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GeoFencing;