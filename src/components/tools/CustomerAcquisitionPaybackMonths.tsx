import React, { useState } from "react";
import { Clock, DollarSign, Target, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CustomerAcquisitionPaybackMonths: React.FC = () => {
  const [customerAcquisitionCostCac, setCustomerAcquisitionCostCac] = useState<number>(3600);
  const [averageMonthlyRevenuePerUserArpu, setAverageMonthlyRevenuePerUserArpu] = useState<number>(380);
  const [grossMarginPercent, setGrossMarginPercent] = useState<number>(75); // 75% gross margin

  const handleReset = () => {
    setCustomerAcquisitionCostCac(3600);
    setAverageMonthlyRevenuePerUserArpu(380);
    setGrossMarginPercent(75);
  };

  const monthlyGrossMarginContribution = averageMonthlyRevenuePerUserArpu * (grossMarginPercent / 100);
  // CAC Payback = CAC / (ARPU * Gross Margin %)
  const cacPaybackMonths = monthlyGrossMarginContribution > 0 ? customerAcquisitionCostCac / monthlyGrossMarginContribution : 0;
  const isHealthyPayback = cacPaybackMonths <= 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Customer Acquisition Cost (CAC) Payback Period in Months Solver"
        description="Compute capital recovery speed for customer acquisition costs adjusted for product gross margins."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Customer Acquisition Cost (CAC $) "
            value={customerAcquisitionCostCac}
            onChange={(val) => setCustomerAcquisitionCostCac(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Average Monthly Revenue (ARPU $)"
            value={averageMonthlyRevenuePerUserArpu}
            onChange={(val) => setAverageMonthlyRevenuePerUserArpu(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Product Gross Margin (%)"
            value={grossMarginPercent}
            onChange={(val) => setGrossMarginPercent(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="CAC Payback Timeline"
            value={`${cacPaybackMonths.toFixed(1)} months`}
            subtitle={isHealthyPayback ? "Top-quartile capital efficiency (≤12 mo)" : "Long payback (>12 mo)"}
            variant="light"
          />
          <ResultCard
            title="Monthly Gross Contribution"
            value={`$${monthlyGrossMarginContribution.toFixed(2)}/mo`}
            subtitle="Gross profit per user per month"
            variant="light"
          />
          <ResultCard
            title="Annual Net Return per User"
            value={`$${(monthlyGrossMarginContribution * 12).toFixed(0)}/yr`}
            subtitle="Annual gross margin generated"
            variant="indigo"
          />
        </div>
      </div>
    </div>
  );
};
