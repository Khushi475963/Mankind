import React from 'react';
import { ViewMode } from '../types';
import { Stethoscope, UserCog, Contact2, Phone, Building2 } from 'lucide-react';

interface Props {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  selectedLanguage: string;
}

const SideNav: React.FC<Props> = ({ currentView, onNavigate, selectedLanguage }) => {
  const translations: Record<string, any> = {
    English: {
      triage: 'Patient Triage',
      twin: 'Family Digital Twin',
      facility: 'Our Facility',
      directory: 'Doctors Directory',
      nav: 'Navigation',
      reception: 'Reception / Queries'
    },
    Hindi: {
      triage: 'रोगी ट्रायज',
      twin: 'फैमिली डिजिटल ट्विन',
      facility: 'हमारी सुविधाएं',
      directory: 'डॉक्टरों की सूची',
      nav: 'नेविगेशन',
      reception: 'रिसेप्शन / पूछताछ'
    },
    Hinglish: {
      triage: 'Patient Triage',
      twin: 'Family Digital Twin',
      facility: 'Our Facility',
      directory: 'Doctors Directory',
      nav: 'Menu',
      reception: 'Reception Help'
    }
  };

  const t = translations[selectedLanguage] || translations.English;

  const navItems = [
    { id: ViewMode.PATIENT_TRIAGE, label: t.triage, icon: Stethoscope },
    { id: ViewMode.DIGITAL_TWIN, label: t.twin, icon: UserCog },
    { id: ViewMode.OUR_FACILITY, label: t.facility, icon: Building2 },
    { id: ViewMode.DOCTORS_DIRECTORY, label: t.directory, icon: Contact2 },
  ];

  return (
    <div className="w-full md:w-64 bg-white border-r border-slate-200 p-4 flex-shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible justify-between h-auto md:h-full">
      <div className="flex flex-row md:flex-col gap-2 w-full">
        <div className="mb-6 px-2 hidden md:block">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.nav}</p>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="hidden md:block mt-auto pt-4 border-t border-slate-100">
         <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">{t.reception}</p>
            <div className="space-y-2">
               <a href="tel:+918219011049" className="flex items-center gap-2 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-indigo-600" /> +91 82190 11049
               </a>
               <a href="tel:+919805687028" className="flex items-center gap-2 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-indigo-600" /> +91 9805687028
               </a>
               <a href="tel:+919805682028" className="flex items-center gap-2 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-indigo-600" /> +91 9805682028
               </a>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SideNav;