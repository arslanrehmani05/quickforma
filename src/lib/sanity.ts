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
 * Fetch published Sanity Encyclopedia entries related to a specific tool or category.
 * Implements a 2-tier fallback (Direct Tool Matches -> Category Backfill) capped at 4 total items.
 */
export async function getRelatedGuides(category?: string, toolId?: string): Promise<RelatedGuideItem[]> {
  try {
    const totalMax = 4;
    let directMatches: any[] = [];

    const cleanToolId = toolId ? toolId.replace(/^\/?tools\//, '').trim() : '';

    // 1. Tier-1 Direct Matches: cleanToolId in relatedTools
    if (cleanToolId) {
      const directQuery = `*[_type == "encyclopedia" && defined(slug.current) && $cleanToolId in relatedTools] | order(coalesce(_updatedAt, _createdAt) desc)[0..3]{
        _id,
        _type,
        title,
        "slug": slug.current,
        "description": shortDefinition,
        "category": coalesce(categories[0]->name, category->name, "Concept")
      }`;
      directMatches = await sanityClient.fetch(directQuery, { cleanToolId });
    }

    let categoryMatches: any[] = [];
    const directCount = Array.isArray(directMatches) ? directMatches.length : 0;

    // 2. Tier-2 Category Matches: Only if fewer than 4 direct matches exist
    if (directCount < totalMax && category) {
      const remainingLimit = totalMax - directCount;
      const directIds = Array.isArray(directMatches) ? directMatches.map((m: any) => m._id) : [];
      const targetCategories = CATEGORY_MAP[category] || [category];

      const categoryQuery = `*[_type == "encyclopedia" && defined(slug.current) && !(_id in $directIds) && (categories[]->slug.current in $targetCategories || lower(categories[]->name) in $targetCategories || category->slug.current in $targetCategories)] | order(coalesce(_updatedAt, _createdAt) desc)[0..$limit]{
        _id,
        _type,
        title,
        "slug": slug.current,
        "description": shortDefinition,
        "category": coalesce(categories[0]->name, category->name, "Concept")
      }`;

      categoryMatches = await sanityClient.fetch(categoryQuery, {
        targetCategories,
        directIds,
        limit: remainingLimit - 1,
      });
    }

    const combined = [
      ...(Array.isArray(directMatches) ? directMatches : []),
      ...(Array.isArray(categoryMatches) ? categoryMatches : []),
    ].slice(0, totalMax);

    if (combined.length === 0) {
      return [];
    }

    return combined.map((item: any) => ({
      id: item._id,
      title: item.title,
      description: item.description || 'Core business concept definition and calculation framework.',
      readTime: 'Concept Entry',
      url: `/encyclopedia/${item.slug}`,
      category: item.category || 'Encyclopedia',
    }));
  } catch (error) {
    console.warn('Sanity CMS query issue (falling back gracefully):', error);
    return [];
  }
}
