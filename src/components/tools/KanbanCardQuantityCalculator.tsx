import React, { useState } from "react";
import { Layers, RefreshCw, Box, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const KanbanCardQuantityCalculator: React.FC = () => {
  const [dailyDemandUnits, setDailyDemandUnits] = useState<number>(180);
  const [replenishmentLeadTimeDays, setReplenishmentLeadTimeDays] = useState<number>(3.5);
  const [safetyStockPercent, setSafetyStockPercent] = useState<number>(20);
  const [containerCapacity, setContainerCapacity] = useState<number>(50);

  const handleReset = () => {
    setDailyDemandUnits(180);
    setReplenishmentLeadTimeDays(3.5);
    setSafetyStockPercent(20);
    setContainerCapacity(50);
  };

  // Kanban Formula:
  // K = [D * L * (1 + S%)] / C
  // K = Number of Kanban Cards / Containers
  // D = Daily Demand
  // L = Lead Time (days)
  // S = Safety Factor (%)
  // C = Container Capacity
  const leadTimeDemand = dailyDemandUnits * replenishmentLeadTimeDays;
  const safetyStockUnits = leadTimeDemand * (safetyStockPercent / 100);
  const totalWipRequired = leadTimeDemand + safetyStockUnits;
  const kanbanCardsDecimal = containerCapacity > 0 ? totalWipRequired / containerCapacity : 0;
  const recommendedCards = Math.ceil(kanbanCardsDecimal);
  const totalCircuitCapacity = recommendedCards * containerCapacity;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Kanban Container & Safety Card Quantity Solver"
        description="Compute Toyota Production System Kanban card quantities, bin sizes, and pull-system buffer inventories."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Average Daily Demand (units/day)"
            value={dailyDemandUnits}
            onChange={(val) => setDailyDemandUnits(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Replenishment Lead Time (Days)"
            value={replenishmentLeadTimeDays}
            onChange={(val) => setReplenishmentLeadTimeDays(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            step={0.1}
            suffix="days"
          />
          <InputField
            label="Safety Stock Buffer Factor (%)"
            value={safetyStockPercent}
            onChange={(val) => setSafetyStockPercent(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
          <InputField
            label="Units Per Container / Bin (Capacity)"
            value={containerCapacity}
            onChange={(val) => setContainerCapacity(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Recommended Cards / Bins"
          value={`${recommendedCards} cards`}
          subtitle={`${kanbanCardsDecimal.toFixed(2)} exact formula`}
          variant="indigo"
        />
        <ResultCard
          title="Total WIP In Circuit"
          value={`${totalCircuitCapacity.toLocaleString()} units`}
          subtitle={`${recommendedCards} bins x ${containerCapacity} units`}
          variant="light"
        />
        <ResultCard
          title="Lead Time Demand"
          value={`${Math.round(leadTimeDemand).toLocaleString()} units`}
          subtitle="Consumed during lead time"
          variant="light"
        />
        <ResultCard
          title="Safety Buffer Stock"
          value={`${Math.round(safetyStockUnits).toLocaleString()} units`}
          subtitle={`${safetyStockPercent}% variability cushion`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Lean Shop-Floor Implementation</h4>
        <p className="text-slate-600">
          Circulate exactly <strong className="text-slate-800">{recommendedCards} Kanban cards</strong>. Whenever a bin of {containerCapacity} units is consumed at the assembly line, its card returns to the feeder station as an authorized signal to produce or pick the next replenishment bin.
        </p>
      </div>
    </div>
  );
};
