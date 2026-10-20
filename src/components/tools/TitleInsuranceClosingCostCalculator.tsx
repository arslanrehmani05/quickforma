import React, { useState } from "react";
import { ShieldCheck, DollarSign, FileText, Landmark } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TitleInsuranceClosingCostCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(375000);
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [ownersRatePerThousand, setOwnersRatePerThousand] = useState<number>(5.25); // ~$5.25 per $1,000
  const [lendersSimultaneousRate, setLendersSimultaneousRate] = useState<number>(175); // Simultaneous issue discount
  const [settlementClosingFee, setSettlementClosingFee] = useState<number>(650);
  const [titleSearchAndExamFee, setTitleSearchAndExamFee] = useState<number>(350);

  const handleReset = () => {
    setPurchasePrice(375000);
    setLoanAmount(300000);
    setOwnersRatePerThousand(5.25);
    setLendersSimultaneousRate(175);
    setSettlementClosingFee(650);
    setTitleSearchAndExamFee(350);
  };

  const ownersPolicyPremium = (purchasePrice / 1000) * ownersRatePerThousand;
  const totalTitleAndEscrowCost = ownersPolicyPremium + lendersSimultaneousRate + settlementClosingFee + titleSearchAndExamFee;
  const closingCostRatioPercent = purchasePrice > 0 ? (totalTitleAndEscrowCost / purchasePrice) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Buyer & Seller Closing Cost Breakdown"
        description="Compute owner's and lender's title insurance policies, simultaneous issue discounts, and escrow settlement closing fees."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Property Purchase Price ($)"
            value={purchasePrice}
            onChange={(val) => setPurchasePrice(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Mortgage Loan Amount ($)"
            value={loanAmount}
            onChange={(val) => setLoanAmount(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Owner's Policy Rate ($/$1,000)"
            value={ownersRatePerThousand}
            onChange={(val) => setOwnersRatePerThousand(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            step={0.25}
            prefix="$"
          />
          <InputField
            label="Lender's Simultaneous Issue Fee ($)"
            value={lendersSimultaneousRate}
            onChange={(val) => setLendersSimultaneousRate(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Escrow & Settlement Closing Fee ($)"
            value={settlementClosingFee}
            onChange={(val) => setSettlementClosingFee(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Title Search & Abstract Examination ($)"
            value={titleSearchAndExamFee}
            onChange={(val) => setTitleSearchAndExamFee(Math.max(0, Number(val) || 0))}
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
          title="Total Title & Escrow Costs"
          value={`$${totalTitleAndEscrowCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${closingCostRatioPercent.toFixed(2)}% of purchase price`}
          variant="indigo"
        />
        <ResultCard
          title="Owner's Policy Premium"
          value={`$${ownersPolicyPremium.toFixed(2)}`}
          subtitle="One-time policy for buyer"
          variant="light"
        />
        <ResultCard
          title="Lender's Policy (Discounted)"
          value={`$${lendersSimultaneousRate.toFixed(2)}`}
          subtitle="Simultaneous issue savings"
          variant="light"
        />
        <ResultCard
          title="Search & Settlement"
          value={`$${(settlementClosingFee + titleSearchAndExamFee).toFixed(2)}`}
          subtitle="Escrow attorney fees"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Closing Settlement Overview</h4>
        <p className="text-slate-600">
          Total title and settlement fees amount to <strong className="text-slate-800">${totalTitleAndEscrowCost.toLocaleString()}</strong>. Purchasing the Owner's Policy simultaneously with the Lender's Policy saves approximately $800 in standalone reissue premiums while shielding the property title against unrecorded liens and boundary disputes.
        </p>
      </div>
    </div>
  );
};
