import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';


const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAdminLogin = () => {
    navigate('/admin-login');
    setIsMenuOpen(false);
  };

  const handleRegisterTourist = () => {
    navigate('/register');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-purple-400" />
          <span className="text-xl font-bold text-white">DrishTi</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#features" className="text-white/80 hover:text-white transition-colors relative group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#technology" className="text-white/80 hover:text-white transition-colors relative group">
            Technology
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#about" className="text-white/80 hover:text-white transition-colors relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#contact" className="text-white/80 hover:text-white transition-colors relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
          <button 
            onClick={handleRegisterTourist}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg transition-colors text-sm lg:text-base"
          >
            Register
          </button>
          <button 
            onClick={handleAdminLogin}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg transition-colors text-sm lg:text-base"
          >
            Admin
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-black/90 backdrop-blur-md border-t border-white/10">
          <nav className="px-4 py-4 space-y-4">
            <a 
              href="#features" 
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#technology" 
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Technology
            </a>
            <a 
              href="#about" 
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="block text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
              <button 
                onClick={handleRegisterTourist}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors w-full"
              >
                Register Tourist
              </button>
              <button 
                onClick={handleAdminLogin}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors w-full"
              >
                Admin Login
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;