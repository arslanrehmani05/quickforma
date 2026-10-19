import React, { useState } from "react";
import { Trash2, AlertOctagon, TrendingDown, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ScrapRatePercentageCalculator: React.FC = () => {
  const [totalUnitsStarted, setTotalUnitsStarted] = useState<number>(8000);
  const [scrappedUnits, setScrappedUnits] = useState<number>(240);
  const [materialCostPerUnit, setMaterialCostPerUnit] = useState<number>(38.00);
  const [disposalFeePerUnit, setDisposalFeePerUnit] = useState<number>(1.25);

  const handleReset = () => {
    setTotalUnitsStarted(8000);
    setScrappedUnits(240);
    setMaterialCostPerUnit(38.00);
    setDisposalFeePerUnit(1.25);
  };

  const scrapRatePercent = totalUnitsStarted > 0 ? (scrappedUnits / totalUnitsStarted) * 100 : 0;
  const goodUnitsShipped = Math.max(0, totalUnitsStarted - scrappedUnits);
  const directMaterialScrapLoss = scrappedUnits * materialCostPerUnit;
  const totalDisposalFees = scrappedUnits * disposalFeePerUnit;
  const totalScrapFinancialLoss = directMaterialScrapLoss + totalDisposalFees;
  const scrapCostPerGoodUnit = goodUnitsShipped > 0 ? totalScrapFinancialLoss / goodUnitsShipped : 0;

  let qualityTier = "Standard Manufacturing (2% - 4%)";
  if (scrapRatePercent <= 0.5) qualityTier = "Six Sigma Benchmark (< 0.5%)";
  else if (scrapRatePercent > 5.0) qualityTier = "Severe Process Flaw (> 5.0%)";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Material Defect Scrap Rate & Cost Solver"
        description="Calculate production scrap percentages, defective material financial waste, and unit cost burdens."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Total Production Units Started"
            value={totalUnitsStarted}
            onChange={(val) => setTotalUnitsStarted(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Total Scrapped / Discarded Units"
            value={scrappedUnits}
            onChange={(val) => setScrappedUnits(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Raw Material Cost per Unit ($)"
            value={materialCostPerUnit}
            onChange={(val) => setMaterialCostPerUnit(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Waste Disposal / Hazmat Fee per Unit ($)"
            value={disposalFeePerUnit}
            onChange={(val) => setDisposalFeePerUnit(Math.max(0, Number(val) || 0))}
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
          title="Scrap Rate"
          value={`${scrapRatePercent.toFixed(2)}%`}
          subtitle={qualityTier}
          variant="indigo"
        />
        <ResultCard
          title="Total Financial Scrap Loss"
          value={`$${totalScrapFinancialLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Materials + disposal fee"
          variant="light"
        />
        <ResultCard
          title="Scrap Tax per Good Unit"
          value={`+$${scrapCostPerGoodUnit.toFixed(2)}`}
          subtitle="Added burden on survivors"
          variant="light"
        />
        <ResultCard
          title="Good Finished Units"
          value={`${goodUnitsShipped.toLocaleString()}`}
          subtitle={`${(100 - scrapRatePercent).toFixed(2)}% process yield`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Scrap Financial Burden</h4>
        <p className="text-slate-600">
          Scrapping {scrappedUnits} defective units wastes <strong className="text-slate-800">${totalScrapFinancialLoss.toLocaleString()}</strong> in purchased materials. Every good unit shipped carries an invisible penalty of <strong className="text-slate-800">${scrapCostPerGoodUnit.toFixed(2)}</strong> to cover the cost of discarded parts.
        </p>
      </div>
    </div>
  );
};
