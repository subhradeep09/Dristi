import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation (you can implement proper authentication here)
    if (credentials.username && credentials.password) {
      // For demo purposes, accept any non-empty credentials
      // In a real app, you'd validate against a backend
      navigate('/dashboard');
    } else {
      alert('Please enter both username and password');
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
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition duration-200"
          >
            <LogIn size={18} className="mr-2" />
            Sign In
          </button>
        </form>

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
