import React, { useState } from "react";
import { Binary, RefreshCw } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BaseConverter: React.FC = () => {
  const [decVal, setDecVal] = useState<number>(255);

  const dec = decVal || 0;
  const bin = dec.toString(2);
  const oct = dec.toString(8);
  const hex = dec.toString(16).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Binary}
            title="Binary, Octal, Decimal & Hexadecimal Converter"
            description="Convert numbers across common computing bases with instant real-time synchronization."
          />
          <ResetButton onReset={() => setDecVal(255)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Decimal Input (Base 10)"
              type="number"
              value={decVal}
              onChange={(e) => setDecVal(Number(e.target.value))}
              isMono
            />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Multi-Base Conversions">
              <div className="space-y-3 font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-sans">Binary (Base 2)</span>
                  <span className="text-lg font-bold text-emerald-400 break-all">{bin}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-sans">Hexadecimal (Base 16)</span>
                  <span className="text-lg font-bold text-indigo-300">0x{hex}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-sans">Octal (Base 8)</span>
                  <span className="text-base font-bold text-white">{oct}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-sans">Decimal (Base 10)</span>
                  <span className="text-base font-bold text-white">{dec}</span>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
