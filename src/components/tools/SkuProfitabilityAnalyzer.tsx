import React, { useState } from "react";
import { BarChart3, Plus, Trash2, Tag, TrendingUp, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface SkuRow {
  id: string;
  sku: string;
  unitsSold: number;
  price: number;
  cogs: number;
}

export const SkuProfitabilityAnalyzer: React.FC = () => {
  const [skus, setSkus] = useState<SkuRow[]>([
    { id: "1", sku: "SKU-BLK-01", unitsSold: 450, price: 40, cogs: 12 },
    { id: "2", sku: "SKU-WHT-02", unitsSold: 280, price: 55, cogs: 18 },
    { id: "3", sku: "SKU-BLU-03", unitsSold: 90, price: 70, cogs: 30 },
  ]);

  const totalRevenue = skus.reduce((sum, s) => sum + Math.max(0, s.unitsSold) * Math.max(0, s.price), 0);
  const totalGrossProfit = skus.reduce((sum, s) => sum + Math.max(0, s.unitsSold) * (Math.max(0, s.price) - Math.max(0, s.cogs)), 0);
  const totalUnits = skus.reduce((sum, s) => sum + Math.max(0, s.unitsSold), 0);
  const blendedMarginPct = totalRevenue > 0 ? (totalGrossProfit / totalRevenue) * 100 : 0;

  // Identify top SKU by gross profit contribution
  const sortedSkus = [...skus].sort((a, b) => {
    const pA = Math.max(0, a.unitsSold) * (Math.max(0, a.price) - Math.max(0, a.cogs));
    const pB = Math.max(0, b.unitsSold) * (Math.max(0, b.price) - Math.max(0, b.cogs));
    return pB - pA;
  });
  const topSku = sortedSkus[0];

  const addSku = () => {
    setSkus([...skus, { id: Date.now().toString(), sku: `SKU-NEW-0${skus.length + 1}`, unitsSold: 100, price: 50, cogs: 20 }]);
  };

  const removeSku = (id: string) => {
    if (skus.length > 1) setSkus(skus.filter((s) => s.id !== id));
  };

  const updateSku = (id: string, field: keyof SkuRow, val: any) => {
    setSkus(skus.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BarChart3}
            title="Multi-SKU Profitability & Contribution Margin Analyzer"
            description="Analyze per-SKU contribution margin, unit volume sales velocity, and identify top revenue vs top profit drivers."
          />
          <ResetButton onReset={() => {
            setSkus([
              { id: "1", sku: "SKU-BLK-01", unitsSold: 450, price: 40, cogs: 12 },
              { id: "2", sku: "SKU-WHT-02", unitsSold: 280, price: 55, cogs: 18 },
              { id: "3", sku: "SKU-BLU-03", unitsSold: 90, price: 70, cogs: 30 },
            ]);
          }} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Catalog SKUs ({skus.length})</h3>
            <Button size="sm" variant="secondary" onClick={addSku} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add SKU
            </Button>
          </div>

          <div className="space-y-2">
            {skus.map((s) => (
              <div key={s.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="col-span-4">
                  <input
                    type="text"
                    value={s.sku}
                    onChange={(e) => updateSku(s.id, "sku", e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min={0}
                    placeholder="Units"
                    value={s.unitsSold}
                    onChange={(e) => updateSku(s.id, "unitsSold", Math.max(0, Number(e.target.value)))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                  <span className="text-[10px] text-slate-400 block text-center">Units Sold</span>
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="Price"
                    value={s.price}
                    onChange={(e) => updateSku(s.id, "price", Math.max(0, Number(e.target.value)))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                  <span className="text-[10px] text-slate-400 block text-center">Price ($)</span>
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="COGS"
                    value={s.cogs}
                    onChange={(e) => updateSku(s.id, "cogs", Math.max(0, Number(e.target.value)))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                  <span className="text-[10px] text-slate-400 block text-center">Unit COGS ($)</span>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeSku(s.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ResultCard variant="dark" title="Catalog Portfolio Economics">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Gross Profit</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                ${Math.round(totalGrossProfit).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">From {totalUnits} total units</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Blended Margin</span>
              <p className="text-4xl font-extrabold text-white mt-1">
                {totalRevenue > 0 ? `${blendedMarginPct.toFixed(1)}%` : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Revenue: ${Math.round(totalRevenue).toLocaleString()}</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Top Profit Driver</span>
              <p className="text-2xl font-mono font-bold text-indigo-300 mt-2">{topSku?.sku || "—"}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                ${Math.round((topSku?.unitsSold || 0) * ((topSku?.price || 0) - (topSku?.cogs || 0))).toLocaleString()} profit
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Portfolio Health</span>
              <p className="text-sm font-bold text-slate-200 mt-1">
                {totalRevenue === 0 ? "Enter SKU Sales" :
                 blendedMarginPct >= 50 ? "High Margin (Strong Portfolio)" :
                 blendedMarginPct >= 30 ? "Standard Ecommerce Range" : "Low Margin / High COGS"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
