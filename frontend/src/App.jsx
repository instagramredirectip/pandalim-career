import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import RoastWall from './pages/RoastWall';
import ScannerLanding from './pages/ScannerLanding';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core App Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/wall" element={<RoastWall />} />
        
        {/* Legal & Info Routes */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Visual HTML Sitemap for Humans */}
        <Route path="/sitemap" element={<Sitemap />} />

        {/* Dynamic Programmatic SEO Route */}
        <Route path="/scanner/:slug" element={<ScannerLanding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;