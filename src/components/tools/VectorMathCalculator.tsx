import React, { useState } from "react";
import { Compass, Move, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const VectorMathCalculator: React.FC = () => {
  const [u1, setU1] = useState<number>(2);
  const [u2, setU2] = useState<number>(3);
  const [u3, setU3] = useState<number>(4);

  const [v1, setV1] = useState<number>(1);
  const [v2, setV2] = useState<number>(-2);
  const [v3, setV3] = useState<number>(2);

  // Magnitudes
  const magU = Math.sqrt(u1 * u1 + u2 * u2 + u3 * u3);
  const magV = Math.sqrt(v1 * v1 + v2 * v2 + v3 * v3);

  // Dot product
  const dotProduct = u1 * v1 + u2 * v2 + u3 * v3;

  // Angle in degrees: guarded against zero vectors
  let angleDeg: number | null = null;
  let angleRad: number | null = null;
  if (magU > 0 && magV > 0) {
    const cosTheta = Math.min(1, Math.max(-1, dotProduct / (magU * magV)));
    angleRad = Math.acos(cosTheta);
    angleDeg = (angleRad * 180) / Math.PI;
  }

  // Cross product u x v
  const crossX = u2 * v3 - u3 * v2;
  const crossY = u3 * v1 - u1 * v3;
  const crossZ = u1 * v2 - u2 * v1;
  const magCross = Math.sqrt(crossX * crossX + crossY * crossY + crossZ * crossZ);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Compass}
            title="3D Vector Mathematics & Dot/Cross Product Tool"
            description="Compute 3D vector magnitudes, dot product, cross product (u × v), and angle θ between vectors with zero-magnitude protection."
          />
          <ResetButton onReset={() => {
            setU1(2); setU2(3); setU3(4);
            setV1(1); setV2(-2); setV3(2);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Vector u (x, y, z)</h3>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="u_x" type="number" value={u1} onChange={(e) => setU1(Number(e.target.value))} />
              <InputField label="u_y" type="number" value={u2} onChange={(e) => setU2(Number(e.target.value))} />
              <InputField label="u_z" type="number" value={u3} onChange={(e) => setU3(Number(e.target.value))} />
            </div>
            <p className="text-xs text-slate-500 font-mono text-center">|u| = {magU.toFixed(3)}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Vector v (x, y, z)</h3>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="v_x" type="number" value={v1} onChange={(e) => setV1(Number(e.target.value))} />
              <InputField label="v_y" type="number" value={v2} onChange={(e) => setV2(Number(e.target.value))} />
              <InputField label="v_z" type="number" value={v3} onChange={(e) => setV3(Number(e.target.value))} />
            </div>
            <p className="text-xs text-slate-500 font-mono text-center">|v| = {magV.toFixed(3)}</p>
          </div>
        </div>

        <ResultCard variant="dark" title="Vector Calculation Results">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Dot Product (u · v)</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">{dotProduct.toFixed(2)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Scalar product</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Angle Between (θ)</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                {angleDeg !== null ? `${angleDeg.toFixed(1)}°` : "Undefined"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {angleRad !== null ? `${angleRad.toFixed(3)} rad` : "Zero vector"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Cross Product (u × v)</span>
              <p className="text-xl font-mono font-bold text-white mt-3">
                ({crossX}, {crossY}, {crossZ})
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">|u × v| = {magCross.toFixed(2)}</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Geometric Relation</span>
              <p className="text-sm font-bold text-slate-200 mt-1">
                {magU === 0 || magV === 0 ? "Zero Vector Present" :
                 dotProduct === 0 ? "Orthogonal (90°)" :
                 Math.abs(dotProduct / (magU * magV)) >= 0.999 ? "Collinear (Parallel)" : "Oblique"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
