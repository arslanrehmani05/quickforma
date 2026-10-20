import React, { useState } from "react";
import { Layers, ShieldCheck, DollarSign, Package } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SparePartsInventorySafetyStock: React.FC = () => {
  const [monthlyUsageParts, setMonthlyUsageParts] = useState<number>(15);
  const [leadTimeMonths, setLeadTimeMonths] = useState<number>(2.0);
  const [leadTimeStdDev, setLeadTimeStdDev] = useState<number>(0.6); // Variability in delivery
  const [unitCost, setUnitCost] = useState<number>(280.00);
  const [serviceLevelZ, setServiceLevelZ] = useState<number>(2.33); // 99% = 2.33, 95% = 1.65, 90% = 1.28

  const handleReset = () => {
    setMonthlyUsageParts(15);
    setLeadTimeMonths(2.0);
    setLeadTimeStdDev(0.6);
    setUnitCost(280.00);
    setServiceLevelZ(2.33);
  };

  const leadTimeDemand = monthlyUsageParts * leadTimeMonths;
  // Safety stock formula: SS = Z * sqrt( (LT * sigma_d^2) + (d^2 * sigma_LT^2) )
  // Simplified for MRO lead time uncertainty: SS = Z * monthlyUsage * sigma_LT
  const safetyStockParts = Math.ceil(serviceLevelZ * monthlyUsageParts * leadTimeStdDev);
  const reorderPoint = Math.ceil(leadTimeDemand + safetyStockParts);
  const safetyStockCapitalTiedUp = safetyStockParts * unitCost;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Critical MRO Spare Parts Safety Stock Solver"
        description="Compute critical machine spare parts safety buffers, Reorder Points (ROP), and MRO inventory holding capital."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Criticality Service Level Target</label>
          <select
            value={serviceLevelZ}
            onChange={(e) => setServiceLevelZ(Number(e.target.value))}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          >
            <option value={2.33}>99.0% Critical Component (Z = 2.33) — Line-Stop Risk</option>
            <option value={2.05}>98.0% High Importance (Z = 2.05)</option>
            <option value={1.65}>95.0% Standard Spare Part (Z = 1.65)</option>
            <option value={1.28}>90.0% Non-Critical MRO (Z = 1.28)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <InputField
            label="Monthly Part Consumption"
            value={monthlyUsageParts}
            onChange={(val) => setMonthlyUsageParts(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Supplier Lead Time (Months)"
            value={leadTimeMonths}
            onChange={(val) => setLeadTimeMonths(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            step={0.1}
          />
          <InputField
            label="Lead Time Std Deviation (Months)"
            value={leadTimeStdDev}
            onChange={(val) => setLeadTimeStdDev(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            step={0.1}
          />
          <InputField
            label="Spare Part Unit Cost ($)"
            value={unitCost}
            onChange={(val) => setUnitCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Recommended Safety Stock"
          value={`${safetyStockParts} units`}
          subtitle="Buffer against lead time surge"
          variant="indigo"
        />
        <ResultCard
          title="Reorder Point (ROP)"
          value={`${reorderPoint} units`}
          subtitle="Trigger new purchase order"
          variant="light"
        />
        <ResultCard
          title="Capital Committed"
          value={`$${safetyStockCapitalTiedUp.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="MRO safety investment"
          variant="light"
        />
        <ResultCard
          title="Lead Time Demand"
          value={`${Math.round(leadTimeDemand)} units`}
          subtitle="Normal consumption during wait"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">MRO Inventory Rule</h4>
        <p className="text-slate-600">
          When inventory drops to <strong className="text-slate-800">{reorderPoint} units</strong>, trigger a replenishment order. This guarantees the machine will not suffer catastrophic line downtime during the {leadTimeMonths}-month supplier procurement cycle.
        </p>
      </div>
    </div>
  );
};
