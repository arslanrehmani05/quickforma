import { ToolMetadata } from '../types';

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
    "name": "Marks to GPA Converter",
    "category": "converters",
    "categoryLabel": "Converters & Formats",
    "description": "Convert raw exam scores and marks directly into 4.0 GPA points and US letter grades.",
    "iconName": "Award",
    "badge": "New",
    "keywords": ["marks to gpa converter", "score to gpa", "percentage to gpa points", "exam mark grade"],
    "metaTitle": "Marks to GPA Converter — QuickForma",
    "metaDescription": "Convert raw exam marks and percentages directly into 4.0 GPA points."
  }
];
