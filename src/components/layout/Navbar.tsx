import React, { useState } from 'react';
import { Zap, Search, Shield, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: string) => {
    onSelectView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0d14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="text-base font-extrabold text-slate-100 tracking-tight">
              QuickForma
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              50 Tools
            </span>
          </div>
        </button>

        {/* Desktop Navigation & Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-slate-100 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search 50 tools...</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 rounded">
              ⌘K
            </kbd>
          </button>

          <div className="hidden lg:flex items-center gap-1 border-l border-slate-800 pl-3 text-xs">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                activeView === 'home' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              All Tools
            </button>
            <button
              onClick={() => handleNav('privacy')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                activeView === 'privacy' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              Privacy
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                activeView === 'about' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              About
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            <Shield className="w-3.5 h-3.5" />
            <span>Client-Side</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-2 text-sm font-semibold">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-900"
          >
            All 50 Tools
          </button>
          <button
            onClick={() => handleNav('privacy')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-900"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => handleNav('terms')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-900"
          >
            Terms of Service
          </button>
          <button
            onClick={() => handleNav('about')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-900"
          >
            About Us
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-900"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};
