
import React, { useRef, useState } from 'react';
import { TriageResponse, IntakeData } from '../types';
import { DOCTORS_DATA, Doctor } from '../constants/doctors';
import { 
  Hospital, 
  Activity, 
  FlaskConical, 
  ClipboardList,
  Leaf,
  Download,
  Loader2,
  User,
  Calendar,
  Clock,
  FileText,
  Hourglass,
  CheckCircle,
  Heart,
  UserCheck
} from 'lucide-react';

interface Props {
  data: TriageResponse;
  intakeData?: IntakeData;
}

declare global {
  interface window {
    html2pdf: any;
  }
}

const ProbabilityBadge: React.FC<{ level: string }> = ({ level }) => {
  const colors = {
    High: 'bg-rose-50 text-rose-600 border-rose-100',
    Moderate: 'bg-amber-50 text-amber-600 border-amber-100',
    Low: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  };
  
  const colorClass = colors[level as keyof typeof colors] || colors.Low;

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${colorClass} uppercase tracking-wide`}>
      {level} Likely
    </span>
  );
};

const TriageReport: React.FC<Props> = ({ data, intakeData }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const findMatchingDoctors = (recDept: string): Doctor[] => {
    if (!recDept) return [];
    const searchStr = recDept.toUpperCase();
    
    return DOCTORS_DATA.filter(doc => {
      const spec = doc.specialty.toUpperCase();
      const synonyms: Record<string, string[]> = {
         'INTERNAL MEDICINE': ['GENERAL MEDICINE', 'GENERAL PHYSICIAN', 'MD PHYSICIAN'],
         'GENERAL MEDICINE': ['INTERNAL MEDICINE', 'GENERAL PHYSICIAN', 'MD PHYSICIAN'],
         'NEUROLOGY': ['NEURO SURGEON', 'NEUROLOGIST'],
         'ORTHOPEDICS': ['ORTHOPAEDICS', 'BONE'],
         'PEDIATRICS': ['PAEDIATRICS', 'PEDIATRICIAN'],
         'OBGYN': ['OBSTETRICS', 'GYNECOLOGY']
      };

      if (spec.includes(searchStr) || searchStr.includes(spec.split(' ')[0])) return true;
      for (const [key, values] of Object.entries(synonyms)) {
        if (searchStr.includes(key) && values.some(v => spec.includes(v))) return true;
      }
      return false;
    });
  };

  const matchedDoctors = findMatchingDoctors(data.recommended_department);
  const primaryDoctor = matchedDoctors[0];

  const handleDownloadPdf = async () => {
    // @ts-ignore
    if (!reportRef.current || !window.html2pdf) return;
    setIsDownloading(true);
    const element = reportRef.current;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `JCJH_Report_${intakeData?.fullName || 'Patient'}_${new Date().toISOString().slice(0,10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    try {
      // @ts-ignore
      await window.html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      
      <div className="flex justify-between items-center bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          Assessment Result
        </h2>
        <button 
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all shadow-md disabled:opacity-70"
        >
          {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {isDownloading ? 'Processing...' : 'Download Report'}
        </button>
      </div>

      <div ref={reportRef} id="triage-report-content" className="space-y-4 bg-slate-50 p-1 md:p-0">
        
        {/* COMPACT & CLEAR RECOMMENDATION CARD */}
        <div className="bg-[#05825f] text-white rounded-[2rem] p-6 md:p-10 shadow-xl border border-[#046c4f] relative overflow-hidden transition-all duration-700">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Hospital className="w-4 h-4" />
              Recommended Department
            </div>
            
            <div className="space-y-1 mb-6">
                <h3 className="text-3xl md:text-4xl font-black leading-tight capitalize tracking-tight">
                  {data.recommended_department}
                </h3>
                {primaryDoctor && (
                    <div className="flex items-center gap-2 text-emerald-100 font-bold text-xl">
                        <UserCheck className="w-6 h-6 text-emerald-300" />
                        <span>{primaryDoctor.name}</span>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-3">
                {primaryDoctor && (
                    <div className="inline-flex items-center gap-2 bg-[#046c4f]/60 px-5 py-2.5 rounded-xl border border-white/5 shadow-inner">
                        <Clock className="w-4 h-4 text-emerald-300" />
                        <span className="text-[14px] font-bold tracking-tight">
                            {primaryDoctor.days}: {primaryDoctor.timing}
                        </span>
                    </div>
                )}
                <div className="inline-flex items-center gap-2 bg-[#046c4f] px-5 py-2.5 rounded-xl border border-white/5 shadow-inner">
                    <Hourglass className="w-4 h-4 text-emerald-300" />
                    <span className="text-[14px] font-bold tracking-tight">
                        Consult: {data.estimated_consultation_time}
                    </span>
                </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
        
        {intakeData && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-4 border-b border-slate-50 pb-2">
               <User className="w-4 h-4" />
               Patient Profile
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div>
                 <span className="block text-[9px] text-slate-400 uppercase font-bold">Name</span>
                 <span className="font-bold text-slate-800 text-base">{intakeData.fullName}</span>
               </div>
               <div>
                 <span className="block text-[9px] text-slate-400 uppercase font-bold">Age / Gender</span>
                 <span className="font-medium text-slate-700 text-sm">{intakeData.age} Y • {intakeData.sex}</span>
               </div>
               <div>
                 <span className="block text-[9px] text-slate-400 uppercase font-bold">Condition</span>
                 <div className="flex items-center gap-1.5 font-medium text-slate-700 text-sm">
                   <Activity className="w-3.5 h-3.5 text-emerald-500" />
                   {intakeData.vitals || 'Stable'}
                 </div>
               </div>
               <div>
                 <span className="block text-[9px] text-slate-400 uppercase font-bold">Reported On</span>
                 <span className="font-medium text-slate-700 text-sm">{new Date().toLocaleDateString()}</span>
               </div>
             </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 border-l-[4px] border-l-[#05825f]">
            <h3 className="flex items-center gap-2 text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-3">
              <ClipboardList className="w-4 h-4 text-[#05825f]" />
              Symptom Summary
            </h3>
            <p className="text-slate-600 leading-relaxed text-[14px] italic font-medium">
              "{data.symptom_summary}"
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <h3 className="flex items-center gap-2 text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-3">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Specialist Hours
            </h3>
            {matchedDoctors.length > 0 ? matchedDoctors.map((doc, idx) => (
                <div key={idx} className="mb-3 last:mb-0">
                    <div className="font-black text-slate-800 text-[13px]">{doc.name}</div>
                    <div className="text-[10px] text-slate-500 mt-1 flex flex-col gap-0.5">
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-emerald-500" /> {doc.timing}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-indigo-400" /> {doc.days}</span>
                    </div>
                </div>
            )) : (
                <p className="text-[11px] text-slate-400 italic">Reception desk has schedule updates.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <h3 className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
              <Heart className="w-4 h-4 text-rose-400" />
              Probable Conditions
            </h3>
            <div className="space-y-3">
              {data.probable_conditions.map((condition, idx) => (
                <div key={idx} className="pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="font-bold text-slate-800 text-sm">{condition.name}</span>
                    <ProbabilityBadge level={condition.probability} />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{condition.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h3 className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                <FlaskConical className="w-4 h-4 text-indigo-500" />
                Wellness Checks
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.recommended_tests.length > 0 ? data.recommended_tests.map((test, idx) => (
                  <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl text-[11px] font-bold border border-indigo-100">
                    {test}
                  </span>
                )) : <span className="text-slate-400 text-xs italic">Consult specialist for tests.</span>}
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <h3 className="flex items-center gap-2 text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-2">
                <FileText className="w-4 h-4" />
                Next Steps
                </h3>
                <p className="text-[13px] text-blue-900 leading-relaxed font-bold">{data.self_care_advice}</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
            <h3 className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-2">
            <Leaf className="w-4 h-4" />
            Natural Care
            </h3>
            <p className="text-[13px] text-emerald-900 leading-relaxed font-medium">{data.ayurvedic_suggestions}</p>
        </div>
      </div>
    </div>
  );
};

export default TriageReport;
