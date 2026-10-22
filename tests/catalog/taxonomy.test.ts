import { describe, it, expect } from 'vitest';
import { TOOLS_CATALOG, getVerticalTools, getCategoryTools, VERTICALS } from '../../src/data/toolsCatalog';
import { CANONICAL_CATEGORIES, CANONICAL_SUBCATEGORIES, getCategoriesForVertical, getSubcategoriesForCategory } from '../../src/data/categories';
import { FunctionalCategoryId, FunctionalSubcategoryId, VerticalId } from '../../src/types';

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

  it('assigns exactly one valid primary subcategory to every tool with valid parent-child relationship', () => {
    const validSubcategories = new Map<string, { name: string; category: string }>();
    for (const sub of CANONICAL_SUBCATEGORIES) {
      validSubcategories.set(sub.id, { name: sub.name, category: sub.category });
    }

    expect(validSubcategories.size).toBe(CANONICAL_SUBCATEGORIES.length);
    expect(validSubcategories.size).toBe(58);

    for (const tool of TOOLS_CATALOG) {
      expect(tool.subcategory).toBeDefined();
      expect(validSubcategories.has(tool.subcategory as string)).toBe(true);

      const subDef = validSubcategories.get(tool.subcategory as string);
      expect(subDef).toBeDefined();
      // Ensure parent-child integrity: subcategory's declared parent must match tool.category
      expect(subDef?.category).toBe(tool.category);
      expect(tool.subcategoryLabel).toBe(subDef?.name);
    }
  });

  it('populates all 14 canonical functional categories with at least 1 tool (no empty categories)', () => {
    const counts: Record<string, number> = {};
    for (const tool of TOOLS_CATALOG) {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    }

    for (const cat of CANONICAL_CATEGORIES) {
      expect(counts[cat.id]).toBeDefined();
      expect(counts[cat.id]).toBeGreaterThan(0);
    }
  });

  it('populates all 58 canonical subcategories with at least 1 tool (no empty subcategories)', () => {
    const counts: Record<string, number> = {};
    for (const tool of TOOLS_CATALOG) {
      if (tool.subcategory) {
        counts[tool.subcategory] = (counts[tool.subcategory] || 0) + 1;
      }
    }

    for (const sub of CANONICAL_SUBCATEGORIES) {
      expect(counts[sub.id]).toBeDefined();
      expect(counts[sub.id]).toBeGreaterThan(0);
    }
  });

  it('assigns valid vertical audiences to every tool without orphans', () => {
    const validVerticals = new Set<VerticalId>([
      'business',
      'ecommerce',
      'marketing',
      'operations',
      'students',
      'science',
      'developers'
    ]);

    for (const tool of TOOLS_CATALOG) {
      expect(tool.verticals.length).toBeGreaterThan(0);
      for (const v of tool.verticals) {
        expect(validVerticals.has(v)).toBe(true);
      }
    }
  });
});

describe('Audience Hub Memberships & Dynamic Counts', () => {
  it('registers all 7 audience hubs in VERTICALS array', () => {
    const verticalIds = VERTICALS.map(v => v.id);
    expect(verticalIds).toEqual([
      'business',
      'ecommerce',
      'marketing',
      'operations',
      'students',
      'science',
      'developers'
    ]);
  });

  it('computes accurate, non-zero dynamic tool counts for all 7 hubs', () => {
    const businessTools = getVerticalTools('business');
    const ecommerceTools = getVerticalTools('ecommerce');
    const marketingTools = getVerticalTools('marketing');
    const operationsTools = getVerticalTools('operations');
    const studentTools = getVerticalTools('students');
    const scienceTools = getVerticalTools('science');
    const developerTools = getVerticalTools('developers');

    expect(businessTools.length).toBeGreaterThanOrEqual(300);
    expect(ecommerceTools.length).toBeGreaterThanOrEqual(30);
    expect(marketingTools.length).toBeGreaterThanOrEqual(30);
    expect(operationsTools.length).toBeGreaterThanOrEqual(30);
    expect(studentTools.length).toBeGreaterThanOrEqual(100);
    expect(scienceTools.length).toBeGreaterThanOrEqual(50);
    expect(developerTools.length).toBeGreaterThanOrEqual(30);

    // Overlapping memberships mean sum of hub counts exceeds catalog count
    const totalHubSum =
      businessTools.length +
      ecommerceTools.length +
      marketingTools.length +
      operationsTools.length +
      studentTools.length +
      scienceTools.length +
      developerTools.length;
    expect(totalHubSum).toBeGreaterThan(TOOLS_CATALOG.length);
  });

  it('ensures every tool in a hub has that hub in its verticals array', () => {
    const hubIds: VerticalId[] = ['business', 'ecommerce', 'marketing', 'operations', 'students', 'science', 'developers'];
    for (const hubId of hubIds) {
      for (const tool of getVerticalTools(hubId)) {
        expect(tool.verticals).toContain(hubId);
      }
    }
  });
});

describe('Dynamic Category and Subcategory Filtering within Hubs', () => {
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

  it('correctly returns task-level subcategories for a given category with dynamic counts', () => {
    const financeSubcats = getSubcategoriesForCategory('finance', TOOLS_CATALOG, 'all');
    // First pill is "All Subcategories"
    expect(financeSubcats[0].id).toBe('all');
    expect(financeSubcats[0].count).toBe(
      TOOLS_CATALOG.filter(t => t.category === 'finance').length
    );

    // Sum of individual subcategories equals total tools in category
    const subcatSum = financeSubcats
      .slice(1)
      .reduce((acc, curr) => acc + (curr.count || 0), 0);
    expect(subcatSum).toBe(financeSubcats[0].count);
  });

  it('returns empty array when getSubcategoriesForCategory is called with "all"', () => {
    const allSubcats = getSubcategoriesForCategory('all', TOOLS_CATALOG, 'all');
    expect(allSubcats).toEqual([]);
  });

  it('filters tools by subcategory with zero cross-contamination', () => {
    const targetSubcat = 'finance:profitability-margins';
    const matchingTools = TOOLS_CATALOG.filter(t => t.subcategory === targetSubcat);

    expect(matchingTools.length).toBeGreaterThan(0);
    for (const tool of matchingTools) {
      expect(tool.category).toBe('finance');
      expect(tool.subcategory).toBe(targetSubcat);
    }
  });
});
