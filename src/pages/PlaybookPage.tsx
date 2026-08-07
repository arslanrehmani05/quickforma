import React, { useEffect, useState } from 'react';
import { getPlaybookBySlug, urlFor } from '../lib/sanity';
import { ShareSection } from '../components/social/ShareSection';
import { Clock, User, Calendar, CheckCircle2, ArrowLeft, Target } from 'lucide-react';
import { PortableText } from '@portabletext/react';

interface PlaybookPageProps {
  slug: string;
  onBack?: () => void;
}

export const PlaybookPage: React.FC<PlaybookPageProps> = ({ slug, onBack }) => {
  const [playbook, setPlaybook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getPlaybookBySlug(slug).then((data) => {
      if (isMounted) {
        setPlaybook(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Social Metadata Fallback Pipeline & Tag Injection
  useEffect(() => {
    if (typeof document !== 'undefined' && playbook) {
      const shareTitle = playbook.socialTitle || playbook.seoTitle || playbook.title || 'QuickForma Business Playbook';
      const shareDesc = playbook.socialDescription || playbook.metaDescription || playbook.excerpt || 'Step-by-step operational manual on QuickForma.';
      const shareImg = playbook.socialImage
        ? urlFor(playbook.socialImage).width(1200).height(630).url()
        : playbook.featuredImage
        ? urlFor(playbook.featuredImage).width(1200).height(630).url()
        : 'https://www.quickforma.com/branding/Logo%20PNG.png';

      const pageUrl = `https://www.quickforma.com/playbooks/${slug}`;

      document.title = `${shareTitle} — QuickForma Playbooks`;

      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', playbook.canonicalUrl || pageUrl);

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
  }, [playbook, slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 text-sm">Loading playbook...</p>
      </div>
    );
  }

  if (!playbook) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Playbook Not Found</h1>
        <p className="text-slate-600 text-sm">The operational playbook you requested is unavailable.</p>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Playbooks
          </button>
        )}
      </div>
    );
  }

  const pageUrl = `https://www.quickforma.com/playbooks/${slug}`;
  const shareTitle = playbook.socialTitle || playbook.seoTitle || playbook.title;
  const shareDesc = playbook.socialDescription || playbook.metaDescription || playbook.excerpt;

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

      {/* Playbook Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 rounded-full inline-flex items-center gap-1">
            <Target className="w-3.5 h-3.5" /> Business Playbook
          </span>
          {playbook.categoryName && (
            <span className="px-3 py-1 text-xs font-semibold text-slate-600 bg-slate-100 rounded-full">
              {playbook.categoryName}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {playbook.title}
        </h1>

        {playbook.excerpt && <p className="text-lg text-slate-600 leading-relaxed">{playbook.excerpt}</p>}

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-4">
          {playbook.authorName && (
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <User className="w-4 h-4 text-indigo-600" />
              <span>By {playbook.authorName}</span>
            </div>
          )}
          {playbook.publishedAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Published {new Date(playbook.publishedAt).toLocaleDateString()}</span>
            </div>
          )}
          {playbook.readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{playbook.readingTime} min read</span>
            </div>
          )}
          {playbook.lastReviewedAt && (
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Reviewed {new Date(playbook.lastReviewedAt).toLocaleDateString()}{playbook.reviewerName ? ` by ${playbook.reviewerName}` : ''}</span>
            </div>
          )}
        </div>
      </header>

      {/* Top Social Share Section */}
      <ShareSection title={shareTitle} description={shareDesc} url={pageUrl} className="my-4" />

      {/* Featured Image */}
      {playbook.featuredImage && (
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm my-6">
          <img
            src={urlFor(playbook.featuredImage).width(1200).height(630).url()}
            alt={playbook.featuredImage.alt || playbook.title}
            className="w-full h-auto object-cover max-h-[480px]"
          />
        </figure>
      )}

      {/* Portable Text Body */}
      {playbook.body && (
        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600 prose-img:rounded-xl">
          <PortableText value={playbook.body} />
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

export default PlaybookPage;
