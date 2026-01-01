import React from "react";
import {
  ArrowRight,
  Type,
  Upload,
  Sparkles,
  Search,
  Loader2,
  CheckCircle2,
  FileText,
  Sliders,
  BarChart,
  Zap,
} from "lucide-react";
import Button from "../components/Button";

export default function Generator({
  genMode,
  setGenMode,
  genInput,
  setGenInput,
  fileName,
  setFileName,
  isGenerating,
  questionCount,
  setQuestionCount,
  difficulty,
  setDifficulty,
  pdfReady,
  handleFileUpload,
  handleGenerate,
  setView,
}) {
  const modes = [
    { id: "text", label: "Paste Text", icon: Type, badge: "Notes" },
    { id: "file", label: "Upload File", icon: Upload, badge: "PDF / Docs" },
    { id: "topic", label: "Topic Name", icon: Sparkles, badge: "AI Topic" },
  ];

  const isDisabled = !genInput.trim() || isGenerating;

  return (
    <div className="mx-auto max-w-6xl animate-fadeIn py-8 px-2 sm:px-0">
      {/* Back link */}
      <button
        onClick={() => setView("home")}
        className="group mb-6 inline-flex items-center text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
      >
        <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm group-hover:border-indigo-300 dark:group-hover:border-indigo-500 group-hover:text-indigo-600">
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
        </div>
        Back to Library
      </button>

      {/* Title / subtitle */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Quiz Generator
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Choose how you want to generate your quiz and customize the difficulty & length.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-900/30 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="h-3 w-3" />
          <span>AI Powered</span>
        </div>
      </div>

      {/* Main layout: left = input, right = settings */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 lg:gap-8">
        {/* LEFT SIDE – Input modes */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/40 backdrop-blur-sm p-4 sm:p-6 lg:p-8 transition-colors">
          {/* Mode toggle */}
          <div className="flex flex-wrap gap-2 mb-6">
            {modes.map((mode) => {
              const active = genMode === mode.id;
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setGenMode(mode.id);
                    setGenInput("");
                    setFileName("");
                  }}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all border
                    ${
                      active
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/40 scale-[1.02]"
                        : "bg-slate-50/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{mode.label}</span>
                  <span
                    className={`hidden sm:inline-flex rounded-full px-2 py-0.5 text-[0.65rem] font-bold tracking-wide ${
                      active
                        ? "bg-white/15 text-indigo-100"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {mode.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mode-specific content */}
          <div className="space-y-6">
            {/* TEXT MODE */}
            {genMode === "text" && (
              <div className="animate-slideUp space-y-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                    Paste your study material
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Paste your notes or content. AI will extract key concepts and generate a quiz.
                  </p>
                </div>
                <textarea
                  value={genInput}
                  onChange={(e) => setGenInput(e.target.value)}
                  placeholder="Paste your notes, lecture content, or text here..."
                  className="h-56 sm:h-64 w-full resize-none rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/70 px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 outline-none ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-950 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
            )}

            {/* FILE MODE */}
            {genMode === "file" && (
              <div className="animate-slideUp space-y-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                    Upload a file
                  </h2>
                </div>
                <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 px-4 py-8 sm:px-6 sm:py-10 text-center transition-all hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 group cursor-pointer">
                  <input
                    type="file"
                    accept=".txt,.md,.json,.pdf,application/pdf,text/plain"
                    onChange={handleFileUpload}
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  />

                  {!fileName ? (
                    <div className="pointer-events-none space-y-3 sm:space-y-4">
                      <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 transition-transform group-hover:scale-105">
                        {pdfReady ? (
                          <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-500 dark:text-indigo-400" />
                        ) : (
                          <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-indigo-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                          {pdfReady ? "Drop a file here or click to browse" : "Preparing PDF engine..."}
                        </p>
                        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          Supports: PDF, TXT, MD, JSON · Max 5MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 shadow-sm">
                        <FileText className="h-8 w-8 sm:h-10 sm:w-10" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                          {fileName}
                        </p>
                        {isGenerating ? (
                          <p className="mt-1 flex items-center justify-center text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 animate-pulse">
                            <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                            Processing file...
                          </p>
                        ) : (
                          <p className="mt-1 flex items-center justify-center text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="mr-1.5 h-4 w-4" />
                            Content ready for quiz generation
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFileName("");
                          setGenInput("");
                        }}
                        className="relative z-20 text-xs font-medium text-rose-500 hover:text-rose-400 hover:underline"
                      >
                        Remove file
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TOPIC MODE */}
            {genMode === "topic" && (
              <div className="animate-slideUp space-y-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 p-3 sm:p-4 shadow-md shadow-indigo-500/40">
                    <Sparkles className="h-7 w-7 sm:h-9 sm:w-9 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                      AI Topic Explorer
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Enter any topic and we’ll generate a quiz with the right difficulty.
                    </p>
                  </div>
                </div>
                <div className="relative mx-auto w-full max-w-xl">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={genInput}
                    onChange={(e) => setGenInput(e.target.value)}
                    placeholder="e.g., Cloud Computing, Data Structures, Operating Systems..."
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 py-3 sm:py-4 pl-11 sm:pl-12 pr-4 text-sm sm:text-base font-medium shadow-sm outline-none text-slate-900 dark:text-white placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/25 transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE – Settings & CTA */}
        <div className="space-y-6">
          {/* Settings card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/80 shadow-lg shadow-slate-900/5 dark:shadow-slate-950/40 backdrop-blur-sm p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Sliders className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
              Quiz Settings
            </h3>

            <div className="space-y-6">
              {/* Question count */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    Questions
                  </span>
                  <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/40 px-2.5 py-0.5 text-[0.7rem] font-semibold text-indigo-700 dark:text-indigo-300">
                    {questionCount} selected
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 dark:bg-slate-700 accent-indigo-600"
                />
                <div className="flex justify-between text-[0.68rem] text-slate-400 dark:text-slate-500">
                  <span>1</span>
                  <span>50</span>
                  <span>100</span>
                  <span>150</span>
                  <span>200</span>
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    Difficulty
                  </span>
                </div>
                <div className="flex rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1">
                  {["Easy", "Medium", "Hard"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`flex-1 rounded-xl py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
                        difficulty === level
                          ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/40"
                          : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Summary + CTA card */}
          <div className="rounded-3xl border border-indigo-100 dark:border-indigo-900/70 bg-gradient-to-br from-indigo-50 via-slate-50 to-violet-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 shadow-xl shadow-indigo-500/10 p-4 sm:p-6 flex flex-col justify-between min-h-[180px]">
            <div className="space-y-2 mb-4">
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                Ready to generate
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Mode:{" "}
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {genMode === "text"
                    ? "From text"
                    : genMode === "file"
                    ? "From uploaded file"
                    : "From topic"}
                </span>
                {genMode === "file" && fileName
                  ? ` · Loaded: ${fileName}`
                  : ""}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Difficulty:{" "}
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {difficulty}
                </span>{" "}
                · Questions:{" "}
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {questionCount}
                </span>
              </p>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isDisabled}
              variant="gradient"
              className="w-full py-3.5 sm:py-4 text-sm sm:text-base shadow-lg shadow-indigo-500/30 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  Generating quiz...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Generate Quiz
                </span>
              )}
            </Button>

            {!genInput.trim() && (
              <p className="mt-2 text-[0.7rem] sm:text-xs text-slate-400 dark:text-slate-500">
                Add some text, upload a file, or type a topic to enable quiz generation.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
