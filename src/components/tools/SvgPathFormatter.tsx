import React, { useState } from "react";
import { Shapes, Sparkles, Check, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const SvgPathFormatter: React.FC = () => {
  const samplePath = "M 10.00000 80.00000 Q 52.50000 10.00000 95.00000 80.00000 T 180.00000 80.00000";
  const [inputPath, setInputPath] = useState<string>(samplePath);
  const [precisionDecimals, setPrecisionDecimals] = useState<number>(2);

  const cleanSvgPath = (path: string, decimals: number): string => {
    return path
      .replace(/([0-9]+\.[0-9]+)/g, (match) => {
        const num = parseFloat(match);
        return Number(num.toFixed(decimals)).toString();
      })
      .replace(/\s+/g, " ")
      .trim();
  };

  const optimizedPath = cleanSvgPath(inputPath, precisionDecimals);
  const originalLen = inputPath.length;
  const optimizedLen = optimizedPath.length;
  const reductionPct = originalLen > 0 ? (((originalLen - optimizedLen) / originalLen) * 100).toFixed(1) : "0.0";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Shapes}
            title="SVG Path Data Optimizer & Cleaner"
            description="Round coordinates, strip redundant floats, and optimize SVG path 'd' attributes for faster vector rendering."
          />
          <ResetButton onReset={() => {
            setInputPath(samplePath);
            setPrecisionDecimals(2);
          }} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700 uppercase">Coordinate Precision:</span>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((dec) => (
                <button
                  key={dec}
                  type="button"
                  onClick={() => setPrecisionDecimals(dec)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${precisionDecimals === dec ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-700"}`}
                >
                  {dec} Decimals
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs font-mono text-slate-600">
            Length: <span className="line-through">{originalLen}</span> &rarr; <strong>{optimizedLen}</strong> chars
            <span className="ml-2 font-bold text-emerald-600">(-{reductionPct}%)</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Raw SVG Path 'd' Coordinates</label>
          <textarea
            rows={3}
            value={inputPath}
            onChange={(e) => setInputPath(e.target.value)}
            className="w-full p-4 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
            placeholder="Paste M 10 20 L 30 40 ... SVG path data..."
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Optimized Path</label>
            <CopyButton textToCopy={optimizedPath} />
          </div>
          <div className="p-4 bg-slate-900 text-emerald-300 font-mono text-xs rounded-2xl break-all select-all">
            {optimizedPath}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Visual Path Render Preview</h4>
          <div className="h-28 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-2">
            <svg viewBox="0 0 200 100" className="h-full w-auto stroke-indigo-600 fill-none stroke-2">
              <path d={optimizedPath} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
