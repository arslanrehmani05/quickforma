import { VerticalId, ToolMetadata, FunctionalCategoryId } from '../types';

export interface CategoryItem {
  id: string;
  name: string;
  count?: number;
}

export interface CanonicalCategoryDefinition {
  id: FunctionalCategoryId;
  name: string;
  description: string;
}

export const CANONICAL_CATEGORIES: readonly CanonicalCategoryDefinition[] = [
  { id: 'finance', name: 'Business Finance & Accounting', description: 'Financial statements, accounting calculations, working capital, cash flow, valuation, and financial ratios' },
  { id: 'ecommerce', name: 'Ecommerce & Retail', description: 'Marketplace fees, payment processing, retail pricing, product profitability, and merchant economics' },
  { id: 'marketing', name: 'Sales & Growth Marketing', description: 'Customer acquisition, paid advertising, campaign performance, conversion, retention, and sales growth' },
  { id: 'hr', name: 'HR, Payroll & Compensation', description: 'Payroll, wages, compensation, benefits, employee calculations, and labor-cost analysis' },
  { id: 'operations', name: 'Operations, Logistics & Manufacturing', description: 'Inventory, production, supply chains, manufacturing, capacity, logistics, and industrial performance' },
  { id: 'real-estate', name: 'Real Estate & Property Finance', description: 'Mortgages, property investment, rental economics, real estate lending, and property underwriting' },
  { id: 'documents', name: 'Business & Legal Documents', description: 'Business forms, invoices, agreements, purchase orders, proposals, and document generation' },
  { id: 'academic', name: 'Education & Academic Tools', description: 'GPA, grading, academic planning, standardized testing, academic citations, and education tools' },
  { id: 'math-stats', name: 'Mathematics & Statistics', description: 'Pure mathematics, algebra, calculus, geometry, probability, and statistical analysis' },
  { id: 'science', name: 'Science & Engineering', description: 'Physics, chemistry, engineering, electronics, and applied scientific calculations' },
  { id: 'developer', name: 'Developer & Technical Utilities', description: 'Software-development tools, data formats, encoding, networking, and technical utilities' },
  { id: 'writing', name: 'Writing, Text & Content', description: 'Text transformation, readability, editorial utilities, and content analysis' },
  { id: 'productivity', name: 'Productivity & Planning', description: 'Scheduling, timers, task planning, decision frameworks, and workflow utilities' },
  { id: 'converters', name: 'Converters & Measurement', description: 'Unit conversion, physical measurements, date/time conversion, and general-purpose conversion' },
] as const;

export const BUSINESS_CATEGORIES: readonly CategoryItem[] = [
  { id: 'all', name: 'All Business Tools' },
  { id: 'finance', name: 'Business Finance & Accounting' },
  { id: 'ecommerce', name: 'Ecommerce & Retail' },
  { id: 'marketing', name: 'Sales & Growth Marketing' },
  { id: 'hr', name: 'HR, Payroll & Compensation' },
  { id: 'operations', name: 'Operations, Logistics & Manufacturing' },
  { id: 'real-estate', name: 'Real Estate & Property Finance' },
  { id: 'documents', name: 'Business & Legal Documents' },
  { id: 'math-stats', name: 'Mathematics & Statistics' },
  { id: 'developer', name: 'Developer & Technical Utilities' },
  { id: 'writing', name: 'Writing, Text & Content' },
  { id: 'productivity', name: 'Productivity & Planning' },
  { id: 'converters', name: 'Converters & Measurement' },
] as const;

export const STUDENT_CATEGORIES: readonly CategoryItem[] = [
  { id: 'all', name: 'All Student Tools' },
  { id: 'academic', name: 'Education & Academic Tools' },
  { id: 'math-stats', name: 'Mathematics & Statistics' },
  { id: 'science', name: 'Science & Engineering' },
  { id: 'writing', name: 'Writing, Text & Content' },
  { id: 'converters', name: 'Converters & Measurement' },
  { id: 'productivity', name: 'Productivity & Planning' },
] as const;

export const DEVELOPER_CATEGORIES: readonly CategoryItem[] = [
  { id: 'all', name: 'All Developer Tools' },
  { id: 'developer', name: 'Developer & Technical Utilities' },
  { id: 'math-stats', name: 'Mathematics & Statistics' },
  { id: 'converters', name: 'Converters & Measurement' },
  { id: 'science', name: 'Science & Engineering' },
  { id: 'writing', name: 'Writing, Text & Content' },
] as const;

export const UNIVERSAL_CATEGORIES: readonly CategoryItem[] = [
  { id: 'all', name: 'All Utilities' },
  ...CANONICAL_CATEGORIES.map(c => ({ id: c.id, name: c.name })),
] as const;

export const getCategoriesForVertical = (
  vertical: 'all' | VerticalId,
  tools?: ToolMetadata[]
): readonly CategoryItem[] => {
  if (!tools || tools.length === 0) {
    if (vertical === 'business') return BUSINESS_CATEGORIES;
    if (vertical === 'students') return STUDENT_CATEGORIES;
    if (vertical === 'developers') return DEVELOPER_CATEGORIES;
    return UNIVERSAL_CATEGORIES;
  }

  // Filter tools belonging to this vertical audience
  const relevantTools = vertical === 'all'
    ? tools
    : tools.filter(t => t.verticals.includes(vertical));

  // Count primary category assignments
  const categoryCounts: Record<string, number> = {};
  for (const tool of relevantTools) {
    categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
  }

  const allLabel =
    vertical === 'business'
      ? 'All Business Tools'
      : vertical === 'students'
      ? 'All Student Tools'
      : vertical === 'developers'
      ? 'All Developer Tools'
      : 'All Utilities';

  const items: CategoryItem[] = [
    { id: 'all', name: allLabel, count: relevantTools.length }
  ];

  for (const cat of CANONICAL_CATEGORIES) {
    const count = categoryCounts[cat.id] || 0;
    // Hide categories with zero matching tools in hub view unless vertical is 'all'
    if (count > 0 || vertical === 'all') {
      items.push({
        id: cat.id,
        name: cat.name,
        count
      });
    }
  }

  return items;
};
