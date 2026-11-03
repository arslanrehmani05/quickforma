/**
 * QuickForma Pilot Mind Game Content Registry (Phase 2 Specification)
 * 6 canonical games covering diverse cognitive lineages.
 * 100% verified against real component implementations and mindGamesCatalog.ts.
 */

import { MindGameContent } from "../schemas/mindGameContent";

export const PILOT_GAME_CONTENT: MindGameContent[] = [
  // ===========================================================================
  // 1. STROOP CHALLENGE (stroop-challenge)
  // ===========================================================================
  {
    gameId: "stroop-challenge",
    contentVersion: "1.0.0",
    lastAudited: "2026-03-15",
    overview: {
      summary: "Evaluates executive attention and cognitive interference resolution by requiring rapid ink color identification while suppressing automatic word reading.",
      cognitiveFocusBadge: "Selective Attention & Interference Control",
      targetAudience: "Knowledge workers and students seeking an active mental warmup in focus control and response inhibition.",
    },
    mechanics: {
      inputMethods: ["Mouse Click", "Touchscreen Tap"],
      objective: "Select the button corresponding to the font ink color as quickly as possible while ignoring the semantic word meaning.",
      rules: [
        {
          condition: "Word displayed in matching color (Congruent, 35% of trials)",
          requiredAction: "Click the color button matching both text and ink color.",
          penaltyIfWrong: "-50 points, brief incorrect feedback flash",
        },
        {
          condition: "Word displayed in conflicting color (Incongruent, 65% of trials)",
          requiredAction: "Click the ink color button, actively suppressing the written word name.",
          penaltyIfWrong: "-50 points, brief incorrect feedback flash",
        },
      ],
      pacingStructure: {
        timeLimitSeconds: 60,
        description: "60-second fixed session; self-paced stimulus presentations advancing immediately after each response.",
      },
      terminationCondition: "Countdown timer reaches zero seconds.",
    },
    scoring: {
      implementationRecordedMetrics: [
        { metricName: "Mean Congruent Latency", unit: "milliseconds", description: "Average response time on matching color trials" },
        { metricName: "Mean Incongruent Latency", unit: "milliseconds", description: "Average response time on conflicting color trials" },
        { metricName: "Stroop Interference Delay", unit: "milliseconds", description: "Difference between mean incongruent and congruent latencies" },
        { metricName: "Accuracy Rate", unit: "percentage", description: "Percentage of correct responses out of total attempts" },
      ],
      scoringMechanismDescription: "Points are awarded per correct answer (+100 for congruent, +150 for harder incongruent) minus a 50-point penalty for errors.",
      scoringFormula: "Score = (CongruentCorrect × 100) + (IncongruentCorrect × 150) - (Errors × 50)",
      descriptiveMilestones: [
        { milestoneLabel: "Interference Under 100ms", taskSignificance: "Exceptional resistance to semantic interference on this browser task" },
        { milestoneLabel: "Interference 100–250ms", taskSignificance: "Typical adult visual interference latency window" },
      ],
      scoreDisclaimer: "Scores on this browser exercise reflect immediate task performance and do not constitute a standardized psychological or diagnostic clinical assessment.",
    },
    science: {
      taskLineage: "formal_experimental_paradigm",
      implementedTask: "The player views color words (RED, BLUE, GREEN, YELLOW) printed in congruent or incongruent font colors and clicks the button matching the ink color during a 60-second trial window.",
      researchConstruct: "Selective Visual Attention & Cognitive Interference Control",
      cognitiveProcessesEngaged: [
        "Selective Attention",
        "Response Inhibition",
        "Semantic Automaticity Suppression",
        "Visual Hue Discrimination",
      ],
      neurocognitiveMechanism: "The Stroop effect illustrates competitive processing between highly automated lexical reading pathways and controlled visual color identification. Resolving this interference recruits the anterior cingulate cortex (ACC) for conflict detection and the dorsolateral prefrontal cortex (DLPFC) for top-down attentional control.",
      transferLimitations: {
        nearVsFarTransferSummary: "Practice on this specific color-naming drill reliably decreases reaction times and interference on identical computerized tasks, but empirical literature demonstrates limited far-transfer to generalized intelligence, academic learning, or professional productivity.",
        unsupportedClaims: [
          "Does not increase general intelligence (g factor)",
          "Does not diagnose or clinically treat ADHD or executive function disorders",
          "Does not permanently prevent age-related neurodegenerative decline",
        ],
      },
      implementationFidelity: {
        differencesFromLaboratoryProtocol: [
          "Uncalibrated consumer computer display refresh rates and browser animation frame variations",
          "Variable input polling latency across mouse, trackpad, and capacitive touchscreen devices",
          "Uncontrolled domestic testing environment without fixation crosses or eye-tracking chin rests",
        ],
        knownConfounders: [
          "Screen brightness and ambient lighting conditions altering color saturation perception",
          "Individual typing and mouse dexterity differences independent of cognitive latency",
        ],
      },
      evidenceStatus: {
        replicatedFindings: [
          "Incongruent trials consistently produce 50–150ms slower reaction times compared to congruent trials across diverse adult populations.",
          "Error rates are reliably higher on incongruent trials due to prepotent lexical reading interference.",
        ],
        mixedOrDebatedClaims: [
          "The degree to which prolonged digital Stroop practice alters neuroplastic connectivity in prefrontal attentional networks.",
        ],
        unsupportedExtrapolations: [
          "Claims that commercial 'brain training' with Stroop drills cures attention deficits or produces measurable IQ gains.",
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
        {
          authors: "MacLeod, C. M.",
          year: 1991,
          paperTitle: "Half a century of research on the Stroop effect: An integrative review",
          source: "Psychological Bulletin, 109(2), 163–203",
          urlOrDoi: "https://doi.org/10.1037/0033-2909.109.2.163",
        },
      ],
    },
    strategies: [
      {
        title: "Perceptual De-focusing",
        technique: "Slightly defocusing your gaze on the word contours can suppress automatic word parsing, allowing the raw color hue to reach visual processing centers first.",
      },
      {
        title: "Subvocal Suppression",
        technique: "Avoid pronouncing the written word internally; focus entirely on spatial button positions corresponding to the four primary colors.",
      },
    ],
    faqs: [
      {
        question: "Why is it so difficult to name the ink color when the word says something else?",
        answer: "Reading is an over-learned, automatic cognitive process in literate adults. When word meaning and ink color conflict, the reading pathway processes faster than visual naming, requiring your prefrontal cortex to actively suppress the incorrect verbal response.",
      },
      {
        question: "Does getting faster at this game mean my brain is getting younger?",
        answer: "No. Getting faster reflects task-specific procedural learning and improved motor familiarity with the button layout. Peer-reviewed meta-analyses show that practicing browser games does not transfer to general mental sharpness or prevent cognitive decline.",
      },
    ],
    relatedGameIds: ["task-switch", "sustained-attention", "focus-challenge"],
  },

  // ===========================================================================
  // 2. TASK SWITCH (task-switch)
  // ===========================================================================
  {
    gameId: "task-switch",
    contentVersion: "1.0.0",
    lastAudited: "2026-03-15",
    overview: {
      summary: "Measures cognitive flexibility and executive set-shifting cost by interleaving numerical parity rules (Even/Odd) and magnitude rules (High/Low).",
      cognitiveFocusBadge: "Cognitive Flexibility & Set-Shifting",
      targetAudience: "Professionals seeking an active exercise in mental agility and task-set reconfiguration.",
    },
    mechanics: {
      inputMethods: ["Mouse Click", "Touchscreen Tap"],
      objective: "Categorize digits (1–4, 6–9) under alternating parity (Even vs Odd) or magnitude (Low <5 vs High >5) rules as instructed by visual cues.",
      rules: [
        {
          condition: "Rule cue indicates 'parity'",
          requiredAction: "Select 'Even' if digit is 2, 4, 6, 8; select 'Odd' if digit is 1, 3, 7, 9.",
          penaltyIfWrong: "-50 points, brief incorrect feedback flash",
        },
        {
          condition: "Rule cue indicates 'magnitude'",
          requiredAction: "Select 'Low (<5)' if digit is 1, 2, 3, 4; select 'High (>5)' if digit is 6, 7, 8, 9.",
          penaltyIfWrong: "-50 points, brief incorrect feedback flash",
        },
      ],
      pacingStructure: {
        timeLimitSeconds: 60,
        description: "60-second fixed session with 50% probability of rule switching between successive trials.",
      },
      terminationCondition: "Countdown timer reaches zero seconds.",
    },
    scoring: {
      implementationRecordedMetrics: [
        { metricName: "Mean Repeat Latency", unit: "milliseconds", description: "Average response time when the rule remains the same as previous trial" },
        { metricName: "Mean Switch Latency", unit: "milliseconds", description: "Average response time when the rule switches from previous trial" },
        { metricName: "Switch Cost Delay", unit: "milliseconds", description: "Latency penalty incurred to reconfigure task set (Switch - Repeat)" },
        { metricName: "Total Accuracy", unit: "percentage", description: "Share of correct classifications across all attempts" },
      ],
      scoringMechanismDescription: "Points are awarded per correct answer (+100 for repeat trials, +150 for cognitively demanding switch trials) minus a 50-point penalty for errors.",
      scoringFormula: "Score = (RepeatCorrect × 100) + (SwitchCorrect × 150) - (Errors × 50)",
      scoreDisclaimer: "Scores on this browser exercise reflect immediate task performance and do not constitute a standardized psychological or diagnostic clinical assessment.",
    },
    science: {
      taskLineage: "formal_experimental_paradigm",
      implementedTask: "The player categorizes single digits (excluding 5) according to an explicit rule banner ('parity' or 'magnitude') that randomly switches with 50% probability over a 60-second window.",
      researchConstruct: "Executive Function & Task-Set Reconfiguration (Switch Cost)",
      cognitiveProcessesEngaged: [
        "Executive Control",
        "Cognitive Set-Shifting",
        "Rule Maintenance in Working Memory",
        "Proactive Task Reconfiguration",
      ],
      neurocognitiveMechanism: "Switching rules requires the frontoparietal control network to dismantle the previous stimulus-response mapping and retrieve the newly relevant task rule from working memory, resulting in an observable reaction time delay known as 'switch cost'.",
      transferLimitations: {
        nearVsFarTransferSummary: "Practice reduces switch costs on this specific digit categorization paradigm, but gains do not reliably transfer to real-world multitasking, workplace task-switching, or general executive function.",
        unsupportedClaims: [
          "Does not cure workplace distractibility or digital multitasking fatigue",
          "Does not diagnose neurological conditions or frontal lobe dysfunction",
          "Does not raise general fluid cognitive ability",
        ],
      },
      implementationFidelity: {
        differencesFromLaboratoryProtocol: [
          "Zero preparation interval (cue and stimulus appear simultaneously rather than with a cue-target onset asynchrony)",
          "Consumer display latency variations and uncalibrated visual touch targets",
          "No fixation cross tracking or electrophysiological ERP monitoring",
        ],
        knownConfounders: [
          "Touchscreen finger travel distances between left and right button targets",
          "Individual working memory span differences affecting rule retention",
        ],
      },
      evidenceStatus: {
        replicatedFindings: [
          "Switch trials produce robust 100–300ms reaction time slowing and elevated error rates relative to repeat trials across laboratory literature.",
          "Switch cost persists even when task transitions are completely predictable.",
        ],
        mixedOrDebatedClaims: [
          "Whether switch cost represents active prefrontal reconfiguration time or passive task-set inertia from the preceding trial.",
        ],
        unsupportedExtrapolations: [
          "Claims that computerized switching drills enable human brains to execute true parallel multitasking without cognitive penalty.",
        ],
      },
      citations: [
        {
          authors: "Rogers, R. D., & Monsell, S.",
          year: 1995,
          paperTitle: "Costs of a predictable switch between simple cognitive tasks",
          source: "Journal of Experimental Psychology: General, 124(2), 207–231",
          urlOrDoi: "https://doi.org/10.1037/0096-3445.124.2.207",
        },
        {
          authors: "Meiran, N.",
          year: 1996,
          paperTitle: "Reconfiguration of processing mode prior to task performance",
          source: "Journal of Experimental Psychology: Learning, Memory, and Cognition, 22(6), 1423–1442",
          urlOrDoi: "https://doi.org/10.1037/0278-7393.22.6.1423",
        },
      ],
    },
    strategies: [
      {
        title: "Rule-First Fixation",
        technique: "Direct your visual attention to the rule badge at the top before looking at the central number, preparing your cognitive set before parsing the stimulus.",
      },
      {
        title: "Bimanual Preparation",
        technique: "Keep fingers hovering over both left and right options simultaneously to minimize motor execution latency once a decision is made.",
      },
    ],
    faqs: [
      {
        question: "Why do I feel a brief hesitation whenever the rule switches?",
        answer: "That hesitation is the physical manifestation of switch cost. Your brain must actively suppress the previous stimulus-response mapping and load the new rule into working memory before it can execute the decision.",
      },
      {
        question: "Can humans train themselves to switch tasks with zero latency delay?",
        answer: "No. Decades of cognitive psychology research show that a residual switch cost remains even after extensive practice. Task-set reconfiguration is a fundamental biological constraint of the human prefrontal cortex.",
      },
    ],
    relatedGameIds: ["stroop-challenge", "visual-search", "dual-n-back"],
  },

  // ===========================================================================
  // 3. MENTAL ROTATION (mental-rotation)
  // ===========================================================================
  {
    gameId: "mental-rotation",
    contentVersion: "1.0.0",
    lastAudited: "2026-03-15",
    overview: {
      summary: "Evaluates spatial visualization and 2D spatial working memory by requiring players to determine whether rotated polyomino figures are identical or mirrored.",
      cognitiveFocusBadge: "Spatial Reasoning & Mental Manipulation",
      targetAudience: "Designers, engineers, architects, and students looking to warm up visual-spatial transformation skills.",
    },
    mechanics: {
      inputMethods: ["Mouse Click", "Touchscreen Tap"],
      objective: "Decide whether the right-hand figure is an identical rotated version of the base figure or an inverted mirror reflection.",
      rules: [
        {
          condition: "Figure is rotated but unmirrored (Identical)",
          requiredAction: "Click 'Same (Rotated)' as quickly as possible.",
          penaltyIfWrong: "0 points awarded, feedback registers error",
        },
        {
          condition: "Figure is reflected across an axis (Mirrored)",
          requiredAction: "Click 'Mirrored (Different)' as quickly as possible.",
          penaltyIfWrong: "0 points awarded, feedback registers error",
        },
      ],
      pacingStructure: {
        description: "10 discrete self-paced rounds with rotational angles varying across 45°, 90°, 135°, 180°, 225°, 270°, and 315°.",
      },
      terminationCondition: "Completion of all 10 evaluation rounds.",
    },
    scoring: {
      implementationRecordedMetrics: [
        { metricName: "Total Accuracy", unit: "count", description: "Number of correctly identified shapes out of 10 rounds" },
        { metricName: "Mean Rotation RT", unit: "milliseconds", description: "Average response latency across all 10 rounds" },
        { metricName: "Accuracy Percentage", unit: "percentage", description: "Share of correct answers across the session" },
      ],
      scoringMechanismDescription: "Points are awarded per correct trial (+100 base points) plus a latency-decay bonus for rapid decisions up to 5,000ms.",
      scoringFormula: "RoundScore = 100 + max(0, round((5000 - LatencyMs) / 30))",
      scoreDisclaimer: "Scores on this browser exercise reflect immediate task performance and do not constitute a standardized psychological or diagnostic clinical assessment.",
    },
    science: {
      taskLineage: "formal_experimental_paradigm",
      implementedTask: "The player views two 2D polyomino shapes (F, L-hook, Z-stepped, T-cross) and judges whether the second figure is an identical rotation or a reflected mirror image over 10 discrete rounds.",
      researchConstruct: "Spatial Transformation & Analog Mental Rotation",
      cognitiveProcessesEngaged: [
        "Spatial Visualization",
        "Mental Rotation",
        "Visual Feature Binding",
        "Spatial Working Memory",
      ],
      neurocognitiveMechanism: "Mental rotation recruits the superior parietal lobule and intraparietal sulcus, simulating an analog spatial trajectory in visual working memory where decision time increases linearly with the required angular disparity.",
      transferLimitations: {
        nearVsFarTransferSummary: "Practice improves rotational efficiency on similar 2D polygonal stimuli, but evidence shows limited generalization to complex 3D engineering CAD design or real-world navigation.",
        unsupportedClaims: [
          "Does not guarantee improved architectural drawing or spatial navigation ability",
          "Does not alter baseline spatial perception or anatomical brain structure",
        ],
      },
      implementationFidelity: {
        differencesFromLaboratoryProtocol: [
          "Uses 2D planar polyominos rather than classic Shepard-Metzler 3D block assemblages",
          "Fixed 10-round recreational length rather than 100+ counter-balanced trials across all angle degrees",
          "Variable consumer screen aspect ratios and physical viewing distances",
        ],
        knownConfounders: [
          "Heuristic feature-matching strategies (comparing single asymmetrical corners without full rotation)",
          "Prior experience with video games or spatial puzzle software",
        ],
      },
      evidenceStatus: {
        replicatedFindings: [
          "Reaction times increase monotonically as angular disparity approaches 180 degrees.",
          "Mirror discrimination demands greater cognitive processing time than identical rotations.",
        ],
        mixedOrDebatedClaims: [
          "The degree to which 2D planar rotation performance predicts complex 3D volumetric spatial transformation ability.",
        ],
        unsupportedExtrapolations: [
          "Claims that casual browser rotation games significantly enhance standardized mathematical talent.",
        ],
      },
      citations: [
        {
          authors: "Shepard, R. N., & Metzler, J.",
          year: 1971,
          paperTitle: "Mental rotation of three-dimensional objects",
          source: "Science, 171(3972), 701–703",
          urlOrDoi: "https://doi.org/10.1126/science.171.3972.701",
        },
      ],
    },
    strategies: [
      {
        title: "Asymmetric Anchor Identification",
        technique: "Identify a distinctive feature (such as the short leg of an L-shape) and mentally track its expected trajectory around the clock face.",
      },
      {
        title: "Elimination of Reflection",
        technique: "Check whether chirality (handedness) is preserved: if clockwise features in the base shape become counter-clockwise, the figure is mirrored.",
      },
    ],
    faqs: [
      {
        question: "Why do figures rotated 180 degrees take longer to evaluate?",
        answer: "Human spatial cognition operates like an analog mental simulator. Your brain rotates the mental representation progressively through intermediate angles; an inversion of 180° requires the longest trajectory, maximizing reaction time.",
      },
      {
        question: "Is mental rotation ability fixed or can it improve?",
        answer: "Spatial visualization is malleable and improves with practice. However, improvements on 2D digital puzzles primarily reflect task familiarity rather than generalized transformation ability across other domains.",
      },
    ],
    relatedGameIds: ["paper-folding", "spatial-sequence", "matrix-reasoning"],
  },

  // ===========================================================================
  // 4. LOGIC GRID (logic-grid)
  // ===========================================================================
  {
    gameId: "logic-grid",
    contentVersion: "1.0.0",
    lastAudited: "2026-03-15",
    overview: {
      summary: "Challenges analytical problem-solving and deductive reasoning through classical constraint-satisfaction logic grid puzzles.",
      cognitiveFocusBadge: "Deductive Reasoning & Working Memory",
      targetAudience: "Puzzle enthusiasts, analytical thinkers, and students preparing for formal logic evaluations.",
    },
    mechanics: {
      inputMethods: ["Mouse Click", "Touchscreen Tap"],
      objective: "Match three entities to their unique attributes using deductive clues by toggling grid cells between confirmed and eliminated states.",
      rules: [
        {
          condition: "Clicking a grid cell toggles state",
          requiredAction: "Cycle between blank, 'X' (eliminated), and 'Check' (confirmed true).",
          penaltyIfWrong: "Submitting incorrect final assignments prevents puzzle completion.",
        },
        {
          condition: "Deductions complete",
          requiredAction: "Assign each entity to its matching attribute via dropdowns and submit.",
          penaltyIfWrong: "Error banner displays if any entity-attribute assignment is incorrect.",
        },
      ],
      pacingStructure: {
        description: "Self-paced discrete puzzle sessions across 3 progressive logic challenges without countdown timers.",
      },
      terminationCondition: "Player solves all 3 logic challenges or resets the session.",
    },
    scoring: {
      implementationRecordedMetrics: [
        { metricName: "Puzzles Solved", unit: "count", description: "Total completed logic puzzles out of 3" },
        { metricName: "Deduction Accuracy", unit: "percentage", description: "Submission success rate without incorrect guesses" },
      ],
      scoringMechanismDescription: "Awards a flat 300 points per puzzle solved correctly upon final submission.",
      scoringFormula: "Score = SolvedPuzzles × 300",
      scoreDisclaimer: "Scores on this browser exercise reflect immediate task performance and do not constitute a standardized psychological or diagnostic clinical assessment.",
    },
    science: {
      taskLineage: "recreational_logic_deduction",
      implementedTask: "The player reviews 3 deductive clues per puzzle and interacts with a 3x3 matrix to confirm or eliminate entity-attribute pairings across three distinct challenges.",
      researchConstruct: "Propositional Logic & Constraint Satisfaction",
      cognitiveProcessesEngaged: [
        "Deductive Inference",
        "Working Memory Maintenance",
        "Hypothesis Elimination",
        "Relational Integration",
      ],
      neurocognitiveMechanism: "Solving deductive syllogisms and grid constraints engages the left inferior frontal gyrus and posterior parietal cortex, organizing propositions into a mental model and systematically eliminating contradictions.",
      transferLimitations: {
        nearVsFarTransferSummary: "Practicing grid deduction sharpens systematic notation and constraint satisfaction heuristics, but does not transfer to unrelated domains such as statistical judgment or emotional decision-making.",
        unsupportedClaims: [
          "Does not increase generalized IQ or fluid intelligence",
          "Does not prevent cognitive decline or replace formal logic education",
        ],
      },
      implementationFidelity: {
        differencesFromLaboratoryProtocol: [
          "Simplified 3x3 matrix puzzles rather than large-scale 5x5 formal psychometric relational reasoning batteries",
          "Recreational clues containing domain-specific world knowledge (e.g. Paris is in France)",
          "Unmonitored self-paced interaction without time-to-solution latency pressure",
        ],
        knownConfounders: [
          "Prior familiarity with logic grid elimination notation and Sudoku-style grids",
          "World knowledge variances regarding geographic or topical clue statements",
        ],
      },
      evidenceStatus: {
        replicatedFindings: [
          "External visual matrices substantially reduce working memory load compared to solving identical logic problems purely in memory.",
          "Negative clues ('Alice does not live in Paris') require higher cognitive processing time than direct affirmations.",
        ],
        mixedOrDebatedClaims: [
          "Whether training on discrete logic grid puzzles enhances real-world problem-solving in unstructured professional environments.",
        ],
        unsupportedExtrapolations: [
          "Claims that completing daily logic grids prevents age-related analytical decline.",
        ],
      },
      citations: [],
    },
    strategies: [
      {
        title: "Negative Elimination First",
        technique: "Mark 'X' for every direct negative statement ('Carol has never visited Europe') immediately to narrow down remaining possibilities.",
      },
      {
        title: "Row-Column Uniqueness",
        technique: "Once a 'Check' is confirmed for an entity, immediately mark 'X' in all other cells in that same row and column.",
      },
    ],
    faqs: [
      {
        question: "How does the 3x3 grid help solve the puzzle?",
        answer: "The grid serves as an external memory buffer. By marking known impossibilities with 'X', you visually isolate the only remaining valid pairings without having to hold all permutations in working memory.",
      },
      {
        question: "Can these puzzles be solved by guessing?",
        answer: "While guessing is technically possible, every puzzle is designed with deterministic clues that allow 100% deduction through pure elimination without speculative trial-and-error.",
      },
    ],
    relatedGameIds: ["codebreaker", "nonogram-logic", "planning-constraints"],
  },

  // ===========================================================================
  // 5. MENTAL MATH SPRINT (math-sprint)
  // ===========================================================================
  {
    gameId: "math-sprint",
    contentVersion: "1.0.0",
    lastAudited: "2026-03-15",
    overview: {
      summary: "Develops rapid mental calculation, arithmetic fact retrieval, and working memory speed through a 60-second procedural arithmetic challenge.",
      cognitiveFocusBadge: "Numerical Fluency & Calculation Speed",
      targetAudience: "Finance professionals, STEM students, and anyone looking to sharpen daily mental arithmetic speed.",
    },
    mechanics: {
      inputMethods: ["Physical Keyboard (Enter)", "On-Screen Keypad"],
      objective: "Solve procedurally generated arithmetic expressions (+, -, ×, ÷) as quickly and accurately as possible within 60 seconds.",
      rules: [
        {
          condition: "Answer entered matches correct arithmetic solution",
          requiredAction: "Submit via Enter key to advance immediately to next question.",
          penaltyIfWrong: "-25 points, resets current streak counter to zero",
        },
      ],
      pacingStructure: {
        timeLimitSeconds: 60,
        description: "60-second fixed session; self-paced questions generated procedurally across Easy, Medium, Hard, and Expert tiers.",
      },
      terminationCondition: "Countdown timer reaches zero seconds.",
      difficultyProgression: "Questions increase in operational complexity (single operation to mixed parentheses) as consecutive correct answers accumulate.",
    },
    scoring: {
      implementationRecordedMetrics: [
        { metricName: "Total Score", unit: "points", description: "Composite score based on difficulty tier, streaks, and speed bonuses" },
        { metricName: "Correct Answers", unit: "count", description: "Total problems correctly solved within 60 seconds" },
        { metricName: "Accuracy Rate", unit: "percentage", description: "Share of correct answers out of total attempted" },
        { metricName: "Best Streak", unit: "count", description: "Highest number of consecutive correct answers without error" },
        { metricName: "Mean Solve Latency", unit: "milliseconds", description: "Average time required per problem submission" },
      ],
      scoringMechanismDescription: "Points equal round(100 × DiffMultiplier × (1 + StreakBonus) + CappedSpeedBonus). Incorrect answers deduct 25 points and reset streaks.",
      scoringFormula: "Points = round(100 × DiffMult × (1 + min(0.5, Streak × 0.05)) + min(25, max(0, floor((3000 - LatencyMs) / 120))))",
      scoreDisclaimer: "Scores on this browser exercise reflect immediate task performance and do not constitute a standardized psychological or diagnostic clinical assessment.",
    },
    science: {
      taskLineage: "recreational_arithmetic_heuristic",
      implementedTask: "The player solves randomized arithmetic problems with keyboard input during a 60-second countdown across four difficulty tiers.",
      researchConstruct: "Arithmetic Fluency & Working Memory Retrieval",
      cognitiveProcessesEngaged: [
        "Numerical Fact Retrieval",
        "Working Memory Updating",
        "Algorithmic Decomposition",
        "Motor Typing Speed",
      ],
      neurocognitiveMechanism: "Simple single-digit arithmetic relies on direct fact retrieval from the left angular gyrus, whereas multi-step compound calculations recruit the intraparietal sulcus and prefrontal cortex for intermediate carry-over storage.",
      transferLimitations: {
        nearVsFarTransferSummary: "Practice significantly increases speed on practiced number combinations and arithmetic shortcuts, but exhibits minimal transfer to abstract mathematics, algebraic proofs, or statistical intuition.",
        unsupportedClaims: [
          "Does not raise general fluid intelligence or mathematical IQ",
          "Does not replace comprehensive curriculum mathematics education",
        ],
      },
      implementationFidelity: {
        differencesFromLaboratoryProtocol: [
          "Keyboard typing speed and numpad layout familiarity strongly influence recorded latency",
          "Recreational game pacing with gamified streak multiplier bonuses",
          "Procedural random generation rather than standardized psychometric problem sets",
        ],
        knownConfounders: [
          "Hardware keyboard responsiveness versus mobile touchscreen typing delay",
          "Math anxiety impacting working memory capacity under time pressure",
        ],
      },
      evidenceStatus: {
        replicatedFindings: [
          "Arithmetic speed reflects a transition from slow procedural counting to rapid direct memory retrieval.",
          "Time pressure degrades working memory capacity in individuals with elevated mathematics anxiety.",
        ],
        mixedOrDebatedClaims: [
          "The extent to which speed arithmetic drilling improves conceptual mathematical understanding.",
        ],
        unsupportedExtrapolations: [
          "Claims that timed mental math sprint drills prevent general cognitive decline.",
        ],
      },
      citations: [
        {
          authors: "Ashcraft, M. H.",
          year: 1992,
          paperTitle: "Cognitive arithmetic: A review of data and theory",
          source: "Cognition, 44(1-2), 75–106",
          urlOrDoi: "https://doi.org/10.1016/0010-0277(92)90051-C",
        },
      ],
    },
    strategies: [
      {
        title: "Decomposition into Friendly Numbers",
        technique: "Break complex additions into clean tens (e.g. 48 + 37 becomes 48 + 30 + 7 = 78 + 7 = 85).",
      },
      {
        title: "Maintain Accuracy Over Speed",
        technique: "Because incorrect answers reset your streak multiplier and deduct 25 points, maintaining an unbroken streak yields significantly higher scores than rushing.",
      },
    ],
    faqs: [
      {
        question: "Why do clean integer divisions feel easier than multiplications?",
        answer: "Division in this game is generated with whole integer quotients, allowing you to use inverse multiplication retrieval (e.g., for 56 ÷ 8, thinking '8 times what equals 56?').",
      },
      {
        question: "How can I improve my calculation speed under pressure?",
        answer: "Focus on internalizing mental shortcuts, such as rounding to the nearest ten or multiplying by 5 as (half of 10), rather than trying to force paper-style long calculation algorithms.",
      },
    ],
    relatedGameIds: ["number-sense", "number-comparison", "mental-arithmetic-strategies"],
  },

  // ===========================================================================
  // 6. VISUAL SEARCH (visual-search)
  // ===========================================================================
  {
    gameId: "visual-search",
    contentVersion: "1.0.0",
    lastAudited: "2026-03-15",
    overview: {
      summary: "Measures visual attention distribution, feature integration, and serial scanning through a conjunction visual search task with scaling distractor set sizes.",
      cognitiveFocusBadge: "Visual Attention & Conjunction Search",
      targetAudience: "Designers, quality control inspectors, and gamers seeking an active visual scanning warmup.",
    },
    mechanics: {
      inputMethods: ["Mouse Click", "Touchscreen Tap"],
      objective: "Locate and click the unique target (Red letter 'T') among randomly scattered conjunction distractors (Red 'L', Blue 'T', and Blue 'L') across 10 rounds.",
      rules: [
        {
          condition: "Target clicked (Red 'T')",
          requiredAction: "Click the target item as quickly as possible.",
          penaltyIfWrong: "-50 points, registers error penalty",
        },
      ],
      pacingStructure: {
        description: "10 discrete self-paced rounds with distractor set sizes scaling progressively from 16 to 40 items.",
      },
      terminationCondition: "Completion of all 10 evaluation rounds.",
      difficultyProgression: "Distractor density increases every round (ItemCount = 16 + min(24, Round × 4)), increasing visual clutter.",
    },
    scoring: {
      implementationRecordedMetrics: [
        { metricName: "Mean Search Latency", unit: "milliseconds", description: "Average elapsed time from stimulus onset to target acquisition" },
        { metricName: "Search Accuracy", unit: "percentage", description: "Share of rounds completed without clicking distractors" },
        { metricName: "Total Points", unit: "points", description: "Composite score based on speed minus misclick penalties" },
      ],
      scoringMechanismDescription: "Points are awarded per round based on reaction time (max(50, round(500 - LatencyMs / 15))) minus a 50-point penalty for incorrect clicks.",
      scoringFormula: "Score = Σ max(50, round(500 - LatencyMs / 15)) - (Errors × 50)",
      scoreDisclaimer: "Scores on this browser exercise reflect immediate task performance and do not constitute a standardized psychological or diagnostic clinical assessment.",
    },
    science: {
      taskLineage: "formal_experimental_paradigm",
      implementedTask: "The player scans a 2D display to locate a Red 'T' amongst a field of 16 to 40 rotated distractors sharing either color (Red 'L') or shape (Blue 'T') across 10 rounds.",
      researchConstruct: "Feature Integration Theory & Serial Visual Search",
      cognitiveProcessesEngaged: [
        "Focal Visual Attention",
        "Feature Binding (Color + Shape)",
        "Serial Visual Scanning",
        "Spatial Saccade Planning",
      ],
      neurocognitiveMechanism: "Simple single-feature searches (e.g. green circle among red circles) pop out in parallel via early visual cortex V1/V4. Conjunction searches sharing both color and shape require focal spatial attention mediated by the posterior parietal cortex and frontal eye fields to bind features serially.",
      transferLimitations: {
        nearVsFarTransferSummary: "Practice improves screen-specific scanning trajectories and target template matching, but does not transfer to real-world luggage inspection, radiology, or general eyesight sharpness.",
        unsupportedClaims: [
          "Does not improve visual acuity or correct ophthalmological focus defects",
          "Does not qualify users for professional security or medical screening roles",
        ],
      },
      implementationFidelity: {
        differencesFromLaboratoryProtocol: [
          "Consumer display dimensions and variable visual angle degrees (degrees of visual angle depend on how close the user sits to their screen)",
          "Touchscreen finger occlusion versus laboratory mouse crosshair tracking",
          "Target is present on 100% of trials (standard research protocols include 50% target-absent catch trials)",
        ],
        knownConfounders: [
          "Display size (smartphone 6-inch screen versus 32-inch 4K desktop monitor)",
          "Peripheral vision differences and screen glare",
        ],
      },
      evidenceStatus: {
        replicatedFindings: [
          "Search latency increases linearly with set size in conjunction searches, reflecting serial attentional scanning.",
          "Distractors sharing salient features with the target dramatically increase attentional capture.",
        ],
        mixedOrDebatedClaims: [
          "Whether visual search operates via pure serial item-by-item inspection or guided parallel search prioritisation.",
        ],
        unsupportedExtrapolations: [
          "Claims that digital visual search training permanently expands useful field of view across all life settings.",
        ],
      },
      citations: [
        {
          authors: "Treisman, A. M., & Gelade, G.",
          year: 1980,
          paperTitle: "A feature-integration theory of attention",
          source: "Cognitive Psychology, 12(1), 97–136",
          urlOrDoi: "https://doi.org/10.1016/0010-0285(80)90005-5",
        },
        {
          authors: "Wolfe, J. M.",
          year: 1994,
          paperTitle: "Guided Search 2.0: A revised model of visual search",
          source: "Psychonomic Bulletin & Review, 1(2), 202–238",
          urlOrDoi: "https://doi.org/10.3758/BF03200774",
        },
      ],
    },
    strategies: [
      {
        title: "Color-First Filtering",
        technique: "Direct your focal attention exclusively to red items while mentally discarding all blue items, effectively halving the required search set.",
      },
      {
        title: "Quadrant Scanning",
        technique: "Systematically sweep screen quadrants (top-left to bottom-right) rather than making erratic saccades across the entire display.",
      },
    ],
    faqs: [
      {
        question: "Why can't I spot the target instantly like on simple color games?",
        answer: "Because this is a conjunction search. The target shares color with some distractors (Red 'L') and shape with others (Blue 'T'). No single visual feature distinguishes it, forcing your brain to use serial focal attention to check both features together.",
      },
      {
        question: "Why does the game get slower in later rounds?",
        answer: "Each round adds more distractors (scaling from 16 up to 40 items). Because conjunction search requires serial scanning, each additional distractor adds approximately 20–40 milliseconds to your expected search time.",
      },
    ],
    relatedGameIds: ["change-detection", "focus-challenge", "sustained-attention"],
  },
];
