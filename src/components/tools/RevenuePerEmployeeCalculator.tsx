import React, { useState } from "react";
import { Users, TrendingUp, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RevenuePerEmployeeCalculator: React.FC = () => {
  const [totalAnnualRevenue, setTotalAnnualRevenue] = useState<number>(5000000);
  const [fullTimeEmployees, setFullTimeEmployees] = useState<number>(20);
  const [partTimeEmployees, setPartTimeEmployees] = useState<number>(5);
  const [partTimeAvgHoursPerWeek, setPartTimeAvgHoursPerWeek] = useState<number>(20); // 20h / 40h = 0.5 FTE

  const fteFromPartTime = (Math.max(0, partTimeEmployees) * Math.max(0, partTimeAvgHoursPerWeek)) / 40;
  const totalFte = Math.max(0.1, Math.max(0, fullTimeEmployees) + fteFromPartTime);
  const safeRevenue = Math.max(0, totalAnnualRevenue);

  const revenuePerFte = safeRevenue / totalFte;
  const revenuePerHeadcount = (fullTimeEmployees + partTimeEmployees) > 0 
    ? safeRevenue / (fullTimeEmployees + partTimeEmployees) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Users}
            title="Revenue per Employee & Labor Productivity (FTE) Calculator"
            description="Calculate revenue per Full-Time Equivalent (FTE) and head-count labor efficiency benchmarks across tech, retail, and professional services."
          />
          <ResetButton onReset={() => {
            setTotalAnnualRevenue(5000000);
            setFullTimeEmployees(20);
            setPartTimeEmployees(5);
            setPartTimeAvgHoursPerWeek(20);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField
            label="Annual Revenue ($)"
            type="number"
            min={0}
            step={100000}
            value={totalAnnualRevenue}
            onChange={(e) => setTotalAnnualRevenue(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Full-Time Employees"
            type="number"
            min={1}
            value={fullTimeEmployees}
            onChange={(e) => setFullTimeEmployees(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Part-Time Workers"
            type="number"
            min={0}
            value={partTimeEmployees}
            onChange={(e) => setPartTimeEmployees(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="PT Avg Weekly Hours"
            type="number"
            min={1}
            max={40}
            value={partTimeAvgHoursPerWeek}
            onChange={(e) => setPartTimeAvgHoursPerWeek(Math.max(1, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Productivity & Human Capital Metrics">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Revenue / FTE</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">${Math.round(revenuePerFte).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Per 40h equivalent worker</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Normalized FTE</span>
              <p className="text-3xl font-extrabold text-white mt-2">{totalFte.toFixed(1)} FTEs</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{fullTimeEmployees} FT + {fteFromPartTime.toFixed(1)} PT FTE</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Raw Headcount Revenue</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">${Math.round(revenuePerHeadcount).toLocaleString()}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Unweighted bodies</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Industry Tier</span>
              <p className="text-sm font-bold text-slate-200 mt-2">
                {revenuePerFte >= 300000 ? "High Efficiency / Tech (> $300k)" : revenuePerFte >= 175000 ? "Solid Services ($175k-$300k)" : "Labor Intensive (< $175k)"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
