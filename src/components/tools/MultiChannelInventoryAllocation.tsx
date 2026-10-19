import React, { useState } from "react";
import { Layers, Store, ShoppingCart, Building, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MultiChannelInventoryAllocation: React.FC = () => {
  const [totalStock, setTotalStock] = useState<number>(3000);
  const [amazonDailySales, setAmazonDailySales] = useState<number>(45);
  const [shopifyDailySales, setShopifyDailySales] = useState<number>(25);
  const [wholesaleDailySales, setWholesaleDailySales] = useState<number>(10);
  const [targetDaysBuffer, setTargetDaysBuffer] = useState<number>(30);

  const handleReset = () => {
    setTotalStock(3000);
    setAmazonDailySales(45);
    setShopifyDailySales(25);
    setWholesaleDailySales(10);
    setTargetDaysBuffer(30);
  };

  const totalDailyVelocity = amazonDailySales + shopifyDailySales + wholesaleDailySales;
  const daysOfSupplyTotal = totalDailyVelocity > 0 ? totalStock / totalDailyVelocity : 0;

  // Proportional allocation based on velocity
  const amazonShare = totalDailyVelocity > 0 ? amazonDailySales / totalDailyVelocity : 0;
  const shopifyShare = totalDailyVelocity > 0 ? shopifyDailySales / totalDailyVelocity : 0;
  const wholesaleShare = totalDailyVelocity > 0 ? wholesaleDailySales / totalDailyVelocity : 0;

  const amazonAllocated = Math.round(totalStock * amazonShare);
  const shopifyAllocated = Math.round(totalStock * shopifyShare);
  const wholesaleAllocated = totalStock - amazonAllocated - shopifyAllocated;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Multi-Warehouse Reorder Allocation Solver"
        description="Allocate finished goods inventory across Amazon FBA, DTC ecommerce, and wholesale to prevent stockouts."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Total Available Finished Stock (Units)"
            value={totalStock}
            onChange={(val) => setTotalStock(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Amazon FBA Daily Sales (units/day)"
            value={amazonDailySales}
            onChange={(val) => setAmazonDailySales(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Shopify DTC Daily Sales (units/day)"
            value={shopifyDailySales}
            onChange={(val) => setShopifyDailySales(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="B2B Wholesale Daily Sales (units/day)"
            value={wholesaleDailySales}
            onChange={(val) => setWholesaleDailySales(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Target Days of Supply Buffer"
            value={targetDaysBuffer}
            onChange={(val) => setTargetDaysBuffer(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="days"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Amazon Allocation"
          value={`${amazonAllocated.toLocaleString()} units`}
          subtitle={`${(amazonShare * 100).toFixed(0)}% of stock`}
          variant="indigo"
        />
        <ResultCard
          title="Shopify Allocation"
          value={`${shopifyAllocated.toLocaleString()} units`}
          subtitle={`${(shopifyShare * 100).toFixed(0)}% of stock`}
          variant="light"
        />
        <ResultCard
          title="Wholesale Allocation"
          value={`${wholesaleAllocated.toLocaleString()} units`}
          subtitle={`${(wholesaleShare * 100).toFixed(0)}% of stock`}
          variant="light"
        />
        <ResultCard
          title="System Days of Supply"
          value={`${daysOfSupplyTotal.toFixed(1)} days`}
          subtitle={`${totalDailyVelocity} units sold / day`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Replenishment Priority</h4>
        <p className="text-slate-600">
          At current sales velocities, your total inventory will last <strong className="text-slate-800">{daysOfSupplyTotal.toFixed(0)} days</strong> across all channels. If supplier lead time exceeds {daysOfSupplyTotal.toFixed(0)} days, initiate emergency purchase orders now.
        </p>
      </div>
    </div>
  );
};
