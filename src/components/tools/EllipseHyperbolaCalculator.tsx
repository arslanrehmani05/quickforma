import React, { useState } from "react";
import { Orbit, Activity, Compass } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EllipseHyperbolaCalculator: React.FC = () => {
  const [conicType, setConicType] = useState<"ellipse" | "hyperbola">("ellipse");
  const [semiMajorA, setSemiMajorA] = useState<number>(5); // a
  const [semiMinorB, setSemiMinorB] = useState<number>(3); // b

  const a = Math.max(0.1, semiMajorA);
  const b = Math.max(0.1, semiMinorB);

  // Ellipse: c^2 = a^2 - b^2 (assuming a >= b). Area = pi * a * b
  // Hyperbola: c^2 = a^2 + b^2. Asymptotes y = +/- (b/a) * x
  let focalDistC = 0;
  let eccentricity = 0;
  let areaOrAsymptote = "";

  if (conicType === "ellipse") {
    const major = Math.max(a, b);
    const minor = Math.min(a, b);
    focalDistC = Math.sqrt(Math.max(0, major * major - minor * minor));
    eccentricity = focalDistC / major;
    areaOrAsymptote = `${(Math.PI * a * b).toFixed(3)} units²`;
  } else {
    focalDistC = Math.sqrt(a * a + b * b);
    eccentricity = focalDistC / a;
    areaOrAsymptote = `y = ±${(b / a).toFixed(3)}x`;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Orbit}
            title="Conic Sections: Ellipse & Hyperbola Solver"
            description="Calculate focal distance c, eccentricity e, directrix, area, and asymptote equations for standard central conic sections."
          />
          <ResetButton onReset={() => {
            setConicType("ellipse");
            setSemiMajorA(5);
            setSemiMinorB(3);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Conic Section Type</label>
            <select
              value={conicType}
              onChange={(e) => setConicType(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-bold text-indigo-600"
            >
              <option value="ellipse">Ellipse: x²/a² + y²/b² = 1</option>
              <option value="hyperbola">Hyperbola: x²/a² - y²/b² = 1</option>
            </select>
          </div>
          <InputField
            label="Semi-Major / Transverse Axis (a)"
            type="number"
            step={0.1}
            value={semiMajorA}
            onChange={(e) => setSemiMajorA(Number(e.target.value))}
            min={0.1}
          />
          <InputField
            label="Semi-Minor / Conjugate Axis (b)"
            type="number"
            step={0.1}
            value={semiMinorB}
            onChange={(e) => setSemiMinorB(Number(e.target.value))}
            min={0.1}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Focal Distance (c)"
            value={`c = ${focalDistC.toFixed(3)}`}
            subtitle={conicType === "ellipse" ? "c = √(a² - b²)" : "c = √(a² + b²)"}
          />
          <ResultCard
            variant="light"
            title="Eccentricity (e)"
            value={`e = ${eccentricity.toFixed(3)}`}
            subtitle={conicType === "ellipse" ? "0 < e < 1 (Elliptical)" : "e > 1 (Hyperbolic)"}
          />
          <ResultCard
            variant="light"
            title={conicType === "ellipse" ? "Enclosed Area" : "Asymptotes"}
            value={areaOrAsymptote}
            subtitle={conicType === "ellipse" ? "Area = π · a · b" : "Linear asymptote equations"}
          />
        </div>
      </div>
    </div>
  );
};
