import { describe, it, expect } from 'vitest';
import { calculateFreelanceRate } from '../../src/utils/calculators/freelanceRate';

describe('calculateFreelanceRate', () => {
  it('calculates accurate hourly rate where expenses are deducted pre-tax', () => {
    const result = calculateFreelanceRate({
      targetAnnualSalary: 80000,
      annualExpenses: 5000,
      taxRatePercent: 25,
      workHoursPerWeek: 40,
      unbillablePercent: 20,
      vacationWeeks: 4,
    });

    expect(result.isValid).toBe(true);
    expect(result.workingWeeksPerYear).toBe(48);
    expect(result.annualBillableHours).toBe(1536); // 48 wks * 40 hrs * 0.8 billable
    // Pretax profit needed for $80k take-home at 25% tax: 80000 / 0.75 = 106666.67
    expect(result.taxableProfitNeeded).toBe(106666.67);
    // Gross revenue needed = $106,666.67 profit + $5,000 expenses = $111,666.67
    expect(result.grossRevenueNeeded).toBe(111666.67);
    // Hourly rate = 111666.67 / 1536 = $72.70
    expect(result.requiredHourlyRate).toBe(72.70);
    // Daily rate (8h/day) = 72.70 * 8 = 581.60
    expect(result.requiredDailyRate).toBe(581.60);
  });

  it('correctly handles zero expenses', () => {
    const result = calculateFreelanceRate({
      targetAnnualSalary: 60000,
      annualExpenses: 0,
      taxRatePercent: 20,
      workHoursPerWeek: 40,
      unbillablePercent: 0,
      vacationWeeks: 2,
    });

    expect(result.isValid).toBe(true);
    // 60000 / (1 - 0.20) = 75000 gross
    expect(result.grossRevenueNeeded).toBe(75000);
    // 50 weeks * 40 hours = 2000 hours
    expect(result.annualBillableHours).toBe(2000);
    // 75000 / 2000 = $37.50 / hr
    expect(result.requiredHourlyRate).toBe(37.50);
  });

  it('correctly handles zero tax rate', () => {
    const result = calculateFreelanceRate({
      targetAnnualSalary: 50000,
      annualExpenses: 10000,
      taxRatePercent: 0,
      workHoursPerWeek: 40,
      unbillablePercent: 0,
      vacationWeeks: 2,
    });

    expect(result.isValid).toBe(true);
    expect(result.taxableProfitNeeded).toBe(50000);
    expect(result.grossRevenueNeeded).toBe(60000);
    expect(result.annualBillableHours).toBe(2000);
    expect(result.requiredHourlyRate).toBe(30);
  });

  it('guards against invalid tax rates of 100% or greater', () => {
    const result = calculateFreelanceRate({
      targetAnnualSalary: 80000,
      annualExpenses: 5000,
      taxRatePercent: 100,
      workHoursPerWeek: 40,
      unbillablePercent: 20,
      vacationWeeks: 4,
    });

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('Tax rate must be less than 100%');
    expect(result.requiredHourlyRate).toBe(0);
  });

  it('handles zero billable hours gracefully without NaN or Infinity', () => {
    const resultZeroHours = calculateFreelanceRate({
      targetAnnualSalary: 80000,
      annualExpenses: 5000,
      taxRatePercent: 25,
      workHoursPerWeek: 0,
      unbillablePercent: 20,
      vacationWeeks: 4,
    });

    expect(resultZeroHours.isValid).toBe(true);
    expect(resultZeroHours.annualBillableHours).toBe(0);
    expect(resultZeroHours.requiredHourlyRate).toBe(0);

    const resultAllVacation = calculateFreelanceRate({
      targetAnnualSalary: 80000,
      annualExpenses: 5000,
      taxRatePercent: 25,
      workHoursPerWeek: 40,
      unbillablePercent: 20,
      vacationWeeks: 52,
    });

    expect(resultAllVacation.workingWeeksPerYear).toBe(0);
    expect(resultAllVacation.requiredHourlyRate).toBe(0);
  });

  it('clamps negative inputs to zero', () => {
    const result = calculateFreelanceRate({
      targetAnnualSalary: -50000,
      annualExpenses: -2000,
      taxRatePercent: -15,
      workHoursPerWeek: -40,
      unbillablePercent: -10,
      vacationWeeks: -4,
    });

    expect(result.isValid).toBe(true);
    expect(result.grossRevenueNeeded).toBe(0);
    expect(result.requiredHourlyRate).toBe(0);
  });
});
