import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue', 
  subtitle = '',
  trend = null 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500'
  };

  const bgColorClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
    red: 'bg-red-50',
    orange: 'bg-orange-50',
    yellow: 'bg-yellow-50'
  };

  return (
    <div className={`${bgColorClasses[color]} rounded-xl p-6 border border-opacity-20 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${
            trend.type === 'up' ? 'text-green-600' : trend.type === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {trend.type === 'up' ? '↗' : trend.type === 'down' ? '↘' : '→'} {trend.value}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;