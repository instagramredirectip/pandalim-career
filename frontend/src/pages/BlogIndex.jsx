import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  TrendingUp,
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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-between">
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
        <section className="bg-white border-b border-gray-200 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-lime-50 text-lime-900 font-bold text-xs sm:text-sm mb-4 border border-lime-200">
              <BookOpen className="w-4 h-4 text-lime-600" />
              <span>PandaLime Editorial & ATS Research Lab</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-950 tracking-tight mb-4">
              Career Guides & ATS Optimization Blueprints
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              In-depth research, parser reverse-engineering, and proven frameworks to help you bypass corporate screening bots and land high-paying tech offers.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides by keyword, role, or ATS platform..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
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
            <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white rounded-2xl p-6 sm:p-10 border border-gray-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold text-lime-400 uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" /> Featured Flagship Guide
                </div>
                
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  <Link 
                    to={`/blog/${featuredPost.slug}`}
                    onMouseEnter={() => prefetchRoute(`/blog/${featuredPost.slug}`)}
                    className="hover:text-lime-400 transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>
                
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-lime-400" /> {featuredPost.readTime}
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-500 hover:bg-lime-400 text-gray-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    Read Definitive Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Guides Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-lime-600" />
              <span>{selectedCategory === 'All' ? 'All Published Guides' : `${selectedCategory} Guides`}</span>
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-bold ml-1">
                {filteredPosts.length}
              </span>
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
              <p className="text-gray-500 font-medium">No guides matched your search. Try different keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <article 
                  key={post.slug}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-lime-500/50 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="px-2.5 py-1 bg-lime-50 text-lime-800 font-bold rounded-md border border-lime-200/60">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-950 group-hover:text-lime-700 transition-colors leading-snug line-clamp-2">
                      <Link 
                        to={`/blog/${post.slug}`}
                        onMouseEnter={() => prefetchRoute(`/blog/${post.slug}`)}
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div className="text-gray-400 text-[11px]">
                      <span>{post.publishedDate}</span>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      onMouseEnter={() => prefetchRoute(`/blog/${post.slug}`)}
                      className="font-bold text-lime-700 hover:text-lime-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Guide</span>
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

