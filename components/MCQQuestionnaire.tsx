import React, { useState } from 'react';
import { MCQQuestion } from '../types';
import { Check } from 'lucide-react';

interface Props {
  questions: MCQQuestion[];
  onSubmit: (answers: Record<string, string[]>) => void;
  isLoading: boolean;
}

const MCQQuestionnaire: React.FC<Props> = ({ questions, onSubmit, isLoading }) => {
  // State to store answers: QuestionID -> Array of selected Option IDs
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const handleOptionToggle = (questionId: string, optionId: string, allowMultiple: boolean) => {
    setAnswers(prev => {
      const currentSelections = prev[questionId] || [];
      
      if (allowMultiple) {
        // Toggle selection
        if (currentSelections.includes(optionId)) {
          return { ...prev, [questionId]: currentSelections.filter(id => id !== optionId) };
        } else {
          return { ...prev, [questionId]: [...currentSelections, optionId] };
        }
      } else {
        // Single selection
        return { ...prev, [questionId]: [optionId] };
      }
    });
  };

  const isFormComplete = questions.every(q => (answers[q.id] && answers[q.id].length > 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete && !isLoading) {
      onSubmit(answers);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in-up">
      {/* Centered Header Section matching screenshot */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Symptom Assessment</h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto">
          Please answer the following questions to help us understand your condition.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-10 transition-all">
            <div className="flex items-start gap-4 mb-8">
              {/* Blue Circular Q# Badge */}
              <div className="bg-indigo-50 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-sm border border-indigo-100">
                Q{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-800 leading-snug">
                {q.question}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(q.options).map(([optId, optText]) => {
                const isSelected = answers[q.id]?.includes(optId);
                return (
                  <label 
                    key={optId}
                    className={`
                      relative flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-1 ring-indigo-100' 
                        : 'border-slate-50 hover:border-slate-200 bg-slate-50/50'
                      }
                    `}
                  >
                    <input 
                      type={q.allow_multiple ? "checkbox" : "radio"}
                      name={q.id}
                      className="sr-only"
                      onChange={() => handleOptionToggle(q.id, optId, q.allow_multiple)}
                      checked={isSelected}
                    />
                    
                    {/* Custom Checkbox/Radio Indicator */}
                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all mt-0.5 ${
                      isSelected 
                        ? 'bg-indigo-600 border-indigo-600 shadow-md' 
                        : 'border-slate-200 bg-white'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white stroke-[4px]" />}
                    </div>

                    <span className={`font-medium text-[15px] leading-relaxed ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                      {optText}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Instruction Footer matching screenshot */}
            <div className="mt-8 border-t border-slate-50 pt-4">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] ml-1">
                {q.allow_multiple ? 'SELECT MULTIPLE OPTIONS' : 'SELECT ONE OPTION'}
              </span>
            </div>
          </div>
        ))}

        <div className="flex justify-center md:justify-end pt-4">
          <button 
            type="submit" 
            disabled={!isFormComplete || isLoading}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed text-lg"
          >
            {isLoading ? (
               <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Submit Assessment'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MCQQuestionnaire;