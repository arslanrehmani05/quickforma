import React, { useState } from 'react';
import { ToolMetadata } from '../types';
import { CATEGORIES } from '../data/toolsCatalog';
import { ToolCard } from '../components/layout/ToolCard';
import { ShareSection } from '../components/social/ShareSection';
import { Zap, Search, Shield, Lock, Cpu, Sparkles } from 'lucide-react';

interface HomePageProps {
  tools: ToolMetadata[];
  onSelectTool: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ tools, onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = tool.name.toLowerCase().includes(q) ||
                          tool.description.toLowerCase().includes(q) ||
                          tool.keywords.some(k => k.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-4xl mx-auto px-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 fill-current text-indigo-600" />
          <span>Standalone Utility Tools • 100% Client-Side Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Instant Online Utilities & Business Tools
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Zero sign-ups, zero email paywalls, and zero server uploads. Every invoice, QR code, calculator, and conversion executes locally in your browser memory.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 pt-2 font-medium">
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-emerald-600" /> 100% Local Privacy
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-indigo-600" /> No Account Needed
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-amber-600" /> Sub-50ms Calculation
          </div>
        </div>

        <ShareSection align="center" className="pt-2 max-w-xl mx-auto border-t-0" />
      </section>

      {/* Category Tabs & Search Bar */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tools (e.g. invoice, QR)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-sans shadow-xs"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <Sparkles className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-slate-800 font-bold text-base mb-1">No Tools Found</h3>
            <p className="text-slate-500 text-xs">Try searching for generic terms like "calculator", "convert", or "invoice".</p>
          </div>
        )}
      </section>

      {/* SEO / Trust Section */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 text-slate-600 text-sm shadow-xs">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Why Professionals & Business Owners Use QuickForma Utilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-900 text-sm">Uncompromising Browser Privacy</h3>
            <p className="leading-relaxed">
              Standard converter sites upload files to cloud servers. QuickForma processes 100% of PDFs, QR images, and calculations locally inside your browser memory.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-900 text-sm">Sub-50ms Zero Latency</h3>
            <p className="leading-relaxed">
              Without roundtrip server calls or database queues, utility tools output instantly as you type.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-900 text-sm">Zero Paywalls & Forced Signups</h3>
            <p className="leading-relaxed">
              No account creation or credit cards required. Clean, professional utility widgets built for immediate productivity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
