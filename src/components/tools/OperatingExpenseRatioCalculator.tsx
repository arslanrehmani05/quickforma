import React, { useState } from "react";
import { Building, Percent, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const OperatingExpenseRatioCalculator: React.FC = () => {
  const [grossOperatingIncome, setGrossOperatingIncome] = useState<number>(360000);
  const [propertyManagementFee, setPropertyManagementFee] = useState<number>(28000);
  const [repairsMaintenance, setRepairsMaintenance] = useState<number>(32000);
  const [propertyTaxes, setPropertyTaxes] = useState<number>(42000);
  const [insuranceCost, setInsuranceCost] = useState<number>(18000);
  const [utilitiesOther, setUtilitiesOther] = useState<number>(24000);

  const safeGoi = Math.max(0.01, grossOperatingIncome);
  const totalOpex = Math.max(0, propertyManagementFee) +
    Math.max(0, repairsMaintenance) +
    Math.max(0, propertyTaxes) +
    Math.max(0, insuranceCost) +
    Math.max(0, utilitiesOther);

  // Operating Expense Ratio (OER) = Total Operating Expenses / Gross Operating Income
  const oerPct = (totalOpex / safeGoi) * 100;
  const netOperatingIncomeNoi = safeGoi - totalOpex;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Building}
            title="Real Estate Operating Expense Ratio (OER) & NOI Calculator"
            description="Measure multifamily and commercial property operating efficiency: OER = Total Operating Expenses / Gross Operating Income (GOI)."
          />
          <ResetButton onReset={() => {
            setGrossOperatingIncome(360000);
            setPropertyManagementFee(28000);
            setRepairsMaintenance(32000);
            setPropertyTaxes(42000);
            setInsuranceCost(18000);
            setUtilitiesOther(24000);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <InputField
            label="Gross Operating Income ($)"
            type="number"
            min={1}
            step={10000}
            value={grossOperatingIncome}
            onChange={(e) => setGrossOperatingIncome(Math.max(1, Number(e.target.value)))}
          />
          <InputField
            label="Property Management ($)"
            type="number"
            min={0}
            step={2500}
            value={propertyManagementFee}
            onChange={(e) => setPropertyManagementFee(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Repairs & Maintenance ($)"
            type="number"
            min={0}
            step={2500}
            value={repairsMaintenance}
            onChange={(e) => setRepairsMaintenance(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Property Taxes ($)"
            type="number"
            min={0}
            step={2500}
            value={propertyTaxes}
            onChange={(e) => setPropertyTaxes(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Property Insurance ($)"
            type="number"
            min={0}
            step={2500}
            value={insuranceCost}
            onChange={(e) => setInsuranceCost(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Utilities & Other ($)"
            type="number"
            min={0}
            step={2500}
            value={utilitiesOther}
            onChange={(e) => setUtilitiesOther(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Property Operating Performance">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Operating Expense Ratio</span>
              <p className={`text-4xl font-extrabold mt-2 ${oerPct <= 45 ? "text-emerald-400" : oerPct <= 60 ? "text-amber-300" : "text-rose-400"}`}>
                {oerPct.toFixed(1)}%
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Opex / Gross Income</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Operating Income (NOI)</span>
              <p className="text-3xl font-extrabold text-white mt-2">${Math.round(netOperatingIncomeNoi).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Annual pre-debt cash</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Operating Outlays</span>
              <p className="text-3xl font-extrabold text-amber-300 mt-2">${Math.round(totalOpex).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Annual OPEX total</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Efficiency Grade</span>
              <p className="text-sm font-bold text-slate-200 mt-2">
                {oerPct <= 45 ? "Lean & Highly Efficient (<45%)" : oerPct <= 55 ? "Standard Benchmark" : "High Overhead Exposure (>55%)"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
