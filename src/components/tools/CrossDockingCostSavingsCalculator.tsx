import React, { useState } from "react";
import { ArrowRightLeft, DollarSign, TrendingDown, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CrossDockingCostSavingsCalculator: React.FC = () => {
  const [annualPallets, setAnnualPallets] = useState<number>(14000);
  const [traditionalPutawayCost, setTraditionalPutawayCost] = useState<number>(12.50); // Putaway + pick retrieval
  const [traditionalStorageCost, setTraditionalStorageCost] = useState<number>(18.00); // 1 month average storage rent
  const [crossDockFeePerPallet, setCrossDockFeePerPallet] = useState<number>(7.00); // Fast inbound to outbound transfer
  const [transitDaysSaved, setTransitDaysSaved] = useState<number>(4);

  const handleReset = () => {
    setAnnualPallets(14000);
    setTraditionalPutawayCost(12.50);
    setTraditionalStorageCost(18.00);
    setCrossDockFeePerPallet(7.00);
    setTransitDaysSaved(4);
  };

  const traditionalCostPerPallet = traditionalPutawayCost + traditionalStorageCost;
  const traditionalTotalAnnual = annualPallets * traditionalCostPerPallet;
  const crossDockTotalAnnual = annualPallets * crossDockFeePerPallet;
  const netAnnualSavings = traditionalTotalAnnual - crossDockTotalAnnual;
  const savingsPercent = traditionalTotalAnnual > 0 ? (netAnnualSavings / traditionalTotalAnnual) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Direct Transshipment vs Storage Cost"
        description="Compute logistics cross-docking financial savings, eliminated pallet storage fees, and transit velocity gains."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Annual Pallets Transshipped"
            value={annualPallets}
            onChange={(val) => setAnnualPallets(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Traditional Putaway & Picking Fee ($/pallet)"
            value={traditionalPutawayCost}
            onChange={(val) => setTraditionalPutawayCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Average Warehousing Storage Rent ($/pallet)"
            value={traditionalStorageCost}
            onChange={(val) => setTraditionalStorageCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Cross-Dock Rapid Transfer Fee ($/pallet)"
            value={crossDockFeePerPallet}
            onChange={(val) => setCrossDockFeePerPallet(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Transit Lead Time Days Saved"
            value={transitDaysSaved}
            onChange={(val) => setTransitDaysSaved(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="days"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Net Annual Logistics Savings"
          value={`$${netAnnualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${savingsPercent.toFixed(0)}% cost reduction`}
          variant="indigo"
        />
        <ResultCard
          title="Savings per Pallet"
          value={`$${(traditionalCostPerPallet - crossDockFeePerPallet).toFixed(2)}`}
          subtitle="Direct transfer dividend"
          variant="light"
        />
        <ResultCard
          title="Traditional Total Cost"
          value={`$${traditionalTotalAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
          subtitle={`$${traditionalCostPerPallet.toFixed(2)} blended`}
          variant="light"
        />
        <ResultCard
          title="Cross-Dock Total Cost"
          value={`$${crossDockTotalAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
          subtitle={`$${crossDockFeePerPallet.toFixed(2)} blended`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Supply Chain Velocity Dividend</h4>
        <p className="text-slate-600">
          Transferring incoming freight directly from receiving to shipping docks eliminates putaway and racking rent, saving <strong className="text-slate-800">${netAnnualSavings.toLocaleString()} annually</strong> while speeding delivery to retail stores by <strong className="text-slate-800">{transitDaysSaved} full days</strong>.
        </p>
      </div>
    </div>
  );
};
