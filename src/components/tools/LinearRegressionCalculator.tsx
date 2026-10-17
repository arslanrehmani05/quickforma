import React, { useState } from "react";
import { LineChart, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const LinearRegressionCalculator: React.FC = () => {
  const [dataPoints, setDataPoints] = useState("1, 2.5\n2, 3.8\n3, 5.1\n4, 6.9\n5, 8.2");
  const [predictX, setPredictX] = useState<number>(6);

  const calculateRegression = () => {
    const lines = dataPoints.trim().split("\n");
    const points: Array<[number, number]> = [];
    for (const l of lines) {
      const parts = l.split(/[,\s]+/).map(Number);
      if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        points.push([parts[0], parts[1]]);
      }
    }
    const n = points.length;
    if (n < 2) return null;

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    points.forEach(([x, y]) => {
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumX2 += x * x;
      sumY2 += y * y;
    });

    const denom = n * sumX2 - sumX * sumX;
    if (denom === 0) return null;

    const slope = (n * sumXY - sumX * sumY) / denom;
    const intercept = (sumY - slope * sumX) / n;

    // r calculation
    const rDenom = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    const r = rDenom !== 0 ? (n * sumXY - sumX * sumY) / rDenom : 0;
    const r2 = r * r;

    const predictedY = slope * (predictX || 0) + intercept;

    return { slope, intercept, r, r2, n, predictedY };
  };

  const res = calculateRegression();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={LineChart}
            title="Simple Linear Regression & R² Line of Best Fit"
            description="Fit a bivariate linear model, compute slope, intercept, Pearson correlation coefficient, and R² variance explained."
          />
          <ResetButton onReset={() => {
            setDataPoints("1, 2.5\n2, 3.8\n3, 5.1\n4, 6.9\n5, 8.2");
            setPredictX(6);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Coordinate Points (X, Y per line)</label>
              <textarea
                rows={6}
                value={dataPoints}
                onChange={(e) => setDataPoints(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-900 outline-none focus:border-indigo-600"
                placeholder="1, 2.5&#10;2, 3.8"
              />
            </div>
            <InputField
              label="Predict Dependent Y at X Value"
              type="number"
              value={predictX}
              onChange={(e) => setPredictX(Number(e.target.value))}
            />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Regression Line Model">
              {res ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Line Equation (y = mx + b)</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      y = {res.slope.toFixed(4)}x {res.intercept >= 0 ? "+" : "-"} {Math.abs(res.intercept).toFixed(4)}
                    </div>
                    <p className="text-xs text-slate-400">
                      R² (Coefficient of Determination): <strong className="text-emerald-400">{(res.r2 * 100).toFixed(2)}%</strong>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[11px] text-slate-400 block">Correlation (r)</span>
                      <span className="text-base font-bold text-white font-mono">{res.r.toFixed(4)}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[11px] text-slate-400 block">Predicted Y at X={predictX}</span>
                      <span className="text-base font-bold text-emerald-400 font-mono">{res.predictedY.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-rose-400 text-xs">Please provide at least 2 valid coordinate points.</div>
              )}
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
