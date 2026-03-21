import React, { useState, useEffect } from 'react';

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
    <div className="mt-4 border-t border-gray-100 pt-4">
      <button onClick={handleToggle} className="text-sm font-medium text-gray-500 hover:text-emerald-600 flex items-center gap-2 transition">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        {isOpen ? 'Hide Comments' : 'Anonymous Comments'}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-inner">
          {comments.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No comments yet. Be the first to comment...</p>
          ) : (
            <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {comments.map((c) => (
                <li key={c.id} className="text-sm text-gray-700 bg-white p-2 rounded shadow-sm border border-gray-100">
                  <span className="font-bold text-gray-900 mr-2">Anon:</span>{c.text_content}
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
            <input 
              type="text" 
              maxLength="300"
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
              placeholder="Add an anonymous comment..." 
              className="flex-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2"
            />
            <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition shadow-sm">
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
    const text = `PandaLime's AI just reviewed a resume with a ${score}% for a ${jobTitle} role 💥. Scan yours before you apply: https://pandalime.com/wall`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            The <span className="text-emerald-500">Community</span> Wall
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Anonymous, AI feedback from recent resume scans. Learn from others mistakes.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading Community...</div>
        ) : (
          <div className="space-y-6">
            {roasts.map((roast) => (
              <div key={roast.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      Applied for: {roast.job_title || 'Unknown Role'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${roast.match_score < 50 ? 'text-red-500' : roast.match_score < 75 ? 'text-yellow-500' : 'text-emerald-500'}`}>
                      {roast.match_score}%
                    </span>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Match Score</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-emerald-500 text-gray-700 italic">
                  "{roast.resume_critique}"
                </div>

                <div className="flex justify-between items-center mt-2">
                  {/* Share Button */}
                  <button 
                    onClick={() => shareOnTwitter(roast.match_score, roast.job_title || 'a job')}
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
                  >
                    Share this Roast
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                  </button>
                </div>
                
                {/* Embedded Comment Section */}
                <CommentSection reportId={roast.id} />
                
              </div>
            ))}
            
            {roasts.length === 0 && (
              <div className="text-center text-gray-500 py-12">No roasts yet! Be the first to scan your resume.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}