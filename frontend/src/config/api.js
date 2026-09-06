// Centralized API configuration for PandaLime
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const BACKEND_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_URL) 
  ? import.meta.env.VITE_BACKEND_URL 
  : (isLocalhost ? 'http://localhost:5000' : 'https://pandalime-backend.onrender.com');

export async function apiRequest(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = endpoint.startsWith('http') ? endpoint : `${BACKEND_URL}${cleanEndpoint}`;
  
  try {
    const res = await fetch(fullUrl, options);
    if (res.ok) return res;
    // If backend URL returned non-ok and was cross-origin, attempt fallback to relative route
    if (!endpoint.startsWith('http') && typeof window !== 'undefined' && BACKEND_URL !== window.location.origin) {
      try {
        const fallbackRes = await fetch(cleanEndpoint, options);
        if (fallbackRes.ok) return fallbackRes;
      } catch {
        // ignore fallback error
      }
    }
    return res;
  } catch (err) {
    // Network failure on main backend, try relative path
    if (!endpoint.startsWith('http') && typeof window !== 'undefined') {
      try {
        return await fetch(cleanEndpoint, options);
      } catch {
        // ignore fallback error
      }
    }
    throw err;
  }
}
