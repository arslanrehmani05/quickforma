import { describe, it, expect } from "vitest";
import { PILOT_TOOL_CONTENT } from "../../src/data/content/tools/pilotToolContent";
import { PILOT_GAME_CONTENT } from "../../src/data/content/games/pilotGameContent";
import { ToolContentZodSchema } from "../../src/data/content/schemas/toolContent.zod";
import { MindGameContentZodSchema } from "../../src/data/content/schemas/mindGameContent.zod";
import {
  validateToolCatalogReferences,
  validateGameCatalogReferences,
} from "../../src/data/content/schemas/referenceValidator";
import { TOOLS_CATALOG } from "../../src/data/toolsCatalog";
import { MIND_GAMES_CATALOG } from "../../src/data/mindGamesCatalog";

describe("Phase 2 Pilot Content Validation & Contract Compliance", () => {
  const validToolIds = new Set(TOOLS_CATALOG.map((t) => t.id));
  const validGameIds = new Set(MIND_GAMES_CATALOG.map((g) => g.id));

  // =========================================================================
  // 1. TOOL CONTENT SUITE
  // =========================================================================
  describe("Pilot Tool Content Validation (8 entries)", () => {
    it("contains exactly 8 unique tool entries", () => {
      expect(PILOT_TOOL_CONTENT.length).toBe(8);
      const ids = PILOT_TOOL_CONTENT.map((t) => t.toolId);
      expect(new Set(ids).size).toBe(8);
    });

    it("verifies every tool uses its assigned worked-example variant", () => {
      const EXPECTED_VARIANTS: Record<string, string> = {
        "freelance-hourly-rate-calculator": "calculation",
        "oee-calculator": "calculation",
        "homework-time-estimator": "calculation",
        "jwt-decoder": "transformation",
        "invoice-generator": "document",
        "property-cap-rate-sensitivity-calculator": "analysis_matrix",
        "chmod-calculator": "reference_lookup",
        "regex-tester": "diagnostic_audit",
      };

      for (const tool of PILOT_TOOL_CONTENT) {
        expect(tool.workedExample.type).toBe(EXPECTED_VARIANTS[tool.toolId]);
      }
    });

    it("validates that all 8 tools strictly conform to ToolContentZodSchema", () => {
      for (const tool of PILOT_TOOL_CONTENT) {
        const result = ToolContentZodSchema.safeParse(tool);
        if (!result.success) {
          console.error(`Validation failed for tool '${tool.toolId}':`, result.error.issues);
        }
        expect(result.success).toBe(true);
      }
    });

    it("verifies all tool IDs and relatedTool references exist in canonical toolsCatalog.ts", () => {
      for (const tool of PILOT_TOOL_CONTENT) {
        const refResult = validateToolCatalogReferences(tool, validToolIds);
        expect(refResult.valid).toBe(true);
        expect(refResult.errors).toEqual([]);
      }
    });

    it("verifies no tool contains self-references or duplicate relatedTool references", () => {
      for (const tool of PILOT_TOOL_CONTENT) {
        const relatedIds = tool.relatedTools.map((r) => r.toolId);
        expect(relatedIds.includes(tool.toolId)).toBe(false);
        expect(new Set(relatedIds).size).toBe(relatedIds.length);
      }
    });

    it("verifies the diagnostic_audit worked example in regex-tester conforms to truth table", () => {
      const regexTool = PILOT_TOOL_CONTENT.find((t) => t.toolId === "regex-tester");
      expect(regexTool).toBeDefined();
      if (regexTool && regexTool.workedExample.type === "diagnostic_audit") {
        expect(regexTool.workedExample.aggregateStatus).toBe("pass");
        expect(regexTool.workedExample.findings.every((f) => f.severity === "pass")).toBe(true);
      }
    });
  });

  // =========================================================================
  // 2. GAME CONTENT SUITE
  // =========================================================================
  describe("Pilot Game Content Validation (6 entries)", () => {
    it("contains exactly 6 unique game entries", () => {
      expect(PILOT_GAME_CONTENT.length).toBe(6);
      const ids = PILOT_GAME_CONTENT.map((g) => g.gameId);
      expect(new Set(ids).size).toBe(6);
    });

    const EXPECTED_GAME_IDS = [
      "stroop-challenge",
      "task-switch",
      "mental-rotation",
      "logic-grid",
      "math-sprint",
      "visual-search",
    ];

    it("verifies the exact 6 expected pilot game IDs are present", () => {
      const ids = PILOT_GAME_CONTENT.map((g) => g.gameId);
      for (const expectedId of EXPECTED_GAME_IDS) {
        expect(ids.includes(expectedId)).toBe(true);
      }
    });

    it("validates that all 6 games strictly conform to MindGameContentZodSchema", () => {
      for (const game of PILOT_GAME_CONTENT) {
        const result = MindGameContentZodSchema.safeParse(game);
        if (!result.success) {
          console.error(`Validation failed for game '${game.gameId}':`, result.error.issues);
        }
        expect(result.success).toBe(true);
      }
    });

    it("verifies all game IDs and relatedGameIds references exist in canonical mindGamesCatalog.ts", () => {
      for (const game of PILOT_GAME_CONTENT) {
        const refResult = validateGameCatalogReferences(game, validGameIds);
        expect(refResult.valid).toBe(true);
        expect(refResult.errors).toEqual([]);
      }
    });

    it("verifies no game contains self-references or duplicate relatedGameIds", () => {
      for (const game of PILOT_GAME_CONTENT) {
        expect(game.relatedGameIds.includes(game.gameId)).toBe(false);
        expect(new Set(game.relatedGameIds).size).toBe(game.relatedGameIds.length);
      }
    });

    it("enforces verifiable academic citations for formal experimental paradigms", () => {
      const formalGames = PILOT_GAME_CONTENT.filter(
        (g) => g.science.taskLineage === "formal_experimental_paradigm"
      );
      expect(formalGames.length).toBeGreaterThanOrEqual(4); // stroop, task-switch, mental-rotation, visual-search
      for (const g of formalGames) {
        expect(g.science.citations.length).toBeGreaterThanOrEqual(1);
        for (const citation of g.science.citations) {
          expect(citation.authors.length).toBeGreaterThan(0);
          expect(citation.year).toBeGreaterThanOrEqual(1800);
          expect(citation.paperTitle.length).toBeGreaterThan(0);
          expect(citation.source.length).toBeGreaterThan(0);
        }
      }
    });

    it("verifies evidenceStatus has all three required arrays present", () => {
      for (const game of PILOT_GAME_CONTENT) {
        expect(Array.isArray(game.science.evidenceStatus.replicatedFindings)).toBe(true);
        expect(Array.isArray(game.science.evidenceStatus.mixedOrDebatedClaims)).toBe(true);
        expect(Array.isArray(game.science.evidenceStatus.unsupportedExtrapolations)).toBe(true);
      }
    });
  });
});
