import React, { useState } from "react";
import { PieChart, Plus, Trash2, ShieldAlert } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface Shareholder {
  id: string;
  name: string;
  shares: number;
  classType: string;
}

export const CapTableCalculator: React.FC = () => {
  const [shareholders, setShareholders] = useState<Shareholder[]>([
    { id: "1", name: "Founder 1 (CEO)", shares: 4500000, classType: "Common" },
    { id: "2", name: "Founder 2 (CTO)", shares: 3500000, classType: "Common" },
    { id: "3", name: "Employee Option Pool (ESOP)", shares: 1000000, classType: "Options" },
    { id: "4", name: "Seed Investor", shares: 1000000, classType: "Preferred" },
  ]);

  const [newInvestmentAmount, setNewInvestmentAmount] = useState<number>(1000000);
  const [preMoneyValuation, setPreMoneyValuation] = useState<number>(9000000);

  const totalCurrentShares = shareholders.reduce((sum, s) => sum + Math.max(0, Number(s.shares) || 0), 0);
  const postMoneyValuation = preMoneyValuation + newInvestmentAmount;
  const pricePerShare = totalCurrentShares > 0 && preMoneyValuation > 0 ? preMoneyValuation / totalCurrentShares : 0;
  const newInvestorShares = pricePerShare > 0 ? Math.round(newInvestmentAmount / pricePerShare) : 0;
  const totalPostShares = totalCurrentShares + newInvestorShares;
  const investorDilutionPct = postMoneyValuation > 0 ? (newInvestmentAmount / postMoneyValuation) * 100 : 0;

  const addShareholder = () => {
    setShareholders([
      ...shareholders,
      { id: Date.now().toString(), name: "Angel Investor", shares: 250000, classType: "Preferred" },
    ]);
  };

  const removeShareholder = (id: string) => {
    if (shareholders.length > 1) {
      setShareholders(shareholders.filter((s) => s.id !== id));
    }
  };

  const updateShareholder = (id: string, field: keyof Shareholder, val: any) => {
    const cleanVal = field === "shares" ? Math.max(0, Number(val) || 0) : val;
    setShareholders(shareholders.map((s) => (s.id === id ? { ...s, [field]: cleanVal } : s)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={PieChart}
            title="Capitalization Table & Equity Dilution Calculator"
            description="Model pre-money vs post-money ownership percentages, price per share, and dilution across financing rounds."
          />
          <ResetButton onReset={() => {
            setShareholders([
              { id: "1", name: "Founder 1 (CEO)", shares: 4500000, classType: "Common" },
              { id: "2", name: "Founder 2 (CTO)", shares: 3500000, classType: "Common" },
              { id: "3", name: "Employee Option Pool (ESOP)", shares: 1000000, classType: "Options" },
              { id: "4", name: "Seed Investor", shares: 1000000, classType: "Preferred" },
            ]);
            setNewInvestmentAmount(1000000);
            setPreMoneyValuation(9000000);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Pre-Money Valuation ($)
            </label>
            <input
              type="number"
              min={0}
              step={100000}
              value={preMoneyValuation}
              onChange={(e) => setPreMoneyValuation(Math.max(0, Number(e.target.value)))}
              className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              New Investment Raised ($)
            </label>
            <input
              type="number"
              min={0}
              step={50000}
              value={newInvestmentAmount}
              onChange={(e) => setNewInvestmentAmount(Math.max(0, Number(e.target.value)))}
              className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Current Shareholders</h3>
            <Button size="sm" variant="secondary" onClick={addShareholder} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Shareholder
            </Button>
          </div>

          <div className="space-y-2">
            {shareholders.map((s) => {
              const currentPct = totalCurrentShares > 0 ? (s.shares / totalCurrentShares) * 100 : 0;
              const postPct = totalPostShares > 0 ? (s.shares / totalPostShares) * 100 : 0;
              return (
                <div key={s.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) => updateShareholder(s.id, "name", e.target.value)}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      min={0}
                      value={s.shares}
                      onChange={(e) => updateShareholder(s.id, "shares", Number(e.target.value))}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div className="col-span-2 text-center text-xs font-semibold text-slate-600">
                    {currentPct.toFixed(1)}% pre
                  </div>
                  <div className="col-span-2 text-center text-xs font-bold text-emerald-600">
                    {postPct.toFixed(1)}% post
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button onClick={() => removeShareholder(s.id)} className="text-slate-400 hover:text-rose-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ResultCard variant="dark" title="Post-Round Financing Structure">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Post-Money Valuation</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">${postMoneyValuation.toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Pre (${preMoneyValuation.toLocaleString()}) + Raised</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Share Price</span>
              <p className="text-3xl font-extrabold text-white mt-2">${pricePerShare.toFixed(3)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Per common share</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">New Investor Ownership</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">{investorDilutionPct.toFixed(2)}%</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">{newInvestorShares.toLocaleString()} new shares</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Post-Shares</span>
              <p className="text-2xl font-mono font-bold text-amber-300 mt-2">{totalPostShares.toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Fully diluted share count</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
