import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  HelpCircle, 
  Send,
  CheckCircle2,
  FileText,
  MapPin,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';

export default function Contact() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Support', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const departments = [
    {
      title: "Customer Support & ATS Reports",
      email: "microapkdeveolper@gmail.com",
      sla: "Within 12–24 Hours",
      desc: "For inquiries regarding PDF report downloads, ATS scoring questions, or technical verification."
    },
    {
      title: "Billing & Payment Receipts",
      email: "microapkdeveolper@gmail.com",
      sla: "Within 6–12 Hours (Priority)",
      desc: "For Razorpay payment receipts, invoice requests, or transaction verification."
    },
    {
      title: "Editorial & Content Partnerships",
      email: "microapkdeveolper@gmail.com",
      sla: "Within 48 Hours",
      desc: "For guest contributions, career guide corrections, or university recruitment partnerships."
    },
    {
      title: "Privacy & Data Compliance",
      email: "microapkdeveolper@gmail.com",
      sla: "Within 24 Hours",
      desc: "For GDPR, DPDP compliance inquiries, or data deletion requests."
    }
  ];

  const faqs = [
    {
      q: "How fast do you respond to customer support inquiries?",
      a: "Our global technical support desk monitors tickets 7 days a week. Most general inquiries receive a comprehensive response within 12 to 24 hours, while payment issues are prioritized within 6 to 12 hours."
    },
    {
      q: "What should I do if my payment succeeded but my full ATS report didn't unlock?",
      a: "If your browser refreshed or network dropped during checkout, email us with your Razorpay payment ID or transaction screenshot. Our team will verify the payment log in our database and send your unlocked PDF report immediately."
    },
    {
      q: "Can I request deletion of my uploaded resume data?",
      a: "Yes. PandaLime processes resumes strictly in memory to generate your scores and does not sell or distribute candidate data. However, if you would like any saved reports removed from our database, contact us with your report ID or email."
    },
    {
      q: "Do you offer corporate or university bulk ATS licenses?",
      a: "Yes! We work with university placement cells and career bootcamps. Reach out to our partnerships team for custom volume licenses and API integration."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact PandaLime Career Support & Editorial Team",
    "description": "Have questions about your ATS resume report, payment receipts, or feedback? Get in touch with the PandaLime support and engineering team.",
    "url": "https://www.pandalime.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "PandaLime Career Services",
      "email": "microapkdeveolper@gmail.com",
      "url": "https://www.pandalime.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "email": "microapkdeveolper@gmail.com",
          "contactType": "customer support",
          "availableLanguage": ["English", "Hindi"]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-between">
      <SEOHead 
        title="Contact PandaLime Support, Career Services & Partnerships | PandaLime"
        description="Contact PandaLime for ATS report support, billing assistance, privacy requests, and editorial partnerships. Fast 24-hour turnaround."
        canonical="/contact"
        jsonLd={jsonLd}
      />

      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-lime-50 text-lime-900 font-bold text-xs sm:text-sm border border-lime-200">
              <Mail className="w-4 h-4 text-lime-600" />
              <span>We're Here to Help</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-950 tracking-tight">
              Get in Touch with PandaLime
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Have questions about your ATS resume score, payment receipts, or want to suggest a new career tool? Our dedicated team is ready to assist you.
            </p>
          </div>

          {/* Grid Layout: Contact Info & Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Info Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary Contact Card */}
              <div className="bg-gray-950 text-white rounded-2xl p-8 border border-gray-800 shadow-xl relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500 rounded-full blur-3xl opacity-15 -translate-y-1/2 translate-x-1/3" />
                
                <div className="relative z-10 space-y-2">
                  <h2 className="text-xl font-extrabold text-white">Direct Communication</h2>
                  <p className="text-xs text-gray-400">
                    Reach our technical and editorial desk directly for fast assistance.
                  </p>
                </div>

                <div className="relative z-10 space-y-4 text-sm">
                  <div className="flex items-start gap-3.5 p-3 rounded-xl bg-gray-900 border border-gray-800">
                    <Mail className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">Primary Support Email</p>
                      <a href="mailto:microapkdeveolper@gmail.com" className="font-bold text-white hover:text-lime-400 transition-colors">
                        microapkdeveolper@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3 rounded-xl bg-gray-900 border border-gray-800">
                    <Clock className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">Response SLA</p>
                      <p className="font-bold text-white">Under 24 hours (7 Days a Week)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3 rounded-xl bg-gray-900 border border-gray-800">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">Data Privacy Guarantee</p>
                      <p className="text-xs text-gray-300">Resumes and personal info are strictly protected.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Hours & Presence */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-gray-950 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-lime-600" /> Global Operations Desk
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  PandaLime provides cloud-native ATS resume calibration and developer portfolio hosting to candidates in over 45 countries, with localized support across India, North America, Europe, and Asia-Pacific.
                </p>
              </div>

            </div>

            {/* Right Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-xs">
              <h2 className="text-2xl font-bold text-gray-950 mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-lime-600" /> Send a Message
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                Fill out the form below and our team will get back to you with detailed solutions.
              </p>

              {submitted ? (
                <div className="p-8 bg-lime-50 border border-lime-200 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 bg-lime-500 text-gray-950 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-950">Thank You! Message Received</h3>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    We have received your message regarding "{formData.subject}". Our support team will reply to <strong>{formData.email}</strong> within 12–24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all" 
                        placeholder="Priya Sharma" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all" 
                        placeholder="priya@example.com" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Subject / Department
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all"
                    >
                      <option value="Customer Support">ATS Report & Scanner Support</option>
                      <option value="Payment Issue">Billing & Razorpay Payment Verification</option>
                      <option value="Portfolio Studio">AI Portfolio Website Assistance</option>
                      <option value="Feature Suggestion">Feature Suggestion / Tool Feedback</option>
                      <option value="Partnership">University / Corporate Partnership</option>
                      <option value="Privacy Request">Data Deletion / Privacy Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea 
                      required 
                      rows="5" 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none resize-none transition-all" 
                      placeholder="Please describe your question or issue in detail..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-lime-500 hover:bg-lime-400 active:scale-[0.99] text-gray-950 font-extrabold py-3.5 rounded-xl transition-all shadow-md shadow-lime-500/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Support</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Department Breakdown Section */}
          <section className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-xs space-y-6">
            <h2 className="text-2xl font-bold text-gray-950 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-lime-600" /> Department Directory & SLAs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept, i) => (
                <div key={i} className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-gray-900">{dept.title}</h3>
                    <span className="text-[10px] bg-lime-100 text-lime-800 font-bold px-2 py-0.5 rounded">
                      {dept.sla}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{dept.desc}</p>
                  <p className="text-xs font-semibold text-lime-700">{dept.email}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Support FAQs */}
          <section className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-xs space-y-6">
            <h2 className="text-2xl font-bold text-gray-950 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-lime-600" /> Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-bold text-sm text-gray-900">{faq.q}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}