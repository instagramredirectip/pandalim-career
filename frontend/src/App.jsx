import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import CookieConsent from './components/CookieConsent';
import TrustpilotWidget from './components/TrustpilotWidget';
import { scheduleIdlePrefetch } from './utils/prefetch';

// Lazy-loaded routes for ultra-fast initial bundle and code-splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Contact = lazy(() => import('./pages/Contact'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const RoastWall = lazy(() => import('./pages/RoastWall'));
const ScannerLanding = lazy(() => import('./pages/ScannerLanding'));
const RegionalHome = lazy(() => import('./pages/RegionalHome'));
const ToolsHub = lazy(() => import('./pages/ToolsHub'));
const JobKeywordExtractor = lazy(() => import('./pages/JobKeywordExtractor'));
const StarBulletGenerator = lazy(() => import('./pages/StarBulletGenerator'));
const AtsActionVerbs = lazy(() => import('./pages/AtsActionVerbs'));
const PortfolioBuilder = lazy(() => import('./pages/PortfolioBuilder'));
const PortfolioView = lazy(() => import('./pages/PortfolioView'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Dedicated Android App Mode Routes (Isolated from main website)
const AppHome = lazy(() => import('./pages/AppHome'));
const AppScanner = lazy(() => import('./pages/AppScanner'));
const AppPortfolio = lazy(() => import('./pages/AppPortfolio'));

// Minimalist zero-CLS route loading fallback indicator
function RouteFallback() {
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-50 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="h-full bg-lime-500 w-full animate-pulse opacity-80" />
    </div>
  );
}

function App() {
  useEffect(() => {
    scheduleIdlePrefetch();
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Dedicated Android WebView App Edition Routes (Sandboxed) */}
            <Route path="/app" element={<AppHome />} />
            <Route path="/app/home" element={<AppHome />} />
            <Route path="/app/scanner" element={<AppScanner />} />
            <Route path="/app/portfolio" element={<AppPortfolio />} />
            <Route path="/app/portfolio-builder" element={<AppPortfolio />} />

            {/* Core Website Routes */}
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

            {/* Career Guides & Editorial Blog */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

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
        </Suspense>
        
        {/* Global Non-Intrusive GDPR/DPDP Cookie Consent Banner */}
        <CookieConsent />

        {/* Global Smart Trustpilot Review Widget */}
        <TrustpilotWidget />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;