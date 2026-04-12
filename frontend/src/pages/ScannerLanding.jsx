import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ScannerLanding() {
  const { slug } = useParams();

  // Convert 'software-engineer' into 'Software Engineer'
  const formattedNiche = slug
    ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Your';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          The Ultimate AI ATS Resume Scanner for <br/>
          <span className="text-green-500">{formattedNiche}s</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stop getting rejected by automated filters. We've analyzed thousands of {formattedNiche} job descriptions. Optimize your exact keywords, beat the algorithms, and land interviews at top tech companies.
        </p>
        
        <div className="pt-8">
          {/* This directs them right back into your main funnel/scanner */}
          <Link to="/" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 shadow-lg inline-block">
            Scan My Resume For Free
          </Link>
        </div>
      </div>
    </div>
  );
}