import React, { useState, useMemo } from 'react';
import { DollarSign, ShieldAlert, Info, Calendar } from 'lucide-react';
import { 
  calculatePayrollTax, 
  FilingStatus, 
  PayFrequency,
  STANDARD_DEDUCTION_2024,
  FICA_2024 
} from '../../utils/calculators/payrollTax';

export const PayrollTaxEstimator: React.FC = () => {
  const [grossPay, setGrossPay] = useState<number>(5000);
  const [payPeriod, setPayPeriod] = useState<PayFrequency>('monthly');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');

  const result = useMemo(() => {
    return calculatePayrollTax({
      grossPayPerPeriod: grossPay,
      payFrequency: payPeriod,
      filingStatus,
    });
  }, [grossPay, payPeriod, filingStatus]);

  const {
    netPayPeriod,
    socialSecurityPeriod,
    medicarePeriod,
    additionalMedicarePeriod,
    totalFicaPeriod,
    federalIncomeTaxPeriod,
    totalWithholdingPeriod,
    annualGrossPay,
    annualNetPay,
    annualFederalTax,
    annualSocialSecurity,
    annualMedicare,
    effectiveFederalTaxRate,
    effectiveTotalTaxRate,
    marginalBracketPercent,
    socialSecurityCapReached,
  } = result;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. Interactive Tool Widget */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">US Federal Payroll & Net Pay Estimator</h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                Estimate 2024 FICA (Social Security & Medicare) and progressive Federal Income Tax withholding.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold self-start sm:self-center">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>2024 Tax Year (IRS Rules)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold mb-1.5">
                Gross Pay Per Period ($)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={grossPay}
                onChange={(e) => setGrossPay(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold mb-1.5">Pay Frequency</label>
                <select
                  value={payPeriod}
                  onChange={(e) => setPayPeriod(e.target.value as PayFrequency)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 shadow-xs font-medium"
                >
                  <option value="monthly">Monthly (12/yr)</option>
                  <option value="semimonthly">Semi-Monthly (24/yr)</option>
                  <option value="biweekly">Bi-Weekly (26/yr)</option>
                  <option value="weekly">Weekly (52/yr)</option>
                  <option value="annual">Annual (1/yr)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold mb-1.5">Filing Status</label>
                <select
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 shadow-xs font-medium"
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                  <option value="head_of_household">Head of Household</option>
                </select>
              </div>
            </div>

            {/* Standard Deduction Info Pill */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
              <div className="flex justify-between font-medium">
                <span>2024 Standard Deduction:</span>
                <span className="font-bold text-slate-900">${STANDARD_DEDUCTION_2024[filingStatus].toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Annualized Gross Pay:</span>
                <span className="font-bold text-indigo-600">${Math.round(annualGrossPay).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col justify-between shadow-lg space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Estimated Net Paycheck ({payPeriod})
              </span>
              <div className="my-2 text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                ${netPayPeriod.toFixed(2)}
              </div>
              <div className="text-xs text-slate-400">
                Annualized Net Take-Home: ${Math.round(annualNetPay).toLocaleString()}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Social Security (6.2%):</span>
                <span className="font-bold text-white font-mono">${socialSecurityPeriod.toFixed(2)}</span>
              </div>
              {socialSecurityCapReached && (
                <div className="text-[10px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                  * 2024 Wage base cap ($168,600) reached. 6.2% SS tax is capped at $10,453.20/yr.
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>Medicare ({medicarePeriod > 0 ? '1.45%' : '0%'}):</span>
                <span className="font-bold text-white font-mono">${(medicarePeriod + additionalMedicarePeriod).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Federal Income Tax ({marginalBracketPercent}% bracket):</span>
                <span className="font-bold text-white font-mono">${federalIncomeTaxPeriod.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-indigo-300 border-t border-slate-800 pt-2 font-semibold">
                <span>Total Federal Withholding:</span>
                <span className="font-bold text-indigo-300 font-mono">${totalWithholdingPeriod.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-2">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-400">Effective Federal Rate</div>
                <div className="text-sm font-bold text-white">{effectiveFederalTaxRate}%</div>
              </div>
              <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-400">Effective Total Rate</div>
                <div className="text-sm font-bold text-indigo-300">{effectiveTotalTaxRate}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Disclaimers & Methodology Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
        <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-wider">
          <Info className="w-4 h-4 text-indigo-600" />
          <span>IRS Federal Withholding Scope & Assumptions</span>
        </div>
        <p className="leading-relaxed">
          This calculator models <strong>US Federal Income Tax withholding</strong> and <strong>FICA payroll taxes</strong> (Social Security and Medicare) under <strong>Tax Year 2024</strong> IRS regulations (IRS Rev. Proc. 2023-34 and Notice 2023-75).
        </p>
        <p className="leading-relaxed text-slate-500">
          * <strong>Exclusions:</strong> Does not include state income taxes (which vary from 0% in TX/FL/WA to over 13% in CA), local municipal taxes, or voluntary pre-tax payroll deductions (e.g., 401(k), HSA, FSA, or employer-sponsored health insurance). Actual paystub withholding may vary based on Form W-4 elections.
        </p>
      </div>
    </div>
  );
};
