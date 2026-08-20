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
        const dec = parseFloat((Math.random() * 0.25 + 0.70).toFixed(2)); // 0.70 to 0.95
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
        const n = Math.floor(Math.random() * 6) + 3; // 3 to 8
        const options = [`${n}:1`, `1:${n}`];
        return {
          prompt: 'Which ratio represents a larger value?',
          options,
          correctIndex: 0,
          family: 'ratio_easy',
        };
      } else {
        const val1 = Math.floor(Math.random() * 700) + 200; // 200 to 900
        const val2 = Math.floor(val1 / 10);
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
        const base = [400, 500, 600][Math.floor(Math.random() * 3)];
        const dec = 0.48;
        const compBase = base - 30;
        const options = [`${dec} × ${base}`, `0.5 × ${compBase}`];
        const val1 = dec * base;
        const val2 = 0.5 * compBase;
        return {
          prompt: 'Which expression is larger?',
          options,
          correctIndex: val1 > val2 ? 0 : 1,
          family: 'mult_estimation',
        };
      } else if (type === 'pct_estimation') {
        // e.g. Without calculating, which is closest to 19% of 250? -> 50
        const pct = [18, 19, 21, 24][Math.floor(Math.random() * 4)];
        const base = [200, 250, 300, 400][Math.floor(Math.random() * 4)];
        const exact = (pct / 100) * base;

        // Bounded magnitude options
        const opt25 = Math.round(base * 0.1);
        const opt50 = Math.round(base * 0.2);
        const opt75 = Math.round(base * 0.3);
        const opt100 = Math.round(base * 0.4);

        const options = [`${opt25}`, `${opt50}`, `${opt75}`, `${opt100}`];
        // Exact 47.5 is closest to opt50 (exact/base is ~0.19, closest to 0.20)
        let closestIdx = 0;
        let minDiff = Math.abs(exact - opt25);
        [opt50, opt75, opt100].forEach((optVal, idx) => {
          const diff = Math.abs(exact - optVal);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx + 1;
          }
        });

        return {
          prompt: `Without calculating exactly, which is closest to ${pct}% of ${base}?`,
          options,
          correctIndex: closestIdx,
          family: 'pct_estimation',
        };
      } else {
        // Benchmark e.g. closest to 1/3 or 2/3
        const benchmarks = [
          { text: '1/3', val: 1 / 3, targetPct: '33%' },
          { text: '2/3', val: 2 / 3, targetPct: '66%' },
          { text: '3/4', val: 3 / 4, targetPct: '75%' },
        ];
        const pick = benchmarks[Math.floor(Math.random() * benchmarks.length)];
        const allOpts = ['25%', '33%', '40%', '66%', '75%'];
        const options = allOpts.filter((o) => o !== pick.targetPct).slice(0, 3);
        options.push(pick.targetPct);
        options.sort(() => Math.random() - 0.5);

        const correctIndex = options.indexOf(pick.targetPct);
        return {
          prompt: `Which percentage is closest to ${pick.text}?`,
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
        const pairs = [
          { f1: '4/7', v1: 4 / 7, f2: '5/9', v2: 5 / 9 },
          { f1: '3/8', v1: 3 / 8, f2: '4/11', v2: 4 / 11 },
          { f1: '5/8', v1: 5 / 8, f2: '7/12', v2: 7 / 12 },
        ];
        const pick = pairs[Math.floor(Math.random() * pairs.length)];
        const options = [pick.f1, pick.f2];
        return {
          prompt: 'Which fraction is larger?',
          options,
          correctIndex: pick.v1 > pick.v2 ? 0 : 1,
          family: 'fraction_magnitude_hard',
        };
      } else if (type === 'pct_shift') {
        const shifts = [
          { start: 80, end: 100, pct: '25%' },
          { start: 50, end: 60, pct: '20%' },
          { start: 40, end: 50, pct: '25%' },
          { start: 80, end: 120, pct: '50%' },
        ];
        const pick = shifts[Math.floor(Math.random() * shifts.length)];
        const options = ['15%', '20%', '25%', '30%', '50%'].filter((o) => o !== pick.pct).slice(0, 3);
        options.push(pick.pct);
        options.sort(() => Math.random() - 0.5);

        const correctIndex = options.indexOf(pick.pct);
        return {
          prompt: `An increase from ${pick.start} to ${pick.end} represents what percentage increase?`,
          options,
          correctIndex,
          family: 'pct_shift',
        };
      } else {
        // Order of magnitude: e.g. 4.8 * 10^3 = 4800 vs 5200
        const mantissa = parseFloat((Math.random() * 3 + 2.5).toFixed(1)); // 2.5 to 5.5
        const val1 = mantissa * 1000;
        const val2 = Math.round(val1 + (Math.random() * 800 + 400));
        const options = [`${mantissa} × 10³`, `${val2.toLocaleString()}`];
        return {
          prompt: 'Which value is larger?',
          options,
          correctIndex: 1, // val2 is larger
          family: 'order_magnitude',
        };
      }
    }

    case 'expert': {
      // Expert: "I need strong numerical intuition to see the answer quickly"
      const type = ['structural_fraction', 'sqrt_bounds', 'indisputable_impossible'][Math.floor(Math.random() * 3)];

      if (type === 'structural_fraction') {
        // e.g. 49/51 vs 97/101
        const pairs = [
          { f1: '49/51', v1: 49 / 51, f2: '97/101', v2: 97 / 101 },
          { f1: '19/21', v1: 19 / 21, f2: '39/41', v2: 39 / 41 },
          { f1: '29/31', v1: 29 / 31, f2: '59/61', v2: 59 / 61 },
        ];
        const pick = pairs[Math.floor(Math.random() * pairs.length)];
        const options = [pick.f1, pick.f2];
        return {
          prompt: 'Which fraction is larger?',
          options,
          correctIndex: pick.v1 > pick.v2 ? 0 : 1,
          family: 'structural_fraction',
        };
      } else if (type === 'sqrt_bounds') {
        // e.g. Is √87 closer to 9 or 10? (81 vs 100, 87 is 6 from 81 and 13 from 100 -> 9)
        const k = [70, 72, 75, 87, 92][Math.floor(Math.random() * 5)];
        const floorRoot = Math.floor(Math.sqrt(k));
        const ceilRoot = floorRoot + 1;
        const diffFloor = Math.abs(k - floorRoot * floorRoot);
        const diffCeil = Math.abs(k - ceilRoot * ceilRoot);
        const closestRoot = diffFloor < diffCeil ? floorRoot : ceilRoot;

        const options = [`${floorRoot}`, `${ceilRoot}`];
        const correctIndex = options.indexOf(`${closestRoot}`);
        return {
          prompt: `Is √${k} closer to ${floorRoot} or ${ceilRoot}?`,
          options,
          correctIndex,
          family: 'sqrt_bounds',
        };
      } else {
        // Indisputable impossible
        const impossibles = [
          'Probability of an event = 1.4',
          'Square of a real number = -9',
          'Probability of a certainty = -0.2',
        ];
        const pickImp = impossibles[Math.floor(Math.random() * impossibles.length)];
        const validMetrics = [
          'Percentage of a total = 85%',
          'Square root of a number = 3.5',
          'Ratio of two quantities = 2:3',
          'Average of positive numbers = 42',
        ];
        const options = validMetrics.sort(() => Math.random() - 0.5).slice(0, 3);
        options.push(pickImp);
        options.sort(() => Math.random() - 0.5);

        const correctIndex = options.indexOf(pickImp);
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

import { PatternQuestion } from '../types/mind';

/**
 * Rule-First Procedural Question Generator for Pattern Challenge
 * Rule Family -> Parameters -> Deterministic Sequence -> Target Answer -> Plausible Distractors -> Validate -> Render
 */
export function generatePatternQuestion(
  difficulty: MindDifficulty,
  _qIndex: number
): PatternQuestion {
  let attempt = 0;
  while (attempt < 50) {
    attempt++;
    const q = createCandidatePatternQuestion(difficulty);
    if (isValidPatternQuestion(q)) {
      return q;
    }
  }

  // Fallback safe default
  return {
    sequenceText: '2, 4, 6, 8, ?',
    answer: 10,
    options: [10, 9, 12, 14],
    family: 'arithmetic_easy',
  };
}

function isValidPatternQuestion(q: PatternQuestion): boolean {
  if (!q.sequenceText || isNaN(q.answer) || !isFinite(q.answer)) return false;
  if (!Number.isInteger(q.answer)) return false;
  if (!q.options || q.options.length !== 4) return false;
  // Ensure target answer is in options
  if (!q.options.includes(q.answer)) return false;
  // Ensure all options are unique
  const set = new Set(q.options);
  if (set.size !== 4) return false;
  return true;
}

function createCandidatePatternQuestion(difficulty: MindDifficulty): PatternQuestion {
  switch (difficulty) {
    case 'easy': {
      // Easy: Constant +d, -d, or *r (4-5 visible terms)
      const family = ['add_step', 'sub_step', 'mult_step'][Math.floor(Math.random() * 3)];
      const numTerms = Math.floor(Math.random() * 2) + 4; // 4 or 5 terms

      if (family === 'add_step') {
        const start = Math.floor(Math.random() * 15) + 2;
        const step = Math.floor(Math.random() * 7) + 2;
        const terms: number[] = [];
        for (let i = 0; i < numTerms; i++) {
          terms.push(start + i * step);
        }
        const answer = start + numTerms * step;
        // Plausible distractors: repeat last term, add step-1, add step+2
        const options = [
          answer,
          answer - step, // repeat last addition
          answer + step, // double step
          answer - 1,
        ].sort(() => Math.random() - 0.5);

        return {
          sequenceText: `${terms.join(', ')}, ?`,
          answer,
          options,
          family: 'add_step',
        };
      } else if (family === 'sub_step') {
        const step = Math.floor(Math.random() * 5) + 3;
        const start = step * numTerms + Math.floor(Math.random() * 20) + 10;
        const terms: number[] = [];
        for (let i = 0; i < numTerms; i++) {
          terms.push(start - i * step);
        }
        const answer = start - numTerms * step;
        const options = [answer, answer + step, answer - (step + 2), answer - 1].sort(() => Math.random() - 0.5);
        return {
          sequenceText: `${terms.join(', ')}, ?`,
          answer,
          options,
          family: 'sub_step',
        };
      } else {
        // mult_step
        const start = Math.floor(Math.random() * 4) + 2;
        const ratio = 2;
        const terms: number[] = [];
        let curr = start;
        for (let i = 0; i < numTerms; i++) {
          terms.push(curr);
          curr *= ratio;
        }
        const answer = curr;
        // Plausible distractors: add ratio instead of multiply, multiply by 3
        const lastTerm = terms[terms.length - 1];
        const options = [answer, lastTerm + ratio, lastTerm * 3, lastTerm + ratio * 2].sort(() => Math.random() - 0.5);
        return {
          sequenceText: `${terms.join(', ')}, ?`,
          answer,
          options,
          family: 'mult_step',
        };
      }
    }

    case 'medium': {
      // Medium: Alternating +A, -B (5-6 visible terms)
      const family = ['alternating_add_sub', 'mult_div_step'][Math.floor(Math.random() * 2)];
      const numTerms = Math.floor(Math.random() * 2) + 5; // 5 or 6 terms

      if (family === 'alternating_add_sub') {
        const start = Math.floor(Math.random() * 15) + 10;
        const addA = Math.floor(Math.random() * 5) + 4; // e.g. +5
        const subB = Math.floor(Math.random() * 3) + 1; // e.g. -2
        const terms: number[] = [];
        let curr = start;
        for (let i = 0; i < numTerms; i++) {
          terms.push(curr);
          curr = i % 2 === 0 ? curr + addA : curr - subB;
        }
        const answer = curr;
        const nextOpIsAdd = numTerms % 2 === 0;
        // Plausible distractors: apply wrong alternating step
        const wrongStepAns = nextOpIsAdd ? terms[terms.length - 1] - subB : terms[terms.length - 1] + addA;
        const options = [answer, wrongStepAns, answer + 2, answer - 3].sort(() => Math.random() - 0.5);

        return {
          sequenceText: `${terms.join(', ')}, ?`,
          answer,
          options,
          family: 'alternating_add_sub',
        };
      } else {
        // mult_div_step: Clean integer operations e.g. * 4, / 2
        const start = Math.floor(Math.random() * 5) + 3; // e.g. 3
        const terms: number[] = [];
        let curr = start;
        for (let i = 0; i < numTerms; i++) {
          terms.push(curr);
          curr = i % 2 === 0 ? curr * 4 : curr / 2;
        }
        const answer = curr;
        const options = [answer, answer + 4, Math.max(1, answer - 2), answer * 2].sort(() => Math.random() - 0.5);
        return {
          sequenceText: `${terms.join(', ')}, ?`,
          answer,
          options,
          family: 'mult_div_step',
        };
      }
    }

    case 'hard': {
      // Hard: Increasing differences (+2, +3, +4...) or Decreasing differences (-10, -9, -8...) (5-7 visible terms)
      const family = ['increasing_diff', 'decreasing_diff'][Math.floor(Math.random() * 2)];
      const numTerms = Math.floor(Math.random() * 3) + 5; // 5 to 7 terms

      if (family === 'increasing_diff') {
        const start = Math.floor(Math.random() * 10) + 1;
        const baseStep = Math.floor(Math.random() * 2) + 1;
        const terms: number[] = [start];
        let curr = start;
        let diff = baseStep;
        for (let i = 1; i < numTerms; i++) {
          curr += diff;
          terms.push(curr);
          diff++;
        }
        const answer = curr + diff;
        // Plausible distractors: repeating previous diff without incrementing (curr + diff - 1)
        const repeatDiffAns = curr + (diff - 1);
        const options = [answer, repeatDiffAns, answer + 3, answer - 4].sort(() => Math.random() - 0.5);

        return {
          sequenceText: `${terms.join(', ')}, ?`,
          answer,
          options,
          family: 'increasing_diff',
        };
      } else {
        // decreasing_diff e.g. 100, 90, 81, 73, 66 -> -10, -9, -8, -7
        let curr = Math.floor(Math.random() * 30) + 90;
        let dec = 10;
        const terms: number[] = [curr];
        for (let i = 1; i < numTerms; i++) {
          curr -= dec;
          terms.push(curr);
          dec--;
        }
        const answer = curr - dec;
        // Plausible distractor: repeating last decrease (curr - (dec + 1))
        const repeatDecAns = curr - (dec + 1);
        const options = [answer, repeatDecAns, answer + 2, answer - 3].sort(() => Math.random() - 0.5);

        return {
          sequenceText: `${terms.join(', ')}, ?`,
          answer,
          options,
          family: 'decreasing_diff',
        };
      }
    }

    case 'expert': {
      // Expert: Fibonacci-style recurrence (a_n = a_{n-1} + a_{n-2}) (5-8 visible terms)
      const numTerms = Math.floor(Math.random() * 4) + 5; // 5 to 8 terms
      const a1 = Math.floor(Math.random() * 3) + 1;
      const a2 = Math.floor(Math.random() * 3) + 2;
      const terms: number[] = [a1, a2];

      for (let i = 2; i < numTerms; i++) {
        terms.push(terms[i - 1] + terms[i - 2]);
      }
      const answer = terms[terms.length - 1] + terms[terms.length - 2];
      // Plausible distractors: add last term to itself, multiply last two terms
      const doubleLast = terms[terms.length - 1] * 2;
      const wrongSum = terms[terms.length - 1] + terms[terms.length - 3] || answer - 2;

      const options = [answer, doubleLast, wrongSum, answer + 4].sort(() => Math.random() - 0.5);

      return {
        sequenceText: `${terms.join(', ')}, ?`,
        answer,
        options,
        family: 'fibonacci_expert',
      };
    }
  }
}

import { LogicQuestion } from '../types/mind';

/**
 * Procedural Question Generator for Logic Challenge
 * Formally valid inference templates with truth models. Banned fallacies (affirming consequent, converse fallacies).
 */
export function generateLogicQuestion(
  difficulty: MindDifficulty,
  _qIndex: number
): LogicQuestion {
  let attempt = 0;
  while (attempt < 50) {
    attempt++;
    const q = createCandidateLogicQuestion(difficulty);
    if (isValidLogicQuestion(q)) {
      return q;
    }
  }

  // Fallback safe default
  return {
    premiseText: 'If it rains, the grass gets wet. It is currently raining.',
    questionText: 'What logically follows?',
    options: [
      'The grass gets wet',
      'The grass stays dry',
      'It is not raining',
      'Nothing can be concluded',
    ],
    correctIndex: 0,
    family: 'modus_ponens_easy',
  };
}

function isValidLogicQuestion(q: LogicQuestion): boolean {
  if (!q.premiseText || !q.questionText || !q.options || q.options.length !== 4) return false;
  if (q.correctIndex < 0 || q.correctIndex >= 4) return false;
  const set = new Set(q.options);
  if (set.size !== 4) return false;
  return true;
}

function createCandidateLogicQuestion(difficulty: MindDifficulty): LogicQuestion {
  switch (difficulty) {
    case 'easy': {
      // Easy: 1-step deduction (Modus Ponens / Basic Syllogism)
      const family = ['modus_ponens', 'basic_syllogism'][Math.floor(Math.random() * 2)];

      if (family === 'modus_ponens') {
        const scenarios = [
          { p: 'a server receives a request', q: 'it sends a response', valP: 'A server has received a request.' },
          { p: 'the alarm rings', q: 'the doors lock automatically', valP: 'The alarm is ringing.' },
          { p: 'the payment is verified', q: 'the order is dispatched', valP: 'The payment has been verified.' },
        ];
        const pick = scenarios[Math.floor(Math.random() * scenarios.length)];
        const premiseText = `If ${pick.p}, then ${pick.q}. ${pick.valP}`;
        const correctAns = `The ${pick.q.replace('it ', 'server ')}`;

        const options = [
          correctAns,
          `The ${pick.q} is delayed`,
          `No ${pick.p}`,
          'Nothing can be concluded',
        ].sort(() => Math.random() - 0.5);

        return {
          premiseText,
          questionText: 'What must logically follow?',
          options,
          correctIndex: options.indexOf(correctAns),
          family: 'modus_ponens',
        };
      } else {
        // Basic Syllogism: All A are B. All B are C.
        const syllogisms = [
          { a: 'squares', b: 'rectangles', c: 'quadrilaterals' },
          { a: 'python scripts', b: 'code files', c: 'software assets' },
          { a: 'invoices', b: 'financial documents', c: 'accounting records' },
        ];
        const pick = syllogisms[Math.floor(Math.random() * syllogisms.length)];
        const premiseText = `All ${pick.a} are ${pick.b}. All ${pick.b} are ${pick.c}.`;
        const correctAns = `All ${pick.a} are ${pick.c}`;

        const options = [
          correctAns,
          `All ${pick.c} are ${pick.a}`,
          `No ${pick.a} are ${pick.c}`,
          `Some ${pick.b} are not ${pick.c}`,
        ].sort(() => Math.random() - 0.5);

        return {
          premiseText,
          questionText: 'Which statement is guaranteed to be TRUE?',
          options,
          correctIndex: options.indexOf(correctAns),
          family: 'basic_syllogism',
        };
      }
    }

    case 'medium': {
      // Medium: 2-step deduction (Transitive Ordering 3 items / Modus Tollens)
      const family = ['transitive_3', 'modus_tollens'][Math.floor(Math.random() * 2)];

      if (family === 'transitive_3') {
        const names = [
          ['Alice', 'Bob', 'Charlie'],
          ['Project A', 'Project B', 'Project C'],
          ['Server X', 'Server Y', 'Server Z'],
        ][Math.floor(Math.random() * 3)];

        const metric = ['taller', 'older', 'faster'][Math.floor(Math.random() * 3)];
        const oppMetric = metric === 'taller' ? 'shortest' : metric === 'older' ? 'youngest' : 'slowest';

        const premiseText = `${names[0]} is ${metric} than ${names[1]}. ${names[1]} is ${metric} than ${names[2]}.`;
        const correctAns = `${names[2]} is the ${oppMetric}`;

        const options = [
          correctAns,
          `${names[0]} is the ${oppMetric}`,
          `${names[1]} is the ${oppMetric}`,
          'All three are equal',
        ].sort(() => Math.random() - 0.5);

        return {
          premiseText,
          questionText: `Who/Which is the ${oppMetric}?`,
          options,
          correctIndex: options.indexOf(correctAns),
          family: 'transitive_3',
        };
      } else {
        // Modus Tollens: If P then Q. Q is FALSE -> P is FALSE.
        const scenarios = [
          { p: 'the database is connected', q: 'the dashboard displays data', notQ: 'The dashboard does NOT display data.' },
          { p: 'the key is valid', q: 'the door opens', notQ: 'The door does NOT open.' },
        ];
        const pick = scenarios[Math.floor(Math.random() * scenarios.length)];
        const premiseText = `If ${pick.p}, then ${pick.q}. ${pick.notQ}`;
        const correctAns = `The ${pick.p.replace('the ', '')} is NOT valid/connected`;

        const options = [
          correctAns,
          `The ${pick.p.replace('the ', '')} IS valid/connected`,
          `The ${pick.q}`,
          'Nothing can be concluded',
        ].sort(() => Math.random() - 0.5);

        return {
          premiseText,
          questionText: 'What logically follows?',
          options,
          correctIndex: options.indexOf(correctAns),
          family: 'modus_tollens',
        };
      }
    }

    case 'hard': {
      // Hard: Multi-premise deduction (4-item transitive ordering chain)
      const items = ['Alpha', 'Beta', 'Gamma', 'Delta'];
      const premiseText = `${items[0]} is higher than ${items[1]}. ${items[1]} is higher than ${items[2]}. ${items[2]} is higher than ${items[3]}.`;
      const correctAns = `${items[0]} is higher than ${items[3]}`;

      const options = [
        correctAns,
        `${items[3]} is higher than ${items[0]}`,
        `${items[2]} is higher than ${items[0]}`,
        `${items[1]} is the lowest`,
      ].sort(() => Math.random() - 0.5);

      return {
        premiseText,
        questionText: 'Which statement MUST be true?',
        options,
        correctIndex: options.indexOf(correctAns),
        family: 'transitive_4',
      };
    }

    case 'expert': {
      // Expert: Constraint Satisfaction with multiple simultaneous constraints
      const premiseText = 'Exactly one candidate (A, B, or C) is hired. If A is hired, D is rejected. D is HIRED.';
      const correctAns = 'Candidate A is NOT hired';

      const options = [
        correctAns,
        'Candidate A IS hired',
        'Candidate D is rejected',
        'Candidate B and C are both hired',
      ].sort(() => Math.random() - 0.5);

      return {
        premiseText,
        questionText: 'Which conclusion is logically GUARANTEED?',
        options,
        correctIndex: options.indexOf(correctAns),
        family: 'constraint_satisfaction',
      };
    }
  }
}

import { ProbabilityQuestion } from '../types/mind';

/**
 * Procedural Question Generator for Probability Challenge
 * Mathematical evaluation pipeline: EV risk comparisons, exact Bayes base-rate derivation, complement rule.
 */
export function generateProbabilityQuestion(
  difficulty: MindDifficulty,
  _qIndex: number
): ProbabilityQuestion {
  let attempt = 0;
  while (attempt < 50) {
    attempt++;
    const q = createCandidateProbabilityQuestion(difficulty);
    if (isValidProbabilityQuestion(q)) {
      return q;
    }
  }

  // Fallback safe default
  return {
    prompt: 'An urn has 4 red marbles and 6 blue marbles. With replacement, what is the probability of drawing a red marble?',
    options: ['40%', '60%', '25%', '50%'],
    correctIndex: 0,
    family: 'single_event_urn',
  };
}

function isValidProbabilityQuestion(q: ProbabilityQuestion): boolean {
  if (!q.prompt || !q.options || q.options.length !== 4) return false;
  if (q.correctIndex < 0 || q.correctIndex >= 4) return false;
  const set = new Set(q.options);
  if (set.size !== 4) return false;
  return true;
}

function createCandidateProbabilityQuestion(difficulty: MindDifficulty): ProbabilityQuestion {
  switch (difficulty) {
    case 'easy': {
      // Easy: Direct Single-Event Odds (Urn draws, die rolls)
      const family = ['single_event_urn', 'fair_die_even'][Math.floor(Math.random() * 2)];

      if (family === 'single_event_urn') {
        const red = Math.floor(Math.random() * 4) + 3; // 3 to 6
        const blue = 10 - red;
        const pct = red * 10;
        const prompt = `An urn contains ${red} red marbles and ${blue} blue marbles. With replacement, what is the probability of drawing a red marble?`;
        const correctAns = `${pct}%`;
        const options = [correctAns, `${100 - pct}%`, `${pct / 2}%`, `${Math.min(90, pct + 20)}%`].sort(() => Math.random() - 0.5);

        return {
          prompt,
          options,
          correctIndex: options.indexOf(correctAns),
          family: 'single_event_urn',
        };
      } else {
        const prompt = 'A fair 6-sided die is rolled. What is the probability of rolling an even number?';
        const options = ['50%', '33%', '66%', '16%'].sort(() => Math.random() - 0.5);
        const correctAns = '50%';

        return {
          prompt,
          options,
          correctIndex: options.indexOf(correctAns),
          family: 'fair_die_even',
        };
      }
    }

    case 'medium': {
      // Medium: Complement Rule & Independent Events
      const family = ['complement_rule', 'independent_events'][Math.floor(Math.random() * 2)];

      if (family === 'complement_rule') {
        const prompt = 'A fair coin is flipped twice. What is the probability of getting at least 1 head?';
        const options = ['75%', '50%', '25%', '100%'].sort(() => Math.random() - 0.5);
        const correctAns = '75%';

        return {
          prompt,
          options,
          correctIndex: options.indexOf(correctAns),
          family: 'complement_rule',
        };
      } else {
        const prompt = 'Two fair 6-sided dice are rolled independently. What is the probability of rolling two 6s?';
        const options = ['1/36 (~2.8%)', '1/6 (~16.7%)', '1/12 (~8.3%)', '1/18 (~5.6%)'].sort(() => Math.random() - 0.5);
        const correctAns = '1/36 (~2.8%)';

        return {
          prompt,
          options,
          correctIndex: options.indexOf(correctAns),
          family: 'independent_events',
        };
      }
    }

    case 'hard': {
      // Hard: EV Risk Comparison (Comparing Game A vs Game B)
      // Game A: 50% +100, 50% -40 -> EV = +30
      // Game B: 80% +30, 20% -20 -> EV = +20
      const gainA = 100;
      const lossA = 40;
      const evA = 0.5 * gainA - 0.5 * lossA; // +30

      const gainB = 30;
      const lossB = 20;
      const evB = 0.8 * gainB - 0.2 * lossB; // +20

      const prompt = `Game A gives a 50% chance of +$${gainA} and 50% chance of -$${lossA}. Game B gives an 80% chance of +$${gainB} and 20% chance of -$${lossB}. Which wager has the higher expected value?`;
      const correctAns = `Game A (EV = +$${evA})`;

      const options = [
        correctAns,
        `Game B (EV = +$${evB})`,
        'Both have equal expected value',
        'Neither has positive expected value',
      ].sort(() => Math.random() - 0.5);

      return {
        prompt,
        options,
        correctIndex: options.indexOf(correctAns),
        family: 'ev_risk_comparison',
      };
    }

    case 'expert': {
      // Expert: Base-rate Bayes calculation or Gambler's Fallacy De-biasing
      const family = ['bayes_base_rate', 'gamblers_fallacy'][Math.floor(Math.random() * 2)];

      if (family === 'bayes_base_rate') {
        // Disease 1 in 1000. Sensitivity 99%, Specificity 99%. P(D|+) = (0.99 * 0.001) / (0.99 * 0.001 + 0.01 * 0.999) = ~9%
        const prompt = 'A disease affects 1 in 1,000 people. A test correctly identifies 99% of infected people and correctly clears 99% of uninfected people. If a person tests positive, the probability they actually have the disease is closest to:';
        const correctAns = '10%';

        const options = [
          correctAns,
          '99%',
          '1%',
          '50%',
        ].sort(() => Math.random() - 0.5);

        return {
          prompt,
          options,
          correctIndex: options.indexOf(correctAns),
          family: 'bayes_base_rate',
        };
      } else {
        const prompt = 'A perfectly fair coin has landed on heads 5 times in a row. What is the probability that the 6th flip is heads?';
        const correctAns = '50%';

        const options = [
          correctAns,
          'Less than 10%',
          'Greater than 90%',
          '75%',
        ].sort(() => Math.random() - 0.5);

        return {
          prompt,
          options,
          correctIndex: options.indexOf(correctAns),
          family: 'gamblers_fallacy',
        };
      }
    }
  }
}
