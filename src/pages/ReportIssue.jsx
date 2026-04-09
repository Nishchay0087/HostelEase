import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, UploadCloud, Clock, Send, Camera } from 'lucide-react';

const CATEGORIES = [
  'Electrical', 'Plumbing', 'Cleaning', 'WiFi', 'Carpentry', 'Other'
];

const TIME_SLOTS = [
  '09:00 AM - 12:00 PM',
  '12:00 PM - 03:00 PM',
  '03:00 PM - 06:00 PM',
  '06:00 PM - 09:00 PM'
];

function ReportIssue() {
  const navigate = useNavigate();
  const { addComplaint } = useApp();
  
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    timeSlot: '',
    urgency: 'low',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.description) return;
    
    addComplaint(formData);
    navigate('/track');
  };

  return (
    <div className="pb-safe bg-white min-h-screen animate-slide-up">
      {/* Header */}
      <div className="glass-header px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Report Issue</h1>
      </div>

      <div className="p-5">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Issue Category *</label>
            <div className="grid grid-cols-3 gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({...formData, category: cat})}
                  className={`py-2 px-1 text-xs font-medium rounded-xl border transition-all ${
                    formData.category === cat 
                      ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm' 
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Description *</label>
            <textarea
              required
              rows={4}
              placeholder="Describe the issue in detail..."
              className="input-field resize-none text-sm"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Add Photo (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden">
              {formData.image ? (
                <div className="flex flex-col items-center">
                  <Camera size={32} className="text-primary-500 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Image attached</span>
                  <button 
                    type="button" 
                    onClick={(e) => { e.stopPropagation(); setFormData({...formData, image: null}); }}
                    className="text-xs text-red-500 font-medium mt-1"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <UploadCloud size={32} className="text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">Tap to upload a photo</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // Just mock it
                        setFormData({...formData, image: URL.createObjectURL(e.target.files[0])});
                      }
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Preferred Time Slot</label>
            <div className="grid grid-cols-2 gap-3">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setFormData({...formData, timeSlot: slot})}
                  className={`py-3 px-2 text-xs font-medium rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    formData.timeSlot === slot 
                      ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm' 
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Clock size={14} />
                  {slot.split(' - ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
            <div>
              <p className="text-sm font-bold text-red-900">Mark as Urgent?</p>
              <p className="text-xs text-red-700 mt-0.5">Only for critical issues preventing daily activities.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={formData.urgency === 'high'}
                onChange={(e) => setFormData({...formData, urgency: e.target.checked ? 'high' : 'low'})}
              />
              <div className="w-11 h-6 bg-red-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className="w-full btn-primary flex justify-center items-center gap-2 mt-8 mb-4 h-14 text-lg"
            disabled={!formData.category || !formData.description}
          >
            File Complaint <Send size={20} />
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;
