import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, Calendar, Search, Wifi, WifiOff } from 'lucide-react';
import { MapContainer, TileLayer, Circle, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocationStatus from './LocationStatus';
import LoadingSpinner from '../LoadingSpinner';
import { useLocation } from '../../contexts/useLocation';
import { useData } from '../../contexts/useData';
import { useWebSocket } from '../../contexts/useWebSocket';

const Heatmap = () => {
  const [dateRange, setDateRange] = useState('24h');
  const [touristId, setTouristId] = useState('');
  const [region, setRegion] = useState('all');
  const [activityType, setActivityType] = useState('all');
  const [currentZoom, setCurrentZoom] = useState(7);
  const [mapCenter, setMapCenter] = useState([26.2006, 92.9376]); // Default to Guwahati
  const [refreshing, setRefreshing] = useState(false);
  
  const { adminLocation } = useLocation() || {};
  
  // Safely get context values with fallbacks
  let heatmapData, fetchHeatmapData, globalLoading;
  try {
    const dataContext = useData();
    heatmapData = dataContext?.heatmapData || { data: [], loading: false };
    fetchHeatmapData = dataContext?.fetchHeatmapData;
    globalLoading = dataContext?.globalLoading || false;
  } catch (error) {
    console.warn('DataContext not available:', error);
    heatmapData = { data: [], loading: false };
    fetchHeatmapData = null;
    globalLoading = false;
  }
  
  let wsConnected, touristLocations;
  try {
    const wsContext = useWebSocket();
    wsConnected = wsContext?.wsConnected || false;
    touristLocations = wsContext?.touristLocations || new Map();
  } catch (error) {
    console.warn('WebSocketContext not available:', error);
    wsConnected = false;
    touristLocations = new Map();
  }

  // Debug logging
  console.log('Heatmap Debug:', { heatmapData, globalLoading, wsConnected, touristLocations });

  // Update map center when admin location is available
  useEffect(() => {
    if (adminLocation) {
      setMapCenter([adminLocation.lat, adminLocation.lng]);
      setCurrentZoom(10); // Zoom in when we have admin location
    }
  }, [adminLocation]);

  // Fetch heatmap data on component mount and when filters change
  useEffect(() => {
    const fetchData = async () => {
      if (fetchHeatmapData) {
        setRefreshing(true);
        await fetchHeatmapData({
          timeRange: dateRange,
          region: region === 'all' ? undefined : region,
          activityType: activityType === 'all' ? undefined : activityType,
          touristId: touristId || undefined
        });
        setRefreshing(false);
      }
    };
    
    fetchData();
  }, [dateRange, region, activityType, touristId, fetchHeatmapData]);

  // Handle manual refresh
  const handleRefresh = async () => {
    if (fetchHeatmapData) {
      setRefreshing(true);
      await fetchHeatmapData({
        timeRange: dateRange,
        region: region === 'all' ? undefined : region,
        activityType: activityType === 'all' ? undefined : activityType,
        touristId: touristId || undefined
      });
      setRefreshing(false);
    }
  };

  // Component to handle map zoom events
  const ZoomHandler = () => {
    const map = useMapEvents({
      zoomend: () => {
        setCurrentZoom(map.getZoom());
      },
    });
    return null;
  };

  // Sample tourist location data with heatmap intensity (fallback for when API data is not available)
  const fallbackTouristData = [
    { position: [28.7041, 77.1025], label: 'Wildlife Sanctuary', count: 85, region: 'forest' },
    { position: [27.9881, 86.9250], label: 'Mountain Base Camp', count: 120, region: 'mountain' },
    { position: [28.3949, 84.1240], label: 'Heritage Temple Area', count: 45, region: 'urban' },
    { position: [28.2380, 83.9956], label: 'Trekking Route B4', count: 67, region: 'mountain' },
    { position: [28.6139, 77.2090], label: 'City Center', count: 150, region: 'urban' },
    { position: [27.7172, 85.3240], label: 'Valley View Point', count: 95, region: 'mountain' },
    { position: [28.5, 84.8], label: 'Lake District', count: 78, region: 'forest' },
    { position: [27.8, 85.1], label: 'Adventure Zone', count: 110, region: 'mountain' },
    { position: [28.1, 83.7], label: 'Cultural Site', count: 56, region: 'urban' },
    { position: [28.4, 85.2], label: 'National Park', count: 89, region: 'forest' },
    { position: [27.6, 84.9], label: 'Scenic Overlook', count: 42, region: 'mountain' },
    { position: [28.8, 77.3], label: 'Historic Village', count: 35, region: 'urban' },
    { position: [28.65, 77.15], label: 'Museum District', count: 72, region: 'urban' },
    { position: [27.85, 85.05], label: 'Waterfall Trail', count: 63, region: 'mountain' },
    { position: [28.55, 84.75], label: 'Forest Lodge', count: 48, region: 'forest' },
    { position: [28.25, 84.05], label: 'Ancient Ruins', count: 91, region: 'urban' },
  ];

  // Combine API heatmap data with real-time WebSocket locations
  const currentTouristData = (heatmapData && heatmapData.data && Array.isArray(heatmapData.data) && heatmapData.data.length > 0) 
    ? heatmapData.data 
    : fallbackTouristData;
  
  // Add real-time WebSocket locations to heatmap data  
  const liveLocationData = (touristLocations && typeof touristLocations.values === 'function')
    ? Array.from(touristLocations.values()).map(location => ({
        position: [location.lat, location.lng],
        label: location.location_name || 'Live Location',
        count: 1, // Live locations have base intensity
        region: 'live', // Special category for live locations
        isLive: true
      }))
    : [];

  // Filter data based on selected region
  const filteredData = region === 'all' 
    ? [...currentTouristData, ...liveLocationData]
    : [
        ...currentTouristData.filter(item => item.region === region),
        ...(region === 'live' ? liveLocationData : [])
      ];

  // Generate heat circles based on tourist count with proper heatmap colors
  const getHeatColor = (count, isLive = false) => {
    if (isLive) return '#00FF00'; // Bright green for live locations
    if (count >= 120) return '#8B0000'; // Dark red for very high density
    if (count >= 100) return '#DC143C'; // Crimson for high density
    if (count >= 80) return '#FF4500';  // Orange red for medium-high
    if (count >= 60) return '#FF6347';  // Tomato for medium
    if (count >= 40) return '#FFA500';  // Orange for medium-low
    if (count >= 20) return '#FFD700';  // Gold for low
    return '#ADFF2F'; // Green yellow for very low density
  };

  const getHeatIntensity = (count, zoom = currentZoom) => {
    // Base intensity based on count
    let baseIntensity;
    if (count >= 120) baseIntensity = 0.8;
    else if (count >= 100) baseIntensity = 0.7;
    else if (count >= 80) baseIntensity = 0.6;
    else if (count >= 60) baseIntensity = 0.5;
    else if (count >= 40) baseIntensity = 0.4;
    else if (count >= 20) baseIntensity = 0.3;
    else baseIntensity = 0.2;
    
    // Adjust intensity based on zoom - higher zoom = slightly higher intensity for better visibility
    const zoomAdjustment = zoom > 10 ? 1.2 : zoom < 5 ? 0.8 : 1.0;
    
    return Math.min(0.85, baseIntensity * zoomAdjustment);
  };

  const getHeatRadius = (count, zoom = currentZoom) => {
    // Zoom-aware radius calculation for better heatmap visualization
    // The formula ensures circles are appropriately sized for each zoom level
    
    // Base size calculation based on tourist count
    const countMultiplier = Math.sqrt(count) * 200;
    
    // Zoom-based scaling - circles get smaller as you zoom in for better detail
    // At zoom 7 (default), circles maintain base size
    // At lower zooms (3-6), circles get progressively larger
    // At higher zooms (8-15), circles get progressively smaller
    const zoomScale = Math.pow(2, 7 - zoom) * 1200;
    
    // Combine both factors with minimum size constraints
    const calculatedRadius = countMultiplier + zoomScale;
    
    // Ensure minimum and maximum bounds for visibility
    const minRadius = zoom > 10 ? 200 : 500;
    const maxRadius = zoom < 5 ? 15000 : 8000;
    
    return Math.max(minRadius, Math.min(maxRadius, calculatedRadius));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Tourist Heatmap
            {wsConnected ? (
              <Wifi className="inline-block w-5 h-5 text-green-500 ml-2" title="WebSocket Connected" />
            ) : (
              <WifiOff className="inline-block w-5 h-5 text-red-500 ml-2" title="WebSocket Disconnected" />
            )}
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Real-time visualization of tourist distribution and activity zones.
            {liveLocationData.length > 0 && (
              <span className="text-green-600 font-medium ml-2">
                ({liveLocationData.length} live locations)
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
            onClick={() => {
              // Export heatmap data
              const dataStr = JSON.stringify(filteredData, null, 2);
              const blob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `heatmap-data-${new Date().toISOString().slice(0,10)}.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Data</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button 
            onClick={handleRefresh}
            disabled={refreshing || globalLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{refreshing ? 'Refreshing...' : 'Refresh Map'}</span>
            <span className="sm:hidden">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Location Status */}
      <LocationStatus />

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1h">Last Hour</option>
                <option value="6h">Last 6 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
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
              <option value="live">Live Locations</option>
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
            {globalLoading ? (
              <div className="h-64 sm:h-80 lg:h-96 flex items-center justify-center bg-gray-50 rounded-lg">
                <LoadingSpinner />
                <span className="ml-2 text-gray-600">Loading heatmap data...</span>
              </div>
            ) : (
              <div className="h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
                <MapContainer 
                  center={mapCenter} 
                  zoom={currentZoom} 
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <ZoomHandler />
                  
                  {/* Debug info in console */}
                  {console.log('Rendering heatmap with data:', filteredData)}
                  
                  {/* Heatmap circles */}
                  {filteredData && filteredData.length > 0 ? (
                    filteredData.map((tourist, index) => (
                      <Circle
                        key={`${index}-${currentZoom}-${tourist.isLive ? 'live' : 'static'}`}
                        center={tourist.position}
                        radius={getHeatRadius(tourist.count || 1)}
                        pathOptions={{
                          color: getHeatColor(tourist.count || 1, tourist.isLive),
                          fillColor: getHeatColor(tourist.count || 1, tourist.isLive),
                          fillOpacity: getHeatIntensity(tourist.count || 1),
                          opacity: tourist.isLive ? 1 : (currentZoom > 10 ? 0.9 : 0.7),
                          weight: tourist.isLive ? 3 : Math.max(1, Math.min(3, 4 - currentZoom * 0.2))
                        }}
                      >
                        <Popup>
                          <div className="text-sm">
                            <strong>{tourist.label}</strong><br />
                            {tourist.isLive ? (
                              <span className="text-green-600 font-medium">🔴 Live Location</span>
                            ) : (
                              <span>Visitors: {tourist.count}</span>
                            )}
                          </div>
                        </Popup>
                      </Circle>
                    ))
                  ) : (
                    <div></div>
                  )}
                </MapContainer>
              </div>
            )}
          </div>

          {/* Statistics Footer */}
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg sm:text-xl font-semibold text-blue-600">{filteredData.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-semibold text-green-600">{liveLocationData.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Live Locations</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-semibold text-purple-600">{currentZoom}</div>
                <div className="text-xs sm:text-sm text-gray-600">Current Zoom</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <span className="text-lg sm:text-xl font-semibold text-green-600">94%</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Data Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-4 sm:space-y-6">
          {/* Active Tourists */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Active Tourists</h3>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                {filteredData.length}
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Currently tracked</p>
            </div>
          </div>

          {/* Busiest Region */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Busiest Region</h3>
            <div>
              <div className="text-lg sm:text-xl font-bold text-red-600 mb-1">City Center</div>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">150 tourists present</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>

          {/* Tourist Density Legend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Density Legend</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8B0000' }}></div>
                  <span className="text-xs sm:text-sm text-gray-700">Very High</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">120+ tourists</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#DC143C' }}></div>
                  <span className="text-xs sm:text-sm text-gray-700">High</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">100-119 tourists</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FF6347' }}></div>
                  <span className="text-xs sm:text-sm text-gray-700">Medium</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">60-99 tourists</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFA500' }}></div>
                  <span className="text-xs sm:text-sm text-gray-700">Low</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">20-59 tourists</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ADFF2F' }}></div>
                  <span className="text-xs sm:text-sm text-gray-700">Very Low</span>
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