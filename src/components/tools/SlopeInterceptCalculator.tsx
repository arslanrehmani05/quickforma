import React, { useState } from "react";
import { TrendingUp, Compass, Move, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SlopeInterceptCalculator: React.FC = () => {
  const [x1, setX1] = useState<number>(1);
  const [y1, setY1] = useState<number>(2);
  const [x2, setX2] = useState<number>(4);
  const [y2, setY2] = useState<number>(8);

  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const isCoincident = deltaX === 0 && deltaY === 0;
  const isVertical = deltaX === 0 && !isCoincident;
  const isHorizontal = deltaY === 0 && !isCoincident;

  const slope = !isVertical && !isCoincident ? deltaY / deltaX : null;
  const interceptB = !isVertical && !isCoincident && slope !== null ? y1 - slope * x1 : null;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const angleDeg = !isCoincident
    ? isVertical ? 90 : (Math.atan(slope!) * 180) / Math.PI
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={TrendingUp}
            title="Two-Point Slope & Line Equation (y = mx + b) Solver"
            description="Find line slope (m), y-intercept (b), standard line equation, Euclidean distance, and midpoint with vertical line detection."
          />
          <ResetButton onReset={() => {
            setX1(1); setY1(2); setX2(4); setY2(8);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Point 1 (x₁, y₁)</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="x₁" type="number" value={x1} onChange={(e) => setX1(Number(e.target.value))} />
              <InputField label="y₁" type="number" value={y1} onChange={(e) => setY1(Number(e.target.value))} />
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Point 2 (x₂, y₂)</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="x₂" type="number" value={x2} onChange={(e) => setX2(Number(e.target.value))} />
              <InputField label="y₂" type="number" value={y2} onChange={(e) => setY2(Number(e.target.value))} />
            </div>
          </div>
        </div>

        {isCoincident && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            Points are identical (coincident). A unique line requires two distinct coordinates.
          </div>
        )}

        <ResultCard variant="dark" title="Line Equation & Geometric Metrics">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Slope (m)</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {isCoincident ? "—" : isVertical ? "Undefined" : slope!.toFixed(3)}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {isVertical ? "Vertical Line (Δx = 0)" : `Δy/Δx = ${deltaY}/${deltaX}`}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Equation</span>
              <p className="text-lg font-mono font-bold text-white mt-3">
                {isCoincident ? "Point: (" + x1 + ", " + y1 + ")" :
                 isVertical ? `x = ${x1}` :
                 isHorizontal ? `y = ${y1}` :
                 `y = ${slope!.toFixed(2)}x ${interceptB! >= 0 ? `+ ${interceptB!.toFixed(2)}` : `- ${Math.abs(interceptB!).toFixed(2)}`}`}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">
                y-intercept: {!isVertical && interceptB !== null ? interceptB.toFixed(2) : "None"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Segment Distance</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">{distance.toFixed(3)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">√(Δx² + Δy²)</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Midpoint & Angle</span>
              <p className="text-lg font-mono font-bold text-white mt-2">({midX.toFixed(1)}, {midY.toFixed(1)})</p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {angleDeg !== null ? `Inclination: ${angleDeg.toFixed(1)}°` : "No angle"}
              </span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
