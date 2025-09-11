import React, { useState } from 'react';
import { Download, RefreshCw, Calendar, Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with React
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Heatmap = () => {
  const [dateRange, setDateRange] = useState('');
  const [touristId, setTouristId] = useState('');
  const [region, setRegion] = useState('all');
  const [activityType, setActivityType] = useState('all');

  // Sample tourist location data with heatmap intensity
  const touristData = [
    { position: [28.7041, 77.1025], label: 'Wildlife Sanctuary', count: 45, region: 'forest' },
    { position: [27.9881, 86.9250], label: 'Mountain Base Camp', count: 67, region: 'mountain' },
    { position: [28.3949, 84.1240], label: 'Heritage Temple Area', count: 23, region: 'urban' },
    { position: [28.2380, 83.9956], label: 'Trekking Route B4', count: 34, region: 'mountain' },
    { position: [28.6139, 77.2090], label: 'City Center', count: 89, region: 'urban' },
    { position: [27.7172, 85.3240], label: 'Valley View Point', count: 56, region: 'mountain' },
  ];

  // Filter data based on selected region
  const filteredData = region === 'all' 
    ? touristData 
    : touristData.filter(item => item.region === region);

  // Generate heat circles based on tourist count
  const getHeatColor = (count) => {
    if (count > 60) return '#ff0000'; // Red for high density
    if (count > 40) return '#ff7f00'; // Orange for medium-high
    if (count > 20) return '#ffff00'; // Yellow for medium
    return '#00ff00'; // Green for low density
  };

  const getHeatRadius = (count) => {
    return Math.max(count * 100, 1000); // Base radius with scaling
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tourist Heatmap</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Real-time visualization of tourist distribution and activity zones.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Data</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh Map</span>
            <span className="sm:hidden">Refresh</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Live Heatmap</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
              <MapContainer 
                center={[28.2, 84.5]} 
                zoom={7} 
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Tourist markers with heatmap-style circles */}
                {filteredData.map((tourist, index) => (
                  <React.Fragment key={index}>
                    {/* Heat circle */}
                    <Circle
                      center={tourist.position}
                      radius={getHeatRadius(tourist.count)}
                      pathOptions={{
                        color: getHeatColor(tourist.count),
                        fillColor: getHeatColor(tourist.count),
                        fillOpacity: 0.3,
                        opacity: 0.6
                      }}
                    />
                    {/* Marker */}
                    <Marker position={tourist.position}>
                      <Popup>
                        <div className="text-center">
                          <h4 className="font-semibold">{tourist.label}</h4>
                          <p className="text-sm text-gray-600">Tourists: {tourist.count}</p>
                          <p className="text-xs text-gray-500">Region: {tourist.region}</p>
                        </div>
                      </Popup>
                    </Marker>
                  </React.Fragment>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-4 sm:space-y-6">
          {/* Active Tourists */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Active Tourists</h3>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">2,847</div>
              <p className="text-xs sm:text-sm text-gray-500">Currently tracked</p>
            </div>
          </div>

          {/* Busiest Region */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Busiest Region</h3>
            <div>
              <div className="text-lg sm:text-xl font-bold text-green-600 mb-1">Mountain Zone</div>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">847 tourists present</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>

          {/* Tourist Density Legend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Tourist Density</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-xs sm:text-sm text-gray-700">High</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">50+ tourists</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-xs sm:text-sm text-gray-700">Medium</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">20-49 tourists</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-xs sm:text-sm text-gray-700">Low</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">1-19 tourists</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Peak Hour</span>
                <span className="text-xs sm:text-sm font-medium text-gray-900">2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Most Visited</span>
                <span className="text-xs sm:text-sm font-medium text-gray-900">Viewpoint A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Avg. Stay Time</span>
                <span className="text-xs sm:text-sm font-medium text-gray-900">4.5 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Satisfaction Rate</span>
                <span className="text-xs sm:text-sm font-medium text-green-600">94%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;