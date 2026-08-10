import React, { useEffect, useState } from 'react';
import { getBlogHubData, urlFor } from '../lib/sanity';
import { ShareSection } from '../components/social/ShareSection';
import { BookOpen, Calendar, ChevronRight, ExternalLink, Sparkles, Folder } from 'lucide-react';

interface BlogHubPageProps {
  onSelectView?: (view: string) => void;
}

export const BlogHubPage: React.FC<BlogHubPageProps> = ({ onSelectView }) => {
  const [data, setData] = useState<{ latestOverall: any[]; categories: any[] }>({
    latestOverall: [],
    categories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getBlogHubData().then((res) => {
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // SEO & Social Tags Injection
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const shareTitle = 'The QuickForma Ledger — Business Guides, Financial Formulas & Playbooks';
      const shareDesc = 'Explore practical financial formulas, business playbooks, e-commerce workflows, and developer guides on QuickForma.';
      const pageUrl = 'https://www.quickforma.com/blog';

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
      updateMeta('name', 'twitter:card', 'summary_large_image');
      updateMeta('name', 'twitter:title', shareTitle);
      updateMeta('name', 'twitter:description', shareDesc);
    }
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4 text-center">
        <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 text-sm">Loading The QuickForma Ledger...</p>
      </div>
    );
  }

  const { latestOverall, categories } = data;
  const heroArticle = latestOverall[0];
  const secondaryLatest = latestOverall.slice(1, 3);

  const scrollToCategory = (catSlug: string) => {
    const elem = document.getElementById(`cat-sec-${catSlug}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-12 font-sans selection:bg-indigo-600 selection:text-white">
      {/* 1. Header Hero */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Editorial Index</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          The QuickForma Ledger
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Practical business guides, financial formulas, e-commerce playbooks, and developer manuals.
        </p>
      </header>

      {/* 2. Browse Categories (Top Responsive Nav) */}
      <section className="space-y-3">
        <h2 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Browse Categories</h2>
        <div className="overflow-x-auto no-scrollbar py-1 flex items-center gap-2 flex-nowrap sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => scrollToCategory(cat.slug)}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Compact Latest Releases Section */}
      {latestOverall.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Latest Releases</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Main Spotlight */}
            {heroArticle && (
              <a
                href={heroArticle._type === 'playbook' ? `/playbooks/${heroArticle.slug}` : `/blog/${heroArticle.slug}`}
                className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {heroArticle.featuredImage && (
                    <div className="rounded-xl overflow-hidden aspect-video bg-slate-100">
                      <img
                        src={urlFor(heroArticle.featuredImage).width(900).height(480).url()}
                        alt={heroArticle.featuredImage.alt || heroArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs">
                      {heroArticle.categoryName && (
                        <span className="font-bold text-indigo-600 uppercase text-[10px] tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
                          {heroArticle.categoryName}
                        </span>
                      )}
                      {heroArticle.publishedAt && (
                        <span className="text-slate-400 font-mono text-[10px]">
                          {new Date(heroArticle.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-slate-900 font-extrabold text-xl sm:text-2xl group-hover:text-indigo-600 transition-colors leading-tight">
                      {heroArticle.title}
                    </h3>
                    {heroArticle.excerpt && (
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{heroArticle.excerpt}</p>
                    )}
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Read Featured Article</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            )}

            {/* Sidebar Latest Releases */}
            {secondaryLatest.length > 0 && (
              <div className="space-y-4 flex flex-col justify-between">
                {secondaryLatest.map((art) => (
                  <a
                    key={art._id}
                    href={art._type === 'playbook' ? `/playbooks/${art.slug}` : `/blog/${art.slug}`}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between flex-1 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-indigo-600 uppercase text-[10px] tracking-wider">
                          {art.categoryName || 'Guide'}
                        </span>
                        {art.publishedAt && (
                          <span className="font-mono text-[10px]">{new Date(art.publishedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                      <h4 className="text-slate-900 font-bold text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {art.title}
                      </h4>
                      {art.excerpt && <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">{art.excerpt}</p>}
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                      <span>Read Guide</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Editorial Category Rows (All Categories dynamically rendered) */}
      <section className="space-y-12 pt-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Folder className="w-5 h-5 text-indigo-600" />
            <span>All Categories ({categories.length})</span>
          </h2>
        </div>

        <div className="space-y-10">
          {categories.map((cat) => {
            const art = cat.latestArticle;
            const catPageUrl = `/category/${cat.slug}`;

            return (
              <div key={cat._id} id={`cat-sec-${cat.slug}`} className="space-y-4 scroll-mt-24">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">{cat.name}</h3>
                    {cat.description && <p className="text-xs text-slate-500 mt-0.5">{cat.description}</p>}
                  </div>
                  <a
                    href={catPageUrl}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors self-start sm:self-auto"
                  >
                    <span>View All {cat.name} Guides</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {art ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a
                      href={art._type === 'playbook' ? `/playbooks/${art.slug}` : `/blog/${art.slug}`}
                      className="md:col-span-3 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col md:flex-row gap-5 group items-center"
                    >
                      {art.featuredImage && (
                        <div className="w-full md:w-64 shrink-0 rounded-xl overflow-hidden aspect-video bg-slate-100">
                          <img
                            src={urlFor(art.featuredImage).width(600).height(340).url()}
                            alt={art.featuredImage.alt || art.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-semibold text-indigo-600 uppercase text-[10px] tracking-wider">{cat.name}</span>
                          {art.publishedAt && (
                            <span className="flex items-center gap-1 font-mono text-[10px]">
                              <Calendar className="w-3 h-3" />
                              {new Date(art.publishedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <h4 className="text-slate-900 font-extrabold text-base sm:text-lg group-hover:text-indigo-600 transition-colors leading-snug">
                          {art.title}
                        </h4>
                        {art.excerpt && <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{art.excerpt}</p>}
                        <div className="pt-2 flex items-center gap-1 text-xs font-bold text-indigo-600">
                          <span>Read Article</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </a>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                    <span>Guides in production for <strong>{cat.name}</strong> — check back soon.</span>
                    <a href={catPageUrl} className="font-semibold text-indigo-600 hover:underline">
                      Explore category →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Share Section */}
      <ShareSection
        title="The QuickForma Ledger"
        description="Explore free business calculators, financial guides, and playbooks on QuickForma."
        url="https://www.quickforma.com/blog"
        align="center"
        className="pt-8 border-t border-slate-200"
      />
    </div>
  );
};

export default BlogHubPage;
