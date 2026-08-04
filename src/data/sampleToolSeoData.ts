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
