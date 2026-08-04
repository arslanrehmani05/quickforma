import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label = 'Copy',
  copiedLabel = 'Copied!',
  className = '',
  variant = 'primary',
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback for older browsers or restricted permissions
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold shadow-xs',
    secondary: 'bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold',
    ghost: 'hover:bg-slate-100 text-slate-500 hover:text-slate-900',
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={isCopied ? copiedLabel : label}
      className={`px-3 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none ${variantClasses[variant]} ${className}`}
    >
      {isCopied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-in zoom-in duration-150" />
          <span className="text-emerald-300 font-bold">{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 shrink-0" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
