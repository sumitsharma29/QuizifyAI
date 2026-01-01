import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import {
  subscribeToUserQuizzes,
  saveQuizToFirestore,
  deleteQuizFromFirestore,
} from "./utils/firestoreQuizzes";
import { subscribeToUserHistory } from "./utils/firestoreHistory";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

const Home = lazy(() => import("./pages/Home"));
const Generator = lazy(() => import("./pages/Generator"));
const Play = lazy(() => import("./pages/Play"));
const Results = lazy(() => import("./pages/Results"));

import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const HistoryPage = lazy(() => import("./pages/History"));

import { INITIAL_QUIZZES } from "./data/quizzes";
import { shuffleArray } from "./utils/shuffleArray";
import { generateWithGemini } from "./utils/generateWithGemini";
import { generateFallbackQuiz } from "./utils/generateFallbackQuiz";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [view, setView] = useState("home");

  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState(INITIAL_QUIZZES);
  const [history, setHistory] = useState([]);

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);

  const [genMode, setGenMode] = useState("text");
  const [genInput, setGenInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);

  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(5);

  const [isDark, setIsDark] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // --------------------------------------------------
  // AUTH + LOAD QUIZZES + HISTORY
  // --------------------------------------------------
  useEffect(() => {
    let unsubscribeQuizzes = null;
    let unsubscribeHistory = null;

    const unsubAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // Clean up previous listener if any
      if (unsubscribeQuizzes) {
        unsubscribeQuizzes();
        unsubscribeQuizzes = null;
      }
      if (unsubscribeHistory) {
        unsubscribeHistory();
        unsubscribeHistory = null;
      }

      if (currentUser) {
        try {
          // 1. Subscribe to real-time quizzes
          unsubscribeQuizzes = subscribeToUserQuizzes(currentUser.uid, (firestoreQuizzes) => {
            setQuizzes([...INITIAL_QUIZZES, ...firestoreQuizzes]);
          });

          // 2. Subscribe to real-time history
          unsubscribeHistory = subscribeToUserHistory(currentUser.uid, (firestoreHistory) => {
            setHistory(firestoreHistory);
          });

        } catch (err) {
          console.error("Failed to load user data:", err);
        }
      } else {
        setQuizzes(INITIAL_QUIZZES);
        setHistory([]);
      }
    });

    return () => {
      unsubAuth();
      if (unsubscribeQuizzes) unsubscribeQuizzes();
      if (unsubscribeHistory) unsubscribeHistory();
    };
  }, []);

  // --------------------------------------------------
  // DARK MODE
  // --------------------------------------------------
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark((v) => !v);
  const showToast = (msg, type = "error") => setToast({ message: msg, type });

  // --------------------------------------------------
  // LOAD PDF.JS
  // --------------------------------------------------
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        setPdfReady(true);
      }
    };
    script.onerror = () => showToast("Failed to load PDF engine.", "error");

    document.body.appendChild(script);
  }, []);

  // --------------------------------------------------
  // START QUIZ
  // --------------------------------------------------
  const startQuiz = useCallback((quiz) => {
    const shuffledQuestions = shuffleArray(quiz.questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));

    setActiveQuiz({ ...quiz, questions: shuffledQuestions });
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers({});
    setShowExplanation(false);
    setView("play");

    window.scrollTo(0, 0);
  }, []);

  // --------------------------------------------------
  // ANSWER HANDLER
  // --------------------------------------------------
  const handleAnswer = useCallback(
    (option) => {
      if (showExplanation || !activeQuiz) return;

      const current = activeQuiz.questions[currentQuestionIndex];
      const isCorrect = option === current.correctAnswer;

      setAnswers((prev) => ({ ...prev, [current.id]: option }));
      if (isCorrect) setScore((s) => s + 1);

      setShowExplanation(true);
    },
    [activeQuiz, currentQuestionIndex, showExplanation]
  );

  // --------------------------------------------------
  // NEXT QUESTION
  // --------------------------------------------------
  const nextQuestion = () => {
    if (!activeQuiz) return;

    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setShowExplanation(false);
    } else {
      setView("results");
    }
  };

  // --------------------------------------------------
  // DELETE QUIZ
  // --------------------------------------------------
  const deleteQuiz = async (e, id) => {
    e.stopPropagation();
    if (!confirm("Delete this quiz?")) return;

    if (user) {
      try {
        await deleteQuizFromFirestore(user.uid, id);
        // No need to setQuizzes here, the listener will do it
      } catch (err) {
        console.error("Failed to delete quiz from Firestore:", err);
      }
    } else {
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    }
  };

  // --------------------------------------------------
  // FILE UPLOAD
  // --------------------------------------------------
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setIsGenerating(true);

    try {
      let text = "";
      const isPdf =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");

      if (isPdf) {
        if (!pdfReady || !window.pdfjsLib) {
          throw new Error("PDF engine still loading. Try again in a moment.");
        }

        const buffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;

        const maxPages = Math.min(pdf.numPages, 15);

        for (let i = 1; i <= maxPages; i++) {
          const page = await pdf.getPage(i);
          const tc = await page.getTextContent();
          text += tc.items.map((t) => t.str).join(" ") + "\n\n";
        }

        if (!text.trim()) {
          throw new Error("PDF is empty or image-based.");
        }
      } else {
        text = await file.text();
        if (!text.trim()) {
          throw new Error("File is empty.");
        }
      }

      setGenInput(text);
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to read file.", "error");
      setFileName("");
      setGenInput("");
    } finally {
      setIsGenerating(false);
    }
  };

  // --------------------------------------------------
  // GENERATE QUIZ (AI + FALLBACK) + FAST REDIRECT
  // --------------------------------------------------
  const handleGenerate = async () => {
    if (!genInput.trim()) {
      showToast("Please add some text, upload a file, or enter a topic.", "error");
      return;
    }

    setIsGenerating(true);

    const sys = 'Output ONLY valid JSON: {"title":"T","description":"D","icon":"atom","color":"from-blue-500 to-cyan-500","questions":[{"id":1,"text":"Q?","options":["W1","W2","W3","C"],"correctAnswer":"C"}]}';
    const constraints = `Difficulty:${difficulty}.Questions:${questionCount}.`;

    const prompt = genMode === "topic"
      ? `${sys} ${constraints} Create a quiz about: "${genInput}".`
      : `${sys} ${constraints} Create a quiz from this text: "${genInput.slice(0, 4000)}".`;

    try {
      const aiResult = await generateWithGemini(prompt);

      if (aiResult) {
        const newQuiz = { ...aiResult, id: `ai-${Date.now()}` };

        if (user) {
          saveQuizToFirestore(user.uid, newQuiz).catch((err) =>
            console.error("Failed to save quiz to Firestore:", err)
          );
          // Listener handles UI update
        } else {
          setQuizzes((prev) => [...prev, newQuiz]);
        }

        finishGeneration();
        return;
      }

      // Fallback if AI fails
      const fallback = generateFallbackQuiz(
        genInput,
        fileName || "Document",
        questionCount
      );

      if (fallback.questions.length > 0) {
        if (user) {
          saveQuizToFirestore(user.uid, fallback).catch((err) =>
            console.error("Failed to save fallback quiz to Firestore:", err)
          );
          // Listener handles UI update
        } else {
          setQuizzes((prev) => [...prev, fallback]);
        }

        finishGeneration();
        return;
      }

      showToast("Failed to generate quiz.", "error");
    } catch (err) {
      console.error("Generation error:", err);
      showToast("Something went wrong while generating the quiz.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const finishGeneration = () => {
    setGenInput("");
    setFileName("");
    setIsGenerating(false);

    // small delay so the new card appears in Home before navigation feels abrupt
    setTimeout(() => {
      setView("home");
      window.scrollTo(0, 0);
    }, 120);

    showToast("Quiz generated!", "success");
  };

  // --------------------------------------------------
  // CONTACT FORM
  // --------------------------------------------------
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    window.location.href = `mailto:sumitsharma982646@gmail.com?subject=Contact:${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(message + "\n\nEmail: " + email)}`;

    showToast("Opening email app...", "success");
  };

  // --------------------------------------------------
  // PROTECTED ROUTES
  // --------------------------------------------------
  const needsAuth = ["generator", "profile", "history"];

  if (!user && needsAuth.includes(view)) {
    return (
      <div
        className={`flex min-h-screen flex-col ${isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
          }`}
      >
        <Header
          setView={setView}
          view={view}
          isDark={isDark}
          toggleTheme={toggleTheme}
          user={user}
        />

        <main className="flex-grow pt-6">
          <div className="mx-auto max-w-7xl px-4">
            <Suspense
              fallback={
                <div className="flex h-[50vh] w-full items-center justify-center">
                  <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
                </div>
              }
            >
              <Signin setView={setView} />
            </Suspense>
          </div>
        </main>

        <Footer setView={setView} />

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      </div>
    );
  }

  // --------------------------------------------------
  // ROUTER
  // --------------------------------------------------
  const page = {
    home: (
      <Home
        quizzes={quizzes}
        startQuiz={startQuiz}
        deleteQuiz={deleteQuiz}
        setView={setView}
      />
    ),
    generator: (
      <Generator
        genMode={genMode}
        setGenMode={setGenMode}
        genInput={genInput}
        setGenInput={setGenInput}
        fileName={fileName}
        setFileName={setFileName}
        isGenerating={isGenerating}
        pdfReady={pdfReady}
        questionCount={questionCount}
        setQuestionCount={setQuestionCount}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        handleFileUpload={handleFileUpload}
        handleGenerate={handleGenerate}
        setView={setView}
      />
    ),
    play: (
      <Play
        activeQuiz={activeQuiz}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        showExplanation={showExplanation}
        handleAnswer={handleAnswer}
        nextQuestion={nextQuestion}
        setView={setView}
      />
    ),
    results: (
      <Results
        activeQuiz={activeQuiz}
        score={score}
        startQuiz={startQuiz}
        setView={setView}
        answers={answers}
      />
    ),
    about: <About />,
    contact: (
      <Contact
        formData={formData}
        setFormData={setFormData}
        handleContactSubmit={handleContactSubmit}
      />
    ),
    privacy: <Privacy setView={setView} />,
    terms: <Terms setView={setView} />,
    signin: <Signin setView={setView} />,
    signup: <Signup setView={setView} />,

    profile: <Profile user={user} setUser={setUser} history={history} setView={setView} />,
    history: <HistoryPage history={history} setView={setView} />,
  }[view];

  // --------------------------------------------------
  // MAIN LAYOUT
  // --------------------------------------------------
  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-300 ${isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
        }`}
    >
      <Header
        setView={setView}
        view={view}
        isDark={isDark}
        toggleTheme={toggleTheme}
        user={user}
      />

      <main className="flex-grow pt-6">
        <div className="mx-auto max-w-7xl px-4">
          <Suspense
            fallback={
              <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
              </div>
            }
          >
            {page}
          </Suspense>
        </div>
      </main>

      <Footer setView={setView} />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
    </div>
  );
}
