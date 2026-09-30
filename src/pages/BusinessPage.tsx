import React, { useState } from 'react';
import { ToolMetadata } from '../types';
import { getVerticalTools } from '../data/toolsCatalog';
import { BUSINESS_CATEGORIES } from '../data/categories';
import { CategoryPills } from '../components/layout/CategoryPills';
import { ToolCard } from '../components/layout/ToolCard';
import { ShareSection } from '../components/social/ShareSection';
import { Briefcase, Search, Shield, Lock, Cpu, Sparkles, X } from 'lucide-react';

interface BusinessPageProps {
  tools: ToolMetadata[];
  onSelectTool: (id: string) => void;
}

export const BusinessPage: React.FC<BusinessPageProps> = ({ onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamically query catalog for business vertical tools
  const businessTools = getVerticalTools('business');

  // Filter tools by category and search query
  const filteredTools = businessTools.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-4xl mx-auto px-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5 fill-current text-indigo-600" />
          <span>Professional Business Hub • {businessTools.length} Client-Side Utilities</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Business Utilities & Financial Calculators
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Financial estimators, legal contract generators, e-commerce fee calculators, and developer tools. Process 100% of calculations locally inside browser RAM with zero server tracking.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 pt-2 font-medium">
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-emerald-600" /> 100% Private Client-Side Engine
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-indigo-600" /> Zero File Server Uploads
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-amber-600" /> Sub-50ms Calculation
          </div>
        </div>

        <ShareSection align="center" className="pt-2 max-w-xl mx-auto border-t-0" />
      </section>

      {/* Category Tabs & Search Bar */}
      <section className="space-y-6 max-w-5xl mx-auto">
        {/* Search Box */}
        <div className="relative w-full max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search business tools (e.g. invoice, ROI, tax, Stripe)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-sans shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Shared Horizontal Scroll Category Pills */}
        <CategoryPills
          categories={BUSINESS_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <Sparkles className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-slate-800 font-bold text-base mb-1">No Business Tools Found</h3>
            <p className="text-slate-500 text-xs">Try searching for terms like "invoice", "payroll", "ROI", or "margin".</p>
          </div>
        )}
      </section>
    </div>
  );
};
