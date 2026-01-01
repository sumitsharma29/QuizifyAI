import React, { memo } from 'react';

const Card = memo(({ children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${className}`}
  >
    {children}
  </div>
));

export default Card;
