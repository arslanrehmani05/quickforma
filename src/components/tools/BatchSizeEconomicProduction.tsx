import React, { useState } from "react";
import { Package, TrendingUp, DollarSign, RefreshCw } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BatchSizeEconomicProduction: React.FC = () => {
  const [annualDemand, setAnnualDemand] = useState<number>(12000);
  const [productionRunRate, setProductionRunRate] = useState<number>(36000); // Annual capacity if run continuously
  const [setupCostPerRun, setSetupCostPerRun] = useState<number>(450);
  const [annualHoldingCostPerUnit, setAnnualHoldingCostPerUnit] = useState<number>(5.50);

  const handleReset = () => {
    setAnnualDemand(12000);
    setProductionRunRate(36000);
    setSetupCostPerRun(450);
    setAnnualHoldingCostPerUnit(5.50);
  };

  // Economic Production Quantity (EPQ / ELS):
  // EPQ = sqrt( (2 * D * S) / (H * (1 - D/P)) )
  const demandToCapacityRatio = productionRunRate > 0 ? annualDemand / productionRunRate : 0;
  const denominator = annualHoldingCostPerUnit * (1 - demandToCapacityRatio);
  const epq = (denominator > 0) ? Math.sqrt((2 * annualDemand * setupCostPerRun) / denominator) : 0;

  const optimalBatchUnits = Math.round(epq);
  const productionRunsPerYear = optimalBatchUnits > 0 ? annualDemand / optimalBatchUnits : 0;
  const annualSetupCosts = productionRunsPerYear * setupCostPerRun;
  const maxInventoryLevel = optimalBatchUnits * (1 - demandToCapacityRatio);
  const annualHoldingCosts = (maxInventoryLevel / 2) * annualHoldingCostPerUnit;
  const totalAnnualCost = annualSetupCosts + annualHoldingCosts;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Economic Production Quantity (EPQ) Solver"
        description="Compute optimal manufacturing lot sizes, machine setup costs, and finished goods inventory holding tradeoffs."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Annual Customer Demand (Units/Year)"
            value={annualDemand}
            onChange={(val) => setAnnualDemand(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Annual Production Run Capacity (Units/Year)"
            value={productionRunRate}
            onChange={(val) => setProductionRunRate(Math.max(annualDemand + 1, Number(val) || 0))}
            type="number"
            min={annualDemand + 1}
          />
          <InputField
            label="Machine Setup / Changeover Cost ($/run)"
            value={setupCostPerRun}
            onChange={(val) => setSetupCostPerRun(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Annual Holding Cost per Unit ($/unit/year)"
            value={annualHoldingCostPerUnit}
            onChange={(val) => setAnnualHoldingCostPerUnit(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Optimal Batch Size (EPQ)"
          value={`${optimalBatchUnits.toLocaleString()} units`}
          subtitle="Min-cost production lot"
          variant="indigo"
        />
        <ResultCard
          title="Annual Setup & Holding Cost"
          value={`$${totalAnnualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Combined minimum cost"
          variant="light"
        />
        <ResultCard
          title="Runs Per Year"
          value={`${productionRunsPerYear.toFixed(1)} runs`}
          subtitle={`Every ${(365 / (productionRunsPerYear || 1)).toFixed(0)} days`}
          variant="light"
        />
        <ResultCard
          title="Max Warehouse Stock"
          value={`${Math.round(maxInventoryLevel).toLocaleString()} units`}
          subtitle="Peak inventory level"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Production Lot Feasibility</h4>
        <p className="text-slate-600">
          Producing in runs of <strong className="text-slate-800">{optimalBatchUnits.toLocaleString()} units</strong> perfectly balances setup changeovers ($${annualSetupCosts.toLocaleString()}/yr) with warehouse carrying costs ($${annualHoldingCosts.toLocaleString()}/yr), saving money compared to smaller or larger lot sizes.
        </p>
      </div>
    </div>
  );
};
