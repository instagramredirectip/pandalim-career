import React from 'react';
import { Mail, MessageSquare, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-lime-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Info Card */}
          <div className="bg-gray-900 text-white rounded-3xl p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
            
            <h1 className="text-3xl font-extrabold mb-4 relative z-10">Get in Touch</h1>
            <p className="text-gray-400 mb-12 relative z-10">Have questions about your ATS report, billing, or want to report a bug? We're here to help.</p>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-lime-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Support</p>
                  <a href="mailto:microapkdeveolper@gmail.com" className="font-medium hover:text-lime-400 transition-colors">
                    microapkdeveolper@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-lime-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Response Time</p>
                  <p className="font-medium">Under 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-lime-500" /> Send a Message
            </h2>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent! We will reply via email shortly.'); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input type="text" required className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" required className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea required rows="4" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none resize-none transition-all" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 rounded-xl transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}