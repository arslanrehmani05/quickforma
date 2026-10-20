import React, { useState } from "react";
import { DollarSign, MousePointerClick, Target, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PayPerClickPpcBudgetCalculator: React.FC = () => {
  const [revenueTarget, setRevenueTarget] = useState<number>(50000);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(250);
  const [conversionRatePercent, setConversionRatePercent] = useState<number>(2.5); // 2.5%
  const [averageCpc, setAverageCpc] = useState<number>(1.85);

  const handleReset = () => {
    setRevenueTarget(50000);
    setAverageOrderValue(250);
    setConversionRatePercent(2.5);
    setAverageCpc(1.85);
  };

  const ordersRequired = averageOrderValue > 0 ? Math.ceil(revenueTarget / averageOrderValue) : 0;
  const clicksRequired = conversionRatePercent > 0 ? Math.ceil(ordersRequired / (conversionRatePercent / 100)) : 0;
  const totalMonthlyBudget = clicksRequired * averageCpc;
  const dailySpend = totalMonthlyBudget / 30.4;
  const targetRoas = totalMonthlyBudget > 0 ? (revenueTarget / totalMonthlyBudget) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Monthly PPC Ad Budget & Clicks Planner"
        description="Forecast Google Search & Meta ad spend requirements based on sales goals, conversion rates, and cost per click."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Monthly Revenue Target ($)"
            value={revenueTarget}
            onChange={(val) => setRevenueTarget(Math.max(100, Number(val) || 0))}
            type="number"
            min={100}
            prefix="$"
          />
          <InputField
            label="Average Order / Deal ($)"
            value={averageOrderValue}
            onChange={(val) => setAverageOrderValue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Landing Page Conversion Rate (%)"
            value={conversionRatePercent}
            onChange={(val) => setConversionRatePercent(Math.min(100, Math.max(0.1, Number(val) || 0)))}
            type="number"
            min={0.1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Estimated Average CPC ($)"
            value={averageCpc}
            onChange={(val) => setAverageCpc(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Required Monthly Ad Spend"
            value={`$${totalMonthlyBudget.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle={`Daily budget: $${dailySpend.toFixed(0)}/day`}
            variant="light"
          />
          <ResultCard
            title="Required Traffic Clicks"
            value={clicksRequired.toLocaleString()}
            subtitle={`${ordersRequired} sales orders needed`}
            variant="light"
          />
          <ResultCard
            title="Projected ROAS"
            value={`${targetRoas.toFixed(2)}x`}
            subtitle={`$${(targetRoas * 100).toFixed(0)}% return on spend`}
            variant="light"
          />
          <ResultCard
            title="Cost per Acquisition (CPA)"
            value={`$${(ordersRequired > 0 ? totalMonthlyBudget / ordersRequired : 0).toFixed(2)}`}
            subtitle="Ad spend per paying customer"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
