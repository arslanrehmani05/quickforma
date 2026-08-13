import React, { useState, useMemo } from 'react';
import { Divide, Plus, Minus, X, Calculator, RefreshCw, ArrowRightLeft, Percent, HelpCircle, Layers, AlertCircle, Trash2 } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

// GCD Helper
const gcd = (a: number, b: number): number => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
};

// Fraction Interface & Normalization
interface Fraction {
  n: number; // numerator
  d: number; // denominator
}

const normalizeFraction = (num: number, den: number): Fraction => {
  if (den === 0) return { n: 0, d: 0 }; // invalid flag
  if (num === 0) return { n: 0, d: 1 };

  let n = num;
  let d = den;
  if (d < 0) {
    n = -n;
    d = -d;
  }

  const common = gcd(n, d);
  return { n: n / common, d: d / common };
};

const toMixedNumber = (frac: Fraction): { whole: number; num: number; den: number } => {
  if (frac.d === 0) return { whole: 0, num: 0, den: 0 };
  const absN = Math.abs(frac.n);
  const whole = Math.floor(absN / frac.d) * (frac.n < 0 ? -1 : 1);
  const num = absN % frac.d;
  return { whole, num, den: frac.d };
};

type Mode = 'arithmetic' | 'simplify' | 'mixedImproper' | 'decimal' | 'percentage' | 'compare' | 'expression';
type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export const FractionCalculator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>('arithmetic');

  // Mode 1 State: Arithmetic
  const [op, setOp] = useState<Operation>('add');
  const [f1W, setF1W] = useState<string>('0');
  const [f1N, setF1N] = useState<string>('2');
  const [f1D, setF1D] = useState<string>('3');

  const [f2W, setF2W] = useState<string>('0');
  const [f2N, setF2N] = useState<string>('3');
  const [f2D, setF2D] = useState<string>('4');

  // Mode 2 State: Simplify
  const [simpNum, setSimpNum] = useState<string>('24');
  const [simpDen, setSimpDen] = useState<string>('36');

  // Mode 3 State: Mixed ↔ Improper
  const [mixW, setMixW] = useState<string>('2');
  const [mixN, setMixN] = useState<string>('3');
  const [mixD, setMixD] = useState<string>('5');
  const [impNum, setImpNum] = useState<string>('17');
  const [impDen, setImpDen] = useState<string>('4');
  const [mixDirection, setMixDirection] = useState<'mixedToImp' | 'impToMixed'>('mixedToImp');

  // Mode 4 State: Fraction ↔ Decimal
  const [decFracN, setDecFracN] = useState<string>('3');
  const [decFracD, setDecFracD] = useState<string>('8');
  const [decimalVal, setDecimalVal] = useState<string>('0.625');
  const [decDirection, setDecDirection] = useState<'fracToDec' | 'decToFrac'>('fracToDec');

  // Mode 5 State: Fraction ↔ Percentage
  const [pctFracN, setPctFracN] = useState<string>('3');
  const [pctFracD, setPctFracD] = useState<string>('4');
  const [pctVal, setPctVal] = useState<string>('62.5');
  const [pctDirection, setPctDirection] = useState<'fracToPct' | 'pctToFrac'>('fracToPct');

  // Mode 6 State: Compare
  const [comp1N, setComp1N] = useState<string>('3');
  const [comp1D, setComp1D] = useState<string>('5');
  const [comp2N, setComp2N] = useState<string>('7');
  const [comp2D, setComp2D] = useState<string>('12');

  // Mode 7 State: Expression Builder
  const [expRows, setExpRows] = useState<{ n: string; d: string; op: Operation }[]>([
    { n: '2', d: '3', op: 'add' },
    { n: '1', d: '4', op: 'subtract' },
    { n: '1', d: '6', op: 'add' },
  ]);

  // --- Calculations ---

  // Helper to parse input values to improper fraction
  const parseToFraction = (wStr: string, nStr: string, dStr: string): Fraction | null => {
    const w = parseInt(wStr || '0', 10);
    const n = parseInt(nStr || '0', 10);
    const d = parseInt(dStr || '1', 10);

    if (isNaN(w) || isNaN(n) || isNaN(d)) return null;
    if (d === 0) return { n: 0, d: 0 }; // invalid

    const isNegative = w < 0 || n < 0;
    const absW = Math.abs(w);
    const absN = Math.abs(n);

    const improperN = (absW * d + absN) * (isNegative ? -1 : 1);
    return normalizeFraction(improperN, d);
  };

  // Mode 1: Arithmetic Calc
  const calcMode1 = useMemo(() => {
    const frac1 = parseToFraction(f1W, f1N, f1D);
    const frac2 = parseToFraction(f2W, f2N, f2D);

    if (!frac1 || !frac2) return null;
    if (frac1.d === 0 || frac2.d === 0) return { error: 'Denominator cannot be zero.' };

    let resN = 0;
    let resD = 1;
    let stepText = '';

    if (op === 'add') {
      resN = frac1.n * frac2.d + frac2.n * frac1.d;
      resD = frac1.d * frac2.d;
      stepText = `(${frac1.n} × ${frac2.d} + ${frac2.n} × ${frac1.d}) ÷ (${frac1.d} × ${frac2.d}) = ${resN}/${resD}`;
    } else if (op === 'subtract') {
      resN = frac1.n * frac2.d - frac2.n * frac1.d;
      resD = frac1.d * frac2.d;
      stepText = `(${frac1.n} × ${frac2.d} - ${frac2.n} × ${frac1.d}) ÷ (${frac1.d} × ${frac2.d}) = ${resN}/${resD}`;
    } else if (op === 'multiply') {
      resN = frac1.n * frac2.n;
      resD = frac1.d * frac2.d;
      stepText = `(${frac1.n} × ${frac2.n}) ÷ (${frac1.d} × ${frac2.d}) = ${resN}/${resD}`;
    } else if (op === 'divide') {
      if (frac2.n === 0) return { error: 'Cannot divide by zero fraction.' };
      resN = frac1.n * frac2.d;
      resD = frac1.d * frac2.n;
      stepText = `(${frac1.n} × ${frac2.d}) ÷ (${frac1.d} × ${frac2.n}) = ${resN}/${resD}`;
    }

    const norm = normalizeFraction(resN, resD);
    const mixed = toMixedNumber(norm);
    const decimal = norm.n / norm.d;
    const percentage = decimal * 100;

    return { frac1, frac2, norm, mixed, decimal, percentage, stepText };
  }, [op, f1W, f1N, f1D, f2W, f2N, f2D]);

  // Mode 2: Simplify Calc
  const calcMode2 = useMemo(() => {
    const num = parseInt(simpNum || '0', 10);
    const den = parseInt(simpDen || '1', 10);

    if (isNaN(num) || isNaN(den)) return null;
    if (den === 0) return { error: 'Denominator cannot be zero.' };

    const common = gcd(num, den);
    const norm = normalizeFraction(num, den);
    const mixed = toMixedNumber(norm);
    const decimal = norm.n / norm.d;

    return { origNum: num, origDen: den, common, norm, mixed, decimal };
  }, [simpNum, simpDen]);

  // Mode 3: Mixed ↔ Improper Calc
  const calcMode3 = useMemo(() => {
    if (mixDirection === 'mixedToImp') {
      const w = parseInt(mixW || '0', 10);
      const n = parseInt(mixN || '0', 10);
      const d = parseInt(mixD || '1', 10);

      if (isNaN(w) || isNaN(n) || isNaN(d)) return null;
      if (d === 0) return { error: 'Denominator cannot be zero.' };

      const frac = parseToFraction(mixW, mixN, mixD);
      return { type: 'mixedToImp', frac };
    } else {
      const num = parseInt(impNum || '0', 10);
      const den = parseInt(impDen || '1', 10);

      if (isNaN(num) || isNaN(den)) return null;
      if (den === 0) return { error: 'Denominator cannot be zero.' };

      const norm = normalizeFraction(num, den);
      const mixed = toMixedNumber(norm);
      return { type: 'impToMixed', norm, mixed };
    }
  }, [mixDirection, mixW, mixN, mixD, impNum, impDen]);

  // Mode 4: Fraction ↔ Decimal Calc
  const calcMode4 = useMemo(() => {
    if (decDirection === 'fracToDec') {
      const n = parseInt(decFracN || '0', 10);
      const d = parseInt(decFracD || '1', 10);
      if (isNaN(n) || isNaN(d)) return null;
      if (d === 0) return { error: 'Denominator cannot be zero.' };

      const decimal = n / d;
      return { type: 'fracToDec', n, d, decimal };
    } else {
      const val = parseFloat(decimalVal);
      if (isNaN(val)) return null;

      // Convert decimal to exact fraction
      const len = (decimalVal.split('.')[1] || '').length;
      const den = Math.pow(10, len);
      const num = Math.round(val * den);

      const norm = normalizeFraction(num, den);
      const mixed = toMixedNumber(norm);

      return { type: 'decToFrac', val, norm, mixed };
    }
  }, [decDirection, decFracN, decFracD, decimalVal]);

  // Mode 5: Fraction ↔ Percentage Calc
  const calcMode5 = useMemo(() => {
    if (pctDirection === 'fracToPct') {
      const n = parseInt(pctFracN || '0', 10);
      const d = parseInt(pctFracD || '1', 10);
      if (isNaN(n) || isNaN(d)) return null;
      if (d === 0) return { error: 'Denominator cannot be zero.' };

      const pct = (n / d) * 100;
      return { type: 'fracToPct', n, d, pct };
    } else {
      const val = parseFloat(pctVal);
      if (isNaN(val)) return null;

      const dec = val / 100;
      const len = (val.toString().split('.')[1] || '').length + 2;
      const den = Math.pow(10, len);
      const num = Math.round(dec * den);

      const norm = normalizeFraction(num, den);
      const mixed = toMixedNumber(norm);

      return { type: 'pctToFrac', val, norm, mixed };
    }
  }, [pctDirection, pctFracN, pctFracD, pctVal]);

  // Mode 6: Compare Calc
  const calcMode6 = useMemo(() => {
    const f1 = normalizeFraction(parseInt(comp1N || '0', 10), parseInt(comp1D || '1', 10));
    const f2 = normalizeFraction(parseInt(comp2N || '0', 10), parseInt(comp2D || '1', 10));

    if (f1.d === 0 || f2.d === 0) return { error: 'Denominator cannot be zero.' };

    const cross1 = f1.n * f2.d;
    const cross2 = f2.n * f1.d;

    let symbol = '=';
    if (cross1 > cross2) symbol = '>';
    else if (cross1 < cross2) symbol = '<';

    const d1 = f1.n / f1.d;
    const d2 = f2.n / f2.d;

    return { f1, f2, cross1, cross2, symbol, d1, d2 };
  }, [comp1N, comp1D, comp2N, comp2D]);

  // Mode 7: Expression Builder Calc
  const calcMode7 = useMemo(() => {
    if (expRows.length === 0) return null;

    let current = normalizeFraction(parseInt(expRows[0].n || '0', 10), parseInt(expRows[0].d || '1', 10));
    if (current.d === 0) return { error: 'Denominator cannot be zero.' };

    for (let i = 1; i < expRows.length; i++) {
      const row = expRows[i];
      const nextFrac = normalizeFraction(parseInt(row.n || '0', 10), parseInt(row.d || '1', 10));
      if (nextFrac.d === 0) return { error: 'Denominator cannot be zero.' };

      const prevOp = expRows[i - 1].op;
      let resN = 0;
      let resD = 1;

      if (prevOp === 'add') {
        resN = current.n * nextFrac.d + nextFrac.n * current.d;
        resD = current.d * nextFrac.d;
      } else if (prevOp === 'subtract') {
        resN = current.n * nextFrac.d - nextFrac.n * current.d;
        resD = current.d * nextFrac.d;
      } else if (prevOp === 'multiply') {
        resN = current.n * nextFrac.n;
        resD = current.d * nextFrac.d;
      } else if (prevOp === 'divide') {
        if (nextFrac.n === 0) return { error: 'Cannot divide by zero fraction.' };
        resN = current.n * nextFrac.d;
        resD = current.d * nextFrac.n;
      }

      current = normalizeFraction(resN, resD);
    }

    const mixed = toMixedNumber(current);
    const decimal = current.n / current.d;

    return { norm: current, mixed, decimal };
  }, [expRows]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tool Main Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        {/* Tool Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Divide className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Fraction Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate, simplify, convert, and compare fractions with step-by-step precision.</p>
          </div>
        </div>

        {/* Mode Switcher Bar */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveMode('arithmetic')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'arithmetic'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculate (+ - × ÷)</span>
          </button>

          <button
            onClick={() => setActiveMode('simplify')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'simplify'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Simplify Fraction</span>
          </button>

          <button
            onClick={() => setActiveMode('mixedImproper')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'mixedImproper'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mixed ↔ Improper</span>
          </button>

          <button
            onClick={() => setActiveMode('decimal')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'decimal'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Fraction ↔ Decimal</span>
          </button>

          <button
            onClick={() => setActiveMode('percentage')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'percentage'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>Fraction ↔ %</span>
          </button>

          <button
            onClick={() => setActiveMode('compare')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'compare'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Compare</span>
          </button>

          <button
            onClick={() => setActiveMode('expression')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'expression'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Expression Builder</span>
          </button>
        </div>

        {/* ================= MODE 1: ARITHMETIC ================= */}
        {activeMode === 'arithmetic' && (
          <div className="space-y-6">
            {/* Operator Switcher */}
            <div className="flex items-center justify-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 max-w-xs mx-auto">
              <button
                onClick={() => setOp('add')}
                className={`p-2.5 rounded-xl transition-all ${op === 'add' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200/50'}`}
                title="Add (+)"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setOp('subtract')}
                className={`p-2.5 rounded-xl transition-all ${op === 'subtract' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200/50'}`}
                title="Subtract (-)"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setOp('multiply')}
                className={`p-2.5 rounded-xl transition-all ${op === 'multiply' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200/50'}`}
                title="Multiply (×)"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={() => setOp('divide')}
                className={`p-2.5 rounded-xl transition-all ${op === 'divide' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200/50'}`}
                title="Divide (÷)"
              >
                <Divide className="w-4 h-4" />
              </button>
            </div>

            {/* Fraction Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Fraction 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-slate-700 text-xs font-semibold ">First Fraction</label>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">WHOLE</span>
                    <input
                      type="number"
                      value={f1W}
                      onChange={(e) => setF1W(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-mono font-bold text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">NUMERATOR</span>
                    <input
                      type="number"
                      value={f1N}
                      onChange={(e) => setF1N(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-mono font-bold text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">DENOMINATOR</span>
                    <input
                      type="number"
                      value={f1D}
                      onChange={(e) => setF1D(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-mono font-bold text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Fraction 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-slate-700 text-xs font-semibold ">Second Fraction</label>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">WHOLE</span>
                    <input
                      type="number"
                      value={f2W}
                      onChange={(e) => setF2W(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-mono font-bold text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">NUMERATOR</span>
                    <input
                      type="number"
                      value={f2N}
                      onChange={(e) => setF2N(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-mono font-bold text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">DENOMINATOR</span>
                    <input
                      type="number"
                      value={f2D}
                      onChange={(e) => setF2D(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-mono font-bold text-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Display */}
            {calcMode1 !== null && (
              'error' in calcMode1 ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{calcMode1.error}</span>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <span className="text-xs font-bold  text-indigo-700">Simplified Fraction</span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-indigo-950 mt-1 font-mono">
                        {calcMode1.norm.d === 1 ? calcMode1.norm.n : `${calcMode1.norm.n}/${calcMode1.norm.d}`}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase">Mixed Number</span>
                      <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
                        {calcMode1.mixed.whole !== 0 ? (
                          calcMode1.mixed.num !== 0 ? `${calcMode1.mixed.whole} ${calcMode1.mixed.num}/${calcMode1.mixed.den}` : calcMode1.mixed.whole
                        ) : (
                          calcMode1.mixed.num !== 0 ? `${calcMode1.mixed.num}/${calcMode1.mixed.den}` : '0'
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase">Decimal</span>
                      <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
                        {calcMode1.decimal.toFixed(4)}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase">Percentage</span>
                      <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
                        {calcMode1.percentage.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-indigo-100 pt-3 text-xs text-slate-600 space-y-1">
                    <p className="font-semibold text-slate-800">Calculation Steps:</p>
                    <p className="font-mono text-slate-700">{calcMode1.stepText}</p>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* ================= MODE 2: SIMPLIFY ================= */}
        {activeMode === 'simplify' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold  mb-2">Numerator</label>
                <input
                  type="number"
                  value={simpNum}
                  onChange={(e) => setSimpNum(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:border-indigo-600"
                  placeholder="e.g. 24"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold  mb-2">Denominator</label>
                <input
                  type="number"
                  value={simpDen}
                  onChange={(e) => setSimpDen(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:border-indigo-600"
                  placeholder="e.g. 36"
                />
              </div>
            </div>

            {/* Result Display */}
            {calcMode2 !== null && (
              'error' in calcMode2 ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{calcMode2.error}</span>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <span className="text-xs font-bold  text-indigo-700">Simplified Fraction</span>
                      <div className="text-4xl font-extrabold text-indigo-950 mt-1 font-mono">
                        {calcMode2.norm.d === 1 ? calcMode2.norm.n : `${calcMode2.norm.n}/${calcMode2.norm.d}`}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase">Greatest Common Divisor (GCD)</span>
                      <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">{calcMode2.common}</div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase">Decimal Value</span>
                      <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">{calcMode2.decimal.toFixed(4)}</div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs border-t border-indigo-100 pt-3">
                    Reduced by dividing numerator ({calcMode2.origNum}) and denominator ({calcMode2.origDen}) by GCD ({calcMode2.common}).
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* ================= MODE 3: MIXED ↔ IMPROPER ================= */}
        {activeMode === 'mixedImproper' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 text-xs max-w-md mx-auto">
              <button
                onClick={() => setMixDirection('mixedToImp')}
                className={`flex-1 py-2 rounded-xl font-semibold transition-all ${mixDirection === 'mixedToImp' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Mixed → Improper
              </button>
              <button
                onClick={() => setMixDirection('impToMixed')}
                className={`flex-1 py-2 rounded-xl font-semibold transition-all ${mixDirection === 'impToMixed' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Improper → Mixed
              </button>
            </div>

            {mixDirection === 'mixedToImp' ? (
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-slate-700 text-xs font-semibold  mb-1">Whole</label>
                  <input
                    type="number"
                    value={mixW}
                    onChange={(e) => setMixW(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-semibold  mb-1">Numerator</label>
                  <input
                    type="number"
                    value={mixN}
                    onChange={(e) => setMixN(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-semibold  mb-1">Denominator</label>
                  <input
                    type="number"
                    value={mixD}
                    onChange={(e) => setMixD(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-slate-700 text-xs font-semibold  mb-1">Improper Numerator</label>
                  <input
                    type="number"
                    value={impNum}
                    onChange={(e) => setImpNum(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-semibold  mb-1">Denominator</label>
                  <input
                    type="number"
                    value={impDen}
                    onChange={(e) => setImpDen(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                  />
                </div>
              </div>
            )}

            {/* Result Display */}
            {calcMode3 !== null && (
              'error' in calcMode3 ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{calcMode3.error}</span>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                  <span className="text-xs font-bold  text-indigo-700">CONVERTED RESULT</span>
                  <div className="text-4xl font-extrabold text-indigo-950 tracking-tight font-mono">
                    {calcMode3.type === 'mixedToImp'
                      ? `${calcMode3.frac?.n}/${calcMode3.frac?.d}`
                      : `${calcMode3.mixed?.whole} ${calcMode3.mixed?.num}/${calcMode3.mixed?.den}`}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* ================= MODE 4: FRACTION ↔ DECIMAL ================= */}
        {activeMode === 'decimal' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 text-xs max-w-md mx-auto">
              <button
                onClick={() => setDecDirection('fracToDec')}
                className={`flex-1 py-2 rounded-xl font-semibold transition-all ${decDirection === 'fracToDec' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Fraction → Decimal
              </button>
              <button
                onClick={() => setDecDirection('decToFrac')}
                className={`flex-1 py-2 rounded-xl font-semibold transition-all ${decDirection === 'decToFrac' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Decimal → Fraction
              </button>
            </div>

            {decDirection === 'fracToDec' ? (
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-slate-700 text-xs font-semibold  mb-1">Numerator</label>
                  <input
                    type="number"
                    value={decFracN}
                    onChange={(e) => setDecFracN(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-semibold  mb-1">Denominator</label>
                  <input
                    type="number"
                    value={decFracD}
                    onChange={(e) => setDecFracD(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-slate-700 text-xs font-semibold  mb-1">Decimal Number</label>
                <input
                  type="number"
                  step="any"
                  value={decimalVal}
                  onChange={(e) => setDecimalVal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                />
              </div>
            )}

            {/* Result Display */}
            {calcMode4 !== null && (
              'error' in calcMode4 ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{calcMode4.error}</span>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                  <span className="text-xs font-bold  text-indigo-700">CONVERTED RESULT</span>
                  <div className="text-4xl font-extrabold text-indigo-950 tracking-tight font-mono">
                    {calcMode4.type === 'fracToDec'
                      ? calcMode4.decimal?.toFixed(4)
                      : `${calcMode4.norm?.n}/${calcMode4.norm?.d}`}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* ================= MODE 5: FRACTION ↔ PERCENTAGE ================= */}
        {activeMode === 'percentage' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 text-xs max-w-md mx-auto">
              <button
                onClick={() => setPctDirection('fracToPct')}
                className={`flex-1 py-2 rounded-xl font-semibold transition-all ${pctDirection === 'fracToPct' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Fraction → %
              </button>
              <button
                onClick={() => setPctDirection('pctToFrac')}
                className={`flex-1 py-2 rounded-xl font-semibold transition-all ${pctDirection === 'pctToFrac' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                % → Fraction
              </button>
            </div>

            {pctDirection === 'fracToPct' ? (
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-slate-700 text-xs font-semibold  mb-1">Numerator</label>
                  <input
                    type="number"
                    value={pctFracN}
                    onChange={(e) => setPctFracN(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-semibold  mb-1">Denominator</label>
                  <input
                    type="number"
                    value={pctFracD}
                    onChange={(e) => setPctFracD(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-slate-700 text-xs font-semibold  mb-1">Percentage Value</label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
                  <input
                    type="number"
                    step="any"
                    value={pctVal}
                    onChange={(e) => setPctVal(e.target.value)}
                    className="w-full text-slate-900 font-mono font-bold text-center focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-400">%</span>
                </div>
              </div>
            )}

            {/* Result Display */}
            {calcMode5 !== null && (
              'error' in calcMode5 ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{calcMode5.error}</span>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                  <span className="text-xs font-bold  text-indigo-700">CONVERTED RESULT</span>
                  <div className="text-4xl font-extrabold text-indigo-950 tracking-tight font-mono">
                    {calcMode5.type === 'fracToPct'
                      ? `${calcMode5.pct?.toFixed(2)}%`
                      : `${calcMode5.norm?.n}/${calcMode5.norm?.d}`}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* ================= MODE 6: COMPARE ================= */}
        {activeMode === 'compare' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Fraction A */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-slate-700 text-xs font-semibold ">Fraction A</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={comp1N}
                    onChange={(e) => setComp1N(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                    placeholder="Numerator"
                  />
                  <input
                    type="number"
                    value={comp1D}
                    onChange={(e) => setComp1D(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                    placeholder="Denominator"
                  />
                </div>
              </div>

              {/* Fraction B */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-slate-700 text-xs font-semibold ">Fraction B</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={comp2N}
                    onChange={(e) => setComp2N(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                    placeholder="Numerator"
                  />
                  <input
                    type="number"
                    value={comp2D}
                    onChange={(e) => setComp2D(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-center"
                    placeholder="Denominator"
                  />
                </div>
              </div>
            </div>

            {/* Result Display */}
            {calcMode6 !== null && (
              'error' in calcMode6 ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{calcMode6.error}</span>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold  text-indigo-700">COMPARISON RESULT</span>
                      <div className="text-4xl font-extrabold text-indigo-950 mt-1 font-mono">
                        {calcMode6.f1.n}/{calcMode6.f1.d} <span className="text-indigo-600 px-1">{calcMode6.symbol}</span> {calcMode6.f2.n}/{calcMode6.f2.d}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="bg-white p-3 rounded-xl border border-indigo-100">
                        <span className="text-slate-500 block text-[10px] font-sans font-semibold uppercase">Dec A</span>
                        <span className="text-slate-900 font-bold text-sm">{calcMode6.d1.toFixed(4)}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-indigo-100">
                        <span className="text-slate-500 block text-[10px] font-sans font-semibold uppercase">Dec B</span>
                        <span className="text-slate-900 font-bold text-sm">{calcMode6.d2.toFixed(4)}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs border-t border-indigo-100 pt-3">
                    Cross-Multiplication Check: {calcMode6.f1.n} × {calcMode6.f2.d} ({calcMode6.cross1}) vs {calcMode6.f2.n} × {calcMode6.f1.d} ({calcMode6.cross2}).
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* ================= MODE 7: EXPRESSION BUILDER ================= */}
        {activeMode === 'expression' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-slate-700 text-xs font-semibold  block">Expression Fractions & Operators</label>

              <div className="space-y-3">
                {expRows.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-400 w-6">#{idx + 1}</span>

                    <input
                      type="number"
                      placeholder="Num"
                      value={r.n}
                      onChange={(e) => {
                        const next = [...expRows];
                        next[idx].n = e.target.value;
                        setExpRows(next);
                      }}
                      className="w-20 px-2 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono font-bold text-center"
                    />

                    <span className="text-slate-400 font-bold">/</span>

                    <input
                      type="number"
                      placeholder="Den"
                      value={r.d}
                      onChange={(e) => {
                        const next = [...expRows];
                        next[idx].d = e.target.value;
                        setExpRows(next);
                      }}
                      className="w-20 px-2 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono font-bold text-center"
                    />

                    {idx < expRows.length - 1 && (
                      <select
                        value={r.op}
                        onChange={(e) => {
                          const next = [...expRows];
                          next[idx].op = e.target.value as Operation;
                          setExpRows(next);
                        }}
                        className="px-2 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold text-xs"
                      >
                        <option value="add">+</option>
                        <option value="subtract">-</option>
                        <option value="multiply">×</option>
                        <option value="divide">÷</option>
                      </select>
                    )}

                    {expRows.length > 1 && (
                      <button
                        onClick={() => setExpRows(expRows.filter((_, i) => i !== idx))}
                        className="p-1.5 text-slate-400 hover:text-rose-600 ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setExpRows([...expRows, { n: '1', d: '2', op: 'add' }])}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-600 text-indigo-600 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Fraction to Expression</span>
              </button>
            </div>

            {/* Expression Result */}
            {calcMode7 !== null && (
              'error' in calcMode7 ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{calcMode7.error}</span>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <span className="text-xs font-bold  text-indigo-700">Simplified Result</span>
                      <div className="text-3xl font-extrabold text-indigo-950 mt-1 font-mono">
                        {calcMode7.norm.d === 1 ? calcMode7.norm.n : `${calcMode7.norm.n}/${calcMode7.norm.d}`}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase">Mixed Number</span>
                      <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
                        {calcMode7.mixed.whole !== 0 ? (
                          calcMode7.mixed.num !== 0 ? `${calcMode7.mixed.whole} ${calcMode7.mixed.num}/${calcMode7.mixed.den}` : calcMode7.mixed.whole
                        ) : (
                          calcMode7.mixed.num !== 0 ? `${calcMode7.mixed.num}/${calcMode7.mixed.den}` : '0'
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase">Decimal Value</span>
                      <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">{calcMode7.decimal.toFixed(4)}</div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Footer Note */}
        <div className="pt-4 border-t border-slate-200 text-slate-500 text-xs leading-relaxed">
          <p>
            <strong>Note:</strong> QuickForma Fraction Calculator reduces fractions to lowest terms using exact integer Greatest Common Divisor (GCD) arithmetic.
          </p>
        </div>
      </div>
    </div>
  );
};
