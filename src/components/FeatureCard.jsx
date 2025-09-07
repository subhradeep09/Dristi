import React from 'react';

const FeatureCard = ({ icon, title, description, image, reverse = false }) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 mb-16`}>
      <div className="flex-1">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
      </div>
      <div className="flex-1">
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl p-1">
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <img src={image} alt={title} className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;