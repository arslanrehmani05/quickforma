import { describe, it, expect } from 'vitest';
import { MIND_GAMES_CATALOG } from '../../src/data/mindGamesCatalog';
import { MindGameId, MindCategory } from '../../src/types/mindExpanded';

describe('QuickForma Mind Suite — 32 Game Catalog Integrity', () => {
  it('contains exactly 32 registered games', () => {
    expect(MIND_GAMES_CATALOG).toHaveLength(32);
  });

  it('ensures every game has a unique ID', () => {
    const ids = MIND_GAMES_CATALOG.map((g) => g.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(32);
  });

  it('preserves the 6 original games with intact identities', () => {
    const originalIds: MindGameId[] = [
      'math-sprint',
      'number-sense',
      'pattern-challenge',
      'logic-challenge',
      'probability-challenge',
      'focus-challenge',
    ];

    originalIds.forEach((id) => {
      const found = MIND_GAMES_CATALOG.find((g) => g.id === id);
      expect(found).toBeDefined();
      expect(found?.isExisting).toBe(true);
    });
  });

  it('includes all 26 new cognitive game additions', () => {
    const newGameIds: MindGameId[] = [
      // Group A (4)
      'dual-n-back',
      'spatial-sequence',
      'sequence-recall',
      'change-detection',
      // Group B (5)
      'stroop-challenge',
      'go-no-go',
      'sustained-attention',
      'visual-search',
      'task-switch',
      // Group C (3)
      'mental-rotation',
      'paper-folding',
      'pathfinding',
      // Group D (5)
      'matrix-reasoning',
      'rule-discovery',
      'logic-grid',
      'codebreaker',
      'sequence-ordering',
      // Group E (5)
      'tower-of-hanoi',
      'peg-solitaire',
      'tactical-planner',
      'nonogram-logic',
      'planning-constraints',
      // Group F (4)
      'number-comparison',
      'probability-lab',
      'evidence-update',
      'mental-arithmetic-strategies',
    ];

    expect(newGameIds).toHaveLength(26);

    newGameIds.forEach((id) => {
      const found = MIND_GAMES_CATALOG.find((g) => g.id === id);
      expect(found).toBeDefined();
      expect(found?.title.length).toBeGreaterThan(0);
      expect(found?.description.length).toBeGreaterThan(15);
      expect(found?.cognitiveSkill.length).toBeGreaterThan(5);
      expect(found?.badge.length).toBeGreaterThan(5);
    });
  });

  it('categorizes every game into valid cognitive domains', () => {
    const validCategories: MindCategory[] = [
      'all',
      'arithmetic',
      'memory',
      'attention',
      'spatial',
      'reasoning',
      'planning',
      'numerical',
    ];

    MIND_GAMES_CATALOG.forEach((game) => {
      expect(validCategories).toContain(game.category);
    });
  });
});

describe('Mind Suite Game Logic & Algorithmic Validators', () => {
  it('Tower of Hanoi rule: larger disk cannot be placed on smaller disk', () => {
    const isLegalMove = (sourceTopDisk: number, targetTopDisk: number | null): boolean => {
      if (targetTopDisk === null) return true; // Empty peg always accepts
      return sourceTopDisk < targetTopDisk;
    };

    // Placing disk 1 on disk 3 is legal
    expect(isLegalMove(1, 3)).toBe(true);
    // Placing disk 3 on disk 1 is illegal
    expect(isLegalMove(3, 1)).toBe(false);
    // Placing disk 2 on empty peg is legal
    expect(isLegalMove(2, null)).toBe(true);
  });

  it('Peg Solitaire jump rule: must jump over adjacent peg into empty hole', () => {
    const isLegalJump = (
      from: { r: number; c: number },
      to: { r: number; c: number },
      midPegExists: boolean,
      targetEmpty: boolean
    ): boolean => {
      const dr = Math.abs(from.r - to.r);
      const dc = Math.abs(from.c - to.c);
      const isOrthogonal2 = (dr === 2 && dc === 0) || (dc === 2 && dr === 0);
      return isOrthogonal2 && midPegExists && targetEmpty;
    };

    // Legal jump over peg into empty hole
    expect(isLegalJump({ r: 3, c: 1 }, { r: 3, c: 3 }, true, true)).toBe(true);
    // Diagonal jump rejected
    expect(isLegalJump({ r: 2, c: 2 }, { r: 4, c: 4 }, true, true)).toBe(false);
    // Jump over empty space rejected
    expect(isLegalJump({ r: 3, c: 1 }, { r: 3, c: 3 }, false, true)).toBe(false);
    // Jump into occupied hole rejected
    expect(isLegalJump({ r: 3, c: 1 }, { r: 3, c: 3 }, true, false)).toBe(false);
  });

  it('Codebreaker feedback: handles exact vs misplaced matches accurately', () => {
    const evaluateBullsAndCows = (secret: string[], guess: string[]) => {
      let exact = 0;
      let colorOnly = 0;
      const secretUnmatched: string[] = [];
      const guessUnmatched: string[] = [];

      for (let i = 0; i < secret.length; i++) {
        if (guess[i] === secret[i]) {
          exact++;
        } else {
          secretUnmatched.push(secret[i]);
          guessUnmatched.push(guess[i]);
        }
      }

      for (const g of guessUnmatched) {
        const idx = secretUnmatched.indexOf(g);
        if (idx !== -1) {
          colorOnly++;
          secretUnmatched.splice(idx, 1);
        }
      }

      return { exact, colorOnly };
    };

    const secret = ['red', 'blue', 'green', 'yellow'];

    // All exact
    expect(evaluateBullsAndCows(secret, ['red', 'blue', 'green', 'yellow'])).toEqual({ exact: 4, colorOnly: 0 });
    // Permuted
    expect(evaluateBullsAndCows(secret, ['yellow', 'green', 'blue', 'red'])).toEqual({ exact: 0, colorOnly: 4 });
    // 2 exact, 2 misplaced
    expect(evaluateBullsAndCows(secret, ['red', 'blue', 'yellow', 'green'])).toEqual({ exact: 2, colorOnly: 2 });
    // Completely wrong
    expect(evaluateBullsAndCows(secret, ['purple', 'orange', 'black', 'white'])).toEqual({ exact: 0, colorOnly: 0 });
  });

  it('Bayes Theorem Evidence Update: calculates posterior probability accurately', () => {
    const computePosterior = (prior: number, sensitivity: number, falsePositive: number): number => {
      const pPositiveGivenTrue = sensitivity;
      const pPositiveGivenFalse = falsePositive;
      const pPositive = (prior * pPositiveGivenTrue) + ((1 - prior) * pPositiveGivenFalse);
      return (prior * pPositiveGivenTrue) / pPositive;
    };

    // Prior = 1%, Sensitivity = 90%, False Positive = 5%
    const posterior = computePosterior(0.01, 0.90, 0.05);
    // 0.009 / (0.009 + 0.0495) = 0.009 / 0.0585 ≈ 0.1538 (15.4%)
    expect(posterior).toBeCloseTo(0.1538, 3);
  });

  it('Pathfinding BFS: calculates reachability and shortest distance in obstacle grid', () => {
    const bfs = (gridSize: number, start: [number, number], goal: [number, number], walls: boolean[][]): number => {
      const queue: [number, number, number][] = [[start[0], start[1], 0]];
      const visited = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
      visited[start[0]][start[1]] = true;

      const dr = [-1, 1, 0, 0];
      const dc = [0, 0, -1, 1];

      while (queue.length > 0) {
        const [r, c, dist] = queue.shift()!;
        if (r === goal[0] && c === goal[1]) return dist;

        for (let i = 0; i < 4; i++) {
          const nr = r + dr[i];
          const nc = c + dc[i];
          if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && !walls[nr][nc] && !visited[nr][nc]) {
            visited[nr][nc] = true;
            queue.push([nr, nc, dist + 1]);
          }
        }
      }
      return -1;
    };

    const walls = [
      [false, false, false],
      [true, true, false],
      [false, false, false],
    ];

    // Must navigate around the wall: (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) = 4 steps
    const dist = bfs(3, [0, 0], [2, 2], walls);
    expect(dist).toBe(4);
  });
});
