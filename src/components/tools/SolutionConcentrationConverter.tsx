import React, { useState } from "react";
import { Droplet, FlaskConical, Scale } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SolutionConcentrationConverter: React.FC = () => {
  const [soluteName, setSoluteName] = useState<string>("NaCl (Sodium Chloride)");
  const [soluteMassGrams, setSoluteMassGrams] = useState<number>(58.44); // 1 mole NaCl
  const [soluteMolarMass, setSoluteMolarMass] = useState<number>(58.44); // NaCl MW
  const [solutionVolumeLiters, setSolutionVolumeLiters] = useState<number>(1.0); // 1 L
  const [solutionDensityGml, setSolutionDensityGml] = useState<number>(1.05); // g/mL

  // Total solution mass in grams = volume (mL) * density (g/mL)
  const solutionMassGrams = solutionVolumeLiters > 0 && solutionDensityGml > 0 
    ? solutionVolumeLiters * 1000 * solutionDensityGml 
    : 0;

  // Validation: Solute mass cannot exceed or equal total solution mass
  const isPhysicallyValid = solutionMassGrams > soluteMassGrams && soluteMassGrams >= 0;
  const solventMassGrams = isPhysicallyValid ? solutionMassGrams - soluteMassGrams : 0;
  const solventMassKg = solventMassGrams / 1000;

  // Moles of solute
  const moles = soluteMolarMass > 0 && soluteMassGrams >= 0 ? soluteMassGrams / soluteMolarMass : 0;

  // Molarity (M) = moles / Liters of solution
  const molarity = solutionVolumeLiters > 0 && isPhysicallyValid ? moles / solutionVolumeLiters : 0;

  // Molality (m) = moles / kg of solvent
  const molality = solventMassKg > 0 && isPhysicallyValid ? moles / solventMassKg : 0;

  // Mass percent = (mass solute / mass solution) * 100
  const massPercent = solutionMassGrams > 0 && isPhysicallyValid ? (soluteMassGrams / solutionMassGrams) * 100 : 0;

  // Parts per million (PPM) = (mg solute / kg solution)
  const ppm = solutionMassGrams > 0 && isPhysicallyValid ? (soluteMassGrams / solutionMassGrams) * 1_000_000 : 0;

  const handlePresetChange = (name: string, mw: number) => {
    setSoluteName(name);
    setSoluteMolarMass(mw);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Droplet}
            title="Solution Concentration & Molarity / Molality Converter"
            description="Interconvert Molarity (M), Molality (m), Mass Percentage (wt%), and Parts Per Million (PPM) with physical density and solvent mass verification."
          />
          <ResetButton onReset={() => {
            setSoluteName("NaCl (Sodium Chloride)");
            setSoluteMassGrams(58.44);
            setSoluteMolarMass(58.44);
            setSolutionVolumeLiters(1.0);
            setSolutionDensityGml(1.05);
          }} />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Common Solute Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "NaCl (58.44 g/mol)", mw: 58.44 },
              { name: "Glucose (180.16 g/mol)", mw: 180.16 },
              { name: "Sucrose (342.30 g/mol)", mw: 342.30 },
              { name: "NaOH (40.00 g/mol)", mw: 40.00 },
              { name: "HCl (36.46 g/mol)", mw: 36.46 },
            ].map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handlePresetChange(p.name, p.mw)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                  soluteMolarMass === p.mw
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField
            label="Solute Mass (g)"
            type="number"
            min={0}
            step="any"
            value={soluteMassGrams}
            onChange={(e) => setSoluteMassGrams(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Molar Mass (g/mol)"
            type="number"
            min={0.1}
            step="any"
            value={soluteMolarMass}
            onChange={(e) => setSoluteMolarMass(Math.max(0.1, Number(e.target.value)))}
          />
          <InputField
            label="Solution Volume (L)"
            type="number"
            min={0.001}
            step={0.1}
            value={solutionVolumeLiters}
            onChange={(e) => setSolutionVolumeLiters(Math.max(0.001, Number(e.target.value)))}
          />
          <InputField
            label="Solution Density (g/mL)"
            type="number"
            min={0.1}
            step={0.01}
            value={solutionDensityGml}
            onChange={(e) => setSolutionDensityGml(Math.max(0.1, Number(e.target.value)))}
          />
        </div>

        {!isPhysicallyValid && (
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs leading-relaxed">
            <strong>Physical Inconsistency Warning:</strong> Solute mass ({soluteMassGrams} g) cannot exceed or equal total solution mass ({solutionMassGrams.toFixed(1)} g = {solutionVolumeLiters} L × {solutionDensityGml} g/mL). A solution requires solvent mass to dissolve.
          </div>
        )}

        <ResultCard variant="dark" title="Concentration Conversions">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Molarity (M)</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {isPhysicallyValid ? molarity.toFixed(3) : "—"} {isPhysicallyValid ? "M" : ""}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">mol/L solution ({moles.toFixed(3)} mol)</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Molality (m)</span>
              <p className="text-4xl font-extrabold text-white mt-1">
                {isPhysicallyValid ? molality.toFixed(3) : "—"} {isPhysicallyValid ? "m" : ""}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">mol/kg solvent ({solventMassKg.toFixed(3)} kg)</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Mass Percent (wt%)</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                {isPhysicallyValid ? massPercent.toFixed(2) + "%" : "—"}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">
                {isPhysicallyValid ? `${soluteMassGrams}g / ${solutionMassGrams.toFixed(1)}g` : "Invalid ratio"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Parts Per Million</span>
              <p className="text-2xl font-mono font-bold text-amber-300 mt-1">
                {isPhysicallyValid ? Math.round(ppm).toLocaleString() + " ppm" : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">mg solute / kg solution</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
