import React, { useEffect, useState } from 'react';
import { getCollectionBySlug, urlFor } from '../lib/sanity';
import { ShareSection } from '../components/social/ShareSection';
import { Layers, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PortableText } from '@portabletext/react';

interface CollectionPageProps {
  slug: string;
  onBack?: () => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ slug, onBack }) => {
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getCollectionBySlug(slug).then((data) => {
      if (isMounted) {
        setCollection(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Social Metadata Fallback Pipeline & Tag Injection
  useEffect(() => {
    if (typeof document !== 'undefined' && collection) {
      const shareTitle = collection.socialTitle || collection.seoTitle || collection.title || 'QuickForma Editorial Collection';
      const shareDesc = collection.socialDescription || collection.metaDescription || collection.excerpt || 'Explore curated tools and business playbooks on QuickForma.';
      const shareImg = collection.socialImage
        ? urlFor(collection.socialImage).width(1200).height(630).url()
        : collection.featuredImage
        ? urlFor(collection.featuredImage).width(1200).height(630).url()
        : 'https://www.quickforma.com/branding/Logo%20PNG.png';

      const pageUrl = `https://www.quickforma.com/collections/${slug}`;

      document.title = `${shareTitle} — QuickForma Collections`;

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
      updateMeta('property', 'og:type', 'website');
      updateMeta('property', 'og:image', shareImg);

      updateMeta('name', 'twitter:card', 'summary_large_image');
      updateMeta('name', 'twitter:title', shareTitle);
      updateMeta('name', 'twitter:description', shareDesc);
      updateMeta('name', 'twitter:image', shareImg);
    }
  }, [collection, slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 text-sm">Loading toolkit collection...</p>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Collection Not Found</h1>
        <p className="text-slate-600 text-sm">The requested toolkit collection is unavailable.</p>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </button>
        )}
      </div>
    );
  }

  const pageUrl = `https://www.quickforma.com/collections/${slug}`;
  const shareTitle = collection.socialTitle || collection.seoTitle || collection.title;
  const shareDesc = collection.socialDescription || collection.metaDescription || collection.excerpt;

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

      {/* Collection Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Curated Business Toolkit</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {collection.title}
        </h1>

        {collection.excerpt && <p className="text-lg text-slate-600 leading-relaxed">{collection.excerpt}</p>}

        {collection.lastReviewedAt && (
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Audited {new Date(collection.lastReviewedAt).toLocaleDateString()}{collection.reviewerName ? ` by ${collection.reviewerName}` : ''}</span>
          </div>
        )}
      </header>

      {/* Portable Text Description */}
      {collection.description && (
        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600">
          <PortableText value={collection.description} />
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

export default CollectionPage;
