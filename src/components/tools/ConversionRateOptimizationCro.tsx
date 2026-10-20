import React, { useState } from "react";
import { TrendingUp, DollarSign, Users, Target } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ConversionRateOptimizationCro: React.FC = () => {
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(45000);
  const [baselineConversionRate, setBaselineConversionRate] = useState<number>(2.2); // 2.2%
  const [targetConversionRate, setTargetConversionRate] = useState<number>(2.8); // 2.8%
  const [averageOrderValue, setAverageOrderValue] = useState<number>(85.00);

  const handleReset = () => {
    setMonthlyVisitors(45000);
    setBaselineConversionRate(2.2);
    setTargetConversionRate(2.8);
    setAverageOrderValue(85.00);
  };

  const baselineOrders = monthlyVisitors * (baselineConversionRate / 100);
  const targetOrders = monthlyVisitors * (targetConversionRate / 100);
  const additionalOrdersMonthly = targetOrders - baselineOrders;

  const baselineRevenueMonthly = baselineOrders * averageOrderValue;
  const targetRevenueMonthly = targetOrders * averageOrderValue;
  const incrementalRevenueMonthly = targetRevenueMonthly - baselineRevenueMonthly;
  const annualizedRevenueLift = incrementalRevenueMonthly * 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="CRO Revenue Impact & Lift Solver"
        description="Compute the bottom-line financial revenue impact of website Conversion Rate Optimization (CRO) A/B test uplifts."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Monthly Unique Website Visitors"
            value={monthlyVisitors}
            onChange={(val) => setMonthlyVisitors(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Average Order Value ($)"
            value={averageOrderValue}
            onChange={(val) => setAverageOrderValue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Current Baseline Conversion Rate (%)"
            value={baselineConversionRate}
            onChange={(val) => setBaselineConversionRate(Math.min(100, Math.max(0.1, Number(val) || 0)))}
            type="number"
            min={0.1}
            max={100}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Improved Target Conversion Rate (%)"
            value={targetConversionRate}
            onChange={(val) => setTargetConversionRate(Math.min(100, Math.max(0.1, Number(val) || 0)))}
            type="number"
            min={0.1}
            max={100}
            step={0.1}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Added Monthly Revenue"
          value={`+$${incrementalRevenueMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Pure gross margin gain"
          variant="indigo"
        />
        <ResultCard
          title="Annualized Revenue Lift"
          value={`+$${annualizedRevenueLift.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
          subtitle="Without spending more on ads"
          variant="light"
        />
        <ResultCard
          title="Additional Orders"
          value={`+${Math.round(additionalOrdersMonthly).toLocaleString()} / mo`}
          subtitle={`From ${baselineConversionRate}% to ${targetConversionRate}%`}
          variant="light"
        />
        <ResultCard
          title="Relative Conversion Lift"
          value={`+${(((targetConversionRate - baselineConversionRate) / baselineConversionRate) * 100).toFixed(1)}%`}
          subtitle="Percentage improvement"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">CRO Revenue Power</h4>
        <p className="text-slate-600">
          Lifting conversion rate by just <strong className="text-slate-800">0.6 percentage points</strong> unlocks an extra <strong className="text-slate-800">${incrementalRevenueMonthly.toLocaleString()} each month (${annualizedRevenueLift.toLocaleString()}/yr)</strong> on identical traffic without paying Google or Meta for additional ad clicks.
        </p>
      </div>
    </div>
  );
};
