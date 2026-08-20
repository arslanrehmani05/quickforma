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
        // mult_div_step e.g. * 3, / 2
        const start = Math.floor(Math.random() * 6) + 4;
        const terms: number[] = [];
        let curr = start;
        for (let i = 0; i < numTerms; i++) {
          terms.push(curr);
          curr = i % 2 === 0 ? curr * 3 : Math.floor(curr / 2);
        }
        const answer = curr;
        const options = [answer, answer + 4, answer - 2, answer * 2].sort(() => Math.random() - 0.5);
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
