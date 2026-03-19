import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Make sure Dashboard is just a normal route like Home! */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/login" element={<Login />} />
        
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;