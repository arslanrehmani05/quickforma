/**
 * Pure client-side Mathematics Engine powering QuickForma academic tools
 */

export interface Fraction {
  numerator: number;
  denominator: number;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

export function simplifyFraction(f: Fraction): Fraction {
  if (f.denominator === 0) {
    throw new Error('Denominator cannot be zero.');
  }
  const divisor = gcd(f.numerator, f.denominator);
  let num = f.numerator / divisor;
  let den = f.denominator / divisor;
  if (den < 0) {
    num = -num;
    den = -den;
  }
  return { numerator: num, denominator: den };
}

export function addFractions(f1: Fraction, f2: Fraction): Fraction {
  const num = f1.numerator * f2.denominator + f2.numerator * f1.denominator;
  const den = f1.denominator * f2.denominator;
  return simplifyFraction({ numerator: num, denominator: den });
}

export function subtractFractions(f1: Fraction, f2: Fraction): Fraction {
  const num = f1.numerator * f2.denominator - f2.numerator * f1.denominator;
  const den = f1.denominator * f2.denominator;
  return simplifyFraction({ numerator: num, denominator: den });
}

export function multiplyFractions(f1: Fraction, f2: Fraction): Fraction {
  return simplifyFraction({
    numerator: f1.numerator * f2.numerator,
    denominator: f1.denominator * f2.denominator,
  });
}

export function divideFractions(f1: Fraction, f2: Fraction): Fraction {
  if (f2.numerator === 0) {
    throw new Error('Cannot divide by zero fraction.');
  }
  return simplifyFraction({
    numerator: f1.numerator * f2.denominator,
    denominator: f1.denominator * f2.numerator,
  });
}

export function fractionToDecimal(f: Fraction): number {
  if (f.denominator === 0) throw new Error('Denominator cannot be zero.');
  return f.numerator / f.denominator;
}

export function decimalToFraction(val: number, tolerance = 1.0E-6): Fraction {
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = val;
  do {
    const a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(val - h1 / k1) > val * tolerance);

  return simplifyFraction({ numerator: h1, denominator: k1 });
}

/**
 * Solve Ratio $a : b = c : x$ => $x = (b * c) / a$
 */
export function solveProportion(a: number, b: number, c: number): number {
  if (a === 0) throw new Error('First ratio numerator cannot be zero.');
  return (b * c) / a;
}

/**
 * Solve Quadratic Equation $ax^2 + bx + c = 0$
 */
export function solveQuadratic(a: number, b: number, c: number): {
  discriminant: number;
  root1: string;
  root2: string;
  vertexX: number;
  vertexY: number;
  isReal: boolean;
} {
  if (a === 0) {
    throw new Error('Coefficient a cannot be 0 in a quadratic equation.');
  }

  const discriminant = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = c - (b * b) / (4 * a);

  if (discriminant >= 0) {
    const r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return {
      discriminant,
      root1: String(Math.round(r1 * 10000) / 10000),
      root2: String(Math.round(r2 * 10000) / 10000),
      vertexX: Math.round(vertexX * 10000) / 10000,
      vertexY: Math.round(vertexY * 10000) / 10000,
      isReal: true,
    };
  } else {
    const realPart = (-b / (2 * a)).toFixed(4);
    const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
    return {
      discriminant,
      root1: `${realPart} + ${imagPart}i`,
      root2: `${realPart} - ${imagPart}i`,
      vertexX: Math.round(vertexX * 10000) / 10000,
      vertexY: Math.round(vertexY * 10000) / 10000,
      isReal: false,
    };
  }
}

/**
 * Pythagorean Theorem $a^2 + b^2 = c^2$
 */
export function solvePythagorean(
  a?: number,
  b?: number,
  c?: number
): { missingValue: number; area: number; perimeter: number; missingLabel: string } {
  if (c !== undefined && a !== undefined) {
    if (c <= a) throw new Error('Hypotenuse c must be strictly larger than leg a.');
    const missing = Math.sqrt(c * c - a * a);
    const area = 0.5 * a * missing;
    const perimeter = a + missing + c;
    return {
      missingValue: Math.round(missing * 1000) / 1000,
      area: Math.round(area * 1000) / 1000,
      perimeter: Math.round(perimeter * 1000) / 1000,
      missingLabel: 'b (leg)',
    };
  } else if (c !== undefined && b !== undefined) {
    if (c <= b) throw new Error('Hypotenuse c must be strictly larger than leg b.');
    const missing = Math.sqrt(c * c - b * b);
    const area = 0.5 * b * missing;
    const perimeter = missing + b + c;
    return {
      missingValue: Math.round(missing * 1000) / 1000,
      area: Math.round(area * 1000) / 1000,
      perimeter: Math.round(perimeter * 1000) / 1000,
      missingLabel: 'a (leg)',
    };
  } else if (a !== undefined && b !== undefined) {
    const missing = Math.sqrt(a * a + b * b);
    const area = 0.5 * a * b;
    const perimeter = a + b + missing;
    return {
      missingValue: Math.round(missing * 1000) / 1000,
      area: Math.round(area * 1000) / 1000,
      perimeter: Math.round(perimeter * 1000) / 1000,
      missingLabel: 'c (hypotenuse)',
    };
  }
  throw new Error('Provide any 2 sides to calculate the 3rd side.');
}

/**
 * 2D & 3D Geometry Calculations
 */
export function calculateCircle(radius: number) {
  if (radius <= 0) throw new Error('Radius must be positive.');
  const diameter = 2 * radius;
  const circumference = 2 * Math.PI * radius;
  const area = Math.PI * radius * radius;
  return {
    radius,
    diameter: Math.round(diameter * 1000) / 1000,
    circumference: Math.round(circumference * 1000) / 1000,
    area: Math.round(area * 1000) / 1000,
  };
}

/**
 * Law of Sines & Cosines Triangle Solver
 */
export function solveLawOfSinesCosines(
  a?: number,
  b?: number,
  c?: number,
  A_deg?: number,
  B_deg?: number,
  C_deg?: number
): { sideA: number; sideB: number; sideC: number; angleA: number; angleB: number; angleC: number; area: number } {
  // SSS case
  if (a && b && c) {
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error('Triangle inequality violated (sum of any 2 sides must exceed 3rd).');
    }
    const cosA = (b * b + c * c - a * a) / (2 * b * c);
    const cosB = (a * a + c * c - b * b) / (2 * a * c);
    const angA = (Math.acos(cosA) * 180) / Math.PI;
    const angB = (Math.acos(cosB) * 180) / Math.PI;
    const angC = 180 - angA - angB;
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return {
      sideA: a, sideB: b, sideC: c,
      angleA: Math.round(angA * 100) / 100,
      angleB: Math.round(angB * 100) / 100,
      angleC: Math.round(angC * 100) / 100,
      area: Math.round(area * 100) / 100,
    };
  }
  // SAS case (a, b, C_deg)
  if (a && b && C_deg) {
    const C_rad = (C_deg * Math.PI) / 180;
    const c_calc = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C_rad));
    const cosA = (b * b + c_calc * c_calc - a * a) / (2 * b * c_calc);
    const angA = (Math.acos(cosA) * 180) / Math.PI;
    const angB = 180 - angA - C_deg;
    const area = 0.5 * a * b * Math.sin(C_rad);
    return {
      sideA: a, sideB: b, sideC: Math.round(c_calc * 100) / 100,
      angleA: Math.round(angA * 100) / 100,
      angleB: Math.round(angB * 100) / 100,
      angleC: C_deg,
      area: Math.round(area * 100) / 100,
    };
  }

  throw new Error('Supported modes: SSS (3 sides) or SAS (2 sides + enclosed angle).');
}

/**
 * Core Polynomial Derivative Calculator $f(x) = ax^n$
 */
export function calculatePolynomialDerivative(a: number, n: number): {
  coefficient: number;
  power: number;
  derivativeStr: string;
} {
  const coef = a * n;
  const pwr = n - 1;
  let str = '';
  if (pwr === 0) str = `${coef}`;
  else if (pwr === 1) str = `${coef}x`;
  else str = `${coef}x^${pwr}`;

  return { coefficient: coef, power: pwr, derivativeStr: str };
}
