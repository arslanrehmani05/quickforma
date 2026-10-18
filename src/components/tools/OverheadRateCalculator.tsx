import React, { useState } from "react";
import { Factory, DollarSign, Calculator, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const OverheadRateCalculator: React.FC = () => {
  const [totalIndirectOverhead, setTotalIndirectOverhead] = useState<number>(240000);
  const [directLaborHours, setDirectLaborHours] = useState<number>(8000);
  const [machineHours, setMachineHours] = useState<number>(4000);
  const [directLaborCost, setDirectLaborCost] = useState<number>(180000);

  const ratePerLaborHour = directLaborHours > 0 ? (totalIndirectOverhead || 0) / directLaborHours : 0;
  const ratePerMachineHour = machineHours > 0 ? (totalIndirectOverhead || 0) / machineHours : 0;
  const percentageOfLaborCost = directLaborCost > 0 ? ((totalIndirectOverhead || 0) / directLaborCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Factory}
            title="Predetermined Manufacturing Overhead Rate Solver"
            description="Allocate factory indirect costs across direct labor hours, machine hours, and direct labor costs."
          />
          <ResetButton onReset={() => {
            setTotalIndirectOverhead(240000);
            setDirectLaborHours(8000);
            setMachineHours(4000);
            setDirectLaborCost(180000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Total Indirect Overhead Expenses ($)" type="number" prefix="$" value={totalIndirectOverhead} onChange={(e) => setTotalIndirectOverhead(Number(e.target.value))} helpText="Plant rent, utilities, indirect labor, depreciation." />
            <InputField label="Total Direct Labor Hours (DLH)" type="number" value={directLaborHours} onChange={(e) => setDirectLaborHours(Number(e.target.value))} />
            <InputField label="Total Machine Hours (MH)" type="number" value={machineHours} onChange={(e) => setMachineHours(Number(e.target.value))} />
            <InputField label="Total Direct Labor Cost ($)" type="number" prefix="$" value={directLaborCost} onChange={(e) => setDirectLaborCost(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Overhead Absorption Rates">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Overhead per Direct Labor Hour</div>
                  <div className="text-4xl font-extrabold text-white">${ratePerLaborHour.toFixed(2)}/DLH</div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Apply ${ratePerLaborHour.toFixed(2)} to product costs for every worker labor hour
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Rate per Machine Hour:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${ratePerMachineHour.toFixed(2)}/MH</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Overhead as % of Labor $:</span>
                    <p className="text-emerald-300 font-bold text-sm mt-0.5">{percentageOfLaborCost.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
