import React, { useState } from "react";
import { Package, DollarSign, Percent, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DropshippingProfitMarginCalculator: React.FC = () => {
  const [retailPrice, setRetailPrice] = useState<number>(49.99);
  const [supplierCost, setSupplierCost] = useState<number>(12.50);
  const [shippingSupplierCost, setShippingSupplierCost] = useState<number>(4.20);
  const [adSpendCpa, setAdSpendCpa] = useState<number>(18.00); // Cost per acquisition
  const [paymentGatewayPct, setPaymentGatewayPct] = useState<number>(2.9);
  const [paymentGatewayFixed, setPaymentGatewayFixed] = useState<number>(0.30);

  const safePrice = Math.max(0, retailPrice);
  const safeSupplierCost = Math.max(0, supplierCost);
  const safeShipping = Math.max(0, shippingSupplierCost);
  const safeAdSpend = Math.max(0, adSpendCpa);

  const gatewayFee = safePrice > 0 ? safePrice * (paymentGatewayPct / 100) + paymentGatewayFixed : 0;
  const totalLandedCost = safeSupplierCost + safeShipping;
  const totalExpenses = totalLandedCost + safeAdSpend + gatewayFee;
  const netProfit = safePrice - totalExpenses;
  const netMarginPct = safePrice > 0 ? (netProfit / safePrice) * 100 : 0;
  const roas = safeAdSpend > 0 ? safePrice / safeAdSpend : 0;

  // Maximum CPA allowable to break even (profit = $0)
  const maxAllowableCpa = Math.max(0, safePrice - totalLandedCost - gatewayFee);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Package}
            title="Dropshipping Unit Economics & Net Profit Calculator"
            description="Calculate true net dropshipping profit margins accounting for AliExpress/CJ supplier cost, ePacket postage, payment processing, and CPA ad spend."
          />
          <ResetButton onReset={() => {
            setRetailPrice(49.99);
            setSupplierCost(12.50);
            setShippingSupplierCost(4.20);
            setAdSpendCpa(18.00);
            setPaymentGatewayPct(2.9);
            setPaymentGatewayFixed(0.30);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField
            label="Retail Sale Price ($)"
            type="number"
            min={1}
            step="0.01"
            value={retailPrice}
            onChange={(e) => setRetailPrice(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Supplier Item Cost ($)"
            type="number"
            min={0}
            step="0.01"
            value={supplierCost}
            onChange={(e) => setSupplierCost(Number(e.target.value))}
          />
          <InputField
            label="Supplier Shipping ($)"
            type="number"
            min={0}
            step="0.01"
            value={shippingSupplierCost}
            onChange={(e) => setShippingSupplierCost(Number(e.target.value))}
          />
          <InputField
            label="Ad Spend per Order CPA ($)"
            type="number"
            min={0}
            step="0.5"
            value={adSpendCpa}
            onChange={(e) => setAdSpendCpa(Number(e.target.value))}
          />
        </div>

        <ResultCard variant="dark" title="Dropshipping Unit Economics">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Profit / Order</span>
              <p className={`text-4xl font-extrabold mt-1 ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                ${netProfit.toFixed(2)}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">In your pocket</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Margin</span>
              <p className="text-4xl font-extrabold text-white mt-1">{netMarginPct.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Net profit / price</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Expenses</span>
              <p className="text-4xl font-extrabold text-amber-300 mt-1">${totalExpenses.toFixed(2)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Supplier + Ads + Gateway (${gatewayFee.toFixed(2)})</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Required ROAS</span>
              <p className="text-2xl font-bold text-indigo-300 mt-1">{roas.toFixed(2)}×</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Price / CPA</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
