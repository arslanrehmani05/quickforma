import { describe, it, expect } from "vitest";
import { MindGameContentZodSchema } from "../../src/data/content/schemas/mindGameContent.zod";

describe("MindGameContent Zod Schema & Cognitive Science Invariants", () => {
  const createBaseGame = (overrides: Record<string, any> = {}) => ({
    gameId: "stroop-challenge",
    contentVersion: "1.0.0",
    lastAudited: "2026-02-28",
    overview: {
      summary: "Evaluates executive attention and inhibitory control by requiring rapid responses to font colors while suppressing automatic word reading.",
      cognitiveFocusBadge: "Inhibitory Control",
      targetAudience: "Knowledge workers seeking an active mental warmup in selective attention and focus.",
    },
    mechanics: {
      inputMethods: ["Keyboard Left/Right Arrow Keys", "Mouse Click / Touch"],
      objective: "Select whether the ink color matches the written color name as quickly as possible without sacrificing accuracy.",
      rules: [
        {
          condition: "Word 'RED' displayed in blue ink (Incongruent trial)",
          requiredAction: "Press BLUE key, ignoring the semantic meaning 'RED'",
          penaltyIfWrong: "-50 points, 300ms visual error shake",
        },
      ],
      pacingStructure: {
        timeLimitSeconds: 60,
        description: "60-second fixed session; self-paced stimulus presentations.",
      },
      terminationCondition: "Countdown timer reaches zero.",
      difficultyProgression: "Stimulus presentation intervals decrease as consecutive correct streaks lengthen.",
    },
    scoring: {
      implementationRecordedMetrics: [
        {
          metricName: "Mean Reaction Time",
          unit: "milliseconds",
          description: "Elapsed time between stimulus render and keyboard event.",
        },
        {
          metricName: "Incongruency Error Rate",
          unit: "percentage",
          description: "Percentage of incorrect responses on conflicting color trials.",
        },
      ],
      scoringMechanismDescription: "Points are awarded for speed and accuracy: (Correct Trials × 100) - (Mean RT ms × 0.2).",
      scoreDisclaimer: "Scores on this browser exercise reflect immediate task performance and do not constitute a standardized psychological or diagnostic assessment.",
    },
    science: {
      taskLineage: "formal_experimental_paradigm" as const,
      implementedTask: "The participant views color words (RED, BLUE, GREEN) rendered in matching or mismatching font colors and presses corresponding keys.",
      researchConstruct: "Selective Visual Attention & Inhibitory Control",
      cognitiveProcessesEngaged: [
        "Inhibitory Control",
        "Selective Attention",
        "Automaticity Suppression",
      ],
      neurocognitiveMechanism: "The Stroop effect illustrates interference between automatic semantic reading pathways and controlled visual color naming, recruiting the anterior cingulate cortex and dorsolateral prefrontal cortex.",
      transferLimitations: {
        nearVsFarTransferSummary: "Practice on this specific color-word task reliably decreases task-specific reaction times, but academic literature demonstrates limited far-transfer to generalized intelligence or workplace focus.",
        unsupportedClaims: [
          "Does not increase general intelligence (g factor)",
          "Does not diagnose or clinically treat ADHD",
          "Does not permanently prevent neurodegenerative decline",
        ],
      },
      implementationFidelity: {
        differencesFromLaboratoryProtocol: [
          "Uncalibrated consumer display refresh rates",
          "Variable browser keyboard event polling latencies",
          "Uncontrolled home environment without chin-rest fixation",
        ],
        knownConfounders: [
          "Hardware input latency differences (touchscreen vs mechanical keyboard)",
          "Ambient room lighting affecting color perception",
        ],
      },
      evidenceStatus: {
        replicatedFindings: [
          "Incongruent trials consistently produce 50–100ms reaction latency increases relative to congruent trials across diverse populations.",
        ],
        mixedOrDebatedClaims: [
          "Extent to which computerized cognitive training on interference tasks produces generalized executive function improvements.",
        ],
        unsupportedExtrapolations: [
          "Claims that daily browser Stroop drills raise standardized IQ scores or cure attention deficits.",
        ],
      },
      citations: [
        {
          authors: "Stroop, J. R.",
          year: 1935,
          paperTitle: "Studies of interference in serial verbal reactions",
          source: "Journal of Experimental Psychology, 18(6), 643–662",
          urlOrDoi: "https://doi.org/10.1037/h0054651",
        },
      ],
    },
    strategies: [
      {
        title: "Perceptual Blur Technique",
        technique: "Defocusing visual gaze slightly onto letter contours can reduce semantic word parsing speed, helping isolate hue.",
      },
    ],
    faqs: [
      {
        question: "Why does mismatching text make it harder to name the color?",
        answer: "Word reading is highly practiced and nearly automatic in literate adults, causing semantic recognition to outpace slower color-naming neural pathways.",
      },
      {
        question: "Does getting faster at this game make me smarter?",
        answer: "No. Practicing improves your efficiency on this specific digital exercise, but research shows limited transfer to unrelated academic or professional tasks.",
      },
    ],
    relatedGameIds: ["task-switch", "visual-search"],
    ...overrides,
  });

  it("successfully parses valid MindGameContent for a formal experimental paradigm", () => {
    const data = createBaseGame();
    expect(() => MindGameContentZodSchema.parse(data)).not.toThrow();
  });

  it("enforces citations array has >= 1 citation when taskLineage is formal_experimental_paradigm", () => {
    const data = createBaseGame({
      science: {
        ...createBaseGame().science,
        taskLineage: "formal_experimental_paradigm",
        citations: [], // Empty citations on formal paradigm
      },
    });

    expect(() => MindGameContentZodSchema.parse(data)).toThrow(
      /citations array must contain at least 1 verified academic reference/
    );
  });

  it("permits empty citations array when taskLineage is recreational_logic_deduction", () => {
    const data = createBaseGame({
      gameId: "logic-grid",
      science: {
        ...createBaseGame().science,
        taskLineage: "recreational_logic_deduction",
        citations: [], // Allowed empty for recreational puzzles
      },
    });

    expect(() => MindGameContentZodSchema.parse(data)).not.toThrow();
  });

  it("permits empty arrays inside evidenceStatus (e.g. empty unsupportedExtrapolations)", () => {
    const data = createBaseGame({
      science: {
        ...createBaseGame().science,
        evidenceStatus: {
          replicatedFindings: ["Consensus observed."],
          mixedOrDebatedClaims: [],
          unsupportedExtrapolations: [], // Empty array is valid
        },
      },
    });

    expect(() => MindGameContentZodSchema.parse(data)).not.toThrow();
  });

  it("rejects self-referencing relatedGameIds", () => {
    const data = createBaseGame({
      relatedGameIds: ["stroop-challenge"], // References self
    });

    expect(() => MindGameContentZodSchema.parse(data)).toThrow(
      /A game cannot reference its own gameId in relatedGameIds/
    );
  });

  it("rejects duplicate relatedGameIds", () => {
    const data = createBaseGame({
      relatedGameIds: ["task-switch", "task-switch"], // Duplicate
    });

    expect(() => MindGameContentZodSchema.parse(data)).toThrow(
      /relatedGameIds must contain unique game IDs/
    );
  });

  it("rejects invalid calendar dates for lastAudited", () => {
    const data = createBaseGame({
      lastAudited: "2026-04-31", // April has 30 days
    });

    expect(() => MindGameContentZodSchema.parse(data)).toThrow(
      /lastAudited must be null or a valid calendar date/
    );
  });

  it("successfully parses citations with findingSummary and recreational puzzle context", () => {
    const base = createBaseGame();
    const data = createBaseGame({
      gameId: "logic-grid",
      science: {
        ...base.science,
        taskLineage: "recreational_logic_deduction",
        implementationFidelity: undefined, // Optional for recreational puzzles
        recreationalPuzzleContext: {
          designPrinciple: "Constraint satisfaction grid enforcing pairwise mutual exclusion rules.",
          solvingHeuristics: ["Row-column elimination", "Transitive deduction"],
        },
        citations: [
          {
            authors: "Smith, A.",
            year: 2020,
            paperTitle: "Constraint Satisfaction Problems in Recreational Logic",
            source: "Journal of Problem Solving, 12(1), 45-60",
            urlOrDoi: "https://doi.org/10.1234/jps.2020.001",
            findingSummary: "Demonstrates that elimination matrices reduce cognitive working memory load during complex deduction.",
          },
        ],
      },
    });

    expect(() => MindGameContentZodSchema.parse(data)).not.toThrow();
  });

  it("enforces implementationFidelity when taskLineage is formal_experimental_paradigm", () => {
    const base = createBaseGame();
    const data = createBaseGame({
      science: {
        ...base.science,
        taskLineage: "formal_experimental_paradigm",
        implementationFidelity: undefined, // Missing on formal paradigm!
      },
    });

    expect(() => MindGameContentZodSchema.parse(data)).toThrow(
      /implementationFidelity is required when taskLineage is/
    );
  });
});
