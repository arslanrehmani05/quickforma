import React, { useState } from "react";
import { FunctionSquare, Calculator, Layers, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const IntegralCalculusCalculator: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(-2);
  const [d, setD] = useState<number>(4);
  const [lowerBound, setLowerBound] = useState<number>(0);
  const [upperBound, setUpperBound] = useState<number>(3);

  const lBound = Number(lowerBound) || 0;
  const uBound = Number(upperBound) || 0;

  // Exact antiderivative F(x) = (a/4)x^4 + (b/3)x^3 + (c/2)x^2 + d*x
  const antiderivative = (x: number) => {
    return (a / 4) * Math.pow(x, 4) + (b / 3) * Math.pow(x, 3) + (c / 2) * Math.pow(x, 2) + d * x;
  };

  const exactValue = antiderivative(uBound) - antiderivative(lBound);

  // Numerical approximation via Simpson's 1/3 Rule
  const f = (x: number) => a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
  const n = 100;
  const h = (uBound - lBound) / n;
  let simpsonSum = f(lBound) + f(uBound);
  for (let i = 1; i < n; i++) {
    const x = lBound + i * h;
    simpsonSum += (i % 2 === 0 ? 2 : 4) * f(x);
  }
  const simpsonResult = (h / 3) * simpsonSum;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FunctionSquare}
            title="Definite Integral & Polynomial Calculus Solver"
            description="Solve exact definite integrals for polynomial functions f(x) = ax³ + bx² + cx + d via Fundamental Theorem of Calculus with Simpson's numerical check."
          />
          <ResetButton onReset={() => {
            setA(1);
            setB(0);
            setC(-2);
            setD(4);
            setLowerBound(0);
            setUpperBound(3);
          }} />
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono text-sm text-slate-800">
          ∫ [{lBound} to {uBound}] ({a !== 0 ? `${a}x³ ` : ""}{b !== 0 ? `${b > 0 ? "+" : ""}${b}x² ` : ""}{c !== 0 ? `${c > 0 ? "+" : ""}${c}x ` : ""}{d !== 0 ? `${d > 0 ? "+" : ""}${d}` : ""}) dx
        </div>

        {uBound < lBound && (
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>Calculus Identity: Upper bound is less than lower bound (b &lt; a). By definition, ∫[a to b] f(x)dx = -∫[b to a] f(x)dx.</span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField label="a (x³ coeff)" type="number" step={0.5} value={a} onChange={(e) => setA(Number(e.target.value))} />
          <InputField label="b (x² coeff)" type="number" step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
          <InputField label="c (x coeff)" type="number" step={0.5} value={c} onChange={(e) => setC(Number(e.target.value))} />
          <InputField label="d (constant)" type="number" step={0.5} value={d} onChange={(e) => setD(Number(e.target.value))} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Lower Limit (a)" type="number" value={lowerBound} onChange={(e) => setLowerBound(Number(e.target.value))} />
          <InputField label="Upper Limit (b)" type="number" value={upperBound} onChange={(e) => setUpperBound(Number(e.target.value))} />
        </div>

        <ResultCard variant="dark" title="Calculus Integral Result">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Exact Definite Area</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">{exactValue.toFixed(4)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">F({uBound}) - F({lBound})</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Simpson's Approx</span>
              <p className="text-4xl font-extrabold text-white mt-1">{simpsonResult.toFixed(4)}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">n = 100 subintervals</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Antiderivative F(x)</span>
              <p className="text-xs font-mono text-slate-200 mt-1">
                {a !== 0 ? `(${a}/4)x⁴ ` : ""}{b !== 0 ? `+ (${b}/3)x³ ` : ""}{c !== 0 ? `+ (${c}/2)x² ` : ""}{d !== 0 ? `+ ${d}x` : ""} + C
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
