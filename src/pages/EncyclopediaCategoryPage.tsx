import React, { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import { INITIAL_E_CATEGORIES } from '../data/initialECategories';
import { TOOLS_CATALOG } from '../data/toolsCatalog';
import { BookOpen, ArrowLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '60xo4tvv';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2026-01-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

interface EncyclopediaCategoryPageProps {
  slug: string;
  onBack: () => void;
  onSelectView: (view: string) => void;
}

export const EncyclopediaCategoryPage: React.FC<EncyclopediaCategoryPageProps> = ({
  slug,
  onBack,
  onSelectView,
}) => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const localCategory = INITIAL_E_CATEGORIES.find((c) => c.slug === slug);

  useEffect(() => {
    async function fetchCategoryEntries() {
      try {
        const query = `*[_type == "encyclopedia" && defined(slug.current) && (category->slug.current == $slug || category._ref == $slug) && !(_id in path("drafts.**"))]{
          _id,
          title,
          "slug": slug.current,
          shortDefinition,
          "categoryName": category->name,
          synonyms,
          relatedTools
        } | order(title asc)`;
        const fetched = await client.fetch(query, { slug });
        setEntries(fetched || []);
      } catch (err) {
        console.warn('Could not fetch category entries:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryEntries();
  }, [slug]);

  const catName = localCategory?.name || slug.replace(/-/g, ' ');

  useEffect(() => {
    document.title = `${catName} Concepts | QuickForma Encyclopedia`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        localCategory?.seoDescription || localCategory?.description || `Explore ${catName} concepts, formulas, worked examples, and QuickForma tools.`
      );
    }
  }, [catName, localCategory]);

  // Find relevant tools from catalog for this category
  const categoryWords = catName.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  const relevantTools = TOOLS_CATALOG.filter((t) => {
    const text = [t.name, t.category, t.description].join(' ').toLowerCase();
    return categoryWords.some((word) => text.includes(word));
  }).slice(0, 8);

  return (
    <div className="space-y-10 py-4 max-w-6xl mx-auto">
      {/* Back Button Navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Encyclopedia Directory
      </button>

      {/* Category Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Encyclopedia Category
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {catName}
        </h1>
        {localCategory?.description && (
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
            {localCategory.description}
          </p>
        )}
      </div>

      {/* Concept List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            Concepts in {catName}
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {entries.length} {entries.length === 1 ? 'Concept' : 'Concepts'}
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium">Loading entries for {catName}...</p>
          </div>
        ) : entries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {entries.map((entry) => (
              <button
                key={entry._id}
                onClick={() => onSelectView(`encyclopedia:entry:${entry.slug}`)}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all text-left flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-600 uppercase text-[10px] tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                      {catName}
                    </span>
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
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
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
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">No entries published yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Entries for {catName} will appear here as soon as they are published in Sanity Studio.
            </p>
          </div>
        )}
      </div>

      {/* Relevant QuickForma Tools */}
      {relevantTools.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            QuickForma Calculators for {catName}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relevantTools.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectView(t.id)}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all text-left flex flex-col justify-between group"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Calculator</span>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{t.description}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-indigo-600 font-semibold">
                  <span>Calculate Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
