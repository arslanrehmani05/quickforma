import React, { useState } from "react";
import { Sparkles, Trash2, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const TextCleanerSanitizer: React.FC = () => {
  const [inputText, setInputText] = useState(`<p>Hello <b>QuickForma</b> user!&nbsp;&nbsp;&nbsp;This is a sample text with <span>HTML tags</span>, extra   spaces, and non-ASCII characters: “smart quotes” and em—dashes.</p>`);
  const [stripHtml, setStripHtml] = useState(true);
  const [removeNonAscii, setRemoveNonAscii] = useState(true);
  const [removeZeroWidth, setRemoveZeroWidth] = useState(true);
  const [normalizeWhitespace, setNormalizeWhitespace] = useState(true);
  const [trimLines, setTrimLines] = useState(true);

  const cleanText = () => {
    let text = inputText;

    if (stripHtml) {
      text = text.replace(/<[^>]*>/g, " ");
      text = text.replace(/&nbsp;/g, " ");
      text = text.replace(/&amp;/g, "&");
      text = text.replace(/&lt;/g, "<");
      text = text.replace(/&gt;/g, ">");
      text = text.replace(/&quot;/g, '"');
    }

    if (removeZeroWidth) {
      // Remove zero-width spaces, BOM, joiners
      text = text.replace(/[\u200B\u200C\u200D\u200E\u200F\uFEFF\u00AD]/g, "");
    }

    if (removeNonAscii) {
      text = text.replace(/[“”]/g, '"');
      text = text.replace(/[‘’]/g, "'");
      text = text.replace(/[—–]/g, "-");
      text = text.replace(/[^\x00-\x7F]/g, "");
    }

    if (normalizeWhitespace) {
      text = text.replace(/\t/g, " ");
      text = text.replace(/ +/g, " ");
      text = text.replace(/\n\s*\n/g, "\n");
    }

    if (trimLines) {
      text = text.split("\n").map((l) => l.trim()).join("\n").trim();
    }

    return text;
  };

  const outputText = cleanText();
  const charsRemoved = Math.max(0, inputText.length - outputText.length);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Sparkles}
            title="HTML Strip, Non-ASCII Remove & White Space Cleaner"
            description="Sanitize raw copy by stripping HTML tags, eliminating non-ASCII artifacts, normalizing spaces, and standardizing quotes."
          />
          <ResetButton onReset={() => {
            setInputText(`<p>Hello <b>QuickForma</b> user!&nbsp;&nbsp;&nbsp;This is a sample text with <span>HTML tags</span>, extra   spaces, and non-ASCII characters: “smart quotes” and em—dashes.</p>`);
            setStripHtml(true);
            setRemoveNonAscii(true);
            setNormalizeWhitespace(true);
            setTrimLines(true);
          }} />
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={stripHtml} onChange={(e) => setStripHtml(e.target.checked)} /> Strip HTML Tags
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={removeZeroWidth} onChange={(e) => setRemoveZeroWidth(e.target.checked)} /> Remove Zero-Width / BOM
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={removeNonAscii} onChange={(e) => setRemoveNonAscii(e.target.checked)} /> Standardize Quotes & Non-ASCII
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={normalizeWhitespace} onChange={(e) => setNormalizeWhitespace(e.target.checked)} /> Collapse Multiple Spaces
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} /> Trim Line Ends
          </label>
        </div>

        {charsRemoved > 0 && (
          <div className="px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
            <span>Cleaned successfully: {charsRemoved} unnecessary character(s) and artifact(s) removed</span>
            <span>{outputText.length} clean chars remaining</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Raw Source Text ({inputText.length} chars)</label>
            <textarea
              rows={10}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Sanitized Output ({outputText.length} chars)</label>
              <CopyButton textToCopy={outputText} variant="ghost" />
            </div>
            <textarea
              readOnly
              rows={10}
              value={outputText}
              className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
