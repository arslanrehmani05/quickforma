import React from 'react';
import { Info, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const InfoBox: React.FC<CalloutProps> = ({ title, children, className = '' }) => (
  <div className={`p-4 sm:p-5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-indigo-950 flex items-start gap-3 text-xs sm:text-sm ${className}`}>
    <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
    <div className="space-y-1">
      {title && <h4 className="font-bold text-indigo-900">{title}</h4>}
      <div className="leading-relaxed text-indigo-900/90">{children}</div>
    </div>
  </div>
);

export const WarningBox: React.FC<CalloutProps> = ({ title, children, className = '' }) => (
  <div className={`p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-3 text-xs sm:text-sm ${className}`}>
    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
    <div className="space-y-1">
      {title && <h4 className="font-bold text-amber-900">{title}</h4>}
      <div className="leading-relaxed text-amber-900/90">{children}</div>
    </div>
  </div>
);

export const TipBox: React.FC<CalloutProps> = ({ title, children, className = '' }) => (
  <div className={`p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 flex items-start gap-3 text-xs sm:text-sm ${className}`}>
    <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
    <div className="space-y-1">
      {title && <h4 className="font-bold text-emerald-900">{title}</h4>}
      <div className="leading-relaxed text-emerald-900/90">{children}</div>
    </div>
  </div>
);

export const ExampleBox: React.FC<CalloutProps> = ({ title, children, className = '' }) => (
  <div className={`p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 flex items-start gap-3 text-xs sm:text-sm ${className}`}>
    <CheckCircle2 className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
    <div className="space-y-1">
      {title && <h4 className="font-bold text-slate-900">{title}</h4>}
      <div className="leading-relaxed text-slate-600">{children}</div>
    </div>
  </div>
);
