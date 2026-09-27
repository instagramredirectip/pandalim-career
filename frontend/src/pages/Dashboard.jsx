import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  Briefcase, 
  Zap, 
  Loader2, 
  Lock, 
  CheckCircle, 
  Download, 
  MessageCircle,
  ScanSearch,
  Sparkles,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Share2,
  Check,
  Flame
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SmartCaptchaModal from '../components/SmartCaptchaModal';
import { AppHeader, AppBottomNav } from '../components/AppNavigation';
import { haptics } from '../utils/haptics';
import { asmrAudio } from '../utils/asmrAudio';

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const SCAN_STAGES = [
  { id: 'token', stage: 'Step 1 of 4', label: 'Reading resume sections and formatting', sub: 'Checking structure, headings, and readability' },
  { id: 'skills', stage: 'Step 2 of 4', label: 'Identifying technical and domain skills', sub: 'Extracting key tools, languages, and competencies' },
  { id: 'vector', stage: 'Step 3 of 4', label: 'Comparing against job requirements', sub: 'Checking keyword matches and finding missing skills' },
  { id: 'score', stage: 'Step 4 of 4', label: 'Calculating your ATS match score', sub: 'Preparing feedback, bullet suggestions, and recommendations' }
];

export default function Dashboard({ isAppMode: propAppMode = false }) {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [scanProgressPercent, setScanProgressPercent] = useState(15);
  const [prefilledFromTools, setPrefilledFromTools] = useState(false);
  const [isSharedToWall, setIsSharedToWall] = useState(false);

  const location = useLocation();
  const isAppMode = propAppMode || location.pathname.startsWith('/app') || location.search.includes('app=true');

  useEffect(() => {
    const passedJd = location.state?.jobDescription || sessionStorage.getItem('prefill_job_description');
    if (passedJd && !jobDescription) {
      setJobDescription(passedJd);
      setPrefilledFromTools(true);
      try {
        sessionStorage.removeItem('prefill_job_description');
      } catch {
        // sessionStorage restriction fallback
      }
    }
  }, [location.state, jobDescription]);

  const handleShareToWall = async () => {
    if (!reportId) return;
    haptics.selection();
    asmrAudio.playPop();
    
    try {
      const response = await fetch(`https://pandalime-backend.onrender.com/api/reports/${reportId}/make-public`, {
        method: 'POST',
      });
      
      const data = await response.json();
      if (data.success) {
        setIsSharedToWall(true);
      }
    } catch (error) {
      console.error("Failed to share to wall:", error);
    }
  };

  // High-cadence realistic scanning progress animation
  useEffect(() => {
    if (loading && !result) {
      setCurrentStageIdx(0);
      setScanProgressPercent(12);
      
      const stageInterval = setInterval(() => {
        setCurrentStageIdx(prev => {
          const next = (prev + 1) % SCAN_STAGES.length;
          haptics.light();
          asmrAudio.playClick();
          return next;
        });
      }, 2000);

      const progressInterval = setInterval(() => {
        setScanProgressPercent(prev => {
          if (prev >= 92) return 92;
          return prev + Math.floor(Math.random() * 8 + 4);
        });
      }, 400);

      return () => {
        clearInterval(stageInterval);
        clearInterval(progressInterval);
      };
    } else if (result) {
      setScanProgressPercent(100);
    }
  }, [loading, result]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (file && file.type === 'application/pdf') {
      haptics.light();
      asmrAudio.playPop();
      setResumeFile(file);
    } else {
      haptics.warning();
      asmrAudio.playDelete();
      alert('Please upload a PDF resume file.');
    }
  };

  const handleScan = (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription) {
      haptics.warning();
      asmrAudio.playDelete();
      alert("Please upload your resume PDF and paste a job description.");
      return;
    }
    haptics.medium();
    asmrAudio.playClick();
    setIsCaptchaOpen(true);
  };

  const handleExecuteScan = async ({ captchaToken, captchaAnswer }) => {
    setLoading(true);
    haptics.heavy();
    asmrAudio.playSparkle();

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);
    if (captchaToken) formData.append('captchaToken', captchaToken);
    if (captchaAnswer) formData.append('captchaAnswer', captchaAnswer);

    try {
      const res = await fetch('https://pandalime-backend.onrender.com/api/analyze', {
        method: 'POST',
        body: formData 
      });
      
      const data = await res.json();
      if (data.success) {
        haptics.success();
        asmrAudio.playChime();
        setResult(data.analysis);
        setReportId(data.reportId); 
        setIsUnlocked(data.isUnlocked !== false);
        setIsDiscounted(false);
      } else {
        haptics.warning();
        asmrAudio.playDelete();
        alert(data.error || "Analysis failed.");
      }
    } catch {
      haptics.warning();
      asmrAudio.playDelete();
      alert("Server error. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    haptics.selection();
    asmrAudio.playPop();
    const message = encodeURIComponent("I just found out why my resume is getting rejected by corporate ATS bots 🤯. Check your exact ATS match score for free at https://pandalime.com before you apply for your next job!");
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
    setIsDiscounted(true);
  };

  const handleUnlock = async () => {
    setLoading(true);
    haptics.heavy();
    asmrAudio.playClick();

    try {
        const resScript = await loadRazorpayScript();
        if (!resScript) {
            alert('Razorpay SDK failed to load. Please check your internet connection.');
            setLoading(false);
            return;
        }

        const orderRes = await fetch('https://pandalime-backend.onrender.com/api/payment/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reportId, isDiscounted }) 
        });
        const orderData = await orderRes.json();

        if (!orderData.success) {
            alert('Failed to initialize payment');
            setLoading(false);
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
            amount: orderData.order.amount,
            currency: orderData.order.currency,
            name: 'PandaLime Career',
            description: isDiscounted ? 'Premium Report (50% Off)' : 'Premium Report Unlock',
            order_id: orderData.order.id,
            handler: async function (response) {
                try {
                    const verifyRes = await fetch('https://pandalime-backend.onrender.com/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            reportId: reportId
                        })
                    });
                    const verifyData = await verifyRes.json();
                    
                    if (verifyData.success) {
                        haptics.success();
                        asmrAudio.playChime();
                        setIsUnlocked(true); 
                    } else {
                        alert(verifyData.error || 'Payment verification failed');
                    }
                } catch {
                    alert("Verification error. Please contact support.");
                }
            },
            theme: { color: '#D2FF00' }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
            haptics.warning();
            asmrAudio.playDelete();
            alert("Payment Failed: " + response.error.description);
        });
        rzp.open();

    } catch (err) {
        console.error(err);
        alert("Error connecting to payment gateway");
    } finally {
        setLoading(false);
    }
  };

  const downloadPDF = () => {
    haptics.light();
    asmrAudio.playClick();
    window.print();
  };

  const currentStage = SCAN_STAGES[currentStageIdx] || SCAN_STAGES[0];

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F0F4FC] font-sans pb-32 print:bg-white print:text-black print:pb-0 selection:bg-[#D2FF00]/30 selection:text-black antialiased">
      <SEOHead 
        title="Free AI Resume Scanner & ATS Diagnostic Engine | PandaLime"
        description="Upload your resume PDF and target job description to get an instant ATS match score, critical missing keywords, and actionable AI feedback."
        canonical="/dashboard"
      />

      {/* Subtle Hairline Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-25">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F242D_1px,transparent_1px),linear-gradient(to_bottom,#1F242D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
      
      {/* Navigation Header */}
      {isAppMode ? (
        <AppHeader 
          title="ATS Resume Scanner" 
          showBack={true} 
        />
      ) : (
        <nav className="print:hidden bg-[#08090C]/90 backdrop-blur-xl border-b border-[#1F242D] sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center gap-3">
            <Link 
              to="/" 
              onClick={() => {
                haptics.light();
                asmrAudio.playClick();
              }}
              className="flex items-center gap-2 text-white font-mono font-bold text-base tracking-tight shrink-0 hover:opacity-90"
            >
              <div className="w-7 h-7 bg-[#D2FF00] rounded-[2px] flex items-center justify-center text-[#08090C] shadow-[0_0_12px_rgba(210,255,0,0.3)] shrink-0 font-bold">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-black tracking-tight">PANDALIME</span>
              <span className="text-[10px] text-[#D2FF00] bg-[#D2FF00]/10 border border-[#D2FF00]/30 px-1.5 py-0.5 rounded-[2px] uppercase hidden sm:inline font-semibold">
                Resume Scanner
              </span>
            </Link>

            <div className="flex items-center gap-3 text-xs font-semibold shrink-0">
              <Link to="/" className="text-gray-400 hover:text-[#D2FF00] transition-colors hidden sm:block">
                Home
              </Link>
              <Link to="/portfolio-builder" className="text-gray-400 hover:text-[#D2FF00] transition-colors hidden md:block">
                Portfolio Studio
              </Link>
              <Link to="/roast-wall" className="text-gray-400 hover:text-[#FF5722] transition-colors flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>Roast Wall →</span>
              </Link>
            </div>
          </div>
        </nav>
      )}

      {/* Laser Scan Keyframe Styling */}
      <style>
        {`
          @keyframes laserScan {
            0% { top: -2%; opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { top: 102%; opacity: 0; }
          }
          .animate-laser {
            animation: laserScan 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}
      </style>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 print:py-4 relative z-10 font-sans">
        
        {/* STATE 1: SCANNING PROGRESS ANIMATION */}
        {loading && !result ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-16">
            
            {/* Scanner Card Container */}
            <div className="relative w-72 sm:w-80 h-96 bg-[#0E1116] border border-[#1F242D] rounded-[2px] shadow-[0_0_50px_rgba(210,255,0,0.08)] overflow-hidden flex flex-col items-center pt-8 p-6">
              
              {/* Document Icon Header */}
              <div className="w-14 h-14 bg-[#151921] border border-[#1F242D] rounded-[2px] flex items-center justify-center mb-6 text-[#D2FF00] shadow-inner">
                 <FileText size={26} className="stroke-[2.2]" />
              </div>

              {/* Monospace Simulated Resume Lines */}
              <div className="w-full space-y-2.5 opacity-60">
                <div className="h-2 bg-[#1F242D] w-3/4 animate-pulse"></div>
                <div className="h-2 bg-[#1F242D] w-full"></div>
                <div className="h-2 bg-[#1F242D] w-5/6"></div>
                <div className="h-2 bg-[#1F242D] w-2/3"></div>
                <div className="h-2 bg-[#1F242D] w-full mt-4"></div>
                <div className="h-2 bg-[#1F242D] w-4/5"></div>
              </div>

              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F242D_1px,transparent_1px),linear-gradient(to_bottom,#1F242D_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none" />

              {/* Scan Highlight Beam */}
              <div className="absolute left-0 w-full h-[2.5px] bg-[#D2FF00] shadow-[0_0_16px_4px_rgba(210,255,0,0.8)] animate-laser z-20" />
              <div className="absolute left-0 w-full h-12 bg-gradient-to-b from-[#D2FF00]/10 to-transparent animate-laser z-10 pointer-events-none" />
            </div>

            {/* Live Progress Readout */}
            <div className="mt-8 flex flex-col items-center gap-2 text-center max-w-lg w-full">
              
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-ping" />
                <span className="text-xs font-bold text-[#D2FF00] uppercase tracking-wider">
                  {currentStage.stage}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {currentStage.label}
              </h2>

              <p className="text-gray-400 text-xs sm:text-sm">
                {currentStage.sub}
              </p>

              {/* Real-time Progress Bar */}
              <div className="w-full bg-[#0E1116] border border-[#1F242D] h-2 rounded-[2px] overflow-hidden mt-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-[#FF5722] via-[#D2FF00] to-[#D2FF00] h-full transition-all duration-300"
                  style={{ width: `${scanProgressPercent}%` }}
                />
              </div>

              <div className="flex justify-between w-full text-xs text-gray-400 pt-1">
                <span>Scanning in progress…</span>
                <span className="text-[#D2FF00] font-semibold">{scanProgressPercent}% complete</span>
              </div>
            </div>
          </div>
        ) : 

        /* STATE 2: UPLOAD & CONFIGURATION FORM */
        !result ? (
          <div className="space-y-8">
            
            {/* Header Stamp */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#0E1116] border border-[#1F242D] text-xs font-semibold text-[#D2FF00]">
                <Sparkles size={14} /> Free AI ATS Resume Checker
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Check Your Resume Against Job Description
              </h1>
              
              <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                Upload your resume PDF and paste the job description to find missing keywords, check ATS formatting, and get bullet point improvements.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-[#0E1116] rounded-[2px] border border-[#1F242D] p-5 sm:p-8 shadow-2xl space-y-6">
              
              {prefilledFromTools && (
                <div className="p-3.5 bg-[#D2FF00]/10 border border-[#D2FF00]/40 rounded-[2px] flex items-center gap-2.5 text-xs text-[#D2FF00] font-semibold">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Job Description loaded from Keyword Extractor. Upload your resume PDF below to scan.</span>
                </div>
              )}

              <form onSubmit={handleScan} className="space-y-6">
                
                {/* 1. Job Description Textarea */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs font-bold text-gray-300 uppercase tracking-wider">
                    <span className="flex items-center gap-2">
                      <Briefcase size={16} className="text-[#D2FF00]" /> 1. Target Job Description
                    </span>
                    <span className="text-xs text-gray-400 font-normal">Paste requirements & tech stack</span>
                  </label>
                  <textarea 
                    required 
                    rows={6} 
                    value={jobDescription} 
                    onChange={(e) => setJobDescription(e.target.value)} 
                    className="w-full px-4 py-3 rounded-[2px] border border-[#1F242D] bg-[#08090C] text-gray-100 placeholder:text-gray-500 focus:border-[#D2FF00] focus:ring-1 focus:ring-[#D2FF00]/30 outline-none resize-none transition-all text-xs sm:text-sm leading-relaxed" 
                    placeholder="Paste the job requirements, qualifications, and responsibilities here..." 
                  />
                </div>
                
                {/* 2. Resume PDF File Dropzone */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs font-bold text-gray-300 uppercase tracking-wider">
                    <span className="flex items-center gap-2">
                      <FileText size={16} className="text-[#D2FF00]" /> 2. Resume Document (PDF Format)
                    </span>
                    <span className="text-xs text-gray-400 font-normal">Max 10MB</span>
                  </label>

                  <div className={`relative border border-dashed rounded-[2px] p-8 sm:p-10 text-center transition-all cursor-pointer group ${resumeFile ? 'border-[#D2FF00] bg-[#D2FF00]/5' : 'border-[#1F242D] bg-[#08090C] hover:border-gray-500'}`}>
                    <input 
                      type="file" 
                      accept="application/pdf,.pdf" 
                      required 
                      onChange={handleFileChange} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    
                    <div className="flex flex-col items-center gap-2.5">
                      <div className={`w-12 h-12 rounded-[2px] flex items-center justify-center transition-transform group-hover:scale-105 border ${resumeFile ? 'bg-[#D2FF00] text-[#08090C] border-[#D2FF00] font-bold shadow-[0_0_16px_rgba(210,255,0,0.3)]' : 'bg-[#151921] text-[#D2FF00] border-[#1F242D]'}`}>
                        {resumeFile ? <CheckCircle size={22} /> : <UploadCloud size={22} />}
                      </div>

                      {resumeFile ? (
                        <div>
                           <span className="font-bold text-white text-xs sm:text-sm block">{resumeFile.name}</span>
                           <span className="text-xs text-[#D2FF00] mt-0.5 inline-block">✓ Ready to scan</span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-gray-200 text-xs sm:text-sm block">Click or Drag & Drop Resume PDF here</span>
                          <span className="text-xs text-gray-400 mt-0.5 block">Supports standard PDF resumes up to 10MB</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <button 
                  type="submit" 
                  disabled={!jobDescription || !resumeFile} 
                  className="w-full flex items-center justify-center gap-2 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] py-3.5 rounded-[2px] font-bold text-xs sm:text-sm transition-all disabled:opacity-40 disabled:hover:bg-[#D2FF00] disabled:cursor-not-allowed shadow-[0_0_20px_rgba(210,255,0,0.25)] active:scale-[0.99] cursor-pointer border border-[#D2FF00] uppercase tracking-wider"
                >
                  <Zap size={18} />
                  <span>Scan My Resume Now</span>
                </button>
              </form>
            </div>
          </div>
        ) : 

        /* STATE 3: RESULTS VIEW */
        (
          <div className="space-y-6">
             <div id="premium-report-content" className="bg-[#0E1116] rounded-[2px] border border-[#1F242D] overflow-hidden shadow-2xl relative font-sans">
                 
                 {/* Top Score Banner */}
                 <div className="p-6 sm:p-10 text-center border-b border-[#1F242D] bg-[#08090C]/80 relative overflow-hidden">
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-[2px] bg-[#151921] border border-[#1F242D] text-xs text-gray-400 uppercase tracking-wider mb-3">
                      <span>ATS Match Results</span>
                    </div>

                    <div className={`text-6xl sm:text-8xl font-black tracking-tighter my-3 ${result.match_score >= 75 ? 'text-[#D2FF00] drop-shadow-[0_0_25px_rgba(210,255,0,0.3)]' : 'text-[#FF5722] drop-shadow-[0_0_25px_rgba(255,87,34,0.3)]'}`}>
                        {result.match_score}%
                    </div>

                    <p className="text-gray-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                        {result.match_score >= 75 
                          ? "✓ Strong Match: Your resume covers the key skills and experience required for this role." 
                          : "⚠️ Needs Optimization: Your resume is missing important keywords found in the job description. Review the breakdown below."}
                    </p>
                 </div>

                 {/* Anonymous Roast Wall Share */}
                <div className="py-3 px-4 flex justify-center border-b border-[#1F242D] bg-[#08090C]">
                  <button
                    onClick={handleShareToWall}
                    disabled={isSharedToWall}
                    className={`px-4 py-2 rounded-[2px] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isSharedToWall 
                        ? 'bg-[#151921] text-gray-400 border-[#1F242D]'
                        : 'bg-[#FF5722]/10 text-[#FF5722] hover:bg-[#FF5722]/20 border-[#FF5722]/40 shadow-[0_0_12px_rgba(255,87,34,0.15)]'
                    }`}
                  >
                    {isSharedToWall ? (
                      <>
                        <Check className="w-4 h-4 text-[#D2FF00]" />
                        <span>Posted to Anonymous Roast Wall!</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-4 h-4" />
                        <span>Share Score to Anonymous Roast Wall</span>
                      </>
                    )}
                  </button>
                </div>

                 {/* Detailed Report Content */}
                 <div className={`p-5 sm:p-8 space-y-8 ${!isUnlocked ? 'blur-md select-none opacity-40 pointer-events-none' : ''} transition-all duration-700`}>
                    
                    {/* Critical Missing Keywords */}
                    <div className="space-y-3">
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                        <Zap className="text-[#FF5722]" size={18} /> Missing Keywords ({result.missing_keywords?.length || 0})
                      </h3>
                      
                      <div className="flex flex-wrap gap-2">
                          {result.missing_keywords?.map((word, index) => (
                              <span key={index} className="px-3 py-1 bg-[#FF5722]/10 border border-[#FF5722]/30 rounded-[2px] text-xs font-semibold text-[#FF5722] shadow-sm">
                                {word}
                              </span>
                          ))}
                      </div>
                    </div>

                    {/* Resume Feedback */}
                    <div className="space-y-3">
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                        <ScanSearch className="text-[#D2FF00]" size={18} /> Detailed Resume Feedback
                      </h3>
                      <div className="bg-[#08090C] p-4 sm:p-5 rounded-[2px] border border-[#1F242D]">
                        <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{result.resume_critique}</p>
                      </div>
                    </div>

                    {/* Rewritten Bullet Points */}
                    <div className="space-y-3 pt-4 border-t border-[#1F242D]">
                        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                          <Sparkles className="text-[#D2FF00]" size={18} /> Suggested Bullet Point Improvements (Google X-Y-Z Format)
                        </h3>
                        <div className="space-y-2.5">
                            {result.rewritten_bullets?.map((bullet, i) => (
                                <div key={i} className="p-3.5 sm:p-4 bg-[#08090C] rounded-[2px] border border-[#1F242D] flex gap-3 items-start">
                                    <CheckCircle2 className="text-[#D2FF00] shrink-0 mt-0.5" size={18} />
                                    <p className="text-gray-200 leading-relaxed text-xs sm:text-sm">{bullet}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tailored Cover Letter */}
                    <div className="space-y-3 pt-4 border-t border-[#1F242D]">
                        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                          <FileText className="text-[#D2FF00]" size={18} /> Tailored Cover Letter Draft
                        </h3>
                        <div className="p-5 bg-[#08090C] rounded-[2px] border border-[#1F242D] text-gray-300 whitespace-pre-wrap leading-relaxed text-xs sm:text-sm shadow-inner">
                            {result.cover_letter}
                        </div>
                    </div>
                 </div>
             </div>

             {/* Bottom Action / Unlock Bars */}
             {!isUnlocked ? (
                 <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-[#08090C]/95 backdrop-blur-xl border-t border-[#1F242D] p-4 text-center shadow-[0_-20px_40px_rgba(0,0,0,0.6)] print:hidden">
                    <h2 className="text-sm sm:text-base font-bold text-white mb-1 flex items-center justify-center gap-2">
                      <Lock size={16} className="text-[#D2FF00]"/> Unlock Full Breakdown &amp; Bullet Rewrites
                    </h2>
                    <p className="text-gray-400 max-w-md mx-auto mb-3 text-xs">
                      See all missing keywords, 3 Google X-Y-Z bullet rewrites, and the full tailored cover letter.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-lg">
                        {!isDiscounted ? (
                            <button 
                                type="button"
                                onClick={handleShare} 
                                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-black px-4 py-2.5 rounded-[2px] font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                            >
                                <MessageCircle size={16} /> Share for 50% Off
                            </button>
                        ) : (
                            <div className="flex-1 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 px-4 py-2.5 rounded-[2px] font-bold text-xs flex items-center justify-center gap-1.5">
                                <CheckCircle size={16} /> 50% Discount Applied!
                            </div>
                        )}

                        <button 
                            type="button"
                            onClick={handleUnlock} 
                            disabled={loading}
                            className="flex-1 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] px-4 py-2.5 rounded-[2px] font-bold text-xs shadow-[0_0_16px_rgba(210,255,0,0.3)] transition-all flex items-center justify-center gap-1.5 disabled:opacity-70 active:scale-95 cursor-pointer uppercase tracking-wider"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : (isDiscounted ? 'Unlock for ₹49' : 'Unlock for ₹99')}
                        </button>
                    </div>
                </div>
             ) : (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 print:hidden">
                    <button 
                        type="button"
                        onClick={downloadPDF} 
                        className="flex-1 flex items-center justify-center gap-2 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] py-3 rounded-[2px] font-bold text-xs sm:text-sm transition-all shadow-[0_0_16px_rgba(210,255,0,0.25)] active:scale-95 cursor-pointer uppercase tracking-wider"
                    >
                        <Download size={18} /> Download PDF Report
                    </button>
                    <button 
                        type="button"
                        onClick={() => { 
                          haptics.selection();
                          asmrAudio.playSwitch();
                          setResult(null); 
                          setIsUnlocked(false); 
                          setIsDiscounted(false); 
                        }} 
                        className="flex-1 flex items-center justify-center gap-2 bg-[#151921] hover:bg-[#1F242D] text-gray-200 border border-[#1F242D] py-3 rounded-[2px] font-semibold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
                    >
                        <RefreshCw size={16} /> Scan Another Resume
                    </button>
                </div>
             )}
          </div>
        )}
      </main>

      {/* Proof-of-Human Security Verification Modal */}
      <SmartCaptchaModal
        isOpen={isCaptchaOpen}
        onClose={() => setIsCaptchaOpen(false)}
        onVerify={handleExecuteScan}
        title="Verify AI Resume Scan"
      />

      {/* App Mode Bottom Navigation Bar */}
      {isAppMode && <AppBottomNav />}
    </div>
  );
}