import React, { useState } from "react";
import { CheckCircle2, AlertOctagon, TrendingUp, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SupplierOnTimeInFullOtif: React.FC = () => {
  const [totalOrderLines, setTotalOrderLines] = useState<number>(650);
  const [linesOnTime, setLinesOnTime] = useState<number>(610);
  const [linesInFull, setLinesInFull] = useState<number>(595);
  const [linesBothOtif, setLinesBothOtif] = useState<number>(575);
  const [totalOrderValue, setTotalOrderValue] = useState<number>(450000);
  const [retailerPenaltyRatePercent, setRetailerPenaltyRatePercent] = useState<number>(3.0); // Walmart 3% OTIF chargeback

  const handleReset = () => {
    setTotalOrderLines(650);
    setLinesOnTime(610);
    setLinesInFull(595);
    setLinesBothOtif(575);
    setTotalOrderValue(450000);
    setRetailerPenaltyRatePercent(3.0);
  };

  const otifPercent = totalOrderLines > 0 ? (linesBothOtif / totalOrderLines) * 100 : 0;
  const onTimePercent = totalOrderLines > 0 ? (linesOnTime / totalOrderLines) * 100 : 0;
  const inFullPercent = totalOrderLines > 0 ? (linesInFull / totalOrderLines) * 100 : 0;

  const defectLines = Math.max(0, totalOrderLines - linesBothOtif);
  const defectShare = totalOrderLines > 0 ? defectLines / totalOrderLines : 0;
  const nonCompliantValue = totalOrderValue * defectShare;
  const penaltyChargeback = nonCompliantValue * (retailerPenaltyRatePercent / 100);

  let rating = "Walmart Target (>= 98%)";
  if (otifPercent >= 98) rating = "Compliant (>= 98%)";
  else if (otifPercent >= 90) rating = "At Risk of Fines (90% - 98%)";
  else rating = "Severe Non-Compliance (< 90%)";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="OTIF Supplier Delivery Performance Rating"
        description="Compute On-Time In-Full (OTIF) vendor compliance ratings and retailer non-performance chargeback fines."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Total Purchase Order Lines"
            value={totalOrderLines}
            onChange={(val) => setTotalOrderLines(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Lines Delivered On-Time"
            value={linesOnTime}
            onChange={(val) => setLinesOnTime(Math.min(totalOrderLines, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
          />
          <InputField
            label="Lines Delivered In-Full"
            value={linesInFull}
            onChange={(val) => setLinesInFull(Math.min(totalOrderLines, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
          />
          <InputField
            label="Lines BOTH On-Time AND In-Full"
            value={linesBothOtif}
            onChange={(val) => setLinesBothOtif(Math.min(linesOnTime, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
          />
          <InputField
            label="Total Shipment Invoice Value ($)"
            value={totalOrderValue}
            onChange={(val) => setTotalOrderValue(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Retailer Defect Fine (%)"
            value={retailerPenaltyRatePercent}
            onChange={(val) => setRetailerPenaltyRatePercent(Math.min(20, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={20}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Overall OTIF Score"
          value={`${otifPercent.toFixed(1)}%`}
          subtitle={rating}
          variant="indigo"
        />
        <ResultCard
          title="On-Time Delivery Rate"
          value={`${onTimePercent.toFixed(1)}%`}
          subtitle={`${linesOnTime} / ${totalOrderLines} lines`}
          variant="light"
        />
        <ResultCard
          title="In-Full Fill Rate"
          value={`${inFullPercent.toFixed(1)}%`}
          subtitle={`${linesInFull} / ${totalOrderLines} lines`}
          variant="light"
        />
        <ResultCard
          title="Retailer Fine Chargeback"
          value={`-$${penaltyChargeback.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${retailerPenaltyRatePercent}% fine on failed lines`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Big-Box Vendor Compliance</h4>
        <p className="text-slate-600">
          Tier 1 retailers (Walmart, Target, Home Depot) mandate a minimum 98% OTIF benchmark. With an OTIF of <strong className="text-slate-800">{otifPercent.toFixed(1)}%</strong>, you face <strong className="text-slate-800">${penaltyChargeback.toLocaleString()}</strong> in automatic invoice deduction fines across {defectLines} non-compliant order lines.
        </p>
      </div>
    </div>
  );
};
