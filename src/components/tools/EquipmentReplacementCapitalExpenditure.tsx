import React, { useState } from "react";
import { Wrench, DollarSign, TrendingUp, Cpu } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EquipmentReplacementCapitalExpenditure: React.FC = () => {
  const [newEquipmentCost, setNewEquipmentCost] = useState<number>(185000);
  const [oldEquipmentTradeInValue, setOldEquipmentTradeInValue] = useState<number>(25000);
  const [oldMachineAnnualMaintenance, setOldMachineAnnualMaintenance] = useState<number>(34000);
  const [newMachineAnnualMaintenance, setNewMachineAnnualMaintenance] = useState<number>(8500);
  const [annualEnergyAndLaborSavings, setAnnualEnergyAndLaborSavings] = useState<number>(28000);

  const handleReset = () => {
    setNewEquipmentCost(185000);
    setOldEquipmentTradeInValue(25000);
    setOldMachineAnnualMaintenance(34000);
    setNewMachineAnnualMaintenance(8500);
    setAnnualEnergyAndLaborSavings(28000);
  };

  const netInitialCapEx = Math.max(1, newEquipmentCost - oldEquipmentTradeInValue);
  const annualMaintenanceSavings = Math.max(0, oldMachineAnnualMaintenance - newMachineAnnualMaintenance);
  const totalAnnualOperatingSavings = annualMaintenanceSavings + annualEnergyAndLaborSavings;

  const simplePaybackYears = totalAnnualOperatingSavings > 0 ? netInitialCapEx / totalAnnualOperatingSavings : 0;
  const fiveYearNetSavings = (totalAnnualOperatingSavings * 5) - netInitialCapEx;
  const returnOnCapitalPercent = (totalAnnualOperatingSavings / netInitialCapEx) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Asset Equipment Replacement Timing NPV"
        description="Compute capital expenditure (CapEx) payback periods, maintenance cost reductions, and repair vs replace decisions."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="New Equipment Purchase Price ($)"
            value={newEquipmentCost}
            onChange={(val) => setNewEquipmentCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Old Asset Trade-In / Salvage ($)"
            value={oldEquipmentTradeInValue}
            onChange={(val) => setOldEquipmentTradeInValue(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Old Machine Annual Repair ($)"
            value={oldMachineAnnualMaintenance}
            onChange={(val) => setOldMachineAnnualMaintenance(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="New Machine Annual Service ($)"
            value={newMachineAnnualMaintenance}
            onChange={(val) => setNewMachineAnnualMaintenance(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Annual Labor / Energy Savings ($)"
            value={annualEnergyAndLaborSavings}
            onChange={(val) => setAnnualEnergyAndLaborSavings(Math.max(0, Number(val) || 0))}
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
          title="Simple Payback Period"
          value={`${simplePaybackYears.toFixed(1)} years`}
          subtitle="Time to recover CapEx"
          variant="indigo"
        />
        <ResultCard
          title="Annual Cash Flow Savings"
          value={`+$${totalAnnualOperatingSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
          subtitle="Operating cost reduction"
          variant="light"
        />
        <ResultCard
          title="Net Initial CapEx"
          value={`$${netInitialCapEx.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="After trade-in credit"
          variant="light"
        />
        <ResultCard
          title="5-Year Net Payoff"
          value={`${fiveYearNetSavings >= 0 ? "+" : ""}$${fiveYearNetSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${returnOnCapitalPercent.toFixed(1)}% annual ROCE`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">CapEx Replacement Verdict</h4>
        <p className="text-slate-600">
          Replacing the legacy asset requires <strong className="text-slate-800">${netInitialCapEx.toLocaleString()}</strong> in net capital but eliminates <strong className="text-slate-800">${annualMaintenanceSavings.toLocaleString()}</strong> in repair bills and saves <strong className="text-slate-800">${annualEnergyAndLaborSavings.toLocaleString()}</strong> in efficiency. The investment pays for itself in <strong className="text-slate-800">{simplePaybackYears.toFixed(1)} years</strong> and yields <strong className="text-slate-800">${fiveYearNetSavings.toLocaleString()}</strong> in cumulative 5-year cash gain.
        </p>
      </div>
    </div>
  );
};
