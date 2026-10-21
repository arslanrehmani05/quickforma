/**
 * US Federal Payroll & FICA Tax Calculation Engine
 * 
 * Based on authoritative IRS parameters for Tax Year 2024:
 * - IRS Revenue Procedure 2023-34 (2024 Tax Brackets & Standard Deductions)
 * - SSA / IRS Notice 2023-75 (2024 Social Security Wage Base Cap: $168,600)
 * 
 * Accurately models:
 * 1. Social Security (OASDI): 6.2% up to the 2024 wage base limit ($168,600).
 * 2. Medicare (HI): 1.45% on all earnings.
 * 3. Additional Medicare Tax: 0.9% on earnings above $200k (Single/HoH) or $250k (Married).
 * 4. Federal Income Tax Withholding: Progressive 2024 marginal tax brackets (10% to 37%)
 *    applied to annualized taxable pay after the 2024 standard deduction.
 */

export type FilingStatus = 'single' | 'married' | 'head_of_household';
export type PayFrequency = 'annual' | 'monthly' | 'semimonthly' | 'biweekly' | 'weekly';

export interface PayrollTaxInputs {
  grossPayPerPeriod: number;
  payFrequency: PayFrequency;
  filingStatus: FilingStatus;
}

export interface PayrollTaxOutputs {
  grossPayPeriod: number;
  annualGrossPay: number;
  socialSecurityPeriod: number;
  medicarePeriod: number;
  additionalMedicarePeriod: number;
  totalFicaPeriod: number;
  federalIncomeTaxPeriod: number;
  totalWithholdingPeriod: number;
  netPayPeriod: number;
  annualSocialSecurity: number;
  annualMedicare: number;
  annualFederalTax: number;
  annualTotalWithholding: number;
  annualNetPay: number;
  effectiveFederalTaxRate: number; // percentage
  effectiveTotalTaxRate: number;   // percentage
  marginalBracketPercent: number;  // top federal bracket (10, 12, 22, 24, 32, 35, 37)
  socialSecurityCapReached: boolean;
  isValid: boolean;
  errorMessage?: string;
}

// 2024 IRS Social Security & Medicare limits
export const FICA_2024 = {
  SOCIAL_SECURITY_RATE: 0.062,
  SOCIAL_SECURITY_WAGE_BASE: 168600, // Capped at $168,600 for 2024
  MEDICARE_RATE: 0.0145,
  ADDITIONAL_MEDICARE_RATE: 0.009,
  ADDITIONAL_MEDICARE_THRESHOLD_SINGLE: 200000,
  ADDITIONAL_MEDICARE_THRESHOLD_MARRIED: 250000,
  ADDITIONAL_MEDICARE_THRESHOLD_HOH: 200000,
};

// 2024 IRS Standard Deductions
export const STANDARD_DEDUCTION_2024: Record<FilingStatus, number> = {
  single: 14600,
  married: 29200,
  head_of_household: 21900,
};

// 2024 Federal Income Tax Brackets (IRS Rev. Proc. 2023-34)
interface TaxBracket {
  upTo: number;
  rate: number;
}

export const FEDERAL_BRACKETS_2024: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { upTo: 11600, rate: 0.10 },
    { upTo: 47150, rate: 0.12 },
    { upTo: 100525, rate: 0.22 },
    { upTo: 191950, rate: 0.24 },
    { upTo: 243725, rate: 0.32 },
    { upTo: 609350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  married: [
    { upTo: 23200, rate: 0.10 },
    { upTo: 94300, rate: 0.12 },
    { upTo: 201050, rate: 0.22 },
    { upTo: 383900, rate: 0.24 },
    { upTo: 487450, rate: 0.32 },
    { upTo: 731200, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { upTo: 16550, rate: 0.10 },
    { upTo: 63100, rate: 0.12 },
    { upTo: 100500, rate: 0.22 },
    { upTo: 191950, rate: 0.24 },
    { upTo: 243700, rate: 0.32 },
    { upTo: 609350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
};

export const PERIODS_PER_YEAR: Record<PayFrequency, number> = {
  annual: 1,
  monthly: 12,
  semimonthly: 24,
  biweekly: 26,
  weekly: 52,
};

export function calculatePayrollTax(inputs: PayrollTaxInputs): PayrollTaxOutputs {
  const grossPayPeriod = Math.max(0, Number(inputs.grossPayPerPeriod) || 0);
  const payFrequency = inputs.payFrequency || 'monthly';
  const filingStatus = inputs.filingStatus || 'single';

  const periods = PERIODS_PER_YEAR[payFrequency] || 12;
  const annualGrossPay = grossPayPeriod * periods;

  if (annualGrossPay <= 0) {
    return {
      grossPayPeriod: 0,
      annualGrossPay: 0,
      socialSecurityPeriod: 0,
      medicarePeriod: 0,
      additionalMedicarePeriod: 0,
      totalFicaPeriod: 0,
      federalIncomeTaxPeriod: 0,
      totalWithholdingPeriod: 0,
      netPayPeriod: 0,
      annualSocialSecurity: 0,
      annualMedicare: 0,
      annualFederalTax: 0,
      annualTotalWithholding: 0,
      annualNetPay: 0,
      effectiveFederalTaxRate: 0,
      effectiveTotalTaxRate: 0,
      marginalBracketPercent: 0,
      socialSecurityCapReached: false,
      isValid: true,
    };
  }

  // 1. Social Security (6.2% up to $168,600 wage base)
  const taxableSocialSecurity = Math.min(annualGrossPay, FICA_2024.SOCIAL_SECURITY_WAGE_BASE);
  const annualSocialSecurity = taxableSocialSecurity * FICA_2024.SOCIAL_SECURITY_RATE;
  const socialSecurityPeriod = annualSocialSecurity / periods;
  const socialSecurityCapReached = annualGrossPay > FICA_2024.SOCIAL_SECURITY_WAGE_BASE;

  // 2. Medicare (1.45% all wages + 0.9% additional over threshold)
  const addlThreshold = filingStatus === 'married' 
    ? FICA_2024.ADDITIONAL_MEDICARE_THRESHOLD_MARRIED 
    : FICA_2024.ADDITIONAL_MEDICARE_THRESHOLD_SINGLE;

  const baseAnnualMedicare = annualGrossPay * FICA_2024.MEDICARE_RATE;
  const addlAnnualMedicare = Math.max(0, annualGrossPay - addlThreshold) * FICA_2024.ADDITIONAL_MEDICARE_RATE;
  const annualMedicare = baseAnnualMedicare + addlAnnualMedicare;

  const medicarePeriod = baseAnnualMedicare / periods;
  const additionalMedicarePeriod = addlAnnualMedicare / periods;
  const totalFicaPeriod = socialSecurityPeriod + medicarePeriod + additionalMedicarePeriod;

  // 3. Federal Income Tax (Progressive marginal brackets after 2024 standard deduction)
  const standardDeduction = STANDARD_DEDUCTION_2024[filingStatus];
  const annualTaxableIncome = Math.max(0, annualGrossPay - standardDeduction);

  const brackets = FEDERAL_BRACKETS_2024[filingStatus];
  let annualFederalTax = 0;
  let prevLimit = 0;
  let marginalBracketPercent = 0;

  for (const bracket of brackets) {
    if (annualTaxableIncome > prevLimit) {
      const taxableInBracket = Math.min(annualTaxableIncome - prevLimit, bracket.upTo - prevLimit);
      annualFederalTax += taxableInBracket * bracket.rate;
      marginalBracketPercent = Math.round(bracket.rate * 100);
      prevLimit = bracket.upTo;
    } else {
      break;
    }
  }

  const federalIncomeTaxPeriod = annualFederalTax / periods;

  // 4. Totals and Net Pay
  const totalWithholdingPeriod = totalFicaPeriod + federalIncomeTaxPeriod;
  const netPayPeriod = Math.max(0, grossPayPeriod - totalWithholdingPeriod);

  const annualTotalWithholding = totalWithholdingPeriod * periods;
  const annualNetPay = netPayPeriod * periods;

  const effectiveFederalTaxRate = annualGrossPay > 0 
    ? (annualFederalTax / annualGrossPay) * 100 
    : 0;

  const effectiveTotalTaxRate = annualGrossPay > 0 
    ? (annualTotalWithholding / annualGrossPay) * 100 
    : 0;

  return {
    grossPayPeriod: Math.round(grossPayPeriod * 100) / 100,
    annualGrossPay: Math.round(annualGrossPay * 100) / 100,
    socialSecurityPeriod: Math.round(socialSecurityPeriod * 100) / 100,
    medicarePeriod: Math.round(medicarePeriod * 100) / 100,
    additionalMedicarePeriod: Math.round(additionalMedicarePeriod * 100) / 100,
    totalFicaPeriod: Math.round(totalFicaPeriod * 100) / 100,
    federalIncomeTaxPeriod: Math.round(federalIncomeTaxPeriod * 100) / 100,
    totalWithholdingPeriod: Math.round(totalWithholdingPeriod * 100) / 100,
    netPayPeriod: Math.round(netPayPeriod * 100) / 100,
    annualSocialSecurity: Math.round(annualSocialSecurity * 100) / 100,
    annualMedicare: Math.round(annualMedicare * 100) / 100,
    annualFederalTax: Math.round(annualFederalTax * 100) / 100,
    annualTotalWithholding: Math.round(annualTotalWithholding * 100) / 100,
    annualNetPay: Math.round(annualNetPay * 100) / 100,
    effectiveFederalTaxRate: Math.round(effectiveFederalTaxRate * 10) / 10,
    effectiveTotalTaxRate: Math.round(effectiveTotalTaxRate * 10) / 10,
    marginalBracketPercent,
    socialSecurityCapReached,
    isValid: true,
  };
}
