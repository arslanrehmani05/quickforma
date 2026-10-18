import React, { useState } from "react";
import { Atom, Clock, TrendingDown } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const HalfLifeCalculator: React.FC = () => {
  const [isotopeName, setIsotopeName] = useState<string>("Cobalt-60");
  const [initialQuantity, setInitialQuantity] = useState<number>(100);
  const [halfLife, setHalfLife] = useState<number>(5.27); // e.g. Cobalt-60 in years
  const [elapsedTime, setElapsedTime] = useState<number>(15.81);
  const [timeUnit, setTimeUnit] = useState<string>("years");

  const isHalfLifeValid = halfLife > 0;
  const isInputValid = isHalfLifeValid && initialQuantity >= 0 && elapsedTime >= 0;

  // N(t) = N0 * (1/2)^(t / t_half)
  const numberOfHalfLives = isInputValid ? elapsedTime / halfLife : 0;
  const remainingQuantity = isInputValid ? initialQuantity * Math.pow(0.5, numberOfHalfLives) : 0;
  const decayedQuantity = isInputValid ? Math.max(0, initialQuantity - remainingQuantity) : 0;
  const percentRemaining = initialQuantity > 0 && isInputValid ? (remainingQuantity / initialQuantity) * 100 : 0;

  // Decay constant lambda = ln(2) / t_half
  const decayConstant = isHalfLifeValid ? Math.LN2 / halfLife : 0;

  const handleIsotopeChange = (name: string, hl: number, unit: string) => {
    setIsotopeName(name);
    setHalfLife(hl);
    setTimeUnit(unit);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Atom}
            title="Radioactive Half-Life & Exponential Decay Calculator"
            description="Calculate remaining substance quantity N(t) = N₀(0.5)^(t / t₁/₂), decay constant λ, and elapsed half-lives across standard radioisotopes."
          />
          <ResetButton onReset={() => {
            setIsotopeName("Cobalt-60");
            setInitialQuantity(100);
            setHalfLife(5.27);
            setElapsedTime(15.81);
            setTimeUnit("years");
          }} />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Standard Radioisotope Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Cobalt-60 (5.27 yr)", hl: 5.27, unit: "years" },
              { name: "Carbon-14 (5,730 yr)", hl: 5730, unit: "years" },
              { name: "Cesium-137 (30.17 yr)", hl: 30.17, unit: "years" },
              { name: "Iodine-131 (8.02 days)", hl: 8.02, unit: "days" },
              { name: "Technetium-99m (6.01 hr)", hl: 6.01, unit: "hours" },
            ].map((iso) => (
              <button
                key={iso.name}
                type="button"
                onClick={() => handleIsotopeChange(iso.name, iso.hl, iso.unit)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                  halfLife === iso.hl
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {iso.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Initial Quantity (N₀)"
            type="number"
            min={0}
            step="any"
            value={initialQuantity}
            onChange={(e) => setInitialQuantity(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label={`Half-Life t₁/₂ (${timeUnit})`}
            type="number"
            min={0.0001}
            step="any"
            value={halfLife}
            onChange={(e) => setHalfLife(Math.max(0.0001, Number(e.target.value)))}
          />
          <InputField
            label={`Elapsed Time t (${timeUnit})`}
            type="number"
            min={0}
            step="any"
            value={elapsedTime}
            onChange={(e) => setElapsedTime(Math.max(0, Number(e.target.value)))}
          />
        </div>

        {!isHalfLifeValid && (
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-900 text-xs">
            <strong>Invalid Parameter:</strong> Half-life duration must be strictly greater than 0.
          </div>
        )}

        <ResultCard variant="dark" title="Radioactive Decay Projection">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Remaining N(t)</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {isInputValid ? remainingQuantity.toFixed(3) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {isInputValid ? `${percentRemaining.toFixed(1)}% of original` : "Check inputs"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Decayed Amount</span>
              <p className="text-4xl font-extrabold text-white mt-1">
                {isInputValid ? decayedQuantity.toFixed(3) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {isInputValid ? `${(100 - percentRemaining).toFixed(1)}% transformed` : "Check inputs"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Half-Lives Elapsed</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                {isInputValid ? numberOfHalfLives.toFixed(2) : "—"}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">cycles elapsed</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Decay Constant (λ)</span>
              <p className="text-2xl font-mono font-bold text-slate-200 mt-1">
                {isHalfLifeValid ? decayConstant.toFixed(4) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">ln(2) / t₁/₂ ({timeUnit}⁻¹)</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
