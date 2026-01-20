
import React, { useState, useEffect, useRef } from 'react';
import PatientIntakeForm from './PatientIntakeForm';
import PatientIdentification from './PatientIdentification';
import ProfileSelection from './ProfileSelection';
import LanguageSelection from './LanguageSelection';
import MCQQuestionnaire from './MCQQuestionnaire';
import TriageReport from './TriageReport';
import SymptomInput from './SymptomInput';
import DisclaimerModal from './DisclaimerModal';
import { sendMessageToTriage, resetSession } from '../services/geminiService';
import { TriageResponse, AppState, IntakeData, AIResponse, MCQStepResponse, PatientRecord } from '../types';
import { RefreshCw, ClipboardCheck, Edit, AlertCircle } from 'lucide-react';

interface Props {
  onSaveRecord: (intake: IntakeData, triage: TriageResponse) => void;
  onNavigateToDigitalTwin: () => void;
  records: PatientRecord[];
  onLogin: (phone: string) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const PatientTriageView: React.FC<Props> = ({ onSaveRecord, onNavigateToDigitalTwin, records, onLogin, selectedLanguage, onLanguageChange }) => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [currentPhone, setCurrentPhone] = useState('');
  const [formInitialRelationship, setFormInitialRelationship] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);
  const [mcqData, setMcqData] = useState<MCQStepResponse | null>(null);
  const [finalReport, setFinalReport] = useState<TriageResponse | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [hasAskedQuestions, setHasAskedQuestions] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const uiTranslations: Record<string, any> = {
    English: {
      analyzing: "Analyzing...",
      reset: "Start New Assessment",
      concern: "What medical concerns do you have today?",
      welcome: "Welcome",
      errorHeader: "Assessment Interrupted",
      errorSub: "There was a problem processing your request. Please check your internet connection and API configuration.",
      apiKeyError: "Your API Key is missing or invalid. Please configure it in your environment variables.",
      tryAgain: "Try Again"
    },
    Hindi: {
      analyzing: "विश्लेषण हो रहा है...",
      reset: "नया मूल्यांकन शुरू करें",
      concern: "आज आपको क्या परेशानी है?",
      welcome: "नमस्ते",
      errorHeader: "मूल्यांकन बाधित",
      errorSub: "आपके अनुरोध को संसाधित करने में समस्या हुई। कृपया अपना इंटरनेट और API कॉन्फ़िगरेशन जांचें।",
      apiKeyError: "आपका API Key गायब या अमान्य है। कृपया इसे अपने पर्यावरण चर में कॉन्फ़िगर करें।",
      tryAgain: "फिर से प्रयास करें"
    },
    Hinglish: {
      analyzing: "Analyzing...",
      reset: "Start New Assessment",
      concern: "Aaj aapko kya takleef hai?",
      welcome: "Welcome",
      errorHeader: "Assessment Interrupted",
      errorSub: "Request process karne mein problem hui. Internet aur API key check karein.",
      apiKeyError: "API Key nahi mili ya galat hai. Environment variables check karein.",
      tryAgain: "Try Again"
    }
  };

  const ut = uiTranslations[selectedLanguage] || uiTranslations.English;

  useEffect(() => {
    resetSession();
  }, [appState]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [appState, mcqData, finalReport]);

  const triggerSave = (intake: IntakeData, report: TriageResponse) => {
    if (!isSaved) {
       onSaveRecord(intake, report);
       setIsSaved(true);
    }
  };

  const processAIResponse = async (response: AIResponse) => {
    const isMCQRequest = ('screen' in response && response.screen === 'symptom_mcq') || 
                         ('clarifying_questions_needed' in response && response.clarifying_questions_needed === 'YES');

    if (isMCQRequest && hasAskedQuestions) {
        try {
            const forcedResponse = await sendMessageToTriage("I have provided all information. Please provide the final triage result based on current inputs.", selectedLanguage);
            return processAIResponse(forcedResponse);
        } catch (e: any) {
            setErrorMessage(e.message || "Final analysis failed");
            setAppState(AppState.ERROR);
            return;
        }
    }

    if (isMCQRequest && !hasAskedQuestions) {
      setMcqData(response as any);
      setAppState(AppState.MCQ_ENTRY);
      setHasAskedQuestions(true);
      return;
    }
    
    if ('symptom_summary' in response) {
      const report = response as TriageResponse;
      setFinalReport(report);
      setAppState(AppState.RESULTS);
      
      if (intakeData) {
        const finalIntake = { ...intakeData, phoneNumber: currentPhone };
        triggerSave(finalIntake, report);
      }
    } else {
        setErrorMessage("Incomplete AI response format");
        setAppState(AppState.ERROR);
    }
  };

  const processIntake = async (data: IntakeData) => {
    setIntakeData(data);
    setAppState(AppState.ANALYZING_INTAKE);
    try {
      const response = await sendMessageToTriage(`PATIENT INTAKE:\n${data.fullName} (${data.age}Y, ${data.sex})\nSymptoms: ${data.currentSymptoms}`, selectedLanguage);
      await processAIResponse(response);
    } catch (error: any) {
      console.error("Process Intake Error:", error);
      setErrorMessage(error.message || "API call failed");
      setAppState(AppState.ERROR);
    }
  };

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
    setAppState(AppState.PATIENT_ID);
  };

  const handlePhoneSubmit = (phone: string) => {
    const cleanPhone = phone.trim();
    setCurrentPhone(cleanPhone);
    onLogin(cleanPhone);
    setAppState(AppState.SELECT_LANGUAGE);
  };

  const handleLanguageSelect = (language: string) => {
    onLanguageChange(language);
    setAppState(AppState.SELECT_PROFILE);
  };

  const handleProfileSelect = (profile: IntakeData | null, relationship?: string) => {
      if (profile) {
          setIntakeData({ ...profile, phoneNumber: currentPhone, currentSymptoms: '' });
          setAppState(AppState.QUICK_INTAKE);
      } else {
          setFormInitialRelationship(relationship || '');
          setIntakeData(null);
          setAppState(AppState.INTAKE);
      }
  };

  const handleIntakeSubmit = async (data: IntakeData) => {
    processIntake({ ...data, phoneNumber: currentPhone });
  };

  const handleQuickIntakeSubmit = async (symptoms: string) => {
    if (intakeData) {
        processIntake({ ...intakeData, currentSymptoms: symptoms });
    }
  };

  const handleMCQSubmit = async (answers: Record<string, string[]>) => {
    setAppState(AppState.ANALYZING_MCQ);
    let answerString = "PATIENT FOLLOW-UP ANSWERS:\n";
    const questions = mcqData?.questions || [];
    questions.forEach(q => {
        const selected = (answers[q.id] || []).map(id => q.options[id]).join(", ");
        answerString += `Q: ${q.question} -> A: ${selected}\n`;
    });

    try {
      const response = await sendMessageToTriage(answerString, selectedLanguage);
      await processAIResponse(response);
    } catch (error: any) {
      console.error("MCQ Submit Error:", error);
      setErrorMessage(error.message || "MCQ processing failed");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    resetSession();
    setIntakeData(null);
    setMcqData(null);
    setFinalReport(null);
    setHasAskedQuestions(false);
    setIsSaved(false);
    setErrorMessage(null);
    setAppState(AppState.PATIENT_ID);
  };

  const uniqueProfiles = Array.from(new Map(records.filter(r => r.intake.phoneNumber === currentPhone).map(r => [r.intake.fullName.toLowerCase(), r.intake])).values());

  return (
    <div className="pb-24">
        {showDisclaimer && <DisclaimerModal onAccept={handleDisclaimerAccept} selectedLanguage={selectedLanguage} />}

        <div className="flex justify-center mb-8">
           <div className="flex items-center gap-2">
              <span className={`h-1.5 rounded-full transition-all duration-500 ${appState !== AppState.RESULTS ? 'bg-indigo-600 w-8' : 'bg-slate-200 w-2'}`}/>
              <span className={`h-1.5 rounded-full transition-all duration-500 ${appState === AppState.RESULTS ? 'bg-indigo-600 w-8' : 'bg-slate-200 w-2'}`}/>
           </div>
        </div>

        {appState === AppState.PATIENT_ID && <PatientIdentification onSubmit={handlePhoneSubmit} />}
        {appState === AppState.SELECT_LANGUAGE && <LanguageSelection onSelect={handleLanguageSelect} />}
        {appState === AppState.SELECT_PROFILE && <ProfileSelection phoneNumber={currentPhone} existingProfiles={uniqueProfiles} onSelectProfile={handleProfileSelect} selectedLanguage={selectedLanguage} />}
        
        {appState === AppState.QUICK_INTAKE && intakeData && (
           <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-teal-700 rounded-2xl p-6 text-white shadow-lg flex justify-between items-center">
                 <div>
                    <h2 className="text-xl font-bold">{ut.welcome}, {intakeData.fullName.split(' ')[0]}</h2>
                    <p className="text-teal-100 text-xs">Starting your check-up...</p>
                 </div>
                 <button onClick={() => setAppState(AppState.INTAKE)} className="text-xs bg-teal-600 px-3 py-1.5 rounded-lg border border-teal-500 hover:bg-teal-500 transition-colors flex items-center gap-1">
                    <Edit className="w-3 h-3" /> Edit Profile
                 </button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                 <h3 className="text-base font-bold text-slate-800 mb-4">{ut.concern}</h3>
                 <SymptomInput onSubmit={handleQuickIntakeSubmit} isLoading={false} />
              </div>
           </div>
        )}

        {appState === AppState.INTAKE && <PatientIntakeForm onSubmit={handleIntakeSubmit} isLoading={false} initialPhone={currentPhone} initialRelationship={formInitialRelationship} initialData={intakeData} selectedLanguage={selectedLanguage} />}
        
        {(appState === AppState.ANALYZING_INTAKE || appState === AppState.ANALYZING_MCQ) && (
          <div className="text-center py-24 animate-pulse">
            <ClipboardCheck className="w-16 h-16 text-teal-600 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-slate-700">{ut.analyzing}</h3>
          </div>
        )}

        {appState === AppState.MCQ_ENTRY && mcqData && <MCQQuestionnaire questions={mcqData.questions} onSubmit={handleMCQSubmit} isLoading={false} />}

        {appState === AppState.RESULTS && finalReport && (
          <div className="space-y-8 animate-fade-in">
             <TriageReport data={finalReport} intakeData={intakeData || undefined} />
             <div className="flex justify-center">
                 <button onClick={handleReset} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-sm">
                   <RefreshCw className="w-4 h-4" /> {ut.reset}
                 </button>
              </div>
          </div>
        )}

        {appState === AppState.ERROR && (
           <div className="text-center py-20">
              <div className="bg-red-50 text-red-600 p-8 rounded-2xl border border-red-100 max-w-sm mx-auto shadow-lg">
                 <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
                 <h3 className="font-bold mb-2 text-lg">{ut.errorHeader}</h3>
                 <p className="text-xs mb-4 opacity-80 leading-relaxed">
                   {errorMessage === "MISSING_API_KEY" ? ut.apiKeyError : ut.errorSub}
                 </p>
                 {errorMessage && (
                    <div className="bg-red-100 p-2 rounded mb-6 text-[10px] font-mono break-all text-red-800">
                      Error Detail: {errorMessage}
                    </div>
                 )}
                 <button onClick={handleReset} className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-md">
                   {ut.tryAgain}
                 </button>
              </div>
           </div>
        )}
        <div ref={scrollRef} />
    </div>
  );
};

export default PatientTriageView;
