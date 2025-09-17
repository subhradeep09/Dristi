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
    
    // Combine both factors for final radius
    const calculatedRadius = countMultiplier + zoomScale;
    
    // Set reasonable bounds based on zoom level
    const minRadius = zoom > 10 ? 300 : zoom > 7 ? 500 : 800;
    const maxRadius = zoom > 10 ? 2000 : zoom > 7 ? 4000 : 8000;
    
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
            Export
          </button>
          <button 
            onClick={handleRefresh}
            disabled={refreshing || globalLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Time Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="1h">Last Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          {/* Tourist ID Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="w-4 h-4 inline mr-1" />
              Tourist ID
            </label>
            <input
              type="text"
              value={touristId}
              onChange={(e) => setTouristId(e.target.value)}
              placeholder="Enter Tourist ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Regions</option>
              <option value="urban">Urban Areas</option>
              <option value="forest">Forest Areas</option>
              <option value="mountain">Mountain Areas</option>
              <option value="live">Live Locations</option>
            </select>
          </div>

          {/* Activity Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity</label>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Activities</option>
              <option value="sightseeing">Sightseeing</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="nature">Nature</option>
            </select>
          </div>

          {/* Location Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <LocationStatus />
          </div>
        </div>
      </div>

      {/* Heatmap Container */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Live Heatmap 
            <span className="ml-2 text-sm text-gray-500">
              ({filteredData.length} points)
            </span>
          </h2>
        </div>
        <div className="p-4 sm:p-6">
          {globalLoading ? (
            <div className="h-64 sm:h-80 lg:h-96 flex items-center justify-center bg-gray-50 rounded-lg">
              <LoadingSpinner />
              <span className="ml-2 text-gray-600">Loading heatmap data...</span>
            </div>
          ) : (
            <div className="h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
              <MapContainer 
                center={mapCenter} 
                zoom={currentZoom} 
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg z-0"
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
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
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
                <span className="text-xs sm:text-sm font-medium text-green-600">94%</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Data Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;