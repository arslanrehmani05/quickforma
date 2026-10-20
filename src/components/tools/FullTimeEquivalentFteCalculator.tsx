import React, { useState } from "react";
import { Users, Clock, Briefcase, Calendar } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FullTimeEquivalentFteCalculator: React.FC = () => {
  const [fullTimeEmployees, setFullTimeEmployees] = useState<number>(18);
  const [totalPartTimeWeeklyHours, setTotalPartTimeWeeklyHours] = useState<number>(360);
  const [standardFullTimeHoursPerWeek, setStandardFullTimeHoursPerWeek] = useState<number>(40); // 40 or 30 (ACA)

  const handleReset = () => {
    setFullTimeEmployees(18);
    setTotalPartTimeWeeklyHours(360);
    setStandardFullTimeHoursPerWeek(40);
  };

  const partTimeFte = standardFullTimeHoursPerWeek > 0 ? totalPartTimeWeeklyHours / standardFullTimeHoursPerWeek : 0;
  const totalCompanyFte = fullTimeEmployees + partTimeFte;
  // Affordable Care Act (ACA) employer mandate threshold is 50 FTEs
  const isApplicableLargeEmployerAca = totalCompanyFte >= 50;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Part-Time Hours to Full-Time Equivalent (FTE) Solver"
        description="Convert part-time employee hours into Full-Time Equivalents (FTE) for workforce planning and ACA compliance."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Full-Time Employees (40 hrs/wk)"
            value={fullTimeEmployees}
            onChange={(val) => setFullTimeEmployees(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Cumulative Part-Time Weekly Hours"
            value={totalPartTimeWeeklyHours}
            onChange={(val) => setTotalPartTimeWeeklyHours(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Standard FTE Hours per Week"
            value={standardFullTimeHoursPerWeek}
            onChange={(val) => setStandardFullTimeHoursPerWeek(Math.max(20, Number(val) || 0))}
            type="number"
            min={20}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Part-Time FTE Equivalent"
            value={`${partTimeFte.toFixed(2)} FTE`}
            subtitle={`From ${totalPartTimeWeeklyHours} part-time hours`}
            variant="light"
          />
          <ResultCard
            title="Total Headcount (FTE)"
            value={`${totalCompanyFte.toFixed(2)} FTE`}
            subtitle="Combined organizational capacity"
            variant="indigo"
          />
          <ResultCard
            title="ACA Large Employer Status"
            value={isApplicableLargeEmployerAca ? "Applicable Large Employer (ALE)" : "Small Employer (<50 FTE)"}
            subtitle={isApplicableLargeEmployerAca ? "Subject to ACA employer mandate" : "Exempt from ACA shared responsibility"}
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
