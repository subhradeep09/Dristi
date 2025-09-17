import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BroadcastProvider } from './contexts/BroadcastContext';
import { LocationProvider } from './contexts/LocationContext';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { DataProvider } from './contexts/DataContext';
import LandingPage from './components/LandingPage';
import AdminLogin from './components/adminlogin/AdminLogin';
import Dashboard from './components/dashboard/Dashboard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import UserRegistration from './components/userinfo/UserRegistation';
import TouristActivity from './components/dashboard/TouristActivity';
import SOSHits from './components/dashboard/SOSHits';
import Heatmap from './components/dashboard/Heatmap';
import SMSBroadcast from './components/dashboard/SMSBroadcast';
import GeoFencing from './components/dashboard/GeoFencing';

const App = () => {
  return (
    <LocationProvider>
      <BroadcastProvider>
        <WebSocketProvider>
          <DataProvider>
            <Router>
          <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* User Registration */}
        <Route path="/register" element={<UserRegistration />} />
        
        {/* Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            <DashboardLayout currentPage="dashboard">
              <Dashboard />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/dashboard/tourist-activity" 
          element={
            <DashboardLayout currentPage="tourist-activity">
              <TouristActivity />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/dashboard/sos-hits" 
          element={
            <DashboardLayout currentPage="sos-hits">
              <SOSHits />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/dashboard/heatmap" 
          element={
            <DashboardLayout currentPage="heatmap">
              <Heatmap />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/dashboard/sms-broadcast" 
          element={
            <DashboardLayout currentPage="sms-broadcast">
              <SMSBroadcast />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/dashboard/geo-fencing" 
          element={
            <DashboardLayout currentPage="geo-fencing">
              <GeoFencing />
            </DashboardLayout>
          } 
        />
      </Routes>
      </Router>
      </DataProvider>
    </WebSocketProvider>
    </BroadcastProvider>
    </LocationProvider>
  );
};

export default App;