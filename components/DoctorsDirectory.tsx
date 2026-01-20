
import React, { useState } from 'react';
import { Search, Clock, Calendar, BadgeIndianRupee, Stethoscope, Star, Phone } from 'lucide-react';
import { DOCTORS_DATA } from '../constants/doctors';

interface Props {
  selectedLanguage?: string;
}

const DoctorsDirectory: React.FC<Props> = ({ selectedLanguage = 'English' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Regular OPD' | 'Super Specialist'>('All');

  const translations: Record<string, any> = {
    English: {
      header: "Doctors & Specialists",
      subHeader: "J.C. Juneja Hospital Directory & OPD Schedule",
      searchPlaceholder: "Search Doctor or Specialty...",
      bannerTitle: "Reception & General Queries",
      bannerSub: "Reach out to our reception desk for appointments or information.",
      all: "All",
      regular: "Regular OPD",
      super: "Super Specialist",
      charges: "OPD Charges",
      noResults: "No doctors found matching your criteria."
    },
    Hindi: {
      header: "डॉक्टरों और विशेषज्ञों",
      subHeader: "J.C. Juneja Hospital की सूची और ओपीडी (OPD) समय",
      searchPlaceholder: "डॉक्टर या विशेषज्ञता खोजें...",
      bannerTitle: "रिसेप्शन और सामान्य पूछताछ",
      bannerSub: "अपॉइंटमेंट या जानकारी के लिए हमारे रिसेप्शन डेस्क से संपर्क करें।",
      all: "सभी",
      regular: "नियमित ओपीडी",
      super: "सुपर स्पेशलिस्ट",
      charges: "ओपीडी शुल्क",
      noResults: "आपकी खोज के अनुसार कोई डॉक्टर नहीं मिला।"
    },
    Hinglish: {
      header: "Doctors & Specialists",
      subHeader: "J.C. Juneja Hospital Directory aur OPD Schedule",
      searchPlaceholder: "Search Doctor ya Specialty...",
      bannerTitle: "Reception & General Help",
      bannerSub: "Appointment ya info ke liye reception desk pe call karein.",
      all: "All",
      regular: "Regular OPD",
      super: "Super Specialist",
      charges: "OPD Charges",
      noResults: "Koi results nahi mile."
    }
  };

  const t = translations[selectedLanguage] || translations.English;

  const getSpecialtyLabel = (spec: string) => {
    if (selectedLanguage === 'English') return spec;
    const mapping: Record<string, string> = {
      'Eye Consultant': selectedLanguage === 'Hindi' ? 'नेत्र रोग विशेषज्ञ' : 'Eye Specialist',
      'Pediatrician': selectedLanguage === 'Hindi' ? 'बाल रोग विशेषज्ञ' : 'Bacho ke Doctor',
      'General Medicine': selectedLanguage === 'Hindi' ? 'सामान्य चिकित्सा' : 'General Physician',
      'Orthopedic Specialist': selectedLanguage === 'Hindi' ? 'हड्डी रोग विशेषज्ञ' : 'Orthopedic Dr',
      'Urologist': selectedLanguage === 'Hindi' ? 'यूरोलॉजिस्ट (मूत्र रोग)' : 'Urologist',
      'Neurologist': selectedLanguage === 'Hindi' ? 'न्यूरोलॉजिस्ट (तंत्रिका रोग)' : 'Nervous System Dr',
      'Cardiologist': selectedLanguage === 'Hindi' ? 'कार्डियोलॉजिस्ट (हृदय रोग)' : 'Heart Dr',
      'Physiotherapist': selectedLanguage === 'Hindi' ? 'फिजियोथेरेपिस्ट' : 'Physiotherapist',
      'General Surgeon': selectedLanguage === 'Hindi' ? 'जनरल सर्जन' : 'Surgery Specialist'
    };
    const baseSpecialty = spec.split(' (')[0];
    return mapping[baseSpecialty] || spec;
  };

  const filteredDoctors = DOCTORS_DATA.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || doc.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 h-full flex flex-col animate-fade-in pb-10">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-indigo-600" />
            {t.header}
          </h2>
          <p className="text-slate-500">{t.subHeader}</p>
        </div>
        <div className="relative w-full md:w-64">
           <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
           <input 
             type="text" 
             placeholder={t.searchPlaceholder} 
             className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
         <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="bg-white p-3 rounded-full shadow-sm border border-indigo-50 shrink-0">
                 <Phone className="w-5 h-5 text-indigo-600" />
             </div>
             <div>
                 <h3 className="font-bold text-indigo-900 text-base">{t.bannerTitle}</h3>
                 <p className="text-slate-600 text-xs md:text-sm">{t.bannerSub}</p>
             </div>
         </div>
         <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
             <a href="tel:+918219011049" className="flex items-center justify-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg text-sm font-bold text-white border border-indigo-600 shadow-sm hover:bg-indigo-700 transition-all">
                 <Phone className="w-4 h-4" /> +91 8219011049
             </a>
             <a href="tel:+919805687028" className="flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-bold text-indigo-700 border border-indigo-200 shadow-sm hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                 <Phone className="w-4 h-4 text-indigo-600" /> +91 9805687028
             </a>
         </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-lg w-fit">
        {['All', 'Regular OPD', 'Super Specialist'].map((id) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === id ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {id === 'All' ? t.all : id === 'Regular OPD' ? t.regular : t.super}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
             <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${doc.imageColor}`}>
                    {doc.name.split(' ')[1]?.charAt(0) || doc.name.charAt(0)}
                  </div>
                  {doc.type === 'Super Specialist' && (
                    <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> {selectedLanguage === 'Hindi' ? 'सुपर स्पेशलिटी' : 'Super Speciality'}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-800">{doc.name}</h3>
                <p className="text-indigo-600 font-medium text-sm mb-4">{getSpecialtyLabel(doc.specialty)}</p>
                <div className="space-y-2 text-sm text-slate-600">
                   <div className="flex items-start gap-2">
                     <Calendar className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                     <span className="font-medium">{doc.days}</span>
                   </div>
                   {doc.timing && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{doc.timing}</span>
                    </div>
                   )}
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsDirectory;
