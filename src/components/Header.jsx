import React, { useState, memo } from "react";
import {
  Brain,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  User,
  Clock,
  Volume2,
  VolumeX,
} from "lucide-react";
import { auth } from "../firebase";

const Header = memo(({ setView, view, isDark, toggleTheme, user, soundEnabled, toggleSound }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const navItems = ["home", "generator", "about", "contact"];

  const handleLogout = async () => {
    await auth.signOut();
    setOpenDropdown(false);
    setView("signin");
  };

  const goToHistory = () => {
    setView("history"); // history is inside profile page
    setOpenDropdown(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <div
          onClick={() => setView("home")}
          className="flex cursor-pointer items-center gap-2 group"
        >
          <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 p-2 transition-transform duration-300 group-hover:rotate-12 group-hover:shadow-lg shadow-indigo-500/50 ring-1 ring-white/20">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-[Outfit]">
            Quiz<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">ifyAI</span>
          </span>
        </div>

        {/* NAV — DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`text-sm font-medium transition-all hover:text-indigo-600 dark:hover:text-indigo-400 capitalize ${view === item
                ? "text-indigo-600 dark:text-indigo-400 font-bold"
                : "text-slate-600 dark:text-slate-300"
                }`}
            >
              {item === "home" ? "Library" : item}
            </button>
          ))}

          {/* ⭐ HISTORY (only logged-in) */}
          {user && (
            <button
              onClick={goToHistory}
              className={`flex items-center gap-1 text-sm font-medium transition hover:text-indigo-600 dark:hover:text-indigo-400 ${view === "profile"
                ? "text-indigo-600 dark:text-indigo-400 font-bold"
                : "text-slate-600 dark:text-slate-300"
                }`}
            >
              <Clock size={16} />
              History
            </button>
          )}

          {/* SOUND TOGGLE */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all hover:scale-110"
            title={soundEnabled ? "Mute" : "Unmute"}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all hover:scale-110"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* SIGN IN / AVATAR */}
          {!user ? (
            <button
              onClick={() => setView("signin")}
              className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.displayName ? user.displayName.substring(0, 2).toUpperCase() : "US"
                  )}&length=2`
                }
                alt="avatar"
                className="w-9 h-9 rounded-full cursor-pointer border border-slate-300 dark:border-slate-700 hover:scale-110 transition"
                onClick={() => setOpenDropdown((v) => !v)}
              />

              {/* DROPDOWN (no History here) */}
              {openDropdown && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl p-2 animate-fadeIn">
                  <button
                    onClick={() => {
                      setView("profile");
                      setOpenDropdown(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <User size={16} /> Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 transition"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* MOBILE — RIGHT SIDE BUTTONS */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleSound}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item}
                className="capitalize text-left py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => {
                  setView(item);
                  setIsMenuOpen(false);
                }}
              >
                {item === "home" ? "Library" : item}
              </button>
            ))}

            {/* History in mobile menu (still only one) */}
            {user && (
              <button
                onClick={goToHistory}
                className="flex items-center gap-2 py-2 text-indigo-600 dark:text-indigo-400 font-semibold"
              >
                <Clock size={16} /> History
              </button>
            )}

            {!user ? (
              <button
                onClick={() => {
                  setView("signin");
                  setIsMenuOpen(false);
                }}
                className="text-indigo-600 dark:text-indigo-400 font-semibold"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="text-rose-500 font-semibold text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
