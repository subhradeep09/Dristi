import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'purple', 
  className = '' 
}) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colors = {
    purple: 'border-purple-600',
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  return (
    <div className={`inline-block ${sizes[size]} ${className}`}>
      <div
        className={`
          ${sizes[size]}
          border-2
          ${colors[color]}
          border-t-transparent
          rounded-full
          animate-spin
        `}
      />
    </div>
  );
};

// Full screen loading overlay
export const LoadingOverlay = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 shadow-2xl text-center">
      <LoadingSpinner size="large" className="mx-auto mb-4" />
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  </div>
);

export default LoadingSpinner;