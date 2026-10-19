import React, { useState } from "react";
import { Building, Calculator, DollarSign, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ManufacturingOverheadAllocation: React.FC = () => {
  const [totalOverheadPool, setTotalOverheadPool] = useState<number>(360000); // Annual plant rent, utilities, supervision
  const [allocationBase, setAllocationBase] = useState<string>("machine_hours");
  const [totalEstimatedBaseHours, setTotalEstimatedBaseHours] = useState<number>(12000); // 12,000 plant machine hours
  const [jobDirectMaterialCost, setJobDirectMaterialCost] = useState<number>(2400);
  const [jobDirectLaborCost, setJobDirectLaborCost] = useState<number>(1800);
  const [jobActualBaseHours, setJobActualBaseHours] = useState<number>(65);

  const handleReset = () => {
    setTotalOverheadPool(360000);
    setAllocationBase("machine_hours");
    setTotalEstimatedBaseHours(12000);
    setJobDirectMaterialCost(2400);
    setJobDirectLaborCost(1800);
    setJobActualBaseHours(65);
  };

  // Predetermined Overhead Rate (POHR) = Total Estimated Overhead / Total Estimated Base Hours
  const pohrRate = totalEstimatedBaseHours > 0 ? totalOverheadPool / totalEstimatedBaseHours : 0;
  const jobAllocatedOverhead = jobActualBaseHours * pohrRate;
  const jobTotalCost = jobDirectMaterialCost + jobDirectLaborCost + jobAllocatedOverhead;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Direct Labor Hours vs Machine Hours Overhead"
        description="Compute Predetermined Overhead Allocation Rates (POHR) and full absorption job-order production costs."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Cost Driver Allocation Base</label>
          <select
            value={allocationBase}
            onChange={(e) => setAllocationBase(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          >
            <option value="machine_hours">Machine Hours (Capital-Intensive Automated Plant)</option>
            <option value="labor_hours">Direct Labor Hours (Labor-Intensive Craft / Assembly)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Total Annual Factory Overhead Pool ($)"
            value={totalOverheadPool}
            onChange={(val) => setTotalOverheadPool(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Total Estimated Factory Driver Hours"
            value={totalEstimatedBaseHours}
            onChange={(val) => setTotalEstimatedBaseHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Job Direct Materials ($)"
            value={jobDirectMaterialCost}
            onChange={(val) => setJobDirectMaterialCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Job Direct Labor ($)"
            value={jobDirectLaborCost}
            onChange={(val) => setJobDirectLaborCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Job Driver Hours Used"
            value={jobActualBaseHours}
            onChange={(val) => setJobActualBaseHours(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="hrs"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="POHR Overhead Rate"
          value={`$${pohrRate.toFixed(2)}/hr`}
          subtitle="Absorption rate per hour"
          variant="indigo"
        />
        <ResultCard
          title="Job Overhead Allocated"
          value={`$${jobAllocatedOverhead.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${jobActualBaseHours} hrs x $${pohrRate.toFixed(2)}`}
          variant="light"
        />
        <ResultCard
          title="Total Job Manufacturing Cost"
          value={`$${jobTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Full absorption cost"
          variant="light"
        />
        <ResultCard
          title="Overhead Cost Share"
          value={`${jobTotalCost > 0 ? ((jobAllocatedOverhead / jobTotalCost) * 100).toFixed(1) : 0}%`}
          subtitle="Of total job expenses"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Job Costing Summary</h4>
        <p className="text-slate-600">
          Using a predetermined rate of <strong className="text-slate-800">${pohrRate.toFixed(2)} per hour</strong>, this job absorbs <strong className="text-slate-800">${jobAllocatedOverhead.toLocaleString()}</strong> in facility indirect expenses on top of <strong className="text-slate-800">${(jobDirectMaterialCost + jobDirectLaborCost).toLocaleString()}</strong> in direct prime costs, bringing full inventory cost to <strong className="text-slate-800">${jobTotalCost.toLocaleString()}</strong>.
        </p>
      </div>
    </div>
  );
};
