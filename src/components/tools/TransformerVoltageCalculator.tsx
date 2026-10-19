import React, { useState } from "react";
import { Zap, Activity, ArrowRightLeft } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TransformerVoltageCalculator: React.FC = () => {
  const [primaryVoltageVp, setPrimaryVoltageVp] = useState<number>(120); // 120V
  const [primaryTurnsNp, setPrimaryTurnsNp] = useState<number>(500);
  const [secondaryTurnsNs, setSecondaryTurnsNs] = useState<number>(50);
  const [primaryCurrentIp, setPrimaryCurrentIp] = useState<number>(2.0); // 2A

  const turnsRatio = primaryTurnsNp > 0 ? secondaryTurnsNs / primaryTurnsNp : 1;
  const secondaryVoltageVs = primaryVoltageVp * turnsRatio;
  const secondaryCurrentIs = turnsRatio > 0 ? primaryCurrentIp / turnsRatio : 0;

  const isStepDown = secondaryVoltageVs < primaryVoltageVp;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Zap}
            title="Electrical Transformer Turns Ratio & Voltage Solver"
            description="Calculate step-up and step-down AC voltages, winding ratios Vp/Vs = Np/Ns, and transformed secondary current."
          />
          <ResetButton onReset={() => {
            setPrimaryVoltageVp(120); setPrimaryTurnsNp(500); setSecondaryTurnsNs(50); setPrimaryCurrentIp(2.0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Primary Voltage Vp (V)"
            type="number"
            value={primaryVoltageVp}
            onChange={(e) => setPrimaryVoltageVp(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Primary Turns (Np)"
            type="number"
            value={primaryTurnsNp}
            onChange={(e) => setPrimaryTurnsNp(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Secondary Turns (Ns)"
            type="number"
            value={secondaryTurnsNs}
            onChange={(e) => setSecondaryTurnsNs(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Primary Current Ip (Amps)"
            type="number"
            step={0.1}
            value={primaryCurrentIp}
            onChange={(e) => setPrimaryCurrentIp(Number(e.target.value))}
            min={0}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Secondary Voltage (Vs)"
            value={`${secondaryVoltageVs.toFixed(2)} V`}
            subtitle={isStepDown ? "Step-Down Transformer" : "Step-Up Transformer"}
          />
          <ResultCard
            variant="light"
            title="Secondary Current (Is)"
            value={`${secondaryCurrentIs.toFixed(2)} A`}
            subtitle="Is = Ip · (Np / Ns)"
          />
          <ResultCard
            variant="light"
            title="Turns Ratio (Ns : Np)"
            value={`1 : ${(1 / turnsRatio).toFixed(2)}`}
            subtitle={`Ratio factor: ${turnsRatio.toFixed(3)}`}
          />
        </div>
      </div>
    </div>
  );
};
