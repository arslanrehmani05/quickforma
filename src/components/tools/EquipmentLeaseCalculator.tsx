import React, { useState } from "react";
import { Wrench, DollarSign, Calendar } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EquipmentLeaseCalculator: React.FC = () => {
  const [equipmentCost, setEquipmentCost] = useState<number>(75000);
  const [leaseTermMonths, setLeaseTermMonths] = useState<number>(36);
  const [leaseRateFactor, setLeaseRateFactor] = useState<number>(0.032); // Standard LRF ~0.030 - 0.036
  const [buyoutOption, setBuyoutOption] = useState<"dollar" | "fvm">("dollar"); // $1 buyout vs Fair Market Value (FMV ~10%)

  const safeCost = Math.max(0, equipmentCost);
  const monthlyLeasePayment = safeCost * Math.max(0, leaseRateFactor);
  const totalLeasePayments = monthlyLeasePayment * leaseTermMonths;
  const buyoutCost = buyoutOption === "dollar" ? 1 : safeCost * 0.10;
  const totalCostOfLease = totalLeasePayments + buyoutCost;
  const financePremiumDollars = Math.max(0, totalCostOfLease - safeCost);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Wrench}
            title="Commercial Equipment Lease Payment & Buyout Calculator"
            description="Calculate monthly payments via Lease Rate Factor (LRF), compare $1 Buyout Capital Leases vs Fair Market Value (FMV) Operating Leases."
          />
          <ResetButton onReset={() => {
            setEquipmentCost(75000);
            setLeaseTermMonths(36);
            setLeaseRateFactor(0.032);
            setBuyoutOption("dollar");
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField
            label="Equipment Cost ($)"
            type="number"
            min={0}
            step={5000}
            value={equipmentCost}
            onChange={(e) => setEquipmentCost(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Lease Term (Months)"
            type="number"
            min={12}
            max={84}
            value={leaseTermMonths}
            onChange={(e) => setLeaseTermMonths(Math.max(1, Number(e.target.value)))}
          />
          <InputField
            label="Lease Rate Factor (LRF)"
            type="number"
            min={0.01}
            max={0.1}
            step={0.001}
            value={leaseRateFactor}
            onChange={(e) => setLeaseRateFactor(Number(e.target.value))}
          />
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              End of Lease Buyout
            </label>
            <select
              value={buyoutOption}
              onChange={(e) => setBuyoutOption(e.target.value as any)}
              className="w-full text-xs font-semibold px-2 py-2 rounded-xl border border-slate-200 bg-white"
            >
              <option value="dollar">$1.00 Buyout (Capital Lease)</option>
              <option value="fvm">Fair Market Value ~10% (Operating)</option>
            </select>
          </div>
        </div>

        <ResultCard variant="dark" title="Equipment Financing Summary">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Monthly Payment</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">${Math.round(monthlyLeasePayment).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Before local sales tax</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Payments ({leaseTermMonths} mo)</span>
              <p className="text-3xl font-extrabold text-white mt-2">${Math.round(totalLeasePayments).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Sum of lease rentals</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">End Buyout Cost</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">${Math.round(buyoutCost).toLocaleString()}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">To take full title</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Financing Premium</span>
              <p className="text-2xl font-mono font-bold text-amber-300 mt-2">${Math.round(financePremiumDollars).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Cost above cash purchase</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
