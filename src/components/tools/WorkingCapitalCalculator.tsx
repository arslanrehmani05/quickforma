import React, { useState } from "react";
import { Scale, CheckCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const WorkingCapitalCalculator: React.FC = () => {
  const [cash, setCash] = useState<number>(120000);
  const [accountsReceivable, setAccountsReceivable] = useState<number>(85000);
  const [inventory, setInventory] = useState<number>(65000);
  const [otherCurrentAssets, setOtherCurrentAssets] = useState<number>(15000);
  const [accountsPayable, setAccountsPayable] = useState<number>(75000);
  const [shortTermDebt, setShortTermDebt] = useState<number>(30000);
  const [accruedLiabilities, setAccruedLiabilities] = useState<number>(20000);

  const totalCurrentAssets = (cash || 0) + (accountsReceivable || 0) + (inventory || 0) + (otherCurrentAssets || 0);
  const totalCurrentLiabilities = (accountsPayable || 0) + (shortTermDebt || 0) + (accruedLiabilities || 0);

  const netWorkingCapital = totalCurrentAssets - totalCurrentLiabilities;
  const currentRatio = totalCurrentLiabilities > 0 ? (totalCurrentAssets / totalCurrentLiabilities) : 0;
  const quickRatio = totalCurrentLiabilities > 0 ? ((totalCurrentAssets - (inventory || 0)) / totalCurrentLiabilities) : 0;

  const getLiquidityStatus = () => {
    if (currentRatio >= 1.5 && quickRatio >= 1.0) {
      return { label: "Strong Liquidity", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", icon: CheckCircle };
    }
    if (currentRatio >= 1.0) {
      return { label: "Adequate Coverage", color: "bg-amber-500/20 text-amber-300 border-amber-500/30", icon: AlertTriangle };
    }
    return { label: "Liquidity Deficit", color: "bg-rose-500/20 text-rose-300 border-rose-500/30", icon: AlertTriangle };
  };

  const status = getLiquidityStatus();
  const StatusIcon = status.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Scale}
            title="Working Capital & Current Ratio Calculator"
            description="Assess corporate liquidity, net working capital buffer, current ratio, and quick ratio acid-test coverage."
          />
          <ResetButton onReset={() => {
            setCash(120000);
            setAccountsReceivable(85000);
            setInventory(65000);
            setOtherCurrentAssets(15000);
            setAccountsPayable(75000);
            setShortTermDebt(30000);
            setAccruedLiabilities(20000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Current Assets (Due &lt; 1 Year)</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Cash & Equivalents ($)" type="number" prefix="$" value={cash} onChange={(e) => setCash(Number(e.target.value))} />
              <InputField label="Accounts Receivable ($)" type="number" prefix="$" value={accountsReceivable} onChange={(e) => setAccountsReceivable(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Inventory Valuation ($)" type="number" prefix="$" value={inventory} onChange={(e) => setInventory(Number(e.target.value))} />
              <InputField label="Prepaids & Other CA ($)" type="number" prefix="$" value={otherCurrentAssets} onChange={(e) => setOtherCurrentAssets(Number(e.target.value))} />
            </div>

            <h3 className="text-sm font-bold text-slate-800 pt-2 border-t border-slate-100">Current Liabilities (Due &lt; 1 Year)</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Accounts Payable ($)" type="number" prefix="$" value={accountsPayable} onChange={(e) => setAccountsPayable(Number(e.target.value))} />
              <InputField label="Short-Term Debt ($)" type="number" prefix="$" value={shortTermDebt} onChange={(e) => setShortTermDebt(Number(e.target.value))} />
            </div>
            <InputField label="Accrued Expenses & Payroll ($)" type="number" prefix="$" value={accruedLiabilities} onChange={(e) => setAccruedLiabilities(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Liquidity & Working Capital Health">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Working Capital Position</span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {status.label}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Net Working Capital</span>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${netWorkingCapital >= 0 ? "text-white" : "text-rose-400"}`}>
                    ${netWorkingCapital.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400">
                    Total Assets: ${totalCurrentAssets.toLocaleString()} | Total Liabilities: ${totalCurrentLiabilities.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Current Ratio</span>
                    <span className="text-lg font-bold text-white">{currentRatio.toFixed(2)}x</span>
                    <span className="text-[10px] text-slate-400 block">Benchmark: ≥ 1.5x</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Quick Acid Ratio</span>
                    <span className="text-lg font-bold text-white">{quickRatio.toFixed(2)}x</span>
                    <span className="text-[10px] text-slate-400 block">Benchmark: ≥ 1.0x</span>
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
