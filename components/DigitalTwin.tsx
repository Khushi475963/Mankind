import React, { useState } from 'react';
import { PatientRecord } from '../types';
import { Dna, Activity, CalendarClock, ArrowUpRight, User, Users, Filter, ChevronDown } from 'lucide-react';

interface Props {
  records: PatientRecord[];
  currentPhone?: string;
  selectedLanguage?: string;
}

const DigitalTwin: React.FC<Props> = ({ records, currentPhone, selectedLanguage = 'English' }) => {
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<string>('All');

  const translations: Record<string, any> = {
    English: {
      header: "Family Digital Twin",
      subHeader: "Longitudinal Health Record & Family Identity",
      idRequired: "Identification Required",
      idPrompt: "Please enter your phone number in the Triage section to view your Family Digital Twin.",
      noRecords: "No Records Found",
      noRecordsSub: "We couldn't find any medical history for",
      ensureSave: "If you just completed a triage, ensure it was saved correctly.",
      viewingProfile: "Viewing Profile:",
      allMembers: "All Family Members",
      noSpecificRecords: "No records found for selected family member.",
      bloodType: "Blood Type",
      height: "Height",
      weight: "Weight",
      bmi: "BMI",
      conditions: "Chronic Conditions",
      allergies: "Allergies",
      vitalsTitle: "Latest Vitals Snapshot",
      reportedVitals: "Reported Vitals",
      smoking: "Smoking",
      alcohol: "Alcohol",
      history: "Assessment History",
      redFlags: "Red Flags",
      noneReported: "None reported",
      notRecorded: "Not recorded"
    },
    Hindi: {
      header: "फैमिली डिजिटल ट्विन",
      subHeader: "दीर्घकालिक स्वास्थ्य रिकॉर्ड और पारिवारिक पहचान",
      idRequired: "पहचान आवश्यक है",
      idPrompt: "अपनी फैमिली डिजिटल ट्विन देखने के लिए कृपया ट्रायज सेक्शन में अपना फोन नंबर दर्ज करें।",
      noRecords: "कोई रिकॉर्ड नहीं मिला",
      noRecordsSub: "हमें इसके लिए कोई चिकित्सा इतिहास नहीं मिला:",
      ensureSave: "यदि आपने अभी-अभी ट्रायज पूरा किया है, तो सुनिश्चित करें कि इसे सही ढंग से सहेजा गया है।",
      viewingProfile: "प्रोफ़ाइल देख रहे हैं:",
      allMembers: "सभी परिवार के सदस्य",
      noSpecificRecords: "चयनित परिवार के सदस्य के लिए कोई रिकॉर्ड नहीं मिला।",
      bloodType: "रक्त समूह",
      height: "लंबाई",
      weight: "वजन",
      bmi: "बीएमआई (BMI)",
      conditions: "पुरानी बीमारियां",
      allergies: "एलर्जी",
      vitalsTitle: "नवीनतम विटल्स स्नैपशॉट",
      reportedVitals: "रिपोर्ट किए गए विटल्स",
      smoking: "धूम्रपान",
      alcohol: "शराब",
      history: "मूल्यांकन इतिहास",
      redFlags: "खतरे के संकेत",
      noneReported: "कोई रिपोर्ट नहीं",
      notRecorded: "रिकॉर्ड नहीं किया गया"
    },
    Hinglish: {
      header: "Family Digital Twin",
      subHeader: "Health Record aur Family Identity",
      idRequired: "Identification Required",
      idPrompt: "Please Triage section mein phone number enter karein apni Family Digital Twin dekhne ke liye.",
      noRecords: "Records nahi mile",
      noRecordsSub: "Medical history nahi mili is number ke liye:",
      ensureSave: "Agar aapne abhi triage kiya hai, to check karein ki wo save hua ya nahi.",
      viewingProfile: "Viewing Profile:",
      allMembers: "All Family Members",
      noSpecificRecords: "Selected member ke liye records nahi hain.",
      bloodType: "Blood Type",
      height: "Height",
      weight: "Weight",
      bmi: "BMI",
      conditions: "Purani Bimariyan",
      allergies: "Allergies",
      vitalsTitle: "Latest Vitals Snapshot",
      reportedVitals: "Reported Vitals",
      smoking: "Smoking",
      alcohol: "Alcohol",
      history: "Assessment History",
      redFlags: "Red Flags",
      noneReported: "Kuch nahi",
      notRecorded: "Nahi likha"
    }
  };

  const t = translations[selectedLanguage] || translations.English;

  const normalize = (str?: string) => str?.trim() || '';
  const userRecords = currentPhone 
    ? records.filter(r => normalize(r.intake.phoneNumber) === normalize(currentPhone))
    : [];
  
  const uniqueMembersMap = new Map<string, string>();
  userRecords.forEach(r => {
      if (!uniqueMembersMap.has(r.intake.fullName)) {
          uniqueMembersMap.set(r.intake.fullName, r.intake.relationship || '');
      }
  });

  const memberOptions = Array.from(uniqueMembersMap.entries()).map(([name, relation]) => ({
      name,
      relation
  }));

  const filteredRecords = selectedFamilyMember === 'All'
    ? userRecords
    : userRecords.filter(r => r.intake.fullName === selectedFamilyMember);

  const sortedRecords = [...filteredRecords].sort((a, b) => b.timestamp - a.timestamp);
  const latestRecord = sortedRecords[0];

  if (!currentPhone) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200 animate-fade-in">
            <Users className="w-16 h-16 mb-4 opacity-20" />
            <p className="font-medium text-slate-600">{t.idRequired}</p>
            <p className="text-sm mt-1 px-8 text-center">{t.idPrompt}</p>
        </div>
      );
  }

  if (userRecords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200 animate-fade-in">
        <Dna className="w-16 h-16 mb-4 opacity-20" />
        <h3 className="text-lg font-bold text-slate-600">{t.noRecords}</h3>
        <p className="text-sm mt-2 max-w-xs text-center">
            {t.noRecordsSub} <span className="text-indigo-600 font-medium">{currentPhone}</span>.
        </p>
        <div className="mt-6 flex flex-col gap-2">
            <p className="text-xs text-slate-400 px-8 text-center">{t.ensureSave}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t.header}</h2>
          <p className="text-slate-500">{t.subHeader}</p>
        </div>
        
        {memberOptions.length > 0 && (
            <div className="flex items-center gap-3 bg-white p-2 pl-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    {t.viewingProfile}
                </span>
                <div className="relative">
                    <select 
                        value={selectedFamilyMember}
                        onChange={(e) => setSelectedFamilyMember(e.target.value)}
                        className="appearance-none bg-indigo-50 border border-indigo-100 hover:border-indigo-300 text-indigo-700 text-sm font-bold py-2 pl-3 pr-10 rounded-lg cursor-pointer focus:outline-none transition-colors min-w-[200px]"
                    >
                        <option value="All">{t.allMembers}</option>
                        {memberOptions.map((member, idx) => (
                            <option key={idx} value={member.name}>
                                {member.name} {member.relation ? `• ${member.relation}` : ''}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-500">
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>
            </div>
        )}
      </div>

      {!latestRecord ? (
         <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
            <p>{t.noSpecificRecords}</p>
         </div>
      ) : (
        <>
        {selectedFamilyMember !== 'All' && (
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-1 border-r border-white/10 pr-6">
                    <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold mb-3 shadow-lg shadow-indigo-500/30">
                    {latestRecord.intake.fullName.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold">{latestRecord.intake.fullName}</h3>
                    <p className="text-slate-400 text-sm">
                    {latestRecord.intake.relationship && <span className="font-semibold text-indigo-300">({latestRecord.intake.relationship}) </span>}
                    {latestRecord.intake.age} Y / {latestRecord.intake.sex}
                    </p>
                </div>
                <div className="col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{t.bloodType}</p>
                        <p className="font-semibold text-lg">{latestRecord.intake.bloodGroup || t.noneReported}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{t.height}</p>
                        <p className="font-semibold text-lg">{latestRecord.intake.height ? `${latestRecord.intake.height} cm` : 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{t.weight}</p>
                        <p className="font-semibold text-lg">{latestRecord.intake.weight ? `${latestRecord.intake.weight} kg` : 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{t.bmi}</p>
                        <p className="font-semibold text-lg">
                        {latestRecord.intake.weight && latestRecord.intake.height ? 
                            ((parseFloat(latestRecord.intake.weight) / ((parseFloat(latestRecord.intake.height)/100) ** 2))).toFixed(1)
                            : 'N/A'}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{t.conditions}</p>
                        <p className="font-medium">{latestRecord.intake.conditions || t.noneReported}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{t.allergies}</p>
                        <p className="font-medium text-rose-300">{latestRecord.intake.allergies || t.noneReported}</p>
                    </div>
                </div>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedFamilyMember !== 'All' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-4">
                    <Activity className="w-5 h-5 text-teal-600" />
                    {t.vitalsTitle}
                </h3>
                <div className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">{t.reportedVitals}</p>
                    <p className="font-mono text-slate-800 font-medium">{latestRecord.intake.vitals || t.notRecorded}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">{t.smoking}</p>
                        <p className="font-medium text-slate-800">{latestRecord.intake.smoking}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">{t.alcohol}</p>
                        <p className="font-medium text-slate-800">{latestRecord.intake.alcohol}</p>
                    </div>
                    </div>
                </div>
                </div>
            )}

            <div className={`${selectedFamilyMember === 'All' ? 'md:col-span-3' : 'md:col-span-2'} bg-white p-6 rounded-2xl border border-slate-200 shadow-sm`}>
            <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-4">
                <CalendarClock className="w-5 h-5 text-indigo-600" />
                {t.history}
            </h3>
            <div className={`space-y-4 overflow-y-auto pr-2 ${selectedFamilyMember === 'All' ? '' : 'max-h-[300px]'}`}>
                {sortedRecords.map((rec) => (
                <div key={rec.id} className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-indigo-50 text-indigo-700 rounded-lg shrink-0">
                        <span className="text-xs font-bold">{new Date(rec.timestamp).getDate()}</span>
                        <span className="text-xs uppercase">{new Date(rec.timestamp).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-slate-800">{rec.intake.currentSymptoms.slice(0, 40)}...</h4>
                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                                <User className="w-3 h-3" /> {rec.intake.fullName}
                            </p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            rec.status === 'Critical' ? 'bg-rose-100 text-rose-700' : 
                            rec.status === 'Urgent' ? 'bg-amber-100 text-amber-700' : 
                            'bg-emerald-100 text-emerald-700'
                        }`}>
                            {rec.status}
                        </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                        {rec.triage.recommended_department} • {rec.triage.probable_conditions[0]?.name}
                        </p>
                        <div className="flex gap-2 mt-2">
                        {rec.triage.red_flags.length > 0 && (
                            <span className="text-xs text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                            {rec.triage.red_flags.length} {t.redFlags}
                            </span>
                        )}
                        </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </>
      )}
    </div>
  );
};

export default DigitalTwin;