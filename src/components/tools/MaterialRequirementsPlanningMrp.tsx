import React, { useState } from "react";
import { Package, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MaterialRequirementsPlanningMrp: React.FC = () => {
  const [grossRequirements, setGrossRequirements] = useState<number>(2500);
  const [onHandInventory, setOnHandInventory] = useState<number>(650);
  const [scheduledReceipts, setScheduledReceipts] = useState<number>(400);
  const [safetyStockRequired, setSafetyStockRequired] = useState<number>(200);
  const [supplierLeadTimeWeeks, setSupplierLeadTimeWeeks] = useState<number>(3);

  const handleReset = () => {
    setGrossRequirements(2500);
    setOnHandInventory(650);
    setScheduledReceipts(400);
    setSafetyStockRequired(200);
    setSupplierLeadTimeWeeks(3);
  };

  // MRP Logic:
  // Net Requirements = Gross Requirements - On-Hand - Scheduled Receipts + Safety Stock
  const netRequirements = Math.max(0, grossRequirements - onHandInventory - scheduledReceipts + safetyStockRequired);
  const availableInventory = onHandInventory + scheduledReceipts;
  const inventoryDeficit = Math.max(0, grossRequirements - availableInventory);
  const plannedOrderReleaseUnits = netRequirements;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Net Material Requirements & Lead Time Solver"
        description="Compute Material Requirements Planning (MRP) net component deficits, safety buffer rules, and planned order release quantities."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Gross Production Demand (Units)"
            value={grossRequirements}
            onChange={(val) => setGrossRequirements(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Current On-Hand Warehouse Stock"
            value={onHandInventory}
            onChange={(val) => setOnHandInventory(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Scheduled Inbound Receipts (Open POs)"
            value={scheduledReceipts}
            onChange={(val) => setScheduledReceipts(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Required Safety Stock Buffer"
            value={safetyStockRequired}
            onChange={(val) => setSafetyStockRequired(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Supplier Lead Time (Weeks)"
            value={supplierLeadTimeWeeks}
            onChange={(val) => setSupplierLeadTimeWeeks(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="wks"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Net Purchase Requirements"
          value={`${netRequirements.toLocaleString()} units`}
          subtitle="Planned PO quantity"
          variant="indigo"
        />
        <ResultCard
          title="Order Release Timing"
          value={`${supplierLeadTimeWeeks} wks prior`}
          subtitle="To prevent line stockout"
          variant="light"
        />
        <ResultCard
          title="Total Available Stock"
          value={`${availableInventory.toLocaleString()} units`}
          subtitle="On-hand + scheduled"
          variant="light"
        />
        <ResultCard
          title="Stock Coverage Ratio"
          value={`${((availableInventory / (grossRequirements || 1)) * 100).toFixed(1)}%`}
          subtitle={availableInventory >= grossRequirements ? "Fully covered" : "Shortage without new PO"}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Production Scheduling Action</h4>
        <p className="text-slate-600">
          With gross demand of {grossRequirements.toLocaleString()} units and {availableInventory.toLocaleString()} available parts, you must release a purchase order for <strong className="text-slate-800">{netRequirements.toLocaleString()} units</strong> exactly <strong className="text-slate-800">{supplierLeadTimeWeeks} weeks ahead</strong> of the production build date to protect the {safetyStockRequired} unit safety buffer.
        </p>
      </div>
    </div>
  );
};
