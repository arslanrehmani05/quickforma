import React, { useState } from "react";
import { GitMerge, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SystemOfEquationsSolver: React.FC = () => {
  const [a1, setA1] = useState<number>(2);
  const [b1, setB1] = useState<number>(3);
  const [c1, setC1] = useState<number>(13);

  const [a2, setA2] = useState<number>(5);
  const [b2, setB2] = useState<number>(-1);
  const [c2, setC2] = useState<number>(7);

  // Cramer's Rule:
  // D = a1*b2 - a2*b1
  // Dx = c1*b2 - c2*b1
  // Dy = a1*c2 - a2*c1
  const D = a1 * b2 - a2 * b1;
  const Dx = c1 * b2 - c2 * b1;
  const Dy = a1 * c2 - a2 * c1;

  let status = "Unique Solution";
  let x: number | null = null;
  let y: number | null = null;

  if (D !== 0) {
    x = Dx / D;
    y = Dy / D;
    status = "Unique Consistent Solution (Intersecting Lines)";
  } else {
    if (Dx === 0 && Dy === 0) {
      status = "Infinitely Many Solutions (Coincident Dependent Lines)";
    } else {
      status = "No Solution (Inconsistent / Parallel Lines)";
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={GitMerge}
            title="System of 2 Linear Equations Solver"
            description="Solve simultaneous linear equations (a₁x + b₁y = c₁ and a₂x + b₂y = c₂) using Cramer's Determinant Rule with singularity classification."
          />
          <ResetButton onReset={() => {
            setA1(2); setB1(3); setC1(13);
            setA2(5); setB2(-1); setC2(7);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Equation 1: a₁x + b₁y = c₁</h3>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="a₁ (x)" type="number" value={a1} onChange={(e) => setA1(Number(e.target.value))} />
              <InputField label="b₁ (y)" type="number" value={b1} onChange={(e) => setB1(Number(e.target.value))} />
              <InputField label="c₁ (const)" type="number" value={c1} onChange={(e) => setC1(Number(e.target.value))} />
            </div>
            <p className="text-xs text-slate-500 font-mono text-center">{a1}x + {b1}y = {c1}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Equation 2: a₂x + b₂y = c₂</h3>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="a₂ (x)" type="number" value={a2} onChange={(e) => setA2(Number(e.target.value))} />
              <InputField label="b₂ (y)" type="number" value={b2} onChange={(e) => setB2(Number(e.target.value))} />
              <InputField label="c₂ (const)" type="number" value={c2} onChange={(e) => setC2(Number(e.target.value))} />
            </div>
            <p className="text-xs text-slate-500 font-mono text-center">{a2}x + {b2}y = {c2}</p>
          </div>
        </div>

        <ResultCard variant="dark" title="Simultaneous Solution">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Value of x</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {x !== null ? x.toFixed(3) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">D_x / D = {Dx} / {D}</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Value of y</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                {y !== null ? y.toFixed(3) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">D_y / D = {Dy} / {D}</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Classification</span>
              <p className="text-sm font-bold text-white mt-1">{status}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Determinant D = {D}</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
