import React from 'react';

export interface ModeOption<T extends string = string> {
  id: T;
  label: string;
}

interface ModePillsBarProps<T extends string = string> {
  options: readonly ModeOption<T>[];
  activeMode: T;
  onSelectMode: (mode: T) => void;
  className?: string;
}

export function ModePillsBar<T extends string = string>({
  options,
  activeMode,
  onSelectMode,
  className = '',
}: ModePillsBarProps<T>) {
  return (
    <div className={`bg-slate-100 p-1.5 rounded-2xl flex items-center justify-start gap-1 overflow-x-auto scrollbar-none no-scrollbar ${className}`}>
      {options.map((opt) => {
        const isActive = activeMode === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelectMode(opt.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
              isActive
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
