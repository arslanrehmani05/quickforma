import React, { useState } from "react";
import { Gift, DollarSign, Award } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TotalCompensationCalculator: React.FC = () => {
  const [baseSalary, setBaseSalary] = useState<number>(115000);
  const [annualBonus, setAnnualBonus] = useState<number>(15000);
  const [healthInsuranceEmployer, setHealthInsuranceEmployer] = useState<number>(8400); // Company health subsidy
  const [match401k, setMatch401k] = useState<number>(4600); // 4% match
  const [equityValueAnnual, setEquityValueAnnual] = useState<number>(12000); // RSU / Stock options
  const [perksAndStipends, setPerksAndStipends] = useState<number>(2400); // Wellness, education, transit

  const benefitsTotal = (healthInsuranceEmployer || 0) + (match401k || 0) + (perksAndStipends || 0);
  const totalComp = (baseSalary || 0) + (annualBonus || 0) + (equityValueAnnual || 0) + benefitsTotal;
  const benefitsRatio = (baseSalary || 0) > 0 ? (benefitsTotal / baseSalary) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Gift}
            title="Base Salary + Health + 401k + Bonus Total Value"
            description="Calculate the true all-in market value of an employment offer including health benefits, 401(k) matches, and equity."
          />
          <ResetButton onReset={() => {
            setBaseSalary(115000);
            setAnnualBonus(15000);
            setHealthInsuranceEmployer(8400);
            setMatch401k(4600);
            setEquityValueAnnual(12000);
            setPerksAndStipends(2400);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Base Annual Salary ($)" type="number" prefix="$" value={baseSalary} onChange={(e) => setBaseSalary(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Annual Bonus / Incentive ($)" type="number" prefix="$" value={annualBonus} onChange={(e) => setAnnualBonus(Number(e.target.value))} />
              <InputField label="Annual Equity / Stock Vesting ($)" type="number" prefix="$" value={equityValueAnnual} onChange={(e) => setEquityValueAnnual(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Employer Health Subsidy ($/yr)" type="number" prefix="$" value={healthInsuranceEmployer} onChange={(e) => setHealthInsuranceEmployer(Number(e.target.value))} />
              <InputField label="Employer 401(k) Match ($/yr)" type="number" prefix="$" value={match401k} onChange={(e) => setMatch401k(Number(e.target.value))} />
            </div>
            <InputField label="Annual Wellness & Education Perks ($)" type="number" prefix="$" value={perksAndStipends} onChange={(e) => setPerksAndStipends(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Total Package Value">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">All-In Total Compensation</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                    ${totalComp.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400">
                    Provides an extra <strong className="text-white">${(totalComp - (baseSalary || 0)).toLocaleString()}</strong> above nominal base salary.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Employer Benefits Total</span>
                    <span className="text-base font-bold text-white">${benefitsTotal.toLocaleString()}/yr</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Benefits to Salary Ratio</span>
                    <span className="text-base font-bold text-indigo-300">+{benefitsRatio.toFixed(1)}%</span>
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
