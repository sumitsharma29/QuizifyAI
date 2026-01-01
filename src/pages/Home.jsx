import React from 'react';
import { BookOpen, Clock, ChevronRight, Plus, Sparkles, Brain, Settings, Trash2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Home({ quizzes, startQuiz, deleteQuiz, setView }) {
  return (
    <div className="space-y-12 animate-fadeIn pb-12">
      <div className="relative overflow-hidden rounded-3xl bg-indigo-900 dark:bg-indigo-950 px-6 py-16 text-center text-white shadow-2xl sm:px-12 sm:py-24">
        <div className="absolute top-0 left-0 h-full w-full opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 h-96 w-96 -translate-y-12 translate-x-12 rounded-full bg-purple-500 blur-3xl animate-pulse"></div>
          <div className="absolute left-0 bottom-0 h-96 w-96 translate-y-12 -translate-x-12 rounded-full bg-blue-500 blur-3xl animate-pulse delay-700"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-indigo-800/50 px-4 py-1.5 text-sm font-medium text-indigo-200 border border-indigo-700/50 backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4 text-yellow-400 animate-spin-slow" />
            <span>AI Powered Learning</span>
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl">
            Master Any Topic <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              In Seconds
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-indigo-100 sm:text-xl leading-relaxed">
            Upload notes, enter topics, or paste text. QuizifyAI generates interactive quizzes instantly.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              icon={Plus}
              variant="secondary"
              className="bg-white text-indigo-900 border-transparent hover:bg-indigo-50 shadow-xl hover:scale-105"
              onClick={() => setView('generator')}
            >
              Start Creating
            </Button>
            <Button
              variant="hero"
              onClick={() => document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Library
            </Button>
          </div>
        </div>
      </div>

      <div id="library" className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
          <BookOpen className="mr-3 h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          Recent Quizzes
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              onClick={() => startQuiz(quiz)}
              className="group relative flex h-full cursor-pointer flex-col"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${quiz.color || 'from-indigo-500 to-blue-500'}`} />
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-700 p-3 transition-all duration-300 group-hover:bg-indigo-50 dark:group-hover:bg-slate-600 group-hover:scale-110 group-hover:rotate-6">
                    {quiz.icon === 'atom' && <Brain className="h-6 w-6 text-blue-500 dark:text-blue-400" />}
                    {quiz.icon === 'cpu' && <Settings className="h-6 w-6 text-purple-500 dark:text-purple-400" />}
                    {quiz.icon === 'sparkles' && <Sparkles className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />}
                    {!['atom', 'cpu', 'sparkles'].includes(quiz.icon) && (
                      <BookOpen className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
                    )}
                  </div>
                  {(quiz.id.startsWith('gen') ||
                    quiz.id.startsWith('topic') ||
                    quiz.id.startsWith('ai') ||
                    quiz.id.startsWith('fallback')) && (
                    <button
                      onClick={(e) => deleteQuiz(e, quiz.id)}
                      className="rounded-full p-2 text-slate-300 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-900/30 dark:hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {quiz.title}
                </h3>
                <p className="mb-6 flex-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-3">
                  {quiz.description}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
                  <span className="flex items-center rounded-md bg-slate-50 dark:bg-slate-700 px-2.5 py-1">
                    <Clock className="mr-1.5 h-3.5 w-3.5" />
                    {Math.round(quiz.questions.length * 0.5)} min
                  </span>
                  <span className="flex items-center text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                    Play Now
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </div>
            </Card>
          ))}

          <button
            onClick={() => setView('generator')}
            className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 p-6 text-center transition-all hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 group hover:scale-[1.02]"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-slate-700 shadow-sm ring-1 ring-slate-100 dark:ring-slate-600 transition-transform group-hover:scale-110 group-hover:rotate-90">
              <Plus className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
            </div>
            <span className="text-lg font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
              Create New Quiz
            </span>
            <span className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              From Text, Files, or Topics
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
