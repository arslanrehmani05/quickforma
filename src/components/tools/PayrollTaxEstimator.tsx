import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const PayrollTaxEstimator: React.FC = () => {
  const [grossPay, setGrossPay] = useState<number>(5000);
  const [payPeriod, setPayPeriod] = useState<'monthly' | 'biweekly'>('monthly');

  const socialSecurity = (grossPay || 0) * 0.062;
  const medicare = (grossPay || 0) * 0.0145;
  const estFederalTax = (grossPay || 0) * 0.12;
  const netPay = Math.max(0, (grossPay || 0) - (socialSecurity + medicare + estFederalTax));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Payroll Tax & Net Pay Estimator</h2>
            <p className="text-slate-600 text-sm">Estimate FICA (Social Security & Medicare) withholdings and net paycheck.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold  mb-2">Gross Pay Per Period ($)</label>
              <input
                type="number"
                min="0"
                value={grossPay}
                onChange={(e) => setGrossPay(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold  mb-2">Pay Frequency</label>
              <select
                value={payPeriod}
                onChange={(e: any) => setPayPeriod(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              >
                <option value="monthly">Monthly (12/yr)</option>
                <option value="biweekly">Bi-Weekly (26/yr)</option>
              </select>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold  text-indigo-200">Estimated Net Paycheck</span>
              <div className="my-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">${netPay.toFixed(2)}</div>
            </div>
            <div className="pt-4 border-t border-indigo-500/80 space-y-2 text-xs text-indigo-100">
              <div className="flex justify-between"><span>Social Security (6.2%):</span><span className="font-bold text-white">${socialSecurity.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Medicare (1.45%):</span><span className="font-bold text-white">${medicare.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Est. Income Tax (12%):</span><span className="font-bold text-white">${estFederalTax.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
