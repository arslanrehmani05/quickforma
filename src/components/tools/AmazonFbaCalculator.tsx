import React, { useState } from "react";
import { Package, DollarSign, Percent, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AmazonFbaCalculator: React.FC = () => {
  const [sellingPrice, setSellingPrice] = useState<number>(29.99);
  const [productCost, setProductCost] = useState<number>(7.50);
  const [shippingToAmazon, setShippingToAmazon] = useState<number>(1.20);
  const [referralFeeRate, setReferralFeeRate] = useState<number>(15);
  const [fbaFulfillmentFee, setFbaFulfillmentFee] = useState<number>(4.75);
  const [monthlyStorageFee, setMonthlyStorageFee] = useState<number>(0.35);

  const referralFee = (sellingPrice || 0) * ((referralFeeRate || 0) / 100);
  const totalAmazonFees = referralFee + (fbaFulfillmentFee || 0) + (monthlyStorageFee || 0);
  const totalCogs = (productCost || 0) + (shippingToAmazon || 0);
  const totalCost = totalAmazonFees + totalCogs;
  const netProfit = (sellingPrice || 0) - totalCost;
  const profitMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;
  const roi = totalCogs > 0 ? (netProfit / totalCogs) * 100 : 0;
  const breakEvenPrice = (totalCogs + (fbaFulfillmentFee || 0) + (monthlyStorageFee || 0)) / (1 - (referralFeeRate || 0) / 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Package}
            title="Amazon FBA Fee & Net Profit Margin Calculator"
            description="Calculate Amazon seller referral fees, FBA pick & pack, storage, unit COGS, and real net profit margins."
          />
          <ResetButton onReset={() => {
            setSellingPrice(29.99);
            setProductCost(7.50);
            setShippingToAmazon(1.20);
            setReferralFeeRate(15);
            setFbaFulfillmentFee(4.75);
            setMonthlyStorageFee(0.35);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Retail Selling Price ($)"
              type="number"
              prefix="$"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              helpText="Listed price on Amazon marketplace."
            />
            <InputField
              label="Product Sourcing / Manufacturing Cost ($)"
              type="number"
              prefix="$"
              value={productCost}
              onChange={(e) => setProductCost(Number(e.target.value))}
              helpText="Per-unit landed FOB product cost."
            />
            <InputField
              label="Inbound Shipping to Amazon ($/unit)"
              type="number"
              prefix="$"
              value={shippingToAmazon}
              onChange={(e) => setShippingToAmazon(Number(e.target.value))}
              helpText="Freight forwarding and prep per unit."
            />
            <InputField
              label="Amazon Referral Fee (%)"
              type="number"
              suffix="%"
              value={referralFeeRate}
              onChange={(e) => setReferralFeeRate(Number(e.target.value))}
              helpText="Category standard: typically 8% to 15%."
            />
            <InputField
              label="FBA Fulfillment Pick & Pack Fee ($)"
              type="number"
              prefix="$"
              value={fbaFulfillmentFee}
              onChange={(e) => setFbaFulfillmentFee(Number(e.target.value))}
              helpText="Standard size tier weight fee."
            />
            <InputField
              label="Estimated Monthly Storage Fee per Unit ($)"
              type="number"
              prefix="$"
              value={monthlyStorageFee}
              onChange={(e) => setMonthlyStorageFee(Number(e.target.value))}
              helpText="Average monthly cubic foot allocation per unit."
            />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Per-Unit Economics">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Net Profit per Unit</div>
                  <div className={`text-4xl font-extrabold ${netProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    ${netProfit.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    Net Profit Margin: <span className="font-bold text-white">{profitMargin.toFixed(1)}%</span> | ROI: <span className="font-bold text-white">{roi.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <div className="text-[11px] text-slate-400 font-medium">Amazon Referral Fee</div>
                    <div className="text-base font-bold text-white mt-0.5">${referralFee.toFixed(2)}</div>
                  </div>
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <div className="text-[11px] text-slate-400 font-medium">Total Amazon Take</div>
                    <div className="text-base font-bold text-rose-300 mt-0.5">${totalAmazonFees.toFixed(2)}</div>
                  </div>
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <div className="text-[11px] text-slate-400 font-medium">Landed Product Cost</div>
                    <div className="text-base font-bold text-white mt-0.5">${totalCogs.toFixed(2)}</div>
                  </div>
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <div className="text-[11px] text-slate-400 font-medium">Break-Even Price</div>
                    <div className="text-base font-bold text-indigo-300 mt-0.5">${breakEvenPrice.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
