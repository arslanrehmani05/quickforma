/**
 * Pure client-side Statistics & Probability Engine powering QuickForma academic tools
 */

export interface DescriptiveStatsResult {
  count: number;
  mean: number;
  median: number;
  mode: number[];
  range: number;
  min: number;
  max: number;
  sampleVariance: number;
  populationVariance: number;
  sampleStdDev: number;
  populationStdDev: number;
  q1: number;
  q3: number;
  iqr: number;
  mad: number;
}

export function parseDataSet(rawInput: string): number[] {
  if (!rawInput || !rawInput.trim()) return [];
  return rawInput
    .split(/[\s,;\n]+/)
    .map((val) => parseFloat(val))
    .filter((num) => !isNaN(num));
}

export function calculateDescriptiveStats(data: number[]): DescriptiveStatsResult {
  if (!data || data.length === 0) {
    throw new Error('Please enter at least one valid numeric data point.');
  }

  const sorted = [...data].sort((a, b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((acc, curr) => acc + curr, 0);
  const mean = sum / count;
  const min = sorted[0];
  const max = sorted[count - 1];
  const range = max - min;

  // Median
  let median = 0;
  const mid = Math.floor(count / 2);
  if (count % 2 === 0) {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    median = sorted[mid];
  }

  // Mode
  const counts: Record<number, number> = {};
  let maxFreq = 0;
  sorted.forEach((n) => {
    counts[n] = (counts[n] || 0) + 1;
    if (counts[n] > maxFreq) maxFreq = counts[n];
  });
  const mode: number[] = [];
  if (maxFreq > 1) {
    Object.keys(counts).forEach((k) => {
      const numKey = parseFloat(k);
      if (counts[numKey] === maxFreq) mode.push(numKey);
    });
  }

  // Variances & Std Devs
  const sqDiffSum = sorted.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0);
  const populationVariance = sqDiffSum / count;
  const sampleVariance = count > 1 ? sqDiffSum / (count - 1) : 0;
  const populationStdDev = Math.sqrt(populationVariance);
  const sampleStdDev = Math.sqrt(sampleVariance);

  // Quartiles (Q1, Q3) using interpolation
  const getPercentile = (p: number) => {
    const idx = p * (count - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    return sorted[lower] + weight * (sorted[upper] - sorted[lower]);
  };
  const q1 = getPercentile(0.25);
  const q3 = getPercentile(0.75);
  const iqr = q3 - q1;

  // Mean Absolute Deviation (MAD)
  const madSum = sorted.reduce((acc, curr) => acc + Math.abs(curr - mean), 0);
  const mad = madSum / count;

  return {
    count,
    mean: Math.round(mean * 10000) / 10000,
    median: Math.round(median * 10000) / 10000,
    mode,
    range: Math.round(range * 10000) / 10000,
    min,
    max,
    sampleVariance: Math.round(sampleVariance * 10000) / 10000,
    populationVariance: Math.round(populationVariance * 10000) / 10000,
    sampleStdDev: Math.round(sampleStdDev * 10000) / 10000,
    populationStdDev: Math.round(populationStdDev * 10000) / 10000,
    q1: Math.round(q1 * 10000) / 10000,
    q3: Math.round(q3 * 10000) / 10000,
    iqr: Math.round(iqr * 10000) / 10000,
    mad: Math.round(mad * 10000) / 10000,
  };
}

/**
 * Z-Score Calculation $Z = (X - \mu) / \sigma$
 */
export function calculateZScore(
  x: number,
  mean: number,
  stdDev: number
): { zScore: number; percentile: number } {
  if (stdDev <= 0) throw new Error('Standard deviation must be strictly positive.');
  const zScore = (x - mean) / stdDev;

  // Abramowitz & Stegun approximation for Normal CDF
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore));
  const d = 0.3989423 * Math.exp((-zScore * zScore) / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (zScore > 0) p = 1 - p;

  const percentile = Math.round(p * 10000) / 100;
  return {
    zScore: Math.round(zScore * 10000) / 10000,
    percentile,
  };
}

/**
 * Permutations & Combinations
 */
export function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial undefined for negative numbers.');
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export function calculatePermutation(n: number, r: number): number {
  if (r > n || n < 0 || r < 0) throw new Error('Invalid inputs: require n >= r >= 0.');
  return factorial(n) / factorial(n - r);
}

export function calculateCombination(n: number, r: number): number {
  if (r > n || n < 0 || r < 0) throw new Error('Invalid inputs: require n >= r >= 0.');
  return factorial(n) / (factorial(r) * factorial(n - r));
}

/**
 * Binomial Probability $P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$
 */
export function calculateBinomialProbability(
  n: number,
  k: number,
  p: number
): { probExact: number; probAtLeast: number; probAtMost: number } {
  if (p < 0 || p > 1) throw new Error('Probability p must be between 0 and 1.');
  if (k > n || n < 0 || k < 0) throw new Error('Invalid k or n values.');

  const nCr = calculateCombination(n, k);
  const probExact = nCr * Math.pow(p, k) * Math.pow(1 - p, n - k);

  let probAtMost = 0;
  for (let i = 0; i <= k; i++) {
    probAtMost += calculateCombination(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
  }

  const probAtLeast = 1 - (probAtMost - probExact);

  return {
    probExact: Math.round(probExact * 100000) / 100000,
    probAtLeast: Math.round(probAtLeast * 100000) / 100000,
    probAtMost: Math.round(probAtMost * 100000) / 100000,
  };
}

/**
 * Confidence Interval for Mean (Z-Interval)
 */
export function calculateConfidenceInterval(
  sampleMean: number,
  stdDev: number,
  sampleSize: number,
  confidenceLevel: number = 95
): { marginOfError: number; lowerBound: number; upperBound: number } {
  if (sampleSize <= 0) throw new Error('Sample size must be > 0.');
  if (stdDev <= 0) throw new Error('Standard deviation must be > 0.');

  let zCritical = 1.96; // Default 95%
  if (confidenceLevel === 90) zCritical = 1.645;
  else if (confidenceLevel === 99) zCritical = 2.576;

  const marginOfError = zCritical * (stdDev / Math.sqrt(sampleSize));
  const lowerBound = sampleMean - marginOfError;
  const upperBound = sampleMean + marginOfError;

  return {
    marginOfError: Math.round(marginOfError * 10000) / 10000,
    lowerBound: Math.round(lowerBound * 10000) / 10000,
    upperBound: Math.round(upperBound * 10000) / 10000,
  };
}
