import React, { useState } from "react";
import { Truck, Package, DollarSign, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FulfillmentCostPerOrderCalculator: React.FC = () => {
  const [pickPackFee, setPickPackFee] = useState<number>(2.75); // 3PL base pick & pack
  const [boxPackagingCost, setBoxPackagingCost] = useState<number>(0.95); // Corrugated mailer + tape + filler
  const [carrierPostage, setCarrierPostage] = useState<number>(5.80); // USPS Ground Advantage / UPS
  const [storageAllocationPerOrder, setStorageAllocationPerOrder] = useState<number>(0.45); // allocated warehouse storage pallet fee
  const [returnsCostPerOrder, setReturnsCostPerOrder] = useState<number>(0.60); // blended return allowance
  const [orderSalePrice, setOrderSalePrice] = useState<number>(45.00);
  const safePickPack = Math.max(0, pickPackFee);
  const safeBox = Math.max(0, boxPackagingCost);
  const safePostage = Math.max(0, carrierPostage);
  const safeStorage = Math.max(0, storageAllocationPerOrder);
  const safeReturns = Math.max(0, returnsCostPerOrder);
  const safeSalePrice = Math.max(0, orderSalePrice);

  const totalFulfillmentCost = safePickPack + safeBox + safePostage + safeStorage + safeReturns;
  const fulfillmentCostRatioPct = safeSalePrice > 0 ? (totalFulfillmentCost / safeSalePrice) * 100 : 0;
  const postagePct = totalFulfillmentCost > 0 ? (safePostage / totalFulfillmentCost) * 100 : 0;
  const handlingPct = totalFulfillmentCost > 0 ? 100 - postagePct : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Truck}
            title="Total Fulfillment Cost per Order (3PL & In-House) Calculator"
            description="Aggregate 3PL pick/pack fees, custom box packaging, carrier postage, warehouse storage, and blended returns into true fulfillment cost per shipment."
          />
          <ResetButton onReset={() => {
            setPickPackFee(2.75);
            setBoxPackagingCost(0.95);
            setCarrierPostage(5.80);
            setStorageAllocationPerOrder(0.45);
            setReturnsCostPerOrder(0.60);
            setOrderSalePrice(45.00);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <InputField
            label="Pick & Pack Fee ($)"
            type="number"
            min={0}
            step="0.05"
            value={pickPackFee}
            onChange={(e) => setPickPackFee(Number(e.target.value))}
          />
          <InputField
            label="Packaging & Box ($)"
            type="number"
            min={0}
            step="0.05"
            value={boxPackagingCost}
            onChange={(e) => setBoxPackagingCost(Number(e.target.value))}
          />
          <InputField
            label="Carrier Postage ($)"
            type="number"
            min={0}
            step="0.10"
            value={carrierPostage}
            onChange={(e) => setCarrierPostage(Number(e.target.value))}
          />
          <InputField
            label="Storage Pallet / Order ($)"
            type="number"
            min={0}
            step="0.05"
            value={storageAllocationPerOrder}
            onChange={(e) => setStorageAllocationPerOrder(Number(e.target.value))}
          />
          <InputField
            label="Blended Returns Reserve ($)"
            type="number"
            min={0}
            step="0.05"
            value={returnsCostPerOrder}
            onChange={(e) => setReturnsCostPerOrder(Number(e.target.value))}
          />
          <InputField
            label="Order Retail Value ($)"
            type="number"
            min={1}
            step="1"
            value={orderSalePrice}
            onChange={(e) => setOrderSalePrice(Math.max(1, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Order Fulfillment Economics">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Fulfillment / Order</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">${totalFulfillmentCost.toFixed(2)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Landed shipping expense</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">% of Order Value</span>
              <p className="text-4xl font-extrabold text-white mt-1">{fulfillmentCostRatioPct.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">of ${orderSalePrice.toFixed(2)} basket</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Postage vs Handling</span>
              <p className="text-2xl font-bold text-indigo-300 mt-2">
                {totalFulfillmentCost > 0 ? `${postagePct.toFixed(0)}% Carrier` : "—"}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">
                {totalFulfillmentCost > 0 ? `${handlingPct.toFixed(0)}% Warehouse ops` : "No costs entered"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Cost Assessment</span>
              <p className="text-sm font-bold text-slate-200 mt-1">
                {fulfillmentCostRatioPct <= 20 ? "Optimized & Lean (<20%)" : fulfillmentCostRatioPct <= 30 ? "Standard Range" : "High (Compresses Margin)"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
