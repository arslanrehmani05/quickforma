import { describe, it, expect } from "vitest";
import { ToolContentZodSchema } from "../../src/data/content/schemas/toolContent.zod";

describe("ToolContent Zod Schema & Semantic Invariants", () => {
  const createBaseTool = (workedExample: any) => ({
    toolId: "freelance-hourly-rate-calculator",
    contentVersion: "1.0.0",
    lastAudited: "2026-02-28",
    atAGlance: {
      bestFor: "Freelance consultants, contractors, agency founders",
      timeRequired: "1–2 minutes",
      primaryInputsSummary: "Annual net income target, overhead expenses, billable weeks/hours",
    },
    overview: {
      whatItDoes: "Calculates the minimum billable hourly rate needed to achieve target net income after business expenses and taxes.",
      whoItsFor: "Independent contractors, consultants, and sole proprietors setting service pricing.",
      whenToUse: "Prior to negotiating new client contracts, setting annual retainer rates, or transitioning to freelance.",
      whyItMatters: "Prevents undercharging by accounting for non-billable administrative hours and statutory self-employment taxes.",
      commercialContext: "Many solo practitioners divide desired salary by 2,080 hours, failing to account for vacation and non-billable time.",
    },
    features: [
      {
        title: "Billable Utilization Factoring",
        description: "Separates total work hours from billable hours to account for marketing, invoicing, and business development.",
        iconName: "Clock",
      },
      {
        title: "Overhead Cost Recovery",
        description: "Amortizes software subscriptions, equipment depreciation, and health insurance across billable hours.",
        iconName: "DollarSign",
      },
    ],
    howToUse: {
      steps: [
        {
          stepNumber: 1,
          title: "Define Target Net Annual Income",
          instruction: "Enter the take-home compensation you need to cover personal expenses and savings.",
        },
        {
          stepNumber: 2,
          title: "List Annual Business Overhead",
          instruction: "Sum recurring software, legal, accounting, insurance, and equipment costs.",
        },
      ],
    },
    workedExample,
    howItWorks: {
      methodologyOverview: "Calculates total required gross revenue by summing target income, taxes, and expenses, then divides by billable hours.",
      formulaDisplay: {
        expression: "Hourly Rate = (Target Net Income + Taxes + Overhead) / (Billable Weeks × Billable Hours/Week)",
        variables: [
          { symbol: "Overhead", label: "Annual business operating costs", unit: "$" },
          { symbol: "Hours", label: "Annual realized billable hours", unit: "hrs" },
        ],
      },
      assumptions: [
        "Unbillable hours (invoicing, admin, marketing) average 25-35% of total working time.",
      ],
      limitations: [
        "Does not account for local municipal business privilege taxes or state-specific gross receipts taxes.",
      ],
    },
    faqs: [
      {
        question: "How many billable hours per week are realistic for a freelancer?",
        answer: "Most full-time solo contractors realistically sustain 20 to 28 billable hours per week, with the remainder dedicated to admin and sales.",
      },
      {
        question: "Should I include business taxes in my hourly calculation?",
        answer: "Yes. Self-employed individuals must cover employer and employee halves of FICA (15.3% in the US) plus state and federal income taxes.",
      },
    ],
    relatedTools: [
      {
        toolId: "oee-calculator",
        workflowRationale: "Use OEE to measure personal operational capacity and utilization rates.",
      },
    ],
  });

  const calculationExample = {
    type: "calculation" as const,
    scenarioName: "Senior UX Consultant Rate Determination",
    contextDescription: "A solo design consultant targeting $120,000 net income with $18,000 annual overhead.",
    inputs: [
      { fieldLabel: "Target Net Annual Income", inputValue: "$120,000" },
      { fieldLabel: "Annual Operating Expenses", inputValue: "$18,000" },
      { fieldLabel: "Billable Weeks per Year", inputValue: "48 weeks" },
      { fieldLabel: "Billable Hours per Week", inputValue: "30 hours" },
    ],
    calculationSteps: [
      { step: 1, explanation: "Calculate annual billable hours", arithmetic: "48 weeks × 30 hours = 1,440 hours" },
      { step: 2, explanation: "Calculate required gross revenue", arithmetic: "$120,000 + $18,000 + $35,000 taxes = $173,000" },
      { step: 3, explanation: "Divide revenue by billable hours", arithmetic: "$173,000 / 1,440 = $120.14" },
    ],
    primaryResult: { label: "Minimum Target Hourly Rate", value: "$125.00 / hr" },
    interpretation: "Quoting below $125/hr will cause a shortfall in retirement savings or unpaid overhead.",
  };

  it("successfully parses valid ToolContent with calculation example", () => {
    const data = createBaseTool(calculationExample);
    expect(() => ToolContentZodSchema.parse(data)).not.toThrow();
  });

  it("successfully parses valid ToolContent with transformation example", () => {
    const transformationExample = {
      type: "transformation" as const,
      scenarioName: "OAuth2 Bearer Token Claims Inspection",
      contextDescription: "Extracting user roles and expiration timestamps from an API gateway access token.",
      inputPayload: {
        label: "Raw JWT String",
        sampleData: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImFkbWluIn0.s",
      },
      transformationRule: "RFC 7519 Base64Url decode header and payload JSON chunks",
      outputPayload: {
        label: "Decoded JSON Claims",
        sampleData: '{"sub": "1234567890", "role": "admin"}',
      },
      validationSummary: "Header valid, signature algorithm HS256, payload valid JSON",
      interpretation: "The subject contains admin privileges and remains unexpired.",
    };
    const data = createBaseTool(transformationExample);
    expect(() => ToolContentZodSchema.parse(data)).not.toThrow();
  });

  it("successfully parses valid ToolContent with document example", () => {
    const documentExample = {
      type: "document" as const,
      scenarioName: "International B2B Freight Invoice",
      contextDescription: "Issuing a commercial invoice for 500 units of manufacturing components.",
      configuredFields: [
        { fieldLabel: "Payment Terms", selectedOptionOrText: "Net 30 Days" },
        { fieldLabel: "Currency", selectedOptionOrText: "USD ($)" },
      ],
      generatedDocumentSummary: {
        documentTitle: "Commercial Invoice #2026-084",
        includedClauses: ["Payment Due within 30 Days", "Late Fee of 1.5% Per Month"],
        exportFormats: ["PDF", "Printable View"],
      },
      interpretation: "Invoice is valid for international customs clearance and billing.",
    };
    const data = createBaseTool(documentExample);
    expect(() => ToolContentZodSchema.parse(data)).not.toThrow();
  });

  it("successfully parses valid ToolContent with analysis_matrix example", () => {
    const matrixExample = {
      type: "analysis_matrix" as const,
      scenarioName: "Industrial Warehouse Cap Rate Yield Sensitivity",
      contextDescription: "Evaluating building valuation against shifting terminal capitalization rates.",
      matrixDimensions: [
        { category: "Compressed Yield (5.5%)", items: ["Valuation: $2,545,455", "Equity Multiple: 2.1x"] },
        { category: "Baseline Yield (6.0%)", items: ["Valuation: $2,333,333", "Equity Multiple: 1.8x"] },
      ],
      synthesisResult: {
        summaryOutcome: "A 50 bps cap rate expansion reduces building value by $179,487.",
        recommendedAction: "Structure debt with at least 1.35x DSCR buffer.",
      },
      interpretation: "Sensitivity analysis shows robust equity protection down to 6.75% cap rate.",
    };
    const data = createBaseTool(matrixExample);
    expect(() => ToolContentZodSchema.parse(data)).not.toThrow();
  });

  it("successfully parses valid ToolContent with reference_lookup example", () => {
    const lookupExample = {
      type: "reference_lookup" as const,
      scenarioName: "Web Server Shell Script Execution Permissions",
      contextDescription: "Assigning file modes for an automated deployment script.",
      queryInput: { label: "Octal Mode Notation", value: "755" },
      resolvedReference: {
        standardName: "POSIX File Permission Bits",
        properties: [
          { property: "Owner Permission", value: "Read, Write, Execute (rwx)" },
          { property: "Group Permission", value: "Read, Execute (r-x)" },
          { property: "Others Permission", value: "Read, Execute (r-x)" },
        ],
      },
      interpretation: "Mode 755 allows web workers to execute the script without granting write access to public users.",
    };
    const data = createBaseTool(lookupExample);
    expect(() => ToolContentZodSchema.parse(data)).not.toThrow();
  });

  it("enforces sequential step numbering starting at 1", () => {
    const data = createBaseTool(calculationExample);
    data.howToUse.steps = [
      { stepNumber: 1, title: "Step One", instruction: "Do the first operation." },
      { stepNumber: 3, title: "Step Three", instruction: "Skip step two." }, // Non-sequential
    ];

    expect(() => ToolContentZodSchema.parse(data)).toThrow(
      /Workflow steps must be sequential integers starting at 1/
    );
  });

  it("rejects self-referencing related tools", () => {
    const data = createBaseTool(calculationExample);
    data.relatedTools = [
      { toolId: "freelance-hourly-rate-calculator", workflowRationale: "Self link" }, // Self reference
    ];

    expect(() => ToolContentZodSchema.parse(data)).toThrow(
      /A tool cannot reference its own toolId in relatedTools/
    );
  });

  it("rejects duplicate related tool IDs", () => {
    const data = createBaseTool(calculationExample);
    data.relatedTools = [
      { toolId: "oee-calculator", workflowRationale: "First link" },
      { toolId: "oee-calculator", workflowRationale: "Duplicate link" },
    ];

    expect(() => ToolContentZodSchema.parse(data)).toThrow(
      /relatedTools must contain unique tool IDs/
    );
  });

  it("rejects invalid calendar dates like 2026-02-30", () => {
    const data = createBaseTool(calculationExample);
    data.lastAudited = "2026-02-30"; // Non-existent date

    expect(() => ToolContentZodSchema.parse(data)).toThrow(
      /lastAudited must be null or a valid calendar date/
    );
  });

  it("accepts null for lastAudited when unreviewed", () => {
    const data = createBaseTool(calculationExample);
    data.lastAudited = null;
    expect(() => ToolContentZodSchema.parse(data)).not.toThrow();
  });

  it("successfully parses valid ToolContent with conversion example, primaryOutputType, edgeCases, and timeSensitivity", () => {
    const conversionExample = {
      type: "conversion" as const,
      scenarioName: "Metric to Imperial Volumetric Capacity Conversion",
      contextDescription: "Translating international logistics container dimensions from cubic meters to cubic feet.",
      source: {
        quantity: 25.5,
        unitName: "Cubic Meters",
        unitSymbol: "m³",
      },
      target: {
        quantity: 900.524,
        unitName: "Cubic Feet",
        unitSymbol: "ft³",
      },
      conversionFactor: "1 m³ = 35.3146667 ft³",
      conversionFormula: "ft³ = m³ × 35.3146667",
      precision: 3,
      bidirectional: true,
      interpretation: "25.5 cubic meters occupies approximately 900.5 cubic feet of freight storage space.",
    };

    const data = createBaseTool(conversionExample);
    data.atAGlance.primaryOutputType = "Calculated Volumetric Equivalent (ft³)";
    data.howItWorks.edgeCases = [
      {
        condition: "Zero or negative volumetric input",
        handlingBehavior: "Clamps to zero and issues a non-blocking input validation warning.",
      },
    ];
    data.howItWorks.timeSensitivity = {
      jurisdiction: "International Freight / ISO",
      statutoryOrPricingSchedule: "2026 Dimensional Weight Freight Rulebook",
      lastVerifiedDate: "2026-03-01",
    };

    expect(() => ToolContentZodSchema.parse(data)).not.toThrow();
  });

  it("rejects invalid calendar dates inside timeSensitivity.lastVerifiedDate", () => {
    const data = createBaseTool(calculationExample);
    data.howItWorks.timeSensitivity = {
      lastVerifiedDate: "2026-02-30", // Invalid date
    };

    expect(() => ToolContentZodSchema.parse(data)).toThrow(
      /lastVerifiedDate must be a valid calendar date/
    );
  });

  it("enforces flexible array bounds (rejects < 2 features, rejects > 6 features)", () => {
    const data = createBaseTool(calculationExample);

    // 1 feature (below minimum 2)
    data.features = [
      { title: "Single Feature", description: "Only one capability provided.", iconName: "Star" },
    ];
    expect(() => ToolContentZodSchema.parse(data)).toThrow();

    // 7 features (above maximum 6)
    data.features = Array(7).fill({
      title: "Feature Item",
      description: "A valid capability description.",
      iconName: "Star",
    });
    expect(() => ToolContentZodSchema.parse(data)).toThrow();
  });
});
