import React, { useState } from 'react';
import { ToolMetadata } from '../types';
import { getVerticalTools } from '../data/toolsCatalog';
import { getCategoriesForVertical, getSubcategoriesForCategory } from '../data/categories';
import { CategoryPills } from '../components/layout/CategoryPills';
import { SubcategoryPills } from '../components/layout/SubcategoryPills';
import { TrustBadges } from '../components/layout/TrustBadges';
import { ToolCard } from '../components/layout/ToolCard';
import { ShareSection } from '../components/social/ShareSection';
import { Briefcase, Search, Shield, Lock, Cpu, Sparkles, X } from 'lucide-react';

interface BusinessPageProps {
  tools: ToolMetadata[];
  onSelectTool: (id: string) => void;
}

export const BusinessPage: React.FC<BusinessPageProps> = ({ tools, onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamically query catalog for business vertical tools
  const businessTools = getVerticalTools('business');
  const categories = getCategoriesForVertical('business', tools);
  const activeSubcategories = getSubcategoriesForCategory(selectedCategory, tools, 'business');

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubcategory('all');
  };

  // Filter tools by category, subcategory, and search query
  const filteredTools = businessTools.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || tool.subcategory === selectedSubcategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q));

    return matchesCategory && matchesSubcategory && matchesSearch;
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

        {/* Trust Badges with Interactive Tooltips */}
        <TrustBadges />

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
          categories={categories}
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
            <h3 className="text-slate-800 font-bold text-base mb-1">No Business Tools Found</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              No business tools matched your current filter. Try selecting another subcategory or clear filters.
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
