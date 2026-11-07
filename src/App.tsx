import React, { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { ThemeToggle } from './components/ThemeToggle';
import { StudyView } from './components/StudyView';
import { useQuizState } from './hooks/useQuizState';
import { GameMode, Question } from './types';
import questionsData from './data/questions.json';

// Helper to shuffle array
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function App() {
  const {
    state,
    startQuiz,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    finishQuiz,
    resetQuiz,
  } = useQuizState();

  const [studySubject, setStudySubject] = useState<'biology' | 'chemistry' | null>(null);
  // An unfinished test waits on the main menu (after a reload or the Home button) until resumed.
  const [isPaused, setIsPaused] = useState(() => Boolean(state.mode && !state.isFinished));

  const hasUnfinished = Boolean(state.mode && !state.isFinished);
  const answeredCount = Object.values<string[]>(state.userAnswers).filter(a => a.length > 0).length;

  const handleStart = (mode: GameMode, customCount?: number) => {
    if (hasUnfinished && answeredCount > 0 && !window.confirm('Rozpracovaný test sa zahodí a nahradí novým. Pokračovať?')) {
      return;
    }
    const allQuestions = questionsData as Question[];
    console.log(`Loaded ${allQuestions.length} questions.`);
    
    let selectedQuestions: Question[] = [];

    if (mode === 'biology') {
      const bioQuestions = allQuestions.filter(q => q.subject === 'biology');
      console.log(`Found ${bioQuestions.length} biology questions.`);
      const count = customCount || 10;
      selectedQuestions = shuffle(bioQuestions).slice(0, count);
    } else if (mode === 'chemistry') {
      const chemQuestions = allQuestions.filter(q => q.subject === 'chemistry');
      console.log(`Found ${chemQuestions.length} chemistry questions.`);
      const count = customCount || 10;
      selectedQuestions = shuffle(chemQuestions).slice(0, count);
    } else if (mode === 'combined') {
      const bioQuestions = allQuestions.filter(q => q.subject === 'biology');
      const chemQuestions = allQuestions.filter(q => q.subject === 'chemistry');
      
      const selectedBio = shuffle(bioQuestions).slice(0, 45);
      const selectedChem = shuffle(chemQuestions).slice(0, 45);
      
      selectedQuestions = shuffle([...selectedBio, ...selectedChem]);
    }

    console.log('Selected questions:', selectedQuestions.map(q => q.number));
    startQuiz(mode, selectedQuestions);
    setIsPaused(false);
  };

  const handleDiscard = () => {
    if (answeredCount > 0 && !window.confirm('Naozaj zahodiť rozpracovaný test? Vaše odpovede sa stratia.')) {
      return;
    }
    resetQuiz();
    setIsPaused(false);
  };

  const handleStartStudy = (subject: 'biology' | 'chemistry') => {
    setStudySubject(subject);
  };

  const handleExitStudy = () => {
    setStudySubject(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <ThemeToggle />
      
      {(!state.mode || (hasUnfinished && isPaused)) && !studySubject && (
        <MainMenu
          onStart={handleStart}
          onStudy={handleStartStudy}
          unfinished={hasUnfinished ? { mode: state.mode, answered: answeredCount, total: state.questions.length } : undefined}
          onResume={() => setIsPaused(false)}
          onDiscard={handleDiscard}
        />
      )}
      
      {studySubject && (
        <StudyView subject={studySubject} onExit={handleExitStudy} />
      )}

      {state.mode && state.isFinished && (
        <Results state={state} onReset={resetQuiz} />
      )}
      
      {state.mode && !state.isFinished && !isPaused && state.questions.length > 0 && (
        <Quiz
          state={state}
          onAnswer={answerQuestion}
          onNext={nextQuestion}
          onPrev={prevQuestion}
          onFinish={finishQuiz}
          onPause={() => setIsPaused(true)}
        />
      )}
    </div>
  );
}
