import React, { useState } from "react";
import { Scale, Building, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const LeaseVsBuyCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(850000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [mortgageRatePct, setMortgageRatePct] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(20);
  const [annualPropertyTaxInsurance, setAnnualPropertyTaxInsurance] = useState<number>(14000);
  const [monthlyLeaseRent, setMonthlyLeaseRent] = useState<number>(5500);
  const [annualAppreciationPct, setAnnualAppreciationPct] = useState<number>(3.0);
  const [discountRatePct, setDiscountRatePct] = useState<number>(8.0); // Cost of capital

  const safePrice = Math.max(0, purchasePrice);
  const downPayment = safePrice * (Math.min(100, Math.max(0, downPaymentPct)) / 100);
  const loanPrincipal = Math.max(0, safePrice - downPayment);

  // Monthly mortgage payment
  const monthlyRate = mortgageRatePct / 100 / 12;
  const numPayments = loanTermYears * 12;
  const monthlyMortgage = (loanPrincipal > 0 && monthlyRate > 0 && numPayments > 0)
    ? (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : 0;

  const annualBuyCashFlow = (monthlyMortgage * 12) + annualPropertyTaxInsurance;
  const annualLeaseCashFlow = monthlyLeaseRent * 12;

  // NPV comparison over 10-year holding horizon
  const horizonYears = 10;
  let npvBuy = downPayment;
  let npvLease = 0;
  const r = discountRatePct / 100;

  for (let t = 1; t <= horizonYears; t++) {
    npvBuy += annualBuyCashFlow / Math.pow(1 + r, t);
    npvLease += annualLeaseCashFlow / Math.pow(1 + r, t);
  }

  // Terminal equity salvage value after 10 years
  const propertyFutureValue = safePrice * Math.pow(1 + annualAppreciationPct / 100, horizonYears);
  const npvTerminalEquity = propertyFutureValue / Math.pow(1 + r, horizonYears);
  const netBuyCostNpv = Math.max(0, npvBuy - npvTerminalEquity * 0.5); // conservative 50% equity realization after debt payoff

  const isBuyAdvantageous = netBuyCostNpv < npvLease;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Scale}
            title="Commercial Real Estate Lease vs Buy NPV Calculator"
            description="Perform a 10-year discounted cash flow Net Present Value (NPV) analysis comparing commercial leasing against property ownership."
          />
          <ResetButton onReset={() => {
            setPurchasePrice(850000);
            setDownPaymentPct(20);
            setMortgageRatePct(6.5);
            setLoanTermYears(20);
            setAnnualPropertyTaxInsurance(14000);
            setMonthlyLeaseRent(5500);
            setAnnualAppreciationPct(3.0);
            setDiscountRatePct(8.0);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField
            label="Purchase Price ($)"
            type="number"
            min={0}
            step={25000}
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Down Payment (%)"
            type="number"
            min={0}
            max={100}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
          />
          <InputField
            label="Mortgage Rate (%)"
            type="number"
            min={0.1}
            step={0.1}
            value={mortgageRatePct}
            onChange={(e) => setMortgageRatePct(Number(e.target.value))}
          />
          <InputField
            label="Monthly Lease Rent ($)"
            type="number"
            min={0}
            step={250}
            value={monthlyLeaseRent}
            onChange={(e) => setMonthlyLeaseRent(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="10-Year Discounted Cash Flow NPV Analysis">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Financial Decision</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">
                {isBuyAdvantageous ? "Buy Property" : "Lease Space"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Lowest 10-yr present cost</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Ownership Cost (NPV)</span>
              <p className="text-3xl font-extrabold text-white mt-2">${Math.round(netBuyCostNpv).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Includes equity appreciation</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Lease Cost (NPV)</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">${Math.round(npvLease).toLocaleString()}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Zero residual equity salvage</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Monthly Outflow Diff</span>
              <p className="text-2xl font-mono font-bold text-amber-300 mt-2">
                ${Math.abs(Math.round(monthlyMortgage + annualPropertyTaxInsurance / 12 - monthlyLeaseRent)).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {monthlyMortgage + annualPropertyTaxInsurance / 12 > monthlyLeaseRent ? "Buy requires higher monthly cash" : "Buy has lower monthly cash"}
              </span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
