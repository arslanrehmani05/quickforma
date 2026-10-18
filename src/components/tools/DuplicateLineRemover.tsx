import React, { useState } from "react";
import { ListFilter, Copy, Download, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const DuplicateLineRemover: React.FC = () => {
  const [inputText, setInputText] = useState(
    `apple\nbanana\norange\napple\ngrape\nbanana\nwatermelon\norange\nkiwi`
  );
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [sortAlphabetical, setSortAlphabetical] = useState(false);

  const rawLines = inputText.split("\n");
  const originalCount = rawLines.length;

  const processLines = () => {
    let lines = rawLines;
    if (trimWhitespace) lines = lines.map((l) => l.trim());
    lines = lines.filter((l) => l.length > 0);

    const seen = new Set<string>();
    const unique: string[] = [];

    lines.forEach((line) => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    });

    if (sortAlphabetical) {
      unique.sort((a, b) => a.localeCompare(b));
    }

    return unique;
  };

  const outputLines = processLines();
  const cleanedText = outputLines.join("\n");
  const duplicatesRemoved = Math.max(0, originalCount - outputLines.length);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ListFilter}
            title="Text Deduplication & Duplicate Line Remover"
            description="Clean and deduplicate lists, emails, keywords, and datasets with optional alphabetical sorting and whitespace trimming."
          />
          <ResetButton onReset={() => {
            setInputText("apple\nbanana\norange\napple\ngrape\nbanana\nwatermelon\norange\nkiwi");
            setCaseSensitive(false);
            setTrimWhitespace(true);
            setSortAlphabetical(false);
          }} />
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={trimWhitespace} onChange={(e) => setTrimWhitespace(e.target.checked)} />
            Trim Line Whitespace
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
            Case Sensitive Comparison
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={sortAlphabetical} onChange={(e) => setSortAlphabetical(e.target.checked)} />
            Sort Alphabetically (A-Z)
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Input Raw Lines ({originalCount})</label>
            <textarea
              rows={12}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Cleaned Unique Lines ({outputLines.length})</label>
              <CopyButton textToCopy={cleanedText} variant="ghost" />
            </div>
            <textarea
              readOnly
              rows={12}
              value={cleanedText}
              className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800"
            />
          </div>
        </div>

        <ResultCard variant="dark" title="Deduplication Stats">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400">Original Total Lines</span>
              <p className="text-xl font-bold text-white mt-0.5">{originalCount}</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400">Duplicates Removed</span>
              <p className="text-xl font-bold text-rose-300 mt-0.5">-{duplicatesRemoved}</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400">Unique Remaining</span>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">{outputLines.length}</p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
