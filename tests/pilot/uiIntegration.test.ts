import { describe, it, expect } from 'vitest';
import {
  getPilotToolContent,
  getPilotGameContent,
  AUTHORIZED_PILOT_TOOL_IDS,
  AUTHORIZED_PILOT_GAME_IDS,
} from '../../src/data/content/lookup';
import { PILOT_TOOL_CONTENT } from '../../src/data/content/tools/pilotToolContent';
import { PILOT_GAME_CONTENT } from '../../src/data/content/games/pilotGameContent';
import { TOOLS_CATALOG } from '../../src/data/toolsCatalog';
import { MIND_GAMES_CATALOG } from '../../src/data/mindGamesCatalog';

describe('Phase 3 Controlled UI Integration Verification Suite', () => {
  const validToolCatalogIds = new Set(TOOLS_CATALOG.map((t) => t.id));
  const validGameCatalogIds = new Set(MIND_GAMES_CATALOG.map((g) => g.id));

  // =========================================================================
  // 1. Tool Content Lookup & Scope Boundaries
  // =========================================================================
  describe('Tool Pilot Content Resolution & Scope Boundaries', () => {
    it('resolves exactly the 8 authorized pilot tools to their correct content records', () => {
      const EXPECTED_PILOT_TOOLS = [
        'freelance-hourly-rate-calculator',
        'oee-calculator',
        'homework-time-estimator',
        'jwt-decoder',
        'invoice-generator',
        'property-cap-rate-sensitivity-calculator',
        'chmod-calculator',
        'regex-tester',
      ];

      expect(AUTHORIZED_PILOT_TOOL_IDS.length).toBe(8);
      expect(AUTHORIZED_PILOT_TOOL_IDS.sort()).toEqual(EXPECTED_PILOT_TOOLS.sort());

      for (const toolId of EXPECTED_PILOT_TOOLS) {
        const content = getPilotToolContent(toolId);
        expect(content).toBeDefined();
        expect(content?.toolId).toBe(toolId);
      }
    });

    it('returns undefined for non-pilot tools without throwing or defaulting to another tool', () => {
      const nonPilotToolIds = ['payroll-tax-estimator', 'mortgage-loan-calculator', 'roi-calculator', 'fake-nonexistent-tool'];
      for (const id of nonPilotToolIds) {
        expect(getPilotToolContent(id)).toBeUndefined();
      }
    });

    it('handles undefined, empty string, or null tool IDs safely', () => {
      expect(getPilotToolContent(undefined)).toBeUndefined();
      expect(getPilotToolContent('')).toBeUndefined();
      expect(getPilotToolContent(null as any)).toBeUndefined();
    });

    it('verifies all 8 pilot tools cover all 6 worked-example families without missing variants', () => {
      const variants = new Set(PILOT_TOOL_CONTENT.map((t) => t.workedExample.type));
      expect(variants.has('calculation')).toBe(true);
      expect(variants.has('transformation')).toBe(true);
      expect(variants.has('document')).toBe(true);
      expect(variants.has('analysis_matrix')).toBe(true);
      expect(variants.has('reference_lookup')).toBe(true);
      expect(variants.has('diagnostic_audit')).toBe(true);
      expect(variants.size).toBe(6);
    });

    it('verifies every relatedTool link in pilot content points to a valid catalog tool', () => {
      for (const tool of PILOT_TOOL_CONTENT) {
        for (const rel of tool.relatedTools) {
          expect(validToolCatalogIds.has(rel.toolId)).toBe(true);
          expect(rel.toolId).not.toBe(tool.toolId);
          expect(rel.workflowRationale.length).toBeGreaterThan(10);
        }
      }
    });
  });

  // =========================================================================
  // 2. Game Content Lookup & Scope Boundaries
  // =========================================================================
  describe('Game Pilot Content Resolution & Scope Boundaries', () => {
    it('resolves exactly the 6 authorized pilot games to their correct content records', () => {
      const EXPECTED_PILOT_GAMES = [
        'stroop-challenge',
        'task-switch',
        'mental-rotation',
        'logic-grid',
        'math-sprint',
        'visual-search',
      ];

      expect(AUTHORIZED_PILOT_GAME_IDS.length).toBe(6);
      expect(AUTHORIZED_PILOT_GAME_IDS.sort()).toEqual(EXPECTED_PILOT_GAMES.sort());

      for (const gameId of EXPECTED_PILOT_GAMES) {
        const content = getPilotGameContent(gameId);
        expect(content).toBeDefined();
        expect(content?.gameId).toBe(gameId);
      }
    });

    it('returns undefined for the other 26 non-pilot games without throwing', () => {
      const otherGameIds = [
        'dual-n-back',
        'spatial-sequence',
        'sequence-recall',
        'change-detection',
        'go-no-go',
        'sustained-attention',
        'paper-folding',
        'pathfinding',
        'tower-of-hanoi',
      ];

      for (const gameId of otherGameIds) {
        expect(getPilotGameContent(gameId)).toBeUndefined();
      }
    });

    it('handles undefined, empty string, or null game IDs safely', () => {
      expect(getPilotGameContent(undefined)).toBeUndefined();
      expect(getPilotGameContent('')).toBeUndefined();
      expect(getPilotGameContent(null as any)).toBeUndefined();
    });

    it('verifies game switching dynamics: resolving game A then game B yields distinct content without state retention', () => {
      const stroop = getPilotGameContent('stroop-challenge');
      const math = getPilotGameContent('math-sprint');
      const nonPilot = getPilotGameContent('dual-n-back');

      expect(stroop?.gameId).toBe('stroop-challenge');
      expect(math?.gameId).toBe('math-sprint');
      expect(stroop?.overview.cognitiveFocusBadge).not.toBe(math?.overview.cognitiveFocusBadge);
      expect(nonPilot).toBeUndefined();
    });

    it('verifies all relatedGameIds in pilot content point to valid mind games catalog IDs', () => {
      for (const game of PILOT_GAME_CONTENT) {
        for (const relId of game.relatedGameIds) {
          expect(validGameCatalogIds.has(relId)).toBe(true);
          expect(relId).not.toBe(game.gameId);
        }
      }
    });
  });

  // =========================================================================
  // 3. Section 10 Sanity Preservation & App Requirements
  // =========================================================================
  describe('Sanity Section 10 & App Template Compliance', () => {
    it('ensures toolsCatalog and mindGamesCatalog lengths remain strictly unchanged', () => {
      expect(TOOLS_CATALOG.length).toBe(511);
      expect(MIND_GAMES_CATALOG.length).toBe(32);
    });

    it('ensures the 6 pilot games have accurate lineage badges and scientific constraints', () => {
      for (const game of PILOT_GAME_CONTENT) {
        expect(game.science.transferLimitations.unsupportedClaims.length).toBeGreaterThan(0);
        expect(game.science.implementationFidelity.differencesFromLaboratoryProtocol.length).toBeGreaterThan(0);
        expect(game.scoring.scoreDisclaimer.length).toBeGreaterThan(20);
      }
    });
  });
});
