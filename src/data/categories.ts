import { VerticalId, ToolMetadata, FunctionalCategoryId, FunctionalSubcategoryId } from '../types';

export interface CategoryItem {
  id: string;
  name: string;
  count?: number;
}

export interface SubcategoryItem {
  id: string;
  name: string;
  category: string;
  count?: number;
}

export interface CanonicalCategoryDefinition {
  id: FunctionalCategoryId;
  name: string;
  description: string;
}

export interface CanonicalSubcategoryDefinition {
  id: FunctionalSubcategoryId;
  name: string;
  category: FunctionalCategoryId;
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

export const CANONICAL_SUBCATEGORIES: readonly CanonicalSubcategoryDefinition[] = [
  // 1. Finance
  { id: 'finance:profitability-margins', name: 'Profitability & Margins', category: 'finance', description: 'Gross profit, contribution margins, break-even point, COGS, and markups' },
  { id: 'finance:cash-flow-budgeting', name: 'Cash Flow & Working Capital', category: 'finance', description: 'Runway, burn rate, working capital, cash conversion cycle, and liquidity' },
  { id: 'finance:valuation-investment', name: 'Investment & Valuation', category: 'finance', description: 'DCF, NPV, IRR, WACC, business valuation multiples, and CapEx' },
  { id: 'finance:financial-ratios', name: 'Financial Ratios & Analysis', category: 'finance', description: 'EBITDA, DuPont analysis, CAGR, leverage, and liquidity ratios' },
  { id: 'finance:loans-debt', name: 'Loans, Debt & Payoff', category: 'finance', description: 'Amortization, loan payoff, debt snowball/avalanche, and SBA loans' },
  { id: 'finance:taxes-accounting', name: 'Taxes & Accounting', category: 'finance', description: 'Asset depreciation, sales tax, accounts receivable/payable, and retained earnings' },

  // 2. Ecommerce
  { id: 'ecommerce:marketplace-fees', name: 'Marketplace & Platform Fees', category: 'ecommerce', description: 'Shopify, Stripe, PayPal, Etsy, Amazon FBA, eBay, and Walmart seller fees' },
  { id: 'ecommerce:pricing-profitability', name: 'Retail Pricing & Margins', category: 'ecommerce', description: 'Product bundles, dropshipping margins, MAP pricing, and unit economics' },
  { id: 'ecommerce:inventory-fulfillment', name: 'Inventory & Fulfillment', category: 'ecommerce', description: 'Reorder points, GMROI, inventory velocity, and fulfillment costs' },
  { id: 'ecommerce:discounts-returns', name: 'Discounts & Returns', category: 'ecommerce', description: 'Free shipping thresholds, return loss, restocking fees, and markdowns' },

  // 3. Marketing
  { id: 'marketing:advertising-media', name: 'Paid Ads & Media Spend', category: 'marketing', description: 'CPM, CPC, CPL, ROAS, Google Shopping, and ad spend calculations' },
  { id: 'marketing:customer-retention', name: 'Customer Lifetime & Retention', category: 'marketing', description: 'Customer LTV, CAC, CAC payback, churn rate impact, and NPS' },
  { id: 'marketing:funnel-conversion', name: 'Funnel & Conversion Analytics', category: 'marketing', description: 'CRO revenue lift, MQL-to-SQL pipeline, and conversion rates' },
  { id: 'marketing:seo-analytics', name: 'SEO & Marketing Analytics', category: 'marketing', description: 'Click-through rates (CTR), headline quality, and search analytics' },

  // 4. HR
  { id: 'hr:payroll-taxes', name: 'Payroll & Paycheck Taxes', category: 'hr', description: 'US gross-to-net paychecks, FICA, FUTA, SUTA, and bonus tax withholding' },
  { id: 'hr:wages-salary', name: 'Wages & Salary Conversion', category: 'hr', description: 'Hourly to salary converter, minimum wage, and freelance hourly rates' },
  { id: 'hr:overtime-shifts', name: 'Overtime, Shifts & Hours', category: 'hr', description: 'FLSA 1.5x overtime, time card hours, and shift differentials' },
  { id: 'hr:benefits-leave', name: 'Benefits, Leave & Retirement', category: 'hr', description: '401(k) match, PTO accrual, FMLA leave, and remote work stipends' },
  { id: 'hr:compensation-retention', name: 'Compensation & Retention', category: 'hr', description: 'Total compensation, replacement costs, retention rates, and pay equity' },

  // 5. Operations
  { id: 'operations:production-capacity', name: 'Production & Capacity', category: 'operations', description: 'OEE, machine capacity, takt time, cycle time, and line balancing' },
  { id: 'operations:inventory-supply-chain', name: 'Supply Chain & Inventory', category: 'operations', description: 'EOQ, safety stock, WIP inventory, supplier OTIF, and EPQ batch sizing' },
  { id: 'operations:quality-continuous-improvement', name: 'Quality & Six Sigma', category: 'operations', description: 'First pass yield (FPY), Six Sigma Cp/Cpk, defect PPM, and scrap rates' },
  { id: 'operations:maintenance-facilities', name: 'Maintenance & Facilities', category: 'operations', description: 'MTBF, MTTR, TPM planned maintenance, and equipment replacement' },
  { id: 'operations:logistics-freight', name: 'Freight & Shipping Logistics', category: 'operations', description: 'Volumetric weight, shipping containers, and pallet warehouse storage' },

  // 6. Real Estate
  { id: 'real-estate:mortgage-financing', name: 'Mortgages & Financing', category: 'real-estate', description: 'Mortgage loan payments, amortization, DTI ratio, and refinance break-even' },
  { id: 'real-estate:investment-returns', name: 'Investment ROI & Cash Flow', category: 'real-estate', description: 'Cap rates, rental property cash flow, BRRRR strategy, and flip profits' },
  { id: 'real-estate:commercial-underwriting', name: 'Commercial Underwriting', category: 'real-estate', description: 'DSCR mortgages, commercial NNN leases, and lender debt yields' },
  { id: 'real-estate:property-management', name: 'Property Operations & ADR', category: 'real-estate', description: 'Short-term rental ADR, property management fees, and vacancy allowances' },

  // 7. Documents
  { id: 'documents:invoices-billing', name: 'Invoices, Receipts & POs', category: 'documents', description: 'PDF invoices, receipts, purchase orders, packing slips, and bills of lading' },
  { id: 'documents:contracts-agreements', name: 'Contracts & Legal Agreements', category: 'documents', description: 'NDAs, freelance contracts, bills of sale, and contractor agreements' },
  { id: 'documents:corporate-policies', name: 'Scopes, Policies & Minutes', category: 'documents', description: 'Statements of work (SOW), privacy notices, terms of service, and minutes' },

  // 8. Academic
  { id: 'academic:gpa-grading', name: 'GPA & Grade Calculators', category: 'academic', description: 'High school & college GPA, semester weighting, and curved grading' },
  { id: 'academic:exam-test-prep', name: 'Exams & Standardized Tests', category: 'academic', description: 'SAT/ACT concordance, GMAT scores, GED percentiles, and CLEP credits' },
  { id: 'academic:planning-records', name: 'Academic Planning & Credits', category: 'academic', description: 'Class rank percentiles, academic standing, and degree completion' },
  { id: 'academic:study-research', name: 'Study & Research Utilities', category: 'academic', description: 'Cornell notes sheets, thesis generators, flashcard spaced repetition' },

  // 9. Math & Stats
  { id: 'math-stats:basic-arithmetic', name: 'Arithmetic & Percentages', category: 'math-stats', description: 'Percentages, fractions, ratios, proportions, and averages' },
  { id: 'math-stats:algebra-calculus', name: 'Algebra & Calculus', category: 'math-stats', description: 'Linear equations, quadratic formula, derivatives, and integration' },
  { id: 'math-stats:probability-distributions', name: 'Probability & Distributions', category: 'math-stats', description: 'Probability, permutations, binomial, Poisson, and Bayes theorem' },
  { id: 'math-stats:inferential-statistics', name: 'Inferential Statistics', category: 'math-stats', description: 'Z-scores, standard deviation, ANOVA, t-tests, and linear regression' },
  { id: 'math-stats:geometry-conics', name: 'Geometry & Conics', category: 'math-stats', description: 'Area, volume, trigonometry, distance, and conic sections' },

  // 10. Science
  { id: 'science:chemistry-solutions', name: 'Chemistry & Solutions', category: 'science', description: 'Moles, molarity, dilution, pH, buffers, and solution concentrations' },
  { id: 'science:thermodynamics-equilibrium', name: 'Thermodynamics & Reactions', category: 'science', description: 'Gas laws (PV=nRT), Gibbs free energy, activation energy, and equilibrium' },
  { id: 'science:classical-mechanics', name: 'Classical Mechanics & Motion', category: 'science', description: 'Kinematics SUVAT, force, friction, work, energy, and gravitation' },
  { id: 'science:physics-waves-fields', name: 'Circuits, Waves & Fields', category: 'science', description: 'Ohms law, circuit RC constants, wave frequency, and Doppler shifts' },

  // 11. Developer
  { id: 'developer:data-formats', name: 'Data Formats (JSON, XML, SQL)', category: 'developer', description: 'JSON formatting, XML formatting, YAML validation, and SQL queries' },
  { id: 'developer:encoders-decoders', name: 'Encoders & Decoders', category: 'developer', description: 'Base64, URL encoding, HTML entities, and number base conversions' },
  { id: 'developer:cryptography-security', name: 'Cryptography & Hashing', category: 'developer', description: 'SHA hashes, HMAC, UUIDs, and secure password generation' },
  { id: 'developer:code-formatting', name: 'CSS, Formatting & Minifiers', category: 'developer', description: 'CSS glassmorphism, box shadows, gradients, and HTML/CSS minifiers' },
  { id: 'developer:networking-devops', name: 'Networking, CIDR & DevOps', category: 'developer', description: 'Subnet masks, CIDR blocks, cron expression builder, and HTTP status' },

  // 12. Writing
  { id: 'writing:text-analysis', name: 'Readability & Text Analysis', category: 'writing', description: 'Word counters, readability analyzers, and Flesch-Kincaid ease scores' },
  { id: 'writing:text-transformation', name: 'Case & Text Cleaners', category: 'writing', description: 'Case conversion, line deduplication, text sanitizers, and formatting' },
  { id: 'writing:editorial-utilities', name: 'Diffs & Editorial Tools', category: 'writing', description: 'Text diff compare, lorem ipsum generators, and script duration timing' },
  { id: 'writing:content-optimization', name: 'SEO Snippets & Meta Tags', category: 'writing', description: 'SERP previews, meta tag generators, and alt text character checkers' },

  // 13. Productivity
  { id: 'productivity:time-management', name: 'Focus Timers & Intervals', category: 'productivity', description: 'Pomodoro focus timer and interval trackers' },
  { id: 'productivity:task-performance', name: 'Typing & Performance Tests', category: 'productivity', description: 'Words per minute typing speed and keyboard accuracy' },

  // 14. Converters
  { id: 'converters:measurement-units', name: 'Unit & Metric Measurements', category: 'converters', description: 'Multi-unit conversion, scientific notation, and significant figures' },
  { id: 'converters:date-time', name: 'Dates & Time Zones', category: 'converters', description: 'Days between dates and global time zone conversion' },
  { id: 'converters:media-digital', name: 'Media, Color & File Formats', category: 'converters', description: 'Aspect ratios, color picker/HEX/RGB, image resizer, and PDF counter' },
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
      : vertical === 'ecommerce'
      ? 'All Ecommerce Tools'
      : vertical === 'marketing'
      ? 'All Marketing Tools'
      : vertical === 'operations'
      ? 'All Operations Tools'
      : vertical === 'students'
      ? 'All Student Tools'
      : vertical === 'science'
      ? 'All Science & STEM Tools'
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

export const getSubcategoriesForCategory = (
  categoryId: string,
  tools?: ToolMetadata[],
  vertical: 'all' | VerticalId = 'all'
): readonly SubcategoryItem[] => {
  if (categoryId === 'all') {
    return [];
  }

  // Filter tools by vertical and category
  const relevantTools = (tools || []).filter(t => {
    const matchesVertical = vertical === 'all' || t.verticals.includes(vertical);
    const matchesCategory = t.category === categoryId;
    return matchesVertical && matchesCategory;
  });

  // Count primary subcategory assignments
  const subcategoryCounts: Record<string, number> = {};
  for (const tool of relevantTools) {
    if (tool.subcategory) {
      subcategoryCounts[tool.subcategory] = (subcategoryCounts[tool.subcategory] || 0) + 1;
    }
  }

  // Find all subcategories belonging to this category
  const subcategoriesForCat = CANONICAL_SUBCATEGORIES.filter(
    s => s.category === categoryId
  );

  const items: SubcategoryItem[] = [
    { id: 'all', name: 'All Subcategories', category: categoryId, count: relevantTools.length }
  ];

  for (const sub of subcategoriesForCat) {
    const count = subcategoryCounts[sub.id] || 0;
    if (count > 0 || vertical === 'all') {
      items.push({
        id: sub.id,
        name: sub.name,
        category: sub.category,
        count
      });
    }
  }

  return items;
};
