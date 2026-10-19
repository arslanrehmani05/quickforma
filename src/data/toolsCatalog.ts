import { ToolMetadata, VerticalId } from '../types';

export const VERTICALS = [
  { id: 'business', name: 'Business Hub', description: 'Financial, legal, ecommerce, operations & developer tools' },
  { id: 'students', name: 'Students Hub', description: 'GPA, math, statistics, science, writing & student utilities' },
] as const;

export const getVerticalTools = (vertical: VerticalId): ToolMetadata[] => {
  return TOOLS_CATALOG.filter(t => t.verticals.includes(vertical));
};

export const getCategoryTools = (tools: ToolMetadata[], categorySlug: string): ToolMetadata[] => {
  if (!categorySlug || categorySlug === 'all') return tools;
  return tools.filter(t => t.category === categorySlug);
};


export const CATEGORIES = [
  { id: 'all', name: 'All Utilities', count: 62 },
  { id: 'finance', name: 'Financial Calculators', count: 14 },
  { id: 'business', name: 'Business & Legal Docs', count: 10 },
  { id: 'ecommerce', name: 'Ecommerce & Operations', count: 8 },
  { id: 'developer', name: 'Developer & Web Tools', count: 11 },
  { id: 'converters', name: 'Converters & Formats', count: 8 },
  { id: 'content', name: 'Text & Content Tools', count: 4 },
  { id: 'productivity', name: 'Productivity & Daily', count: 7 },
] as const;

export const TOOLS_CATALOG: ToolMetadata[] = [
  {
    "id": "freelance-hourly-rate-calculator",
    "verticals": ["business"],
    "name": "Freelancer Hourly Rate Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Determine what hourly rate to charge based on desired annual income, expenses, and billable hours.",
    "iconName": "Calculator",
    "popular": true,
    "keywords": [
      "freelance rate calculator",
      "hourly rate",
      "consultant pricing",
      "billable rate"
    ],
    "metaTitle": "Freelance Hourly Rate Calculator — QuickForma",
    "metaDescription": "Calculate the target hourly rate required to hit your income goals as a freelancer or consultant."
  },
  {
    "id": "break-even-calculator",
    "verticals": ["business"],
    "name": "Break-Even Point Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate units and revenue needed to break even from fixed and variable costs.",
    "iconName": "TrendingUp",
    "keywords": [
      "break even calculator",
      "break even point",
      "fixed costs",
      "margin",
      "business breakeven"
    ],
    "metaTitle": "Break-Even Point Calculator — QuickForma",
    "metaDescription": "Find your break-even point in units and revenue instantly."
  },
  {
    "id": "payroll-tax-estimator",
    "verticals": ["business"],
    "name": "Payroll Tax Estimator (US)",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Estimate federal income tax withholding, Social Security, Medicare, and net paycheck amount.",
    "iconName": "Receipt",
    "keywords": [
      "payroll tax estimator",
      "paycheck calculator",
      "net pay",
      "tax withholding"
    ],
    "metaTitle": "US Payroll Tax & Paycheck Estimator — QuickForma",
    "metaDescription": "Estimate federal payroll tax withholding and net take-home pay."
  },
  {
    "id": "roi-calculator",
    "verticals": ["business"],
    "name": "ROI & Return Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate Return on Investment (ROI) percentage and annualized rate of return.",
    "iconName": "PieChart",
    "popular": true,
    "keywords": [
      "roi calculator",
      "return on investment",
      "investment return",
      "annualized return"
    ],
    "metaTitle": "ROI Calculator — Calculate Return on Investment — QuickForma",
    "metaDescription": "Calculate ROI percentage and annualized returns instantly."
  },
  {
    "id": "mortgage-loan-calculator",
    "verticals": ["business"],
    "name": "Loan & Mortgage Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate monthly payments, total interest, and principal payoff for mortgages and loans.",
    "iconName": "Building",
    "keywords": [
      "mortgage calculator",
      "loan payment calculator",
      "interest payoff",
      "home loan"
    ],
    "metaTitle": "Mortgage & Loan Payment Calculator — QuickForma",
    "metaDescription": "Calculate monthly mortgage and loan payments with principal and interest breakdowns."
  },
  {
    "id": "markup-margin-calculator",
    "verticals": ["business"],
    "name": "Markup vs Margin Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Convert between profit margin percentage, markup percentage, cost, and selling price.",
    "iconName": "Percent",
    "keywords": [
      "margin calculator",
      "markup calculator",
      "profit margin",
      "retail markup"
    ],
    "metaTitle": "Profit Margin & Markup Calculator — QuickForma",
    "metaDescription": "Calculate profit margin, markup percentage, cost, and retail price instantly."
  },
  {
    "id": "salary-hourly-converter",
    "verticals": ["business"],
    "name": "Salary to Hourly Converter",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Convert annual salary into equivalent hourly, daily, weekly, and monthly rates.",
    "iconName": "Scale",
    "keywords": [
      "salary to hourly",
      "hourly to salary",
      "pay converter",
      "annual income rate"
    ],
    "metaTitle": "Salary to Hourly Rate Converter — QuickForma",
    "metaDescription": "Convert annual salary to hourly, weekly, and monthly pay rates."
  },
  {
    "id": "sales-tax-calculator",
    "verticals": ["business"],
    "name": "Sales Tax Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate subtotal, sales tax amount, and total price with custom or preset state rates.",
    "iconName": "Receipt",
    "keywords": [
      "sales tax calculator",
      "tax amount",
      "state tax",
      "total price tax"
    ],
    "metaTitle": "Sales Tax Calculator — QuickForma",
    "metaDescription": "Calculate sales tax and total price with custom tax percentages."
  },
  {
    "id": "discount-calculator",
    "verticals": ["business"],
    "name": "Discount & Savings Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate final sale price and total money saved from percentage-off discounts.",
    "iconName": "Tag",
    "keywords": [
      "discount calculator",
      "percentage off",
      "sale price",
      "savings calculator"
    ],
    "metaTitle": "Discount & Percentage Off Calculator — QuickForma",
    "metaDescription": "Calculate sale prices and total savings from percentage discounts."
  },
  {
    "id": "compound-interest-calculator",
    "verticals": ["business"],
    "name": "Compound Interest Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate future wealth growth from initial deposit, recurring contributions, and interest.",
    "iconName": "TrendingUp",
    "popular": true,
    "keywords": [
      "compound interest calculator",
      "future value",
      "investment growth",
      "interest compounding"
    ],
    "metaTitle": "Compound Interest Calculator — QuickForma",
    "metaDescription": "Calculate compound interest growth and investment value over time."
  },
  {
    "id": "loan-payoff-calculator",
    "verticals": ["business"],
    "name": "Loan Payoff & Extra Payment Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate how making extra monthly payments shortens your loan term and saves interest.",
    "iconName": "Calculator",
    "keywords": [
      "loan payoff calculator",
      "extra payment",
      "early payoff",
      "interest savings"
    ],
    "metaTitle": "Loan Payoff & Extra Payment Calculator — QuickForma",
    "metaDescription": "Calculate how extra monthly payments reduce loan payoff time and save interest."
  },
  {
    "id": "cpm-ad-cost-calculator",
    "verticals": ["business"],
    "name": "CPM & Ad Cost Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate Cost Per Mille (CPM), total ad campaign budget, or required ad impressions.",
    "iconName": "PieChart",
    "keywords": [
      "cpm calculator",
      "ad cost calculator",
      "cost per mille",
      "ad impressions"
    ],
    "metaTitle": "CPM & Ad Cost Calculator — QuickForma",
    "metaDescription": "Calculate CPM, total advertising budget, and required impressions."
  },
  {
    "id": "customer-ltv-calculator",
    "verticals": ["business"],
    "name": "Customer Lifetime Value (LTV) Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate Customer Lifetime Value (LTV) based on purchase value, frequency, and lifespan.",
    "iconName": "Users",
    "keywords": [
      "ltv calculator",
      "customer lifetime value",
      "clv",
      "saas metric"
    ],
    "metaTitle": "Customer Lifetime Value (LTV) Calculator — QuickForma",
    "metaDescription": "Calculate Customer Lifetime Value (LTV) and average customer worth."
  },
  {
    "id": "invoice-generator",
    "verticals": ["business"],
    "name": "PDF Invoice Generator",
    "category": "business",
    "categoryLabel": "Business & Legal Docs",
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
    "metaTitle": "Free PDF Invoice Generator — QuickForma",
    "metaDescription": "Generate clean PDF invoices with logo, tax, and discount support. 100% free and client-side."
  },
  {
    "id": "receipt-generator",
    "verticals": ["business"],
    "name": "Receipt Maker",
    "category": "business",
    "categoryLabel": "Business & Legal Docs",
    "description": "Create itemized payment receipts for sales, services, and transactions with instant PDF download.",
    "iconName": "Receipt",
    "popular": true,
    "keywords": [
      "receipt generator",
      "receipt maker",
      "payment receipt",
      "sales receipt pdf"
    ],
    "metaTitle": "Free Sales Receipt Generator — QuickForma",
    "metaDescription": "Create clean, downloadable payment receipts for business transactions."
  },
  {
    "id": "nda-template-generator",
    "verticals": ["business"],
    "name": "Simple NDA Agreement Generator",
    "category": "business",
    "categoryLabel": "Business & Legal Docs",
    "description": "Generate mutual or one-way Non-Disclosure Agreement (NDA) legal templates.",
    "iconName": "FileCheck",
    "keywords": [
      "nda generator",
      "free nda template",
      "non disclosure agreement",
      "legal template"
    ],
    "metaTitle": "Free NDA Template Generator — QuickForma",
    "metaDescription": "Generate mutual or one-way Non-Disclosure Agreements for instant download."
  },
  {
    "id": "bill-of-sale-generator",
    "verticals": ["business"],
    "name": "Bill of Sale Generator",
    "category": "business",
    "categoryLabel": "Business & Legal Docs",
    "description": "Create legal bill of sale documents for vehicles, equipment, and personal property sales.",
    "iconName": "FileText",
    "keywords": [
      "bill of sale generator",
      "vehicle bill of sale",
      "equipment bill of sale",
      "sales agreement"
    ],
    "metaTitle": "Free Bill of Sale Generator — QuickForma",
    "metaDescription": "Create printable Bill of Sale documents for vehicle and property sales."
  },
  {
    "id": "freelance-contract-generator",
    "verticals": ["business"],
    "name": "Freelance Agreement Builder",
    "category": "business",
    "categoryLabel": "Business & Legal Docs",
    "description": "Build simple freelance work agreements defining scope, payment terms, and deadlines.",
    "iconName": "Briefcase",
    "keywords": [
      "freelance contract template",
      "client agreement",
      "work contract",
      "freelance agreement"
    ],
    "metaTitle": "Free Freelance Contract Generator — QuickForma",
    "metaDescription": "Build clean freelance client agreements and scope contracts."
  },
  {
    "id": "meeting-minutes-generator",
    "verticals": ["business"],
    "name": "Meeting Minutes Generator",
    "category": "business",
    "categoryLabel": "Business & Legal Docs",
    "description": "Format corporate meeting notes, attendee lists, agendas, and action items into clean documents.",
    "iconName": "FileText",
    "keywords": [
      "meeting minutes generator",
      "meeting notes template",
      "action items",
      "board minutes"
    ],
    "metaTitle": "Meeting Minutes Generator — QuickForma",
    "metaDescription": "Format structured corporate meeting minutes and action items."
  },
  {
    "id": "rent-receipt-generator",
    "verticals": ["business"],
    "name": "Rent Receipt Generator",
    "category": "business",
    "categoryLabel": "Business & Legal Docs",
    "description": "Create tenant rent payment receipts for landlords and property managers.",
    "iconName": "Building",
    "keywords": [
      "rent receipt generator",
      "tenant receipt",
      "landlord rent receipt",
      "rental proof"
    ],
    "metaTitle": "Free Rent Receipt Generator — QuickForma",
    "metaDescription": "Generate printable rent payment receipts for landlords and tenants."
  },
  {
    "id": "promissory-note-generator",
    "verticals": ["business"],
    "name": "Promissory Note Generator",
    "category": "business",
    "categoryLabel": "Business & Legal Docs",
    "description": "Generate promissory notes and simple personal loan agreements with repayment terms.",
    "iconName": "FileCheck",
    "keywords": [
      "promissory note generator",
      "iou contract",
      "loan agreement",
      "personal loan note"
    ],
    "metaTitle": "Free Promissory Note Generator — QuickForma",
    "metaDescription": "Create simple promissory notes and loan repayment agreements."
  },
  {
    "id": "bill-of-lading-generator",
    "verticals": ["business"],
    "name": "Bill of Lading (BOL) Generator",
    "category": "business",
    "categoryLabel": "Business & Legal Docs",
    "description": "Generate standard freight and shipping itemization Bill of Lading forms.",
    "iconName": "FileText",
    "keywords": [
      "bill of lading generator",
      "bol template",
      "shipping form",
      "freight manifest"
    ],
    "metaTitle": "Free Bill of Lading (BOL) Generator — QuickForma",
    "metaDescription": "Generate printable Bill of Lading forms for shipping and freight."
  },
  {
    "id": "unit-converter",
    "verticals": ["business","students"],
    "name": "Multi-Unit Converter",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Convert length, weight, volume, temperature, and area between metric and imperial units.",
    "iconName": "Scale",
    "popular": true,
    "keywords": [
      "unit converter",
      "metric to imperial",
      "length converter",
      "weight converter"
    ],
    "metaTitle": "Multi-Unit Converter — QuickForma",
    "metaDescription": "Convert length, weight, volume, and temperature units instantly."
  },
  {
    "id": "currency-converter",
    "verticals": ["business"],
    "name": "Currency Converter",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Convert between major world currencies with static reference rates.",
    "iconName": "Globe",
    "keywords": [
      "currency converter",
      "exchange rate",
      "usd to eur",
      "gbp converter"
    ],
    "metaTitle": "Free Currency Converter — QuickForma",
    "metaDescription": "Convert major global currencies with instant calculation."
  },
  {
    "id": "date-difference-calculator",
    "verticals": ["business","students"],
    "name": "Days Between Dates Calculator",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Calculate total days, weeks, months, and working business days between two dates.",
    "iconName": "Calendar",
    "keywords": [
      "days between dates",
      "date duration",
      "date difference",
      "working days calculator"
    ],
    "metaTitle": "Days Between Dates Calculator — QuickForma",
    "metaDescription": "Calculate the exact number of days, weeks, and months between two dates."
  },
  {
    "id": "time-zone-converter",
    "verticals": ["business"],
    "name": "Time Zone Converter",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Convert times between UTC, EST, PST, GMT, CET, and other major world time zones.",
    "iconName": "Globe",
    "keywords": [
      "time zone converter",
      "utc to est",
      "pst to est",
      "world clock converter"
    ],
    "metaTitle": "Time Zone Converter — QuickForma",
    "metaDescription": "Convert meeting times across major world time zones easily."
  },
  {
    "id": "pdf-page-counter",
    "verticals": ["business","students"],
    "name": "PDF Page Counter",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Inspect and count pages in PDF files 100% inside your browser without uploading files.",
    "iconName": "FileText",
    "keywords": [
      "pdf page counter",
      "count pages in pdf",
      "pdf page number",
      "browser pdf reader"
    ],
    "metaTitle": "Client-Side PDF Page Counter — QuickForma",
    "metaDescription": "Count pages in PDF documents instantly inside your browser with 100% privacy."
  },
  {
    "id": "aspect-ratio-calculator",
    "verticals": ["business"],
    "name": "Aspect Ratio Calculator",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Calculate 16:9, 4:3, 1:1, or custom aspect ratio dimensions for images and video editors.",
    "iconName": "Maximize",
    "keywords": [
      "aspect ratio calculator",
      "16:9 calculator",
      "image dimensions",
      "video resolution"
    ],
    "metaTitle": "Aspect Ratio Calculator — QuickForma",
    "metaDescription": "Calculate image and video resolution dimensions for 16:9, 4:3, and custom ratios."
  },
  {
    "id": "color-picker-converter",
    "verticals": ["business"],
    "name": "Color Picker & HEX/RGB/HSL Converter",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Pick colors, convert between HEX, RGB, HSL, and check contrast ratios.",
    "iconName": "Sliders",
    "keywords": [
      "color picker",
      "hex to rgb",
      "hsl converter",
      "contrast checker"
    ],
    "metaTitle": "Color Picker & HEX/RGB/HSL Converter — QuickForma",
    "metaDescription": "Convert colors between HEX, RGB, and HSL values with visual color picker."
  },
  {
    "id": "image-resizer-converter",
    "verticals": ["business"],
    "name": "Image Resizer & Format Converter",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Resize image dimensions and convert between PNG, JPEG, and WebP completely in browser.",
    "iconName": "Image",
    "popular": true,
    "keywords": [
      "image resizer",
      "png to webp",
      "jpg to png",
      "client side image converter"
    ],
    "metaTitle": "Client-Side Image Resizer & Converter — QuickForma",
    "metaDescription": "Resize images and convert formats (PNG, JPG, WebP) 100% locally in your browser."
  },
  {
    "id": "json-formatter-validator",
    "verticals": ["business"],
    "name": "JSON Formatter & Validator",
    "category": "developer",
    "categoryLabel": "Developer & Web Tools",
    "description": "Format, beautify, minify, and validate JSON data structures with syntax tree viewing.",
    "iconName": "Code",
    "popular": true,
    "keywords": [
      "json formatter",
      "json validator",
      "beautify json",
      "json tree view"
    ],
    "metaTitle": "JSON Formatter & Validator — QuickForma",
    "metaDescription": "Format, beautify, and validate JSON code with interactive tree viewer."
  },
  {
    "id": "base64-encoder-decoder",
    "verticals": ["business"],
    "name": "Base64 Encoder & Decoder",
    "category": "developer",
    "categoryLabel": "Developer & Web Tools",
    "description": "Encode plain text strings or decode Base64 data with instant client-side conversion.",
    "iconName": "Binary",
    "keywords": [
      "base64 encoder",
      "base64 decoder",
      "base64 decode online",
      "string base64"
    ],
    "metaTitle": "Base64 Encoder & Decoder — QuickForma",
    "metaDescription": "Encode and decode Base64 text data instantly in your browser."
  },
  {
    "id": "hash-generator",
    "verticals": ["business"],
    "name": "Cryptographic Hash Generator",
    "category": "developer",
    "categoryLabel": "Developer & Web Tools",
    "description": "Generate SHA-256, SHA-512, SHA-1, and MD5 hashes using the browser Web Crypto API.",
    "iconName": "Shield",
    "keywords": [
      "hash generator",
      "sha256 generator",
      "sha512",
      "md5 hash"
    ],
    "metaTitle": "Cryptographic Hash Generator (SHA-256 / SHA-512) — QuickForma",
    "metaDescription": "Generate SHA-256, SHA-512, and MD5 hashes using secure browser Web Crypto API."
  },
  {
    "id": "url-encoder-decoder",
    "verticals": ["business"],
    "name": "URL Encoder & Decoder",
    "category": "developer",
    "categoryLabel": "Developer & Web Tools",
    "description": "Safely encode special query characters in URLs or decode encoded URL strings.",
    "iconName": "Globe",
    "keywords": [
      "url encoder",
      "url decoder",
      "encodeuricomponent",
      "url decode online"
    ],
    "metaTitle": "URL Encoder & Decoder — QuickForma",
    "metaDescription": "Encode or decode URL strings and query parameters instantly."
  },
  {
    "id": "css-glassmorphism-generator",
    "verticals": ["business"],
    "name": "CSS Box Shadow & Glass Generator",
    "category": "developer",
    "categoryLabel": "Developer & Web Tools",
    "description": "Visual UI sliders to generate modern CSS box shadows, glassmorphism backdrops, and gradients.",
    "iconName": "Sliders",
    "keywords": [
      "css glassmorphism generator",
      "box shadow generator",
      "backdrop filter css",
      "glass css"
    ],
    "metaTitle": "CSS Box Shadow & Glassmorphism Generator — QuickForma",
    "metaDescription": "Generate modern CSS box shadows and glassmorphism backdrop styles."
  },
  {
    "id": "barcode-generator",
    "verticals": ["business"],
    "name": "Barcode Generator",
    "category": "developer",
    "categoryLabel": "Developer & Web Tools",
    "description": "Generate standard CODE128 and EAN barcodes from numbers or text with instant PNG download.",
    "iconName": "Code",
    "keywords": [
      "barcode generator",
      "code128 generator",
      "make barcode",
      "free barcode maker"
    ],
    "metaTitle": "Free Barcode Generator — QuickForma",
    "metaDescription": "Generate CODE128 barcodes from text or numbers with PNG image download."
  },
  {
    "id": "qr-code-generator",
    "verticals": ["business"],
    "name": "QR Code Maker",
    "category": "developer",
    "categoryLabel": "Developer & Web Tools",
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
    "metaTitle": "Free QR Code Generator — QuickForma",
    "metaDescription": "Create custom QR codes for websites, text, and Wi-Fi networks. Download high-res PNGs."
  },
  {
    "id": "password-generator",
    "verticals": ["business"],
    "name": "Secure Password Generator",
    "category": "developer",
    "categoryLabel": "Developer & Web Tools",
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
    "metaTitle": "Cryptographic Secure Password Generator — QuickForma",
    "metaDescription": "Generate strong, random, cryptographically secure passwords instantly."
  },
  {
    "id": "word-counter",
    "verticals": ["business","students"],
    "name": "Word & Character Counter",
    "category": "content",
    "categoryLabel": "Text & Content Tools",
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
    "metaTitle": "Word Counter & Character Counter — QuickForma",
    "metaDescription": "Real-time word count, character count, sentence count, and reading time estimator."
  },
  {
    "id": "case-converter",
    "verticals": ["business"],
    "name": "Text Case Converter",
    "category": "content",
    "categoryLabel": "Text & Content Tools",
    "description": "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, and camelCase.",
    "iconName": "Type",
    "keywords": [
      "case converter",
      "uppercase to lowercase",
      "title case converter",
      "text format"
    ],
    "metaTitle": "Text Case Converter — QuickForma",
    "metaDescription": "Convert text between UPPERCASE, lowercase, Title Case, and Sentence case."
  },
  {
    "id": "text-diff-checker",
    "verticals": ["business","students"],
    "name": "Text Diff & Compare Tool",
    "category": "content",
    "categoryLabel": "Text & Content Tools",
    "description": "Compare two blocks of text and highlight line-by-line additions, deletions, and changes.",
    "iconName": "Copy",
    "keywords": [
      "text diff checker",
      "compare text",
      "text difference",
      "line diff tool"
    ],
    "metaTitle": "Text Diff & Compare Tool — QuickForma",
    "metaDescription": "Compare two text blocks line-by-line with color-coded diff highlighting."
  },
  {
    "id": "lorem-ipsum-generator",
    "verticals": ["business"],
    "name": "Lorem Ipsum Placeholder Generator",
    "category": "content",
    "categoryLabel": "Text & Content Tools",
    "description": "Generate paragraphs, sentences, or words of classic Lorem Ipsum placeholder text.",
    "iconName": "FilePlus",
    "keywords": [
      "lorem ipsum generator",
      "placeholder text",
      "dummy text",
      "lorem text maker"
    ],
    "metaTitle": "Lorem Ipsum Generator — QuickForma",
    "metaDescription": "Generate customized paragraphs and sentences of Lorem Ipsum placeholder text."
  },
  {
    "id": "business-name-generator",
    "verticals": ["business"],
    "name": "Business Name Generator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Brainstorm business and brand name ideas by combining industry keywords with smart affixes.",
    "iconName": "Sparkles",
    "keywords": [
      "business name generator",
      "brand name maker",
      "company name ideas",
      "brand brainstorm"
    ],
    "metaTitle": "Business Name Generator — QuickForma",
    "metaDescription": "Brainstorm business and brand name ideas with smart keyword combinations."
  },
  {
    "id": "slug-generator",
    "verticals": ["business"],
    "name": "SEO URL Slug Sanitizer",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Convert article headlines and page titles into clean, lowercase, hyphenated URL slugs.",
    "iconName": "Tag",
    "keywords": [
      "slug generator",
      "url slug maker",
      "seo url sanitizer",
      "title to slug"
    ],
    "metaTitle": "SEO URL Slug Generator — QuickForma",
    "metaDescription": "Convert page titles into clean, lowercase, hyphenated SEO URL slugs."
  },
  {
    "id": "pomodoro-timer",
    "verticals": ["business","students"],
    "name": "Pomodoro Focus Timer",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Minimalist 25-minute work and 5-minute break Pomodoro productivity countdown timer.",
    "iconName": "Clock",
    "popular": true,
    "keywords": [
      "pomodoro timer",
      "focus timer",
      "25 minute timer",
      "productivity countdown"
    ],
    "metaTitle": "Pomodoro Focus Timer — QuickForma",
    "metaDescription": "Minimalist 25/5 minute Pomodoro countdown timer with audio chime."
  },
  {
    "id": "uuid-generator",
    "verticals": ["business"],
    "name": "UUID v4 Generator",
    "category": "developer",
    "categoryLabel": "Developer & Web Tools",
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
    "metaTitle": "Free Bulk UUID v4 Generator — QuickForma",
    "metaDescription": "Generate RFC 4122 compliant UUID v4 identifiers instantly. 100% free & client-side."
  },
  {
    "id": "jwt-decoder",
    "verticals": ["business"],
    "name": "JWT Decoder",
    "category": "developer",
    "categoryLabel": "Developer & Web Tools",
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
    "metaTitle": "Client-Side JWT Decoder & Parser — QuickForma",
    "metaDescription": "Decode JSON Web Tokens locally in your browser. Inspect header and payload claims privately."
  },
  {
    "id": "shopify-fee-calculator",
    "verticals": ["business"],
    "name": "Shopify Fee & Margin Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Operations",
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
    "metaTitle": "Shopify Fee & Payout Calculator — QuickForma",
    "metaDescription": "Calculate monthly Shopify plan costs and credit card processing fees to see net profit."
  },
  {
    "id": "stripe-fee-calculator",
    "verticals": ["business"],
    "name": "Stripe Fee Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Operations",
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
    "metaTitle": "Stripe Fee & Net Invoice Calculator — QuickForma",
    "metaDescription": "Calculate standard Stripe payment fees or exact invoice amount needed for target payout."
  },
  {
    "id": "eoq-calculator",
    "verticals": ["business"],
    "name": "Economic Order Quantity (EOQ) Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Operations",
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
    "metaTitle": "Economic Order Quantity (EOQ) Calculator — QuickForma",
    "metaDescription": "Calculate optimal inventory reorder batch size to minimize holding and ordering costs."
  },
  {
    "id": "reorder-point-calculator",
    "verticals": ["business"],
    "name": "Reorder Point (ROP) Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Operations",
    "description": "Calculate inventory trigger level based on daily sales velocity, lead time, and safety stock buffer.",
    "iconName": "PackageCheck",
    "badge": "New",
    "keywords": [
      "reorder point calculator",
      "rop calculator",
      "safety stock",
      "inventory lead time"
    ],
    "metaTitle": "Reorder Point (ROP) Calculator — QuickForma",
    "metaDescription": "Determine exact inventory reorder level to prevent stockouts during lead times."
  },
  {
    "id": "oee-calculator",
    "verticals": ["business"],
    "name": "OEE Manufacturing Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Operations",
    "description": "Calculate Overall Equipment Effectiveness (OEE), Availability, Performance, and Quality rates.",
    "iconName": "Gauge",
    "badge": "New",
    "keywords": [
      "oee calculator",
      "manufacturing efficiency",
      "overall equipment effectiveness",
      "takt time"
    ],
    "metaTitle": "OEE Manufacturing Efficiency Calculator — QuickForma",
    "metaDescription": "Calculate OEE manufacturing score based on Availability, Performance speed, and Quality."
  },
  {
    "id": "pto-calculator",
    "verticals": ["business"],
    "name": "PTO Accrual & Balance Calculator",
    "category": "business",
    "categoryLabel": "Business & Legal Docs",
    "description": "Calculate future Paid Time Off (PTO) vacation balances based on accrual rate and pay schedule.",
    "iconName": "Calendar",
    "badge": "New",
    "keywords": [
      "pto calculator",
      "vacation accrual",
      "paid time off balance",
      "hr pto"
    ],
    "metaTitle": "PTO Accrual & Vacation Balance Calculator — QuickForma",
    "metaDescription": "Project future Paid Time Off vacation balances based on pay period accrual rate."
  },
  {
    "id": "utm-builder",
    "verticals": ["business"],
    "name": "Campaign UTM URL Builder",
    "category": "developer",
    "categoryLabel": "Developer & Web Tools",
    "description": "Build Google Analytics tracking links with custom UTM source, medium, campaign, and term tags.",
    "iconName": "Link",
    "badge": "New",
    "keywords": [
      "utm builder",
      "campaign url builder",
      "google analytics utm",
      "utm generator"
    ],
    "metaTitle": "Campaign UTM URL Builder — QuickForma",
    "metaDescription": "Create Google Analytics campaign tracking URLs with custom UTM parameters."
  },
  {
    "id": "paypal-fee-calculator",
    "verticals": ["business"],
    "name": "PayPal Merchant Fee Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Operations",
    "description": "Calculate PayPal standard domestic and international seller fees or invoice amount needed for target payout.",
    "iconName": "CreditCard",
    "badge": "New",
    "keywords": [
      "paypal fee calculator",
      "paypal fee",
      "paypal merchant fees",
      "paypal invoice calculator"
    ],
    "metaTitle": "PayPal Merchant Fee & Net Invoice Calculator — QuickForma",
    "metaDescription": "Calculate PayPal seller transaction fees and exact invoice amount needed for target net payout."
  },
  {
    "id": "etsy-fee-calculator",
    "verticals": ["business"],
    "name": "Etsy Fee & Profit Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Operations",
    "description": "Calculate listing, transaction, payment processing, and offsite ads fees for Etsy shop sellers.",
    "iconName": "ShoppingCart",
    "badge": "New",
    "keywords": [
      "etsy fee calculator",
      "etsy transaction fee",
      "etsy seller profit",
      "etsy offsite ads"
    ],
    "metaTitle": "Etsy Fee & Seller Profit Calculator — QuickForma",
    "metaDescription": "Calculate total Etsy shop fees and net profit margin per sale."
  },
  {
    "id": "volumetric-weight-calculator",
    "verticals": ["business"],
    "name": "Volumetric Weight Freight Calculator",
    "category": "ecommerce",
    "categoryLabel": "Ecommerce & Operations",
    "description": "Calculate dimensional (DIM) weight and carrier billable freight weight for air, sea, and ground shipping.",
    "iconName": "Truck",
    "badge": "New",
    "keywords": [
      "volumetric weight calculator",
      "dimensional weight",
      "freight weight",
      "iata dim weight"
    ],
    "metaTitle": "Volumetric Freight & Dimensional Weight Calculator — QuickForma",
    "metaDescription": "Calculate dimensional volumetric shipping weight and carrier billable freight weight."
  },
  {
    "id": "depreciation-calculator",
    "verticals": ["business"],
    "name": "Asset Depreciation Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate annual straight-line asset depreciation, monthly tax write-offs, and full depreciation schedule.",
    "iconName": "TrendingDown",
    "badge": "New",
    "keywords": [
      "depreciation calculator",
      "straight line depreciation",
      "asset depreciation schedule",
      "tax write off"
    ],
    "metaTitle": "Straight-Line Asset Depreciation Calculator — QuickForma",
    "metaDescription": "Calculate annual asset straight-line depreciation expense and generate depreciation schedules."
  },
  {
    "id": "gpa-calculator",
    "verticals": ["students"],
    "name": "GPA Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
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
    "metaTitle": "GPA Calculator | Calculate Semester & Cumulative GPA — QuickForma",
    "metaDescription": "Calculate your GPA by course, credits, and grades. Find your semester or cumulative GPA and explore target and what-if GPA scenarios with QuickForma."
  },
  {
    "id": "final-grade-calculator",
    "verticals": ["students"],
    "name": "Final Grade Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
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
    "metaTitle": "Final Grade Calculator | Calculate Your Course Grade — QuickForma",
    "metaDescription": "Calculate your current or projected course grade and find the score you need on remaining coursework to reach your target grade."
  },
  {
    "id": "percentage-calculator",
    "verticals": ["business","students"],
    "name": "Percentage Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
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
    "metaTitle": "Percentage Calculator | Calculate Percentages Easily — QuickForma",
    "metaDescription": "Calculate percentages, percentage changes, increases, decreases, and differences quickly with QuickForma's free percentage calculator."
  },
  {
    "id": "fraction-calculator",
    "verticals": ["students"],
    "name": "Fraction Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
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
    "metaTitle": "Fraction Calculator | Calculate, Simplify & Convert Fractions — QuickForma",
    "metaDescription": "Free online fraction calculator. Add, subtract, multiply, divide, simplify, and convert fractions, mixed numbers, decimals, and percentages."
  },
  {
    "id": "cumulative-gpa-calculator",
    "verticals": ["students"],
    "name": "Cumulative GPA Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Combine prior cumulative GPA and completed credit hours with new semester grades to project updated graduation GPA.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": ["cumulative gpa calculator", "gpa projection", "overall gpa", "semester cumulative gpa"],
    "metaTitle": "Cumulative GPA Calculator — QuickForma",
    "metaDescription": "Calculate your cumulative GPA by combining past course credits and new semester grades."
  },
  {
    "id": "weighted-grade-calculator",
    "verticals": ["students"],
    "name": "Weighted Grade Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate overall course grade from weighted assignment categories like homework, quizzes, midterms, and final exam.",
    "iconName": "Percent",
    "badge": "New",
    "keywords": ["weighted grade calculator", "class grade calculator", "weight percent grade", "weighted average"],
    "metaTitle": "Weighted Grade Calculator — QuickForma",
    "metaDescription": "Calculate weighted course grades with custom category percentages and score inputs."
  },
  {
    "id": "target-gpa-planner-calculator",
    "verticals": ["students"],
    "name": "Target GPA & Course Planner",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Find the average GPA required across remaining credit hours to hit your target graduation GPA goal.",
    "iconName": "Target",
    "badge": "New",
    "keywords": ["target gpa calculator", "gpa planner", "gpa needed to reach", "required gpa"],
    "metaTitle": "Target GPA & Course Planner — QuickForma",
    "metaDescription": "Determine what average GPA you need in future credit hours to achieve your target GPA."
  },
  {
    "id": "attendance-calculator",
    "verticals": ["students"],
    "name": "Attendance & Absence Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate current attendance percentage, how many classes you can skip, or how many you must attend to reach target %.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": ["attendance calculator", "class absence calculator", "allowed skips", "attendance percentage"],
    "metaTitle": "Attendance & Absence Calculator — QuickForma",
    "metaDescription": "Calculate class attendance percentage and find out how many classes you can skip or need to attend."
  },
  {
    "id": "marks-percentage-converter",
    "verticals": ["students"],
    "name": "Marks & Percentage Converter",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Convert raw test/exam marks into percentage scores, US letter grades, and 4.0 GPA points.",
    "iconName": "Award",
    "badge": "New",
    "keywords": ["marks to percentage", "score converter", "marks grade converter", "percentage calculator"],
    "metaTitle": "Marks & Percentage Converter — QuickForma",
    "metaDescription": "Convert exam marks to percentage scores, letter grades, and 4.0 grade point equivalents."
  },
  {
    "id": "ratio-proportion-calculator",
    "verticals": ["students"],
    "name": "Ratio & Proportion Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Solve for missing variable x in A:B = C:X or simplify complex multi-part ratios into lowest terms.",
    "iconName": "Divide",
    "badge": "New",
    "keywords": ["ratio calculator", "proportion solver", "solve for x ratio", "simplify ratio"],
    "metaTitle": "Ratio & Proportion Calculator — QuickForma",
    "metaDescription": "Solve proportion equations A:B = C:X and simplify integer ratios instantly."
  },
  {
    "id": "average-calculator",
    "verticals": ["business","students"],
    "name": "Average Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate arithmetic mean, total sum, count, min, and max values from a numeric dataset.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": ["average calculator", "calculate mean", "sum calculator", "numeric average"],
    "metaTitle": "Average Calculator — QuickForma",
    "metaDescription": "Calculate the average (mean), sum, and count of any list of numbers."
  },
  {
    "id": "scientific-notation-calculator",
    "verticals": ["students"],
    "name": "Scientific Notation Calculator",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Convert numbers between standard decimal, scientific notation (a × 10^b), and engineering notation.",
    "iconName": "Binary",
    "badge": "New",
    "keywords": ["scientific notation calculator", "standard to scientific", "engineering notation", "exponents"],
    "metaTitle": "Scientific Notation Calculator — QuickForma",
    "metaDescription": "Convert numbers to scientific notation and engineering notation instantly."
  },
  {
    "id": "exponent-logarithm-calculator",
    "verticals": ["students"],
    "name": "Exponent & Logarithm Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate base-10 log (log10), natural log (ln), custom base log (log_b(x)), and power exponentiation.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": ["logarithm calculator", "ln calculator", "exponent calculator", "base 10 log"],
    "metaTitle": "Exponent & Logarithm Calculator — QuickForma",
    "metaDescription": "Calculate logarithms (log, ln, log_b) and powers with mathematical precision."
  },
  {
    "id": "linear-equation-calculator",
    "verticals": ["students"],
    "name": "Linear Equation Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Solve 1-variable linear equations of the form ax + b = c for x with step-by-step verification.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": ["linear equation calculator", "solve for x", "algebra solver", "linear equation"],
    "metaTitle": "Linear Equation Solver — QuickForma",
    "metaDescription": "Solve linear equations ax + b = c for variable x with exact solutions."
  },
  {
    "id": "quadratic-formula-calculator",
    "verticals": ["students"],
    "name": "Quadratic Formula Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Solve quadratic equations ax^2 + bx + c = 0 for real & complex roots, discriminant, and parabola vertex.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": ["quadratic formula calculator", "solve quadratic equation", "discriminant", "parabola vertex"],
    "metaTitle": "Quadratic Formula Calculator — QuickForma",
    "metaDescription": "Find real and complex roots of quadratic equations with discriminant and vertex coordinates."
  },
  {
    "id": "distance-midpoint-calculator",
    "verticals": ["students"],
    "name": "Distance & Midpoint Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate Euclidean distance, midpoint coordinates, and line slope between two 2D points.",
    "iconName": "MapPin",
    "badge": "New",
    "keywords": ["distance formula calculator", "midpoint calculator", "slope between two points", "coordinate geometry"],
    "metaTitle": "Distance & Midpoint Calculator — QuickForma",
    "metaDescription": "Calculate distance, midpoint, and slope between two coordinate points."
  },
  {
    "id": "sequence-series-calculator",
    "verticals": ["students"],
    "name": "Sequence & Series Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate n-th terms and sum of n terms for Arithmetic and Geometric mathematical sequences.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": ["arithmetic sequence calculator", "geometric sequence", "sum of series", "nth term"],
    "metaTitle": "Sequence & Series Calculator — QuickForma",
    "metaDescription": "Calculate nth terms and partial sums for arithmetic and geometric series."
  },
  {
    "id": "pythagorean-theorem-calculator",
    "verticals": ["students"],
    "name": "Pythagorean Theorem Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Solve right triangle side lengths using a^2 + b^2 = c^2 along with area and perimeter.",
    "iconName": "Triangle",
    "badge": "New",
    "keywords": ["pythagorean theorem calculator", "hypotenuse calculator", "right triangle solver", "a2+b2=c2"],
    "metaTitle": "Pythagorean Theorem Calculator — QuickForma",
    "metaDescription": "Solve right triangle side lengths, hypotenuse, area, and perimeter."
  },
  {
    "id": "triangle-area-solver",
    "verticals": ["students"],
    "name": "Triangle Area & Solver",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate triangle area from base and height using Area = 0.5 * b * h.",
    "iconName": "Triangle",
    "badge": "New",
    "keywords": ["triangle area calculator", "area of triangle", "base and height triangle", "geometry area"],
    "metaTitle": "Triangle Area Calculator — QuickForma",
    "metaDescription": "Calculate triangle area instantly from base and height inputs."
  },
  {
    "id": "circle-calculator",
    "verticals": ["students"],
    "name": "Circle & Geometry Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate diameter, circumference, and area of a circle from radius.",
    "iconName": "Circle",
    "badge": "New",
    "keywords": ["circle calculator", "area of circle", "circumference calculator", "radius to diameter"],
    "metaTitle": "Circle Calculator — Area & Circumference — QuickForma",
    "metaDescription": "Calculate circle diameter, circumference, and area from radius."
  },
  {
    "id": "geometry-area-volume-calculator",
    "verticals": ["students"],
    "name": "2D & 3D Geometry Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate 3D volume and total surface area for spheres, cylinders, cubes, and cones.",
    "iconName": "Box",
    "badge": "New",
    "keywords": ["volume calculator", "surface area calculator", "3d geometry", "sphere volume"],
    "metaTitle": "2D & 3D Geometry Calculator — QuickForma",
    "metaDescription": "Calculate 3D volume and surface area for spheres, cylinders, cones, and cubes."
  },
  {
    "id": "trigonometry-calculator",
    "verticals": ["students"],
    "name": "Trigonometry Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate sine (sin), cosine (cos), and tangent (tan) in degrees or radians.",
    "iconName": "Triangle",
    "badge": "New",
    "keywords": ["trigonometry calculator", "sin cos tan", "radians degrees", "trig functions"],
    "metaTitle": "Trigonometry Calculator — Sin, Cos, Tan — QuickForma",
    "metaDescription": "Calculate sine, cosine, and tangent in degrees or radians."
  },
  {
    "id": "law-of-sines-cosines-calculator",
    "verticals": ["students"],
    "name": "Law of Sines & Cosines Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Solve non-right oblique triangles using Law of Cosines (c^2 = a^2 + b^2 - 2ab cos C) and Law of Sines.",
    "iconName": "Triangle",
    "badge": "New",
    "keywords": ["law of sines calculator", "law of cosines", "oblique triangle solver", "non right triangle"],
    "metaTitle": "Law of Sines & Cosines Calculator — QuickForma",
    "metaDescription": "Solve non-right oblique triangles using the Law of Sines and Law of Cosines."
  },
  {
    "id": "derivative-limit-calculator",
    "verticals": ["students"],
    "name": "Derivative & Limit Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate polynomial power-rule derivatives d/dx[ax^n] = a * n * x^(n-1) and tangent slopes.",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": ["derivative calculator", "calculus derivative", "power rule", "tangent slope"],
    "metaTitle": "Derivative & Limit Calculator — QuickForma",
    "metaDescription": "Calculate polynomial derivatives and tangent line slopes with power rule precision."
  },
  {
    "id": "descriptive-statistics-calculator",
    "verticals": ["students"],
    "name": "Descriptive Statistics Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate mean, median, mode, range, variance, standard deviation, quartiles, IQR, and MAD from data.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": ["descriptive statistics calculator", "standard deviation", "mean median mode", "variance calculator", "iqr"],
    "metaTitle": "Descriptive Statistics Calculator — QuickForma",
    "metaDescription": "Calculate mean, median, mode, standard deviation, variance, quartiles, and IQR."
  },
  {
    "id": "z-score-calculator",
    "verticals": ["students"],
    "name": "Z-Score Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate standard score Z = (X - mu) / sigma and percentile rank under standard normal curve.",
    "iconName": "BarChart",
    "badge": "New",
    "keywords": ["z score calculator", "standard score", "normal distribution percentile", "percentile rank"],
    "metaTitle": "Z-Score & Percentile Calculator — QuickForma",
    "metaDescription": "Calculate Z-scores and percentile ranks under the standard normal distribution."
  },
  {
    "id": "probability-calculator",
    "verticals": ["students"],
    "name": "Probability Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate single-event, joint intersection P(A and B), union P(A or B), and complement probabilities.",
    "iconName": "PieChart",
    "badge": "New",
    "keywords": ["probability calculator", "union intersection probability", "complement probability", "stats probability"],
    "metaTitle": "Probability Calculator — QuickForma",
    "metaDescription": "Calculate single event, union, intersection, and complement probabilities."
  },
  {
    "id": "permutation-combination-calculator",
    "verticals": ["students"],
    "name": "Permutation & Combination Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate permutations nPr (order matters) and combinations nCr (order does not matter).",
    "iconName": "Calculator",
    "badge": "New",
    "keywords": ["npr ncr calculator", "permutation combination", "factorial calculator", "combinatorics"],
    "metaTitle": "Permutation & Combination Calculator (nPr / nCr) — QuickForma",
    "metaDescription": "Calculate nPr permutations, nCr combinations, and factorials."
  },
  {
    "id": "probability-distributions-calculator",
    "verticals": ["students"],
    "name": "Binomial Probability Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate exact probability P(X = k), at least P(X >= k), and at most P(X <= k) for Binomial distributions.",
    "iconName": "BarChart2",
    "badge": "New",
    "keywords": ["binomial probability calculator", "binomial distribution", "p(x=k)", "stats distribution"],
    "metaTitle": "Binomial Probability Calculator — QuickForma",
    "metaDescription": "Calculate exact and cumulative binomial probabilities."
  },
  {
    "id": "confidence-interval-calculator",
    "verticals": ["students"],
    "name": "Confidence Interval Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate margin of error E = Z * (sigma / sqrt(n)) and lower/upper bounds for confidence intervals.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": ["confidence interval calculator", "margin of error", "95 confidence interval", "stats mean interval"],
    "metaTitle": "Confidence Interval Calculator — QuickForma",
    "metaDescription": "Calculate confidence intervals and margin of error for sample means."
  },
  {
    "id": "hypothesis-test-calculator",
    "verticals": ["students"],
    "name": "Hypothesis Test Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate test statistic Z = (xbar - mu) / (s / sqrt(n)), two-tailed p-value, and significance decision.",
    "iconName": "BarChart3",
    "badge": "New",
    "keywords": ["hypothesis test calculator", "z test calculator", "p value calculator", "t test stats"],
    "metaTitle": "Hypothesis Test Calculator (Z-Test / p-value) — QuickForma",
    "metaDescription": "Calculate Z-test statistics, two-tailed p-values, and hypothesis testing decisions."
  },
  {
    "id": "molar-mass-calculator",
    "verticals": ["students"],
    "name": "Molar Mass & Composition Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Parse chemical formulas (e.g. H2SO4, Ca(NO3)2) to compute total molecular weight and element mass %.",
    "iconName": "Atom",
    "badge": "New",
    "keywords": ["molar mass calculator", "molecular weight", "chemical formula parser", "mass percent composition"],
    "metaTitle": "Molar Mass & Chemical Formula Calculator — QuickForma",
    "metaDescription": "Calculate molar mass and element mass percentages from any chemical formula."
  },
  {
    "id": "moles-molarity-calculator",
    "verticals": ["students"],
    "name": "Moles & Molarity Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate moles n = m / M and molar concentration M = n / V in mol/L.",
    "iconName": "FlaskConical",
    "badge": "New",
    "keywords": ["molarity calculator", "moles calculator", "concentration mol L", "chem solution"],
    "metaTitle": "Moles & Molarity Calculator — QuickForma",
    "metaDescription": "Calculate moles and molar concentration for chemical solutions."
  },
  {
    "id": "dilution-calculator",
    "verticals": ["students"],
    "name": "Solution Dilution Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate final volume V2 or concentration C2 using C1 V1 = C2 V2 and required solvent to add.",
    "iconName": "FlaskConical",
    "badge": "New",
    "keywords": ["dilution calculator", "c1v1=c2v2", "solution dilution", "chem concentration"],
    "metaTitle": "Solution Dilution Calculator (C1V1 = C2V2) — QuickForma",
    "metaDescription": "Calculate solution dilution using C1V1 = C2V2 and required solvent volume."
  },
  {
    "id": "ph-poh-calculator",
    "verticals": ["students"],
    "name": "pH & pOH Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate pH, pOH, [H+] concentration, and [OH-] concentration (pH + pOH = 14).",
    "iconName": "FlaskConical",
    "badge": "New",
    "keywords": ["ph calculator", "poh calculator", "h+ concentration", "acid base ph"],
    "metaTitle": "pH & pOH Calculator — QuickForma",
    "metaDescription": "Calculate pH, pOH, and hydrogen ion concentration."
  },
  {
    "id": "stoichiometry-percent-yield-calculator",
    "verticals": ["students"],
    "name": "Stoichiometry & Percent Yield Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate chemical reaction efficiency and percent yield from actual and theoretical yield.",
    "iconName": "FlaskConical",
    "badge": "New",
    "keywords": ["percent yield calculator", "stoichiometry calculator", "actual vs theoretical yield", "chem yield"],
    "metaTitle": "Stoichiometry & Percent Yield Calculator — QuickForma",
    "metaDescription": "Calculate percent yield and reaction stoichiometry efficiency."
  },
  {
    "id": "gas-laws-calculator",
    "verticals": ["students"],
    "name": "Gas Laws Calculator (PV = nRT)",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Solve for missing variables in the Ideal Gas Law (PV = nRT) with R = 0.08206 L atm / mol K.",
    "iconName": "Wind",
    "badge": "New",
    "keywords": ["ideal gas law calculator", "pv=nrt calculator", "gas laws", "pressure volume temp"],
    "metaTitle": "Ideal Gas Law Calculator (PV = nRT) — QuickForma",
    "metaDescription": "Solve Ideal Gas Law equations PV = nRT for P, V, n, or T."
  },
  {
    "id": "significant-figures-calculator",
    "verticals": ["students"],
    "name": "Significant Figures Calculator",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Count significant figures in a number and apply scientific rounding rules.",
    "iconName": "Hash",
    "badge": "New",
    "keywords": ["sig fig calculator", "significant figures count", "sig fig rounding", "scientific figures"],
    "metaTitle": "Significant Figures Calculator — QuickForma",
    "metaDescription": "Count significant figures and apply scientific rounding rules."
  },
  {
    "id": "kinematics-motion-calculator",
    "verticals": ["students"],
    "name": "Kinematics & SUVAT Motion Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate 1D motion variables using SUVAT equations (v = u + at, s = ut + 0.5 a t^2).",
    "iconName": "Gauge",
    "badge": "New",
    "keywords": ["suvat calculator", "kinematics calculator", "physics motion", "displacement velocity"],
    "metaTitle": "Kinematics & SUVAT Motion Calculator — QuickForma",
    "metaDescription": "Solve 1D kinematic motion equations and SUVAT variables."
  },
  {
    "id": "force-friction-momentum-calculator",
    "verticals": ["students"],
    "name": "Force, Friction & Momentum Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate Newton's 2nd Law Force (F = ma), Momentum (p = mv), and Weight (W = mg).",
    "iconName": "Zap",
    "badge": "New",
    "keywords": ["force calculator", "f=ma calculator", "momentum calculator", "physics force"],
    "metaTitle": "Force, Friction & Momentum Calculator — QuickForma",
    "metaDescription": "Calculate net force F = ma, momentum p = mv, and gravitational weight."
  },
  {
    "id": "work-energy-power-calculator",
    "verticals": ["students"],
    "name": "Work, Energy & Power Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate Kinetic Energy (KE = 0.5 m v^2), Potential Energy (PE = mgh), Mechanical Energy, and Power.",
    "iconName": "Zap",
    "badge": "New",
    "keywords": ["kinetic energy calculator", "potential energy", "power calculator", "physics work energy"],
    "metaTitle": "Work, Energy & Power Calculator — QuickForma",
    "metaDescription": "Calculate kinetic energy, potential energy, mechanical energy, and power."
  },
  {
    "id": "ohms-law-electrical-calculator",
    "verticals": ["students"],
    "name": "Ohm's Law & Circuit Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Solve voltage (V = IR), electrical current (I), resistance (R), and electrical power (P = VI).",
    "iconName": "Zap",
    "badge": "New",
    "keywords": ["ohms law calculator", "v=ir calculator", "voltage current resistance", "electrical power"],
    "metaTitle": "Ohm's Law & Circuit Calculator — QuickForma",
    "metaDescription": "Solve Ohm's Law V = IR, current, resistance, and electrical power."
  },
  {
    "id": "wave-frequency-speed-calculator",
    "verticals": ["students"],
    "name": "Wave, Frequency & Light Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate wave speed (v = f * lambda), period (T = 1/f), and photon energy (E = hf).",
    "iconName": "Activity",
    "badge": "New",
    "keywords": ["wave speed calculator", "frequency wavelength", "wave period", "photon energy"],
    "metaTitle": "Wave, Frequency & Light Calculator — QuickForma",
    "metaDescription": "Calculate wave speed v = f * lambda, period, and photon energy."
  },
  {
    "id": "reading-presentation-time-calculator",
    "verticals": ["students"],
    "name": "Reading & Presentation Time Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate estimated reading time (slow, average, fast) and speech presentation length from word count.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": ["reading time calculator", "presentation speaking time", "speech duration", "words to minutes"],
    "metaTitle": "Reading & Presentation Time Calculator — QuickForma",
    "metaDescription": "Calculate reading time and presentation speech duration from word count."
  },
  {
    "id": "essay-page-count-calculator",
    "verticals": ["students"],
    "name": "Essay Page Count Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Convert word count to estimated printed pages based on font size, line spacing, and font family.",
    "iconName": "FileText",
    "badge": "New",
    "keywords": ["words to pages calculator", "essay page count", "words per page", "printed pages"],
    "metaTitle": "Essay Page Count Calculator — QuickForma",
    "metaDescription": "Convert word counts to printed essay pages based on font size and line spacing."
  },
  {
    "id": "academic-readability-analyzer",
    "verticals": ["students"],
    "name": "Academic Readability Analyzer",
    "category": "content",
    "categoryLabel": "Text & Content Tools",
    "description": "Analyze text readability scores including Flesch-Kincaid Grade Level, Flesch Reading Ease, and Gunning Fog.",
    "iconName": "BookOpen",
    "badge": "New",
    "keywords": ["readability analyzer", "flesch kincaid grade", "flesch reading ease", "text grade level"],
    "metaTitle": "Academic Readability Analyzer — QuickForma",
    "metaDescription": "Analyze academic text readability scores and grade levels."
  },
  {
    "id": "citation-formatter",
    "verticals": ["students"],
    "name": "Academic Citation Formatter",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Format accurate in-text and full bibliography citations in APA 7th, MLA 9th, Chicago 17th, and IEEE styles.",
    "iconName": "BookOpen",
    "badge": "New",
    "keywords": ["citation generator", "apa citation", "mla citation", "chicago ieee bibliography"],
    "metaTitle": "Academic Citation Formatter (APA, MLA, IEEE) — QuickForma",
    "metaDescription": "Format APA, MLA, Chicago, and IEEE citations for books, journals, and websites."
  },
  {
    "id": "study-schedule-time-calculator",
    "verticals": ["students"],
    "name": "Study Time & Schedule Calculator",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate recommended weekly out-of-class study hours based on credit load and course difficulty.",
    "iconName": "Calendar",
    "badge": "New",
    "keywords": ["study time calculator", "credit hours study ratio", "weekly study plan", "study planner"],
    "metaTitle": "Study Time & Schedule Calculator — QuickForma",
    "metaDescription": "Calculate recommended weekly study hours based on course credit load."
  },
  {
    "id": "exam-assignment-countdown",
    "verticals": ["students"],
    "name": "Exam & Assignment Countdown",
    "category": "productivity",
    "categoryLabel": "Productivity & Daily",
    "description": "Calculate days remaining until exam deadline and daily study hours required to reach preparation goals.",
    "iconName": "Clock",
    "badge": "New",
    "keywords": ["exam countdown", "assignment deadline calculator", "days left until exam", "study pacing"],
    "metaTitle": "Exam & Assignment Countdown Calculator — QuickForma",
    "metaDescription": "Track days remaining until exam dates and calculate required daily study pacing."
  },
  {
    "id": "student-budget-planner",
    "verticals": ["students"],
    "name": "Student Budget Planner",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Track monthly student income sources against recurring expenses (tuition, housing, books, food, transit).",
    "iconName": "DollarSign",
    "badge": "New",
    "keywords": ["student budget planner", "college budget calculator", "monthly student expense", "student income"],
    "metaTitle": "Student Budget Planner — QuickForma",
    "metaDescription": "Plan and manage monthly college student income and expenses."
  },
  {
    "id": "cost-per-credit-hour-calculator",
    "verticals": ["students"],
    "name": "Cost Per Credit Hour Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate cost per credit hour and exact monetary value per individual class session.",
    "iconName": "DollarSign",
    "badge": "New",
    "keywords": ["cost per credit hour", "tuition per class", "cost of skipping class", "college tuition per credit"],
    "metaTitle": "Cost Per Credit Hour Calculator — QuickForma",
    "metaDescription": "Calculate tuition cost per credit hour and cost per individual class session."
  },
  {
    "id": "student-loan-payoff-calculator",
    "verticals": ["students"],
    "name": "Student Loan Payoff Calculator",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Calculate loan payoff timeline, total interest paid, and savings from extra monthly payments.",
    "iconName": "DollarSign",
    "badge": "New",
    "keywords": ["student loan payoff calculator", "extra payment student loan", "loan interest savings", "student debt timeline"],
    "metaTitle": "Student Loan Payoff Calculator — QuickForma",
    "metaDescription": "Calculate student loan payoff schedules and interest savings from extra monthly payments."
  },
  {
    "id": "roommate-rent-split-calculator",
    "verticals": ["students"],
    "name": "Roommate Rent & Expense Splitter",
    "category": "finance",
    "categoryLabel": "Financial Calculators",
    "description": "Fairly split total apartment rent based on bedroom square footage and private vs shared bathroom amenities.",
    "iconName": "Home",
    "badge": "New",
    "keywords": ["roommate rent split calculator", "fair rent split", "bedroom square feet rent", "split apartment rent"],
    "metaTitle": "Roommate Rent & Expense Splitter — QuickForma",
    "metaDescription": "Split apartment rent fairly based on bedroom square footage and bathroom amenities."
  },
  {
    "id": "gpa-scale-converter",
    "verticals": ["students"],
    "name": "GPA Scale Converter",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Convert GPAs across 4.0, 4.33, 5.0, percentage, and ECTS European credit conversion scales.",
    "iconName": "GraduationCap",
    "badge": "New",
    "keywords": ["gpa scale converter", "4.0 to 4.33 gpa", "gpa to percentage", "ects gpa conversion"],
    "metaTitle": "GPA Scale Converter (4.0, 4.33, 5.0, ECTS) — QuickForma",
    "metaDescription": "Convert GPAs between 4.0, 4.33, 5.0, percentage, and ECTS scales."
  },
  {
    "id": "marks-to-gpa-converter",
    "verticals": ["students"],
    "name": "Marks to GPA Converter",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Convert raw exam scores and marks directly into 4.0 GPA points and US letter grades.",
    "iconName": "Award",
    "badge": "New",
    "keywords": ["marks to gpa converter", "score to gpa", "percentage to gpa points", "exam mark grade"],
    "metaTitle": "Marks to GPA Converter — QuickForma",
    "metaDescription": "Convert raw exam marks and percentages directly into 4.0 GPA points."
  },
{
  "id": "cash-flow-runway-calculator",
  "verticals": [
    "business"
  ],
  "name": "Cash Flow Runway & Burn Rate Calculator",
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
    "business"
  ],
  "name": "Regex Matcher, Visualizer & Cheatsheet",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "IPv4 Subnet Mask & CIDR Notation Calculator",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "SEO Meta Title & Open Graph Tag Generator",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business"
  ],
  "name": "JSON-LD Schema.org Generator for Local Business & FAQ",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business"
  ],
  "name": "Google Desktop & Mobile SERP Snippet Preview",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students"
  ],
  "name": "Prime Factors, GCF & LCM Calculator",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students"
  ],
  "name": "Binary, Octal, Decimal & Hexadecimal Converter",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students"
  ],
  "name": "Simple Linear Regression & $R^2$ Line of Best Fit",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students"
  ],
  "name": "Sample & Population Standard Deviation Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students"
  ],
  "name": "Margin of Error & Survey Sample Size Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "categoryLabel": "Ecommerce & Operations",
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
  "category": "ecommerce",
  "categoryLabel": "Ecommerce & Operations",
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
  "categoryLabel": "Ecommerce & Operations",
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
  "categoryLabel": "Ecommerce & Operations",
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
  "categoryLabel": "Ecommerce & Operations",
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
  "categoryLabel": "Operations & Manufacturing",
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
  "categoryLabel": "Operations & Manufacturing",
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
  "categoryLabel": "Operations & Manufacturing",
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
  "categoryLabel": "Operations & Manufacturing",
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
  "category": "finance",
  "categoryLabel": "Real Estate & Property",
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
  "categoryLabel": "Real Estate & Property",
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
  "category": "finance",
  "categoryLabel": "Real Estate & Property",
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
  "category": "finance",
  "categoryLabel": "Real Estate & Property",
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
  "category": "finance",
  "categoryLabel": "Real Estate & Property",
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
  "categoryLabel": "Marketing & Growth",
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
  "categoryLabel": "Marketing & Growth",
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
  "categoryLabel": "Marketing & Growth",
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
  "categoryLabel": "Marketing & Growth",
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
  "categoryLabel": "Career & HR",
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
  "categoryLabel": "Career & HR",
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
  "categoryLabel": "Career & HR",
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
  "categoryLabel": "Career & HR",
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
  "categoryLabel": "Personal Finance",
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
  "categoryLabel": "Personal Finance",
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
  "categoryLabel": "Personal Finance",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "categoryLabel": "Ecommerce & Operations",
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
  "categoryLabel": "Career & HR",
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
  "categoryLabel": "Career & HR",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Marketing & Growth",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Operations & Manufacturing",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "marketing",
  "categoryLabel": "Marketing & Growth",
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
  "categoryLabel": "Marketing & Growth",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "hr",
  "categoryLabel": "Career & HR",
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
  "category": "operations",
  "categoryLabel": "Operations & Manufacturing",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
    "business"
  ],
  "name": "Altman Z-Score Business Bankruptcy Predictor",
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "categoryLabel": "Operations & Manufacturing",
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
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "XML to JSON & JSON to XML Converter",
  "category": "converters",
  "categoryLabel": "Converters & Formats",
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
    "business"
  ],
  "name": "YAML to JSON & JSON to YAML Converter",
  "category": "converters",
  "categoryLabel": "Converters & Formats",
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
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "Unix Epoch Timestamp to ISO Date Converter",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "Markdown to Clean HTML Live Converter",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "Linux File Permission Chmod Octal Calculator",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "Keyword Density & Frequency Counter",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business"
  ],
  "name": "Robots.txt File Generator & Validator",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business"
  ],
  "name": "Text Deduplication & Line Sorter Tool",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business",
    "students"
  ],
  "name": "Email Subject Line Character & Spam Word Checker",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students"
  ],
  "name": "Raw Quiz / Exam Test Score Percentage Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Definite & Indefinite Integration Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Matrix Addition, Multiplication & Determinant Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Dot Product, Cross Product & Vector Magnitude Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Polynomial Factoring & Synthetic Division Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "3x3 Systems of Linear Equations Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Line Slope, Y-Intercept & Equation Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Percentage Change & Percentage Difference Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "students"
  ],
  "name": "One-Way & Two-Way ANOVA F-Test Calculator",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "students"
  ],
  "name": "Sample & Population Variance Standalone Solver",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "students"
  ],
  "name": "Paired & Unpaired Two-Sample Student's t-Test",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "students"
  ],
  "name": "Pearson r & Spearman Rank Correlation",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "students"
  ],
  "name": "IQR, Box Plot Quartiles & Outlier Detector",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students"
  ],
  "name": "Empirical & Molecular Formula Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students"
  ],
  "name": "Gibbs Free Energy $\\Delta G = \\Delta H - T\\Delta S$",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students"
  ],
  "name": "Molarity, Molality & Mass Percent Converter",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "business",
    "students"
  ],
  "name": "Newton's Law of Universal Gravitation Solver",
  "category": "operations",
  "categoryLabel": "Operations & Manufacturing",
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
    "business",
    "students"
  ],
  "name": "Circular Motion & Centripetal Acceleration Solver",
  "category": "operations",
  "categoryLabel": "Operations & Manufacturing",
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
    "business",
    "students"
  ],
  "name": "Specific Heat Capacity $Q = mc\\Delta T$ Solver",
  "category": "operations",
  "categoryLabel": "Operations & Manufacturing",
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
    "students",
    "business"
  ],
  "name": "SuperMemo SM-2 Flashcard Revision Scheduler",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
    "students",
    "business"
  ],
  "name": "Text Matching & Similarity Ratio Calculator",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
    "students",
    "business"
  ],
  "name": "Daily Assignment & Reading Workload Estimator",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
    "students",
    "business"
  ],
  "name": "Words Per Minute & Accuracy Test Tool",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
  "category": "ecommerce",
  "categoryLabel": "Ecommerce & Operations",
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
  "category": "ecommerce",
  "categoryLabel": "Ecommerce & Operations",
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
  "categoryLabel": "Ecommerce & Operations",
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
  "categoryLabel": "Ecommerce & Operations",
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
  "category": "ecommerce",
  "categoryLabel": "Ecommerce & Operations",
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
  "categoryLabel": "Ecommerce & Operations",
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
  "category": "ecommerce",
  "categoryLabel": "Ecommerce & Operations",
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
  "category": "ecommerce",
  "categoryLabel": "Ecommerce & Operations",
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
  "category": "ecommerce",
  "categoryLabel": "Ecommerce & Operations",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "finance",
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "categoryLabel": "Financial Calculators",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
  "category": "business",
  "categoryLabel": "Business & Legal Docs",
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
    "business"
  ],
  "name": "HTML Entity Encoder & Escaper",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "HMAC-SHA256 Signature Generator",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "CSS Minifier & Code Formatter",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "JavaScript Code Beautifier & Formatter",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "DNS Record Syntax Generator",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "IP Address Range & Network Gateway Solver",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "SVG Path Data Optimizer & Cleaner",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "HTTP Security Headers & CORS Policy Builder",
  "category": "developer",
  "categoryLabel": "Developer & Web Tools",
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
    "business"
  ],
  "name": "Visual XML Sitemap Path Builder",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business"
  ],
  "name": "Script Word Count to Audio Duration Converter",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business"
  ],
  "name": "SEO Internal Anchor Text Distribution Planner",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business"
  ],
  "name": "Paragraph Length & Sentence Complexity Analyzer",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business"
  ],
  "name": "URL Slug to Clean Headline Title Converter",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business"
  ],
  "name": "N-Gram Word Pair & Triplet Frequency Analyzer",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business"
  ],
  "name": "Rich Markdown Placeholder Text & Heading Generator",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "business"
  ],
  "name": "Image Alt Text Character & Descriptive Audit",
  "category": "content",
  "categoryLabel": "Text & Content Tools",
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
    "students",
    "business"
  ],
  "name": "LSAC Law School Admission GPA Converter",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "AMCAS Science / Non-Science BCPM GPA Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "NCAA Student-Athlete Core Course GPA Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "High School & Class Rank Percentile Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Pass/Fail Course Selection GPA Impact Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Graduate Master's Program GPA Calculator",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Dean's List vs Academic Probation GPA Threshold",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "High School Diploma Credit Completion Tracker",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Degree Credit Progress & Remaining Semester Estimator",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "College Course Sequence & Prerequisite Planner",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "GED Subject Score Percentile & Passing Status Checker",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "GRE Verbal & Quant Percentile Rank Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "GMAT Focus Edition Section & Percentile Estimator",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "TOEFL iBT to IELTS Band Score Converter",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "CLEP Exam Credit Hour & Tuition Savings Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Course Repeat & Grade Replacement GPA Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Engineering & Science Major Core GPA Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Finance & Accounting Major Core GPA Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Nursing Prerequisite & Science GPA Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Polar vs Rectangular Complex Number Calculator",
  "category": "converters",
  "categoryLabel": "Converters & Formats",
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
    "students",
    "business"
  ],
  "name": "Factorial $n!$ & Permutation Formula Solver",
  "category": "converters",
  "categoryLabel": "Converters & Formats",
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
    "students",
    "business"
  ],
  "name": "Logarithm Base-$b$ Conversion Solver",
  "category": "converters",
  "categoryLabel": "Converters & Formats",
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
    "students",
    "business"
  ],
  "name": "Conic Sections: Ellipse & Hyperbola Solver",
  "category": "converters",
  "categoryLabel": "Converters & Formats",
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
    "students",
    "business"
  ],
  "name": "Partial Fraction Decomposition Solver",
  "category": "converters",
  "categoryLabel": "Converters & Formats",
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
    "students",
    "business"
  ],
  "name": "Poisson Event Probability & Rate Solver",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
    "students",
    "business"
  ],
  "name": "Continuous Exponential Decay & Reliability",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
    "students",
    "business"
  ],
  "name": "Bayesian Conditional Probability & Prior Solver",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
    "students",
    "business"
  ],
  "name": "Henderson-Hasselbalch Buffer pH Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Colligative Properties & Freezing Point Depression",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Arrhenius Equation & Activation Energy Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Hydrocarbon Combustion Formula Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Redox Reaction Oxidation State Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Chemical Equilibrium $K_c$ and $K_p$ Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Faraday's Law of Electrolysis Mass Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Torque, Moment of Inertia & Rotational Kinematics",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Simple Harmonic Motion & Oscillation Period",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Sound & Light Wave Frequency Doppler Shift",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Snell's Law of Refraction & Critical Angle",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Capacitor Charge & RC Time Constant Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Electrical Transformer Turns Ratio & Voltage Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Archimedes' Principle & Buoyant Force Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Fluid Dynamics Pressure & Flow Velocity Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Lorentz Factor & Time Dilation Solver",
  "category": "students",
  "categoryLabel": "Students & Education",
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
    "students",
    "business"
  ],
  "name": "Printable & Interactive Cornell Notes Sheet",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
    "students",
    "business"
  ],
  "name": "Academic Essay Thesis Statement Builder",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
    "students",
    "business"
  ],
  "name": "Student Project & Shared Supplies Cost Splitter",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
    "students",
    "business"
  ],
  "name": "Mock Test Score to Final Exam Grade Predictor",
  "category": "productivity",
  "categoryLabel": "Productivity & Daily",
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
  "categoryLabel": "Ecommerce & Operations",
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
  "categoryLabel": "Ecommerce & Operations",
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
  "category": "ecommerce",
  "categoryLabel": "Ecommerce & Operations",
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
}
];
