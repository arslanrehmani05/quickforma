import { describe, it, expect } from 'vitest';
import { TOOLS_CATALOG, getVerticalTools, getCategoryTools, VERTICALS } from '../../src/data/toolsCatalog';
import { CANONICAL_CATEGORIES, getCategoriesForVertical } from '../../src/data/categories';
import { FunctionalCategoryId, VerticalId } from '../../src/types';

describe('Taxonomy Architecture & Catalog Integrity', () => {
  it('has exactly 511 active registered tools in the production catalog', () => {
    expect(TOOLS_CATALOG.length).toBe(511);
  });

  it('guarantees 100% unique tool IDs with zero duplicates', () => {
    const ids = TOOLS_CATALOG.map(t => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(511);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('assigns exactly one valid primary category to every tool matching the 14 canonical categories', () => {
    const validCategoryIds = new Set<string>(CANONICAL_CATEGORIES.map(c => c.id));
    expect(validCategoryIds.size).toBe(14);

    for (const tool of TOOLS_CATALOG) {
      expect(validCategoryIds.has(tool.category)).toBe(true);
      const canonicalDef = CANONICAL_CATEGORIES.find(c => c.id === tool.category);
      expect(canonicalDef).toBeDefined();
      expect(tool.categoryLabel).toBe(canonicalDef?.name);
    }
  });

  it('populates all 14 canonical functional categories with at least 10 tools', () => {
    const counts: Record<string, number> = {};
    for (const tool of TOOLS_CATALOG) {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    }

    for (const cat of CANONICAL_CATEGORIES) {
      expect(counts[cat.id]).toBeDefined();
      expect(counts[cat.id]).toBeGreaterThanOrEqual(10);
    }
  });

  it('assigns valid vertical audiences to every tool without orphans', () => {
    const validVerticals = new Set<VerticalId>(['business', 'students', 'developers']);

    for (const tool of TOOLS_CATALOG) {
      expect(tool.verticals.length).toBeGreaterThan(0);
      for (const v of tool.verticals) {
        expect(validVerticals.has(v)).toBe(true);
      }
    }
  });
});

describe('Audience Hub Memberships & Dynamic Counts', () => {
  it('registers all 3 audience hubs in VERTICALS array', () => {
    const verticalIds = VERTICALS.map(v => v.id);
    expect(verticalIds).toEqual(['business', 'students', 'developers']);
  });

  it('computes accurate, non-zero dynamic tool counts for all 3 hubs', () => {
    const businessTools = getVerticalTools('business');
    const studentTools = getVerticalTools('students');
    const developerTools = getVerticalTools('developers');

    expect(businessTools.length).toBeGreaterThan(400);
    expect(studentTools.length).toBeGreaterThan(100);
    expect(developerTools.length).toBeGreaterThan(30);

    // Overlapping memberships mean sum of hub counts exceeds catalog count
    const totalHubSum = businessTools.length + studentTools.length + developerTools.length;
    expect(totalHubSum).toBeGreaterThan(TOOLS_CATALOG.length);
  });

  it('ensures every tool in a hub has that hub in its verticals array', () => {
    for (const tool of getVerticalTools('business')) {
      expect(tool.verticals).toContain('business');
    }
    for (const tool of getVerticalTools('students')) {
      expect(tool.verticals).toContain('students');
    }
    for (const tool of getVerticalTools('developers')) {
      expect(tool.verticals).toContain('developers');
    }
  });
});

describe('Dynamic Category Filtering within Hubs', () => {
  it('exposes all 14 canonical categories for "all" vertical view', () => {
    const categories = getCategoriesForVertical('all', TOOLS_CATALOG);
    // 1 "all" item + 14 categories = 15 pills
    expect(categories.length).toBe(15);
    expect(categories[0].id).toBe('all');
    expect(categories[0].count).toBe(511);

    const categoryIds = categories.slice(1).map(c => c.id);
    expect(categoryIds).toEqual(CANONICAL_CATEGORIES.map(c => c.id));
  });

  it('dynamically hides zero-tool categories from specialist hubs', () => {
    const businessCategories = getCategoriesForVertical('business', TOOLS_CATALOG);
    const studentCategories = getCategoriesForVertical('students', TOOLS_CATALOG);
    const devCategories = getCategoriesForVertical('developers', TOOLS_CATALOG);

    // Every returned category in a hub must have count > 0
    for (const cat of businessCategories.slice(1)) {
      expect(cat.count).toBeGreaterThan(0);
    }
    for (const cat of studentCategories.slice(1)) {
      expect(cat.count).toBeGreaterThan(0);
    }
    for (const cat of devCategories.slice(1)) {
      expect(cat.count).toBeGreaterThan(0);
    }

    // Specialist hubs should omit irrelevant categories
    const studentCatIds = new Set(studentCategories.map(c => c.id));
    expect(studentCatIds.has('real-estate')).toBe(false);
    expect(studentCatIds.has('documents')).toBe(false);
  });

  it('filters tools by category correctly and clears filter back to full vertical', () => {
    const businessTools = getVerticalTools('business');
    const financeTools = getCategoryTools(businessTools, 'finance');

    expect(financeTools.length).toBeGreaterThan(0);
    for (const tool of financeTools) {
      expect(tool.category).toBe('finance');
      expect(tool.verticals).toContain('business');
    }

    // Clearing filter with 'all' restores full list
    const restored = getCategoryTools(businessTools, 'all');
    expect(restored.length).toBe(businessTools.length);
  });
});
