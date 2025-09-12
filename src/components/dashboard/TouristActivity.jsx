import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Download, Users, UserCheck, Users2, Search, Filter, Eye, MapPin, Phone, ZoomIn, ZoomOut, X } from 'lucide-react';
import StatCard from './StatCard';
import LocationStatus from './LocationStatus';
import { useLocation } from '../../contexts/useLocation';

const TouristActivity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { adminLocation } = useLocation();

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

  const tourists = useMemo(() => [
    {
      id: 'TG001234',
      name: 'John Smith',
      avatar: 'JS',
      loginTime: '09:24 AM',
      status: 'online',
      location: 'Tawang, Arunachal Pradesh',
      digitalId: 'TG001234',
      coordinates: { lat: 27.5860, lng: 91.8590 }, // Tawang, Arunachal Pradesh
      phone: '+91-234-567-8901',
      email: 'john.smith@email.com',
      checkInTime: '09:24 AM',
      lastActivity: '2 minutes ago'
    },
    {
      id: 'TG001235',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      loginTime: '08:45 AM',
      status: 'online',
      location: 'Imphal, Manipur',
      digitalId: 'TG001235',
      coordinates: { lat: 24.8170, lng: 93.9368 }, // Imphal, Manipur
      phone: '+91-345-678-9012',
      email: 'sarah.johnson@email.com',
      checkInTime: '08:45 AM',
      lastActivity: '5 minutes ago'
    },
    {
      id: 'TG001236',
      name: 'Mike Chen',
      avatar: 'MC',
      loginTime: '10:12 AM',
      status: 'offline',
      location: 'Shillong, Meghalaya',
      digitalId: 'TG001236',
      coordinates: { lat: 25.5788, lng: 91.8933 }, // Shillong, Meghalaya
      phone: '+91-456-789-0123',
      email: 'mike.chen@email.com',
      checkInTime: '10:12 AM',
      lastActivity: '15 minutes ago'
    },
    {
      id: 'TG001237',
      name: 'Emma Davis',
      avatar: 'ED',
      loginTime: '07:30 AM',
      status: 'online',
      location: 'Kohima, Nagaland',
      digitalId: 'TG001237',
      coordinates: { lat: 25.6751, lng: 94.1086 }, // Kohima, Nagaland
      phone: '+91-567-890-1234',
      email: 'emma.davis@email.com',
      checkInTime: '07:30 AM',
      lastActivity: '1 minute ago'
    },
    {
      id: 'TG001238',
      name: 'Alex Kumar',
      avatar: 'AK',
      loginTime: '11:05 AM',
      status: 'online',
      location: 'Gangtok, Sikkim',
      digitalId: 'TG001238',
      coordinates: { lat: 27.3389, lng: 88.6065 }, // Gangtok, Sikkim
      phone: '+91-678-901-2345',
      email: 'alex.kumar@email.com',
      checkInTime: '11:05 AM',
      lastActivity: '3 minutes ago'
    }
  ], []);

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

  const handleTouristClick = useCallback((tourist) => {
    setSelectedTourist(tourist);
  }, []);

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedTourist(null);
  };

  const handleViewTourist = useCallback((tourist) => {
    setSelectedTourist(tourist);
    setShowDetails(true); // Directly show details
  }, []);

  const handleLocateTourist = useCallback((tourist) => {
    if (mapInstanceRef.current) {
      // Focus on the specific tourist's location
      mapInstanceRef.current.setView([tourist.coordinates.lat, tourist.coordinates.lng], 12);
      
      // Optional: Show a popup for the tourist
      const markers = mapInstanceRef.current._layers;
      Object.values(markers).forEach(layer => {
        if (layer._latlng && 
            Math.abs(layer._latlng.lat - tourist.coordinates.lat) < 0.001 && 
            Math.abs(layer._latlng.lng - tourist.coordinates.lng) < 0.001) {
          layer.openPopup();
        }
      });
    }
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    const loadLeaflet = async () => {
      if (!window.L) {
        // Load Leaflet CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(cssLink);

        // Load Leaflet JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => initializeMap();
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (mapRef.current && !mapInstanceRef.current) {
        // Get initial map center and zoom based on admin location
        let initialCenter, initialZoom;
        
        if (adminLocation) {
          // Use admin location with appropriate zoom level
          initialCenter = [adminLocation.lat, adminLocation.lng];
          initialZoom = 10; // City/region level zoom
        } else {
          // Default to Northeast India region
          initialCenter = [26.2006, 92.9376]; // Guwahati, Assam
          initialZoom = 7;
        }
        
        // Initialize map
        const map = window.L.map(mapRef.current).setView(initialCenter, initialZoom);

        // Add OpenStreetMap tiles
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapInstanceRef.current = map;

        // Add tourist markers
        addTouristMarkers(map);
      }
    };

    const addTouristMarkers = (map) => {
      filteredTourists
        .filter(tourist => tourist.status === 'online')
        .forEach(tourist => {
          // Create custom icon
          const customIcon = window.L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                width: 24px;
                height: 24px;
                background-color: #dc2626;
                border: 2px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                position: relative;
              ">
                <div style="
                  width: 8px;
                  height: 8px;
                  background-color: white;
                  border-radius: 50%;
                "></div>
              </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          // Add marker
          const marker = window.L.marker([tourist.coordinates.lat, tourist.coordinates.lng], {
            icon: customIcon
          }).addTo(map);

          // Add popup
          marker.bindPopup(`
            <div style="font-family: Arial, sans-serif; min-width: 200px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="
                  width: 32px;
                  height: 32px;
                  background-color: #3b82f6;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  font-size: 12px;
                ">${tourist.avatar}</div>
                <div>
                  <div style="font-weight: bold; color: #1f2937;">${tourist.name}</div>
                  <div style="font-size: 12px; color: #6b7280;">${tourist.digitalId}</div>
                </div>
              </div>
              <div style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">
                <strong>Location:</strong> ${tourist.location}
              </div>
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">
                <strong>Last Activity:</strong> ${tourist.lastActivity}
              </div>
              <button 
                onclick="window.showTouristDetails('${tourist.id}')"
                style="
                  background-color: #3b82f6;
                  color: white;
                  border: none;
                  padding: 6px 12px;
                  border-radius: 6px;
                  font-size: 12px;
                  cursor: pointer;
                  width: 100%;
                "
              >View Full Details</button>
            </div>
          `);
        });
    };

    // Global function to show tourist details
    window.showTouristDetails = (touristId) => {
      const tourist = tourists.find(t => t.id === touristId);
      if (tourist) {
        handleTouristClick(tourist);
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [filteredTourists, tourists, handleTouristClick, adminLocation]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tourist Activity</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Monitor tourist registrations, logins, and real-time activity.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export Data</span>
          <span className="sm:hidden">Export</span>
        </button>
      </div>

      {/* Location Status */}
      <LocationStatus />

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

      {/* Interactive Leaflet Map */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Global Tourist Locations</h2>
          <div className="text-sm text-gray-600">
            Powered by Leaflet | © OpenStreetMap contributors
          </div>
        </div>
        
        {/* Leaflet Map Container */}
        <div className="relative h-64 sm:h-96 rounded-lg border-2 border-gray-200 overflow-hidden">
          <div ref={mapRef} className="w-full h-full" style={{ zIndex: 1 }}></div>
          
          {/* Custom CSS for Leaflet markers and z-index fixes */}
          <style jsx>{`
            .custom-marker {
              background: transparent !important;
              border: none !important;
            }
            .leaflet-popup-content-wrapper {
              border-radius: 8px !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
            }
            .leaflet-popup-tip {
              background: white !important;
            }
            .leaflet-control-container {
              z-index: 1000 !important;
            }
            .leaflet-popup {
              z-index: 1001 !important;
            }
            .leaflet-map-pane {
              z-index: 1 !important;
            }
            .leaflet-tile-pane {
              z-index: 1 !important;
            }
            .leaflet-overlay-pane {
              z-index: 2 !important;
            }
            .leaflet-marker-pane {
              z-index: 3 !important;
            }
          `}</style>
        </div>
        
        {/* Map Info */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full border border-white shadow-sm"></div>
              <span>Active Tourists ({filteredTourists.filter(t => t.status === 'online').length})</span>
            </div>
          </div>
          <div className="text-xs">
            Click on markers for detailed information
          </div>
        </div>
      </div>

      {/* Tourist Info Popup */}
      {selectedTourist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative" style={{ zIndex: 10000 }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tourist Information</h3>
                <button 
                  onClick={handleCloseDetails}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedTourist.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{selectedTourist.name}</div>
                  <div className="text-sm text-gray-500">{selectedTourist.digitalId}</div>
                </div>
                <span className={getStatusBadge(selectedTourist.status)}>
                  {selectedTourist.status}
                </span>
              </div>
              
              {!showDetails ? (
                <button 
                  onClick={handleShowDetails}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  View Details
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <div className="font-medium">{selectedTourist.phone}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <div className="font-medium text-xs">{selectedTourist.email}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Check-in Time:</span>
                      <div className="font-medium">{selectedTourist.checkInTime}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Activity:</span>
                      <div className="font-medium">{selectedTourist.lastActivity}</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Current Location:</span>
                    <div className="font-medium">{selectedTourist.location}</div>
                  </div>
                  
                  <div className="flex space-x-2 pt-3 border-t border-gray-200">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                      <MapPin className="w-4 h-4" />
                      Track Location
                    </button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                      <Phone className="w-4 h-4" />
                      Call Tourist
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Active Tourists Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Tourists</h2>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
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
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
              <button className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
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
                      <button 
                        onClick={() => handleViewTourist(tourist)}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleLocateTourist(tourist)}
                        className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                        title="Show on Map"
                      >
                        <MapPin className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors" title="Call Tourist">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 p-4">
          {filteredTourists.map((tourist) => (
            <div key={tourist.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {tourist.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{tourist.name}</div>
                    <div className="text-xs text-gray-500">{tourist.digitalId}</div>
                  </div>
                </div>
                <span className={getStatusBadge(tourist.status)}>
                  {tourist.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Login Time:</span>
                  <span className="text-gray-900">{tourist.loginTime}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-gray-900 text-right">{tourist.location}</span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2 border-t border-gray-100">
                <button 
                  onClick={() => handleViewTourist(tourist)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleLocateTourist(tourist)}
                  className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                  title="Show on Map"
                >
                  <MapPin className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors" title="Call Tourist">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-4 sm:p-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-sm text-gray-700 text-center sm:text-left">
              Showing 1 to 5 of 847 results
            </p>
            <div className="flex justify-center sm:justify-end space-x-1 overflow-x-auto">
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 whitespace-nowrap">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded whitespace-nowrap">
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

export default TouristActivity;