import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@sanity/client';
import { INITIAL_E_CATEGORIES } from '../data/initialECategories';
import { TOOLS_CATALOG } from '../data/toolsCatalog';
import { Search, BookOpen, ChevronRight, Layers, Filter, Sparkles } from 'lucide-react';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '60xo4tvv';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2026-01-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export interface EncyclopediaEntryItem {
  _id: string;
  title: string;
  slug: string;
  shortDefinition: string;
  categoryName?: string;
  categorySlug?: string;
  synonyms?: string[];
  relatedTools?: string[];
}

interface EncyclopediaHubPageProps {
  onSelectView: (view: string) => void;
}

const ALPHABET = ['ALL', '#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

export const EncyclopediaHubPage: React.FC<EncyclopediaHubPageProps> = ({ onSelectView }) => {
  const [entries, setEntries] = useState<EncyclopediaEntryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Composable Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');

  const [categories, setCategories] = useState<any[]>(INITIAL_E_CATEGORIES);

  useEffect(() => {
    async function fetchEntriesAndCategories() {
      try {
        const query = `{
          "entries": *[_type == "encyclopedia" && defined(slug.current) && !(_id in path("drafts.**"))]{
            _id,
            title,
            "slug": slug.current,
            shortDefinition,
            "categoryName": category->name,
            "categorySlug": category->slug.current,
            synonyms,
            relatedTools
          } | order(title asc),
          "categories": *[_type == "eCategory" && defined(slug.current) && !(_id in path("drafts.**"))]{
            "_id": _id,
            "id": slug.current,
            "name": name,
            "slug": slug.current,
            description,
            displayOrder
          } | order(displayOrder asc, name asc)
        }`;
        const fetched = await client.fetch(query);
        setEntries(fetched?.entries || []);
        if (fetched?.categories && fetched.categories.length > 0) {
          setCategories(fetched.categories);
        } else {
          setCategories(INITIAL_E_CATEGORIES);
        }
      } catch (err) {
        console.warn('Could not fetch encyclopedia entries/categories:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEntriesAndCategories();
  }, []);

  // Filter logic: Search + Category + Letter working together simultaneously
  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDef = item.shortDefinition?.toLowerCase().includes(q);
        const matchesCategory = item.categoryName?.toLowerCase().includes(q);
        const matchesSynonyms = item.synonyms?.some((s) => s.toLowerCase().includes(q));

        if (!matchesTitle && !matchesDef && !matchesCategory && !matchesSynonyms) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'ALL') {
        if (item.categorySlug !== selectedCategory && item.categoryName !== selectedCategory) {
          return false;
        }
      }

      // 3. Alphabetical Letter Filter
      if (selectedLetter !== 'ALL') {
        const firstChar = item.title.trim().charAt(0).toUpperCase();
        if (selectedLetter === '#') {
          if (/[A-Z]/i.test(firstChar)) return false;
        } else {
          if (firstChar !== selectedLetter) return false;
        }
      }

      return true;
    });
  }, [entries, searchQuery, selectedCategory, selectedLetter]);

  // Group filtered entries alphabetically
  const groupedEntries = useMemo(() => {
    const map: Record<string, EncyclopediaEntryItem[]> = {};
    filteredEntries.forEach((item) => {
      const firstChar = item.title.trim().charAt(0).toUpperCase();
      const key = /[A-Z]/.test(firstChar) ? firstChar : '#';
      if (!map[key]) map[key] = [];
      map[key].push(item);
    });
    return map;
  }, [filteredEntries]);

  const sortedGroupKeys = useMemo(() => {
    return Object.keys(groupedEntries).sort((a, b) => {
      if (a === '#') return -1;
      if (b === '#') return 1;
      return a.localeCompare(b);
    });
  }, [groupedEntries]);

  useEffect(() => {
    document.title = 'Business & Technical Encyclopedia | QuickForma Knowledge Base';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Free comprehensive business, financial, operational, and technical encyclopedia. Explore definitions, formulas, worked examples, and decision frameworks.'
      );
    }
  }, []);

  return (
    <div className="space-y-12 py-4">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          QuickForma Encyclopedia
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Business, Finance & Tech <span className="text-indigo-600">Knowledge Base</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
          Authoritative definitions, mathematical formulas, worked scenarios, and operational decision frameworks.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search concepts (e.g. Gross Margin, Accounts Payable, EOQ)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Composable Directory Filter Engine */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Directory Filters</h2>
          </div>

          {/* Active Filter Indicators */}
          {(selectedCategory !== 'ALL' || selectedLetter !== 'ALL' || searchQuery) && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-400 font-medium">Active Filters:</span>
              {selectedCategory !== 'ALL' && (
                <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100 font-semibold flex items-center gap-1">
                  Category: {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                  <button onClick={() => setSelectedCategory('ALL')} className="hover:text-indigo-900 ml-1">×</button>
                </span>
              )}
              {selectedLetter !== 'ALL' && (
                <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100 font-semibold flex items-center gap-1">
                  Letter: {selectedLetter}
                  <button onClick={() => setSelectedLetter('ALL')} className="hover:text-indigo-900 ml-1">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100 font-semibold flex items-center gap-1">
                  Query: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-indigo-900 ml-1">×</button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedLetter('ALL');
                  setSearchQuery('');
                }}
                className="text-slate-500 hover:text-slate-900 underline ml-2 font-medium"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* 1. Category Filter Dropdown */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">1. Category</label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Alphabetical Filter Bar */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">2. Alphabetical Index</label>
          <div className="flex flex-wrap items-center gap-1.5">
            {ALPHABET.map((char) => (
              <button
                key={char}
                onClick={() => setSelectedLetter(char)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                  selectedLetter === char
                    ? 'bg-indigo-600 text-white shadow-xs scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Directory Results */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            Concept Index
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {filteredEntries.length} {filteredEntries.length === 1 ? 'Concept' : 'Concepts'} Found
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium">Loading Encyclopedia directory...</p>
          </div>
        ) : filteredEntries.length > 0 ? (
          <div className="space-y-8">
            {sortedGroupKeys.map((letter) => (
              <div key={letter} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                    {letter}
                  </span>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedEntries[letter].map((entry) => (
                    <button
                      key={entry._id}
                      onClick={() => onSelectView(`encyclopedia:entry:${entry.slug}`)}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all text-left flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          {entry.categoryName && (
                            <span className="font-bold text-indigo-600 uppercase text-[10px] tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                              {entry.categoryName}
                            </span>
                          )}
                          {entry.relatedTools && entry.relatedTools.length > 0 && (
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-500" /> Tool Linked
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {entry.title}
                        </h3>

                        {entry.shortDefinition && (
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {entry.shortDefinition}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>Read Concept Definition</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">No Encyclopedia entries found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No published entries matched your combined filters ({selectedCategory !== 'ALL' ? `Category: ${selectedCategory}, ` : ''}{selectedLetter !== 'ALL' ? `Letter: ${selectedLetter}` : ''}).
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedLetter('ALL');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline pt-2"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Browse E-Categories Card Grid */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Browse Knowledge Categories</h2>
            <p className="text-xs text-slate-500">Explore QuickForma concept verticals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectView(`encyclopedia:category:${cat.slug}`)}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all text-left flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Category</span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{cat.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
                <span>View Entries</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
