import React, { useState } from "react";
import { Scale, TrendingDown, TrendingUp, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const StandardCostVarianceCalculator: React.FC = () => {
  const [standardPrice, setStandardPrice] = useState<number>(12.00);
  const [actualPricePaid, setActualPricePaid] = useState<number>(13.20);
  const [standardQuantity, setStandardQuantity] = useState<number>(1000);
  const [actualQuantityUsed, setActualQuantityUsed] = useState<number>(1050);

  const handleReset = () => {
    setStandardPrice(12.00);
    setActualPricePaid(13.20);
    setStandardQuantity(1000);
    setActualQuantityUsed(1050);
  };

  // Materials Price Variance (MPV) = (Actual Price - Standard Price) * Actual Quantity
  const priceVariance = (actualPricePaid - standardPrice) * actualQuantityUsed;
  // Materials Quantity Variance (MQV) = (Actual Quantity - Standard Quantity) * Standard Price
  const quantityVariance = (actualQuantityUsed - standardQuantity) * standardPrice;
  // Total Material Variance = (AP * AQ) - (SP * SQ)
  const totalVariance = (actualPricePaid * actualQuantityUsed) - (standardPrice * standardQuantity);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Direct Material & Labor Variance Solver"
        description="Compute standard cost accounting price variances (MPV) and quantity usage variances (MQV)."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Standard Budgeted Price per Unit ($)"
            value={standardPrice}
            onChange={(val) => setStandardPrice(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            prefix="$"
          />
          <InputField
            label="Actual Price Paid per Unit ($)"
            value={actualPricePaid}
            onChange={(val) => setActualPricePaid(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            prefix="$"
          />
          <InputField
            label="Standard Allowed Quantity"
            value={standardQuantity}
            onChange={(val) => setStandardQuantity(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Actual Quantity Used"
            value={actualQuantityUsed}
            onChange={(val) => setActualQuantityUsed(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Total Cost Variance"
          value={`${totalVariance >= 0 ? "+" : ""}$${totalVariance.toFixed(2)}`}
          subtitle={totalVariance <= 0 ? "Favorable (Under budget)" : "Unfavorable (Over budget)"}
          variant="indigo"
        />
        <ResultCard
          title="Price Variance (MPV)"
          value={`${priceVariance >= 0 ? "+" : ""}$${priceVariance.toFixed(2)}`}
          subtitle={priceVariance <= 0 ? "Favorable purchase price" : "Unfavorable premium paid"}
          variant="light"
        />
        <ResultCard
          title="Usage Variance (MQV)"
          value={`${quantityVariance >= 0 ? "+" : ""}$${quantityVariance.toFixed(2)}`}
          subtitle={quantityVariance <= 0 ? "Favorable efficiency" : "Unfavorable scrap/waste"}
          variant="light"
        />
        <ResultCard
          title="Standard Budget Target"
          value={`$${(standardPrice * standardQuantity).toLocaleString()}`}
          subtitle={`vs $${(actualPricePaid * actualQuantityUsed).toLocaleString()} actual`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Variance Accounting Audit</h4>
        <p className="text-slate-600">
          The total cost overrun of <strong className="text-slate-800">${totalVariance.toFixed(2)}</strong> is driven by two independent factors: paying <strong className="text-slate-800">${priceVariance.toFixed(2)}</strong> more due to price increases ($${actualPricePaid} vs $${standardPrice}) and wasting <strong className="text-slate-800">${quantityVariance.toFixed(2)}</strong> in excess material consumption ({actualQuantityUsed} vs {standardQuantity} units).
        </p>
      </div>
    </div>
  );
};
