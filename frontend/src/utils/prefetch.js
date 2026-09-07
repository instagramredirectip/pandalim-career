// Instant silk-touch route prefetching utility
const routeLoaders = {
  '/dashboard': () => import('../pages/Dashboard'),
  '/login': () => import('../pages/Login'),
  '/roast-wall': () => import('../pages/RoastWall'),
  '/tools': () => import('../pages/ToolsHub'),
  '/tools/job-description-keyword-extractor': () => import('../pages/JobKeywordExtractor'),
  '/tools/star-bullet-generator': () => import('../pages/StarBulletGenerator'),
  '/tools/ats-action-verbs': () => import('../pages/AtsActionVerbs'),
  '/tools/portfolio-builder': () => import('../pages/PortfolioBuilder'),
  '/portfolio-builder': () => import('../pages/PortfolioBuilder'),
  '/sitemap': () => import('../pages/Sitemap'),
  '/privacy-policy': () => import('../pages/PrivacyPolicy'),
  '/terms': () => import('../pages/Terms'),
  '/contact': () => import('../pages/Contact'),
  '/scanner': () => import('../pages/ScannerLanding'),
  '/regional': () => import('../pages/RegionalHome'),
};

const prefetched = new Set();

export function prefetchRoute(routePath) {
  if (!routePath || typeof routePath !== 'string' || prefetched.has(routePath)) return;
  
  let loader = routeLoaders[routePath];
  if (!loader) {
    if (routePath.startsWith('/scanner/')) {
      loader = routeLoaders['/scanner'];
    } else if (['/hi', '/ta', '/te', '/kn', '/mr', '/bn'].includes(routePath)) {
      loader = routeLoaders['/regional'];
    } else if (routePath.startsWith('/p/') || routePath.startsWith('/portfolio/')) {
      loader = () => import('../pages/PortfolioView');
    }
  }

  if (loader) {
    prefetched.add(routePath);
    try {
      loader();
    } catch {
      // Non-blocking prefetch failure
    }
  }
}

// Schedule idle prefetch for primary user journeys
export function scheduleIdlePrefetch() {
  if (typeof window === 'undefined') return;
  
  const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 2500));
  idleCallback(() => {
    prefetchRoute('/dashboard');
    prefetchRoute('/tools');
    prefetchRoute('/portfolio-builder');
  });
}

