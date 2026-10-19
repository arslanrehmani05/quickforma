import React, { useState } from "react";
import { Activity, Target, ShieldCheck, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ProcessCapabilityCpCpkCalculator: React.FC = () => {
  const [usl, setUsl] = useState<number>(25.5);
  const [lsl, setLsl] = useState<number>(24.5);
  const [mean, setMean] = useState<number>(25.04);
  const [stdDev, setStdDev] = useState<number>(0.08);

  const handleReset = () => {
    setUsl(25.5);
    setLsl(24.5);
    setMean(25.04);
    setStdDev(0.08);
  };

  // Cp = (USL - LSL) / (6 * sigma)
  const tolerance = Math.max(0, usl - lsl);
  const cp = (6 * stdDev) > 0 ? tolerance / (6 * stdDev) : 0;

  // Cpk = min((USL - Mean) / (3 * sigma), (Mean - LSL) / (3 * sigma))
  const cpu = (3 * stdDev) > 0 ? (usl - mean) / (3 * stdDev) : 0;
  const cpl = (3 * stdDev) > 0 ? (mean - lsl) / (3 * stdDev) : 0;
  const cpk = Math.min(cpu, cpl);

  // Process shift k = |Target - Mean| / (Tolerance / 2)
  const target = (usl + lsl) / 2;
  const centeringShift = tolerance > 0 ? (Math.abs(target - mean) / (tolerance / 2)) * 100 : 0;

  let capabilityTier = "Capable (Cpk >= 1.33)";
  if (cpk >= 2.0) capabilityTier = "Six Sigma World-Class (Cpk >= 2.0)";
  else if (cpk >= 1.67) capabilityTier = "Highly Capable (Cpk >= 1.67)";
  else if (cpk < 1.0) capabilityTier = "Incapable / Defect Producer (Cpk < 1.0)";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Six Sigma Cp & Cpk Process Capability"
        description="Compute statistical process capability index (Cp) and process centering capability (Cpk) against engineering tolerances."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Upper Specification Limit (USL)"
            value={usl}
            onChange={(val) => setUsl(Number(val) || 0)}
            type="number"
            step={0.01}
          />
          <InputField
            label="Lower Specification Limit (LSL)"
            value={lsl}
            onChange={(val) => setLsl(Number(val) || 0)}
            type="number"
            step={0.01}
          />
          <InputField
            label="Process Mean (x̄)"
            value={mean}
            onChange={(val) => setMean(Number(val) || 0)}
            type="number"
            step={0.01}
          />
          <InputField
            label="Process Standard Deviation (σ)"
            value={stdDev}
            onChange={(val) => setStdDev(Math.max(0.0001, Number(val) || 0))}
            type="number"
            min={0.0001}
            step={0.001}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Cpk (Process Capability)"
          value={cpk.toFixed(2)}
          subtitle={capabilityTier}
          variant="indigo"
        />
        <ResultCard
          title="Cp (Potential Capability)"
          value={cp.toFixed(2)}
          subtitle="If perfectly centered"
          variant="light"
        />
        <ResultCard
          title="Tolerance Spread"
          value={tolerance.toFixed(3)}
          subtitle={`6σ spread = ${(6 * stdDev).toFixed(3)}`}
          variant="light"
        />
        <ResultCard
          title="Centering Off-Target"
          value={`${centeringShift.toFixed(1)}%`}
          subtitle={`Shift from target ${target.toFixed(2)}`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Six Sigma Interpretation</h4>
        <p className="text-slate-600">
          Your potential capability is <strong className="text-slate-800">Cp = {cp.toFixed(2)}</strong>, but process centering brings actual capability to <strong className="text-slate-800">Cpk = {cpk.toFixed(2)}</strong>. {cpk >= 1.33 ? "The manufacturing process satisfies automotive / aerospace quality standards." : "The process produces defect scrap on the upper specification boundary and requires mechanical recalibration."}
        </p>
      </div>
    </div>
  );
};
