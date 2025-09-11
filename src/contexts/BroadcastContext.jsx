import React, { createContext, useContext, useState } from 'react';
import { Radio, MessageSquare, AlertTriangle, Clock } from 'lucide-react';

const BroadcastContext = createContext();

export const useBroadcast = () => {
  const context = useContext(BroadcastContext);
  if (!context) {
    throw new Error('useBroadcast must be used within a BroadcastProvider');
  }
  return context;
};

export const BroadcastProvider = ({ children }) => {
  // Initial broadcast history data
  const [broadcastHistory, setBroadcastHistory] = useState([
    {
      id: 1,
      icon: Radio,
      title: 'Weather Alert Broadcast',
      message: 'Heavy rainfall warning issued for mountain regions. All tourists advised to take shelter.',
      time: '2 hours ago',
      priority: 'high',
      recipientsCount: 1247,
      status: 'delivered',
      sentAt: '2 hours ago',
      deliveryRate: 98.5
    },
    {
      id: 2,
      icon: MessageSquare,
      title: 'Safety Guidelines Update',
      message: 'New safety protocols for Tiger Reserve area. Please review updated guidelines.',
      time: '6 hours ago',
      priority: 'medium',
      recipientsCount: 856,
      status: 'delivered',
      sentAt: '6 hours ago',
      deliveryRate: 97.2
    },
    {
      id: 3,
      icon: AlertTriangle,
      title: 'Route Closure Notification',
      message: 'Temporary closure of Trek Route B-4 due to maintenance work until further notice.',
      time: '1 day ago',
      priority: 'high',
      recipientsCount: 2341,
      status: 'delivered',
      sentAt: '1 day ago',
      deliveryRate: 99.1
    },
    {
      id: 4,
      icon: Clock,
      title: 'Daily Check-in Reminder',
      message: 'Daily check-in reminder sent to all active tourists in remote areas.',
      time: '1 day ago',
      priority: 'low',
      recipientsCount: 3478,
      status: 'delivered',
      sentAt: '1 day ago',
      deliveryRate: 96.8
    },
    {
      id: 5,
      icon: Radio,
      title: 'Emergency Evacuation Alert',
      message: 'Immediate evacuation required from Zone Alpha-7 due to landslide risk.',
      time: '2 days ago',
      priority: 'high',
      recipientsCount: 567,
      status: 'delivered',
      sentAt: '2 days ago',
      deliveryRate: 99.5
    },
    {
      id: 6,
      icon: MessageSquare,
      title: 'Equipment Check Reminder',
      message: 'Please ensure your safety equipment is properly maintained and functional.',
      time: '3 days ago',
      priority: 'medium',
      recipientsCount: 1892,
      status: 'delivered',
      sentAt: '3 days ago',
      deliveryRate: 94.3
    },
    {
      id: 7,
      icon: Clock,
      title: 'Night Curfew Notice',
      message: 'Night movement restricted in forest areas from 8 PM to 6 AM for safety.',
      time: '4 days ago',
      priority: 'medium',
      recipientsCount: 2156,
      status: 'delivered',
      sentAt: '4 days ago',
      deliveryRate: 95.7
    },
    {
      id: 8,
      icon: AlertTriangle,
      title: 'Wildlife Activity Alert',
      message: 'Increased wildlife activity reported. Maintain safe distance and travel in groups.',
      time: '5 days ago',
      priority: 'high',
      recipientsCount: 1423,
      status: 'delivered',
      sentAt: '5 days ago',
      deliveryRate: 98.2
    }
  ]);

  const addBroadcast = (broadcastData) => {
    // Determine title based on message content
    const getTitle = (message) => {
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('storm')) {
        return 'Weather Alert Broadcast';
      } else if (lowerMessage.includes('safety') || lowerMessage.includes('check')) {
        return 'Safety Check Broadcast';
      } else if (lowerMessage.includes('emergency') || lowerMessage.includes('evacuation')) {
        return 'Emergency Alert Broadcast';
      } else if (lowerMessage.includes('route') || lowerMessage.includes('closure') || lowerMessage.includes('path')) {
        return 'Route Update Broadcast';
      } else if (lowerMessage.includes('reminder') || lowerMessage.includes('daily')) {
        return 'Daily Reminder Broadcast';
      } else if (lowerMessage.includes('location') || lowerMessage.includes('coordinates')) {
        return 'Location Check Broadcast';
      } else {
        return 'General Information Broadcast';
      }
    };

    // Determine icon based on priority and content
    const getIcon = (message, priority) => {
      const lowerMessage = message.toLowerCase();
      if (priority === 'high' || lowerMessage.includes('emergency') || lowerMessage.includes('alert')) {
        return AlertTriangle;
      } else if (lowerMessage.includes('reminder') || lowerMessage.includes('daily')) {
        return Clock;
      } else if (lowerMessage.includes('weather')) {
        return Radio;
      } else {
        return MessageSquare;
      }
    };

    const newBroadcast = {
      id: Date.now(), // Simple ID generation
      icon: getIcon(broadcastData.message, broadcastData.priority),
      title: getTitle(broadcastData.message),
      message: broadcastData.message,
      time: 'Just now',
      priority: broadcastData.priority,
      recipientsCount: broadcastData.recipientsCount,
      status: 'delivered',
      sentAt: 'Just now',
      deliveryRate: Math.floor(Math.random() * (100 - 95) + 95) // Random delivery rate between 95-100%
    };

    setBroadcastHistory(prev => [newBroadcast, ...prev]);
    return newBroadcast;
  };

  const value = {
    broadcastHistory,
    addBroadcast
  };

  return (
    <BroadcastContext.Provider value={value}>
      {children}
    </BroadcastContext.Provider>
  );
};
