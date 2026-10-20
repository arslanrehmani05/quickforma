import React, { useState } from "react";
import { Users, DollarSign, Percent, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RealEstateCommissionSplitCalculator: React.FC = () => {
  const [homeSalePrice, setHomeSalePrice] = useState<number>(480000);
  const [totalCommissionPercent, setTotalCommissionPercent] = useState<number>(5.5);
  const [sideSharePercent, setSideSharePercent] = useState<number>(50); // Listing side vs Buyer side
  const [agentSplitPercent, setAgentSplitPercent] = useState<number>(75); // 75/25 agent/brokerage split
  const [deskAndFranchiseFee, setDeskAndFranchiseFee] = useState<number>(350); // Monthly desk/E&O fee

  const handleReset = () => {
    setHomeSalePrice(480000);
    setTotalCommissionPercent(5.5);
    setSideSharePercent(50);
    setAgentSplitPercent(75);
    setDeskAndFranchiseFee(350);
  };

  const totalGrossCommission = homeSalePrice * (totalCommissionPercent / 100);
  const sideGrossCommission = totalGrossCommission * (sideSharePercent / 100);
  const agentPreFeeCommission = sideGrossCommission * (agentSplitPercent / 100);
  const agentNetTakeHome = Math.max(0, agentPreFeeCommission - deskAndFranchiseFee);
  const brokerRetainedCommission = sideGrossCommission - agentPreFeeCommission + deskAndFranchiseFee;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Agent vs Brokerage Commission Split Solver"
        description="Compute real estate agent commission splits, broker desk fee deductions, and net closing commission checks."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Property Sale Price ($)"
            value={homeSalePrice}
            onChange={(val) => setHomeSalePrice(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Total Commission Rate (%)"
            value={totalCommissionPercent}
            onChange={(val) => setTotalCommissionPercent(Math.min(15, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={15}
            step={0.25}
            suffix="%"
          />
          <InputField
            label="Your Side Share (Listing/Buyer %)"
            value={sideSharePercent}
            onChange={(val) => setSideSharePercent(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Agent Split Share (%)"
            value={agentSplitPercent}
            onChange={(val) => setAgentSplitPercent(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Broker Desk / Transaction Fee ($)"
            value={deskAndFranchiseFee}
            onChange={(val) => setDeskAndFranchiseFee(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Agent Net Take-Home Check"
          value={`$${agentNetTakeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Net commission paid to agent"
          variant="indigo"
        />
        <ResultCard
          title="Brokerage Retained Share"
          value={`$${brokerRetainedCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Broker house split"
          variant="light"
        />
        <ResultCard
          title="Your Side Gross Commission"
          value={`$${sideGrossCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${sideSharePercent}% of total commission`}
          variant="light"
        />
        <ResultCard
          title="Total Deal Commission"
          value={`$${totalGrossCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${totalCommissionPercent}% on $${homeSalePrice.toLocaleString()}`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Split Breakdown</h4>
        <p className="text-slate-600">
          On this ${homeSalePrice.toLocaleString()} closing, the gross {totalCommissionPercent}% commission pool is ${totalGrossCommission.toLocaleString()}. After splitting 50/50 with cooperating broker ($${sideGrossCommission.toLocaleString()}) and applying your {agentSplitPercent}/{100 - agentSplitPercent} desk split, your net commission check is <strong className="text-slate-800">${agentNetTakeHome.toLocaleString()}</strong>.
        </p>
      </div>
    </div>
  );
};
