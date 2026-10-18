import React, { useState } from "react";
import { Table, Plus, Trash2, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const MarkdownTableGenerator: React.FC = () => {
  const [headers, setHeaders] = useState(["Feature", "Standard", "Enterprise"]);
  const [alignments, setAlignments] = useState<("left" | "center" | "right")[]>(["left", "center", "center"]);
  const [rows, setRows] = useState([
    ["Client-Side Execution", "Yes", "Yes"],
    ["Zero-API Costs", "Included", "Included"],
    ["Team Seats", "5", "Unlimited"],
  ]);

  const addColumn = () => {
    setHeaders([...headers, `Column ${headers.length + 1}`]);
    setAlignments([...alignments, "left"]);
    setRows(rows.map((row) => [...row, "-"]));
  };

  const removeColumn = (colIdx: number) => {
    if (headers.length > 1) {
      setHeaders(headers.filter((_, idx) => idx !== colIdx));
      setAlignments(alignments.filter((_, idx) => idx !== colIdx));
      setRows(rows.map((row) => row.filter((_, idx) => idx !== colIdx)));
    }
  };

  const addRow = () => {
    setRows([...rows, new Array(headers.length).fill("-")]);
  };

  const removeRow = (rowIdx: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, idx) => idx !== rowIdx));
    }
  };

  const updateHeader = (colIdx: number, val: string) => {
    const updated = [...headers];
    updated[colIdx] = val;
    setHeaders(updated);
  };

  const updateCell = (rowIdx: number, colIdx: number, val: string) => {
    const updated = rows.map((r, rI) =>
      rI === rowIdx ? r.map((c, cI) => (cI === colIdx ? val : c)) : r
    );
    setRows(updated);
  };

  const updateAlignment = (colIdx: number, align: "left" | "center" | "right") => {
    const updated = [...alignments];
    updated[colIdx] = align;
    setAlignments(updated);
  };

  const generateMarkdown = () => {
    const escapePipe = (str: string) => (str || "").replace(/\|/g, "\\|");
    let md = "| " + headers.map(escapePipe).join(" | ") + " |\n";
    const alignRow = alignments.map((a) => {
      if (a === "center") return ":---:";
      if (a === "right") return "---:";
      return ":---";
    });
    md += "| " + alignRow.join(" | ") + " |\n";
    rows.forEach((r) => {
      md += "| " + r.map(escapePipe).join(" | ") + " |\n";
    });
    return md;
  };

  const markdownOutput = generateMarkdown();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Table}
            title="Visual GUI Markdown Table Builder"
            description="Visually construct, format, and align Markdown tables with column management and one-click export."
          />
          <ResetButton onReset={() => {
            setHeaders(["Feature", "Standard", "Enterprise"]);
            setAlignments(["left", "center", "center"]);
            setRows([
              ["Client-Side Execution", "Yes", "Yes"],
              ["Zero-API Costs", "Included", "Included"],
              ["Team Seats", "5", "Unlimited"],
            ]);
          }} />
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={addColumn} className="flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Column
          </Button>
          <Button size="sm" variant="secondary" onClick={addRow} className="flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Row
          </Button>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-slate-50 p-3">
          <table className="w-full text-xs">
            <thead>
              <tr>
                {headers.map((h, colIdx) => (
                  <th key={colIdx} className="p-2 min-w-[140px]">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={h}
                          onChange={(e) => updateHeader(colIdx, e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold"
                        />
                        {headers.length > 1 && (
                          <button onClick={() => removeColumn(colIdx)} className="text-slate-400 hover:text-rose-600">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <select
                        value={alignments[colIdx]}
                        onChange={(e) => updateAlignment(colIdx, e.target.value as any)}
                        className="text-[10px] w-full bg-white border border-slate-200 rounded px-1.5 py-0.5"
                      >
                        <option value="left">Align Left</option>
                        <option value="center">Align Center</option>
                        <option value="right">Align Right</option>
                      </select>
                    </div>
                  </th>
                ))}
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((cell, colIdx) => (
                    <td key={colIdx} className="p-2">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                  ))}
                  <td className="p-2 text-center">
                    {rows.length > 1 && (
                      <button onClick={() => removeRow(rowIdx)} className="text-slate-400 hover:text-rose-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Markdown Code Output</span>
            <CopyButton textToCopy={markdownOutput} variant="ghost" />
          </div>
          <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl border border-slate-800 whitespace-pre-wrap overflow-x-auto">
            {markdownOutput}
          </pre>
        </div>
      </div>
    </div>
  );
};
