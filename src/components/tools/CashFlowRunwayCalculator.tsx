import React, { useState } from 'react';
import { TrendingDown, Calendar, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';
import { ResetButton } from '../common/ResetButton';

export const CashFlowRunwayCalculator: React.FC = () => {
  const [cashBalance, setCashBalance] = useState<number>(250000);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(45000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(65000);
  const [oneTimeExpense, setOneTimeExpense] = useState<number>(0);

  const netBurn = Math.max(0, (monthlyExpenses || 0) - (monthlyRevenue || 0));
  const netSurplus = Math.max(0, (monthlyRevenue || 0) - (monthlyExpenses || 0));
  const effectiveCash = Math.max(0, (cashBalance || 0) - (oneTimeExpense || 0));

  const runwayMonths = netBurn > 0 ? (effectiveCash / netBurn) : Infinity;

  const calculateZeroDate = (months: number) => {
    if (!isFinite(months) || months <= 0) return 'N/A (Cash Positive)';
    const now = new Date();
    const futureDate = new Date(now.getFullYear(), now.getMonth() + Math.floor(months), now.getDate() + Math.round((months % 1) * 30));
    return futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const zeroCashDate = calculateZeroDate(runwayMonths);

  const getStatusBadge = () => {
    if (!isFinite(runwayMonths)) {
      return { label: 'Cash-Flow Positive', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: CheckCircle };
    }
    if (runwayMonths >= 12) {
      return { label: 'Healthy Runway', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: CheckCircle };
    }
    if (runwayMonths >= 6) {
      return { label: 'Moderate Runway', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: AlertCircle };
    }
    return { label: 'Critical: < 6 Mo', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30', icon: AlertCircle };
  };

  const status = getStatusBadge();
  const StatusIcon = status.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={TrendingDown}
            title="Cash Flow Runway & Burn Rate Calculator"
            description="Forecast business runway months, net burn rate, and projected zero-cash exhaustion date."
          />
          <ResetButton onReset={() => {
            setCashBalance(250000);
            setMonthlyRevenue(45000);
            setMonthlyExpenses(65000);
            setOneTimeExpense(0);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Current Liquid Cash Balance ($)"
              type="number"
              prefix="$"
              value={cashBalance}
              onChange={(e) => setCashBalance(Number(e.target.value))}
              helpText="Available checking, savings, and short-term liquid reserves."
            />
            <InputField
              label="Average Monthly Cash Receipts / Revenue ($)"
              type="number"
              prefix="$"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              helpText="Average monthly collected cash from customers or clients."
            />
            <InputField
              label="Average Monthly Operating Expenses ($)"
              type="number"
              prefix="$"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              helpText="Payroll, cloud hosting, rent, software, and overhead."
            />
            <InputField
              label="Immediate One-Time Capital Outlays ($)"
              type="number"
              prefix="$"
              value={oneTimeExpense}
              onChange={(e) => setOneTimeExpense(Number(e.target.value))}
              helpText="Planned equipment purchases, tax payments, or prepayments."
            />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Cash Runway Projection">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Runway Health Status</span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {status.label}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Estimated Runway</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    {isFinite(runwayMonths) ? `${runwayMonths.toFixed(1)} Months` : 'Sustainable ∞'}
                  </div>
                  <p className="text-xs text-slate-400">
                    {isFinite(runwayMonths)
                      ? `At $${netBurn.toLocaleString()}/mo net burn, cash depletes by ${zeroCashDate}.`
                      : `Business generates $${netSurplus.toLocaleString()}/mo in surplus operating cash flow.`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Monthly Net Burn</span>
                    <span className="text-lg font-bold text-white">${netBurn.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Zero-Cash Date</span>
                    <span className="text-sm font-bold text-white truncate block">{zeroCashDate}</span>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
