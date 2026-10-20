import React, { useState } from "react";
import { MousePointer, DollarSign, TrendingUp, Target } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CostPerClickCpcCalculator: React.FC = () => {
  const [adSpend, setAdSpend] = useState<number>(3500);
  const [totalClicks, setTotalClicks] = useState<number>(2800);
  const [clickToCustomerConversionPercent, setClickToCustomerConversionPercent] = useState<number>(3.5);
  const [averageCustomerValue, setAverageCustomerValue] = useState<number>(120);

  const handleReset = () => {
    setAdSpend(3500);
    setTotalClicks(2800);
    setClickToCustomerConversionPercent(3.5);
    setAverageCustomerValue(120);
  };

  const cpc = totalClicks > 0 ? adSpend / totalClicks : 0;
  const customersAcquired = totalClicks * (clickToCustomerConversionPercent / 100);
  const costPerAcquisition = customersAcquired > 0 ? adSpend / customersAcquired : 0;
  const totalRevenueGenerated = customersAcquired * averageCustomerValue;
  const roas = adSpend > 0 ? totalRevenueGenerated / adSpend : 0;
  // Maximum breakeven CPC = Conversion% * Customer Value
  const maxBreakevenCpc = (clickToCustomerConversionPercent / 100) * averageCustomerValue;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Ad Budget & Clicks CPC Target Solver"
        description="Compute Cost Per Click (CPC), Cost Per Acquisition (CPA), Return on Ad Spend, and maximum breakeven bid targets."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Total Advertising Spend ($)"
            value={adSpend}
            onChange={(val) => setAdSpend(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Total Paid Clicks Generated"
            value={totalClicks}
            onChange={(val) => setTotalClicks(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Landing Page Conversion Rate (%)"
            value={clickToCustomerConversionPercent}
            onChange={(val) => setClickToCustomerConversionPercent(Math.min(100, Math.max(0.1, Number(val) || 0)))}
            type="number"
            min={0.1}
            max={100}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Average Order / Customer Value ($)"
            value={averageCustomerValue}
            onChange={(val) => setAverageCustomerValue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Cost Per Click (CPC)"
          value={`$${cpc.toFixed(2)}`}
          subtitle="Ad spend / clicks"
          variant="indigo"
        />
        <ResultCard
          title="Customer CPA"
          value={`$${costPerAcquisition.toFixed(2)}`}
          subtitle={`${Math.round(customersAcquired)} customers won`}
          variant="light"
        />
        <ResultCard
          title="Direct Campaign ROAS"
          value={`${roas.toFixed(2)}x`}
          subtitle={`$${totalRevenueGenerated.toLocaleString()} revenue`}
          variant="light"
        />
        <ResultCard
          title="Max Breakeven CPC"
          value={`$${maxBreakevenCpc.toFixed(2)}`}
          subtitle="Ceiling bidding threshold"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Bidding Strategy Guidance</h4>
        <p className="text-slate-600">
          Your current CPC of <strong className="text-slate-800">${cpc.toFixed(2)}</strong> generates a profitable ROAS of <strong className="text-slate-800">{roas.toFixed(2)}x</strong>. The highest CPC you can bid before losing money on direct sales is <strong className="text-slate-800">${maxBreakevenCpc.toFixed(2)}</strong>.
        </p>
      </div>
    </div>
  );
};
