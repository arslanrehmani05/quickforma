import React, { useState } from "react";
import { FunctionSquare, Calculator, Layers, Hash } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FactorialCalculator: React.FC = () => {
  const [n, setN] = useState<number>(8);
  const [r, setR] = useState<number>(3);

  const safeN = Math.max(0, Math.min(100, Math.floor(n)));
  const safeR = Math.max(0, Math.min(safeN, Math.floor(r)));

  // Calculate factorial using BigInt for exact precision
  const calcFactorialBig = (num: number): bigint => {
    let res = 1n;
    for (let i = 2n; i <= BigInt(num); i++) {
      res *= i;
    }
    return res;
  };

  const nFactBig = calcFactorialBig(safeN);
  const rFactBig = calcFactorialBig(safeR);
  const nMinusRFactBig = calcFactorialBig(safeN - safeR);

  // Permutations P(n, r) = n! / (n - r)!
  const permutationsBig = nFactBig / nMinusRFactBig;

  // Combinations C(n, r) = n! / (r! * (n - r)!)
  const combinationsBig = permutationsBig / rFactBig;

  const formatBig = (b: bigint): string => {
    const s = b.toString();
    if (s.length > 15) {
      const exp = s.length - 1;
      const mantissa = `${s[0]}.${s.slice(1, 4)}`;
      return `${mantissa} × 10^${exp}`;
    }
    return Number(s).toLocaleString();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FunctionSquare}
            title="Factorial (n!), Permutations (nPr) & Combinations (nCr) Solver"
            description="Calculate exact factorials, permutation arrangements, and combination subsets using arbitrary-precision integer math."
          />
          <ResetButton onReset={() => { setN(8); setR(3); }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Total Set Size (n)"
            type="number"
            value={safeN}
            onChange={(e) => setN(Number(e.target.value))}
            min={0}
            max={100}
          />
          <InputField
            label="Subset Sample Size (r ≤ n)"
            type="number"
            value={safeR}
            onChange={(e) => setR(Number(e.target.value))}
            min={0}
            max={safeN}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title={`Factorial (${safeN}!)`}
            value={formatBig(nFactBig)}
            subtitle={`Total distinct orders of ${safeN} items`}
          />
          <ResultCard
            variant="light"
            title={`Combinations C(${safeN}, ${safeR})`}
            value={formatBig(combinationsBig)}
            subtitle="Order does NOT matter (n choose r)"
          />
          <ResultCard
            variant="light"
            title={`Permutations P(${safeN}, ${safeR})`}
            value={formatBig(permutationsBig)}
            subtitle="Order DOES matter"
          />
        </div>
      </div>
    </div>
  );
};
