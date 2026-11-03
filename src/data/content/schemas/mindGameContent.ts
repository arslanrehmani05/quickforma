/**
 * QuickForma Mind Suite Game Content Schema (Phase 1 Specification)
 * Scientifically rigorous, research-grounded content model for cognitive warmup games.
 */

// ===========================================================================
// 1. GAMEPLAY MECHANICS (Verified from JSX Component)
// ===========================================================================
export interface GameMechanics {
  /** Supported input methods verified in JSX (e.g., "Keyboard Arrow Keys", "Mouse Click / Touch") */
  inputMethods: string[];
  /** Primary objective of the interactive task */
  objective: string;
  /** Exact rule loop */
  rules: Array<{
    condition: string;
    requiredAction: string;
    penaltyIfWrong: string;
  }>;
  /** Pacing: countdown timer, stimulus display duration, or self-paced */
  pacingStructure: {
    timeLimitSeconds?: number;
    stimulusDurationMs?: number;
    description: string;
  };
  /** Failure and round-end conditions */
  terminationCondition: string;
  /** How difficulty adjusts in component state (if implemented) */
  difficultyProgression?: string;
}

// ===========================================================================
// 2. SCORING & TASK BENCHMARKS (Grounded in Component Mechanics)
// ===========================================================================
export interface GameMetricRecord {
  metricName: string;
  unit: string;
  description: string;
}

export interface GameScoringMetric {
  /** Specific variables recorded by the client implementation */
  implementationRecordedMetrics: GameMetricRecord[];
  /** Explains scoring logic (formula, flat count, or level progression) */
  scoringMechanismDescription: string;
  /** Mathematical formula string — Conditional: only if an actual arithmetic formula exists in code */
  scoringFormula?: string;
  /** Descriptive task milestones (Optional) — strictly task parameters, never population percentiles */
  descriptiveMilestones?: Array<{
    milestoneLabel: string;
    taskSignificance: string;
  }>;
  /** Mandatory non-clinical disclaimer */
  scoreDisclaimer: string;
}

// ===========================================================================
// 3. SCIENTIFIC EVIDENCE, PARADIGM & CITATIONS (The 4 Distinct Dimensions)
// ===========================================================================
export type MindGameTaskLineage =
  | "formal_experimental_paradigm"
  | "clinical_neuropsychological_task"
  | "spatial_visualization_puzzle"
  | "recreational_logic_deduction"
  | "recreational_arithmetic_heuristic"
  | "perceptual_processing_speed";

export interface AcademicCitation {
  authors: string;
  year: number;
  paperTitle: string;
  source: string;
  urlOrDoi?: string;
}

export interface GameScienceBackground {
  /** Lineage of the exercise across cognitive science */
  taskLineage: MindGameTaskLineage;

  /** Dimension 1: The player's concrete physical/visual task in this web implementation */
  implementedTask: string;

  /** Dimension 2: Theoretical cognitive construct investigated in academic literature */
  researchConstruct: string;

  /** Specific mental faculties engaged during the task */
  cognitiveProcessesEngaged: string[];

  /** In-depth explanation of the neurocognitive mechanism */
  neurocognitiveMechanism: string;

  /** Dimension 4: Transparent disclosure of transfer limitations */
  transferLimitations: {
    nearVsFarTransferSummary: string;
    unsupportedClaims: string[];
  };

  /** Implementation fidelity: how this browser version differs from lab standards */
  implementationFidelity: {
    differencesFromLaboratoryProtocol: string[];
    knownConfounders: string[];
  };

  /**
   * Claim-level evidence classification
   * All three arrays are structurally required, but may be empty ([]) when justified.
   */
  evidenceStatus: {
    replicatedFindings: string[];
    mixedOrDebatedClaims: string[];
    unsupportedExtrapolations: string[];
  };

  /**
   * Verifiable academic references (Empty for recreational tasks; 1 to 4 for formal/clinical paradigms)
   * Citations must specifically support the claim attached to them.
   */
  citations: AcademicCitation[];
}

// ===========================================================================
// 4. STRATEGIES & FAQS (Flexible Bounds)
// ===========================================================================
export interface GameStrategyTip {
  title: string;
  technique: string;
}

export interface GameFaqItem {
  question: string;
  answer: string;
}

// ===========================================================================
// MASTER MIND GAME CONTENT INTERFACE
// ===========================================================================
export interface MindGameContent {
  gameId: string;
  contentVersion: string;
  lastAudited: string | null;

  overview: {
    summary: string;
    cognitiveFocusBadge: string;
    targetAudience: string;
  };

  mechanics: GameMechanics;
  scoring: GameScoringMetric;
  science: GameScienceBackground;
  strategies: GameStrategyTip[];
  faqs: GameFaqItem[];
  relatedGameIds: string[];
}
