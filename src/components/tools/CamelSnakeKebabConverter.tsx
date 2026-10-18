import React, { useState } from "react";
import { Code2, ArrowLeftRight, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const CamelSnakeKebabConverter: React.FC = () => {
  const [inputText, setInputText] = useState("annual recurring revenue target");

  const splitWords = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
  };

  const words = splitWords(inputText);
  const hasWords = words.length > 0;

  const camelCase = hasWords ? words.map((w, idx) => (idx === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))).join("") : "—";
  const pascalCase = hasWords ? words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("") : "—";
  const snakeCase = hasWords ? words.join("_") : "—";
  const constantCase = hasWords ? words.map((w) => w.toUpperCase()).join("_") : "—";
  const kebabCase = hasWords ? words.join("-") : "—";
  const titleCase = hasWords ? words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "—";
  const dotCase = hasWords ? words.join(".") : "—";

  const formats = [
    { name: "camelCase", value: camelCase, desc: "JavaScript / TypeScript variables" },
    { name: "PascalCase", value: pascalCase, desc: "React components & class names" },
    { name: "snake_case", value: snakeCase, desc: "Python variables & SQL columns" },
    { name: "CONSTANT_CASE", value: constantCase, desc: "Environment variables & global constants" },
    { name: "kebab-case", value: kebabCase, desc: "URL slugs & CSS class names" },
    { name: "Title Case", value: titleCase, desc: "Headings & article titles" },
    { name: "dot.case", value: dotCase, desc: "Package names & config keys" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Code2}
            title="Developer Naming Convention Case Converter"
            description="Convert code identifiers between camelCase, PascalCase, snake_case, CONSTANT_CASE, and kebab-case instantly."
          />
          <ResetButton onReset={() => setInputText("annual recurring revenue target")} />
        </div>

        <InputField
          label="Input Identifier or Sentence"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type variable, phrase, or sentence..."
          helpText="Enter words separated by spaces, underscores, dashes, or camelCase."
        />

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900">Converted Programming Formats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formats.map((f) => (
              <div key={f.name} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="space-y-0.5 overflow-hidden pr-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{f.name}</div>
                  <div className="font-mono text-sm font-semibold text-slate-900 truncate select-all">{f.value}</div>
                  <div className="text-[10px] text-slate-400">{f.desc}</div>
                </div>
                {hasWords && <CopyButton textToCopy={f.value} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
