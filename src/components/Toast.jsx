import React, { useEffect, memo } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

const Toast = memo(({ message, type = 'error', onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] w-[90%] max-w-md p-4 rounded-xl shadow-2xl flex items-center animate-slideDown ${
      type === 'error' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
    }`}>
      {type === 'error' ? (
        <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" />
      )}
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={onClose}
        className="ml-3 p-1 hover:bg-white/20 rounded-full"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
});

export default Toast;
