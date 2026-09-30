import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export interface ResultCardProps {
  variant?: 'indigo' | 'dark' | 'light';
  title?: string;
  value?: React.ReactNode;
  subtitle?: string;
  badgeText?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  variant = 'indigo',
  title,
  value,
  subtitle,
  badgeText = 'Client-Side Execution',
  className = '',
  children,
}) => {
  if (variant === 'dark') {
    return (
      <div className={`bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6 ${className}`}>
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> {title || 'Calculation Result'}
          </span>
          {badgeText && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-indigo-400" /> {badgeText}
            </span>
          )}
        </div>
        {children}
      </div>
    );
  }

  if (variant === 'light') {
    return (
      <div className={`bg-indigo-50/70 border border-indigo-100 p-6 rounded-2xl space-y-3 ${className}`}>
        {title && <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">{title}</span>}
        {value && <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">{value}</div>}
        {subtitle && <p className="text-xs text-slate-600">{subtitle}</p>}
        {children}
      </div>
    );
  }

  // Default Single-Metric Solid Indigo Result Surface
  return (
    <div className={`p-6 sm:p-8 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md shadow-indigo-600/10 ${className}`}>
      <div>
        {title && <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">{title}</span>}
        {value && (
          <div className="my-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {value}
          </div>
        )}
        {subtitle && <p className="text-xs text-indigo-100 mt-1 leading-relaxed">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};
