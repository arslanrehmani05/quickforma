import React, { useState } from "react";
import { Cpu, Zap, Activity } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CapacitanceRcCircuitCalculator: React.FC = () => {
  const [resistanceOhms, setResistanceOhms] = useState<number>(10000); // 10k Ohms
  const [capacitanceMicroFarads, setCapacitanceMicroFarads] = useState<number>(100); // 100 uF
  const [sourceVoltage, setSourceVoltage] = useState<number>(12); // 12V

  const C = capacitanceMicroFarads * 1e-6; // Farads
  const R = resistanceOhms; // Ohms

  // Time constant tau = R * C
  const tauSeconds = R * C;
  // Cutoff frequency fc = 1 / (2 * pi * R * C)
  const cutoffFreqHz = 1 / (2 * Math.PI * tauSeconds);
  // Stored Energy E = 0.5 * C * V^2
  const storedEnergyJoules = 0.5 * C * (sourceVoltage * sourceVoltage);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Zap}
            title="RC Circuit Time Constant & Cutoff Frequency Solver"
            description="Calculate RC transient time constant τ = RC, filter cutoff frequency (-3dB), and capacitor stored energy."
          />
          <ResetButton onReset={() => {
            setResistanceOhms(10000); setCapacitanceMicroFarads(100); setSourceVoltage(12);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Resistance R (Ω Ohms)"
            type="number"
            value={resistanceOhms}
            onChange={(e) => setResistanceOhms(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Capacitance C (μF Microfarads)"
            type="number"
            value={capacitanceMicroFarads}
            onChange={(e) => setCapacitanceMicroFarads(Number(e.target.value))}
            min={0.01}
          />
          <InputField
            label="DC Supply Voltage (Volts)"
            type="number"
            value={sourceVoltage}
            onChange={(e) => setSourceVoltage(Number(e.target.value))}
            min={0}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard
            variant="light"
            title="Time Constant (τ)"
            value={`${tauSeconds.toFixed(3)} s`}
            subtitle="τ = R · C (63.2% charge)"
          />
          <ResultCard
            variant="light"
            title="Full Charge (5τ)"
            value={`${(tauSeconds * 5).toFixed(3)} s`}
            subtitle="99.3% steady-state charged"
          />
          <ResultCard
            variant="light"
            title="Cutoff Freq (-3dB)"
            value={`${cutoffFreqHz.toFixed(2)} Hz`}
            subtitle="fc = 1 / (2π · RC)"
          />
          <ResultCard
            variant="light"
            title="Stored Energy (E)"
            value={`${(storedEnergyJoules * 1000).toFixed(2)} mJ`}
            subtitle="E = ½ · C · V²"
          />
        </div>
      </div>
    </div>
  );
};
