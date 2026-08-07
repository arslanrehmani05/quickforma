import React, { useEffect, useState } from 'react';
import { getCategoryBySlug, urlFor } from '../lib/sanity';
import { ShareSection } from '../components/social/ShareSection';
import { Folder, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  slug: string;
  onBack?: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ slug, onBack }) => {
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getCategoryBySlug(slug).then((data) => {
      if (isMounted) {
        setCategory(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Social Metadata Tag Injection
  useEffect(() => {
    if (typeof document !== 'undefined' && category) {
      const shareTitle = `${category.name} Business Tools & Guides — QuickForma`;
      const shareDesc = category.seoDescription || category.description || `Browse free ${category.name} calculators, tools, and playbooks on QuickForma.`;
      const shareImg = category.featuredImage
        ? urlFor(category.featuredImage).width(1200).height(630).url()
        : 'https://www.quickforma.com/branding/Logo%20PNG.png';

      const pageUrl = `https://www.quickforma.com/category/${slug}`;

      document.title = shareTitle;

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
  }, [category, slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 text-sm">Loading category landing page...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Category Not Found</h1>
        <p className="text-slate-600 text-sm">The category you are looking for does not exist.</p>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Categories
          </button>
        )}
      </div>
    );
  }

  const pageUrl = `https://www.quickforma.com/category/${slug}`;
  const shareTitle = `${category.name} Business Tools & Guides — QuickForma`;
  const shareDesc = category.seoDescription || category.description;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}

      {/* Category Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Folder className="w-3.5 h-3.5" />
          <span>Category Pillar</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {category.name}
        </h1>

        {category.description && <p className="text-lg text-slate-600 leading-relaxed">{category.description}</p>}
      </header>

      {/* Category Featured Banner */}
      {category.featuredImage && (
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm my-6">
          <img
            src={urlFor(category.featuredImage).width(1200).height(630).url()}
            alt={category.featuredImage.alt || category.name}
            className="w-full h-auto object-cover max-h-[360px]"
          />
        </figure>
      )}

      {/* Bottom Social Share Section */}
      <ShareSection
        title={shareTitle}
        description={shareDesc}
        url={pageUrl}
        align="center"
        className="pt-8 border-t border-slate-200 mt-12"
      />
    </div>
  );
};

export default CategoryPage;
