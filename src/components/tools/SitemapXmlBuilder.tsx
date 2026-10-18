import React, { useState } from "react";
import { FileSpreadsheet, Globe, Plus, Trash2, Check, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

interface SitemapEntry {
  path: string;
  changefreq: string;
  priority: string;
}

export const SitemapXmlBuilder: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState<string>("https://quickforma.com");
  const [entries, setEntries] = useState<SitemapEntry[]>([
    { path: "/", changefreq: "daily", priority: "1.0" },
    { path: "/tools", changefreq: "daily", priority: "0.9" },
    { path: "/categories/business-finance", changefreq: "weekly", priority: "0.8" },
    { path: "/categories/developer-technical", changefreq: "weekly", priority: "0.8" },
    { path: "/privacy", changefreq: "monthly", priority: "0.3" }
  ]);
  const [newPath, setNewPath] = useState<string>("/tools/amortization-calculator");

  const todayIso = new Date().toISOString().split("T")[0];

  const addEntry = () => {
    if (!newPath.trim()) return;
    setEntries([...entries, { path: newPath.trim(), changefreq: "weekly", priority: "0.7" }]);
    setNewPath("");
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const cleanBase = baseUrl.replace(/\/+$/, "");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${cleanBase}${e.path.startsWith("/") ? "" : "/"}${e.path}</loc>
    <lastmod>${todayIso}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileSpreadsheet}
            title="Visual XML Sitemap Generator"
            description="Build Google and Bing compliant XML sitemaps with custom page priorities, change frequencies, and verified canonical paths."
          />
          <ResetButton onReset={() => {
            setBaseUrl("https://quickforma.com");
            setEntries([
              { path: "/", changefreq: "daily", priority: "1.0" },
              { path: "/tools", changefreq: "daily", priority: "0.9" },
              { path: "/categories/business-finance", changefreq: "weekly", priority: "0.8" },
              { path: "/categories/developer-technical", changefreq: "weekly", priority: "0.8" },
              { path: "/privacy", changefreq: "monthly", priority: "0.3" }
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <InputField
              label="Root Website Base URL"
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <div className="w-full text-xs font-medium text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              Total URL Nodes: <strong className="text-slate-900">{entries.length}</strong>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newPath}
              onChange={(e) => setNewPath(e.target.value)}
              placeholder="e.g. /pricing or /blog/post-title"
              className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={addEntry}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Route
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2">
            {entries.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs gap-2">
                <span className="font-mono text-slate-700 truncate max-w-xs">{entry.path}</span>
                <div className="flex items-center gap-2">
                  <select
                    value={entry.changefreq}
                    onChange={(e) => {
                      const next = [...entries];
                      next[idx].changefreq = e.target.value;
                      setEntries(next);
                    }}
                    className="px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                  >
                    <option value="always">always</option>
                    <option value="hourly">hourly</option>
                    <option value="daily">daily</option>
                    <option value="weekly">weekly</option>
                    <option value="monthly">monthly</option>
                  </select>
                  <select
                    value={entry.priority}
                    onChange={(e) => {
                      const next = [...entries];
                      next[idx].priority = e.target.value;
                      setEntries(next);
                    }}
                    className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold"
                  >
                    <option value="1.0">1.0</option>
                    <option value="0.9">0.9</option>
                    <option value="0.8">0.8</option>
                    <option value="0.7">0.7</option>
                    <option value="0.5">0.5</option>
                    <option value="0.3">0.3</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeEntry(idx)}
                    className="p-1 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Generated XML Output
            </h3>
            <CopyButton textToCopy={sitemapXml} />
          </div>
          <div className="p-4 bg-slate-900 text-indigo-300 rounded-2xl font-mono text-xs max-h-72 overflow-y-auto whitespace-pre-wrap select-all">
            {sitemapXml}
          </div>
        </div>
      </div>
    </div>
  );
};
