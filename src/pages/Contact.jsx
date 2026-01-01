import React from "react";
import { Mail, Instagram, Linkedin, Send } from "lucide-react";
import Button from "../components/Button";

export default function Contact({ formData, setFormData, handleContactSubmit }) {
  return (
    <div className="animate-fadeIn max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-14 space-y-3">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text tracking-tight">
          Contact Us
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Have questions, feedback, or collaboration ideas? We’d love to hear from you.
        </p>
        <div className="w-28 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 mx-auto mt-4 rounded-full opacity-60"></div>
      </div>

      <div className="bg-white/80 dark:bg-slate-900/70 shadow-2xl rounded-3xl backdrop-blur-xl overflow-hidden flex flex-col md:flex-row border border-slate-200 dark:border-slate-800">

        {/* LEFT PANEL */}
        <div className="relative md:w-2/5 p-10 bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex flex-col justify-between overflow-hidden">

          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-white/20 blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-52 h-52 rounded-full bg-black/10 blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6">Let’s Connect</h3>
            <p className="text-indigo-100 mb-10 leading-relaxed">
              We aim to respond within 24 hours.  
              Feel free to reach out for anything!
            </p>

            <div className="space-y-4 text-indigo-100/90">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                contact@quizifyai.com
              </div>
            </div>
          </div>

          {/* Social Icons with Links */}
          <div className="relative z-10 mt-12 flex gap-4">

            {/* Instagram */}
            <a
              href="https://instagram.com/sumit__sharma__29"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center 
                         hover:bg-white/30 hover:scale-110 transition"
            >
              <Instagram className="h-5 w-5 text-white" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sumit-sharma-78b93b294/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center 
                         hover:bg-white/30 hover:scale-110 transition"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>

        {/* RIGHT PANEL — FORM */}
        <div className="md:w-3/5 p-10">
          <form onSubmit={handleContactSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 
                           dark:bg-slate-900/60 text-slate-900 dark:text-white outline-none 
                           focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 
                           dark:bg-slate-900/60 text-slate-900 dark:text-white outline-none 
                           focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Message
              </label>
              <textarea
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 
                           dark:bg-slate-900/60 text-slate-900 dark:text-white outline-none 
                           focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition 
                           h-36 resize-none"
              />
            </div>

            {/* Submit */}
            <Button
              icon={Send}
              className="w-full py-4 shadow-xl hover:shadow-2xl transition"
            >
              Send Message
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
}
