import React, { useState } from 'react';
import { Send, Users, MessageSquare, Clock, CheckCircle, AlertTriangle, Filter, Search, Download } from 'lucide-react';
import { useBroadcast } from '../../contexts/BroadcastContext';

const SMSBroadcast = () => {
  const { broadcastHistory, addBroadcast } = useBroadcast();
  
  const [broadcastData, setBroadcastData] = useState({
    message: '',
    recipients: 'all',
    priority: 'medium',
    scheduleType: 'now'
  });
  
  const [selectedTourists, setSelectedTourists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Sample tourist data for recipient selection
  const tourists = [
    { id: 'TG001234', name: 'John Smith', location: 'Mount Everest Base', status: 'online' },
    { id: 'TG001235', name: 'Sarah Johnson', location: 'Tiger Reserve Zone', status: 'online' },
    { id: 'TG001236', name: 'Mike Chen', location: 'Border Area 7', status: 'offline' },
    { id: 'TG001237', name: 'Emma Davis', location: 'Wildlife Sanctuary', status: 'online' },
    { id: 'TG001238', name: 'Alex Kumar', location: 'Valley Trek Route', status: 'online' }
  ];

  const handleInputChange = (field, value) => {
    setBroadcastData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTouristSelection = (touristId) => {
    setSelectedTourists(prev => {
      if (prev.includes(touristId)) {
        return prev.filter(id => id !== touristId);
      } else {
        return [...prev, touristId];
      }
    });
  };

  const handleSendBroadcast = async () => {
    if (!broadcastData.message.trim()) {
      alert('Please enter a message to send.');
      return;
    }

    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add broadcast to context
      const newBroadcast = {
        id: Date.now(),
        icon: MessageSquare,
        title: `${broadcastData.priority.charAt(0).toUpperCase() + broadcastData.priority.slice(1)} Priority Broadcast`,
        message: broadcastData.message,
        time: 'Just now',
        priority: broadcastData.priority,
        recipientsCount: getRecipientCount(),
        status: 'delivered',
        sentAt: 'Just now',
        deliveryRate: 98.5
      };
      
      addBroadcast(newBroadcast);
      
      setIsSending(false);
      alert('Broadcast sent successfully!');
      setBroadcastData({
        message: '',
        recipients: 'all',
        priority: 'medium',
        scheduleType: 'now'
      });
      setSelectedTourists([]);
    }, 2000);
  };

  const getRecipientCount = () => {
    switch (broadcastData.recipients) {
      case 'all':
        return tourists.length;
      case 'online':
        return tourists.filter(t => t.status === 'online').length;
      case 'selected':
        return selectedTourists.length;
      default:
        return 0;
    }
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    };
    return styles[priority] || styles.medium;
  };

  const getStatusBadge = (status) => {
    const styles = {
      delivered: 'bg-green-100 text-green-800',
      sending: 'bg-blue-100 text-blue-800',
      failed: 'bg-red-100 text-red-800'
    };
    return styles[status] || styles.delivered;
  };

  const filteredTourists = tourists.filter(tourist =>
    tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tourist.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">SMS Broadcast</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Send SMS messages to tourists for alerts and updates</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
          >
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Broadcast History</span>
            <span className="sm:hidden">History</span>
          </button>
        </div>
      </div>

      {!showHistory ? (
        <>
          {/* Broadcast Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Compose Broadcast Message</h2>
            
            <div className="space-y-6">
              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Content
                </label>
                <textarea
                  value={broadcastData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                  maxLength="160"
                />
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-gray-500">Maximum 160 characters for SMS</p>
                  <p className="text-xs text-gray-500">{broadcastData.message.length}/160</p>
                </div>
              </div>

              {/* Recipients and Priority Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients
                  </label>
                  <select
                    value={broadcastData.recipients}
                    onChange={(e) => handleInputChange('recipients', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Tourists</option>
                    <option value="online">Online Only</option>
                    <option value="selected">Selected Tourists</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={broadcastData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send Time
                  </label>
                  <select
                    value={broadcastData.scheduleType}
                    onChange={(e) => handleInputChange('scheduleType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="now">Send Now</option>
                    <option value="schedule">Schedule Later</option>
                  </select>
                </div>
              </div>

              {/* Tourist Selection (only shown when 'selected' is chosen) */}
              {broadcastData.recipients === 'selected' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Tourists ({selectedTourists.length} selected)
                  </label>
                  
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search tourists..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Tourist List */}
                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                    {filteredTourists.map((tourist) => (
                      <div key={tourist.id} className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                        <input
                          type="checkbox"
                          checked={selectedTourists.includes(tourist.id)}
                          onChange={() => handleTouristSelection(tourist.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{tourist.name}</p>
                              <p className="text-xs text-gray-500">{tourist.id} - {tourist.location}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              tourist.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {tourist.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary and Send Button */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{getRecipientCount()} recipients</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(broadcastData.priority)}`}>
                        {broadcastData.priority} priority
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSendBroadcast}
                    disabled={isSending || !broadcastData.message.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
                  >
                    {isSending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Broadcast
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Templates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: 'Weather Alert', message: 'Weather alert: Heavy rainfall expected. Please take shelter immediately and stay safe.' },
                { title: 'Safety Check', message: 'Safety check-in reminder: Please confirm your status and location.' },
                { title: 'Route Update', message: 'Route update: Alternative paths available. Check with local guides for directions.' },
                { title: 'Emergency Alert', message: 'Emergency alert: Please move to designated safe zones immediately.' },
                { title: 'Daily Reminder', message: 'Daily reminder: Stay hydrated, follow safety protocols, and enjoy your journey.' },
                { title: 'Location Check', message: 'Location check: Please share your current coordinates for safety monitoring.' }
              ].map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleInputChange('message', template.message)}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <p className="font-medium text-sm text-gray-900">{template.title}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{template.message}</p>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Broadcast History */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Broadcast History</h2>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export Report</span>
                <span className="sm:hidden">Export</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-hidden">
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {broadcastHistory.map((broadcast) => (
                    <tr key={broadcast.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 line-clamp-2">{broadcast.message}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {broadcast.recipientsCount?.toLocaleString() || broadcast.recipients?.toLocaleString() || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(broadcast.priority)}`}>
                          {broadcast.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(broadcast.status || 'delivered')}`}>
                          {broadcast.status || 'delivered'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {broadcast.deliveryRate || 98.5}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {broadcast.time || broadcast.sentAt || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 p-4">
              {broadcastHistory.map((broadcast) => (
                <div key={broadcast.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-gray-900 flex-1 pr-2">{broadcast.message}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(broadcast.priority)} whitespace-nowrap`}>
                      {broadcast.priority}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-500">Recipients:</span>
                      <span className="ml-1 text-gray-900 font-medium">{(broadcast.recipientsCount || broadcast.recipients || 0).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Delivery:</span>
                      <span className="ml-1 text-gray-900 font-medium">{broadcast.deliveryRate || 98.5}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(broadcast.status || 'delivered')}`}>
                        {broadcast.status || 'delivered'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Sent:</span>
                      <span className="ml-1 text-gray-900">{broadcast.time || broadcast.sentAt || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SMSBroadcast;
