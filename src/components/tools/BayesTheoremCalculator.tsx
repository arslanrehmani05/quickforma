import React, { useState } from "react";
import { GitCommit, Percent, HelpCircle, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BayesTheoremCalculator: React.FC = () => {
  const [priorA, setPriorA] = useState<number>(1.0); // e.g. Disease prevalence 1%
  const [sensitivityBGivenA, setSensitivityBGivenA] = useState<number>(95.0); // True positive rate P(B|A) = 95%
  const [falsePositiveBGivenNotA, setFalsePositiveBGivenNotA] = useState<number>(5.0); // False positive rate P(B|~A) = 5%

  const pA = priorA / 100;
  const pNotA = 1 - pA;
  const pBGivenA = sensitivityBGivenA / 100;
  const pBGivenNotA = falsePositiveBGivenNotA / 100;

  // Law of Total Probability: P(B) = P(B|A)*P(A) + P(B|~A)*P(~A)
  const pB = (pBGivenA * pA) + (pBGivenNotA * pNotA);

  // Bayes' Theorem: P(A|B) = (P(B|A) * P(A)) / P(B)
  const posteriorAGivenB = pB > 0 ? (pBGivenA * pA) / pB : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={GitCommit}
            title="Bayes' Theorem Conditional Probability Solver"
            description="Compute posterior probability P(A|B) from prior probabilities, test sensitivity, and false positive base rates."
          />
          <ResetButton onReset={() => {
            setPriorA(1.0); setSensitivityBGivenA(95.0); setFalsePositiveBGivenNotA(5.0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Prior Probability P(A) %"
            type="number"
            step={0.1}
            value={priorA}
            onChange={(e) => setPriorA(Number(e.target.value))}
            min={0.01}
            max={99.9}
          />
          <InputField
            label="Sensitivity P(B|A) % (True +)"
            type="number"
            step={0.1}
            value={sensitivityBGivenA}
            onChange={(e) => setSensitivityBGivenA(Number(e.target.value))}
            min={0.1}
            max={100}
          />
          <InputField
            label="False Positive P(B|¬A) %"
            type="number"
            step={0.1}
            value={falsePositiveBGivenNotA}
            onChange={(e) => setFalsePositiveBGivenNotA(Number(e.target.value))}
            min={0}
            max={100}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Posterior P(A|B)"
            value={`${(posteriorAGivenB * 100).toFixed(2)}%`}
            subtitle="Probability condition A holds given test +"
          />
          <ResultCard
            variant="light"
            title="Total Positive P(B)"
            value={`${(pB * 100).toFixed(2)}%`}
            subtitle="Marginal probability of testing positive"
          />
          <ResultCard
            variant="light"
            title="Base Rate Fallacy Gap"
            value={`${((pBGivenA - posteriorAGivenB) * 100).toFixed(1)}%`}
            subtitle="Difference between sensitivity & actual certainty"
          />
        </div>
      </div>
    </div>
  );
};
