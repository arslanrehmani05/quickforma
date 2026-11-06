/**
 * QuickForma Tool Page Runtime Zod Schemas
 * Concrete runtime contracts and semantic invariants for ToolContent.
 */

import { z } from "zod";
import { DiagnosticAggregateStatus, DiagnosticSeverity } from "./toolContent";

// ===========================================================================
// HELPER VALIDATORS
// ===========================================================================

/**
 * Validates that a string is a real calendar date in YYYY-MM-DD format (not just format-valid).
 * e.g., '2026-02-31' returns false.
 */
export const isValidCalendarDate = (val: string | null): boolean => {
  if (val === null) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) return false;
  const [year, month, day] = val.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

/**
 * Exhaustive, deterministic truth-table function mapping every non-empty subset
 * of finding severities to exactly ONE valid aggregate status.
 *
 * Rules:
 * 1. Pure info ({info}) -> "informational"
 * 2. Pure pass ({pass}, {pass, info}) -> "pass"
 * 3. Pure warning ({warning}, {warning, info}) -> "warning"
 * 4. Pure fail ({fail}, {fail, info}) -> "fail"
 * 5. Mixed substantive severities (any combination containing >=2 of {pass, warning, fail}) -> "mixed"
 */
export const getDeterministicAggregateStatus = (
  severities: Set<DiagnosticSeverity>
): DiagnosticAggregateStatus => {
  const hasPass = severities.has("pass");
  const hasFail = severities.has("fail");
  const hasWarning = severities.has("warning");
  const hasInfo = severities.has("info");

  const substantiveCount = (hasPass ? 1 : 0) + (hasFail ? 1 : 0) + (hasWarning ? 1 : 0);

  // 1. Mixed: more than one substantive severity present
  if (substantiveCount > 1) {
    return "mixed";
  }

  // 2. Pure fail (with or without info)
  if (hasFail) {
    return "fail";
  }

  // 3. Pure warning (with or without info)
  if (hasWarning) {
    return "warning";
  }

  // 4. Pure pass (with or without info)
  if (hasPass) {
    return "pass";
  }

  // 5. Pure info
  if (hasInfo) {
    return "informational";
  }

  return "informational";
};

// ===========================================================================
// SECTION SCHEMAS
// ===========================================================================

export const ToolAtAGlanceZodSchema = z.object({
  bestFor: z.string().min(5).max(100),
  timeRequired: z.string().min(3).max(50),
  primaryInputsSummary: z.string().min(5).max(150),
  primaryOutputType: z.string().min(2).max(100).optional(),
});

export const ToolQuickOverviewZodSchema = z.object({
  whatItDoes: z.string().min(50).max(450),
  whoItsFor: z.string().min(20).max(250),
  whenToUse: z.string().min(20).max(250),
  whyItMatters: z.string().min(20).max(300),
  commercialContext: z.string().min(50).max(500),
});

export const ToolFeatureItemZodSchema = z.object({
  title: z.string().min(3).max(80),
  description: z.string().min(20).max(250),
  iconName: z.string().min(1),
});

export const ToolWorkflowStepZodSchema = z.object({
  stepNumber: z.number().int().positive(),
  title: z.string().min(3).max(80),
  instruction: z.string().min(15).max(300),
  tip: z.string().max(250).optional(),
});

// ===========================================================================
// SECTION 6: WORKED EXAMPLE VARIANTS
// ===========================================================================

export const NumericCalculationExampleZodSchema = z.object({
  type: z.literal("calculation"),
  scenarioName: z.string().min(3).max(100),
  contextDescription: z.string().min(20).max(400),
  inputs: z.array(z.object({
    fieldLabel: z.string().min(1).max(80),
    inputValue: z.string().min(1).max(80),
    rationale: z.string().max(200).optional(),
  })).min(1),
  calculationSteps: z.array(z.object({
    step: z.number().int().positive(),
    explanation: z.string().min(1).max(250),
    arithmetic: z.string().min(1).max(250),
  })).min(1),
  primaryResult: z.object({
    label: z.string().min(1).max(80),
    value: z.string().min(1).max(80),
  }),
  secondaryResults: z.array(z.object({
    label: z.string().min(1).max(80),
    value: z.string().min(1).max(80),
  })).optional(),
  evaluationCard: z.object({
    typicalBenchmark: z.string().max(250).optional(),
    goodVsSuboptimal: z.string().max(250).optional(),
  }).optional(),
  interpretation: z.string().min(20).max(400),
});

export const ConversionExampleZodSchema = z.object({
  type: z.literal("conversion"),
  scenarioName: z.string().min(3).max(100),
  contextDescription: z.string().min(20).max(400),
  source: z.object({
    quantity: z.union([z.number(), z.string().min(1).max(80)]),
    unitName: z.string().min(1).max(80),
    unitSymbol: z.string().max(20).optional(),
  }),
  target: z.object({
    quantity: z.union([z.number(), z.string().min(1).max(80)]),
    unitName: z.string().min(1).max(80),
    unitSymbol: z.string().max(20).optional(),
  }),
  conversionFactor: z.string().min(1).max(150),
  conversionFormula: z.string().max(200).optional(),
  precision: z.number().int().min(0).max(12).optional(),
  bidirectional: z.boolean().optional(),
  interpretation: z.string().min(20).max(400),
});

export const TransformationExampleZodSchema = z.object({
  type: z.literal("transformation"),
  scenarioName: z.string().min(3).max(100),
  contextDescription: z.string().min(20).max(400),
  inputPayload: z.object({
    label: z.string().min(1).max(80),
    sampleData: z.string().min(1),
  }),
  transformationRule: z.string().min(1).max(250),
  outputPayload: z.object({
    label: z.string().min(1).max(80),
    sampleData: z.string().min(1),
  }),
  validationSummary: z.string().max(200).optional(),
  interpretation: z.string().min(20).max(400),
});

export const DocumentExampleZodSchema = z.object({
  type: z.literal("document"),
  scenarioName: z.string().min(3).max(100),
  contextDescription: z.string().min(20).max(400),
  configuredFields: z.array(z.object({
    fieldLabel: z.string().min(1).max(80),
    selectedOptionOrText: z.string().min(1).max(200),
  })).min(1),
  generatedDocumentSummary: z.object({
    documentTitle: z.string().min(1).max(100),
    includedClauses: z.array(z.string().min(1)).min(1),
    exportFormats: z.array(z.string().min(1)).min(1),
  }),
  interpretation: z.string().min(20).max(400),
});

export const AnalysisMatrixExampleZodSchema = z.object({
  type: z.literal("analysis_matrix"),
  scenarioName: z.string().min(3).max(100),
  contextDescription: z.string().min(20).max(400),
  matrixDimensions: z.array(z.object({
    category: z.string().min(1).max(80),
    items: z.array(z.string().min(1)).min(1),
  })).min(2),
  evaluationCriteria: z.string().max(250).optional(),
  synthesisResult: z.object({
    summaryOutcome: z.string().min(1).max(250),
    recommendedAction: z.string().min(1).max(250),
  }),
  interpretation: z.string().min(20).max(400),
});

export const ReferenceLookupExampleZodSchema = z.object({
  type: z.literal("reference_lookup"),
  scenarioName: z.string().min(3).max(100),
  contextDescription: z.string().min(20).max(400),
  queryInput: z.object({
    label: z.string().min(1).max(80),
    value: z.string().min(1).max(100),
  }),
  resolvedReference: z.object({
    standardName: z.string().min(1).max(100),
    properties: z.array(z.object({
      property: z.string().min(1).max(80),
      value: z.string().min(1).max(200),
    })).min(1),
  }),
  interpretation: z.string().min(20).max(400),
});

export const DiagnosticFindingZodSchema = z.object({
  ruleName: z.string().min(1).max(80),
  severity: z.enum(["pass", "fail", "warning", "info"]),
  message: z.string().min(1).max(250),
});

// Base ZodObject without .refine() to allow direct consumption in z.discriminatedUnion
export const DiagnosticAuditBaseZodSchema = z.object({
  type: z.literal("diagnostic_audit"),
  scenarioName: z.string().min(3).max(100),
  contextDescription: z.string().min(20).max(400),
  targetSubject: z.object({
    label: z.string().min(1).max(80),
    inputData: z.string().min(1),
  }),
  aggregateStatus: z.enum(["pass", "fail", "warning", "mixed", "informational"]),
  findings: z.array(DiagnosticFindingZodSchema).min(1),
  summaryMetrics: z.array(z.object({
    label: z.string().min(1).max(80),
    value: z.string().min(1).max(80),
  })).optional(),
  remediationAdvice: z.string().min(10).max(300).optional(),
  interpretation: z.string().min(20).max(400),
});

// Refined Diagnostic Audit Schema with semantic invariants
export const DiagnosticAuditExampleZodSchema = DiagnosticAuditBaseZodSchema
  .refine(data => {
    const severities = new Set<DiagnosticSeverity>(data.findings.map(f => f.severity));
    const expectedStatus = getDeterministicAggregateStatus(severities);
    return data.aggregateStatus === expectedStatus;
  }, {
    message: "aggregateStatus must match the exact deterministic status dictated by finding severities.",
    path: ["aggregateStatus"],
  })
  .refine(data => {
    const hasFailOrWarning = data.findings.some(f => f.severity === "fail" || f.severity === "warning");
    if (hasFailOrWarning && (!data.remediationAdvice || data.remediationAdvice.trim().length === 0)) {
      return false;
    }
    return true;
  }, {
    message: "remediationAdvice is required when findings contain 'fail' or 'warning'.",
    path: ["remediationAdvice"],
  });

// Base discriminated union over pure ZodObject shapes
export const ToolWorkedExampleBaseZodSchema = z.discriminatedUnion("type", [
  NumericCalculationExampleZodSchema,
  ConversionExampleZodSchema,
  TransformationExampleZodSchema,
  DocumentExampleZodSchema,
  AnalysisMatrixExampleZodSchema,
  ReferenceLookupExampleZodSchema,
  DiagnosticAuditBaseZodSchema,
]);

// Final ToolWorkedExample schema with semantic refinements applied
export const ToolWorkedExampleZodSchema = ToolWorkedExampleBaseZodSchema
  .refine(data => {
    if (data.type === "diagnostic_audit") {
      const severities = new Set<DiagnosticSeverity>(data.findings.map(f => f.severity));
      const expectedStatus = getDeterministicAggregateStatus(severities);
      return data.aggregateStatus === expectedStatus;
    }
    return true;
  }, {
    message: "aggregateStatus must match the exact deterministic status dictated by finding severities.",
    path: ["aggregateStatus"],
  })
  .refine(data => {
    if (data.type === "diagnostic_audit") {
      const hasFailOrWarning = data.findings.some(f => f.severity === "fail" || f.severity === "warning");
      if (hasFailOrWarning && (!data.remediationAdvice || data.remediationAdvice.trim().length === 0)) {
        return false;
      }
    }
    return true;
  }, {
    message: "remediationAdvice is required when findings contain 'fail' or 'warning'.",
    path: ["remediationAdvice"],
  });

// ===========================================================================
// SECTION 7: METHODOLOGY SCHEMAS
// ===========================================================================

export const FormulaDisplayZodSchema = z.object({
  expression: z.string().min(1).max(250),
  variables: z.array(z.object({
    symbol: z.string().min(1).max(20),
    label: z.string().min(1).max(80),
    unit: z.string().max(30).optional(),
  })).min(1),
});

export const AlgorithmicStepZodSchema = z.object({
  stepNumber: z.number().int().positive(),
  title: z.string().min(1).max(80),
  logicDescription: z.string().min(1).max(250),
});

export const StandardsReferenceZodSchema = z.object({
  standardBody: z.string().min(1).max(50),
  identifier: z.string().min(1).max(50),
  summary: z.string().min(1).max(250),
});

export const MappingRuleZodSchema = z.object({
  triggerInput: z.string().min(1).max(80),
  mappedOutput: z.string().min(1).max(120),
  technicalNote: z.string().max(200).optional(),
});

export const ToolEdgeCaseZodSchema = z.object({
  condition: z.string().min(1).max(150),
  handlingBehavior: z.string().min(1).max(250),
});

export const ToolTimeSensitivityZodSchema = z.object({
  jurisdiction: z.string().max(80).optional(),
  statutoryOrPricingSchedule: z.string().max(120).optional(),
  lastVerifiedDate: z.string().refine(isValidCalendarDate, {
    message: "lastVerifiedDate must be a valid calendar date in YYYY-MM-DD format.",
  }),
});

export const ToolHowItWorksZodSchema = z.object({
  methodologyOverview: z.string().min(20), // Direct, meaningful; no arbitrary upper ceiling
  formulaDisplay: FormulaDisplayZodSchema.optional(),
  algorithmicSteps: z.array(AlgorithmicStepZodSchema).optional(),
  standardsReference: StandardsReferenceZodSchema.optional(),
  mappingRules: z.array(MappingRuleZodSchema).optional(),
  edgeCases: z.array(ToolEdgeCaseZodSchema).optional(),
  timeSensitivity: ToolTimeSensitivityZodSchema.optional(),
  assumptions: z.array(z.string().min(1)).optional(),
  limitations: z.array(z.string().min(1)).optional(),
});

// ===========================================================================
// SECTIONS 8 & 9: FAQS & RELATED TOOLS
// ===========================================================================

export const ToolFaqItemZodSchema = z.object({
  question: z.string().min(10).max(150),
  answer: z.string().min(40).max(600),
});

export const ToolRelatedReferenceZodSchema = z.object({
  toolId: z.string().min(1),
  workflowRationale: z.string().min(10).max(200),
});

// ===========================================================================
// MASTER TOOL CONTENT SCHEMA & SEMANTIC INVARIANTS
// ===========================================================================

export const ToolContentZodSchema = z.object({
  toolId: z.string().min(1),
  contentVersion: z.string().regex(/^\d+\.\d+\.\d+$/, "contentVersion must be semantic versioning (e.g. 1.0.0)"),
  lastAudited: z.string().nullable().refine(isValidCalendarDate, {
    message: "lastAudited must be null or a valid calendar date in YYYY-MM-DD format.",
  }),

  atAGlance: ToolAtAGlanceZodSchema,
  overview: ToolQuickOverviewZodSchema,
  features: z.array(ToolFeatureItemZodSchema).min(2).max(6),
  howToUse: z.object({
    steps: z.array(ToolWorkflowStepZodSchema)
      .min(2).max(6)
      // Semantic Refinement: Sequential step numbering starting at 1
      .refine(steps => steps.every((s, i) => s.stepNumber === i + 1), {
        message: "Workflow steps must be sequential integers starting at 1 (1, 2, 3...).",
      }),
  }),
  workedExample: ToolWorkedExampleZodSchema,
  howItWorks: ToolHowItWorksZodSchema,
  faqs: z.array(ToolFaqItemZodSchema).min(2).max(7),
  relatedTools: z.array(ToolRelatedReferenceZodSchema).min(1).max(5),
})
  // Semantic Refinement: No self-referencing related tools
  .refine(data => !data.relatedTools.some(r => r.toolId === data.toolId), {
    message: "A tool cannot reference its own toolId in relatedTools.",
    path: ["relatedTools"],
  })
  // Semantic Refinement: Unique related tool IDs (no duplicates)
  .refine(data => {
    const ids = data.relatedTools.map(r => r.toolId);
    return new Set(ids).size === ids.length;
  }, {
    message: "relatedTools must contain unique tool IDs with no duplicates.",
    path: ["relatedTools"],
  });

/**
 * Validates untrusted data against ToolContentZodSchema.
 * Throws ZodError if invalid, returns typed ToolContent if valid.
 */
export const validateToolContent = (data: unknown) => {
  return ToolContentZodSchema.parse(data);
};
