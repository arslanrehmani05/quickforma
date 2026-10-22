import React, { useState } from 'react';
import { ToolMetadata, VerticalId } from '../types';
import { getCategoriesForVertical, getSubcategoriesForCategory } from '../data/categories';
import { CategoryPills } from '../components/layout/CategoryPills';
import { SubcategoryPills } from '../components/layout/SubcategoryPills';
import { TrustBadges } from '../components/layout/TrustBadges';
import { ToolCard } from '../components/layout/ToolCard';
import { ShareSection } from '../components/social/ShareSection';
import { Zap, Search, Shield, Lock, Cpu, Sparkles, X, Briefcase, GraduationCap, Code, ShoppingBag, Target, Factory, Atom } from 'lucide-react';

interface HomePageProps {
  tools: ToolMetadata[];
  onSelectTool: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ tools, onSelectTool }) => {
  const [selectedVertical, setSelectedVertical] = useState<'all' | VerticalId>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamically compute exact hub counts from catalog
  const businessCount = tools.filter((t) => t.verticals.includes('business')).length;
  const ecommerceCount = tools.filter((t) => t.verticals.includes('ecommerce')).length;
  const marketingCount = tools.filter((t) => t.verticals.includes('marketing')).length;
  const operationsCount = tools.filter((t) => t.verticals.includes('operations')).length;
  const studentsCount = tools.filter((t) => t.verticals.includes('students')).length;
  const scienceCount = tools.filter((t) => t.verticals.includes('science')).length;
  const developersCount = tools.filter((t) => t.verticals.includes('developers')).length;

  const handleSelectVertical = (vertical: 'all' | VerticalId) => {
    setSelectedVertical(vertical);
    setSelectedCategory('all'); // Reset category selection when vertical changes
    setSelectedSubcategory('all');
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory('all'); // Reset subcategory when category changes
  };

  // Get single source of truth category list for active vertical with dynamic counts
  const activeCategories = getCategoriesForVertical(selectedVertical, tools);
  const activeSubcategories = getSubcategoriesForCategory(selectedCategory, tools, selectedVertical);

  // Filter tools by active vertical tab, category pill, subcategory pill, and search query
  const filteredTools = tools.filter((tool) => {
    const matchesVertical =
      selectedVertical === 'all' || tool.verticals.includes(selectedVertical);

    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;

    const matchesSubcategory =
      selectedSubcategory === 'all' || tool.subcategory === selectedSubcategory;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q));

    return matchesVertical && matchesCategory && matchesSubcategory && matchesSearch;
  });

  const getSearchPlaceholder = () => {
    if (selectedVertical === 'business') return 'Search business tools (e.g. invoice, ROI, tax, cash flow)...';
    if (selectedVertical === 'ecommerce') return 'Search ecommerce tools (e.g. Shopify, Amazon, Etsy, Stripe, margin)...';
    if (selectedVertical === 'marketing') return 'Search marketing tools (e.g. ROAS, CAC, LTV, CTR, CPM)...';
    if (selectedVertical === 'operations') return 'Search operations tools (e.g. OEE, cycle time, EOQ, takt time)...';
    if (selectedVertical === 'students') return 'Search academic tools (e.g. GPA, exam prep, semester grade)...';
    if (selectedVertical === 'science') return 'Search STEM tools (e.g. molarity, Ohm\'s law, kinematics, calculus)...';
    if (selectedVertical === 'developers') return 'Search developer tools (e.g. JSON, regex, hash, UUID, subnet)...';
    return `Search all ${tools.length} tools (e.g. invoice, GPA, JSON, fraction, Stripe)...`;
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
          Instant Utilities for Business, Students & Developers
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Zero sign-ups, zero email paywalls, and zero server uploads. Every invoice generator, GPA calculator, code formatter, and financial estimator executes 100% locally in browser RAM.
        </p>

        {/* Trust Badges with Interactive Tooltips */}
        <TrustBadges />

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
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => handleSelectVertical('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedVertical === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> All Tools ({tools.length})
          </button>
          <button
            onClick={() => handleSelectVertical('business')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedVertical === 'business'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Business ({businessCount})
          </button>
          <button
            onClick={() => handleSelectVertical('ecommerce')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedVertical === 'ecommerce'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Ecommerce ({ecommerceCount})
          </button>
          <button
            onClick={() => handleSelectVertical('operations')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedVertical === 'operations'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" /> Operations ({operationsCount})
          </button>
          <button
            onClick={() => handleSelectVertical('marketing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedVertical === 'marketing'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Target className="w-3.5 h-3.5" /> Marketing ({marketingCount})
          </button>
          <button
            onClick={() => handleSelectVertical('students')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedVertical === 'students'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" /> Students ({studentsCount})
          </button>
          <button
            onClick={() => handleSelectVertical('science')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedVertical === 'science'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Atom className="w-3.5 h-3.5" /> Science & STEM ({scienceCount})
          </button>
          <button
            onClick={() => handleSelectVertical('developers')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedVertical === 'developers'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Code className="w-3.5 h-3.5" /> Developers ({developersCount})
          </button>
        </div>

        {/* Shared Category Filter Pills */}
        <CategoryPills
          categories={activeCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Task-Level Subcategory Filter Pills */}
        {selectedCategory !== 'all' && activeSubcategories.length > 1 && (
          <SubcategoryPills
            subcategories={activeSubcategories}
            selectedSubcategory={selectedSubcategory}
            onSelectSubcategory={setSelectedSubcategory}
          />
        )}

        {/* Active Filter Summary if filtered */}
        {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-medium">
            <span>
              Showing <strong className="text-slate-800">{filteredTools.length}</strong> matching tools
            </span>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubcategory('all');
                setSearchQuery('');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

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
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              No tools matched your current filter criteria. Try selecting another subcategory or clear filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubcategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
