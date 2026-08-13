import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { RelatedGuideItem } from '../types/seo';

// Extract Sanity configurations from environment variables or provide defaults
export const projectId = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_PROJECT_ID) || '60xo4tvv';
export const dataset = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_DATASET) || 'production';
export const apiVersion = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_API_VERSION) || '2026-01-01';
export const token = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_TOKEN) || '';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: token || undefined,
  useCdn: token ? false : true, // Disable CDN when using authenticated token
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export interface SanityGuidePost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  readTime?: string;
  category?: string;
  publishedAt?: string;
  mainImage?: any;
  body?: any;
  relatedToolIds?: string[];
}

const CATEGORY_MAP: Record<string, string[]> = {
  finance: ['finance', 'finance-and-money', 'personal-finance', 'accounting-and-bookkeeping', 'tax-and-compliance', 'invoicing-and-payments'],
  business: ['business', 'business-and-operations', 'legal-and-contracts', 'freelancing-and-self-employment', 'career-and-work'],
  ecommerce: ['ecommerce', 'marketing-and-sales', 'business-and-operations', 'finance-and-money'],
  operations: ['operations', 'business-and-operations', 'data-and-conversion'],
  hr: ['hr', 'career-and-work', 'tax-and-compliance', 'business-and-operations'],
  developer: ['developer', 'technology-and-digital', 'data-and-conversion'],
  marketing: ['marketing', 'marketing-and-sales'],
  healthcare: ['healthcare', 'time-and-productivity'],
  converters: ['converters', 'data-and-conversion', 'technology-and-digital'],
  content: ['content', 'time-and-productivity', 'career-and-work'],
  productivity: ['productivity', 'time-and-productivity'],
};

/**
 * Fetch published Sanity blog guides related to a specific tool or category.
 * Implements a 2-tier fallback (Direct Tool Matches -> Category Backfill) capped at 4 total items.
 */
export async function getRelatedGuides(category?: string, toolId?: string): Promise<RelatedGuideItem[]> {
  try {
    const totalMax = 4;
    let directMatches: any[] = [];

    // Clean toolId parameter to strip any potential leading slash or /tools/ prefix defensively
    const cleanToolId = toolId ? toolId.replace(/^\/?tools\//, '').trim() : '';
    const toolUrlPath = cleanToolId ? `/tools/${cleanToolId}` : '';

    // 1. Tier-1 Direct Matches: targetTool == cleanToolId || targetTool == toolUrlPath || cleanToolId in relatedToolIds
    if (cleanToolId) {
      const directQuery = `*[_type == "article" && defined(slug.current) && (targetTool == $cleanToolId || targetTool == $toolUrlPath || $cleanToolId in relatedToolIds)] | order(coalesce(publishedAt, _updatedAt, _createdAt) desc)[0..3]{
        _id,
        _type,
        title,
        "slug": slug.current,
        "description": coalesce(excerpt, metaDescription),
        "readTime": coalesce(readTime, "5 min read"),
        "category": coalesce(category->name, category, "Guide")
      }`;
      directMatches = await sanityClient.fetch(directQuery, { cleanToolId, toolUrlPath });
    }

    let categoryMatches: any[] = [];
    const directCount = Array.isArray(directMatches) ? directMatches.length : 0;

    // 2. Tier-2 Category Matches: Only if fewer than 4 direct matches exist
    if (directCount < totalMax && category) {
      const remainingLimit = totalMax - directCount;
      const directIds = Array.isArray(directMatches) ? directMatches.map((m: any) => m._id) : [];
      const targetCategories = CATEGORY_MAP[category] || [category];

      const categoryQuery = `*[_type == "article" && defined(slug.current) && !(_id in $directIds) && (category->slug.current in $targetCategories || lower(category->name) in $targetCategories || category in $targetCategories)] | order(coalesce(publishedAt, _updatedAt, _createdAt) desc)[0..$limit]{
        _id,
        _type,
        title,
        "slug": slug.current,
        "description": coalesce(excerpt, metaDescription),
        "readTime": coalesce(readTime, "5 min read"),
        "category": coalesce(category->name, category, "Guide")
      }`;

      categoryMatches = await sanityClient.fetch(categoryQuery, {
        targetCategories,
        directIds,
        limit: remainingLimit - 1,
      });
    }

    const combinedPosts = [
      ...(Array.isArray(directMatches) ? directMatches : []),
      ...(Array.isArray(categoryMatches) ? categoryMatches : []),
    ].slice(0, totalMax);

    if (combinedPosts.length === 0) {
      return [];
    }

    return combinedPosts.map((post: any) => ({
      id: post._id,
      title: post.title,
      description: post.description || 'Detailed strategic guide on business operations and financial execution.',
      readTime: post.readTime || '5 min read',
      url: `/ledger/${post.slug}`,
      category: post.category || 'Guide',
    }));
  } catch (error) {
    console.warn('Sanity CMS query encountered an issue (falling back to local guides):', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const query = `*[_type == "article" && (slug.current == $slug || $slug in previousSlugs)][0]{
      ...,
      "canonicalSlug": slug.current,
      "categoryName": category->name,
      "categorySlug": category->slug.current,
      "authorName": author->name,
      "authorRole": author->role,
      "authorImage": author->avatar,
      "reviewerName": reviewedBy->name
    }`;
    return await sanityClient.fetch(query, { slug });
  } catch (err) {
    console.warn('Failed to fetch article by slug:', err);
    return null;
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const query = `*[_type == "category" && slug.current == $slug][0]`;
    return await sanityClient.fetch(query, { slug });
  } catch (err) {
    console.warn('Failed to fetch category by slug:', err);
    return null;
  }
}

export async function getCategoryArticles(categorySlug: string) {
  try {
    const query = `*[_type == "article" && (category->slug.current == $categorySlug || category == $categorySlug) && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt, _createdAt) desc){
      _id,
      _type,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      _updatedAt,
      featuredImage,
      "categoryName": category->name,
      "categorySlug": category->slug.current
    }`;
    return await sanityClient.fetch(query, { categorySlug });
  } catch (err) {
    console.warn('Failed to fetch category articles:', err);
    return [];
  }
}

export async function getBlogHubData() {
  try {
    const query = `{
      "latestOverall": *[_type == "article" && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt, _createdAt) desc)[0..2]{
        _id,
        _type,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        _updatedAt,
        featuredImage,
        "categoryName": category->name,
        "categorySlug": category->slug.current
      },
      "categories": *[_type == "category"] | order(displayOrder asc, name asc){
        _id,
        name,
        "slug": slug.current,
        description,
        "latestArticle": *[_type == "article" && (category._ref == ^._id || category->slug.current == ^.slug.current || category == ^.slug.current) && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt, _createdAt) desc)[0]{
          _id,
          _type,
          title,
          "slug": slug.current,
          excerpt,
          publishedAt,
          _updatedAt,
          featuredImage,
          "categoryName": category->name,
          "categorySlug": category->slug.current
        }
      }
    }`;
    return await sanityClient.fetch(query);
  } catch (err) {
    console.warn('Failed to fetch blog hub data:', err);
    return { latestOverall: [], categories: [] };
  }
}

/**
 * Fetch a single published Sanity blog post by slug with full body & related tool IDs.
 */
export async function getBlogPostBySlug(slug: string): Promise<SanityGuidePost | null> {
  try {
    const query = `*[_type in ["post", "article"] && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      readTime,
      category,
      publishedAt,
      mainImage,
      featuredImage,
      body,
      content,
      relatedToolIds
    }`;

    const post = await sanityClient.fetch(query, { slug });
    if (!post) return null;

    // Normalize field names (mainImage vs featuredImage, body vs content)
    return {
      _id: post._id,
      title: post.title,
      slug: { current: post.slug },
      excerpt: post.excerpt || post.metaDescription,
      readTime: post.readTime || '5 min read',
      category: typeof post.category === 'string' ? post.category : post.categoryName || 'Guide',
      publishedAt: post.publishedAt,
      mainImage: post.mainImage || post.featuredImage,
      body: post.body || post.content,
      relatedToolIds: post.relatedToolIds,
    };
  } catch (error) {
    console.warn('Error fetching Sanity blog post by slug:', error);
    return null;
  }
}
