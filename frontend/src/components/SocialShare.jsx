import React, { useState } from 'react';
import { 
  Share2, 
  Linkedin, 
  Twitter, 
  MessageCircle, 
  Send, 
  Link as LinkIcon, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { haptics } from '../utils/haptics';
import { asmrAudio } from '../utils/asmrAudio';

export default function SocialShare({
  title = 'Free AI Resume Scanner & ATS Checker | PandaLime',
  description = 'Check your resume for free with PandaLime AI. Uncover missing keywords, get an instant ATS score, and beat automated screening filters.',
  url,
  hashtags = ['ResumeTips', 'ATSScanner', 'TechJobs', 'CareerGrowth'],
  variant = 'card', // 'card' | 'bar' | 'compact'
  theme = 'dark',   // 'dark' | 'light'
  customCallout = null
}) {
  const [copied, setCopied] = useState(false);

  // Construct absolute URL
  const getFullUrl = () => {
    if (url && url.startsWith('http')) return url;
    if (url && url.startsWith('/')) return `https://www.pandalime.com${url}`;
    if (typeof window !== 'undefined' && window.location?.href) {
      return window.location.href;
    }
    return 'https://www.pandalime.com';
  };

  const shareUrl = getFullUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const shareText = `${title} — ${description}`;
  const encodedText = encodeURIComponent(title);
  const encodedFullText = encodeURIComponent(shareText);
  const encodedTags = encodeURIComponent(hashtags.join(','));

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&hashtags=${encodedTags}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedFullText}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`
  };

  const handleCopy = () => {
    try {
      haptics.selection();
      asmrAudio.playClick();
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        haptics.heavy();
        asmrAudio.playSwitch();
        await navigator.share({
          title,
          text: description,
          url: shareUrl
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const openShare = (platformUrl) => {
    haptics.selection();
    asmrAudio.playSwitch();
    window.open(platformUrl, '_blank', 'noopener,noreferrer,width=600,height=550');
  };

  // --- COMPACT VARIANT (Icon buttons) ---
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1.5" aria-label="Social share buttons">
        <button
          onClick={() => openShare(shareLinks.linkedin)}
          className="p-1.5 rounded-[2px] bg-[#151921] hover:bg-[#0A66C2] text-gray-300 hover:text-white border border-[#1F242D] transition-all cursor-pointer"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => openShare(shareLinks.twitter)}
          className="p-1.5 rounded-[2px] bg-[#151921] hover:bg-black text-gray-300 hover:text-white border border-[#1F242D] transition-all cursor-pointer"
          title="Share on X / Twitter"
          aria-label="Share on X / Twitter"
        >
          <Twitter className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => openShare(shareLinks.whatsapp)}
          className="p-1.5 rounded-[2px] bg-[#151921] hover:bg-[#25D366] text-gray-300 hover:text-black border border-[#1F242D] transition-all cursor-pointer"
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-[2px] bg-[#151921] hover:bg-[#D2FF00] text-gray-300 hover:text-[#08090C] border border-[#1F242D] transition-all cursor-pointer"
          title="Copy Link"
          aria-label="Copy Link"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#D2FF00]" /> : <LinkIcon className="w-3.5 h-3.5" />}
        </button>
      </div>
    );
  }

  // --- BAR VARIANT (Horizontal Row) ---
  if (variant === 'bar') {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#0E1116] border border-[#1F242D] rounded-[2px] font-sans text-xs">
        <div className="flex items-center gap-2 text-gray-400 font-medium">
          <Share2 className="w-4 h-4 text-[#D2FF00]" />
          <span>Share this page:</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => openShare(shareLinks.linkedin)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] bg-[#151921] hover:bg-[#0A66C2] text-gray-200 hover:text-white border border-[#1F242D] transition-all cursor-pointer font-medium text-[11px]"
          >
            <Linkedin className="w-3 h-3" />
            <span className="hidden sm:inline">LinkedIn</span>
          </button>
          
          <button
            onClick={() => openShare(shareLinks.twitter)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] bg-[#151921] hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] text-gray-200 border border-[#1F242D] transition-all cursor-pointer font-medium text-[11px]"
          >
            <Twitter className="w-3 h-3" />
            <span className="hidden sm:inline">Twitter</span>
          </button>

          <button
            onClick={() => openShare(shareLinks.whatsapp)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] bg-[#151921] hover:bg-[#25D366]/20 hover:text-[#25D366] text-gray-200 border border-[#1F242D] transition-all cursor-pointer font-medium text-[11px]"
          >
            <MessageCircle className="w-3 h-3" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          <button
            onClick={() => openShare(shareLinks.telegram)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] bg-[#151921] hover:bg-[#229ED9]/20 hover:text-[#229ED9] text-gray-200 border border-[#1F242D] transition-all cursor-pointer font-medium text-[11px]"
          >
            <Send className="w-3 h-3" />
            <span className="hidden sm:inline">Telegram</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] font-medium text-[11px] transition-all cursor-pointer border ${
              copied 
                ? 'bg-[#D2FF00] text-[#08090C] border-[#D2FF00]' 
                : 'bg-[#151921] hover:bg-[#1F242D] text-gray-200 border-[#1F242D]'
            }`}
          >
            {copied ? <Check className="w-3 h-3" /> : <LinkIcon className="w-3 h-3" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    );
  }

  // --- CARD VARIANT (Default high-engagement rich box) ---
  return (
    <aside 
      className={`p-6 sm:p-7 rounded-[2px] border transition-all ${
        theme === 'light' 
          ? 'bg-white border-gray-200 text-gray-900 shadow-sm' 
          : 'bg-[#0E1116] border-[#1F242D] text-white shadow-xl'
      }`}
      aria-label="Share this guide with your network"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1F242D]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#D2FF00]/10 border border-[#D2FF00]/30 text-[#D2FF00] font-mono text-[10px] uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Community & Career Growth</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#F5F7FA] tracking-tight">
            {customCallout || 'Help a Colleague or Fresher Land Interviews'}
          </h3>
          <p className="text-xs text-[#9BA3AF] mt-1 max-w-xl leading-relaxed">
            Share this free ATS resource with your network, job search group, or batchmates.
          </p>
        </div>

        {/* Native Mobile Share if available */}
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] rounded-[2px] font-bold text-xs uppercase tracking-wider shadow-[0_0_14px_rgba(210,255,0,0.25)] transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Quick Share</span>
        </button>
      </div>

      {/* Social Button Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-4">
        
        {/* LinkedIn */}
        <button
          onClick={() => openShare(shareLinks.linkedin)}
          className="flex items-center justify-center gap-2 p-2.5 bg-[#151921] hover:bg-[#0A66C2] text-gray-200 hover:text-white border border-[#1F242D] hover:border-[#0A66C2] rounded-[2px] text-xs font-semibold transition-all cursor-pointer active:scale-95 group"
        >
          <Linkedin className="w-4 h-4 text-[#0A66C2] group-hover:text-white transition-colors" />
          <span>LinkedIn</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => openShare(shareLinks.whatsapp)}
          className="flex items-center justify-center gap-2 p-2.5 bg-[#151921] hover:bg-[#25D366] text-gray-200 hover:text-black border border-[#1F242D] hover:border-[#25D366] rounded-[2px] text-xs font-semibold transition-all cursor-pointer active:scale-95 group"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-black transition-colors" />
          <span>WhatsApp</span>
        </button>

        {/* Twitter / X */}
        <button
          onClick={() => openShare(shareLinks.twitter)}
          className="flex items-center justify-center gap-2 p-2.5 bg-[#151921] hover:bg-black text-gray-200 hover:text-white border border-[#1F242D] hover:border-gray-500 rounded-[2px] text-xs font-semibold transition-all cursor-pointer active:scale-95 group"
        >
          <Twitter className="w-4 h-4 text-[#1DA1F2] group-hover:text-white transition-colors" />
          <span>X / Twitter</span>
        </button>

        {/* Telegram */}
        <button
          onClick={() => openShare(shareLinks.telegram)}
          className="flex items-center justify-center gap-2 p-2.5 bg-[#151921] hover:bg-[#229ED9] text-gray-200 hover:text-white border border-[#1F242D] hover:border-[#229ED9] rounded-[2px] text-xs font-semibold transition-all cursor-pointer active:scale-95 group"
        >
          <Send className="w-4 h-4 text-[#229ED9] group-hover:text-white transition-colors" />
          <span>Telegram</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 p-2.5 border rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
            copied
              ? 'bg-[#D2FF00] text-[#08090C] border-[#D2FF00]'
              : 'bg-[#151921] hover:bg-[#1F242D] text-[#D2FF00] border-[#1F242D] hover:border-[#D2FF00]'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

      </div>
    </aside>
  );
}
