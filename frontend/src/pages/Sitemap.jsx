import React, { useState } from 'react';
import { 
  Map, 
  ArrowRight, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Globe,
  BookOpen,
  Wrench,
  Flame,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';
import { ROLES, COMPANIES, SPECIAL_NICHES } from '../data/pseoData';
import { BLOG_POSTS } from '../data/blogPosts';
import { prefetchRoute } from '../utils/prefetch';

export default function Sitemap() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainPages = [
    { name: "Home - Free AI Resume Scanner & Portfolio Studio", path: "/" },
    { name: "AI Resume Scanner Application", path: "/dashboard" },
    { name: "AI Developer Portfolio Builder Studio", path: "/portfolio-builder" },
    { name: "Community Resume Roast Wall", path: "/roast-wall" },
    { name: "Career Guides & Editorial Blog Hub", path: "/blog" },
    { name: "User Account & Login", path: "/login" }
  ];

  const freeTools = [
    { name: "Free Career Tools Suite Hub", path: "/tools", desc: "Central directory of all free career utilities & generators" },
    { name: "AI Developer & Cyber Portfolio Studio", path: "/portfolio-builder", desc: "Build & host your portfolio website at pandalime.com/p/:slug with 5 themes" },
    { name: "Job Description Keyword Extractor", path: "/tools/job-description-keyword-extractor", desc: "Extract technical skills, tools & soft skills from any JD" },
    { name: "AI STAR Method Resume Bullet Generator", path: "/tools/star-bullet-generator", desc: "Craft Google X-Y-Z formula bullet points with metrics" },
    { name: "250+ ATS Action Verbs Directory", path: "/tools/ats-action-verbs", desc: "Recruiter-approved power verbs categorized by skill" }
  ];

  const legalPages = [
    { name: "Contact Support & Help Desk", path: "/contact" },
    { name: "Privacy Policy & Data Protection", path: "/privacy-policy" },
    { name: "Terms of Service & User Agreement", path: "/terms" }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.pandalime.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Sitemap Directory",
        "item": "https://www.pandalime.com/sitemap"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col justify-between">
      <SEOHead 
        title="HTML Sitemap & Career Index Directory | PandaLime"
        description="Comprehensive index of all free AI ATS resume scanners, career guides, developer portfolios, and tools on PandaLime."
        canonical="/sitemap"
        jsonLd={jsonLd}
      />

      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-8 sm:p-12">
            
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-100">
              <div className="w-12 h-12 bg-lime-100 text-lime-700 rounded-xl flex items-center justify-center shrink-0">
                <Map className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-950">
                  PandaLime Directory & Sitemap
                </h1>
                <p className="text-gray-500 mt-1 text-xs sm:text-sm">
                  Complete directory of all public pages, tools, blog guides, and 200+ ATS resume scanners.
                </p>
              </div>
            </div>

            {/* Section 1: Main Pages & Tools */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
                <h2 className="text-base font-bold text-gray-950 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-lime-600" /> Core Navigation Pages
                </h2>
                <ul className="space-y-2.5">
                  {mainPages.map((page, i) => (
                    <li key={i}>
                      <Link 
                        to={page.path}
                        onMouseEnter={() => prefetchRoute(page.path)}
                        className="text-xs sm:text-sm text-gray-700 hover:text-lime-700 font-medium flex items-center gap-2 group transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-lime-600 group-hover:translate-x-0.5 transition-all" />
                        {page.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
                <h2 className="text-base font-bold text-gray-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Company & Legal Documentation
                </h2>
                <ul className="space-y-2.5">
                  {legalPages.map((page, i) => (
                    <li key={i}>
                      <Link 
                        to={page.path}
                        onMouseEnter={() => prefetchRoute(page.path)}
                        className="text-xs sm:text-sm text-gray-700 hover:text-lime-700 font-medium flex items-center gap-2 group transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-lime-600 group-hover:translate-x-0.5 transition-all" />
                        {page.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 2: Free Tools Suite */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-950 mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-lime-600" /> Free ATS Career Tools Suite
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {freeTools.map((tool, i) => (
                  <Link 
                    key={i}
                    to={tool.path}
                    onMouseEnter={() => prefetchRoute(tool.path)}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-lime-500 hover:bg-white transition-all group"
                  >
                    <p className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-lime-700 mb-1">
                      {tool.name}
                    </p>
                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      {tool.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Section 3: 12 Career Guides & Blog */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-950 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-600" /> Published Career Guides & ATS Blueprints ({BLOG_POSTS.length} Articles)
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BLOG_POSTS.map(post => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    onMouseEnter={() => prefetchRoute(`/blog/${post.slug}`)}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-lime-500 hover:bg-white transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-lime-800 bg-lime-100 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <p className="font-bold text-xs text-gray-900 group-hover:text-lime-700 mt-2 line-clamp-2">
                        {post.title}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-3 flex items-center gap-1 font-semibold">
                      Read Guide →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Section 4: Target Company ATS Scanners */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-950 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-lime-600" /> Top Employer ATS Resumes
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 text-xs">
                {COMPANIES.map(company => (
                  <Link 
                    key={company.id}
                    to={`/scanner/software-engineer-resume-for-${company.id}`}
                    onMouseEnter={() => prefetchRoute(`/scanner/software-engineer-resume-for-${company.id}`)}
                    className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 hover:border-lime-500 hover:text-lime-700 font-medium truncate transition-colors"
                    title={`Software Engineer Resume for ${company.name}`}
                  >
                    {company.name} ATS Resume
                  </Link>
                ))}
              </div>
            </div>

            {/* Section 5: Target Role ATS Scanners */}
            <div>
              <h2 className="text-lg font-bold text-gray-950 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-lime-600" /> Job Role ATS Scanners
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs">
                {ROLES.map(role => (
                  <Link 
                    key={role.id}
                    to={`/scanner/${role.id}-resume-for-google`}
                    onMouseEnter={() => prefetchRoute(`/scanner/${role.id}-resume-for-google`)}
                    className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 hover:border-lime-500 hover:text-lime-700 font-medium truncate transition-colors"
                    title={`${role.name} ATS Resume`}
                  >
                    {role.name} Scanner
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}