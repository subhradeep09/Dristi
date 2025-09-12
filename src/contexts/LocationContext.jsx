import React, { createContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [adminLocation, setAdminLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  // Function to request location permission and get coordinates
  const requestLocationPermission = async () => {
    if (isRequestingLocation) return;
    
    setIsRequestingLocation(true);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser.');
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });

      const { latitude, longitude } = position.coords;
      
      // Get location details using reverse geocoding
      const locationData = {
        lat: latitude,
        lng: longitude,
        timestamp: new Date().toISOString(),
        accuracy: position.coords.accuracy
      };

      // Try to get city/state information using a reverse geocoding service
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`);
        const data = await response.json();
        
        locationData.city = data.address?.city || data.address?.town || data.address?.village || 'Unknown City';
        locationData.state = data.address?.state || 'Unknown State';
        locationData.country = data.address?.country || 'Unknown Country';
        locationData.displayName = data.display_name;
      } catch (geocodingError) {
        console.warn('Could not get location details:', geocodingError);
        locationData.city = 'Unknown City';
        locationData.state = 'Unknown State';
        locationData.country = 'Unknown Country';
      }

      setAdminLocation(locationData);
      setLocationPermission(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('adminLocation', JSON.stringify(locationData));
      localStorage.setItem('locationPermission', 'true');
      
      return locationData;
      
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationPermission(false);
      throw error;
    } finally {
      setIsRequestingLocation(false);
    }
  };

  // Function to clear location data
  const clearLocation = () => {
    setAdminLocation(null);
    setLocationPermission(false);
    localStorage.removeItem('adminLocation');
    localStorage.removeItem('locationPermission');
  };

  // Load saved location on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('adminLocation');
    const savedPermission = localStorage.getItem('locationPermission');
    
    if (savedLocation && savedPermission === 'true') {
      try {
        const parsedLocation = JSON.parse(savedLocation);
        setAdminLocation(parsedLocation);
        setLocationPermission(true);
      } catch (error) {
        console.error('Error parsing saved location:', error);
        clearLocation();
      }
    }
  }, []);

  const value = {
    adminLocation,
    locationPermission,
    isRequestingLocation,
    requestLocationPermission,
    clearLocation,
    setAdminLocation
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
