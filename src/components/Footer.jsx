import React, { memo } from 'react';
import { Brain, Instagram, Github, Linkedin, ArrowRight, Heart } from 'lucide-react';

const Footer = memo(({ setView }) => (
  <footer className="relative bg-slate-900 dark:bg-slate-950 text-slate-300 mt-auto border-t border-slate-800 overflow-hidden">

    {/* Glow Background Effect */}
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <div className="absolute top-[-40%] left-[-20%] w-[400px] h-[400px] bg-indigo-600 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[-30%] right-[-10%] w-[350px] h-[350px] bg-purple-600 blur-[140px] rounded-full"></div>
    </div>

    <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      {/* ---- TOP GRID ---- */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-20">

        {/* Column 1 - Branding (Spans 2 columns) */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/20 backdrop-blur-md ring-1 ring-white/10">
              <Brain className="h-6 w-6 text-indigo-400" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight font-[Outfit]">QuizifyAI</span>
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            Empowering learners worldwide with AI-generated assessments.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">

            {/* Instagram */}
            <a
              href="https://instagram.com/sumit__sharma__29"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/60 text-slate-400 
                         hover:text-white transition-all shadow-lg hover:shadow-indigo-500/20 
                         backdrop-blur-md cursor-pointer"
            >
              <Instagram className="h-5 w-5" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/sumitsharma29"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/60 text-slate-400 
                         hover:text-white transition-all shadow-lg hover:shadow-indigo-500/20 
                         backdrop-blur-md cursor-pointer"
            >
              <Github className="h-5 w-5" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sumit-sharma-78b93b294/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/60 text-slate-400 
                         hover:text-white transition-all shadow-lg hover:shadow-indigo-500/20 
                         backdrop-blur-md cursor-pointer"
            >
              <Linkedin className="h-5 w-5" />
            </a>

          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { view: 'home', label: 'Library' },
              { view: 'generator', label: 'Generator' },
              { view: 'about', label: 'About' }
            ].map((item) => (
              <li key={item.view}>
                <button
                  onClick={() => { setView(item.view); window.scrollTo(0, 0); }}
                  className="text-sm hover:text-indigo-400 hover:translate-x-1 transition"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Support
          </h3>
          <ul className="space-y-3">
            {[
              { view: 'contact', label: 'Contact Us' },
              { view: 'privacy', label: 'Privacy Policy' },
              { view: 'terms', label: 'Terms of Service' }
            ].map((item) => (
              <li key={item.view}>
                <button
                  onClick={() => { setView(item.view); window.scrollTo(0, 0); }}
                  className="text-sm hover:text-indigo-400 hover:translate-x-1 transition"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>


      </div>

      {/* ---- BOTTOM CENTER TEXT ---- */}
      <div className="mt-12 border-t border-slate-800 pt-8">
        <div className="flex flex-col items-center text-center space-y-3">

          <p className="text-sm text-slate-400 tracking-wide">
            © 2025 <span className="font-semibold text-slate-200">QuizifyAI</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-1 text-sm text-slate-400">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500 animate-pulse" />
            <span>by The <b><i>Invincible</i></b></span>
          </div>

        </div>
      </div>
    </div>
  </footer>
));

export default Footer;
