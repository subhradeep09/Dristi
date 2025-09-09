import React, { useState } from 'react';
import { Download, RefreshCw, Calendar, Search } from 'lucide-react';

const Heatmap = () => {
  const [dateRange, setDateRange] = useState('');
  const [touristId, setTouristId] = useState('');
  const [region, setRegion] = useState('all');
  const [activityType, setActivityType] = useState('all');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tourist Heatmap</h1>
          <p className="text-gray-600 mt-1">Real-time visualization of tourist distribution and activity zones.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh Map
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tourist ID</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by ID..."
                value={touristId}
                onChange={(e) => setTouristId(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Regions</option>
              <option value="mountain">Mountain Zone</option>
              <option value="forest">Forest Area</option>
              <option value="coastal">Coastal Region</option>
              <option value="urban">Urban Areas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Activities</option>
              <option value="hiking">Hiking</option>
              <option value="camping">Camping</option>
              <option value="sightseeing">Sightseeing</option>
              <option value="adventure">Adventure Sports</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Live Heatmap</h2>
          </div>
          <div className="p-6">
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center relative">
              {/* Map Placeholder */}
              <div className="text-center text-gray-500">
                <div className="w-20 h-20 mx-auto mb-4 text-6xl">
                  🗺️
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Heatmap will render here</h3>
                <p className="text-sm text-gray-500">Integration with mapping service pending</p>
              </div>
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 shadow-sm">
                  <span className="text-lg font-bold text-gray-600">+</span>
                </button>
                <button className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 shadow-sm">
                  <span className="text-lg font-bold text-gray-600">−</span>
                </button>
                <button className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 shadow-sm">
                  🎯
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Active Tourists */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Tourists</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">2,847</div>
              <p className="text-sm text-gray-500">Currently tracked</p>
            </div>
          </div>

          {/* Busiest Region */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Busiest Region</h3>
            <div>
              <div className="text-xl font-bold text-green-600 mb-1">Mountain Zone</div>
              <p className="text-sm text-gray-500 mb-2">847 tourists present</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>

          {/* Tourist Density Legend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tourist Density</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700">High</span>
                </div>
                <span className="text-sm text-gray-500">50+ tourists</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm text-gray-700">Medium</span>
                </div>
                <span className="text-sm text-gray-500">20-49 tourists</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-700">Low</span>
                </div>
                <span className="text-sm text-gray-500">1-19 tourists</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Peak Hour</span>
                <span className="text-sm font-medium text-gray-900">2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Most Visited</span>
                <span className="text-sm font-medium text-gray-900">Viewpoint A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Stay Time</span>
                <span className="text-sm font-medium text-gray-900">4.5 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Satisfaction Rate</span>
                <span className="text-sm font-medium text-green-600">94%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;