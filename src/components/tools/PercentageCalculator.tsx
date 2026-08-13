import React, { useState, useMemo } from 'react';
import { Percent, Calculator, ArrowRightLeft, TrendingUp, HelpCircle } from 'lucide-react';

type Mode = 'percentageOf' | 'whatPercentage' | 'percentageChange' | 'percentageDifference';

export const PercentageCalculator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>('percentageOf');

  // Mode 1 State: What is X% of Y?
  const [percentVal, setPercentVal] = useState<string>('15');
  const [ofNumberVal, setOfNumberVal] = useState<string>('200');

  // Mode 2 State: X is what percentage of Y?
  const [partVal, setPartVal] = useState<string>('30');
  const [wholeVal, setWholeVal] = useState<string>('200');

  // Mode 3 State: Percentage Change (Original -> New)
  const [originalVal, setOriginalVal] = useState<string>('80');
  const [newVal, setNewVal] = useState<string>('100');

  // Mode 4 State: Percentage Difference between A and B
  const [valueA, setValueA] = useState<string>('80');
  const [valueB, setValueB] = useState<string>('100');

  // --- Calculations ---

  // Mode 1: What is X% of Y?
  const calcMode1 = useMemo(() => {
    const p = parseFloat(percentVal);
    const y = parseFloat(ofNumberVal);
    if (isNaN(p) || isNaN(y)) return null;

    const result = (p / 100) * y;
    return { p, y, result };
  }, [percentVal, ofNumberVal]);

  // Mode 2: X is what percentage of Y?
  const calcMode2 = useMemo(() => {
    const part = parseFloat(partVal);
    const whole = parseFloat(wholeVal);
    if (isNaN(part) || isNaN(whole)) return null;
    if (whole === 0) return { error: 'Enter a whole number greater than zero.' };

    const result = (part / whole) * 100;
    return { part, whole, result };
  }, [partVal, wholeVal]);

  // Mode 3: Percentage Change
  const calcMode3 = useMemo(() => {
    const orig = parseFloat(originalVal);
    const n = parseFloat(newVal);
    if (isNaN(orig) || isNaN(n)) return null;
    if (orig === 0) return { error: 'Percentage change cannot be calculated from an original value of zero.' };

    const diff = n - orig;
    const change = (diff / orig) * 100;
    const isIncrease = change > 0;
    const isDecrease = change < 0;

    return { orig, n, diff, change, isIncrease, isDecrease };
  }, [originalVal, newVal]);

  // Mode 4: Percentage Difference
  const calcMode4 = useMemo(() => {
    const a = parseFloat(valueA);
    const b = parseFloat(valueB);
    if (isNaN(a) || isNaN(b)) return null;

    const absDiff = Math.abs(a - b);
    const avg = (a + b) / 2;
    if (avg === 0 && absDiff === 0) {
      return { error: 'Percentage difference is undefined when both values are zero.' };
    }

    const difference = (absDiff / Math.abs(avg)) * 100;
    return { a, b, absDiff, avg, difference };
  }, [valueA, valueB]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Tool Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        {/* Tool Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Percentage Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate percentages, percentage values, percentage increases, decreases, and differences.</p>
          </div>
        </div>

        {/* Mode Selector Bar */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveMode('percentageOf')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'percentageOf'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Percentage of a Number</span>
          </button>

          <button
            onClick={() => setActiveMode('whatPercentage')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'whatPercentage'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>What Percentage?</span>
          </button>

          <button
            onClick={() => setActiveMode('percentageChange')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'percentageChange'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Percentage Change</span>
          </button>

          <button
            onClick={() => setActiveMode('percentageDifference')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'percentageDifference'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Percentage Difference</span>
          </button>
        </div>

        {/* ================= MODE 1: PERCENTAGE OF A NUMBER ================= */}
        {activeMode === 'percentageOf' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Percentage (X)</label>
                <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/10">
                  <input
                    type="number"
                    step="any"
                    value={percentVal}
                    onChange={(e) => setPercentVal(e.target.value)}
                    className="w-full bg-transparent text-slate-900 text-sm font-mono font-bold focus:outline-none"
                    placeholder="e.g. 15"
                  />
                  <span className="text-xs text-slate-400 font-bold">%</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Number (Y)</label>
                <input
                  type="number"
                  step="any"
                  value={ofNumberVal}
                  onChange={(e) => setOfNumberVal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:border-indigo-600"
                  placeholder="e.g. 200"
                />
              </div>
            </div>

            {/* Result Display */}
            {calcMode1 !== null && (
              <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  {calcMode1.p}% OF {calcMode1.y}
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 tracking-tight">
                  {calcMode1.result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <p className="text-slate-600 text-xs pt-2 border-t border-indigo-100">
                  Formula: ({calcMode1.p} ÷ 100) × {calcMode1.y} = {calcMode1.result.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================= MODE 2: WHAT PERCENTAGE? ================= */}
        {activeMode === 'whatPercentage' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Part (X)</label>
                <input
                  type="number"
                  step="any"
                  value={partVal}
                  onChange={(e) => setPartVal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:border-indigo-600"
                  placeholder="e.g. 30"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Whole (Y)</label>
                <input
                  type="number"
                  step="any"
                  value={wholeVal}
                  onChange={(e) => setWholeVal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:border-indigo-600"
                  placeholder="e.g. 200"
                />
              </div>
            </div>

            {/* Result Display */}
            {calcMode2 !== null && (
              'error' in calcMode2 ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                  {calcMode2.error}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                    {calcMode2.part} IS WHAT PERCENTAGE OF {calcMode2.whole}?
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 tracking-tight">
                    {calcMode2.result.toFixed(2)}%
                  </div>
                  <p className="text-slate-600 text-xs pt-2 border-t border-indigo-100">
                    Formula: ({calcMode2.part} ÷ {calcMode2.whole}) × 100 = {calcMode2.result.toFixed(2)}%
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* ================= MODE 3: PERCENTAGE CHANGE ================= */}
        {activeMode === 'percentageChange' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Original Value</label>
                <input
                  type="number"
                  step="any"
                  value={originalVal}
                  onChange={(e) => setOriginalVal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:border-indigo-600"
                  placeholder="e.g. 80"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">New Value</label>
                <input
                  type="number"
                  step="any"
                  value={newVal}
                  onChange={(e) => setNewVal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:border-indigo-600"
                  placeholder="e.g. 100"
                />
              </div>
            </div>

            {/* Result Display */}
            {calcMode3 !== null && (
              'error' in calcMode3 ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                  {calcMode3.error}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">PERCENTAGE CHANGE</span>
                      <div className={`text-4xl sm:text-5xl font-extrabold mt-1 tracking-tight ${
                        calcMode3.change > 0 ? 'text-emerald-600' : calcMode3.change < 0 ? 'text-rose-600' : 'text-slate-900'
                      }`}>
                        {calcMode3.change > 0 ? `+${calcMode3.change.toFixed(2)}%` : `${calcMode3.change.toFixed(2)}%`}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-indigo-100">
                        <span className="text-slate-500 block text-[10px] font-semibold uppercase">Absolute Difference</span>
                        <span className="text-slate-900 font-bold text-sm">
                          {calcMode3.diff > 0 ? `+${calcMode3.diff.toFixed(2)}` : calcMode3.diff.toFixed(2)}
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-indigo-100">
                        <span className="text-slate-500 block text-[10px] font-semibold uppercase">Direction</span>
                        <span className={`font-bold text-sm ${calcMode3.isIncrease ? 'text-emerald-600' : calcMode3.isDecrease ? 'text-rose-600' : 'text-slate-600'}`}>
                          {calcMode3.isIncrease ? 'Increase' : calcMode3.isDecrease ? 'Decrease' : 'No Change'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs pt-3 border-t border-indigo-100">
                    Changing from <strong>{calcMode3.orig}</strong> to <strong>{calcMode3.n}</strong> represents a <strong>{Math.abs(calcMode3.change).toFixed(2)}% {calcMode3.isIncrease ? 'increase' : calcMode3.isDecrease ? 'decrease' : 'change'}</strong> (difference of {calcMode3.diff > 0 ? '+' : ''}{calcMode3.diff.toFixed(2)}).
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* ================= MODE 4: PERCENTAGE DIFFERENCE ================= */}
        {activeMode === 'percentageDifference' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Value A</label>
                <input
                  type="number"
                  step="any"
                  value={valueA}
                  onChange={(e) => setValueA(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:border-indigo-600"
                  placeholder="e.g. 80"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Value B</label>
                <input
                  type="number"
                  step="any"
                  value={valueB}
                  onChange={(e) => setValueB(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:border-indigo-600"
                  placeholder="e.g. 100"
                />
              </div>
            </div>

            {/* Result Display */}
            {calcMode4 !== null && (
              'error' in calcMode4 ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                  {calcMode4.error}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">PERCENTAGE DIFFERENCE</span>
                      <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 mt-1 tracking-tight">
                        {calcMode4.difference.toFixed(2)}%
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-indigo-100">
                        <span className="text-slate-500 block text-[10px] font-semibold uppercase">Absolute Difference</span>
                        <span className="text-slate-900 font-bold text-sm">{calcMode4.absDiff.toFixed(2)}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-indigo-100">
                        <span className="text-slate-500 block text-[10px] font-semibold uppercase">Average of A & B</span>
                        <span className="text-slate-900 font-bold text-sm">{calcMode4.avg.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 pt-3 border-t border-indigo-100 text-xs text-slate-600">
                    <p>
                      Formula: (|{calcMode4.a} - {calcMode4.b}| ÷ (({calcMode4.a} + {calcMode4.b}) ÷ 2)) × 100 = <strong>{calcMode4.difference.toFixed(2)}%</strong>
                    </p>
                    <p className="text-[11px] text-slate-500 italic">
                      Note: Percentage difference compares two values relative to their average. It does not treat either value as a starting point.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Footer Note */}
        <div className="pt-4 border-t border-slate-200 text-slate-500 text-xs leading-relaxed">
          <p>
            <strong>Note:</strong> Percentage Change treats the original value as the reference point, whereas Percentage Difference calculates symmetric variation relative to the average of both numbers.
          </p>
        </div>
      </div>
    </div>
  );
};
