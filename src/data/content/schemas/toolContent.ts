/**
 * QuickForma Tool Page Content Schema (Phase 1 Specification)
 * Strictly typed content model powering the frozen 10-section tool page layout.
 */

// ===========================================================================
// SECTION 2: AT A GLANCE
// ===========================================================================
export interface ToolAtAGlance {
  /** Target practitioner role (e.g., "Freelance consultants, agency owners") (5–100 chars) */
  bestFor: string;
  /** Estimated execution/interaction duration (e.g., "Under 1 minute", "2–4 minutes") */
  timeRequired: string;
  /** Summary of primary inputs required from the user */
  primaryInputsSummary: string;
  /** Primary output format produced (optional: e.g. "Hourly Billing Rate ($/hr)", "Downloadable PDF", "Decoded JSON Claims") */
  primaryOutputType?: string;
}

// ===========================================================================
// SECTION 3: QUICK OVERVIEW (The 4 Quadrants + Commercial Context)
// ===========================================================================
export interface ToolQuickOverview {
  /** Core functional definition. Imperative, factual, zero marketing fluff. */
  whatItDoes: string;
  /** Specific business role, team function, or organizational scale */
  whoItsFor: string;
  /** Operational, accounting, or technical trigger for using the tool */
  whenToUse: string;
  /** Concrete commercial risk mitigated or operational benefit gained */
  whyItMatters: string;
  /** Real-world business context or dilemma motivating this operation */
  commercialContext: string;
}

// ===========================================================================
// SECTION 4: KEY FEATURES (Flexible: 2 to 6 items)
// ===========================================================================
export interface ToolFeatureItem {
  /** Concise feature name verified against UI */
  title: string;
  /** Concrete technical capability */
  description: string;
  /** Lucide icon identifier matching capability */
  iconName: string;
}

// ===========================================================================
// SECTION 5: HOW TO USE (Flexible: 2 to 6 actionable steps)
// ===========================================================================
export interface ToolWorkflowStep {
  stepNumber: number;
  /** Imperative title matching UI action */
  title: string;
  /** Concrete instruction identifying specific inputs, dropdowns, or controls */
  instruction: string;
  /** Practical data-gathering or operational advice (optional) */
  tip?: string;
}

// ===========================================================================
// SECTION 6: WORKED EXAMPLE (Discriminated Union across 7 Tool Families)
// ===========================================================================

/** 1. Quantitative & Mathematical Calculators */
export interface NumericCalculationExample {
  type: "calculation";
  scenarioName: string;
  contextDescription: string;
  inputs: Array<{
    fieldLabel: string;
    inputValue: string;
    rationale?: string;
  }>;
  calculationSteps: Array<{
    step: number;
    explanation: string;
    arithmetic: string;
  }>;
  primaryResult: {
    label: string;
    value: string;
  };
  secondaryResults?: Array<{ label: string; value: string }>;
  evaluationCard?: {
    typicalBenchmark?: string;
    goodVsSuboptimal?: string;
  };
  interpretation: string;
}

/** 2. Unit, Currency & Metric Converters */
export interface ConversionExample {
  type: "conversion";
  scenarioName: string;
  contextDescription: string;
  source: {
    quantity: number | string;
    unitName: string;
    unitSymbol?: string;
  };
  target: {
    quantity: number | string;
    unitName: string;
    unitSymbol?: string;
  };
  conversionFactor: string;
  conversionFormula?: string;
  precision?: number;
  bidirectional?: boolean;
  interpretation: string;
}

/** 3. Code, Syntax & Transformation Tools */
export interface TransformationExample {
  type: "transformation";
  scenarioName: string;
  contextDescription: string;
  inputPayload: {
    label: string;
    sampleData: string;
  };
  transformationRule: string;
  outputPayload: {
    label: string;
    sampleData: string;
  };
  validationSummary?: string;
  interpretation: string;
}

/** 4. Document, Invoice & Agreement Generators */
export interface DocumentExample {
  type: "document";
  scenarioName: string;
  contextDescription: string;
  configuredFields: Array<{ fieldLabel: string; selectedOptionOrText: string }>;
  generatedDocumentSummary: {
    documentTitle: string;
    includedClauses: string[];
    exportFormats: string[];
  };
  interpretation: string;
}

/** 5. Qualitative, Matrix & Decision Analyzers */
export interface AnalysisMatrixExample {
  type: "analysis_matrix";
  scenarioName: string;
  contextDescription: string;
  matrixDimensions: Array<{
    category: string;
    items: string[];
  }>;
  evaluationCriteria?: string;
  synthesisResult: {
    summaryOutcome: string;
    recommendedAction: string;
  };
  interpretation: string;
}

/** 6. Reference, Lookup & State Converters */
export interface ReferenceLookupExample {
  type: "reference_lookup";
  scenarioName: string;
  contextDescription: string;
  queryInput: {
    label: string;
    value: string;
  };
  resolvedReference: {
    standardName: string;
    properties: Array<{ property: string; value: string }>;
  };
  interpretation: string;
}

/** 7. Diagnostic, Syntax Validation & Compliance Auditors */
export type DiagnosticSeverity = "pass" | "fail" | "warning" | "info";
export type DiagnosticAggregateStatus = "pass" | "fail" | "warning" | "mixed" | "informational";

export interface DiagnosticFinding {
  ruleName: string;
  severity: DiagnosticSeverity;
  message: string;
}

export interface DiagnosticAuditExample {
  type: "diagnostic_audit";
  scenarioName: string;
  contextDescription: string;
  targetSubject: {
    label: string;
    inputData: string;
  };
  aggregateStatus: DiagnosticAggregateStatus;
  findings: DiagnosticFinding[];
  summaryMetrics?: Array<{ label: string; value: string }>;
  remediationAdvice?: string;
  interpretation: string;
}

export type ToolWorkedExample =
  | NumericCalculationExample
  | ConversionExample
  | TransformationExample
  | DocumentExample
  | AnalysisMatrixExample
  | ReferenceLookupExample
  | DiagnosticAuditExample;

// ===========================================================================
// SECTION 7: HOW IT WORKS / METHODOLOGY, FORMULAS & STANDARDS
// ===========================================================================

export interface ToolEdgeCase {
  condition: string;
  handlingBehavior: string;
}

export interface ToolTimeSensitivity {
  jurisdiction?: string;
  statutoryOrPricingSchedule?: string;
  lastVerifiedDate: string;
}

export interface ToolHowItWorks {
  /** Methodological foundation: concise and factual (minimum 20 chars, no arbitrary ceiling) */
  methodologyOverview: string;

  /** Mathematical formula — Conditional: for quantitative calculation tools */
  formulaDisplay?: {
    expression: string;
    variables: Array<{ symbol: string; label: string; unit?: string }>;
  };

  /** Algorithmic execution sequence — Conditional: for multi-step or iterative logic */
  algorithmicSteps?: Array<{ stepNumber: number; title: string; logicDescription: string }>;

  /** Formal standard reference — Conditional: for RFC, ISO, W3C, or tax standards */
  standardsReference?: {
    standardBody: string;
    identifier: string;
    summary: string;
  };

  /** Deterministic mapping rules — Conditional: for state and dictionary lookups */
  mappingRules?: Array<{ triggerInput: string; mappedOutput: string; technicalNote?: string }>;

  /** Edge cases & failure modes — Conditional: boundaries, zero-states, overflows */
  edgeCases?: ToolEdgeCase[];

  /** Time-sensitivity & pricing schedules — Conditional: tax year, marketplace fee schedule */
  timeSensitivity?: ToolTimeSensitivity;

  /** Real-world assumptions (optional; empty if none apply) */
  assumptions?: string[];

  /** Practical technical or statutory limitations (optional; empty if none apply) */
  limitations?: string[];
}

// ===========================================================================
// SECTION 8: FREQUENTLY ASKED QUESTIONS (Flexible: 2 to 7 items)
// ===========================================================================
export interface ToolFaqItem {
  question: string;
  answer: string;
}

// ===========================================================================
// SECTION 9: RELATED TOOLS (Flexible: 1 to 5 valid references)
// ===========================================================================
export interface ToolRelatedReference {
  toolId: string;
  workflowRationale: string;
}

// ===========================================================================
// MASTER TOOL CONTENT INTERFACE
// ===========================================================================
export interface ToolContent {
  toolId: string;
  contentVersion: string;
  lastAudited: string | null;

  atAGlance: ToolAtAGlance;
  overview: ToolQuickOverview;
  features: ToolFeatureItem[];
  howToUse: {
    steps: ToolWorkflowStep[];
  };
  workedExample: ToolWorkedExample;
  howItWorks: ToolHowItWorks;
  faqs: ToolFaqItem[];
  relatedTools: ToolRelatedReference[];
}
