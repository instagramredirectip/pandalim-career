import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UploadCloud, 
  ScanLine, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Mail, 
  Map, 
  Sparkles,
  Award
} from 'lucide-react';

export default function Home() {
  const steps = [
    {
      icon: <UploadCloud className="w-8 h-8 text-lime-600" />,
      title: "1. Upload Resume",
      description: "Simply upload your current resume in PDF format. No account required to get your basic ATS score."
    },
    {
      icon: <ScanLine className="w-8 h-8 text-lime-600" />,
      title: "2. AI ATS Scan",
      description: "Our advanced AI analyzes your resume against the job description, finding exactly what you are missing."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-lime-600" />,
      title: "3. Land Interviews",
      description: "Follow our AI critique to optimize your keywords, beat the resume robots, and get hired at top tier companies."
    }
  ];

  const features = [
    {
      title: "Deep ATS Keyword Matching",
      description: "Discover the exact skills and keywords you are missing that the Applicant Tracking System is looking for.",
      premium: false
    },
    {
      title: "Actionable AI Critique",
      description: "Get a punchy, straightforward paragraph explaining exactly why a recruiter might reject you and how to fix it.",
      premium: false
    },
    {
      title: "Premium Formatting & PDF Gen",
      description: "Unlock our premium tier to let AI automatically rewrite your bullet points and generate an ATS-friendly PDF.",
      premium: true
    },
    {
      title: "Cover Letter Generation",
      description: "Instantly generate a highly-targeted cover letter matched perfectly to the job description and your experience.",
      premium: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Inline styles for custom marquee animation without needing tailwind.config edits */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: 200%;
            animation: marquee 20s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* --- HERO SECTION --- */}
      <header className="relative overflow-hidden bg-white pt-24 pb-32 border-b border-gray-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-100 text-lime-800 font-semibold text-sm mb-6 animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Resume Optimization</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Beat the ATS. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">Land Your Dream Job.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop getting rejected by robots. PandaLime uses advanced AI to scan your resume, uncover missing keywords, and give you the exact steps to land interviews at top companies.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-lime-500/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Scan Resume for Free <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-500 font-medium sm:ml-4">No login required for basic scan!</p>
          </div>

        
        </div>

    <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
    <Link
  to="/wall" 
  className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ml-4 transition-all"
>
  🔥 View the Roast Wall
</Link>

    </div>

      </header>

      {/* --- MARQUEE / SOCIAL PROOF --- */}
      <section className="py-10 bg-gray-900 text-white overflow-hidden flex flex-col items-center">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 text-center">
          Helping candidates get hired at industry giants
        </p>
        <div className="w-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
          
          <div className="animate-marquee flex items-center gap-16 md:gap-32 px-8">
            {/* Repeated logos to create infinite scroll effect */}
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple', 'Spotify', 'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple', 'Spotify'].map((company, i) => (
              <span key={i} className="text-2xl md:text-4xl font-black text-gray-600 tracking-tighter hover:text-white transition-colors cursor-default">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (INFOGRAPHIC) --- */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How PandaLime Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Three simple steps to bypass the resume screening algorithms and get your application in front of real humans.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 relative group">
              <div className="w-16 h-16 bg-lime-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-100 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES & PREMIUM SHOWCASE --- */}
      <section className="bg-white py-24 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Everything you need to build a winning application.
              </h2>
              <p className="text-lg text-gray-600">
                Start with our free deep-dive ATS scan, then unlock premium features to let our AI do the heavy lifting for you.
              </p>
              
              <div className="space-y-6">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {feature.premium ? (
                        <Award className="w-6 h-6 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-lime-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        {feature.title} 
                        {feature.premium && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Premium</span>}
                      </h4>
                      <p className="text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 w-full bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-lime-500 text-white font-bold text-xs px-4 py-1 rounded-bl-xl shadow-md">
                Dashboard Preview
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 w-16 bg-lime-100 text-lime-600 font-bold flex items-center justify-center rounded-lg">88%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-full"></div>
                    <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-100 rounded w-4/6"></div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-70">
                   <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                   <div className="flex gap-2 flex-wrap">
                      <div className="h-6 w-20 bg-gray-100 rounded-full"></div>
                      <div className="h-6 w-24 bg-gray-100 rounded-full"></div>
                      <div className="h-6 w-16 bg-gray-100 rounded-full"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER & SEO LINKS --- */}
      <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white text-2xl font-black tracking-tight mb-4">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                 <Sparkles className="text-gray-900 w-5 h-5" />
              </div>
              PandaLime
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Helping job seekers worldwide beat the Applicant Tracking Systems and land their dream careers through the power of AI.
            </p>
            <div className="flex items-center gap-2 text-lime-400">
              <Mail className="w-5 h-5" />
              <a href="mailto:microapkdeveolper@gmail.com" className="hover:text-white transition-colors">
                microapkdeveolper@gmail.com
              </a>
            </div>
          </div>

        
{/* Legal & SEO */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal & Policies</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="hover:text-lime-400 transition-colors flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-lime-400 transition-colors flex items-center gap-2"><FileText className="w-4 h-4"/> Terms & Conditions</Link></li>
              <li><Link to="/contact" className="hover:text-lime-400 transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> Contact Us</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-lime-400 transition-colors flex items-center gap-2"><Map className="w-4 h-4"/> Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-lime-400 transition-colors flex items-center gap-2"><ScanLine className="w-4 h-4"/> Scan Resume</Link></li>
              <li><Link to="/sitemap" className="hover:text-lime-400 transition-colors flex items-center gap-2"><Map className="w-4 h-4"/> Sitemap</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="max-w-6xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} PandaLime Career. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}