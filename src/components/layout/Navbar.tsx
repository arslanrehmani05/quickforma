import React from 'react';
import { Zap, Search, Lock } from 'lucide-react';

interface NavbarProps {
  activeToolId: string;
  onSelectTool: (id: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeToolId,
  onSelectTool,
  onOpenSearch
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onSelectTool('home')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold shadow-sm">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="text-base font-extrabold text-black tracking-tight">
              QuickForma
            </span>
          </div>
        </button>

        {/* Navigation & Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-3 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 px-3.5 py-1.5 rounded-lg text-xs text-zinc-600 hover:text-black transition-all"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Search tools...</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 bg-white border border-zinc-200 text-[10px] font-mono text-zinc-500 rounded">
              ⌘K
            </kbd>
          </button>

          <div className="hidden md:flex items-center gap-1 border-l border-zinc-200 pl-3 text-xs">
            <button
              onClick={() => onSelectTool('invoice-generator')}
              className={`px-3 py-1.5 rounded-md transition-colors font-bold ${
                activeToolId === 'invoice-generator'
                  ? 'bg-black text-white'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              Invoice
            </button>
            <button
              onClick={() => onSelectTool('qr-code-generator')}
              className={`px-3 py-1.5 rounded-md transition-colors font-bold ${
                activeToolId === 'qr-code-generator'
                  ? 'bg-black text-white'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              QR Code
            </button>
            <button
              onClick={() => onSelectTool('word-counter')}
              className={`px-3 py-1.5 rounded-md transition-colors font-bold ${
                activeToolId === 'word-counter'
                  ? 'bg-black text-white'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              Word Counter
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-md border border-zinc-200">
            <Lock className="w-3 h-3 text-black" />
            <span className="hidden sm:inline">100% Private</span>
          </div>
        </div>
      </div>
    </header>
  );
};
