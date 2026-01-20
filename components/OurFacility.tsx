
import React from 'react';
import { 
  Building2,
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Activity,
  HeartPulse,
  ScanLine,
  Microscope,
  Scissors,
  Baby,
  Stethoscope as MedicineIcon,
  Bone,
  Eye,
  Syringe,
  Bed,
  Utensils,
  Trash2
} from 'lucide-react';

interface FacilityItem {
  name: string;
  description?: string;
  icon: any;
  iconBg: string;
  iconColor: string;
}

interface Props {
  selectedLanguage: string;
}

const OurFacility: React.FC<Props> = ({ selectedLanguage }) => {
  const translations: Record<string, any> = {
    English: {
      header: "Our Facilities",
      subHeader: "Comprehensive Care & Infrastructure at J.C. Juneja Hospital",
      cashlessHeader: "Cashless Treatment Available",
      cashlessSub: "We are proud to be NABH Accredited and empaneled with major government schemes to provide accessible, high-quality healthcare to everyone.",
      infraTitle: "MEDICAL INFRASTRUCTURE & SERVICES",
      qualityTitle: "Quality Assurance",
      qualityText: "Our NABH Accreditation is a testament to our commitment to patient safety and quality of care. We follow rigorous national standards for healthcare delivery.",
      diagTitle: "Diagnostic Excellence",
      diagText: "Our diagnostic wing is equipped with advanced 32 Slice CT Scan, Ultrasound, Digital X-Ray, and a fully computerized pathology laboratory."
    },
    Hindi: {
      header: "हमारी सुविधाएं",
      subHeader: "J.C. Juneja Hospital में व्यापक देखभाल और बुनियादी ढांचा",
      cashlessHeader: "कैशलेस उपचार उपलब्ध",
      cashlessSub: "हमें गर्व है कि हम NABH मान्यता प्राप्त हैं और सभी को सुलभ, उच्च गुणवत्ता वाली स्वास्थ्य सेवा प्रदान करने के लिए प्रमुख सरकारी योजनाओं के साथ जुड़े हुए हैं।",
      infraTitle: "चिकित्सा बुनियादी ढांचा और सेवाएं",
      qualityTitle: "गुणवत्ता आश्वासन",
      qualityText: "हमारी NABH मान्यता रोगी सुरक्षा और देखभाल की गुणवत्ता के प्रति हमारी प्रतिबद्धता का प्रमाण है। हम स्वास्थ्य सेवा वितरण के लिए कड़े राष्ट्रीय मानकों का पालन करते हैं।",
      diagTitle: "नैदानिक उत्कृष्टता",
      diagText: "हमारा डायग्नोस्टिक विंग उन्नत 32 स्लाइस सीटी स्कैन, अल्ट्रासाउंड, डिजिटल एक्स-रे और पूरी तरह से कम्प्यूटरीकृत पैथोलॉजी लैब से सुसज्जित है।"
    },
    Hinglish: {
      header: "Our Facilities",
      subHeader: "Complete Care aur Infrastructure J.C. Juneja Hospital mein",
      cashlessHeader: "Cashless Treatment Available",
      cashlessSub: "Hamein proud hai ki hum NABH Accredited hain aur major sarkari schemes ke saath jude hain sabko high-quality healthcare dene ke liye.",
      infraTitle: "MEDICAL INFRASTRUCTURE & SERVICES",
      qualityTitle: "Quality Assurance",
      qualityText: "Humara NABH Accreditation patient safety aur quality care ke liye humari commitment dikhata hai.",
      diagTitle: "Diagnostic Excellence",
      diagText: "Humaray paas advanced 32 Slice CT Scan, Ultrasound, Digital X-Ray aur computerized pathology lab hai."
    }
  };

  const t = translations[selectedLanguage] || translations.English;

  const facilityItems: FacilityItem[] = [
    { 
      name: selectedLanguage === 'Hindi' ? "24×7 आपातकालीन और एम्बुलेंस सेवाएं" : "24×7 Emergency & Ambulance Services", 
      description: selectedLanguage === 'Hindi' ? "तत्काल आघात प्रतिक्रिया और रैपिड कार्डियक ट्रांसपोर्ट।" : "Immediate trauma response and rapid cardiac transport fleet.",
      icon: HeartPulse, iconBg: "bg-rose-50", iconColor: "text-rose-500" 
    },
    { 
      name: selectedLanguage === 'Hindi' ? "ICU, NICU और HDU सपोर्ट" : "ICU, NICU & HDU Support", 
      description: selectedLanguage === 'Hindi' ? "वेंटिलेटर सपोर्ट और उन्नत नवजात देखभाल इकाइयाँ।" : "Ventilator support and advanced neonatal care units.",
      icon: Activity, iconBg: "bg-blue-50", iconColor: "text-blue-500" 
    },
    { 
      name: selectedLanguage === 'Hindi' ? "मॉड्यूलर ऑपरेशन थिएटर" : "Modular Operation Theatres", 
      description: selectedLanguage === 'Hindi' ? "अत्याधुनिक स्टेराइल वातावरण और समर्पित लेबर रूम।" : "State-of-the-art sterile environments and dedicated Labour Room.",
      icon: Scissors, iconBg: "bg-emerald-50", iconColor: "text-emerald-500" 
    },
    { 
      name: selectedLanguage === 'Hindi' ? "उन्नत 32-स्लाइस सीटी स्कैन" : "Advanced 32-Slice CT Scan", 
      description: selectedLanguage === 'Hindi' ? "पांवटा साहिब, हिमाचल प्रदेश में सबसे बड़ी सीटी स्कैन सुविधा।" : "Largest CT scan facility in Paonta Sahib, Himachal Pradesh.",
      icon: ScanLine, iconBg: "bg-indigo-50", iconColor: "text-indigo-500" 
    },
    { 
      name: selectedLanguage === 'Hindi' ? "डिजिटल डायग्नोस्टिक सेवाएं" : "Digital Diagnostic Services", 
      description: selectedLanguage === 'Hindi' ? "डिजिटल एक्स-रे, डिजिटल ईसीजी, डिजिटल अल्ट्रासाउंड और 2डी इको।" : "Digital X-Ray, Digital ECG, Digital Ultrasound & 2D Echo.",
      icon: Activity, iconBg: "bg-violet-50", iconColor: "text-violet-500" 
    },
    { 
      name: selectedLanguage === 'Hindi' ? "24×7 कम्प्यूटरीकृत पैथोलॉजी लैब" : "24×7 Computerized Pathology Lab", 
      description: selectedLanguage === 'Hindi' ? "चौबीसों घंटे लैब सेवाएं जो स्थानीय स्तर पर कहीं और उपलब्ध नहीं हैं।" : "Round-the-clock lab services not locally available elsewhere.",
      icon: Microscope, iconBg: "bg-cyan-50", iconColor: "text-cyan-500" 
    },
    { 
      name: selectedLanguage === 'Hindi' ? "डायलिसिस यूनिट" : "Dialysis Unit", 
      description: selectedLanguage === 'Hindi' ? "समर्पित HCV+ मशीन। HIMCARE लाभार्थियों के लिए मुफ्त डायलिसिस।" : "Dedicated HCV+ machine. Free dialysis for HIMCARE beneficiaries.",
      icon: Activity, iconBg: "bg-blue-50", iconColor: "text-blue-600" 
    },
    { 
      name: selectedLanguage === 'Hindi' ? "जनरल और लेप्रोस्कोपिक सर्जरी" : "General & Laparoscopic Surgery", 
      description: selectedLanguage === 'Hindi' ? "विशेषज्ञ कीहोल सर्जरी और विशिष्ट आघात देखभाल।" : "Expert keyhole surgeries and specialized trauma care.",
      icon: Scissors, iconBg: "bg-teal-50", iconColor: "text-teal-600" 
    },
    { 
      name: selectedLanguage === 'Hindi' ? "प्रसूति एवं स्त्री रोग" : "Obstetrics & Gynaecology", 
      description: selectedLanguage === 'Hindi' ? "सामान्य/सी-सेक्शन। लेप्रोस्कोपिक हिस्टेरेक्टॉमी सुविधा।" : "Normal/C-section. Laparoscopic hysterectomy facility.",
      icon: Baby, iconBg: "bg-pink-50", iconColor: "text-pink-500" 
    },
    { 
      name: "Paediatrics & Neonatal Care", 
      description: "Comprehensive care for infants and child health.",
      icon: Baby, iconBg: "bg-red-50", iconColor: "text-red-500" 
    },
    { 
      name: "Internal Medicine (MD Physician)", 
      description: "Expert diagnostic management and chronic disease care.",
      icon: MedicineIcon, iconBg: "bg-blue-50", iconColor: "text-blue-500" 
    },
    { 
      name: "Orthopaedics (Trauma & Joint)", 
      description: "Specialized joint replacements and trauma management.",
      icon: Bone, iconBg: "bg-amber-50", iconColor: "text-amber-600" 
    },
    { 
      name: "ENT Services", 
      description: "Advanced Audiometry & Laryngoscopy procedures.",
      icon: MedicineIcon, iconBg: "bg-orange-50", iconColor: "text-orange-600" 
    },
    { 
      name: "Ophthalmology (Eye Care)", 
      description: "Phaco (Cataract) Surgery and comprehensive vision services.",
      icon: Eye, iconBg: "bg-lime-50", iconColor: "text-lime-600" 
    },
    { 
      name: "Dental Services", 
      description: "Expert child dental care with Specialist Pedodontist.",
      icon: MedicineIcon, iconBg: "bg-emerald-50", iconColor: "text-emerald-500" 
    },
    { 
      name: "Physiotherapy & Rehabilitation", 
      description: "Advanced recovery units for physical rehabilitation.",
      icon: Activity, iconBg: "bg-green-50", iconColor: "text-green-600" 
    },
    { 
      name: "24×7 In-house Pharmacy", 
      description: "Fully stocked pharmacy for all inpatient and outpatient needs.",
      icon: Syringe, iconBg: "bg-purple-50", iconColor: "text-purple-600" 
    },
    { 
      name: "AC & Non-AC Private Rooms", 
      description: "Comfortable recovery spaces including Isolation Rooms.",
      icon: Bed, iconBg: "bg-indigo-50", iconColor: "text-indigo-600" 
    },
    { 
      name: "Infection Control & Waste Mgmt", 
      description: "Strict adherence to Bio-Medical Waste protocols.",
      icon: Trash2, iconBg: "bg-amber-50", iconColor: "text-amber-700" 
    },
    { 
      name: "Canteen (Indoor Patient Diet)", 
      description: "Nutritious prescribed diet plans for indoor patients.",
      icon: Utensils, iconBg: "bg-orange-50", iconColor: "text-orange-600" 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20 animate-fade-in space-y-10">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2.5 rounded-xl">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight leading-none">{t.header}</h1>
            <p className="text-slate-500 text-sm mt-1">{t.subHeader}</p>
          </div>
        </div>
        
        <div className="bg-white px-5 py-2 rounded-full border border-indigo-100 shadow-sm flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">NABH ACCREDITED</span>
        </div>
      </div>

      {/* 2. Cashless Hero Banner */}
      <div className="bg-[#05825f] rounded-3xl p-8 md:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-7 h-7" />
            <h2 className="text-2xl font-bold">{t.cashlessHeader}</h2>
          </div>
          
          <p className="text-emerald-50 text-base max-w-3xl opacity-90 leading-relaxed font-medium">
            {t.cashlessSub}
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl flex items-center gap-3">
               <div className="bg-white rounded-full p-0.5"><CheckCircle2 className="w-4 h-4 text-[#05825f]" /></div>
               <span className="text-sm font-bold">Ayushman Bharat</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl flex items-center gap-3">
               <div className="bg-white rounded-full p-0.5"><CheckCircle2 className="w-4 h-4 text-[#05825f]" /></div>
               <span className="text-sm font-bold">State Government Schemes</span>
            </div>
            <div className="bg-[#2a66b1] px-5 py-3 rounded-xl flex items-center gap-3 shadow-md">
               <Award className="w-4 h-4 text-white" />
               <span className="text-sm font-bold">NABH Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Medical Services Grid */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 md:p-12">
          <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-10 border-b border-slate-100 pb-4">
            {t.infraTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilityItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-slate-100 p-5 flex items-start gap-5 hover:shadow-md transition-all group cursor-default"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-sm ${item.iconBg} ${item.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-800 text-[15px] leading-snug">
                      {item.name}
                    </span>
                    {item.description && (
                      <span className="text-xs text-slate-500 font-medium leading-relaxed">
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Bottom Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quality Assurance Card */}
        <div className="bg-[#f2f6ff] border border-blue-100 rounded-[2rem] p-8 shadow-sm">
           <div className="flex items-center gap-3 mb-4">
             <div className="bg-indigo-600/10 p-1 rounded-full">
               <CheckCircle2 className="w-7 h-7 text-indigo-600" />
             </div>
             <h3 className="text-2xl font-bold text-[#2a3a6b]">{t.qualityTitle}</h3>
           </div>
           <p className="text-[#4a5a8a] text-base leading-relaxed mb-8">
             {t.qualityText}
           </p>
           <div className="flex gap-3">
             <span className="bg-white px-4 py-2 rounded-xl text-indigo-700 text-[10px] font-black uppercase tracking-wider border border-indigo-50 shadow-sm">PATIENT SAFETY</span>
             <span className="bg-white px-4 py-2 rounded-xl text-indigo-700 text-[10px] font-black uppercase tracking-wider border border-indigo-50 shadow-sm">QUALITY CARE</span>
           </div>
        </div>

        {/* Diagnostic Excellence Card */}
        <div className="bg-[#fff9ed] border border-amber-100 rounded-[2rem] p-8 shadow-sm">
           <div className="flex items-center gap-3 mb-4 text-[#733d13]">
             <div className="bg-[#733d13]/10 p-1 rounded-full">
               <Activity className="w-7 h-7" />
             </div>
             <h3 className="text-2xl font-bold">{t.diagTitle}</h3>
           </div>
           <p className="text-[#8e5a31] text-base leading-relaxed mb-8">
             {t.diagText}
           </p>
           <div className="flex gap-3">
             <span className="bg-white px-4 py-2 rounded-xl text-[#8e5a31] text-[10px] font-black uppercase tracking-wider border border-amber-50 shadow-sm">ADVANCED IMAGING</span>
             <span className="bg-white px-4 py-2 rounded-xl text-[#8e5a31] text-[10px] font-black uppercase tracking-wider border border-amber-50 shadow-sm">24/7 LAB</span>
           </div>
        </div>
      </div>

    </div>
  );
};

export default OurFacility;
