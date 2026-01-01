import React, { useEffect } from "react";
import { Trophy, ArrowRight, RotateCcw } from "lucide-react";
import Button from "../components/Button";
import { saveHistoryToFirestore } from "../utils/firestoreHistory";
import { auth } from "../firebase";

export default function Results({ activeQuiz, score, setView, startQuiz, answers }) {
  if (!activeQuiz) return null;

  const total = activeQuiz.questions.length;
  const percentage = Math.round((score / total) * 100);

  const subtitle =
    percentage === 100
      ? "Flawless Victory!"
      : percentage >= 80
        ? "Outstanding Performance!"
        : percentage >= 50
          ? "Good Effort!"
          : "Keep Practicing!";

  // ⭐ Save quiz attempt to user history
  useEffect(() => {
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

  return (
    <div className="mx-auto max-w-2xl animate-fadeIn px-4 py-12 text-center">
      <div className="overflow-hidden rounded-3xl border border-slate-100 
                      dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xl">

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
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              variant="secondary"
              onClick={() => setView("home")}
              icon={ArrowRight}
              className="order-2 sm:order-1"
            >
              Back to Library
            </Button>

            <Button
              variant="primary"
              onClick={() => startQuiz(activeQuiz)}
              icon={RotateCcw}
              className="order-1 sm:order-2"
            >
              Replay Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
