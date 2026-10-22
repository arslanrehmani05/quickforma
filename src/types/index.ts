export type VerticalId =
  | 'business'
  | 'ecommerce'
  | 'marketing'
  | 'operations'
  | 'students'
  | 'science'
  | 'developers';

export type FunctionalCategoryId =
  | 'finance'
  | 'ecommerce'
  | 'marketing'
  | 'hr'
  | 'operations'
  | 'real-estate'
  | 'documents'
  | 'academic'
  | 'math-stats'
  | 'science'
  | 'developer'
  | 'writing'
  | 'productivity'
  | 'converters';

export type ToolCategory = FunctionalCategoryId | string;

export type FunctionalSubcategoryId =
  // Finance
  | 'finance:profitability-margins'
  | 'finance:cash-flow-budgeting'
  | 'finance:valuation-investment'
  | 'finance:financial-ratios'
  | 'finance:loans-debt'
  | 'finance:taxes-accounting'
  // Ecommerce
  | 'ecommerce:marketplace-fees'
  | 'ecommerce:pricing-profitability'
  | 'ecommerce:inventory-fulfillment'
  | 'ecommerce:discounts-returns'
  // Marketing
  | 'marketing:advertising-media'
  | 'marketing:customer-retention'
  | 'marketing:funnel-conversion'
  | 'marketing:seo-analytics'
  // HR
  | 'hr:payroll-taxes'
  | 'hr:wages-salary'
  | 'hr:overtime-shifts'
  | 'hr:benefits-leave'
  | 'hr:compensation-retention'
  // Operations
  | 'operations:production-capacity'
  | 'operations:inventory-supply-chain'
  | 'operations:quality-continuous-improvement'
  | 'operations:maintenance-facilities'
  | 'operations:logistics-freight'
  // Real Estate
  | 'real-estate:mortgage-financing'
  | 'real-estate:investment-returns'
  | 'real-estate:commercial-underwriting'
  | 'real-estate:property-management'
  // Documents
  | 'documents:invoices-billing'
  | 'documents:contracts-agreements'
  | 'documents:corporate-policies'
  // Academic
  | 'academic:gpa-grading'
  | 'academic:exam-test-prep'
  | 'academic:planning-records'
  | 'academic:study-research'
  // Math & Stats
  | 'math-stats:basic-arithmetic'
  | 'math-stats:algebra-calculus'
  | 'math-stats:probability-distributions'
  | 'math-stats:inferential-statistics'
  | 'math-stats:geometry-conics'
  // Science
  | 'science:chemistry-solutions'
  | 'science:thermodynamics-equilibrium'
  | 'science:classical-mechanics'
  | 'science:physics-waves-fields'
  // Developer
  | 'developer:data-formats'
  | 'developer:encoders-decoders'
  | 'developer:cryptography-security'
  | 'developer:code-formatting'
  | 'developer:networking-devops'
  // Writing
  | 'writing:text-analysis'
  | 'writing:text-transformation'
  | 'writing:editorial-utilities'
  | 'writing:content-optimization'
  // Productivity
  | 'productivity:time-management'
  | 'productivity:task-performance'
  // Converters
  | 'converters:measurement-units'
  | 'converters:date-time'
  | 'converters:media-digital';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolMetadata {
  id: string;
  name: string;
  verticals: VerticalId[];
  category: FunctionalCategoryId | string;
  categoryLabel: string;
  subcategory?: FunctionalSubcategoryId | string;
  subcategoryLabel?: string;
  secondaryCategories?: (FunctionalCategoryId | string)[];
  description: string;
  iconName: string;
  popular?: boolean;
  badge?: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  faqs?: FAQItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  senderName: string;
  senderEmail: string;
  senderAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: InvoiceItem[];
  taxPercent: number;
  discountPercent: number;
  currency: string;
  notes: string;
  terms: string;
  logoUrl?: string;
}

export type ActiveView = 'home' | 'privacy' | 'terms' | 'about' | 'contact' | string;
