import React, { useEffect } from 'react';
import { QuizState } from '../types';
import { Home, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ResultsProps {
  state: QuizState;
  onReset: () => void;
}

export function Results({ state, onReset }: ResultsProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let totalScore = 0;
  const maxScore = state.questions.length * 4;

  const evaluatedQuestions = state.questions.map((q) => {
    const userAns = state.userAnswers[q.id] || [];
    const correctAns = q.correctAnswers;
    const totalCorrectCount = correctAns.length;
    
    const isExactMatch = userAns.length === correctAns.length && 
                        userAns.every(id => correctAns.includes(id));
    
    let questionScore = 0;
    if (isExactMatch) {
      questionScore = 4;
    } else {
      // +1 for each correct option selected, -1 for each wrong one, never below 0
      const correctHits = userAns.filter(id => correctAns.includes(id)).length;
      questionScore = Math.max(0, correctHits - (userAns.length - correctHits));
    }

    const optionResults = q.options.map(opt => {
      const isUserSelected = userAns.includes(opt.id);
      const isCorrect = correctAns.includes(opt.id);
      
      let pointsForOption = 0;
      let status: 'correct-hit' | 'miss' | 'incorrect-hit' | 'correct-omission' = 'correct-omission';

      if (isUserSelected && isCorrect) {
        status = 'correct-hit';
        // Individual points shown only if not a 4-point perfect match
        pointsForOption = isExactMatch ? 0 : 1;
      } else if (isUserSelected && !isCorrect) {
        status = 'incorrect-hit';
        pointsForOption = isExactMatch ? 0 : -1;
      } else if (!isUserSelected && isCorrect) {
        status = 'miss';
      } else {
        status = 'correct-omission';
      }

      return {
        ...opt,
        isUserSelected,
        isCorrect,
        status,
        points: pointsForOption
      };
    });

    totalScore += questionScore;
    const isPerfect = isExactMatch;

    return {
      question: q,
      userAns,
      correctAns,
      isPerfect,
      points: questionScore,
      isExactMatch,
      optionResults
    };
  });

  const percentage = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 xl:pt-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Summary Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 mb-8 text-center transition-colors">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Výsledky testu</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Režim: {state.mode === 'biology' ? 'Biológia' : state.mode === 'chemistry' ? 'Chémia' : 'Simulácia prijímačiek'}
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-8 font-sans">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="text-slate-100 dark:text-slate-700" stroke="currentColor" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="16" fill="none"
                  className={`${percentage >= 50 ? 'text-teal-500' : 'text-rose-500'} transition-all duration-1000`}
                  stroke="currentColor" strokeWidth="3" strokeDasharray={`${percentage}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{percentage}%</span>
              </div>
            </div>
            
            <div className="text-left space-y-3">
              <div className="text-5xl font-bold text-slate-900 dark:text-white flex items-baseline gap-2">
                {totalScore} <span className="text-2xl text-slate-400 dark:text-slate-500 font-medium">/ {maxScore}</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Získané body</p>
              
              <div className="bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-700 max-w-[340px]">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal italic text-left">
                  <strong>Pravidlo bodovania:</strong> 4 body za presnú odpoveď. Inak +1 bod za každú správne označenú možnosť a −1 bod za každú nesprávne označenú. Za otázku nemôžete získať menej ako 0 bodov.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
               <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold mb-1">Počet otázok</p>
               <p className="text-xl font-bold dark:text-white">{state.questions.length}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
               <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold mb-1">Max. body</p>
               <p className="text-xl font-bold dark:text-white">{maxScore}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
               <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold mb-1">Dosiahnuté body</p>
               <p className="text-xl font-bold text-teal-600 dark:text-teal-400">{totalScore}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
               <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold mb-1">Úspešnosť</p>
               <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{percentage}%</p>
            </div>
          </div>

          <button
            onClick={onReset}
            className="inline-flex items-center px-6 py-3 cursor-pointer rounded-xl font-medium text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors shadow-sm"
          >
            <Home size={20} className="mr-2" />
            Späť na hlavné menu
          </button>
        </div>

        {/* Detailed Review */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 px-2 font-sans">Prehľad odpovedí</h2>
          
          {evaluatedQuestions.map((eq, index) => (
            <div key={eq.question.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0">
                    {eq.isPerfect ? (
                      <CheckCircle className="text-teal-500" size={24} />
                    ) : eq.points > 0 ? (
                      <CheckCircle className="text-amber-500" size={24} />
                    ) : (
                      <XCircle className="text-rose-500" size={24} />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                    <span className="text-slate-400 dark:text-slate-500 mr-2">{index + 1}.</span>
                    <span dangerouslySetInnerHTML={{ __html: eq.question.text }} />
                  </h3>
                </div>
                <div className={`ml-4 flex-shrink-0 font-bold whitespace-nowrap px-3 py-1.5 rounded-lg border transition-colors ${
                  eq.isPerfect ? 'bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-900/30' : 
                  eq.points > 0 ? 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30' :
                  'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-900/30'
                }`}>
                  {eq.points} / 4 b
                </div>
              </div>

              {eq.question.image && (
                <div className="mb-4 pl-9">
                  <img
                    src={eq.question.image}
                    alt={`Otázka ${index + 1}`}
                    className="max-w-full h-auto rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>
              )}

              <div className="space-y-2 pl-9">
                {eq.optionResults.map((opt) => {
                  const { status, points } = opt;
                  
                  let bgColor = "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200";
                  let icon = null;
                  let label = "";

                  switch (status) {
                    case 'correct-hit':
                      bgColor = "bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-100 font-medium";
                      icon = <CheckCircle size={16} className="text-teal-600 dark:text-teal-400" />;
                      label = eq.isPerfect ? "Súčasť presnej odpovede (+4b)" : "Správne označené";
                      break;
                    case 'incorrect-hit':
                      bgColor = "bg-rose-50 dark:bg-rose-900/40 border-rose-200 dark:border-rose-700 text-rose-900 dark:text-rose-100";
                      icon = <XCircle size={16} className="text-rose-600 dark:text-rose-400" />;
                      label = "Nesprávne označené (−1 b)";
                      break;
                    case 'miss':
                      bgColor = "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100 italic";
                      icon = <AlertCircle size={16} className="text-amber-600 dark:text-amber-400" />;
                      label = "Chýbajúca odpoveď";
                      break;
                    case 'correct-omission':
                      bgColor = "bg-slate-50/50 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-700/50 text-slate-500 dark:text-slate-500";
                      icon = <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />;
                      label = "Správne neoznačené";
                      break;
                  }

                  const showPoints = !eq.isPerfect && status === 'correct-hit';

                  return (
                    <div key={opt.id} className={`flex justify-between items-center p-3 rounded-lg border ${bgColor} transition-colors group relative`}>
                      <div className="flex items-center flex-1 pr-4">
                        <div className="w-6 flex-shrink-0 flex justify-center mr-2">
                          {icon}
                        </div>
                        <span className="font-medium mr-2 opacity-75">{opt.id}.</span>
                        <span dangerouslySetInnerHTML={{ __html: opt.text }} />
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="hidden lg:group-hover:inline-block text-[10px] uppercase tracking-tighter opacity-70 absolute -top-1.5 right-12 bg-white dark:bg-slate-800 px-1 border border-slate-100 dark:border-slate-700 rounded z-10">
                           {label}
                        </span>
                        <div className={`flex-shrink-0 text-sm font-bold whitespace-nowrap ${showPoints ? 'text-teal-600 dark:text-teal-400 font-black' : status === 'incorrect-hit' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400 dark:text-slate-600'}`}>
                          {showPoints ? '+ 1 b' : status === 'incorrect-hit' ? '− 1 b' : (eq.isPerfect && status === 'correct-hit' ? '' : '0 b')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
