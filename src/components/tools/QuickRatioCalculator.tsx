import React, { useState } from "react";
import { ShieldCheck, DollarSign, Scale, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const QuickRatioCalculator: React.FC = () => {
  const [cash, setCash] = useState<number>(120000);
  const [securities, setSecurities] = useState<number>(45000);
  const [accountsReceivable, setAccountsReceivable] = useState<number>(185000);
  const [currentLiabilities, setCurrentLiabilities] = useState<number>(220000);
  const [inventory, setInventory] = useState<number>(160000);

  const quickAssets = (cash || 0) + (securities || 0) + (accountsReceivable || 0);
  const quickRatio = currentLiabilities > 0 ? quickAssets / currentLiabilities : 0;
  const currentRatio = currentLiabilities > 0 ? (quickAssets + (inventory || 0)) / currentLiabilities : 0;
  const liquiditySurplus = quickAssets - (currentLiabilities || 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShieldCheck}
            title="Acid-Test / Quick Ratio Liquidity Solver"
            description="Measure immediate short-term corporate solvency and liquid asset backing without relying on inventory liquidation."
          />
          <ResetButton onReset={() => {
            setCash(120000);
            setSecurities(45000);
            setAccountsReceivable(185000);
            setCurrentLiabilities(220000);
            setInventory(160000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Cash & Cash Equivalents ($)" type="number" prefix="$" value={cash} onChange={(e) => setCash(Number(e.target.value))} />
            <InputField label="Marketable Short-Term Securities ($)" type="number" prefix="$" value={securities} onChange={(e) => setSecurities(Number(e.target.value))} />
            <InputField label="Accounts Receivable ($)" type="number" prefix="$" value={accountsReceivable} onChange={(e) => setAccountsReceivable(Number(e.target.value))} />
            <InputField label="Total Current Liabilities ($)" type="number" prefix="$" value={currentLiabilities} onChange={(e) => setCurrentLiabilities(Number(e.target.value))} />
            <InputField label="Merchandise Inventory (Excl. from Quick) ($)" type="number" prefix="$" value={inventory} onChange={(e) => setInventory(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Solvency & Liquidity Rating">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Acid-Test Quick Ratio</div>
                  <div className="text-4xl font-extrabold text-white">{quickRatio.toFixed(2)}x</div>
                  <div className={`text-xs font-semibold mt-1 ${quickRatio >= 1.0 ? "text-emerald-400" : "text-amber-300"}`}>
                    {quickRatio >= 1.0 ? "Healthy (Quick assets fully cover current debt)" : "Liquidity Squeeze (< 1.0x coverage)"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Quick Assets:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${quickAssets.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Current Ratio (w/ Inventory):</span>
                    <p className="text-indigo-200 font-bold text-sm mt-0.5">{currentRatio.toFixed(2)}x</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Quick Liquidity Cushion:</span>
                    <p className={`font-bold text-sm mt-0.5 ${liquiditySurplus >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      ${liquiditySurplus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Financial Target:</span>
                    <p className="text-white font-bold text-sm mt-0.5">&ge; 1.0x ratio</p>
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
