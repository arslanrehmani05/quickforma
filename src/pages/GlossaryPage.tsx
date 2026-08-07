import React, { useEffect, useState } from 'react';
import { getGlossaryTermBySlug, urlFor } from '../lib/sanity';
import { ShareSection } from '../components/social/ShareSection';
import { BookOpen, ArrowLeft, CheckCircle2, Calculator } from 'lucide-react';
import { PortableText } from '@portabletext/react';

interface GlossaryPageProps {
  slug: string;
  onBack?: () => void;
}

export const GlossaryPage: React.FC<GlossaryPageProps> = ({ slug, onBack }) => {
  const [term, setTerm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getGlossaryTermBySlug(slug).then((data) => {
      if (isMounted) {
        setTerm(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Social Metadata Fallback Pipeline & Tag Injection
  useEffect(() => {
    if (typeof document !== 'undefined' && term) {
      const shareTitle = term.socialTitle || term.seoTitle || `${term.term} Definition — QuickForma Glossary`;
      const shareDesc = term.socialDescription || term.metaDescription || term.definition || `Learn the exact mathematical definition and formula for ${term.term} on QuickForma.`;
      const shareImg = term.socialImage
        ? urlFor(term.socialImage).width(1200).height(630).url()
        : 'https://www.quickforma.com/branding/Logo%20PNG.png';

      const pageUrl = `https://www.quickforma.com/glossary/${slug}`;

      document.title = `${shareTitle} — QuickForma`;

      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', pageUrl);

      const updateMeta = (attrName: string, attrVal: string, contentVal: string) => {
        let meta = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrVal}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(attrName, attrVal);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', contentVal);
      };

      updateMeta('property', 'og:title', shareTitle);
      updateMeta('property', 'og:description', shareDesc);
      updateMeta('property', 'og:url', pageUrl);
      updateMeta('property', 'og:type', 'article');
      updateMeta('property', 'og:image', shareImg);

      updateMeta('name', 'twitter:card', 'summary_large_image');
      updateMeta('name', 'twitter:title', shareTitle);
      updateMeta('name', 'twitter:description', shareDesc);
      updateMeta('name', 'twitter:image', shareImg);
    }
  }, [term, slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 text-sm">Loading glossary term...</p>
      </div>
    );
  }

  if (!term) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Glossary Term Not Found</h1>
        <p className="text-slate-600 text-sm">The business term you are looking for is not in the glossary.</p>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Glossary
          </button>
        )}
      </div>
    );
  }

  const pageUrl = `https://www.quickforma.com/glossary/${slug}`;
  const shareTitle = term.socialTitle || term.seoTitle || `${term.term} Definition — QuickForma Glossary`;
  const shareDesc = term.socialDescription || term.metaDescription || term.definition;

  return (
    <article className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}

      {/* Glossary Term Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Business Glossary & Formula Index</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {term.term}
        </h1>

        <p className="text-xl font-medium text-slate-700 leading-relaxed border-l-4 border-indigo-600 pl-4 py-1 bg-indigo-50/50 rounded-r-xl">
          {term.definition}
        </p>

        {term.lastReviewedAt && (
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Audited {new Date(term.lastReviewedAt).toLocaleDateString()}{term.reviewerName ? ` by ${term.reviewerName}` : ''}</span>
          </div>
        )}
      </header>

      {/* Mathematical Formula Box */}
      {term.formula && (
        <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Calculator className="w-4 h-4" /> Mathematical Formula
          </div>
          <code className="text-lg font-mono text-emerald-300 block">{term.formula}</code>
        </div>
      )}

      {/* Extended Explanation */}
      {term.explanation && (
        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600">
          <PortableText value={term.explanation} />
        </div>
      )}

      {/* Bottom Social Share Section */}
      <ShareSection
        title={shareTitle}
        description={shareDesc}
        url={pageUrl}
        align="center"
        className="pt-8 border-t border-slate-200 mt-12"
      />
    </article>
  );
};

export default GlossaryPage;
