import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  FileText
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';
import { BLOG_POSTS } from '../data/blogPosts';
import { prefetchRoute } from '../utils/prefetch';

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    'All',
    'AI & Workflows',
    'ATS Optimization',
    'Resume Writing',
    'Developer Portfolios',
    'Industry Specific',
    'Campus & Freshers',
    'Career Transitions'
  ];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = BLOG_POSTS[0];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pandalime.com/" },
        { "@type": "ListItem", "position": 2, "name": "Career Guides & Blog", "item": "https://www.pandalime.com/blog" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "PandaLime Career & ATS Optimization Guides",
      "description": "Authoritative research guides and blueprints on beating Applicant Tracking Systems (ATS), Google X-Y-Z resume bullet formulas, developer portfolios, and tech interview preparation.",
      "url": "https://www.pandalime.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "PandaLime",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.pandalime.com/assets/hero.png"
        }
      },
      "blogPost": BLOG_POSTS.map(p => ({
        "@type": "BlogPosting",
        "headline": p.title,
        "description": p.excerpt,
        "url": `https://www.pandalime.com/blog/${p.slug}`,
        "datePublished": p.publishedDate,
        "author": {
          "@type": "Person",
          "name": p.author.name
        }
      }))
    }
  ];

  return (
    <div className="min-h-screen bg-[#08090C] text-[#E1E2E9] font-sans flex flex-col justify-between selection:bg-[#D2FF00] selection:text-[#08090C]">
      <SEOHead 
        title="Career Guides, ATS Resume Optimization & Portfolio Blueprints | PandaLime"
        description="Comprehensive guides on beating ATS filters, Google X-Y-Z resume formulas, high-converting developer portfolios, and technical interview preparation."
        canonical="/blog"
        jsonLd={jsonLd}
      />

      {/* Unified Global Navbar */}
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="flex-1">
        
        {/* Header Hero */}
        <section className="bg-[#08090C] border-b border-[#1F242D] py-14 sm:py-18">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#0E1116] border border-[#1F242D] text-[#D2FF00] font-mono text-xs uppercase tracking-wider mb-5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>// EDITORIAL &amp; ATS RESEARCH LAB</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F7FA] tracking-tight mb-4">
              Career Guides &amp; ATS Blueprints
            </h1>
            
            <p className="text-sm sm:text-base text-[#9BA3AF] max-w-2xl mx-auto mb-8 leading-relaxed">
              In-depth research, parser reverse-engineering, and proven frameworks to help you bypass corporate screening bots and land high-paying tech offers.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative font-mono text-xs">
              <Search className="w-4 h-4 text-[#505763] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides by keyword, role, or ATS platform..."
                className="w-full pl-11 pr-4 py-3 bg-[#0E1116] border border-[#1F242D] rounded-[2px] text-xs text-[#F5F7FA] focus:border-[#D2FF00] outline-none transition-all placeholder:text-[#505763]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6 font-mono text-xs">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-[2px] text-xs font-bold transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-[#D2FF00] text-[#08090C] border-[#D2FF00]'
                      : 'bg-[#0E1116] hover:bg-[#151921] text-[#9BA3AF] hover:text-[#F5F7FA] border-[#1F242D]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Hero Guide */}
        {selectedCategory === 'All' && searchQuery === '' && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
            <div className="bg-[#0E1116] text-[#F5F7FA] rounded-[2px] p-6 sm:p-10 border border-[#1F242D] shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#D2FF00] uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" /> FEATURED FLAGSHIP BLUEPRINT
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA] leading-tight">
                  <Link 
                    to={`/blog/${featuredPost.slug}`}
                    onMouseEnter={() => prefetchRoute(`/blog/${featuredPost.slug}`)}
                    className="hover:text-[#D2FF00] transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>
                
                <p className="text-xs sm:text-sm text-[#9BA3AF] leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs text-[#505763]">
                  <span className="flex items-center gap-1 text-[#D2FF00]">
                    <Clock className="w-3 h-3" /> {featuredPost.readTime}
                  </span>
                  <span>•</span>
                  <span>{featuredPost.wordCount} words</span>
                  <span>•</span>
                  <span>By {featuredPost.author.name}</span>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    onMouseEnter={() => prefetchRoute(`/blog/${featuredPost.slug}`)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D2FF00] hover:bg-[#E5FF66] text-[#08090C] font-mono font-bold rounded-[2px] text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    Read Definitive Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Guides Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#1F242D]">
            <h2 className="text-lg sm:text-xl font-bold text-[#F5F7FA] flex items-center gap-2 font-mono">
              <FileText className="w-4 h-4 text-[#D2FF00]" />
              <span>{selectedCategory === 'All' ? '// ALL RESEARCH GUIDES' : `// ${selectedCategory.toUpperCase()}`}</span>
              <span className="text-xs bg-[#151921] text-[#D2FF00] px-2 py-0.5 rounded-[2px] border border-[#1F242D] font-bold ml-1">
                {filteredPosts.length}
              </span>
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-[#0E1116] rounded-[2px] border border-[#1F242D] p-8">
              <p className="text-[#9BA3AF] font-mono text-xs">No guides matched your search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map(post => (
                <article 
                  key={post.slug}
                  className="bg-[#0E1116] rounded-[2px] border border-[#1F242D] hover:border-[#D2FF00] p-5 sm:p-6 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                      <span className="px-2 py-0.5 bg-[#151921] text-[#D2FF00] font-bold rounded-[2px] border border-[#1F242D]">
                        {post.category}
                      </span>
                      <span className="text-[#505763] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#F5F7FA] group-hover:text-[#D2FF00] transition-colors leading-snug line-clamp-2">
                      <Link 
                        to={`/blog/${post.slug}`}
                        onMouseEnter={() => prefetchRoute(`/blog/${post.slug}`)}
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-[#9BA3AF] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#1F242D] flex items-center justify-between font-mono text-xs">
                    <div className="text-[#505763] text-[10px]">
                      <span>{post.publishedDate}</span>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      onMouseEnter={() => prefetchRoute(`/blog/${post.slug}`)}
                      className="font-bold text-[#D2FF00] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
