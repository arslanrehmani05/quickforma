import React, { useState } from "react";
import { Package, Plus, Trash2, Tag, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface BundleItem {
  id: string;
  name: string;
  standalonePrice: number;
  cogs: number;
}

export const ProductBundlePricingCalculator: React.FC = () => {
  const [items, setItems] = useState<BundleItem[]>([
    { id: "1", name: "Premium Leather Wallet", standalonePrice: 65, cogs: 18 },
    { id: "2", name: "Key Organizer Keychain", standalonePrice: 25, cogs: 6 },
    { id: "3", name: "RFID Passport Sleeve", standalonePrice: 30, cogs: 8 },
  ]);
  const [bundleDiscountPct, setBundleDiscountPct] = useState<number>(20);

  const safeDiscountPct = Math.min(99, Math.max(0, bundleDiscountPct));
  const totalRetailPrice = items.reduce((sum, i) => sum + Math.max(0, Number(i.standalonePrice) || 0), 0);
  const totalCogs = items.reduce((sum, i) => sum + Math.max(0, Number(i.cogs) || 0), 0);

  const bundleSalePrice = totalRetailPrice * (1 - safeDiscountPct / 100);
  const dollarSavings = totalRetailPrice - bundleSalePrice;

  const bundleGrossProfit = bundleSalePrice - totalCogs;
  const bundleMarginPct = bundleSalePrice > 0 ? (bundleGrossProfit / bundleSalePrice) * 100 : 0;

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), name: "Bonus Accessory", standalonePrice: 20, cogs: 5 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof BundleItem, val: any) => {
    const sanitizedVal = (field === "standalonePrice" || field === "cogs") ? Math.max(0, Number(val) || 0) : val;
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: sanitizedVal } : i)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Package}
            title="Product Bundle Pricing & Tiered Discount Calculator"
            description="Calculate bundle pricing, buyer perceived discount savings, and preserved blended gross margin."
          />
          <ResetButton onReset={() => {
            setItems([
              { id: "1", name: "Premium Leather Wallet", standalonePrice: 65, cogs: 18 },
              { id: "2", name: "Key Organizer Keychain", standalonePrice: 25, cogs: 6 },
              { id: "3", name: "RFID Passport Sleeve", standalonePrice: 30, cogs: 8 },
            ]);
            setBundleDiscountPct(20);
          }} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Bundle Component Items</h3>
            <Button size="sm" variant="secondary" onClick={addItem} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Item
            </Button>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="col-span-5">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-500">MSRP:</span>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={item.standalonePrice}
                      onChange={(e) => updateItem(item.id, "standalonePrice", Number(e.target.value))}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-500">COGS:</span>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={item.cogs}
                      onChange={(e) => updateItem(item.id, "cogs", Number(e.target.value))}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Bundle Offer Discount (%)
          </label>
          <input
            type="number"
            min={0}
            max={75}
            value={bundleDiscountPct}
            onChange={(e) => setBundleDiscountPct(Number(e.target.value))}
            className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
          />
        </div>

        <ResultCard variant="dark" title="Bundle Pricing Structure">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Recommended Bundle Price</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">${bundleSalePrice.toFixed(2)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Separately: ${totalRetailPrice.toFixed(2)}</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Buyer Savings</span>
              <p className="text-4xl font-extrabold text-white mt-1">${dollarSavings.toFixed(2)}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">{bundleDiscountPct}% perceived discount</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Bundle Gross Profit</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">${bundleGrossProfit.toFixed(2)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Total COGS: ${totalCogs.toFixed(2)}</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Blended Margin</span>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{bundleMarginPct.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Preserved profitability</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
