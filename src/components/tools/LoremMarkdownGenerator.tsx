import React, { useState } from "react";
import { FileCode, Sparkles, Check, Copy, List } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const LoremMarkdownGenerator: React.FC = () => {
  const [paragraphCount, setParagraphCount] = useState<number>(3);
  const [includeHeadings, setIncludeHeadings] = useState<boolean>(true);
  const [includeList, setIncludeList] = useState<boolean>(true);
  const [includeTable, setIncludeTable] = useState<boolean>(true);
  const [includeCodeBlock, setIncludeCodeBlock] = useState<boolean>(true);

  const sampleParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem."
  ];

  const buildMarkdown = (): string => {
    let md = "";
    if (includeHeadings) {
      md += "# Project Architecture & Documentation\n\n";
      md += "A comprehensive guide to client-side computational components and high-performance design.\n\n";
    }

    for (let i = 0; i < Math.min(paragraphCount, sampleParagraphs.length); i++) {
      if (includeHeadings && i === 1) {
        md += "## Core Engineering Principles\n\n";
      }
      md += `${sampleParagraphs[i]}\n\n`;
    }

    if (includeList) {
      md += "### Key Technical Features\n\n";
      md += "- **Zero Server Cost**: 100% browser-based JavaScript execution\n";
      md += "- **Deterministic Outputs**: Pure functional state management\n";
      md += "- **Complete Privacy**: Zero external network telemetry transmitted\n\n";
    }

    if (includeTable) {
      md += "### Operational Benchmarks\n\n";
      md += "| Metric Name | Target SLA | Actual Client Performance |\n";
      md += "| :--- | :---: | :---: |\n";
      md += "| Initial Paint | < 250ms | 185ms |\n";
      md += "| Computation Time | < 10ms | 2.4ms |\n";
      md += "| Offline Availability | 100% | 100% |\n\n";
    }

    if (includeCodeBlock) {
      md += "### Example Code Snippet\n\n";
      md += "```typescript\n";
      md += "function calculateRoi(gain: number, cost: number): number {\n";
      md += "  if (cost <= 0) return 0;\n";
      md += "  return ((gain - cost) / cost) * 100;\n";
      md += "}\n";
      md += "```\n";
    }

    return md.trim();
  };

  const outputMarkdown = buildMarkdown();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileCode}
            title="Rich Markdown Placeholder & Lorem Text Generator"
            description="Generate formatted Markdown lorem ipsum with headings, bullet lists, markdown tables, and code snippets for docs."
          />
          <ResetButton onReset={() => {
            setParagraphCount(3);
            setIncludeHeadings(true);
            setIncludeList(true);
            setIncludeTable(true);
            setIncludeCodeBlock(true);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Paragraph Count (1 - 5)"
            type="number"
            value={paragraphCount}
            onChange={(e) => setParagraphCount(Number(e.target.value))}
            min={1}
            max={5}
          />
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeHeadings}
                onChange={(e) => setIncludeHeadings(e.target.checked)}
                className="rounded text-indigo-600"
              />
              Headings (H1/H2)
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeList}
                onChange={(e) => setIncludeList(e.target.checked)}
                className="rounded text-indigo-600"
              />
              Bullet Lists
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeTable}
                onChange={(e) => setIncludeTable(e.target.checked)}
                className="rounded text-indigo-600"
              />
              Markdown Table
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCodeBlock}
                onChange={(e) => setIncludeCodeBlock(e.target.checked)}
                className="rounded text-indigo-600"
              />
              Code Block
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-600" /> Generated Markdown Source
            </h3>
            <CopyButton textToCopy={outputMarkdown} />
          </div>
          <div className="p-4 bg-slate-900 text-indigo-200 rounded-2xl font-mono text-xs leading-relaxed max-h-80 overflow-y-auto whitespace-pre-wrap select-all">
            {outputMarkdown}
          </div>
        </div>
      </div>
    </div>
  );
};
