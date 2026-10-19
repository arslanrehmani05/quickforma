import React, { useState } from "react";
import { TrendingDown, Activity, Clock, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ExponentialDistributionCalculator: React.FC = () => {
  const [lambdaRate, setLambdaRate] = useState<number>(0.2); // lambda = 0.2 failures / hour
  const [timeX, setTimeX] = useState<number>(5); // t = 5 hours

  const lambda = Math.max(0.0001, lambdaRate);
  const t = Math.max(0, timeX);

  // Mean Time Between Failures MTBF = 1 / lambda
  const mtbf = 1 / lambda;
  // CDF P(T <= t) = 1 - e^(-lambda * t)
  const cdfProb = 1 - Math.exp(-lambda * t);
  // Reliability / Survival Function R(t) = e^(-lambda * t)
  const reliability = Math.exp(-lambda * t);
  // Median time = ln(2) / lambda
  const medianTime = Math.LN2 / lambda;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={TrendingDown}
            title="Exponential Distribution & Reliability Survival Solver"
            description="Model component failure rates, Mean Time Between Failures (MTBF), and continuous reliability survival probabilities."
          />
          <ResetButton onReset={() => { setLambdaRate(0.2); setTimeX(5); }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Failure Rate Parameter (λ per hour/unit)"
            type="number"
            step={0.01}
            value={lambdaRate}
            onChange={(e) => setLambdaRate(Number(e.target.value))}
            min={0.0001}
          />
          <InputField
            label="Elapsed Operating Time (t)"
            type="number"
            step={0.5}
            value={timeX}
            onChange={(e) => setTimeX(Number(e.target.value))}
            min={0}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard
            variant="light"
            title="Reliability R(t)"
            value={`${(reliability * 100).toFixed(2)}%`}
            subtitle={`Probability surviving beyond t=${t}`}
          />
          <ResultCard
            variant="light"
            title="Failure CDF P(T ≤ t)"
            value={`${(cdfProb * 100).toFixed(2)}%`}
            subtitle={`Probability of failing before t=${t}`}
          />
          <ResultCard
            variant="light"
            title="MTBF (Mean Life)"
            value={`${mtbf.toFixed(2)} hrs`}
            subtitle="Mean Time Between Failures (1/λ)"
          />
          <ResultCard
            variant="light"
            title="Median Survival"
            value={`${medianTime.toFixed(2)} hrs`}
            subtitle="Time to 50% population failure"
          />
        </div>
      </div>
    </div>
  );
};
