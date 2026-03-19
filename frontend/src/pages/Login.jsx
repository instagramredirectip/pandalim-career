import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (data.success) {
        setStep(2);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Server error. Is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard'); // We will build this page next
      } else {
        setError(data.error ||
 'Invalid OTP code');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-lime-100 text-lime-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            {step === 1? <Mail size={24} /> : <CheckCircle size={24} />}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 1? 'Welcome to PandaLime' : 'Check your email'}
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            {step === 1 
             ? 'Enter your email to get a secure login code.' 
              : `We sent a 6-digit code to ${email}`}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        {step === 1? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
            >
              {loading? <Loader2 className="animate-spin" size={20} /> : 'Send Login Code'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">6-Digit Code</label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all text-center text-2xl tracking-widest font-mono"
                placeholder="000000"
              />
            </div>
            <button
              type="submit"
              disabled={loading || otp.length!== 6}
              className="w-full flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
            >
              {loading? <Loader2 className="animate-spin" size={20} /> : 'Verify & Login'}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-500 hover:text-gray-900 mt-4"
            >
              Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}