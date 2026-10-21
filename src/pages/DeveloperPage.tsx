import React, { useState } from 'react';
import { ToolMetadata } from '../types';
import { getVerticalTools } from '../data/toolsCatalog';
import { getCategoriesForVertical } from '../data/categories';
import { CategoryPills } from '../components/layout/CategoryPills';
import { TrustBadges } from '../components/layout/TrustBadges';
import { ToolCard } from '../components/layout/ToolCard';
import { ShareSection } from '../components/social/ShareSection';
import { Code, Search, Shield, Lock, Cpu, Sparkles, X } from 'lucide-react';

interface DeveloperPageProps {
  tools: ToolMetadata[];
  onSelectTool: (id: string) => void;
}

export const DeveloperPage: React.FC<DeveloperPageProps> = ({ tools, onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamically query catalog for developer vertical tools
  const developerTools = getVerticalTools('developers');
  const categories = getCategoriesForVertical('developers', tools);

  // Filter tools by category and search query
  const filteredTools = developerTools.filter((tool) => {
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
          <Code className="w-3.5 h-3.5 text-indigo-600" />
          <span>Developer & Technical Hub • {developerTools.length} Client-Side Utilities</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Developer Utilities & Code Tools
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          JSON validators, cryptographic hashers, base64 encoders, regex visualizers, and CIDR subnet calculators. 100% private execution inside your browser with zero remote logging.
        </p>

        {/* Trust Badges with Interactive Tooltips */}
        <TrustBadges executionLabel="Execution" />

        <ShareSection align="center" className="pt-2 max-w-xl mx-auto border-t-0" />
      </section>

      {/* Category Tabs & Search Bar */}
      <section className="space-y-6 max-w-5xl mx-auto">
        {/* Search Box */}
        <div className="relative w-full max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search developer tools (e.g. JSON, regex, hash, UUID, subnet, JWT)..."
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

        {/* Dynamic Category Pills */}
        <CategoryPills
          categories={categories}
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
            <h3 className="text-slate-800 font-bold text-base mb-1">No Developer Tools Found</h3>
            <p className="text-slate-500 text-xs">Try searching for terms like "JSON", "regex", "hash", or "encode".</p>
          </div>
        )}
      </section>
    </div>
  );
};
