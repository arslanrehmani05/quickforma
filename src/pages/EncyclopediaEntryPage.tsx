import React, { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import { PortableText } from '@portabletext/react';
import { TOOLS_CATALOG } from '../data/toolsCatalog';
import { BookOpen, ArrowLeft, ChevronRight, Calculator, FileText, Sparkles, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '60xo4tvv';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2026-01-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

interface EncyclopediaEntryPageProps {
  slug: string;
  onBack: () => void;
  onSelectView: (view: string) => void;
}

export const EncyclopediaEntryPage: React.FC<EncyclopediaEntryPageProps> = ({
  slug,
  onBack,
  onSelectView,
}) => {
  const [entry, setEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchEntry() {
      setLoading(true);
      setNotFound(false);

      try {
        const query = `*[_type == "encyclopedia" && (slug.current == $slug || $slug in previousSlugs) && !(_id in path("drafts.**"))][0]{
          _id,
          title,
          "slug": slug.current,
          previousSlugs,
          shortDefinition,
          "category": category->{
            name,
            "slug": slug.current
          },
          "categories": categories[]->{
            name,
            "slug": slug.current
          },
          synonyms,
          simpleExplanation,
          howItWorks,
          formulaMethod,
          workedExample,
          interpretation,
          realWorldApplications,
          commonMistakes,
          faqs,
          relatedTools,
          "relatedConcepts": relatedConcepts[]->{
            _id,
            title,
            "slug": slug.current,
            shortDefinition
          },
          "relatedArticles": relatedArticles[]->{
            _id,
            title,
            "slug": slug.current,
            excerpt
          },
          seoTitle,
          metaDescription
        }`;
        const fetched = await client.fetch(query, { slug });

        if (!fetched) {
          setNotFound(true);
        } else {
          // Automatic 301 handle check if hit via legacy slug
          if (fetched.slug !== slug && typeof window !== 'undefined') {
            window.history.replaceState({}, '', `/encyclopedia/${fetched.slug}`);
          }
          setEntry(fetched);
        }
      } catch (err) {
        console.warn('Could not fetch encyclopedia entry:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchEntry();
  }, [slug]);

  // Document Title & Metadata
  useEffect(() => {
    if (entry) {
      document.title = entry.seoTitle || `${entry.title} - Definition, Formula & Example | QuickForma Encyclopedia`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          entry.metaDescription || entry.shortDefinition || `Learn what ${entry.title} means, how it works, formula, worked example, and related tools.`
        );
      }
    }
  }, [entry]);

  if (loading) {
    return (
      <div className="p-16 text-center text-slate-400 space-y-3">
        <div className="inline-block w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium">Loading Encyclopedia entry...</p>
      </div>
    );
  }

  if (notFound || !entry) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 max-w-xl mx-auto my-8">
        <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
        <h2 className="text-lg font-extrabold text-slate-900">Concept Not Found</h2>
        <p className="text-xs text-slate-500">
          The concept "{slug}" is not available in the Encyclopedia library yet.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Directory
        </button>
      </div>
    );
  }

  // Resolve tool objects from CATALOG
  const linkedTools = (entry.relatedTools || [])
    .map((toolId: string) => TOOLS_CATALOG.find((t) => t.id === toolId))
    .filter(Boolean);

  const primaryTool = linkedTools[0];

  return (
    <div className="space-y-10 py-4 max-w-4xl mx-auto">
      {/* Schema.org DefinedTerm JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: entry.title,
            description: entry.shortDefinition,
            inDefinedTermSet: 'https://www.quickforma.com/encyclopedia',
          }),
        }}
      />

      {/* Breadcrumb Header */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={() => onSelectView('home')} className="hover:text-slate-900 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <button onClick={() => onSelectView('encyclopedia:index')} className="hover:text-slate-900 transition-colors">
          Encyclopedia
        </button>
        {entry.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <button
              onClick={() => onSelectView(`encyclopedia:category:${entry.category.slug}`)}
              className="hover:text-slate-900 transition-colors text-indigo-600 font-bold"
            >
              {entry.category.name}
            </button>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-900 font-bold">{entry.title}</span>
      </div>

      {/* Header & Direct Definition Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-2">
          {entry.categories && entry.categories.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {entry.categories.map((cat: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => onSelectView(`encyclopedia:category:${cat.slug}`)}
                  className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider hover:bg-indigo-100 transition-colors"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          ) : entry.category ? (
            <button
              onClick={() => onSelectView(`encyclopedia:category:${entry.category.slug}`)}
              className="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider hover:bg-indigo-100 transition-colors"
            >
              {entry.category.name}
            </button>
          ) : null}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {entry.title}
          </h1>

          {/* Synonyms */}
          {entry.synonyms && entry.synonyms.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 pt-1">
              <span className="font-semibold text-slate-400">Also known as:</span>
              {entry.synonyms.map((syn: string, idx: number) => (
                <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                  {syn}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Crisp Definition Callout */}
        <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 space-y-2">
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Direct Definition
          </div>
          <p className="text-slate-800 font-medium text-base sm:text-lg leading-relaxed">
            {entry.shortDefinition}
          </p>
        </div>

        {/* Primary Calculator CTA Button if Tool Attached */}
        {primaryTool && (
          <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Dedicated Calculator Available
              </span>
              <h3 className="text-sm font-bold text-white">{primaryTool.name}</h3>
              <p className="text-xs text-slate-300 line-clamp-1">{primaryTool.description}</p>
            </div>
            <button
              onClick={() => onSelectView(primaryTool.id)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              <Calculator className="w-4 h-4" /> Calculate with QuickForma
            </button>
          </div>
        )}
      </div>

      {/* Adaptive Body Content Sections */}
      <div className="space-y-8">
        {/* Simple Explanation */}
        {entry.simpleExplanation && entry.simpleExplanation.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              What Is {entry.title}?
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <PortableText value={entry.simpleExplanation} />
            </div>
          </section>
        )}

        {/* How It Works */}
        {entry.howItWorks && entry.howItWorks.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              How It Works
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <PortableText value={entry.howItWorks} />
            </div>
          </section>
        )}

        {/* Formula / Calculation Method */}
        {entry.formulaMethod && entry.formulaMethod.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              Formula & Calculation Method
            </h2>
            <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-sm overflow-x-auto leading-relaxed border border-slate-800">
              <PortableText value={entry.formulaMethod} />
            </div>
          </section>
        )}

        {/* Worked Example */}
        {entry.workedExample && entry.workedExample.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Worked Example
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4 bg-amber-50/40 p-5 rounded-2xl border border-amber-100">
              <PortableText value={entry.workedExample} />
            </div>
          </section>
        )}

        {/* How to Interpret It */}
        {entry.interpretation && entry.interpretation.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">How to Interpret Results</h2>
            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <PortableText value={entry.interpretation} />
            </div>
          </section>
        )}

        {/* Real-World Applications */}
        {entry.realWorldApplications && entry.realWorldApplications.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Real-World Applications</h2>
            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <PortableText value={entry.realWorldApplications} />
            </div>
          </section>
        )}

        {/* Common Mistakes */}
        {entry.commonMistakes && entry.commonMistakes.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 text-rose-700">
              <AlertCircle className="w-5 h-5" />
              Common Mistakes & Misconceptions
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4 bg-rose-50/40 p-5 rounded-2xl border border-rose-100">
              <PortableText value={entry.commonMistakes} />
            </div>
          </section>
        )}

        {/* FAQs */}
        {entry.faqs && entry.faqs.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 divide-y divide-slate-100">
              {entry.faqs.map((faq: any, idx: number) => (
                <div key={idx} className={idx > 0 ? 'pt-4 space-y-1.5' : 'space-y-1.5'}>
                  <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Structured Ecosystem Connections */}
      <div className="space-y-8 pt-4">
        {/* Related Encyclopedia Concepts */}
        {entry.relatedConcepts && entry.relatedConcepts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Related Encyclopedia Concepts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {entry.relatedConcepts.map((rel: any) => (
                <button
                  key={rel._id}
                  onClick={() => onSelectView(`encyclopedia:entry:${rel.slug}`)}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-xs transition-all text-left group"
                >
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {rel.title}
                  </h4>
                  {rel.shortDefinition && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-normal">
                      {rel.shortDefinition}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Connected QuickForma Tools */}
        {linkedTools.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Connected QuickForma Calculators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {linkedTools.map((t: any) => (
                <button
                  key={t.id}
                  onClick={() => onSelectView(t.id)}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-xs transition-all text-left flex items-center justify-between group"
                >
                  <div className="space-y-0.5 pr-2">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">Calculator</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{t.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Related Ledger Articles */}
        {entry.relatedArticles && entry.relatedArticles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Deep-Dive Ledger Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {entry.relatedArticles.map((art: any) => (
                <button
                  key={art._id}
                  onClick={() => onSelectView(`blog:${art.slug}`)}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-xs transition-all text-left flex items-center justify-between group"
                >
                  <div className="space-y-0.5 pr-2">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Ledger Guide
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {art.title}
                    </h4>
                    {art.excerpt && <p className="text-[11px] text-slate-500 line-clamp-1">{art.excerpt}</p>}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
