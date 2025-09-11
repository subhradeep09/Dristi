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
    <footer id="contact" className="bg-gray-900 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" />
              <span className="text-lg sm:text-xl font-bold text-white">DrishTi</span>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Leading the future of tourist safety with AI-powered monitoring and emergency response systems.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialIcons.map((social, index) => (
                <a key={index} href={social.link} className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group">
                  <span className="text-base sm:text-lg group-hover:scale-110 transition-transform">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">Services</h3>
            <ul className="space-y-3 sm:space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block text-sm sm:text-base">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">Company</h3>
            <ul className="space-y-3 sm:space-y-4">
              {company.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block text-sm sm:text-base">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">Support</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base break-all">support@Drishti.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 sm:pt-8 mt-10 sm:mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center sm:text-left text-sm sm:text-base">
              © 2024 DrishTi. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm sm:text-base">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm sm:text-base">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm sm:text-base">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;