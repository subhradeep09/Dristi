import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, AlertTriangle, Monitor, Cpu, Smartphone, Cloud, Database, Globe, CheckCircle, Clock, Zap, Phone, Mail } from 'lucide-react';


const Header = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handleRegisterTourist = () => {
    navigate('/register');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-purple-400" />
          <span className="text-xl font-bold text-white">DrisTi</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white/80 hover:text-white transition-colors relative group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors relative group">
            Technology
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleRegisterTourist}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Register Tourist
          </button>
          <button 
            onClick={handleAdminLogin}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Admin Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;