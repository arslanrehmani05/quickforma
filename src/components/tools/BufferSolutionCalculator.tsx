import React, { useState } from "react";
import { Droplet, FlaskConical, Atom } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BufferSolutionCalculator: React.FC = () => {
  const [pKa, setPKa] = useState<number>(4.76); // Acetic acid
  const [conjugateBaseMolarity, setConjugateBaseMolarity] = useState<number>(0.15); // [A-]
  const [weakAcidMolarity, setWeakAcidMolarity] = useState<number>(0.10); // [HA]

  const safeAcid = Math.max(0.00001, weakAcidMolarity);
  const safeBase = Math.max(0.00001, conjugateBaseMolarity);

  // Henderson-Hasselbalch equation: pH = pKa + log10([A-] / [HA])
  const ratio = safeBase / safeAcid;
  const ph = pKa + Math.log10(ratio);
  const poh = Math.max(0, 14.0 - ph);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FlaskConical}
            title="Henderson-Hasselbalch Buffer Solution pH Solver"
            description="Calculate buffer solution pH and pOH based on weak acid pKa and conjugate base-to-acid molarity ratios."
          />
          <ResetButton onReset={() => { setPKa(4.76); setConjugateBaseMolarity(0.15); setWeakAcidMolarity(0.10); }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Weak Acid pKa"
            type="number"
            step={0.01}
            value={pKa}
            onChange={(e) => setPKa(Number(e.target.value))}
            min={0}
            max={14}
          />
          <InputField
            label="Conjugate Base [A⁻] (M)"
            type="number"
            step={0.01}
            value={conjugateBaseMolarity}
            onChange={(e) => setConjugateBaseMolarity(Number(e.target.value))}
            min={0.0001}
          />
          <InputField
            label="Weak Acid [HA] (M)"
            type="number"
            step={0.01}
            value={weakAcidMolarity}
            onChange={(e) => setWeakAcidMolarity(Number(e.target.value))}
            min={0.0001}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Buffer pH"
            value={ph.toFixed(2)}
            subtitle="pH = pKa + log₁₀([A⁻]/[HA])"
          />
          <ResultCard
            variant="light"
            title="Buffer pOH"
            value={poh.toFixed(2)}
            subtitle="14.00 - pH at 25°C"
          />
          <ResultCard
            variant="light"
            title="Base-to-Acid Ratio"
            value={`${ratio.toFixed(2)} : 1`}
            subtitle={Math.abs(ph - pKa) <= 1.0 ? "Effective Buffer Range (±1 pH)" : "Outside optimal capacity"}
          />
        </div>
      </div>
    </div>
  );
};
