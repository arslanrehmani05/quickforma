import React, { useState } from "react";
import { DollarSign, ShieldCheck, Wallet, Receipt } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TakeHomePayCalculator: React.FC = () => {
  const [grossSalary, setGrossSalary] = useState<number>(85000);
  const [payFrequency, setPayFrequency] = useState<"biweekly" | "monthly" | "weekly" | "semimonthly">("biweekly");
  const [stateTaxRate, setStateTaxRate] = useState<number>(4.5);
  const [preTaxDeductions, setPreTaxDeductions] = useState<number>(4000);

  const periodsPerYear = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
  }[payFrequency];

  // Federal income tax simplified 2024 brackets for Single
  const taxableFederal = Math.max(0, (grossSalary || 0) - (preTaxDeductions || 0) - 14600); // Standard deduction
  let fedTax = 0;
  if (taxableFederal > 100525) {
    fedTax = 1740 + 3654 + 9284 + (taxableFederal - 100525) * 0.24;
  } else if (taxableFederal > 47150) {
    fedTax = 1740 + 3654 + (taxableFederal - 47150) * 0.22;
  } else if (taxableFederal > 11600) {
    fedTax = 1160 + (taxableFederal - 11600) * 0.12;
  } else {
    fedTax = taxableFederal * 0.10;
  }

  // FICA
  const socialSecurityTax = Math.min((grossSalary || 0), 168600) * 0.062;
  const medicareTax = (grossSalary || 0) * 0.0145;
  const stateTax = Math.max(0, (grossSalary || 0) - (preTaxDeductions || 0)) * ((stateTaxRate || 0) / 100);

  const totalTaxes = fedTax + socialSecurityTax + medicareTax + stateTax;
  const annualNetTakeHome = Math.max(0, (grossSalary || 0) - (preTaxDeductions || 0) - totalTaxes);
  const netPerPaycheck = annualNetTakeHome / periodsPerYear;
  const grossPerPaycheck = (grossSalary || 0) / periodsPerYear;
  const effectiveTaxRate = grossSalary > 0 ? (totalTaxes / grossSalary) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Receipt}
            title="Take-Home Pay & Paycheck Tax Estimator"
            description="Estimate federal withholding, Social Security, Medicare, state tax, and exact net take-home pay per paycheck."
          />
          <ResetButton onReset={() => {
            setGrossSalary(85000);
            setPayFrequency("biweekly");
            setStateTaxRate(4.5);
            setPreTaxDeductions(4000);
          }} />
        </div>

        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl max-w-md">
          {(["biweekly", "monthly", "semimonthly", "weekly"] as const).map((freq) => (
            <button
              key={freq}
              onClick={() => setPayFrequency(freq)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                payFrequency === freq ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {freq}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Gross Annual Salary ($)"
              type="number"
              prefix="$"
              value={grossSalary}
              onChange={(e) => setGrossSalary(Number(e.target.value))}
            />
            <InputField
              label="State Income Tax Rate (%)"
              type="number"
              suffix="%"
              value={stateTaxRate}
              onChange={(e) => setStateTaxRate(Number(e.target.value))}
              helpText="Set 0% for states without income tax (TX, FL, WA, etc.)"
            />
            <InputField
              label="Annual Pre-Tax Deductions (401k, HSA, Medical) ($)"
              type="number"
              prefix="$"
              value={preTaxDeductions}
              onChange={(e) => setPreTaxDeductions(Number(e.target.value))}
            />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Take-Home Pay Summary">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                    Net Take-Home Pay ({payFrequency})
                  </div>
                  <div className="text-4xl font-extrabold text-emerald-400">
                    ${netPerPaycheck.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    Gross Pay: ${grossPerPaycheck.toLocaleString(undefined, { maximumFractionDigits: 0 })} | Effective Tax: {effectiveTaxRate.toFixed(1)}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Federal Tax (yr):</span>
                    <p className="text-white font-bold text-sm mt-0.5">${fedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">State Tax (yr):</span>
                    <p className="text-white font-bold text-sm mt-0.5">${stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">FICA (SS & Medicare):</span>
                    <p className="text-white font-bold text-sm mt-0.5">${(socialSecurityTax + medicareTax).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Annual Net Total:</span>
                    <p className="text-emerald-300 font-bold text-sm mt-0.5">${annualNetTakeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
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
