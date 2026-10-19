import React, { useState } from "react";
import { BarChart, Percent, Activity } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PoissonDistributionCalculator: React.FC = () => {
  const [lambdaRate, setLambdaRate] = useState<number>(4.5); // Average arrivals / time
  const [kEvents, setKEvents] = useState<number>(3); // Target occurrences

  const lambda = Math.max(0.001, lambdaRate);
  const k = Math.max(0, Math.floor(kEvents));

  // Factorial helper
  const fact = (n: number): number => {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  };

  // P(X = k) = (lambda^k * e^-lambda) / k!
  const pExact = (Math.pow(lambda, k) * Math.exp(-lambda)) / fact(Math.min(20, k));

  // Cumulative P(X <= k)
  let pCumulative = 0;
  for (let i = 0; i <= k; i++) {
    pCumulative += (Math.pow(lambda, i) * Math.exp(-lambda)) / fact(i);
  }

  const pGreater = Math.max(0, 1 - pCumulative);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BarChart}
            title="Poisson Distribution Event Probability Solver"
            description="Calculate exact P(X = k), cumulative P(X ≤ k), and tail probabilities for Poisson arrival queues and call centers."
          />
          <ResetButton onReset={() => { setLambdaRate(4.5); setKEvents(3); }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Average Event Rate (λ per interval)"
            type="number"
            step={0.1}
            value={lambdaRate}
            onChange={(e) => setLambdaRate(Number(e.target.value))}
            min={0.001}
          />
          <InputField
            label="Target Occurrences (k events)"
            type="number"
            value={kEvents}
            onChange={(e) => setKEvents(Number(e.target.value))}
            min={0}
            max={20}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title={`Exact P(X = ${k})`}
            value={`${(pExact * 100).toFixed(2)}%`}
            subtitle={`Probability of exactly ${k} arrivals`}
          />
          <ResultCard
            variant="light"
            title={`Cumulative P(X ≤ ${k})`}
            value={`${(pCumulative * 100).toFixed(2)}%`}
            subtitle={`At most ${k} occurrences`}
          />
          <ResultCard
            variant="light"
            title={`Tail P(X > ${k})`}
            value={`${(pGreater * 100).toFixed(2)}%`}
            subtitle={`More than ${k} occurrences`}
          />
        </div>
      </div>
    </div>
  );
};
