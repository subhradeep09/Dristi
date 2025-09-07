import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg focus:ring-purple-500",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20 focus:ring-white",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 focus:ring-white",
    solid: "bg-white text-purple-600 hover:bg-gray-100 shadow-lg focus:ring-purple-500",
    ghost: "bg-transparent text-white hover:bg-white/10 focus:ring-white"
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };

  const disabledStyles = disabled 
    ? "opacity-50 cursor-not-allowed hover:scale-100" 
    : "";

  const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`;

  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;