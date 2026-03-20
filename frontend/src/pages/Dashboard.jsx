import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  
  // NEW: State for the dynamic scanning text
  const [scanText, setScanText] = useState('Initializing AI...');

  const navigate = useNavigate();

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

  const handleLogout = () => {
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
        setIsUnlocked(false); 
        setIsDiscounted(false);
      } else {
        alert(data.error || "Analysis failed.");
      }
    } catch (error) {
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
                } catch (err) {
                    alert("Verification error. Please contact support.");
                }
            },
            theme: { color: '#84cc16' }
        };

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
    <div className="min-h-screen bg-gray-50/50 font-sans pb-32 print:bg-white print:pb-0">
      
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

      <nav className="print:hidden bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 text-lime-400 rounded-lg flex items-center justify-center font-bold shadow-sm">
            <Zap size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">PandaLime</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12 print:py-4">
        
        {/* STATE 1: LOADING / SCANNING ANIMATION */}
        {loading && !result ? (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
            <div className="relative w-64 h-80 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center pt-8">
              {/* Fake PDF Content */}
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mb-6 text-lime-500">
                 <FileText size={32} />
              </div>
              <div className="w-3/4 h-2.5 bg-gray-100 rounded-full mb-8"></div>
              <div className="w-5/6 space-y-3">
                <div className="h-2 bg-gray-100 rounded-full w-full"></div>
                <div className="h-2 bg-gray-100 rounded-full w-5/6"></div>
                <div className="h-2 bg-gray-100 rounded-full w-4/6"></div>
                <div className="h-2 bg-gray-100 rounded-full w-full mt-6"></div>
                <div className="h-2 bg-gray-100 rounded-full w-3/4"></div>
              </div>

              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

              {/* The Scanning Laser */}
              <div className="absolute left-0 w-full h-[3px] bg-lime-500 shadow-[0_0_20px_6px_rgba(132,204,22,0.4)] animate-scan z-10"></div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4">
              <ScanSearch className="text-lime-500 animate-pulse" size={32} />
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{scanText}</h2>
              <p className="text-gray-500">Please wait while our AI models evaluate your profile...</p>
            </div>
          </div>
        ) : 

        /* STATE 2: UPLOAD FORM */
        !result ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-100 text-lime-800 font-semibold text-sm mb-6">
                <Sparkles size={16} /> Advanced AI Scanner
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Beat the Corporate AI Filter</h1>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">Upload your resume to see exactly how a recruiter's Applicant Tracking System scores your profile.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-10">
              <form onSubmit={handleScan} className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                    <Briefcase size={18} className="text-lime-500" /> Target Job Description
                  </label>
                  <textarea 
                    required 
                    rows={5} 
                    value={jobDescription} 
                    onChange={(e) => setJobDescription(e.target.value)} 
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-lime-500/20 focus:border-lime-500 outline-none resize-none transition-all shadow-sm" 
                    placeholder="Paste the requirements from the job posting here..." 
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                    <FileText size={18} className="text-lime-500" /> Your Resume (PDF only)
                  </label>
                  <div className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer group ${resumeFile ? 'border-lime-400 bg-lime-50/50' : 'border-gray-200 hover:border-lime-400 hover:bg-gray-50'}`}>
                    <input type="file" accept="application/pdf" required onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${resumeFile ? 'bg-lime-500 text-white' : 'bg-white text-lime-500 border border-gray-100'}`}>
                        {resumeFile ? <CheckCircle size={28} /> : <UploadCloud size={28} />}
                      </div>
                      {resumeFile ? (
                        <div>
                           <span className="font-bold text-gray-900 block text-lg">{resumeFile.name}</span>
                           <span className="text-sm text-lime-600 font-medium mt-1">Ready to scan</span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-gray-900 block text-lg">Click or drag PDF here</span>
                          <span className="text-sm text-gray-400 mt-1">Maximum file size 5MB</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={!jobDescription || !resumeFile} 
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-gray-900/20 active:scale-[0.98]"
                >
                  Scan My Resume Now
                </button>
              </form>
            </div>
          </div>
        ) : 

        /* STATE 3: RESULTS VIEW */
        (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div id="premium-report-content" className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden print:shadow-none print:border-0 relative">
                 
                 <div className="p-8 md:p-12 text-center border-b border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                    <h2 className="text-xl font-bold text-gray-500 uppercase tracking-widest text-sm mb-4">Your ATS Match Score</h2>
                    <div className={`text-8xl font-black tracking-tighter my-6 drop-shadow-sm ${result.match_score > 75 ? 'text-green-500' : 'text-red-500'}`}>
                        {result.match_score}%
                    </div>
                    <p className="text-gray-600 text-lg font-medium max-w-md mx-auto">
                        {result.match_score > 75 ? "Looking good! But you can still optimize for a perfect match." : "Warning: Your resume is highly likely to be automatically rejected by the ATS."}
                    </p>
                 </div>

                 <div className={`p-8 md:p-12 ${!isUnlocked ? 'blur-md select-none opacity-40 pointer-events-none' : ''} transition-all duration-700`}>
                    
                    <div className="mb-12">
                      <h3 className="text-xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
                        <Zap className="text-amber-500" /> Critical Missing Keywords
                      </h3>
                      <div className="flex flex-wrap gap-3">
                          {result.missing_keywords?.map((word, index) => (
                              <span key={index} className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm">{word}</span>
                          ))}
                      </div>
                    </div>
                    
                    <div className="mb-12">
                      <h3 className="text-xl font-extrabold mb-4 text-gray-900 flex items-center gap-2">
                        <ScanSearch className="text-blue-500" /> AI Resume Critique
                      </h3>
                      <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                        <p className="text-gray-700 leading-relaxed text-lg">{result.resume_critique}</p>
                      </div>
                    </div>

                    {/* Premium Unlocked Sections */}
                    <div className="pt-8 border-t border-gray-100">
                        <h3 className="text-xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
                          <Sparkles className="text-lime-500" /> AI-Rewritten Bullet Points
                        </h3>
                        <div className="space-y-4 mb-12">
                            {result.rewritten_bullets?.map((bullet, i) => (
                                <div key={i} className="p-6 bg-lime-50/50 rounded-2xl border border-lime-100 flex gap-4 items-start shadow-sm">
                                    <CheckCircle className="text-lime-500 shrink-0 mt-1" size={24} />
                                    <p className="text-gray-800 font-medium leading-relaxed text-lg">{bullet}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
                          <FileText className="text-purple-500" /> Tailored Cover Letter
                        </h3>
                        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 whitespace-pre-wrap font-serif leading-loose text-lg shadow-inner">
                            {result.cover_letter}
                        </div>
                    </div>
                 </div>
             </div>

             {/* Bottom Action Bars */}
             {!isUnlocked ? (
                 <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl border-t border-gray-200/50 p-6 text-center shadow-[0_-20px_40px_rgba(0,0,0,0.05)] print:hidden">
                    <div className="w-12 h-1 bg-gray-200 rounded-full mb-4 sm:hidden"></div>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2 flex items-center justify-center gap-2">
                      <Lock size={24} className="text-lime-500"/> Unlock Your Full Report
                    </h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-6 font-medium text-sm">
                      Get exact missing keywords, 3 AI-rewritten high-impact bullet points, and a custom cover letter to land the interview.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                        {!isDiscounted ? (
                            <button 
                                type="button"
                                onClick={handleShare} 
                                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/20 active:scale-95"
                            >
                                <MessageCircle size={22} /> Share for 50% Off
                            </button>
                        ) : (
                            <div className="flex-1 bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
                                <CheckCircle size={22} /> 50% Discount Applied!
                            </div>
                        )}

                        <button 
                            type="button"
                            onClick={handleUnlock} 
                            disabled={loading}
                            className="flex-1 bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-gray-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95 cursor-pointer"
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
                        className="flex-1 flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-lime-500/20 active:scale-95 cursor-pointer"
                    >
                        <Download size={22} /> Download PDF Report
                    </button>
                    <button 
                        type="button"
                        onClick={() => { setResult(null); setIsUnlocked(false); setIsDiscounted(false); setScanText('Initializing AI...'); }} 
                        className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 cursor-pointer"
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