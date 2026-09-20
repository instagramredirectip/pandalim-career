import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, MessageSquare, ArrowRight, Sparkles, Share2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';

// --- SUB-COMPONENT: COMMENT SECTION ---
const CommentSection = ({ reportId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(`https://pandalime-backend.onrender.com/api/reports/${reportId}/comments`);
      const data = await res.json();
      if (data.success) setComments(data.comments);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleToggle = () => {
    if (!isOpen) fetchComments();
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await fetch(`https://pandalime-backend.onrender.com/api/reports/${reportId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text_content: newComment })
      });
      const data = await res.json();
      if (data.success) {
        setComments([...comments, data.comment]);
        setNewComment('');
      }
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  return (
    <div className="mt-4 border-t border-[#1F242D] pt-4 font-mono text-xs">
      <button 
        onClick={handleToggle} 
        className="text-[#9BA3AF] hover:text-[#D2FF00] flex items-center gap-1.5 transition cursor-pointer font-bold"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>{isOpen ? '// HIDE COMMENTS' : `// ANONYMOUS COMMENTS (${comments.length})`}</span>
      </button>

      {isOpen && (
        <div className="mt-3 space-y-3 bg-[#08090C] p-4 rounded-[2px] border border-[#1F242D]">
          {comments.length === 0 ? (
            <p className="text-[11px] text-[#505763] italic">No comments yet. Post the first critique feedback...</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {comments.map((c) => (
                <li key={c.id} className="text-xs text-[#E1E2E9] bg-[#151921] p-2.5 rounded-[2px] border border-[#1F242D]">
                  <span className="font-bold text-[#D2FF00] mr-2">[ANON]:</span>
                  <span>{c.text_content}</span>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
            <input 
              type="text" 
              maxLength="300"
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
              placeholder="Post anonymous feedback..." 
              className="flex-1 text-xs rounded-[2px] bg-[#0E1116] border border-[#1F242D] focus:border-[#D2FF00] text-[#F5F7FA] placeholder:text-[#505763] px-3 py-2 outline-none font-mono"
            />
            <button 
              type="submit" 
              className="bg-[#D2FF00] text-[#08090C] px-4 py-2 rounded-[2px] text-xs font-bold uppercase tracking-wider hover:bg-[#E5FF66] transition cursor-pointer"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function RoastWall() {
  const [roasts, setRoasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('https://pandalime-backend.onrender.com/api/roasts')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRoasts(data.roasts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load roasts", err);
        setLoading(false);
      });
  }, []);

  const shareOnTwitter = (score, jobTitle) => {
    const text = `PandaLime's AI just reviewed a resume with a ${score}% match score for a ${jobTitle} role 💥. Scan yours before you apply: https://pandalime.com/roast-wall`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-[#E1E2E9] font-sans flex flex-col justify-between selection:bg-[#D2FF00] selection:text-[#08090C]">
      <SEOHead 
        title="Community Resume Roast Wall & AI ATS Critiques | PandaLime"
        description="Explore real, anonymous AI resume critiques, ATS match scores, and recruiter feedback. Learn from common resume mistakes to improve your application."
        canonical="/roast-wall"
      />

      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0E1116] border border-[#1F242D] text-[#FF5722] font-mono text-[10px] uppercase tracking-widest rounded-[2px] mb-3">
              <Flame className="w-3.5 h-3.5" /> // UNCENSORED PEER &amp; AI AUDIT
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F7FA] tracking-tight">
              The Anonymous <span className="text-[#FF5722]">Roast</span> Wall
            </h1>
            <p className="mt-3 text-sm text-[#9BA3AF] max-w-xl mx-auto">
              Real-time, anonymous AI feedback and ATS deconstructions from candidate submissions worldwide.
            </p>
          </div>

          {loading ? (
            <div className="text-center font-mono text-sm text-[#9BA3AF] py-16">
              [ ACCESSING TELEMETRY STREAM... ]
            </div>
          ) : (
            <div className="space-y-4">
              {roasts.map((roast) => (
                <div 
                  key={roast.id} 
                  className="bg-[#0E1116] rounded-[2px] border border-[#1F242D] p-6 transition hover:border-[#2E323D]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-[2px] text-xs font-mono font-bold bg-[#151921] text-[#9BA3AF] border border-[#1F242D]">
                        TARGET: {roast.job_title || 'Software Engineer'}
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className={`text-2xl font-bold ${roast.match_score < 50 ? 'text-[#FF5722]' : roast.match_score < 75 ? 'text-amber-400' : 'text-[#D2FF00]'}`}>
                        {roast.match_score}%
                      </span>
                      <p className="text-[10px] text-[#505763] uppercase tracking-wide font-bold">MATCH SCORE</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#08090C] rounded-[2px] p-4 mb-4 border-l-2 border-[#FF5722] text-[#E1E2E9] italic text-xs sm:text-sm leading-relaxed">
                    "{roast.resume_critique}"
                  </div>

                  <div className="flex justify-between items-center mt-2 font-mono text-xs">
                    <button 
                      onClick={() => shareOnTwitter(roast.match_score, roast.job_title || 'a role')}
                      className="text-[#D2FF00] hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>SHARE CRITIQUE</span>
                    </button>

                    <Link to="/dashboard" className="text-[#9BA3AF] hover:text-[#F5F7FA] font-bold flex items-center gap-1">
                      <span>SCAN YOURS</span> <ArrowRight className="w-3 h-3 text-[#D2FF00]" />
                    </Link>
                  </div>
                  
                  {/* Embedded Comment Section */}
                  <CommentSection reportId={roast.id} />
                </div>
              ))}
              
              {roasts.length === 0 && (
                <div className="text-center font-mono text-sm text-[#9BA3AF] py-16 bg-[#0E1116] border border-[#1F242D] rounded-[2px]">
                  No public roasts yet! Scan your resume on the dashboard to share the first critique.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}