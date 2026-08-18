export interface ECategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  seoDescription?: string;
  iconName?: string;
  displayOrder: number;
}

export const INITIAL_E_CATEGORIES: ECategoryItem[] = [
  {
    id: 'finance-accounting',
    name: 'Finance & Accounting',
    slug: 'finance-accounting',
    description: 'Financial ratios, bookkeeping standards, cash flow principles, profit margin calculations, and taxation fundamentals.',
    displayOrder: 1,
  },
  {
    id: 'business-management',
    name: 'Business & Management',
    slug: 'business-management',
    description: 'Corporate strategy, organizational frameworks, leadership methodologies, decision matrices, and risk management.',
    displayOrder: 2,
  },
  {
    id: 'marketing-sales',
    name: 'Marketing & Sales',
    slug: 'marketing-sales',
    description: 'Customer acquisition cost (CAC), lifetime value (LTV), conversion rates, campaign metrics, and sales funnel mechanics.',
    displayOrder: 3,
  },
  {
    id: 'economics',
    name: 'Economics',
    slug: 'economics',
    description: 'Microeconomics, macroeconomics, supply and demand dynamics, inflation metrics, opportunity cost, and market structures.',
    displayOrder: 4,
  },
  {
    id: 'operations-supply-chain',
    name: 'Operations & Supply Chain',
    slug: 'operations-supply-chain',
    description: 'Economic order quantity (EOQ), reorder points, safety stock, overall equipment effectiveness (OEE), takt time, and lean manufacturing.',
    displayOrder: 5,
  },
  {
    id: 'human-resources',
    name: 'Human Resources',
    slug: 'human-resources',
    description: 'Payroll tax estimation, paid time off (PTO) accruals, employee retention, salary conversions, and workforce planning.',
    displayOrder: 6,
  },
  {
    id: 'ecommerce',
    name: 'Ecommerce',
    slug: 'ecommerce',
    description: 'Platform transaction fee structures (Shopify, Stripe, PayPal, Etsy), inventory valuation, bundle pricing, and fulfillment operations.',
    displayOrder: 7,
  },
  {
    id: 'mathematics-statistics',
    name: 'Mathematics & Statistics',
    slug: 'mathematics-statistics',
    description: 'Algebraic equations, probability distributions, z-scores, hypothesis testing, confidence intervals, and descriptive statistics.',
    displayOrder: 8,
  },
  {
    id: 'productivity-work',
    name: 'Productivity & Work',
    slug: 'productivity-work',
    description: 'Time management frameworks, Pomodoro techniques, reading speed presentation metrics, meeting agendas, and workflow optimization.',
    displayOrder: 9,
  },
  {
    id: 'technology-data',
    name: 'Technology & Data',
    slug: 'technology-data',
    description: 'JSON, XML, YAML, JWT authentication tokens, UUID generation, regex syntax, SQL queries, and cryptographic hashing.',
    displayOrder: 10,
  },
  {
    id: 'law-compliance',
    name: 'Law & Compliance',
    slug: 'law-compliance',
    description: 'Non-disclosure agreements (NDAs), bills of sale, service contracts, commercial leases, and regulatory compliance standards.',
    displayOrder: 11,
  },
  {
    id: 'students-education',
    name: 'Students & Education',
    slug: 'students-education',
    description: 'GPA calculations, weighted grading scales, study schedules, academic readability metrics, and student financial planning.',
    displayOrder: 12,
  },
];
