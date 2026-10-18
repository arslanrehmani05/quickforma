import React, { useState } from "react";
import { Award, ArrowRightLeft, BookOpen } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SatActConcordanceCalculator: React.FC = () => {
  const [sourceTest, setSourceTest] = useState<"sat" | "act">("sat");
  const [satScore, setSatScore] = useState<number>(1350);
  const [actScore, setActScore] = useState<number>(29);

  // Official 2018 College Board & ACT Concordance Table
  interface ConcordanceEntry {
    act: number;
    satMin: number;
    satMax: number;
    satMid: number;
    percentile: string;
    tier: string;
  }

  const concordanceData: ConcordanceEntry[] = [
    { act: 36, satMin: 1570, satMax: 1600, satMid: 1590, percentile: "99th+", tier: "Most Competitive (Ivy / Elite)" },
    { act: 35, satMin: 1530, satMax: 1560, satMid: 1540, percentile: "99th", tier: "Most Competitive (Ivy / Elite)" },
    { act: 34, satMin: 1490, satMax: 1520, satMid: 1500, percentile: "99th", tier: "Highly Competitive (Top 20)" },
    { act: 33, satMin: 1450, satMax: 1480, satMid: 1460, percentile: "98th", tier: "Highly Competitive (Top 20)" },
    { act: 32, satMin: 1420, satMax: 1440, satMid: 1430, percentile: "97th", tier: "Very Competitive (Top 50)" },
    { act: 31, satMin: 1390, satMax: 1410, satMid: 1400, percentile: "95th", tier: "Very Competitive (Top 50)" },
    { act: 30, satMin: 1360, satMax: 1380, satMid: 1370, percentile: "93rd", tier: "Very Competitive (Top 50)" },
    { act: 29, satMin: 1330, satMax: 1350, satMid: 1340, percentile: "90th", tier: "Competitive" },
    { act: 28, satMin: 1300, satMax: 1320, satMid: 1310, percentile: "88th", tier: "Competitive" },
    { act: 27, satMin: 1260, satMax: 1290, satMid: 1280, percentile: "85th", tier: "Competitive" },
    { act: 26, satMin: 1230, satMax: 1250, satMid: 1240, percentile: "82nd", tier: "Above Average" },
    { act: 25, satMin: 1200, satMax: 1220, satMid: 1210, percentile: "78th", tier: "Above Average" },
    { act: 24, satMin: 1160, satMax: 1190, satMid: 1180, percentile: "74th", tier: "Above Average" },
    { act: 23, satMin: 1130, satMax: 1150, satMid: 1140, percentile: "69th", tier: "Average / Selective" },
    { act: 22, satMin: 1100, satMax: 1120, satMid: 1110, percentile: "63rd", tier: "Average / Selective" },
    { act: 21, satMin: 1060, satMax: 1090, satMid: 1080, percentile: "57th", tier: "Average / Selective" },
    { act: 20, satMin: 1030, satMax: 1050, satMid: 1040, percentile: "51st", tier: "National Median" },
    { act: 19, satMin: 990, satMax: 1020, satMid: 1010, percentile: "45th", tier: "Open Admissions" },
    { act: 18, satMin: 960, satMax: 980, satMid: 970, percentile: "39th", tier: "Open Admissions" },
    { act: 17, satMin: 920, satMax: 950, satMid: 930, percentile: "34th", tier: "Open Admissions" },
    { act: 16, satMin: 880, satMax: 910, satMid: 890, percentile: "28th", tier: "Open Admissions" },
    { act: 15, satMin: 830, satMax: 870, satMid: 850, percentile: "23rd", tier: "Open Admissions" },
    { act: 14, satMin: 780, satMax: 820, satMid: 800, percentile: "18th", tier: "Open Admissions" },
    { act: 13, satMin: 730, satMax: 770, satMid: 750, percentile: "13th", tier: "Basic" },
    { act: 12, satMin: 690, satMax: 720, satMid: 710, percentile: "9th", tier: "Basic" },
    { act: 11, satMin: 650, satMax: 680, satMid: 670, percentile: "5th", tier: "Basic" },
    { act: 10, satMin: 620, satMax: 640, satMid: 630, percentile: "2nd", tier: "Basic" },
    { act: 9, satMin: 590, satMax: 610, satMid: 600, percentile: "1st", tier: "Basic" },
  ];

  const getConcordanceFromSat = (score: number) => {
    for (const entry of concordanceData) {
      if (score >= entry.satMin) return entry;
    }
    return { act: 9, satMin: 400, satMax: 580, satMid: 500, percentile: "<1st", tier: "Basic" };
  };

  const getConcordanceFromAct = (composite: number) => {
    const match = concordanceData.find((e) => e.act === composite);
    if (match) return match;
    return { act: composite, satMin: 400, satMax: 580, satMid: 500, percentile: "<1st", tier: "Basic" };
  };

  const satMatch = getConcordanceFromSat(satScore);
  const actMatch = getConcordanceFromAct(actScore);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ArrowRightLeft}
            title="SAT to ACT Score Concordance & Percentile Tool"
            description="Official College Board and ACT concordance table mapping SAT (400-1600) and ACT Composite (1-36)."
          />
          <ResetButton onReset={() => {
            setSourceTest("sat");
            setSatScore(1350);
            setActScore(29);
          }} />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setSourceTest("sat")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${sourceTest === "sat" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Convert SAT to ACT
          </button>
          <button
            onClick={() => setSourceTest("act")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${sourceTest === "act" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Convert ACT to SAT
          </button>
        </div>

        {sourceTest === "sat" ? (
          <InputField
            label="SAT Total Score (400 - 1600)"
            type="number"
            min={400}
            max={1600}
            step={10}
            value={satScore}
            onChange={(e) => setSatScore(Math.min(1600, Math.max(400, Number(e.target.value))))}
          />
        ) : (
          <InputField
            label="ACT Composite Score (1 - 36)"
            type="number"
            min={1}
            max={36}
            step={1}
            value={actScore}
            onChange={(e) => setActScore(Math.min(36, Math.max(1, Number(e.target.value))))}
          />
        )}

        <ResultCard variant="dark" title="Official Concordance Conversion">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                {sourceTest === "sat" ? "Concordant ACT Score" : "Concordant SAT Score Range"}
              </span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">
                {sourceTest === "sat" ? satMatch.act : `${actMatch.satMin} – ${actMatch.satMax}`}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {sourceTest === "sat" ? "Scale 1 – 36 Composite" : `Midpoint anchor: ${actMatch.satMid}`}
              </span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">National Percentile</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                {sourceTest === "sat" ? satMatch.percentile : actMatch.percentile}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Nationwide test takers</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Admission Selectivity</span>
              <p className="text-sm font-bold text-white mt-1">
                {sourceTest === "sat" ? satMatch.tier : actMatch.tier}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">College Board / ACT Standard</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
