import React, { useState } from "react";
import { FunctionSquare, Activity, CheckCircle2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PolynomialRootsCalculator: React.FC = () => {
  // Solves quadratic ax^2 + bx + c = 0
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(6);

  // Discriminant D = b^2 - 4ac
  const discriminant = b * b - 4 * a * c;

  let rootType = "Two Real Roots";
  let r1Str = "";
  let r2Str = "";

  if (a === 0 && b === 0) {
    if (c === 0) {
      rootType = "Identity (Infinitely Many Solutions: 0 = 0)";
      r1Str = "All x ∈ ℝ";
      r2Str = "All x ∈ ℝ";
    } else {
      rootType = `Contradiction (No Solution: ${c} ≠ 0)`;
      r1Str = "No Solution";
      r2Str = "No Solution";
    }
  } else if (a === 0) {
    rootType = "Linear Equation (bx + c = 0)";
    const r = -c / b;
    r1Str = r.toFixed(3);
    r2Str = "N/A (Single root)";
  } else if (discriminant > 0) {
    const r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    r1Str = r1.toFixed(3);
    r2Str = r2.toFixed(3);
  } else if (discriminant === 0) {
    rootType = "One Repeated Real Root (Double root)";
    const r = -b / (2 * a);
    r1Str = r.toFixed(3);
    r2Str = r.toFixed(3);
  } else {
    rootType = "Complex Conjugate Roots";
    const realPart = (-b / (2 * a)).toFixed(3);
    const imagPart = (Math.abs(Math.sqrt(-discriminant) / (2 * a))).toFixed(3);
    r1Str = `${realPart} + ${imagPart}i`;
    r2Str = `${realPart} - ${imagPart}i`;
  }

  // Parabolic Vertex (h, k) - only exists if a !== 0
  const hasVertex = a !== 0;
  const vertexH = hasVertex ? -b / (2 * a) : 0;
  const vertexK = hasVertex ? c - (b * b) / (4 * a) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FunctionSquare}
            title="Polynomial Roots & Quadratic Equation Solver"
            description="Find real and complex roots, discriminant, and parabolic vertex for quadratic equations ax² + bx + c = 0."
          />
          <ResetButton onReset={() => {
            setA(1);
            setB(-5);
            setC(6);
          }} />
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono text-sm text-slate-800">
          {a !== 0 ? `${a}x² ` : ''}{b !== 0 ? `${b > 0 ? '+' : ''}${b}x ` : ''}{c !== 0 ? `${c > 0 ? '+' : ''}${c}` : ''} = 0
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField label="a (Quadratic coeff)" type="number" step={0.5} value={a} onChange={(e) => setA(Number(e.target.value))} />
          <InputField label="b (Linear coeff)" type="number" step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
          <InputField label="c (Constant)" type="number" step={0.5} value={c} onChange={(e) => setC(Number(e.target.value))} />
        </div>

        <ResultCard variant="dark" title="Equation Roots & Parabolic Characteristics">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Root 1 (x₁)</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">{r1Str}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Zero crossing</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Root 2 (x₂)</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">{r2Str}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Zero crossing</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Discriminant (Δ)</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">{discriminant}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">{rootType}</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Parabola Vertex</span>
              <p className="text-xl font-mono font-bold text-white mt-3">
                {hasVertex ? `(${vertexH.toFixed(2)}, ${vertexK.toFixed(2)})` : "N/A"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {hasVertex ? (a > 0 ? "Parabolic Minimum" : "Parabolic Maximum") : "Linear (No Vertex)"}
              </span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
