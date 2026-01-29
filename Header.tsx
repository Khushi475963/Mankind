import React, { useState } from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import SecurityModal from './SecurityModal';

interface Props {
  selectedLanguage: string;
}

const Header: React.FC<Props> = ({ selectedLanguage }) => {
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const translations: Record<string, any> = {
    English: {
      tagline: "Charitable Hospital of Mankind",
      nabh: "NABH Accredited",
      secure: "HIPAA Secure"
    },
    Hindi: {
      tagline: "मानव जाति का धर्मार्थ अस्पताल",
      nabh: "NABH प्रमाणित",
      secure: "HIPAA सुरक्षित"
    },
    Hinglish: {
      tagline: "Charitable Hospital of Mankind",
      nabh: "NABH Certified",
      secure: "HIPAA Secure"
    }
  };

  const t = translations[selectedLanguage] || translations.English;

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mankind Logo */}
            <div className="flex items-center shrink-0">
              <img 
                src="https://www.mankindpharma.com/images/mankind-logo.png" 
                alt="Mankind - Serving Life" 
                className="h-10 md:h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Mankind_Pharma_logo.svg/1200px-Mankind_Pharma_logo.svg.png';
                }}
              />
            </div>

            {/* Vertical Divider */}
            <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>

            {/* Hospital Brand - Hardcoded English Heading */}
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-black text-slate-800 tracking-tight leading-tight">
                J.C. Juneja Hospital Village Surajpur, Nahan road Paonta Sahib, H.P
              </h1>
              <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider">
                {t.tagline}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm">
               <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <Award className="w-3 h-3" />
               </div>
               <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">{t.nabh}</span>
            </div>
            
            <button 
              onClick={() => setShowSecurityModal(true)}
              className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 hover:bg-emerald-100 transition-all cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide">{t.secure}</span>
            </button>
          </div>
        </div>
      </header>

      {showSecurityModal && (
        <SecurityModal onClose={() => setShowSecurityModal(false)} />
      )}
    </>
  );
};

export default Header;
