import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Home, Users, Map, AlertTriangle, MapPin, Menu } from 'lucide-react';

const Sidebar = ({ collapsed, currentPage, mobileMenuOpen, onToggle, onMobileToggle }) => {
  const navigate = useNavigate();
  
  const handleNavigation = (pageId) => {
    if (pageId === 'dashboard') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard/${pageId}`);
    }
    // Close mobile menu on navigation
    if (onMobileToggle) {
      onMobileToggle();
    }
  };
  
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', active: currentPage === 'dashboard' },
    { id: 'tourist-activity', icon: Users, label: 'Tourist Activity', active: currentPage === 'tourist-activity' },
    { id: 'heatmap', icon: Map, label: 'Heatmap', active: currentPage === 'heatmap' },
    { id: 'sos-hits', icon: AlertTriangle, label: 'SOS Hits', active: currentPage === 'sos-hits' },
    { id: 'geo-fencing', icon: MapPin, label: 'Geo-Fencing', active: currentPage === 'geo-fencing' }
  ];

  const userInfo = {
    name: 'Admin User',
    status: 'Online',
    avatar: 'AD'
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-slate-800 text-white transition-all duration-300 z-50 lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64`}>
        <SidebarContent 
          collapsed={false}
          menuItems={menuItems}
          userInfo={userInfo}
          handleNavigation={handleNavigation}
          onToggle={onToggle}
        />
      </div>

      {/* Desktop Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-slate-800 text-white transition-all duration-300 z-50 hidden lg:block ${
        collapsed ? 'w-16' : 'w-64'
      }`}>
        <SidebarContent 
          collapsed={collapsed}
          menuItems={menuItems}
          userInfo={userInfo}
          handleNavigation={handleNavigation}
          onToggle={onToggle}
        />
      </div>
    </>
  );
};

// Extracted sidebar content component to avoid duplication
const SidebarContent = ({ collapsed, menuItems, userInfo, handleNavigation, onToggle }) => {
  return (
    <>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">DrishTi</h2>
              <p className="text-sm text-slate-400">Admin Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                    item.active
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  {!collapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {userInfo.avatar}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userInfo.name}</p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-xs text-slate-400">{userInfo.status}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button - Only show on desktop */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 bg-slate-800 border border-slate-600 rounded-full items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors hidden lg:flex"
      >
        <Menu className="w-3 h-3" />
      </button>
    </>
  );
};

export default Sidebar;