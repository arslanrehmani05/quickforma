import React, { useState } from "react";
import { BarChart3, Plus, Trash2, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface ChiRow {
  id: string;
  category: string;
  observed: number;
  expected: number;
}

export const ChiSquareCalculator: React.FC = () => {
  const [rows, setRows] = useState<ChiRow[]>([
    { id: "1", category: "Category A", observed: 25, expected: 20 },
    { id: "2", category: "Category B", observed: 15, expected: 20 },
    { id: "3", category: "Category C", observed: 18, expected: 20 },
    { id: "4", category: "Category D", observed: 22, expected: 20 },
  ]);

  const df = Math.max(1, rows.length - 1);
  const hasInvalidExpected = rows.some((r) => Number(r.expected) <= 0);

  // Chi-Square statistic: sum((O - E)^2 / E)
  const chiSquare = !hasInvalidExpected ? rows.reduce((acc, r) => {
    const o = Math.max(0, Number(r.observed) || 0);
    const e = Math.max(0.0001, Number(r.expected) || 1);
    return acc + Math.pow(o - e, 2) / e;
  }, 0) : null;

  // Critical values for alpha = 0.05
  const critValues05: { [df: number]: number } = {
    1: 3.841, 2: 5.991, 3: 7.815, 4: 9.488, 5: 11.070, 6: 12.592, 7: 14.067, 8: 15.507, 9: 16.919, 10: 18.307
  };
  const critVal = critValues05[df] || (df + 2 * Math.sqrt(2 * df));
  const isSignificant = chiSquare !== null && chiSquare > critVal;

  const addRow = () => {
    setRows([...rows, { id: Date.now().toString(), category: `Category ${String.fromCharCode(65 + rows.length)}`, observed: 20, expected: 20 }]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 2) setRows(rows.filter((r) => r.id !== id));
  };

  const updateRow = (id: string, field: keyof ChiRow, val: any) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BarChart3}
            title="Chi-Square (χ²) Goodness-of-Fit Test Solver"
            description="Calculate Chi-Square test statistic Σ((O - E)² / E), degrees of freedom, and statistical significance at α = 0.05."
          />
          <ResetButton onReset={() => {
            setRows([
              { id: "1", category: "Category A", observed: 25, expected: 20 },
              { id: "2", category: "Category B", observed: 15, expected: 20 },
              { id: "3", category: "Category C", observed: 18, expected: 20 },
              { id: "4", category: "Category D", observed: 22, expected: 20 },
            ]);
          }} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Observed vs Expected Frequencies</h3>
            <Button size="sm" variant="secondary" onClick={addRow} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Category
            </Button>
          </div>

          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="col-span-5">
                  <input
                    type="text"
                    value={r.category}
                    onChange={(e) => updateRow(r.id, "category", e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-500">Obs:</span>
                    <input
                      type="number"
                      min={0}
                      value={r.observed}
                      onChange={(e) => updateRow(r.id, "observed", Number(e.target.value))}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-500">Exp:</span>
                    <input
                      type="number"
                      min={0.1}
                      step="0.1"
                      value={r.expected}
                      onChange={(e) => updateRow(r.id, "expected", Number(e.target.value))}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeRow(r.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {hasInvalidExpected && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
            Expected frequency for every category must be strictly greater than 0 to compute (O - E)² / E.
          </div>
        )}

        <ResultCard variant="dark" title="Chi-Square Statistical Result">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">χ² Statistic</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {chiSquare !== null ? chiSquare.toFixed(3) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Σ (O-E)² / E</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Degrees of Freedom</span>
              <p className="text-4xl font-extrabold text-white mt-1">{df}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">k - 1 categories</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Critical Value (α=.05)</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">{critVal.toFixed(2)}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Threshold for reject</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Hypothesis Test</span>
              <p className={`text-sm font-bold mt-1 ${isSignificant ? "text-amber-300" : "text-emerald-300"}`}>
                {chiSquare === null ? "—" : isSignificant ? "Reject H₀ (Significant)" : "Fail to Reject H₀"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {chiSquare === null ? "Fix expected values" : isSignificant ? "Observed ≠ Expected" : "Fits Expected Distribution"}
              </span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
