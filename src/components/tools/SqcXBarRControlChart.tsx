import React, { useState } from "react";
import { Activity, Target, ShieldCheck, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SqcXBarRControlChart: React.FC = () => {
  const [subgroupSize, setSubgroupSize] = useState<number>(5);
  const [grandMeanXBarBar, setGrandMeanXBarBar] = useState<number>(50.25); // Target measurement
  const [averageRangeRBar, setAverageRangeRBar] = useState<number>(2.40); // Average range in subgroups
  const [latestSampleXBar, setLatestSampleXBar] = useState<number>(51.40);

  const handleReset = () => {
    setSubgroupSize(5);
    setGrandMeanXBarBar(50.25);
    setAverageRangeRBar(2.40);
    setLatestSampleXBar(51.40);
  };

  // Standard Statistical Quality Control factors:
  // n = 3: A2=1.023, D3=0, D4=2.574
  // n = 4: A2=0.729, D3=0, D4=2.282
  // n = 5: A2=0.577, D3=0, D4=2.114
  // n = 6: A2=0.483, D3=0, D4=2.004
  const factorMap: Record<number, { a2: number; d3: number; d4: number }> = {
    3: { a2: 1.023, d3: 0.000, d4: 2.574 },
    4: { a2: 0.729, d3: 0.000, d4: 2.282 },
    5: { a2: 0.577, d3: 0.000, d4: 2.114 },
    6: { a2: 0.483, d3: 0.000, d4: 2.004 }
  };

  const factors = factorMap[subgroupSize] || factorMap[5];
  const uclX = grandMeanXBarBar + (factors.a2 * averageRangeRBar);
  const lclX = grandMeanXBarBar - (factors.a2 * averageRangeRBar);
  const uclR = factors.d4 * averageRangeRBar;
  const lclR = factors.d3 * averageRangeRBar;

  const isInControl = latestSampleXBar >= lclX && latestSampleXBar <= uclX;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Statistical Quality Control X-Bar & R Chart Solver"
        description="Compute Statistical Process Control (SPC) X-Bar and R control limits (UCL / LCL) across subgroup sample sizes."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Subgroup Sample Size (n)</label>
          <select
            value={subgroupSize}
            onChange={(e) => setSubgroupSize(Number(e.target.value))}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          >
            <option value={3}>n = 3 (A2 = 1.023, D4 = 2.574)</option>
            <option value={4}>n = 4 (A2 = 0.729, D4 = 2.282)</option>
            <option value={5}>n = 5 (A2 = 0.577, D4 = 2.114) — Industry Standard</option>
            <option value={6}>n = 6 (A2 = 0.483, D4 = 2.004)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Grand Process Mean (X̄̄)"
            value={grandMeanXBarBar}
            onChange={(val) => setGrandMeanXBarBar(Number(val) || 0)}
            type="number"
            step={0.01}
          />
          <InputField
            label="Average Subgroup Range (R̄)"
            value={averageRangeRBar}
            onChange={(val) => setAverageRangeRBar(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            step={0.01}
          />
          <InputField
            label="Latest Sample Subgroup Mean"
            value={latestSampleXBar}
            onChange={(val) => setLatestSampleXBar(Number(val) || 0)}
            type="number"
            step={0.01}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="X-Bar UCL"
          value={uclX.toFixed(3)}
          subtitle={`Upper Limit (+${(factors.a2 * averageRangeRBar).toFixed(3)})`}
          variant="indigo"
        />
        <ResultCard
          title="X-Bar LCL"
          value={lclX.toFixed(3)}
          subtitle={`Lower Limit (-${(factors.a2 * averageRangeRBar).toFixed(3)})`}
          variant="light"
        />
        <ResultCard
          title="Process Status"
          value={isInControl ? "IN STATISTICAL CONTROL" : "OUT OF CONTROL"}
          subtitle={isInControl ? "Within 3-sigma limits" : "Investigate special cause variation"}
          variant="light"
        />
        <ResultCard
          title="Range UCL (R-Chart)"
          value={uclR.toFixed(3)}
          subtitle={`D4 = ${factors.d4}`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">SPC Chart Analysis</h4>
        <p className="text-slate-600">
          The natural 3-sigma variation limits span from <strong className="text-slate-800">{lclX.toFixed(3)} to {uclX.toFixed(3)}</strong>. The latest subgroup reading of {latestSampleXBar} {isInControl ? "lies safely within control boundaries." : "violates the control boundary! Halt line and audit machine tool wear."}
        </p>
      </div>
    </div>
  );
};
