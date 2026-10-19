import React, { useState } from "react";
import { Divide, FunctionSquare, Hash, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const LogarithmChangeOfBaseTool: React.FC = () => {
  const [argumentX, setArgumentX] = useState<number>(64);
  const [baseB, setBaseB] = useState<number>(2);

  const safeX = Math.max(0.000001, argumentX);
  const safeB = baseB > 0 && baseB !== 1 ? baseB : 2;

  // Change of base: log_b(x) = ln(x) / ln(b)
  const logValue = Math.log(safeX) / Math.log(safeB);
  const lnValue = Math.log(safeX);
  const log10Value = Math.log10(safeX);
  const log2Value = Math.log2(safeX);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Divide}
            title="Logarithm Change of Base Formula Solver"
            description="Evaluate log_b(x) for arbitrary bases using log_b(x) = ln(x) / ln(b) alongside common (log10) and binary (log2) solutions."
          />
          <ResetButton onReset={() => { setArgumentX(64); setBaseB(2); }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Logarithm Argument (x > 0)"
            type="number"
            step={0.1}
            value={argumentX}
            onChange={(e) => setArgumentX(Number(e.target.value))}
            min={0.000001}
          />
          <InputField
            label="Logarithm Base (b > 0, b ≠ 1)"
            type="number"
            step={0.1}
            value={baseB}
            onChange={(e) => setBaseB(Number(e.target.value))}
            min={0.0001}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard
            variant="light"
            title={`log_${safeB}(${safeX})`}
            value={logValue.toFixed(4)}
            subtitle={`Base-${safeB} Solution`}
          />
          <ResultCard
            variant="light"
            title="Natural Log ln(x)"
            value={lnValue.toFixed(4)}
            subtitle="Base-e (Euler's number)"
          />
          <ResultCard
            variant="light"
            title="Common log₁₀(x)"
            value={log10Value.toFixed(4)}
            subtitle="Base-10 decibel scale"
          />
          <ResultCard
            variant="light"
            title="Binary log₂(x)"
            value={log2Value.toFixed(4)}
            subtitle="Base-2 computing bits"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider">Exponential Verification Check</h4>
          <div className="font-mono text-sm text-indigo-600 bg-white p-3 rounded-xl border border-slate-200 font-bold">
            {safeB}^{logValue.toFixed(4)} = {Math.pow(safeB, logValue).toFixed(4)} (Exact: {safeX})
          </div>
        </div>
      </div>
    </div>
  );
};
