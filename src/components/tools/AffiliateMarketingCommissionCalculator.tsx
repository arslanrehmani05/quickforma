import React, { useState } from "react";
import { Percent, DollarSign, ShoppingCart, Award } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AffiliateMarketingCommissionCalculator: React.FC = () => {
  const [monthlyReferredSales, setMonthlyReferredSales] = useState<number>(45000);
  const [affiliateCommissionRate, setAffiliateCommissionRate] = useState<number>(15); // 15%
  const [networkSaaSPlatformFee, setNetworkSaaSPlatformFee] = useState<number>(2.5); // 2.5% network fee
  const [productGrossMarginPercent, setProductGrossMarginPercent] = useState<number>(65); // 65%

  const handleReset = () => {
    setMonthlyReferredSales(45000);
    setAffiliateCommissionRate(15);
    setNetworkSaaSPlatformFee(2.5);
    setProductGrossMarginPercent(65);
  };

  const affiliatePayout = monthlyReferredSales * (affiliateCommissionRate / 100);
  const networkFeeCost = monthlyReferredSales * (networkSaaSPlatformFee / 100);
  const totalAffiliateProgramCost = affiliatePayout + networkFeeCost;
  const grossProfitOnSales = monthlyReferredSales * (productGrossMarginPercent / 100);
  const netContributionMargin = grossProfitOnSales - totalAffiliateProgramCost;
  const programNetProfitMargin = monthlyReferredSales > 0 ? (netContributionMargin / monthlyReferredSales) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Affiliate Program Commission & Net Margin Solver"
        description="Calculate affiliate partner payouts, tracking platform fees, and net contribution margin on partner-driven sales."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Affiliate Gross Sales ($)"
            value={monthlyReferredSales}
            onChange={(val) => setMonthlyReferredSales(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Commission Tier Rate (%)"
            value={affiliateCommissionRate}
            onChange={(val) => setAffiliateCommissionRate(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Network / Tracking Fee (%)"
            value={networkSaaSPlatformFee}
            onChange={(val) => setNetworkSaaSPlatformFee(Math.min(25, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            suffix="%"
          />
          <InputField
            label="Product Gross Margin (%)"
            value={productGrossMarginPercent}
            onChange={(val) => setProductGrossMarginPercent(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Affiliate Payout"
            value={`$${affiliatePayout.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Partner payout obligations"
            variant="light"
          />
          <ResultCard
            title="Total Acquisition Cost"
            value={`$${totalAffiliateProgramCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Commissions + platform network fee"
            variant="light"
          />
          <ResultCard
            title="Net Business Profit"
            value={`$${netContributionMargin.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Net profit after program costs"
            variant="indigo"
          />
          <ResultCard
            title="Program Net Margin"
            value={`${programNetProfitMargin.toFixed(1)}%`}
            subtitle="Net margin on referred orders"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
