import React, { useState } from "react";
import { Car, DollarSign, Percent, Calendar } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CarLoanPaymentCalculator: React.FC = () => {
  const [vehiclePrice, setVehiclePrice] = useState<number>(35000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeInValue, setTradeInValue] = useState<number>(4000);
  const [tradeInOwed, setTradeInOwed] = useState<number>(1000);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(6.5);
  const [interestRate, setInterestRate] = useState<number>(5.9);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);

  const netTradeIn = Math.max(0, (tradeInValue || 0) - (tradeInOwed || 0));
  const taxableAmount = Math.max(0, (vehiclePrice || 0) - (tradeInValue || 0));
  const salesTax = taxableAmount * ((salesTaxRate || 0) / 100);
  const loanPrincipal = Math.max(0, (vehiclePrice || 0) + salesTax - (downPayment || 0) - netTradeIn);

  const monthlyRate = (interestRate || 0) / 100 / 12;
  const monthlyPayment = monthlyRate > 0 && loanTermMonths > 0
    ? (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) / (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
    : (loanTermMonths > 0 ? loanPrincipal / loanTermMonths : 0);

  const totalPayments = monthlyPayment * loanTermMonths;
  const totalInterest = Math.max(0, totalPayments - loanPrincipal);
  const totalOutOfPocket = (downPayment || 0) + totalPayments;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Car}
            title="Auto Loan Monthly Payment & Trade-In Calculator"
            description="Calculate monthly car loan payments, sales tax, trade-in equity, total interest, and total out-of-pocket costs."
          />
          <ResetButton onReset={() => {
            setVehiclePrice(35000);
            setDownPayment(5000);
            setTradeInValue(4000);
            setTradeInOwed(1000);
            setSalesTaxRate(6.5);
            setInterestRate(5.9);
            setLoanTermMonths(60);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Vehicle Purchase Price ($)"
              type="number"
              prefix="$"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
            />
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Cash Down Payment ($)"
                type="number"
                prefix="$"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
              />
              <InputField
                label="Sales Tax Rate (%)"
                type="number"
                suffix="%"
                value={salesTaxRate}
                onChange={(e) => setSalesTaxRate(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Trade-In Vehicle Value ($)"
                type="number"
                prefix="$"
                value={tradeInValue}
                onChange={(e) => setTradeInValue(Number(e.target.value))}
              />
              <InputField
                label="Amount Owed on Trade-In ($)"
                type="number"
                prefix="$"
                value={tradeInOwed}
                onChange={(e) => setTradeInOwed(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Interest Rate (APR %)"
                type="number"
                suffix="%"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
              <InputField
                label="Loan Term (Months)"
                type="number"
                value={loanTermMonths}
                onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                helpText="36, 48, 60, or 72 months"
              />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Auto Financing Breakdown">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Monthly Auto Payment</div>
                  <div className="text-4xl font-extrabold text-white">${monthlyPayment.toFixed(2)}</div>
                  <div className="text-xs text-slate-300 mt-1">
                    for {loanTermMonths} months @ {interestRate}% APR
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Financed Amount:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${loanPrincipal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Interest Paid:</span>
                    <p className="text-rose-300 font-bold text-sm mt-0.5">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Sales Tax:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${salesTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Vehicle Cost:</span>
                    <p className="text-indigo-200 font-bold text-sm mt-0.5">${totalOutOfPocket.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
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
