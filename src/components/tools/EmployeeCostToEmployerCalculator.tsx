import React, { useState } from "react";
import { Briefcase, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EmployeeCostToEmployerCalculator: React.FC = () => {
  const [baseSalary, setBaseSalary] = useState<number>(80000);
  const [sutaRate, setSutaRate] = useState<number>(3.2); // State Unemployment %
  const [workersCompRate, setWorkersCompRate] = useState<number>(1.2); // %
  const [healthBenefitAnnual, setHealthBenefitAnnual] = useState<number>(7500);
  const [retirementMatchPercent, setRetirementMatchPercent] = useState<number>(4.0);

  const salary = baseSalary || 0;
  // Statutory Employer Taxes (US):
  // Social Security: 6.2% up to wage base
  const ficaSs = Math.min(salary, 168600) * 0.062;
  // Medicare: 1.45% uncapped
  const ficaMed = salary * 0.0145;
  // FUTA: 0.6% on first $7,000
  const futa = Math.min(salary, 7000) * 0.006;
  // SUTA: e.g. 3.2% on state wage base (~$10,000 avg)
  const suta = Math.min(salary, 10000) * ((sutaRate || 0) / 100);
  // Workers comp
  const workersComp = salary * ((workersCompRate || 0) / 100);

  const totalPayrollTaxes = ficaSs + ficaMed + futa + suta + workersComp;
  const retirementCost = salary * ((retirementMatchPercent || 0) / 100);
  const totalBenefits = (healthBenefitAnnual || 0) + retirementCost;

  const totalBurdenedCost = salary + totalPayrollTaxes + totalBenefits;
  const burdenMultiplier = salary > 0 ? totalBurdenedCost / salary : 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Briefcase}
            title="FUTA, SUTA, FICA & Benefits Full Burden Rate"
            description="Calculate the true employer cost of hiring an employee including mandatory payroll taxes, health benefits, and 401(k)."
          />
          <ResetButton onReset={() => {
            setBaseSalary(80000);
            setSutaRate(3.2);
            setWorkersCompRate(1.2);
            setHealthBenefitAnnual(7500);
            setRetirementMatchPercent(4.0);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Employee Base Annual Salary ($)" type="number" prefix="$" value={baseSalary} onChange={(e) => setBaseSalary(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="State Unemployment (SUTA %)" type="number" suffix="%" value={sutaRate} onChange={(e) => setSutaRate(Number(e.target.value))} />
              <InputField label="Workers' Comp Insurance (%)" type="number" suffix="%" value={workersCompRate} onChange={(e) => setWorkersCompRate(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Annual Health Insurance ($)" type="number" prefix="$" value={healthBenefitAnnual} onChange={(e) => setHealthBenefitAnnual(Number(e.target.value))} />
              <InputField label="Retirement / 401(k) Match (%)" type="number" suffix="%" value={retirementMatchPercent} onChange={(e) => setRetirementMatchPercent(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Total Employer Burden">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Total True Cost to Employer</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                    ${Math.round(totalBurdenedCost).toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400">
                    Burden Multiplier: <strong className="text-white">{burdenMultiplier.toFixed(2)}x</strong> base salary (+{((burdenMultiplier - 1) * 100).toFixed(1)}% overhead).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Employer Payroll Taxes</span>
                    <span className="text-base font-bold text-white">${Math.round(totalPayrollTaxes).toLocaleString()}/yr</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Health & 401k Benefits</span>
                    <span className="text-base font-bold text-white">${Math.round(totalBenefits).toLocaleString()}/yr</span>
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
