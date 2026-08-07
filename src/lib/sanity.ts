import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { RelatedGuideItem } from '../types/seo';

// Extract Sanity configurations from environment variables or provide defaults
export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '60xo4tvv';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-01-01';
export const token = import.meta.env.VITE_SANITY_TOKEN || '';

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

/**
 * Fetch published Sanity blog guides related to a specific tool or category.
 */
export async function getRelatedGuides(category?: string, toolId?: string): Promise<RelatedGuideItem[]> {
  try {
    // GROQ query to find published guides matching toolId or category
    const query = `*[_type == "post" && (defined(slug.current)) && ($toolId in relatedToolIds || category == $category)][0..3]{
      _id,
      title,
      "slug": slug.current,
      "description": excerpt,
      "readTime": coalesce(readTime, "5 min read"),
      "category": coalesce(category, "Guide")
    }`;

    const params = {
      category: category || '',
      toolId: toolId || '',
    };

    const posts = await sanityClient.fetch(query, params);

    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      return [];
    }

    return posts.map((post: any) => ({
      id: post._id,
      title: post.title,
      description: post.description || 'Detailed strategic guide on business operations and financial execution.',
      readTime: post.readTime || '5 min read',
      url: `/blog/${post.slug}`,
      category: post.category || 'Guide',
    }));
  } catch (error) {
    console.warn('Sanity CMS query encountered an issue (falling back to local guides):', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const query = `*[_type == "article" && slug.current == $slug][0]{
      ...,
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

export async function getPlaybookBySlug(slug: string) {
  try {
    const query = `*[_type == "playbook" && slug.current == $slug][0]{
      ...,
      "categoryName": category->name,
      "categorySlug": category->slug.current,
      "authorName": author->name,
      "authorRole": author->role,
      "reviewerName": reviewedBy->name
    }`;
    return await sanityClient.fetch(query, { slug });
  } catch (err) {
    console.warn('Failed to fetch playbook by slug:', err);
    return null;
  }
}

export async function getCollectionBySlug(slug: string) {
  try {
    const query = `*[_type == "collection" && slug.current == $slug][0]{
      ...,
      "categoryName": category->name,
      "categorySlug": category->slug.current,
      "reviewerName": reviewedBy->name
    }`;
    return await sanityClient.fetch(query, { slug });
  } catch (err) {
    console.warn('Failed to fetch collection by slug:', err);
    return null;
  }
}

export async function getGlossaryTermBySlug(slug: string) {
  try {
    const query = `*[_type == "glossary" && slug.current == $slug][0]{
      ...,
      "categoryName": category->name,
      "categorySlug": category->slug.current,
      "reviewerName": reviewedBy->name
    }`;
    return await sanityClient.fetch(query, { slug });
  } catch (err) {
    console.warn('Failed to fetch glossary term by slug:', err);
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
