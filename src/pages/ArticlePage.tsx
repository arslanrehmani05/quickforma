import React, { useEffect, useState } from 'react';
import { getArticleBySlug, urlFor } from '../lib/sanity';
import { ShareSection } from '../components/social/ShareSection';
import { Clock, User, Calendar, CheckCircle2, ArrowLeft } from 'lucide-react';
import { PortableTextRenderer } from '../components/blog/PortableTextRenderer';

interface ArticlePageProps {
  slug: string;
  onBack?: () => void;
  onSelectView?: (view: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ slug, onBack, onSelectView }) => {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getArticleBySlug(slug).then((data) => {
      if (isMounted) {
        setArticle(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Social Metadata Fallback Pipeline & Tag Injection & Automatic Redirect
  useEffect(() => {
    if (typeof document !== 'undefined' && article) {
      const activeSlug = article.canonicalSlug || slug;

      // Automatic Redirect Handling: If accessed via a previousSlug, update location bar to canonical URL
      if (article.canonicalSlug && article.canonicalSlug !== slug) {
        window.history.replaceState(null, '', `/ledger/${article.canonicalSlug}`);
      }

      const shareTitle = article.socialTitle || article.seoTitle || article.title || 'QuickForma Article';
      const shareDesc = article.socialDescription || article.metaDescription || article.excerpt || 'Read this evergreen business guide on QuickForma.';
      const shareImg = article.socialImage
        ? urlFor(article.socialImage).width(1200).height(630).url()
        : article.featuredImage
        ? urlFor(article.featuredImage).width(1200).height(630).url()
        : 'https://www.quickforma.com/branding/Logo%20PNG.png';

      const pageUrl = `https://www.quickforma.com/ledger/${activeSlug}`;

      document.title = `${shareTitle} — QuickForma`;

      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', article.canonicalUrl || pageUrl);

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
  }, [article, slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 text-sm">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Article Not Found</h1>
        <p className="text-slate-600 text-sm">The article you are looking for does not exist or has been moved.</p>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Articles
          </button>
        )}
      </div>
    );
  }

  const activeSlug = article.canonicalSlug || slug;
  const pageUrl = `https://www.quickforma.com/ledger/${activeSlug}`;
  const shareTitle = article.socialTitle || article.seoTitle || article.title;
  const shareDesc = article.socialDescription || article.metaDescription || article.excerpt;
  const shareImg = article.featuredImage
    ? urlFor(article.featuredImage).width(1200).height(630).url()
    : 'https://www.quickforma.com/branding/Logo%20PNG.png';

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: shareDesc,
    image: shareImg,
    datePublished: article.publishedAt || article._createdAt,
    dateModified: article._updatedAt || article.publishedAt,
    author: article.authorName
      ? { '@type': 'Person', name: article.authorName }
      : { '@type': 'Organization', name: 'QuickForma Editorial' },
    publisher: {
      '@type': 'Organization',
      name: 'QuickForma',
      url: 'https://www.quickforma.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.quickforma.com/branding/Logo%20PNG.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.quickforma.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ledger',
        item: 'https://www.quickforma.com/ledger',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Rich Snippets Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}

      {/* Article Header */}
      <header className="space-y-4">
        {article.categoryName && (
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full inline-block">
            {article.categoryName}
          </span>
        )}

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        {article.excerpt && <p className="text-lg text-slate-600 leading-relaxed">{article.excerpt}</p>}

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-4">
          {article.authorName && (
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <User className="w-4 h-4 text-indigo-600" />
              <span>By {article.authorName}</span>
            </div>
          )}
          {article.publishedAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Published {new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          )}
          {article._updatedAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Updated {new Date(article._updatedAt).toLocaleDateString()}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>
              {(() => {
                if (!article.body || !Array.isArray(article.body)) return '4 min read';
                const text = article.body.map((b: any) => (b.children ? b.children.map((c: any) => c.text).join(' ') : '')).join(' ');
                const words = text.trim().split(/\s+/).filter(Boolean).length;
                const minutes = Math.max(1, Math.ceil(words / 200));
                return `${minutes} min read`;
              })()}
            </span>
          </div>
          {article.lastReviewedAt && (
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Reviewed {new Date(article.lastReviewedAt).toLocaleDateString()}{article.reviewerName ? ` by ${article.reviewerName}` : ''}</span>
            </div>
          )}
        </div>
      </header>

      {/* Top Social Share Section */}
      <ShareSection title={shareTitle} description={shareDesc} url={pageUrl} className="my-4" />

      {/* Featured Image */}
      {article.featuredImage && (
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm my-6">
          <img
            src={urlFor(article.featuredImage).width(1200).height(630).url()}
            alt={article.featuredImage.alt || article.title}
            className="w-full h-auto object-cover max-h-[480px]"
          />
          {article.featuredImage.caption && (
            <figcaption className="p-3 text-xs text-slate-500 bg-slate-50 border-t border-slate-100 text-center">
              {article.featuredImage.caption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Portable Text Body Content */}
      {article.body && (
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs my-6">
          <PortableTextRenderer content={article.body} onSelectTool={onSelectView} />
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

export default ArticlePage;
