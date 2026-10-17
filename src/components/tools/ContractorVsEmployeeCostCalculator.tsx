import React, { useState } from "react";
import { FileSignature, Scale, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ContractorVsEmployeeCostCalculator: React.FC = () => {
  const [employeeSalary, setEmployeeSalary] = useState<number>(95000);
  const [employeeBurdenRate, setEmployeeBurdenRate] = useState<number>(28); // 28% taxes + benefits
  const [contractorHourlyRate, setContractorHourlyRate] = useState<number>(65);
  const [contractorAnnualHours, setContractorAnnualHours] = useState<number>(1800);

  const totalEmployeeCost = (employeeSalary || 0) * (1 + ((employeeBurdenRate || 0) / 100));
  const totalContractorCost = (contractorHourlyRate || 0) * (contractorAnnualHours || 0);

  const costDifference = Math.abs(totalEmployeeCost - totalContractorCost);
  const isEmployeeCheaper = totalEmployeeCost < totalContractorCost;

  // Break-even contractor hourly rate
  const breakEvenContractorRate = (contractorAnnualHours || 0) > 0 ? totalEmployeeCost / contractorAnnualHours : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileSignature}
            title="1099 Contractor vs W-2 Employee Cost"
            description="Compare total annual enterprise expenditures between full-time W-2 employees and 1099 hourly contractors."
          />
          <ResetButton onReset={() => {
            setEmployeeSalary(95000);
            setEmployeeBurdenRate(28);
            setContractorHourlyRate(65);
            setContractorAnnualHours(1800);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">W-2 Full-Time Employee</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Base Annual Salary ($)" type="number" prefix="$" value={employeeSalary} onChange={(e) => setEmployeeSalary(Number(e.target.value))} />
              <InputField label="Burden Rate (Taxes+Perks %)" type="number" suffix="%" value={employeeBurdenRate} onChange={(e) => setEmployeeBurdenRate(Number(e.target.value))} />
            </div>

            <h3 className="text-sm font-bold text-slate-800 pt-2 border-t border-slate-100">1099 Independent Contractor</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Hourly Contractor Rate ($)" type="number" prefix="$" value={contractorHourlyRate} onChange={(e) => setContractorHourlyRate(Number(e.target.value))} />
              <InputField label="Annual Billable Hours" type="number" suffix="hrs" value={contractorAnnualHours} onChange={(e) => setContractorAnnualHours(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Annual Cost Comparison">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 block font-sans uppercase">W-2 Total Cost</span>
                    <div className="text-2xl font-extrabold text-white">${Math.round(totalEmployeeCost).toLocaleString()}</div>
                    <span className="text-[10px] text-slate-400 block font-sans">${Math.round(totalEmployeeCost / 12).toLocaleString()}/mo</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 block font-sans uppercase">1099 Contractor</span>
                    <div className="text-2xl font-extrabold text-white">${Math.round(totalContractorCost).toLocaleString()}</div>
                    <span className="text-[10px] text-slate-400 block font-sans">${Math.round(totalContractorCost / 12).toLocaleString()}/mo</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                  {isEmployeeCheaper ? (
                    <>W-2 employee saves <strong>${Math.round(costDifference).toLocaleString()}/year</strong> compared to contractor.</>
                  ) : (
                    <>1099 contractor saves <strong>${Math.round(costDifference).toLocaleString()}/year</strong> due to zero payroll tax/benefit burden.</>
                  )}
                  <div className="text-[11px] text-indigo-300 mt-1">
                    Break-even contractor rate: <strong>${breakEvenContractorRate.toFixed(2)}/hour</strong>
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
