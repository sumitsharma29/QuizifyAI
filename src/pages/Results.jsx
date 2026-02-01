import React, { useEffect } from "react";
import { Trophy, ArrowRight, RotateCcw, Share2, Check, Download, Twitter, MessageCircle } from "lucide-react";
import Button from "../components/Button";
import { saveHistoryToFirestore } from "../utils/firestoreHistory";
import { auth } from "../firebase";
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

export default function Results({ activeQuiz, score, setView, startQuiz, answers, soundEnabled }) {
  if (!activeQuiz) return null;

  const total = activeQuiz.questions.length;
  const percentage = Math.round((score / total) * 100);
  const [copied, setCopied] = React.useState(false);

  const subtitle =
    percentage === 100
      ? "Flawless Victory!"
      : percentage >= 80
        ? "Outstanding Performance!"
        : percentage >= 50
          ? "Good Effort!"
          : "Keep Practicing!";

  // ⭐ Save quiz attempt & Celebrate
  useEffect(() => {
    // 1. Confetti & Sound
    if (percentage >= 60) {
      playSound('complete', soundEnabled);
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }

    // 2. Save History
    const user = auth.currentUser;

    if (user) {
      const entry = {
        id: Date.now().toString(),
        title: activeQuiz.title,
        score,
        total,
        percentage,
        createdAt: Date.now(),
        userId: user.uid,
        questions: activeQuiz.questions,
        answers: answers
      };

      saveHistoryToFirestore(user.uid, entry);
    }
  }, []);

  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const shareText = `I just scored ${percentage}% on "${activeQuiz.title}" in QuizifyAI! 🧠✨`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QuizifyAI Score',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
  };

  const shareToSocial = (platform) => {
    const encodedText = encodeURIComponent(shareText);
    let url = '';

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}`;
        break;
    }

    if (url) window.open(url, '_blank');
    setShowShareMenu(false);
  };

  return (
    <div className="mx-auto max-w-2xl animate-fadeIn px-4 py-12 text-center">
      <div className="overflow-hidden rounded-[3rem] glass shadow-2xl">

        {/* 🏆 TOP SECTION */}
        <div className="relative overflow-hidden bg-slate-900 dark:bg-slate-950 p-12 text-white">

          {/* Soft Glow Background */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-20">
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 
                            rounded-full bg-indigo-500 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 
                            rounded-full bg-fuchsia-500 blur-3xl" />
          </div>

          {/* Score Display */}
          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full 
                            bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-xl 
                            shadow-yellow-500/30">
              <Trophy className="h-12 w-12 text-yellow-900" />
            </div>

            <h2 className="mb-2 text-5xl font-black tracking-tight">
              {percentage}%
            </h2>

            <p className="text-lg font-medium text-indigo-200">{subtitle}</p>
          </div>
        </div>

        {/* 📊 SCORE DETAILS */}
        <div className="p-8 sm:p-12">
          <div className="mb-8 grid grid-cols-2 gap-4">
            {/* Correct */}
            <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/30 
                            bg-emerald-50 dark:bg-emerald-900/10 p-4">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {score}
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wide 
                              text-emerald-700/60 dark:text-emerald-500/60">
                Correct
              </div>
            </div>

            {/* Total */}
            <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/30 
                            bg-indigo-50 dark:bg-indigo-900/10 p-4">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {total}
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wide 
                              text-indigo-700/60 dark:text-indigo-500/60">
                Total
              </div>
            </div>
          </div>

          {/* 🔘 ACTION BUTTONS */}
          <div className="flex flex-col gap-6">

            {/* Social Share Menu (Fallback) */}
            {showShareMenu && (
              <div className="flex justify-center gap-4 animate-slideDown p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mx-auto max-w-sm">
                <button
                  onClick={() => shareToSocial('whatsapp')}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="p-3 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">WhatsApp</span>
                </button>

                <button
                  onClick={() => shareToSocial('twitter')}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="p-3 rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/30 group-hover:scale-110 transition-transform">
                    <Twitter className="w-5 h-5" fill="currentColor" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">X / Twitter</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="p-3 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform">
                    {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}

            <div className="flex flex-col justify-center gap-3 sm:flex-row w-full flex-wrap">
              <Button
                variant="secondary"
                onClick={() => setView("home")}
                icon={ArrowRight}
                className="w-full sm:w-auto order-3 sm:order-1"
              >
                Library
              </Button>

              <Button
                variant="outline"
                onClick={handleNativeShare}
                icon={showShareMenu ? Check : Share2}
                className="w-full sm:w-auto order-2 sm:order-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/40"
              >
                Share Score
              </Button>

              <Button
                variant="primary"
                onClick={() => startQuiz(activeQuiz)}
                icon={RotateCcw}
                className="w-full sm:w-auto order-1 sm:order-3"
              >
                Replay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
