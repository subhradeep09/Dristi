import React from "react";
import { User, Phone, Mail, FileText, Calendar, MapPin } from "lucide-react";

const UserRegistration = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-700">
            Registration Form
          </h1>
          <p className="text-gray-500">
            Complete your registration with secure and encrypted data processing
          </p>
        </div>

        <form className="space-y-8">
          {/* Personal Information */}
          <div>
            <h2 className="flex items-center text-lg font-semibold text-blue-700 mb-4">
              <User className="mr-2 text-blue-600" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your complete name"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age *
                </label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender *
                </label>
                <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Contact & Identity */}
          <div>
            <h2 className="flex items-center text-lg font-semibold text-purple-700 mb-4">
              <Mail className="mr-2 text-purple-600" /> Contact & Identity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Document Type *
                </label>
                <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                  <option>Select Document Type</option>
                  <option>Aadhaar</option>
                  <option>Passport</option>
                  <option>Voter ID</option>
                  <option>Driving License</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Aadhaar Number *
                </label>
                <input
                  type="text"
                  placeholder="Enter Aadhaar number"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Trip Itinerary */}
          <div>
            <h2 className="flex items-center text-lg font-semibold text-green-700 mb-4">
              <MapPin className="mr-2 text-green-600" /> Trip Itinerary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date *
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date *
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Planned Locations *
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe your planned destinations and activities..."
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                ></textarea>
                <p className="text-xs text-gray-400 text-right">0/500</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Emergency Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact Name *
                </label>
                <input
                  type="text"
                  placeholder="Full name of emergency contact"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact Phone *
                </label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:opacity-90 transition"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
