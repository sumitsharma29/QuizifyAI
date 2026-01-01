import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function Signup({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setView("home");
    } catch (err) {
      setError(err.message);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setView("home");
    } catch (err) {
      if (
        err.code === "auth/cancelled-popup-request" ||
        err.code === "auth/popup-closed-by-user"
      ) {
        console.warn("Google sign-up cancelled by user.");
        return;
      }
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 
                    bg-white/80 dark:bg-slate-900/70 
                    backdrop-blur-xl rounded-3xl shadow-2xl 
                    border border-slate-200/40 dark:border-slate-800/40 
                    animate-fadeIn">

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center mb-6
                     bg-gradient-to-r from-indigo-600 to-violet-600 
                     text-transparent bg-clip-text">
        Create Your Account
      </h2>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-4 text-center 
                      bg-red-100 dark:bg-red-900/30 
                      p-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Google Signup */}
      <button
        onClick={signUpWithGoogle}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl 
                   bg-white dark:bg-slate-800 
                   border border-slate-300 dark:border-slate-700 
                   shadow-sm hover:shadow-md active:scale-[0.98]
                   transition-all mb-5"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
          className="w-5 h-5"
        />
        <span className="font-medium text-slate-700 dark:text-slate-200">
          Sign Up with Google
        </span>
      </button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-slate-300 dark:bg-slate-700"></div>
        <span className="px-3 text-slate-500 text-sm">OR</span>
        <div className="flex-grow h-px bg-slate-300 dark:bg-slate-700"></div>
      </div>

      {/* Form Inputs */}
      <form onSubmit={handleSignup} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80
                     border border-slate-300 dark:border-slate-700 
                     text-slate-900 dark:text-white 
                     outline-none focus:ring-2 focus:ring-indigo-500 
                     transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80
                     border border-slate-300 dark:border-slate-700 
                     text-slate-900 dark:text-white 
                     outline-none focus:ring-2 focus:ring-indigo-500 
                     transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80
                     border border-slate-300 dark:border-slate-700 
                     text-slate-900 dark:text-white 
                     outline-none focus:ring-2 focus:ring-indigo-500
                     transition"
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 
                     text-white font-semibold shadow-lg shadow-indigo-500/20 
                     transition"
        >
          Create Account
        </button>
      </form>

      {/* Switch to Signin */}
      <p className="text-center mt-6 text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{" "}
        <button
          className="text-indigo-600 dark:text-indigo-400 font-semibold"
          onClick={() => setView("signin")}
        >
          Sign In
        </button>
      </p>

    </div>
  );
}
