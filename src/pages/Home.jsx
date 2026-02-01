import React, { useState } from 'react';
import { BookOpen, Clock, ChevronRight, Plus, Sparkles, Brain, Settings, Trash2, Search, Filter, Zap, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import TiltCard from '../components/TiltCard';

export default function Home({ quizzes, startQuiz, deleteQuiz, setView }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'quiz', 'flashcard'

  const filteredQuizzes = quizzes.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all'
      ? true
      : filter === 'flashcard'
        ? q.type === 'flashcard'
        : q.type !== 'flashcard'; // Assuming default or 'quiz' is quiz
    return matchesSearch && matchesFilter;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <div className="space-y-12 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-slate-900 px-4 py-16 sm:px-12 sm:py-32 text-center text-white shadow-2xl isolate perspective-1000"
      >
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-600 blur-[100px] animate-mesh opacity-60"></div>
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-indigo-600 blur-[100px] animate-mesh " style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 blur-[120px] animate-pulse opacity-40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center rounded-full bg-white/10 px-6 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/20 backdrop-blur-md animate-float"
          >
            <Sparkles className="mr-2 h-4 w-4 text-yellow-300" />
            <span>AI Powered Learning Suite</span>
          </motion.div>

          <h1 className="mb-8 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight drop-shadow-sm">
            Master Any Topic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
              In Seconds
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-300 sm:text-xl font-light leading-relaxed">
            Turn your notes, PDFs, or ideas into interactive <span className="text-white font-medium">Quizzes</span> and <span className="text-white font-medium">Flashcards</span> instantly.
          </p>

          <div className="flex flex-col justify-center gap-5 sm:flex-row">
            <Button
              icon={Plus}
              variant="gradient"
              className="shine shadow-2xl shadow-indigo-500/40 px-8 py-4 rounded-xl text-lg font-bold transition-transform hover:scale-105"
              onClick={() => setView('generator')}
            >
              Start Creating
            </Button>
            <Button
              variant="hero"
              className="bg-white/10 text-white hover:bg-white/20 border border-white/10 px-8 py-4 rounded-xl text-lg font-medium backdrop-blur-md"
              onClick={() => document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Library
            </Button>
          </div>
        </div>
      </motion.div>

      <div id="library" className="space-y-8">

        {/* LIBRARY HEADER & FILTERS */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                <BookOpen className="h-6 w-6" />
              </span>
              Your Library
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 ml-1">
              Manage your generated quizzes and flashcards.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:text-white transition-all shadow-sm"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/50 p-1">
              {[
                { id: 'all', label: 'All', icon: LayoutGrid },
                { id: 'quiz', label: 'Quizzes', icon: Brain },
                { id: 'flashcard', label: 'Flashcards', icon: Zap }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${filter === tab.id
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* QUIZ GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <motion.div key={quiz.id} variants={item}>
                <TiltCard
                  onClick={() => startQuiz(quiz)}
                  className="cursor-pointer"
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${quiz.color || 'from-indigo-500 to-blue-500'}`} />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-3 transition-all duration-300 group-hover:bg-indigo-50 dark:group-hover:bg-slate-600">
                        {quiz.icon === 'atom' && <Brain className="h-6 w-6 text-blue-500 dark:text-blue-400" />}
                        {quiz.icon === 'zap' && <Zap className="h-6 w-6 text-amber-500 dark:text-amber-400" />}
                        {quiz.icon === 'cpu' && <Settings className="h-6 w-6 text-purple-500 dark:text-purple-400" />}
                        {quiz.icon === 'sparkles' && <Sparkles className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />}
                        {!['atom', 'cpu', 'sparkles', 'zap'].includes(quiz.icon) && (
                          <BookOpen className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 relative z-20">
                        {quiz.type === 'flashcard' && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                            Flashcards
                          </span>
                        )}

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
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {quiz.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-3">
                      {quiz.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
                      <span className="flex items-center rounded-md bg-slate-50 dark:bg-slate-700/50 px-2.5 py-1">
                        <Clock className="mr-1.5 h-3.5 w-3.5" />
                        {quiz.questions ? Math.round(quiz.questions.length * 0.5) : 5} min
                      </span>
                      <span className="flex items-center text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                        {quiz.type === 'flashcard' ? 'Study' : 'Play'}
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="col-span-full py-12 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">No matches found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filter.</p>
              <button onClick={() => { setSearchTerm(""); setFilter("all"); }} className="mt-4 text-sm font-medium text-indigo-600 hover:underline">
                Clear Filters
              </button>
            </motion.div>
          )}

          <motion.div variants={item} layout>
            <button
              onClick={() => setView('generator')}
              className="h-full w-full flex min-h-[280px] flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 p-6 text-center transition-all hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 group hover:scale-[1.02] glass"
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
