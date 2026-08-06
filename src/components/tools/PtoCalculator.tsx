import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { Calendar, Clock } from 'lucide-react';

export const PtoCalculator: React.FC = () => {
  const [accrualRate, setAccrualRate] = useState<number>(3.33); // Hours per pay period
  const [payPeriod, setPayPeriod] = useState<'biweekly' | 'semimonthly' | 'monthly'>('biweekly');
  const [startingBalance, setStartingBalance] = useState<number>(16);
  const [ptoUsed, setPtoUsed] = useState<number>(8);
  const [monthsAhead, setMonthsAhead] = useState<number>(6);

  // Pay periods per year
  const payPeriodsCount = {
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
  }[payPeriod];

  // Pay periods in selected future months
  const periodsInMonths = Math.round((payPeriodsCount / 12) * monthsAhead);
  const accruedHours = periodsInMonths * accrualRate;
  const projectedBalance = startingBalance + accruedHours - ptoUsed;
  const projectedDays = projectedBalance / 8; // 8-hour workday

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <Calendar className="w-5 h-5" />
            <span>PTO (Paid Time Off) Accrual Calculator</span>
          </div>
          <ResetButton onReset={() => { setAccrualRate(3.33); setPayPeriod('biweekly'); setStartingBalance(16); setPtoUsed(8); setMonthsAhead(6); }} />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Accrual Rate (Hours / Pay Period)
            </label>
            <input
              type="number"
              value={accrualRate}
              onChange={(e) => setAccrualRate(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Pay Period Schedule
            </label>
            <select
              value={payPeriod}
              onChange={(e) => setPayPeriod(e.target.value as any)}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold cursor-pointer"
            >
              <option value="biweekly">Bi-Weekly (26 pay periods/yr)</option>
              <option value="semimonthly">Semi-Monthly (24 pay periods/yr)</option>
              <option value="monthly">Monthly (12 pay periods/yr)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Current PTO Balance (Hours)
            </label>
            <input
              type="number"
              value={startingBalance}
              onChange={(e) => setStartingBalance(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Planned PTO Hours to Take
            </label>
            <input
              type="number"
              value={ptoUsed}
              onChange={(e) => setPtoUsed(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Projection Horizon ({monthsAhead} Months)
            </label>
            <input
              type="range"
              min="1"
              max="12"
              value={monthsAhead}
              onChange={(e) => setMonthsAhead(Number(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
          </div>
        </div>

        {/* Output */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
          <div className="p-5 bg-black text-white rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-zinc-300">Projected Balance ({monthsAhead} mo)</span>
            <div className="text-2xl font-extrabold">{projectedBalance.toFixed(1)} Hours</div>
            <span className="text-[11px] text-zinc-400 font-mono">Equivalent to {projectedDays.toFixed(1)} workdays</span>
          </div>

          <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">New Hours Accrued</span>
            <div className="text-xl font-bold text-zinc-900">+{accruedHours.toFixed(1)} Hours</div>
            <span className="text-[11px] text-zinc-500 font-mono">Over {periodsInMonths} pay periods</span>
          </div>

          <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Annual Accrual Total</span>
            <div className="text-xl font-bold text-zinc-900">{(accrualRate * payPeriodsCount).toFixed(1)} Hours / Year</div>
            <span className="text-[11px] text-zinc-500 font-mono">{((accrualRate * payPeriodsCount) / 8).toFixed(1)} days/year</span>
          </div>
        </div>
      </div>
    </div>
  );
};
