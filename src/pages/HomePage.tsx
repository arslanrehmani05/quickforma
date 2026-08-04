import React, { useState } from 'react';
import { ToolMetadata } from '../types';
import { ToolCard } from '../components/layout/ToolCard';
import { Cpu, Search, CheckCircle2, Lock, Zap } from 'lucide-react';

interface HomePageProps {
  tools: ToolMetadata[];
  onSelectTool: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ tools, onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto px-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Zero Server API Costs • Pure Client-Side Engine</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
          High-Performance Business Utilities & Calculators
        </h1>

        <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Instant online tools for invoices, QR codes, finance, and developer utilities. Every calculation runs locally in your browser with zero data storage.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-zinc-700 pt-1 font-medium">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" /> Instant PDF & PNG Export
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-sm">
            <Lock className="w-3.5 h-3.5" /> No Registration Required
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-sm">
            <Cpu className="w-3.5 h-3.5" /> Sub-50ms Execution
          </div>
        </div>
      </section>

      {/* Tools Section & Filters */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-4">
          {/* Category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            {[
              { id: 'all', label: 'All Tools' },
              { id: 'business', label: 'Business & Legal' },
              { id: 'finance', label: 'Finance' },
              { id: 'text', label: 'Text & Writing' },
              { id: 'utilities', label: 'Utilities & Dev' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white text-zinc-600 hover:text-black border border-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
          ))}
        </div>
      </section>

      {/* SEO / Trust Section */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 space-y-4 text-zinc-600 text-sm shadow-sm">
        <h2 className="text-lg font-bold text-zinc-900">
          Why Professionals Use QuickForma Client-Side Utilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-500">
          <div className="space-y-1.5">
            <h3 className="font-semibold text-zinc-900 text-sm">Strict Data Privacy</h3>
            <p className="leading-relaxed">
              Most web converters upload your documents or inputs to third-party servers. QuickForma processes 100% of calculations directly inside your web browser.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-semibold text-zinc-900 text-sm">Zero Latency Performance</h3>
            <p className="leading-relaxed">
              Without server roundtrips, PDF renders, QR codes, and unit conversions process in less than 50 milliseconds.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-semibold text-zinc-900 text-sm">Zero Friction Guarantee</h3>
            <p className="leading-relaxed">
              No email paywalls, forced signups, or subscription prompts. Fast, reliable utilities designed for immediate execution.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
