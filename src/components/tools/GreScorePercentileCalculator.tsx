import React, { useState } from "react";
import { Target, Award, BarChart2, CheckCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GreScorePercentileCalculator: React.FC = () => {
  const [verbalScore, setVerbalScore] = useState<number>(158);
  const [quantScore, setQuantScore] = useState<number>(164);
  const [awaScore, setAwaScore] = useState<number>(4.5);

  const compositeScore = verbalScore + quantScore;

  // Official ETS General Test Percentile Approximations
  const getVerbalPercentile = (s: number): number => {
    if (s >= 169) return 99;
    if (s >= 165) return 96;
    if (s >= 160) return 85;
    if (s >= 155) return 66;
    if (s >= 150) return 46;
    return Math.max(1, Math.round(((s - 130) / 40) * 100));
  };

  const getQuantPercentile = (s: number): number => {
    if (s >= 170) return 96;
    if (s >= 167) return 87;
    if (s >= 163) return 75;
    if (s >= 160) return 66;
    if (s >= 155) return 48;
    if (s >= 150) return 33;
    return Math.max(1, Math.round(((s - 130) / 40) * 80));
  };

  const getAwaPercentile = (w: number): number => {
    if (w >= 5.5) return 98;
    if (w >= 5.0) return 91;
    if (w >= 4.5) return 81;
    if (w >= 4.0) return 54;
    if (w >= 3.5) return 37;
    return 15;
  };

  const verbalPct = getVerbalPercentile(verbalScore);
  const quantPct = getQuantPercentile(quantScore);
  const awaPct = getAwaPercentile(awaScore);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Target}
            title="GRE Verbal, Quant & Analytical Writing Percentile Solver"
            description="Convert ETS GRE section scores (130-170) and AWA essay ratings into official graduate school percentile ranks."
          />
          <ResetButton onReset={() => {
            setVerbalScore(158); setQuantScore(164); setAwaScore(4.5);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Verbal Reasoning (130-170)"
            type="number"
            value={verbalScore}
            onChange={(e) => setVerbalScore(Number(e.target.value))}
            min={130}
            max={170}
          />
          <InputField
            label="Quantitative Reasoning (130-170)"
            type="number"
            value={quantScore}
            onChange={(e) => setQuantScore(Number(e.target.value))}
            min={130}
            max={170}
          />
          <InputField
            label="Analytical Writing AWA (0.0 - 6.0)"
            type="number"
            step={0.5}
            value={awaScore}
            onChange={(e) => setAwaScore(Number(e.target.value))}
            min={0}
            max={6.0}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard
            variant="light"
            title="Composite 340 Score"
            value={`${compositeScore} / 340`}
            subtitle="Combined Verbal + Quantitative"
          />
          <ResultCard
            variant="light"
            title="Quant Percentile"
            value={`${quantPct}th`}
            subtitle={`Score: ${quantScore} / 170`}
          />
          <ResultCard
            variant="light"
            title="Verbal Percentile"
            value={`${verbalPct}th`}
            subtitle={`Score: ${verbalScore} / 170`}
          />
          <ResultCard
            variant="light"
            title="AWA Writing"
            value={`${awaPct}th`}
            subtitle={`Essay score: ${awaScore.toFixed(1)} / 6.0`}
          />
        </div>
      </div>
    </div>
  );
};
