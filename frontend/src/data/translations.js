// Multi-language translation dictionary for PandaLime Career
// Focus on Indian languages (Hindi, Tamil, Telugu, Kannada, Marathi, Bengali) + English

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', path: '/', isDefault: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', path: '/hi' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', path: '/ta' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', path: '/te' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', path: '/kn' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', path: '/mr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', path: '/bn' }
];

export const TRANSLATIONS = {
  en: {
    seoTitle: 'Free AI Resume Scanner & ATS Resume Checker | PandaLime',
    seoDesc: 'Scan your resume for free with PandaLime AI. Beat corporate ATS screening algorithms (Workday, Taleo, Greenhouse, TCS iON), find missing keywords, and get recruiter-ready bullet rewrites.',
    badge: 'Free AI-Powered ATS Resume Scanner & Checker',
    h1Main: 'Free AI Resume Scanner &',
    h1Highlight: 'ATS Keyword Checker',
    heroSubtitle: 'Over 98% of Fortune 500 & Indian tech giants (TCS, Infosys, Wipro, Google) use Applicant Tracking Systems (ATS). PandaLime scans your resume against any job description, uncovers missing keywords, and helps you land interviews.',
    scanButton: 'Scan Resume for Free',
    scanButtonShort: 'Scan Free',
    viewCommunity: 'View Community Wall',
    freeBadge: 'Free instant scan • No login required • PDF supported',
    marqueeTitle: 'Trusted by candidates targeting top Indian & Global tech employers',
    howItWorksTitle: 'How PandaLime Scans & Optimizes Your Resume',
    howItWorksSubtitle: 'Three straightforward steps to bypass automated resume filters and get your profile in front of hiring managers.',
    steps: [
      {
        title: '1. Upload Resume (PDF)',
        desc: 'Upload your resume in PDF format. No login or credit card required for your instant baseline ATS match score.'
      },
      {
        title: '2. Paste Target Job Description',
        desc: 'Our neural parser cross-references your resume with the job requirements, identifying missing technical skills and keywords.'
      },
      {
        title: '3. Optimize & Land Interviews',
        desc: 'Follow the AI critique to inject missing keywords, optimize bullet points with the STAR method, and pass recruiter screening.'
      }
    ],
    pillarsTitle: 'What Does an ATS Resume Checker Actually Test?',
    pillarsSubtitle: 'Recruiting algorithms score candidates on 4 critical dimensions:',
    pillars: [
      { title: 'Semantic Keyword Match', desc: 'Identifies missing technical tools, programming languages, and domain skills.' },
      { title: 'Format & Layout Compliance', desc: 'Checks that standard headings, fonts, and single-column structures extract cleanly.' },
      { title: 'STAR Impact Metrics', desc: 'Evaluates bullet points for action verbs, measurable metrics, and business ROI.' },
      { title: 'Recruiter Filter Simulation', desc: 'Simulates how enterprise ATS filters (Workday, Taleo, iON) rank candidate pools.' }
    ],
    featuresTitle: 'Everything You Need to Beat the Resume Screening Bots',
    features: [
      { title: 'Deep ATS Keyword Gap Analysis', desc: 'Find the exact skills and keywords you are missing.' },
      { title: 'Actionable AI Resume Critique', desc: 'Clear explanation of why recruiters might reject you and how to fix it.' },
      { title: 'AI-Rewritten STAR Bullets', desc: 'Rewrite weak bullet points into high-impact, quantified statements.' },
      { title: 'Tailored AI Cover Letter', desc: 'Generate a customized 150-word cover letter in one click.' }
    ],
    faqsTitle: 'Frequently Asked Questions (FAQ)',
    faqs: [
      {
        q: 'What is an ATS (Applicant Tracking System) resume scanner?',
        a: 'An ATS resume scanner is software used by employers (like TCS, Infosys, Google, Amazon, Wipro) to parse and rank resumes before a human recruiter reads them.'
      },
      {
        q: 'How does PandaLime help Indian job seekers and freshers?',
        a: 'PandaLime is optimized for Indian campus placements (TCS NQT, InfyTQ, Wipro Elite) and lateral hiring at top tech hubs like Bengaluru, Hyderabad, Pune, NCR, and Chennai.'
      },
      {
        q: 'Is this resume scanner completely free to use?',
        a: 'Yes! The baseline ATS match score, keyword gap analysis, and AI critique are 100% free with no credit card required.'
      },
      {
        q: 'Which ATS platforms are supported?',
        a: 'PandaLime supports all major enterprise ATS platforms including Workday, Taleo, TCS iON, Greenhouse, Lever, iCIMS, and SAP SuccessFactors.'
      }
    ],
    footerAbout: 'Helping job seekers across India and worldwide scan resumes for free, uncover critical ATS keyword gaps, and land high-paying tech careers.'
  },

  hi: {
    seoTitle: 'फ्री AI रेज़्युमे स्कैनर और ATS चेकर | PandaLime Career',
    seoDesc: 'PandaLime AI के साथ अपना रेज़्युमे फ्री में स्कैन करें। TCS, Infosys, Wipro और Google जैसे टॉप कंपनियों के ATS एल्गोरिदम को समझें और मिसिंग कीवर्ड्स ठीक करें।',
    badge: 'फ्री AI-पावर्ड ATS रेज़्युमे स्कैनर और चेकर',
    h1Main: 'फ्री AI रेज़्युमे स्कैनर और',
    h1Highlight: 'ATS कीवर्ड चेकर',
    heroSubtitle: 'भारत और दुनिया की 98% से अधिक टेक कंपनियाँ (TCS, Infosys, Wipro, Google, Amazon) रेज़्युमे फिल्टर करने के लिए ATS सॉफ्टवेयर का उपयोग करती हैं। PandaLime आपके रेज़्युमे को जॉब डिस्क्रिप्शन से मैच करके मिसिंग कीवर्ड्स खोजता है।',
    scanButton: 'रेज़्युमे फ्री में स्कैन करें',
    scanButtonShort: 'फ्री स्कैन',
    viewCommunity: 'कम्युनिटी वॉल देखें',
    freeBadge: '100% फ्री स्कैन • लॉगिन की आवश्यकता नहीं • PDF सपोर्टेड',
    marqueeTitle: 'भारतीय और वैश्विक टेक कंपनियों में इंटरव्यू पाने के लिए भरोसेमंद',
    howItWorksTitle: 'PandaLime कैसे काम करता है?',
    howItWorksSubtitle: '3 आसान स्टेप्स में रेज़्युमे फिल्टर को पार करें और रिक्रूटर तक पहुंचें।',
    steps: [
      {
        title: '1. रेज़्युमे (PDF) अपलोड करें',
        desc: 'अपना करंट PDF रेज़्युमे अपलोड करें। बेसिक ATS स्कोर के लिए किसी लॉगिन या कार्ड की जरूरत नहीं।'
      },
      {
        title: '2. जॉब डिस्क्रिप्शन पेस्ट करें',
        desc: 'हमारा AI मॉडल आपकी प्रोफाइल और जॉब रिक्वायरमेंट्स की तुलना करके छूटे हुए कीवर्ड्स की पहचान करता है।'
      },
      {
        title: '3. रेज़्युमे ऑप्टिमाइज़ करें और इंटरव्यू पाएं',
        desc: 'AI सुझावों के अनुसार जरूरी कीवर्ड्स और STAR मेथड बुलेट्स जोड़कर अपना सिलेक्शन चांस बढ़ाएं।'
      }
    ],
    pillarsTitle: 'ATS रेज़्युमे स्कैनर क्या चेक करता है?',
    pillarsSubtitle: 'कंपनियों का रिक्रूटमेंट सॉफ्टवेयर इन 4 मुख्य बातों पर रेज़्युमे को स्कोर करता है:',
    pillars: [
      { title: 'सीमेंटिक कीवर्ड मैच', desc: 'जॉब से जुड़े टेक्निकल टूल्स और स्किल्स की जांच करता है।' },
      { title: 'फॉर्मेट और लेआउट चेकिंग', desc: 'यह सुनिश्चित करता है कि फॉन्ट, हेडिंग और सिंगल कॉलम फॉर्मेट सही से रीड हो सके।' },
      { title: 'STAR इम्पैक्ट स्कोरिंग', desc: 'आपके बुलेट पॉइंट्स में एक्शन वर्ब्स और मापे जा सकने वाले रिजल्ट्स चेक करता है।' },
      { title: 'रिक्रूटर फिल्टर सिमुलेशन', desc: 'TCS iON, Workday, Taleo जैसे फिल्टर्स की तरह काम करके फाइनल स्कोर देता है।' }
    ],
    featuresTitle: 'रेज़्युमे स्क्रीनिंग पास करने के लिए जरूरी टूल्स',
    features: [
      { title: 'डीप ATS कीवर्ड एनालिसिस', desc: 'सटीक टेक्निकल और सॉफ्ट स्किल्स की पहचान करें जो आपके रेज़्युमे में गायब हैं।' },
      { title: 'AI रेज़्युमे फीडबैक', desc: 'स्पष्ट फीडबैक पाएं कि रिक्रूटर आपका रेज़्युमे क्यों रिजेक्ट कर सकते हैं।' },
      { title: 'AI द्वारा रीराइट किए गए बुलेट्स', desc: 'Google के X-Y-Z फॉर्मूले के साथ इम्पैक्टफुल बुलेट्स बनाएं।' },
      { title: 'कस्टमाइज्ड कवर लेटर', desc: 'एक क्लिक में जॉब के अनुसार 150 शब्दों का प्रभावी कवर लेटर जनरेट करें।' }
    ],
    faqsTitle: 'अक्सर पूछे जाने वाले सवाल (FAQ)',
    faqs: [
      {
        q: 'ATS (Applicant Tracking System) क्या है?',
        a: 'ATS एक सॉफ्टवेयर है जिसका उपयोग TCS, Infosys, Google, Wipro जैसी कंपनियाँ हजारों रेज़्युमे में से बेस्ट कैंडिडेट्स को शॉर्टलिस्ट करने के लिए करती हैं।'
      },
      {
        q: 'क्या यह रेज़्युमे स्कैनर पूरी तरह से फ्री है?',
        a: 'हाँ! बेसिक ATS मैच स्कोर, कीवर्ड गैप एनालिसिस और AI फीडबैक पूरी तरह से फ्री है।'
      },
      {
        q: 'TCS NQT और फ्रेशर्स हायरिंग के लिए यह कैसे मदद करता है?',
        a: 'PandaLime फ्रेशर्स और कॉलेज प्लेसमेंट के लिए आवश्यक कोर टेक्निकल स्किल्स (Java, Python, DBMS, Projects) को ऑप्टिमाइज़ करने में मदद करता है।'
      },
      {
        q: 'सपोर्टेड ATS सॉफ्टवेयर कौन से हैं?',
        a: 'PandaLime TCS iON, Workday, Taleo, Greenhouse, Lever, iCIMS आदि सभी प्रमुख प्लेटफॉर्म्स के लिए अनुकूलित है।'
      }
    ],
    footerAbout: 'भारत और दुनिया भर के प्रोफेशनल्स के लिए फ्री AI रेज़्युमे स्कैनर और करियर ऑप्टिमाइजेशन प्लेटफॉर्म।'
  },

  ta: {
    seoTitle: 'இலவச AI ரெஸ்யூம் ஸ்கேனர் & ATS சரிபார்ப்பு | PandaLime',
    seoDesc: 'PandaLime AI மூலம் உங்கள் ரெஸ்யூமை இலவசமாக ஸ்கேன் செய்யுங்கள். TCS, Infosys, Wipro, Google போன்ற நிறுவனங்களின் ATS வடிகட்டிகளை கடந்து நேர்காணல்களை வெல்லுங்கள்.',
    badge: 'இலவச AI ரெஸ்யூம் ஸ்கேனர்',
    h1Main: 'இலவச AI ரெஸ்யூம் ஸ்கேனர் &',
    h1Highlight: 'ATS முக்கிய சொல் சரிபார்ப்பு',
    heroSubtitle: 'முன்னணி தகவல் தொழில்நுட்ப நிறுவனங்கள் (TCS, Infosys, Wipro, Google) விண்ணப்பங்களை தேர்ந்தெடுக்க ATS மென்பொருளை பயன்படுத்துகின்றன. PandaLime உங்கள் ரெஸ்யூமில் விடுபட்ட முக்கிய திறன்களை கண்டறிகிறது.',
    scanButton: 'ரெஸ்யூமை இலவசமாக ஸ்கேன் செய்',
    scanButtonShort: 'இலவச ஸ்கேன்',
    viewCommunity: 'சமூக சுவரைப் பார்',
    freeBadge: '100% இலவசம் • லாகின் தேவையில்லை • PDF ஆதரவு',
    marqueeTitle: 'இந்திய மற்றும் சர்வதேச ஐடி நிறுவனங்களில் வேலை வாய்ப்பு பெற உதவுகிறது',
    howItWorksTitle: 'PandaLime எவ்வாறு செயல்படுகிறது?',
    howItWorksSubtitle: '3 எளிய படிகளில் உங்கள் ரெஸ்யூமை மேம்படுத்துங்கள்.',
    steps: [
      { title: '1. ரெஸ்யூம் (PDF) பதிவேற்றவும்', desc: 'உங்கள் PDF ரெஸ்யூமை பதிவேற்றி உடனடி ATS மதிப்பெண்ணை பெறுங்கள்.' },
      { title: '2. வேலை விவரத்தை உள்ளிடவும்', desc: 'வேலை விவரத்துடன் ஒப்பிட்டு விடுபட்ட திறன்களை கண்டறியுங்கள்.' },
      { title: '3. மேம்படுத்தி நேர்காணல் வெல்லுங்கள்', desc: 'AI பரிந்துரைகளின்படி மாற்றங்களை செய்து நேர்காணல் வாய்ப்புகளை அதிகரியுங்கள்.' }
    ],
    pillarsTitle: 'ATS ஸ்கேனர் எவற்றை சோதிக்கிறது?',
    pillarsSubtitle: 'நிறுவனங்களின் மென்பொருள் 4 முக்கிய அம்சங்களை சோதிக்கிறது:',
    pillars: [
      { title: 'முக்கிய திறன்கள் பொருத்தம்', desc: 'வேலைக்கு தேவையான தொழில்நுட்ப திறன்களை சரிபார்க்கிறது.' },
      { title: 'படிவ அமைப்பு சரிபார்ப்பு', desc: 'ரெஸ்யூம் வடிவம் மற்றும் எழுத்துருக்களை துல்லியமாக படிக்கிறது.' },
      { title: 'STAR தாக்கம்', desc: 'உங்கள் சாதனைகளை அளவிடக்கூடிய அளவுகோல்களுடன் மதிப்பிடுகிறது.' },
      { title: 'வடிகட்டி உருவகப்படுத்துதல்', desc: 'TCS iON, Workday போன்ற தளங்களின் வடிகட்டுதல் முறையை சோதிக்கிறது.' }
    ],
    featuresTitle: 'ரெஸ்யூம் தேர்ச்சி பெற தேவையான அனைத்தும்',
    features: [
      { title: 'விடுபட்ட முக்கிய திறன்கள் பகுப்பாய்வு', desc: 'உங்கள் ரெஸ்யூமில் விடுபட்ட துல்லியமான சொற்களை கண்டறியுங்கள்.' },
      { title: 'செயல்முறை AI கருத்து', desc: 'நிராகரிக்கப்படுவதற்கான காரணங்களை சரிசெய்யும் விளக்கம்.' },
      { title: 'AI திருத்திய புள்ளிகள்', desc: 'தாக்கத்தை ஏற்படுத்தும் வகையில் வாக்கியங்களை மாற்றி அமையுங்கள்.' },
      { title: 'பொருத்தமான கவர் லெட்டர்', desc: 'ஒரே கிளிக்கில் வேலைக்கு ஏற்ற கவர் லெட்டரை உருவாக்குங்கள்.' }
    ],
    faqsTitle: 'அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQ)',
    faqs: [
      { q: 'ATS என்றால் என்ன?', a: 'ATS என்பது நிறுவனங்கள் ஆயிரக்கணக்கான விண்ணப்பங்களில் இருந்து சிறந்தவற்றை தேர்ந்தெடுக்க பயன்படுத்தும் தானியங்கி மென்பொருள்.' },
      { q: 'இது முற்றிலும் இலவசமா?', a: 'ஆம்! அடிப்படை ATS ஸ்கோர் மற்றும் விடுபட்ட திறன்கள் பகுப்பாய்வு 100% இலவசம்.' },
      { q: 'TCS, Infosys வேலைகளுக்கு இது உதவுமா?', a: 'ஆம், இந்திய ஐடி நிறுவனங்களின் நேர்காணல் தரநிலைகளுக்கு ஏற்ப இது வடிவமைக்கப்பட்டுள்ளது.' }
    ],
    footerAbout: 'இந்திய வேலை தேடுபவர்களுக்கான இலவச AI ரெஸ்யூம் ஸ்கேனர் மற்றும் தொழில் வழிகாட்டி.'
  },

  te: {
    seoTitle: 'ఉచిత AI రెజ్యూమ్ స్కానర్ & ATS చెకర్ | PandaLime',
    seoDesc: 'PandaLime AI తో మీ రెజ్యూమ్‌ను ఉచితంగా స్కాన్ చేయండి. TCS, Infosys, Wipro, Google వంటి సంస్థల ATS ఫిల్టర్లను సులభంగా క్లియర్ చేయండి.',
    badge: 'ఉచిత AI రెజ్యూమ్ స్కానర్',
    h1Main: 'ఉచిత AI రెజ్యూమ్ స్కానర్ &',
    h1Highlight: 'ATS కీవర్డ్ చెకర్',
    heroSubtitle: 'ప్రముఖ టెక్ కంపెనీలు (TCS, Infosys, Wipro, Google) అభ్యర్థులను ఫిల్టర్ చేయడానికి ATS సాఫ్ట్‌వేర్‌ను ఉపయోగిస్తాయి. PandaLime మీ రెజ్యూమ్‌లో లోపించిన ముఖ్యమైన కీవర్డ్స్‌ను గుర్తిస్తుంది.',
    scanButton: 'రెజ్యూమ్ ఉచితంగా స్కాన్ చేయండి',
    scanButtonShort: 'ఉచిత స్కాన్',
    viewCommunity: 'కమ్యూనిటీ వాల్ చూడండి',
    freeBadge: '100% ఉచితం • లాగిన్ అవసరం లేదు • PDF సపోర్ట్',
    marqueeTitle: 'టాప్ టెక్ కంపెనీలలో జాబ్ సాధించడానికి వేలాది మంది విశ్వసించారు',
    howItWorksTitle: 'PandaLime ఎలా పనిచేస్తుంది?',
    howItWorksSubtitle: '3 సులభమైన దశల్లో మీ రెజ్యూమ్‌ను ఆప్టిమైజ్ చేసుకోండి.',
    steps: [
      { title: '1. రెజ్యూమ్ (PDF) అప్‌లోడ్ చేయండి', desc: 'మీ రెజ్యూమ్‌ను అప్‌లోడ్ చేసి తక్షణ ATS స్కోర్ పొందండి.' },
      { title: '2. జాబ్ డిస్క్రిప్షన్ పేస్ట్ చేయండి', desc: 'జాబ్ అవసరాలతో సరిపోల్చి మిస్సయిన స్కిల్స్ తెలుసుకోండి.' },
      { title: '3. ఆప్టిమైజ్ చేసి ఇంటర్వ్యూలు సాధించండి', desc: 'AI సూచనలతో రెజ్యూమ్‌ను మార్చి రిక్రూటర్ల దృష్టిని ఆకర్షించండి.' }
    ],
    pillarsTitle: 'ATS స్కానర్ ఏమి పరిశీలిస్తుంది?',
    pillarsSubtitle: 'కంపెనీల అల్గోరిథంలు 4 ప్రధాన అంశాలను లెక్కిస్తాయి:',
    pillars: [
      { title: 'కీవర్డ్స్ సరిపోలిక', desc: 'ఉద్యోగానికి అవసరమైన టెక్నికల్ స్కిల్స్ పరిశీలిస్తుంది.' },
      { title: 'ఫార్మాట్ అనుకూలత', desc: 'ఫాంట్లు, హెడ్డింగ్‌లు సరిగ్గా రీడ్ అవుతున్నాయో లేదో చూస్తుంది.' },
      { title: 'STAR ఇంపాక్ట్ స్కోర్', desc: 'మీ విజయాలను నంబర్లు మరియు ప్రభావంతో కొలుస్తుంది.' },
      { title: 'ఫిల్టర్ సిమ్యులేషన్', desc: 'TCS iON, Workday వంటి వ్యవస్థల ఆధారంగా స్కోర్ ఇస్తుంది.' }
    ],
    featuresTitle: 'రెజ్యూమ్ ఆప్టిమైజేషన్ కోసం పూర్తి టూల్స్',
    features: [
      { title: 'లోపించిన కీవర్డ్స్ గుర్తింపు', desc: 'మీ రెజ్యూమ్‌లో లేని ముఖ్యమైన నైపుణ్యాలను కనుగొనండి.' },
      { title: 'AI రెజ్యూమ్ ఫీడ్‌బ్యాక్', desc: 'రెజ్యూమ్ ఎందుకు తిరస్కరించబడుతుందో మరియు ఎలా సరిదిద్దాలో వివరణ.' },
      { title: 'AI రీరైట్ బుల్లెట్స్', desc: 'గూగుల్ X-Y-Z ఫార్ములాతో బలమైన బుల్లెట్ పాయింట్లు రాయండి.' },
      { title: 'టైలర్డ్ కవర్ లెటర్', desc: 'ఒక్క క్లిక్‌తో ఉద్యోగానికి సరిపోయే కవర్ లెటర్ రూపొందించండి.' }
    ],
    faqsTitle: 'తరచుగా అడిగే ప్రశ్నలు (FAQ)',
    faqs: [
      { q: 'ATS అంటే ఏమిటి?', a: 'ATS అనేది వేలాది అప్లికేషన్లలో సరైన రెజ్యూమ్‌లను ఎంపిక చేయడానికి కంపెనీలు వాడే సాఫ్ట్‌వేర్.' },
      { q: 'ఇది పూర్తిగా ఉచితమా?', a: 'అవును! ప్రాథమిక ATS స్కోర్ మరియు కీవర్డ్ విశ్లేషణ 100% ఉచితం.' },
      { q: 'ఇండియన్ ఐటీ కంపెనీల కోసం ఇది ఎలా సహాయపడుతుంది?', a: 'TCS NQT, Infosys, Wipro వంటి రిక్రూట్‌మెంట్లకు తగినట్లుగా ఇది నిర్మించబడింది.' }
    ],
    footerAbout: 'భారతీయ ఉద్యోగార్ధుల కోసం ఉచిత AI రెజ్యూమ్ స్కానర్ మరియు కెరీర్ ప్లాట్‌ఫారమ్.'
  },

  kn: {
    seoTitle: 'ಉಚಿತ AI ರೆಸ್ಯೂಮ್ ಸ್ಕ್ಯಾನರ್ ಮತ್ತು ATS ಚೆಕರ್ | PandaLime',
    seoDesc: 'PandaLime AI ಮೂಲಕ ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ಅನ್ನು ಉಚಿತವಾಗಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ. TCS, Infosys, Wipro, Google ನಂತಹ ಕಂಪನಿಗಳ ATS ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಸುಲಭವಾಗಿ ಪಾಸ್ ಮಾಡಿ.',
    badge: 'ಉಚಿತ AI ರೆಸ್ಯೂಮ್ ಸ್ಕ್ಯಾನರ್',
    h1Main: 'ಉಚಿತ AI ರೆಸ್ಯೂಮ್ ಸ್ಕ್ಯಾನರ್ &',
    h1Highlight: 'ATS ಕೀವರ್ಡ್ ಪರೀಕ್ಷಕ',
    heroSubtitle: 'ಪ್ರಮುಖ ಟೆಕ್ ಕಂಪನಿಗಳು ರೆಸ್ಯೂಮ್ ಫಿಲ್ಟರ್ ಮಾಡಲು ATS ಸಾಫ್ಟ್‌ವೇರ್ ಬಳಸುತ್ತವೆ. PandaLime ನಿಮ್ಮ ರೆಸ್ಯೂಮ್‌ನಲ್ಲಿ ಕಳೆದುಹೋದ ಕೀವರ್ಡ್‌ಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ.',
    scanButton: 'ರೆಸ್ಯೂಮ್ ಉಚಿತವಾಗಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    scanButtonShort: 'ಉಚಿತ ಸ್ಕ್ಯಾನ್',
    viewCommunity: 'ಕಮ್ಯುನಿಟಿ ವಾಲ್ ನೋಡಿ',
    freeBadge: '100% ಉಚಿತ • ಲಾಗಿನ್ ಅಗತ್ಯವಿಲ್ಲ • PDF ಬೆಂಬಲಿತ',
    marqueeTitle: 'ಭಾರತೀಯ ಹಾಗೂ ಜಾಗತಿಕ ಟೆಕ್ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ಉದ್ಯೋಗ ಪಡೆಯಲು ಸಹಾಯಕ',
    howItWorksTitle: 'PandaLime ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?',
    howItWorksSubtitle: '3 ಸರಳ ಹಂತಗಳಲ್ಲಿ ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ಸುಧಾರಿಸಿ.',
    steps: [
      { title: '1. ರೆಸ್ಯೂಮ್ (PDF) ಅಪ್ಲೋಡ್ ಮಾಡಿ', desc: 'ನಿಮ್ಮ PDF ರೆಸ್ಯೂಮ್ ಅಪ್ಲೋಡ್ ಮಾಡಿ ತಕ್ಷಣ ATS ಸ್ಕೋರ್ ಪಡೆಯಿರಿ.' },
      { title: '2. ಉದ್ಯೋಗ ವಿವರಣೆ ನಮೂದಿಸಿ', desc: 'ಅಗತ್ಯವಿರುವ ಸ್ಕಿಲ್‌ಗಳೊಂದಿಗೆ ಹೋಲಿಸಿ ಕಳೆದುಹೋದ ಅಂಶಗಳನ್ನು ತಿಳಿಯಿರಿ.' },
      { title: '3. ಸುಧಾರಿಸಿ ಸಂದರ್ಶನ ಪಡೆಯಿರಿ', desc: 'AI ಸಲಹೆಗಳನ್ನು ಅನುಸರಿಸಿ ಸಂದರ್ಶನ ಅವಕಾಶಗಳನ್ನು ಹೆಚ್ಚಿಸಿಕೊಳ್ಳಿ.' }
    ],
    pillarsTitle: 'ATS ಸ್ಕ್ಯಾನರ್ ಏನನ್ನು ಪರೀಕ್ಷಿಸುತ್ತದೆ?',
    pillarsSubtitle: 'ಕಂಪನಿಗಳ ಅಲ್ಗಾರಿದಮ್‌ಗಳು 4 ಮುಖ್ಯ ವಿಷಯಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತವೆ:',
    pillars: [
      { title: 'ಕೀವರ್ಡ್ ಹೊಂದಾಣಿಕೆ', desc: 'ಉದ್ಯೋಗಕ್ಕೆ ಅಗತ್ಯವಿರುವ ತಾಂತ್ರಿಕ ಕೌಶಲ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.' },
      { title: 'ಫಾರ್ಮ್ಯಾಟ್ ಪರೀಕ್ಷೆ', desc: 'ಫಾಂಟ್‌ಗಳು ಮತ್ತು ರಚನೆಯನ್ನು ನಿಖರವಾಗಿ ಓದುತ್ತದೆ.' },
      { title: 'STAR ಪ್ರಭಾವ', desc: 'ನಿಮ್ಮ ಸಾಧನೆಗಳನ್ನು ಅಳೆಯಬಹುದಾದ ಮಾನದಂಡಗಳೊಂದಿಗೆ ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ.' },
      { title: 'ಫಿಲ್ಟರ್ ಸಿಮ್ಯುಲೇಶನ್', desc: 'TCS iON, Workday ಮುಂತಾದ ಸಿಸ್ಟಂಗಳಿಗೆ ತಕ್ಕಂತೆ ಸ್ಕೋರ್ ನೀಡುತ್ತದೆ.' }
    ],
    featuresTitle: 'ರೆಸ್ಯೂಮ್ ಸಿದ್ಧಪಡಿಸಲು ಅಗತ್ಯವಿರುವ ಪರಿಕರಗಳು',
    features: [
      { title: 'ಕೀವರ್ಡ್ ವಿಶ್ಲೇಷಣೆ', desc: 'ನಿಮ್ಮ ರೆಸ್ಯೂಮ್‌ನಲ್ಲಿ ಬಿಟ್ಟುಹೋದ ಕೌಶಲ್ಯಗಳನ್ನು ಹುಡುಕಿ.' },
      { title: 'AI ವಿಮರ್ಶೆ', desc: 'ತಿರಸ್ಕಾರಕ್ಕೆ ಕಾರಣಗಳನ್ನು ಸರಿಪಡಿಸಲು ಸ್ಪಷ್ಟ ವಿವರಣೆ.' },
      { title: 'AI ಮಾರ್ಪಡಿತ ಬುಲೆಟ್‌ಗಳು', desc: 'ಹೆಚ್ಚು ಪ್ರಭಾವಶಾಲಿ ವಾಕ್ಯಗಳನ್ನು ರಚಿಸಿ.' },
      { title: 'ಕವರ್ ಲೆಟರ್ ರಚನೆ', desc: 'ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಸೂಕ್ತ ಕವರ್ ಲೆಟರ್ ಪಡೆಯಿರಿ.' }
    ],
    faqsTitle: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು (FAQ)',
    faqs: [
      { q: 'ATS ಎಂದರೇನು?', a: 'ATS ಎಂದರೆ ಸಾವಿರಾರು ಅರ್ಜಿಗಳಿಂದ ಅತ್ಯುತ್ತಮ ಅಭ್ಯರ್ಥಿಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಬಳಸುವ ಸಾಫ್ಟ್‌ವೇರ್.' },
      { q: 'ಇದು ಸಂಪೂರ್ಣ ಉಚಿತವೇ?', a: 'ಹೌದು! ಮೂಲಭೂತ ATS ಸ್ಕೋರ್ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ 100% ಉಚಿತವಾಗಿದೆ.' }
    ],
    footerAbout: 'ಭಾರತೀಯ ಉದ್ಯೋಗಾಕಾಂಕ್ಷಿಗಳಿಗೆ ಉಚಿತ AI ರೆಸ್ಯೂಮ್ ಸ್ಕ್ಯಾನರ್.'
  },

  mr: {
    seoTitle: 'मोफत AI रेझ्युमे स्कॅनर आणि ATS चेकर | PandaLime',
    seoDesc: 'PandaLime AI सह तुमचा रेझ्युमे मोफत स्कॅन करा. TCS, Infosys, Wipro, Google सारख्या कंपन्यांचे ATS फिल्टर्स पार करा आणि मुलाखती मिळवा.',
    badge: 'मोफत AI रेझ्युमे स्कॅनर',
    h1Main: 'मोफत AI रेझ्युमे स्कॅनर आणि',
    h1Highlight: 'ATS कीवर्ड चेकर',
    heroSubtitle: 'प्रमुख टेक कंपन्या (TCS, Infosys, Wipro, Google) रेझ्युमे निवडण्यासाठी ATS सॉफ्टवेअर वापरतात. PandaLime तुमच्या रेझ्युमेमधील मिसिंग कीवर्ड्स शोधते.',
    scanButton: 'रेझ्युमे मोफत स्कॅन करा',
    scanButtonShort: 'मोफत स्कॅन',
    viewCommunity: 'कम्युनिटी वॉल पहा',
    freeBadge: '100% मोफत • लॉगिन आवश्यक नाही • PDF सपोर्ट',
    marqueeTitle: 'भारतीय आणि जागतिक टेक कंपन्यांमध्ये जॉब मिळवण्यासाठी विश्वासू',
    howItWorksTitle: 'PandaLime कसे काम करते?',
    howItWorksSubtitle: '3 सोप्या स्टेप्समध्ये तुमचा रेझ्युमे सुधारा.',
    steps: [
      { title: '1. रेझ्युमे (PDF) अपलोड करा', desc: 'तुमचा PDF रेझ्युमे अपलोड करा आणि तात्काळ ATS स्कोअर मिळवा.' },
      { title: '2. जॉब डिस्क्रिप्शन पेस्ट करा', desc: 'जॉबच्या गरजेनुसार तपासून आवश्यक कीवर्ड्स शोधा.' },
      { title: '3. रेझ्युमे ऑप्टिमाइझ करा', desc: 'AI सल्ल्यानुसार बदल करून मुलाखतीचे चान्सेस वाढवा.' }
    ],
    pillarsTitle: 'ATS स्कॅनर काय तपासतो?',
    pillarsSubtitle: 'कंपन्यांचे सॉफ्टवेअर 4 महत्त्वाच्या घटकांवर स्कोअर देते:',
    pillars: [
      { title: 'कीवर्ड मॅच', desc: 'कामासाठी लागणारे टेक्निकल स्किल्स तपासतो.' },
      { title: 'फॉर्मेट तपासणी', desc: 'फॉन्ट आणि लेआउट व्यवस्थित वाचता येतो का ते तपासतो.' },
      { title: 'STAR इम्पॅक्ट', desc: 'तुमच्या कामगिरीचे अचूक मोजमाप करतो.' },
      { title: 'फिल्टर सिम्युलेशन', desc: 'TCS iON, Workday सारख्या प्रणालींनुसार स्कोअर देतो.' }
    ],
    featuresTitle: 'रेझ्युमे यशस्वी करण्यासाठी आवश्यक साधने',
    features: [
      { title: 'कीवर्ड गॅप विश्लेषण', desc: 'रेझ्युमेमध्ये नसलेले महत्त्वाचे शब्द शोधा.' },
      { title: 'AI रेझ्युमे फीडबॅक', desc: 'रिजेक्शन टाळण्यासाठी स्पष्ट मार्गदर्शन.' },
      { title: 'AI बुलेट पॉઇंट्स', desc: 'गुगलच्या X-Y-Z फॉर्म्युल्यानुसार प्रभावी वाक्ये तयार करा.' },
      { title: 'कव्हर लेटर निर्मिती', desc: 'एका क्लिकवर जॉबला साजेसे कव्हर लेटर तयार करा.' }
    ],
    faqsTitle: 'सतत विचारले जाणारे प्रश्न (FAQ)',
    faqs: [
      { q: 'ATS म्हणजे काय?', a: 'ATS हे कंपन्यांद्वारे हजारो रेझ्युमेमधून योग्य उमेदवारांची निवड करण्यासाठी वापरले जाणारे सॉफ्टवेअर आहे.' },
      { q: 'हे पूर्णपणे मोफत आहे का?', a: 'होय! मूलभूत ATS स्कोअर आणि कीवर्ड विश्लेषण 100% मोफत आहे.' }
    ],
    footerAbout: 'भारतीय नोकरी शोधणाऱ्यांसाठी मोफत AI रेझ्युमे स्कॅनर आणि करिअर प्लॅटफॉर्म.'
  },

  bn: {
    seoTitle: 'বিনামূল্যে AI রিজিউম স্ক্যানার এবং ATS পরীক্ষক | PandaLime',
    seoDesc: 'PandaLime AI এর সাথে আপনার রিজিউম বিনামূল্যে স্ক্যান করুন। TCS, Infosys, Wipro, Google এর মতো কোম্পানির ATS ফিল্টার অতিক্রম করুন।',
    badge: 'বিনামূল্যে AI রিজিউম স্ক্যানার',
    h1Main: 'বিনামূল্যে AI রিজিউম স্ক্যানার এবং',
    h1Highlight: 'ATS কীওয়ার্ড চেকার',
    heroSubtitle: 'শীর্ষস্থানীয় টেক কোম্পানিগুলি (TCS, Infosys, Wipro, Google) রিজিউম ফিল্টার করতে ATS ব্যবহার করে। PandaLime আপনার রিজিউমের অনুপস্থিত কীওয়ার্ড চিহ্নিত করে।',
    scanButton: 'রিজিউম বিনামূল্যে স্ক্যান করুন',
    scanButtonShort: 'ফ্রি স্ক্যান',
    viewCommunity: 'কমিউনিটি ওয়াল দেখুন',
    freeBadge: '১০০% বিনামূল্যে • লগইন প্রয়োজন নেই • PDF সমর্থিত',
    marqueeTitle: 'শীর্ষ প্রযুক্তি সংস্থায় চাকরির সুযোগ পেতে সহায়ক',
    howItWorksTitle: 'PandaLime কীভাবে কাজ করে?',
    howItWorksSubtitle: '৩টি সহজ ধাপে আপনার রিজিউম অপ্টিমাইজ করুন।',
    steps: [
      { title: '১. রিজিউম (PDF) আপলোড করুন', desc: 'আপনার PDF রিজিউম আপলোড করে তাৎক্ষণিক ATS স্কোর পান।' },
      { title: '২. চাকরির বিবরণ পেস্ট করুন', desc: 'চাকরির চাহিদার সাথে তুলনা করে প্রয়োজনীয় কীওয়ার্ড খুঁজুন।' },
      { title: '৩. অপ্টিমাইজ করে ইন্টারভিউ পান', desc: 'AI পরামর্শ মেনে রিজিউম উন্নত করে ইন্টারভিউয়ের সুযোগ বাড়ান।' }
    ],
    pillarsTitle: 'ATS স্ক্যানার কী পরীক্ষা করে?',
    pillarsSubtitle: 'কোম্পানিগুলির অ্যালগরিদম ৪টি মূল বিষয় মূল্যায়ন করে:',
    pillars: [
      { title: 'কীওয়ার্ড মিল', desc: 'প্রয়োজনীয় প্রযুক্তিগত দক্ষতা যাচাই করে।' },
      { title: 'ফরম্যাট সম্মতি', desc: 'ফন্ট এবং লেআউট সঠিকভাবে পড়া যাচ্ছে কিনা তা দেখে।' },
      { title: 'STAR প্রভাব', desc: 'আপনার সাফল্য পরিমাপযোগ্য মেট্রিক্সে মূল্যায়ন করে।' },
      { title: 'ফিল্টার সিমুলেশন', desc: 'TCS iON, Workday সিস্টেমের মতো চূড়ান্ত স্কোর দেয়।' }
    ],
    featuresTitle: 'রিজিউম সফল করার সমস্ত প্রয়োজনীয় টুলস',
    features: [
      { title: 'অনুপস্থিত কীওয়ার্ড বিশ্লেষণ', desc: 'রিজিউমে বাদ পড়া প্রযুক্তিগত শব্দগুলি চিহ্নিত করুন।' },
      { title: 'AI রিজিউম পর্যালোচনা', desc: 'বাতিল হওয়ার কারণ সংশোধন করার স্পষ্ট ব্যাখ্যা।' },
      { title: 'AI বুলেট পয়েন্ট', desc: 'গুগল X-Y-Z ফর্মুলায় শক্তিশালী বাক্য তৈরি করুন।' },
      { title: 'কভার লেটার জেনারেটর', desc: 'এক ক্লিকে মানানসই কভার লেটার তৈরি করুন।' }
    ],
    faqsTitle: 'সাধারণ জিজ্ঞাসা (FAQ)',
    faqs: [
      { q: 'ATS কী?', a: 'ATS হলো এমন একটি সফটওয়্যার যা কোম্পানিগুলি হাজার হাজার আবেদনের মধ্য থেকে সেরা প্রার্থীদের নির্বাচন করতে ব্যবহার করে।' },
      { q: 'এটি কি সম্পূর্ণ বিনামূল্যে?', a: 'হ্যাঁ! প্রাথমিক ATS স্কোর এবং কীওয়ার্ড বিশ্লেষণ ১০০% বিনামূল্যে।' }
    ],
    footerAbout: 'ভারতীয় চাকরিপ্রার্থীদের জন্য বিনামূল্যে AI রিজিউম স্ক্যানার এবং ক্যারিয়ার প্ল্যাটফর্ম।'
  }
};

