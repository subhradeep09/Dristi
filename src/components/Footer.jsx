import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const services = ["Safety Monitoring", "Emergency Response", "Digital ID System", "Mobile Application"];
  const company = ["About Us", "Careers", "Press", "Partners"];
  const socialIcons = [
    { name: "Facebook", icon: "📘", link: "#" },
    { name: "Twitter", icon: "🐦", link: "#" },
    { name: "LinkedIn", icon: "💼", link: "#" }
  ];

  return (
    <footer className="bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">DrishTi</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Leading the future of tourist safety with AI-powered monitoring and emergency response systems.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a key={index} href={social.link} className="w-12 h-12 bg-gray-800 hover:bg-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group">
                  <span className="text-lg group-hover:scale-110 transition-transform">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Services</h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Company</h3>
            <ul className="space-y-4">
              {company.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Support</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Mail className="w-4 h-4" />
                <span>support@Drishti.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © 2024 DrishTi. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;