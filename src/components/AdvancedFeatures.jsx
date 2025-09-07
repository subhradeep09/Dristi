import React from 'react';
import { Monitor, Smartphone, Cpu, Globe } from 'lucide-react';
import FeatureCard from './FeatureCard';

const AdvancedFeatures = () => {
  const features = [
    {
      icon: <Monitor className="w-8 h-8 text-purple-600" />,
      title: "Digital Tourist ID Generation",
      description: "Advanced biometric verification and secure digital identity creation for seamless travel experiences with multi-layer authentication and fraud prevention systems.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%231a1a2e' width='400' height='300'/%3E%3Ctext fill='%236366f1' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='16'%3EDigital ID Interface%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-600" />,
      title: "Smart Mobile Application",
      description: "Feature-rich mobile app with geofencing, offline maps, emergency contacts, and real-time safety notifications for comprehensive tourist protection.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23dc2626' width='400' height='300'/%3E%3Ctext fill='white' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='16'%3EMobile App Interface%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-600" />,
      title: "AI-Based Anomaly Detection",
      description: "Machine learning algorithms analyze behavioral patterns and environmental data to predict and prevent potential safety threats before they occur.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23db2777' width='400' height='300'/%3E%3Ctext fill='white' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='16'%3EAI Brain Network%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <Monitor className="w-8 h-8 text-purple-600" />,
      title: "Command & Control Dashboard",
      description: "Centralized monitoring system for authorities with real-time analytics, incident management, and coordinated emergency response capabilities.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%232563eb' width='400' height='300'/%3E%3Ctext fill='white' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='16'%3EControl Dashboard%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "IoT Integration",
      description: "Connected network of smart sensors, cameras, and devices throughout tourist areas providing comprehensive environmental monitoring and safety coverage.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23ea580c' width='400' height='300'/%3E%3Ctext fill='white' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='16'%3EIoT Network%3C/text%3E%3C/svg%3E"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Multilingual Support",
      description: "AI-powered translation services and cultural guidance system supporting over 50 languages with voice recognition and real-time communication assistance.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%236366f1' width='400' height='300'/%3E%3Ctext fill='white' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='16'%3EGlobal Map Interface%3C/text%3E%3C/svg%3E"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Advanced Safety Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology stack designed to enhance tourist safety through intelligent 
            monitoring and rapid response systems.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;