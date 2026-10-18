import React, { useState } from "react";
import { Layers, Printer, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";

interface BomRow {
  id: string;
  partNumber: string;
  partName: string;
  qtyPerUnit: number;
  unitCost: number;
  makeOrBuy: "Make" | "Buy";
}

export const BillOfMaterialsGenerator: React.FC = () => {
  const [assemblyName, setAssemblyName] = useState("Commercial Drone Gimbal Assembly");
  const [assemblySku, setAssemblySku] = useState("ASM-902-X");
  const [batchQuantity, setBatchQuantity] = useState<number>(500);

  const [parts, setParts] = useState<BomRow[]>([
    { id: "1", partNumber: "CNC-AL-6061", partName: "CNC Anodized Aluminum Bracket", qtyPerUnit: 2, unitCost: 14.50, makeOrBuy: "Make" },
    { id: "2", partNumber: "MOT-BL-2208", partName: "Brushless DC Gimbal Motor", qtyPerUnit: 3, unitCost: 18.20, makeOrBuy: "Buy" },
    { id: "3", partNumber: "PCB-CTR-V3", partName: "32-Bit Microcontroller IMU Board", qtyPerUnit: 1, unitCost: 28.00, makeOrBuy: "Buy" },
    { id: "4", partNumber: "SCR-M3-8MM", partName: "M3 Stainless Hex Fastener Pack", qtyPerUnit: 12, unitCost: 0.15, makeOrBuy: "Buy" },
  ]);

  const addPart = () => {
    setParts([...parts, { id: Date.now().toString(), partNumber: "PART-NEW", partName: "Mechanical Component", qtyPerUnit: 1, unitCost: 5.00, makeOrBuy: "Buy" }]);
  };

  const removePart = (id: string) => {
    if (parts.length > 1) setParts(parts.filter((p) => p.id !== id));
  };

  const updatePart = (id: string, field: keyof BomRow, val: any) => {
    setParts(parts.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const costPerAssembly = parts.reduce((sum, p) => sum + (Number(p.qtyPerUnit) || 0) * (Number(p.unitCost) || 0), 0);
  const totalBatchCost = costPerAssembly * (batchQuantity || 1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Layers}
            title="Manufacturing Bill of Materials (BOM) Sheet"
            description="Itemize assembly component parts, sourcing costs, make-vs-buy splits, and production run expenditures."
          />
          <ResetButton onReset={() => {
            setAssemblyName("Commercial Drone Gimbal Assembly");
            setAssemblySku("ASM-902-X");
            setBatchQuantity(500);
            setParts([
              { id: "1", partNumber: "CNC-AL-6061", partName: "CNC Anodized Aluminum Bracket", qtyPerUnit: 2, unitCost: 14.50, makeOrBuy: "Make" },
              { id: "2", partNumber: "MOT-BL-2208", partName: "Brushless DC Gimbal Motor", qtyPerUnit: 3, unitCost: 18.20, makeOrBuy: "Buy" },
              { id: "3", partNumber: "PCB-CTR-V3", partName: "32-Bit Microcontroller IMU Board", qtyPerUnit: 1, unitCost: 28.00, makeOrBuy: "Buy" },
              { id: "4", partNumber: "SCR-M3-8MM", partName: "M3 Stainless Hex Fastener Pack", qtyPerUnit: 12, unitCost: 0.15, makeOrBuy: "Buy" },
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField label="Assembly Product Name" value={assemblyName} onChange={(e) => setAssemblyName(e.target.value)} />
          <InputField label="Master Assembly SKU" value={assemblySku} onChange={(e) => setAssemblySku(e.target.value)} />
          <InputField label="Planned Production Run (Units)" type="number" value={batchQuantity} onChange={(e) => setBatchQuantity(Number(e.target.value))} />
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Component Hierarchy (Level 1)</h3>
            <Button size="sm" variant="secondary" onClick={addPart} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add BOM Component
            </Button>
          </div>

          <div className="space-y-2">
            {parts.map((p) => (
              <div key={p.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="col-span-3">
                  <input
                    type="text"
                    value={p.partNumber}
                    onChange={(e) => updatePart(p.id, "partNumber", e.target.value)}
                    placeholder="Part #"
                    className="w-full text-xs font-mono px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-4">
                  <input
                    type="text"
                    value={p.partName}
                    onChange={(e) => updatePart(p.id, "partName", e.target.value)}
                    placeholder="Description"
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min="1"
                    value={p.qtyPerUnit}
                    onChange={(e) => updatePart(p.id, "qtyPerUnit", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    value={p.unitCost}
                    onChange={(e) => updatePart(p.id, "unitCost", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removePart(p.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs text-slate-400">Total Material Cost per Finished Unit:</span>
            <p className="text-2xl font-extrabold text-white">${costPerAssembly.toFixed(2)}/unit</p>
            <span className="text-xs text-emerald-400 font-semibold block">
              Extended Batch Cost ({batchQuantity} units): ${totalBatchCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <Button variant="primary" onClick={() => window.print()} className="flex items-center gap-1.5">
            <Printer className="w-4 h-4" /> Print BOM
          </Button>
        </div>
      </div>
    </div>
  );
};
