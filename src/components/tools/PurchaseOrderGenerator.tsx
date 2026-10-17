import React, { useState } from "react";
import { FileText, Printer, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export const PurchaseOrderGenerator: React.FC = () => {
  const [poNumber, setPoNumber] = useState("PO-2026-001");
  const [poDate, setPoDate] = useState("2026-10-18");
  const [buyerName, setBuyerName] = useState("Acme Corporation");
  const [buyerAddress, setBuyerAddress] = useState("100 Tech Blvd, Suite 400, Austin, TX 78701");
  const [vendorName, setVendorName] = useState("Global Supplies LLC");
  const [vendorAddress, setVendorAddress] = useState("450 Logistics Way, Chicago, IL 60607");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");

  const [items, setItems] = useState<LineItem[]>([
    { id: "1", description: "Industrial Grade Barcode Scanners", quantity: 5, unitPrice: 280 },
    { id: "2", description: "Thermal Label Rolls (Case of 24)", quantity: 10, unitPrice: 45 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: "New Item", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof LineItem, val: any) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  };

  const subtotal = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0), 0);
  const taxRate = 0.0825; // 8.25% default
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileText}
            title="Purchase Order (PO) PDF Generator"
            description="Create commercial B2B purchase orders with line-item breakdowns, tax calculations, and print formatting."
          />
          <ResetButton onReset={() => {
            setPoNumber("PO-2026-001");
            setBuyerName("Acme Corporation");
            setVendorName("Global Supplies LLC");
            setItems([
              { id: "1", description: "Industrial Grade Barcode Scanners", quantity: 5, unitPrice: 280 },
              { id: "2", description: "Thermal Label Rolls (Case of 24)", quantity: 10, unitPrice: 45 },
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="PO Number" value={poNumber} onChange={(e) => setPoNumber(e.target.value)} />
          <InputField label="Order Date" type="date" value={poDate} onChange={(e) => setPoDate(e.target.value)} />
          <InputField label="Buyer Company Name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} />
          <InputField label="Vendor Company Name" value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
          <InputField label="Buyer Address" value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} />
          <InputField label="Vendor Address" value={vendorAddress} onChange={(e) => setVendorAddress(e.target.value)} />
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Line Items</h3>
            <Button size="sm" variant="secondary" onClick={addItem} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Item
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
                    placeholder="Description"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    placeholder="Qty"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    placeholder="Unit Price"
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
          <div className="text-xs text-slate-500">Payment Terms: <span className="font-semibold text-slate-700">{paymentTerms}</span></div>
          <div className="text-right space-y-1">
            <div className="text-xs text-slate-500">Subtotal: <span className="font-bold text-slate-900">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
            <div className="text-xs text-slate-500">Estimated Tax (8.25%): <span className="font-bold text-slate-900">${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
            <div className="text-lg font-extrabold text-indigo-600">Total: ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
        </div>

        <div className="pt-2">
          <Button onClick={() => window.print()} className="w-full flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" /> Print or Save Purchase Order PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
