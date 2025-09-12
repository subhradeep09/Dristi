import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn, MapPin, Loader2 } from "lucide-react";
import { useLocation } from "../../contexts/useLocation";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { requestLocationPermission, isRequestingLocation } = useLocation();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Hardcoded credentials for demo purposes
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsLoggingIn(true);
      // Show location permission dialog
      setShowLocationDialog(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLocationPermission = async (granted) => {
    if (granted) {
      try {
        await requestLocationPermission();
        setShowLocationDialog(false);
        setIsLoggingIn(false);
        navigate('/dashboard');
      } catch (error) {
        console.error('Location permission error:', error);
        // Still navigate to dashboard even if location fails
        setShowLocationDialog(false);
        setIsLoggingIn(false);
        navigate('/dashboard');
        alert('Location access denied. You can still access the dashboard, but maps will use default locations.');
      }
    } else {
      // User declined location permission
      setShowLocationDialog(false);
      setIsLoggingIn(false);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <span className="text-blue-600 text-2xl">🛡️</span>
          </div>
          <h1 className="text-2xl font-extrabold font-serif">Admin Portal</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Welcome back, please sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">{/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <User size={18} />
              </span>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg shadow-md transition duration-200"
          >
            {isLoggingIn ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={18} className="mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Location Permission Dialog */}
        {showLocationDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Location Permission Required
                </h3>
                <p className="text-gray-600 mb-6">
                  To provide accurate map views and location-based features, we need access to your location. 
                  This will help zoom all maps to your current area.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleLocationPermission(false)}
                    className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    Skip
                  </button>
                  <button
                    onClick={() => handleLocationPermission(true)}
                    disabled={isRequestingLocation}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition duration-200 flex items-center justify-center gap-2"
                  >
                    {isRequestingLocation ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Getting Location...
                      </>
                    ) : (
                      'Allow Location'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Support */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Need help?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Contact Support
          </a>
        </p>
        
        {/* Back to Home */}
        <p className="mt-4 text-center text-sm text-gray-600">
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </button>
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-gray-400 text-xs">
        © 2024 Admin Portal. All rights reserved.
      </div>
    </div>
  );
};

export default AdminLogin;
