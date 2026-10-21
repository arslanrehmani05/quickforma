/**
 * GPA Scale Conversion Engine
 * 
 * Implements defensible conversions between US academic grading scales:
 * 1. Arithmetic Scale Normalization: Proportional mathematical ratio across bounds.
 * 2. Academic Grade Equivalency: Standard US College Board / High School Letter Grade
 *    and non-linear percentage curve mapping (distinguishing a 3.0 B [83-86%] from linear 75%).
 * 3. Handles 4.0 (Standard Unweighted), 4.33 (A+ Scale), and 5.0 (Weighted Honors/AP) scales.
 */

export type GpaScaleType = 4.0 | 4.33 | 5.0;

export interface GpaScaleInputs {
  gpa: number;
  scale: GpaScaleType;
}

export interface GpaScaleOutputs {
  unweightedGpa4_0: number;
  scale4_33: number;
  scale5_0: number;
  letterGrade: string;
  percentageRange: string;
  proportionalPercentage: number;
  academicClassification: string;
  notes: string[];
  isValid: boolean;
  errorMessage?: string;
}

interface GradeThreshold {
  minGpa4: number;
  letter: string;
  pctRange: string;
  classification: string;
}

const US_GRADE_TABLE: GradeThreshold[] = [
  { minGpa4: 3.95, letter: 'A+ / A', pctRange: '97% – 100%', classification: 'Highest Honors / Outstanding' },
  { minGpa4: 3.85, letter: 'A', pctRange: '93% – 96%', classification: 'Excellent / Superior' },
  { minGpa4: 3.65, letter: 'A-', pctRange: '90% – 92%', classification: 'Very Good' },
  { minGpa4: 3.25, letter: 'B+', pctRange: '87% – 89%', classification: 'Good / Above Average' },
  { minGpa4: 2.95, letter: 'B', pctRange: '83% – 86%', classification: 'Competent / Average' },
  { minGpa4: 2.65, letter: 'B-', pctRange: '80% – 82%', classification: 'Below Average / Solid Pass' },
  { minGpa4: 2.25, letter: 'C+', pctRange: '77% – 79%', classification: 'Fair / Satisfactory' },
  { minGpa4: 1.95, letter: 'C', pctRange: '73% – 76%', classification: 'Passing / Minimum Major Standard' },
  { minGpa4: 1.65, letter: 'C-', pctRange: '70% – 72%', classification: 'Marginal Pass' },
  { minGpa4: 1.25, letter: 'D+', pctRange: '67% – 69%', classification: 'Poor / Conditional Credit' },
  { minGpa4: 0.95, letter: 'D', pctRange: '65% – 66%', classification: 'Barely Passing' },
  { minGpa4: 0.0, letter: 'F', pctRange: 'Below 65%', classification: 'Failing / No Credit' }
];

export function convertGpaScale(inputs: GpaScaleInputs): GpaScaleOutputs {
  const rawGpa = Number(inputs.gpa);
  const scale = inputs.scale;

  if (isNaN(rawGpa) || rawGpa < 0) {
    return {
      unweightedGpa4_0: 0,
      scale4_33: 0,
      scale5_0: 0,
      letterGrade: 'N/A',
      percentageRange: 'N/A',
      proportionalPercentage: 0,
      academicClassification: 'Invalid input',
      notes: ['GPA cannot be negative or non-numeric.'],
      isValid: false,
      errorMessage: 'GPA must be a non-negative number.'
    };
  }

  // Clamp raw GPA to scale ceiling to prevent misleading inflated numbers
  const clampedGpa = Math.min(rawGpa, scale);

  // Derive unweighted 4.0 baseline
  let unweighted4_0 = clampedGpa;
  if (scale === 4.33) {
    // 4.33 scale represents 4.0 unweighted with an A+ bonus (4.33).
    // In standard US university unweighted evaluation, A and A+ both max at 4.0 unweighted.
    unweighted4_0 = Math.min(4.0, (clampedGpa / 4.33) * 4.0);
  } else if (scale === 5.0) {
    // 5.0 represents a weighted high school scale (AP/IB/Honors +1.0 bump).
    // Proportional normalization maps 5.0 -> 4.0 unweighted baseline.
    unweighted4_0 = (clampedGpa / 5.0) * 4.0;
  }

  unweighted4_0 = Math.round(unweighted4_0 * 100) / 100;

  // Find letter grade and percentage range from academic curve table
  const matchedGrade = US_GRADE_TABLE.find(entry => unweighted4_0 >= entry.minGpa4) || US_GRADE_TABLE[US_GRADE_TABLE.length - 1];

  // Arithmetic conversions for all 3 scales
  const ratio = clampedGpa / scale;
  const scale4_33 = Math.round(ratio * 4.33 * 100) / 100;
  const scale5_0 = Math.round(ratio * 5.0 * 100) / 100;
  const proportionalPercentage = Math.round(ratio * 100 * 10) / 10;

  const notes: string[] = [
    'Academic grade equivalency (letter grade and percentage range) is based on the standard US College Board non-linear grading curve.',
    'Note: US universities and credential evaluators (such as WES) evaluate international transcripts on a course-by-course credit basis rather than a single aggregate conversion formula.'
  ];

  if (scale === 5.0) {
    notes.push('5.0 scales in US secondary schools reflect weighted course difficulty (Honors/AP). Unweighted college admissions recalculations generally unweight grades back to a 4.0 baseline.');
  }

  return {
    unweightedGpa4_0: unweighted4_0,
    scale4_33,
    scale5_0,
    letterGrade: matchedGrade.letter,
    percentageRange: matchedGrade.pctRange,
    proportionalPercentage,
    academicClassification: matchedGrade.classification,
    notes,
    isValid: true
  };
}
