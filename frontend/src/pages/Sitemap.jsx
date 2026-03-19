import React from 'react';
import { Map, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sitemap() {
  const routes = [
    { title: "Main Pages", links: [
      { name: "Home", path: "/" },
      { name: "Resume Dashboard (App)", path: "/dashboard" },
      { name: "Login / Sign Up", path: "/login" }
    ]},
    { title: "Legal & Support", links: [
      { name: "Contact Us", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms & Conditions", path: "/terms" }
    ]}
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-lime-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-100">
            <div className="w-12 h-12 bg-lime-100 text-lime-600 rounded-xl flex items-center justify-center">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Sitemap</h1>
              <p className="text-gray-500 mt-1">Directory of all public pages on PandaLime Career.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {routes.map((category, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">{category.title}</h2>
                <ul className="space-y-3">
                  {category.links.map((link, j) => (
                    <li key={j}>
                      <Link to={link.path} className="flex items-center gap-2 text-gray-600 hover:text-lime-600 font-medium transition-colors group">
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-lime-500 transition-colors" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}