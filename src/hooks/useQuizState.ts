import { useState, useEffect } from 'react';
import { QuizState, GameMode, Question } from '../types';
import questionsData from '../data/questions.json';

const STORAGE_KEY = 'szu_quiz_state';
const questionsById = new Map((questionsData as Question[]).map(q => [q.id, q]));

const initialState: QuizState = {
  mode: null,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  isFinished: false,
};

export function useQuizState() {
  const [state, setState] = useState<QuizState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only question IDs are saved (older versions saved whole questions), so the
        // text always comes from the current questions.json.
        const questions = (parsed.questions as (string | Question)[])
          .map(q => questionsById.get(typeof q === 'string' ? q : q.id))
          .filter((q): q is Question => q !== undefined);
        if (questions.length > 0) {
          return {
            ...parsed,
            questions,
            currentQuestionIndex: Math.min(parsed.currentQuestionIndex, questions.length - 1),
          };
        }
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, questions: state.questions.map(q => q.id) }));
  }, [state]);

  const startQuiz = (mode: GameMode, questions: Question[]) => {
    setState({
      mode,
      questions,
      currentQuestionIndex: 0,
      userAnswers: {},
      isFinished: false,
      endTime: mode === 'combined' ? Date.now() + 70 * 60 * 1000 : undefined,
    });
  };

  const answerQuestion = (questionId: string, selectedOptions: string[]) => {
    setState((prev) => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [questionId]: selectedOptions,
      },
    }));
  };

  const nextQuestion = () => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1),
    }));
  };

  const prevQuestion = () => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
    }));
  };

  const finishQuiz = () => {
    setState((prev) => ({
      ...prev,
      isFinished: true,
    }));
  };

  const resetQuiz = () => {
    setState(initialState);
  };

  return {
    state,
    startQuiz,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    finishQuiz,
    resetQuiz,
  };
}
