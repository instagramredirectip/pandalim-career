import React, { useState } from 'react';
import { FileText, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';

export default function Terms() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "PandaLime Career Terms of Service & User Agreement",
    "description": "Terms of Service, digital product refund policies, acceptable use standards, and user agreements for PandaLime ATS Resume Scanner & Portfolio Studio.",
    "url": "https://www.pandalime.com/terms"
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-between">
      <SEOHead 
        title="Terms of Service & User Agreement | PandaLime"
        description="Review the Terms of Service, user rights, digital product refund policies, and acceptable use guidelines for PandaLime."
        canonical="/terms"
        jsonLd={jsonLd}
      />

      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-8 sm:p-12 space-y-8">
            
            {/* Header */}
            <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
              <div className="w-12 h-12 bg-gray-100 text-gray-900 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                  Terms of Service
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Effective Date: March 1, 2026 • Last Updated: March 2026
                </p>
              </div>
            </div>

            {/* Intro */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Welcome to <strong>PandaLime Career Services</strong> ("PandaLime"). By accessing or utilizing our website, application APIs, free ATS scanning utilities, portfolio builder platform, and digital career reports, you agree to be bound by the following Terms of Service ("Terms"). Please read these Terms thoroughly before using our services.
            </p>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950">
                1. Acceptance of Terms & Eligibility
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                By creating an account, uploading a resume, generating a portfolio, or making a digital purchase, you affirm that you are at least 16 years of age (or have reached the age of digital consent in your jurisdiction) and possess full legal capacity to enter into these Terms.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950">
                2. Scope of Services & Career Outcome Disclaimer
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                PandaLime provides automated Applicant Tracking System (ATS) document simulation, natural language keyword matching, STAR accomplishment rephrasing, and hosted portfolio website generation.
              </p>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2">
                <p className="font-bold text-gray-950 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Career Outcome Disclaimer:
                </p>
                <p>
                  While PandaLime utilizes industry-standard parsing rubrics calibrated against enterprise platforms (Workday, Greenhouse, Taleo), we do not guarantee interview invitations, job placement, corporate hiring decisions, or specific employment outcomes. Hiring decisions remain the sole discretion of third-party employers.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950">
                3. User Content & Intellectual Property Ownership
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>You retain 100% ownership of your content.</strong> All text, resume descriptions, project links, portfolios, and personal assets submitted remain your intellectual property. You grant PandaLime a non-exclusive, worldwide, royalty-free license solely to host, display, and process your content as required to deliver our services.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950">
                4. Payments, Pricing & Refund Policy for Digital Goods
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Access to our baseline ATS scanner and community tools is free. Premium report unlocks and expedited AI processing are delivered as instant digital goods through our authorized payment partner, Razorpay.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>All prices are stated clearly in Indian Rupees (₹) and US Dollars ($) inclusive of applicable taxes.</li>
                <li>Because detailed digital analysis reports and AI bullet rewrites are generated and rendered immediately upon payment verification, <strong>digital report purchases are non-refundable once unlocked</strong>.</li>
                <li>In the event of an unresolvable server failure or corrupted report generation, our support team will promptly issue a replacement scan credit or full refund upon verification of transaction logs.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950">
                5. Acceptable Use Policy & Abuse Restrictions
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Users are strictly prohibited from engaging in the following activities:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>Deploying automated scrapers, bots, or scripts against our API endpoints without explicit written consent.</li>
                <li>Attempting to upload executable binaries, shell scripts, or malware disguised as PDF files.</li>
                <li>Publishing illegal, defamatory, infringing, or malicious content on hosted portfolio pages.</li>
                <li>Attempting to circumvent our cryptographic Proof-of-Human verification or sliding-window rate limiters.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950">
                6. Contact & Dispute Resolution
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                If you have questions regarding these Terms or need assistance with a transaction, please contact our legal and support desk at <a href="mailto:microapkdeveolper@gmail.com" className="text-lime-700 font-bold hover:underline">microapkdeveolper@gmail.com</a>.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}