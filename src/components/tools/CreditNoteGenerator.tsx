import React, { useState } from "react";
import { FileText, Printer, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";

interface CreditItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export const CreditNoteGenerator: React.FC = () => {
  const [creditNoteNumber, setCreditNoteNumber] = useState("CN-8041");
  const [originalInvoiceNumber, setOriginalInvoiceNumber] = useState("INV-2049");
  const [clientName, setClientName] = useState("Apex Global Logistics");
  const [creditDate, setCreditDate] = useState("2026-10-18");
  const [reason, setReason] = useState("Goods Returned / Damaged in Transit");

  const [items, setItems] = useState<CreditItem[]>([
    { id: "1", description: "Industrial Sensor Unit (Model X4)", quantity: 2, unitPrice: 450 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: "Credited Item / Service", quantity: 1, unitPrice: 100 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof CreditItem, val: any) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  };

  const totalCredit = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileText}
            title="Credit Note & Adjustment Generator"
            description="Generate professional accounting credit notes for product returns, invoice overbillings, or service adjustments."
          />
          <ResetButton onReset={() => {
            setCreditNoteNumber("CN-8041");
            setOriginalInvoiceNumber("INV-2049");
            setClientName("Apex Global Logistics");
            setReason("Goods Returned / Damaged in Transit");
            setItems([{ id: "1", description: "Industrial Sensor Unit (Model X4)", quantity: 2, unitPrice: 450 }]);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Credit Note #" value={creditNoteNumber} onChange={(e) => setCreditNoteNumber(e.target.value)} />
          <InputField label="Original Invoice #" value={originalInvoiceNumber} onChange={(e) => setOriginalInvoiceNumber(e.target.value)} />
          <InputField label="Customer / Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <InputField label="Reason for Credit" value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Credited Line Items</h3>
            <Button size="sm" variant="secondary" onClick={addItem} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Credited Item
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
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
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

        <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Total Credit Issued:</span>
            <p className="text-2xl font-extrabold text-emerald-400">${totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <Button variant="primary" onClick={() => window.print()} className="flex items-center gap-1.5">
            <Printer className="w-4 h-4" /> Print Credit Note
          </Button>
        </div>
      </div>
    </div>
  );
};
