import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ROLES, COMPANIES, SPECIAL_NICHES, getAllPseoSlugs, getPseoData } from '../src/data/pseoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://www.pandalime.com';

if (!fs.existsSync(distDir)) {
  console.error("dist directory not found. Please run 'vite build' first.");
  process.exit(1);
}

const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generatePageHtml({ title, description, canonicalPath, jsonLd, bodyContent }) {
  let html = templateHtml;
  const canonicalUrl = `${BASE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

  // Replace Title
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${safeTitle}</title>`);
  
  // Replace or inject meta description
  if (html.includes('name="description"')) {
    html = html.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${safeDescription}$2`);
  } else {
    html = html.replace(/<\/head>/i, `  <meta name="description" content="${safeDescription}" />\n</head>`);
  }

  // Replace or inject canonical
  if (html.includes('rel="canonical"')) {
    html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${canonicalUrl}$2`);
  } else {
    html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // Replace OpenGraph & Twitter
  html = html.replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/i, `$1${safeTitle}$2`);
  html = html.replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/i, `$1${safeDescription}$2`);
  html = html.replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/i, `$1${canonicalUrl}$2`);
  html = html.replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/i, `$1${safeTitle}$2`);
  html = html.replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/i, `$1${safeDescription}$2`);
  html = html.replace(/(<meta\s+name="twitter:url"\s+content=")[^"]*(")/i, `$1${canonicalUrl}$2`);

  // Inject JSON-LD Schema if present
  if (jsonLd) {
    const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    const scriptTags = schemas
      .map(s => `  <script type="application/ld+json">${JSON.stringify(s)}</script>`)
      .join('\n');
    html = html.replace(/<\/head>/i, `${scriptTags}\n</head>`);
  }

  // Inject initial semantic HTML inside #root for instant crawler parsing
  if (bodyContent) {
    html = html.replace('<div id="root"></div>', `<div id="root">${bodyContent}</div>`);
  }

  return html;
}

function writeStaticFile(routePath, htmlContent) {
  let targetPath;
  if (routePath === '/' || routePath === '') {
    targetPath = path.join(distDir, 'index.html');
  } else {
    const cleanRoute = routePath.replace(/^\/+/, '');
    const pageDir = path.join(distDir, cleanRoute);
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }
    targetPath = path.join(pageDir, 'index.html');
  }

  fs.writeFileSync(targetPath, htmlContent, 'utf8');
}

console.log('--- Starting Static Pre-Rendering (SSG) for PandaLime ---');

// 1. Home Page
const homeHtml = generatePageHtml({
  title: 'Free AI Resume Scanner & ATS Resume Checker | PandaLime',
  description: 'Scan your resume for free with PandaLime AI. Beat corporate ATS screening algorithms (Workday, Taleo, Greenhouse), find missing keywords, and get recruiter-ready bullet rewrites.',
  canonicalPath: '/',
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PandaLime AI Resume Scanner",
      "operatingSystem": "All Web Browsers",
      "applicationCategory": "BusinessApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Free AI-powered ATS resume scanner and checker. Scan resumes against job descriptions, uncover missing keywords, and optimize for Workday, Taleo, Greenhouse, and Lever."
    }
  ],
  bodyContent: `
    <main style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;">
      <h1>Free AI Resume Scanner & ATS Resume Checker</h1>
      <p>Over 98% of Fortune 500 companies use Applicant Tracking Systems (ATS) to filter resumes. PandaLime scans your resume against any job description, uncovers missing keywords, and helps you beat the bots to land interviews.</p>
      <h2>How PandaLime Works</h2>
      <ol>
        <li><strong>Upload Your Resume (PDF):</strong> Upload your resume to calculate your baseline ATS match score.</li>
        <li><strong>Paste Target Job Description:</strong> Our AI extracts required technical skills and hard keywords.</li>
        <li><strong>Optimize & Land Interviews:</strong> Get STAR-method rewritten bullets and missing keyword suggestions.</li>
      </ol>
      <h2>Supported ATS Platforms</h2>
      <p>Workday, Taleo (Oracle), Greenhouse, Lever, iCIMS, SAP SuccessFactors, BambooHR, and Ashby.</p>
      <h2>Explore Career ATS Scanners</h2>
      <ul>
        ${ROLES.map(r => `<li><a href="/scanner/${r.id}">${r.title} ATS Resume Scanner</a></li>`).join('')}
      </ul>
    </main>
  `
});
writeStaticFile('/', homeHtml);
console.log('✓ Pre-rendered: /');

// 2. Roast Wall
const roastHtml = generatePageHtml({
  title: 'Community Resume Roast Wall & AI ATS Critiques | PandaLime',
  description: 'Explore real, anonymous AI resume critiques, ATS match scores, and recruiter feedback. Learn from common resume mistakes to improve your application.',
  canonicalPath: '/roast-wall',
  bodyContent: `
    <main style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:sans-serif;">
      <h1>Community Resume Roast Wall</h1>
      <p>Anonymous AI feedback from recent resume scans. Learn from common resume mistakes and see real recruiter critiques.</p>
      <p><a href="/dashboard">Scan your resume for free</a> to get your own score and critique.</p>
    </main>
  `
});
writeStaticFile('/roast-wall', roastHtml);
console.log('✓ Pre-rendered: /roast-wall');

// 3. Sitemap Directory
const sitemapHtml = generatePageHtml({
  title: 'HTML Sitemap & ATS Resume Scanners Directory | PandaLime',
  description: 'Comprehensive directory of all free AI ATS resume scanners, employer keyword guides, and career optimization tools on PandaLime.',
  canonicalPath: '/sitemap',
  bodyContent: `
    <main style="max-width:1000px;margin:0 auto;padding:40px 20px;font-family:sans-serif;">
      <h1>PandaLime Career Directory & HTML Sitemap</h1>
      <h2>Core Pages</h2>
      <ul>
        <li><a href="/">Home - Free AI Resume Scanner</a></li>
        <li><a href="/dashboard">Resume Scanner Tool</a></li>
        <li><a href="/roast-wall">Community Roast Wall</a></li>
        <li><a href="/login">Account Login</a></li>
        <li><a href="/contact">Contact Support</a></li>
        <li><a href="/privacy-policy">Privacy Policy</a></li>
        <li><a href="/terms">Terms & Conditions</a></li>
      </ul>
      <h2>ATS Scanners by Role</h2>
      <ul>
        ${ROLES.map(r => `<li><a href="/scanner/${r.id}">${r.title} ATS Scanner</a></li>`).join('')}
      </ul>
      <h2>Specialized Portals</h2>
      <ul>
        ${SPECIAL_NICHES.map(n => `<li><a href="/scanner/${n.slug}">${n.title}</a></li>`).join('')}
      </ul>
      <h2>Top Employer ATS Scanners</h2>
      <ul>
        ${COMPANIES.map(c => `<li><a href="/scanner/software-engineer-at-${c.id}">${c.name} Software Engineer ATS Scanner</a></li>`).join('')}
      </ul>
    </main>
  `
});
writeStaticFile('/sitemap', sitemapHtml);
console.log('✓ Pre-rendered: /sitemap');

// 4. Contact
const contactHtml = generatePageHtml({
  title: 'Contact PandaLime Support & Career Services | PandaLime',
  description: 'Have questions about your ATS resume report, payment receipts, or feedback? Get in touch with PandaLime support team.',
  canonicalPath: '/contact',
  bodyContent: `
    <main style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:sans-serif;">
      <h1>Contact PandaLime Support</h1>
      <p>Have questions about your ATS report, billing, or feedback? Reach our support team at <a href="mailto:microapkdeveolper@gmail.com">microapkdeveolper@gmail.com</a>.</p>
    </main>
  `
});
writeStaticFile('/contact', contactHtml);
console.log('✓ Pre-rendered: /contact');

// 5. Privacy Policy
const privacyHtml = generatePageHtml({
  title: 'Privacy Policy | PandaLime Career',
  description: 'Learn how PandaLime protects your personal data, resume documents, and privacy during AI resume scans and career optimization.',
  canonicalPath: '/privacy-policy',
  bodyContent: `
    <main style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:sans-serif;">
      <h1>Privacy Policy</h1>
      <p>PandaLime processes your resume strictly in memory to generate ATS match scores. We do not sell your personal data or resume text to third-party recruiters.</p>
    </main>
  `
});
writeStaticFile('/privacy-policy', privacyHtml);
console.log('✓ Pre-rendered: /privacy-policy');

// 6. Terms
const termsHtml = generatePageHtml({
  title: 'Terms & Conditions | PandaLime Career',
  description: 'Review the Terms of Service and usage conditions for PandaLime AI resume scanning and optimization services.',
  canonicalPath: '/terms',
  bodyContent: `
    <main style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:sans-serif;">
      <h1>Terms & Conditions</h1>
      <p>By using PandaLime Career, you agree to our terms of service for AI-assisted resume scanning and optimization.</p>
    </main>
  `
});
writeStaticFile('/terms', termsHtml);
console.log('✓ Pre-rendered: /terms');

// 7. Login & Dashboard
const loginHtml = generatePageHtml({
  title: 'Sign In & Account Login | PandaLime Career',
  description: 'Log in to PandaLime Career to access your ATS resume analysis reports, saved job scans, and career insights.',
  canonicalPath: '/login'
});
writeStaticFile('/login', loginHtml);
console.log('✓ Pre-rendered: /login');

const dashboardHtml = generatePageHtml({
  title: 'Free AI Resume Scanner & Score Dashboard | PandaLime',
  description: 'Upload your resume PDF and target job description to get an instant ATS match score, critical missing keywords, and actionable AI feedback.',
  canonicalPath: '/dashboard'
});
writeStaticFile('/dashboard', dashboardHtml);
console.log('✓ Pre-rendered: /dashboard');

// 8. Pre-render ALL Programmatic SEO Pages
const allSlugs = getAllPseoSlugs();
let pseoCount = 0;

allSlugs.forEach(slug => {
  const pData = getPseoData(slug);
  if (!pData) return;

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "ATS Scanners", "item": `${BASE_URL}/sitemap` },
      { "@type": "ListItem", "position": 3, "name": pData.title, "item": `${BASE_URL}/scanner/${slug}` }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What keywords does the ATS look for in a ${pData.roleName} resume?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `For ${pData.roleName} roles, applicant tracking systems scan for technical proficiencies like ${pData.topKeywords.slice(0, 5).join(', ')}, alongside demonstrated project architecture and quantified STAR-method accomplishments.`
        }
      },
      {
        "@type": "Question",
        "name": `How does ${pData.companyName} use ATS to filter ${pData.roleName} applications?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${pData.companyName} receives thousands of applications per opening and utilizes ${pData.atsType} to parse resumes.`
        }
      }
    ]
  };

  const pSEOContent = `
    <main style="max-width:1000px;margin:0 auto;padding:40px 20px;font-family:sans-serif;">
      <nav aria-label="breadcrumb">
        <a href="/">Home</a> &gt; <a href="/sitemap">ATS Scanners</a> &gt; <span>${escapeHtml(pData.roleName)}</span>
      </nav>
      <h1>${escapeHtml(pData.title)}</h1>
      <p>${escapeHtml(pData.description)}</p>
      <h2>How ATS Filters Score ${escapeHtml(pData.roleName)} Resumes</h2>
      <p>${escapeHtml(pData.overview)}</p>
      <h3>${escapeHtml(pData.companyName)} Screening Priorities</h3>
      <p>${escapeHtml(pData.hiringFocus)}</p>
      <h3>Must-Have ATS Keywords for ${escapeHtml(pData.roleName)}</h3>
      <ul>
        ${pData.topKeywords.map(k => `<li>${escapeHtml(k)}</li>`).join('')}
      </ul>
      <p><a href="/dashboard">Scan Your ${escapeHtml(pData.roleName)} Resume for Free</a></p>
    </main>
  `;

  const pageHtml = generatePageHtml({
    title: `${pData.title} | PandaLime`,
    description: pData.description,
    canonicalPath: `/scanner/${slug}`,
    jsonLd: [breadcrumbsJsonLd, faqJsonLd],
    bodyContent: pSEOContent
  });

  writeStaticFile(`/scanner/${slug}`, pageHtml);
  pseoCount++;
});

console.log(`✓ Successfully pre-rendered ${pseoCount} programmatic SEO landing pages into /dist/scanner/!`);
console.log('--- Static Pre-Rendering Completed Successfully! ---');

