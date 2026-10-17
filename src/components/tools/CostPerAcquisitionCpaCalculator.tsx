import React, { useState } from "react";
import { Target, TrendingUp, Users } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CostPerAcquisitionCpaCalculator: React.FC = () => {
  const [totalSpend, setTotalSpend] = useState<number>(12500);
  const [conversions, setConversions] = useState<number>(250);
  const [customerLtv, setCustomerLtv] = useState<number>(185);

  const cpa = (conversions || 0) > 0 ? (totalSpend || 0) / conversions : 0;
  const ltvCpaRatio = cpa > 0 ? (customerLtv || 0) / cpa : 0;

  const getRatioStatus = () => {
    if (ltvCpaRatio >= 3.0) return { label: "Excellent Unit Economics (≥ 3:1)", color: "text-emerald-400" };
    if (ltvCpaRatio >= 2.0) return { label: "Healthy Payback (2:1 – 3:1)", color: "text-indigo-300" };
    return { label: "Marginal / High Acquisition Cost (< 2:1)", color: "text-rose-400" };
  };

  const status = getRatioStatus();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Target}
            title="Ecommerce Customer CPA & LTV:CAC Ratio"
            description="Calculate paid marketing Cost Per Acquisition (CPA) and evaluate LTV-to-CPA unit economics health."
          />
          <ResetButton onReset={() => {
            setTotalSpend(12500);
            setConversions(250);
            setCustomerLtv(185);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Total Marketing / Advertising Spend ($)" type="number" prefix="$" value={totalSpend} onChange={(e) => setTotalSpend(Number(e.target.value))} />
            <InputField label="Total Acquired Customers / Conversions" type="number" value={conversions} onChange={(e) => setConversions(Number(e.target.value))} />
            <InputField label="Customer Lifetime Value (LTV) ($)" type="number" prefix="$" value={customerLtv} onChange={(e) => setCustomerLtv(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Acquisition Performance">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Cost Per Acquisition (CPA)</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    ${cpa.toFixed(2)}
                  </div>
                  <p className={`text-xs font-bold ${status.color}`}>
                    LTV:CPA Ratio: {ltvCpaRatio.toFixed(2)}:1 ({status.label})
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Total Capital Deployed</span>
                    <span className="text-base font-bold text-white">${totalSpend.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">LTV Surplus per Customer</span>
                    <span className="text-base font-bold text-emerald-400">
                      ${Math.max(0, (customerLtv || 0) - cpa).toFixed(2)}
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
