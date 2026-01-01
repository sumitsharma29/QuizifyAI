import React from 'react';
import { Shield } from 'lucide-react';
import Button from '../components/Button';

export default function Privacy({ setView }) {
  return (
    <div className="animate-fadeIn max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h2>
        </div>
        <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>Effective Date: {new Date().toLocaleDateString()}</p>
          <p>
            At QuizifyAI, we prioritize the privacy of our visitors. This Privacy Policy document
            contains types of information that is collected and recorded by QuizifyAI and how we use it.
          </p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">Information We Collect</h3>
          <p>
            We only collect information that you voluntarily provide to us, such as when you fill out the
            contact form. This may include your name and email address.
          </p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">How We Use Your Information</h3>
          <p>
            We use the information we collect to communicate with you, provide customer support, and improve
            our services.
          </p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">Data Security</h3>
          <p>We implement appropriate security measures to protect your personal information.</p>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-700">
          <Button variant="secondary" onClick={() => setView('home')}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
