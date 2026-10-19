import React, { useState } from "react";
import { TrendingUp, DollarSign, PackageCheck, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SupplierVolumeDiscountBreakEven: React.FC = () => {
  const [standardPrice, setStandardPrice] = useState<number>(25.00);
  const [standardMoq, setStandardMoq] = useState<number>(500);
  const [discountedPrice, setDiscountedPrice] = useState<number>(21.50);
  const [discountMoq, setDiscountMoq] = useState<number>(2000);
  const [annualHoldingCostPercent, setAnnualHoldingCostPercent] = useState<number>(22);
  const [annualDemandUnits, setAnnualDemandUnits] = useState<number>(4000);

  const handleReset = () => {
    setStandardPrice(25.00);
    setStandardMoq(500);
    setDiscountedPrice(21.50);
    setDiscountMoq(2000);
    setAnnualHoldingCostPercent(22);
    setAnnualDemandUnits(4000);
  };

  const annualPurchaseStandard = annualDemandUnits * standardPrice;
  const annualPurchaseDiscounted = annualDemandUnits * discountedPrice;
  const annualPurchaseSavings = annualPurchaseStandard - annualPurchaseDiscounted;

  // Average inventory holding cost difference = (Qty / 2) * Price * Holding%
  const avgHoldingStandard = (standardMoq / 2) * standardPrice * (annualHoldingCostPercent / 100);
  const avgHoldingDiscounted = (discountMoq / 2) * discountedPrice * (annualHoldingCostPercent / 100);
  const incrementalHoldingCost = avgHoldingDiscounted - avgHoldingStandard;

  const netAnnualSavings = annualPurchaseSavings - incrementalHoldingCost;
  const extraCapitalRequired = (discountMoq * discountedPrice) - (standardMoq * standardPrice);
  const roiOnExtraCapital = extraCapitalRequired > 0 ? (netAnnualSavings / extraCapitalRequired) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="MoQ Supplier Tiered Discount ROI Solver"
        description="Evaluate supplier bulk volume discounts against inventory carrying costs and working capital commitments."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Standard Price per Unit ($)"
            value={standardPrice}
            onChange={(val) => setStandardPrice(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            prefix="$"
          />
          <InputField
            label="Standard Order Quantity (Units)"
            value={standardMoq}
            onChange={(val) => setStandardMoq(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Tier Discount Price per Unit ($)"
            value={discountedPrice}
            onChange={(val) => setDiscountedPrice(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            prefix="$"
          />
          <InputField
            label="Bulk Tier Quantity (MoQ Units)"
            value={discountMoq}
            onChange={(val) => setDiscountMoq(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Annual Demand (Units / Year)"
            value={annualDemandUnits}
            onChange={(val) => setAnnualDemandUnits(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Annual Inventory Holding Cost (%)"
            value={annualHoldingCostPercent}
            onChange={(val) => setAnnualHoldingCostPercent(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Net Annual Savings"
          value={`$${netAnnualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={netAnnualSavings >= 0 ? "Profitable bulk discount" : "Holding costs exceed savings"}
          variant="indigo"
        />
        <ResultCard
          title="Gross Purchase Savings"
          value={`$${annualPurchaseSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`$${(standardPrice - discountedPrice).toFixed(2)} unit discount`}
          variant="light"
        />
        <ResultCard
          title="Extra Holding Cost"
          value={`-$${incrementalHoldingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${annualHoldingCostPercent}% carrying rate`}
          variant="light"
        />
        <ResultCard
          title="ROI on Extra Capital"
          value={`${roiOnExtraCapital.toFixed(1)}%`}
          subtitle={`On $${extraCapitalRequired.toLocaleString()} capital`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Purchasing Feasibility Verdict</h4>
        <p className="text-slate-600">
          {netAnnualSavings > 0
            ? `Taking the supplier's volume discount yields an extra $${netAnnualSavings.toLocaleString()} in net profit per year after factoring in insurance, storage, and financing costs. It delivers a ${roiOnExtraCapital.toFixed(1)}% return on the incremental $${extraCapitalRequired.toLocaleString()} invested.`
            : `Caution: Although unit price drops by $${(standardPrice - discountedPrice).toFixed(2)}, the added inventory holding cost of $${incrementalHoldingCost.toLocaleString()} erodes your savings. Stick with the standard order size of ${standardMoq} units.`}
        </p>
      </div>
    </div>
  );
};
