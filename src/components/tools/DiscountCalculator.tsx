import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';
import { SimpleCalculatorTemplate } from '../templates/SimpleCalculatorTemplate';

export const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<number>(100);
  const [discountPercent, setDiscountPercent] = useState<number>(20);

  const discountAmount = ((originalPrice || 0) * (discountPercent || 0)) / 100;
  const finalPrice = Math.max(0, (originalPrice || 0) - discountAmount);

  return (
    <SimpleCalculatorTemplate
      header={
        <ToolHeader
          icon={Tag}
          title="Discount & Sale Price Calculator"
          description="Calculate exact savings, final sale price, and tax amounts for discounted products."
        />
      }
      inputs={
        <>
          <InputField
            label="Original Price ($)"
            type="number"
            min="0"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(Number(e.target.value))}
            prefix="$"
            inputMode="decimal"
          />
          <InputField
            label="Discount Percentage (%)"
            type="number"
            min="0"
            max="100"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(Number(e.target.value))}
            suffix="%"
            inputMode="decimal"
          />
        </>
      }
      result={
        <ResultCard
          variant="indigo"
          title="Final Sale Price"
          value={`$${finalPrice.toFixed(2)}`}
          subtitle={`You save $${discountAmount.toFixed(2)} (${discountPercent}% off).`}
        />
      }
    />
  );
};
