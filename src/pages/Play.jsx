import React from 'react';
import { XCircle, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/Button';

export default function Play({
  activeQuiz,
  currentQuestionIndex,
  answers,
  showExplanation,
  handleAnswer,
  nextQuestion,
  setView,
}) {
  if (!activeQuiz) return null;

  const question = activeQuiz.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / activeQuiz.questions.length) * 100;

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col animate-fadeIn px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => {
            if (confirm('Quit quiz?')) setView('home');
          }}
          className="group flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-bold text-slate-500 dark:text-slate-400 shadow-sm transition-all hover:border-rose-200 hover:text-rose-600"
        >
          <XCircle className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Quit
        </button>
        <div className="flex items-center gap-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Question
          </div>
          <div className="flex h-8 min-w-[3rem] items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-lg font-bold text-slate-800 dark:text-white shadow-sm">
            {currentQuestionIndex + 1}
            <span className="ml-1 text-sm font-normal text-slate-400 dark:text-slate-500">
              /{activeQuiz.questions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xl">
        <div className="absolute left-0 top-0 h-1.5 w-full bg-slate-100 dark:bg-slate-700">
          <div
            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-8 sm:p-12">
          <h2 className="mb-10 text-2xl font-extrabold leading-tight text-slate-800 dark:text-white sm:text-3xl">
            {question.text}
          </h2>
          <div className="grid gap-4">
            {question.options.map((option, idx) => {
              const isSelected = answers[question.id] === option;
              const isCorrect = option === question.correctAnswer;
              const showResult = showExplanation;

              let buttonClass =
                'border-2 border-slate-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-700/50';
              let icon = (
                <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-indigo-400" />
              );

              if (showResult) {
                if (isCorrect) {
                  buttonClass =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400 ring-1 ring-emerald-500';
                  icon = <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />;
                } else if (isSelected) {
                  buttonClass =
                    'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-400';
                  icon = <XCircle className="h-6 w-6 text-rose-500 dark:text-rose-400" />;
                } else {
                  buttonClass = 'border-slate-100 dark:border-slate-700 opacity-40 grayscale';
                }
              } else if (isSelected) {
                buttonClass =
                  'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 ring-1 ring-indigo-600';
                icon = (
                  <div className="h-5 w-5 rounded-full border-[6px] border-indigo-600 dark:border-indigo-400" />
                );
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`group flex w-full items-center justify-between rounded-2xl p-5 text-left text-lg font-bold transition-all duration-200 text-slate-700 dark:text-slate-200 ${buttonClass}`}
                >
                  <span>{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className="animate-slideUp border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-6 sm:px-12">
            <div className="mx-auto flex max-w-3xl items-center justify-between">
              <div className="hidden text-slate-600 dark:text-slate-400 sm:block">
                {answers[question.id] === question.correctAnswer ? (
                  <div className="flex items-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                    <Sparkles className="mr-2 h-4 w-4" /> Correct!
                  </div>
                ) : (
                  <div className="flex items-center rounded-lg bg-rose-100 dark:bg-rose-900/30 px-3 py-1 text-sm font-bold text-rose-700 dark:text-rose-400">
                    <AlertCircle className="mr-2 h-4 w-4" /> Incorrect
                  </div>
                )}
              </div>
              <Button
                onClick={nextQuestion}
                icon={ArrowRight}
                className="w-full shadow-xl shadow-indigo-200 dark:shadow-none sm:w-auto"
              >
                {currentQuestionIndex === activeQuiz.questions.length - 1
                  ? 'See Results'
                  : 'Next Question'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
