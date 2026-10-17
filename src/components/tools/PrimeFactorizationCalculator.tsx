import React, { useState } from "react";
import { Divide, Sparkles } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PrimeFactorizationCalculator: React.FC = () => {
  const [num, setNum] = useState<number>(360);

  const factorize = (n: number) => {
    if (!n || n <= 1) return { factors: [], isPrime: false, factorString: "N/A", allDivisors: [] };
    let temp = Math.floor(n);
    const factors: Record<number, number> = {};

    // 2s
    while (temp % 2 === 0) {
      factors[2] = (factors[2] || 0) + 1;
      temp /= 2;
    }

    // Odds
    let d = 3;
    while (d * d <= temp) {
      while (temp % d === 0) {
        factors[d] = (factors[d] || 0) + 1;
        temp /= d;
      }
      d += 2;
    }
    if (temp > 1) {
      factors[temp] = (factors[temp] || 0) + 1;
    }

    const parts = Object.entries(factors).map(([base, exp]) =>
      exp > 1 ? `${base}^${exp}` : `${base}`
    );

    const isPrime = Object.keys(factors).length === 1 && Object.values(factors)[0] === 1;

    // All divisors
    const divisors: number[] = [];
    for (let i = 1; i * i <= n; i++) {
      if (n % i === 0) {
        divisors.push(i);
        if (i * i !== n) divisors.push(n / i);
      }
    }
    divisors.sort((a, b) => a - b);

    return {
      factors,
      isPrime,
      factorString: parts.join(" × "),
      allDivisors: divisors,
    };
  };

  const res = factorize(num);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Divide}
            title="Prime Factors, GCF & LCM Calculator"
            description="Decompose any integer into its unique prime factor product and list all positive integer divisors."
          />
          <ResetButton onReset={() => setNum(360)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Integer to Factorize"
              type="number"
              min="2"
              max="100000000"
              value={num}
              onChange={(e) => setNum(Number(e.target.value))}
              helpText="Enter a positive whole number greater than 1."
            />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Prime Factorization Output">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Prime Factor Product</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                    {res.factorString}
                  </div>
                  <span className="text-xs text-slate-400 block mt-1">
                    Classification: <strong className="text-white">{res.isPrime ? "Prime Number" : "Composite Number"}</strong>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[11px] text-slate-400 block font-semibold">All Positive Divisors ({res.allDivisors.length})</span>
                  <div className="text-xs font-mono text-slate-300 break-words max-h-24 overflow-y-auto leading-relaxed">
                    {res.allDivisors.join(", ")}
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
