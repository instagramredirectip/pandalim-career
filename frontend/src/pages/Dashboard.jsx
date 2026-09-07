import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
  Sparkles
} from 'lucide-react';
import SEOHead from '../components/SEOHead';

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export default function Dashboard() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [prefilledFromTools, setPrefilledFromTools] = useState(false);
  
  // NEW: State for the dynamic scanning text
  const [scanText, setScanText] = useState('Initializing AI...');

  const navigate = useNavigate();
  const location = useLocation();

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


const [isSharedToWall, setIsSharedToWall] = useState(false);

  const handleShareToWall = async () => {
    if (!reportId) return;
    
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



  // Cycles the text during the scanning animation
  useEffect(() => {
    if (loading && !result) {
      const texts = [
        "Parsing PDF structure...", 
        "Extracting core competencies...", 
        "Cross-referencing with Job Description...", 
        "Calculating ATS Match Score..."
      ];
      let i = 0;
      setScanText(texts[0]);
      const interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setScanText(texts[i]);
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [loading, result]);

  const _handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleScan = async (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription) return alert("Please provide both documents.");

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      const res = await fetch('https://pandalime-backend.onrender.com/api/analyze', {
        method: 'POST',
        body: formData 
      });
      
      const data = await res.json();
      if (data.success) {
        setResult(data.analysis);
        setReportId(data.reportId); 
        setIsUnlocked(data.isUnlocked !== false);
        setIsDiscounted(false);
      } else {
        alert(data.error || "Analysis failed.");
      }
    } catch {
      alert("Server error. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const message = encodeURIComponent("I just found out why my resume is getting rejected by corporate bots 🤯. Check your exact ATS score for free at https://pandalime.com before you apply for your next job!");
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
    setIsDiscounted(true);
  };

  const handleUnlock = async () => {
    setLoading(true);
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
                        setIsUnlocked(true); 
                    } else {
                        alert(verifyData.error || 'Payment verification failed');
                    }
                } catch {
                    alert("Verification error. Please contact support.");
                }
            },
            theme: { color: '#84cc16' }
        };


        console.log("=== RAZORPAY DEBUG ===");
console.log("1. Key ID being used:", import.meta.env.VITE_RAZORPAY_KEY_ID);
console.log("2. Order ID from backend:", orderData.order.id);
console.log("======================");

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
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
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-32 print:bg-white print:pb-0">
      <SEOHead 
        title="Free AI Resume Scanner & Score Dashboard | PandaLime"
        description="Upload your resume PDF and target job description to get an instant ATS match score, critical missing keywords, and actionable AI feedback."
        canonical="/dashboard"
      />
      
      {/* Navigation Header */}
      <nav className="print:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex justify-between items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-gray-900 font-black text-xl sm:text-2xl tracking-tight shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-lime-500 rounded-xl flex items-center justify-center text-gray-950 shadow-md shadow-lime-500/20 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span>PandaLime</span>
          </Link>
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold shrink-0">
            <Link to="/" className="text-gray-600 hover:text-lime-600 transition-colors hidden sm:block">
              ← Home
            </Link>
            <Link to="/roast-wall" className="text-gray-600 hover:text-lime-600 transition-colors">
              Community Wall →
            </Link>
          </div>
        </div>
      </nav>

      {/* Required Inline Styles for the Scanner Animation */}
      <style>
        {`
          @keyframes scanLine {
            0% { top: -5%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 105%; opacity: 0; }
          }
          .animate-scan {
            animation: scanLine 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          .bg-grid-pattern {
            background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}
      </style>

      <main className="max-w-4xl mx-auto px-4 py-10 sm:py-12 print:py-4">
        
        {/* STATE 1: LOADING / SCANNING ANIMATION */}
        {loading && !result ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 animate-in fade-in duration-500">
            <div className="relative w-64 h-80 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col items-center pt-8">
              {/* Fake PDF Content */}
              <div className="w-14 h-14 bg-lime-100 rounded-xl flex items-center justify-center mb-6 text-lime-600">
                 <FileText size={28} />
              </div>
              <div className="w-3/4 h-2 bg-gray-100 rounded-md mb-8"></div>
              <div className="w-5/6 space-y-3">
                <div className="h-2 bg-gray-100 rounded-md w-full"></div>
                <div className="h-2 bg-gray-100 rounded-md w-5/6"></div>
                <div className="h-2 bg-gray-100 rounded-md w-4/6"></div>
                <div className="h-2 bg-gray-100 rounded-md w-full mt-6"></div>
                <div className="h-2 bg-gray-100 rounded-md w-3/4"></div>
              </div>

              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

              {/* The Scanning Laser */}
              <div className="absolute left-0 w-full h-[3px] bg-lime-500 shadow-[0_0_20px_6px_rgba(132,204,22,0.4)] animate-scan z-10"></div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              <ScanSearch className="text-lime-600 animate-pulse" size={36} />
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{scanText}</h2>
              <p className="text-gray-600 text-sm sm:text-base font-medium">Please wait while our AI models evaluate your resume against the target role...</p>
            </div>
          </div>
        ) : 

        /* STATE 2: UPLOAD FORM */
        !result ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-lime-100 text-lime-900 border border-lime-300 font-bold text-xs sm:text-sm mb-5 shadow-xs">
                <Sparkles size={16} className="text-lime-600" /> Advanced AI Scanner
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Beat the Corporate AI Filter</h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto font-medium">Upload your resume to see exactly how a recruiter's Applicant Tracking System scores your profile.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-200 p-6 sm:p-8 md:p-10">
              {prefilledFromTools && (
                <div className="mb-6 p-4 bg-lime-50 border border-lime-300 rounded-xl flex items-center gap-3 text-xs text-lime-900 font-bold animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-lime-600 shrink-0" />
                  <span>Target Job Description loaded from Keyword Extractor! Upload your resume PDF below to run the ATS scan.</span>
                </div>
              )}
              <form onSubmit={handleScan} className="space-y-6 sm:space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                    <Briefcase size={18} className="text-lime-600" /> Target Job Description
                  </label>
                  <textarea 
                    required 
                    rows={5} 
                    value={jobDescription} 
                    onChange={(e) => setJobDescription(e.target.value)} 
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-lime-500/20 focus:border-lime-500 outline-none resize-none transition-all shadow-xs text-sm sm:text-base" 
                    placeholder="Paste the requirements from the job posting here..." 
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                    <FileText size={18} className="text-lime-600" /> Your Resume (PDF only)
                  </label>
                  <div className={`relative border-2 border-dashed rounded-xl p-8 sm:p-10 text-center transition-all cursor-pointer group ${resumeFile ? 'border-lime-500 bg-lime-50/50' : 'border-gray-300 bg-gray-50/50 hover:border-lime-500 hover:bg-lime-50/20'}`}>
                    <input type="file" accept="application/pdf" required onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm ${resumeFile ? 'bg-lime-500 text-gray-950 shadow-lime-500/30 font-bold' : 'bg-white text-lime-600 border border-gray-200'}`}>
                        {resumeFile ? <CheckCircle size={26} /> : <UploadCloud size={26} />}
                      </div>
                      {resumeFile ? (
                        <div>
                           <span className="font-bold text-gray-900 block text-base sm:text-lg">{resumeFile.name}</span>
                           <span className="text-xs sm:text-sm text-lime-600 font-semibold mt-1 inline-block">✓ Ready to scan</span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-gray-900 block text-base sm:text-lg">Click or drag PDF here</span>
                          <span className="text-xs sm:text-sm text-gray-500 mt-1 block">Maximum file size 5MB (PDF only)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={!jobDescription || !resumeFile} 
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-lime-500 hover:text-gray-950 text-white py-4 rounded-xl font-bold text-base sm:text-lg transition-all disabled:opacity-40 disabled:hover:bg-gray-900 disabled:hover:text-white disabled:cursor-not-allowed shadow-xl shadow-gray-900/10 active:scale-[0.98] cursor-pointer"
                >
                  <Zap size={20} />
                  <span>Scan My Resume Now</span>
                </button>
              </form>
            </div>
          </div>
        ) : 

        /* STATE 3: RESULTS VIEW */
        (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div id="premium-report-content" className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden print:shadow-none print:border-0 relative">
                 
                 <div className="p-8 md:p-12 text-center border-b border-gray-200 bg-gradient-to-b from-gray-50/80 to-white">
                    <h2 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Your ATS Match Score</h2>
                    <div className={`text-7xl sm:text-8xl font-black tracking-tighter my-6 drop-shadow-sm ${result.match_score > 75 ? 'text-green-600' : 'text-red-500'}`}>
                        {result.match_score}%
                    </div>
                    <p className="text-gray-700 text-base sm:text-lg font-medium max-w-md mx-auto">
                        {result.match_score > 75 ? "Looking good! But you can still optimize for a perfect match." : "Warning: Your resume is highly likely to be automatically rejected by the ATS."}
                    </p>
                 </div>

                 {/* --- MEME WALL SHARE BUTTON --- */}
                <div className="mt-6 flex justify-center px-4">
                  <button
                    onClick={handleShareToWall}
                    disabled={isSharedToWall}
                    className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-xs flex items-center gap-2 ${
                      isSharedToWall 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                        : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:shadow-md border border-indigo-200 cursor-pointer'
                    }`}
                  >
                    {isSharedToWall ? (
                      <>
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>Added to the Roast Wall!</span>
                      </>
                    ) : (
                      <>
                        <span>🔥 Add my score to the Anonymous Roast Wall</span>
                      </>
                    )}
                  </button>
                </div>

                 <div className={`p-6 sm:p-8 md:p-12 ${!isUnlocked ? 'blur-md select-none opacity-40 pointer-events-none' : ''} transition-all duration-700`}>
                    
                    <div className="mb-12">
                      <h3 className="text-xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
                        <Zap className="text-amber-500" /> Critical Missing Keywords
                      </h3>
                      <div className="flex flex-wrap gap-2 sm:gap-2.5">
                          {result.missing_keywords?.map((word, index) => (
                              <span key={index} className="px-3.5 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-sm font-bold text-amber-900 shadow-xs">{word}</span>
                          ))}
                      </div>
                    </div>
                    
                    <div className="mb-12">
                      <h3 className="text-xl font-extrabold mb-4 text-gray-900 flex items-center gap-2">
                        <ScanSearch className="text-blue-500" /> AI Resume Critique
                      </h3>
                      <div className="bg-blue-50/70 p-6 rounded-xl border border-blue-200/80">
                        <p className="text-gray-800 leading-relaxed text-base sm:text-lg font-medium">{result.resume_critique}</p>
                      </div>
                    </div>

                    {/* Premium Unlocked Sections */}
                    <div className="pt-8 border-t border-gray-200">
                        <h3 className="text-xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
                          <Sparkles className="text-lime-600" /> AI-Rewritten Bullet Points
                        </h3>
                        <div className="space-y-4 mb-12">
                            {result.rewritten_bullets?.map((bullet, i) => (
                                <div key={i} className="p-5 sm:p-6 bg-lime-50/70 rounded-xl border border-lime-200 flex gap-4 items-start shadow-xs">
                                    <CheckCircle className="text-lime-600 shrink-0 mt-1" size={24} />
                                    <p className="text-gray-900 font-medium leading-relaxed text-base sm:text-lg">{bullet}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
                          <FileText className="text-purple-600" /> Tailored Cover Letter
                        </h3>
                        <div className="p-6 sm:p-8 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 whitespace-pre-wrap font-serif leading-loose text-base sm:text-lg shadow-inner">
                            {result.cover_letter}
                        </div>
                    </div>
                 </div>
             </div>

             {/* Bottom Action Bars */}
             {!isUnlocked ? (
                 <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 sm:p-6 text-center shadow-[0_-20px_40px_rgba(0,0,0,0.08)] print:hidden">
                    <div className="w-10 h-1 bg-gray-300 rounded-full mb-4 sm:hidden"></div>
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 flex items-center justify-center gap-2">
                      <Lock size={22} className="text-lime-600"/> Unlock Your Full Report
                    </h2>
                    <p className="text-gray-600 max-w-md mx-auto mb-5 font-medium text-xs sm:text-sm">
                      Get exact missing keywords, 3 AI-rewritten high-impact bullet points, and a custom cover letter to land the interview.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xl">
                        {!isDiscounted ? (
                            <button 
                                type="button"
                                onClick={handleShare} 
                                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3.5 rounded-xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/20 active:scale-95 cursor-pointer"
                            >
                                <MessageCircle size={22} /> Share for 50% Off
                            </button>
                        ) : (
                            <div className="flex-1 bg-green-50 border-2 border-green-200 text-green-800 px-5 py-3.5 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2">
                                <CheckCircle size={22} className="text-green-600" /> 50% Discount Applied!
                            </div>
                        )}

                        <button 
                            type="button"
                            onClick={handleUnlock} 
                            disabled={loading}
                            className="flex-1 bg-gray-900 hover:bg-black text-white px-5 py-3.5 rounded-xl font-bold text-base sm:text-lg shadow-xl shadow-gray-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95 cursor-pointer"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : (isDiscounted ? 'Unlock for ₹49' : 'Unlock for ₹99')}
                        </button>
                    </div>
                </div>
             ) : (
                <div className="flex flex-col sm:flex-row gap-4 pt-6 print:hidden">
                    <button 
                        type="button"
                        onClick={downloadPDF} 
                        className="flex-1 flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-gray-950 py-3.5 rounded-xl font-bold text-base sm:text-lg transition-all shadow-xl shadow-lime-500/20 active:scale-95 cursor-pointer"
                    >
                        <Download size={22} /> Download PDF Report
                    </button>
                    <button 
                        type="button"
                        onClick={() => { setResult(null); setIsUnlocked(false); setIsDiscounted(false); setScanText('Initializing AI...'); }} 
                        className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 py-3.5 rounded-xl font-bold text-base sm:text-lg transition-all active:scale-95 cursor-pointer"
                    >
                        Scan Another Resume
                    </button>
                </div>
             )}
          </div>
        )}
      </main>
    </div>
  );
}