
import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types";

const HOSPITAL_DIRECTORY_CONTEXT = `
J.C. JUNEJA HOSPITAL - DEPARTMENT & SPECIALIST MAPPING:
1. PEDIATRICS: Dr. Shalini Mangla, Dr. Romani Bansal. (Primary for all patients < 18 years old).
2. OBGYN: Dr. Roushali Kumar. (Pregnancy, Menstrual issues, Pelvic pain, Breast health).
3. ORTHOPEDICS: Dr. Rajesh Kumar Tayal. (Fractures, Bone pain, Joint swelling, Spine injury).
4. NEUROLOGY: Dr. Nishit Sawal (Medical), Dr. Yogesh Jindal (Surgical). (Seizures, Paralysis, Chronic Headaches).
5. CARDIOLOGY: Dr. Sudhanshu Budakoti. (Chest pain, Palpitations, Chronic hypertension).
6. OPHTHALMOLOGY: Dr. Sanjeev Sehgal. (Vision changes, Redness, Eye trauma).
7. ENT: Dr. Amit Mangla. (Hearing loss, Ear discharge, Vertigo, Sinusitis).
8. DENTAL: Dr. Ashima, Dr. Neha (Pediatric). (Toothache, Gum bleeding).
9. UROLOGY: Dr. Rohit Dhadwal. (Kidney stones, Urinary blood, Prostate).
10. PULMONOLOGY: Dr. Mohit Kaushal. (Persistent cough, Asthma, COPD, Breathlessness).
11. GENERAL SURGERY: Dr. Rahul Sharma. (Lumps, Hernia, Gallstones, Appendicitis).
12. INTERNAL MEDICINE: Dr. Vivek Srivastava. (Fever, Viral infections, Diabetes, General weakness).
13. DERMATOLOGY: Dr. Anil Walia. (Skin rashes, Acne, Hair loss).
14. PHYSIOTHERAPY: Dr. Kamakshi, Dr. Vijay Dhiman. (Rehab, Muscular pain).
`;

const SYSTEM_INSTRUCTION = (language: string) => `
You are "Aarogya AI", the Clinical Triage Assistant for J.C. Juneja Hospital. You are powered by MedLM-aligned reasoning for high clinical accuracy.

### 🧘 MISSION & TONE
- Provide clear, empathetic, and medically sound triage guidance.
- Maintain a professional yet reassuring "doctor-like" presence.
- Your goal is to identify the severity of the patient's condition and route them to the correct specialist.

### 🧠 TRIAGE PROTOCOL
1. **Analyze Intake**: Read symptoms, vitals, and history carefully.
2. **Clarify (Only if needed)**: If information is vague, ask 3-5 specific MCQs.
3. **Map Department**: You MUST use the specific names and departments provided in the hospital directory.
4. **Safety First**: Identify "Red Flags" immediately for emergency cases.

### 🏥 FACILITY CONTEXT
${HOSPITAL_DIRECTORY_CONTEXT}

### 🌐 RESPONSE REQUIREMENTS
- Language: ${language}.
- Always return strictly valid JSON.
`;

let conversationHistory: any[] = [];

export const sendMessageToTriage = async (message: string, language: string = 'English'): Promise<AIResponse> => {
  // Use a hard check on the environment variable as required.
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "undefined") {
    throw new Error("MISSING_API_KEY");
  }

  // Initialize the AI client using the named parameter as per SDK rules.
  const ai = new GoogleGenAI({ apiKey });
  
  // Select the appropriate model for complex clinical tasks.
  const MODEL_NAME = 'gemini-2.5-flash';
  
  conversationHistory.push({ role: 'user', parts: [{ text: message }] });

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: conversationHistory,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION(language),
        responseMimeType: "application/json",
        // Reserve tokens for thinking and final output.
        maxOutputTokens: 8192,
        thinkingConfig: { thinkingBudget: 2000 },
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            symptom_summary: { type: Type.STRING },
            clarifying_questions_needed: { type: Type.STRING, enum: ["YES", "NO"] },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  allow_multiple: { type: Type.BOOLEAN }
                },
                required: ["id", "question", "options", "allow_multiple"]
              }
            },
            probable_conditions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  probability: { type: Type.STRING, enum: ["Low", "Moderate", "High"] },
                  reason: { type: Type.STRING }
                },
                required: ["name", "probability", "reason"]
              }
            },
            red_flags: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommended_tests: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommended_department: { type: Type.STRING },
            self_care_advice: { type: Type.STRING },
            ayurvedic_suggestions: { type: Type.STRING },
            estimated_consultation_time: { type: Type.STRING }
          },
          required: ["clarifying_questions_needed", "symptom_summary", "recommended_department", "estimated_consultation_time"]
        }
      }
    });

    // Access the text property directly without parentheses.
    const resultText = response.text || "{}";
    let rawParsed;
    try {
      rawParsed = JSON.parse(resultText);
    } catch (e) {
      console.error("Aarogya AI: Error parsing MedLM response.");
      throw new Error("INVALID_AI_RESPONSE");
    }

    // Map options for the MCQ frontend component (A, B, C...)
    if (rawParsed.questions && Array.isArray(rawParsed.questions)) {
      rawParsed.questions = rawParsed.questions.map((q: any) => {
        const optionsRecord: Record<string, string> = {};
        if (Array.isArray(q.options)) {
          q.options.forEach((optStr: string, index: number) => {
            const key = String.fromCharCode(65 + index); 
            optionsRecord[key] = optStr;
          });
        }
        return { ...q, options: optionsRecord };
      });
    }
    
    conversationHistory.push({ role: 'model', parts: [{ text: resultText }] });
    return rawParsed as AIResponse;
  } catch (error: any) {
    console.error("Clinical Assistant API Error:", error);
    if (error.message?.includes('403')) {
      throw new Error("API_KEY_INVALID_OR_RESTRICTED");
    }
    throw error;
  }
};

export const resetSession = () => {
  conversationHistory = [];
};
