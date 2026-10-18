import React, { useState } from "react";
import { FlaskConical, Atom, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EmpiricalFormulaCalculator: React.FC = () => {
  const [carbonPercent, setCarbonPercent] = useState<number>(40.0);
  const [hydrogenPercent, setHydrogenPercent] = useState<number>(6.67);
  const [oxygenPercent, setOxygenPercent] = useState<number>(53.33);
  const [molarMass, setMolarMass] = useState<number>(180.16); // e.g. Glucose C6H12O6

  // Standard atomic molar weights (IUPAC)
  const mwC = 12.011;
  const mwH = 1.008;
  const mwO = 15.999;

  const cPct = Math.max(0, carbonPercent || 0);
  const hPct = Math.max(0, hydrogenPercent || 0);
  const oPct = Math.max(0, oxygenPercent || 0);
  const totalPct = cPct + hPct + oPct;

  // Calculate raw moles
  const molesC = cPct / mwC;
  const molesH = hPct / mwH;
  const molesO = oPct / mwO;

  // Find minimum non-zero mole value
  const nonZeroMoles = [molesC, molesH, molesO].filter(m => m > 0.0001);
  const minMoles = nonZeroMoles.length > 0 ? Math.min(...nonZeroMoles) : 1;

  // Raw ratios
  const rawRC = minMoles > 0 ? molesC / minMoles : 0;
  const rawRH = minMoles > 0 ? molesH / minMoles : 0;
  const rawRO = minMoles > 0 ? molesO / minMoles : 0;

  // Find common fractional multipliers (e.g., .5 -> *2, .33/.67 -> *3, .25/.75 -> *4)
  const getMultiplier = (ratios: number[]): number => {
    const candidates = [1, 2, 3, 4, 5, 6];
    for (const m of candidates) {
      const allNearInteger = ratios.every(r => {
        if (r === 0) return true;
        const scaled = r * m;
        return Math.abs(scaled - Math.round(scaled)) < 0.12;
      });
      if (allNearInteger) return m;
    }
    return 1;
  };

  const scaleMultiplier = getMultiplier([rawRC, rawRH, rawRO]);

  const ratioC = Math.max(0, Math.round(rawRC * scaleMultiplier));
  const ratioH = Math.max(0, Math.round(rawRH * scaleMultiplier));
  const ratioO = Math.max(0, Math.round(rawRO * scaleMultiplier));

  const buildFormula = (c: number, h: number, o: number) => {
    let formula = "";
    if (c > 0) formula += `C${c > 1 ? c : ""}`;
    if (h > 0) formula += `H${h > 1 ? h : ""}`;
    if (o > 0) formula += `O${o > 1 ? o : ""}`;
    return formula || "—";
  };

  const empiricalFormula = buildFormula(ratioC, ratioH, ratioO);
  const empiricalMass = ratioC * mwC + ratioH * mwH + ratioO * mwO;

  // Molecular formula multiplier: n = molarMass / empiricalMass
  const mMass = Math.max(0, molarMass || 0);
  const molecularN = empiricalMass > 0 && mMass > 0 ? Math.max(1, Math.round(mMass / empiricalMass)) : 1;
  const molecularFormula = buildFormula(ratioC * molecularN, ratioH * molecularN, ratioO * molecularN);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FlaskConical}
            title="Empirical & Molecular Formula Solver"
            description="Convert elemental mass percentages of C, H, and O to simplest empirical formula with fraction multiplier detection and molecular mass matching."
          />
          <ResetButton onReset={() => {
            setCarbonPercent(40.0);
            setHydrogenPercent(6.67);
            setOxygenPercent(53.33);
            setMolarMass(180.16);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField
            label="Carbon % (C)"
            type="number"
            min={0}
            max={100}
            step="0.01"
            value={carbonPercent}
            onChange={(e) => setCarbonPercent(Number(e.target.value))}
          />
          <InputField
            label="Hydrogen % (H)"
            type="number"
            min={0}
            max={100}
            step="0.01"
            value={hydrogenPercent}
            onChange={(e) => setHydrogenPercent(Number(e.target.value))}
          />
          <InputField
            label="Oxygen % (O)"
            type="number"
            min={0}
            max={100}
            step="0.01"
            value={oxygenPercent}
            onChange={(e) => setOxygenPercent(Number(e.target.value))}
          />
          <InputField
            label="Molar Mass (g/mol)"
            type="number"
            min={1}
            step="0.01"
            value={molarMass}
            onChange={(e) => setMolarMass(Number(e.target.value))}
            helpText="Optional: used to find molecular formula"
          />
        </div>

        {Math.abs(totalPct - 100) > 1.5 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            Note: Sum of input percentages ({totalPct.toFixed(1)}%) does not equal 100%. Ratios are computed from relative input mass proportions.
          </div>
        )}

        <ResultCard variant="dark" title="Stoichiometric Formula Derivation">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Empirical Formula</span>
              <p className="text-3xl font-mono font-extrabold text-emerald-400 mt-2">{empiricalFormula}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Mass: {empiricalMass.toFixed(2)} g/mol</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Molecular Formula</span>
              <p className="text-3xl font-mono font-extrabold text-white mt-2">{molecularFormula}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">n = {molecularN}× multiplier</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Mole Ratios (C:H:O)</span>
              <p className="text-2xl font-mono font-bold text-indigo-300 mt-2">
                {rawRC.toFixed(2)} : {rawRH.toFixed(2)} : {rawRO.toFixed(2)}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Scale factor: {scaleMultiplier}×</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Mass Balance</span>
              <p className="text-sm font-bold text-slate-200 mt-1">
                {totalPct.toFixed(1)}% Accounted
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
