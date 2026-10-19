import React, { useState } from "react";
import { ShoppingCart, Server, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const WoocommerceProfitCalculator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(28000);
  const [cogsPercent, setCogsPercent] = useState<number>(38);
  const [hostingAndPluginsMonthly, setHostingAndPluginsMonthly] = useState<number>(180);
  const [paymentFeePercent, setPaymentFeePercent] = useState<number>(2.9);
  const [paymentFeeFixed, setPaymentFeeFixed] = useState<number>(0.30);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(75.00);

  const handleReset = () => {
    setMonthlyRevenue(28000);
    setCogsPercent(38);
    setHostingAndPluginsMonthly(180);
    setPaymentFeePercent(2.9);
    setPaymentFeeFixed(0.30);
    setAverageOrderValue(75.00);
  };

  const orderCount = averageOrderValue > 0 ? monthlyRevenue / averageOrderValue : 0;
  const paymentProcessingCost = (monthlyRevenue * (paymentFeePercent / 100)) + (orderCount * paymentFeeFixed);
  const totalCogs = monthlyRevenue * (cogsPercent / 100);
  const totalCosts = totalCogs + paymentProcessingCost + hostingAndPluginsMonthly;
  const netProfit = monthlyRevenue - totalCosts;
  const netProfitMargin = monthlyRevenue > 0 ? (netProfit / monthlyRevenue) * 100 : 0;

  // Comparison to Shopify ($105/mo plan + 2.9% + 0.30)
  const shopifyHostingEquivalent = 105;
  const platformSavingsVsShopify = shopifyHostingEquivalent - hostingAndPluginsMonthly;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="WooCommerce Gateway & Hosting Cost Solver"
        description="Compute WooCommerce net margins after WordPress cloud hosting, premium extension subscriptions, and gateway fees."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Monthly Gross Sales ($)"
            value={monthlyRevenue}
            onChange={(val) => setMonthlyRevenue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Cost of Goods Sold (COGS %)"
            value={cogsPercent}
            onChange={(val) => setCogsPercent(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
          <InputField
            label="Average Order Value ($)"
            value={averageOrderValue}
            onChange={(val) => setAverageOrderValue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Hosting, Server & Plugins ($/mo)"
            value={hostingAndPluginsMonthly}
            onChange={(val) => setHostingAndPluginsMonthly(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Gateway Percentage Fee (%)"
            value={paymentFeePercent}
            onChange={(val) => setPaymentFeePercent(Math.min(10, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={10}
            suffix="%"
          />
          <InputField
            label="Gateway Fixed Fee per Order ($)"
            value={paymentFeeFixed}
            onChange={(val) => setPaymentFeeFixed(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Net Operating Profit"
          value={`$${netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Monthly bottom line"
          variant="indigo"
        />
        <ResultCard
          title="Net Profit Margin"
          value={`${netProfitMargin.toFixed(1)}%`}
          subtitle="Of total revenue"
          variant="light"
        />
        <ResultCard
          title="Payment Processing"
          value={`$${paymentProcessingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`Stripe / PayPal fees`}
          variant="light"
        />
        <ResultCard
          title="Hosting & Tech Overhead"
          value={`$${hostingAndPluginsMonthly}/mo`}
          subtitle="Server + licenses"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">WooCommerce vs SaaS Economics</h4>
        <p className="text-slate-600">
          Unlike closed platforms that levy a 0.5%–2.0% transaction penalty for using third-party payment gateways, WooCommerce charges 0% platform commission on transactions. On ${monthlyRevenue.toLocaleString()} in revenue, avoiding a 1% Shopify third-party fee saves <strong className="text-slate-800">${(monthlyRevenue * 0.01).toLocaleString()}</strong> each month.
        </p>
      </div>
    </div>
  );
};
