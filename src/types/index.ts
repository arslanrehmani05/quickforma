export type VerticalId = 'business' | 'students';

export type ToolCategory = 
  | 'finance'
  | 'business'
  | 'converters'
  | 'developer'
  | 'content'
  | 'productivity'
  | 'ecommerce'
  | 'operations'
  | 'hr'
  | 'marketing'
  | 'healthcare'
  | 'real-estate'
  | string;

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolMetadata {
  id: string;
  name: string;
  verticals: VerticalId[];
  category: string;
  categoryLabel: string;
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
