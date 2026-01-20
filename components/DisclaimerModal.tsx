import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  onAccept: () => void;
  selectedLanguage?: string;
}

const DisclaimerModal: React.FC<Props> = ({ onAccept, selectedLanguage = 'English' }) => {
  const translations: Record<string, any> = {
    English: {
      header: "Clinical Triage Disclaimer",
      subHeader: "Please read carefully before proceeding.",
      warning: "This is Eli, an AI Clinical Assistant for J.C. Juneja Hospital, not a replacement for a doctor.",
      point1: "This tool provides information based on established clinical guidelines but does not provide a medical diagnosis.",
      point2: "In case of a medical emergency (chest pain, stroke symptoms, difficulty breathing), call emergency services immediately.",
      point3: "Never delay seeking professional medical treatment because of AI-generated insights.",
      point4: "We follow HIPAA principles to handle your health data securely.",
      btn: "I Agree & Proceed"
    },
    Hindi: {
      header: "क्लिनिकल ट्रायज अस्वीकरण",
      subHeader: "आगे बढ़ने से पहले कृपया ध्यान से पढ़ें।",
      warning: "यह एली (Eli) है, जो J.C. जुनेजा अस्पताल के लिए एक AI क्लिनिकल असिस्टेंट है, डॉक्टर का विकल्प नहीं।",
      point1: "यह टूल स्थापित क्लिनिकल दिशानिर्देशों के आधार पर जानकारी प्रदान करता है लेकिन चिकित्सा निदान (Medical Diagnosis) प्रदान नहीं करता है।",
      point2: "चिकित्सा आपातकाल (सीने में दर्द, स्ट्रोक के लक्षण, सांस लेने में कठिनाई) के मामले में, तुरंत आपातकालीन सेवाओं को कॉल करें।",
      point3: "AI द्वारा उत्पन्न सुझावों के कारण पेशेवर चिकित्सा उपचार लेने में कभी देरी न करें।",
      point4: "हम आपके स्वास्थ्य डेटा को सुरक्षित रूप से संभालने के लिए HIPAA सिद्धांतों का पालन करते हैं।",
      btn: "मैं सहमत हूँ और आगे बढ़ें"
    },
    Hinglish: {
      header: "Clinical Triage Disclaimer",
      subHeader: "Aage badhne se pehle please dhyan se padhein.",
      warning: "Ye Eli hai, J.C. Juneja Hospital ka AI Clinical Assistant, ye doctor ka badla (replacement) nahi hai.",
      point1: "Ye tool sirf information deta hai, medical diagnosis (bimari ki pakki pehchan) nahi karta.",
      point2: "Emergency case mein (chest pain, saans lene mein takleef), turant emergency services ko call karein.",
      point3: "AI ke sujhavon ki wajah se doctor ke paas jane mein deri na karein.",
      point4: "Hum aapka data HIPAA security ke saath safe rakhte hain.",
      btn: "I Agree & Proceed"
    }
  };

  const t = translations[selectedLanguage] || translations.English;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in-up">
        <div className="bg-amber-50 p-6 border-b border-amber-100 flex items-start gap-4">
          <div className="bg-amber-100 p-2 rounded-full shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-900">{t.header}</h2>
            <p className="text-sm text-amber-800 mt-1">{t.subHeader}</p>
          </div>
        </div>
        
        <div className="p-6 space-y-4 text-slate-600 text-sm leading-relaxed">
          <p>
            <strong>{t.warning}</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-500">
            <li>{t.point1}</li>
            <li>{t.point2}</li>
            <li>{t.point3}</li>
            <li>{t.point4}</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onAccept}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-teal-600/20"
          >
            <CheckCircle className="w-4 h-4" />
            {t.btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;