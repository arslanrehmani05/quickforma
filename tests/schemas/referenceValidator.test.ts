import { describe, it, expect } from "vitest";
import {
  validateToolCatalogReferences,
  validateGameCatalogReferences,
} from "../../src/data/content/schemas/referenceValidator";
import { TOOLS_CATALOG } from "../../src/data/toolsCatalog";
import { MIND_GAMES_CATALOG } from "../../src/data/mindGamesCatalog";
import { ToolContent } from "../../src/data/content/schemas/toolContent";
import { MindGameContent } from "../../src/data/content/schemas/mindGameContent";

describe("Catalog Reference Validator (Read-Only Separation)", () => {
  const validToolIdSet = new Set(TOOLS_CATALOG.map((t) => t.id));
  const validGameIdSet = new Set(MIND_GAMES_CATALOG.map((g) => g.id));

  const sampleTool: ToolContent = {
    toolId: "freelance-hourly-rate-calculator",
    contentVersion: "1.0.0",
    lastAudited: null,
    atAGlance: {
      bestFor: "Freelancers",
      timeRequired: "1 min",
      primaryInputsSummary: "Income, overhead",
    },
    overview: {
      whatItDoes: "Calculates hourly rates based on expenses and billable hours.",
      whoItsFor: "Contractors",
      whenToUse: "Pricing services",
      whyItMatters: "Prevents undercharging",
      commercialContext: "Freelancers often under-recover overhead.",
    },
    features: [
      { title: "Tax Calculation", description: "FICA tax estimator included.", iconName: "DollarSign" },
      { title: "Overhead Recovery", description: "Spreads expenses over hours.", iconName: "Briefcase" },
    ],
    howToUse: {
      steps: [
        { stepNumber: 1, title: "Input Income", instruction: "Enter target net income." },
        { stepNumber: 2, title: "Input Hours", instruction: "Enter weekly billable hours." },
      ],
    },
    workedExample: {
      type: "calculation",
      scenarioName: "Web Consultant Rate",
      contextDescription: "Targeting $100k net with $15k overhead.",
      inputs: [{ fieldLabel: "Net Income", inputValue: "$100,000" }],
      calculationSteps: [{ step: 1, explanation: "Divide revenue", arithmetic: "100k / 1000 = $100/hr" }],
      primaryResult: { label: "Target Rate", value: "$100.00 / hr" },
      interpretation: "Rate covers operating expenses.",
    },
    howItWorks: {
      methodologyOverview: "Sum of target net pay, overhead, and self-employment taxes divided by billable hours.",
    },
    faqs: [
      { question: "Are expenses included?", answer: "Yes, amortized over your billable hours." },
      { question: "How many weeks off?", answer: "Typically plan for 4 weeks of unpaid time off." },
    ],
    relatedTools: [
      { toolId: "oee-calculator", workflowRationale: "Measure personal operational efficiency." },
      { toolId: "invoice-generator", workflowRationale: "Bill clients using calculated rate." },
    ],
  };

  const sampleGame: MindGameContent = {
    gameId: "stroop-challenge",
    contentVersion: "1.0.0",
    lastAudited: null,
    overview: {
      summary: "Evaluates executive attention and inhibitory control via color interference.",
      cognitiveFocusBadge: "Inhibitory Control",
      targetAudience: "Knowledge workers",
    },
    mechanics: {
      inputMethods: ["Keyboard Arrow Keys"],
      objective: "Identify ink color while ignoring text.",
      rules: [{ condition: "Incongruent color", requiredAction: "Press ink color key", penaltyIfWrong: "-50 pts" }],
      pacingStructure: { description: "60-second timer" },
      terminationCondition: "Time expires",
    },
    scoring: {
      implementationRecordedMetrics: [{ metricName: "Reaction Time", unit: "ms", description: "Keystroke latency" }],
      scoringMechanismDescription: "Points awarded for accuracy minus reaction latency.",
      scoreDisclaimer: "Non-clinical digital exercise.",
    },
    science: {
      taskLineage: "formal_experimental_paradigm",
      implementedTask: "Player presses keys for font color of conflicting words.",
      researchConstruct: "Inhibitory Control",
      cognitiveProcessesEngaged: ["Inhibition"],
      neurocognitiveMechanism: "Interference between automatic reading and color identification.",
      transferLimitations: {
        nearVsFarTransferSummary: "Practice improves game speed without proven generalized transfer.",
        unsupportedClaims: ["Does not raise general IQ."],
      },
      implementationFidelity: {
        differencesFromLaboratoryProtocol: ["Uncalibrated displays."],
        knownConfounders: ["Keyboard latency."],
      },
      evidenceStatus: {
        replicatedFindings: ["Robust reaction delay on incongruent trials."],
        mixedOrDebatedClaims: [],
        unsupportedExtrapolations: [],
      },
      citations: [
        {
          authors: "Stroop, J. R.",
          year: 1935,
          paperTitle: "Studies of interference in serial verbal reactions",
          source: "J. Exp. Psychol.",
        },
      ],
    },
    strategies: [{ title: "Soft Focus", technique: "Focus on letter shapes rather than whole words." }],
    faqs: [
      { question: "Why is it difficult?", answer: "Automatic word reading interferes with color naming." },
      { question: "Does it improve focus?", answer: "Practicing improves task speed but has limited far-transfer." },
    ],
    relatedGameIds: ["task-switch", "visual-search"],
  };

  it("passes when all tool IDs exist in canonical toolsCatalog.ts", () => {
    const result = validateToolCatalogReferences(sampleTool, validToolIdSet);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("fails when primary toolId does not exist in catalog", () => {
    const invalidTool = {
      ...sampleTool,
      toolId: "non-existent-super-calculator",
    };
    const result = validateToolCatalogReferences(invalidTool, validToolIdSet);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("Tool ID 'non-existent-super-calculator' does not exist");
  });

  it("fails when a related tool ID does not exist in catalog", () => {
    const invalidTool = {
      ...sampleTool,
      relatedTools: [
        { toolId: "made-up-tool-id-12345", workflowRationale: "Invalid reference" },
      ],
    };
    const result = validateToolCatalogReferences(invalidTool, validToolIdSet);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("Related tool ID 'made-up-tool-id-12345'");
  });

  it("passes when all game IDs exist in canonical mindGamesCatalog.ts", () => {
    const result = validateGameCatalogReferences(sampleGame, validGameIdSet);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("fails when primary gameId does not exist in mindGamesCatalog.ts", () => {
    const invalidGame = {
      ...sampleGame,
      gameId: "fake-brain-game-999",
    };
    const result = validateGameCatalogReferences(invalidGame, validGameIdSet);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("Game ID 'fake-brain-game-999' does not exist");
  });

  it("fails when a related game ID does not exist in mindGamesCatalog.ts", () => {
    const invalidGame = {
      ...sampleGame,
      relatedGameIds: ["non-existent-game-slug"],
    };
    const result = validateGameCatalogReferences(invalidGame, validGameIdSet);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("Related game ID 'non-existent-game-slug'");
  });
});
