import React, { useMemo, useEffect } from 'react';
import { Home, CheckCircle, ArrowLeft } from 'lucide-react';
import { Question } from '../types';
import questionsData from '../data/questions.json';

interface StudyViewProps {
  subject: 'biology' | 'chemistry';
  onExit: () => void;
}

export function StudyView({ subject, onExit }: StudyViewProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allQuestions = questionsData as Question[];
  
  const subjectQuestions = useMemo(() => {
    return allQuestions
      .filter(q => q.subject === subject)
      .sort((a, b) => a.number - b.number);
  }, [subject, allQuestions]);

  const subjectName = subject === 'biology' ? 'Biológia' : 'Chémia';

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 xl:pt-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onExit}
            className="flex items-center px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} className="mr-2" />
            Späť
          </button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
            {subjectName} - Učenie ({subjectQuestions.length} otázok)
          </h1>
          <div className="w-[100px]"></div> {/* Spacer for centering */}
        </div>

        <div className="space-y-8">
          {subjectQuestions.map((q) => (
            <div key={q.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 w-10 h-10 rounded-xl flex items-center justify-center font-bold mr-4">
                  {q.number}
                </div>
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mt-1.5" dangerouslySetInnerHTML={{ __html: q.text }}></h3>
              </div>

              {q.image && (
                <div className="mb-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white">
                  <img src={q.image} alt="Otázka" className="max-w-full h-auto mx-auto" />
                </div>
              )}

              <div className="space-y-3">
                {q.options.map((opt) => {
                  const isCorrect = q.correctAnswers.includes(opt.id);

                  return (
                    <div 
                      key={opt.id}
                      className={`flex items-start p-4 rounded-xl border ${
                        isCorrect 
                          ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-100' 
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex-shrink-0 w-6 flex justify-center mr-3 mt-0.5">
                        {isCorrect ? (
                          <CheckCircle size={20} className="text-teal-600 dark:text-teal-400" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                        )}
                      </div>
                      <div>
                        <span className="font-bold mr-2 opacity-75">{opt.id}.</span>
                        <span dangerouslySetInnerHTML={{ __html: opt.text }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Floating Action Button */}
      <button
        onClick={onExit}
        title="Späť na hlavné menu"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 flex items-center justify-center w-14 h-14 bg-slate-900 dark:bg-slate-700 text-white rounded-full shadow-lg hover:bg-slate-800 dark:hover:bg-slate-600 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <Home size={24} />
      </button>
    </div>
  );
}
