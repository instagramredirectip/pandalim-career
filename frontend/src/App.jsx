import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import RoastWall from './pages/RoastWall';
import ScannerLanding from './pages/ScannerLanding';
import RegionalHome from './pages/RegionalHome';
import ToolsHub from './pages/ToolsHub';
import JobKeywordExtractor from './pages/JobKeywordExtractor';
import StarBulletGenerator from './pages/StarBulletGenerator';
import AtsActionVerbs from './pages/AtsActionVerbs';
import PortfolioBuilder from './pages/PortfolioBuilder';
import PortfolioView from './pages/PortfolioView';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Core App Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/roast-wall" element={<RoastWall />} />
          
          {/* Free ATS & Career Tools Suite */}
          <Route path="/tools" element={<ToolsHub />} />
          <Route path="/tools/job-description-keyword-extractor" element={<JobKeywordExtractor />} />
          <Route path="/tools/star-bullet-generator" element={<StarBulletGenerator />} />
          <Route path="/tools/ats-action-verbs" element={<AtsActionVerbs />} />
          <Route path="/tools/portfolio-builder" element={<PortfolioBuilder />} />
          <Route path="/portfolio-builder" element={<PortfolioBuilder />} />

          {/* Hosted Public Portfolio Pages */}
          <Route path="/p/:slug" element={<PortfolioView />} />
          <Route path="/portfolio/:slug" element={<PortfolioView />} />

          {/* Indian Language Regional Routes */}
          <Route path="/hi" element={<RegionalHome />} />
          <Route path="/ta" element={<RegionalHome />} />
          <Route path="/te" element={<RegionalHome />} />
          <Route path="/kn" element={<RegionalHome />} />
          <Route path="/mr" element={<RegionalHome />} />
          <Route path="/bn" element={<RegionalHome />} />
          
          {/* Legal & Info Routes - Match backend routes exactly */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Visual HTML Sitemap for Humans */}
          <Route path="/sitemap" element={<Sitemap />} />

          {/* Dynamic Programmatic SEO Route */}
          <Route path="/scanner/:slug" element={<ScannerLanding />} />
        </Routes>
        
        {/* Global Non-Intrusive GDPR/DPDP Cookie Consent Banner */}
        <CookieConsent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;