import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-lime-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
            <div className="w-12 h-12 bg-lime-100 text-lime-600 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-500 mt-1">Last updated: March 2026</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
              <p>When you use PandaLime Career, we collect information you provide directly to us, including your email address (for account creation and OTP delivery), Resume PDFs, and Target Job Descriptions. We also collect basic usage data to improve our AI models.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Data</h2>
              <p>Your resume data is processed strictly to generate your ATS match score and improvement suggestions. <strong>We do not sell your personal data or resume contents to third-party recruiters or data brokers.</strong></p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Third-Party Services</h2>
              <p>We utilize trusted third-party services to operate our platform:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Google Gemini AI:</strong> Used securely to process and analyze text from your resume.</li>
                <li><strong>Razorpay:</strong> Handles all payment processing. We do not store your credit card or UPI details on our servers.</li>
                <li><strong>Resend:</strong> Used for secure OTP email delivery.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Retention & Deletion</h2>
              <p>You can request the deletion of your account and all associated resume reports at any time by contacting our support team at <a href="mailto:microapkdeveolper@gmail.com" className="text-lime-600 font-medium hover:underline">microapkdeveolper@gmail.com</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}