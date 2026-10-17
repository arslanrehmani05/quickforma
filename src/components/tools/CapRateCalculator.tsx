import React, { useState } from "react";
import { Building2, TrendingUp, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CapRateCalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState<number>(450000);
  const [grossAnnualRent, setGrossAnnualRent] = useState<number>(48000); // $4k/mo
  const [propertyTax, setPropertyTax] = useState<number>(5500);
  const [insurance, setInsurance] = useState<number>(1800);
  const [maintenance, setMaintenance] = useState<number>(3600);
  const [managementFee, setManagementFee] = useState<number>(3840); // 8%
  const [vacancyLoss, setVacancyLoss] = useState<number>(2400); // 5%

  const totalOperatingExpenses = (propertyTax || 0) + (insurance || 0) + (maintenance || 0) + (managementFee || 0) + (vacancyLoss || 0);
  const noi = (grossAnnualRent || 0) - totalOperatingExpenses;
  const capRate = (propertyPrice || 0) > 0 ? (noi / propertyPrice) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Building2}
            title="Real Estate Capitalization Rate & Net Operating Income"
            description="Calculate Net Operating Income (NOI) and property Capitalization Rate (Cap Rate) for commercial and multifamily real estate."
          />
          <ResetButton onReset={() => {
            setPropertyPrice(450000);
            setGrossAnnualRent(48000);
            setPropertyTax(5500);
            setInsurance(1800);
            setMaintenance(3600);
            setManagementFee(3840);
            setVacancyLoss(2400);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Property Purchase Price / Market Value ($)" type="number" prefix="$" value={propertyPrice} onChange={(e) => setPropertyPrice(Number(e.target.value))} />
            <InputField label="Gross Annual Rental Income ($)" type="number" prefix="$" value={grossAnnualRent} onChange={(e) => setGrossAnnualRent(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Annual Property Taxes ($)" type="number" prefix="$" value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} />
              <InputField label="Annual Property Insurance ($)" type="number" prefix="$" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="Maintenance ($)" type="number" prefix="$" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} />
              <InputField label="Management ($)" type="number" prefix="$" value={managementFee} onChange={(e) => setManagementFee(Number(e.target.value))} />
              <InputField label="Vacancy ($)" type="number" prefix="$" value={vacancyLoss} onChange={(e) => setVacancyLoss(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Real Estate Investment Yield">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Capitalization Rate (Cap Rate)</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                    {capRate.toFixed(2)}%
                  </div>
                  <p className="text-xs text-slate-400">
                    Net Operating Income (NOI): <strong className="text-white">${noi.toLocaleString()}/yr</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Monthly Net Operating Income</span>
                    <span className="text-base font-bold text-white">${Math.round(noi / 12).toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Operating Expense Ratio</span>
                    <span className="text-base font-bold text-white">
                      {grossAnnualRent > 0 ? ((totalOperatingExpenses / grossAnnualRent) * 100).toFixed(1) : 0}%
                    </span>
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
