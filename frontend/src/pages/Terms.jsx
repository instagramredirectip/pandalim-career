import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-lime-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
            <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Terms & Conditions</h1>
              <p className="text-gray-500 mt-1">Effective Date: March 2026</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using PandaLime Career, you agree to be bound by these Terms. If you do not agree to all the terms, you may not access the website or use any of our AI services.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Service Description & Disclaimer</h2>
              <p>PandaLime provides AI-assisted resume analysis. <strong>Disclaimer:</strong> We do not guarantee job placement, interviews, or hiring outcomes. The ATS score is an AI-generated estimate based on industry standards and may not reflect the exact scoring of specific proprietary corporate ATS software.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Payments and Refunds</h2>
              <p>Our premium reports and API credits are digital goods. Once a premium scan is initiated and the report is delivered to your dashboard, <strong>the ₹99 payment is non-refundable</strong>. If you experience a technical failure during generation, please contact support for a credit refund.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Acceptable Use</h2>
              <p>You agree not to abuse our API, attempt to reverse-engineer the scoring system, or upload malicious files disguised as PDFs. Violation of this will result in an immediate and permanent IP ban without refund.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}