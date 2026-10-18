import React, { useState } from "react";
import { Truck, DollarSign, TrendingUp, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FreeShippingThresholdCalculator: React.FC = () => {
  const [currentAov, setCurrentAov] = useState<number>(45.00);
  const [shippingCostToMerchant, setShippingCostToMerchant] = useState<number>(6.50);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(50);

  const aov = Math.max(1, Number(currentAov) || 1);
  const shipCost = Math.max(0, Number(shippingCostToMerchant) || 0);
  const marginPct = Math.min(100, Math.max(1, Number(grossMarginPct) || 1));

  // Recommended threshold: typically 15% to 30% above current AOV (rounded up to nearest $5)
  const recommendedThreshold = Math.ceil((aov * 1.25) / 5) * 5;

  const basketLift = Math.max(0, recommendedThreshold - aov);
  const additionalGrossProfit = basketLift * (marginPct / 100);
  const netThresholdMargin = additionalGrossProfit - shipCost;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Truck}
            title="Free Shipping Threshold & Basket Lift Calculator"
            description="Find the optimal free shipping cart threshold that increases AOV while preserving merchant gross profitability."
          />
          <ResetButton onReset={() => {
            setCurrentAov(45.00);
            setShippingCostToMerchant(6.50);
            setGrossMarginPct(50);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Current Average Order Value ($)"
            type="number"
            min={1}
            step="0.5"
            value={currentAov}
            onChange={(e) => setCurrentAov(Math.max(1, Number(e.target.value)))}
          />
          <InputField
            label="Shipping Cost Absorbed ($)"
            type="number"
            min={0}
            step="0.25"
            value={shippingCostToMerchant}
            onChange={(e) => setShippingCostToMerchant(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Store Gross Margin (%)"
            type="number"
            min={1}
            max={100}
            value={grossMarginPct}
            onChange={(e) => setGrossMarginPct(Math.min(100, Math.max(1, Number(e.target.value))))}
          />
        </div>

        <ResultCard variant="dark" title="Recommended Free Shipping Rule">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Recommended Bar</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">${recommendedThreshold.toFixed(0)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Free shipping on orders ${recommendedThreshold}+</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Required Cart Lift</span>
              <p className="text-4xl font-extrabold text-white mt-1">+${basketLift.toFixed(2)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">AOV expansion</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Added Gross Profit</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">${additionalGrossProfit.toFixed(2)}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">From extra cart items</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Lift Profitability</span>
              <p className={`text-2xl font-bold mt-1 ${netThresholdMargin >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                ${netThresholdMargin.toFixed(2)}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Profit lift minus postage</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
