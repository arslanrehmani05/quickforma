/**
 * Pure client-side Chemistry Engine powering QuickForma academic tools
 */

export const ELEMENT_MASSES: Record<string, number> = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999,
  F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974,
  S: 32.06, Cl: 35.45, K: 39.098, Ca: 40.078, Fe: 55.845, Cu: 63.546, Zn: 65.38,
  Ag: 107.87, Au: 196.97, Pb: 207.2, I: 126.90, Br: 79.904, Ba: 137.33, Mn: 54.938,
};

/**
 * Parses chemical formulas (e.g. H2SO4, Ca(NO3)2) and calculates Molar Mass & Mass Percentages
 */
export function calculateMolarMass(formula: string): {
  formula: string;
  molarMass: number;
  composition: { element: string; count: number; massPercent: number }[];
} {
  if (!formula || !formula.trim()) {
    throw new Error('Please enter a chemical formula (e.g., H2O, H2SO4, Ca(NO3)2).');
  }

  const cleanFormula = formula.trim();
  const elementCounts: Record<string, number> = {};

  // Simple parser regex for formulas with optional parentheses
  // Handle nested parens or simple formula tokens
  const parseTokenStream = (str: string, multiplier = 1) => {
    const regex = /([A-Z][a-z]*)(\d*)|(\()|(\))(\d*)/g;
    let match;
    const stack: { counts: Record<string, number>; mult: number }[] = [{ counts: elementCounts, mult: multiplier }];

    while ((match = regex.exec(str)) !== null) {
      const [full, elem, countStr, openParen, closeParen, parenCountStr] = match;

      if (openParen) {
        stack.push({ counts: {}, mult: 1 });
      } else if (closeParen) {
        const pMult = parenCountStr ? parseInt(parenCountStr, 10) : 1;
        const popped = stack.pop();
        if (popped) {
          const currentTarget = stack[stack.length - 1].counts;
          Object.entries(popped.counts).forEach(([el, cnt]) => {
            currentTarget[el] = (currentTarget[el] || 0) + cnt * pMult;
          });
        }
      } else if (elem) {
        const cnt = countStr ? parseInt(countStr, 10) : 1;
        const currentTarget = stack[stack.length - 1].counts;
        currentTarget[elem] = (currentTarget[elem] || 0) + cnt;
      }
    }
  };

  parseTokenStream(cleanFormula);

  let totalMolarMass = 0;
  const composition: { element: string; count: number; massPercent: number }[] = [];

  Object.entries(elementCounts).forEach(([elem, count]) => {
    const atomicMass = ELEMENT_MASSES[elem];
    if (!atomicMass) {
      throw new Error(`Unknown chemical element '${elem}'. Please check elemental symbols.`);
    }
    const elemTotalMass = atomicMass * count;
    totalMolarMass += elemTotalMass;
  });

  Object.entries(elementCounts).forEach(([elem, count]) => {
    const atomicMass = ELEMENT_MASSES[elem];
    const elemTotalMass = atomicMass * count;
    const massPercent = (elemTotalMass / totalMolarMass) * 100;
    composition.push({
      element: elem,
      count,
      massPercent: Math.round(massPercent * 100) / 100,
    });
  });

  return {
    formula: cleanFormula,
    molarMass: Math.round(totalMolarMass * 1000) / 1000,
    composition,
  };
}

/**
 * Moles, Mass & Molarity Calculations
 */
export function calculateMolesMolarity(
  mass_g?: number,
  molarMass_gmol?: number,
  volume_L?: number
): { moles: number; molarity: number; mass: number } {
  if (molarMass_gmol !== undefined && molarMass_gmol <= 0) {
    throw new Error('Molar mass must be positive.');
  }

  let moles = 0;
  let mass = mass_g || 0;
  let molarity = 0;

  if (mass_g !== undefined && molarMass_gmol !== undefined) {
    moles = mass_g / molarMass_gmol;
  }

  if (volume_L !== undefined && volume_L > 0 && moles > 0) {
    molarity = moles / volume_L;
  }

  return {
    moles: Math.round(moles * 10000) / 10000,
    molarity: Math.round(molarity * 10000) / 10000,
    mass: Math.round(mass * 1000) / 1000,
  };
}

/**
 * Solution Dilution $C_1 V_1 = C_2 V_2$
 */
export function calculateDilution(
  c1?: number,
  v1?: number,
  c2?: number,
  v2?: number
): { missingValue: number; missingLabel: string; solventToAdd: number } {
  if (c1 !== undefined && v1 !== undefined && c2 !== undefined) {
    if (c2 === 0) throw new Error('Target concentration C2 cannot be 0.');
    const targetV2 = (c1 * v1) / c2;
    const solventToAdd = targetV2 - v1;
    return {
      missingValue: Math.round(targetV2 * 1000) / 1000,
      missingLabel: 'V2 (Final Volume)',
      solventToAdd: Math.round(solventToAdd * 1000) / 1000,
    };
  } else if (c1 !== undefined && v1 !== undefined && v2 !== undefined) {
    if (v2 === 0) throw new Error('Final volume V2 cannot be 0.');
    const targetC2 = (c1 * v1) / v2;
    return {
      missingValue: Math.round(targetC2 * 1000) / 1000,
      missingLabel: 'C2 (Final Concentration)',
      solventToAdd: Math.round((v2 - v1) * 1000) / 1000,
    };
  }

  throw new Error('Please provide 3 values (C1, V1, C2 or V2) to solve dilution.');
}

/**
 * pH & pOH Calculations
 */
export function calculatePh(hConcentration_M?: number, phValue?: number): {
  pH: number;
  pOH: number;
  hConcentration: number;
  ohConcentration: number;
  solutionType: 'Acidic' | 'Neutral' | 'Basic';
} {
  let pH = 7.0;
  if (phValue !== undefined) {
    pH = phValue;
  } else if (hConcentration_M !== undefined && hConcentration_M > 0) {
    pH = -Math.log10(hConcentration_M);
  } else {
    throw new Error('Please enter a valid [H+] concentration or pH value.');
  }

  const pOH = 14.0 - pH;
  const hConcentration = Math.pow(10, -pH);
  const ohConcentration = Math.pow(10, -pOH);

  let solutionType: 'Acidic' | 'Neutral' | 'Basic' = 'Neutral';
  if (pH < 6.95) solutionType = 'Acidic';
  else if (pH > 7.05) solutionType = 'Basic';

  return {
    pH: Math.round(pH * 100) / 100,
    pOH: Math.round(pOH * 100) / 100,
    hConcentration,
    ohConcentration,
    solutionType,
  };
}

/**
 * Ideal Gas Law $P V = n R T$ ($R = 0.08206 \text{ L atm / mol K}$)
 */
export function calculateIdealGasLaw(
  pressure_atm?: number,
  volume_L?: number,
  moles_n?: number,
  temp_K?: number
): { resultValue: number; label: string } {
  const R = 0.08206;

  if (pressure_atm === undefined && volume_L && moles_n && temp_K) {
    const P = (moles_n * R * temp_K) / volume_L;
    return { resultValue: Math.round(P * 1000) / 1000, label: 'Pressure (atm)' };
  } else if (volume_L === undefined && pressure_atm && moles_n && temp_K) {
    const V = (moles_n * R * temp_K) / pressure_atm;
    return { resultValue: Math.round(V * 1000) / 1000, label: 'Volume (L)' };
  } else if (temp_K === undefined && pressure_atm && volume_L && moles_n) {
    const T = (pressure_atm * volume_L) / (moles_n * R);
    return { resultValue: Math.round(T * 100) / 100, label: 'Temperature (K)' };
  } else if (moles_n === undefined && pressure_atm && volume_L && temp_K) {
    const n = (pressure_atm * volume_L) / (R * temp_K);
    return { resultValue: Math.round(n * 1000) / 1000, label: 'Moles (n)' };
  }

  throw new Error('Provide 3 of 4 variables (P, V, n, T) to solve the Ideal Gas Law.');
}
