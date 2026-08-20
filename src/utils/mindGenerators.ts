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

import { NumberSenseQuestion } from '../types/mind';

/**
 * Procedural Question Generator for Number Sense
 * Solvable efficiently through estimation, comparison, proportional reasoning, magnitude recognition, or numerical structure.
 * Multi-step paper arithmetic is BANNED.
 */
export function generateNumberSenseQuestion(
  difficulty: MindDifficulty,
  _qIndex: number
): NumberSenseQuestion {
  let attempt = 0;
  while (attempt < 50) {
    attempt++;
    const q = createCandidateNumberSenseQuestion(difficulty);
    if (isValidNumberSenseQuestion(q)) {
      return q;
    }
  }

  // Fallback safe default
  return {
    prompt: 'Which is larger?',
    options: ['0.80', '1/2'],
    correctIndex: 0,
    family: 'decimal_vs_fraction_easy',
  };
}

function isValidNumberSenseQuestion(q: NumberSenseQuestion): boolean {
  if (!q.prompt || !q.options || q.options.length < 2) return false;
  if (q.correctIndex < 0 || q.correctIndex >= q.options.length) return false;
  // Ensure options are distinct strings
  const set = new Set(q.options);
  if (set.size !== q.options.length) return false;
  return true;
}

function createCandidateNumberSenseQuestion(difficulty: MindDifficulty): NumberSenseQuestion {
  switch (difficulty) {
    case 'easy': {
      // Easy: "Obviously X is bigger" (Wide differences > 20%)
      const type = ['decimal_vs_fraction_easy', 'ratio_easy', 'magnitude_easy'][Math.floor(Math.random() * 3)];

      if (type === 'decimal_vs_fraction_easy') {
        const dec = 0.85;
        const fracText = '1/2';
        const fracVal = 0.5;
        const decGreater = dec > fracVal;
        const options = [`${dec}`, `${fracText}`];
        return {
          prompt: 'Which is larger?',
          options,
          correctIndex: decGreater ? 0 : 1,
          family: 'decimal_vs_fraction_easy',
        };
      } else if (type === 'ratio_easy') {
        const options = ['4:1', '1:4'];
        return {
          prompt: 'Which ratio represents a larger value?',
          options,
          correctIndex: 0,
          family: 'ratio_easy',
        };
      } else {
        const val1 = 750;
        const val2 = 75;
        const options = [`${val1}`, `${val2}`];
        return {
          prompt: 'Which value is larger?',
          options,
          correctIndex: 0,
          family: 'magnitude_easy',
        };
      }
    }

    case 'medium': {
      // Medium: "I can see the relationship without calculating exactly"
      const type = ['mult_estimation', 'pct_estimation', 'fraction_benchmark'][Math.floor(Math.random() * 3)];

      if (type === 'mult_estimation') {
        // e.g. 0.48 * 500 (= 240) vs 0.5 * 470 (= 235)
        const options = ['0.48 × 500', '0.5 × 470'];
        const val1 = 0.48 * 500;
        const val2 = 0.5 * 470;
        return {
          prompt: 'Which expression is larger?',
          options,
          correctIndex: val1 > val2 ? 0 : 1,
          family: 'mult_estimation',
        };
      } else if (type === 'pct_estimation') {
        // e.g. Without calculating, which is closest to 19% of 250? -> 50
        const options = ['25', '50', '75', '100'];
        return {
          prompt: 'Without calculating exactly, which is closest to 19% of 250?',
          options,
          correctIndex: 1, // 50 (exact is 47.5)
          family: 'pct_estimation',
        };
      } else {
        // Benchmark e.g. closest to 1/3
        const options = ['25%', '33%', '40%', '50%'].sort(() => Math.random() - 0.5);
        const correctIndex = options.indexOf('33%');
        return {
          prompt: 'Which percentage is closest to 1/3?',
          options,
          correctIndex,
          family: 'fraction_benchmark',
        };
      }
    }

    case 'hard': {
      // Hard: "I need to reason carefully about the relationship"
      const type = ['fraction_magnitude_hard', 'pct_shift', 'order_magnitude'][Math.floor(Math.random() * 3)];

      if (type === 'fraction_magnitude_hard') {
        // e.g. 4/7 (=0.571) vs 5/9 (=0.555)
        const options = ['4/7', '5/9'];
        const val1 = 4 / 7;
        const val2 = 5 / 9;
        return {
          prompt: 'Which fraction is larger?',
          options,
          correctIndex: val1 > val2 ? 0 : 1,
          family: 'fraction_magnitude_hard',
        };
      } else if (type === 'pct_shift') {
        const options = ['20%', '25%', '30%', '40%'].sort(() => Math.random() - 0.5);
        const correctIndex = options.indexOf('25%');
        return {
          prompt: 'An increase from 80 to 100 represents what percentage increase?',
          options,
          correctIndex,
          family: 'pct_shift',
        };
      } else {
        // Order of magnitude: 4.8 * 10^3 = 4800 vs 5200
        const options = ['4.8 × 10³', '5,200'];
        return {
          prompt: 'Which value is larger?',
          options,
          correctIndex: 1, // 5,200 is larger than 4,800
          family: 'order_magnitude',
        };
      }
    }

    case 'expert': {
      // Expert: "I need strong numerical intuition to see the answer quickly"
      const type = ['structural_fraction', 'sqrt_bounds', 'indisputable_impossible'][Math.floor(Math.random() * 3)];

      if (type === 'structural_fraction') {
        // e.g. 49/51 (1 - 2/51 = 0.9607) vs 97/101 (1 - 4/101 = 0.96039)
        const options = ['49/51', '97/101'];
        const val1 = 49 / 51;
        const val2 = 97 / 101;
        return {
          prompt: 'Which fraction is larger?',
          options,
          correctIndex: val1 > val2 ? 0 : 1,
          family: 'structural_fraction',
        };
      } else if (type === 'sqrt_bounds') {
        // e.g. Is √87 closer to 9 or 10? (81 vs 100, 87 is 6 away from 81 and 13 away from 100 -> closer to 9)
        const options = ['9', '10'];
        return {
          prompt: 'Is √87 closer to 9 or 10?',
          options,
          correctIndex: 0,
          family: 'sqrt_bounds',
        };
      } else {
        // Indisputable impossible: Probability = 1.4
        const options = [
          'Probability of an event = 1.4',
          'Percentage of a total = 85%',
          'Square root of a number = 3.5',
          'Ratio of two quantities = 2:3',
        ].sort(() => Math.random() - 0.5);

        const correctIndex = options.indexOf('Probability of an event = 1.4');
        return {
          prompt: 'Which metric is mathematically IMPOSSIBLE?',
          options,
          correctIndex,
          family: 'indisputable_impossible',
        };
      }
    }
  }
}
