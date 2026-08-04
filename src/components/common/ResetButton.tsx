import React, { useState } from 'react';
import { RotateCcw, AlertCircle } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void;
  label?: string;
  confirmLabel?: string;
  requireConfirm?: boolean;
  className?: string;
}

export const ResetButton: React.FC<ResetButtonProps> = ({
  onReset,
  label = 'Reset',
  confirmLabel = 'Click to Confirm',
  requireConfirm = false,
  className = '',
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!requireConfirm) {
      onReset();
      return;
    }

    if (isConfirming) {
      onReset();
      setIsConfirming(false);
    } else {
      setIsConfirming(true);
      setTimeout(() => setIsConfirming(false), 3000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isConfirming ? confirmLabel : label}
      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none ${
        isConfirming
          ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-in zoom-in-95 duration-150'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 active:scale-95'
      } ${className}`}
    >
      {isConfirming ? (
        <>
          <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>{confirmLabel}</span>
        </>
      ) : (
        <>
          <RotateCcw className="w-3.5 h-3.5 shrink-0" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
