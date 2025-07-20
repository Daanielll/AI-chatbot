import React, { useState } from 'react';
import { Building2, Save, ArrowLeft } from 'lucide-react';

interface CreateBusinessProps {
  onBack: () => void;
  onCreateBusiness: (business: any) => void;
}

const CreateBusiness: React.FC<CreateBusinessProps> = ({ onBack, onCreateBusiness }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    specialties: '',
    policies: '',
    address: '',
    phone: '',
    email: '',
    website: '',
  });

  const [businessHours, setBusinessHours] = useState({
    monday: { open: '09:00', close: '17:00', closed: false },
    tuesday: { open: '09:00', close: '17:00', closed: false },
    wednesday: { open: '09:00', close: '17:00', closed: false },
    thursday: { open: '09:00', close: '17:00', closed: false },
    friday: { open: '09:00', close: '17:00', closed: false },
    saturday: { open: '10:00', close: '15:00', closed: false },
    sunday: { open: '10:00', close: '15:00', closed: true },
  });

  const [pricing, setPricing] = useState({
    basePrice: '50',
    maxDiscount: '20',
    rushHourMultiplier: '1.5',
  });

  const categories = [
    'Beauty & Wellness',
    'Healthcare',
    'Fitness',
    'Restaurant',
    'Automotive',
    'Professional Services',
    'Home Services',
    'Education',
    'Entertainment',
    'Retail',
    'Other',
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBusiness = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      description: formData.description,
      specialties: formData.specialties,
      policies: formData.policies,
      contact: {
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
      },
      businessHours,
      pricing,
      createdAt: new Date().toISOString(),
    };

    onCreateBusiness(newBusiness);
  };

  const isFormValid = formData.name && formData.category && formData.description;

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Business</h1>
              <p className="text-gray-600">Set up your business profile and chatbot configuration</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your business name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="business@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://www.example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main St, City, State 12345"
                />
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe your business and what services you offer"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                <input
                  type="text"
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Hair cuts, coloring, styling, treatments"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Policies</label>
                <textarea
                  value={formData.policies}
                  onChange={(e) => setFormData({ ...formData, policies: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="e.g., Please arrive 10 minutes early for your appointment"
                />
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
            <div className="space-y-3">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700 capitalize">
                    {day}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!businessHours[day as keyof typeof businessHours].closed}
                      onChange={(e) => setBusinessHours({
                        ...businessHours,
                        [day]: { ...businessHours[day as keyof typeof businessHours], closed: !e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">Open</span>
                  </div>
                  {!businessHours[day as keyof typeof businessHours].closed && (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={businessHours[day as keyof typeof businessHours].open}
                        onChange={(e) => setBusinessHours({
                          ...businessHours,
                          [day]: { ...businessHours[day as keyof typeof businessHours], open: e.target.value }
                        })}
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={businessHours[day as keyof typeof businessHours].close}
                        onChange={(e) => setBusinessHours({
                          ...businessHours,
                          [day]: { ...businessHours[day as keyof typeof businessHours], close: e.target.value }
                        })}
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Initial Pricing Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Price ($)</label>
                <input
                  type="number"
                  value={pricing.basePrice}
                  onChange={(e) => setPricing({ ...pricing, basePrice: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Discount (%)</label>
                <input
                  type="number"
                  value={pricing.maxDiscount}
                  onChange={(e) => setPricing({ ...pricing, maxDiscount: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rush Hour Multiplier</label>
                <input
                  type="number"
                  step="0.1"
                  value={pricing.rushHourMultiplier}
                  onChange={(e) => setPricing({ ...pricing, rushHourMultiplier: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-4 w-4" />
              Create Business
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBusiness;