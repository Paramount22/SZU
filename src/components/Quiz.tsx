import React, { useEffect, useState } from 'react';
import { QuizState } from '../types';
import { ChevronLeft, ChevronRight, CheckCircle, Home, Clock } from 'lucide-react';

interface QuizProps {
  state: QuizState;
  onAnswer: (questionId: string, selectedOptions: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
  onPause: () => void;
}

export function Quiz({ state, onAnswer, onNext, onPrev, onFinish, onPause }: QuizProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.currentQuestionIndex]);

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const selectedOptions = state.userAnswers[currentQuestion.id] || [];
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!state.endTime) return;

    const calculateTimeLeft = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((state.endTime! - now) / 1000));
      setTimeLeft(remaining);
      
      if (remaining === 0 && !state.isFinished) {
        onFinish();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [state.endTime, state.isFinished, onFinish]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionToggle = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      onAnswer(currentQuestion.id, selectedOptions.filter((id) => id !== optionId));
    } else {
      onAnswer(currentQuestion.id, [...selectedOptions, optionId]);
    }
  };

  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
  const progress = ((state.currentQuestionIndex + 1) / state.questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 pb-8 px-4 xl:pt-8">
      <div className="w-full max-w-3xl">
        {/* Header / Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 mb-6 transition-colors">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onPause}
                className="p-2 text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Návrat na úvod (test zostane uložený)"
              >
                <Home size={20} />
              </button>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {currentQuestion.subject === 'biology' ? 'Biológia' : 'Chémia'}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {timeLeft !== null && (
                <div className={`flex items-center gap-2 font-mono text-lg font-medium px-3 py-1 rounded-lg ${
                  timeLeft < 300 
                    ? 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-900/20' 
                    : 'text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-700'
                }`}>
                  <Clock size={18} />
                  {formatTime(timeLeft)}
                </div>
              )}
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Otázka {state.currentQuestionIndex + 1} z {state.questions.length}
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
            <div
              className="bg-teal-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 md:p-8 mb-6 transition-colors">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-8 leading-relaxed">
            <span className="text-slate-400 dark:text-slate-500 mr-2">{currentQuestion.number}.</span>
            <span dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
          </h2>

          {currentQuestion.image && (
            <div className="mb-8 flex justify-center">
              <img 
                src={currentQuestion.image} 
                alt={`Otázka ${currentQuestion.number}`}
                className="max-w-full h-auto rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
              />
            </div>
          )}

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              return (
                <label
                  key={option.id}
                  className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isSelected}
                      onChange={() => handleOptionToggle(option.id)}
                    />
                    <div
                      className={`w-6 h-6 rounded border flex items-center justify-center ${
                        isSelected
                          ? 'bg-teal-500 border-teal-500 text-white'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                      }`}
                    >
                      {isSelected && <CheckCircle size={16} />}
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="font-medium text-slate-700 dark:text-slate-300 mr-2">{option.id}.</span>
                    <span className="text-slate-800 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: option.text }} />
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={onPrev}
            disabled={state.currentQuestionIndex === 0}
            className="flex items-center px-6 py-3 cursor-pointer rounded-xl font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} className="mr-2" />
            Predchádzajúca
          </button>

          {isLastQuestion ? (
            <button
              onClick={onFinish}
              className="flex items-center px-8 py-3 cursor-pointer rounded-xl font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm"
            >
              Vyhodnotiť test
              <CheckCircle size={20} className="ml-2" />
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex items-center px-6 py-3 cursor-pointer rounded-xl font-medium text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors shadow-sm"
            >
              Ďalšia
              <ChevronRight size={20} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
