import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, MapPin, Shield, AlertTriangle, Save, X, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationStatus from './LocationStatus';
import LoadingSpinner from '../LoadingSpinner';
import { useLocation } from '../../contexts/useLocation';
import { useData } from '../../contexts/useData';
import { useWebSocket } from '../../contexts/useWebSocket';

// Fix for default markers in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// Custom red marker icon for drawing points
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const GeoFencing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState([]);
  const [showAddZoneModal, setShowAddZoneModal] = useState(false);
  const [showConfirmDrawing, setShowConfirmDrawing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [mapCenter, setMapCenter] = useState([26.2006, 92.9376]); // Default to Guwahati
  const [mapZoom, setMapZoom] = useState(7);
  const [refreshing, setRefreshing] = useState(false);

  const { adminLocation } = useLocation();
  const { 
    geofences, 
    createGeofence, 
    updateGeofence, 
    deleteGeofence, 
    refreshData,
    globalLoading 
  } = useData();
  const { wsConnected, alerts: wsAlerts } = useWebSocket();

  // Update map center when admin location is available
  useEffect(() => {
    if (adminLocation) {
      setMapCenter([adminLocation.lat, adminLocation.lng]);
      setMapZoom(10); // Zoom in when we have admin location
    }
  }, [adminLocation]);

  const [editZoneData, setEditZoneData] = useState({
    name: '',
    type: 'Restricted',
    description: ''
  });
  const [newZoneData, setNewZoneData] = useState({
    name: '',
    type: 'Restricted',
    description: '',
    coordinates: []
  });
  // Fetch geofences on component mount
  useEffect(() => {
    refreshData(['geofences']);
  }, [refreshData]);

  // Handle manual refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData(['geofences']);
    setRefreshing(false);
  };

  // Count geofence violations from WebSocket alerts
  const getViolationCount = (geofenceId) => {
    return wsAlerts.filter(alert => 
      alert.type === 'geofence_breach' && 
      alert.geofenceId === geofenceId
    ).length;
  };

  // Fallback zones data when API is not available
  const fallbackZones = [
    {
      id: 1,
      name: 'Wildlife Sanctuary',
      type: 'Restricted',
      status: 'Active',
      created: '2025-08-15',
      violations: 12,
      coordinates: '28.7041°N, 77.1025°E',
      description: 'Protected wildlife area with strict access control',
      polygon: [
        [28.7041, 77.1025],
        [28.7141, 77.1125],
        [28.7041, 77.1225],
        [28.6941, 77.1125]
      ]
    },
    {
      id: 2,
      name: 'Mountain Base Camp',
      type: 'Caution',
      status: 'Active',
      created: '2025-08-20',
      violations: 5,
      coordinates: '27.9881°N, 86.9250°E',
      description: 'High altitude camping zone requiring permits',
      polygon: [
        [27.9881, 86.9250],
        [27.9981, 86.9350],
        [27.9881, 86.9450],
        [27.9781, 86.9350]
      ]
    },
    {
      id: 3,
      name: 'Heritage Temple Area',
      type: 'Restricted',
      status: 'Active',
      created: '2025-09-01',
      violations: 8,
      coordinates: '28.3949°N, 84.1240°E',
      description: 'Archaeological site with limited visitor access',
      polygon: [
        [28.3949, 84.1240],
        [28.4049, 84.1340],
        [28.3949, 84.1440],
        [28.3849, 84.1340]
      ]
    },
    {
      id: 4,
      name: 'Trekking Route B4',
      type: 'Caution',
      status: 'Active',
      created: '2025-09-05',
      violations: 3,
      coordinates: '28.2380°N, 83.9956°E',
      description: 'Challenging trek route requiring experience',
      polygon: [
        [28.2380, 83.9956],
        [28.2480, 84.0056],
        [28.2380, 84.0156],
        [28.2280, 84.0056]
      ]
    }
  ];

  // Use API data if available, otherwise fallback data
  const zones = geofences.data.length > 0 
    ? geofences.data.map(zone => ({
        ...zone,
        violations: getViolationCount(zone.id) // Add real-time violation count
      }))
    : fallbackZones;

  // Component for handling map clicks when in drawing mode
  const DrawingHandler = () => {
    useMapEvents({
      click: (e) => {
        if (isDrawingMode && !showConfirmDrawing) {
          const newPoint = [e.latlng.lat, e.latlng.lng];
          setCurrentPolygon(prev => [...prev, newPoint]);
        }
      }
    });
    return null;
  };

  // Handle starting zone drawing
  const startDrawing = () => {
    setIsDrawingMode(true);
    setCurrentPolygon([]);
    setShowAddZoneModal(false);
  };

  // Handle removing a specific point
  const removePoint = (indexToRemove, event) => {
    // Prevent event bubbling to map click
    if (event) {
      event.stopPropagation();
    }
    setCurrentPolygon(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // Handle moving/dragging a point
  const movePoint = (index, newPosition) => {
    setCurrentPolygon(prev => {
      const updated = [...prev];
      updated[index] = [newPosition.lat, newPosition.lng];
      return updated;
    });
  };

  // Handle completing zone drawing
  const completeDrawing = () => {
    if (currentPolygon.length >= 3) {
      setIsDrawingMode(false);
      setShowConfirmDrawing(true);
    } else {
      alert(`Please add at least 3 points to create a zone. Current points: ${currentPolygon.length}`);
    }
  };

  // Handle confirming the drawn zone
  const confirmDrawing = () => {
    setNewZoneData(prev => ({ ...prev, coordinates: currentPolygon }));
    setShowConfirmDrawing(false);
    setShowAddZoneModal(true);
  };

  // Handle canceling drawing
  const cancelDrawing = () => {
    setIsDrawingMode(false);
    setCurrentPolygon([]);
    setShowAddZoneModal(false);
    setShowConfirmDrawing(false);
    setNewZoneData({ name: '', type: 'Restricted', description: '', coordinates: [] });
  };

  // Handle saving new zone
  const saveNewZone = async () => {
    if (newZoneData.name && newZoneData.coordinates.length >= 3) {
      try {
        const newZone = {
          name: newZoneData.name,
          type: newZoneData.type,
          description: newZoneData.description,
          coordinates: newZoneData.coordinates,
          status: 'Active'
        };
        
        const response = await createGeofence(newZone);
        if (response.success) {
          cancelDrawing();
          alert('Zone added successfully!');
          await handleRefresh(); // Refresh the zones list
        } else {
          alert(`Failed to create geofence: ${response.error}`);
        }
      } catch (error) {
        console.error('Error creating geofence:', error);
        alert('Failed to create geofence. Please try again.');
      }
    } else {
      alert('Please fill in all required fields and ensure the zone has at least 3 points');
    }
  };

  // Handle edit zone confirmation
  const handleEditZone = (zoneId) => {
    setSelectedZoneId(zoneId);
    setShowEditConfirm(true);
  };

  // Handle delete zone confirmation
  const handleDeleteZone = (zoneId) => {
    setSelectedZoneId(zoneId);
    setShowDeleteConfirm(true);
  };

  // Confirm edit zone
  const confirmEditZone = () => {
    const zoneToEdit = zones.find(zone => zone.id === selectedZoneId);
    if (zoneToEdit) {
      // Populate edit form with current zone data
      setEditZoneData({
        name: zoneToEdit.name,
        type: zoneToEdit.type,
        description: zoneToEdit.description
      });
      setShowEditModal(true);
    }
    setShowEditConfirm(false);
  };

  // Confirm delete zone
  const confirmDeleteZone = async () => {
    try {
      const response = await deleteGeofence(selectedZoneId);
      if (response.success) {
        setShowDeleteConfirm(false);
        setSelectedZoneId(null);
        alert('Zone deleted successfully!');
        await handleRefresh(); // Refresh the zones list
      } else {
        alert(`Failed to delete geofence: ${response.error}`);
      }
    } catch (error) {
      console.error('Error deleting geofence:', error);
      alert('Failed to delete geofence. Please try again.');
    }
  };

  // Cancel confirmation dialogs
  const cancelConfirmation = () => {
    setShowEditConfirm(false);
    setShowDeleteConfirm(false);
    setSelectedZoneId(null);
  };

  // Handle saving edited zone
  const saveEditedZone = async () => {
    if (editZoneData.name.trim()) {
      try {
        const response = await updateGeofence(selectedZoneId, {
          name: editZoneData.name,
          type: editZoneData.type,
          description: editZoneData.description
        });
        
        if (response.success) {
          setShowEditModal(false);
          setSelectedZoneId(null);
          setEditZoneData({ name: '', type: 'Restricted', description: '' });
          alert('Zone updated successfully!');
          await handleRefresh(); // Refresh the zones list
        } else {
          alert(`Failed to update geofence: ${response.error}`);
        }
      } catch (error) {
        console.error('Error updating geofence:', error);
        alert('Failed to update geofence. Please try again.');
      }
    } else {
      alert('Please enter a zone name');
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setShowEditModal(false);
    setSelectedZoneId(null);
    setEditZoneData({ name: '', type: 'Restricted', description: '' });
  };

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

  // Get polygon color based on zone type
  const getZoneColor = (type) => {
    return type === 'Restricted' ? '#ef4444' : '#f59e0b'; // Red for restricted, yellow/orange for caution
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Geo-Fencing Zones
            {wsConnected ? (
              <Wifi className="inline-block w-5 h-5 text-green-500 ml-2" title="WebSocket Connected" />
            ) : (
              <WifiOff className="inline-block w-5 h-5 text-red-500 ml-2" title="WebSocket Disconnected" />
            )}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor restricted areas and tourist movement boundaries.
            {globalLoading && <LoadingSpinner />}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing || globalLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing || globalLoading ? 'animate-spin' : ''}`} />
            {refreshing || globalLoading ? 'Refreshing...' : 'Refresh'}
          </button>
          {showConfirmDrawing && (
            <>
              <button 
                onClick={confirmDrawing}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                Create
              </button>
              <button 
                onClick={cancelDrawing}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          )}
          {isDrawingMode && !showConfirmDrawing && (
            <>
              <button 
                onClick={completeDrawing}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                Complete Zone
              </button>
              <button 
                onClick={cancelDrawing}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          )}
          {!isDrawingMode && !showConfirmDrawing && (
            <button 
              onClick={startDrawing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Zone
            </button>
          )}
        </div>
      </div>

      {/* Location Status */}
      <LocationStatus />

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
            <div className="h-96 rounded-lg overflow-hidden relative z-0">
              <MapContainer 
                center={mapCenter} 
                zoom={mapZoom} 
                style={{ height: '100%', width: '100%', position: 'relative', zIndex: 1 }}
                className="rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Drawing handler for new zones */}
                <DrawingHandler />
                
                {/* Show current polygon being drawn */}
                {(isDrawingMode || showConfirmDrawing) && currentPolygon.length > 0 && (
                  <>
                    {currentPolygon.map((point, index) => (
                      <Marker 
                        key={index} 
                        position={point}
                        icon={redIcon}
                        draggable={!showConfirmDrawing}
                        eventHandlers={{
                          dragend: (e) => {
                            if (!showConfirmDrawing) {
                              movePoint(index, e.target.getLatLng());
                            }
                          }
                        }}
                      >
                        <Popup>
                          <div className="text-center min-w-0">
                            <h4 className="font-semibold mb-2 text-gray-900">Point {index + 1}</h4>
                            <div className="text-xs text-gray-600 mb-3 space-y-1">
                              <p>Lat: {point[0].toFixed(6)}</p>
                              <p>Lng: {point[1].toFixed(6)}</p>
                            </div>
                            {!showConfirmDrawing && (
                              <>
                                <div className="text-xs text-blue-600 mb-3">
                                  <p>💡 Drag marker to move</p>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    removePoint(index);
                                  }}
                                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 mx-auto transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                  Remove
                                </button>
                              </>
                            )}
                            {showConfirmDrawing && (
                              <div className="text-xs text-green-600">
                                <p>✓ Zone completed</p>
                              </div>
                            )}
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                    {currentPolygon.length >= 3 && (
                      <Polygon
                        positions={currentPolygon}
                        pathOptions={{
                          color: showConfirmDrawing ? '#10b981' : '#3b82f6',
                          fillColor: showConfirmDrawing ? '#10b981' : '#3b82f6',
                          fillOpacity: showConfirmDrawing ? 0.3 : 0.2,
                          opacity: 1,
                          weight: 2,
                          dashArray: showConfirmDrawing ? undefined : '5, 5'
                        }}
                      />
                    )}
                    {/* Connect lines for incomplete polygon */}
                    {currentPolygon.length === 2 && !showConfirmDrawing && (
                      <Polygon
                        positions={currentPolygon}
                        pathOptions={{
                          color: '#3b82f6',
                          fillOpacity: 0,
                          opacity: 0.8,
                          weight: 2,
                          dashArray: '10, 5'
                        }}
                      />
                    )}
                  </>
                )}
                
                {/* Render existing geo-fencing zones as polygons */}
                {filteredZones.map((zone) => (
                  <React.Fragment key={zone.id}>
                    <Polygon
                      positions={zone.polygon}
                      pathOptions={{
                        color: getZoneColor(zone.type),
                        fillColor: getZoneColor(zone.type),
                        fillOpacity: 0.3,
                        opacity: 0.8,
                        weight: 2
                      }}
                    >
                      <Popup>
                        <div className="text-center">
                          <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                          <p className="text-sm text-gray-600 mb-1">{zone.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className={`px-2 py-1 rounded ${zone.type === 'Restricted' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {zone.type}
                            </span>
                            <span className="text-gray-500">Violations: {zone.violations}</span>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                    
                    {/* Center marker for each zone */}
                    <Marker position={[
                      zone.polygon.reduce((sum, coord) => sum + coord[0], 0) / zone.polygon.length,
                      zone.polygon.reduce((sum, coord) => sum + coord[1], 0) / zone.polygon.length
                    ]}>
                      <Popup>
                        <div className="text-center">
                          <h4 className="font-semibold">{zone.name}</h4>
                          <p className="text-sm text-gray-600">{zone.type} Zone</p>
                        </div>
                      </Popup>
                    </Marker>
                  </React.Fragment>
                ))}
              </MapContainer>
              
              {/* Zone Types Legend - positioned absolutely over the map */}
              <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border z-10">
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
                      <button 
                        onClick={() => handleEditZone(zone.id)}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteZone(zone.id)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm hover:bg-red-200 transition-colors"
                      >
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

      {/* Add Zone Modal */}
      {showAddZoneModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl relative z-[10000] border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Zone</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone Name</label>
                <input
                  type="text"
                  value={newZoneData.name}
                  onChange={(e) => setNewZoneData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter zone name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone Type</label>
                <select
                  value={newZoneData.type}
                  onChange={(e) => setNewZoneData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Restricted">Restricted</option>
                  <option value="Caution">Caution</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newZoneData.description}
                  onChange={(e) => setNewZoneData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter zone description"
                />
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Coordinates: {newZoneData.coordinates.length} points</p>
                {newZoneData.coordinates.length > 0 && (
                  <div className="mt-2 max-h-20 overflow-y-auto">
                    {newZoneData.coordinates.map((coord, index) => (
                      <div key={index} className="text-xs">
                        Point {index + 1}: {coord[0].toFixed(4)}°, {coord[1].toFixed(4)}°
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={cancelDrawing}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveNewZone}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Save Zone
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Zone Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl relative z-[10000] border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Zone</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone Name</label>
                <input
                  type="text"
                  value={editZoneData.name}
                  onChange={(e) => setEditZoneData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter zone name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone Type</label>
                <select
                  value={editZoneData.type}
                  onChange={(e) => setEditZoneData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Restricted">Restricted</option>
                  <option value="Caution">Caution</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editZoneData.description}
                  onChange={(e) => setEditZoneData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter zone description"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={cancelEditing}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedZone}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawing Instructions */}
      {isDrawingMode && !showConfirmDrawing && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
          <h4 className="font-semibold mb-2">Drawing Mode Active</h4>
          <div className="text-sm space-y-1">
            <p>• Click on map to add points</p>
            <p>• Drag markers to move points</p>
            <p>• Click marker popup to remove points</p>
            <p>• Minimum 3 points required</p>
          </div>
          <div className="mt-3 pt-2 border-t border-blue-500">
            <p className="text-xs font-medium">Points added: {currentPolygon.length}</p>
            {currentPolygon.length >= 3 && (
              <p className="text-xs text-blue-200">Ready to complete zone!</p>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Instructions */}
      {showConfirmDrawing && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
          <h4 className="font-semibold mb-2">Zone Created!</h4>
          <div className="text-sm space-y-1">
            <p>• Review the green highlighted area</p>
            <p>• Click "Create" to add zone details</p>
            <p>• Click "Cancel" to discard</p>
          </div>
          <div className="mt-3 pt-2 border-t border-green-500">
            <p className="text-xs font-medium">Points: {currentPolygon.length}</p>
            <p className="text-xs text-green-200">Zone ready for creation!</p>
          </div>
        </div>
      )}

      {/* Edit Confirmation Modal */}
      {showEditConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-2xl relative z-[10000] border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Zone</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to edit this zone? 
              {selectedZoneId && (
                <span className="font-medium">
                  {" "}"
                  {zones.find(zone => zone.id === selectedZoneId)?.name}
                  "
                </span>
              )}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelConfirmation}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmEditZone}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Yes, Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-2xl relative z-[10000] border">
            <h3 className="text-lg font-semibold text-red-600 mb-4">Delete Zone</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this zone? This action cannot be undone.
              {selectedZoneId && (
                <span className="font-medium block mt-2 text-gray-900">
                  Zone: "{zones.find(zone => zone.id === selectedZoneId)?.name}"
                </span>
              )}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelConfirmation}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteZone}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeoFencing;