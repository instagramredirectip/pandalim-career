/**
 * Security & Sanitization Utilities for PandaLime
 * Defends against Cross-Site Scripting (XSS), URL injection, and payload abuse.
 */

/**
 * Validates and sanitizes external URLs.
 * Strictly permits only http, https, and mailto schemes.
 * Neutralizes javascript:, data:, vbscript:, and relative malicious vectors.
 * 
 * @param {string} url - The untrusted user-supplied URL
 * @returns {string} - The safe, sanitized URL or empty string
 */
export function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // Block dangerous schemes
  if (/^(javascript|data|vbscript|file):/i.test(trimmed)) {
    return '';
  }

  // Allow standard safe web schemes
  if (/^(https?:\/\/|mailto:)/i.test(trimmed)) {
    return trimmed;
  }

  // Handle bare domain links like "github.com/user"
  if (/^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\.[a-z]{2,}(\/.*)?$/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  // Discard anything unrecognized
  return '';
}

/**
 * Strips HTML tags and script elements from user-supplied strings.
 * 
 * @param {string} text - The untrusted user-supplied text
 * @param {number} maxLength - Maximum allowable string length
 * @returns {string} - The sanitized string
 */
export function sanitizeText(text, maxLength = 1000) {
  if (!text || typeof text !== 'string') return '';
  
  // Strip HTML tags
  const clean = text
    .replace(/<[^>]*>?/gm, '')
    .trim();

  if (maxLength && clean.length > maxLength) {
    return clean.slice(0, maxLength);
  }

  return clean;
}
