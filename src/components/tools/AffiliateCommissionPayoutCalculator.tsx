import React, { useState } from "react";
import { Share2, DollarSign, Users, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AffiliateCommissionPayoutCalculator: React.FC = () => {
  const [affiliateSales, setAffiliateSales] = useState<number>(38000);
  const [commissionRate, setCommissionRate] = useState<number>(15);
  const [networkOverridePercent, setNetworkOverridePercent] = useState<number>(20); // e.g. ShareASale/CJ 20% of commission
  const [returnCancellationRate, setReturnCancellationRate] = useState<number>(5);

  const handleReset = () => {
    setAffiliateSales(38000);
    setCommissionRate(15);
    setNetworkOverridePercent(20);
    setReturnCancellationRate(5);
  };

  const netQualifiedSales = affiliateSales * (1 - returnCancellationRate / 100);
  const baseCommission = netQualifiedSales * (commissionRate / 100);
  const networkFee = baseCommission * (networkOverridePercent / 100);
  const totalAffiliateExpense = baseCommission + networkFee;
  const netRevenueAfterAffiliates = netQualifiedSales - totalAffiliateExpense;
  const affiliateRoas = totalAffiliateExpense > 0 ? netQualifiedSales / totalAffiliateExpense : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Affiliate Marketing Program Margin Solver"
        description="Compute publisher affiliate commissions, network overrides, return deductions, and blended partner ROAS."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Affiliate-Tracked Gross Revenue ($)"
            value={affiliateSales}
            onChange={(val) => setAffiliateSales(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Affiliate Commission Rate (%)"
            value={commissionRate}
            onChange={(val) => setCommissionRate(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Network Fee Override (% of Commission)"
            value={networkOverridePercent}
            onChange={(val) => setNetworkOverridePercent(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
          <InputField
            label="Return / Cancellation Rate (%)"
            value={returnCancellationRate}
            onChange={(val) => setReturnCancellationRate(Math.min(50, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={50}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Total Program Expense"
          value={`$${totalAffiliateExpense.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Commissions + platform"
          variant="indigo"
        />
        <ResultCard
          title="Affiliate Program ROAS"
          value={`${affiliateRoas.toFixed(2)}x`}
          subtitle="Revenue / Program Spend"
          variant="light"
        />
        <ResultCard
          title="Publisher Payouts"
          value={`$${baseCommission.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Net commissions paid"
          variant="light"
        />
        <ResultCard
          title="SaaS / Network Fee"
          value={`$${networkFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Network platform cut"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Affiliate Channel Efficiency</h4>
        <p className="text-slate-600">
          At an affiliate ROAS of <strong className="text-slate-800">{affiliateRoas.toFixed(2)}x</strong>, you pay <strong className="text-slate-800">{((totalAffiliateExpense / (netQualifiedSales || 1)) * 100).toFixed(1)}%</strong> of net revenue strictly on performance-based compensation without upfront ad spend risk.
        </p>
      </div>
    </div>
  );
};
