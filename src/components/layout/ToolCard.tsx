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
      className="tool-card p-6 rounded-xl cursor-pointer group flex flex-col justify-between space-y-4 bg-white border border-zinc-200 hover:border-black transition-all shadow-sm"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:border-black group-hover:text-white transition-all">
            <IconComponent className="w-4 h-4" />
          </div>
          {tool.badge && (
            <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-md text-[10px] font-bold uppercase tracking-wider">
              {tool.badge}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-base font-bold text-zinc-900 group-hover:text-black transition-colors flex items-center justify-between">
            {tool.name}
            <ArrowUpRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
          </h3>
          <p className="text-xs text-zinc-500 line-clamp-2 mt-1.5 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-500 group-hover:text-black">
        <span>Launch Tool</span>
        <span className="text-[11px] font-mono text-zinc-400">100% Client-Side</span>
      </div>
    </div>
  );
};
