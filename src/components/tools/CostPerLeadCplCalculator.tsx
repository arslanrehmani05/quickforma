import React, { useState } from "react";
import { Target, DollarSign, Users, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CostPerLeadCplCalculator: React.FC = () => {
  const [campaignSpend, setCampaignSpend] = useState<number>(6000);
  const [leadsGenerated, setLeadsGenerated] = useState<number>(140);
  const [closeRatePercent, setCloseRatePercent] = useState<number>(12); // Lead-to-deal close rate
  const [averageDealValue, setAverageDealValue] = useState<number>(2400); // B2B contract value

  const handleReset = () => {
    setCampaignSpend(6000);
    setLeadsGenerated(140);
    setCloseRatePercent(12);
    setAverageDealValue(2400);
  };

  const cpl = leadsGenerated > 0 ? campaignSpend / leadsGenerated : 0;
  const closedDeals = leadsGenerated * (closeRatePercent / 100);
  const customerAcquisitionCost = closedDeals > 0 ? campaignSpend / closedDeals : 0;
  const totalPipelineRevenue = closedDeals * averageDealValue;
  const netProfit = totalPipelineRevenue - campaignSpend;
  const campaignRoiPercent = campaignSpend > 0 ? (netProfit / campaignSpend) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Lead Generation Campaign Cost Per Lead Solver"
        description="Compute B2B Cost Per Lead (CPL), Customer Acquisition Cost (CAC), and sales pipeline close-rate returns."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Total Campaign Budget Spend ($)"
            value={campaignSpend}
            onChange={(val) => setCampaignSpend(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Total Qualified Leads Generated"
            value={leadsGenerated}
            onChange={(val) => setLeadsGenerated(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Sales Lead-to-Close Rate (%)"
            value={closeRatePercent}
            onChange={(val) => setCloseRatePercent(Math.min(100, Math.max(0.1, Number(val) || 0)))}
            type="number"
            min={0.1}
            max={100}
            step={0.5}
            suffix="%"
          />
          <InputField
            label="Average Contract / Deal Value ($)"
            value={averageDealValue}
            onChange={(val) => setAverageDealValue(Math.max(1, Number(val) || 0))}
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
          title="Cost Per Lead (CPL)"
          value={`$${cpl.toFixed(2)}`}
          subtitle="Spend / lead count"
          variant="indigo"
        />
        <ResultCard
          title="Customer CAC"
          value={`$${customerAcquisitionCost.toFixed(2)}`}
          subtitle={`${Math.round(closedDeals)} deals closed`}
          variant="light"
        />
        <ResultCard
          title="Pipeline Revenue"
          value={`$${totalPipelineRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Gross sales generated"
          variant="light"
        />
        <ResultCard
          title="Lead Campaign ROI"
          value={`${campaignRoiPercent.toFixed(0)}%`}
          subtitle={`$${netProfit.toLocaleString()} net profit`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Funnel Economics</h4>
        <p className="text-slate-600">
          Paying <strong className="text-slate-800">${cpl.toFixed(2)} per lead</strong> converts into <strong className="text-slate-800">${customerAcquisitionCost.toFixed(2)} per paying customer</strong> at your {closeRatePercent}% close rate. Against an average deal size of ${averageDealValue.toLocaleString()}, every customer generates <strong className="text-slate-800">${(averageDealValue - customerAcquisitionCost).toLocaleString()} in net margin</strong> after marketing.
        </p>
      </div>
    </div>
  );
};
