import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';

export default function PrivacyPolicy() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "PandaLime Career Privacy Policy & Data Protection",
    "description": "Comprehensive Privacy Policy detailing how PandaLime collects, processes, and protects user data, resume PDFs, and payment information in accordance with GDPR, CCPA, and DPDP.",
    "url": "https://www.pandalime.com/privacy-policy"
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-between">
      <SEOHead 
        title="Privacy Policy & Data Protection Guidelines | PandaLime"
        description="Learn how PandaLime protects your personal information, resume documents, and privacy during AI resume analysis and developer portfolio hosting."
        canonical="/privacy-policy"
        jsonLd={jsonLd}
      />

      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-8 sm:p-12 space-y-8">
            
            {/* Header */}
            <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
              <div className="w-12 h-12 bg-lime-100 text-lime-700 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                  Privacy Policy & Data Protection
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Effective Date: March 1, 2026 • Last Updated: March 2026
                </p>
              </div>
            </div>

            {/* Intro */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              At <strong>PandaLime Career Services</strong> ("PandaLime", "we", "our", or "us"), accessible via <strong>https://www.pandalime.com</strong>, we are committed to upholding the highest standards of data privacy, confidentiality, and transparency. This Privacy Policy outlines the types of personal and document information we collect, how that information is processed, the technical safeguards in place, and your rights under global privacy regulations including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and India's Digital Personal Data Protection Act (DPDP).
            </p>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2">
                1. Information We Collect
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                We collect information directly provided by you during interaction with our resume calibration and portfolio builder features:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li><strong>Resume Documents & Text:</strong> PDF and text documents uploaded for Applicant Tracking System (ATS) parsing and keyword gap analysis.</li>
                <li><strong>Job Description Text:</strong> Job postings and requisitions submitted to calculate match scores and missing competencies.</li>
                <li><strong>Account & Authentication Data:</strong> Email addresses submitted for passwordless One-Time Password (OTP) verification and receipt delivery.</li>
                <li><strong>Portfolio Website Content:</strong> Public bios, work histories, project URLs, and social profile links provided during portfolio creation.</li>
                <li><strong>Technical & Log Data:</strong> Internet Protocol (IP) addresses, browser user agent strings, and request timestamps utilized strictly for rate-limiting, security defense, and automated bot prevention.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950">
                2. How We Process and Use Your Information
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Your data is processed strictly for the following legitimate purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>To extract resume entities, analyze keyword match percentages, and generate customized ATS critiques.</li>
                <li>To rewrite bullet points into Google X-Y-Z formatted accomplishment statements.</li>
                <li>To generate and host public developer and cybersecurity portfolio pages at designated custom slugs (e.g., <code>pandalime.com/p/:slug</code>).</li>
                <li>To deliver transaction receipts and authenticate user access via secure OTP emails.</li>
                <li>To defend our servers against denial-of-service, automated scraping, and API quota abuse.</li>
              </ul>
              <div className="p-4 bg-lime-50/70 border-l-4 border-lime-500 rounded-r-xl text-xs sm:text-sm text-lime-950 font-medium">
                <strong>Zero-Data Monetization Guarantee:</strong> We never sell, rent, monetize, or disclose your uploaded resume documents, contact information, or portfolio drafts to third-party recruiters, advertisers, or data aggregators.
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950">
                3. Third-Party Service Providers
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                We partner with select, enterprise-grade cloud vendors who operate under strict Data Processing Agreements (DPAs):
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li><strong>AI Inference Engines (Google Gemini & Groq):</strong> Used for natural language parsing and STAR bullet generation under strict zero-retention API policies.</li>
                <li><strong>Razorpay:</strong> Payment gateway for secure order creation and transaction processing. PandaLime never handles, collects, or stores raw credit card numbers or UPI PINs.</li>
                <li><strong>Neon PostgreSQL:</strong> Encrypted relational database utilized for storing anonymized match reports, portfolio configurations, and OTP nonces.</li>
                <li><strong>Google Analytics & AdSense:</strong> Used with Google Consent Mode v2 for aggregated web traffic analytics and authorized contextual advertising.</li>
                <li><strong>Resend:</strong> Transactional email service for delivering single-use OTP authentication codes.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950">
                4. Cookies, Local Storage & Advertising Disclosures
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                PandaLime uses essential browser cookies and local storage tokens to preserve your active session, portfolio editor drafts, and theme preferences. Third-party partners (such as Google AdSense) may utilize cookies to serve contextual advertisements based on prior visits to our site.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                You can manage your consent preferences at any time using our on-site Cookie Consent banner or by configuring your browser settings to reject third-party tracking cookies.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950">
                5. Data Retention, Security & Deletion Rights
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                We implement transport-layer 256-bit SSL encryption, magic-byte upload validation, cryptographic proof-of-human challenges, and database row-level security. 
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Under GDPR, CCPA, and DPDP, you possess the absolute right to access, rectify, export, or permanently erase your data. To request immediate deletion of any saved reports, account records, or public portfolios, email our Data Protection Officer at: <a href="mailto:microapkdeveolper@gmail.com" className="text-lime-700 font-bold hover:underline">microapkdeveolper@gmail.com</a>.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}