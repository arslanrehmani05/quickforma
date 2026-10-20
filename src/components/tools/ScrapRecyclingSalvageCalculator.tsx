import React, { useState } from "react";
import { RefreshCw, DollarSign, Scale, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ScrapRecyclingSalvageCalculator: React.FC = () => {
  const [scrapWeightLbs, setScrapWeightLbs] = useState<number>(4500);
  const [scrapPricePerLb, setScrapPricePerLb] = useState<number>(0.85); // e.g. Clean aluminum trimmings
  const [virginMaterialCostPerLb, setVirginMaterialCostPerLb] = useState<number>(2.40);
  const [haulingAndBinFee, setHaulingAndBinFee] = useState<number>(250);

  const handleReset = () => {
    setScrapWeightLbs(4500);
    setScrapPricePerLb(0.85);
    setVirginMaterialCostPerLb(2.40);
    setHaulingAndBinFee(250);
  };

  const grossSalvageRevenue = scrapWeightLbs * scrapPricePerLb;
  const netSalvageRevenue = Math.max(0, grossSalvageRevenue - haulingAndBinFee);
  const originalPurchaseValue = scrapWeightLbs * virginMaterialCostPerLb;
  const materialCostRecoveryPercent = originalPurchaseValue > 0 ? (netSalvageRevenue / originalPurchaseValue) * 100 : 0;
  const netValuePerLb = scrapWeightLbs > 0 ? netSalvageRevenue / scrapWeightLbs : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Plant Floor Scrap Recovery & Recycling Value"
        description="Compute manufacturing scrap metal and polymer recycling salvage values, net cash recoveries, and hauling deductions."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Scrap Material Generated (lbs)"
            value={scrapWeightLbs}
            onChange={(val) => setScrapWeightLbs(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="lbs"
          />
          <InputField
            label="Recycler Buyback Rate ($/lb)"
            value={scrapPricePerLb}
            onChange={(val) => setScrapPricePerLb(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Virgin Raw Material Cost ($/lb)"
            value={virginMaterialCostPerLb}
            onChange={(val) => setVirginMaterialCostPerLb(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Recycler Hauling & Container Fee ($)"
            value={haulingAndBinFee}
            onChange={(val) => setHaulingAndBinFee(Math.max(0, Number(val) || 0))}
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
          title="Net Cash Recovered"
          value={`$${netSalvageRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="After logistics hauling fee"
          variant="indigo"
        />
        <ResultCard
          title="Material Cost Recouped"
          value={`${materialCostRecoveryPercent.toFixed(1)}%`}
          subtitle="Of original virgin spend"
          variant="light"
        />
        <ResultCard
          title="Effective Rate / lb"
          value={`$${netValuePerLb.toFixed(3)}/lb`}
          subtitle="Net realized price"
          variant="light"
        />
        <ResultCard
          title="Virgin Material Loss"
          value={`-$${(originalPurchaseValue - netSalvageRevenue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Unrecovered material deficit"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Scrap Monetization Summary</h4>
        <p className="text-slate-600">
          Recycling {scrapWeightLbs.toLocaleString()} lbs of offcuts converts waste into <strong className="text-slate-800">${netSalvageRevenue.toLocaleString()} in liquid cash</strong>, recouping <strong className="text-slate-800">{materialCostRecoveryPercent.toFixed(1)}%</strong> of your original ${originalPurchaseValue.toLocaleString()} raw material expenditure.
        </p>
      </div>
    </div>
  );
};
