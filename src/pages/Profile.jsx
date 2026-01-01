

import React, { useState } from "react";
import { auth, storage } from "../firebase";
import { updateProfile, updatePassword, deleteUser } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Camera,
  Mail,
  User,
  Lock,
  Trash2,
  History,
  Trophy,
  Target,
  Zap,
} from "lucide-react";
import Button from '../components/Button';

export default function Profile({ user, setUser, setView, history = [] }) {
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const initialsAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || user?.displayName || "User"
  )}&background=4F46E5&color=ffffff&bold=true`;

  const totalQuizzes = history.length;
  const avgScore = totalQuizzes
    ? Math.round(
      history.reduce((acc, curr) => acc + curr.percentage, 0) / totalQuizzes
    )
    : 0;

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);

    try {
      const imgRef = ref(storage, `avatars/${user.uid}-${Date.now()}.jpg`);
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);

      await updateProfile(auth.currentUser, { photoURL: url });

      // Force update user state in App.jsx so Header reflects change immediately
      setUser({ ...auth.currentUser });

      setPhotoURL(url);
      setMessage("Profile photo updated!");
    } catch (err) {
      setMessage("Image upload failed: " + err.message);
    }

    setUploading(false);
  };

  const saveProfile = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL || initialsAvatar,
      });
      // Force update user state
      setUser({ ...auth.currentUser });

      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const changePassword = async () => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      setMessage("Password updated!");
      setNewPassword("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const removeAccount = async () => {
    if (!confirm("Are you sure? This cannot be undone.")) return;

    try {
      await deleteUser(auth.currentUser);
      setView("signin");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-fadeIn py-8 px-4 sm:px-0">

      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-indigo-900 dark:bg-indigo-950 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-purple-500 blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-blue-500 blur-3xl opacity-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center sm:flex-row sm:gap-8">
          <div className="relative group">
            <div className="h-28 w-28 rounded-full p-1 bg-white/20 backdrop-blur-sm">
              <img
                src={photoURL || initialsAvatar}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <label className="absolute bottom-1 right-1 p-2 rounded-full bg-indigo-600 text-white shadow-lg cursor-pointer hover:bg-indigo-500 transition hover:scale-110">
              {uploading ? (
                <span className="block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              ) : (
                <Camera size={16} />
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </label>
          </div>

          <div className="mt-4 text-center sm:mt-0 sm:text-left">
            <h1 className="text-3xl font-bold">{name || "User"}</h1>
            <p className="text-indigo-200">{user?.email}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-smbackdrop-blur-md">
                <Trophy size={14} className="text-yellow-400" />
                <span className="font-semibold">{totalQuizzes} Quizzes Played</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-md">
                <Target size={14} className="text-emerald-400" />
                <span className="font-semibold">{avgScore}% Avg. Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/40 p-4 text-center text-sm font-medium text-indigo-800 dark:text-indigo-200 animate-fadeIn">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* EDIT PROFILE */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="text-indigo-500" size={20} /> Edit Profile
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  disabled
                  type="email"
                  value={user?.email}
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 py-3 pl-10 pr-4 text-sm text-slate-500 outline-none"
                />
              </div>
            </div>

            <Button onClick={saveProfile} className="w-full mt-4">
              Save Changes
            </Button>
          </div>
        </div>

        {/* SECURITY */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="text-indigo-500" size={20} /> Security
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                New Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            <Button onClick={changePassword} variant="secondary" className="w-full">
              Update Password
            </Button>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={removeAccount}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 dark:border-rose-900/30 bg-rose-50 dark:bg-rose-900/10 py-3 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/20 transition"
              >
                <Trash2 size={16} /> Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -----------------------
          📜 HISTORY TEASER
      ------------------------ */}
      {history.length > 0 && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="text-indigo-500" size={20} /> Recent History
            </h2>
            <button
              onClick={() => setView('history')}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {history.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => setView('history')}
                className="group cursor-pointer rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 transition hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.percentage >= 80
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                    }`}>
                    {item.percentage}%
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
