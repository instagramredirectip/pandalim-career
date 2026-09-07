import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.pandalime.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

export default function SEOHead({
  title = 'Free AI Resume Scanner & ATS Resume Checker | PandaLime',
  description = 'Beat the ATS with PandaLime free AI resume scanner. Get instant ATS match scores, discover missing keywords, and get recruiter-approved bullet rewrites.',
  canonical = '/',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  noIndex = false,
  lang = 'en',
  jsonLd = null
}) {
  const cleanPath = canonical ? (canonical.startsWith('/') ? canonical : `/${canonical}`) : '/';
  const fullCanonicalUrl = cleanPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`;

  // Normalize JSON-LD schemas
  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  const localeMap = {
    en: 'en_US',
    hi: 'hi_IN',
    ta: 'ta_IN',
    te: 'te_IN',
    kn: 'kn_IN',
    mr: 'mr_IN',
    bn: 'bn_IN'
  };

  const ogLocale = localeMap[lang] || 'en_US';

  return (
    <Helmet>
      {/* HTML Lang */}
      <html lang={lang} />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="trustpilot-one-time-domain-verification-id" content="94427953-efd2-453e-81b0-a22137a77a5b" />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* International SEO: Hreflang Tags */}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/`} />
      <link rel="alternate" hrefLang="en" href={`${BASE_URL}/`} />
      <link rel="alternate" hrefLang="en-IN" href={`${BASE_URL}/`} />
      <link rel="alternate" hrefLang="hi" href={`${BASE_URL}/hi`} />
      <link rel="alternate" hrefLang="ta" href={`${BASE_URL}/ta`} />
      <link rel="alternate" hrefLang="te" href={`${BASE_URL}/te`} />
      <link rel="alternate" hrefLang="kn" href={`${BASE_URL}/kn`} />
      <link rel="alternate" hrefLang="mr" href={`${BASE_URL}/mr`} />
      <link rel="alternate" hrefLang="bn" href={`${BASE_URL}/bn`} />

      {/* Crawl Directives */}
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        }
      />
      <meta
        name="googlebot"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        }
      />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="PandaLime Career" />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
