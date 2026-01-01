import React, { memo } from 'react';

const Button = memo(({ children, onClick, variant = 'primary', className = '', disabled = false, icon: Icon }) => {
  const baseStyle =
    'flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]';

  const variants = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50',
    secondary:
      'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500',
    gradient:
      'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1',
    danger:
      'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400',
    ghost:
      'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
    hero:
      'bg-transparent border border-indigo-400/50 text-white hover:bg-indigo-500/20 hover:border-indigo-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
});

export default Button;
