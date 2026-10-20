import React, { useState } from "react";
import { CheckSquare, ShieldCheck, Award, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const Lean5sAuditScoreCalculator: React.FC = () => {
  const [sortScore, setSortScore] = useState<number>(4); // Seiri (1-5)
  const [setInOrderScore, setSetInOrderScore] = useState<number>(3); // Seiton (1-5)
  const [shineScore, setShineScore] = useState<number>(4); // Seiso (1-5)
  const [standardizeScore, setStandardizeScore] = useState<number>(3); // Seiketsu (1-5)
  const [sustainScore, setSustainScore] = useState<number>(2); // Shitsuke (1-5)

  const handleReset = () => {
    setSortScore(4);
    setSetInOrderScore(3);
    setShineScore(4);
    setStandardizeScore(3);
    setSustainScore(2);
  };

  const totalPoints = sortScore + setInOrderScore + shineScore + standardizeScore + sustainScore;
  const percentageScore = (totalPoints / 25) * 100;

  let maturityTier = "Initial / Ad-Hoc (< 60%)";
  if (percentageScore >= 90) maturityTier = "World-Class 5S Culture (>= 90%)";
  else if (percentageScore >= 75) maturityTier = "Mature Lean Workplace (75% - 89%)";
  else if (percentageScore >= 60) maturityTier = "Developing 5S Foundation (60% - 74%)";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Lean Workplace 5S Inspection Score Sheet"
        description="Audit factory workstation 5S compliance (Sort, Set in Order, Shine, Standardize, Sustain) and maturity."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <InputField
            label="1. Sort (Seiri) [1-5]"
            value={sortScore}
            onChange={(val) => setSortScore(Math.min(5, Math.max(1, Number(val) || 1)))}
            type="number"
            min={1}
            max={5}
          />
          <InputField
            label="2. Set In Order [1-5]"
            value={setInOrderScore}
            onChange={(val) => setSetInOrderScore(Math.min(5, Math.max(1, Number(val) || 1)))}
            type="number"
            min={1}
            max={5}
          />
          <InputField
            label="3. Shine (Seiso) [1-5]"
            value={shineScore}
            onChange={(val) => setShineScore(Math.min(5, Math.max(1, Number(val) || 1)))}
            type="number"
            min={1}
            max={5}
          />
          <InputField
            label="4. Standardize [1-5]"
            value={standardizeScore}
            onChange={(val) => setStandardizeScore(Math.min(5, Math.max(1, Number(val) || 1)))}
            type="number"
            min={1}
            max={5}
          />
          <InputField
            label="5. Sustain [1-5]"
            value={sustainScore}
            onChange={(val) => setSustainScore(Math.min(5, Math.max(1, Number(val) || 1)))}
            type="number"
            min={1}
            max={5}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Overall 5S Audit Score"
          value={`${percentageScore.toFixed(0)}%`}
          subtitle={`${totalPoints} / 25 total points`}
          variant="indigo"
        />
        <ResultCard
          title="Maturity Rating"
          value={maturityTier.split(" ")[0]}
          subtitle={maturityTier}
          variant="light"
        />
        <ResultCard
          title="Primary Bottleneck"
          value={sustainScore <= 2 ? "Sustain (Habit)" : standardizeScore <= 2 ? "Standardize" : "Balanced"}
          subtitle="Area needing focus"
          variant="light"
        />
        <ResultCard
          title="Points to World-Class"
          value={totalPoints >= 23 ? "Achieved!" : `${23 - totalPoints} pts`}
          subtitle="92% target threshold"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">5S Continuous Improvement Feedback</h4>
        <p className="text-slate-600">
          Workstation cleanliness and organization scored <strong className="text-slate-800">{totalPoints} out of 25 ({percentageScore.toFixed(0)}%)</strong>. In lean manufacturing, the final pillar (Sustain / Shitsuke) is the hardest to maintain without daily 5-minute gemba walks and standardized visual shadow boards.
        </p>
      </div>
    </div>
  );
};
