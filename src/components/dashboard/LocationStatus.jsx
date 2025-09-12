import React from 'react';
import { MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLocation } from '../../contexts/useLocation';

const LocationStatus = () => {
  const { adminLocation, locationPermission, isRequestingLocation, requestLocationPermission, clearLocation } = useLocation();

  if (isRequestingLocation) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          <span className="text-sm text-blue-700">Getting your location...</span>
        </div>
      </div>
    );
  }

  if (locationPermission && adminLocation) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <div className="text-sm">
              <span className="text-green-700 font-medium">Location Active: </span>
              <span className="text-green-600">{adminLocation.city}, {adminLocation.state}</span>
            </div>
          </div>
          <button
            onClick={clearLocation}
            className="text-green-600 hover:text-green-800 text-xs underline"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span className="text-sm text-amber-700">Location not set - Using default view</span>
        </div>
        <button
          onClick={requestLocationPermission}
          className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
        >
          <MapPin className="w-3 h-3" />
          Enable Location
        </button>
      </div>
    </div>
  );
};

export default LocationStatus;
