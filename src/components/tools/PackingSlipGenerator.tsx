import React, { useState } from "react";
import { PackageCheck, Printer, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";

interface SlipItem {
  id: string;
  sku: string;
  description: string;
  ordered: number;
  shipped: number;
}

export const PackingSlipGenerator: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState("ORD-98421");
  const [shipDate, setShipDate] = useState("2026-10-18");
  const [carrier, setCarrier] = useState("FedEx Ground (Tracking: 74892019842)");
  const [recipient, setRecipient] = useState("Horizon Fulfillment Logistics");
  const [destination, setDestination] = useState("890 Industrial Pkwy, Dock 4, Ontario, CA 91761");

  const [items, setItems] = useState<SlipItem[]>([
    { id: "1", sku: "SKU-BLK-MD", description: "Matte Black Aluminum Enclosure (Medium)", ordered: 50, shipped: 50 },
    { id: "2", sku: "SKU-CAB-3M", description: "Heavy Duty Shielded Power Cable 3M", ordered: 100, shipped: 95 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), sku: "SKU-NEW", description: "Warehouse Stock Item", ordered: 1, shipped: 1 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof SlipItem, val: any) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  };

  const totalShippedUnits = items.reduce((sum, item) => sum + (Number(item.shipped) || 0), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={PackageCheck}
            title="Warehouse Shipping Packing Slip Generator"
            description="Generate clean warehouse order packing slips with SKU line items, quantity checks, and shipping notes."
          />
          <ResetButton onReset={() => {
            setOrderNumber("ORD-98421");
            setRecipient("Horizon Fulfillment Logistics");
            setItems([
              { id: "1", sku: "SKU-BLK-MD", description: "Matte Black Aluminum Enclosure (Medium)", ordered: 50, shipped: 50 },
              { id: "2", sku: "SKU-CAB-3M", description: "Heavy Duty Shielded Power Cable 3M", ordered: 100, shipped: 95 },
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Order / Invoice #" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
          <InputField label="Ship Date" type="date" value={shipDate} onChange={(e) => setShipDate(e.target.value)} />
          <InputField label="Carrier & Tracking Details" value={carrier} onChange={(e) => setCarrier(e.target.value)} />
          <InputField label="Consignee / Recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          <div className="md:col-span-2">
            <InputField label="Destination Shipping Address" value={destination} onChange={(e) => setDestination(e.target.value)} />
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Shipment Package Items</h3>
            <Button size="sm" variant="secondary" onClick={addItem} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add SKU
            </Button>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="col-span-3">
                  <input
                    type="text"
                    value={item.sku}
                    onChange={(e) => updateItem(item.id, "sku", e.target.value)}
                    className="w-full text-xs font-mono font-bold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    placeholder="SKU"
                  />
                </div>
                <div className="col-span-5">
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
                    value={item.ordered}
                    onChange={(e) => updateItem(item.id, "ordered", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    placeholder="Ordered"
                  />
                </div>
                <div className="col-span-1">
                  <input
                    type="number"
                    min="0"
                    value={item.shipped}
                    onChange={(e) => updateItem(item.id, "shipped", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    placeholder="Shipped"
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

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">Total Unique SKUs: <span className="font-bold text-slate-900">{items.length}</span></div>
          <div className="text-sm font-bold text-indigo-600">Total Package Units Shipped: {totalShippedUnits}</div>
        </div>

        <div className="pt-2">
          <Button onClick={() => window.print()} className="w-full flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" /> Print or Export Packing Slip PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
