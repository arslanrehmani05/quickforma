import React, { useState } from 'react';
import { Receipt } from 'lucide-react';

export const SalesTaxCalculator: React.FC = () => {
  const [subtotal, setSubtotal] = useState<number>(150);
  const [taxRate, setTaxRate] = useState<number>(8.25);

  const taxAmount = (subtotal || 0) * ((taxRate || 0) / 100);
  const totalPrice = (subtotal || 0) + taxAmount;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Sales Tax Calculator</h2>
            <p className="text-slate-400 text-sm">Calculate tax amounts and total price with custom tax rates.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Subtotal Price ($)</label>
              <input
                type="number"
                min="0"
                value={subtotal}
                onChange={(e) => setSubtotal(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Sales Tax Rate (%)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Price (Inc. Tax)</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-indigo-400 font-mono">
                ${totalPrice.toFixed(2)}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono text-slate-200">${(subtotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax ({taxRate}%):</span>
                <span className="font-mono text-amber-400">+${taxAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
