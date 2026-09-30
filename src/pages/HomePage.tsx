import React, { useState } from 'react';
import { ToolMetadata, VerticalId } from '../types';
import { getCategoriesForVertical } from '../data/categories';
import { CategoryPills } from '../components/layout/CategoryPills';
import { ToolCard } from '../components/layout/ToolCard';
import { ShareSection } from '../components/social/ShareSection';
import { Zap, Search, Shield, Lock, Cpu, Sparkles, X, Briefcase, GraduationCap } from 'lucide-react';

interface HomePageProps {
  tools: ToolMetadata[];
  onSelectTool: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ tools, onSelectTool }) => {
  const [selectedVertical, setSelectedVertical] = useState<'all' | VerticalId>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectVertical = (vertical: 'all' | VerticalId) => {
    setSelectedVertical(vertical);
    setSelectedCategory('all'); // Reset category selection when vertical changes
  };

  // Get single source of truth category list for active vertical
  const activeCategories = getCategoriesForVertical(selectedVertical);

  // Filter tools by active vertical tab, category pill, and search query
  const filteredTools = tools.filter((tool) => {
    const matchesVertical =
      selectedVertical === 'all' || tool.verticals.includes(selectedVertical);

    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q));

    return matchesVertical && matchesCategory && matchesSearch;
  });

  const getSearchPlaceholder = () => {
    if (selectedVertical === 'business') return 'Search business tools (e.g. invoice, ROI, tax, Stripe)...';
    if (selectedVertical === 'students') return 'Search academic tools (e.g. GPA, fraction, molar mass, z-score)...';
    return 'Search all 113+ tools (e.g. invoice, GPA, fraction, Stripe)...';
  };

  return (
    <div className="space-y-12 py-4">
      {/* Universal Hero Section */}
      <section className="text-center space-y-4 max-w-4xl mx-auto px-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 fill-current text-indigo-600" />
          <span>Universal Tool Platform • {tools.length} Free Utilities</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Instant Utilities for Business & Students
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Zero sign-ups, zero email paywalls, and zero server uploads. Every invoice generator, GPA calculator, chemistry parser, and financial estimator executes 100% locally in browser RAM.
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

      {/* Vertical Filter Switcher, Search Bar & Category Pills */}
      <section className="space-y-6 max-w-5xl mx-auto">
        {/* Search Box */}
        <div className="relative w-full max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={getSearchPlaceholder()}
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

        {/* Primary Vertical Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => handleSelectVertical('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedVertical === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-4 h-4" /> All Tools ({tools.length})
          </button>
          <button
            onClick={() => handleSelectVertical('business')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedVertical === 'business'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Business Hub (60)
          </button>
          <button
            onClick={() => handleSelectVertical('students')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedVertical === 'students'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Students Hub (61)
          </button>
        </div>

        {/* Shared Category Filter Pills */}
        <CategoryPills
          categories={activeCategories}
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
            <h3 className="text-slate-800 font-bold text-base mb-1">No Tools Found</h3>
            <p className="text-slate-500 text-xs">Try clearing your category filter or search for terms like "calculator", "invoice", "GPA", or "convert".</p>
          </div>
        )}
      </section>
    </div>
  );
};
