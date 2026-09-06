import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/translations';

export default function LanguageSelector({ variant = 'nav' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Detect current language from pathname (e.g. /hi, /ta, or default en)
  const currentLangCode = location.pathname.split('/')[1] || 'en';
  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === currentLangCode) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang) => {
    setIsOpen(false);
    if (lang.code === 'en') {
      navigate('/');
    } else {
      navigate(`/${lang.code}`);
    }
  };

  const isFooter = variant === 'footer';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
          isFooter
            ? 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:text-white'
            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-lime-50 hover:text-lime-800 hover:border-lime-300 shadow-sm'
        }`}
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-lime-500" />
        <span>{currentLang.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute ${isFooter ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 w-48 rounded-2xl shadow-xl py-2 z-50 border ${
            isFooter
              ? 'bg-gray-900 border-gray-800 text-gray-200'
              : 'bg-white border-gray-200 text-gray-800'
          } animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
            Select Language / भाषा
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang)}
                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? isFooter
                      ? 'bg-lime-500/20 text-lime-400 font-bold'
                      : 'bg-lime-50 text-lime-800 font-bold'
                    : isFooter
                    ? 'hover:bg-gray-800 hover:text-white'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{lang.nativeName}</span>
                  <span className="text-[10px] text-gray-400">({lang.name})</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-lime-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
