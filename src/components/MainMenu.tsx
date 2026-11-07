import React from 'react';
import { GameMode } from '../types';
import { BookOpen, FlaskConical, Stethoscope, GraduationCap } from 'lucide-react';
import questionsData from '../data/questions.json';

interface MainMenuProps {
  onStart: (mode: GameMode, customCount?: number) => void;
  onStudy: (subject: 'biology' | 'chemistry') => void;
  unfinished?: { mode: GameMode; answered: number; total: number };
  onResume: () => void;
  onDiscard: () => void;
}

export function MainMenu({ onStart, onStudy, unfinished, onResume, onDiscard }: MainMenuProps) {
  const bioTotalCount = questionsData.filter(q => q.subject === 'biology').length;
  const chemTotalCount = questionsData.filter(q => q.subject === 'chemistry').length;

  const [bioCount, setBioCount] = React.useState<number>(10);
  const [chemCount, setChemCount] = React.useState<number>(10);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 pb-4 pt-20 xl:pt-4">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 md:p-12 text-center transition-colors">
        
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
            <Stethoscope size={36} />
          </div>
          <h1 className="py-2 text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-300 dark:to-blue-300 drop-shadow-sm dark:drop-shadow-md">
            SZU Prijímačky
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-2">
            Databáza: {bioTotalCount} BIO | {chemTotalCount} CHE otázok
          </p>
        </div>

        <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg max-w-xl mx-auto">
          Simulátor prijímacích skúšok na Slovenskú zdravotnícku univerzitu. Vyberte si režim testovania.
        </p>

        {unfinished && (
          <div className="mb-10 p-5 rounded-2xl border-2 border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 flex flex-col sm:flex-row sm:items-center gap-4 text-left">
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-white">Máte rozpracovaný test</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {unfinished.mode === 'biology' ? 'Biológia' : unfinished.mode === 'chemistry' ? 'Chémia' : 'Simulácia prijímačiek'}
                {' · '}zodpovedané {unfinished.answered} z {unfinished.total} otázok
                {unfinished.mode === 'combined' && ' · čas simulácie beží ďalej'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onDiscard}
                className="flex-1 sm:flex-none py-2.5 px-4 cursor-pointer rounded-xl font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Zahodiť
              </button>
              <button
                onClick={onResume}
                className="flex-1 sm:flex-none py-2.5 px-5 cursor-pointer rounded-xl font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-sm"
              >
                Pokračovať
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Biology Card */}
          <div className="flex flex-col items-center p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-teal-500/30 dark:hover:border-teal-500/20 bg-white dark:bg-slate-800 shadow-sm transition-all text-center">
            <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl flex items-center justify-center mb-4">
              <BookOpen size={24} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-lg">Iba Biológia</h3>
            <p className="text-xs text-slate-400 font-mono mb-4">Dostupných: {bioTotalCount} otázok</p>

            {/* Questions controller */}
            <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Počet otázok:</span>
                <span className="text-lg font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2.5 py-0.5 rounded-lg border border-teal-100 dark:border-teal-900/30">
                  {bioCount}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setBioCount(prev => Math.max(1, prev - 1))}
                  className="flex-none w-8 h-8 rounded-lg cursor-pointer bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/30 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center active:scale-95 transition-all hover:bg-teal-100 dark:hover:bg-teal-900"
                >
                  -
                </button>
                <input
                  type="range"
                  min="1"
                  max="45"
                  value={bioCount}
                  onChange={(e) => setBioCount(parseInt(e.target.value) || 10)}
                  className="flex-1 min-w-0 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setBioCount(prev => Math.min(45, prev + 1))}
                  className="flex-none w-8 h-8 rounded-lg cursor-pointer bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/30 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center active:scale-95 transition-all hover:bg-teal-100 dark:hover:bg-teal-900"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => onStart('biology', bioCount)}
              className="w-full py-3 px-4 cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/10 hover:shadow-teal-600/20 active:scale-[0.98] transition-all"
            >
              Spustiť test
            </button>
          </div>

          {/* Chemistry Card */}
          <div className="flex flex-col items-center p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500/30 dark:hover:border-blue-500/20 bg-white dark:bg-slate-800 shadow-sm transition-all text-center">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
              <FlaskConical size={24} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-lg">Iba Chémia</h3>
            <p className="text-xs text-slate-400 font-mono mb-4">Dostupných: {chemTotalCount} otázok</p>

            {/* Questions controller */}
            <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Počet otázok:</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-lg border border-blue-100 dark:border-blue-900/30">
                  {chemCount}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setChemCount(prev => Math.max(1, prev - 1))}
                  className="flex-none w-8 h-8 rounded-lg cursor-pointer bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center active:scale-95 transition-all hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                  -
                </button>
                <input
                  type="range"
                  min="1"
                  max="45"
                  value={chemCount}
                  onChange={(e) => setChemCount(parseInt(e.target.value) || 10)}
                  className="flex-1 min-w-0 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setChemCount(prev => Math.min(45, prev + 1))}
                  className="flex-none w-8 h-8 rounded-lg cursor-pointer bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center active:scale-95 transition-all hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => onStart('chemistry', chemCount)}
              className="w-full py-3 px-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 active:scale-[0.98] transition-all"
            >
              Spustiť test
            </button>
          </div>

          {/* Simulation Card */}
          <div className="flex flex-col items-center p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 bg-white dark:bg-slate-800 shadow-sm transition-all text-center">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4">
              <Stethoscope size={24} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-lg">Simulácia</h3>
            <p className="text-xs text-slate-400 font-mono mb-4">Kompletné podmienky</p>

            {/* Fixed questions container */}
            <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 mb-4 opacity-75">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Počet otázok:</span>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                  90
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center py-2.5 leading-snug">
                45 Biológia + 45 Chémia<br />(Pevný počet podľa osnov)
              </div>
            </div>

            <div className="w-full">
              <button
                onClick={() => onStart('combined')}
                className="w-full py-3 px-4 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all"
              >
                Spustiť simuláciu
              </button>
              <p className="text-xs text-indigo-500 dark:text-indigo-400 text-center w-full mt-2 font-medium">Limit: 70 minút</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Učenie z databázy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => onStudy('biology')}
              className="flex items-center justify-center p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-teal-500/30 dark:hover:border-teal-500/20 bg-white dark:bg-slate-800 shadow-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <GraduationCap size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Biológia - Všetky otázky</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Prechádzajte otázky so správnymi odpoveďami</p>
              </div>
            </button>

            <button
              onClick={() => onStudy('chemistry')}
              className="flex items-center justify-center p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500/30 dark:hover:border-blue-500/20 bg-white dark:bg-slate-800 shadow-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <GraduationCap size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Chémia - Všetky otázky</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Prechádzajte otázky so správnymi odpoveďami</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
