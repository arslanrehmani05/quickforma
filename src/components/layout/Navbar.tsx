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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20 group-hover:bg-indigo-700 transition-all">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              QuickForma
            </span>
          </div>
        </button>

        {/* Desktop Navigation & Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-3 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 px-3.5 py-1.5 rounded-xl text-xs text-slate-600 hover:text-slate-900 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search tools...</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 bg-white border border-slate-200 text-[10px] font-mono text-slate-500 rounded shadow-xs">
              ⌘K
            </kbd>
          </button>

          <div className="hidden lg:flex items-center gap-1 border-l border-slate-200 pl-3 text-xs">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                activeView === 'home' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Tools
            </button>
            <button
              onClick={() => handleNav('privacy')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                activeView === 'privacy' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Privacy
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                activeView === 'about' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              About
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Private</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 text-sm font-semibold shadow-lg">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            All Utility Tools
          </button>
          <button
            onClick={() => handleNav('privacy')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => handleNav('terms')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            Terms of Service
          </button>
          <button
            onClick={() => handleNav('about')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            About Us
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};
