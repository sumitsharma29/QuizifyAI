import React from "react";
import { Instagram, Linkedin } from "lucide-react";
import { TEAM_MEMBERS } from "../data/team";

export default function About() {
  return (
    <div className="animate-fadeIn max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

      {/* ---- HEADER ---- */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
          Meet the Team
        </h2>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          A passionate group of builders, designers, and innovators redefining
          learning through the power of AI.
        </p>

        {/* Decorative Glow */}
        <div className="mx-auto mt-6 w-40 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-60"></div>
      </div>

      {/* ---- TEAM GRID ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {TEAM_MEMBERS.map((member, idx) => (
          <div
            key={idx}
            className="group relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative z-10 flex flex-col items-center p-8">

              {/* Avatar */}
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-indigo-100 dark:ring-slate-700 transition-all duration-300 group-hover:ring-indigo-400 dark:group-hover:ring-indigo-700 group-hover:scale-110">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                {member.role}
              </p>

              {/* Social icons */}
              <div className="flex gap-3 mt-5 opacity-80 group-hover:opacity-100 transition">

                {/* Instagram */}
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 
                           hover:text-indigo-600 dark:hover:text-white hover:scale-110 transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 
                           hover:text-indigo-600 dark:hover:text-white hover:scale-110 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- QUOTE SECTION ---- */}
      <div className="mt-20 text-center">
        <p className="text-lg sm:text-xl italic text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
          “Together, we aim to make education smarter, personalized and accessible — powered by AI.”
        </p>
      </div>
    </div>
  );
}
