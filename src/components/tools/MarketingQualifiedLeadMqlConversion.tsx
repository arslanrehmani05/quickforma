import React, { useState } from "react";
import { Target, TrendingUp, Users, ArrowRight } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MarketingQualifiedLeadMqlConversion: React.FC = () => {
  const [mqlCount, setMqlCount] = useState<number>(500);
  const [sqlCount, setSqlCount] = useState<number>(150);
  const [dealsWon, setDealsWon] = useState<number>(30);
  const [averageDealValue, setAverageDealValue] = useState<number>(4500);

  const handleReset = () => {
    setMqlCount(500);
    setSqlCount(150);
    setDealsWon(30);
    setAverageDealValue(4500);
  };

  const mqlToSqlRate = mqlCount > 0 ? (sqlCount / mqlCount) * 100 : 0;
  const sqlToWinRate = sqlCount > 0 ? (dealsWon / sqlCount) * 100 : 0;
  const overallMqlToCustomerRate = mqlCount > 0 ? (dealsWon / mqlCount) * 100 : 0;
  const totalPipelineRevenue = dealsWon * averageDealValue;
  const valuePerMql = mqlCount > 0 ? totalPipelineRevenue / mqlCount : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="MQL to SQL to Customer Conversion Rate Solver"
        description="Analyze B2B marketing funnel progression, sales qualification velocity, and revenue yield per qualified lead."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Total MQLs Generated"
            value={mqlCount}
            onChange={(val) => setMqlCount(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="SQLs Accepted by Sales"
            value={sqlCount}
            onChange={(val) => setSqlCount(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Closed-Won Deals"
            value={dealsWon}
            onChange={(val) => setDealsWon(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Average Deal Value ($)"
            value={averageDealValue}
            onChange={(val) => setAverageDealValue(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="MQL ➔ SQL Velocity"
            value={`${mqlToSqlRate.toFixed(1)}%`}
            subtitle="Qualification acceptance rate"
            variant="light"
          />
          <ResultCard
            title="SQL ➔ Win Rate"
            value={`${sqlToWinRate.toFixed(1)}%`}
            subtitle="Sales execution closing rate"
            variant="light"
          />
          <ResultCard
            title="Full Funnel Conversion"
            value={`${overallMqlToCustomerRate.toFixed(2)}%`}
            subtitle="MQL to Paying Customer"
            variant="light"
          />
          <ResultCard
            title="Economic Value per MQL"
            value={`$${valuePerMql.toFixed(2)}`}
            subtitle="Attributed pipeline yield"
            variant="indigo"
          />
        </div>
      </div>
    </div>
  );
};
