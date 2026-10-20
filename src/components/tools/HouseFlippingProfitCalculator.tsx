import React, { useState } from "react";
import { Hammer, DollarSign, TrendingUp, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const HouseFlippingProfitCalculator: React.FC = () => {
  const [arv, setArv] = useState<number>(380000); // After Repair Value
  const [rehabCost, setRehabCost] = useState<number>(55000); // Renovation
  const [actualPurchasePrice, setActualPurchasePrice] = useState<number>(195000);
  const [holdingAndFinanceCosts, setHoldingAndFinanceCosts] = useState<number>(18000); // Hard money interest, utilities, taxes
  const [realtorSellingFeesPercent, setRealtorSellingFeesPercent] = useState<number>(6.0);

  const handleReset = () => {
    setArv(380000);
    setRehabCost(55000);
    setActualPurchasePrice(195000);
    setHoldingAndFinanceCosts(18000);
    setRealtorSellingFeesPercent(6.0);
  };

  // 70% Rule of House Flipping: Max Allowable Offer (MAO) = (ARV * 0.70) - Rehab Costs
  const mao70PercentRule = (arv * 0.70) - rehabCost;
  const sellingCommission = arv * (realtorSellingFeesPercent / 100);
  const totalProjectCosts = actualPurchasePrice + rehabCost + holdingAndFinanceCosts + sellingCommission;
  const netFlipProfit = arv - totalProjectCosts;
  const returnOnTotalInvestment = totalProjectCosts > 0 ? (netFlipProfit / totalProjectCosts) * 100 : 0;
  const isWithin70Rule = actualPurchasePrice <= mao70PercentRule;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="70% Rule Flip Purchase & ARV Profit Solver"
        description="Compute real estate fix-and-flip profits, Maximum Allowable Offers (MAO) under the 70% rule, and rehab margins."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="After Repair Value (ARV $)"
            value={arv}
            onChange={(val) => setArv(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Estimated Rehab & Repair Costs ($)"
            value={rehabCost}
            onChange={(val) => setRehabCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Actual Agreed Purchase Price ($)"
            value={actualPurchasePrice}
            onChange={(val) => setActualPurchasePrice(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Holding & Hard Money Financing ($)"
            value={holdingAndFinanceCosts}
            onChange={(val) => setHoldingAndFinanceCosts(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Selling Realtor & Closing Fees (%)"
            value={realtorSellingFeesPercent}
            onChange={(val) => setRealtorSellingFeesPercent(Math.min(15, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={15}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Net Flip Profit"
          value={`$${netFlipProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Cash profit on exit"
          variant="indigo"
        />
        <ResultCard
          title="70% Rule Target (MAO)"
          value={`$${mao70PercentRule.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={isWithin70Rule ? "Within 70% rule safe margin" : "Exceeds 70% rule guidance"}
          variant="light"
        />
        <ResultCard
          title="ROI on Total Capital"
          value={`${returnOnTotalInvestment.toFixed(1)}%`}
          subtitle="Return on capital"
          variant="light"
        />
        <ResultCard
          title="Total Outlay Costs"
          value={`$${totalProjectCosts.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Acquisition + rehab + carry"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Flipping Margin Assessment</h4>
        <p className="text-slate-600">
          The 70% rule suggests a maximum purchase offer of <strong className="text-slate-800">${mao70PercentRule.toLocaleString()}</strong>. At an agreed price of ${actualPurchasePrice.toLocaleString()}, the deal generates <strong className="text-slate-800">${netFlipProfit.toLocaleString()} in net profit ({returnOnTotalInvestment.toFixed(1)}% ROI)</strong> after all construction, interest, and agent commissions are paid.
        </p>
      </div>
    </div>
  );
};
