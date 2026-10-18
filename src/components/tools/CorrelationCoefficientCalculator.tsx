import React, { useState } from "react";
import { TrendingUp, BarChart2, Activity, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CorrelationCoefficientCalculator: React.FC = () => {
  const [xText, setXText] = useState<string>("10, 15, 20, 25, 30, 35");
  const [yText, setYText] = useState<string>("15, 22, 28, 32, 40, 48");

  const parseNums = (str: string) => str.split(/[,\s]+/).map(Number).filter((n) => !isNaN(n));
  const rawXs = parseNums(xText);
  const rawYs = parseNums(yText);
  const n = Math.min(rawXs.length, rawYs.length);

  const xs = rawXs.slice(0, n);
  const ys = rawYs.slice(0, n);

  const meanX = n > 0 ? xs.reduce((a, b) => a + b, 0) / n : 0;
  const meanY = n > 0 ? ys.reduce((a, b) => a + b, 0) / n : 0;

  let sumDxDy = 0;
  let sumDx2 = 0;
  let sumDy2 = 0;

  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    sumDxDy += dx * dy;
    sumDx2 += dx * dx;
    sumDy2 += dy * dy;
  }

  const denom = Math.sqrt(sumDx2 * sumDy2);
  const isZeroVariance = denom === 0;
  const r = n >= 2 && !isZeroVariance ? sumDxDy / denom : null;
  const rSquared = r !== null ? r * r : null;
  const covariance = n > 1 ? sumDxDy / (n - 1) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={TrendingUp}
            title="Pearson Correlation Coefficient (r) & R² Solver"
            description="Calculate Pearson product-moment correlation (r), coefficient of determination (R²), and sample covariance with zero-variance detection."
          />
          <ResetButton onReset={() => {
            setXText("10, 15, 20, 25, 30, 35");
            setYText("15, 22, 28, 32, 40, 48");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Variable X Values (comma/space separated)
            </label>
            <textarea
              rows={3}
              value={xText}
              onChange={(e) => setXText(e.target.value)}
              className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 bg-white"
            />
            <p className="text-[11px] text-slate-500 mt-1">Mean X: {meanX.toFixed(2)}</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Variable Y Values (comma/space separated)
            </label>
            <textarea
              rows={3}
              value={yText}
              onChange={(e) => setYText(e.target.value)}
              className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 bg-white"
            />
            <p className="text-[11px] text-slate-500 mt-1">Mean Y: {meanY.toFixed(2)}</p>
          </div>
        </div>

        {isZeroVariance && n >= 2 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            One or both variables have zero variance (all values are identical). Correlation r is mathematically undefined.
          </div>
        )}

        <ResultCard variant="dark" title="Correlation Metrics (n = {n} pairs)">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Pearson r</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {r !== null ? r.toFixed(3) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Scale: -1.0 to +1.0</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">R² (Variance Explained)</span>
              <p className="text-4xl font-extrabold text-white mt-1">
                {rSquared !== null ? `${(rSquared * 100).toFixed(1)}%` : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {rSquared !== null ? `R² = ${rSquared.toFixed(3)}` : "Needs variance"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Sample Covariance</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                {covariance !== null ? covariance.toFixed(2) : "—"}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Cov(X, Y)</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Relationship Strength</span>
              <p className="text-sm font-bold text-slate-200 mt-1">
                {r === null ? "Insufficient Data" :
                 Math.abs(r) >= 0.8 ? "Very Strong Correlation" :
                 Math.abs(r) >= 0.5 ? "Moderate Correlation" : "Weak / Negligible Correlation"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
