import React, { useState } from "react";
import { FileCode2, Sparkles, Check, Copy, Code } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const JsBeautifierMinifier: React.FC = () => {
  const sampleJs = `function calculateAmortization(principal, rate, termMonths) {
  // Monthly interest rate calculation
  const monthlyRate = (rate / 100) / 12;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  const monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
  return {
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    totalRepayment: Number((monthlyPayment * termMonths).toFixed(2))
  };
}`;

  const [jsInput, setJsInput] = useState<string>(sampleJs);
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");

  const minifyJs = (code: string): string => {
    return code
      .replace(/\/\/[^\n\r]*/g, "") // remove single line comments
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove multi line comments
      .replace(/\s+/g, " ") // collapse whitespaces
      .replace(/\s*([=+\-*\/<>{}();:,?!&|])\s*/g, "$1")
      .trim();
  };

  const beautifyJs = (code: string): string => {
    let indent = 0;
    const lines = code
      .replace(/\/\/[^\n\r]*/g, "")
      .replace(/\{/g, "{\n")
      .replace(/\}/g, "\n}\n")
      .replace(/;/g, ";\n")
      .split("\n");

    return lines
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((line) => {
        if (line.startsWith("}")) {
          indent = Math.max(0, indent - 1);
        }
        const formatted = "  ".repeat(indent) + line;
        if (line.endsWith("{")) {
          indent++;
        }
        return formatted;
      })
      .join("\n");
  };

  const outputJs = mode === "minify" ? minifyJs(jsInput) : beautifyJs(jsInput);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileCode2}
            title="JavaScript Code Beautifier & Formatter"
            description="Format, indent, and beautify unformatted JavaScript, or quickly strip non-essential whitespace and comments."
          />
          <ResetButton onReset={() => {
            setJsInput(sampleJs);
            setMode("beautify");
          }} />
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="inline-flex rounded-xl p-1 bg-white border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode("beautify")}
              className={`px-4 py-1.5 rounded-lg transition-colors ${mode === "beautify" ? "bg-indigo-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Beautify / Indent
            </button>
            <button
              type="button"
              onClick={() => setMode("minify")}
              className={`px-4 py-1.5 rounded-lg transition-colors ${mode === "minify" ? "bg-indigo-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Compact / Strip Comments
            </button>
          </div>
          <span className="text-xs font-mono text-slate-500">Pure Client-side Parsing</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">JavaScript Input</label>
            <textarea
              rows={10}
              value={jsInput}
              onChange={(e) => setJsInput(e.target.value)}
              className="w-full p-4 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste JavaScript code here..."
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {mode === "beautify" ? "Beautified JavaScript" : "Compacted JavaScript"}
              </label>
              <CopyButton textToCopy={outputJs} />
            </div>
            <textarea
              rows={10}
              readOnly
              value={outputJs}
              className="w-full p-4 font-mono text-xs bg-slate-900 text-indigo-300 border border-slate-800 rounded-2xl select-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
