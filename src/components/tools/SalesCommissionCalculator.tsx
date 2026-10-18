import React, { useState } from "react";
import { BadgePercent, DollarSign, Target, Award } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SalesCommissionCalculator: React.FC = () => {
  const [salesRevenue, setSalesRevenue] = useState<number>(350000);
  const [quotaTarget, setQuotaTarget] = useState<number>(250000);
  const [baseSalary, setBaseSalary] = useState<number>(75000);
  const [baseRate, setBaseRate] = useState<number>(10.0);
  const [acceleratorRate, setAcceleratorRate] = useState<number>(15.0);

  const quotaAttainment = quotaTarget > 0 ? (salesRevenue / quotaTarget) * 100 : 0;

  // Tiered commission
  let commission = 0;
  if (salesRevenue <= quotaTarget) {
    commission = salesRevenue * (baseRate / 100);
  } else {
    commission = quotaTarget * (baseRate / 100) + (salesRevenue - quotaTarget) * (acceleratorRate / 100);
  }

  const totalOte = (baseSalary || 0) + commission;
  const effectiveRate = salesRevenue > 0 ? (commission / salesRevenue) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BadgePercent}
            title="Tiered Sales Commission & Split Calculator"
            description="Calculate tiered sales commission splits, quota attainment multipliers, accelerators, and total OTE payout."
          />
          <ResetButton onReset={() => {
            setSalesRevenue(350000);
            setQuotaTarget(250000);
            setBaseSalary(75000);
            setBaseRate(10.0);
            setAcceleratorRate(15.0);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Total Sales Revenue Closed ($)" type="number" prefix="$" value={salesRevenue} onChange={(e) => setSalesRevenue(Number(e.target.value))} />
            <InputField label="Annual Sales Quota Target ($)" type="number" prefix="$" value={quotaTarget} onChange={(e) => setQuotaTarget(Number(e.target.value))} />
            <InputField label="Base Annual Salary ($)" type="number" prefix="$" value={baseSalary} onChange={(e) => setBaseSalary(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Base Commission Rate (%)" type="number" suffix="%" value={baseRate} onChange={(e) => setBaseRate(Number(e.target.value))} />
              <InputField label="Over-Quota Accelerator (%)" type="number" suffix="%" value={acceleratorRate} onChange={(e) => setAcceleratorRate(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Total Commission Earnings">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Total Commission Earned</div>
                  <div className="text-4xl font-extrabold text-emerald-400">
                    ${commission.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Quota Attainment: <span className="font-bold text-white">{quotaAttainment.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Take-Home (Base + Comm):</span>
                    <p className="text-white font-bold text-sm mt-0.5">${totalOte.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Effective Commission Rate:</span>
                    <p className="text-indigo-200 font-bold text-sm mt-0.5">{effectiveRate.toFixed(2)}%</p>
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
