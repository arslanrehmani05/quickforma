import React, { useState } from "react";
import { RefreshCw, DollarSign, Calendar, Clock } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const WorkingCapitalCycleCalculator: React.FC = () => {
  const [daysSalesOutstandingDso, setDaysSalesOutstandingDso] = useState<number>(42); // AR collection days
  const [daysInventoryOutstandingDio, setDaysInventoryOutstandingDio] = useState<number>(55); // Inventory days
  const [daysPayableOutstandingDpo, setDaysPayableOutstandingDpo] = useState<number>(38); // AP vendor days

  const handleReset = () => {
    setDaysSalesOutstandingDso(42);
    setDaysInventoryOutstandingDio(55);
    setDaysPayableOutstandingDpo(38);
  };

  // Working Capital / Cash Conversion Cycle (CCC) = DIO + DSO - DPO
  const workingCapitalCycleDays = daysInventoryOutstandingDio + daysSalesOutstandingDso - daysPayableOutstandingDpo;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Operating Working Capital Cycle & Cash Conversion Solver"
        description="Quantify cash conversion cycle days (DIO + DSO - DPO) to identify trapped capital in operational pipelines."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Days Inventory Outstanding (DIO)"
            value={daysInventoryOutstandingDio}
            onChange={(val) => setDaysInventoryOutstandingDio(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="days"
          />
          <InputField
            label="Days Sales Outstanding (DSO)"
            value={daysSalesOutstandingDso}
            onChange={(val) => setDaysSalesOutstandingDso(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="days"
          />
          <InputField
            label="Days Payable Outstanding (DPO)"
            value={daysPayableOutstandingDpo}
            onChange={(val) => setDaysPayableOutstandingDpo(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="days"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Working Capital Cycle"
            value={`${workingCapitalCycleDays.toFixed(1)} days`}
            subtitle={workingCapitalCycleDays <= 45 ? "Efficient working capital" : "Significant capital trapped in cycle"}
            variant="light"
          />
          <ResultCard
            title="Operating Cycle (DIO + DSO)"
            value={`${(daysInventoryOutstandingDio + daysSalesOutstandingDso).toFixed(1)} days`}
            subtitle="Time to turn inventory into cash"
            variant="light"
          />
          <ResultCard
            title="Vendor Financing Buffer (DPO)"
            value={`${daysPayableOutstandingDpo.toFixed(1)} days`}
            subtitle="Grace period before cash outflow"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
