/**
 * QuickForma Mind Suite Game Runtime Zod Schemas
 * Concrete runtime contracts and semantic invariants for MindGameContent.
 */

import { z } from "zod";
import { isValidCalendarDate } from "./toolContent.zod";

// ===========================================================================
// SUB-SCHEMAS
// ===========================================================================

export const GameMechanicsZodSchema = z.object({
  inputMethods: z.array(z.string().min(1)).min(1),
  objective: z.string().min(20).max(300),
  rules: z.array(z.object({
    condition: z.string().min(1),
    requiredAction: z.string().min(1),
    penaltyIfWrong: z.string().min(1),
  })).min(1),
  pacingStructure: z.object({
    timeLimitSeconds: z.number().positive().optional(),
    stimulusDurationMs: z.number().positive().optional(),
    description: z.string().min(10).max(250),
  }),
  terminationCondition: z.string().min(10).max(250),
  difficultyProgression: z.string().min(10).max(300).optional(),
});

export const GameMetricRecordZodSchema = z.object({
  metricName: z.string().min(1).max(80),
  unit: z.string().min(1).max(40),
  description: z.string().min(1).max(250),
});

export const GameScoringMetricZodSchema = z.object({
  implementationRecordedMetrics: z.array(GameMetricRecordZodSchema).min(1),
  scoringMechanismDescription: z.string().min(20).max(350),
  scoringFormula: z.string().min(1).max(250).optional(),
  descriptiveMilestones: z.array(z.object({
    milestoneLabel: z.string().min(1).max(80),
    taskSignificance: z.string().min(1).max(250),
  })).optional(),
  scoreDisclaimer: z.string().min(30),
});

export const AcademicCitationZodSchema = z.object({
  authors: z.string().min(1).max(150),
  year: z.number().int().min(1800).max(2030),
  paperTitle: z.string().min(1).max(250),
  source: z.string().min(1).max(200),
  urlOrDoi: z.string().url().or(z.string().regex(/^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i)).optional(),
});

export const MindGameTaskLineageZodEnum = z.enum([
  "formal_experimental_paradigm",
  "clinical_neuropsychological_task",
  "spatial_visualization_puzzle",
  "recreational_logic_deduction",
  "recreational_arithmetic_heuristic",
  "perceptual_processing_speed",
]);

export const GameScienceBackgroundZodSchema = z.object({
  taskLineage: MindGameTaskLineageZodEnum,
  implementedTask: z.string().min(30).max(450),
  researchConstruct: z.string().min(10).max(120),
  cognitiveProcessesEngaged: z.array(z.string().min(1)).min(1),
  neurocognitiveMechanism: z.string().min(50).max(800),
  transferLimitations: z.object({
    nearVsFarTransferSummary: z.string().min(30).max(500),
    unsupportedClaims: z.array(z.string().min(1)).min(1),
  }),
  implementationFidelity: z.object({
    differencesFromLaboratoryProtocol: z.array(z.string().min(1)).min(1),
    knownConfounders: z.array(z.string().min(1)).min(1),
  }),
  evidenceStatus: z.object({
    replicatedFindings: z.array(z.string().min(1)),
    mixedOrDebatedClaims: z.array(z.string().min(1)),
    unsupportedExtrapolations: z.array(z.string().min(1)), // Required array, may be empty []
  }),
  citations: z.array(AcademicCitationZodSchema),
})
  // Semantic Refinement: Citations required for formal paradigms and clinical tasks
  .refine(data => {
    const formalTasks = ["formal_experimental_paradigm", "clinical_neuropsychological_task"];
    if (formalTasks.includes(data.taskLineage) && data.citations.length === 0) {
      return false;
    }
    return true;
  }, {
    message: "citations array must contain at least 1 verified academic reference when taskLineage is 'formal_experimental_paradigm' or 'clinical_neuropsychological_task'.",
    path: ["citations"],
  });

export const GameStrategyTipZodSchema = z.object({
  title: z.string().min(3).max(80),
  technique: z.string().min(20).max(350),
});

export const GameFaqItemZodSchema = z.object({
  question: z.string().min(10).max(150),
  answer: z.string().min(40).max(600),
});

// ===========================================================================
// MASTER MIND GAME CONTENT SCHEMA & INVARIANTS
// ===========================================================================

export const MindGameContentZodSchema = z.object({
  gameId: z.string().min(1),
  contentVersion: z.string().regex(/^\d+\.\d+\.\d+$/, "contentVersion must be semantic versioning (e.g. 1.0.0)"),
  lastAudited: z.string().nullable().refine(isValidCalendarDate, {
    message: "lastAudited must be null or a valid calendar date in YYYY-MM-DD format.",
  }),

  overview: z.object({
    summary: z.string().min(50).max(400),
    cognitiveFocusBadge: z.string().min(3).max(60),
    targetAudience: z.string().min(10).max(180),
  }),

  mechanics: GameMechanicsZodSchema,
  scoring: GameScoringMetricZodSchema,
  science: GameScienceBackgroundZodSchema,
  strategies: z.array(GameStrategyTipZodSchema).min(1).max(4),
  faqs: z.array(GameFaqItemZodSchema).min(2).max(5),
  relatedGameIds: z.array(z.string().min(1)).min(1).max(4),
})
  // Semantic Refinement: No self-referencing related games
  .refine(data => !data.relatedGameIds.includes(data.gameId), {
    message: "A game cannot reference its own gameId in relatedGameIds.",
    path: ["relatedGameIds"],
  })
  // Semantic Refinement: Unique related game IDs
  .refine(data => new Set(data.relatedGameIds).size === data.relatedGameIds.length, {
    message: "relatedGameIds must contain unique game IDs with no duplicates.",
    path: ["relatedGameIds"],
  });

/**
 * Validates untrusted data against MindGameContentZodSchema.
 * Throws ZodError if invalid, returns typed MindGameContent if valid.
 */
export const validateMindGameContent = (data: unknown) => {
  return MindGameContentZodSchema.parse(data);
};
