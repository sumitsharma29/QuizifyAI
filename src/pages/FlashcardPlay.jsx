import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCw, Check, X, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import { playSound } from '../utils/audio';

export default function FlashcardPlay({ activeQuiz, setView, soundEnabled }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [masteredCount, setMasteredCount] = useState(0);
    const [showResults, setShowResults] = useState(false);

    // Cards state to track mastery
    const [cards, setCards] = useState(activeQuiz?.questions || []);

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex + 1) / cards.length) * 100;

    const handleNext = (mastered) => {
        setIsFlipped(false);

        if (mastered) {
            setMasteredCount(p => p + 1);
            // Optional: Mark card as mastered in a real app to exclude from future rounds
        }

        setTimeout(() => {
            if (currentIndex < cards.length - 1) {
                setCurrentIndex(p => p + 1);
            } else {
                setShowResults(true);
            }
        }, 200); // Wait for flip reset
    };

    if (!activeQuiz) return null;

    if (showResults) {
        return (
            <div className="mx-auto max-w-2xl text-center py-12 animate-fadeIn px-4">
                <div className="mb-6 inline-flex p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    <CheckCircle2 className="h-12 w-12" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Session Complete!</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                    You mastered <span className="font-bold text-indigo-600 dark:text-indigo-400">{masteredCount}</span> out of <span className="font-bold">{cards.length}</span> cards.
                </p>

                <div className="flex gap-4 justify-center">
                    <Button onClick={() => setView('home')} variant="outline">Back to Home</Button>
                    <Button onClick={() => {
                        setCurrentIndex(0);
                        setMasteredCount(0);
                        setShowResults(false);
                        setIsFlipped(false);
                    }}>Study Again</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl py-6 px-4 sm:px-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => setView('home')}
                    className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Exit
                </button>
                <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                    {currentIndex + 1} / {cards.length}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full mb-10 overflow-hidden">
                <div
                    className="h-full bg-indigo-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Card Container */}
            <div className="relative h-[60vh] sm:h-96 w-full max-w-xl mx-auto perspective-1000 group cursor-pointer" onClick={() => {
                setIsFlipped(!isFlipped);
                playSound('flip', soundEnabled);
            }}>
                <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 text-center">
                        <span className="text-xs uppercase tracking-widest text-slate-400 mb-4 font-bold">Term</span>
                        <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100">
                            {currentCard.front}
                        </h3>
                        <p className="mt-8 text-xs text-slate-400 animate-pulse">Tap to flip</p>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-xl border border-indigo-100 dark:border-slate-700 text-center">
                        <span className="text-xs uppercase tracking-widest text-indigo-400 mb-4 font-bold">Definition</span>
                        <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                            {currentCard.back}
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-6 mt-12">
                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="h-14 w-14 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-sm group-hover:scale-110 transition-transform">
                        <X className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-rose-500 transition-colors">Study Again</span>
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(!isFlipped);
                        playSound('flip', soundEnabled);
                    }}
                    className="flex flex-col items-center gap-2 group sm:hidden"
                >
                    <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                        <RotateCw className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400">Flip</span>
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-110 transition-transform">
                        <Check className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-emerald-500 transition-colors">Got it</span>
                </button>
            </div>

            {/* Controls */}
        </div>
    );
}
