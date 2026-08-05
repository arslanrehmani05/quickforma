import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { RelatedGuideItem } from '../types/seo';

// Extract Sanity configurations from environment variables or provide defaults
export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'quickforma';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN edge cache for ultra-fast response times
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
