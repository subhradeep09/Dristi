import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings, ChevronDown, LogOut, Menu } from 'lucide-react';

const DashboardHeader = ({ title = "Welcome back, Admin", subtitle = "Here's what's happening with your tourist monitoring system today.", onMobileMenuToggle }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button & Page Title */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button 
            onClick={onMobileMenuToggle}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Page Title */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 hidden sm:block">{subtitle}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings - Hide on small screens */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
            <Settings className="w-5 h-5" />
          </button>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4 pl-2 sm:pl-4 border-l border-gray-200">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">
                {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              AD
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;