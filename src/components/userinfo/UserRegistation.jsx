import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, FileText, Calendar, MapPin } from "lucide-react";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    mobileNumber: "",
    email: "",
    documentType: "Aadhaar",
    aadhaarNumber: "",
    startDate: "",
    endDate: "",
    plannedLocations: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonString = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `user-registration-${formData.aadhaarNumber || Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert("Registration successful! Your details have been downloaded as a JSON file.");
    navigate("/");
  };
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

        <form onSubmit={handleSubmit} className="space-y-8">
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
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter your complete name"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age *
                </label>
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="Enter your age"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                  <option value="">Select Gender</option>
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
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Document Type *
                </label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                  <option value="">Select Document Type</option>
                  <option>Aadhaar</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Aadhaar Number *
                </label>
                <input
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter Aadhaar number"
                  required
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
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date *
                </label>
                <input
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Planned Locations *
                </label>
                <textarea
                  name="plannedLocations"
                  value={formData.plannedLocations}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe your planned destinations and activities..."
                  required
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
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Full name of emergency contact"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact Phone *
                </label>
                <input
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleInputChange}
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center space-y-4">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:opacity-90 transition"
            >
              Submit Registration
            </button>
            
            {/* Back to Home */}
            <div>
              <button 
                type="button"
                onClick={() => navigate('/')}
                className="text-blue-600 hover:underline text-sm"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
