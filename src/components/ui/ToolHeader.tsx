import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ToolHeaderProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  badge?: string;
  className?: string;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({
  icon: Icon,
  title,
  description,
  badge,
  className = '',
}) => {
  return (
    <div className={`flex items-start gap-3.5 pb-5 border-b border-slate-100 ${className}`}>
      {Icon && (
        <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">{title}</h2>
          {badge && (
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{description}</p>}
      </div>
    </div>
  );
};
