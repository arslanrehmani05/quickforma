import React, { useState } from "react";
import { Atom, Shield, CheckCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const OxidationNumberCalculator: React.FC = () => {
  const [selectedMolecule, setSelectedMolecule] = useState<string>("H2SO4");

  const rules: { [key: string]: { targetElem: string; oxState: number; explanation: string } } = {
    "H2SO4": { targetElem: "Sulfur (S)", oxState: 6, explanation: "2(+1 for H) + x + 4(-2 for O) = 0 => x = +6" },
    "KMnO4": { targetElem: "Manganese (Mn)", oxState: 7, explanation: "1(+1 for K) + x + 4(-2 for O) = 0 => x = +7" },
    "K2Cr2O7": { targetElem: "Chromium (Cr)", oxState: 6, explanation: "2(+1 for K) + 2x + 7(-2 for O) = 0 => 2x = +12 => x = +6" },
    "HNO3": { targetElem: "Nitrogen (N)", oxState: 5, explanation: "1(+1 for H) + x + 3(-2 for O) = 0 => x = +5" },
    "H3PO4": { targetElem: "Phosphorus (P)", oxState: 5, explanation: "3(+1 for H) + x + 4(-2 for O) = 0 => x = +5" },
    "ClO3-": { targetElem: "Chlorine (Cl)", oxState: 5, explanation: "x + 3(-2 for O) = -1 => x = +5" }
  };

  const curr = rules[selectedMolecule] || rules["H2SO4"];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Atom}
            title="Redox Reaction Oxidation Number & State Solver"
            description="Determine oxidation states of transition metals and central non-metal atoms in polyatomic molecules."
          />
          <ResetButton onReset={() => setSelectedMolecule("H2SO4")} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Select Compound / Polyatomic Ion</label>
          <select
            value={selectedMolecule}
            onChange={(e) => setSelectedMolecule(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-bold text-indigo-600"
          >
            <option value="H2SO4">Sulfuric Acid (H₂SO₄)</option>
            <option value="KMnO4">Potassium Permanganate (KMnO₄)</option>
            <option value="K2Cr2O7">Potassium Dichromate (K₂Cr₂O₇)</option>
            <option value="HNO3">Nitric Acid (HNO₃)</option>
            <option value="H3PO4">Phosphoric Acid (H₃PO₄)</option>
            <option value="ClO3-">Chlorate Ion (ClO₃⁻)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResultCard
            variant="light"
            title={`Oxidation State of ${curr.targetElem}`}
            value={`+${curr.oxState}`}
            subtitle="Central atom oxidation number"
          />
          <ResultCard
            variant="light"
            title="Algebraic Balance"
            value={curr.explanation}
            subtitle="Sum of oxidation states equals net charge"
          />
        </div>
      </div>
    </div>
  );
};
