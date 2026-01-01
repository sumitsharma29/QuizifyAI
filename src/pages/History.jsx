import React, { useState } from "react";
import { ArrowLeft, History as HistoryIcon, Eye, CheckCircle, XCircle } from "lucide-react";

export default function HistoryPage({ history = [], setView }) {
  const [selectedAttempt, setSelectedAttempt] = useState(null);

  if (selectedAttempt) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 animate-fadeIn">
        <button
          onClick={() => setSelectedAttempt(null)}
          className="mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
        >
          <ArrowLeft size={18} /> Back to History
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {selectedAttempt.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Played on {new Date(selectedAttempt.timestamp).toLocaleString()}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                Score: {selectedAttempt.score} / {selectedAttempt.total}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                {selectedAttempt.percentage}%
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {selectedAttempt.questions && selectedAttempt.questions.length > 0 ? (
              selectedAttempt.questions.map((q, index) => {
                const userAnswer = selectedAttempt.answers?.[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                const isSkipped = !userAnswer;

                return (
                  <div key={q.id} className="border-b last:border-0 border-slate-100 dark:border-slate-800 pb-6 last:pb-0">
                    <div className="flex gap-4">
                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-slate-500 text-sm">
                        {index + 1}
                      </span>
                      <div className="flex-grow">
                        <p className="font-semibold text-lg text-slate-900 dark:text-white mb-4">
                          {q.text}
                        </p>

                        <div className="space-y-2">
                          {q.options.map((opt) => {
                            let stateClass = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900";
                            let icon = null;

                            if (opt === q.correctAnswer) {
                              stateClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300";
                              icon = <CheckCircle size={16} />;
                            } else if (opt === userAnswer && !isCorrect) {
                              stateClass = "border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300";
                              icon = <XCircle size={16} />;
                            }

                            return (
                              <div
                                key={opt}
                                className={`p-3 rounded-xl border flex items-center justify-between text-sm ${stateClass}`}
                              >
                                <span>{opt}</span>
                                {icon}
                              </div>
                            );
                          })}
                        </div>
                        {isSkipped && <p className="text-xs text-orange-500 mt-2">You skipped this question.</p>}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-slate-500">Detailed question data not available for this attempt.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 animate-fadeIn
                 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl
                 border border-slate-200 dark:border-slate-800 
                 shadow-2xl rounded-2xl mt-6 sm:mt-10"
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setView("home")}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition"
        >
          <ArrowLeft size={22} />
        </button>

        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Quiz History
        </h2>
      </div>

      {/* Empty State */}
      {history.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 opacity-70">
          <HistoryIcon size={70} className="text-indigo-400 mb-4" />
          <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
            No quiz attempts yet.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Start a quiz to see your progress here!
          </p>
        </div>
      )}

      {/* History List */}
      {history.length > 0 && (
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAttempt(item)}
              className="group relative rounded-xl border border-slate-300 dark:border-slate-700 
                         p-5 bg-slate-50 dark:bg-slate-800/50 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex justify-between items-center relative z-10">
                {/* LEFT SIDE */}
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="text-right flex items-center gap-4">
                  <div className="hidden sm:block">
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {item.percentage}%
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.score}/{item.total} correct
                    </p>
                  </div>
                  <Eye size={20} className="text-slate-400 group-hover:text-indigo-500 transition" />
                </div>
              </div>

              {/* Color Progress Bar */}
              <div className="mt-4 w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
