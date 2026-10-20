import React, { useState } from "react";
import { FileText, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ContentMarketingRoiCalculator: React.FC = () => {
  const [contentCreationCost, setContentCreationCost] = useState<number>(6000);
  const [contentDistributionCost, setDistributionCost] = useState<number>(1500);
  const [leadsGenerated, setLeadsGenerated] = useState<number>(140);
  const [leadCloseRate, setLeadCloseRate] = useState<number>(8); // 8%
  const [averageCustomerLtv, setAverageCustomerLtv] = useState<number>(2400);

  const handleReset = () => {
    setContentCreationCost(6000);
    setDistributionCost(1500);
    setLeadsGenerated(140);
    setLeadCloseRate(8);
    setAverageCustomerLtv(2400);
  };

  const totalContentInvestment = contentCreationCost + contentDistributionCost;
  const customersAcquired = Math.floor(leadsGenerated * (leadCloseRate / 100));
  const totalRevenueAttributed = customersAcquired * averageCustomerLtv;
  const netProfit = totalRevenueAttributed - totalContentInvestment;
  const contentRoi = totalContentInvestment > 0 ? (netProfit / totalContentInvestment) * 100 : 0;
  const costPerAcquiredCustomer = customersAcquired > 0 ? totalContentInvestment / customersAcquired : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Content Marketing & SEO ROI Solver"
        description="Compute return on investment for blog posts, SEO publishing programs, and editorial lead generation."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Creation & Writing Cost ($)"
            value={contentCreationCost}
            onChange={(val) => setContentCreationCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Distribution / SEO Spend ($)"
            value={contentDistributionCost}
            onChange={(val) => setDistributionCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Attributed Organic Leads"
            value={leadsGenerated}
            onChange={(val) => setLeadsGenerated(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Lead-to-Customer Close Rate (%)"
            value={leadCloseRate}
            onChange={(val) => setLeadCloseRate(Math.min(100, Math.max(0.1, Number(val) || 0)))}
            type="number"
            min={0.1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Average Customer LTV ($)"
            value={averageCustomerLtv}
            onChange={(val) => setAverageCustomerLtv(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Total Investment"
            value={`$${totalContentInvestment.toLocaleString()}`}
            subtitle="Creation + Distribution"
            variant="light"
          />
          <ResultCard
            title="Customers Won"
            value={`${customersAcquired}`}
            subtitle={`Cost per acquisition: $${costPerAcquiredCustomer.toFixed(0)}`}
            variant="light"
          />
          <ResultCard
            title="Attributed Revenue"
            value={`$${totalRevenueAttributed.toLocaleString()}`}
            subtitle={`Net profit: $${netProfit.toLocaleString()}`}
            variant="indigo"
          />
          <ResultCard
            title="Content Marketing ROI"
            value={`${contentRoi.toFixed(1)}%`}
            subtitle="Net return on program spend"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
