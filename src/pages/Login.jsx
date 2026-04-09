import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, ArrowRight, ShieldCheck } from 'lucide-react';

function Login() {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email.includes('@vitstudent.ac.in') && !email.includes('@vitwarden.ac.in') && !email.includes('@vitstaff.ac.in')) {
      setError('Please enter a valid institution email');
      return;
    }
    setError('');
    // Mock OTP logic
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }
    setError('');
    const success = login(email);
    if (!success) {
      setError('Invalid email domain. Try ending with @vitstudent.ac.in');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8 max-w-lg mx-auto relative md:border-x md:border-gray-200">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-slide-up">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 transform rotate-3">
            <Building2 size={36} className="text-white -rotate-3" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
          HostelEase
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Smart Hostel Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-fade-in relative z-10">
        <div className="card px-6 py-8 sm:px-10">
          
          {error && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 flex items-center gap-2">
              <ShieldCheck size={18} />
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Institution Email
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <input
                    type="email"
                    id="email"
                    className="input-field px-4 py-3"
                    placeholder="Your email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="w-full flex justify-center items-center gap-2 btn-primary">
                Send OTP <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6 animate-slide-up">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="otp"
                    className="input-field text-center py-3 text-lg tracking-widest"
                    placeholder="••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength={4}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 text-center">Use any 4 digits to verify</p>
              </div>

              <button type="submit" className="w-full flex justify-center items-center gap-2 btn-primary">
                Verify & Login
              </button>
              
              <button 
                type="button" 
                onClick={() => { setStep(1); setOtp(''); }}
                className="w-full text-sm text-primary-600 font-medium text-center mt-4"
              >
                Change Email Address
              </button>
            </form>
          )}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed top-0 inset-x-0 h-64 bg-gradient-to-br from-primary-50 to-white -z-10" />
    </div>
  );
}

export default Login;
