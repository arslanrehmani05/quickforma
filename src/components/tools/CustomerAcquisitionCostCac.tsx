import React, { useState } from "react";
import { UserPlus, TrendingUp, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CustomerAcquisitionCostCac: React.FC = () => {
  const [adSpend, setAdSpend] = useState<number>(35000);
  const [salariesAndOverhead, setSalariesAndOverhead] = useState<number>(22000); // Sales & marketing team
  const [agencyAndToolsCost, setAgencyAndToolsCost] = useState<number>(8000);
  const [paidCustomers, setPaidCustomers] = useState<number>(450);
  const [organicCustomers, setOrganicCustomers] = useState<number>(150);

  const totalMarketingCost = (adSpend || 0) + (salariesAndOverhead || 0) + (agencyAndToolsCost || 0);
  const totalCustomers = (paidCustomers || 0) + (organicCustomers || 0);

  const blendedCac = totalCustomers > 0 ? totalMarketingCost / totalCustomers : 0;
  const paidCac = (paidCustomers || 0) > 0 ? (adSpend || 0) / paidCustomers : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={UserPlus}
            title="Blended vs Paid CAC & Channel Efficiency Solver"
            description="Calculate Blended and Paid Customer Acquisition Cost (CAC) including media spend, sales wages, and software overhead."
          />
          <ResetButton onReset={() => {
            setAdSpend(35000);
            setSalariesAndOverhead(22000);
            setAgencyAndToolsCost(8000);
            setPaidCustomers(450);
            setOrganicCustomers(150);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Direct Advertising Media Spend ($)" type="number" prefix="$" value={adSpend} onChange={(e) => setAdSpend(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Marketing Team Salaries ($)" type="number" prefix="$" value={salariesAndOverhead} onChange={(e) => setSalariesAndOverhead(Number(e.target.value))} />
              <InputField label="Software & Agency Fees ($)" type="number" prefix="$" value={agencyAndToolsCost} onChange={(e) => setAgencyAndToolsCost(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Paid Attributed Customers" type="number" value={paidCustomers} onChange={(e) => setPaidCustomers(Number(e.target.value))} />
              <InputField label="Organic / Direct Customers" type="number" value={organicCustomers} onChange={(e) => setOrganicCustomers(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Acquisition Cost Comparison">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 block uppercase font-bold">Blended CAC</span>
                    <div className="text-3xl font-extrabold text-white font-mono">
                      ${blendedCac.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-slate-400 block">All costs / Total customers</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 block uppercase font-bold">Pure Paid CAC</span>
                    <div className="text-3xl font-extrabold text-indigo-300 font-mono">
                      ${paidCac.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-slate-400 block">Ad media / Paid customers</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                  Total Monthly Growth Expenditure: <strong>${totalMarketingCost.toLocaleString()}</strong> across <strong>{totalCustomers} total new customers</strong>.
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
