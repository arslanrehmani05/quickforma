import React from 'react';
import { ToolMetadata } from '../../types';
import { FileText, QrCode, AlignLeft, KeyRound, Calculator, Cake, ArrowLeftRight, ArrowUpRight, Zap } from 'lucide-react';

interface ToolCardProps {
  tool: ToolMetadata;
  onSelect: (id: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  FileText,
  QrCode,
  AlignLeft,
  KeyRound,
  Calculator,
  Cake,
  ArrowLeftRight,
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  const IconComponent = ICON_MAP[tool.iconName] || Zap;

  return (
    <div
      onClick={() => onSelect(tool.id)}
      className="p-6 rounded-2xl cursor-pointer group flex flex-col justify-between space-y-4 bg-white border border-slate-200/90 hover:border-indigo-600 transition-all shadow-sm hover:shadow-md"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
            <IconComponent className="w-4 h-4" />
          </div>
          {tool.badge && (
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {tool.badge}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
            {tool.name}
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-indigo-600">
        <span>Launch Tool</span>
        <span className="text-[11px] font-mono text-slate-400">100% Client-Side</span>
      </div>
    </div>
  );
};
