import { MindDifficulty, MathSprintQuestion } from '../types/mind';

/**
 * Procedural Question Generator for Mental Math Sprint
 * Randomized non-predictably per invocation with programmatic validation assertions before return.
 */
export function generateMathSprintQuestion(
  difficulty: MindDifficulty,
  _qIndex: number
): MathSprintQuestion {
  let attempt = 0;
  while (attempt < 50) {
    attempt++;
    const q = createCandidateQuestion(difficulty);
    if (isValidQuestion(q)) {
      return q;
    }
  }

  // Fallback safe default if loop hits 50 attempts
  return {
    text: '12 + 15',
    answer: 27,
  };
}

function isValidQuestion(q: MathSprintQuestion): boolean {
  if (isNaN(q.answer) || !isFinite(q.answer)) return false;
  if (!Number.isInteger(q.answer)) return false;
  return true;
}

function createCandidateQuestion(difficulty: MindDifficulty): MathSprintQuestion {
  switch (difficulty) {
    case 'easy': {
      // Single-operation arithmetic with small values (N <= 20)
      const ops = ['+', '-', '×'];
      const op = ops[Math.floor(Math.random() * ops.length)];

      if (op === '+') {
        const n1 = Math.floor(Math.random() * 15) + 3;
        const n2 = Math.floor(Math.random() * 15) + 3;
        return { text: `${n1} + ${n2}`, answer: n1 + n2 };
      } else if (op === '-') {
        const n1 = Math.floor(Math.random() * 20) + 5;
        const n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
        return { text: `${n1} - ${n2}`, answer: n1 - n2 };
      } else {
        const n1 = Math.floor(Math.random() * 8) + 2;
        const n2 = Math.floor(Math.random() * 8) + 2;
        return { text: `${n1} × ${n2}`, answer: n1 * n2 };
      }
    }

    case 'medium': {
      // Larger single-operation arithmetic + clean division + double-digit multiplication (N <= 90)
      const ops = ['+', '-', '×', '÷'];
      const op = ops[Math.floor(Math.random() * ops.length)];

      if (op === '+') {
        const n1 = Math.floor(Math.random() * 60) + 15;
        const n2 = Math.floor(Math.random() * 60) + 15;
        return { text: `${n1} + ${n2}`, answer: n1 + n2 };
      } else if (op === '-') {
        const n1 = Math.floor(Math.random() * 90) + 20;
        const n2 = Math.floor(Math.random() * (n1 - 10)) + 5;
        return { text: `${n1} - ${n2}`, answer: n1 - n2 };
      } else if (op === '×') {
        const n1 = Math.floor(Math.random() * 14) + 3;
        const n2 = Math.floor(Math.random() * 11) + 3;
        return { text: `${n1} × ${n2}`, answer: n1 * n2 };
      } else {
        // Clean integer division
        const divisor = Math.floor(Math.random() * 11) + 2;
        const quotient = Math.floor(Math.random() * 12) + 2;
        const dividend = divisor * quotient;
        return { text: `${dividend} ÷ ${divisor}`, answer: quotient };
      }
    }

    case 'hard': {
      // Multi-operation expressions requiring mental sequencing (A * B + C, A + B - C)
      const patterns = ['mult_add', 'mult_sub', 'add_sub_three', 'div_add'];
      const pat = patterns[Math.floor(Math.random() * patterns.length)];

      if (pat === 'mult_add') {
        const a = Math.floor(Math.random() * 12) + 3;
        const b = Math.floor(Math.random() * 9) + 2;
        const c = Math.floor(Math.random() * 30) + 5;
        return { text: `${a} × ${b} + ${c}`, answer: a * b + c };
      } else if (pat === 'mult_sub') {
        const a = Math.floor(Math.random() * 12) + 3;
        const b = Math.floor(Math.random() * 9) + 2;
        const prod = a * b;
        const c = Math.floor(Math.random() * (prod - 2)) + 1;
        return { text: `${a} × ${b} - ${c}`, answer: prod - c };
      } else if (pat === 'add_sub_three') {
        const a = Math.floor(Math.random() * 80) + 20;
        const b = Math.floor(Math.random() * 50) + 10;
        const c = Math.floor(Math.random() * 35) + 5;
        return { text: `${a} + ${b} - ${c}`, answer: a + b - c };
      } else {
        const divisor = Math.floor(Math.random() * 10) + 2;
        const quotient = Math.floor(Math.random() * 15) + 3;
        const dividend = divisor * quotient;
        const addVal = Math.floor(Math.random() * 25) + 5;
        return { text: `${dividend} ÷ ${divisor} + ${addVal}`, answer: quotient + addVal };
      }
    }

    case 'expert': {
      // 100% Mathematical Fluency & Mental Calculation Shortcut Families
      const families = ['shortcut_11', 'shortcut_25', 'square_5', 'diff_squares', 'multiply_99', 'pct_shortcut'];
      const fam = families[Math.floor(Math.random() * families.length)];

      if (fam === 'shortcut_11') {
        const n = Math.floor(Math.random() * 75) + 14; // e.g. 34 * 11 = 374
        return { text: `${n} × 11`, answer: n * 11, isShortcut: true };
      } else if (fam === 'shortcut_25') {
        const factor = Math.floor(Math.random() * 14) + 3;
        const n = factor * 4; // e.g. 16 * 25 = 400
        return { text: `${n} × 25`, answer: n * 25, isShortcut: true };
      } else if (fam === 'square_5') {
        const bases = [15, 25, 35, 45, 55, 65, 75, 85, 95];
        const base = bases[Math.floor(Math.random() * bases.length)];
        return { text: `${base}²`, answer: base * base, isShortcut: true };
      } else if (fam === 'diff_squares') {
        const mid = [15, 20, 25, 30, 40, 50][Math.floor(Math.random() * 6)];
        const n1 = mid - 1;
        const n2 = mid + 1;
        return { text: `${n1} × ${n2}`, answer: mid * mid - 1, isShortcut: true };
      } else if (fam === 'multiply_99') {
        const n = Math.floor(Math.random() * 40) + 12; // e.g. 24 * 99 = 2400 - 24 = 2376
        return { text: `${n} × 99`, answer: n * 99, isShortcut: true };
      } else {
        const base = [40, 60, 80, 120, 160, 200, 240][Math.floor(Math.random() * 7)];
        const pct = [15, 25, 75][Math.floor(Math.random() * 3)];
        const ans = (pct / 100) * base;
        return { text: `${pct}% of ${base}`, answer: ans, isShortcut: true };
      }
    }
  }
}
