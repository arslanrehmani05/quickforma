import React, { useState } from "react";
import { Key, DollarSign, Calendar } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ShortTermRentalAirbnbCalculator: React.FC = () => {
  const [adr, setAdr] = useState<number>(220); // Average Daily Rate ($)
  const [occupancyRate, setOccupancyRate] = useState<number>(72); // %
  const [cleaningFeePerStay, setCleaningFeePerStay] = useState<number>(125);
  const [staysPerMonth, setStaysPerMonth] = useState<number>(6);
  const [monthlyFixedExpenses, setMonthlyFixedExpenses] = useState<number>(1600); // Utilities, wifi, insurance, supplies
  const [platformHostFeeRate, setPlatformHostFeeRate] = useState<number>(3); // 3% Airbnb host fee

  const daysBooked = Math.round(30 * ((occupancyRate || 0) / 100));
  const nightRevenue = daysBooked * (adr || 0);
  const cleaningRevenue = (staysPerMonth || 0) * (cleaningFeePerStay || 0);
  const grossMonthlyRevenue = nightRevenue + cleaningRevenue;

  const hostPlatformFee = grossMonthlyRevenue * ((platformHostFeeRate || 0) / 100);
  const netMonthlyRevenue = grossMonthlyRevenue - hostPlatformFee - (monthlyFixedExpenses || 0) - cleaningRevenue; // cleaning passed through
  const annualNetIncome = netMonthlyRevenue * 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Key}
            title="Airbnb Occupancy Rate & ADR Revenue Solver"
            description="Forecast monthly Airbnb/VRBO short-term rental gross earnings, host platform fees, and net operating income."
          />
          <ResetButton onReset={() => {
            setAdr(220);
            setOccupancyRate(72);
            setCleaningFeePerStay(125);
            setStaysPerMonth(6);
            setMonthlyFixedExpenses(1600);
            setPlatformHostFeeRate(3);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Average Daily Rate (ADR) ($)" type="number" prefix="$" value={adr} onChange={(e) => setAdr(Number(e.target.value))} />
              <InputField label="Average Occupancy Rate (%)" type="number" suffix="%" value={occupancyRate} onChange={(e) => setOccupancyRate(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Cleaning Fee per Stay ($)" type="number" prefix="$" value={cleaningFeePerStay} onChange={(e) => setCleaningFeePerStay(Number(e.target.value))} />
              <InputField label="Expected Monthly Stays" type="number" value={staysPerMonth} onChange={(e) => setStaysPerMonth(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Fixed Operating Costs ($/mo)" type="number" prefix="$" value={monthlyFixedExpenses} onChange={(e) => setMonthlyFixedExpenses(Number(e.target.value))} helpText="Utilities, Wi-Fi, insurance, consumables." />
              <InputField label="Airbnb Host Fee Rate (%)" type="number" suffix="%" value={platformHostFeeRate} onChange={(e) => setPlatformHostFeeRate(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Short-Term Rental Projections">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Net Monthly Cash Flow</span>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${netMonthlyRevenue >= 0 ? "text-emerald-400" : "text-rose-400"} font-mono`}>
                    ${Math.round(netMonthlyRevenue).toLocaleString()}/mo
                  </div>
                  <p className="text-xs text-slate-400">
                    Gross Monthly Bookings: <strong className="text-white">${Math.round(grossMonthlyRevenue).toLocaleString()}</strong> ({daysBooked} nights booked/mo).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Annual Net Earnings</span>
                    <span className="text-base font-bold text-white">${Math.round(annualNetIncome).toLocaleString()}/yr</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Host Channel Fee</span>
                    <span className="text-base font-bold text-white">${Math.round(hostPlatformFee).toLocaleString()}/mo</span>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
