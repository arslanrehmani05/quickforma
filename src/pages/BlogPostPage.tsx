import React, { useState, useEffect } from 'react';
import { getBlogPostBySlug, urlFor, SanityGuidePost } from '../lib/sanity';
import { PortableTextRenderer } from '../components/blog/PortableTextRenderer';
import { TOOLS_CATALOG } from '../data/toolsCatalog';
import { BookOpen, Calendar, Clock, ArrowLeft, Wrench, ChevronRight } from 'lucide-react';

interface BlogPostPageProps {
  slug: string;
  onSelectView: (view: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onSelectView }) => {
  const [post, setPost] = useState<SanityGuidePost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getBlogPostBySlug(slug).then((fetchedPost) => {
      if (isMounted) {
        setPost(fetchedPost);
        setIsLoading(false);

        if (fetchedPost) {
          document.title = `${fetchedPost.title} | QuickForma Guide`;
          if (fetchedPost.excerpt) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', fetchedPost.excerpt);
          }
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center space-y-4">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="text-sm font-semibold text-slate-500">Loading guide...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl inline-block text-amber-700">
          <BookOpen className="w-8 h-8 mx-auto mb-2" />
          <h2 className="text-xl font-bold">Guide Not Found</h2>
          <p className="text-xs text-amber-600 mt-1">The requested blog post could not be loaded or is unavailable.</p>
        </div>
        <div>
          <button
            onClick={() => onSelectView('home')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Tools
          </button>
        </div>
      </div>
    );
  }

  // Find related tools linked to this post
  const relatedTools = post.relatedToolIds
    ? TOOLS_CATALOG.filter((t) => post.relatedToolIds?.includes(t.id))
    : [];

  return (
    <article className="max-w-4xl mx-auto space-y-10 py-4">
      {/* Header & Meta */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
            {post.category || 'Guide'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-2">
          {post.readTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{post.readTime}</span>
            </div>
          )}
          {post.publishedAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Image (if available) */}
      {post.mainImage && (
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <img
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            className="w-full max-h-[450px] object-cover"
          />
        </figure>
      )}

      {/* Article Body Content */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs">
        <PortableTextRenderer
          content={post.body}
          onSelectTool={(toolId) => onSelectView(toolId)}
        />
      </div>

      {/* Related QuickForma Tools Footer */}
      {relatedTools.length > 0 && (
        <section className="bg-slate-100 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 no-print">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Wrench className="w-5 h-5 text-indigo-600" />
            <h3>Use Free Online Tools Mentioned in This Guide</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onSelectView(tool.id)}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all text-left group flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{tool.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
