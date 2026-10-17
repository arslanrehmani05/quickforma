import React, { useState } from "react";
import { BarChart3, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const NpvIrrCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [discountRate, setDiscountRate] = useState<number>(10);
  const [cf1, setCf1] = useState<number>(30000);
  const [cf2, setCf2] = useState<number>(35000);
  const [cf3, setCf3] = useState<number>(40000);
  const [cf4, setCf4] = useState<number>(35000);
  const [cf5, setCf5] = useState<number>(25000);

  const cashFlows = [cf1 || 0, cf2 || 0, cf3 || 0, cf4 || 0, cf5 || 0];
  const rate = (discountRate || 0) / 100;

  // NPV calculation
  let npv = -(initialInvestment || 0);
  cashFlows.forEach((cf, idx) => {
    npv += cf / Math.pow(1 + rate, idx + 1);
  });

  // Calculate IRR via bisection search
  const calculateIrr = (inv: number, cfs: number[]) => {
    let low = -0.99;
    let high = 5.0;
    for (let i = 0; i < 100; i++) {
      const mid = (low + high) / 2;
      let val = -inv;
      cfs.forEach((cf, idx) => {
        val += cf / Math.pow(1 + mid, idx + 1);
      });
      if (Math.abs(val) < 0.001) return mid * 100;
      if (val > 0) {
        low = mid;
      } else {
        high = mid;
      }
    }
    return ((low + high) / 2) * 100;
  };

  const irr = calculateIrr(initialInvestment || 0, cashFlows);
  const totalInflows = cashFlows.reduce((a, b) => a + b, 0);
  const profitabilityIndex = (initialInvestment || 0) > 0 ? (npv + initialInvestment) / initialInvestment : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BarChart3}
            title="Net Present Value (NPV) & IRR Calculator"
            description="Evaluate capital investment profitability, discounted cash flows, and Internal Rate of Return."
          />
          <ResetButton onReset={() => {
            setInitialInvestment(100000);
            setDiscountRate(10);
            setCf1(30000);
            setCf2(35000);
            setCf3(40000);
            setCf4(35000);
            setCf5(25000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Initial Outlay ($)" type="number" prefix="$" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} />
              <InputField label="Discount / Hurdle Rate (%)" type="number" suffix="%" value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))} />
            </div>

            <h3 className="text-sm font-bold text-slate-800 pt-2 border-t border-slate-100">Annual Projected Net Cash Inflows ($)</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Year 1 Inflow ($)" type="number" prefix="$" value={cf1} onChange={(e) => setCf1(Number(e.target.value))} />
              <InputField label="Year 2 Inflow ($)" type="number" prefix="$" value={cf2} onChange={(e) => setCf2(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Year 3 Inflow ($)" type="number" prefix="$" value={cf3} onChange={(e) => setCf3(Number(e.target.value))} />
              <InputField label="Year 4 Inflow ($)" type="number" prefix="$" value={cf4} onChange={(e) => setCf4(Number(e.target.value))} />
            </div>
            <InputField label="Year 5 Inflow ($)" type="number" prefix="$" value={cf5} onChange={(e) => setCf5(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Capital Budgeting Valuation">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Net Present Value (NPV)</span>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${npv >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    ${npv.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-slate-400">
                    {npv >= 0
                      ? "Project creates economic value above the required discount hurdle rate."
                      : "Project destroys economic value at the specified hurdle rate."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Internal Rate of Return (IRR)</span>
                    <span className="text-lg font-bold text-white">{isFinite(irr) ? `${irr.toFixed(2)}%` : "N/A"}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Profitability Index</span>
                    <span className="text-lg font-bold text-white">{profitabilityIndex.toFixed(2)}x</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Total Undiscounted Inflows</span>
                    <span className="text-base font-bold text-white">${totalInflows.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Decision Recommendation</span>
                    <span className={`text-xs font-bold block ${npv >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {npv >= 0 ? "Accept Investment" : "Reject Investment"}
                    </span>
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
