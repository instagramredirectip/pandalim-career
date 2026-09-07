import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Share2, 
  ScanLine, 
  Globe, 
  CheckCircle2, 
  BookOpen, 
  ListTree,
  ShieldCheck,
  Zap
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';
import { getBlogPostBySlug, BLOG_POSTS } from '../data/blogPosts';
import { prefetchRoute } from '../utils/prefetch';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans">
        <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <div className="max-w-md mx-auto text-center py-20 px-4">
          <h1 className="text-2xl font-bold text-gray-950 mb-3">Guide Not Found</h1>
          <p className="text-gray-600 mb-6 text-sm">The requested career or ATS guide could not be located.</p>
          <Link to="/blog" className="px-5 py-2.5 bg-lime-500 text-gray-950 font-bold rounded-xl text-sm">
            Back to All Guides
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pandalime.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.pandalime.com/blog" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.pandalime.com/blog/${post.slug}` }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "keywords": post.tags.join(', '),
      "wordCount": post.wordCount,
      "datePublished": post.publishedDate,
      "dateModified": post.publishedDate,
      "mainEntityOfPage": `https://www.pandalime.com/blog/${post.slug}`,
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "jobTitle": post.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "PandaLime Career",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.pandalime.com/assets/hero.png"
        }
      }
    }
  ];

  // Helper to render markdown content with basic styling
  const renderFormattedContent = (contentStr) => {
    return contentStr.split('\n\n').map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H2 Headings with ID anchor
      if (trimmed.startsWith('## ')) {
        const match = trimmed.match(/^##\s+(.*?)(?:\s+\{#(.*?)\})?$/);
        const title = match ? match[1] : trimmed.replace('## ', '');
        const id = match && match[2] ? match[2] : '';
        return (
          <h2 key={idx} id={id} className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-10 mb-4 pt-4 border-t border-gray-100 scroll-mt-24">
            {title}
          </h2>
        );
      }

      // H3 Headings
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg sm:text-xl font-bold text-gray-900 mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Blockquotes / Key Takeaway Boxes
      if (trimmed.startsWith('> ')) {
        const cleanText = trimmed.replace(/^>\s+/gm, '');
        return (
          <div key={idx} className="my-6 p-5 bg-lime-50/80 border-l-4 border-lime-500 rounded-r-2xl text-gray-800 text-sm leading-relaxed shadow-xs">
            {cleanText}
          </div>
        );
      }

      // Tables
      if (trimmed.startsWith('|')) {
        const rows = trimmed.split('\n').filter(r => !r.includes('---'));
        if (rows.length === 0) return null;
        const headers = rows[0].split('|').filter(c => c.trim() !== '').map(c => c.trim());
        const dataRows = rows.slice(1).map(r => r.split('|').filter(c => c.trim() !== '').map(c => c.trim()));

        return (
          <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-gray-200 shadow-xs">
            <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-gray-200">
              <thead className="bg-gray-900 text-white font-bold">
                <tr>
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-gray-700 font-medium">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      // Bullet Lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').map(i => i.replace(/^[-*]\s+/, '').trim());
        return (
          <ul key={idx} className="my-4 space-y-2 pl-4 list-disc text-gray-700 text-sm sm:text-base leading-relaxed">
            {items.map((item, iIdx) => (
              <li key={iIdx}>{item}</li>
            ))}
          </ul>
        );
      }

      // Checklists
      if (trimmed.startsWith('- [ ]')) {
        const items = trimmed.split('\n').map(i => i.replace(/^- \[[ x]\]\s+/, '').trim());
        return (
          <div key={idx} className="my-5 p-5 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-2.5">
            {items.map((item, iIdx) => (
              <div key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="my-4 text-gray-700 text-sm sm:text-base leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-between">
      <SEOHead 
        title={`${post.title} | PandaLime`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        jsonLd={jsonLd}
      />

      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-lime-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-lime-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1 bg-lime-100 text-lime-900 font-extrabold text-xs rounded-lg uppercase tracking-wider">
                {post.category}
              </span>

              <button
                onClick={handleShare}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Guide'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author and Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-100 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="font-bold text-gray-900">{post.author.name}</p>
                  <p className="text-gray-500 text-xs">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-500 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{post.publishedDate}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-lime-600" />
                  <span>{post.readTime}</span>
                </span>
                <span>•</span>
                <span>{post.wordCount} words</span>
              </div>
            </div>
          </header>

          {/* Table of Contents Box */}
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <div className="my-8 p-6 bg-gray-900 text-gray-100 rounded-2xl border border-gray-800 shadow-md">
              <div className="flex items-center gap-2 text-sm font-bold text-lime-400 mb-3 uppercase tracking-wider">
                <ListTree className="w-4 h-4" /> Table of Contents
              </div>
              <ul className="space-y-2 text-xs sm:text-sm">
                {post.tableOfContents.map(toc => (
                  <li key={toc.id}>
                    <a 
                      href={`#${toc.id}`} 
                      className="text-gray-300 hover:text-lime-400 transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-lime-500 font-mono">›</span>
                      <span>{toc.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Main Body */}
          <article className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-xs my-8 prose-sm sm:prose max-w-none text-gray-800">
            {renderFormattedContent(post.content)}
          </article>

          {/* In-Article Action CTA Card */}
          <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white rounded-2xl p-8 border border-gray-800 shadow-xl my-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-md">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-lime-500/20 text-lime-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Instant ATS Audit
              </div>
              <h3 className="text-xl font-black text-white">Test Your Resume Against Modern ATS Bots</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Upload your PDF resume and target job description. Get your instant match score, missing keywords, and recruiter critique in 15 seconds.
              </p>
            </div>

            <Link
              to="/dashboard"
              onMouseEnter={() => prefetchRoute('/dashboard')}
              className="px-6 py-3.5 bg-lime-500 hover:bg-lime-400 text-gray-950 font-black rounded-xl text-xs sm:text-sm shadow-lg shadow-lime-500/20 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <ScanLine className="w-4 h-4" />
              <span>Scan Resume Free</span>
            </Link>
          </div>

          {/* Author Bio Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs my-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-lime-500/40 shrink-0" 
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-gray-950 text-base">{post.author.name}</h4>
                <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-bold">
                  {post.author.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                The PandaLime Editorial & ATS Calibration Team reverse-engineers enterprise recruitment workflows (Workday, Taleo, Greenhouse, Lever) to provide engineers and job seekers with data-backed resume optimization frameworks.
              </p>
            </div>
          </div>

          {/* Related Articles */}
          <div className="my-12 space-y-6">
            <h3 className="text-xl font-extrabold text-gray-950 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-lime-600" /> Related Career Guides
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map(rel => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  onMouseEnter={() => prefetchRoute(`/blog/${rel.slug}`)}
                  className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-lime-500 transition-all group flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-lime-800 bg-lime-50 px-2 py-0.5 rounded border border-lime-200/60">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-lime-700 line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="pt-3 mt-3 border-t border-gray-100 text-[11px] text-lime-700 font-bold flex items-center gap-1">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

