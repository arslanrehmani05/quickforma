import React, { useState } from "react";
import { DollarSign, Landmark, Tag, CheckCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SellerNetSheetCalculator: React.FC = () => {
  const [salePrice, setSalePrice] = useState<number>(460000);
  const [existingMortgageBalance, setExistingMortgageBalance] = useState<number>(235000);
  const [brokerCommissionPercent, setBrokerCommissionPercent] = useState<number>(5.5);
  const [sellerClosingFees, setSellerClosingFees] = useState<number>(3500); // Escrow, transfer taxes, recording
  const [buyerConcessionsRepairs, setBuyerConcessionsRepairs] = useState<number>(4000);

  const handleReset = () => {
    setSalePrice(460000);
    setExistingMortgageBalance(235000);
    setBrokerCommissionPercent(5.5);
    setSellerClosingFees(3500);
    setBuyerConcessionsRepairs(4000);
  };

  const commissionCost = salePrice * (brokerCommissionPercent / 100);
  const totalDeductions = existingMortgageBalance + commissionCost + sellerClosingFees + buyerConcessionsRepairs;
  const netProceedsAtClosing = salePrice - totalDeductions;
  const netProceedsPercent = salePrice > 0 ? (netProceedsAtClosing / salePrice) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Real Estate Home Seller Net Proceeds Solver"
        description="Compute estimated home seller net cash proceeds at closing after mortgage payoff, broker commissions, and transfer taxes."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Agreed Contract Sale Price ($)"
            value={salePrice}
            onChange={(val) => setSalePrice(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Existing Mortgage Payoff Balance ($)"
            value={existingMortgageBalance}
            onChange={(val) => setExistingMortgageBalance(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Total Realtor Broker Commission (%)"
            value={brokerCommissionPercent}
            onChange={(val) => setBrokerCommissionPercent(Math.min(10, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={10}
            step={0.25}
            suffix="%"
          />
          <InputField
            label="Title, Escrow & Transfer Taxes ($)"
            value={sellerClosingFees}
            onChange={(val) => setSellerClosingFees(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Buyer Concessions / Repair Credits ($)"
            value={buyerConcessionsRepairs}
            onChange={(val) => setBuyerConcessionsRepairs(Math.max(0, Number(val) || 0))}
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
          title="Net Wire at Closing"
          value={`$${netProceedsAtClosing.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Estimated check to seller"
          variant="indigo"
        />
        <ResultCard
          title="Total Closing Deductions"
          value={`-$${totalDeductions.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Mortgage + commissions + fees"
          variant="light"
        />
        <ResultCard
          title="Broker Commission"
          value={`$${commissionCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${brokerCommissionPercent}% total brokerage fee`}
          variant="light"
        />
        <ResultCard
          title="Net Proceeds Margin"
          value={`${netProceedsPercent.toFixed(1)}%`}
          subtitle="Of gross sale price"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Seller Equity Payout</h4>
        <p className="text-slate-600">
          From a gross contract price of ${salePrice.toLocaleString()}, settling your ${existingMortgageBalance.toLocaleString()} loan and paying ${commissionCost.toLocaleString()} in agent fees leaves an estimated <strong className="text-slate-800">${netProceedsAtClosing.toLocaleString()} wired to your bank account</strong> at title escrow closing.
        </p>
      </div>
    </div>
  );
};
