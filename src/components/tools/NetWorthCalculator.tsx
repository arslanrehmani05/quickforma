import React, { useState } from "react";
import { Wallet, DollarSign, TrendingUp, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const NetWorthCalculator: React.FC = () => {
  // Assets
  const [cash, setCash] = useState<number>(35000);
  const [investments, setInvestments] = useState<number>(85000); // taxable brokerage
  const [retirement, setRetirement] = useState<number>(145000); // 401k / IRA
  const [realEstate, setRealEstate] = useState<number>(450000); // home market value
  const [vehicles, setVehicles] = useState<number>(28000);

  // Liabilities
  const [mortgage, setMortgage] = useState<number>(310000);
  const [autoLoans, setAutoLoans] = useState<number>(14000);
  const [studentLoans, setStudentLoans] = useState<number>(18000);
  const [creditCards, setCreditCards] = useState<number>(4500);

  const totalAssets = (cash || 0) + (investments || 0) + (retirement || 0) + (realEstate || 0) + (vehicles || 0);
  const totalLiabilities = (mortgage || 0) + (autoLoans || 0) + (studentLoans || 0) + (creditCards || 0);
  const netWorth = totalAssets - totalLiabilities;
  const liquidNetWorth = (cash || 0) + (investments || 0) - (creditCards || 0);

  const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Wallet}
            title="Assets minus Liabilities Household Net Worth Solver"
            description="Track your total financial net worth across liquid cash, investment portfolios, real estate equity, and debts."
          />
          <ResetButton onReset={() => {
            setCash(35000);
            setInvestments(85000);
            setRetirement(145000);
            setRealEstate(450000);
            setVehicles(28000);
            setMortgage(310000);
            setAutoLoans(14000);
            setStudentLoans(18000);
            setCreditCards(4500);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Assets (What You Own)</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Cash & Checking ($)" type="number" prefix="$" value={cash} onChange={(e) => setCash(Number(e.target.value))} />
              <InputField label="Taxable Investments ($)" type="number" prefix="$" value={investments} onChange={(e) => setInvestments(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Retirement (401k/IRA) ($)" type="number" prefix="$" value={retirement} onChange={(e) => setRetirement(Number(e.target.value))} />
              <InputField label="Real Estate Value ($)" type="number" prefix="$" value={realEstate} onChange={(e) => setRealEstate(Number(e.target.value))} />
            </div>
            <InputField label="Vehicle & Personal Valuables ($)" type="number" prefix="$" value={vehicles} onChange={(e) => setVehicles(Number(e.target.value))} />

            <h3 className="text-sm font-bold text-slate-800 pt-2 border-t border-slate-100">Liabilities (What You Owe)</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Mortgage Balance ($)" type="number" prefix="$" value={mortgage} onChange={(e) => setMortgage(Number(e.target.value))} />
              <InputField label="Auto Loan Balances ($)" type="number" prefix="$" value={autoLoans} onChange={(e) => setAutoLoans(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Student Loans ($)" type="number" prefix="$" value={studentLoans} onChange={(e) => setStudentLoans(Number(e.target.value))} />
              <InputField label="Credit Cards & Other ($)" type="number" prefix="$" value={creditCards} onChange={(e) => setCreditCards(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Household Net Worth">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Total Net Worth</span>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${netWorth >= 0 ? "text-emerald-400" : "text-rose-400"} font-mono`}>
                    ${netWorth.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400">
                    Total Assets: ${totalAssets.toLocaleString()} | Total Liabilities: ${totalLiabilities.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Liquid Net Worth</span>
                    <span className="text-base font-bold text-white">${liquidNetWorth.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Debt-to-Asset Ratio</span>
                    <span className="text-base font-bold text-white">{debtToAssetRatio.toFixed(1)}%</span>
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
