import React, { useState } from "react";
import { Code2, ArrowLeftRight, Check, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const HtmlEntityEncoder: React.FC = () => {
  const [inputText, setInputText] = useState<string>(
    '<div class="header">\n  <h1>QuickForma & Partners &copy; 2026</h1>\n  <p>Price: 100€ & "Best Value" <span style=\'color: red\'>*</span></p>\n</div>'
  );
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [encodeMode, setEncodeMode] = useState<"named" | "decimal" | "hex">("named");

  const encodeHtml = (str: string): string => {
    if (encodeMode === "named") {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
        .replace(/©/g, "&copy;")
        .replace(/®/g, "&reg;")
        .replace(/€/g, "&euro;")
        .replace(/£/g, "&pound;")
        .replace(/¥/g, "&yen;");
    } else if (encodeMode === "decimal") {
      return str.replace(/[\s\S]/g, (char) => `&#${char.charCodeAt(0)};`);
    } else {
      return str.replace(/[\s\S]/g, (char) => `&#x${char.charCodeAt(0).toString(16).toUpperCase()};`);
    }
  };

  const decodeHtml = (str: string): string => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent || "";
  };

  const outputText = mode === "encode" ? encodeHtml(inputText) : decodeHtml(inputText);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Code2}
            title="HTML Entity Encoder & Decoder"
            description="Safely encode and decode special characters, HTML markup tags, and unicode glyphs for web security and XSS prevention."
          />
          <ResetButton onReset={() => {
            setInputText('<div class="header">\n  <h1>QuickForma & Partners &copy; 2026</h1>\n  <p>Price: 100€ & "Best Value" <span style=\'color: red\'>*</span></p>\n</div>');
            setMode("encode");
            setEncodeMode("named");
          }} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 uppercase">Operation:</span>
            <div className="inline-flex rounded-xl p-1 bg-white border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode("encode")}
                className={`px-4 py-1.5 rounded-lg transition-colors ${mode === "encode" ? "bg-indigo-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                Encode to Entities
              </button>
              <button
                type="button"
                onClick={() => setMode("decode")}
                className={`px-4 py-1.5 rounded-lg transition-colors ${mode === "decode" ? "bg-indigo-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                Decode Entities
              </button>
            </div>
          </div>

          {mode === "encode" && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase">Format:</span>
              <select
                value={encodeMode}
                onChange={(e) => setEncodeMode(e.target.value as any)}
                className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl"
              >
                <option value="named">Named Entities (&amp;lt;, &amp;amp;)</option>
                <option value="decimal">Decimal (&#60;, &#38;)</option>
                <option value="hex">Hexadecimal (&#x3C;, &#x26;)</option>
              </select>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {mode === "encode" ? "Raw HTML / Text Input" : "Encoded Entity Text Input"}
            </label>
            <textarea
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-4 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste text here..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {mode === "encode" ? "Encoded Output" : "Clean Decoded Output"}
              </label>
              <CopyButton textToCopy={outputText} />
            </div>
            <textarea
              rows={8}
              readOnly
              value={outputText}
              className="w-full p-4 font-mono text-xs bg-slate-900 text-indigo-300 border border-slate-800 rounded-2xl select-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
