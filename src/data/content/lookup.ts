import { PILOT_TOOL_CONTENT } from './tools/pilotToolContent';
import { PILOT_GAME_CONTENT } from './games/pilotGameContent';
import { ToolContent } from './schemas/toolContent';
import { MindGameContent } from './schemas/mindGameContent';

// Fast O(1) canonical ID lookup maps
const PILOT_TOOL_MAP = new Map<string, ToolContent>(
  PILOT_TOOL_CONTENT.map((t) => [t.toolId, t])
);

const PILOT_GAME_MAP = new Map<string, MindGameContent>(
  PILOT_GAME_CONTENT.map((g) => [g.gameId, g])
);

/**
 * Resolves a pilot tool content record by its canonical ID.
 * Returns undefined for non-pilot tools without throwing or falling back to incorrect records.
 */
export function getPilotToolContent(toolId: string | undefined): ToolContent | undefined {
  if (!toolId) return undefined;
  return PILOT_TOOL_MAP.get(toolId);
}

/**
 * Resolves a pilot mind game content record by its canonical ID.
 * Returns undefined for non-pilot games without throwing or falling back to incorrect records.
 */
export function getPilotGameContent(gameId: string | undefined): MindGameContent | undefined {
  if (!gameId) return undefined;
  return PILOT_GAME_MAP.get(gameId);
}

export const AUTHORIZED_PILOT_TOOL_IDS = Array.from(PILOT_TOOL_MAP.keys());
export const AUTHORIZED_PILOT_GAME_IDS = Array.from(PILOT_GAME_MAP.keys());
