import React, { useState } from "react";
import { FileSpreadsheet, Printer, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export const QuoteGenerator: React.FC = () => {
  const [quoteNumber, setQuoteNumber] = useState("QT-1042");
  const [quoteDate, setQuoteDate] = useState("2026-10-18");
  const [clientName, setClientName] = useState("Sterling Media Group");
  const [validUntil, setValidUntil] = useState("2026-11-18");
  const [discountPercent, setDiscountPercent] = useState<number>(5);

  const [items, setItems] = useState<QuoteItem[]>([
    { id: "1", description: "Website Redesign & UI/UX Strategy", quantity: 1, rate: 4500 },
    { id: "2", description: "Design System Implementation & React Tokens", quantity: 1, rate: 2200 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: "Service / Deliverable", quantity: 1, rate: 500 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof QuoteItem, val: any) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  };

  const subtotal = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0), 0);
  const discountAmount = subtotal * ((discountPercent || 0) / 100);
  const quoteTotal = subtotal - discountAmount;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileSpreadsheet}
            title="Client Price Quote & Estimate Generator"
            description="Generate professional project proposals, client estimates, discounts, and print-ready PDF quotes."
          />
          <ResetButton onReset={() => {
            setQuoteNumber("QT-1042");
            setClientName("Sterling Media Group");
            setDiscountPercent(5);
            setItems([
              { id: "1", description: "Website Redesign & UI/UX Strategy", quantity: 1, rate: 4500 },
              { id: "2", description: "Design System Implementation & React Tokens", quantity: 1, rate: 2200 },
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Quote Number" value={quoteNumber} onChange={(e) => setQuoteNumber(e.target.value)} />
          <InputField label="Client / Company Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <InputField label="Quote Issue Date" type="date" value={quoteDate} onChange={(e) => setQuoteDate(e.target.value)} />
          <InputField label="Valid Through Date" type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Deliverables & Rates</h3>
            <Button size="sm" variant="secondary" onClick={addItem} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Scope Item
            </Button>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="col-span-6">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    min="0"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-1 text-center">
                  <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-rose-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-48">
            <InputField label="Promotional Discount (%)" type="number" suffix="%" value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} />
          </div>
          <div className="text-right space-y-1">
            <div className="text-xs text-slate-500">Gross Subtotal: <span className="font-bold text-slate-900">${subtotal.toLocaleString()}</span></div>
            {discountAmount > 0 && (
              <div className="text-xs text-emerald-600">Discount Savings: -${discountAmount.toLocaleString()}</div>
            )}
            <div className="text-xl font-extrabold text-indigo-600">Total Quote: ${quoteTotal.toLocaleString()}</div>
          </div>
        </div>

        <div className="pt-2">
          <Button onClick={() => window.print()} className="w-full flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" /> Print or Export Quote PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
