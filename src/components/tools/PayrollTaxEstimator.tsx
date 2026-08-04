import React, { useState } from 'react';
import { Receipt, HelpCircle } from 'lucide-react';

export const PayrollTaxEstimator: React.FC = () => {
  const [grossPay, setGrossPay] = useState<number>(3500);
  const [payPeriod, setPayPeriod] = useState<'monthly' | 'biweekly' | 'weekly'>('biweekly');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');

  // Standard US FICA estimates: Social Security 6.2%, Medicare 1.45%
  const socialSecurity = (grossPay || 0) * 0.062;
  const medicare = (grossPay || 0) * 0.0145;
  const federalWithholdingEstimate = (grossPay || 0) * (filingStatus === 'single' ? 0.12 : 0.10);
  const totalTaxDeductions = socialSecurity + medicare + federalWithholdingEstimate;
  const netTakeHomePay = Math.max(0, (grossPay || 0) - totalTaxDeductions);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Payroll Tax Estimator (US)</h2>
            <p className="text-slate-400 text-sm">Estimate federal income withholding, Social Security, Medicare, and net paycheck.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Gross Pay Per Period ($)</label>
              <input
                type="number"
                min="0"
                value={grossPay}
                onChange={(e) => setGrossPay(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Pay Frequency</label>
              <select
                value={payPeriod}
                onChange={(e: any) => setPayPeriod(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="weekly">Weekly (52 / yr)</option>
                <option value="biweekly">Bi-weekly (26 / yr)</option>
                <option value="monthly">Monthly (12 / yr)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Filing Status</label>
              <select
                value={filingStatus}
                onChange={(e: any) => setFilingStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="single">Single / Head of Household</option>
                <option value="married">Married Filing Jointly</option>
              </select>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Net Take-Home Pay</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-emerald-400 font-mono">
                ${netTakeHomePay.toFixed(2)}
              </div>
              <span className="text-xs text-slate-500">Per paycheck period ({payPeriod})</span>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Social Security (6.2%):</span>
                <span className="font-mono text-slate-300">${socialSecurity.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Medicare (1.45%):</span>
                <span className="font-mono text-slate-300">${medicare.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Est. Federal Income Tax:</span>
                <span className="font-mono text-slate-300">${federalWithholdingEstimate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-200 pt-2 border-t border-slate-800">
                <span>Total Tax Withheld:</span>
                <span className="font-mono text-amber-400">${totalTaxDeductions.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
