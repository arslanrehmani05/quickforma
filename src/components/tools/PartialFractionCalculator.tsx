import React, { useState } from "react";
import { FunctionSquare, Layers, Divide } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PartialFractionCalculator: React.FC = () => {
  // Fraction of form (Px + Q) / ((x - r1)(x - r2))
  const [pCoeff, setPCoeff] = useState<number>(3);
  const [qConst, setQConst] = useState<number>(5);
  const [root1, setRoot1] = useState<number>(1);
  const [root2, setRoot2] = useState<number>(-2);

  // Decomposing into: A / (x - r1) + B / (x - r2)
  // Heaviside Cover-Up Method:
  // A = (P*r1 + Q) / (r1 - r2)
  // B = (P*r2 + Q) / (r2 - r1)
  const isDistinct = root1 !== root2;
  const denomA = isDistinct ? root1 - root2 : 1;
  const denomB = isDistinct ? root2 - root1 : 1;

  const aVal = isDistinct ? (pCoeff * root1 + qConst) / denomA : 0;
  const bVal = isDistinct ? (pCoeff * root2 + qConst) / denomB : 0;

  const signR1 = root1 >= 0 ? `- ${root1}` : `+ ${Math.abs(root1)}`;
  const signR2 = root2 >= 0 ? `- ${root2}` : `+ ${Math.abs(root2)}`;

  const decompositionStr = isDistinct
    ? `${aVal.toFixed(2)} / (x ${signR1}) + ${bVal.toFixed(2)} / (x ${signR2})`
    : "Roots must be distinct (r1 ≠ r2) for simple linear factors";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FunctionSquare}
            title="Partial Fraction Decomposition Solver"
            description="Decompose rational fractions (Px + Q) / (x - r₁)(x - r₂) into partial fractions for calculus integrals via Heaviside method."
          />
          <ResetButton onReset={() => {
            setPCoeff(3); setQConst(5); setRoot1(1); setRoot2(-2);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Numerator X Coeff (P)"
            type="number"
            value={pCoeff}
            onChange={(e) => setPCoeff(Number(e.target.value))}
          />
          <InputField
            label="Numerator Constant (Q)"
            type="number"
            value={qConst}
            onChange={(e) => setQConst(Number(e.target.value))}
          />
          <InputField
            label="Denominator Root 1 (r₁)"
            type="number"
            value={root1}
            onChange={(e) => setRoot1(Number(e.target.value))}
          />
          <InputField
            label="Denominator Root 2 (r₂)"
            type="number"
            value={root2}
            onChange={(e) => setRoot2(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Coefficient A"
            value={aVal.toFixed(3)}
            subtitle={`Numerator for (x ${signR1})`}
          />
          <ResultCard
            variant="light"
            title="Coefficient B"
            value={bVal.toFixed(3)}
            subtitle={`Numerator for (x ${signR2})`}
          />
          <ResultCard
            variant="light"
            title="Integral Anti-Derivative"
            value={isDistinct ? "ln|x - r₁| + ln|x - r₂|" : "N/A"}
            subtitle="Standard logarithmic form"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider">Partial Fraction Expansion</h4>
          <div className="font-mono text-sm text-indigo-600 bg-white p-3 rounded-xl border border-slate-200 font-bold">
            f(x) = {decompositionStr}
          </div>
        </div>
      </div>
    </div>
  );
};
