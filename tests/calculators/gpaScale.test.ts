import { describe, it, expect } from 'vitest';
import { convertGpaScale } from '../../src/utils/calculators/gpaScale';

describe('convertGpaScale', () => {
  it('correctly maps a 3.0 GPA to a US grade B (83-86%) rather than linear 75%', () => {
    const result = convertGpaScale({ gpa: 3.0, scale: 4.0 });

    expect(result.isValid).toBe(true);
    expect(result.unweightedGpa4_0).toBe(3.0);
    expect(result.letterGrade).toBe('B');
    expect(result.percentageRange).toBe('83% – 86%');
    expect(result.proportionalPercentage).toBe(75.0);
    expect(result.scale4_33).toBe(3.25);
    expect(result.scale5_0).toBe(3.75);
  });

  it('correctly maps 4.0 max endpoint on 4.0 scale', () => {
    const result = convertGpaScale({ gpa: 4.0, scale: 4.0 });

    expect(result.isValid).toBe(true);
    expect(result.unweightedGpa4_0).toBe(4.0);
    expect(result.letterGrade).toBe('A+ / A');
    expect(result.percentageRange).toBe('97% – 100%');
    expect(result.proportionalPercentage).toBe(100);
  });

  it('correctly maps 2.0 GPA to grade C (73-76%)', () => {
    const result = convertGpaScale({ gpa: 2.0, scale: 4.0 });

    expect(result.isValid).toBe(true);
    expect(result.letterGrade).toBe('C');
    expect(result.percentageRange).toBe('73% – 76%');
    // Note: Proportional is 50%, which in US school grading would be failing,
    // demonstrating why academic grade equivalency is essential over raw arithmetic ratio.
    expect(result.proportionalPercentage).toBe(50.0);
  });

  it('correctly maps 0.0 GPA to failing grade F', () => {
    const result = convertGpaScale({ gpa: 0.0, scale: 4.0 });

    expect(result.isValid).toBe(true);
    expect(result.unweightedGpa4_0).toBe(0.0);
    expect(result.letterGrade).toBe('F');
    expect(result.percentageRange).toBe('Below 65%');
  });

  it('normalizes 4.33 scale where 4.33 maps to unweighted 4.0', () => {
    const result = convertGpaScale({ gpa: 4.33, scale: 4.33 });

    expect(result.isValid).toBe(true);
    expect(result.unweightedGpa4_0).toBe(4.0);
    expect(result.letterGrade).toBe('A+ / A');
  });

  it('unweights 5.0 weighted scale (AP/IB) back to 4.0 baseline', () => {
    // A 3.75 on a 5.0 scale corresponds to (3.75 / 5.0) * 4.0 = 3.0 unweighted
    const result = convertGpaScale({ gpa: 3.75, scale: 5.0 });

    expect(result.isValid).toBe(true);
    expect(result.unweightedGpa4_0).toBe(3.0);
    expect(result.letterGrade).toBe('B');
    expect(result.notes.some(n => n.includes('5.0 scales'))).toBe(true);
  });

  it('clamps values that exceed the scale maximum', () => {
    const result = convertGpaScale({ gpa: 4.8, scale: 4.0 });

    expect(result.isValid).toBe(true);
    expect(result.unweightedGpa4_0).toBe(4.0);
    expect(result.proportionalPercentage).toBe(100);
  });

  it('rejects negative GPA values', () => {
    const result = convertGpaScale({ gpa: -1.5, scale: 4.0 });

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('non-negative');
  });
});
