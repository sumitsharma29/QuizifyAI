import React from 'react';
import { FileCheck } from 'lucide-react';
import Button from '../components/Button';

export default function Terms({ setView }) {
  return (
    <div className="animate-fadeIn max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
            <FileCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Service</h2>
        </div>
        <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            By accessing this website, you agree to be bound by these terms of service, all applicable laws
            and regulations, and agree that you are responsible for compliance with any applicable local
            laws.
          </p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">Use License</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Permission is granted to temporarily use QuizifyAI for personal, non-commercial transitory viewing only.</li>
            <li>This is the grant of a license, not a transfer of title.</li>
            <li>You may not modify or copy the materials for any commercial purpose.</li>
          </ul>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">Disclaimer</h3>
          <p>
            The materials on QuizifyAI's website are provided on an 'as is' basis. QuizifyAI makes no
            warranties, expressed or implied, and hereby disclaims and negates all other warranties.
          </p>
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
