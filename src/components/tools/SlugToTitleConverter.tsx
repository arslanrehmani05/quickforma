import React, { useState } from "react";
import { Type, ArrowRightLeft, Check, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const SlugToTitleConverter: React.FC = () => {
  const [slugInput, setSlugInput] = useState<string>("quarter-to-semester-gpa-converter-for-college-transfers");
  const [casingStyle, setCasingStyle] = useState<"title" | "capital" | "sentence">("title");

  const stopWords = new Set(["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "from", "by", "of", "in"]);

  const convertSlugToTitle = (slug: string, style: "title" | "capital" | "sentence"): string => {
    const words = slug
      .replace(/[-_]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);

    if (words.length === 0) return "";

    if (style === "sentence") {
      const lower = words.join(" ").toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    } else if (style === "capital") {
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    } else {
      // AP Title Case: keep minor prepositions and articles lowercase unless first/last word
      return words
        .map((word, idx) => {
          const lower = word.toLowerCase();
          if (idx === 0 || idx === words.length - 1 || !stopWords.has(lower)) {
            return lower.charAt(0).toUpperCase() + lower.slice(1);
          }
          return lower;
        })
        .join(" ");
    }
  };

  const convertedTitle = convertSlugToTitle(slugInput, casingStyle);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Type}
            title="URL Slug to Headline Title Case Converter"
            description="Transform kebab-case or snake_case URL slugs into clean, editorial headlines following standard AP title casing guidelines."
          />
          <ResetButton onReset={() => {
            setSlugInput("quarter-to-semester-gpa-converter-for-college-transfers");
            setCasingStyle("title");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <InputField
              label="URL Slug Input (Kebab or Snake Case)"
              type="text"
              value={slugInput}
              onChange={(e) => setSlugInput(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Casing Grammar Style</label>
            <select
              value={casingStyle}
              onChange={(e) => setCasingStyle(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
            >
              <option value="title">AP Title Case (smart articles)</option>
              <option value="capital">Every Word Capitalized</option>
              <option value="sentence">Sentence Case (first letter only)</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Type className="w-4 h-4 text-indigo-600" /> Formatted Editorial Headline
            </h3>
            <CopyButton textToCopy={convertedTitle} />
          </div>
          <div className="p-4 bg-slate-900 text-indigo-200 rounded-2xl font-sans text-base sm:text-lg font-bold select-all">
            {convertedTitle || "Enter a slug to format..."}
          </div>
        </div>
      </div>
    </div>
  );
};
