import React, { useState } from "react";
import { Building2, DollarSign, Percent, Calendar } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const Sba7aLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [primeRate, setPrimeRate] = useState<number>(8.5);
  const [lenderSpread, setLenderSpread] = useState<number>(2.75);
  const [termYears, setTermYears] = useState<number>(10);
  const [packagingFees, setPackagingFees] = useState<number>(5000);

  const interestRate = (primeRate || 0) + (lenderSpread || 0);

  // SBA Guaranty Fee calculation
  let guarantyFee = 0;
  if (loanAmount <= 150000) {
    guarantyFee = 0;
  } else if (loanAmount <= 700000) {
    guarantyFee = loanAmount * 0.03;
  } else if (loanAmount <= 1000000) {
    guarantyFee = loanAmount * 0.035;
  } else {
    guarantyFee = loanAmount * 0.0375;
  }

  const totalFinanced = (loanAmount || 0) + guarantyFee + (packagingFees || 0);
  const months = (termYears || 10) * 12;
  const monthlyRate = interestRate / 100 / 12;

  const monthlyPayment = monthlyRate > 0 && months > 0
    ? (totalFinanced * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1)
    : (months > 0 ? totalFinanced / months : 0);

  const totalPayments = monthlyPayment * months;
  const totalInterest = Math.max(0, totalPayments - totalFinanced);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Building2}
            title="SBA 7(a) Small Business Loan Calculator"
            description="Calculate monthly amortization payments, official SBA guaranty fees, interest rate caps, and total cost of borrowing."
          />
          <ResetButton onReset={() => {
            setLoanAmount(500000);
            setPrimeRate(8.5);
            setLenderSpread(2.75);
            setTermYears(10);
            setPackagingFees(5000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="SBA Loan Request Amount ($)" type="number" prefix="$" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Prime Rate (%)" type="number" suffix="%" value={primeRate} onChange={(e) => setPrimeRate(Number(e.target.value))} />
              <InputField label="Lender Spread (%)" type="number" suffix="%" value={lenderSpread} onChange={(e) => setLenderSpread(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Loan Term (Years)" type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} helpText="10 yrs (working capital) / 25 yrs (real estate)" />
              <InputField label="Packaging / Closing Fees ($)" type="number" prefix="$" value={packagingFees} onChange={(e) => setPackagingFees(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="SBA 7(a) Amortization">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Monthly Payment (P&I)</div>
                  <div className="text-4xl font-extrabold text-white">${monthlyPayment.toFixed(2)}/mo</div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Combined Rate: {interestRate.toFixed(2)}% over {termYears} years
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">SBA Guaranty Fee:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${guarantyFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Interest Paid:</span>
                    <p className="text-rose-300 font-bold text-sm mt-0.5">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Loan Amount Financed:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${totalFinanced.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Out-of-Pocket:</span>
                    <p className="text-emerald-300 font-bold text-sm mt-0.5">${totalPayments.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
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
