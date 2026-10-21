/**
 * Freelance Hourly Rate Calculation Engine
 * 
 * Accurately models freelance pricing requirements under US self-employment accounting conventions:
 * - Gross Revenue - Deductible Business Overhead = Taxable Net Business Profit
 * - Target Take-Home = Taxable Net Business Profit * (1 - Effective Tax Rate)
 * - Therefore, Gross Revenue Needed = Overhead + [Target Take-Home / (1 - Effective Tax Rate)]
 * 
 * This properly treats business expenses as deductible pre-tax write-offs rather than grossing them up with income tax.
 */

export interface FreelanceRateInputs {
  targetAnnualSalary: number;   // Desired annual take-home (after taxes and overhead)
  annualExpenses: number;        // Deductible business overhead (software, hardware, insurance, subscriptions)
  taxRatePercent: number;        // Estimated combined effective tax buffer (federal income + 15.3% self-employment + state)
  workHoursPerWeek: number;      // Total planned working hours per week (default 40)
  unbillablePercent: number;     // Estimated percentage of weekly time spent on non-billable admin/marketing (0-90%)
  vacationWeeks: number;         // Unpaid weeks off per year for holidays, sick leave, and vacation (0-51)
}

export interface FreelanceRateOutputs {
  requiredHourlyRate: number;
  requiredDailyRate: number;
  grossRevenueNeeded: number;
  taxableProfitNeeded: number;
  estimatedTaxLiability: number;
  annualBillableHours: number;
  workingWeeksPerYear: number;
  isValid: boolean;
  errorMessage?: string;
}

export function calculateFreelanceRate(inputs: FreelanceRateInputs): FreelanceRateOutputs {
  const targetSalary = Math.max(0, Number(inputs.targetAnnualSalary) || 0);
  const expenses = Math.max(0, Number(inputs.annualExpenses) || 0);
  const taxRate = Number(inputs.taxRatePercent) || 0;
  const hoursPerWeek = Math.max(0, Number(inputs.workHoursPerWeek) || 0);
  const unbillablePct = Math.min(100, Math.max(0, Number(inputs.unbillablePercent) || 0));
  const vacationWeeks = Math.min(52, Math.max(0, Number(inputs.vacationWeeks) || 0));

  // Validation: Tax rate cannot be 100% or greater (cannot keep take-home if tax is 100%)
  if (taxRate >= 100) {
    return {
      requiredHourlyRate: 0,
      requiredDailyRate: 0,
      grossRevenueNeeded: 0,
      taxableProfitNeeded: 0,
      estimatedTaxLiability: 0,
      annualBillableHours: 0,
      workingWeeksPerYear: 0,
      isValid: false,
      errorMessage: 'Tax rate must be less than 100%.'
    };
  }

  const effectiveTaxDecimal = Math.max(0, taxRate) / 100;
  
  // Taxable business profit required to yield target after-tax take-home
  const taxableProfitNeeded = effectiveTaxDecimal < 1 
    ? targetSalary / (1 - effectiveTaxDecimal)
    : targetSalary;

  // Estimated tax amount
  const estimatedTaxLiability = taxableProfitNeeded * effectiveTaxDecimal;

  // Gross Revenue = Deductible Business Overhead Expenses + Required Taxable Profit
  const grossRevenueNeeded = expenses + taxableProfitNeeded;

  // Working weeks and billable hours
  const workingWeeksPerYear = Math.max(0, 52 - vacationWeeks);
  const totalAnnualHours = workingWeeksPerYear * hoursPerWeek;
  const annualBillableHours = totalAnnualHours * (1 - unbillablePct / 100);

  // Hourly and daily rate
  const requiredHourlyRate = annualBillableHours > 0 
    ? grossRevenueNeeded / annualBillableHours 
    : 0;

  const hoursPerDay = hoursPerWeek > 0 ? hoursPerWeek / 5 : 8;
  const requiredDailyRate = requiredHourlyRate * hoursPerDay;

  return {
    requiredHourlyRate: Math.round(requiredHourlyRate * 100) / 100,
    requiredDailyRate: Math.round(requiredDailyRate * 100) / 100,
    grossRevenueNeeded: Math.round(grossRevenueNeeded * 100) / 100,
    taxableProfitNeeded: Math.round(taxableProfitNeeded * 100) / 100,
    estimatedTaxLiability: Math.round(estimatedTaxLiability * 100) / 100,
    annualBillableHours: Math.round(annualBillableHours * 10) / 10,
    workingWeeksPerYear,
    isValid: true
  };
}
