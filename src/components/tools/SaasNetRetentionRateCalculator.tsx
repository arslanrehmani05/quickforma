import React, { useState } from "react";
import { Percent, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SaasNetRetentionRateCalculator: React.FC = () => {
  const [startingArr, setStartingArr] = useState<number>(500000);
  const [expansionArr, setExpansionArr] = useState<number>(85000);
  const [contractionArr, setContractionArr] = useState<number>(15000);
  const [churnArr, setChurnArr] = useState<number>(25000);

  const endingArr = (startingArr || 0) + (expansionArr || 0) - (contractionArr || 0) - (churnArr || 0);
  const nrr = (startingArr || 0) > 0 ? (endingArr / startingArr) * 100 : 0;
  const grr = (startingArr || 0) > 0 ? (((startingArr || 0) - (contractionArr || 0) - (churnArr || 0)) / startingArr) * 100 : 0;
  const netGrowthCohort = endingArr - (startingArr || 0);

  const getTier = () => {
    if (nrr >= 120) return { label: "Elite Tier (120%+)", color: "text-emerald-400" };
    if (nrr >= 100) return { label: "Good Retention (100–120%)", color: "text-indigo-300" };
    return { label: "High Cohort Churn (<100%)", color: "text-rose-400" };
  };

  const tier = getTier();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Percent}
            title="Net Revenue Retention (NRR) & Expansion ARR Solver"
            description="Measure cohort expansion, downgrades, and net recurring revenue retention health."
          />
          <ResetButton onReset={() => {
            setStartingArr(500000);
            setExpansionArr(85000);
            setContractionArr(15000);
            setChurnArr(25000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Beginning Cohort ARR ($)" type="number" prefix="$" value={startingArr} onChange={(e) => setStartingArr(Number(e.target.value))} />
            <InputField label="Expansion ARR (Upsells & Add-ons) ($)" type="number" prefix="$" value={expansionArr} onChange={(e) => setExpansionArr(Number(e.target.value))} />
            <InputField label="Contraction ARR (Downgrades) ($)" type="number" prefix="$" value={contractionArr} onChange={(e) => setContractionArr(Number(e.target.value))} />
            <InputField label="Churned ARR (Cancellations) ($)" type="number" prefix="$" value={churnArr} onChange={(e) => setChurnArr(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="SaaS Retention Performance">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Net Revenue Retention (NRR)</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    {nrr.toFixed(1)}%
                  </div>
                  <p className={`text-xs font-bold ${tier.color}`}>
                    {tier.label}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Gross Retention (GRR)</span>
                    <span className="text-lg font-bold text-white">{grr.toFixed(1)}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Cohort Net ARR Change</span>
                    <span className={`text-base font-bold ${netGrowthCohort >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {netGrowthCohort >= 0 ? "+" : ""}${netGrowthCohort.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Ending Cohort ARR</span>
                    <span className="text-base font-bold text-white">${endingArr.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Expansion Ratio</span>
                    <span className="text-base font-bold text-white">
                      {startingArr > 0 ? ((expansionArr / startingArr) * 100).toFixed(1) : 0}%
                    </span>
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
