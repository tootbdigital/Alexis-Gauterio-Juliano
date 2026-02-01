
import React, { useState } from 'react';
import { analyzeOneOnOneDeep } from '../geminiService';
import { QUESTIONS, PILLARS } from '../constants/questions';
import { MeetingAnswers } from '../types';

interface MeetingFormProps {
  colaborador: { id: string; nome: string; cargo: string };
  onSave: (data: any) => void;
  onCancel: () => void;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ colaborador, onSave, onCancel }) => {
  const [currentPillar, setCurrentPillar] = useState(0);
  const [answers, setAnswers] = useState<MeetingAnswers>({});
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const pillarQuestions = QUESTIONS.filter(q => q.pillar === currentPillar);
  const progress = ((currentPillar + 1) / PILLARS.length) * 100;

  const handleNext = () => {
    if (currentPillar < PILLARS.length - 1) {
      setCurrentPillar(currentPillar + 1);
      window.scrollTo(0, 0);
    } else {
      handleFinalize();
    }
  };

  const handlePrev = () => {
    if (currentPillar > 0) setCurrentPillar(currentPillar - 1);
  };

  const handleFinalize = async () => {
    setLoadingAI(true);
    const analysis = await analyzeOneOnOneDeep(answers, colaborador.nome);
    setAiAnalysis(analysis);
    setLoadingAI(false);
  };

  const updateAnswer = (id: string, val: string | number) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 max-w-4xl mx-auto animate-fadeIn mb-12">
      {/* Header & Progress */}
      <div className="bg-slate-900 p-8 text-white relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-900 text-xl font-black">
              {currentPillar + 1}
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight uppercase">{PILLARS[currentPillar]}</h2>
              <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Pilar Estratégico BDG</p>
            </div>
          </div>
          <button onClick={onCancel} className="text-slate-500 hover:text-white transition-colors">
            <i className="fa-solid fa-circle-xmark text-2xl"></i>
          </button>
        </div>
        
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Body */}
      <div className="p-10 space-y-10">
        {!aiAnalysis ? (
          <>
            <div className="space-y-12">
              {pillarQuestions.map(q => (
                <div key={q.id} className="group animate-slideInUp">
                  <label className="block text-lg font-black text-slate-800 mb-4 leading-tight">
                    {q.label}
                  </label>
                  
                  {q.type === 'text' && (
                    <textarea
                      value={(answers[q.id] as string) || ''}
                      onChange={(e) => updateAnswer(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-slate-700 focus:border-amber-500 focus:bg-white transition-all min-h-[100px]"
                    />
                  )}

                  {q.type === 'scale' && (
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map(num => (
                        <button
                          key={num}
                          onClick={() => updateAnswer(q.id, num)}
                          className={`flex-1 py-4 rounded-xl font-black transition-all border-2 ${
                            answers[q.id] === num 
                              ? 'bg-amber-500 border-amber-500 text-slate-900 scale-105 shadow-lg shadow-amber-500/20' 
                              : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === 'choice' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options?.map(opt => (
                        <button
                          key={opt}
                          onClick={() => updateAnswer(q.id, opt)}
                          className={`p-4 rounded-xl text-left font-bold transition-all border-2 ${
                            answers[q.id] === opt
                              ? 'bg-slate-900 border-slate-900 text-white shadow-xl'
                              : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          <i className={`fa-solid ${answers[q.id] === opt ? 'fa-circle-check' : 'fa-circle'} mr-3 text-amber-500`}></i>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-10 border-t border-slate-100">
              <button
                onClick={handlePrev}
                disabled={currentPillar === 0}
                className="px-8 py-4 rounded-2xl font-black text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i> Voltar
              </button>
              <button
                onClick={handleNext}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl flex items-center gap-3"
              >
                {currentPillar === PILLARS.length - 1 ? 'Gerar Dossiê IA' : 'Próximo Passo'}
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </>
        ) : (
          <div className="animate-fadeIn space-y-8">
            <div className="bg-amber-50 p-8 rounded-[2rem] border-l-8 border-amber-500 shadow-xl">
              <h3 className="text-xl font-black text-amber-900 mb-6 flex items-center gap-3">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                Mentor IA: Insights de Alexis
              </h3>
              <div className="prose prose-slate max-w-none text-amber-900 leading-relaxed whitespace-pre-wrap font-medium">
                {aiAnalysis}
              </div>
            </div>
            
            <button
              onClick={() => onSave({ answers, analysis: aiAnalysis })}
              className="w-full py-6 bg-amber-500 text-slate-900 font-black rounded-2xl text-xl hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/30 uppercase tracking-widest"
            >
              Confirmar e Salvar no Dossiê
            </button>
          </div>
        )}
      </div>

      {loadingAI && (
        <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center z-50 p-10 text-center">
          <div className="w-20 h-20 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h3 className="text-white text-2xl font-black mb-2 uppercase tracking-tighter">O Mentor IA está analisando a obra...</h3>
          <p className="text-slate-400 font-medium italic">Cruzando 80 pontos de contato de {colaborador.nome} para o líder Alexis.</p>
        </div>
      )}
    </div>
  );
};

export default MeetingForm;
