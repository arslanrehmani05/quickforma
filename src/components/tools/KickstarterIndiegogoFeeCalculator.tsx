import React, { useState } from "react";
import { Sparkles, DollarSign, PieChart, Users } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const KickstarterIndiegogoFeeCalculator: React.FC = () => {
  const [platform, setPlatform] = useState<string>("kickstarter");
  const [fundsRaised, setFundsRaised] = useState<number>(65000);
  const [backerCount, setBackerCount] = useState<number>(750);
  const [estimatedCosts, setEstimatedCosts] = useState<number>(32000);

  const handleReset = () => {
    setPlatform("kickstarter");
    setFundsRaised(65000);
    setBackerCount(750);
    setEstimatedCosts(32000);
  };

  // Kickstarter: 5% platform + Stripe (3% + $0.20 per pledge)
  // Indiegogo: 5% platform + Stripe (3% + $0.30 per pledge)
  const platformFee = fundsRaised * 0.05;
  const paymentFixedFee = platform === "kickstarter" ? 0.20 : 0.30;
  const paymentPctFee = fundsRaised * 0.03;
  const totalPaymentProcessing = paymentPctFee + (backerCount * paymentFixedFee);

  const totalDeductions = platformFee + totalPaymentProcessing;
  const netRaised = Math.max(0, fundsRaised - totalDeductions);
  const netProfit = Math.max(0, netRaised - estimatedCosts);
  const effectiveDeductionRate = fundsRaised > 0 ? (totalDeductions / fundsRaised) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Crowdfunding Platform Commission & Profit"
        description="Calculate Kickstarter & Indiegogo platform commissions, payment processing charges, and net campaign take-home."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Crowdfunding Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          >
            <option value="kickstarter">Kickstarter (5% platform + 3% + $0.20 Stripe)</option>
            <option value="indiegogo">Indiegogo (5% platform + 3% + $0.30 Stripe)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Total Pledges Raised ($)"
            value={fundsRaised}
            onChange={(val) => setFundsRaised(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Total Backer Count"
            value={backerCount}
            onChange={(val) => setBackerCount(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Fulfillment & Production Costs ($)"
            value={estimatedCosts}
            onChange={(val) => setEstimatedCosts(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Net Funds Payout"
          value={`$${netRaised.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Deposited after fees"
          variant="indigo"
        />
        <ResultCard
          title="Total Platform Fees"
          value={`$${totalDeductions.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${effectiveDeductionRate.toFixed(2)}% total take`}
          variant="light"
        />
        <ResultCard
          title="Platform Commission"
          value={`$${platformFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="5.0% platform fee"
          variant="light"
        />
        <ResultCard
          title="Net Project Profit"
          value={`$${netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="After all manufacturing"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Fee Structure Breakdown</h4>
        <p className="text-slate-600">
          Payment processing takes approximately <strong className="text-slate-800">${totalPaymentProcessing.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> (3% + ${paymentFixedFee}/backer) on top of the 5% platform cut of <strong className="text-slate-800">${platformFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>. Expect ~8.3% total leakage before manufacturing costs.
        </p>
      </div>
    </div>
  );
};
