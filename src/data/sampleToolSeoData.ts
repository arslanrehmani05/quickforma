import { ToolSeoData } from '../types/seo';

export const FREELANCE_HOURLY_RATE_SEO: ToolSeoData = {
  overview: {
    whatItDoes: "Calculates the exact billable hourly rate a freelancer or independent contractor must charge to achieve their target annual take-home salary after accounting for tax obligations, unbillable admin hours, business overhead, and vacation time.",
    whoShouldUseIt: "Freelancers, independent consultants, agency founders, remote contractors, self-employed creators, and gig economy workers switching from W-2 employment to 1099 self-employment.",
    whenToUseIt: "Use this calculator before submitting client proposals, negotiating annual retainer contracts, transitioning to full-time freelancing, or conducting annual pricing updates.",
    whyItIsUseful: "Most freelancers incorrectly divide their target annual income by 2,000 hours (50 weeks × 40 hours), failing to account for 25–30% self-employment taxes, 20% non-billable administrative overhead, health insurance, software subscriptions, and unpaid vacation. This results in severe undercharging and financial burnout."
  },
  howToUse: [
    {
      stepNumber: 1,
      title: "Set Target Income",
      description: "Enter your desired annual net take-home income after all business costs."
    },
    {
      stepNumber: 2,
      title: "Add Expenses & Taxes",
      description: "Input monthly business overhead (software, legal, hosting) and self-employment tax rate."
    },
    {
      stepNumber: 3,
      title: "Define Billable Hours",
      description: "Specify total working hours per week, non-billable admin percentage, and unpaid vacation weeks."
    },
    {
      stepNumber: 4,
      title: "Review Minimum Rate",
      description: "Instantly view your required minimum hourly rate and daily rate to hit your financial goals."
    }
  ],
  workedExample: {
    title: "Scenario: Senior UI/UX Designer Transitioning to Freelance",
    scenarioDescription: "A senior designer wants to earn $100,000 net take-home salary per year. They spend 10 hours per week on client outreach, invoicing, and admin work (25% non-billable overhead). They take 4 weeks of unpaid vacation per year and spend $500/month on software licenses and health insurance.",
    sampleInputs: [
      { label: "Target Annual Income", value: "$100,000" },
      { label: "Annual Business Overhead", value: "$6,000 ($500/mo)" },
      { label: "Self-Employment Tax Rate", value: "25%" },
      { label: "Total Hours Per Week", value: "40 Hours" },
      { label: "Non-Billable Admin Overhead", value: "25% (30 Billable hrs/wk)" },
      { label: "Unpaid Vacation", value: "4 Weeks (48 Working weeks/yr)" }
    ],
    stepsExplanation: [
      "Gross Annual Revenue Needed = ($100,000 Target + $6,000 Expenses) ÷ (1 - 0.25 Tax Rate) = $141,333",
      "Total Annual Working Weeks = 52 - 4 Vacation Weeks = 48 Weeks",
      "Total Annual Billable Hours = 48 Weeks × 30 Billable Hours/Week = 1,440 Billable Hours",
      "Required Hourly Rate = $141,333 ÷ 1,440 Hours = $98.15 / hour"
    ],
    finalOutput: {
      label: "Minimum Recommended Billable Rate",
      value: "$98.15 / hr"
    },
    summary: "To take home $100,000 clean profit after taxes and software expenses while working 30 billable hours/week, the designer must bill clients at least $98.15/hr (or $785/day)."
  },
  formula: {
    title: "Freelance Rate Formula & Mathematical Logic",
    type: "math",
    explanation: "The minimum billable hourly rate is calculated by dividing total gross revenue requirements (net target income plus annual business overhead adjusted for tax burden) by total annual billable hours.",
    formulaText: "Hourly Rate = [(Net Target Salary + Annual Overhead) / (1 - Tax Rate)] / [(52 - Vacation Weeks) * Weekly Hours * (1 - Admin Overhead %)]",
    variables: [
      { symbol: "Net Target Salary", description: "Desired annual take-home salary after taxes and expenses" },
      { symbol: "Annual Overhead", description: "Yearly sum of software, insurance, equipment, and office expenses" },
      { symbol: "Tax Rate", description: "Combined federal, state, and self-employment tax percentage" },
      { symbol: "Vacation Weeks", description: "Number of unpaid weeks taken off per year for rest/holidays" },
      { symbol: "Admin Overhead %", description: "Percentage of weekly hours spent on unbillable sales, proposals, and admin work" }
    ]
  },
  bestPractices: [
    {
      title: "Buffer for Scope Creep",
      description: "Always pad your calculated rate by 10-15% when quoting fixed-fee project scopes to absorb unexpected revisions."
    },
    {
      title: "Review Rates Annually",
      description: "Increase your billable hourly rate by 5-10% every 12 months to match inflation and increased domain expertise."
    },
    {
      title: "Separate Expenses from Income",
      description: "Maintain a dedicated business checking account to track exact monthly overhead software and subscription costs."
    }
  ],
  commonMistakes: [
    {
      mistake: "Dividing Salary by 2,000 Hours",
      whyItHappens: "New freelancers assume they will bill 40 hours every week for 50 weeks without accounting for sales calls, marketing, or administrative tasks.",
      howToAvoid: "Assume a realistic billable efficiency ratio of 60%–75% of your total working hours."
    },
    {
      mistake: "Forgetting Self-Employment Taxes",
      whyItHappens: "W-2 employees are accustomed to employers paying half of Medicare and Social Security taxes.",
      howToAvoid: "Set aside at least 25–30% of every client payment into a dedicated quarterly tax reserve account."
    }
  ],
  industryUseCases: [
    {
      industry: "Freelance Software Engineers",
      description: "Calculate project rates when billing clients on a time-and-materials basis for custom web applications.",
      benefit: "Ensures open-source maintenance and professional development time are fully paid for."
    },
    {
      industry: "Designers & Creative Directors",
      description: "Determine baseline hourly rates for branding packages, UI design iterations, and agency sub-contracts.",
      benefit: "Prevents underpricing client retainer packages."
    },
    {
      industry: "Legal & Business Consultants",
      description: "Establish billable advisory rates for corporate consulting, financial audits, and strategy sessions.",
      benefit: "Guarantees high-value advisory hours cover administrative overhead."
    }
  ],
  relatedQuestions: [
    {
      question: "How is a freelance hourly rate calculated?",
      answer: "A freelance hourly rate is calculated by taking your desired annual net take-home salary, adding yearly business operating expenses (software, insurance, equipment), adjusting for your self-employment tax rate, and dividing by your net annual billable hours (total working hours minus unpaid vacation weeks and non-billable administrative time)."
    },
    {
      question: "What percentage of freelance time is actually billable?",
      answer: "On average, full-time freelancers log 60% to 75% of their working time on billable client work (approx. 24–30 hours per 40-hour work week). The remaining 25% to 40% is spent on non-billable business administration, invoicing, marketing, proposals, and client communication."
    }
  ],
  faqs: [
    {
      question: "Why can't I just divide my past employee salary by 2,000 hours?",
      answer: "As an employee, your company paid for health insurance, paid time off, 401(k) matching, hardware, software licenses, and half of your FICA payroll taxes. As a self-employed freelancer, you must cover 100% of these expenses yourself while billing significantly fewer hours per year due to business administration."
    },
    {
      question: "Should I quote hourly rates or fixed project fees to clients?",
      answer: "Use your calculated hourly rate as your baseline internal financial metric. For client proposals, fixed-fee pricing or weekly retainers are generally preferable because they reward efficiency, but fixed quotes should always be based on your minimum hourly rate multiplied by estimated hours plus a 15% scope buffer."
    },
    {
      question: "How often should I raise my freelance hourly rates?",
      answer: "It is recommended to review and adjust your rates every 12 months. Most experienced freelancers increase rates by 10% to 20% annually for new clients while giving existing retainer clients 30 to 60 days advance notice before rate adjustments take effect."
    }
  ],
  relatedToolIds: ['invoice-generator', 'roi-calculator', 'break-even-calculator', 'markup-margin-calculator']
};

export const INVOICE_GENERATOR_SEO: ToolSeoData = {
  overview: {
    whatItDoes: "Generates professional, itemized PDF invoices instantly in your browser with automatic tax calculations, payment terms, and custom currency formatting.",
    whoShouldUseIt: "Freelancers, independent contractors, small business owners, agency operators, and service providers who need clean, legal invoices without paying monthly SaaS subscriptions.",
    whenToUseIt: "Use this tool whenever completing client milestones, finalizing project deliverables, or issuing recurring monthly billing statements.",
    whyItIsUseful: "Creating invoices manually in word processors risks arithmetic errors, missing tax fields, or unprofessional layout shifts. QuickForma formats PDF invoices with print-ready precision."
  },
  howToUse: [
    { stepNumber: 1, title: "Enter Business & Client Details", description: "Fill in sender name, address, tax ID, and client contact details." },
    { stepNumber: 2, title: "Add Line Items", description: "List project items, quantity, hourly rate or unit price." },
    { stepNumber: 3, title: "Apply Tax & Payment Terms", description: "Set sales tax percentages, discount rates, and net 30 payment due dates." },
    { stepNumber: 4, title: "Print or Download PDF", description: "Click Print / Export PDF to download an instant vector-rendered PDF document." }
  ],
  workedExample: {
    title: "Scenario: Monthly Billing for Web Development Project",
    scenarioDescription: "A developer bills a corporate client for 40 hours of frontend development at $120/hr plus a $200 server setup fee, with Net 30 payment terms and 5% sales tax.",
    sampleInputs: [
      { label: "Line Item 1", value: "40 hrs × $120/hr = $4,800" },
      { label: "Line Item 2", value: "1 Setup Fee = $200" },
      { label: "Subtotal", value: "$5,000" },
      { label: "Tax (5%)", value: "$250" }
    ],
    stepsExplanation: [
      "Subtotal = (40 × $120) + $200 = $5,000.00",
      "Sales Tax = $5,000 × 0.05 = $250.00",
      "Total Due = $5,000 + $250 = $5,250.00"
    ],
    finalOutput: { label: "Total Amount Due", value: "$5,250.00" },
    summary: "The generated PDF displays clean line items, subtotal breakdown, tax line, Net 30 payment terms, and payment instructions."
  },
  bestPractices: [
    { title: "Use Unique Invoice Numbers", description: "Maintain a sequential numbering scheme (e.g. INV-2026-001) for seamless bookkeeping." },
    { title: "Specify Due Dates", description: "Always include explicit payment due dates rather than vague 'due upon receipt' notes." },
    { title: "Include Payment Instructions", description: "Provide direct bank account, ACH routing, or wire payment instructions at the bottom of the PDF." }
  ],
  commonMistakes: [
    { mistake: "Missing Invoice Date & Net Terms", whyItHappens: "Forgetting to set a payment due date causes client accounting departments to delay payments indefinitely.", howToAvoid: "Select a standard Net 15 or Net 30 payment term option on every invoice." },
    { mistake: "Omission of Tax ID Number", whyItHappens: "Omitting business tax registration numbers invalidates invoices for corporate accounting audits.", howToAvoid: "Include your EIN or VAT ID in the Sender Info section." }
  ],
  industryUseCases: [
    { industry: "Freelance Developers", description: "Bill clients for milestone deliverables and monthly retainers.", benefit: "Instant PDF generation with zero client data saved to servers." },
    { industry: "Consultants & Marketing Agencies", description: "Issue structured monthly retainer invoices with itemized advisory hours.", benefit: "Professional executive formatting builds client trust." }
  ],
  relatedQuestions: [
    { question: "What elements are legally required on a business invoice?", answer: "A legal business invoice must include the word 'Invoice', a unique invoice identification number, sender and recipient business names and addresses, invoice issue date and payment due date, itemized description of goods/services provided, subtotal, tax amount (if applicable), and total amount due." },
    { question: "What is the difference between Net 15, Net 30, and Net 60 payment terms?", answer: "Net 15, Net 30, or Net 60 indicates the number of calendar days a client has to pay the invoice total after the invoice issue date. Net 30 is the global commercial standard for business-to-business transactions." }
  ],
  faqs: [
    { question: "Is my invoice data stored on QuickForma servers?", answer: "No. QuickForma processes 100% of invoice calculations and PDF rendering locally inside your browser's RAM memory. Your invoices are never uploaded, stored, or viewed by any external server." },
    { question: "Can I print or save the invoice directly to PDF?", answer: "Yes. Click the 'Print / Download PDF' button to open your browser's native print engine, where you can select 'Save as PDF' or send directly to a physical printer." }
  ],
  relatedToolIds: ['payment-receipt', 'freelance-contract', 'nda-generator', 'freelance-hourly-rate']
};

export const PASSWORD_GENERATOR_SEO: ToolSeoData = {
  overview: {
    whatItDoes: "Generates high-entropy, cryptographically secure random passwords using the browser's native Web Crypto API.",
    whoShouldUseIt: "Developers, IT administrators, cybersecurity professionals, and everyday web users looking for uncrackable credentials.",
    whenToUseIt: "Use whenever creating new online accounts, updating database passwords, generating API secret keys, or securing server SSH access.",
    whyItIsUseful: "Human-created passwords rely on predictable patterns (names, dates, simple letter substitutions) that dictionary attack tools crack in seconds. Web Crypto API entropy generates true randomness."
  },
  howToUse: [
    { stepNumber: 1, title: "Select Password Length", description: "Adjust the length slider (16+ characters recommended for maximum security)." },
    { stepNumber: 2, title: "Toggle Character Sets", description: "Include uppercase letters, lowercase letters, numbers, and special symbols." },
    { stepNumber: 3, title: "Check Entropy Strength", description: "Verify entropy bits (65+ bits for strong, 90+ bits for enterprise grade)." },
    { stepNumber: 4, title: "One-Click Copy", description: "Click Copy Password to transfer the credential to your clipboard." }
  ],
  workedExample: {
    title: "Scenario: Generating a 20-Character Database Secret Key",
    scenarioDescription: "A developer requires a 20-character secret key containing uppercase, lowercase, numbers, and special symbols for a database environment variable.",
    sampleInputs: [
      { label: "Password Length", value: "20 Characters" },
      { label: "Character Sets", value: "A-Z, a-z, 0-9, !@#$%" },
      { label: "Calculated Entropy", value: "131 Bits (Enterprise Grade)" }
    ],
    stepsExplanation: [
      "Character Pool Size = 26 (upper) + 26 (lower) + 10 (digits) + 32 (symbols) = 94 possible characters",
      "Entropy = 20 characters × log2(94) = 20 × 6.55 = 131 bits of randomness",
      "Time to crack via brute force at 1 trillion guesses/sec = Over 10^20 years"
    ],
    finalOutput: { label: "Generated Password", value: "k#9Xp$mL2@vR7!wQ5#zT" },
    summary: "The output provides 131 bits of mathematical entropy, rendering brute-force attacks computationally impossible."
  },
  formula: {
    title: "Password Entropy Calculation Logic",
    type: "math",
    explanation: "Password security is measured in bits of entropy, calculated using information theory based on pool size and password length.",
    formulaText: "Entropy (bits) = Length * log2(Character Pool Size)",
    variables: [
      { symbol: "Length", description: "Total number of characters in the password" },
      { symbol: "Character Pool Size", description: "Sum of available character types (e.g. 26 upper + 26 lower + 10 digits + 32 symbols = 94)" }
    ]
  },
  bestPractices: [
    { title: "Use Minimum 16 Characters", description: "Modern GPU brute-force clusters can crack 8-character passwords in minutes regardless of symbols." },
    { title: "Store in Password Manager", description: "Never write passwords in unencrypted text files; use an encrypted password manager like Bitwarden or 1Password." }
  ],
  commonMistakes: [
    { mistake: "Using Dictionary Words", whyItHappens: "Humans substitute 'a' with '@' or 's' with '$', which automated rule-based cracking dictionaries bypass instantly.", howToAvoid: "Generate true random strings via Web Crypto API." }
  ],
  relatedQuestions: [
    { question: "How does the Web Crypto API generate random passwords?", answer: "The Web Crypto API uses the browser's crypto.getRandomValues() method, which hooks directly into hardware-level entropy sources provided by the operating system (such as thermal noise and interrupt timing) to produce cryptographically secure pseudo-random numbers." }
  ],
  faqs: [
    { question: "Are generated passwords sent over the network to QuickForma?", answer: "No. Passwords are generated 100% locally inside your browser's RAM using client-side JavaScript. Zero data is transmitted over the Internet." }
  ],
  relatedToolIds: ['hash-generator', 'base64-encoder-decoder', 'url-encoder-decoder']
};

export const WORD_COUNTER_SEO: ToolSeoData = {
  overview: {
    whatItDoes: "Analyzes text length in real time, calculating total word counts, character counts (with and without spaces), sentence counts, and estimated reading time.",
    whoShouldUseIt: "Writers, students, journalists, SEO content creators, copywriters, and social media managers.",
    whenToUseIt: "Use when drafting essays, Twitter/X posts, meta descriptions, blog articles, or academic submissions with strict length constraints.",
    whyItIsUseful: "Pasting text into heavy desktop word processors is slow. QuickForma provides sub-50ms character and word metrics instantly as you type."
  },
  howToUse: [
    { stepNumber: 1, title: "Type or Paste Text", description: "Input your content into the clean text area." },
    { stepNumber: 2, title: "Instant Metric Update", description: "Watch words, characters, sentences, and reading times update in real time." },
    { stepNumber: 3, title: "One-Click Copy or Clear", description: "Copy your text or clear the editor for your next document." }
  ],
  workedExample: {
    title: "Scenario: Writing an SEO Article & Meta Description",
    scenarioDescription: "A content marketer verifies that a blog paragraph hits 250 words and the meta description stays under 160 characters.",
    sampleInputs: [
      { label: "Text Length", value: "248 Words" },
      { label: "Character Count", value: "1,520 Characters" },
      { label: "Sentence Count", value: "14 Sentences" }
    ],
    stepsExplanation: [
      "Word Count = 248 words (Ideal for long-form section headers)",
      "Estimated Reading Time = 248 / 200 wpm = ~1 minute",
      "Character Count = 1,520 characters"
    ],
    finalOutput: { label: "Estimated Reading Time", value: "~1 minute" },
    summary: "Instant real-time metrics ensure optimal length formatting without manual counting."
  },
  bestPractices: [
    { title: "Target Ideal Reading Speeds", description: "Average adult reading speed is 200–250 words per minute. Use reading time estimates to structure article lengths." }
  ],
  relatedQuestions: [
    { question: "How many words is a 5-minute read?", answer: "At the average reading speed of 200 words per minute (wpm), a 5-minute read is approximately 1,000 words long." }
  ],
  faqs: [
    { question: "Is there a maximum text limit?", answer: "No. QuickForma's client-side text engine can process documents containing over 100,000 words instantly in browser memory." }
  ],
  relatedToolIds: ['lorem-ipsum-generator', 'case-converter', 'seo-slug-generator']
};

export const ROI_CALCULATOR_SEO: ToolSeoData = {
  overview: {
    whatItDoes: "Calculates Net Return on Investment (ROI) percentage, net profit, and annualized rate of return for marketing campaigns, real estate, software investments, and business projects.",
    whoShouldUseIt: "Business owners, marketing executives, real estate investors, startup founders, and financial analysts.",
    whenToUseIt: "Use when evaluating prospective business investments, auditing ad campaign profitability, or presenting financial growth reports.",
    whyItIsUseful: "Focusing solely on top-line revenue without accounting for initial capital investment leads to misleading financial metrics. ROI reveals true capital efficiency."
  },
  howToUse: [
    { stepNumber: 1, title: "Enter Amount Invested", description: "Input initial capital outlay or total campaign cost." },
    { stepNumber: 2, title: "Enter Amount Returned", description: "Input total gross revenue generated from the investment." },
    { stepNumber: 3, title: "Review Net Profit & ROI %", description: "Instantly view net profit dollar amount and percentage return." }
  ],
  workedExample: {
    title: "Scenario: E-Commerce Google Ads Campaign Audit",
    scenarioDescription: "A business spends $10,000 on Google Search Ads over 3 months, generating $28,000 in direct e-commerce sales.",
    sampleInputs: [
      { label: "Initial Investment", value: "$10,000" },
      { label: "Gross Revenue Returned", value: "$28,000" }
    ],
    stepsExplanation: [
      "Net Profit = $28,000 Gross Return - $10,000 Cost = $18,000 Net Profit",
      "ROI Percentage = ($18,000 Net Profit / $10,000 Cost) × 100 = 180% ROI"
    ],
    finalOutput: { label: "Net Return on Investment", value: "180.00% ROI" },
    summary: "The ad campaign generated $1.80 in net profit for every $1.00 spent on advertising."
  },
  formula: {
    title: "Return on Investment (ROI) Formula",
    type: "math",
    explanation: "ROI is calculated by dividing net financial gain by total initial cost.",
    formulaText: "ROI (%) = [(Gross Return - Initial Cost) / Initial Cost] * 100",
    variables: [
      { symbol: "Gross Return", description: "Total revenue or final value derived from investment" },
      { symbol: "Initial Cost", description: "Total initial capital invested or total expense incurred" }
    ]
  },
  bestPractices: [
    { title: "Include All Indirect Costs", description: "Factor in labor, software maintenance, and opportunity cost when calculating initial investment." }
  ],
  commonMistakes: [
    { mistake: "Confusing ROI with Profit Margin", whyItHappens: "Profit margin measures profit as a percentage of total revenue; ROI measures profit as a percentage of cost.", howToAvoid: "Use ROI to evaluate capital efficiency and Profit Margin to evaluate pricing power." }
  ],
  relatedQuestions: [
    { question: "What is considered a good business ROI percentage?", answer: "A good ROI varies by asset class. In general commercial business investments, an annual ROI of 15% to 30% is considered strong, while high-growth digital marketing campaigns often target 100% to 300% ROI." }
  ],
  faqs: [
    { question: "How does ROI differ from Annualized ROI?", answer: "Standard ROI measures total percentage gain regardless of time period. Annualized ROI calculates the compounding yearly rate of return, allowing accurate comparison between short-term 3-month projects and multi-year investments." }
  ],
  relatedToolIds: ['break-even-calculator', 'markup-margin-calculator', 'cpm-calculator']
};

export const QR_CODE_GENERATOR_SEO: ToolSeoData = {
  overview: {
    whatItDoes: "Generates high-resolution Quick Response (QR) codes for website URLs, contact info, Wi-Fi networks, and plain text with instant PNG/SVG vector download.",
    whoShouldUseIt: "Marketers, restaurant owners, event organizers, business card designers, and retail managers.",
    whenToUseIt: "Use when creating physical marketing materials, restaurant digital menus, conference badges, or product packaging.",
    whyItIsUseful: "Many online QR generators charge monthly subscriptions or redirect links through third-party servers. QuickForma QR codes are 100% static, free forever, and never expire."
  },
  howToUse: [
    { stepNumber: 1, title: "Enter Content or URL", description: "Type destination website address, phone number, or text message." },
    { stepNumber: 2, title: "Preview Code", description: "View the live crisp vector QR code preview." },
    { stepNumber: 3, title: "Download Image", description: "Click Download PNG to save your print-ready QR code." }
  ],
  workedExample: {
    title: "Scenario: Restaurant Digital Contactless Menu QR Code",
    scenarioDescription: "A restaurant owner generates a static QR code linking to `https://example.com/menu.pdf` to print on table tents.",
    sampleInputs: [
      { label: "Destination URL", value: "https://example.com/menu.pdf" },
      { label: "Error Correction Level", value: "Medium (15% recovery)" }
    ],
    stepsExplanation: [
      "Encodes destination URL into binary QR matrix",
      "Adds Reed-Solomon error correction data to allow scanning even if partially damaged",
      "Renders crisp scalable Canvas barcode graphic"
    ],
    finalOutput: { label: "Code Status", value: "Static & Permanent (No Expiration)" },
    summary: "The generated QR code links directly to the menu URL without third-party redirects."
  },
  bestPractices: [
    { title: "Test Scan Before Printing", description: "Always scan printed QR code proofs with iOS and Android cameras before executing mass print runs." },
    { title: "Maintain Contrast Ratio", description: "Ensure high contrast between dark foreground modules and light background canvas." }
  ],
  relatedQuestions: [
    { question: "Do static QR codes created on QuickForma expire?", answer: "No. QuickForma generates static QR codes that encode the destination data directly into the graphic matrix. Because there are no intermediate server redirects, static QR codes never expire and work indefinitely." }
  ],
  faqs: [
    { question: "Is there a limit on how many QR codes I can download?", answer: "No. You can generate and download unlimited high-resolution PNG QR codes with zero limits." }
  ],
  relatedToolIds: ['barcode-generator', 'url-encoder-decoder', 'color-picker-converter']
};
