import React, { useState } from "react";
import { Home, DollarSign, Calendar } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RentalPropertyRoiCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(380000);
  const [monthlyRent, setMonthlyRent] = useState<number>(2900);
  const [monthlyMortgage, setMonthlyMortgage] = useState<number>(1850);
  const [monthlyTaxes, setMonthlyTaxes] = useState<number>(350);
  const [monthlyInsurance, setMonthlyInsurance] = useState<number>(120);
  const [monthlyHoa, setMonthlyHoa] = useState<number>(75);
  const [maintenanceReserve, setMaintenanceReserve] = useState<number>(200);

  const totalMonthlyOutflow = (monthlyMortgage || 0) + (monthlyTaxes || 0) + (monthlyInsurance || 0) + (monthlyHoa || 0) + (maintenanceReserve || 0);
  const monthlyCashFlow = (monthlyRent || 0) - totalMonthlyOutflow;
  const annualCashFlow = monthlyCashFlow * 12;

  // Approximate downpayment + closing = 25% of purchase
  const initialEquity = (purchasePrice || 0) * 0.25;
  const estimatedCoCReturn = initialEquity > 0 ? (annualCashFlow / initialEquity) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Home}
            title="All-In Rental Property Monthly Cash Flow & ROI"
            description="Model monthly rental property net cash flow, mortgage debt service, reserves, and annual return on investment."
          />
          <ResetButton onReset={() => {
            setPurchasePrice(380000);
            setMonthlyRent(2900);
            setMonthlyMortgage(1850);
            setMonthlyTaxes(350);
            setMonthlyInsurance(120);
            setMonthlyHoa(75);
            setMaintenanceReserve(200);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Purchase Price ($)" type="number" prefix="$" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} />
              <InputField label="Gross Monthly Rent ($)" type="number" prefix="$" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Monthly Mortgage (P&I) ($)" type="number" prefix="$" value={monthlyMortgage} onChange={(e) => setMonthlyMortgage(Number(e.target.value))} />
              <InputField label="Property Taxes ($/mo)" type="number" prefix="$" value={monthlyTaxes} onChange={(e) => setMonthlyTaxes(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="Insurance ($/mo)" type="number" prefix="$" value={monthlyInsurance} onChange={(e) => setMonthlyInsurance(Number(e.target.value))} />
              <InputField label="HOA Dues ($/mo)" type="number" prefix="$" value={monthlyHoa} onChange={(e) => setMonthlyHoa(Number(e.target.value))} />
              <InputField label="Repairs Reserve ($)" type="number" prefix="$" value={maintenanceReserve} onChange={(e) => setMaintenanceReserve(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Rental Cash Flow Performance">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Net Monthly Cash Flow</span>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${monthlyCashFlow >= 0 ? "text-emerald-400" : "text-rose-400"} font-mono`}>
                    ${monthlyCashFlow.toFixed(0)}/mo
                  </div>
                  <p className="text-xs text-slate-400">
                    Annual Net Pre-Tax Cash Flow: <strong className="text-white">${annualCashFlow.toLocaleString()}/yr</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Total Monthly Expenses</span>
                    <span className="text-base font-bold text-white">${totalMonthlyOutflow.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Estimated Cash-on-Cash</span>
                    <span className="text-base font-bold text-emerald-400">{estimatedCoCReturn.toFixed(1)}%</span>
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
