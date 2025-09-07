import React from 'react';

const Card = ({ 
  children, 
  variant = 'default', 
  hover = true, 
  className = '',
  ...props 
}) => {
  const baseStyles = "rounded-xl transition-all duration-300";
  
  const variants = {
    default: "bg-white shadow-lg border border-gray-200",
    glass: "bg-white/10 backdrop-blur-sm border border-white/20",
    gradient: "bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100",
    dark: "bg-gray-800 border border-gray-700",
    elevated: "bg-white shadow-xl border border-gray-100"
  };

  const hoverStyles = hover 
    ? "hover:shadow-xl hover:scale-105 hover:border-purple-200" 
    : "";

  const cardStyles = `${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`;

  return (
    <div className={cardStyles} {...props}>
      {children}
    </div>
  );
};

// Card subcomponents
const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 pb-3 ${className}`}>
    {children}
  </div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 pt-3 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 pt-3 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;