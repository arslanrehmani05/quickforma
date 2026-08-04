export type ToolCategory = 'business' | 'finance' | 'text' | 'utilities';

export interface ToolMetadata {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  iconName: string;
  popular?: boolean;
  badge?: string;
  metaTitle: string;
  metaDescription: string;
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
