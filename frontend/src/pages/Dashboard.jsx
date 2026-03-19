import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, Briefcase, Zap, Loader2, LogOut, Lock, CheckCircle, Download, MessageCircle } from 'lucide-react';

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
 
  // NEW: State to track if they earned the discount
  const [isDiscounted, setIsDiscounted] = useState(false);

  const navigate = useNavigate();

 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleFileChange = (e) => {
    const filesList = e.target.files[0];
    const file = filesList; 
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
      // 1. Removed the "token" check here.
      // 2. Removed the "headers: { Authorization... }" from the fetch call.
      const res = await fetch('https://pandalime-backend.onrender.com/api/analyze', {
        method: 'POST',
        body: formData 
      });
      
      const data = await res.json();
      if (data.success) {
        setResult(data.analysis);
        setReportId(data.reportId); 
        setIsUnlocked(false); 
        setIsDiscounted(false); // Reset discount on new scan
      } else {
        alert(data.error || "Analysis failed.");
      }
    } catch (error) {
      alert("Server error. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // NEW: WhatsApp Viral Share Function
  const handleShare = () => {
    const message = encodeURIComponent("I just found out why my resume is getting rejected by corporate bots 🤯. Check your exact ATS score for free at https://pandalime.com before you apply for your next job!");
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
    
    // Automatically apply the discount after they click share!
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

        // Send the isDiscounted state to the backend
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
            description: isDiscounted? 'Premium Report (50% Off)' : 'Premium Report Unlock',
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
    <div className="min-h-screen bg-gray-50 font-sans pb-32 print:bg-white print:pb-0">
      <nav className="print:hidden bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 text-lime-400 rounded-lg flex items-center justify-center font-bold">
            <Zap size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">PandaLime</span>
        </div>
        
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12 print:py-4">
        {!result? (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Beat the Corporate AI Filter</h1>
              <p className="text-gray-500 text-lg">Upload your resume to see your exact ATS match score.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <form onSubmit={handleScan} className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                    <Briefcase size={18} className="text-lime-600" /> Target Job Description
                  </label>
                  <textarea required rows={5} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 outline-none resize-none bg-gray-50/50" placeholder="Paste the job description here..." />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                    <FileText size={18} className="text-lime-600" /> Your Resume (PDF only)
                  </label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 cursor-pointer group">
                    <input type="file" accept="application/pdf" required onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} />
                      </div>
                      {resumeFile? <span className="font-medium text-gray-900">{resumeFile.name}</span> : <span className="font-medium text-gray-900">Click or drag PDF here</span>}
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={loading ||!jobDescription ||!resumeFile} className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-70 shadow-md">
                  {loading? <Loader2 className="animate-spin" size={24} /> : 'Scan My Resume'}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="space-y-6">
             <div id="premium-report-content" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none print:border-0">
                 
                 <div className="p-8 text-center border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your ATS Match Score</h2>
                    <div className={`text-6xl font-extrabold my-6 ${result.match_score > 75? 'text-green-500' : 'text-red-500'}`}>
                        {result.match_score}%
                    </div>
                    <p className="text-gray-600">
                        {result.match_score > 75? "Looking good! But you can still improve." : "Warning: Your resume is highly likely to be automatically rejected by the ATS."}
                    </p>
                 </div>

                 <div className={`p-8 ${!isUnlocked? 'blur-sm select-none opacity-40' : ''} transition-all duration-500`}>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Critical Missing Keywords</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {result.missing_keywords?.map((word, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-sm font-medium text-gray-800">{word}</span>
                        ))}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-900">AI Resume Critique</h3>
                    <p className="text-gray-700 leading-relaxed text-lg mb-8">{result.resume_critique}</p>

                    {isUnlocked && (
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-gray-900">AI-Rewritten Bullet Points (Copy & Paste)</h3>
                            <div className="space-y-4 mb-8">
                                {result.rewritten_bullets?.map((bullet, i) => (
                                    <div key={i} className="p-4 bg-lime-50 rounded-xl border border-lime-100 flex gap-3 items-start">
                                        <CheckCircle className="text-lime-600 shrink-0 mt-0.5" size={20} />
                                        <p className="text-gray-800 font-medium leading-relaxed">{bullet}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 className="text-xl font-bold mb-4 text-gray-900">Your Tailored Cover Letter</h3>
                            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 whitespace-pre-wrap font-serif leading-loose">
                                {result.cover_letter}
                            </div>
                        </div>
                    )}
                 </div>
             </div>

             {!isUnlocked? (
                 <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md border-t border-gray-200 p-6 text-center shadow-[0_-10px_40px_rgba(0,0,0,0.1)] print:hidden">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2"><Lock size={20} className="text-lime-600"/> Unlock Your Full Report</h2>
                    <p className="text-gray-600 max-w-md mx-auto mb-4 font-medium text-sm">Get exact missing keywords, 3 AI-rewritten bullet points, and a custom cover letter to land the interview.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                        {/* Viral Share Button */}
                        {!isDiscounted? (
                            <button 
                                type="button"
                                onClick={handleShare} 
                                className="flex-1 bg- hover:bg-[#20bd5a] text-white px-6 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-/20"
                            >
                                <MessageCircle size={20} /> Share to get 50% Off
                            </button>
                        ) : (
                            <div className="flex-1 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2">
                                <CheckCircle size={20} /> 50% Discount Applied!
                            </div>
                        )}

                        {/* Payment Button */}
                        <button 
                            type="button"
                            onClick={handleUnlock} 
                            disabled={loading}
                            className="flex-1 bg-lime-500 hover:bg-lime-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-lime-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                        >
                            {loading? <Loader2 className="animate-spin" size={24} /> : (isDiscounted? 'Unlock for ₹49' : 'Unlock for ₹99')}
                        </button>
                    </div>
                </div>
             ) : (
                <div className="flex flex-col sm:flex-row gap-4 pt-4 print:hidden">
                    <button 
                        type="button"
                        onClick={downloadPDF} 
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold text-lg transition-all shadow-md cursor-pointer"
                    >
                        <Download size={20} /> Download PDF Report
                    </button>
                    <button 
                        type="button"
                        onClick={() => { setResult(null); setIsUnlocked(false); setIsDiscounted(false); }} 
                        className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 py-4 rounded-xl font-semibold text-lg transition-all cursor-pointer"
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