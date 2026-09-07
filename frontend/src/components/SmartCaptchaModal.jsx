import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, X, CheckCircle2, Lock } from 'lucide-react';
import { apiRequest } from '../config/api';

export default function SmartCaptchaModal({ isOpen, onClose, onVerify, title = "Security Verification" }) {
  const [challenge, setChallenge] = useState(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const fetchChallenge = async () => {
      setLoading(true);
      setError('');
      setAnswer('');
      setIsSuccess(false);

      try {
        const res = await apiRequest('/api/security/captcha-challenge');
        if (res && res.ok) {
          const data = await res.json();
          if (data.success && data.challenge && isMounted) {
            setChallenge(data.challenge);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Fallback to local client challenge
      }

      if (isMounted) {
        const num1 = Math.floor(Math.random() * 8) + 2;
        const num2 = Math.floor(Math.random() * 8) + 2;
        setChallenge({
          token: `client_${Date.now()}_${btoa(`${num1 + num2}`)}`,
          question: `What is ${num1} + ${num2}?`,
          expectedAnswer: `${num1 + num2}`,
          type: 'math'
        });
        setLoading(false);
      }
    };

    fetchChallenge();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const loadChallenge = async () => {
    setLoading(true);
    setError('');
    setAnswer('');
    
    try {
      const res = await apiRequest('/api/security/captcha-challenge');
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.challenge) {
          setChallenge(data.challenge);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fallback
    }

    const num1 = Math.floor(Math.random() * 8) + 2;
    const num2 = Math.floor(Math.random() * 8) + 2;
    setChallenge({
      token: `client_${Date.now()}_${btoa(`${num1 + num2}`)}`,
      question: `What is ${num1} + ${num2}?`,
      expectedAnswer: `${num1 + num2}`,
      type: 'math'
    });
    setLoading(false);
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      setError('Please enter the answer.');
      return;
    }

    // If client fallback challenge, verify locally
    if (challenge.expectedAnswer && answer.trim() !== challenge.expectedAnswer) {
      setError('Incorrect answer. Please try again.');
      setAnswer('');
      loadChallenge();
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      onVerify({
        captchaToken: challenge.token,
        captchaAnswer: answer.trim()
      });
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-sm bg-gray-950 text-gray-100 rounded-2xl border border-gray-800 shadow-2xl p-5 sm:p-6 z-10 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{title}</h3>
              <p className="text-[11px] text-gray-400">Verify to prevent automated abuse</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Challenge Body */}
        {loading ? (
          <div className="py-8 flex flex-col items-center justify-center gap-2 text-gray-400">
            <RefreshCw className="w-5 h-5 animate-spin text-lime-400" />
            <span className="text-xs">Generating secure challenge...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-lime-400" /> Challenge
                </span>
                <button
                  type="button"
                  onClick={loadChallenge}
                  className="text-[11px] text-lime-400 hover:text-lime-300 flex items-center gap-1 transition-colors"
                  title="Refresh challenge"
                >
                  <RefreshCw className="w-3 h-3" /> New challenge
                </button>
              </div>

              <div className="py-2 text-center bg-gray-950/80 rounded-lg border border-gray-800/80 select-none">
                <span className="text-lg font-mono font-black tracking-widest text-lime-400">
                  {challenge?.question || 'What is 5 + 3?'}
                </span>
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-900/50 rounded-lg p-2 text-center font-medium">
                {error}
              </p>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Enter Answer:
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                autoFocus
                placeholder="Type result..."
                className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-700 focus:border-lime-500 focus:ring-1 focus:ring-lime-500 text-white rounded-xl text-center text-base font-mono outline-none transition-all placeholder:text-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSuccess}
              className="w-full py-3 bg-lime-500 hover:bg-lime-400 active:scale-[0.98] text-gray-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20 transition-all cursor-pointer disabled:opacity-80"
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-gray-950" />
                  <span>Verified!</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Proceed</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
