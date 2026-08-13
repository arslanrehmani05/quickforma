import React, { useEffect, useState } from 'react';
import { getCategoryBySlug, getCategoryArticles, urlFor } from '../lib/sanity';
import { ShareSection } from '../components/social/ShareSection';
import { Folder, ArrowLeft, BookOpen, Clock, Calendar, ExternalLink } from 'lucide-react';

interface CategoryPageProps {
  slug: string;
  onBack?: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ slug, onBack }) => {
  const [category, setCategory] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    Promise.all([getCategoryBySlug(slug), getCategoryArticles(slug)]).then(([catData, artData]) => {
      if (isMounted) {
        setCategory(catData);
        setArticles(artData || []);
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
      <div className="max-w-5xl mx-auto py-16 px-4 text-center">
        <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 text-sm">Loading category guides...</p>
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
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-10 font-sans">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}

      {/* Category Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Folder className="w-3.5 h-3.5" />
          <span>Category Pillar</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {category.name}
        </h1>

        {category.description && <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">{category.description}</p>}
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

      {/* Category Articles Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Published Guides ({articles.length})</span>
          </h2>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => {
              const artUrl = `/ledger/${art.slug}`;
              return (
                <a
                  key={art._id}
                  href={artUrl}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {art.featuredImage && (
                      <div className="rounded-xl overflow-hidden aspect-video bg-slate-100 mb-2">
                        <img
                          src={urlFor(art.featuredImage).width(600).height(340).url()}
                          alt={art.featuredImage.alt || art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-indigo-600 uppercase text-[10px] tracking-wider">{category.name}</span>
                      {art.publishedAt && (
                        <span className="flex items-center gap-1 font-mono text-[10px]">
                          <Calendar className="w-3 h-3" />
                          {new Date(art.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-slate-900 font-bold text-base line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {art.title}
                    </h3>
                    {art.excerpt && <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{art.excerpt}</p>}
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                    <span>Read Article</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-700">No published guides in this category yet</p>
            <p className="text-xs text-slate-500">Check back soon for new guides and playbooks in {category.name}.</p>
          </div>
        )}
      </section>

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
