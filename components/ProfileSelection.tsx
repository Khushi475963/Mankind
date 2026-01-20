import React from 'react';
import { User, Users, Plus, ChevronRight, Phone } from 'lucide-react';
import { IntakeData } from '../types';

interface Props {
  phoneNumber: string;
  existingProfiles: IntakeData[];
  onSelectProfile: (profile: IntakeData | null, relationship?: string) => void;
  selectedLanguage?: string;
}

const ProfileSelection: React.FC<Props> = ({ phoneNumber, existingProfiles, onSelectProfile, selectedLanguage = 'English' }) => {
  
  const translations: Record<string, any> = {
    English: { header: "Who is this visit for?", sub: "Managing health records for", existing: "Existing Profiles", addNew: "Add New Member", selectId: "Select Identity", myself: "For Myself", mainProfile: "Create my main profile", family: "For a Family Member", familySub: "Add child, parent, or spouse", createNew: "Create New Profile" },
    Hindi: { header: "यह विजिट किसके लिए है?", sub: "स्वास्थ्य रिकॉर्ड प्रबंधित करना:", existing: "मौजूदा प्रोफाइल", addNew: "नया सदस्य जोड़ें", selectId: "पहचान चुनें", myself: "मेरे लिए", mainProfile: "मेरी मुख्य प्रोफ़ाइल बनाएं", family: "परिवार के सदस्य के लिए", familySub: "बच्चे, माता-पिता या पति/पत्नी को जोड़ें", createNew: "नई प्रोफ़ाइल बनाएं" },
    Hinglish: { header: "Who is this visit for?", sub: "Managing health records for", existing: "Purane Profiles", addNew: "Add New Member", selectId: "Identity Select Karein", myself: "Mere Liye (Self)", mainProfile: "Apni main profile banayein", family: "Family Member ke liye", familySub: "Child, parent, ya spouse add karein", createNew: "Nayi Profile Banayein" }
  };

  const t = translations[selectedLanguage] || translations.English;

  const uniqueProfiles = existingProfiles.filter((profile, index, self) =>
    index === self.findIndex((p) => (
      p.fullName.toLowerCase() === profile.fullName.toLowerCase()
    ))
  );

  return (
    <div className="flex items-center justify-center min-h-[50vh] animate-fade-in-up">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-full mb-4">
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{t.header}</h2>
          <p className="text-slate-500 text-sm mt-2 flex items-center justify-center gap-1">
            {t.sub} <span className="font-semibold text-indigo-600 flex items-center gap-1"><Phone className="w-3 h-3" /> {phoneNumber}</span>
          </p>
        </div>

        <div className="space-y-4">
          {uniqueProfiles.length > 0 && (
            <div className="space-y-2 mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.existing}</p>
              {uniqueProfiles.map((profile, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectProfile(profile)}
                  className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm group-hover:bg-indigo-200 group-hover:text-indigo-700 transition-colors">
                      {profile.fullName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{profile.fullName}</h4>
                      <p className="text-xs text-slate-500">{profile.relationship ? `${profile.relationship} • ` : ''}{profile.age} Y • {profile.sex}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500" />
                </button>
              ))}
            </div>
          )}

          <div className="space-y-3">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {uniqueProfiles.length > 0 ? t.addNew : t.selectId}
             </p>

             {uniqueProfiles.length === 0 ? (
                <>
                    <button
                        onClick={() => onSelectProfile(null, 'Self')}
                        className="w-full flex items-center gap-4 p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold">{t.myself}</h4>
                            <p className="text-xs text-indigo-100">{t.mainProfile}</p>
                        </div>
                    </button>

                    <button
                        onClick={() => onSelectProfile(null, '')}
                        className="w-full flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-slate-50 transition-all text-slate-700"
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-slate-500" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold">{t.family}</h4>
                            <p className="text-xs text-slate-500">{t.familySub}</p>
                        </div>
                    </button>
                </>
             ) : (
                <button
                    onClick={() => onSelectProfile(null, '')}
                    className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/10 transition-all font-semibold"
                >
                    <Plus className="w-5 h-5" />
                    {t.createNew}
                </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;