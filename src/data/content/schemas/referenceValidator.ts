/**
 * QuickForma Reference Validator (Catalog Separation)
 * Decouples structural validation (Zod) from live catalog reference checking.
 * Treats toolsCatalog.ts and mindGamesCatalog.ts as strict read-only sources of truth.
 */

import { ToolContent } from "./toolContent";
import { MindGameContent } from "./mindGameContent";

export interface ReferenceValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates that all tool IDs in ToolContent exist in the canonical tools catalog.
 */
export const validateToolCatalogReferences = (
  content: ToolContent,
  validToolIds: Set<string>
): ReferenceValidationResult => {
  const errors: string[] = [];

  // 1. Verify primary toolId exists in catalog
  if (!validToolIds.has(content.toolId)) {
    errors.push(`Tool ID '${content.toolId}' does not exist in the canonical tools catalog.`);
  }

  // 2. Verify all related tool IDs exist in catalog
  for (const ref of content.relatedTools) {
    if (!validToolIds.has(ref.toolId)) {
      errors.push(`Related tool ID '${ref.toolId}' (referenced by '${content.toolId}') does not exist in the canonical tools catalog.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validates that all game IDs in MindGameContent exist in the canonical mind games catalog.
 */
export const validateGameCatalogReferences = (
  content: MindGameContent,
  validGameIds: Set<string>
): ReferenceValidationResult => {
  const errors: string[] = [];

  // 1. Verify primary gameId exists in catalog
  if (!validGameIds.has(content.gameId)) {
    errors.push(`Game ID '${content.gameId}' does not exist in the canonical mind games catalog.`);
  }

  // 2. Verify all related game IDs exist in catalog
  for (const relatedId of content.relatedGameIds) {
    if (!validGameIds.has(relatedId)) {
      errors.push(`Related game ID '${relatedId}' (referenced by '${content.gameId}') does not exist in the canonical mind games catalog.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
