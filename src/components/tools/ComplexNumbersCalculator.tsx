import React, { useState } from "react";
import { Compass, RotateCw, Sparkles, Activity } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ComplexNumbersCalculator: React.FC = () => {
  const [realPart, setRealPart] = useState<number>(3);
  const [imagPart, setImagPart] = useState<number>(4);

  // Magnitude r = sqrt(a^2 + b^2)
  const magnitude = Math.sqrt(realPart * realPart + imagPart * imagPart);

  // Phase angle theta = atan2(b, a)
  const angleRad = Math.atan2(imagPart, realPart);
  const angleDeg = (angleRad * 180) / Math.PI;

  const complexConjugate = `${realPart} ${imagPart >= 0 ? "-" : "+"} ${Math.abs(imagPart)}i`;
  const polarForm = `${magnitude.toFixed(3)} ∠ ${angleDeg.toFixed(2)}°`;
  const exponentialForm = `${magnitude.toFixed(3)} · e^(${angleRad.toFixed(3)}i)`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Compass}
            title="Complex Number Polar, Rectangular & Phasor Solver"
            description="Convert complex numbers between Cartesian form (a + bi), polar magnitude/angle (r ∠ θ), and Euler exponential notation."
          />
          <ResetButton onReset={() => {
            setRealPart(3);
            setImagPart(4);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Real Part (a)"
            type="number"
            value={realPart}
            onChange={(e) => setRealPart(Number(e.target.value))}
          />
          <InputField
            label="Imaginary Part (b in bi)"
            type="number"
            value={imagPart}
            onChange={(e) => setImagPart(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard
            variant="light"
            title="Magnitude |z|"
            value={magnitude.toFixed(3)}
            subtitle="r = √(a² + b²)"
          />
          <ResultCard
            variant="light"
            title="Phase Angle (θ)"
            value={`${angleDeg.toFixed(2)}°`}
            subtitle={`${angleRad.toFixed(3)} radians`}
          />
          <ResultCard
            variant="light"
            title="Polar Phasor"
            value={polarForm}
            subtitle="r ∠ θ notation"
          />
          <ResultCard
            variant="light"
            title="Complex Conjugate (z*)"
            value={complexConjugate}
            subtitle="Inverted imaginary sign"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider">Euler Exponential Representation</h4>
          <div className="font-mono text-sm text-indigo-600 bg-white p-3 rounded-xl border border-slate-200 font-bold">
            z = {exponentialForm}
          </div>
        </div>
      </div>
    </div>
  );
};
