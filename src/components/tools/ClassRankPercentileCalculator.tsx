import React, { useState } from "react";
import { Users, Award, Percent, BarChart } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ClassRankPercentileCalculator: React.FC = () => {
  const [classRank, setClassRank] = useState<number>(14);
  const [classSize, setClassSize] = useState<number>(380);

  const safeRank = Math.max(1, classRank);
  const safeSize = Math.max(safeRank, classSize);

  // Standard formula: Percentile = (1 - (Rank - 0.5) / ClassSize) * 100
  const percentile = ((1 - (safeRank - 0.5) / safeSize) * 100).toFixed(1);
  const topPercentage = ((safeRank / safeSize) * 100).toFixed(1);

  let decileTier = "Top 50%";
  const topNum = parseFloat(topPercentage);
  if (topNum <= 1) decileTier = "Top 1% (Valedictorian / Salutatorian Tier)";
  else if (topNum <= 5) decileTier = "Top 5% (Highest Honors)";
  else if (topNum <= 10) decileTier = "Top 10% (First Decile)";
  else if (topNum <= 25) decileTier = "Top Quartile (Top 25%)";
  else decileTier = "Second Quartile / General";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Users}
            title="Class Rank Percentile & Decile Calculator"
            description="Convert class standing and cohort size into exact college admissions percentile ranks and decile tiers."
          />
          <ResetButton onReset={() => {
            setClassRank(14);
            setClassSize(380);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Your Class Rank (1 = Top Student)"
            type="number"
            value={classRank}
            onChange={(e) => setClassRank(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Total Graduating Class Size"
            type="number"
            value={classSize}
            onChange={(e) => setClassSize(Number(e.target.value))}
            min={1}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Percentile Rank"
            value={`${percentile}th`}
            subtitle="Higher than % of class"
          />
          <ResultCard
            variant="light"
            title="Top Cohort %"
            value={`Top ${topPercentage}%`}
            subtitle={`Rank ${safeRank} out of ${safeSize}`}
          />
          <ResultCard
            variant="light"
            title="Academic Tier"
            value={decileTier}
            subtitle="College admissions tier"
          />
        </div>
      </div>
    </div>
  );
};
