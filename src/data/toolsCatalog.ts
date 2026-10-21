import { ToolMetadata, VerticalId } from '../types';
import { CANONICAL_CATEGORIES } from './categories';

export const VERTICALS = [
  { id: 'business', name: 'Business Hub', description: 'Financial, legal, ecommerce, operations, HR & marketing tools' },
  { id: 'students', name: 'Students Hub', description: 'GPA, math, statistics, science, writing & academic utilities' },
  { id: 'developers', name: 'Developer Hub', description: 'JSON, XML, regex, code, network, hashing & technical utilities' },
] as const;

export const getVerticalTools = (vertical: VerticalId): ToolMetadata[] => {
  return TOOLS_CATALOG.filter(t => t.verticals.includes(vertical));
};

export const getCategoryTools = (tools: ToolMetadata[], categorySlug: string): ToolMetadata[] => {
  if (!categorySlug || categorySlug === 'all') return tools;
  return tools.filter(t => t.category === categorySlug);
};

export const CATEGORIES = [
  { id: 'all', name: 'All Utilities' },
  ...CANONICAL_CATEGORIES.map(c => ({ id: c.id, name: c.name }))
] as const;

export const TOOLS_CATALOG: ToolMetadata[] = [
  {
    "id": "freelance-hourly-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Freelancer Hourly Rate Calculator",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Determine what hourly rate to charge based on desired annual income, expenses, and billable hours.",
    "iconName": "Calculator",
    "popular": true,
    "keywords": [
      "freelance rate calculator",
      "hourly rate",
      "consultant pricing",
      "billable rate"
    ],
    "metaTitle": "Freelance Hourly Rate Calculator \u2014 QuickForma",
    "metaDescription": "Calculate the target hourly rate required to hit your income goals as a freelancer or consultant."
  },
  {
    "id": "break-even-calculator",
    "verticals": [
      "business"
    ],
    "name": "Break-Even Point Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate units and revenue needed to break even from fixed and variable costs.",
    "iconName": "TrendingUp",
    "keywords": [
      "break even calculator",
      "break even point",
      "fixed costs",
      "margin",
      "business breakeven"
    ],
    "metaTitle": "Break-Even Point Calculator \u2014 QuickForma",
    "metaDescription": "Find your break-even point in units and revenue instantly."
  },
  {
    "id": "payroll-tax-estimator",
    "verticals": [
      "business"
    ],
    "name": "Payroll Tax Estimator (US)",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Estimate federal income tax withholding, Social Security, Medicare, and net paycheck amount.",
    "iconName": "Receipt",
    "keywords": [
      "payroll tax estimator",
      "paycheck calculator",
      "net pay",
      "tax withholding"
    ],
    "metaTitle": "US Payroll Tax & Paycheck Estimator \u2014 QuickForma",
    "metaDescription": "Estimate federal payroll tax withholding and net take-home pay."
  },
  {
    "id": "roi-calculator",
    "verticals": [
      "business"
    ],
    "name": "ROI & Return Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate Return on Investment (ROI) percentage and annualized rate of return.",
    "iconName": "PieChart",
    "popular": true,
    "keywords": [
      "roi calculator",
      "return on investment",
      "investment return",
      "annualized return"
    ],
    "metaTitle": "ROI Calculator \u2014 Calculate Return on Investment \u2014 QuickForma",
    "metaDescription": "Calculate ROI percentage and annualized returns instantly."
  },
  {
    "id": "mortgage-loan-calculator",
    "verticals": [
      "business"
    ],
    "name": "Loan & Mortgage Calculator",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate monthly payments, total interest, and principal payoff for mortgages and loans.",
    "iconName": "Building",
    "keywords": [
      "mortgage calculator",
      "loan payment calculator",
      "interest payoff",
      "home loan"
    ],
    "metaTitle": "Mortgage & Loan Payment Calculator \u2014 QuickForma",
    "metaDescription": "Calculate monthly mortgage and loan payments with principal and interest breakdowns."
  },
  {
    "id": "markup-margin-calculator",
    "verticals": [
      "business"
    ],
    "name": "Markup vs Margin Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Convert between profit margin percentage, markup percentage, cost, and selling price.",
    "iconName": "Percent",
    "keywords": [
      "margin calculator",
      "markup calculator",
      "profit margin",
      "retail markup"
    ],
    "metaTitle": "Profit Margin & Markup Calculator \u2014 QuickForma",
    "metaDescription": "Calculate profit margin, markup percentage, cost, and retail price instantly."
  },
  {
    "id": "salary-hourly-converter",
    "verticals": [
      "business"
    ],
    "name": "Salary to Hourly Converter",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Convert annual salary into equivalent hourly, daily, weekly, and monthly rates.",
    "iconName": "Scale",
    "keywords": [
      "salary to hourly",
      "hourly to salary",
      "pay converter",
      "annual income rate"
    ],
    "metaTitle": "Salary to Hourly Rate Converter \u2014 QuickForma",
    "metaDescription": "Convert annual salary to hourly, weekly, and monthly pay rates."
  },
  {
    "id": "sales-tax-calculator",
    "verticals": [
      "business"
    ],
    "name": "Sales Tax Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate subtotal, sales tax amount, and total price with custom or preset state rates.",
    "iconName": "Receipt",
    "keywords": [
      "sales tax calculator",
      "tax amount",
      "state tax",
      "total price tax"
    ],
    "metaTitle": "Sales Tax Calculator \u2014 QuickForma",
    "metaDescription": "Calculate sales tax and total price with custom tax percentages."
  },
  {
    "id": "discount-calculator",
    "verticals": [
      "business"
    ],
    "name": "Discount & Savings Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate final sale price and total money saved from percentage-off discounts.",
    "iconName": "Tag",
    "keywords": [
      "discount calculator",
      "percentage off",
      "sale price",
      "savings calculator"
    ],
    "metaTitle": "Discount & Percentage Off Calculator \u2014 QuickForma",
    "metaDescription": "Calculate sale prices and total savings from percentage discounts."
  },
  {
    "id": "compound-interest-calculator",
    "verticals": [
      "business"
    ],
    "name": "Compound Interest Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate future wealth growth from initial deposit, recurring contributions, and interest.",
    "iconName": "TrendingUp",
    "popular": true,
    "keywords": [
      "compound interest calculator",
      "future value",
      "investment growth",
      "interest compounding"
    ],
    "metaTitle": "Compound Interest Calculator \u2014 QuickForma",
    "metaDescription": "Calculate compound interest growth and investment value over time."
  },
  {
    "id": "loan-payoff-calculator",
    "verticals": [
      "business"
    ],
    "name": "Loan Payoff & Extra Payment Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate how making extra monthly payments shortens your loan term and saves interest.",
    "iconName": "Calculator",
    "keywords": [
      "loan payoff calculator",
      "extra payment",
      "early payoff",
      "interest savings"
    ],
    "metaTitle": "Loan Payoff & Extra Payment Calculator \u2014 QuickForma",
    "metaDescription": "Calculate how extra monthly payments reduce loan payoff time and save interest."
  },
  {
    "id": "cpm-ad-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "CPM & Ad Cost Calculator",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate Cost Per Mille (CPM), total ad campaign budget, or required ad impressions.",
    "iconName": "PieChart",
    "keywords": [
      "cpm calculator",
      "ad cost calculator",
      "cost per mille",
      "ad impressions"
    ],
    "metaTitle": "CPM & Ad Cost Calculator \u2014 QuickForma",
    "metaDescription": "Calculate CPM, total advertising budget, and required impressions."
  },
  {
    "id": "customer-ltv-calculator",
    "verticals": [
      "business"
    ],
    "name": "Customer Lifetime Value (LTV) Calculator",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate Customer Lifetime Value (LTV) based on purchase value, frequency, and lifespan.",
    "iconName": "Users",
    "keywords": [
      "ltv calculator",
      "customer lifetime value",
      "clv",
      "saas metric"
    ],
    "metaTitle": "Customer Lifetime Value (LTV) Calculator \u2014 QuickForma",
    "metaDescription": "Calculate Customer Lifetime Value (LTV) and average customer worth."
  },
  {
    "id": "invoice-generator",
    "verticals": [
      "business"
    ],
    "name": "PDF Invoice Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Generate, print, and download professional PDF invoices with logo, taxes, and discounts.",
    "iconName": "FileText",
    "popular": true,
    "badge": "Popular",
    "keywords": [
      "free invoice generator",
      "pdf invoice builder",
      "create invoice",
      "freelance invoice"
    ],
    "metaTitle": "Free PDF Invoice Generator \u2014 QuickForma",
    "metaDescription": "Generate clean PDF invoices with logo, tax, and discount support. 100% free and client-side."
  },
  {
    "id": "receipt-generator",
    "verticals": [
      "business"
    ],
    "name": "Receipt Maker",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Create itemized payment receipts for sales, services, and transactions with instant PDF download.",
    "iconName": "Receipt",
    "popular": true,
    "keywords": [
      "receipt generator",
      "receipt maker",
      "payment receipt",
      "sales receipt pdf"
    ],
    "metaTitle": "Free Sales Receipt Generator \u2014 QuickForma",
    "metaDescription": "Create clean, downloadable payment receipts for business transactions."
  },
  {
    "id": "nda-template-generator",
    "verticals": [
      "business"
    ],
    "name": "Simple NDA Agreement Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Generate mutual or one-way Non-Disclosure Agreement (NDA) legal templates.",
    "iconName": "FileCheck",
    "keywords": [
      "nda generator",
      "free nda template",
      "non disclosure agreement",
      "legal template"
    ],
    "metaTitle": "Free NDA Template Generator \u2014 QuickForma",
    "metaDescription": "Generate mutual or one-way Non-Disclosure Agreements for instant download."
  },
  {
    "id": "bill-of-sale-generator",
    "verticals": [
      "business"
    ],
    "name": "Bill of Sale Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Create legal bill of sale documents for vehicles, equipment, and personal property sales.",
    "iconName": "FileText",
    "keywords": [
      "bill of sale generator",
      "vehicle bill of sale",
      "equipment bill of sale",
      "sales agreement"
    ],
    "metaTitle": "Free Bill of Sale Generator \u2014 QuickForma",
    "metaDescription": "Create printable Bill of Sale documents for vehicle and property sales."
  },
  {
    "id": "freelance-contract-generator",
    "verticals": [
      "business"
    ],
    "name": "Freelance Agreement Builder",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Build simple freelance work agreements defining scope, payment terms, and deadlines.",
    "iconName": "Briefcase",
    "keywords": [
      "freelance contract template",
      "client agreement",
      "work contract",
      "freelance agreement"
    ],
    "metaTitle": "Free Freelance Contract Generator \u2014 QuickForma",
    "metaDescription": "Build clean freelance client agreements and scope contracts."
  },
  {
    "id": "meeting-minutes-generator",
    "verticals": [
      "business"
    ],
    "name": "Meeting Minutes Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Format corporate meeting notes, attendee lists, agendas, and action items into clean documents.",
    "iconName": "FileText",
    "keywords": [
      "meeting minutes generator",
      "meeting notes template",
      "action items",
      "board minutes"
    ],
    "metaTitle": "Meeting Minutes Generator \u2014 QuickForma",
    "metaDescription": "Format structured corporate meeting minutes and action items."
  },
  {
    "id": "rent-receipt-generator",
    "verticals": [
      "business"
    ],
    "name": "Rent Receipt Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Create tenant rent payment receipts for landlords and property managers.",
    "iconName": "Building",
    "keywords": [
      "rent receipt generator",
      "tenant receipt",
      "landlord rent receipt",
      "rental proof"
    ],
    "metaTitle": "Free Rent Receipt Generator \u2014 QuickForma",
    "metaDescription": "Generate printable rent payment receipts for landlords and tenants."
  },
  {
    "id": "promissory-note-generator",
    "verticals": [
      "business"
    ],
    "name": "Promissory Note Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Generate promissory notes and simple personal loan agreements with repayment terms.",
    "iconName": "FileCheck",
    "keywords": [
      "promissory note generator",
      "iou contract",
      "loan agreement",
      "personal loan note"
    ],
    "metaTitle": "Free Promissory Note Generator \u2014 QuickForma",
    "metaDescription": "Create simple promissory notes and loan repayment agreements."
  },
  {
    "id": "bill-of-lading-generator",
    "verticals": [
      "business"
    ],
    "name": "Bill of Lading (BOL) Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Generate standard freight and shipping itemization Bill of Lading forms.",
    "iconName": "FileText",
    "keywords": [
      "bill of lading generator",
      "bol template",
      "shipping form",
      "freight manifest"
    ],
    "metaTitle": "Free Bill of Lading (BOL) Generator \u2014 QuickForma",
    "metaDescription": "Generate printable Bill of Lading forms for shipping and freight."
  },
  {
    "id": "unit-converter",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Multi-Unit Converter",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Convert length, weight, volume, temperature, and area between metric and imperial units.",
    "iconName": "Scale",
    "popular": true,
    "keywords": [
      "unit converter",
      "metric to imperial",
      "length converter",
      "weight converter"
    ],
    "metaTitle": "Multi-Unit Converter \u2014 QuickForma",
    "metaDescription": "Convert length, weight, volume, and temperature units instantly."
  },
  {
    "id": "currency-converter",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Currency Converter",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Convert between major world currencies with static reference rates.",
    "iconName": "Globe",
    "keywords": [
      "currency converter",
      "exchange rate",
      "usd to eur",
      "gbp converter"
    ],
    "metaTitle": "Free Currency Converter \u2014 QuickForma",
    "metaDescription": "Convert major global currencies with instant calculation."
  },
  {
    "id": "date-difference-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Days Between Dates Calculator",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Calculate total days, weeks, months, and working business days between two dates.",
    "iconName": "Calendar",
    "keywords": [
      "days between dates",
      "date duration",
      "date difference",
      "working days calculator"
    ],
    "metaTitle": "Days Between Dates Calculator \u2014 QuickForma",
    "metaDescription": "Calculate the exact number of days, weeks, and months between two dates."
  },
  {
    "id": "time-zone-converter",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Time Zone Converter",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Convert times between UTC, EST, PST, GMT, CET, and other major world time zones.",
    "iconName": "Globe",
    "keywords": [
      "time zone converter",
      "utc to est",
      "pst to est",
      "world clock converter"
    ],
    "metaTitle": "Time Zone Converter \u2014 QuickForma",
    "metaDescription": "Convert meeting times across major world time zones easily."
  },
  {
    "id": "pdf-page-counter",
    "verticals": [
      "business",
      "students"
    ],
    "name": "PDF Page Counter",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Inspect and count pages in PDF files 100% inside your browser without uploading files.",
    "iconName": "FileText",
    "keywords": [
      "pdf page counter",
      "count pages in pdf",
      "pdf page number",
      "browser pdf reader"
    ],
    "metaTitle": "Client-Side PDF Page Counter \u2014 QuickForma",
    "metaDescription": "Count pages in PDF documents instantly inside your browser with 100% privacy."
  },
  {
    "id": "aspect-ratio-calculator",
    "verticals": [
      "business",
      "students",
      "developers"
    ],
    "name": "Aspect Ratio Calculator",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Calculate 16:9, 4:3, 1:1, or custom aspect ratio dimensions for images and video editors.",
    "iconName": "Maximize",
    "keywords": [
      "aspect ratio calculator",
      "16:9 calculator",
      "image dimensions",
      "video resolution"
    ],
    "metaTitle": "Aspect Ratio Calculator \u2014 QuickForma",
    "metaDescription": "Calculate image and video resolution dimensions for 16:9, 4:3, and custom ratios."
  },
  {
    "id": "color-picker-converter",
    "verticals": [
      "business",
      "students",
      "developers"
    ],
    "name": "Color Picker & HEX/RGB/HSL Converter",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Pick colors, convert between HEX, RGB, HSL, and check contrast ratios.",
    "iconName": "Sliders",
    "keywords": [
      "color picker",
      "hex to rgb",
      "hsl converter",
      "contrast checker"
    ],
    "metaTitle": "Color Picker & HEX/RGB/HSL Converter \u2014 QuickForma",
    "metaDescription": "Convert colors between HEX, RGB, and HSL values with visual color picker."
  },
  {
    "id": "image-resizer-converter",
    "verticals": [
      "business",
      "students",
      "developers"
    ],
    "name": "Image Resizer & Format Converter",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Resize image dimensions and convert between PNG, JPEG, and WebP completely in browser.",
    "iconName": "Image",
    "popular": true,
    "keywords": [
      "image resizer",
      "png to webp",
      "jpg to png",
      "client side image converter"
    ],
    "metaTitle": "Client-Side Image Resizer & Converter \u2014 QuickForma",
    "metaDescription": "Resize images and convert formats (PNG, JPG, WebP) 100% locally in your browser."
  },
  {
    "id": "json-formatter-validator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "JSON Formatter & Validator",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Format, beautify, minify, and validate JSON data structures with syntax tree viewing.",
    "iconName": "Code",
    "popular": true,
    "keywords": [
      "json formatter",
      "json validator",
      "beautify json",
      "json tree view"
    ],
    "metaTitle": "JSON Formatter & Validator \u2014 QuickForma",
    "metaDescription": "Format, beautify, and validate JSON code with interactive tree viewer."
  },
  {
    "id": "base64-encoder-decoder",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Base64 Encoder & Decoder",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Encode plain text strings or decode Base64 data with instant client-side conversion.",
    "iconName": "Binary",
    "keywords": [
      "base64 encoder",
      "base64 decoder",
      "base64 decode online",
      "string base64"
    ],
    "metaTitle": "Base64 Encoder & Decoder \u2014 QuickForma",
    "metaDescription": "Encode and decode Base64 text data instantly in your browser."
  },
  {
    "id": "hash-generator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Cryptographic Hash Generator",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Generate SHA-256, SHA-512, SHA-1, and MD5 hashes using the browser Web Crypto API.",
    "iconName": "Shield",
    "keywords": [
      "hash generator",
      "sha256 generator",
      "sha512",
      "md5 hash"
    ],
    "metaTitle": "Cryptographic Hash Generator (SHA-256 / SHA-512) \u2014 QuickForma",
    "metaDescription": "Generate SHA-256, SHA-512, and MD5 hashes using secure browser Web Crypto API."
  },
  {
    "id": "url-encoder-decoder",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "URL Encoder & Decoder",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Safely encode special query characters in URLs or decode encoded URL strings.",
    "iconName": "Globe",
    "keywords": [
      "url encoder",
      "url decoder",
      "encodeuricomponent",
      "url decode online"
    ],
    "metaTitle": "URL Encoder & Decoder \u2014 QuickForma",
    "metaDescription": "Encode or decode URL strings and query parameters instantly."
  },
  {
    "id": "css-glassmorphism-generator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "CSS Box Shadow & Glass Generator",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Visual UI sliders to generate modern CSS box shadows, glassmorphism backdrops, and gradients.",
    "iconName": "Sliders",
    "keywords": [
      "css glassmorphism generator",
      "box shadow generator",
      "backdrop filter css",
      "glass css"
    ],
    "metaTitle": "CSS Box Shadow & Glassmorphism Generator \u2014 QuickForma",
    "metaDescription": "Generate modern CSS box shadows and glassmorphism backdrop styles."
  },
  {
    "id": "barcode-generator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Barcode Generator",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Generate standard CODE128 and EAN barcodes from numbers or text with instant PNG download.",
    "iconName": "Code",
    "keywords": [
      "barcode generator",
      "code128 generator",
      "make barcode",
      "free barcode maker"
    ],
    "metaTitle": "Free Barcode Generator \u2014 QuickForma",
    "metaDescription": "Generate CODE128 barcodes from text or numbers with PNG image download."
  },
  {
    "id": "qr-code-generator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "QR Code Maker",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Generate customizable QR codes for links, text, and Wi-Fi networks with high-res PNG download.",
    "iconName": "QrCode",
    "popular": true,
    "badge": "Popular",
    "keywords": [
      "qr code generator",
      "make qr code",
      "wifi qr code",
      "free qr code maker"
    ],
    "metaTitle": "Free QR Code Generator \u2014 QuickForma",
    "metaDescription": "Create custom QR codes for websites, text, and Wi-Fi networks. Download high-res PNGs."
  },
  {
    "id": "password-generator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Secure Password Generator",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Generate strong, cryptographically secure passwords with custom length and character options.",
    "iconName": "Lock",
    "popular": true,
    "badge": "Popular",
    "keywords": [
      "password generator",
      "random password",
      "strong password maker",
      "secure password"
    ],
    "metaTitle": "Cryptographic Secure Password Generator \u2014 QuickForma",
    "metaDescription": "Generate strong, random, cryptographically secure passwords instantly."
  },
  {
    "id": "word-counter",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Word & Character Counter",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Count words, characters, sentences, paragraphs, and estimated reading time in real-time.",
    "iconName": "FileText",
    "popular": true,
    "badge": "Popular",
    "keywords": [
      "word counter",
      "character count",
      "reading time",
      "text statistics"
    ],
    "metaTitle": "Word Counter & Character Counter \u2014 QuickForma",
    "metaDescription": "Real-time word count, character count, sentence count, and reading time estimator."
  },
  {
    "id": "case-converter",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Text Case Converter",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, and camelCase.",
    "iconName": "Type",
    "keywords": [
      "case converter",
      "uppercase to lowercase",
      "title case converter",
      "text format"
    ],
    "metaTitle": "Text Case Converter \u2014 QuickForma",
    "metaDescription": "Convert text between UPPERCASE, lowercase, Title Case, and Sentence case."
  },
  {
    "id": "text-diff-checker",
    "verticals": [
      "business",
      "students",
      "developers"
    ],
    "name": "Text Diff & Compare Tool",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Compare two blocks of text and highlight line-by-line additions, deletions, and changes.",
    "iconName": "Copy",
    "keywords": [
      "text diff checker",
      "compare text",
      "text difference",
      "line diff tool"
    ],
    "metaTitle": "Text Diff & Compare Tool \u2014 QuickForma",
    "metaDescription": "Compare two text blocks line-by-line with color-coded diff highlighting."
  },
  {
    "id": "lorem-ipsum-generator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Lorem Ipsum Placeholder Generator",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Generate paragraphs, sentences, or words of classic Lorem Ipsum placeholder text.",
    "iconName": "FilePlus",
    "keywords": [
      "lorem ipsum generator",
      "placeholder text",
      "dummy text",
      "lorem text maker"
    ],
    "metaTitle": "Lorem Ipsum Generator \u2014 QuickForma",
    "metaDescription": "Generate customized paragraphs and sentences of Lorem Ipsum placeholder text."
  },
  {
    "id": "business-name-generator",
    "verticals": [
      "business"
    ],
    "name": "Business Name Generator",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Brainstorm business and brand name ideas by combining industry keywords with smart affixes.",
    "iconName": "Sparkles",
    "keywords": [
      "business name generator",
      "brand name maker",
      "company name ideas",
      "brand brainstorm"
    ],
    "metaTitle": "Business Name Generator \u2014 QuickForma",
    "metaDescription": "Brainstorm business and brand name ideas with smart keyword combinations."
  },
  {
    "id": "slug-generator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "SEO URL Slug Sanitizer",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Convert article headlines and page titles into clean, lowercase, hyphenated URL slugs.",
    "iconName": "Tag",
    "keywords": [
      "slug generator",
      "url slug maker",
      "seo url sanitizer",
      "title to slug"
    ],
    "metaTitle": "SEO URL Slug Generator \u2014 QuickForma",
    "metaDescription": "Convert page titles into clean, lowercase, hyphenated SEO URL slugs."
  },
  {
    "id": "pomodoro-timer",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Pomodoro Focus Timer",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Minimalist 25-minute work and 5-minute break Pomodoro productivity countdown timer.",
    "iconName": "Clock",
    "popular": true,
    "keywords": [
      "pomodoro timer",
      "focus timer",
      "25 minute timer",
      "productivity countdown"
    ],
    "metaTitle": "Pomodoro Focus Timer \u2014 QuickForma",
    "metaDescription": "Minimalist 25/5 minute Pomodoro countdown timer with audio chime."
  },
  {
    "id": "uuid-generator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "UUID v4 Generator",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Generate bulk RFC 4122 compliant Version 4 UUIDs instantly in your browser.",
    "iconName": "Key",
    "popular": true,
    "badge": "New",
    "keywords": [
      "uuid generator",
      "uuid v4",
      "guid generator",
      "bulk uuid"
    ],
    "metaTitle": "Free Bulk UUID v4 Generator \u2014 QuickForma",
    "metaDescription": "Generate RFC 4122 compliant UUID v4 identifiers instantly. 100% free & client-side."
  },
  {
    "id": "jwt-decoder",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "JWT Decoder",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Decode JSON Web Token (JWT) header and payload claims locally with zero server logs.",
    "iconName": "ShieldCheck",
    "popular": true,
    "badge": "New",
    "keywords": [
      "jwt decoder",
      "decode jwt",
      "jwt parser",
      "json web token"
    ],
    "metaTitle": "Client-Side JWT Decoder & Parser \u2014 QuickForma",
    "metaDescription": "Decode JSON Web Tokens locally in your browser. Inspect header and payload claims privately."
  },
  {
    "id": "shopify-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Shopify Fee & Margin Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate Shopify plan monthly costs, credit card processing rates, and net seller payout.",
    "iconName": "ShoppingBag",
    "popular": true,
    "badge": "New",
    "keywords": [
      "shopify fee calculator",
      "shopify transaction cost",
      "shopify payments fee",
      "ecommerce margin"
    ],
    "metaTitle": "Shopify Fee & Payout Calculator \u2014 QuickForma",
    "metaDescription": "Calculate monthly Shopify plan costs and credit card processing fees to see net profit."
  },
  {
    "id": "stripe-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Stripe Fee Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate standard Stripe payment processing fees and exact amount to invoice for net payout.",
    "iconName": "CreditCard",
    "popular": true,
    "badge": "New",
    "keywords": [
      "stripe fee calculator",
      "stripe transaction fee",
      "invoice fee calculator",
      "stripe payout"
    ],
    "metaTitle": "Stripe Fee & Net Invoice Calculator \u2014 QuickForma",
    "metaDescription": "Calculate standard Stripe payment fees or exact invoice amount needed for target payout."
  },
  {
    "id": "eoq-calculator",
    "verticals": [
      "business"
    ],
    "name": "Economic Order Quantity (EOQ) Calculator",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Determine optimal inventory purchase order size to minimize ordering and carrying costs.",
    "iconName": "Box",
    "popular": true,
    "badge": "New",
    "keywords": [
      "eoq calculator",
      "economic order quantity",
      "inventory cost",
      "supply chain eoq"
    ],
    "metaTitle": "Economic Order Quantity (EOQ) Calculator \u2014 QuickForma",
    "metaDescription": "Calculate optimal inventory reorder batch size to minimize holding and ordering costs."
  },
  {
    "id": "reorder-point-calculator",
    "verticals": [
      "business"
    ],
    "name": "Reorder Point (ROP) Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate inventory trigger level based on daily sales velocity, lead time, and safety stock buffer.",
    "iconName": "PackageCheck",
    "badge": "New",
    "keywords": [
      "reorder point calculator",
      "rop calculator",
      "safety stock",
      "inventory lead time"
    ],
    "metaTitle": "Reorder Point (ROP) Calculator \u2014 QuickForma",
    "metaDescription": "Determine exact inventory reorder level to prevent stockouts during lead times."
  },
  {
    "id": "oee-calculator",
    "verticals": [
      "business"
    ],
    "name": "OEE Manufacturing Calculator",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate Overall Equipment Effectiveness (OEE), Availability, Performance, and Quality rates.",
    "iconName": "Gauge",
    "badge": "New",
    "keywords": [
      "oee calculator",
      "manufacturing efficiency",
      "overall equipment effectiveness",
      "takt time"
    ],
    "metaTitle": "OEE Manufacturing Efficiency Calculator \u2014 QuickForma",
    "metaDescription": "Calculate OEE manufacturing score based on Availability, Performance speed, and Quality."
  },
  {
    "id": "pto-calculator",
    "verticals": [
      "business"
    ],
    "name": "PTO Accrual & Balance Calculator",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate future Paid Time Off (PTO) vacation balances based on accrual rate and pay schedule.",
    "iconName": "Calendar",
    "badge": "New",
    "keywords": [
      "pto calculator",
      "vacation accrual",
      "paid time off balance",
      "hr pto"
    ],
    "metaTitle": "PTO Accrual & Vacation Balance Calculator \u2014 QuickForma",
    "metaDescription": "Project future Paid Time Off vacation balances based on pay period accrual rate."
  },
  {
    "id": "utm-builder",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Campaign UTM URL Builder",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Build Google Analytics tracking links with custom UTM source, medium, campaign, and term tags.",
    "iconName": "Link",
    "badge": "New",
    "keywords": [
      "utm builder",
      "campaign url builder",
      "google analytics utm",
      "utm generator"
    ],
    "metaTitle": "Campaign UTM URL Builder \u2014 QuickForma",
    "metaDescription": "Create Google Analytics campaign tracking URLs with custom UTM parameters."
  },
  {
    "id": "paypal-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "PayPal Merchant Fee Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate PayPal standard domestic and international seller fees or invoice amount needed for target payout.",
    "iconName": "CreditCard",
    "badge": "New",
    "keywords": [
      "paypal fee calculator",
      "paypal fee",
      "paypal merchant fees",
      "paypal invoice calculator"
    ],
    "metaTitle": "PayPal Merchant Fee & Net Invoice Calculator \u2014 QuickForma",
    "metaDescription": "Calculate PayPal seller transaction fees and exact invoice amount needed for target net payout."
  },
  {
    "id": "etsy-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Etsy Fee & Profit Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate listing, transaction, payment processing, and offsite ads fees for Etsy shop sellers.",
    "iconName": "ShoppingCart",
    "badge": "New",
    "keywords": [
      "etsy fee calculator",
      "etsy transaction fee",
      "etsy seller profit",
      "etsy offsite ads"
    ],
    "metaTitle": "Etsy Fee & Seller Profit Calculator \u2014 QuickForma",
    "metaDescription": "Calculate total Etsy shop fees and net profit margin per sale."
  },
  {
    "id": "volumetric-weight-calculator",
    "verticals": [
      "business"
    ],
    "name": "Volumetric Weight Freight Calculator",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate dimensional (DIM) weight and carrier billable freight weight for air, sea, and ground shipping.",
    "iconName": "Truck",
    "badge": "New",
    "keywords": [
      "volumetric weight calculator",
      "dimensional weight",
      "freight weight",
      "iata dim weight"
    ],
    "metaTitle": "Volumetric Freight & Dimensional Weight Calculator \u2014 QuickForma",
    "metaDescription": "Calculate dimensional volumetric shipping weight and carrier billable freight weight."
  },
  {
    "id": "depreciation-calculator",
    "verticals": [
      "business"
    ],
    "name": "Asset Depreciation Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate annual straight-line asset depreciation, monthly tax write-offs, and full depreciation schedule.",
    "iconName": "TrendingDown",
    "badge": "New",
    "keywords": [
      "depreciation calculator",
      "straight line depreciation",
      "asset depreciation schedule",
      "tax write off"
    ],
    "metaTitle": "Straight-Line Asset Depreciation Calculator \u2014 QuickForma",
    "metaDescription": "Calculate annual asset straight-line depreciation expense and generate depreciation schedules."
  },
  {
    "id": "gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "GPA Calculator",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculate semester GPA, cumulative GPA projection, target GPA needed, and high school weighted GPA.",
    "iconName": "GraduationCap",
    "popular": true,
    "badge": "Flagship",
    "keywords": [
      "gpa calculator",
      "cumulative gpa calculator",
      "college gpa calculator",
      "target gpa needed",
      "weighted gpa calculator",
      "high school gpa"
    ],
    "metaTitle": "GPA Calculator | Calculate Semester & Cumulative GPA \u2014 QuickForma",
    "metaDescription": "Calculate your GPA by course, credits, and grades. Find your semester or cumulative GPA and explore target and what-if GPA scenarios with QuickForma."
  },
  {
    "id": "final-grade-calculator",
    "verticals": [
      "students"
    ],
    "name": "Final Grade Calculator",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculate your current course grade, projected final grade, required score on remaining coursework, and what-if scenarios.",
    "iconName": "Percent",
    "popular": true,
    "badge": "Flagship",
    "keywords": [
      "final grade calculator",
      "grade calculator",
      "course grade calculator",
      "grade needed on final exam",
      "what grade do i need on my final",
      "weighted grade calculator"
    ],
    "metaTitle": "Final Grade Calculator | Calculate Your Course Grade \u2014 QuickForma",
    "metaDescription": "Calculate your current or projected course grade and find the score you need on remaining coursework to reach your target grade."
  },
  {
    "id": "percentage-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Percentage Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate percentages, percentage values, percentage increases, decreases, and percentage differences easily.",
    "iconName": "Percent",
    "popular": true,
    "badge": "Flagship",
    "keywords": [
      "percentage calculator",
      "percent calculator",
      "percentage change calculator",
      "percentage difference calculator",
      "calculate percentage",
      "percentage increase"
    ],
    "metaTitle": "Percentage Calculator | Calculate Percentages Easily \u2014 QuickForma",
    "metaDescription": "Calculate percentages, percentage changes, increases, decreases, and differences quickly with QuickForma's free percentage calculator."
  },
  {
    "id": "fraction-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Fraction Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Add, subtract, multiply, divide, simplify, convert, and compare fractions with step-by-step mathematical precision.",
    "iconName": "Divide",
    "popular": true,
    "badge": "Flagship",
    "keywords": [
      "fraction calculator",
      "simplify fractions",
      "fraction arithmetic",
      "mixed number to improper fraction",
      "fraction to decimal",
      "fraction to percentage",
      "compare fractions"
    ],
    "metaTitle": "Fraction Calculator | Calculate, Simplify & Convert Fractions \u2014 QuickForma",
    "metaDescription": "Free online fraction calculator. Add, subtract, multiply, divide, simplify, and convert fractions, mixed numbers, decimals, and percentages."
  },
  {
    "id": "cumulative-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "Cumulative GPA Calculator",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Combine prior cumulative GPA and completed credit hours with new semester grades to project updated graduation GPA.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": [
      "cumulative gpa calculator",
      "gpa projection",
      "overall gpa",
      "semester cumulative gpa"
    ],
    "metaTitle": "Cumulative GPA Calculator \u2014 QuickForma",
    "metaDescription": "Calculate your cumulative GPA by combining past course credits and new semester grades."
  },
  {
    "id": "weighted-grade-calculator",
    "verticals": [
      "students"
    ],
    "name": "Weighted Grade Calculator",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculate overall course grade from weighted assignment categories like homework, quizzes, midterms, and final exam.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "weighted grade calculator",
      "class grade calculator",
      "weight percent grade",
      "weighted average"
    ],
    "metaTitle": "Weighted Grade Calculator \u2014 QuickForma",
    "metaDescription": "Calculate weighted course grades with custom category percentages and score inputs."
  },
  {
    "id": "target-gpa-planner-calculator",
    "verticals": [
      "students"
    ],
    "name": "Target GPA & Course Planner",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Find the average GPA required across remaining credit hours to hit your target graduation GPA goal.",
    "iconName": "Target",
    "badge": "New",
    "keywords": [
      "target gpa calculator",
      "gpa planner",
      "gpa needed to reach",
      "required gpa"
    ],
    "metaTitle": "Target GPA & Course Planner \u2014 QuickForma",
    "metaDescription": "Determine what average GPA you need in future credit hours to achieve your target GPA."
  },
  {
    "id": "attendance-calculator",
    "verticals": [
      "business"
    ],
    "name": "Attendance & Absence Calculator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Calculate current attendance percentage, how many classes you can skip, or how many you must attend to reach target %.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "attendance calculator",
      "class absence calculator",
      "allowed skips",
      "attendance percentage"
    ],
    "metaTitle": "Attendance & Absence Calculator \u2014 QuickForma",
    "metaDescription": "Calculate class attendance percentage and find out how many classes you can skip or need to attend."
  },
  {
    "id": "marks-percentage-converter",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Marks & Percentage Converter",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Convert raw test/exam marks into percentage scores, US letter grades, and 4.0 GPA points.",
    "iconName": "Award",
    "badge": "New",
    "keywords": [
      "marks to percentage",
      "score converter",
      "marks grade converter",
      "percentage calculator"
    ],
    "metaTitle": "Marks & Percentage Converter \u2014 QuickForma",
    "metaDescription": "Convert exam marks to percentage scores, letter grades, and 4.0 grade point equivalents."
  },
  {
    "id": "ratio-proportion-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Ratio & Proportion Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Solve for missing variable x in A:B = C:X or simplify complex multi-part ratios into lowest terms.",
    "iconName": "Divide",
    "badge": "New",
    "keywords": [
      "ratio calculator",
      "proportion solver",
      "solve for x ratio",
      "simplify ratio"
    ],
    "metaTitle": "Ratio & Proportion Calculator \u2014 QuickForma",
    "metaDescription": "Solve proportion equations A:B = C:X and simplify integer ratios instantly."
  },
  {
    "id": "average-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Average Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate arithmetic mean, total sum, count, min, and max values from a numeric dataset.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": [
      "average calculator",
      "calculate mean",
      "sum calculator",
      "numeric average"
    ],
    "metaTitle": "Average Calculator \u2014 QuickForma",
    "metaDescription": "Calculate the average (mean), sum, and count of any list of numbers."
  },
  {
    "id": "scientific-notation-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Scientific Notation Calculator",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Convert numbers between standard decimal, scientific notation (a \u00d7 10^b), and engineering notation.",
    "iconName": "Binary",
    "badge": "New",
    "keywords": [
      "scientific notation calculator",
      "standard to scientific",
      "engineering notation",
      "exponents"
    ],
    "metaTitle": "Scientific Notation Calculator \u2014 QuickForma",
    "metaDescription": "Convert numbers to scientific notation and engineering notation instantly."
  },
  {
    "id": "exponent-logarithm-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Exponent & Logarithm Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate base-10 log (log10), natural log (ln), custom base log (log_b(x)), and power exponentiation.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": [
      "logarithm calculator",
      "ln calculator",
      "exponent calculator",
      "base 10 log"
    ],
    "metaTitle": "Exponent & Logarithm Calculator \u2014 QuickForma",
    "metaDescription": "Calculate logarithms (log, ln, log_b) and powers with mathematical precision."
  },
  {
    "id": "linear-equation-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Linear Equation Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Solve 1-variable linear equations of the form ax + b = c for x with step-by-step verification.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": [
      "linear equation calculator",
      "solve for x",
      "algebra solver",
      "linear equation"
    ],
    "metaTitle": "Linear Equation Solver \u2014 QuickForma",
    "metaDescription": "Solve linear equations ax + b = c for variable x with exact solutions."
  },
  {
    "id": "quadratic-formula-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Quadratic Formula Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Solve quadratic equations ax^2 + bx + c = 0 for real & complex roots, discriminant, and parabola vertex.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": [
      "quadratic formula calculator",
      "solve quadratic equation",
      "discriminant",
      "parabola vertex"
    ],
    "metaTitle": "Quadratic Formula Calculator \u2014 QuickForma",
    "metaDescription": "Find real and complex roots of quadratic equations with discriminant and vertex coordinates."
  },
  {
    "id": "distance-midpoint-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Distance & Midpoint Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate Euclidean distance, midpoint coordinates, and line slope between two 2D points.",
    "iconName": "MapPin",
    "badge": "New",
    "keywords": [
      "distance formula calculator",
      "midpoint calculator",
      "slope between two points",
      "coordinate geometry"
    ],
    "metaTitle": "Distance & Midpoint Calculator \u2014 QuickForma",
    "metaDescription": "Calculate distance, midpoint, and slope between two coordinate points."
  },
  {
    "id": "sequence-series-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Sequence & Series Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate n-th terms and sum of n terms for Arithmetic and Geometric mathematical sequences.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": [
      "arithmetic sequence calculator",
      "geometric sequence",
      "sum of series",
      "nth term"
    ],
    "metaTitle": "Sequence & Series Calculator \u2014 QuickForma",
    "metaDescription": "Calculate nth terms and partial sums for arithmetic and geometric series."
  },
  {
    "id": "pythagorean-theorem-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Pythagorean Theorem Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Solve right triangle side lengths using a^2 + b^2 = c^2 along with area and perimeter.",
    "iconName": "Triangle",
    "badge": "New",
    "keywords": [
      "pythagorean theorem calculator",
      "hypotenuse calculator",
      "right triangle solver",
      "a2+b2=c2"
    ],
    "metaTitle": "Pythagorean Theorem Calculator \u2014 QuickForma",
    "metaDescription": "Solve right triangle side lengths, hypotenuse, area, and perimeter."
  },
  {
    "id": "triangle-area-solver",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Triangle Area & Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate triangle area from base and height using Area = 0.5 * b * h.",
    "iconName": "Triangle",
    "badge": "New",
    "keywords": [
      "triangle area calculator",
      "area of triangle",
      "base and height triangle",
      "geometry area"
    ],
    "metaTitle": "Triangle Area Calculator \u2014 QuickForma",
    "metaDescription": "Calculate triangle area instantly from base and height inputs."
  },
  {
    "id": "circle-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Circle & Geometry Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate diameter, circumference, and area of a circle from radius.",
    "iconName": "Circle",
    "badge": "New",
    "keywords": [
      "circle calculator",
      "area of circle",
      "circumference calculator",
      "radius to diameter"
    ],
    "metaTitle": "Circle Calculator \u2014 Area & Circumference \u2014 QuickForma",
    "metaDescription": "Calculate circle diameter, circumference, and area from radius."
  },
  {
    "id": "geometry-area-volume-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "2D & 3D Geometry Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate 3D volume and total surface area for spheres, cylinders, cubes, and cones.",
    "iconName": "Box",
    "badge": "New",
    "keywords": [
      "volume calculator",
      "surface area calculator",
      "3d geometry",
      "sphere volume"
    ],
    "metaTitle": "2D & 3D Geometry Calculator \u2014 QuickForma",
    "metaDescription": "Calculate 3D volume and surface area for spheres, cylinders, cones, and cubes."
  },
  {
    "id": "trigonometry-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Trigonometry Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate sine (sin), cosine (cos), and tangent (tan) in degrees or radians.",
    "iconName": "Triangle",
    "badge": "New",
    "keywords": [
      "trigonometry calculator",
      "sin cos tan",
      "radians degrees",
      "trig functions"
    ],
    "metaTitle": "Trigonometry Calculator \u2014 Sin, Cos, Tan \u2014 QuickForma",
    "metaDescription": "Calculate sine, cosine, and tangent in degrees or radians."
  },
  {
    "id": "law-of-sines-cosines-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Law of Sines & Cosines Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Solve non-right oblique triangles using Law of Cosines (c^2 = a^2 + b^2 - 2ab cos C) and Law of Sines.",
    "iconName": "Triangle",
    "badge": "New",
    "keywords": [
      "law of sines calculator",
      "law of cosines",
      "oblique triangle solver",
      "non right triangle"
    ],
    "metaTitle": "Law of Sines & Cosines Calculator \u2014 QuickForma",
    "metaDescription": "Solve non-right oblique triangles using the Law of Sines and Law of Cosines."
  },
  {
    "id": "derivative-limit-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Derivative & Limit Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate polynomial power-rule derivatives d/dx[ax^n] = a * n * x^(n-1) and tangent slopes.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": [
      "derivative calculator",
      "calculus derivative",
      "power rule",
      "tangent slope"
    ],
    "metaTitle": "Derivative & Limit Calculator \u2014 QuickForma",
    "metaDescription": "Calculate polynomial derivatives and tangent line slopes with power rule precision."
  },
  {
    "id": "descriptive-statistics-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Descriptive Statistics Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate mean, median, mode, range, variance, standard deviation, quartiles, IQR, and MAD from data.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": [
      "descriptive statistics calculator",
      "standard deviation",
      "mean median mode",
      "variance calculator",
      "iqr"
    ],
    "metaTitle": "Descriptive Statistics Calculator \u2014 QuickForma",
    "metaDescription": "Calculate mean, median, mode, standard deviation, variance, quartiles, and IQR."
  },
  {
    "id": "z-score-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Z-Score Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate standard score Z = (X - mu) / sigma and percentile rank under standard normal curve.",
    "iconName": "BarChart",
    "badge": "New",
    "keywords": [
      "z score calculator",
      "standard score",
      "normal distribution percentile",
      "percentile rank"
    ],
    "metaTitle": "Z-Score & Percentile Calculator \u2014 QuickForma",
    "metaDescription": "Calculate Z-scores and percentile ranks under the standard normal distribution."
  },
  {
    "id": "probability-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Probability Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate single-event, joint intersection P(A and B), union P(A or B), and complement probabilities.",
    "iconName": "PieChart",
    "badge": "New",
    "keywords": [
      "probability calculator",
      "union intersection probability",
      "complement probability",
      "stats probability"
    ],
    "metaTitle": "Probability Calculator \u2014 QuickForma",
    "metaDescription": "Calculate single event, union, intersection, and complement probabilities."
  },
  {
    "id": "permutation-combination-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Permutation & Combination Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate permutations nPr (order matters) and combinations nCr (order does not matter).",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": [
      "npr ncr calculator",
      "permutation combination",
      "factorial calculator",
      "combinatorics"
    ],
    "metaTitle": "Permutation & Combination Calculator (nPr / nCr) \u2014 QuickForma",
    "metaDescription": "Calculate nPr permutations, nCr combinations, and factorials."
  },
  {
    "id": "probability-distributions-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Binomial Probability Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate exact probability P(X = k), at least P(X >= k), and at most P(X <= k) for Binomial distributions.",
    "iconName": "BarChart2",
    "badge": "New",
    "keywords": [
      "binomial probability calculator",
      "binomial distribution",
      "p(x=k)",
      "stats distribution"
    ],
    "metaTitle": "Binomial Probability Calculator \u2014 QuickForma",
    "metaDescription": "Calculate exact and cumulative binomial probabilities."
  },
  {
    "id": "confidence-interval-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Confidence Interval Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate margin of error E = Z * (sigma / sqrt(n)) and lower/upper bounds for confidence intervals.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": [
      "confidence interval calculator",
      "margin of error",
      "95 confidence interval",
      "stats mean interval"
    ],
    "metaTitle": "Confidence Interval Calculator \u2014 QuickForma",
    "metaDescription": "Calculate confidence intervals and margin of error for sample means."
  },
  {
    "id": "hypothesis-test-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Hypothesis Test Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate test statistic Z = (xbar - mu) / (s / sqrt(n)), two-tailed p-value, and significance decision.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": [
      "hypothesis test calculator",
      "z test calculator",
      "p value calculator",
      "t test stats"
    ],
    "metaTitle": "Hypothesis Test Calculator (Z-Test / p-value) \u2014 QuickForma",
    "metaDescription": "Calculate Z-test statistics, two-tailed p-values, and hypothesis testing decisions."
  },
  {
    "id": "molar-mass-calculator",
    "verticals": [
      "business"
    ],
    "name": "Molar Mass & Composition Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Parse chemical formulas (e.g. H2SO4, Ca(NO3)2) to compute total molecular weight and element mass %.",
    "iconName": "Atom",
    "badge": "New",
    "keywords": [
      "molar mass calculator",
      "molecular weight",
      "chemical formula parser",
      "mass percent composition"
    ],
    "metaTitle": "Molar Mass & Chemical Formula Calculator \u2014 QuickForma",
    "metaDescription": "Calculate molar mass and element mass percentages from any chemical formula."
  },
  {
    "id": "moles-molarity-calculator",
    "verticals": [
      "students"
    ],
    "name": "Moles & Molarity Calculator",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Calculate moles n = m / M and molar concentration M = n / V in mol/L.",
    "iconName": "FlaskConical",
    "badge": "New",
    "keywords": [
      "molarity calculator",
      "moles calculator",
      "concentration mol L",
      "chem solution"
    ],
    "metaTitle": "Moles & Molarity Calculator \u2014 QuickForma",
    "metaDescription": "Calculate moles and molar concentration for chemical solutions."
  },
  {
    "id": "dilution-calculator",
    "verticals": [
      "students"
    ],
    "name": "Solution Dilution Calculator",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Calculate final volume V2 or concentration C2 using C1 V1 = C2 V2 and required solvent to add.",
    "iconName": "FlaskConical",
    "badge": "New",
    "keywords": [
      "dilution calculator",
      "c1v1=c2v2",
      "solution dilution",
      "chem concentration"
    ],
    "metaTitle": "Solution Dilution Calculator (C1V1 = C2V2) \u2014 QuickForma",
    "metaDescription": "Calculate solution dilution using C1V1 = C2V2 and required solvent volume."
  },
  {
    "id": "ph-poh-calculator",
    "verticals": [
      "students"
    ],
    "name": "pH & pOH Calculator",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Calculate pH, pOH, [H+] concentration, and [OH-] concentration (pH + pOH = 14).",
    "iconName": "FlaskConical",
    "badge": "New",
    "keywords": [
      "ph calculator",
      "poh calculator",
      "h+ concentration",
      "acid base ph"
    ],
    "metaTitle": "pH & pOH Calculator \u2014 QuickForma",
    "metaDescription": "Calculate pH, pOH, and hydrogen ion concentration."
  },
  {
    "id": "stoichiometry-percent-yield-calculator",
    "verticals": [
      "students"
    ],
    "name": "Stoichiometry & Percent Yield Calculator",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Calculate chemical reaction efficiency and percent yield from actual and theoretical yield.",
    "iconName": "FlaskConical",
    "badge": "New",
    "keywords": [
      "percent yield calculator",
      "stoichiometry calculator",
      "actual vs theoretical yield",
      "chem yield"
    ],
    "metaTitle": "Stoichiometry & Percent Yield Calculator \u2014 QuickForma",
    "metaDescription": "Calculate percent yield and reaction stoichiometry efficiency."
  },
  {
    "id": "gas-laws-calculator",
    "verticals": [
      "students"
    ],
    "name": "Gas Laws Calculator (PV = nRT)",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Solve for missing variables in the Ideal Gas Law (PV = nRT) with R = 0.08206 L atm / mol K.",
    "iconName": "Wind",
    "badge": "New",
    "keywords": [
      "ideal gas law calculator",
      "pv=nrt calculator",
      "gas laws",
      "pressure volume temp"
    ],
    "metaTitle": "Ideal Gas Law Calculator (PV = nRT) \u2014 QuickForma",
    "metaDescription": "Solve Ideal Gas Law equations PV = nRT for P, V, n, or T."
  },
  {
    "id": "significant-figures-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Significant Figures Calculator",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Count significant figures in a number and apply scientific rounding rules.",
    "iconName": "Hash",
    "badge": "New",
    "keywords": [
      "sig fig calculator",
      "significant figures count",
      "sig fig rounding",
      "scientific figures"
    ],
    "metaTitle": "Significant Figures Calculator \u2014 QuickForma",
    "metaDescription": "Count significant figures and apply scientific rounding rules."
  },
  {
    "id": "kinematics-motion-calculator",
    "verticals": [
      "students"
    ],
    "name": "Kinematics & SUVAT Motion Calculator",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Calculate 1D motion variables using SUVAT equations (v = u + at, s = ut + 0.5 a t^2).",
    "iconName": "Gauge",
    "badge": "New",
    "keywords": [
      "suvat calculator",
      "kinematics calculator",
      "physics motion",
      "displacement velocity"
    ],
    "metaTitle": "Kinematics & SUVAT Motion Calculator \u2014 QuickForma",
    "metaDescription": "Solve 1D kinematic motion equations and SUVAT variables."
  },
  {
    "id": "force-friction-momentum-calculator",
    "verticals": [
      "students"
    ],
    "name": "Force, Friction & Momentum Calculator",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Calculate Newton's 2nd Law Force (F = ma), Momentum (p = mv), and Weight (W = mg).",
    "iconName": "Zap",
    "badge": "New",
    "keywords": [
      "force calculator",
      "f=ma calculator",
      "momentum calculator",
      "physics force"
    ],
    "metaTitle": "Force, Friction & Momentum Calculator \u2014 QuickForma",
    "metaDescription": "Calculate net force F = ma, momentum p = mv, and gravitational weight."
  },
  {
    "id": "work-energy-power-calculator",
    "verticals": [
      "students"
    ],
    "name": "Work, Energy & Power Calculator",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Calculate Kinetic Energy (KE = 0.5 m v^2), Potential Energy (PE = mgh), Mechanical Energy, and Power.",
    "iconName": "Zap",
    "badge": "New",
    "keywords": [
      "kinetic energy calculator",
      "potential energy",
      "power calculator",
      "physics work energy"
    ],
    "metaTitle": "Work, Energy & Power Calculator \u2014 QuickForma",
    "metaDescription": "Calculate kinetic energy, potential energy, mechanical energy, and power."
  },
  {
    "id": "ohms-law-electrical-calculator",
    "verticals": [
      "students",
      "developers"
    ],
    "name": "Ohm's Law & Circuit Calculator",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Solve voltage (V = IR), electrical current (I), resistance (R), and electrical power (P = VI).",
    "iconName": "Zap",
    "badge": "New",
    "keywords": [
      "ohms law calculator",
      "v=ir calculator",
      "voltage current resistance",
      "electrical power"
    ],
    "metaTitle": "Ohm's Law & Circuit Calculator \u2014 QuickForma",
    "metaDescription": "Solve Ohm's Law V = IR, current, resistance, and electrical power."
  },
  {
    "id": "wave-frequency-speed-calculator",
    "verticals": [
      "students"
    ],
    "name": "Wave, Frequency & Light Calculator",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Calculate wave speed (v = f * lambda), period (T = 1/f), and photon energy (E = hf).",
    "iconName": "Activity",
    "badge": "New",
    "keywords": [
      "wave speed calculator",
      "frequency wavelength",
      "wave period",
      "photon energy"
    ],
    "metaTitle": "Wave, Frequency & Light Calculator \u2014 QuickForma",
    "metaDescription": "Calculate wave speed v = f * lambda, period, and photon energy."
  },
  {
    "id": "reading-presentation-time-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Reading & Presentation Time Calculator",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Calculate estimated reading time (slow, average, fast) and speech presentation length from word count.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "reading time calculator",
      "presentation speaking time",
      "speech duration",
      "words to minutes"
    ],
    "metaTitle": "Reading & Presentation Time Calculator \u2014 QuickForma",
    "metaDescription": "Calculate reading time and presentation speech duration from word count."
  },
  {
    "id": "essay-page-count-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Essay Page Count Calculator",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Convert word count to estimated printed pages based on font size, line spacing, and font family.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "words to pages calculator",
      "essay page count",
      "words per page",
      "printed pages"
    ],
    "metaTitle": "Essay Page Count Calculator \u2014 QuickForma",
    "metaDescription": "Convert word counts to printed essay pages based on font size and line spacing."
  },
  {
    "id": "academic-readability-analyzer",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Academic Readability Analyzer",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Analyze text readability scores including Flesch-Kincaid Grade Level, Flesch Reading Ease, and Gunning Fog.",
    "iconName": "BookOpen",
    "badge": "New",
    "keywords": [
      "readability analyzer",
      "flesch kincaid grade",
      "flesch reading ease",
      "text grade level"
    ],
    "metaTitle": "Academic Readability Analyzer \u2014 QuickForma",
    "metaDescription": "Analyze academic text readability scores and grade levels."
  },
  {
    "id": "citation-formatter",
    "verticals": [
      "students"
    ],
    "name": "Academic Citation Formatter",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Format accurate in-text and full bibliography citations in APA 7th, MLA 9th, Chicago 17th, and IEEE styles.",
    "iconName": "BookOpen",
    "badge": "New",
    "keywords": [
      "citation generator",
      "apa citation",
      "mla citation",
      "chicago ieee bibliography"
    ],
    "metaTitle": "Academic Citation Formatter (APA, MLA, IEEE) \u2014 QuickForma",
    "metaDescription": "Format APA, MLA, Chicago, and IEEE citations for books, journals, and websites."
  },
  {
    "id": "study-schedule-time-calculator",
    "verticals": [
      "students"
    ],
    "name": "Study Time & Schedule Calculator",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculate recommended weekly out-of-class study hours based on credit load and course difficulty.",
    "iconName": "Calendar",
    "badge": "New",
    "keywords": [
      "study time calculator",
      "credit hours study ratio",
      "weekly study plan",
      "study planner"
    ],
    "metaTitle": "Study Time & Schedule Calculator \u2014 QuickForma",
    "metaDescription": "Calculate recommended weekly study hours based on course credit load."
  },
  {
    "id": "exam-assignment-countdown",
    "verticals": [
      "students"
    ],
    "name": "Exam & Assignment Countdown",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculate days remaining until exam deadline and daily study hours required to reach preparation goals.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "exam countdown",
      "assignment deadline calculator",
      "days left until exam",
      "study pacing"
    ],
    "metaTitle": "Exam & Assignment Countdown Calculator \u2014 QuickForma",
    "metaDescription": "Track days remaining until exam dates and calculate required daily study pacing."
  },
  {
    "id": "student-budget-planner",
    "verticals": [
      "students"
    ],
    "name": "Student Budget Planner",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Track monthly student income sources against recurring expenses (tuition, housing, books, food, transit).",
    "iconName": "DollarSign",
    "badge": "New",
    "keywords": [
      "student budget planner",
      "college budget calculator",
      "monthly student expense",
      "student income"
    ],
    "metaTitle": "Student Budget Planner \u2014 QuickForma",
    "metaDescription": "Plan and manage monthly college student income and expenses."
  },
  {
    "id": "cost-per-credit-hour-calculator",
    "verticals": [
      "business"
    ],
    "name": "Cost Per Credit Hour Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate cost per credit hour and exact monetary value per individual class session.",
    "iconName": "DollarSign",
    "badge": "New",
    "keywords": [
      "cost per credit hour",
      "tuition per class",
      "cost of skipping class",
      "college tuition per credit"
    ],
    "metaTitle": "Cost Per Credit Hour Calculator \u2014 QuickForma",
    "metaDescription": "Calculate tuition cost per credit hour and cost per individual class session."
  },
  {
    "id": "student-loan-payoff-calculator",
    "verticals": [
      "students"
    ],
    "name": "Student Loan Payoff Calculator",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculate loan payoff timeline, total interest paid, and savings from extra monthly payments.",
    "iconName": "DollarSign",
    "badge": "New",
    "keywords": [
      "student loan payoff calculator",
      "extra payment student loan",
      "loan interest savings",
      "student debt timeline"
    ],
    "metaTitle": "Student Loan Payoff Calculator \u2014 QuickForma",
    "metaDescription": "Calculate student loan payoff schedules and interest savings from extra monthly payments."
  },
  {
    "id": "roommate-rent-split-calculator",
    "verticals": [
      "business"
    ],
    "name": "Roommate Rent & Expense Splitter",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Fairly split total apartment rent based on bedroom square footage and private vs shared bathroom amenities.",
    "iconName": "Home",
    "badge": "New",
    "keywords": [
      "roommate rent split calculator",
      "fair rent split",
      "bedroom square feet rent",
      "split apartment rent"
    ],
    "metaTitle": "Roommate Rent & Expense Splitter \u2014 QuickForma",
    "metaDescription": "Split apartment rent fairly based on bedroom square footage and bathroom amenities."
  },
  {
    "id": "gpa-scale-converter",
    "verticals": [
      "students"
    ],
    "name": "GPA Scale Converter",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Convert GPAs across 4.0, 4.33, 5.0, percentage, and ECTS European credit conversion scales.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": [
      "gpa scale converter",
      "4.0 to 4.33 gpa",
      "gpa to percentage",
      "ects gpa conversion"
    ],
    "metaTitle": "GPA Scale Converter (4.0, 4.33, 5.0, ECTS) \u2014 QuickForma",
    "metaDescription": "Convert GPAs between 4.0, 4.33, 5.0, percentage, and ECTS scales."
  },
  {
    "id": "marks-to-gpa-converter",
    "verticals": [
      "students"
    ],
    "name": "Marks to GPA Converter",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Convert raw exam scores and marks directly into 4.0 GPA points and US letter grades.",
    "iconName": "Award",
    "badge": "New",
    "keywords": [
      "marks to gpa converter",
      "score to gpa",
      "percentage to gpa points",
      "exam mark grade"
    ],
    "metaTitle": "Marks to GPA Converter \u2014 QuickForma",
    "metaDescription": "Convert raw exam marks and percentages directly into 4.0 GPA points."
  },
  {
    "id": "cash-flow-runway-calculator",
    "verticals": [
      "business"
    ],
    "name": "Cash Flow Runway & Burn Rate Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculates net burn rate, cash zero date, and runway under revenue drop scenarios.",
    "iconName": "TrendingDown",
    "badge": "New",
    "keywords": [
      "cash flow runway calculator",
      "cash flow runway & burn rate calculator",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "Cash Flow Runway & Burn Rate Calculator \u2014 QuickForma",
    "metaDescription": "Free online Cash Flow Runway & Burn Rate Calculator. Calculates net burn rate, cash zero date, and runway under revenue drop scenarios. Fast, private, client-side execution."
  },
  {
    "id": "ebitda-calculator",
    "verticals": [
      "business"
    ],
    "name": "EBITDA & Operating Margin Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculates EBITDA, EBITDA margin %, and adjusted operating cash flow.",
    "iconName": "TrendingUp",
    "badge": "New",
    "keywords": [
      "ebitda calculator",
      "ebitda & operating margin calculator",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "EBITDA & Operating Margin Calculator \u2014 QuickForma",
    "metaDescription": "Free online EBITDA & Operating Margin Calculator. Calculates EBITDA, EBITDA margin %, and adjusted operating cash flow. Fast, private, client-side execution."
  },
  {
    "id": "working-capital-calculator",
    "verticals": [
      "business"
    ],
    "name": "Working Capital & Current Ratio Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Computes working capital, current ratio, and quick ratio for credit analysis.",
    "iconName": "Scale",
    "badge": "New",
    "keywords": [
      "working capital calculator",
      "working capital & current ratio calculator",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "Working Capital & Current Ratio Calculator \u2014 QuickForma",
    "metaDescription": "Free online Working Capital & Current Ratio Calculator. Computes working capital, current ratio, and quick ratio for credit analysis. Fast, private, client-side execution."
  },
  {
    "id": "npv-irr-calculator",
    "verticals": [
      "business"
    ],
    "name": "Net Present Value (NPV) & IRR Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Capital budgeting solver for project NPV, Internal Rate of Return (IRR), and cash flows.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": [
      "npv irr calculator",
      "net present value (npv) & irr calculator",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "Net Present Value (NPV) & IRR Calculator \u2014 QuickForma",
    "metaDescription": "Free online Net Present Value (NPV) & IRR Calculator. Capital budgeting solver for project NPV, Internal Rate of Return (IRR), and cash flows. Fast, private, client-side execution."
  },
  {
    "id": "cash-conversion-cycle-calculator",
    "verticals": [
      "business"
    ],
    "name": "Cash Conversion Cycle (CCC) Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Combines DIO + DSO - DPO to calculate total days capital is tied up in operations.",
    "iconName": "RefreshCw",
    "badge": "New",
    "keywords": [
      "cash conversion cycle calculator",
      "cash conversion cycle (ccc) solver",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "Cash Conversion Cycle (CCC) Solver \u2014 QuickForma",
    "metaDescription": "Free online Cash Conversion Cycle (CCC) Solver. Combines DIO + DSO - DPO to calculate total days capital is tied up in operations. Fast, private, client-side execution."
  },
  {
    "id": "cost-of-goods-sold-calculator",
    "verticals": [
      "business"
    ],
    "name": "COGS & Ending Inventory Cost Estimator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculates Beginning Inventory + Purchases - Ending Inventory under FIFO/LIFO.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": [
      "cost of goods sold calculator",
      "cogs & ending inventory cost estimator",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "COGS & Ending Inventory Cost Estimator \u2014 QuickForma",
    "metaDescription": "Free online COGS & Ending Inventory Cost Estimator. Calculates Beginning Inventory + Purchases - Ending Inventory under FIFO/LIFO. Fast, private, client-side execution."
  },
  {
    "id": "saas-net-retention-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Net Revenue Retention (NRR) & Expansion ARR Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Solves SaaS Net Revenue Retention (NRR %) and expansion MRR growth efficiency.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "saas net retention rate calculator",
      "net revenue retention (nrr) & expansion arr solver",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "Net Revenue Retention (NRR) & Expansion ARR Solver \u2014 QuickForma",
    "metaDescription": "Free online Net Revenue Retention (NRR) & Expansion ARR Solver. Solves SaaS Net Revenue Retention (NRR %) and expansion MRR growth efficiency. Fast, private, client-side execution."
  },
  {
    "id": "purchase-order-generator",
    "verticals": [
      "business"
    ],
    "name": "Purchase Order (PO) PDF Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Generates downloadable PDF purchase orders with line items, vendor terms, and shipping instructions.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "purchase order generator",
      "purchase order (po) pdf generator",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Purchase Order (PO) PDF Generator \u2014 QuickForma",
    "metaDescription": "Free online Purchase Order (PO) PDF Generator. Generates downloadable PDF purchase orders with line items, vendor terms, and shipping instructions. Fast, private, client-side execution."
  },
  {
    "id": "quote-generator",
    "verticals": [
      "business"
    ],
    "name": "Client Price Quote & Estimate Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Creates formal client price quotes with itemized pricing, expiration date, and acceptance terms.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "quote generator",
      "client price quote & estimate generator",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Client Price Quote & Estimate Generator \u2014 QuickForma",
    "metaDescription": "Free online Client Price Quote & Estimate Generator. Creates formal client price quotes with itemized pricing, expiration date, and acceptance terms. Fast, private, client-side execution."
  },
  {
    "id": "packing-slip-generator",
    "verticals": [
      "business"
    ],
    "name": "Warehouse Shipping Packing Slip Generator",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Generates order packing slips for ecommerce fulfillment and B2B order shipments.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "packing slip generator",
      "warehouse shipping packing slip generator",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Warehouse Shipping Packing Slip Generator \u2014 QuickForma",
    "metaDescription": "Free online Warehouse Shipping Packing Slip Generator. Generates order packing slips for ecommerce fulfillment and B2B order shipments. Fast, private, client-side execution."
  },
  {
    "id": "regex-tester",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Regex Matcher, Visualizer & Cheatsheet",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Client-side regular expression tester with live match highlighting, group extraction, and regex cheatsheet.",
    "iconName": "Code",
    "badge": "New",
    "keywords": [
      "regex tester",
      "regex matcher, visualizer & cheatsheet",
      "developer tool",
      "online calculator"
    ],
    "metaTitle": "Regex Matcher, Visualizer & Cheatsheet \u2014 QuickForma",
    "metaDescription": "Free online Regex Matcher, Visualizer & Cheatsheet. Client-side regular expression tester with live match highlighting, group extraction, and regex cheatsheet. Fast, private, client-side execution."
  },
  {
    "id": "subnet-calculator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "IPv4 Subnet Mask & CIDR Notation Calculator",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Solves CIDR notation (e.g. `/24`), subnet mask, usable host range, broadcast address, and total IPs.",
    "iconName": "Globe",
    "badge": "New",
    "keywords": [
      "subnet calculator",
      "ipv4 subnet mask & cidr notation calculator",
      "developer tool",
      "online calculator"
    ],
    "metaTitle": "IPv4 Subnet Mask & CIDR Notation Calculator \u2014 QuickForma",
    "metaDescription": "Free online IPv4 Subnet Mask & CIDR Notation Calculator. Solves CIDR notation (e.g. `/24`), subnet mask, usable host range, broadcast address, and total IPs. Fast, private, client-side execution."
  },
  {
    "id": "meta-tag-generator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "SEO Meta Title & Open Graph Tag Generator",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Generates Google search meta tags and Open Graph (OG) Facebook/Twitter social card tags.",
    "iconName": "Search",
    "badge": "New",
    "keywords": [
      "meta tag generator",
      "seo meta title & open graph tag generator",
      "content tool",
      "online calculator"
    ],
    "metaTitle": "SEO Meta Title & Open Graph Tag Generator \u2014 QuickForma",
    "metaDescription": "Free online SEO Meta Title & Open Graph Tag Generator. Generates Google search meta tags and Open Graph (OG) Facebook/Twitter social card tags. Fast, private, client-side execution."
  },
  {
    "id": "schema-markup-generator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "JSON-LD Schema.org Generator for Local Business & FAQ",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Visual builder for Schema.org JSON-LD code (FAQPage, Article, LocalBusiness, Product).",
    "iconName": "Search",
    "badge": "New",
    "keywords": [
      "schema markup generator",
      "json-ld schema.org generator for local business & faq",
      "content tool",
      "online calculator"
    ],
    "metaTitle": "JSON-LD Schema.org Generator for Local Business & FAQ \u2014 QuickForma",
    "metaDescription": "Free online JSON-LD Schema.org Generator for Local Business & FAQ. Visual builder for Schema.org JSON-LD code (FAQPage, Article, LocalBusiness, Product). Fast, private, client-side execution."
  },
  {
    "id": "google-serp-preview-tool",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Google Desktop & Mobile SERP Snippet Preview",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Simulates exact pixel width truncation of titles (600px) and meta descriptions (960px) on Google.",
    "iconName": "Search",
    "badge": "New",
    "keywords": [
      "google serp preview tool",
      "google desktop & mobile serp snippet preview",
      "content tool",
      "online calculator"
    ],
    "metaTitle": "Google Desktop & Mobile SERP Snippet Preview \u2014 QuickForma",
    "metaDescription": "Free online Google Desktop & Mobile SERP Snippet Preview. Simulates exact pixel width truncation of titles (600px) and meta descriptions (960px) on Google. Fast, private, client-side execution."
  },
  {
    "id": "high-school-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "Weighted 5.0 vs Unweighted 4.0 High School GPA",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculates high school GPA accounting for AP/Honors (+1.0) and IB (+0.5) course weights.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": [
      "high school gpa calculator",
      "weighted 5.0 vs unweighted 4.0 high school gpa",
      "students tool",
      "online calculator"
    ],
    "metaTitle": "Weighted 5.0 vs Unweighted 4.0 High School GPA \u2014 QuickForma",
    "metaDescription": "Free online Weighted 5.0 vs Unweighted 4.0 High School GPA. Calculates high school GPA accounting for AP/Honors (+1.0) and IB (+0.5) course weights. Fast, private, client-side execution."
  },
  {
    "id": "college-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "University Credit Hour GPA Calculator",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Standard college GPA calculator supporting 3-credit, 4-credit, and lab courses.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": [
      "college gpa calculator",
      "university credit hour gpa calculator",
      "students tool",
      "online calculator"
    ],
    "metaTitle": "University Credit Hour GPA Calculator \u2014 QuickForma",
    "metaDescription": "Free online University Credit Hour GPA Calculator. Standard college GPA calculator supporting 3-credit, 4-credit, and lab courses. Fast, private, client-side execution."
  },
  {
    "id": "semester-grade-calculator",
    "verticals": [
      "students"
    ],
    "name": "Midterm, Final Exam & Assignment Weight Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculates overall semester course grade from weighted midterms, homework, labs, and final exam.",
    "iconName": "BookOpen",
    "badge": "New",
    "keywords": [
      "semester grade calculator",
      "midterm, final exam & assignment weight solver",
      "students tool",
      "online calculator"
    ],
    "metaTitle": "Midterm, Final Exam & Assignment Weight Solver \u2014 QuickForma",
    "metaDescription": "Free online Midterm, Final Exam & Assignment Weight Solver. Calculates overall semester course grade from weighted midterms, homework, labs, and final exam. Fast, private, client-side execution."
  },
  {
    "id": "prime-factorization-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Prime Factors, GCF & LCM Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Solves prime factor trees, Greatest Common Factor (GCF), and Least Common Multiple (LCM) for integer sets.",
    "iconName": "Divide",
    "badge": "New",
    "keywords": [
      "prime factorization calculator",
      "prime factors, gcf & lcm calculator",
      "students tool",
      "online calculator"
    ],
    "metaTitle": "Prime Factors, GCF & LCM Calculator \u2014 QuickForma",
    "metaDescription": "Free online Prime Factors, GCF & LCM Calculator. Solves prime factor trees, Greatest Common Factor (GCF), and Least Common Multiple (LCM) for integer sets. Fast, private, client-side execution."
  },
  {
    "id": "base-converter",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Binary, Octal, Decimal & Hexadecimal Converter",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Converts numbers between Base-2 (Binary), Base-8 (Octal), Base-10 (Decimal), and Base-16 (Hexadecimal).",
    "iconName": "RefreshCw",
    "badge": "New",
    "keywords": [
      "base converter",
      "binary, octal, decimal & hexadecimal converter",
      "students tool",
      "online calculator"
    ],
    "metaTitle": "Binary, Octal, Decimal & Hexadecimal Converter \u2014 QuickForma",
    "metaDescription": "Free online Binary, Octal, Decimal & Hexadecimal Converter. Converts numbers between Base-2 (Binary), Base-8 (Octal), Base-10 (Decimal), and Base-16 (Hexadecimal). Fast, private, client-side execution."
  },
  {
    "id": "linear-regression-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Simple Linear Regression & $R^2$ Line of Best Fit",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculates regression line equation $\\hat{y} = \\beta_0 + \\beta_1 x$, correlation $r$, and coefficient of determination $R^2$.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": [
      "linear regression calculator",
      "simple linear regression & $r^2$ line of best fit",
      "students tool",
      "online calculator"
    ],
    "metaTitle": "Simple Linear Regression & $R^2$ Line of Best Fit \u2014 QuickForma",
    "metaDescription": "Free online Simple Linear Regression & $R^2$ Line of Best Fit. Calculates regression line equation $\\hat{y} = \\beta_0 + \\beta_1 x$, correlation $r$, and coefficient of determination $R^2$. Fast, private, client-side execution."
  },
  {
    "id": "standard-deviation-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Sample & Population Standard Deviation Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Solves sample ($s$) and population ($\\sigma$) standard deviation with variance steps.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": [
      "standard deviation calculator",
      "sample & population standard deviation solver",
      "students tool",
      "online calculator"
    ],
    "metaTitle": "Sample & Population Standard Deviation Solver \u2014 QuickForma",
    "metaDescription": "Free online Sample & Population Standard Deviation Solver. Solves sample ($s$) and population ($\\sigma$) standard deviation with variance steps. Fast, private, client-side execution."
  },
  {
    "id": "sample-size-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Margin of Error & Survey Sample Size Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculates minimum required survey sample size based on confidence level (95%, 99%) and margin of error.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": [
      "sample size calculator",
      "margin of error & survey sample size solver",
      "students tool",
      "online calculator"
    ],
    "metaTitle": "Margin of Error & Survey Sample Size Solver \u2014 QuickForma",
    "metaDescription": "Free online Margin of Error & Survey Sample Size Solver. Calculates minimum required survey sample size based on confidence level (95%, 99%) and margin of error. Fast, private, client-side execution."
  },
  {
    "id": "density-mass-volume-calculator",
    "verticals": [
      "students"
    ],
    "name": "Density, Mass & Volume Chemistry Solver",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Solves $\\text{Density} = \\frac{\\text{Mass}}{\\text{Volume}}$ with automatic unit conversions ($\\text{g/cm}^3, \\text{kg/m}^3, \\text{g/mL}$).",
    "iconName": "FlaskConical",
    "badge": "New",
    "keywords": [
      "density mass volume calculator",
      "density, mass & volume chemistry solver",
      "students tool",
      "online calculator"
    ],
    "metaTitle": "Density, Mass & Volume Chemistry Solver \u2014 QuickForma",
    "metaDescription": "Free online Density, Mass & Volume Chemistry Solver. Solves $\\text{Density} = \\frac{\\text{Mass}}{\\text{Volume}}$ with automatic unit conversions ($\\text{g/cm}^3, \\text{kg/m}^3, \\text{g/mL}$). Fast, private, client-side execution."
  },
  {
    "id": "projectile-motion-calculator",
    "verticals": [
      "students"
    ],
    "name": "2D Trajectory, Range & Max Height Solver",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Solves 2D projectile motion: launching angle $\\theta$, velocity $v_0$, flight time, maximum height, and horizontal range.",
    "iconName": "Compass",
    "badge": "New",
    "keywords": [
      "projectile motion calculator",
      "2d trajectory, range & max height solver",
      "students tool",
      "online calculator"
    ],
    "metaTitle": "2D Trajectory, Range & Max Height Solver \u2014 QuickForma",
    "metaDescription": "Free online 2D Trajectory, Range & Max Height Solver. Solves 2D projectile motion: launching angle $\\theta$, velocity $v_0$, flight time, maximum height, and horizontal range. Fast, private, client-side execution."
  },
  {
    "id": "ebay-final-value-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "eBay Seller Fee & Store Subscription Profit",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculates eBay final value fees, insertion fees, store subscription discount tiers, and profit.",
    "iconName": "ShoppingBag",
    "badge": "New",
    "keywords": [
      "ebay final value fee calculator",
      "ebay seller fee & store subscription profit",
      "ecommerce tool",
      "online calculator"
    ],
    "metaTitle": "eBay Seller Fee & Store Subscription Profit \u2014 QuickForma",
    "metaDescription": "Free online eBay Seller Fee & Store Subscription Profit. Calculates eBay final value fees, insertion fees, store subscription discount tiers, and profit. Fast, private, client-side execution."
  },
  {
    "id": "tiktok-shop-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "TikTok Shop Commission & Creator Affiliate Margin",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Solves TikTok Shop referral commissions, payment processing fees, and creator affiliate payouts.",
    "iconName": "ShoppingBag",
    "badge": "New",
    "keywords": [
      "tiktok shop fee calculator",
      "tiktok shop commission & creator affiliate margin",
      "ecommerce tool",
      "online calculator"
    ],
    "metaTitle": "TikTok Shop Commission & Creator Affiliate Margin \u2014 QuickForma",
    "metaDescription": "Free online TikTok Shop Commission & Creator Affiliate Margin. Solves TikTok Shop referral commissions, payment processing fees, and creator affiliate payouts. Fast, private, client-side execution."
  },
  {
    "id": "cost-per-acquisition-cpa-calculator",
    "verticals": [
      "business"
    ],
    "name": "Ecommerce Customer CPA & LTV:CAC Ratio",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculates Cost Per Acquisition (CPA) across ad channels and compares against 3:1 LTV:CAC benchmark.",
    "iconName": "Target",
    "badge": "New",
    "keywords": [
      "cost per acquisition cpa calculator",
      "ecommerce customer cpa & ltv:cac ratio",
      "ecommerce tool",
      "online calculator"
    ],
    "metaTitle": "Ecommerce Customer CPA & LTV:CAC Ratio \u2014 QuickForma",
    "metaDescription": "Free online Ecommerce Customer CPA & LTV:CAC Ratio. Calculates Cost Per Acquisition (CPA) across ad channels and compares against 3:1 LTV:CAC benchmark. Fast, private, client-side execution."
  },
  {
    "id": "ecommerce-conversion-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Store Visitor to Purchase Conversion Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculates store conversion rate % and models revenue impact of 0.5% conversion rate improvements.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "ecommerce conversion rate calculator",
      "store visitor to purchase conversion solver",
      "ecommerce tool",
      "online calculator"
    ],
    "metaTitle": "Store Visitor to Purchase Conversion Solver \u2014 QuickForma",
    "metaDescription": "Free online Store Visitor to Purchase Conversion Solver. Calculates store conversion rate % and models revenue impact of 0.5% conversion rate improvements. Fast, private, client-side execution."
  },
  {
    "id": "ecommerce-net-profit-margin-calculator",
    "verticals": [
      "business"
    ],
    "name": "All-in Ecommerce Store P&L Profit Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Comprehensive P&L solver subtracting COGS, ad spend, merchant fees, shipping, and software costs.",
    "iconName": "TrendingUp",
    "badge": "New",
    "keywords": [
      "ecommerce net profit margin calculator",
      "all-in ecommerce store p&l profit solver",
      "ecommerce tool",
      "online calculator"
    ],
    "metaTitle": "All-in Ecommerce Store P&L Profit Solver \u2014 QuickForma",
    "metaDescription": "Free online All-in Ecommerce Store P&L Profit Solver. Comprehensive P&L solver subtracting COGS, ad spend, merchant fees, shipping, and software costs. Fast, private, client-side execution."
  },
  {
    "id": "safety-stock-calculator",
    "verticals": [
      "business"
    ],
    "name": "Safety Stock & Desired Service Level Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Solves required safety stock $SS = Z \\times \\sigma_{LT}$ based on lead time variability and service level targets (95%, 99%).",
    "iconName": "Shield",
    "badge": "New",
    "keywords": [
      "safety stock calculator",
      "safety stock & desired service level solver",
      "operations tool",
      "online calculator"
    ],
    "metaTitle": "Safety Stock & Desired Service Level Solver \u2014 QuickForma",
    "metaDescription": "Free online Safety Stock & Desired Service Level Solver. Solves required safety stock $SS = Z \\times \\sigma_{LT}$ based on lead time variability and service level targets (95%, 99%). Fast, private, client-side execution."
  },
  {
    "id": "machine-downtime-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "Unplanned Equipment Downtime Financial Loss",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculates hourly financial cost of factory downtime including lost throughput and idle labor.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "machine downtime cost calculator",
      "unplanned equipment downtime financial loss",
      "operations tool",
      "online calculator"
    ],
    "metaTitle": "Unplanned Equipment Downtime Financial Loss \u2014 QuickForma",
    "metaDescription": "Free online Unplanned Equipment Downtime Financial Loss. Calculates hourly financial cost of factory downtime including lost throughput and idle labor. Fast, private, client-side execution."
  },
  {
    "id": "capacity-utilization-calculator",
    "verticals": [
      "business"
    ],
    "name": "Machine Hours Available vs Actual Run Time",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculates machine capacity utilization %, available capacity hours, and bottleneck constraints.",
    "iconName": "Gauge",
    "badge": "New",
    "keywords": [
      "capacity utilization calculator",
      "machine hours available vs actual run time",
      "operations tool",
      "online calculator"
    ],
    "metaTitle": "Machine Hours Available vs Actual Run Time \u2014 QuickForma",
    "metaDescription": "Free online Machine Hours Available vs Actual Run Time. Calculates machine capacity utilization %, available capacity hours, and bottleneck constraints. Fast, private, client-side execution."
  },
  {
    "id": "takt-time-calculator",
    "verticals": [
      "business"
    ],
    "name": "Production Pace & Customer Demand Rate Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Solves Takt Time $T = \\frac{\\text{Available Production Time}}{\\text{Customer Demand Quantity}}$ in seconds per unit.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "takt time calculator",
      "production pace & customer demand rate solver",
      "operations tool",
      "online calculator"
    ],
    "metaTitle": "Production Pace & Customer Demand Rate Solver \u2014 QuickForma",
    "metaDescription": "Free online Production Pace & Customer Demand Rate Solver. Solves Takt Time $T = \\frac{\\text{Available Production Time}}{\\text{Customer Demand Quantity}}$ in seconds per unit. Fast, private, client-side execution."
  },
  {
    "id": "cap-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Real Estate Capitalization Rate & Net Operating Income",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculates Cap Rate $\\text{Cap Rate} = \\frac{\\text{NOI}}{\\text{Property Price}}$ and Net Operating Income (NOI).",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "cap rate calculator",
      "real estate capitalization rate & net operating income",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "Real Estate Capitalization Rate & Net Operating Income \u2014 QuickForma",
    "metaDescription": "Free online Real Estate Capitalization Rate & Net Operating Income. Calculates Cap Rate $\\text{Cap Rate} = \\frac{\\text{NOI}}{\\text{Property Price}}$ and Net Operating Income (NOI). Fast, private, client-side execution."
  },
  {
    "id": "cash-on-cash-return-calculator",
    "verticals": [
      "business"
    ],
    "name": "Cash-on-Cash Return & Initial Outlay Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Solves annual pre-tax cash flow divided by total cash invested ($\\text{Down Payment} + \\text{Closing Costs}$).",
    "iconName": "Building",
    "badge": "New",
    "keywords": [
      "cash on cash return calculator",
      "cash-on-cash return & initial outlay solver",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "Cash-on-Cash Return & Initial Outlay Solver \u2014 QuickForma",
    "metaDescription": "Free online Cash-on-Cash Return & Initial Outlay Solver. Solves annual pre-tax cash flow divided by total cash invested ($\\text{Down Payment} + \\text{Closing Costs}$). Fast, private, client-side execution."
  },
  {
    "id": "rental-property-roi-calculator",
    "verticals": [
      "business"
    ],
    "name": "All-In Rental Property Monthly Cash Flow & ROI",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Solves net rental cash flow after mortgage, taxes, insurance, vacancy allowance, and maintenance.",
    "iconName": "Home",
    "badge": "New",
    "keywords": [
      "rental property roi calculator",
      "all-in rental property monthly cash flow & roi",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "All-In Rental Property Monthly Cash Flow & ROI \u2014 QuickForma",
    "metaDescription": "Free online All-In Rental Property Monthly Cash Flow & ROI. Solves net rental cash flow after mortgage, taxes, insurance, vacancy allowance, and maintenance. Fast, private, client-side execution."
  },
  {
    "id": "amortization-schedule-extra-payments",
    "verticals": [
      "business"
    ],
    "name": "Mortgage Payoff Acceleration & Interest Saved",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculates loan payoff date acceleration and total interest saved by making extra monthly principal payments.",
    "iconName": "Calendar",
    "badge": "New",
    "keywords": [
      "amortization schedule extra payments",
      "mortgage payoff acceleration & interest saved",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "Mortgage Payoff Acceleration & Interest Saved \u2014 QuickForma",
    "metaDescription": "Free online Mortgage Payoff Acceleration & Interest Saved. Calculates loan payoff date acceleration and total interest saved by making extra monthly principal payments. Fast, private, client-side execution."
  },
  {
    "id": "short-term-rental-airbnb-calculator",
    "verticals": [
      "business"
    ],
    "name": "Airbnb Occupancy Rate & ADR Revenue Solver",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Estimates short-term rental monthly revenue based on Average Daily Rate (ADR) and Occupancy Rate %.",
    "iconName": "Home",
    "badge": "New",
    "keywords": [
      "short term rental airbnb calculator",
      "airbnb occupancy rate & adr revenue solver",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "Airbnb Occupancy Rate & ADR Revenue Solver \u2014 QuickForma",
    "metaDescription": "Free online Airbnb Occupancy Rate & ADR Revenue Solver. Estimates short-term rental monthly revenue based on Average Daily Rate (ADR) and Occupancy Rate %. Fast, private, client-side execution."
  },
  {
    "id": "customer-acquisition-cost-cac",
    "verticals": [
      "business"
    ],
    "name": "Blended vs Paid CAC & Channel Efficiency Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Solves Customer Acquisition Cost (CAC = $\\text{Total S&M Spend} / \\text{New Customers}$) by channel.",
    "iconName": "Target",
    "badge": "New",
    "keywords": [
      "customer acquisition cost cac",
      "blended vs paid cac & channel efficiency solver",
      "marketing tool",
      "online calculator"
    ],
    "metaTitle": "Blended vs Paid CAC & Channel Efficiency Solver \u2014 QuickForma",
    "metaDescription": "Free online Blended vs Paid CAC & Channel Efficiency Solver. Solves Customer Acquisition Cost (CAC = $\\text{Total S&M Spend} / \\text{New Customers}$) by channel. Fast, private, client-side execution."
  },
  {
    "id": "return-on-ad-spend-roas",
    "verticals": [
      "business"
    ],
    "name": "Google, Meta, TikTok Ad Spend ROAS & Break-Even",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Solves Return on Ad Spend ($ROAS = \\text{Ad Revenue} / \\text{Ad Cost}$) and break-even target.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "return on ad spend roas",
      "google, meta, tiktok ad spend roas & break-even",
      "marketing tool",
      "online calculator"
    ],
    "metaTitle": "Google, Meta, TikTok Ad Spend ROAS & Break-Even \u2014 QuickForma",
    "metaDescription": "Free online Google, Meta, TikTok Ad Spend ROAS & Break-Even. Solves Return on Ad Spend ($ROAS = \\text{Ad Revenue} / \\text{Ad Cost}$) and break-even target. Fast, private, client-side execution."
  },
  {
    "id": "click-through-rate-ctr-calculator",
    "verticals": [
      "business"
    ],
    "name": "Impressions & Clicks CTR Percentage Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Solves Click-Through Rate ($CTR = \\frac{\\text{Clicks}}{\\text{Impressions}} \\times 100\\%$) for ads and organic search.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "click through rate ctr calculator",
      "impressions & clicks ctr percentage solver",
      "marketing tool",
      "online calculator"
    ],
    "metaTitle": "Impressions & Clicks CTR Percentage Solver \u2014 QuickForma",
    "metaDescription": "Free online Impressions & Clicks CTR Percentage Solver. Solves Click-Through Rate ($CTR = \\frac{\\text{Clicks}}{\\text{Impressions}} \\times 100\\%$) for ads and organic search. Fast, private, client-side execution."
  },
  {
    "id": "ab-test-significance-calculator",
    "verticals": [
      "business"
    ],
    "name": "Statistical Significance & Confidence Level Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Evaluates A/B test conversion rate results for statistical significance ($p < 0.05$).",
    "iconName": "Target",
    "badge": "New",
    "keywords": [
      "ab test significance calculator",
      "statistical significance & confidence level solver",
      "marketing tool",
      "online calculator"
    ],
    "metaTitle": "Statistical Significance & Confidence Level Solver \u2014 QuickForma",
    "metaDescription": "Free online Statistical Significance & Confidence Level Solver. Evaluates A/B test conversion rate results for statistical significance ($p < 0.05$). Fast, private, client-side execution."
  },
  {
    "id": "employee-turnover-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "Cost of Replacing an Employee & Departure Loss",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Quantifies financial cost of employee turnover (typically 0.5x to 2x annual salary in recruiting & lost productivity).",
    "iconName": "Briefcase",
    "badge": "New",
    "keywords": [
      "employee turnover cost calculator",
      "cost of replacing an employee & departure loss",
      "hr tool",
      "online calculator"
    ],
    "metaTitle": "Cost of Replacing an Employee & Departure Loss \u2014 QuickForma",
    "metaDescription": "Free online Cost of Replacing an Employee & Departure Loss. Quantifies financial cost of employee turnover (typically 0.5x to 2x annual salary in recruiting & lost productivity). Fast, private, client-side execution."
  },
  {
    "id": "total-compensation-calculator",
    "verticals": [
      "business"
    ],
    "name": "Base Salary + Health + 401k + Bonus Total Value",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculates total employee compensation package value including benefits, employer 401k match, and bonuses.",
    "iconName": "Briefcase",
    "badge": "New",
    "keywords": [
      "total compensation calculator",
      "base salary + health + 401k + bonus total value",
      "hr tool",
      "online calculator"
    ],
    "metaTitle": "Base Salary + Health + 401k + Bonus Total Value \u2014 QuickForma",
    "metaDescription": "Free online Base Salary + Health + 401k + Bonus Total Value. Calculates total employee compensation package value including benefits, employer 401k match, and bonuses. Fast, private, client-side execution."
  },
  {
    "id": "employee-cost-to-employer-calculator",
    "verticals": [
      "business"
    ],
    "name": "FUTA, SUTA, FICA & Benefits Full Burden Rate",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculates full employer labor burden (typically 1.25x to 1.4x base salary) including payroll taxes and insurance.",
    "iconName": "Briefcase",
    "badge": "New",
    "keywords": [
      "employee cost to employer calculator",
      "futa, suta, fica & benefits full burden rate",
      "hr tool",
      "online calculator"
    ],
    "metaTitle": "FUTA, SUTA, FICA & Benefits Full Burden Rate \u2014 QuickForma",
    "metaDescription": "Free online FUTA, SUTA, FICA & Benefits Full Burden Rate. Calculates full employer labor burden (typically 1.25x to 1.4x base salary) including payroll taxes and insurance. Fast, private, client-side execution."
  },
  {
    "id": "contractor-vs-employee-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "1099 Contractor vs W-2 Employee Cost",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Side-by-side cost comparison between hiring a 1099 independent contractor vs a full-time W-2 employee.",
    "iconName": "Scale",
    "badge": "New",
    "keywords": [
      "contractor vs employee cost calculator",
      "1099 contractor vs w-2 employee cost",
      "hr tool",
      "online calculator"
    ],
    "metaTitle": "1099 Contractor vs W-2 Employee Cost \u2014 QuickForma",
    "metaDescription": "Free online 1099 Contractor vs W-2 Employee Cost. Side-by-side cost comparison between hiring a 1099 independent contractor vs a full-time W-2 employee. Fast, private, client-side execution."
  },
  {
    "id": "emergency-fund-calculator",
    "verticals": [
      "business"
    ],
    "name": "3-to-6 Month Household Expense Reserve Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculates recommended emergency fund cash reserve based on monthly essential living expenses.",
    "iconName": "DollarSign",
    "badge": "New",
    "keywords": [
      "emergency fund calculator",
      "3-to-6 month household expense reserve solver",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "3-to-6 Month Household Expense Reserve Solver \u2014 QuickForma",
    "metaDescription": "Free online 3-to-6 Month Household Expense Reserve Solver. Calculates recommended emergency fund cash reserve based on monthly essential living expenses. Fast, private, client-side execution."
  },
  {
    "id": "debt-snowball-avalanche-calculator",
    "verticals": [
      "business"
    ],
    "name": "Credit Card & Debt Acceleration Payoff",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Compares Debt Snowball (lowest balance first) vs Debt Avalanche (highest interest first) payoff schedules.",
    "iconName": "CreditCard",
    "badge": "New",
    "keywords": [
      "debt snowball avalanche calculator",
      "credit card & debt acceleration payoff",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "Credit Card & Debt Acceleration Payoff \u2014 QuickForma",
    "metaDescription": "Free online Credit Card & Debt Acceleration Payoff. Compares Debt Snowball (lowest balance first) vs Debt Avalanche (highest interest first) payoff schedules. Fast, private, client-side execution."
  },
  {
    "id": "net-worth-calculator",
    "verticals": [
      "business"
    ],
    "name": "Assets minus Liabilities Household Net Worth Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Solves total personal net worth by summing liquid cash, investments, home equity minus total debts.",
    "iconName": "DollarSign",
    "badge": "New",
    "keywords": [
      "net worth calculator",
      "assets minus liabilities household net worth solver",
      "finance tool",
      "online calculator"
    ],
    "metaTitle": "Assets minus Liabilities Household Net Worth Solver \u2014 QuickForma",
    "metaDescription": "Free online Assets minus Liabilities Household Net Worth Solver. Solves total personal net worth by summing liquid cash, investments, home equity minus total debts. Fast, private, client-side execution."
  },
  {
    "id": "contribution-margin-calculator",
    "verticals": [
      "business"
    ],
    "name": "Contribution Margin Ratio Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Solves sales minus variable costs and contribution margin per unit.",
    "iconName": "TrendingUp",
    "badge": "New",
    "keywords": [
      "contribution margin calculator",
      "contribution margin ratio calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Contribution Margin Ratio Calculator \u2014 QuickForma",
    "metaDescription": "Free online Contribution Margin Ratio Calculator. Solves sales minus variable costs and contribution margin per unit. Fast, private, client-side execution."
  },
  {
    "id": "bibliography-generator",
    "verticals": [
      "students"
    ],
    "name": "APA 7, MLA 9, Chicago Manual Style Builder",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Generates formatted academic citations and full bibliography entries for books, journals, and websites.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "bibliography generator",
      "apa 7, mla 9, chicago manual style builder",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "APA 7, MLA 9, Chicago Manual Style Builder \u2014 QuickForma",
    "metaDescription": "Free online APA 7, MLA 9, Chicago Manual Style Builder. Generates formatted academic citations and full bibliography entries for books, journals, and websites. Fast, private, client-side execution."
  },
  {
    "id": "amazon-fba-calculator",
    "verticals": [
      "business"
    ],
    "name": "Amazon FBA Fee & Net Profit Margin per ASIN",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculates Amazon referral fees, FBA fulfillment fees, monthly storage, and net margin per product ASIN.",
    "iconName": "ShoppingBag",
    "badge": "New",
    "keywords": [
      "amazon fba calculator",
      "amazon fba fee & net profit margin per asin",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Amazon FBA Fee & Net Profit Margin per ASIN \u2014 QuickForma",
    "metaDescription": "Free online Amazon FBA Fee & Net Profit Margin per ASIN. Calculates Amazon referral fees, FBA fulfillment fees, monthly storage, and net margin per product ASIN. Fast, private, client-side execution."
  },
  {
    "id": "take-home-pay-paycheck-calculator",
    "verticals": [
      "business"
    ],
    "name": "US Gross to Net Paycheck Tax Estimator",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculates net take-home pay after Federal income tax, FICA (Social Security & Medicare), and state withholding.",
    "iconName": "Receipt",
    "badge": "New",
    "keywords": [
      "take home pay paycheck calculator",
      "us gross to net paycheck tax estimator",
      "career & hr",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "US Gross to Net Paycheck Tax Estimator \u2014 QuickForma",
    "metaDescription": "Free online US Gross to Net Paycheck Tax Estimator. Calculates net take-home pay after Federal income tax, FICA (Social Security & Medicare), and state withholding. Fast, private, client-side execution."
  },
  {
    "id": "time-card-hours-calculator",
    "verticals": [
      "business"
    ],
    "name": "Weekly Time Card Clock-In / Clock-Out Total Hours",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Solves weekly time card total hours, subtracting unpaid lunch breaks across 7 days.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "time card hours calculator",
      "weekly time card clock-in / clock-out total hours",
      "career & hr",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Weekly Time Card Clock-In / Clock-Out Total Hours \u2014 QuickForma",
    "metaDescription": "Free online Weekly Time Card Clock-In / Clock-Out Total Hours. Solves weekly time card total hours, subtracting unpaid lunch breaks across 7 days. Fast, private, client-side execution."
  },
  {
    "id": "budget-50-30-20-calculator",
    "verticals": [
      "business"
    ],
    "name": "50/30/20 Rule Needs, Wants & Savings Budget Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Divides net take-home income into 50% Needs, 30% Wants, and 20% Savings & Debt Repayment.",
    "iconName": "PieChart",
    "badge": "New",
    "keywords": [
      "budget 50 30 20 calculator",
      "50/30/20 rule needs, wants & savings budget solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "50/30/20 Rule Needs, Wants & Savings Budget Solver \u2014 QuickForma",
    "metaDescription": "Free online 50/30/20 Rule Needs, Wants & Savings Budget Solver. Divides net take-home income into 50% Needs, 30% Wants, and 20% Savings & Debt Repayment. Fast, private, client-side execution."
  },
  {
    "id": "car-loan-payment-calculator",
    "verticals": [
      "business"
    ],
    "name": "Auto Loan Monthly Payment & Trade-In Interest",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculates monthly auto loan payments, total interest paid, trade-in equity, and sales tax.",
    "iconName": "Building",
    "badge": "New",
    "keywords": [
      "car loan payment calculator",
      "auto loan monthly payment & trade-in interest",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Auto Loan Monthly Payment & Trade-In Interest \u2014 QuickForma",
    "metaDescription": "Free online Auto Loan Monthly Payment & Trade-In Interest. Calculates monthly auto loan payments, total interest paid, trade-in equity, and sales tax. Fast, private, client-side execution."
  },
  {
    "id": "retirement-nest-egg-calculator",
    "verticals": [
      "business"
    ],
    "name": "401k / IRA Compound Growth & Safe Withdrawal",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Projects retirement portfolio growth and safe annual withdrawal amounts based on the 4% rule.",
    "iconName": "TrendingUp",
    "badge": "New",
    "keywords": [
      "retirement nest egg calculator",
      "401k / ira compound growth & safe withdrawal",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "401k / IRA Compound Growth & Safe Withdrawal \u2014 QuickForma",
    "metaDescription": "Free online 401k / IRA Compound Growth & Safe Withdrawal. Projects retirement portfolio growth and safe annual withdrawal amounts based on the 4% rule. Fast, private, client-side execution."
  },
  {
    "id": "personal-cash-flow-savings-rate",
    "verticals": [
      "business"
    ],
    "name": "Monthly Household Savings Rate & Surplus Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Solves household net savings rate % ($\\frac{\\text{Income} - \\text{Expenses}}{\\text{Income}} \\times 100\\%$).",
    "iconName": "DollarSign",
    "badge": "New",
    "keywords": [
      "personal cash flow savings rate",
      "monthly household savings rate & surplus solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Monthly Household Savings Rate & Surplus Solver \u2014 QuickForma",
    "metaDescription": "Free online Monthly Household Savings Rate & Surplus Solver. Solves household net savings rate % ($\\frac{\\text{Income} - \\text{Expenses}}{\\text{Income}} \\times 100\\%$). Fast, private, client-side execution."
  },
  {
    "id": "debt-to-income-dti-ratio-calculator",
    "verticals": [
      "business"
    ],
    "name": "Front-End & Back-End DTI Ratio Mortgage Solver",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Solves front-end housing DTI (28% max) and back-end total debt DTI (36\u201343% max) for mortgage qualification.",
    "iconName": "Scale",
    "badge": "New",
    "keywords": [
      "debt to income dti ratio calculator",
      "front-end & back-end dti ratio mortgage solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Front-End & Back-End DTI Ratio Mortgage Solver \u2014 QuickForma",
    "metaDescription": "Free online Front-End & Back-End DTI Ratio Mortgage Solver. Solves front-end housing DTI (28% max) and back-end total debt DTI (36\u201343% max) for mortgage qualification. Fast, private, client-side execution."
  },
  {
    "id": "dscr-calculator",
    "verticals": [
      "business"
    ],
    "name": "Debt Service Coverage Ratio (DSCR) Calculator",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Commercial loan qualification metric used by banks and SBA lenders.",
    "iconName": "Building",
    "badge": "New",
    "keywords": [
      "dscr calculator",
      "debt service coverage ratio (dscr) calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Debt Service Coverage Ratio (DSCR) Calculator \u2014 QuickForma",
    "metaDescription": "Free online Debt Service Coverage Ratio (DSCR) Calculator. Commercial loan qualification metric used by banks and SBA lenders. Fast, private, client-side execution."
  },
  {
    "id": "cac-payback-calculator",
    "verticals": [
      "business"
    ],
    "name": "Customer Acquisition Cost (CAC) & Payback",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculates CAC across marketing channels and months to recover acquisition costs.",
    "iconName": "Users",
    "badge": "New",
    "keywords": [
      "cac payback calculator",
      "customer acquisition cost (cac) & payback",
      "marketing & growth",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Customer Acquisition Cost (CAC) & Payback \u2014 QuickForma",
    "metaDescription": "Free online Customer Acquisition Cost (CAC) & Payback. Calculates CAC across marketing channels and months to recover acquisition costs. Fast, private, client-side execution."
  },
  {
    "id": "wacc-calculator",
    "verticals": [
      "business"
    ],
    "name": "Weighted Average Cost of Capital (WACC) Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculates corporate cost of capital using cost of equity and post-tax cost of debt.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "wacc calculator",
      "weighted average cost of capital (wacc) solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Weighted Average Cost of Capital (WACC) Solver \u2014 QuickForma",
    "metaDescription": "Free online Weighted Average Cost of Capital (WACC) Solver. Calculates corporate cost of capital using cost of equity and post-tax cost of debt. Fast, private, client-side execution."
  },
  {
    "id": "free-cash-flow-calculator",
    "verticals": [
      "business"
    ],
    "name": "Free Cash Flow (FCF) & Unlevered FCF Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Computes FCF to Firm (FCFF) and FCF to Equity (FCFE) for valuation.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": [
      "free cash flow calculator",
      "free cash flow (fcf) & unlevered fcf calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Free Cash Flow (FCF) & Unlevered FCF Calculator \u2014 QuickForma",
    "metaDescription": "Free online Free Cash Flow (FCF) & Unlevered FCF Calculator. Computes FCF to Firm (FCFF) and FCF to Equity (FCFE) for valuation. Fast, private, client-side execution."
  },
  {
    "id": "inventory-holding-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "Inventory Carrying & Holding Cost Calculator",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculates annual holding cost %, storage fees, capital cost, and insurance.",
    "iconName": "Package",
    "badge": "New",
    "keywords": [
      "inventory holding cost calculator",
      "inventory carrying & holding cost calculator",
      "operations & manufacturing",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Inventory Carrying & Holding Cost Calculator \u2014 QuickForma",
    "metaDescription": "Free online Inventory Carrying & Holding Cost Calculator. Calculates annual holding cost %, storage fees, capital cost, and insurance. Fast, private, client-side execution."
  },
  {
    "id": "payback-period-calculator",
    "verticals": [
      "business"
    ],
    "name": "Discounted Payback Period Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Time required to recover initial investment taking time value of money into account.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "payback period calculator",
      "discounted payback period calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Discounted Payback Period Calculator \u2014 QuickForma",
    "metaDescription": "Free online Discounted Payback Period Calculator. Time required to recover initial investment taking time value of money into account. Fast, private, client-side execution."
  },
  {
    "id": "saas-magic-number-calculator",
    "verticals": [
      "business"
    ],
    "name": "SaaS Magic Number & Efficiency Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Evaluates sales efficiency by measuring net new ARR generated per dollar of S&M spend.",
    "iconName": "Zap",
    "badge": "New",
    "keywords": [
      "saas magic number calculator",
      "saas magic number & efficiency calculator",
      "marketing & growth",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "SaaS Magic Number & Efficiency Calculator \u2014 QuickForma",
    "metaDescription": "Free online SaaS Magic Number & Efficiency Calculator. Evaluates sales efficiency by measuring net new ARR generated per dollar of S&M spend. Fast, private, client-side execution."
  },
  {
    "id": "churn-rate-impact-calculator",
    "verticals": [
      "business"
    ],
    "name": "Customer Churn Revenue Loss Calculator",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Quantifies annual recurring revenue (ARR) lost to monthly customer churn.",
    "iconName": "TrendingDown",
    "badge": "New",
    "keywords": [
      "churn rate impact calculator",
      "customer churn revenue loss calculator",
      "marketing & growth",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Customer Churn Revenue Loss Calculator \u2014 QuickForma",
    "metaDescription": "Free online Customer Churn Revenue Loss Calculator. Quantifies annual recurring revenue (ARR) lost to monthly customer churn. Fast, private, client-side execution."
  },
  {
    "id": "sba-7a-loan-calculator",
    "verticals": [
      "business"
    ],
    "name": "SBA 7(a) Loan Amortization Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculates SBA guarantee fees, interest caps, and monthly principal/interest payments.",
    "iconName": "Building",
    "badge": "New",
    "keywords": [
      "sba 7a loan calculator",
      "sba 7(a) loan amortization calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "SBA 7(a) Loan Amortization Calculator \u2014 QuickForma",
    "metaDescription": "Free online SBA 7(a) Loan Amortization Calculator. Calculates SBA guarantee fees, interest caps, and monthly principal/interest payments. Fast, private, client-side execution."
  },
  {
    "id": "saas-rule-of-40-calculator",
    "verticals": [
      "business"
    ],
    "name": "SaaS Rule of 40 Benchmark Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Combines YoY revenue growth rate and EBITDA margin to measure software health.",
    "iconName": "Award",
    "badge": "New",
    "keywords": [
      "saas rule of 40 calculator",
      "saas rule of 40 benchmark calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "SaaS Rule of 40 Benchmark Calculator \u2014 QuickForma",
    "metaDescription": "Free online SaaS Rule of 40 Benchmark Calculator. Combines YoY revenue growth rate and EBITDA margin to measure software health. Fast, private, client-side execution."
  },
  {
    "id": "accounts-receivable-turnover-calculator",
    "verticals": [
      "business"
    ],
    "name": "Days Sales Outstanding (DSO) Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Measures average number of days required to collect payment after a sale.",
    "iconName": "RotateCw",
    "badge": "New",
    "keywords": [
      "accounts receivable turnover calculator",
      "days sales outstanding (dso) calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Days Sales Outstanding (DSO) Calculator \u2014 QuickForma",
    "metaDescription": "Free online Days Sales Outstanding (DSO) Calculator. Measures average number of days required to collect payment after a sale. Fast, private, client-side execution."
  },
  {
    "id": "accounts-payable-turnover-calculator",
    "verticals": [
      "business"
    ],
    "name": "Days Payable Outstanding (DPO) Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Measures average time a company takes to pay vendor bills and invoices.",
    "iconName": "RotateCcw",
    "badge": "New",
    "keywords": [
      "accounts payable turnover calculator",
      "days payable outstanding (dpo) calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Days Payable Outstanding (DPO) Calculator \u2014 QuickForma",
    "metaDescription": "Free online Days Payable Outstanding (DPO) Calculator. Measures average time a company takes to pay vendor bills and invoices. Fast, private, client-side execution."
  },
  {
    "id": "credit-card-processing-savings-calculator",
    "verticals": [
      "business"
    ],
    "name": "Interchange Plus vs Flat Rate Savings Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Audits credit card processor statements to calculate true interchange savings.",
    "iconName": "CreditCard",
    "badge": "New",
    "keywords": [
      "credit card processing savings calculator",
      "interchange plus vs flat rate savings calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Interchange Plus vs Flat Rate Savings Calculator \u2014 QuickForma",
    "metaDescription": "Free online Interchange Plus vs Flat Rate Savings Calculator. Audits credit card processor statements to calculate true interchange savings. Fast, private, client-side execution."
  },
  {
    "id": "merchant-cash-advance-calculator",
    "verticals": [
      "business"
    ],
    "name": "Merchant Cash Advance Factor Rate & APR Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Converts MCA factor rates (e.g. 1.35x) into effective annual percentage rate (APR).",
    "iconName": "AlertCircle",
    "badge": "New",
    "keywords": [
      "merchant cash advance calculator",
      "merchant cash advance factor rate & apr solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Merchant Cash Advance Factor Rate & APR Solver \u2014 QuickForma",
    "metaDescription": "Free online Merchant Cash Advance Factor Rate & APR Solver. Converts MCA factor rates (e.g. 1.35x) into effective annual percentage rate (APR). Fast, private, client-side execution."
  },
  {
    "id": "startup-seed-runway-planner",
    "verticals": [
      "business"
    ],
    "name": "Pre-Seed/Seed Round Funding Runway Planner",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Plans hiring roadmap, burn rate expansion, and milestone dates for tech startups.",
    "iconName": "TrendingDown",
    "badge": "New",
    "keywords": [
      "startup seed runway planner",
      "pre-seed/seed round funding runway planner",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Pre-Seed/Seed Round Funding Runway Planner \u2014 QuickForma",
    "metaDescription": "Free online Pre-Seed/Seed Round Funding Runway Planner. Plans hiring roadmap, burn rate expansion, and milestone dates for tech startups. Fast, private, client-side execution."
  },
  {
    "id": "sales-commission-calculator",
    "verticals": [
      "business"
    ],
    "name": "Tiered Sales Commission & Split Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculates quota achievement tiers, commission accelerators, and split payments.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "sales commission calculator",
      "tiered sales commission & split calculator",
      "career & hr",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Tiered Sales Commission & Split Calculator \u2014 QuickForma",
    "metaDescription": "Free online Tiered Sales Commission & Split Calculator. Calculates quota achievement tiers, commission accelerators, and split payments. Fast, private, client-side execution."
  },
  {
    "id": "overhead-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Manufacturing & Service Overhead Rate Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Solves predetermined overhead rate per direct labor hour or machine hour.",
    "iconName": "Factory",
    "badge": "New",
    "keywords": [
      "overhead rate calculator",
      "manufacturing & service overhead rate solver",
      "operations & manufacturing",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Manufacturing & Service Overhead Rate Solver \u2014 QuickForma",
    "metaDescription": "Free online Manufacturing & Service Overhead Rate Solver. Solves predetermined overhead rate per direct labor hour or machine hour. Fast, private, client-side execution."
  },
  {
    "id": "quick-ratio-acid-test-calculator",
    "verticals": [
      "business"
    ],
    "name": "Acid-Test / Quick Ratio Liquidity Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Measures instant liquidity excluding inventory from current assets.",
    "iconName": "ShieldCheck",
    "badge": "New",
    "keywords": [
      "quick ratio acid test calculator",
      "acid-test / quick ratio liquidity solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Acid-Test / Quick Ratio Liquidity Solver \u2014 QuickForma",
    "metaDescription": "Free online Acid-Test / Quick Ratio Liquidity Solver. Measures instant liquidity excluding inventory from current assets. Fast, private, client-side execution."
  },
  {
    "id": "retained-earnings-calculator",
    "verticals": [
      "business"
    ],
    "name": "Beginning vs Ending Retained Earnings Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Solves Retained Earnings = Prior Balance + Net Income - Dividends Paid.",
    "iconName": "DollarSign",
    "badge": "New",
    "keywords": [
      "retained earnings calculator",
      "beginning vs ending retained earnings solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Beginning vs Ending Retained Earnings Solver \u2014 QuickForma",
    "metaDescription": "Free online Beginning vs Ending Retained Earnings Solver. Solves Retained Earnings = Prior Balance + Net Income - Dividends Paid. Fast, private, client-side execution."
  },
  {
    "id": "altman-z-score-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Altman Z-Score Business Bankruptcy Predictor",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Uses 5 financial ratios to predict public and private business insolvency risk.",
    "iconName": "AlertCircle",
    "badge": "New",
    "keywords": [
      "altman z score calculator",
      "altman z-score business bankruptcy predictor",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Altman Z-Score Business Bankruptcy Predictor \u2014 QuickForma",
    "metaDescription": "Free online Altman Z-Score Business Bankruptcy Predictor. Uses 5 financial ratios to predict public and private business insolvency risk. Fast, private, client-side execution."
  },
  {
    "id": "cost-benefit-analysis-calculator",
    "verticals": [
      "business"
    ],
    "name": "Cost-Benefit Ratio & Net Benefit Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Evaluates commercial project viability using Benefit-Cost Ratio (BCR).",
    "iconName": "Scale",
    "badge": "New",
    "keywords": [
      "cost benefit analysis calculator",
      "cost-benefit ratio & net benefit solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Cost-Benefit Ratio & Net Benefit Solver \u2014 QuickForma",
    "metaDescription": "Free online Cost-Benefit Ratio & Net Benefit Solver. Evaluates commercial project viability using Benefit-Cost Ratio (BCR). Fast, private, client-side execution."
  },
  {
    "id": "gross-margin-standalone-calculator",
    "verticals": [
      "business"
    ],
    "name": "Gross Margin Percentage Standalone Calculator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Dedicated gross margin percentage solver for quick financial checks.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "gross margin standalone calculator",
      "gross margin percentage standalone calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Gross Margin Percentage Standalone Calculator \u2014 QuickForma",
    "metaDescription": "Free online Gross Margin Percentage Standalone Calculator. Dedicated gross margin percentage solver for quick financial checks. Fast, private, client-side execution."
  },
  {
    "id": "credit-note-generator",
    "verticals": [
      "business"
    ],
    "name": "Credit Note & Adjustment Note Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Accounting document generator for client invoice credits, billing adjustments, and returns.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "credit note generator",
      "credit note & adjustment note generator",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Credit Note & Adjustment Note Generator \u2014 QuickForma",
    "metaDescription": "Free online Credit Note & Adjustment Note Generator. Accounting document generator for client invoice credits, billing adjustments, and returns. Fast, private, client-side execution."
  },
  {
    "id": "contractor-agreement-generator",
    "verticals": [
      "business"
    ],
    "name": "Independent Contractor Agreement PDF",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "B2B contractor agreement generator with IP assignment, payment terms, and non-solicit clauses.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "contractor agreement generator",
      "independent contractor agreement pdf",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Independent Contractor Agreement PDF \u2014 QuickForma",
    "metaDescription": "Free online Independent Contractor Agreement PDF. B2B contractor agreement generator with IP assignment, payment terms, and non-solicit clauses. Fast, private, client-side execution."
  },
  {
    "id": "offer-letter-generator",
    "verticals": [
      "business"
    ],
    "name": "Employee Job Offer Letter Generator",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "HR offer letter generator with salary, benefits, start date, and at-will employment terms.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "offer letter generator",
      "employee job offer letter generator",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Employee Job Offer Letter Generator \u2014 QuickForma",
    "metaDescription": "Free online Employee Job Offer Letter Generator. HR offer letter generator with salary, benefits, start date, and at-will employment terms. Fast, private, client-side execution."
  },
  {
    "id": "expense-report-generator",
    "verticals": [
      "business"
    ],
    "name": "Employee Expense Reimbursement Sheet",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Employee expense report generator with category totals, mileage log, and receipt attach options.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "expense report generator",
      "employee expense reimbursement sheet",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Employee Expense Reimbursement Sheet \u2014 QuickForma",
    "metaDescription": "Free online Employee Expense Reimbursement Sheet. Employee expense report generator with category totals, mileage log, and receipt attach options. Fast, private, client-side execution."
  },
  {
    "id": "consulting-proposal-generator",
    "verticals": [
      "business"
    ],
    "name": "Consulting Proposal & Scope Builder",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Professional service proposal builder with problem statement, methodology, and pricing options.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "consulting proposal generator",
      "consulting proposal & scope builder",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Consulting Proposal & Scope Builder \u2014 QuickForma",
    "metaDescription": "Free online Consulting Proposal & Scope Builder. Professional service proposal builder with problem statement, methodology, and pricing options. Fast, private, client-side execution."
  },
  {
    "id": "bill-of-materials-generator",
    "verticals": [
      "business"
    ],
    "name": "Manufacturing Bill of Materials (BOM) Sheet",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Generates multi-level manufacturing BOM sheets with component part numbers and unit quantities.",
    "iconName": "Layers",
    "badge": "New",
    "keywords": [
      "bill of materials generator",
      "manufacturing bill of materials (bom) sheet",
      "operations & manufacturing",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Manufacturing Bill of Materials (BOM) Sheet \u2014 QuickForma",
    "metaDescription": "Free online Manufacturing Bill of Materials (BOM) Sheet. Generates multi-level manufacturing BOM sheets with component part numbers and unit quantities. Fast, private, client-side execution."
  },
  {
    "id": "sql-formatter",
    "verticals": [
      "business"
    ],
    "name": "SQL Query Formatter & Minifier",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Cleans, formats, and minifies SQL queries client-side across MySQL, PostgreSQL, and T-SQL dialects.",
    "iconName": "Code",
    "badge": "New",
    "keywords": [
      "sql formatter",
      "sql query formatter & minifier",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "SQL Query Formatter & Minifier \u2014 QuickForma",
    "metaDescription": "Free online SQL Query Formatter & Minifier. Cleans, formats, and minifies SQL queries client-side across MySQL, PostgreSQL, and T-SQL dialects. Fast, private, client-side execution."
  },
  {
    "id": "xml-json-converter",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "XML to JSON & JSON to XML Converter",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Bi-directional client-side converter between XML documents and JSON data objects.",
    "iconName": "FileCode",
    "badge": "New",
    "keywords": [
      "xml json converter",
      "xml to json & json to xml converter",
      "converters & formats",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "XML to JSON & JSON to XML Converter \u2014 QuickForma",
    "metaDescription": "Free online XML to JSON & JSON to XML Converter. Bi-directional client-side converter between XML documents and JSON data objects. Fast, private, client-side execution."
  },
  {
    "id": "yaml-json-converter",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "YAML to JSON & JSON to YAML Converter",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Converts Kubernetes, Docker, and CI/CD YAML configuration files to JSON and back.",
    "iconName": "FileCode",
    "badge": "New",
    "keywords": [
      "yaml json converter",
      "yaml to json & json to yaml converter",
      "converters & formats",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "YAML to JSON & JSON to YAML Converter \u2014 QuickForma",
    "metaDescription": "Free online YAML to JSON & JSON to YAML Converter. Converts Kubernetes, Docker, and CI/CD YAML configuration files to JSON and back. Fast, private, client-side execution."
  },
  {
    "id": "cron-expression-generator",
    "verticals": [
      "business"
    ],
    "name": "Cron Schedule Expression Builder & Visualizer",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Visual GUI cron builder with human-readable schedule explanations and next 10 execution dates.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "cron expression generator",
      "cron schedule expression builder & visualizer",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Cron Schedule Expression Builder & Visualizer \u2014 QuickForma",
    "metaDescription": "Free online Cron Schedule Expression Builder & Visualizer. Visual GUI cron builder with human-readable schedule explanations and next 10 execution dates. Fast, private, client-side execution."
  },
  {
    "id": "unix-timestamp-converter",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Unix Epoch Timestamp to ISO Date Converter",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Converts Unix timestamps (seconds & milliseconds) to UTC/Local ISO dates and vice versa.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "unix timestamp converter",
      "unix epoch timestamp to iso date converter",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Unix Epoch Timestamp to ISO Date Converter \u2014 QuickForma",
    "metaDescription": "Free online Unix Epoch Timestamp to ISO Date Converter. Converts Unix timestamps (seconds & milliseconds) to UTC/Local ISO dates and vice versa. Fast, private, client-side execution."
  },
  {
    "id": "markdown-to-html-converter",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Markdown to Clean HTML Live Converter",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Converts raw Markdown text into clean HTML code with live split-screen preview.",
    "iconName": "FileCode",
    "badge": "New",
    "keywords": [
      "markdown to html converter",
      "markdown to clean html live converter",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Markdown to Clean HTML Live Converter \u2014 QuickForma",
    "metaDescription": "Free online Markdown to Clean HTML Live Converter. Converts raw Markdown text into clean HTML code with live split-screen preview. Fast, private, client-side execution."
  },
  {
    "id": "chmod-calculator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Linux File Permission Chmod Octal Calculator",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Interactive Linux permission grid generating octal codes (e.g. `755`, `644`) and `chmod` commands.",
    "iconName": "Terminal",
    "badge": "New",
    "keywords": [
      "chmod calculator",
      "linux file permission chmod octal calculator",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Linux File Permission Chmod Octal Calculator \u2014 QuickForma",
    "metaDescription": "Free online Linux File Permission Chmod Octal Calculator. Interactive Linux permission grid generating octal codes (e.g. `755`, `644`) and `chmod` commands. Fast, private, client-side execution."
  },
  {
    "id": "keyword-density-analyzer",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Keyword Density & Frequency Counter",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Analyzes text to extract 1-word, 2-word, and 3-word keyword density percentages.",
    "iconName": "Search",
    "badge": "New",
    "keywords": [
      "keyword density analyzer",
      "keyword density & frequency counter",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Keyword Density & Frequency Counter \u2014 QuickForma",
    "metaDescription": "Free online Keyword Density & Frequency Counter. Analyzes text to extract 1-word, 2-word, and 3-word keyword density percentages. Fast, private, client-side execution."
  },
  {
    "id": "robots-txt-generator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Robots.txt File Generator & Validator",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Builds custom `robots.txt` files with User-agent rules, Disallow paths, and Sitemap URLs.",
    "iconName": "ShieldCheck",
    "badge": "New",
    "keywords": [
      "robots txt generator",
      "robots.txt file generator & validator",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Robots.txt File Generator & Validator \u2014 QuickForma",
    "metaDescription": "Free online Robots.txt File Generator & Validator. Builds custom `robots.txt` files with User-agent rules, Disallow paths, and Sitemap URLs. Fast, private, client-side execution."
  },
  {
    "id": "headline-analyzer",
    "verticals": [
      "business"
    ],
    "name": "Click-Through Rate Headline Quality Analyzer",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Evaluates article titles based on emotional word count, length, clarity, and SEO power words.",
    "iconName": "Sparkles",
    "badge": "New",
    "keywords": [
      "headline analyzer",
      "click-through rate headline quality analyzer",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Click-Through Rate Headline Quality Analyzer \u2014 QuickForma",
    "metaDescription": "Free online Click-Through Rate Headline Quality Analyzer. Evaluates article titles based on emotional word count, length, clarity, and SEO power words. Fast, private, client-side execution."
  },
  {
    "id": "character-count-limit-tool",
    "verticals": [
      "business"
    ],
    "name": "Social Media Post Length Checker",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Character counter showing real-time limits for Twitter/X (280), LinkedIn (3000), Meta, and Instagram.",
    "iconName": "AlignLeft",
    "badge": "New",
    "keywords": [
      "character count limit tool",
      "social media post length checker",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Social Media Post Length Checker \u2014 QuickForma",
    "metaDescription": "Free online Social Media Post Length Checker. Character counter showing real-time limits for Twitter/X (280), LinkedIn (3000), Meta, and Instagram. Fast, private, client-side execution."
  },
  {
    "id": "duplicate-line-remover",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Text Deduplication & Line Sorter Tool",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Removes duplicate text lines, sorts lists alphabetically, and strips blank lines.",
    "iconName": "ListFilter",
    "badge": "New",
    "keywords": [
      "duplicate line remover",
      "text deduplication & line sorter tool",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Text Deduplication & Line Sorter Tool \u2014 QuickForma",
    "metaDescription": "Free online Text Deduplication & Line Sorter Tool. Removes duplicate text lines, sorts lists alphabetically, and strips blank lines. Fast, private, client-side execution."
  },
  {
    "id": "markdown-table-generator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Visual GUI Markdown Table Builder",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Interactive GUI table editor that exports clean Markdown table syntax.",
    "iconName": "Table",
    "badge": "New",
    "keywords": [
      "markdown table generator",
      "visual gui markdown table builder",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Visual GUI Markdown Table Builder \u2014 QuickForma",
    "metaDescription": "Free online Visual GUI Markdown Table Builder. Interactive GUI table editor that exports clean Markdown table syntax. Fast, private, client-side execution."
  },
  {
    "id": "email-subject-line-tester",
    "verticals": [
      "business"
    ],
    "name": "Email Subject Line Character & Spam Word Checker",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Tests subject lines for mobile truncation (under 50 chars) and flags email spam trigger words.",
    "iconName": "Mail",
    "badge": "New",
    "keywords": [
      "email subject line tester",
      "email subject line character & spam word checker",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Email Subject Line Character & Spam Word Checker \u2014 QuickForma",
    "metaDescription": "Free online Email Subject Line Character & Spam Word Checker. Tests subject lines for mobile truncation (under 50 chars) and flags email spam trigger words. Fast, private, client-side execution."
  },
  {
    "id": "text-cleaner-sanitizer",
    "verticals": [
      "business",
      "students"
    ],
    "name": "HTML Strip, Non-ASCII Remove & White Space Cleaner",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Cleans raw text by stripping HTML tags, removing non-ASCII characters, and normalizing spacing.",
    "iconName": "Sparkles",
    "badge": "New",
    "keywords": [
      "text cleaner sanitizer",
      "html strip, non-ascii remove & white space cleaner",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "HTML Strip, Non-ASCII Remove & White Space Cleaner \u2014 QuickForma",
    "metaDescription": "Free online HTML Strip, Non-ASCII Remove & White Space Cleaner. Cleans raw text by stripping HTML tags, removing non-ASCII characters, and normalizing spacing. Fast, private, client-side execution."
  },
  {
    "id": "camel-snake-kebab-converter",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Developer Naming Convention Converter",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Converts strings between camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE.",
    "iconName": "Code2",
    "badge": "New",
    "keywords": [
      "camel snake kebab converter",
      "developer naming convention converter",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Developer Naming Convention Converter \u2014 QuickForma",
    "metaDescription": "Free online Developer Naming Convention Converter. Converts strings between camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE. Fast, private, client-side execution."
  },
  {
    "id": "reading-ease-score-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Flesch-Kincaid & Gunning Fog Score Calculator",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Calculates readability ease score and grade level reading difficulty.",
    "iconName": "BookOpen",
    "badge": "New",
    "keywords": [
      "reading ease score calculator",
      "flesch-kincaid & gunning fog score calculator",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Flesch-Kincaid & Gunning Fog Score Calculator \u2014 QuickForma",
    "metaDescription": "Free online Flesch-Kincaid & Gunning Fog Score Calculator. Calculates readability ease score and grade level reading difficulty. Fast, private, client-side execution."
  },
  {
    "id": "meta-description-length-tool",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Pixel-Width Search Snippet Truncation Tester",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Measures exact font pixel width for Google title and meta description snippets.",
    "iconName": "Search",
    "badge": "New",
    "keywords": [
      "meta description length tool",
      "pixel-width search snippet truncation tester",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Pixel-Width Search Snippet Truncation Tester \u2014 QuickForma",
    "metaDescription": "Free online Pixel-Width Search Snippet Truncation Tester. Measures exact font pixel width for Google title and meta description snippets. Fast, private, client-side execution."
  },
  {
    "id": "quarter-to-semester-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "Quarter Unit to Semester Credit GPA Converter",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Converts academic credits and GPAs between quarter hour and semester hour systems.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": [
      "quarter to semester gpa calculator",
      "quarter unit to semester credit gpa converter",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Quarter Unit to Semester Credit GPA Converter \u2014 QuickForma",
    "metaDescription": "Free online Quarter Unit to Semester Credit GPA Converter. Converts academic credits and GPAs between quarter hour and semester hour systems. Fast, private, client-side execution."
  },
  {
    "id": "gpa-boost-calculator",
    "verticals": [
      "students"
    ],
    "name": "Minimum Grade Needed to Raise GPA to Target",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculates the exact GPA and course grades required in future terms to hit a target cumulative GPA.",
    "iconName": "TrendingUp",
    "badge": "New",
    "keywords": [
      "gpa boost calculator",
      "minimum grade needed to raise gpa to target",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Minimum Grade Needed to Raise GPA to Target \u2014 QuickForma",
    "metaDescription": "Free online Minimum Grade Needed to Raise GPA to Target. Calculates the exact GPA and course grades required in future terms to hit a target cumulative GPA. Fast, private, client-side execution."
  },
  {
    "id": "grade-point-average-scale-converter",
    "verticals": [
      "students"
    ],
    "name": "International 10-Point to 4.0 GPA Converter",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Converts international grading systems (India 10-point CGPA, UK First Class, ECTS) to US 4.0 scale.",
    "iconName": "Sliders",
    "badge": "New",
    "keywords": [
      "grade point average scale converter",
      "international 10-point to 4.0 gpa converter",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "International 10-Point to 4.0 GPA Converter \u2014 QuickForma",
    "metaDescription": "Free online International 10-Point to 4.0 GPA Converter. Converts international grading systems (India 10-point CGPA, UK First Class, ECTS) to US 4.0 scale. Fast, private, client-side execution."
  },
  {
    "id": "honors-ap-ib-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "AP / IB / Honors Course Grade Weighting Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculates custom GPA impact of Advanced Placement (AP), International Baccalaureate (IB), and Honors courses.",
    "iconName": "Award",
    "badge": "New",
    "keywords": [
      "honors ap ib gpa calculator",
      "ap / ib / honors course grade weighting solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "AP / IB / Honors Course Grade Weighting Solver \u2014 QuickForma",
    "metaDescription": "Free online AP / IB / Honors Course Grade Weighting Solver. Calculates custom GPA impact of Advanced Placement (AP), International Baccalaureate (IB), and Honors courses. Fast, private, client-side execution."
  },
  {
    "id": "test-score-percentage-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Raw Quiz / Exam Test Score Percentage Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Converts raw exam points (e.g. 47 out of 58) into percentage, letter grade, and grade points.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "test score percentage calculator",
      "raw quiz / exam test score percentage solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Raw Quiz / Exam Test Score Percentage Solver \u2014 QuickForma",
    "metaDescription": "Free online Raw Quiz / Exam Test Score Percentage Solver. Converts raw exam points (e.g. 47 out of 58) into percentage, letter grade, and grade points. Fast, private, client-side execution."
  },
  {
    "id": "curved-grade-calculator",
    "verticals": [
      "students"
    ],
    "name": "Standard Bell Curve & Root Grade Curve Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculates curved exam grades using Flat Addition, Root Curve ($\\sqrt{\\text{score}} \\times 10$), or Bell Curve ($Z$-score).",
    "iconName": "TrendingUp",
    "badge": "New",
    "keywords": [
      "curved grade calculator",
      "standard bell curve & root grade curve solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Standard Bell Curve & Root Grade Curve Solver \u2014 QuickForma",
    "metaDescription": "Free online Standard Bell Curve & Root Grade Curve Solver. Calculates curved exam grades using Flat Addition, Root Curve ($\\sqrt{\\text{score}} \\times 10$), or Bell Curve ($Z$-score). Fast, private, client-side execution."
  },
  {
    "id": "assignment-weight-calculator",
    "verticals": [
      "students"
    ],
    "name": "Individual Category Assignment Grade Weight Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Solves total category contribution when assignments within a category have varying point totals.",
    "iconName": "BookOpen",
    "badge": "New",
    "keywords": [
      "assignment weight calculator",
      "individual category assignment grade weight solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Individual Category Assignment Grade Weight Solver \u2014 QuickForma",
    "metaDescription": "Free online Individual Category Assignment Grade Weight Solver. Solves total category contribution when assignments within a category have varying point totals. Fast, private, client-side execution."
  },
  {
    "id": "study-hours-per-credit-calculator",
    "verticals": [
      "students"
    ],
    "name": "Credit Hour Workload & Study Hour Estimator",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculates recommended weekly out-of-class study hours based on course credit load (2:1 rule).",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "study hours per credit calculator",
      "credit hour workload & study hour estimator",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Credit Hour Workload & Study Hour Estimator \u2014 QuickForma",
    "metaDescription": "Free online Credit Hour Workload & Study Hour Estimator. Calculates recommended weekly out-of-class study hours based on course credit load (2:1 rule). Fast, private, client-side execution."
  },
  {
    "id": "sat-act-concordance-calculator",
    "verticals": [
      "students"
    ],
    "name": "SAT to ACT Score Equivalence Converter",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Converts SAT total scores (400\u20131600) to ACT composite scores (1\u201336) using official concordance tables.",
    "iconName": "ArrowRightLeft",
    "badge": "New",
    "keywords": [
      "sat act concordance calculator",
      "sat to act score equivalence converter",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "SAT to ACT Score Equivalence Converter \u2014 QuickForma",
    "metaDescription": "Free online SAT to ACT Score Equivalence Converter. Converts SAT total scores (400\u20131600) to ACT composite scores (1\u201336) using official concordance tables. Fast, private, client-side execution."
  },
  {
    "id": "transfer-credit-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "Community College Transfer Credit GPA Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculates combined transfer GPA when moving credits from community college to a 4-year university.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": [
      "transfer credit gpa calculator",
      "community college transfer credit gpa solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Community College Transfer Credit GPA Solver \u2014 QuickForma",
    "metaDescription": "Free online Community College Transfer Credit GPA Solver. Calculates combined transfer GPA when moving credits from community college to a 4-year university. Fast, private, client-side execution."
  },
  {
    "id": "integral-calculus-calculator",
    "verticals": [
      "business"
    ],
    "name": "Definite & Indefinite Integration Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculates polynomial, exponential, and trigonometric definite/indefinite integrals with step-by-step logic.",
    "iconName": "FunctionSquare",
    "badge": "New",
    "keywords": [
      "integral calculus calculator",
      "definite & indefinite integration solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Definite & Indefinite Integration Solver \u2014 QuickForma",
    "metaDescription": "Free online Definite & Indefinite Integration Solver. Calculates polynomial, exponential, and trigonometric definite/indefinite integrals with step-by-step logic. Fast, private, client-side execution."
  },
  {
    "id": "matrix-algebra-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Matrix Addition, Multiplication & Determinant Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Performs $2\\times 2$ and $3\\times 3$ matrix operations, determinant calculation, and matrix inversion.",
    "iconName": "Grid",
    "badge": "New",
    "keywords": [
      "matrix algebra calculator",
      "matrix addition, multiplication & determinant solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Matrix Addition, Multiplication & Determinant Solver \u2014 QuickForma",
    "metaDescription": "Free online Matrix Addition, Multiplication & Determinant Solver. Performs $2\\times 2$ and $3\\times 3$ matrix operations, determinant calculation, and matrix inversion. Fast, private, client-side execution."
  },
  {
    "id": "vector-math-calculator",
    "verticals": [
      "business"
    ],
    "name": "Dot Product, Cross Product & Vector Magnitude Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Solves 2D/3D vector addition, magnitude $|\\vec{v}|$, dot product $\\vec{a}\\cdot\\vec{b}$, and cross product $\\vec{a}\\times\\vec{b}$.",
    "iconName": "Compass",
    "badge": "New",
    "keywords": [
      "vector math calculator",
      "dot product, cross product & vector magnitude solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Dot Product, Cross Product & Vector Magnitude Solver \u2014 QuickForma",
    "metaDescription": "Free online Dot Product, Cross Product & Vector Magnitude Solver. Solves 2D/3D vector addition, magnitude $|\\vec{v}|$, dot product $\\vec{a}\\cdot\\vec{b}$, and cross product $\\vec{a}\\times\\vec{b}$. Fast, private, client-side execution."
  },
  {
    "id": "polynomial-roots-calculator",
    "verticals": [
      "business"
    ],
    "name": "Polynomial Factoring & Synthetic Division Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Solves polynomial roots, synthetic division, and factors quadratic/cubic expressions.",
    "iconName": "FunctionSquare",
    "badge": "New",
    "keywords": [
      "polynomial roots calculator",
      "polynomial factoring & synthetic division solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Polynomial Factoring & Synthetic Division Solver \u2014 QuickForma",
    "metaDescription": "Free online Polynomial Factoring & Synthetic Division Solver. Solves polynomial roots, synthetic division, and factors quadratic/cubic expressions. Fast, private, client-side execution."
  },
  {
    "id": "system-of-equations-solver",
    "verticals": [
      "business"
    ],
    "name": "3x3 Systems of Linear Equations Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Solves 2-variable and 3-variable systems of linear equations using Cramer's Rule / Gaussian elimination.",
    "iconName": "GitMerge",
    "badge": "New",
    "keywords": [
      "system of equations solver",
      "3x3 systems of linear equations solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "3x3 Systems of Linear Equations Solver \u2014 QuickForma",
    "metaDescription": "Free online 3x3 Systems of Linear Equations Solver. Solves 2-variable and 3-variable systems of linear equations using Cramer's Rule / Gaussian elimination. Fast, private, client-side execution."
  },
  {
    "id": "slope-intercept-calculator",
    "verticals": [
      "business"
    ],
    "name": "Line Slope, Y-Intercept & Equation Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Solves line slope $m = \\frac{y_2-y_1}{x_2-x_1}$, point-slope form, and slope-intercept equation $y=mx+b$.",
    "iconName": "TrendingUp",
    "badge": "New",
    "keywords": [
      "slope intercept calculator",
      "line slope, y-intercept & equation solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Line Slope, Y-Intercept & Equation Solver \u2014 QuickForma",
    "metaDescription": "Free online Line Slope, Y-Intercept & Equation Solver. Solves line slope $m = \\frac{y_2-y_1}{x_2-x_1}$, point-slope form, and slope-intercept equation $y=mx+b$. Fast, private, client-side execution."
  },
  {
    "id": "percentage-change-standalone-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Percentage Change & Percentage Difference Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Dedicated standalone solver for percentage change vs percentage difference calculations.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "percentage change standalone calculator",
      "percentage change & percentage difference solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Percentage Change & Percentage Difference Solver \u2014 QuickForma",
    "metaDescription": "Free online Percentage Change & Percentage Difference Solver. Dedicated standalone solver for percentage change vs percentage difference calculations. Fast, private, client-side execution."
  },
  {
    "id": "chi-square-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Chi-Square Goodness-of-Fit & Independence Test",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculates Chi-Square statistic ($\\chi^2$), degrees of freedom, and $p$-value for contingency tables.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": [
      "chi square calculator",
      "chi-square goodness-of-fit & independence test",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Chi-Square Goodness-of-Fit & Independence Test \u2014 QuickForma",
    "metaDescription": "Free online Chi-Square Goodness-of-Fit & Independence Test. Calculates Chi-Square statistic ($\\chi^2$), degrees of freedom, and $p$-value for contingency tables. Fast, private, client-side execution."
  },
  {
    "id": "anova-calculator",
    "verticals": [
      "business",
      "students",
      "developers"
    ],
    "name": "One-Way & Two-Way ANOVA F-Test Calculator",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Computes Analysis of Variance (ANOVA) table, Sum of Squares, Mean Squares, and $F$-statistic.",
    "iconName": "BarChart2",
    "badge": "New",
    "keywords": [
      "anova calculator",
      "one-way & two-way anova f-test calculator",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "One-Way & Two-Way ANOVA F-Test Calculator \u2014 QuickForma",
    "metaDescription": "Free online One-Way & Two-Way ANOVA F-Test Calculator. Computes Analysis of Variance (ANOVA) table, Sum of Squares, Mean Squares, and $F$-statistic. Fast, private, client-side execution."
  },
  {
    "id": "variance-calculator",
    "verticals": [
      "business",
      "students",
      "developers"
    ],
    "name": "Sample & Population Variance Standalone Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculates sample variance ($s^2$) and population variance ($\\sigma^2$) with step-by-step deviation sums.",
    "iconName": "Activity",
    "badge": "New",
    "keywords": [
      "variance calculator",
      "sample & population variance standalone solver",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Sample & Population Variance Standalone Solver \u2014 QuickForma",
    "metaDescription": "Free online Sample & Population Variance Standalone Solver. Calculates sample variance ($s^2$) and population variance ($\\sigma^2$) with step-by-step deviation sums. Fast, private, client-side execution."
  },
  {
    "id": "t-test-calculator",
    "verticals": [
      "business",
      "students",
      "developers"
    ],
    "name": "Paired & Unpaired Two-Sample Student's t-Test",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculates 1-sample, 2-sample independent, and paired $t$-test statistics and $p$-values.",
    "iconName": "GitCommit",
    "badge": "New",
    "keywords": [
      "t test calculator",
      "paired & unpaired two-sample student's t-test",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Paired & Unpaired Two-Sample Student's t-Test \u2014 QuickForma",
    "metaDescription": "Free online Paired & Unpaired Two-Sample Student's t-Test. Calculates 1-sample, 2-sample independent, and paired $t$-test statistics and $p$-values. Fast, private, client-side execution."
  },
  {
    "id": "p-value-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "p-Value Calculator from Z, t, F & Chi-Square Statistics",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Converts test statistics ($Z, t, F, \\chi^2$) into one-tailed and two-tailed $p$-values.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "p value calculator",
      "p-value calculator from z, t, f & chi-square statistics",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "p-Value Calculator from Z, t, F & Chi-Square Statistics \u2014 QuickForma",
    "metaDescription": "Free online p-Value Calculator from Z, t, F & Chi-Square Statistics. Converts test statistics ($Z, t, F, \\chi^2$) into one-tailed and two-tailed $p$-values. Fast, private, client-side execution."
  },
  {
    "id": "correlation-coefficient-calculator",
    "verticals": [
      "business",
      "students",
      "developers"
    ],
    "name": "Pearson r & Spearman Rank Correlation",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Computes Pearson product-moment correlation coefficient $r$ and Spearman rank correlation.",
    "iconName": "TrendingUp",
    "badge": "New",
    "keywords": [
      "correlation coefficient calculator",
      "pearson r & spearman rank correlation",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Pearson r & Spearman Rank Correlation \u2014 QuickForma",
    "metaDescription": "Free online Pearson r & Spearman Rank Correlation. Computes Pearson product-moment correlation coefficient $r$ and Spearman rank correlation. Fast, private, client-side execution."
  },
  {
    "id": "interquartile-range-calculator",
    "verticals": [
      "business",
      "students",
      "developers"
    ],
    "name": "IQR, Box Plot Quartiles & Outlier Detector",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Solves Q1, Q2 (Median), Q3, Interquartile Range (IQR), and identifies mild/extreme outliers ($1.5 \\times \\text{IQR}$).",
    "iconName": "Sliders",
    "badge": "New",
    "keywords": [
      "interquartile range calculator",
      "iqr, box plot quartiles & outlier detector",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "IQR, Box Plot Quartiles & Outlier Detector \u2014 QuickForma",
    "metaDescription": "Free online IQR, Box Plot Quartiles & Outlier Detector. Solves Q1, Q2 (Median), Q3, Interquartile Range (IQR), and identifies mild/extreme outliers ($1.5 \\times \\text{IQR}$). Fast, private, client-side execution."
  },
  {
    "id": "half-life-calculator",
    "verticals": [
      "students"
    ],
    "name": "Radioactive & Chemical Half-Life Decay Solver",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Solves remaining quantity $N(t) = N_0 (\\frac{1}{2})^{t/t_{1/2}}$, decay constant $\\lambda$, and elapsed time.",
    "iconName": "Atom",
    "badge": "New",
    "keywords": [
      "half life calculator",
      "radioactive & chemical half-life decay solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Radioactive & Chemical Half-Life Decay Solver \u2014 QuickForma",
    "metaDescription": "Free online Radioactive & Chemical Half-Life Decay Solver. Solves remaining quantity $N(t) = N_0 (\\frac{1}{2})^{t/t_{1/2}}$, decay constant $\\lambda$, and elapsed time. Fast, private, client-side execution."
  },
  {
    "id": "empirical-formula-calculator",
    "verticals": [
      "business"
    ],
    "name": "Empirical & Molecular Formula Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Converts percent element composition by mass into simplest empirical formula and molecular formula.",
    "iconName": "FlaskConical",
    "badge": "New",
    "keywords": [
      "empirical formula calculator",
      "empirical & molecular formula solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Empirical & Molecular Formula Solver \u2014 QuickForma",
    "metaDescription": "Free online Empirical & Molecular Formula Solver. Converts percent element composition by mass into simplest empirical formula and molecular formula. Fast, private, client-side execution."
  },
  {
    "id": "thermodynamics-gibbs-calculator",
    "verticals": [
      "business"
    ],
    "name": "Gibbs Free Energy $\\Delta G = \\Delta H - T\\Delta S$",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Solves enthalpy, entropy, temperature, and reaction spontaneity ($\\Delta G < 0$).",
    "iconName": "Flame",
    "badge": "New",
    "keywords": [
      "thermodynamics gibbs calculator",
      "gibbs free energy $\\delta g = \\delta h - t\\delta s$",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Gibbs Free Energy $\\Delta G = \\Delta H - T\\Delta S$ \u2014 QuickForma",
    "metaDescription": "Free online Gibbs Free Energy $\\Delta G = \\Delta H - T\\Delta S$. Solves enthalpy, entropy, temperature, and reaction spontaneity ($\\Delta G < 0$). Fast, private, client-side execution."
  },
  {
    "id": "solution-concentration-converter",
    "verticals": [
      "business"
    ],
    "name": "Molarity, Molality & Mass Percent Converter",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Converts solution concentrations between Molarity ($M$), Molality ($m$), Mass %, and Mole Fraction.",
    "iconName": "Droplet",
    "badge": "New",
    "keywords": [
      "solution concentration converter",
      "molarity, molality & mass percent converter",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Molarity, Molality & Mass Percent Converter \u2014 QuickForma",
    "metaDescription": "Free online Molarity, Molality & Mass Percent Converter. Converts solution concentrations between Molarity ($M$), Molality ($m$), Mass %, and Mole Fraction. Fast, private, client-side execution."
  },
  {
    "id": "gravitational-force-calculator",
    "verticals": [
      "business"
    ],
    "name": "Newton's Law of Universal Gravitation Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Solves gravitational force $F = G \\frac{m_1 m_2}{r^2}$ between celestial bodies or masses.",
    "iconName": "Orbit",
    "badge": "New",
    "keywords": [
      "gravitational force calculator",
      "newton's law of universal gravitation solver",
      "operations & manufacturing",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Newton's Law of Universal Gravitation Solver \u2014 QuickForma",
    "metaDescription": "Free online Newton's Law of Universal Gravitation Solver. Solves gravitational force $F = G \\frac{m_1 m_2}{r^2}$ between celestial bodies or masses. Fast, private, client-side execution."
  },
  {
    "id": "centripetal-force-calculator",
    "verticals": [
      "business"
    ],
    "name": "Circular Motion & Centripetal Acceleration Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Solves centripetal acceleration $a_c = \\frac{v^2}{r}$ and centripetal force $F_c = \\frac{m v^2}{r}$.",
    "iconName": "RotateCw",
    "badge": "New",
    "keywords": [
      "centripetal force calculator",
      "circular motion & centripetal acceleration solver",
      "operations & manufacturing",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Circular Motion & Centripetal Acceleration Solver \u2014 QuickForma",
    "metaDescription": "Free online Circular Motion & Centripetal Acceleration Solver. Solves centripetal acceleration $a_c = \\frac{v^2}{r}$ and centripetal force $F_c = \\frac{m v^2}{r}$. Fast, private, client-side execution."
  },
  {
    "id": "heat-transfer-calorimetry-calculator",
    "verticals": [
      "business"
    ],
    "name": "Specific Heat Capacity $Q = mc\\Delta T$ Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Solves heat transfer $Q = m c \\Delta T$, latent heat of fusion/vaporization ($Q = m L$), and final mixture temperature.",
    "iconName": "Flame",
    "badge": "New",
    "keywords": [
      "heat transfer calorimetry calculator",
      "specific heat capacity $q = mc\\delta t$ solver",
      "operations & manufacturing",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Specific Heat Capacity $Q = mc\\Delta T$ Solver \u2014 QuickForma",
    "metaDescription": "Free online Specific Heat Capacity $Q = mc\\Delta T$ Solver. Solves heat transfer $Q = m c \\Delta T$, latent heat of fusion/vaporization ($Q = m L$), and final mixture temperature. Fast, private, client-side execution."
  },
  {
    "id": "spaced-repetition-scheduler",
    "verticals": [
      "business"
    ],
    "name": "SuperMemo SM-2 Flashcard Revision Scheduler",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculates optimal flashcard review intervals based on SuperMemo SM-2 spaced repetition algorithm.",
    "iconName": "Brain",
    "badge": "New",
    "keywords": [
      "spaced repetition scheduler",
      "supermemo sm-2 flashcard revision scheduler",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "SuperMemo SM-2 Flashcard Revision Scheduler \u2014 QuickForma",
    "metaDescription": "Free online SuperMemo SM-2 Flashcard Revision Scheduler. Calculates optimal flashcard review intervals based on SuperMemo SM-2 spaced repetition algorithm. Fast, private, client-side execution."
  },
  {
    "id": "plagiarism-similarity-score-tool",
    "verticals": [
      "business"
    ],
    "name": "Text Matching & Similarity Ratio Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Compares two text documents client-side using Levenshtein distance and Jaccard index similarity %.",
    "iconName": "FileSearch",
    "badge": "New",
    "keywords": [
      "plagiarism similarity score tool",
      "text matching & similarity ratio calculator",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Text Matching & Similarity Ratio Calculator \u2014 QuickForma",
    "metaDescription": "Free online Text Matching & Similarity Ratio Calculator. Compares two text documents client-side using Levenshtein distance and Jaccard index similarity %. Fast, private, client-side execution."
  },
  {
    "id": "homework-time-estimator",
    "verticals": [
      "students"
    ],
    "name": "Daily Assignment & Reading Workload Estimator",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Estimates total nightly homework completion time based on page counts, problem set difficulty, and reading speed.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "homework time estimator",
      "daily assignment & reading workload estimator",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Daily Assignment & Reading Workload Estimator \u2014 QuickForma",
    "metaDescription": "Free online Daily Assignment & Reading Workload Estimator. Estimates total nightly homework completion time based on page counts, problem set difficulty, and reading speed. Fast, private, client-side execution."
  },
  {
    "id": "typing-speed-wpm-calculator",
    "verticals": [
      "business"
    ],
    "name": "Words Per Minute & Accuracy Test Tool",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Tests typing speed in net Words Per Minute (WPM) and accuracy percentage over 1-minute to 5-minute tests.",
    "iconName": "Keyboard",
    "badge": "New",
    "keywords": [
      "typing speed wpm calculator",
      "words per minute & accuracy test tool",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Words Per Minute & Accuracy Test Tool \u2014 QuickForma",
    "metaDescription": "Free online Words Per Minute & Accuracy Test Tool. Tests typing speed in net Words Per Minute (WPM) and accuracy percentage over 1-minute to 5-minute tests. Fast, private, client-side execution."
  },
  {
    "id": "walmart-marketplace-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Walmart Seller Referral Fee & Profit Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculates Walmart Marketplace referral fees by product category and net seller payout.",
    "iconName": "ShoppingBag",
    "badge": "New",
    "keywords": [
      "walmart marketplace fee calculator",
      "walmart seller referral fee & profit solver",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Walmart Seller Referral Fee & Profit Solver \u2014 QuickForma",
    "metaDescription": "Free online Walmart Seller Referral Fee & Profit Solver. Calculates Walmart Marketplace referral fees by product category and net seller payout. Fast, private, client-side execution."
  },
  {
    "id": "google-shopping-roas-calculator",
    "verticals": [
      "business"
    ],
    "name": "Google Performance Max ROAS & Margin Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculates Google Shopping ad spend, cost per click, product margin, and break-even ROAS.",
    "iconName": "Target",
    "badge": "New",
    "keywords": [
      "google shopping roas calculator",
      "google performance max roas & margin solver",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Google Performance Max ROAS & Margin Solver \u2014 QuickForma",
    "metaDescription": "Free online Google Performance Max ROAS & Margin Solver. Calculates Google Shopping ad spend, cost per click, product margin, and break-even ROAS. Fast, private, client-side execution."
  },
  {
    "id": "product-bundle-pricing-calculator",
    "verticals": [
      "business"
    ],
    "name": "Kit Bundling & Tiered Volume Discount Pricing",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculates optimal bundle discount pricing, product kitting margins, and contribution profit.",
    "iconName": "Package",
    "badge": "New",
    "keywords": [
      "product bundle pricing calculator",
      "kit bundling & tiered volume discount pricing",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Kit Bundling & Tiered Volume Discount Pricing \u2014 QuickForma",
    "metaDescription": "Free online Kit Bundling & Tiered Volume Discount Pricing. Calculates optimal bundle discount pricing, product kitting margins, and contribution profit. Fast, private, client-side execution."
  },
  {
    "id": "inventory-turnover-ratio-calculator",
    "verticals": [
      "business"
    ],
    "name": "Inventory Velocity, DSI & GMROI Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Measures Inventory Turnover Ratio, Days Sales of Inventory (DSI), and Gross Margin Return on Inventory (GMROI).",
    "iconName": "RefreshCw",
    "badge": "New",
    "keywords": [
      "inventory turnover ratio calculator",
      "inventory velocity, dsi & gmroi solver",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Inventory Velocity, DSI & GMROI Solver \u2014 QuickForma",
    "metaDescription": "Free online Inventory Velocity, DSI & GMROI Solver. Measures Inventory Turnover Ratio, Days Sales of Inventory (DSI), and Gross Margin Return on Inventory (GMROI). Fast, private, client-side execution."
  },
  {
    "id": "free-shipping-threshold-calculator",
    "verticals": [
      "business"
    ],
    "name": "Free Shipping Order Value Threshold Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Solves optimal minimum order value threshold ($AOV$) to offer free shipping profitably.",
    "iconName": "Truck",
    "badge": "New",
    "keywords": [
      "free shipping threshold calculator",
      "free shipping order value threshold solver",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Free Shipping Order Value Threshold Solver \u2014 QuickForma",
    "metaDescription": "Free online Free Shipping Order Value Threshold Solver. Solves optimal minimum order value threshold ($AOV$) to offer free shipping profitably. Fast, private, client-side execution."
  },
  {
    "id": "dropshipping-profit-margin-calculator",
    "verticals": [
      "business"
    ],
    "name": "AliExpress/CJDropshipping Net Margin Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculates dropshipping net profit after supplier cost, ePacket shipping, ad spend, and gateway fees.",
    "iconName": "Package",
    "badge": "New",
    "keywords": [
      "dropshipping profit margin calculator",
      "aliexpress/cjdropshipping net margin solver",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "AliExpress/CJDropshipping Net Margin Solver \u2014 QuickForma",
    "metaDescription": "Free online AliExpress/CJDropshipping Net Margin Solver. Calculates dropshipping net profit after supplier cost, ePacket shipping, ad spend, and gateway fees. Fast, private, client-side execution."
  },
  {
    "id": "abandoned-cart-recovery-roi-calculator",
    "verticals": [
      "business"
    ],
    "name": "Cart Abandonment Email Recovery Revenue",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculates recovered revenue from automated abandoned cart email and SMS recovery sequences.",
    "iconName": "ShoppingCart",
    "badge": "New",
    "keywords": [
      "abandoned cart recovery roi calculator",
      "cart abandonment email recovery revenue",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Cart Abandonment Email Recovery Revenue \u2014 QuickForma",
    "metaDescription": "Free online Cart Abandonment Email Recovery Revenue. Calculates recovered revenue from automated abandoned cart email and SMS recovery sequences. Fast, private, client-side execution."
  },
  {
    "id": "sku-profitability-analyzer",
    "verticals": [
      "business"
    ],
    "name": "SKU ABC Analysis & Contribution Margin Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Classifies product catalog into A (top 80% revenue), B (15%), and C (5%) performance tiers.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": [
      "sku profitability analyzer",
      "sku abc analysis & contribution margin solver",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "SKU ABC Analysis & Contribution Margin Solver \u2014 QuickForma",
    "metaDescription": "Free online SKU ABC Analysis & Contribution Margin Solver. Classifies product catalog into A (top 80% revenue), B (15%), and C (5%) performance tiers. Fast, private, client-side execution."
  },
  {
    "id": "fulfillment-cost-per-order-calculator",
    "verticals": [
      "business"
    ],
    "name": "3PL Pick, Pack, Storage & Shipping Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculates total 3PL order fulfillment cost including pick/pack fees, box costs, and carrier postage.",
    "iconName": "Truck",
    "badge": "New",
    "keywords": [
      "fulfillment cost per order calculator",
      "3pl pick, pack, storage & shipping solver",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "3PL Pick, Pack, Storage & Shipping Solver \u2014 QuickForma",
    "metaDescription": "Free online 3PL Pick, Pack, Storage & Shipping Solver. Calculates total 3PL order fulfillment cost including pick/pack fees, box costs, and carrier postage. Fast, private, client-side execution."
  },
  {
    "id": "cap-table-calculator",
    "verticals": [
      "business"
    ],
    "name": "Capitalization Table & Equity Dilution Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Simulates SAFE notes, convertible debt, option pools, and investor round dilution.",
    "iconName": "PieChart",
    "badge": "New",
    "keywords": [
      "cap table calculator",
      "capitalization table & equity dilution solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Capitalization Table & Equity Dilution Solver \u2014 QuickForma",
    "metaDescription": "Free online Capitalization Table & Equity Dilution Solver. Simulates SAFE notes, convertible debt, option pools, and investor round dilution. Fast, private, client-side execution."
  },
  {
    "id": "business-valuation-calculator",
    "verticals": [
      "business"
    ],
    "name": "Business Valuation Multiple Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Estimates enterprise value based on SDE, EBITDA, and industry revenue multiples.",
    "iconName": "TrendingUp",
    "badge": "New",
    "keywords": [
      "business valuation calculator",
      "business valuation multiple calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Business Valuation Multiple Calculator \u2014 QuickForma",
    "metaDescription": "Free online Business Valuation Multiple Calculator. Estimates enterprise value based on SDE, EBITDA, and industry revenue multiples. Fast, private, client-side execution."
  },
  {
    "id": "lease-vs-buy-calculator",
    "verticals": [
      "business"
    ],
    "name": "Commercial Lease vs Buy NPV Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "NPV decision model for leasing vs purchasing commercial office/warehouse space.",
    "iconName": "Scale",
    "badge": "New",
    "keywords": [
      "lease vs buy calculator",
      "commercial lease vs buy npv calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Commercial Lease vs Buy NPV Calculator \u2014 QuickForma",
    "metaDescription": "Free online Commercial Lease vs Buy NPV Calculator. NPV decision model for leasing vs purchasing commercial office/warehouse space. Fast, private, client-side execution."
  },
  {
    "id": "invoice-factoring-calculator",
    "verticals": [
      "business"
    ],
    "name": "Invoice Factoring & Discount Rate Calculator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Calculates effective APR and net proceeds from factoring receivables.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "invoice factoring calculator",
      "invoice factoring & discount rate calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Invoice Factoring & Discount Rate Calculator \u2014 QuickForma",
    "metaDescription": "Free online Invoice Factoring & Discount Rate Calculator. Calculates effective APR and net proceeds from factoring receivables. Fast, private, client-side execution."
  },
  {
    "id": "operating-leverage-calculator",
    "verticals": [
      "business"
    ],
    "name": "Degree of Operating Leverage (DOL) Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Measures business earnings sensitivity to percentage changes in sales revenue.",
    "iconName": "Sliders",
    "badge": "New",
    "keywords": [
      "operating leverage calculator",
      "degree of operating leverage (dol) calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Degree of Operating Leverage (DOL) Calculator \u2014 QuickForma",
    "metaDescription": "Free online Degree of Operating Leverage (DOL) Calculator. Measures business earnings sensitivity to percentage changes in sales revenue. Fast, private, client-side execution."
  },
  {
    "id": "net-promoter-score-roi-calculator",
    "verticals": [
      "business"
    ],
    "name": "NPS Impact & Retention Revenue Calculator",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Models financial impact of Net Promoter Score improvements on churn reduction.",
    "iconName": "Target",
    "badge": "New",
    "keywords": [
      "net promoter score roi calculator",
      "nps impact & retention revenue calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "NPS Impact & Retention Revenue Calculator \u2014 QuickForma",
    "metaDescription": "Free online NPS Impact & Retention Revenue Calculator. Models financial impact of Net Promoter Score improvements on churn reduction. Fast, private, client-side execution."
  },
  {
    "id": "equipment-lease-calculator",
    "verticals": [
      "business"
    ],
    "name": "Equipment Lease Payment & Buyout Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Compares Fair Market Value (FMV) vs $1 Buyout equipment lease financing options.",
    "iconName": "Building",
    "badge": "New",
    "keywords": [
      "equipment lease calculator",
      "equipment lease payment & buyout calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Equipment Lease Payment & Buyout Calculator \u2014 QuickForma",
    "metaDescription": "Free online Equipment Lease Payment & Buyout Calculator. Compares Fair Market Value (FMV) vs $1 Buyout equipment lease financing options. Fast, private, client-side execution."
  },
  {
    "id": "franchise-fee-roi-calculator",
    "verticals": [
      "business"
    ],
    "name": "Franchise Total Investment & Royalty ROI",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Solves total franchise startup costs, ongoing royalty fees, and payback horizon.",
    "iconName": "Building2",
    "badge": "New",
    "keywords": [
      "franchise fee roi calculator",
      "franchise total investment & royalty roi",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Franchise Total Investment & Royalty ROI \u2014 QuickForma",
    "metaDescription": "Free online Franchise Total Investment & Royalty ROI. Solves total franchise startup costs, ongoing royalty fees, and payback horizon. Fast, private, client-side execution."
  },
  {
    "id": "deferred-revenue-calculator",
    "verticals": [
      "business"
    ],
    "name": "SaaS Deferred Revenue & ASC 606 Schedule",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Generates monthly ratable revenue recognition schedules for annual prepaid plans.",
    "iconName": "Calendar",
    "badge": "New",
    "keywords": [
      "deferred revenue calculator",
      "saas deferred revenue & asc 606 schedule",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "SaaS Deferred Revenue & ASC 606 Schedule \u2014 QuickForma",
    "metaDescription": "Free online SaaS Deferred Revenue & ASC 606 Schedule. Generates monthly ratable revenue recognition schedules for annual prepaid plans. Fast, private, client-side execution."
  },
  {
    "id": "bad-debt-allowance-calculator",
    "verticals": [
      "business"
    ],
    "name": "Allowance for Doubtful Accounts Estimator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Estimates bad debt reserve using aging schedule percentages.",
    "iconName": "AlertCircle",
    "badge": "New",
    "keywords": [
      "bad debt allowance calculator",
      "allowance for doubtful accounts estimator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Allowance for Doubtful Accounts Estimator \u2014 QuickForma",
    "metaDescription": "Free online Allowance for Doubtful Accounts Estimator. Estimates bad debt reserve using aging schedule percentages. Fast, private, client-side execution."
  },
  {
    "id": "revenue-per-employee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Labor Productivity & Revenue Per FTE Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Evaluates employee productivity and revenue output per Full-Time Equivalent.",
    "iconName": "Users",
    "badge": "New",
    "keywords": [
      "revenue per employee calculator",
      "labor productivity & revenue per fte solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Labor Productivity & Revenue Per FTE Solver \u2014 QuickForma",
    "metaDescription": "Free online Labor Productivity & Revenue Per FTE Solver. Evaluates employee productivity and revenue output per Full-Time Equivalent. Fast, private, client-side execution."
  },
  {
    "id": "asset-turnover-ratio-calculator",
    "verticals": [
      "business"
    ],
    "name": "Total Asset Turnover Ratio Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Evaluates revenue efficiency generated per dollar of total balance sheet assets.",
    "iconName": "RotateCw",
    "badge": "New",
    "keywords": [
      "asset turnover ratio calculator",
      "total asset turnover ratio calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Total Asset Turnover Ratio Calculator \u2014 QuickForma",
    "metaDescription": "Free online Total Asset Turnover Ratio Calculator. Evaluates revenue efficiency generated per dollar of total balance sheet assets. Fast, private, client-side execution."
  },
  {
    "id": "solvency-ratio-calculator",
    "verticals": [
      "business"
    ],
    "name": "Debt-to-Equity & Interest Coverage Ratio",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Solves long-term financial leverage and EBIT interest coverage capability.",
    "iconName": "ShieldCheck",
    "badge": "New",
    "keywords": [
      "solvency ratio calculator",
      "debt-to-equity & interest coverage ratio",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Debt-to-Equity & Interest Coverage Ratio \u2014 QuickForma",
    "metaDescription": "Free online Debt-to-Equity & Interest Coverage Ratio. Solves long-term financial leverage and EBIT interest coverage capability. Fast, private, client-side execution."
  },
  {
    "id": "dupont-analysis-calculator",
    "verticals": [
      "business"
    ],
    "name": "DuPont 3-Step & 5-Step ROE Breakdown",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Decomposes Return on Equity into profit margin, asset turnover, and financial leverage.",
    "iconName": "GitMerge",
    "badge": "New",
    "keywords": [
      "dupont analysis calculator",
      "dupont 3-step & 5-step roe breakdown",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "DuPont 3-Step & 5-Step ROE Breakdown \u2014 QuickForma",
    "metaDescription": "Free online DuPont 3-Step & 5-Step ROE Breakdown. Decomposes Return on Equity into profit margin, asset turnover, and financial leverage. Fast, private, client-side execution."
  },
  {
    "id": "dividend-yield-payout-calculator",
    "verticals": [
      "business"
    ],
    "name": "Dividend Yield & Payout Ratio Calculator",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Solves annual dividend yield % and net income payout coverage.",
    "iconName": "DollarSign",
    "badge": "New",
    "keywords": [
      "dividend yield payout calculator",
      "dividend yield & payout ratio calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Dividend Yield & Payout Ratio Calculator \u2014 QuickForma",
    "metaDescription": "Free online Dividend Yield & Payout Ratio Calculator. Solves annual dividend yield % and net income payout coverage. Fast, private, client-side execution."
  },
  {
    "id": "economic-value-added-calculator",
    "verticals": [
      "business"
    ],
    "name": "Economic Value Added (EVA) Calculator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Measures true economic profit: NOPAT minus capital cost multiplied by capital employed.",
    "iconName": "TrendingUp",
    "badge": "New",
    "keywords": [
      "economic value added calculator",
      "economic value added (eva) calculator",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Economic Value Added (EVA) Calculator \u2014 QuickForma",
    "metaDescription": "Free online Economic Value Added (EVA) Calculator. Measures true economic profit: NOPAT minus capital cost multiplied by capital employed. Fast, private, client-side execution."
  },
  {
    "id": "capital-budgeting-payback-calculator",
    "verticals": [
      "business"
    ],
    "name": "Capital Expenditure (CapEx) ROI Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Evaluates factory equipment and asset replacement capital expenditure decisions.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "capital budgeting payback calculator",
      "capital expenditure (capex) roi solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Capital Expenditure (CapEx) ROI Solver \u2014 QuickForma",
    "metaDescription": "Free online Capital Expenditure (CapEx) ROI Solver. Evaluates factory equipment and asset replacement capital expenditure decisions. Fast, private, client-side execution."
  },
  {
    "id": "marginal-cost-revenue-calculator",
    "verticals": [
      "business"
    ],
    "name": "Marginal Cost vs Marginal Revenue Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Solves profit-maximizing production output where Marginal Cost equals Marginal Revenue.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": [
      "marginal cost revenue calculator",
      "marginal cost vs marginal revenue solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Marginal Cost vs Marginal Revenue Solver \u2014 QuickForma",
    "metaDescription": "Free online Marginal Cost vs Marginal Revenue Solver. Solves profit-maximizing production output where Marginal Cost equals Marginal Revenue. Fast, private, client-side execution."
  },
  {
    "id": "operating-cash-flow-to-sales-calculator",
    "verticals": [
      "business"
    ],
    "name": "OCF Margin & Operating Cash Flow Ratio",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Measures cash flow coverage of sales revenue and current liabilities.",
    "iconName": "Activity",
    "badge": "New",
    "keywords": [
      "operating cash flow to sales calculator",
      "ocf margin & operating cash flow ratio",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "OCF Margin & Operating Cash Flow Ratio \u2014 QuickForma",
    "metaDescription": "Free online OCF Margin & Operating Cash Flow Ratio. Measures cash flow coverage of sales revenue and current liabilities. Fast, private, client-side execution."
  },
  {
    "id": "rule-of-thumb-valuation-calculator",
    "verticals": [
      "business"
    ],
    "name": "Small Business SDE Valuation Multiplier Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Estimates small business sale price based on Seller's Discretionary Earnings (SDE).",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": [
      "rule of thumb valuation calculator",
      "small business sde valuation multiplier solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Small Business SDE Valuation Multiplier Solver \u2014 QuickForma",
    "metaDescription": "Free online Small Business SDE Valuation Multiplier Solver. Estimates small business sale price based on Seller's Discretionary Earnings (SDE). Fast, private, client-side execution."
  },
  {
    "id": "operating-expense-ratio-calculator",
    "verticals": [
      "business"
    ],
    "name": "Operating Expense Ratio (OER) Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Measures operating expenses as a percentage of total net sales revenue.",
    "iconName": "Building",
    "badge": "New",
    "keywords": [
      "operating expense ratio calculator",
      "operating expense ratio (oer) solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Operating Expense Ratio (OER) Solver \u2014 QuickForma",
    "metaDescription": "Free online Operating Expense Ratio (OER) Solver. Measures operating expenses as a percentage of total net sales revenue. Fast, private, client-side execution."
  },
  {
    "id": "roce-calculator",
    "verticals": [
      "business"
    ],
    "name": "Return on Capital Employed (ROCE) Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Measures company profitability and efficiency of capital allocation.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": [
      "roce calculator",
      "return on capital employed (roce) solver",
      "financial calculators",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Return on Capital Employed (ROCE) Solver \u2014 QuickForma",
    "metaDescription": "Free online Return on Capital Employed (ROCE) Solver. Measures company profitability and efficiency of capital allocation. Fast, private, client-side execution."
  },
  {
    "id": "statement-of-work-generator",
    "verticals": [
      "business"
    ],
    "name": "Statement of Work (SOW) Scope Generator",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Formats agency and consulting SOWs with project deliverables, milestones, and sign-offs.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": [
      "statement of work generator",
      "statement of work (sow) scope generator",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Statement of Work (SOW) Scope Generator \u2014 QuickForma",
    "metaDescription": "Free online Statement of Work (SOW) Scope Generator. Formats agency and consulting SOWs with project deliverables, milestones, and sign-offs. Fast, private, client-side execution."
  },
  {
    "id": "debit-note-generator",
    "verticals": [
      "business"
    ],
    "name": "Vendor Debit Note Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Generates vendor debit notes for defective goods, short shipments, or price adjustments.",
    "iconName": "Receipt",
    "badge": "New",
    "keywords": [
      "debit note generator",
      "vendor debit note generator",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Vendor Debit Note Generator \u2014 QuickForma",
    "metaDescription": "Free online Vendor Debit Note Generator. Generates vendor debit notes for defective goods, short shipments, or price adjustments. Fast, private, client-side execution."
  },
  {
    "id": "service-level-agreement-generator",
    "verticals": [
      "business"
    ],
    "name": "SLA Terms & Uptime SLA Builder",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "B2B SaaS agreement builder for uptime targets, support response times, and service credits.",
    "iconName": "Shield",
    "badge": "New",
    "keywords": [
      "service level agreement generator",
      "sla terms & uptime sla builder",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "SLA Terms & Uptime SLA Builder \u2014 QuickForma",
    "metaDescription": "Free online SLA Terms & Uptime SLA Builder. B2B SaaS agreement builder for uptime targets, support response times, and service credits. Fast, private, client-side execution."
  },
  {
    "id": "termination-letter-generator",
    "verticals": [
      "business"
    ],
    "name": "Employee Separation & Termination Notice",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "HR letter generator for employment termination, final paycheck details, and benefit continuation.",
    "iconName": "FileX",
    "badge": "New",
    "keywords": [
      "termination letter generator",
      "employee separation & termination notice",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Employee Separation & Termination Notice \u2014 QuickForma",
    "metaDescription": "Free online Employee Separation & Termination Notice. HR letter generator for employment termination, final paycheck details, and benefit continuation. Fast, private, client-side execution."
  },
  {
    "id": "subcontractor-agreement-generator",
    "verticals": [
      "business"
    ],
    "name": "Subcontractor Service Agreement Generator",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Construction and IT subcontractor agreement with scope, insurance requirements, and indemnification.",
    "iconName": "Briefcase",
    "badge": "New",
    "keywords": [
      "subcontractor agreement generator",
      "subcontractor service agreement generator",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Subcontractor Service Agreement Generator \u2014 QuickForma",
    "metaDescription": "Free online Subcontractor Service Agreement Generator. Construction and IT subcontractor agreement with scope, insurance requirements, and indemnification. Fast, private, client-side execution."
  },
  {
    "id": "commercial-lease-summary-generator",
    "verticals": [
      "business"
    ],
    "name": "Commercial Lease Abstract Summary Sheet",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Summarizes commercial lease terms, escalation clauses, rent schedules, and renewal options.",
    "iconName": "Building",
    "badge": "New",
    "keywords": [
      "commercial lease summary generator",
      "commercial lease abstract summary sheet",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Commercial Lease Abstract Summary Sheet \u2014 QuickForma",
    "metaDescription": "Free online Commercial Lease Abstract Summary Sheet. Summarizes commercial lease terms, escalation clauses, rent schedules, and renewal options. Fast, private, client-side execution."
  },
  {
    "id": "certificate-of-completion-generator",
    "verticals": [
      "business"
    ],
    "name": "Project Acceptance & Sign-off Certificate",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Client project sign-off document confirming acceptance of deliverables and final billing release.",
    "iconName": "Award",
    "badge": "New",
    "keywords": [
      "certificate of completion generator",
      "project acceptance & sign-off certificate",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Project Acceptance & Sign-off Certificate \u2014 QuickForma",
    "metaDescription": "Free online Project Acceptance & Sign-off Certificate. Client project sign-off document confirming acceptance of deliverables and final billing release. Fast, private, client-side execution."
  },
  {
    "id": "privacy-policy-template-generator",
    "verticals": [
      "business"
    ],
    "name": "Basic Business Privacy Notice Generator",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Client-side privacy policy template generator for small business websites and online stores.",
    "iconName": "Lock",
    "badge": "New",
    "keywords": [
      "privacy policy template generator",
      "basic business privacy notice generator",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Basic Business Privacy Notice Generator \u2014 QuickForma",
    "metaDescription": "Free online Basic Business Privacy Notice Generator. Client-side privacy policy template generator for small business websites and online stores. Fast, private, client-side execution."
  },
  {
    "id": "terms-of-service-generator",
    "verticals": [
      "business"
    ],
    "name": "Website & SaaS Terms of Service Builder",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Standard terms of service agreement builder outlining user rules, liability limits, and governing law.",
    "iconName": "Scale",
    "badge": "New",
    "keywords": [
      "terms of service generator",
      "website & saas terms of service builder",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Website & SaaS Terms of Service Builder \u2014 QuickForma",
    "metaDescription": "Free online Website & SaaS Terms of Service Builder. Standard terms of service agreement builder outlining user rules, liability limits, and governing law. Fast, private, client-side execution."
  },
  {
    "id": "incident-report-generator",
    "verticals": [
      "business"
    ],
    "name": "Workplace Incident & Safety Report PDF",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "HR and OSHA workplace injury/incident documentation builder.",
    "iconName": "AlertTriangle",
    "badge": "New",
    "keywords": [
      "incident report generator",
      "workplace incident & safety report pdf",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Workplace Incident & Safety Report PDF \u2014 QuickForma",
    "metaDescription": "Free online Workplace Incident & Safety Report PDF. HR and OSHA workplace injury/incident documentation builder. Fast, private, client-side execution."
  },
  {
    "id": "memorandum-of-understanding-generator",
    "verticals": [
      "business"
    ],
    "name": "MOU Partnership Agreement Generator",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Non-binding Memorandum of Understanding generator for strategic business partnerships.",
    "iconName": "Handshake",
    "badge": "New",
    "keywords": [
      "memorandum of understanding generator",
      "mou partnership agreement generator",
      "business & legal docs",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "MOU Partnership Agreement Generator \u2014 QuickForma",
    "metaDescription": "Free online MOU Partnership Agreement Generator. Non-binding Memorandum of Understanding generator for strategic business partnerships. Fast, private, client-side execution."
  },
  {
    "id": "html-entity-encoder",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "HTML Entity Encoder & Escaper",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Encodes special HTML characters into entities and decodes escaped HTML strings.",
    "iconName": "Code2",
    "badge": "New",
    "keywords": [
      "html entity encoder",
      "html entity encoder & escaper",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "HTML Entity Encoder & Escaper \u2014 QuickForma",
    "metaDescription": "Free online HTML Entity Encoder & Escaper. Encodes special HTML characters into entities and decodes escaped HTML strings. Fast, private, client-side execution."
  },
  {
    "id": "hmac-generator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "HMAC-SHA256 Signature Generator",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Generates HMAC webhooks signatures for testing Stripe, Shopify, GitHub, and API webhooks.",
    "iconName": "KeyRound",
    "badge": "New",
    "keywords": [
      "hmac generator",
      "hmac-sha256 signature generator",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "HMAC-SHA256 Signature Generator \u2014 QuickForma",
    "metaDescription": "Free online HMAC-SHA256 Signature Generator. Generates HMAC webhooks signatures for testing Stripe, Shopify, GitHub, and API webhooks. Fast, private, client-side execution."
  },
  {
    "id": "css-minifier-unminifier",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "CSS Minifier & Code Formatter",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Minifies CSS stylesheets and formats minified CSS into clean, readable code.",
    "iconName": "Palette",
    "badge": "New",
    "keywords": [
      "css minifier unminifier",
      "css minifier & code formatter",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "CSS Minifier & Code Formatter \u2014 QuickForma",
    "metaDescription": "Free online CSS Minifier & Code Formatter. Minifies CSS stylesheets and formats minified CSS into clean, readable code. Fast, private, client-side execution."
  },
  {
    "id": "js-beautifier-minifier",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "JavaScript Code Beautifier & Formatter",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Formats obfuscated or single-line JS code into structured, indented JavaScript.",
    "iconName": "FileCode2",
    "badge": "New",
    "keywords": [
      "js beautifier minifier",
      "javascript code beautifier & formatter",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "JavaScript Code Beautifier & Formatter \u2014 QuickForma",
    "metaDescription": "Free online JavaScript Code Beautifier & Formatter. Formats obfuscated or single-line JS code into structured, indented JavaScript. Fast, private, client-side execution."
  },
  {
    "id": "dns-lookup-tool",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "DNS Record Syntax Generator",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Generates and validates DNS record syntax for A, CNAME, MX, TXT, SPF, and DKIM records.",
    "iconName": "Globe",
    "badge": "New",
    "keywords": [
      "dns lookup tool",
      "dns record syntax generator",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "DNS Record Syntax Generator \u2014 QuickForma",
    "metaDescription": "Free online DNS Record Syntax Generator. Generates and validates DNS record syntax for A, CNAME, MX, TXT, SPF, and DKIM records. Fast, private, client-side execution."
  },
  {
    "id": "ip-range-calculator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "IP Address Range & Network Gateway Solver",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Calculates IP address ranges, network IDs, and wildcards for network configuration.",
    "iconName": "Network",
    "badge": "New",
    "keywords": [
      "ip range calculator",
      "ip address range & network gateway solver",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "IP Address Range & Network Gateway Solver \u2014 QuickForma",
    "metaDescription": "Free online IP Address Range & Network Gateway Solver. Calculates IP address ranges, network IDs, and wildcards for network configuration. Fast, private, client-side execution."
  },
  {
    "id": "svg-path-formatter",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "SVG Path Data Optimizer & Cleaner",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Minifies SVG XML code and optimizes SVG path coordinates client-side in browser.",
    "iconName": "Shapes",
    "badge": "New",
    "keywords": [
      "svg path formatter",
      "svg path data optimizer & cleaner",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "SVG Path Data Optimizer & Cleaner \u2014 QuickForma",
    "metaDescription": "Free online SVG Path Data Optimizer & Cleaner. Minifies SVG XML code and optimizes SVG path coordinates client-side in browser. Fast, private, client-side execution."
  },
  {
    "id": "http-header-generator",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "HTTP Security Headers & CORS Policy Builder",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Generates recommended HTTP response headers (CSP, HSTS, X-Frame-Options) for web servers.",
    "iconName": "ShieldCheck",
    "badge": "New",
    "keywords": [
      "http header generator",
      "http security headers & cors policy builder",
      "developer & web tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "HTTP Security Headers & CORS Policy Builder \u2014 QuickForma",
    "metaDescription": "Free online HTTP Security Headers & CORS Policy Builder. Generates recommended HTTP response headers (CSP, HSTS, X-Frame-Options) for web servers. Fast, private, client-side execution."
  },
  {
    "id": "sitemap-xml-builder",
    "verticals": [
      "business",
      "developers"
    ],
    "name": "Visual XML Sitemap Path Builder",
    "category": "developer",
    "categoryLabel": "Developer & Technical Utilities",
    "description": "Constructs clean XML sitemaps with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` tags.",
    "iconName": "FileSpreadsheet",
    "badge": "New",
    "keywords": [
      "sitemap xml builder",
      "visual xml sitemap path builder",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Visual XML Sitemap Path Builder \u2014 QuickForma",
    "metaDescription": "Free online Visual XML Sitemap Path Builder. Constructs clean XML sitemaps with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` tags. Fast, private, client-side execution."
  },
  {
    "id": "text-to-speech-estimator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Script Word Count to Audio Duration Converter",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Estimates speech duration in minutes/seconds based on words per minute (e.",
    "iconName": "Mic",
    "badge": "New",
    "keywords": [
      "text to speech estimator",
      "script word count to audio duration converter",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Script Word Count to Audio Duration Converter \u2014 QuickForma",
    "metaDescription": "Free online Script Word Count to Audio Duration Converter. Estimates speech duration in minutes/seconds based on words per minute (e. Fast, private, client-side execution."
  },
  {
    "id": "anchor-text-ratio-planner",
    "verticals": [
      "business",
      "students"
    ],
    "name": "SEO Internal Anchor Text Distribution Planner",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Audits internal link anchor text ratios (exact match vs branded vs partial match).",
    "iconName": "Link2",
    "badge": "New",
    "keywords": [
      "anchor text ratio planner",
      "seo internal anchor text distribution planner",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "SEO Internal Anchor Text Distribution Planner \u2014 QuickForma",
    "metaDescription": "Free online SEO Internal Anchor Text Distribution Planner. Audits internal link anchor text ratios (exact match vs branded vs partial match). Fast, private, client-side execution."
  },
  {
    "id": "canonical-tag-generator",
    "verticals": [
      "business"
    ],
    "name": "Canonical URL Tag & Cross-Domain Link Builder",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Generates self-referential and cross-domain `<link rel=\"canonical\">` HTML tags.",
    "iconName": "Link",
    "badge": "New",
    "keywords": [
      "canonical tag generator",
      "canonical url tag & cross-domain link builder",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Canonical URL Tag & Cross-Domain Link Builder \u2014 QuickForma",
    "metaDescription": "Free online Canonical URL Tag & Cross-Domain Link Builder. Generates self-referential and cross-domain `<link rel=\"canonical\">` HTML tags. Fast, private, client-side execution."
  },
  {
    "id": "paragraph-counter-analyzer",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Paragraph Length & Sentence Complexity Analyzer",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Counts paragraphs, average sentence length, and flags overly complex sentences.",
    "iconName": "AlignLeft",
    "badge": "New",
    "keywords": [
      "paragraph counter analyzer",
      "paragraph length & sentence complexity analyzer",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Paragraph Length & Sentence Complexity Analyzer \u2014 QuickForma",
    "metaDescription": "Free online Paragraph Length & Sentence Complexity Analyzer. Counts paragraphs, average sentence length, and flags overly complex sentences. Fast, private, client-side execution."
  },
  {
    "id": "slug-to-title-converter",
    "verticals": [
      "business",
      "students"
    ],
    "name": "URL Slug to Clean Headline Title Converter",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Converts URL handles (e.",
    "iconName": "Type",
    "badge": "New",
    "keywords": [
      "slug to title converter",
      "url slug to clean headline title converter",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "URL Slug to Clean Headline Title Converter \u2014 QuickForma",
    "metaDescription": "Free online URL Slug to Clean Headline Title Converter. Converts URL handles (e. Fast, private, client-side execution."
  },
  {
    "id": "word-frequency-counter",
    "verticals": [
      "business",
      "students"
    ],
    "name": "N-Gram Word Pair & Triplet Frequency Analyzer",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Counts most frequent bi-grams and tri-grams in lengthy content.",
    "iconName": "BarChart",
    "badge": "New",
    "keywords": [
      "word frequency counter",
      "n-gram word pair & triplet frequency analyzer",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "N-Gram Word Pair & Triplet Frequency Analyzer \u2014 QuickForma",
    "metaDescription": "Free online N-Gram Word Pair & Triplet Frequency Analyzer. Counts most frequent bi-grams and tri-grams in lengthy content. Fast, private, client-side execution."
  },
  {
    "id": "lorem-markdown-generator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Rich Markdown Placeholder Text & Heading Generator",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Generates dummy Markdown text complete with headings (`#`, `##`), lists, and blockquotes.",
    "iconName": "FileCode",
    "badge": "New",
    "keywords": [
      "lorem markdown generator",
      "rich markdown placeholder text & heading generator",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Rich Markdown Placeholder Text & Heading Generator \u2014 QuickForma",
    "metaDescription": "Free online Rich Markdown Placeholder Text & Heading Generator. Generates dummy Markdown text complete with headings (`#`, `##`), lists, and blockquotes. Fast, private, client-side execution."
  },
  {
    "id": "alt-text-accessibility-checker",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Image Alt Text Character & Descriptive Audit",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Audits image alt text for accessibility standards, length, and keyword stuffing.",
    "iconName": "Image",
    "badge": "New",
    "keywords": [
      "alt text accessibility checker",
      "image alt text character & descriptive audit",
      "text & content tools",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Image Alt Text Character & Descriptive Audit \u2014 QuickForma",
    "metaDescription": "Free online Image Alt Text Character & Descriptive Audit. Audits image alt text for accessibility standards, length, and keyword stuffing. Fast, private, client-side execution."
  },
  {
    "id": "law-school-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "LSAC Law School Admission GPA Converter",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side LSAC Law School Admission GPA Converter tool.",
    "iconName": "Scale",
    "badge": "New",
    "keywords": [
      "law school gpa calculator",
      "lsac law school admission gpa converter",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "LSAC Law School Admission GPA Converter \u2014 QuickForma",
    "metaDescription": "Free online LSAC Law School Admission GPA Converter. Online client-side LSAC Law School Admission GPA Converter tool. Fast, private, client-side execution."
  },
  {
    "id": "medical-school-gpa-calculator",
    "verticals": [
      "business"
    ],
    "name": "AMCAS Science / Non-Science BCPM GPA Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Online client-side AMCAS Science / Non-Science BCPM GPA Solver tool.",
    "iconName": "Stethoscope",
    "badge": "New",
    "keywords": [
      "medical school gpa calculator",
      "amcas science / non-science bcpm gpa solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "AMCAS Science / Non-Science BCPM GPA Solver \u2014 QuickForma",
    "metaDescription": "Free online AMCAS Science / Non-Science BCPM GPA Solver. Online client-side AMCAS Science / Non-Science BCPM GPA Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "ncaa-core-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "NCAA Student-Athlete Core Course GPA Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side NCAA Student-Athlete Core Course GPA Solver tool.",
    "iconName": "Trophy",
    "badge": "New",
    "keywords": [
      "ncaa core gpa calculator",
      "ncaa student-athlete core course gpa solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "NCAA Student-Athlete Core Course GPA Solver \u2014 QuickForma",
    "metaDescription": "Free online NCAA Student-Athlete Core Course GPA Solver. Online client-side NCAA Student-Athlete Core Course GPA Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "class-rank-percentile-calculator",
    "verticals": [
      "business"
    ],
    "name": "High School & Class Rank Percentile Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side High School & Class Rank Percentile Solver tool.",
    "iconName": "Users",
    "badge": "New",
    "keywords": [
      "class rank percentile calculator",
      "high school & class rank percentile solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "High School & Class Rank Percentile Solver \u2014 QuickForma",
    "metaDescription": "Free online High School & Class Rank Percentile Solver. Online client-side High School & Class Rank Percentile Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "pass-fail-gpa-impact-calculator",
    "verticals": [
      "students"
    ],
    "name": "Pass/Fail Course Selection GPA Impact Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side Pass/Fail Course Selection GPA Impact Solver tool.",
    "iconName": "ArrowRightLeft",
    "badge": "New",
    "keywords": [
      "pass fail gpa impact calculator",
      "pass/fail course selection gpa impact solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Pass/Fail Course Selection GPA Impact Solver \u2014 QuickForma",
    "metaDescription": "Free online Pass/Fail Course Selection GPA Impact Solver. Online client-side Pass/Fail Course Selection GPA Impact Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "graduate-school-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "Graduate Master's Program GPA Calculator",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side Graduate Master's Program GPA Calculator tool.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": [
      "graduate school gpa calculator",
      "graduate master's program gpa calculator",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Graduate Master's Program GPA Calculator \u2014 QuickForma",
    "metaDescription": "Free online Graduate Master's Program GPA Calculator. Online client-side Graduate Master's Program GPA Calculator tool. Fast, private, client-side execution."
  },
  {
    "id": "academic-standing-calculator",
    "verticals": [
      "business"
    ],
    "name": "Dean's List vs Academic Probation GPA Threshold",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Dean's List vs Academic Probation GPA Threshold tool.",
    "iconName": "ShieldAlert",
    "badge": "New",
    "keywords": [
      "academic standing calculator",
      "dean's list vs academic probation gpa threshold",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Dean's List vs Academic Probation GPA Threshold \u2014 QuickForma",
    "metaDescription": "Free online Dean's List vs Academic Probation GPA Threshold. Online client-side Dean's List vs Academic Probation GPA Threshold tool. Fast, private, client-side execution."
  },
  {
    "id": "high-school-credit-calculator",
    "verticals": [
      "business"
    ],
    "name": "High School Diploma Credit Completion Tracker",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side High School Diploma Credit Completion Tracker tool.",
    "iconName": "BookOpen",
    "badge": "New",
    "keywords": [
      "high school credit calculator",
      "high school diploma credit completion tracker",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "High School Diploma Credit Completion Tracker \u2014 QuickForma",
    "metaDescription": "Free online High School Diploma Credit Completion Tracker. Online client-side High School Diploma Credit Completion Tracker tool. Fast, private, client-side execution."
  },
  {
    "id": "degree-completion-calculator",
    "verticals": [
      "students"
    ],
    "name": "Degree Credit Progress & Remaining Semester Estimator",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side Degree Credit Progress & Remaining Semester Estimator tool.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": [
      "degree completion calculator",
      "degree credit progress & remaining semester estimator",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Degree Credit Progress & Remaining Semester Estimator \u2014 QuickForma",
    "metaDescription": "Free online Degree Credit Progress & Remaining Semester Estimator. Online client-side Degree Credit Progress & Remaining Semester Estimator tool. Fast, private, client-side execution."
  },
  {
    "id": "prerequisite-course-planner",
    "verticals": [
      "business"
    ],
    "name": "College Course Sequence & Prerequisite Planner",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side College Course Sequence & Prerequisite Planner tool.",
    "iconName": "GitBranch",
    "badge": "New",
    "keywords": [
      "prerequisite course planner",
      "college course sequence & prerequisite planner",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "College Course Sequence & Prerequisite Planner \u2014 QuickForma",
    "metaDescription": "Free online College Course Sequence & Prerequisite Planner. Online client-side College Course Sequence & Prerequisite Planner tool. Fast, private, client-side execution."
  },
  {
    "id": "ged-score-calculator",
    "verticals": [
      "business"
    ],
    "name": "GED Subject Score Percentile & Passing Status Checker",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side GED Subject Score Percentile & Passing Status Checker tool.",
    "iconName": "Award",
    "badge": "New",
    "keywords": [
      "ged score calculator",
      "ged subject score percentile & passing status checker",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "GED Subject Score Percentile & Passing Status Checker \u2014 QuickForma",
    "metaDescription": "Free online GED Subject Score Percentile & Passing Status Checker. Online client-side GED Subject Score Percentile & Passing Status Checker tool. Fast, private, client-side execution."
  },
  {
    "id": "gre-score-percentile-calculator",
    "verticals": [
      "students"
    ],
    "name": "GRE Verbal & Quant Percentile Rank Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side GRE Verbal & Quant Percentile Rank Solver tool.",
    "iconName": "Target",
    "badge": "New",
    "keywords": [
      "gre score percentile calculator",
      "gre verbal & quant percentile rank solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "GRE Verbal & Quant Percentile Rank Solver \u2014 QuickForma",
    "metaDescription": "Free online GRE Verbal & Quant Percentile Rank Solver. Online client-side GRE Verbal & Quant Percentile Rank Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "gmat-score-calculator",
    "verticals": [
      "business"
    ],
    "name": "GMAT Focus Edition Section & Percentile Estimator",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side GMAT Focus Edition Section & Percentile Estimator tool.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": [
      "gmat score calculator",
      "gmat focus edition section & percentile estimator",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "GMAT Focus Edition Section & Percentile Estimator \u2014 QuickForma",
    "metaDescription": "Free online GMAT Focus Edition Section & Percentile Estimator. Online client-side GMAT Focus Edition Section & Percentile Estimator tool. Fast, private, client-side execution."
  },
  {
    "id": "toefl-ielts-score-converter",
    "verticals": [
      "students"
    ],
    "name": "TOEFL iBT to IELTS Band Score Converter",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side TOEFL iBT to IELTS Band Score Converter tool.",
    "iconName": "Languages",
    "badge": "New",
    "keywords": [
      "toefl ielts score converter",
      "toefl ibt to ielts band score converter",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "TOEFL iBT to IELTS Band Score Converter \u2014 QuickForma",
    "metaDescription": "Free online TOEFL iBT to IELTS Band Score Converter. Online client-side TOEFL iBT to IELTS Band Score Converter tool. Fast, private, client-side execution."
  },
  {
    "id": "clep-credit-calculator",
    "verticals": [
      "business"
    ],
    "name": "CLEP Exam Credit Hour & Tuition Savings Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side CLEP Exam Credit Hour & Tuition Savings Solver tool.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": [
      "clep credit calculator",
      "clep exam credit hour & tuition savings solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "CLEP Exam Credit Hour & Tuition Savings Solver \u2014 QuickForma",
    "metaDescription": "Free online CLEP Exam Credit Hour & Tuition Savings Solver. Online client-side CLEP Exam Credit Hour & Tuition Savings Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "academic-forgiveness-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "Course Repeat & Grade Replacement GPA Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side Course Repeat & Grade Replacement GPA Solver tool.",
    "iconName": "RefreshCw",
    "badge": "New",
    "keywords": [
      "academic forgiveness gpa calculator",
      "course repeat & grade replacement gpa solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Course Repeat & Grade Replacement GPA Solver \u2014 QuickForma",
    "metaDescription": "Free online Course Repeat & Grade Replacement GPA Solver. Online client-side Course Repeat & Grade Replacement GPA Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "stem-major-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "Engineering & Science Major Core GPA Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side Engineering & Science Major Core GPA Solver tool.",
    "iconName": "Cpu",
    "badge": "New",
    "keywords": [
      "stem major gpa calculator",
      "engineering & science major core gpa solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Engineering & Science Major Core GPA Solver \u2014 QuickForma",
    "metaDescription": "Free online Engineering & Science Major Core GPA Solver. Online client-side Engineering & Science Major Core GPA Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "business-major-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "Finance & Accounting Major Core GPA Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side Finance & Accounting Major Core GPA Solver tool.",
    "iconName": "Briefcase",
    "badge": "New",
    "keywords": [
      "business major gpa calculator",
      "finance & accounting major core gpa solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Finance & Accounting Major Core GPA Solver \u2014 QuickForma",
    "metaDescription": "Free online Finance & Accounting Major Core GPA Solver. Online client-side Finance & Accounting Major Core GPA Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "nursing-school-gpa-calculator",
    "verticals": [
      "students"
    ],
    "name": "Nursing Prerequisite & Science GPA Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side Nursing Prerequisite & Science GPA Solver tool.",
    "iconName": "HeartPulse",
    "badge": "New",
    "keywords": [
      "nursing school gpa calculator",
      "nursing prerequisite & science gpa solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Nursing Prerequisite & Science GPA Solver \u2014 QuickForma",
    "metaDescription": "Free online Nursing Prerequisite & Science GPA Solver. Online client-side Nursing Prerequisite & Science GPA Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "complex-numbers-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Polar vs Rectangular Complex Number Calculator",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Online client-side Polar vs Rectangular Complex Number Calculator tool.",
    "iconName": "Compass",
    "badge": "New",
    "keywords": [
      "complex numbers calculator",
      "polar vs rectangular complex number calculator",
      "converters & formats",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Polar vs Rectangular Complex Number Calculator \u2014 QuickForma",
    "metaDescription": "Free online Polar vs Rectangular Complex Number Calculator. Online client-side Polar vs Rectangular Complex Number Calculator tool. Fast, private, client-side execution."
  },
  {
    "id": "factorial-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Factorial $n!$ & Permutation Formula Solver",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Online client-side Factorial $n!$ & Permutation Formula Solver tool.",
    "iconName": "FunctionSquare",
    "badge": "New",
    "keywords": [
      "factorial calculator",
      "factorial $n!$ & permutation formula solver",
      "converters & formats",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Factorial $n!$ & Permutation Formula Solver \u2014 QuickForma",
    "metaDescription": "Free online Factorial $n!$ & Permutation Formula Solver. Online client-side Factorial $n!$ & Permutation Formula Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "logarithm-change-of-base-tool",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Logarithm Base-$b$ Conversion Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Online client-side Logarithm Base-$b$ Conversion Solver tool.",
    "iconName": "Divide",
    "badge": "New",
    "keywords": [
      "logarithm change of base tool",
      "logarithm base-$b$ conversion solver",
      "converters & formats",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Logarithm Base-$b$ Conversion Solver \u2014 QuickForma",
    "metaDescription": "Free online Logarithm Base-$b$ Conversion Solver. Online client-side Logarithm Base-$b$ Conversion Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "ellipse-hyperbola-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Conic Sections: Ellipse & Hyperbola Solver",
    "category": "converters",
    "categoryLabel": "Converters & Measurement",
    "description": "Online client-side Conic Sections: Ellipse & Hyperbola Solver tool.",
    "iconName": "Orbit",
    "badge": "New",
    "keywords": [
      "ellipse hyperbola calculator",
      "conic sections: ellipse & hyperbola solver",
      "converters & formats",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Conic Sections: Ellipse & Hyperbola Solver \u2014 QuickForma",
    "metaDescription": "Free online Conic Sections: Ellipse & Hyperbola Solver. Online client-side Conic Sections: Ellipse & Hyperbola Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "partial-fraction-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Partial Fraction Decomposition Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Online client-side Partial Fraction Decomposition Solver tool.",
    "iconName": "FunctionSquare",
    "badge": "New",
    "keywords": [
      "partial fraction calculator",
      "partial fraction decomposition solver",
      "converters & formats",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Partial Fraction Decomposition Solver \u2014 QuickForma",
    "metaDescription": "Free online Partial Fraction Decomposition Solver. Online client-side Partial Fraction Decomposition Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "poisson-distribution-calculator",
    "verticals": [
      "business"
    ],
    "name": "Poisson Event Probability & Rate Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Poisson Event Probability & Rate Solver tool.",
    "iconName": "BarChart",
    "badge": "New",
    "keywords": [
      "poisson distribution calculator",
      "poisson event probability & rate solver",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Poisson Event Probability & Rate Solver \u2014 QuickForma",
    "metaDescription": "Free online Poisson Event Probability & Rate Solver. Online client-side Poisson Event Probability & Rate Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "exponential-distribution-calculator",
    "verticals": [
      "business"
    ],
    "name": "Continuous Exponential Decay & Reliability",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Continuous Exponential Decay & Reliability tool.",
    "iconName": "TrendingDown",
    "badge": "New",
    "keywords": [
      "exponential distribution calculator",
      "continuous exponential decay & reliability",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Continuous Exponential Decay & Reliability \u2014 QuickForma",
    "metaDescription": "Free online Continuous Exponential Decay & Reliability. Online client-side Continuous Exponential Decay & Reliability tool. Fast, private, client-side execution."
  },
  {
    "id": "bayes-theorem-calculator",
    "verticals": [
      "business"
    ],
    "name": "Bayesian Conditional Probability & Prior Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Bayesian Conditional Probability & Prior Solver tool.",
    "iconName": "GitCommit",
    "badge": "New",
    "keywords": [
      "bayes theorem calculator",
      "bayesian conditional probability & prior solver",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Bayesian Conditional Probability & Prior Solver \u2014 QuickForma",
    "metaDescription": "Free online Bayesian Conditional Probability & Prior Solver. Online client-side Bayesian Conditional Probability & Prior Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "buffer-solution-calculator",
    "verticals": [
      "business"
    ],
    "name": "Henderson-Hasselbalch Buffer pH Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Henderson-Hasselbalch Buffer pH Solver tool.",
    "iconName": "FlaskConical",
    "badge": "New",
    "keywords": [
      "buffer solution calculator",
      "henderson-hasselbalch buffer ph solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Henderson-Hasselbalch Buffer pH Solver \u2014 QuickForma",
    "metaDescription": "Free online Henderson-Hasselbalch Buffer pH Solver. Online client-side Henderson-Hasselbalch Buffer pH Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "boiling-point-elevation-calculator",
    "verticals": [
      "business"
    ],
    "name": "Colligative Properties & Freezing Point Depression",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Colligative Properties & Freezing Point Depression tool.",
    "iconName": "Flame",
    "badge": "New",
    "keywords": [
      "boiling point elevation calculator",
      "colligative properties & freezing point depression",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Colligative Properties & Freezing Point Depression \u2014 QuickForma",
    "metaDescription": "Free online Colligative Properties & Freezing Point Depression. Online client-side Colligative Properties & Freezing Point Depression tool. Fast, private, client-side execution."
  },
  {
    "id": "activation-energy-calculator",
    "verticals": [
      "business"
    ],
    "name": "Arrhenius Equation & Activation Energy Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Arrhenius Equation & Activation Energy Solver tool.",
    "iconName": "Zap",
    "badge": "New",
    "keywords": [
      "activation energy calculator",
      "arrhenius equation & activation energy solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Arrhenius Equation & Activation Energy Solver \u2014 QuickForma",
    "metaDescription": "Free online Arrhenius Equation & Activation Energy Solver. Online client-side Arrhenius Equation & Activation Energy Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "combustion-analysis-calculator",
    "verticals": [
      "business"
    ],
    "name": "Hydrocarbon Combustion Formula Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Hydrocarbon Combustion Formula Solver tool.",
    "iconName": "Flame",
    "badge": "New",
    "keywords": [
      "combustion analysis calculator",
      "hydrocarbon combustion formula solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Hydrocarbon Combustion Formula Solver \u2014 QuickForma",
    "metaDescription": "Free online Hydrocarbon Combustion Formula Solver. Online client-side Hydrocarbon Combustion Formula Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "oxidation-number-calculator",
    "verticals": [
      "business"
    ],
    "name": "Redox Reaction Oxidation State Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Redox Reaction Oxidation State Solver tool.",
    "iconName": "Atom",
    "badge": "New",
    "keywords": [
      "oxidation number calculator",
      "redox reaction oxidation state solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Redox Reaction Oxidation State Solver \u2014 QuickForma",
    "metaDescription": "Free online Redox Reaction Oxidation State Solver. Online client-side Redox Reaction Oxidation State Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "equilibrium-constant-calculator",
    "verticals": [
      "business"
    ],
    "name": "Chemical Equilibrium $K_c$ and $K_p$ Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Chemical Equilibrium $K_c$ and $K_p$ Solver tool.",
    "iconName": "ArrowLeftRight",
    "badge": "New",
    "keywords": [
      "equilibrium constant calculator",
      "chemical equilibrium $k_c$ and $k_p$ solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Chemical Equilibrium $K_c$ and $K_p$ Solver \u2014 QuickForma",
    "metaDescription": "Free online Chemical Equilibrium $K_c$ and $K_p$ Solver. Online client-side Chemical Equilibrium $K_c$ and $K_p$ Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "electrolysis-faraday-calculator",
    "verticals": [
      "business"
    ],
    "name": "Faraday's Law of Electrolysis Mass Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Online client-side Faraday's Law of Electrolysis Mass Solver tool.",
    "iconName": "Zap",
    "badge": "New",
    "keywords": [
      "electrolysis faraday calculator",
      "faraday's law of electrolysis mass solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Faraday's Law of Electrolysis Mass Solver \u2014 QuickForma",
    "metaDescription": "Free online Faraday's Law of Electrolysis Mass Solver. Online client-side Faraday's Law of Electrolysis Mass Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "torque-rotational-motion-calculator",
    "verticals": [
      "students"
    ],
    "name": "Torque, Moment of Inertia & Rotational Kinematics",
    "category": "science",
    "categoryLabel": "Science & Engineering",
    "description": "Online client-side Torque, Moment of Inertia & Rotational Kinematics tool.",
    "iconName": "RotateCw",
    "badge": "New",
    "keywords": [
      "torque rotational motion calculator",
      "torque, moment of inertia & rotational kinematics",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Torque, Moment of Inertia & Rotational Kinematics \u2014 QuickForma",
    "metaDescription": "Free online Torque, Moment of Inertia & Rotational Kinematics. Online client-side Torque, Moment of Inertia & Rotational Kinematics tool. Fast, private, client-side execution."
  },
  {
    "id": "pendulum-harmonic-motion-calculator",
    "verticals": [
      "business"
    ],
    "name": "Simple Harmonic Motion & Oscillation Period",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Simple Harmonic Motion & Oscillation Period tool.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": [
      "pendulum harmonic motion calculator",
      "simple harmonic motion & oscillation period",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Simple Harmonic Motion & Oscillation Period \u2014 QuickForma",
    "metaDescription": "Free online Simple Harmonic Motion & Oscillation Period. Online client-side Simple Harmonic Motion & Oscillation Period tool. Fast, private, client-side execution."
  },
  {
    "id": "doppler-effect-calculator",
    "verticals": [
      "business"
    ],
    "name": "Sound & Light Wave Frequency Doppler Shift",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Sound & Light Wave Frequency Doppler Shift tool.",
    "iconName": "Volume2",
    "badge": "New",
    "keywords": [
      "doppler effect calculator",
      "sound & light wave frequency doppler shift",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Sound & Light Wave Frequency Doppler Shift \u2014 QuickForma",
    "metaDescription": "Free online Sound & Light Wave Frequency Doppler Shift. Online client-side Sound & Light Wave Frequency Doppler Shift tool. Fast, private, client-side execution."
  },
  {
    "id": "refraction-snells-law-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Snell's Law of Refraction & Critical Angle",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Online client-side Snell's Law of Refraction & Critical Angle tool.",
    "iconName": "Compass",
    "badge": "New",
    "keywords": [
      "refraction snells law calculator",
      "snell's law of refraction & critical angle",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Snell's Law of Refraction & Critical Angle \u2014 QuickForma",
    "metaDescription": "Free online Snell's Law of Refraction & Critical Angle. Online client-side Snell's Law of Refraction & Critical Angle tool. Fast, private, client-side execution."
  },
  {
    "id": "capacitance-rc-circuit-calculator",
    "verticals": [
      "business"
    ],
    "name": "Capacitor Charge & RC Time Constant Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Capacitor Charge & RC Time Constant Solver tool.",
    "iconName": "Zap",
    "badge": "New",
    "keywords": [
      "capacitance rc circuit calculator",
      "capacitor charge & rc time constant solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Capacitor Charge & RC Time Constant Solver \u2014 QuickForma",
    "metaDescription": "Free online Capacitor Charge & RC Time Constant Solver. Online client-side Capacitor Charge & RC Time Constant Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "transformer-voltage-calculator",
    "verticals": [
      "business"
    ],
    "name": "Electrical Transformer Turns Ratio & Voltage Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Online client-side Electrical Transformer Turns Ratio & Voltage Solver tool.",
    "iconName": "Zap",
    "badge": "New",
    "keywords": [
      "transformer voltage calculator",
      "electrical transformer turns ratio & voltage solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Electrical Transformer Turns Ratio & Voltage Solver \u2014 QuickForma",
    "metaDescription": "Free online Electrical Transformer Turns Ratio & Voltage Solver. Online client-side Electrical Transformer Turns Ratio & Voltage Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "fluid-buoyancy-archimedes-calculator",
    "verticals": [
      "business"
    ],
    "name": "Archimedes' Principle & Buoyant Force Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Archimedes' Principle & Buoyant Force Solver tool.",
    "iconName": "Waves",
    "badge": "New",
    "keywords": [
      "fluid buoyancy archimedes calculator",
      "archimedes' principle & buoyant force solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Archimedes' Principle & Buoyant Force Solver \u2014 QuickForma",
    "metaDescription": "Free online Archimedes' Principle & Buoyant Force Solver. Online client-side Archimedes' Principle & Buoyant Force Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "bernoullis-equation-calculator",
    "verticals": [
      "business"
    ],
    "name": "Fluid Dynamics Pressure & Flow Velocity Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Fluid Dynamics Pressure & Flow Velocity Solver tool.",
    "iconName": "Wind",
    "badge": "New",
    "keywords": [
      "bernoullis equation calculator",
      "fluid dynamics pressure & flow velocity solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Fluid Dynamics Pressure & Flow Velocity Solver \u2014 QuickForma",
    "metaDescription": "Free online Fluid Dynamics Pressure & Flow Velocity Solver. Online client-side Fluid Dynamics Pressure & Flow Velocity Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "special-relativity-time-dilation-calculator",
    "verticals": [
      "business"
    ],
    "name": "Lorentz Factor & Time Dilation Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Lorentz Factor & Time Dilation Solver tool.",
    "iconName": "Rocket",
    "badge": "New",
    "keywords": [
      "special relativity time dilation calculator",
      "lorentz factor & time dilation solver",
      "students & education",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Lorentz Factor & Time Dilation Solver \u2014 QuickForma",
    "metaDescription": "Free online Lorentz Factor & Time Dilation Solver. Online client-side Lorentz Factor & Time Dilation Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "cornell-notes-template-generator",
    "verticals": [
      "business"
    ],
    "name": "Printable & Interactive Cornell Notes Sheet",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Printable & Interactive Cornell Notes Sheet tool.",
    "iconName": "BookOpen",
    "badge": "New",
    "keywords": [
      "cornell notes template generator",
      "printable & interactive cornell notes sheet",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Printable & Interactive Cornell Notes Sheet \u2014 QuickForma",
    "metaDescription": "Free online Printable & Interactive Cornell Notes Sheet. Online client-side Printable & Interactive Cornell Notes Sheet tool. Fast, private, client-side execution."
  },
  {
    "id": "thesis-statement-generator",
    "verticals": [
      "business"
    ],
    "name": "Academic Essay Thesis Statement Builder",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Academic Essay Thesis Statement Builder tool.",
    "iconName": "Feather",
    "badge": "New",
    "keywords": [
      "thesis statement generator",
      "academic essay thesis statement builder",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Academic Essay Thesis Statement Builder \u2014 QuickForma",
    "metaDescription": "Free online Academic Essay Thesis Statement Builder. Online client-side Academic Essay Thesis Statement Builder tool. Fast, private, client-side execution."
  },
  {
    "id": "study-group-expense-splitter",
    "verticals": [
      "students"
    ],
    "name": "Student Project & Shared Supplies Cost Splitter",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Online client-side Student Project & Shared Supplies Cost Splitter tool.",
    "iconName": "Users",
    "badge": "New",
    "keywords": [
      "study group expense splitter",
      "student project & shared supplies cost splitter",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Student Project & Shared Supplies Cost Splitter \u2014 QuickForma",
    "metaDescription": "Free online Student Project & Shared Supplies Cost Splitter. Online client-side Student Project & Shared Supplies Cost Splitter tool. Fast, private, client-side execution."
  },
  {
    "id": "exam-prep-score-predictor",
    "verticals": [
      "business"
    ],
    "name": "Mock Test Score to Final Exam Grade Predictor",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Mock Test Score to Final Exam Grade Predictor tool.",
    "iconName": "Target",
    "badge": "New",
    "keywords": [
      "exam prep score predictor",
      "mock test score to final exam grade predictor",
      "productivity & daily",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Mock Test Score to Final Exam Grade Predictor \u2014 QuickForma",
    "metaDescription": "Free online Mock Test Score to Final Exam Grade Predictor. Online client-side Mock Test Score to Final Exam Grade Predictor tool. Fast, private, client-side execution."
  },
  {
    "id": "mercari-seller-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Mercari Selling & Direct Deposit Fee Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Online client-side Mercari Selling & Direct Deposit Fee Solver tool.",
    "iconName": "ShoppingBag",
    "badge": "New",
    "keywords": [
      "mercari seller fee calculator",
      "mercari selling & direct deposit fee solver",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Mercari Selling & Direct Deposit Fee Solver \u2014 QuickForma",
    "metaDescription": "Free online Mercari Selling & Direct Deposit Fee Solver. Online client-side Mercari Selling & Direct Deposit Fee Solver tool. Fast, private, client-side execution."
  },
  {
    "id": "poshmark-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Poshmark Flat vs 20% Seller Commission Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Online client-side Poshmark Flat vs 20% Seller Commission Calculator tool.",
    "iconName": "Tag",
    "badge": "New",
    "keywords": [
      "poshmark fee calculator",
      "poshmark flat vs 20% seller commission calculator",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Poshmark Flat vs 20% Seller Commission Calculator \u2014 QuickForma",
    "metaDescription": "Free online Poshmark Flat vs 20% Seller Commission Calculator. Online client-side Poshmark Flat vs 20% Seller Commission Calculator tool. Fast, private, client-side execution."
  },
  {
    "id": "return-rate-profit-impact-calculator",
    "verticals": [
      "business"
    ],
    "name": "Customer Return Rate & Restock Cost Loss",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Online client-side Customer Return Rate & Restock Cost Loss tool.",
    "iconName": "RotateCcw",
    "badge": "New",
    "keywords": [
      "return rate profit impact calculator",
      "customer return rate & restock cost loss",
      "ecommerce & operations",
      "business tool",
      "online calculator"
    ],
    "metaTitle": "Customer Return Rate & Restock Cost Loss \u2014 QuickForma",
    "metaDescription": "Free online Customer Return Rate & Restock Cost Loss. Online client-side Customer Return Rate & Restock Cost Loss tool. Fast, private, client-side execution."
  },
  {
    "id": "roas-calculator",
    "verticals": [
      "business"
    ],
    "name": "ROAS & Blended Marketing Return Calculator",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze roas & blended marketing return calculator with instant client-side business precision.",
    "iconName": "Calculator",
    "keywords": [
      "roas calculator",
      "roas & blended marketing return calculator",
      "finance calculator",
      "roas calculator"
    ],
    "metaTitle": "ROAS & Blended Marketing Return Calculator \u2014 QuickForma",
    "metaDescription": "Free client-side roas & blended marketing return calculator with zero cloud tracking and instant results."
  },
  {
    "id": "inventory-turns-days-sales-calculator",
    "verticals": [
      "business"
    ],
    "name": "Days Inventory Outstanding (DIO) Standalone Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze days inventory outstanding (dio) standalone solver with instant client-side business precision.",
    "iconName": "Calculator",
    "keywords": [
      "inventory turns days sales calculator",
      "days inventory outstanding (dio) standalone solver",
      "finance calculator",
      "inventory calculator"
    ],
    "metaTitle": "Days Inventory Outstanding (DIO) Standalone Solver \u2014 QuickForma",
    "metaDescription": "Free client-side days inventory outstanding (dio) standalone solver with zero cloud tracking and instant results."
  },
  {
    "id": "break-even-revenue-calculator",
    "verticals": [
      "business"
    ],
    "name": "Break-Even Sales Volume Revenue Dollar Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze break-even sales volume revenue dollar solver with instant client-side business precision.",
    "iconName": "Calculator",
    "keywords": [
      "break even revenue calculator",
      "break-even sales volume revenue dollar solver",
      "finance calculator",
      "break calculator"
    ],
    "metaTitle": "Break-Even Sales Volume Revenue Dollar Solver \u2014 QuickForma",
    "metaDescription": "Free client-side break-even sales volume revenue dollar solver with zero cloud tracking and instant results."
  },
  {
    "id": "middle-school-grade-calculator",
    "verticals": [
      "students"
    ],
    "name": "Letter Grade to Percentage Scale Converter",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculate and analyze letter grade to percentage scale converter with instant client-side business precision.",
    "iconName": "GraduationCap",
    "keywords": [
      "middle school grade calculator",
      "letter grade to percentage scale converter",
      "students calculator",
      "middle calculator"
    ],
    "metaTitle": "Letter Grade to Percentage Scale Converter \u2014 QuickForma",
    "metaDescription": "Free client-side letter grade to percentage scale converter with zero cloud tracking and instant results."
  },
  {
    "id": "shipping-container-load-calculator",
    "verticals": [
      "business"
    ],
    "name": "20ft/40ft Container CBM Freight Load Estimator",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze 20ft/40ft container cbm freight load estimator with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "shipping container load calculator",
      "20ft/40ft container cbm freight load estimator",
      "ecommerce calculator",
      "shipping calculator"
    ],
    "metaTitle": "20ft/40ft Container CBM Freight Load Estimator \u2014 QuickForma",
    "metaDescription": "Free client-side 20ft/40ft container cbm freight load estimator with zero cloud tracking and instant results."
  },
  {
    "id": "minimum-advertised-price-map-calculator",
    "verticals": [
      "business"
    ],
    "name": "MAP Pricing & Authorized Reseller Margin",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze map pricing & authorized reseller margin with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "minimum advertised price map calculator",
      "map pricing & authorized reseller margin",
      "ecommerce calculator",
      "minimum calculator"
    ],
    "metaTitle": "MAP Pricing & Authorized Reseller Margin \u2014 QuickForma",
    "metaDescription": "Free client-side map pricing & authorized reseller margin with zero cloud tracking and instant results."
  },
  {
    "id": "chargeback-fee-loss-calculator",
    "verticals": [
      "business"
    ],
    "name": "Merchant Chargeback Ratio & Fine Risk Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze merchant chargeback ratio & fine risk solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "chargeback fee loss calculator",
      "merchant chargeback ratio & fine risk solver",
      "ecommerce calculator",
      "chargeback calculator"
    ],
    "metaTitle": "Merchant Chargeback Ratio & Fine Risk Solver \u2014 QuickForma",
    "metaDescription": "Free client-side merchant chargeback ratio & fine risk solver with zero cloud tracking and instant results."
  },
  {
    "id": "klarna-afterpay-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Buy Now Pay Later (BNPL) Merchant Fee Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze buy now pay later (bnpl) merchant fee solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "klarna afterpay fee calculator",
      "buy now pay later (bnpl) merchant fee solver",
      "ecommerce calculator",
      "klarna calculator"
    ],
    "metaTitle": "Buy Now Pay Later (BNPL) Merchant Fee Solver \u2014 QuickForma",
    "metaDescription": "Free client-side buy now pay later (bnpl) merchant fee solver with zero cloud tracking and instant results."
  },
  {
    "id": "square-pos-processing-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Square Point of Sale In-Person vs Online Fee",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze square point of sale in-person vs online fee with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "square pos processing fee calculator",
      "square point of sale in-person vs online fee",
      "ecommerce calculator",
      "square calculator"
    ],
    "metaTitle": "Square Point of Sale In-Person vs Online Fee \u2014 QuickForma",
    "metaDescription": "Free client-side square point of sale in-person vs online fee with zero cloud tracking and instant results."
  },
  {
    "id": "kickstarter-indiegogo-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Crowdfunding Platform Commission & Profit",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze crowdfunding platform commission & profit with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "kickstarter indiegogo fee calculator",
      "crowdfunding platform commission & profit",
      "ecommerce calculator",
      "kickstarter calculator"
    ],
    "metaTitle": "Crowdfunding Platform Commission & Profit \u2014 QuickForma",
    "metaDescription": "Free client-side crowdfunding platform commission & profit with zero cloud tracking and instant results."
  },
  {
    "id": "amazon-storage-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Amazon Q4 Peak vs Standard Storage Fee Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze amazon q4 peak vs standard storage fee solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "amazon storage fee calculator",
      "amazon q4 peak vs standard storage fee solver",
      "ecommerce calculator",
      "amazon calculator"
    ],
    "metaTitle": "Amazon Q4 Peak vs Standard Storage Fee Solver \u2014 QuickForma",
    "metaDescription": "Free client-side amazon q4 peak vs standard storage fee solver with zero cloud tracking and instant results."
  },
  {
    "id": "cross-border-currency-conversion-fee",
    "verticals": [
      "business"
    ],
    "name": "International Merchant FX Fee & Markup",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze international merchant fx fee & markup with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "cross border currency conversion fee",
      "international merchant fx fee & markup",
      "ecommerce calculator",
      "cross calculator"
    ],
    "metaTitle": "International Merchant FX Fee & Markup \u2014 QuickForma",
    "metaDescription": "Free client-side international merchant fx fee & markup with zero cloud tracking and instant results."
  },
  {
    "id": "product-packaging-dimensional-calculator",
    "verticals": [
      "business"
    ],
    "name": "Box Size & DIM Freight Cost Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze box size & dim freight cost solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "product packaging dimensional calculator",
      "box size & dim freight cost solver",
      "ecommerce calculator",
      "product calculator"
    ],
    "metaTitle": "Box Size & DIM Freight Cost Solver \u2014 QuickForma",
    "metaDescription": "Free client-side box size & dim freight cost solver with zero cloud tracking and instant results."
  },
  {
    "id": "print-on-demand-pod-margin-calculator",
    "verticals": [
      "business"
    ],
    "name": "Printify / Printful Merch Profit Margin Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze printify / printful merch profit margin solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "print on demand pod margin calculator",
      "printify / printful merch profit margin solver",
      "ecommerce calculator",
      "print calculator"
    ],
    "metaTitle": "Printify / Printful Merch Profit Margin Solver \u2014 QuickForma",
    "metaDescription": "Free client-side printify / printful merch profit margin solver with zero cloud tracking and instant results."
  },
  {
    "id": "inventory-shrinkage-loss-calculator",
    "verticals": [
      "business"
    ],
    "name": "Retail Inventory Theft & Spoilage Impact",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze retail inventory theft & spoilage impact with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "inventory shrinkage loss calculator",
      "retail inventory theft & spoilage impact",
      "ecommerce calculator",
      "inventory calculator"
    ],
    "metaTitle": "Retail Inventory Theft & Spoilage Impact \u2014 QuickForma",
    "metaDescription": "Free client-side retail inventory theft & spoilage impact with zero cloud tracking and instant results."
  },
  {
    "id": "affiliate-commission-payout-calculator",
    "verticals": [
      "business"
    ],
    "name": "Affiliate Marketing Program Margin Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze affiliate marketing program margin solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "affiliate commission payout calculator",
      "affiliate marketing program margin solver",
      "ecommerce calculator",
      "affiliate calculator"
    ],
    "metaTitle": "Affiliate Marketing Program Margin Solver \u2014 QuickForma",
    "metaDescription": "Free client-side affiliate marketing program margin solver with zero cloud tracking and instant results."
  },
  {
    "id": "retail-markdown-clearance-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Clearance Discount & Liquidation Recovery",
    "category": "writing",
    "categoryLabel": "Writing, Text & Content",
    "description": "Calculate and analyze clearance discount & liquidation recovery with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "retail markdown clearance calculator",
      "clearance discount & liquidation recovery",
      "ecommerce calculator",
      "retail calculator"
    ],
    "metaTitle": "Clearance Discount & Liquidation Recovery \u2014 QuickForma",
    "metaDescription": "Free client-side clearance discount & liquidation recovery with zero cloud tracking and instant results."
  },
  {
    "id": "warehouse-storage-cbm-calculator",
    "verticals": [
      "business"
    ],
    "name": "Pallet Racking & Warehouse CBM Storage Cost",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze pallet racking & warehouse cbm storage cost with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "warehouse storage cbm calculator",
      "pallet racking & warehouse cbm storage cost",
      "ecommerce calculator",
      "warehouse calculator"
    ],
    "metaTitle": "Pallet Racking & Warehouse CBM Storage Cost \u2014 QuickForma",
    "metaDescription": "Free client-side pallet racking & warehouse cbm storage cost with zero cloud tracking and instant results."
  },
  {
    "id": "supplier-volume-discount-break-even",
    "verticals": [
      "business"
    ],
    "name": "MoQ Supplier Tiered Discount ROI Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze moq supplier tiered discount roi solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "supplier volume discount break even",
      "moq supplier tiered discount roi solver",
      "ecommerce calculator",
      "supplier calculator"
    ],
    "metaTitle": "MoQ Supplier Tiered Discount ROI Solver \u2014 QuickForma",
    "metaDescription": "Free client-side moq supplier tiered discount roi solver with zero cloud tracking and instant results."
  },
  {
    "id": "re-stocking-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Customer Refund Restocking Fee & Net Loss",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze customer refund restocking fee & net loss with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "re stocking fee calculator",
      "customer refund restocking fee & net loss",
      "ecommerce calculator",
      "stocking calculator"
    ],
    "metaTitle": "Customer Refund Restocking Fee & Net Loss \u2014 QuickForma",
    "metaDescription": "Free client-side customer refund restocking fee & net loss with zero cloud tracking and instant results."
  },
  {
    "id": "ecommerce-customer-retention-revenue",
    "verticals": [
      "business"
    ],
    "name": "Repeat Purchase Rate & LTV Boost Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze repeat purchase rate & ltv boost solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "ecommerce customer retention revenue",
      "repeat purchase rate & ltv boost solver",
      "ecommerce calculator",
      "ecommerce calculator"
    ],
    "metaTitle": "Repeat Purchase Rate & LTV Boost Solver \u2014 QuickForma",
    "metaDescription": "Free client-side repeat purchase rate & ltv boost solver with zero cloud tracking and instant results."
  },
  {
    "id": "omnichannel-channel-margin-compare",
    "verticals": [
      "business"
    ],
    "name": "Amazon vs Shopify vs Wholesale Margin Comparison",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze amazon vs shopify vs wholesale margin comparison with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "omnichannel channel margin compare",
      "amazon vs shopify vs wholesale margin comparison",
      "ecommerce calculator",
      "omnichannel calculator"
    ],
    "metaTitle": "Amazon vs Shopify vs Wholesale Margin Comparison \u2014 QuickForma",
    "metaDescription": "Free client-side amazon vs shopify vs wholesale margin comparison with zero cloud tracking and instant results."
  },
  {
    "id": "amazon-repricing-margin-calculator",
    "verticals": [
      "business"
    ],
    "name": "Automated Amazon Repricer Minimum Floor Price Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze automated amazon repricer minimum floor price solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "amazon repricing margin calculator",
      "automated amazon repricer minimum floor price solver",
      "ecommerce calculator",
      "amazon calculator"
    ],
    "metaTitle": "Automated Amazon Repricer Minimum Floor Price Solver \u2014 QuickForma",
    "metaDescription": "Free client-side automated amazon repricer minimum floor price solver with zero cloud tracking and instant results."
  },
  {
    "id": "ecommerce-refund-loss-recovery-calculator",
    "verticals": [
      "business"
    ],
    "name": "Return Logistics & Restocking Net Recovery",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze return logistics & restocking net recovery with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "ecommerce refund loss recovery calculator",
      "return logistics & restocking net recovery",
      "ecommerce calculator",
      "ecommerce calculator"
    ],
    "metaTitle": "Return Logistics & Restocking Net Recovery \u2014 QuickForma",
    "metaDescription": "Free client-side return logistics & restocking net recovery with zero cloud tracking and instant results."
  },
  {
    "id": "order-cancellation-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Order Defect Rate & Cancellation Risk Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze order defect rate & cancellation risk solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "order cancellation rate calculator",
      "order defect rate & cancellation risk solver",
      "ecommerce calculator",
      "order calculator"
    ],
    "metaTitle": "Order Defect Rate & Cancellation Risk Solver \u2014 QuickForma",
    "metaDescription": "Free client-side order defect rate & cancellation risk solver with zero cloud tracking and instant results."
  },
  {
    "id": "multi-channel-inventory-allocation",
    "verticals": [
      "business"
    ],
    "name": "Multi-Warehouse Reorder Allocation Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze multi-warehouse reorder allocation solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "multi channel inventory allocation",
      "multi-warehouse reorder allocation solver",
      "ecommerce calculator",
      "multi calculator"
    ],
    "metaTitle": "Multi-Warehouse Reorder Allocation Solver \u2014 QuickForma",
    "metaDescription": "Free client-side multi-warehouse reorder allocation solver with zero cloud tracking and instant results."
  },
  {
    "id": "shopify-pos-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Shopify POS In-Person Card Rate Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze shopify pos in-person card rate solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "shopify pos fee calculator",
      "shopify pos in-person card rate solver",
      "ecommerce calculator",
      "shopify calculator"
    ],
    "metaTitle": "Shopify POS In-Person Card Rate Solver \u2014 QuickForma",
    "metaDescription": "Free client-side shopify pos in-person card rate solver with zero cloud tracking and instant results."
  },
  {
    "id": "etsy-listing-renewal-calculator",
    "verticals": [
      "business"
    ],
    "name": "Etsy Listing Fee & Auto-Renewal Expense",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze etsy listing fee & auto-renewal expense with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "etsy listing renewal calculator",
      "etsy listing fee & auto-renewal expense",
      "ecommerce calculator",
      "etsy calculator"
    ],
    "metaTitle": "Etsy Listing Fee & Auto-Renewal Expense \u2014 QuickForma",
    "metaDescription": "Free client-side etsy listing fee & auto-renewal expense with zero cloud tracking and instant results."
  },
  {
    "id": "woocommerce-profit-calculator",
    "verticals": [
      "business"
    ],
    "name": "WooCommerce Gateway & Hosting Cost Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze woocommerce gateway & hosting cost solver with instant client-side business precision.",
    "iconName": "ShoppingCart",
    "keywords": [
      "woocommerce profit calculator",
      "woocommerce gateway & hosting cost solver",
      "ecommerce calculator",
      "woocommerce calculator"
    ],
    "metaTitle": "WooCommerce Gateway & Hosting Cost Solver \u2014 QuickForma",
    "metaDescription": "Free client-side woocommerce gateway & hosting cost solver with zero cloud tracking and instant results."
  },
  {
    "id": "first-pass-yield-calculator",
    "verticals": [
      "business"
    ],
    "name": "First Pass Yield (FPY) & Scrap Loss Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze first pass yield (fpy) & scrap loss solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "first pass yield calculator",
      "first pass yield (fpy) & scrap loss solver",
      "operations calculator",
      "first calculator"
    ],
    "metaTitle": "First Pass Yield (FPY) & Scrap Loss Solver \u2014 QuickForma",
    "metaDescription": "Free client-side first pass yield (fpy) & scrap loss solver with zero cloud tracking and instant results."
  },
  {
    "id": "cycle-time-calculator",
    "verticals": [
      "business"
    ],
    "name": "Manufacturing Lead Time & Little's Law WIP Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze manufacturing lead time & little's law wip solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "cycle time calculator",
      "manufacturing lead time & little's law wip solver",
      "operations calculator",
      "cycle calculator"
    ],
    "metaTitle": "Manufacturing Lead Time & Little's Law WIP Solver \u2014 QuickForma",
    "metaDescription": "Free client-side manufacturing lead time & little's law wip solver with zero cloud tracking and instant results."
  },
  {
    "id": "overall-labor-effectiveness-ole",
    "verticals": [
      "business"
    ],
    "name": "Overall Labor Effectiveness (OLE) Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze overall labor effectiveness (ole) solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "overall labor effectiveness ole",
      "overall labor effectiveness (ole) solver",
      "operations calculator",
      "overall calculator"
    ],
    "metaTitle": "Overall Labor Effectiveness (OLE) Solver \u2014 QuickForma",
    "metaDescription": "Free client-side overall labor effectiveness (ole) solver with zero cloud tracking and instant results."
  },
  {
    "id": "kanban-card-quantity-calculator",
    "verticals": [
      "business"
    ],
    "name": "Kanban Container & Safety Card Quantity Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze kanban container & safety card quantity solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "kanban card quantity calculator",
      "kanban container & safety card quantity solver",
      "operations calculator",
      "kanban calculator"
    ],
    "metaTitle": "Kanban Container & Safety Card Quantity Solver \u2014 QuickForma",
    "metaDescription": "Free client-side kanban container & safety card quantity solver with zero cloud tracking and instant results."
  },
  {
    "id": "bill-of-materials-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "BOM Component Cost & Raw Material Rollup",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze bom component cost & raw material rollup with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "bill of materials cost calculator",
      "bom component cost & raw material rollup",
      "operations calculator",
      "bill calculator"
    ],
    "metaTitle": "BOM Component Cost & Raw Material Rollup \u2014 QuickForma",
    "metaDescription": "Free client-side bom component cost & raw material rollup with zero cloud tracking and instant results."
  },
  {
    "id": "mean-time-between-failures-mtbf",
    "verticals": [
      "business"
    ],
    "name": "MTBF & MTTR Equipment Reliability Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze mtbf & mttr equipment reliability solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "mean time between failures mtbf",
      "mtbf & mttr equipment reliability solver",
      "operations calculator",
      "mean calculator"
    ],
    "metaTitle": "MTBF & MTTR Equipment Reliability Solver \u2014 QuickForma",
    "metaDescription": "Free client-side mtbf & mttr equipment reliability solver with zero cloud tracking and instant results."
  },
  {
    "id": "changeover-time-smed-calculator",
    "verticals": [
      "business"
    ],
    "name": "SMED Tooling Changeover Setup Loss Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze smed tooling changeover setup loss solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "changeover time smed calculator",
      "smed tooling changeover setup loss solver",
      "operations calculator",
      "changeover calculator"
    ],
    "metaTitle": "SMED Tooling Changeover Setup Loss Solver \u2014 QuickForma",
    "metaDescription": "Free client-side smed tooling changeover setup loss solver with zero cloud tracking and instant results."
  },
  {
    "id": "work-in-process-wip-calculator",
    "verticals": [
      "business"
    ],
    "name": "WIP Inventory Valuation & Production Flow",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze wip inventory valuation & production flow with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "work in process wip calculator",
      "wip inventory valuation & production flow",
      "operations calculator",
      "work calculator"
    ],
    "metaTitle": "WIP Inventory Valuation & Production Flow \u2014 QuickForma",
    "metaDescription": "Free client-side wip inventory valuation & production flow with zero cloud tracking and instant results."
  },
  {
    "id": "scrap-rate-percentage-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Material Defect Scrap Rate & Cost Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate and analyze material defect scrap rate & cost solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "scrap rate percentage calculator",
      "material defect scrap rate & cost solver",
      "operations calculator",
      "scrap calculator"
    ],
    "metaTitle": "Material Defect Scrap Rate & Cost Solver \u2014 QuickForma",
    "metaDescription": "Free client-side material defect scrap rate & cost solver with zero cloud tracking and instant results."
  },
  {
    "id": "manufacturing-overhead-allocation",
    "verticals": [
      "business"
    ],
    "name": "Direct Labor Hours vs Machine Hours Overhead",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze direct labor hours vs machine hours overhead with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "manufacturing overhead allocation",
      "direct labor hours vs machine hours overhead",
      "operations calculator",
      "manufacturing calculator"
    ],
    "metaTitle": "Direct Labor Hours vs Machine Hours Overhead \u2014 QuickForma",
    "metaDescription": "Free client-side direct labor hours vs machine hours overhead with zero cloud tracking and instant results."
  },
  {
    "id": "standard-cost-variance-calculator",
    "verticals": [
      "business"
    ],
    "name": "Direct Material & Labor Variance Solver",
    "category": "documents",
    "categoryLabel": "Business & Legal Documents",
    "description": "Calculate and analyze direct material & labor variance solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "standard cost variance calculator",
      "direct material & labor variance solver",
      "operations calculator",
      "standard calculator"
    ],
    "metaTitle": "Direct Material & Labor Variance Solver \u2014 QuickForma",
    "metaDescription": "Free client-side direct material & labor variance solver with zero cloud tracking and instant results."
  },
  {
    "id": "tpm-planned-maintenance-scheduler",
    "verticals": [
      "business"
    ],
    "name": "Total Productive Maintenance Frequency",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze total productive maintenance frequency with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "tpm planned maintenance scheduler",
      "total productive maintenance frequency",
      "operations calculator",
      "tpm calculator"
    ],
    "metaTitle": "Total Productive Maintenance Frequency \u2014 QuickForma",
    "metaDescription": "Free client-side total productive maintenance frequency with zero cloud tracking and instant results."
  },
  {
    "id": "process-capability-cp-cpk-calculator",
    "verticals": [
      "business"
    ],
    "name": "Six Sigma Cp & Cpk Process Capability",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze six sigma cp & cpk process capability with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "process capability cp cpk calculator",
      "six sigma cp & cpk process capability",
      "operations calculator",
      "process calculator"
    ],
    "metaTitle": "Six Sigma Cp & Cpk Process Capability \u2014 QuickForma",
    "metaDescription": "Free client-side six sigma cp & cpk process capability with zero cloud tracking and instant results."
  },
  {
    "id": "defect-density-ppm-calculator",
    "verticals": [
      "business"
    ],
    "name": "Parts Per Million (PPM) Quality Defect Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze parts per million (ppm) quality defect solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "defect density ppm calculator",
      "parts per million (ppm) quality defect solver",
      "operations calculator",
      "defect calculator"
    ],
    "metaTitle": "Parts Per Million (PPM) Quality Defect Solver \u2014 QuickForma",
    "metaDescription": "Free client-side parts per million (ppm) quality defect solver with zero cloud tracking and instant results."
  },
  {
    "id": "line-balancing-efficiency-calculator",
    "verticals": [
      "business"
    ],
    "name": "Assembly Line Balancing & Idle Time Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze assembly line balancing & idle time solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "line balancing efficiency calculator",
      "assembly line balancing & idle time solver",
      "operations calculator",
      "line calculator"
    ],
    "metaTitle": "Assembly Line Balancing & Idle Time Solver \u2014 QuickForma",
    "metaDescription": "Free client-side assembly line balancing & idle time solver with zero cloud tracking and instant results."
  },
  {
    "id": "batch-size-economic-production",
    "verticals": [
      "business"
    ],
    "name": "Economic Production Quantity (EPQ) Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze economic production quantity (epq) solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "batch size economic production",
      "economic production quantity (epq) solver",
      "operations calculator",
      "batch calculator"
    ],
    "metaTitle": "Economic Production Quantity (EPQ) Solver \u2014 QuickForma",
    "metaDescription": "Free client-side economic production quantity (epq) solver with zero cloud tracking and instant results."
  },
  {
    "id": "warehouse-bin-utilization-calculator",
    "verticals": [
      "business"
    ],
    "name": "Cube Utilization & Bin Storage Efficiency",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze cube utilization & bin storage efficiency with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "warehouse bin utilization calculator",
      "cube utilization & bin storage efficiency",
      "operations calculator",
      "warehouse calculator"
    ],
    "metaTitle": "Cube Utilization & Bin Storage Efficiency \u2014 QuickForma",
    "metaDescription": "Free client-side cube utilization & bin storage efficiency with zero cloud tracking and instant results."
  },
  {
    "id": "order-picking-route-time-calculator",
    "verticals": [
      "business"
    ],
    "name": "Warehouse Order Picker Travel Time Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze warehouse order picker travel time solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "order picking route time calculator",
      "warehouse order picker travel time solver",
      "operations calculator",
      "order calculator"
    ],
    "metaTitle": "Warehouse Order Picker Travel Time Solver \u2014 QuickForma",
    "metaDescription": "Free client-side warehouse order picker travel time solver with zero cloud tracking and instant results."
  },
  {
    "id": "supplier-on-time-in-full-otif",
    "verticals": [
      "business"
    ],
    "name": "OTIF Supplier Delivery Performance Rating",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze otif supplier delivery performance rating with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "supplier on time in full otif",
      "otif supplier delivery performance rating",
      "operations calculator",
      "supplier calculator"
    ],
    "metaTitle": "OTIF Supplier Delivery Performance Rating \u2014 QuickForma",
    "metaDescription": "Free client-side otif supplier delivery performance rating with zero cloud tracking and instant results."
  },
  {
    "id": "yield-loss-percentage-calculator",
    "verticals": [
      "business",
      "students"
    ],
    "name": "Chemical / Food Production Yield Loss Solver",
    "category": "math-stats",
    "categoryLabel": "Mathematics & Statistics",
    "description": "Calculate and analyze chemical / food production yield loss solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "yield loss percentage calculator",
      "chemical / food production yield loss solver",
      "operations calculator",
      "yield calculator"
    ],
    "metaTitle": "Chemical / Food Production Yield Loss Solver \u2014 QuickForma",
    "metaDescription": "Free client-side chemical / food production yield loss solver with zero cloud tracking and instant results."
  },
  {
    "id": "equipment-replacement-capital-expenditure",
    "verticals": [
      "business"
    ],
    "name": "Asset Equipment Replacement Timing NPV",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze asset equipment replacement timing npv with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "equipment replacement capital expenditure",
      "asset equipment replacement timing npv",
      "operations calculator",
      "equipment calculator"
    ],
    "metaTitle": "Asset Equipment Replacement Timing NPV \u2014 QuickForma",
    "metaDescription": "Free client-side asset equipment replacement timing npv with zero cloud tracking and instant results."
  },
  {
    "id": "labor-efficiency-variance-calculator",
    "verticals": [
      "business"
    ],
    "name": "Standard vs Actual Labor Hours Variance",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze standard vs actual labor hours variance with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "labor efficiency variance calculator",
      "standard vs actual labor hours variance",
      "operations calculator",
      "labor calculator"
    ],
    "metaTitle": "Standard vs Actual Labor Hours Variance \u2014 QuickForma",
    "metaDescription": "Free client-side standard vs actual labor hours variance with zero cloud tracking and instant results."
  },
  {
    "id": "material-requirements-planning-mrp",
    "verticals": [
      "business"
    ],
    "name": "Net Material Requirements & Lead Time Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze net material requirements & lead time solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "material requirements planning mrp",
      "net material requirements & lead time solver",
      "operations calculator",
      "material calculator"
    ],
    "metaTitle": "Net Material Requirements & Lead Time Solver \u2014 QuickForma",
    "metaDescription": "Free client-side net material requirements & lead time solver with zero cloud tracking and instant results."
  },
  {
    "id": "lean-5s-audit-score-calculator",
    "verticals": [
      "business"
    ],
    "name": "Lean Workplace 5S Inspection Score Sheet",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze lean workplace 5s inspection score sheet with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "lean 5s audit score calculator",
      "lean workplace 5s inspection score sheet",
      "operations calculator",
      "lean calculator"
    ],
    "metaTitle": "Lean Workplace 5S Inspection Score Sheet \u2014 QuickForma",
    "metaDescription": "Free client-side lean workplace 5s inspection score sheet with zero cloud tracking and instant results."
  },
  {
    "id": "value-stream-mapping-lead-time",
    "verticals": [
      "business"
    ],
    "name": "Process Value-Add Ratio vs Waste Lead Time",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze process value-add ratio vs waste lead time with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "value stream mapping lead time",
      "process value-add ratio vs waste lead time",
      "operations calculator",
      "value calculator"
    ],
    "metaTitle": "Process Value-Add Ratio vs Waste Lead Time \u2014 QuickForma",
    "metaDescription": "Free client-side process value-add ratio vs waste lead time with zero cloud tracking and instant results."
  },
  {
    "id": "production-throughput-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Units Per Hour Throughput Rate Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze units per hour throughput rate solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "production throughput rate calculator",
      "units per hour throughput rate solver",
      "operations calculator",
      "production calculator"
    ],
    "metaTitle": "Units Per Hour Throughput Rate Solver \u2014 QuickForma",
    "metaDescription": "Free client-side units per hour throughput rate solver with zero cloud tracking and instant results."
  },
  {
    "id": "maintenance-labor-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "Preventive vs Corrective Maintenance Cost",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze preventive vs corrective maintenance cost with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "maintenance labor cost calculator",
      "preventive vs corrective maintenance cost",
      "operations calculator",
      "maintenance calculator"
    ],
    "metaTitle": "Preventive vs Corrective Maintenance Cost \u2014 QuickForma",
    "metaDescription": "Free client-side preventive vs corrective maintenance cost with zero cloud tracking and instant results."
  },
  {
    "id": "spare-parts-inventory-safety-stock",
    "verticals": [
      "business"
    ],
    "name": "Critical MRO Spare Parts Safety Stock Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze critical mro spare parts safety stock solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "spare parts inventory safety stock",
      "critical mro spare parts safety stock solver",
      "operations calculator",
      "spare calculator"
    ],
    "metaTitle": "Critical MRO Spare Parts Safety Stock Solver \u2014 QuickForma",
    "metaDescription": "Free client-side critical mro spare parts safety stock solver with zero cloud tracking and instant results."
  },
  {
    "id": "warehouse-forklift-fleet-calculator",
    "verticals": [
      "business"
    ],
    "name": "Warehouse Fleet Size & Operating Cost",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze warehouse fleet size & operating cost with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "warehouse forklift fleet calculator",
      "warehouse fleet size & operating cost",
      "operations calculator",
      "warehouse calculator"
    ],
    "metaTitle": "Warehouse Fleet Size & Operating Cost \u2014 QuickForma",
    "metaDescription": "Free client-side warehouse fleet size & operating cost with zero cloud tracking and instant results."
  },
  {
    "id": "cross-docking-cost-savings-calculator",
    "verticals": [
      "business"
    ],
    "name": "Direct Transshipment vs Storage Cost",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze direct transshipment vs storage cost with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "cross docking cost savings calculator",
      "direct transshipment vs storage cost",
      "operations calculator",
      "cross calculator"
    ],
    "metaTitle": "Direct Transshipment vs Storage Cost \u2014 QuickForma",
    "metaDescription": "Free client-side direct transshipment vs storage cost with zero cloud tracking and instant results."
  },
  {
    "id": "packaging-tare-weight-calculator",
    "verticals": [
      "business"
    ],
    "name": "Gross vs Net Freight Shipping Tare Weight",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze gross vs net freight shipping tare weight with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "packaging tare weight calculator",
      "gross vs net freight shipping tare weight",
      "operations calculator",
      "packaging calculator"
    ],
    "metaTitle": "Gross vs Net Freight Shipping Tare Weight \u2014 QuickForma",
    "metaDescription": "Free client-side gross vs net freight shipping tare weight with zero cloud tracking and instant results."
  },
  {
    "id": "factory-floor-space-productivity",
    "verticals": [
      "business"
    ],
    "name": "Revenue & Output Per Square Foot Factory Floor",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze revenue & output per square foot factory floor with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "factory floor space productivity",
      "revenue & output per square foot factory floor",
      "operations calculator",
      "factory calculator"
    ],
    "metaTitle": "Revenue & Output Per Square Foot Factory Floor \u2014 QuickForma",
    "metaDescription": "Free client-side revenue & output per square foot factory floor with zero cloud tracking and instant results."
  },
  {
    "id": "energy-consumption-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "Industrial Machine Kilowatt-Hour Cost",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze industrial machine kilowatt-hour cost with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "energy consumption cost calculator",
      "industrial machine kilowatt-hour cost",
      "operations calculator",
      "energy calculator"
    ],
    "metaTitle": "Industrial Machine Kilowatt-Hour Cost \u2014 QuickForma",
    "metaDescription": "Free client-side industrial machine kilowatt-hour cost with zero cloud tracking and instant results."
  },
  {
    "id": "manufacturing-labor-rate-burden",
    "verticals": [
      "business"
    ],
    "name": "Fringe Benefit & Overhead Labor Rate Burden",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze fringe benefit & overhead labor rate burden with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "manufacturing labor rate burden",
      "fringe benefit & overhead labor rate burden",
      "operations calculator",
      "manufacturing calculator"
    ],
    "metaTitle": "Fringe Benefit & Overhead Labor Rate Burden \u2014 QuickForma",
    "metaDescription": "Free client-side fringe benefit & overhead labor rate burden with zero cloud tracking and instant results."
  },
  {
    "id": "manufacturing-takt-vs-cycle-time",
    "verticals": [
      "business"
    ],
    "name": "Takt Time vs Cycle Time Line Efficiency Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze takt time vs cycle time line efficiency solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "manufacturing takt vs cycle time",
      "takt time vs cycle time line efficiency solver",
      "operations calculator",
      "manufacturing calculator"
    ],
    "metaTitle": "Takt Time vs Cycle Time Line Efficiency Solver \u2014 QuickForma",
    "metaDescription": "Free client-side takt time vs cycle time line efficiency solver with zero cloud tracking and instant results."
  },
  {
    "id": "industrial-electricity-peak-demand-cost",
    "verticals": [
      "business"
    ],
    "name": "Industrial Utility Peak Demand Charge kW Loss Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze industrial utility peak demand charge kw loss solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "industrial electricity peak demand cost",
      "industrial utility peak demand charge kw loss solver",
      "operations calculator",
      "industrial calculator"
    ],
    "metaTitle": "Industrial Utility Peak Demand Charge kW Loss Solver \u2014 QuickForma",
    "metaDescription": "Free client-side industrial utility peak demand charge kw loss solver with zero cloud tracking and instant results."
  },
  {
    "id": "work-center-capacity-planner",
    "verticals": [
      "business"
    ],
    "name": "Work Center Available Hours & Load Factor Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze work center available hours & load factor solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "work center capacity planner",
      "work center available hours & load factor solver",
      "operations calculator",
      "work calculator"
    ],
    "metaTitle": "Work Center Available Hours & Load Factor Solver \u2014 QuickForma",
    "metaDescription": "Free client-side work center available hours & load factor solver with zero cloud tracking and instant results."
  },
  {
    "id": "changeover-downtime-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "Setup Time Changeover Productivity Financial Loss",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze setup time changeover productivity financial loss with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "changeover downtime cost calculator",
      "setup time changeover productivity financial loss",
      "operations calculator",
      "changeover calculator"
    ],
    "metaTitle": "Setup Time Changeover Productivity Financial Loss \u2014 QuickForma",
    "metaDescription": "Free client-side setup time changeover productivity financial loss with zero cloud tracking and instant results."
  },
  {
    "id": "manufacturing-yield-variance-calculator",
    "verticals": [
      "business"
    ],
    "name": "Standard Yield vs Actual Output Material Variance",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze standard yield vs actual output material variance with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "manufacturing yield variance calculator",
      "standard yield vs actual output material variance",
      "operations calculator",
      "manufacturing calculator"
    ],
    "metaTitle": "Standard Yield vs Actual Output Material Variance \u2014 QuickForma",
    "metaDescription": "Free client-side standard yield vs actual output material variance with zero cloud tracking and instant results."
  },
  {
    "id": "sqc-x-bar-r-control-chart",
    "verticals": [
      "business"
    ],
    "name": "Statistical Quality Control X-Bar & R Chart Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze statistical quality control x-bar & r chart solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "sqc x bar r control chart",
      "statistical quality control x-bar & r chart solver",
      "operations calculator",
      "sqc calculator"
    ],
    "metaTitle": "Statistical Quality Control X-Bar & R Chart Solver \u2014 QuickForma",
    "metaDescription": "Free client-side statistical quality control x-bar & r chart solver with zero cloud tracking and instant results."
  },
  {
    "id": "niosh-lifting-equation-calculator",
    "verticals": [
      "business"
    ],
    "name": "Factory Worker Ergonomic Lifting Limit Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze factory worker ergonomic lifting limit solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "niosh lifting equation calculator",
      "factory worker ergonomic lifting limit solver",
      "operations calculator",
      "niosh calculator"
    ],
    "metaTitle": "Factory Worker Ergonomic Lifting Limit Solver \u2014 QuickForma",
    "metaDescription": "Free client-side factory worker ergonomic lifting limit solver with zero cloud tracking and instant results."
  },
  {
    "id": "overdue-maintenance-risk-calculator",
    "verticals": [
      "business"
    ],
    "name": "Preventive Maintenance Overdue Risk Index Solver",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze preventive maintenance overdue risk index solver with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "overdue maintenance risk calculator",
      "preventive maintenance overdue risk index solver",
      "operations calculator",
      "overdue calculator"
    ],
    "metaTitle": "Preventive Maintenance Overdue Risk Index Solver \u2014 QuickForma",
    "metaDescription": "Free client-side preventive maintenance overdue risk index solver with zero cloud tracking and instant results."
  },
  {
    "id": "scrap-recycling-salvage-calculator",
    "verticals": [
      "business"
    ],
    "name": "Plant Floor Scrap Recovery & Recycling Value",
    "category": "operations",
    "categoryLabel": "Operations, Logistics & Manufacturing",
    "description": "Calculate and analyze plant floor scrap recovery & recycling value with instant client-side business precision.",
    "iconName": "Cpu",
    "keywords": [
      "scrap recycling salvage calculator",
      "plant floor scrap recovery & recycling value",
      "operations calculator",
      "scrap calculator"
    ],
    "metaTitle": "Plant Floor Scrap Recovery & Recycling Value \u2014 QuickForma",
    "metaDescription": "Free client-side plant floor scrap recovery & recycling value with zero cloud tracking and instant results."
  },
  {
    "id": "gross-rent-multiplier-grm",
    "verticals": [
      "business"
    ],
    "name": "Gross Rent Multiplier & Property Valuation Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze gross rent multiplier & property valuation solver with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "gross rent multiplier grm",
      "gross rent multiplier & property valuation solver",
      "finance calculator",
      "gross calculator"
    ],
    "metaTitle": "Gross Rent Multiplier & Property Valuation Solver \u2014 QuickForma",
    "metaDescription": "Free client-side gross rent multiplier & property valuation solver with zero cloud tracking and instant results."
  },
  {
    "id": "debt-service-coverage-ratio-real-estate",
    "verticals": [
      "business"
    ],
    "name": "DSCR Commercial Mortgage Qualification",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze dscr commercial mortgage qualification with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "debt service coverage ratio real estate",
      "dscr commercial mortgage qualification",
      "finance calculator",
      "debt calculator"
    ],
    "metaTitle": "DSCR Commercial Mortgage Qualification \u2014 QuickForma",
    "metaDescription": "Free client-side dscr commercial mortgage qualification with zero cloud tracking and instant results."
  },
  {
    "id": "real-estate-appreciation-calculator",
    "verticals": [
      "business"
    ],
    "name": "Compound Property Value Growth & Equity",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze compound property value growth & equity with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "real estate appreciation calculator",
      "compound property value growth & equity",
      "finance calculator",
      "real calculator"
    ],
    "metaTitle": "Compound Property Value Growth & Equity \u2014 QuickForma",
    "metaDescription": "Free client-side compound property value growth & equity with zero cloud tracking and instant results."
  },
  {
    "id": "mortgage-refinance-break-even-calculator",
    "verticals": [
      "business"
    ],
    "name": "Refinance Closing Cost Break-Even Months",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze refinance closing cost break-even months with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "mortgage refinance break even calculator",
      "refinance closing cost break-even months",
      "finance calculator",
      "mortgage calculator"
    ],
    "metaTitle": "Refinance Closing Cost Break-Even Months \u2014 QuickForma",
    "metaDescription": "Free client-side refinance closing cost break-even months with zero cloud tracking and instant results."
  },
  {
    "id": "house-flipping-profit-calculator",
    "verticals": [
      "business"
    ],
    "name": "70% Rule Flip Purchase & ARV Profit Solver",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze 70% rule flip purchase & arv profit solver with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "house flipping profit calculator",
      "70% rule flip purchase & arv profit solver",
      "finance calculator",
      "house calculator"
    ],
    "metaTitle": "70% Rule Flip Purchase & ARV Profit Solver \u2014 QuickForma",
    "metaDescription": "Free client-side 70% rule flip purchase & arv profit solver with zero cloud tracking and instant results."
  },
  {
    "id": "brrrr-strategy-calculator",
    "verticals": [
      "business"
    ],
    "name": "Buy, Rehab, Rent, Refinance, Repeat Profit Solver",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze buy, rehab, rent, refinance, repeat profit solver with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "brrrr strategy calculator",
      "buy, rehab, rent, refinance, repeat profit solver",
      "finance calculator",
      "brrrr calculator"
    ],
    "metaTitle": "Buy, Rehab, Rent, Refinance, Repeat Profit Solver \u2014 QuickForma",
    "metaDescription": "Free client-side buy, rehab, rent, refinance, repeat profit solver with zero cloud tracking and instant results."
  },
  {
    "id": "property-management-fee-calculator",
    "verticals": [
      "business"
    ],
    "name": "Monthly Property Manager Fee & Net Payout",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze monthly property manager fee & net payout with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "property management fee calculator",
      "monthly property manager fee & net payout",
      "finance calculator",
      "property calculator"
    ],
    "metaTitle": "Monthly Property Manager Fee & Net Payout \u2014 QuickForma",
    "metaDescription": "Free client-side monthly property manager fee & net payout with zero cloud tracking and instant results."
  },
  {
    "id": "tenant-turnover-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "Vacancy Loss, Cleaning & Lease Up Cost Solver",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze vacancy loss, cleaning & lease up cost solver with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "tenant turnover cost calculator",
      "vacancy loss, cleaning & lease up cost solver",
      "finance calculator",
      "tenant calculator"
    ],
    "metaTitle": "Vacancy Loss, Cleaning & Lease Up Cost Solver \u2014 QuickForma",
    "metaDescription": "Free client-side vacancy loss, cleaning & lease up cost solver with zero cloud tracking and instant results."
  },
  {
    "id": "commercial-real-estate-lease-calculator",
    "verticals": [
      "business"
    ],
    "name": "Triple Net NNN vs Modified Gross Lease",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze triple net nnn vs modified gross lease with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "commercial real estate lease calculator",
      "triple net nnn vs modified gross lease",
      "finance calculator",
      "commercial calculator"
    ],
    "metaTitle": "Triple Net NNN vs Modified Gross Lease \u2014 QuickForma",
    "metaDescription": "Free client-side triple net nnn vs modified gross lease with zero cloud tracking and instant results."
  },
  {
    "id": "home-equity-line-of-credit-heloc",
    "verticals": [
      "business"
    ],
    "name": "HELOC Monthly Interest-Only & Repayment",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze heloc monthly interest-only & repayment with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "home equity line of credit heloc",
      "heloc monthly interest-only & repayment",
      "finance calculator",
      "home calculator"
    ],
    "metaTitle": "HELOC Monthly Interest-Only & Repayment \u2014 QuickForma",
    "metaDescription": "Free client-side heloc monthly interest-only & repayment with zero cloud tracking and instant results."
  },
  {
    "id": "price-to-rent-ratio-calculator",
    "verticals": [
      "business"
    ],
    "name": "Buy vs Rent Price-to-Rent Ratio Metric Solver",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze buy vs rent price-to-rent ratio metric solver with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "price to rent ratio calculator",
      "buy vs rent price-to-rent ratio metric solver",
      "finance calculator",
      "price calculator"
    ],
    "metaTitle": "Buy vs Rent Price-to-Rent Ratio Metric Solver \u2014 QuickForma",
    "metaDescription": "Free client-side buy vs rent price-to-rent ratio metric solver with zero cloud tracking and instant results."
  },
  {
    "id": "real-estate-commission-split-calculator",
    "verticals": [
      "business"
    ],
    "name": "Agent vs Brokerage Commission Split Solver",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze agent vs brokerage commission split solver with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "real estate commission split calculator",
      "agent vs brokerage commission split solver",
      "finance calculator",
      "real calculator"
    ],
    "metaTitle": "Agent vs Brokerage Commission Split Solver \u2014 QuickForma",
    "metaDescription": "Free client-side agent vs brokerage commission split solver with zero cloud tracking and instant results."
  },
  {
    "id": "title-insurance-closing-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "Buyer & Seller Closing Cost Breakdown",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze buyer & seller closing cost breakdown with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "title insurance closing cost calculator",
      "buyer & seller closing cost breakdown",
      "finance calculator",
      "title calculator"
    ],
    "metaTitle": "Buyer & Seller Closing Cost Breakdown \u2014 QuickForma",
    "metaDescription": "Free client-side buyer & seller closing cost breakdown with zero cloud tracking and instant results."
  },
  {
    "id": "vacancy-rate-loss-calculator",
    "verticals": [
      "business"
    ],
    "name": "Annual Vacancy Allowance & Income Loss Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze annual vacancy allowance & income loss solver with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "vacancy rate loss calculator",
      "annual vacancy allowance & income loss solver",
      "finance calculator",
      "vacancy calculator"
    ],
    "metaTitle": "Annual Vacancy Allowance & Income Loss Solver \u2014 QuickForma",
    "metaDescription": "Free client-side annual vacancy allowance & income loss solver with zero cloud tracking and instant results."
  },
  {
    "id": "seller-net-sheet-calculator",
    "verticals": [
      "business"
    ],
    "name": "Real Estate Home Seller Net Proceeds Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze real estate home seller net proceeds solver with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "seller net sheet calculator",
      "real estate home seller net proceeds solver",
      "finance calculator",
      "seller calculator"
    ],
    "metaTitle": "Real Estate Home Seller Net Proceeds Solver \u2014 QuickForma",
    "metaDescription": "Free client-side real estate home seller net proceeds solver with zero cloud tracking and instant results."
  },
  {
    "id": "real-estate-equity-multiple-calculator",
    "verticals": [
      "business"
    ],
    "name": "Total Equity Multiple & LP Return Solver",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze total equity multiple & lp return solver with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "real estate equity multiple calculator",
      "total equity multiple & lp return solver",
      "finance calculator",
      "real calculator"
    ],
    "metaTitle": "Total Equity Multiple & LP Return Solver \u2014 QuickForma",
    "metaDescription": "Free client-side total equity multiple & lp return solver with zero cloud tracking and instant results."
  },
  {
    "id": "property-cap-rate-sensitivity-calculator",
    "verticals": [
      "business"
    ],
    "name": "Cap Rate Sensitivity & Exit Price Valuation Matrix",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze cap rate sensitivity & exit price valuation matrix with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "property cap rate sensitivity calculator",
      "cap rate sensitivity & exit price valuation matrix",
      "finance calculator",
      "property calculator"
    ],
    "metaTitle": "Cap Rate Sensitivity & Exit Price Valuation Matrix \u2014 QuickForma",
    "metaDescription": "Free client-side cap rate sensitivity & exit price valuation matrix with zero cloud tracking and instant results."
  },
  {
    "id": "vacation-rental-short-term-occupancy",
    "verticals": [
      "business"
    ],
    "name": "STR Seasonal Occupancy & Revenue Per Available Night",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze str seasonal occupancy & revenue per available night with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "vacation rental short term occupancy",
      "str seasonal occupancy & revenue per available night",
      "finance calculator",
      "vacation calculator"
    ],
    "metaTitle": "STR Seasonal Occupancy & Revenue Per Available Night \u2014 QuickForma",
    "metaDescription": "Free client-side str seasonal occupancy & revenue per available night with zero cloud tracking and instant results."
  },
  {
    "id": "real-estate-debt-yield-calculator",
    "verticals": [
      "business"
    ],
    "name": "Lender Commercial Debt Yield Ratio Solver",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze lender commercial debt yield ratio solver with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "real estate debt yield calculator",
      "lender commercial debt yield ratio solver",
      "finance calculator",
      "real calculator"
    ],
    "metaTitle": "Lender Commercial Debt Yield Ratio Solver \u2014 QuickForma",
    "metaDescription": "Free client-side lender commercial debt yield ratio solver with zero cloud tracking and instant results."
  },
  {
    "id": "real-estate-irr-calculator",
    "verticals": [
      "business"
    ],
    "name": "Real Estate Internal Rate of Return (IRR) Solver",
    "category": "real-estate",
    "categoryLabel": "Real Estate & Property Finance",
    "description": "Calculate and analyze real estate internal rate of return (irr) solver with instant client-side business precision.",
    "iconName": "Building",
    "keywords": [
      "real estate irr calculator",
      "real estate internal rate of return (irr) solver",
      "finance calculator",
      "real calculator"
    ],
    "metaTitle": "Real Estate Internal Rate of Return (IRR) Solver \u2014 QuickForma",
    "metaDescription": "Free client-side real estate internal rate of return (irr) solver with zero cloud tracking and instant results."
  },
  {
    "id": "cost-per-click-cpc-calculator",
    "verticals": [
      "business"
    ],
    "name": "Ad Budget & Clicks CPC Target Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze ad budget & clicks cpc target solver with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "cost per click cpc calculator",
      "ad budget & clicks cpc target solver",
      "marketing calculator",
      "cost calculator"
    ],
    "metaTitle": "Ad Budget & Clicks CPC Target Solver \u2014 QuickForma",
    "metaDescription": "Free client-side ad budget & clicks cpc target solver with zero cloud tracking and instant results."
  },
  {
    "id": "cost-per-lead-cpl-calculator",
    "verticals": [
      "business"
    ],
    "name": "Lead Generation Campaign Cost Per Lead Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze lead generation campaign cost per lead solver with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "cost per lead cpl calculator",
      "lead generation campaign cost per lead solver",
      "marketing calculator",
      "cost calculator"
    ],
    "metaTitle": "Lead Generation Campaign Cost Per Lead Solver \u2014 QuickForma",
    "metaDescription": "Free client-side lead generation campaign cost per lead solver with zero cloud tracking and instant results."
  },
  {
    "id": "email-marketing-roi-calculator",
    "verticals": [
      "business"
    ],
    "name": "Email Campaign Revenue & Subscriber LTV Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze email campaign revenue & subscriber ltv solver with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "email marketing roi calculator",
      "email campaign revenue & subscriber ltv solver",
      "marketing calculator",
      "email calculator"
    ],
    "metaTitle": "Email Campaign Revenue & Subscriber LTV Solver \u2014 QuickForma",
    "metaDescription": "Free client-side email campaign revenue & subscriber ltv solver with zero cloud tracking and instant results."
  },
  {
    "id": "viral-k-factor-calculator",
    "verticals": [
      "business"
    ],
    "name": "Viral Coefficient K-Factor & Referral Loop Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze viral coefficient k-factor & referral loop solver with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "viral k factor calculator",
      "viral coefficient k-factor & referral loop solver",
      "marketing calculator",
      "viral calculator"
    ],
    "metaTitle": "Viral Coefficient K-Factor & Referral Loop Solver \u2014 QuickForma",
    "metaDescription": "Free client-side viral coefficient k-factor & referral loop solver with zero cloud tracking and instant results."
  },
  {
    "id": "conversion-rate-optimization-cro",
    "verticals": [
      "business"
    ],
    "name": "CRO Revenue Impact & Lift Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze cro revenue impact & lift solver with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "conversion rate optimization cro",
      "cro revenue impact & lift solver",
      "marketing calculator",
      "conversion calculator"
    ],
    "metaTitle": "CRO Revenue Impact & Lift Solver \u2014 QuickForma",
    "metaDescription": "Free client-side cro revenue impact & lift solver with zero cloud tracking and instant results."
  },
  {
    "id": "influencer-marketing-roi-calculator",
    "verticals": [
      "business"
    ],
    "name": "Sponsored Post Engagement Rate & ROI Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze sponsored post engagement rate & roi solver with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "influencer marketing roi calculator",
      "sponsored post engagement rate & roi solver",
      "marketing calculator",
      "influencer calculator"
    ],
    "metaTitle": "Sponsored Post Engagement Rate & ROI Solver \u2014 QuickForma",
    "metaDescription": "Free client-side sponsored post engagement rate & roi solver with zero cloud tracking and instant results."
  },
  {
    "id": "customer-churn-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Monthly & Annual Customer Churn Rate Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze monthly & annual customer churn rate solver with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "customer churn rate calculator",
      "monthly & annual customer churn rate solver",
      "marketing calculator",
      "customer calculator"
    ],
    "metaTitle": "Monthly & Annual Customer Churn Rate Solver \u2014 QuickForma",
    "metaDescription": "Free client-side monthly & annual customer churn rate solver with zero cloud tracking and instant results."
  },
  {
    "id": "net-promoter-score-nps-calculator",
    "verticals": [
      "business"
    ],
    "name": "Promoters vs Detractors NPS Score Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze promoters vs detractors nps score solver with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "net promoter score nps calculator",
      "promoters vs detractors nps score solver",
      "marketing calculator",
      "net calculator"
    ],
    "metaTitle": "Promoters vs Detractors NPS Score Solver \u2014 QuickForma",
    "metaDescription": "Free client-side promoters vs detractors nps score solver with zero cloud tracking and instant results."
  },
  {
    "id": "marketing-qualified-lead-mql-conversion",
    "verticals": [
      "business"
    ],
    "name": "MQL to SQL to Customer Pipeline Rate",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze mql to sql to customer pipeline rate with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "marketing qualified lead mql conversion",
      "mql to sql to customer pipeline rate",
      "marketing calculator",
      "marketing calculator"
    ],
    "metaTitle": "MQL to SQL to Customer Pipeline Rate \u2014 QuickForma",
    "metaDescription": "Free client-side mql to sql to customer pipeline rate with zero cloud tracking and instant results."
  },
  {
    "id": "content-marketing-roi-calculator",
    "verticals": [
      "business"
    ],
    "name": "Blog & SEO Content Creation ROI Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze blog & seo content creation roi solver with instant client-side business precision.",
    "iconName": "BarChart3",
    "keywords": [
      "content marketing roi calculator",
      "blog & seo content creation roi solver",
      "marketing calculator",
      "content calculator"
    ],
    "metaTitle": "Blog & SEO Content Creation ROI Solver \u2014 QuickForma",
    "metaDescription": "Free client-side blog & seo content creation roi solver with zero cloud tracking and instant results."
  },
  {
    "id": "event-sponsorship-roi-calculator",
    "verticals": [
      "business"
    ],
    "name": "Trade Show & Conference Lead ROI Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze trade show & conference lead roi solver with instant client-side business precision.",
    "iconName": "Target",
    "keywords": [
      "event sponsorship roi calculator",
      "trade show & conference lead roi solver",
      "marketing calculator",
      "event calculator"
    ],
    "metaTitle": "Trade Show & Conference Lead ROI Solver \u2014 QuickForma",
    "metaDescription": "Free client-side trade show & conference lead roi solver with zero cloud tracking and instant results."
  },
  {
    "id": "social-media-engagement-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Social Media Engagement Rate Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze social media engagement rate solver with instant client-side business precision.",
    "iconName": "Activity",
    "keywords": [
      "social media engagement rate calculator",
      "social media engagement rate solver",
      "marketing calculator",
      "social calculator"
    ],
    "metaTitle": "Social Media Engagement Rate Solver \u2014 QuickForma",
    "metaDescription": "Free client-side social media engagement rate solver with zero cloud tracking and instant results."
  },
  {
    "id": "pay-per-click-ppc-budget-calculator",
    "verticals": [
      "business"
    ],
    "name": "Target Clicks & Monthly PPC Budget Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze target clicks & monthly ppc budget solver with instant client-side business precision.",
    "iconName": "DollarSign",
    "keywords": [
      "pay per click ppc budget calculator",
      "target clicks & monthly ppc budget solver",
      "marketing calculator",
      "pay calculator"
    ],
    "metaTitle": "Target Clicks & Monthly PPC Budget Solver \u2014 QuickForma",
    "metaDescription": "Free client-side target clicks & monthly ppc budget solver with zero cloud tracking and instant results."
  },
  {
    "id": "customer-retention-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Cohort Customer Retention Rate Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze cohort customer retention rate solver with instant client-side business precision.",
    "iconName": "Users",
    "keywords": [
      "customer retention rate calculator",
      "cohort customer retention rate solver",
      "marketing calculator",
      "customer calculator"
    ],
    "metaTitle": "Cohort Customer Retention Rate Solver \u2014 QuickForma",
    "metaDescription": "Free client-side cohort customer retention rate solver with zero cloud tracking and instant results."
  },
  {
    "id": "affiliate-marketing-commission-calculator",
    "verticals": [
      "business"
    ],
    "name": "Affiliate Partner Payout & Net Profit",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze affiliate partner payout & net profit with instant client-side business precision.",
    "iconName": "Percent",
    "keywords": [
      "affiliate marketing commission calculator",
      "affiliate partner payout & net profit",
      "marketing calculator",
      "affiliate calculator"
    ],
    "metaTitle": "Affiliate Partner Payout & Net Profit \u2014 QuickForma",
    "metaDescription": "Free client-side affiliate partner payout & net profit with zero cloud tracking and instant results."
  },
  {
    "id": "app-store-conversion-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "ASO App Store Impression to Install Rate",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze aso app store impression to install rate with instant client-side business precision.",
    "iconName": "Smartphone",
    "keywords": [
      "app store conversion rate calculator",
      "aso app store impression to install rate",
      "marketing calculator",
      "app calculator"
    ],
    "metaTitle": "ASO App Store Impression to Install Rate \u2014 QuickForma",
    "metaDescription": "Free client-side aso app store impression to install rate with zero cloud tracking and instant results."
  },
  {
    "id": "cost-per-acquisition-target-calculator",
    "verticals": [
      "business"
    ],
    "name": "Maximum Allowable CPA based on LTV",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze maximum allowable cpa based on ltv with instant client-side business precision.",
    "iconName": "Crosshair",
    "keywords": [
      "cost per acquisition target calculator",
      "maximum allowable cpa based on ltv",
      "marketing calculator",
      "cost calculator"
    ],
    "metaTitle": "Maximum Allowable CPA based on LTV \u2014 QuickForma",
    "metaDescription": "Free client-side maximum allowable cpa based on ltv with zero cloud tracking and instant results."
  },
  {
    "id": "podcast-ad-cpm-calculator",
    "verticals": [
      "business"
    ],
    "name": "Podcast Episode Downloads & Spot CPM Rate",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze podcast episode downloads & spot cpm rate with instant client-side business precision.",
    "iconName": "Radio",
    "keywords": [
      "podcast ad cpm calculator",
      "podcast episode downloads & spot cpm rate",
      "marketing calculator",
      "podcast calculator"
    ],
    "metaTitle": "Podcast Episode Downloads & Spot CPM Rate \u2014 QuickForma",
    "metaDescription": "Free client-side podcast episode downloads & spot cpm rate with zero cloud tracking and instant results."
  },
  {
    "id": "lead-scoring-threshold-calculator",
    "verticals": [
      "business"
    ],
    "name": "Sales Readiness Behavioral Lead Score",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze sales readiness behavioral lead score with instant client-side business precision.",
    "iconName": "CheckSquare",
    "keywords": [
      "lead scoring threshold calculator",
      "sales readiness behavioral lead score",
      "marketing calculator",
      "lead calculator"
    ],
    "metaTitle": "Sales Readiness Behavioral Lead Score \u2014 QuickForma",
    "metaDescription": "Free client-side sales readiness behavioral lead score with zero cloud tracking and instant results."
  },
  {
    "id": "expansion-mrr-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Customer Expansion MRR & Upsell Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze customer expansion mrr & upsell solver with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "expansion mrr rate calculator",
      "customer expansion mrr & upsell solver",
      "marketing calculator",
      "expansion calculator"
    ],
    "metaTitle": "Customer Expansion MRR & Upsell Solver \u2014 QuickForma",
    "metaDescription": "Free client-side customer expansion mrr & upsell solver with zero cloud tracking and instant results."
  },
  {
    "id": "hourly-to-salary-calculator",
    "verticals": [
      "business"
    ],
    "name": "Hourly Wage to Equivalent Annual Salary Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze hourly wage to equivalent annual salary solver with instant client-side business precision.",
    "iconName": "Clock",
    "keywords": [
      "hourly to salary calculator",
      "hourly wage to equivalent annual salary solver",
      "hr calculator",
      "hourly calculator"
    ],
    "metaTitle": "Hourly Wage to Equivalent Annual Salary Solver \u2014 QuickForma",
    "metaDescription": "Free client-side hourly wage to equivalent annual salary solver with zero cloud tracking and instant results."
  },
  {
    "id": "fmla-leave-hours-calculator",
    "verticals": [
      "business"
    ],
    "name": "12-Week FMLA Entitlement Hours & Balance Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze 12-week fmla entitlement hours & balance solver with instant client-side business precision.",
    "iconName": "Calendar",
    "keywords": [
      "fmla leave hours calculator",
      "12-week fmla entitlement hours & balance solver",
      "hr calculator",
      "fmla calculator"
    ],
    "metaTitle": "12-Week FMLA Entitlement Hours & Balance Solver \u2014 QuickForma",
    "metaDescription": "Free client-side 12-week fmla entitlement hours & balance solver with zero cloud tracking and instant results."
  },
  {
    "id": "severance-pay-calculator",
    "verticals": [
      "business"
    ],
    "name": "Years of Service Severance Pay & Tax Withholding",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze years of service severance pay & tax withholding with instant client-side business precision.",
    "iconName": "Briefcase",
    "keywords": [
      "severance pay calculator",
      "years of service severance pay & tax withholding",
      "hr calculator",
      "severance calculator"
    ],
    "metaTitle": "Years of Service Severance Pay & Tax Withholding \u2014 QuickForma",
    "metaDescription": "Free client-side years of service severance pay & tax withholding with zero cloud tracking and instant results."
  },
  {
    "id": "overtime-pay-calculator",
    "verticals": [
      "business"
    ],
    "name": "Fair Labor Standards Act FLSA 1.5x Overtime Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze fair labor standards act flsa 1.5x overtime solver with instant client-side business precision.",
    "iconName": "Clock",
    "keywords": [
      "overtime pay calculator",
      "fair labor standards act flsa 1.5x overtime solver",
      "hr calculator",
      "overtime calculator"
    ],
    "metaTitle": "Fair Labor Standards Act FLSA 1.5x Overtime Solver \u2014 QuickForma",
    "metaDescription": "Free client-side fair labor standards act flsa 1.5x overtime solver with zero cloud tracking and instant results."
  },
  {
    "id": "commission-payout-calculator",
    "verticals": [
      "business"
    ],
    "name": "Sales Rep Commission Split & Bonus Tier Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Planning",
    "description": "Calculate and analyze sales rep commission split & bonus tier solver with instant client-side business precision.",
    "iconName": "Award",
    "keywords": [
      "commission payout calculator",
      "sales rep commission split & bonus tier solver",
      "hr calculator",
      "commission calculator"
    ],
    "metaTitle": "Sales Rep Commission Split & Bonus Tier Solver \u2014 QuickForma",
    "metaDescription": "Free client-side sales rep commission split & bonus tier solver with zero cloud tracking and instant results."
  },
  {
    "id": "full-time-equivalent-fte-calculator",
    "verticals": [
      "business"
    ],
    "name": "Part-Time Hours to Full-Time Equivalent FTE",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze part-time hours to full-time equivalent fte with instant client-side business precision.",
    "iconName": "Users",
    "keywords": [
      "full time equivalent fte calculator",
      "part-time hours to full-time equivalent fte",
      "hr calculator",
      "full calculator"
    ],
    "metaTitle": "Part-Time Hours to Full-Time Equivalent FTE \u2014 QuickForma",
    "metaDescription": "Free client-side part-time hours to full-time equivalent fte with zero cloud tracking and instant results."
  },
  {
    "id": "relocation-cost-calculator",
    "verticals": [
      "business"
    ],
    "name": "Employee Job Relocation Expense Allowance Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze employee job relocation expense allowance solver with instant client-side business precision.",
    "iconName": "Truck",
    "keywords": [
      "relocation cost calculator",
      "employee job relocation expense allowance solver",
      "hr calculator",
      "relocation calculator"
    ],
    "metaTitle": "Employee Job Relocation Expense Allowance Solver \u2014 QuickForma",
    "metaDescription": "Free client-side employee job relocation expense allowance solver with zero cloud tracking and instant results."
  },
  {
    "id": "401k-employer-match-calculator",
    "verticals": [
      "business"
    ],
    "name": "Employer 401k Match Contribution & Max Limit",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze employer 401k match contribution & max limit with instant client-side business precision.",
    "iconName": "Shield",
    "keywords": [
      "401k employer match calculator",
      "employer 401k match contribution & max limit",
      "hr calculator",
      "401k calculator"
    ],
    "metaTitle": "Employer 401k Match Contribution & Max Limit \u2014 QuickForma",
    "metaDescription": "Free client-side employer 401k match contribution & max limit with zero cloud tracking and instant results."
  },
  {
    "id": "pto-payout-upon-termination",
    "verticals": [
      "business"
    ],
    "name": "Accrued Unused Vacation PTO Payout Estimator",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze accrued unused vacation pto payout estimator with instant client-side business precision.",
    "iconName": "Calendar",
    "keywords": [
      "pto payout upon termination",
      "accrued unused vacation pto payout estimator",
      "hr calculator",
      "pto calculator"
    ],
    "metaTitle": "Accrued Unused Vacation PTO Payout Estimator \u2014 QuickForma",
    "metaDescription": "Free client-side accrued unused vacation pto payout estimator with zero cloud tracking and instant results."
  },
  {
    "id": "employee-absence-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Bradford Factor & Absenteeism Rate Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze bradford factor & absenteeism rate solver with instant client-side business precision.",
    "iconName": "UserX",
    "keywords": [
      "employee absence rate calculator",
      "bradford factor & absenteeism rate solver",
      "hr calculator",
      "employee calculator"
    ],
    "metaTitle": "Bradford Factor & Absenteeism Rate Solver \u2014 QuickForma",
    "metaDescription": "Free client-side bradford factor & absenteeism rate solver with zero cloud tracking and instant results."
  },
  {
    "id": "stock-option-exercise-calculator",
    "verticals": [
      "business"
    ],
    "name": "ISO / NSO Stock Option Strike Price & Tax",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze iso / nso stock option strike price & tax with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "stock option exercise calculator",
      "iso / nso stock option strike price & tax",
      "hr calculator",
      "stock calculator"
    ],
    "metaTitle": "ISO / NSO Stock Option Strike Price & Tax \u2014 QuickForma",
    "metaDescription": "Free client-side iso / nso stock option strike price & tax with zero cloud tracking and instant results."
  },
  {
    "id": "annual-bonus-tax-withholding-calculator",
    "verticals": [
      "business"
    ],
    "name": "Supplemental Wage Flat 22% Tax Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze supplemental wage flat 22% tax solver with instant client-side business precision.",
    "iconName": "FileText",
    "keywords": [
      "annual bonus tax withholding calculator",
      "supplemental wage flat 22% tax solver",
      "hr calculator",
      "annual calculator"
    ],
    "metaTitle": "Supplemental Wage Flat 22% Tax Solver \u2014 QuickForma",
    "metaDescription": "Free client-side supplemental wage flat 22% tax solver with zero cloud tracking and instant results."
  },
  {
    "id": "shift-differential-pay-calculator",
    "verticals": [
      "business"
    ],
    "name": "Night & Weekend Shift Premium Pay Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze night & weekend shift premium pay solver with instant client-side business precision.",
    "iconName": "Moon",
    "keywords": [
      "shift differential pay calculator",
      "night & weekend shift premium pay solver",
      "hr calculator",
      "shift calculator"
    ],
    "metaTitle": "Night & Weekend Shift Premium Pay Solver \u2014 QuickForma",
    "metaDescription": "Free client-side night & weekend shift premium pay solver with zero cloud tracking and instant results."
  },
  {
    "id": "remote-work-stipend-calculator",
    "verticals": [
      "business"
    ],
    "name": "Remote Work Home Office Expense Allowance",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze remote work home office expense allowance with instant client-side business precision.",
    "iconName": "Home",
    "keywords": [
      "remote work stipend calculator",
      "remote work home office expense allowance",
      "hr calculator",
      "remote calculator"
    ],
    "metaTitle": "Remote Work Home Office Expense Allowance \u2014 QuickForma",
    "metaDescription": "Free client-side remote work home office expense allowance with zero cloud tracking and instant results."
  },
  {
    "id": "training-roi-calculator",
    "verticals": [
      "business"
    ],
    "name": "Employee Upskilling & Training Return on Investment",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze employee upskilling & training return on investment with instant client-side business precision.",
    "iconName": "GraduationCap",
    "keywords": [
      "training roi calculator",
      "employee upskilling & training return on investment",
      "hr calculator",
      "training calculator"
    ],
    "metaTitle": "Employee Upskilling & Training Return on Investment \u2014 QuickForma",
    "metaDescription": "Free client-side employee upskilling & training return on investment with zero cloud tracking and instant results."
  },
  {
    "id": "glassdoor-salary-benchmark-calculator",
    "verticals": [
      "business"
    ],
    "name": "Industry Percentile Salary Benchmark Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze industry percentile salary benchmark solver with instant client-side business precision.",
    "iconName": "BarChart",
    "keywords": [
      "glassdoor salary benchmark calculator",
      "industry percentile salary benchmark solver",
      "hr calculator",
      "glassdoor calculator"
    ],
    "metaTitle": "Industry Percentile Salary Benchmark Solver \u2014 QuickForma",
    "metaDescription": "Free client-side industry percentile salary benchmark solver with zero cloud tracking and instant results."
  },
  {
    "id": "internal-pay-equity-calculator",
    "verticals": [
      "business"
    ],
    "name": "Internal Job Transfer Pay Equity Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze internal job transfer pay equity solver with instant client-side business precision.",
    "iconName": "Scale",
    "keywords": [
      "internal pay equity calculator",
      "internal job transfer pay equity solver",
      "hr calculator",
      "internal calculator"
    ],
    "metaTitle": "Internal Job Transfer Pay Equity Solver \u2014 QuickForma",
    "metaDescription": "Free client-side internal job transfer pay equity solver with zero cloud tracking and instant results."
  },
  {
    "id": "employee-retention-rate-calculator",
    "verticals": [
      "business"
    ],
    "name": "Employee Retention Rate & Average Tenure Solver",
    "category": "hr",
    "categoryLabel": "HR, Payroll & Compensation",
    "description": "Calculate and analyze employee retention rate & average tenure solver with instant client-side business precision.",
    "iconName": "Heart",
    "keywords": [
      "employee retention rate calculator",
      "employee retention rate & average tenure solver",
      "hr calculator",
      "employee calculator"
    ],
    "metaTitle": "Employee Retention Rate & Average Tenure Solver \u2014 QuickForma",
    "metaDescription": "Free client-side employee retention rate & average tenure solver with zero cloud tracking and instant results."
  },
  {
    "id": "roth-ira-growth-calculator",
    "verticals": [
      "business"
    ],
    "name": "Tax-Free Roth IRA Compound Interest Growth",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze tax-free roth ira compound interest growth with instant client-side business precision.",
    "iconName": "DollarSign",
    "keywords": [
      "roth ira growth calculator",
      "tax-free roth ira compound interest growth",
      "finance calculator",
      "roth calculator"
    ],
    "metaTitle": "Tax-Free Roth IRA Compound Interest Growth \u2014 QuickForma",
    "metaDescription": "Free client-side tax-free roth ira compound interest growth with zero cloud tracking and instant results."
  },
  {
    "id": "simple-savings-goal-calculator",
    "verticals": [
      "business"
    ],
    "name": "Target Savings Goal & Monthly Deposit Required",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze target savings goal & monthly deposit required with instant client-side business precision.",
    "iconName": "PiggyBank",
    "keywords": [
      "simple savings goal calculator",
      "target savings goal & monthly deposit required",
      "finance calculator",
      "simple calculator"
    ],
    "metaTitle": "Target Savings Goal & Monthly Deposit Required \u2014 QuickForma",
    "metaDescription": "Free client-side target savings goal & monthly deposit required with zero cloud tracking and instant results."
  },
  {
    "id": "credit-card-minimum-payment-calculator",
    "verticals": [
      "business"
    ],
    "name": "Credit Card Payoff & Interest Cost Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze credit card payoff & interest cost solver with instant client-side business precision.",
    "iconName": "CreditCard",
    "keywords": [
      "credit card minimum payment calculator",
      "credit card payoff & interest cost solver",
      "finance calculator",
      "credit calculator"
    ],
    "metaTitle": "Credit Card Payoff & Interest Cost Solver \u2014 QuickForma",
    "metaDescription": "Free client-side credit card payoff & interest cost solver with zero cloud tracking and instant results."
  },
  {
    "id": "inflation-purchasing-power-calculator",
    "verticals": [
      "business"
    ],
    "name": "Inflation Purchasing Power Loss Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze inflation purchasing power loss solver with instant client-side business precision.",
    "iconName": "TrendingDown",
    "keywords": [
      "inflation purchasing power calculator",
      "inflation purchasing power loss solver",
      "finance calculator",
      "inflation calculator"
    ],
    "metaTitle": "Inflation Purchasing Power Loss Solver \u2014 QuickForma",
    "metaDescription": "Free client-side inflation purchasing power loss solver with zero cloud tracking and instant results."
  },
  {
    "id": "fire-financial-independence-calculator",
    "verticals": [
      "business"
    ],
    "name": "FIRE Number & Safe Withdrawal Rate Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze fire number & safe withdrawal rate solver with instant client-side business precision.",
    "iconName": "Compass",
    "keywords": [
      "fire financial independence calculator",
      "fire number & safe withdrawal rate solver",
      "finance calculator",
      "fire calculator"
    ],
    "metaTitle": "FIRE Number & Safe Withdrawal Rate Solver \u2014 QuickForma",
    "metaDescription": "Free client-side fire number & safe withdrawal rate solver with zero cloud tracking and instant results."
  },
  {
    "id": "college-savings-529-calculator",
    "verticals": [
      "students"
    ],
    "name": "529 College Savings Plan Future Growth Solver",
    "category": "academic",
    "categoryLabel": "Education & Academic Tools",
    "description": "Calculate and analyze 529 college savings plan future growth solver with instant client-side business precision.",
    "iconName": "BookOpen",
    "keywords": [
      "college savings 529 calculator",
      "529 college savings plan future growth solver",
      "finance calculator",
      "college calculator"
    ],
    "metaTitle": "529 College Savings Plan Future Growth Solver \u2014 QuickForma",
    "metaDescription": "Free client-side 529 college savings plan future growth solver with zero cloud tracking and instant results."
  },
  {
    "id": "life-insurance-needs-calculator",
    "verticals": [
      "business"
    ],
    "name": "DIME Method Life Insurance Coverage Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze dime method life insurance coverage solver with instant client-side business precision.",
    "iconName": "Umbrella",
    "keywords": [
      "life insurance needs calculator",
      "dime method life insurance coverage solver",
      "finance calculator",
      "life calculator"
    ],
    "metaTitle": "DIME Method Life Insurance Coverage Solver \u2014 QuickForma",
    "metaDescription": "Free client-side dime method life insurance coverage solver with zero cloud tracking and instant results."
  },
  {
    "id": "subscription-cost-analyzer",
    "verticals": [
      "business"
    ],
    "name": "Monthly & Annual Recurring Subscription Tracker",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze monthly & annual recurring subscription tracker with instant client-side business precision.",
    "iconName": "Repeat",
    "keywords": [
      "subscription cost analyzer",
      "monthly & annual recurring subscription tracker",
      "finance calculator",
      "subscription calculator"
    ],
    "metaTitle": "Monthly & Annual Recurring Subscription Tracker \u2014 QuickForma",
    "metaDescription": "Free client-side monthly & annual recurring subscription tracker with zero cloud tracking and instant results."
  },
  {
    "id": "hsa-triple-tax-advantage-calculator",
    "verticals": [
      "business"
    ],
    "name": "HSA Investment Growth & Tax Savings Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze hsa investment growth & tax savings solver with instant client-side business precision.",
    "iconName": "ShieldCheck",
    "keywords": [
      "hsa triple tax advantage calculator",
      "hsa investment growth & tax savings solver",
      "finance calculator",
      "hsa calculator"
    ],
    "metaTitle": "HSA Investment Growth & Tax Savings Solver \u2014 QuickForma",
    "metaDescription": "Free client-side hsa investment growth & tax savings solver with zero cloud tracking and instant results."
  },
  {
    "id": "side-hustle-tax-calculator",
    "verticals": [
      "business"
    ],
    "name": "Self-Employment Schedule C Tax Estimator",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze self-employment schedule c tax estimator with instant client-side business precision.",
    "iconName": "Briefcase",
    "keywords": [
      "side hustle tax calculator",
      "self-employment schedule c tax estimator",
      "finance calculator",
      "side calculator"
    ],
    "metaTitle": "Self-Employment Schedule C Tax Estimator \u2014 QuickForma",
    "metaDescription": "Free client-side self-employment schedule c tax estimator with zero cloud tracking and instant results."
  },
  {
    "id": "saas-quick-ratio-calculator",
    "verticals": [
      "business"
    ],
    "name": "SaaS Quick Ratio Growth vs Churn Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze saas quick ratio growth vs churn solver with instant client-side business precision.",
    "iconName": "Zap",
    "keywords": [
      "saas quick ratio calculator",
      "saas quick ratio growth vs churn solver",
      "finance calculator",
      "saas calculator"
    ],
    "metaTitle": "SaaS Quick Ratio Growth vs Churn Solver \u2014 QuickForma",
    "metaDescription": "Free client-side saas quick ratio growth vs churn solver with zero cloud tracking and instant results."
  },
  {
    "id": "burn-multiple-calculator",
    "verticals": [
      "business"
    ],
    "name": "Startup Capital Efficiency Burn Multiple Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze startup capital efficiency burn multiple solver with instant client-side business precision.",
    "iconName": "Flame",
    "keywords": [
      "burn multiple calculator",
      "startup capital efficiency burn multiple solver",
      "finance calculator",
      "burn calculator"
    ],
    "metaTitle": "Startup Capital Efficiency Burn Multiple Solver \u2014 QuickForma",
    "metaDescription": "Free client-side startup capital efficiency burn multiple solver with zero cloud tracking and instant results."
  },
  {
    "id": "gross-margin-return-on-investment-gmroi",
    "verticals": [
      "business"
    ],
    "name": "Retail Inventory GMROI Profitability Solver",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Retail",
    "description": "Calculate and analyze retail inventory gmroi profitability solver with instant client-side business precision.",
    "iconName": "ShoppingBag",
    "keywords": [
      "gross margin return on investment gmroi",
      "retail inventory gmroi profitability solver",
      "ecommerce calculator",
      "gross calculator"
    ],
    "metaTitle": "Retail Inventory GMROI Profitability Solver \u2014 QuickForma",
    "metaDescription": "Free client-side retail inventory gmroi profitability solver with zero cloud tracking and instant results."
  },
  {
    "id": "accounts-payable-turnover-ratio",
    "verticals": [
      "business"
    ],
    "name": "Accounts Payable Turnover & DPO Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze accounts payable turnover & dpo solver with instant client-side business precision.",
    "iconName": "ArrowDownLeft",
    "keywords": [
      "accounts payable turnover ratio",
      "accounts payable turnover & dpo solver",
      "finance calculator",
      "accounts calculator"
    ],
    "metaTitle": "Accounts Payable Turnover & DPO Solver \u2014 QuickForma",
    "metaDescription": "Free client-side accounts payable turnover & dpo solver with zero cloud tracking and instant results."
  },
  {
    "id": "accounts-receivable-aging-calculator",
    "verticals": [
      "business"
    ],
    "name": "Accounts Receivable Aging & Bad Debt Reserve",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze accounts receivable aging & bad debt reserve with instant client-side business precision.",
    "iconName": "ArrowUpRight",
    "keywords": [
      "accounts receivable aging calculator",
      "accounts receivable aging & bad debt reserve",
      "finance calculator",
      "accounts calculator"
    ],
    "metaTitle": "Accounts Receivable Aging & Bad Debt Reserve \u2014 QuickForma",
    "metaDescription": "Free client-side accounts receivable aging & bad debt reserve with zero cloud tracking and instant results."
  },
  {
    "id": "customer-acquisition-payback-months",
    "verticals": [
      "business"
    ],
    "name": "CAC Payback Period in Months Solver",
    "category": "marketing",
    "categoryLabel": "Sales & Growth Marketing",
    "description": "Calculate and analyze cac payback period in months solver with instant client-side business precision.",
    "iconName": "Clock",
    "keywords": [
      "customer acquisition payback months",
      "cac payback period in months solver",
      "finance calculator",
      "customer calculator"
    ],
    "metaTitle": "CAC Payback Period in Months Solver \u2014 QuickForma",
    "metaDescription": "Free client-side cac payback period in months solver with zero cloud tracking and instant results."
  },
  {
    "id": "compound-annual-growth-rate-cagr",
    "verticals": [
      "business"
    ],
    "name": "Compound Annual Growth Rate CAGR Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze compound annual growth rate cagr solver with instant client-side business precision.",
    "iconName": "TrendingUp",
    "keywords": [
      "compound annual growth rate cagr",
      "compound annual growth rate cagr solver",
      "finance calculator",
      "compound calculator"
    ],
    "metaTitle": "Compound Annual Growth Rate CAGR Solver \u2014 QuickForma",
    "metaDescription": "Free client-side compound annual growth rate cagr solver with zero cloud tracking and instant results."
  },
  {
    "id": "working-capital-cycle-calculator",
    "verticals": [
      "business"
    ],
    "name": "Operating Working Capital Cycle Days Solver",
    "category": "finance",
    "categoryLabel": "Business Finance & Accounting",
    "description": "Calculate and analyze operating working capital cycle days solver with instant client-side business precision.",
    "iconName": "RefreshCw",
    "keywords": [
      "working capital cycle calculator",
      "operating working capital cycle days solver",
      "operations calculator",
      "working calculator"
    ],
    "metaTitle": "Operating Working Capital Cycle Days Solver \u2014 QuickForma",
    "metaDescription": "Free client-side operating working capital cycle days solver with zero cloud tracking and instant results."
  }
];
