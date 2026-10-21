import { describe, it, expect } from 'vitest';
import { calculatePayrollTax } from '../../src/utils/calculators/payrollTax';

describe('calculatePayrollTax', () => {
  it('accurately calculates federal income tax and FICA for $5,000/mo single filer (2024 tax year)', () => {
    const result = calculatePayrollTax({
      grossPayPerPeriod: 5000,
      payFrequency: 'monthly',
      filingStatus: 'single',
    });

    expect(result.isValid).toBe(true);
    expect(result.annualGrossPay).toBe(60000);

    // FICA: Social Security 6.2%
    // $60,000 * 0.062 = $3,720 annual / 12 = $310/mo
    expect(result.socialSecurityPeriod).toBe(310);
    expect(result.annualSocialSecurity).toBe(3720);

    // FICA: Medicare 1.45%
    // $60,000 * 0.0145 = $870 annual / 12 = $72.50/mo
    expect(result.medicarePeriod).toBe(72.50);
    expect(result.annualMedicare).toBe(870);

    // Federal Income Tax (2024 Single Standard Deduction = $14,600)
    // Taxable Income = $60,000 - $14,600 = $45,400
    // Bracket 1: 10% of $11,600 = $1,160
    // Bracket 2: 12% of ($45,400 - $11,600 = $33,800) = $4,056
    // Total Federal Income Tax = $1,160 + $4,056 = $5,216 annual / 12 = $434.67/mo
    expect(result.annualFederalTax).toBe(5216);
    expect(result.federalIncomeTaxPeriod).toBe(434.67);
    expect(result.marginalBracketPercent).toBe(12);

    // Total Withholdings: $310 (SS) + $72.50 (Med) + $434.67 (Fed) = $817.17/mo
    expect(result.totalWithholdingPeriod).toBe(817.17);

    // Net Take-Home: $5,000 - $817.17 = $4,182.83
    expect(result.netPayPeriod).toBe(4182.83);
    expect(result.socialSecurityCapReached).toBe(false);
  });

  it('correctly caps Social Security at the $168,600 wage base limit for high earners', () => {
    // $20,000/mo = $240,000 annual
    const result = calculatePayrollTax({
      grossPayPerPeriod: 20000,
      payFrequency: 'monthly',
      filingStatus: 'single',
    });

    expect(result.isValid).toBe(true);
    expect(result.annualGrossPay).toBe(240000);
    expect(result.socialSecurityCapReached).toBe(true);

    // Social Security is capped at $168,600 * 0.062 = $10,453.20 annual
    // Per month = $10,453.20 / 12 = $871.10 (NOT 20,000 * 0.062 = $1,240!)
    expect(result.annualSocialSecurity).toBe(10453.20);
    expect(result.socialSecurityPeriod).toBe(871.10);

    // Medicare includes 0.9% Additional Medicare above $200k threshold:
    // Base: 240,000 * 0.0145 = $3,480
    // Addl: (240,000 - 200,000) * 0.009 = $360
    // Total Medicare = $3,840 annual / 12 = $320/mo
    expect(result.annualMedicare).toBe(3840);
    expect(result.medicarePeriod).toBe(290); // base $3,480 / 12
    expect(result.additionalMedicarePeriod).toBe(30); // addl $360 / 12
  });

  it('calculates zero federal income tax when earnings fall below the standard deduction', () => {
    // $1,000/mo = $12,000 annual (below $14,600 single standard deduction)
    const result = calculatePayrollTax({
      grossPayPerPeriod: 1000,
      payFrequency: 'monthly',
      filingStatus: 'single',
    });

    expect(result.isValid).toBe(true);
    expect(result.annualFederalTax).toBe(0);
    expect(result.federalIncomeTaxPeriod).toBe(0);
    expect(result.effectiveFederalTaxRate).toBe(0);

    // FICA taxes still apply:
    expect(result.socialSecurityPeriod).toBe(62); // 1000 * 0.062
    expect(result.medicarePeriod).toBe(14.50);    // 1000 * 0.0145
    expect(result.netPayPeriod).toBe(923.50);
  });

  it('correctly applies the married filing jointly standard deduction ($29,200)', () => {
    // $5,000/mo = $60,000 annual
    const result = calculatePayrollTax({
      grossPayPerPeriod: 5000,
      payFrequency: 'monthly',
      filingStatus: 'married',
    });

    // Married Taxable Income = $60,000 - $29,200 = $30,800
    // Married Brackets:
    // 10% on first $23,200 = $2,320
    // 12% on remainder ($30,800 - $23,200 = $7,600) = $912
    // Total Federal Tax = $2,320 + $912 = $3,232 annual / 12 = $269.33/mo
    expect(result.annualFederalTax).toBe(3232);
    expect(result.federalIncomeTaxPeriod).toBe(269.33);
  });

  it('handles bi-weekly pay frequency (26 periods)', () => {
    const result = calculatePayrollTax({
      grossPayPerPeriod: 2500,
      payFrequency: 'biweekly',
      filingStatus: 'single',
    });

    // Annual Gross = 2500 * 26 = $65,000
    expect(result.annualGrossPay).toBe(65000);
    expect(result.socialSecurityPeriod).toBe(155); // 2500 * 0.062
    expect(result.medicarePeriod).toBe(36.25);    // 2500 * 0.0145
  });

  it('handles zero or negative gross pay gracefully', () => {
    const result = calculatePayrollTax({
      grossPayPerPeriod: 0,
      payFrequency: 'monthly',
      filingStatus: 'single',
    });

    expect(result.isValid).toBe(true);
    expect(result.netPayPeriod).toBe(0);
    expect(result.totalWithholdingPeriod).toBe(0);
  });
});
