import React, { useState } from "react";
import { Palette, Sparkles, FileCode, Check, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const CssMinifierUnminifier: React.FC = () => {
  const sampleCss = `/* Production Header Navigation Styles */
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  transition: color 150ms ease-in-out;
}

.nav-link:hover {
  color: #4f46e5;
}`;

  const [cssInput, setCssInput] = useState<string>(sampleCss);
  const [activeTab, setActiveTab] = useState<"minify" | "beautify">("minify");

  const minifyCss = (css: string): string => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
      .replace(/\s+/g, " ") // collapse whitespace
      .replace(/\s*([:;{}])\s*/g, "$1") // strip spaces around punctuation
      .replace(/;}/g, "}") // remove trailing semicolons
      .trim();
  };

  const beautifyCss = (css: string): string => {
    const min = minifyCss(css);
    return min
      .replace(/\{/g, " {\n  ")
      .replace(/;/g, ";\n  ")
      .replace(/\s*\}/g, "\n}\n\n")
      .trim();
  };

  const outputCss = activeTab === "minify" ? minifyCss(cssInput) : beautifyCss(cssInput);
  const originalBytes = new Blob([cssInput]).size;
  const outputBytes = new Blob([outputCss]).size;
  const savingsPct = originalBytes > 0 ? (((originalBytes - outputBytes) / originalBytes) * 100).toFixed(1) : "0.0";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Palette}
            title="CSS Minifier & Formatter"
            description="Compress stylesheets by eliminating comments and whitespace, or unminify minified CSS for clean human readability."
          />
          <ResetButton onReset={() => {
            setCssInput(sampleCss);
            setActiveTab("minify");
          }} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="inline-flex rounded-xl p-1 bg-white border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("minify")}
              className={`px-4 py-1.5 rounded-lg transition-colors ${activeTab === "minify" ? "bg-indigo-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Minify CSS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("beautify")}
              className={`px-4 py-1.5 rounded-lg transition-colors ${activeTab === "beautify" ? "bg-indigo-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Beautify / Unminify
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
            <span>Original: <strong>{originalBytes} B</strong></span>
            <span>Result: <strong>{outputBytes} B</strong></span>
            {activeTab === "minify" && (
              <span className="text-emerald-600 font-bold">Saved: {savingsPct}%</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">CSS Input</label>
            <textarea
              rows={10}
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              className="w-full p-4 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste CSS code here..."
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {activeTab === "minify" ? "Minified CSS" : "Formatted CSS"}
              </label>
              <CopyButton textToCopy={outputCss} />
            </div>
            <textarea
              rows={10}
              readOnly
              value={outputCss}
              className="w-full p-4 font-mono text-xs bg-slate-900 text-indigo-300 border border-slate-800 rounded-2xl select-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
