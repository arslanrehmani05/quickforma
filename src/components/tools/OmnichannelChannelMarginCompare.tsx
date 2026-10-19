import React, { useState } from "react";
import { Store, ShoppingCart, Building, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const OmnichannelChannelMarginCompare: React.FC = () => {
  const [retailPrice, setRetailPrice] = useState<number>(65.00);
  const [cogs, setCogs] = useState<number>(18.00);
  const [dtcPickPackShipping, setDtcPickPackShipping] = useState<number>(7.50);
  const [fbaFee, setFbaFee] = useState<number>(6.20);
  const [wholesaleDiscountPercent, setWholesaleDiscountPercent] = useState<number>(50);

  const handleReset = () => {
    setRetailPrice(65.00);
    setCogs(18.00);
    setDtcPickPackShipping(7.50);
    setFbaFee(6.20);
    setWholesaleDiscountPercent(50);
  };

  // Channel 1: DTC (Shopify): Price - COGS - (2.9% + 0.30) - PickPackShipping
  const dtcGatewayFee = (retailPrice * 0.029) + 0.30;
  const dtcProfit = retailPrice - cogs - dtcGatewayFee - dtcPickPackShipping;
  const dtcMargin = retailPrice > 0 ? (dtcProfit / retailPrice) * 100 : 0;

  // Channel 2: Amazon FBA: Price - COGS - (15% referral) - FBA fee
  const amazonReferralFee = retailPrice * 0.15;
  const amazonProfit = retailPrice - cogs - amazonReferralFee - fbaFee;
  const amazonMargin = retailPrice > 0 ? (amazonProfit / retailPrice) * 100 : 0;

  // Channel 3: B2B Wholesale: Wholesale Price - COGS - Bulk shipping/pack ($1)
  const wholesalePrice = retailPrice * (1 - wholesaleDiscountPercent / 100);
  const wholesalePack = 1.00;
  const wholesaleProfit = wholesalePrice - cogs - wholesalePack;
  const wholesaleMargin = wholesalePrice > 0 ? (wholesaleProfit / wholesalePrice) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Amazon vs Shopify vs Wholesale Margin Comparison"
        description="Compare unit economics, channel fees, and net profit margins across Direct-to-Consumer, Amazon FBA, and B2B Wholesale."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Retail List Price ($)"
            value={retailPrice}
            onChange={(val) => setRetailPrice(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Manufacturing COGS ($)"
            value={cogs}
            onChange={(val) => setCogs(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="DTC Pick, Pack & Shipping ($)"
            value={dtcPickPackShipping}
            onChange={(val) => setDtcPickPackShipping(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Amazon FBA Fulfillment Fee ($)"
            value={fbaFee}
            onChange={(val) => setFbaFee(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Wholesale Discount from MSRP (%)"
            value={wholesaleDiscountPercent}
            onChange={(val) => setWholesaleDiscountPercent(Math.min(90, Math.max(10, Number(val) || 0)))}
            type="number"
            min={10}
            max={90}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-indigo-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900">Shopify DTC</h4>
            <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded">Highest Margin</span>
          </div>
          <div className="text-2xl font-bold text-indigo-600">${dtcProfit.toFixed(2)}</div>
          <p className="text-xs text-slate-500 font-medium">Profit per unit ({dtcMargin.toFixed(1)}% margin)</p>
          <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
            <div>Gateway Fee: ${dtcGatewayFee.toFixed(2)}</div>
            <div>Pick & Ship: ${dtcPickPackShipping.toFixed(2)}</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900">Amazon FBA</h4>
            <span className="text-xs font-semibold px-2 py-0.5 bg-amber-50 text-amber-700 rounded">High Volume</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">${amazonProfit.toFixed(2)}</div>
          <p className="text-xs text-slate-500 font-medium">Profit per unit ({amazonMargin.toFixed(1)}% margin)</p>
          <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
            <div>15% Referral: ${amazonReferralFee.toFixed(2)}</div>
            <div>FBA Fee: ${fbaFee.toFixed(2)}</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900">B2B Wholesale</h4>
            <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded">Bulk Cash</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">${wholesaleProfit.toFixed(2)}</div>
          <p className="text-xs text-slate-500 font-medium">Profit per unit ({wholesaleMargin.toFixed(1)}% margin)</p>
          <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
            <div>Wholesale Price: ${wholesalePrice.toFixed(2)}</div>
            <div>Bulk Packing: $1.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};
