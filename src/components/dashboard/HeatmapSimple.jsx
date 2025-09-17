import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Heatmap = () => {
  const [currentZoom, setCurrentZoom] = useState(7);
  const [mapCenter] = useState([26.2006, 92.9376]); // Guwahati, Assam

  // Component to handle map zoom events
  const ZoomHandler = () => {
    const map = useMapEvents({
      zoomend: () => {
        setCurrentZoom(map.getZoom());
      },
    });
    return null;
  };

  // Test data for Assam tourist locations
  const testData = [
    { position: [26.2006, 92.9376], label: 'Guwahati', count: 125 },
    { position: [26.1458, 91.7362], label: 'Dispur', count: 85 },
    { position: [26.7499, 94.2065], label: 'Jorhat', count: 95 },
    { position: [27.0844, 95.0917], label: 'Dibrugarh', count: 67 },
    { position: [26.6315, 92.7875], label: 'Nagaon', count: 78 },
    { position: [26.3518, 90.2172], label: 'Dhubri', count: 45 },
    { position: [25.5788, 91.8933], label: 'Silchar', count: 110 },
    { position: [26.9124, 94.9077], label: 'Dibrugarh Airport', count: 55 }
  ];

  // Generate heat colors based on tourist count
  const getHeatColor = (count) => {
    if (count >= 120) return '#8B0000'; // Dark red
    if (count >= 100) return '#DC143C'; // Crimson  
    if (count >= 80) return '#FF4500';  // Orange red
    if (count >= 60) return '#FF6347';  // Tomato
    if (count >= 40) return '#FFA500';  // Orange
    return '#FFD700'; // Gold
  };

  // Calculate radius based on count and zoom
  const getHeatRadius = (count) => {
    const baseRadius = Math.sqrt(count) * 200;
    const zoomMultiplier = Math.pow(2, 7 - currentZoom) * 800;
    return Math.max(1000, baseRadius + zoomMultiplier);
  };

  console.log('Simple Heatmap rendering with', testData.length, 'locations');

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Tourist Heatmap</h2>
          <p className="text-gray-600">Real-time tourist location visualization ({testData.length} locations)</p>
        </div>
        
        {/* Map Container */}
        <div className="p-4">
          <div style={{ height: '500px', width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
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
              
              {/* Render heatmap circles */}
              {testData.map((location, index) => (
                <Circle
                  key={`location-${index}`}
                  center={location.position}
                  radius={getHeatRadius(location.count)}
                  pathOptions={{
                    color: getHeatColor(location.count),
                    fillColor: getHeatColor(location.count),
                    fillOpacity: 0.4,
                    opacity: 0.8,
                    weight: 2
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>{location.label}</strong><br />
                      Visitors: <strong>{location.count}</strong><br />
                      <span className="text-gray-500">Zoom: {currentZoom}</span>
                    </div>
                  </Popup>
                </Circle>
              ))}
            </MapContainer>
          </div>
        </div>
        
        {/* Footer Info */}
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <div className="text-sm text-gray-600">
            <p><strong>Map Controls:</strong> Scroll to zoom, drag to pan. Click on circles for details.</p>
            <p><strong>Current Zoom:</strong> {currentZoom} | <strong>Center:</strong> Guwahati, Assam</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;