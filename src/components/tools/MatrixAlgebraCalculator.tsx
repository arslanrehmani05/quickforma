import React, { useState } from "react";
import { Grid, Calculator, Layers, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MatrixAlgebraCalculator: React.FC = () => {
  const [a11, setA11] = useState<number>(3);
  const [a12, setA12] = useState<number>(1);
  const [a21, setA21] = useState<number>(2);
  const [a22, setA22] = useState<number>(4);

  const [b11, setB11] = useState<number>(1);
  const [b12, setB12] = useState<number>(0);
  const [b21, setB21] = useState<number>(5);
  const [b22, setB22] = useState<number>(2);

  // Determinant of A: ad - bc
  const detA = a11 * a22 - a12 * a21;

  // Inverse of A (if det != 0)
  const isSingular = detA === 0;
  const invA = !isSingular ? {
    i11: a22 / detA,
    i12: -a12 / detA,
    i21: -a21 / detA,
    i22: a11 / detA,
  } : null;

  // Matrix Addition A + B
  const sum11 = a11 + b11;
  const sum12 = a12 + b12;
  const sum21 = a21 + b21;
  const sum22 = a22 + b22;

  // Matrix Multiplication A * B
  const prod11 = a11 * b11 + a12 * b21;
  const prod12 = a11 * b12 + a12 * b22;
  const prod21 = a21 * b11 + a22 * b21;
  const prod22 = a21 * b12 + a22 * b22;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Grid}
            title="2×2 Matrix Algebra & Determinant Solver"
            description="Compute 2×2 matrix determinant, inverse A⁻¹, addition (A + B), and dot product multiplication (A × B) with singular matrix detection."
          />
          <ResetButton onReset={() => {
            setA11(3); setA12(1); setA21(2); setA22(4);
            setB11(1); setB12(0); setB21(5); setB22(2);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Matrix A</h3>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" value={a11} onChange={(e) => setA11(Number(e.target.value))} className="px-3 py-2 text-center text-sm font-semibold rounded-lg border border-slate-200 bg-white" />
              <input type="number" value={a12} onChange={(e) => setA12(Number(e.target.value))} className="px-3 py-2 text-center text-sm font-semibold rounded-lg border border-slate-200 bg-white" />
              <input type="number" value={a21} onChange={(e) => setA21(Number(e.target.value))} className="px-3 py-2 text-center text-sm font-semibold rounded-lg border border-slate-200 bg-white" />
              <input type="number" value={a22} onChange={(e) => setA22(Number(e.target.value))} className="px-3 py-2 text-center text-sm font-semibold rounded-lg border border-slate-200 bg-white" />
            </div>
            <p className="text-xs text-slate-500 text-center font-mono">
              det(A) = ({a11} × {a22}) - ({a12} × {a21}) = {detA}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Matrix B</h3>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" value={b11} onChange={(e) => setB11(Number(e.target.value))} className="px-3 py-2 text-center text-sm font-semibold rounded-lg border border-slate-200 bg-white" />
              <input type="number" value={b12} onChange={(e) => setB12(Number(e.target.value))} className="px-3 py-2 text-center text-sm font-semibold rounded-lg border border-slate-200 bg-white" />
              <input type="number" value={b21} onChange={(e) => setB21(Number(e.target.value))} className="px-3 py-2 text-center text-sm font-semibold rounded-lg border border-slate-200 bg-white" />
              <input type="number" value={b22} onChange={(e) => setB22(Number(e.target.value))} className="px-3 py-2 text-center text-sm font-semibold rounded-lg border border-slate-200 bg-white" />
            </div>
            <p className="text-xs text-slate-500 text-center font-mono">det(B) = {b11 * b22 - b12 * b21}</p>
          </div>
        </div>

        {isSingular && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            Matrix A is singular (det(A) = 0). A matrix with zero determinant has no multiplicative inverse (A⁻¹ does not exist).
          </div>
        )}

        <ResultCard variant="dark" title="Matrix Operations">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Product (A × B)</span>
              <div className="grid grid-cols-2 gap-1 text-sm font-mono font-bold text-emerald-400 mt-2">
                <span className="bg-black/20 py-1 rounded">{prod11}</span>
                <span className="bg-black/20 py-1 rounded">{prod12}</span>
                <span className="bg-black/20 py-1 rounded">{prod21}</span>
                <span className="bg-black/20 py-1 rounded">{prod22}</span>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Addition (A + B)</span>
              <div className="grid grid-cols-2 gap-1 text-sm font-mono font-bold text-indigo-300 mt-2">
                <span className="bg-black/20 py-1 rounded">{sum11}</span>
                <span className="bg-black/20 py-1 rounded">{sum12}</span>
                <span className="bg-black/20 py-1 rounded">{sum21}</span>
                <span className="bg-black/20 py-1 rounded">{sum22}</span>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Inverse A⁻¹</span>
              {invA ? (
                <div className="grid grid-cols-2 gap-1 text-xs font-mono font-bold text-white mt-2">
                  <span className="bg-black/20 py-1 rounded">{invA.i11.toFixed(2)}</span>
                  <span className="bg-black/20 py-1 rounded">{invA.i12.toFixed(2)}</span>
                  <span className="bg-black/20 py-1 rounded">{invA.i21.toFixed(2)}</span>
                  <span className="bg-black/20 py-1 rounded">{invA.i22.toFixed(2)}</span>
                </div>
              ) : (
                <p className="text-xs text-rose-300 mt-3 font-semibold">Singular (No Inverse)</p>
              )}
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
