import React, { useState } from "react";
import { FileCode, Eye, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const MarkdownToHtmlConverter: React.FC = () => {
  const [markdown, setMarkdown] = useState(`# QuickForma Modern Tool Suite

QuickForma provides free, 100% client-side utilities.

## Core Highlights
- **Zero-API Costs**: Runs entirely inside your browser.
- **Privacy Guaranteed**: Inputs never leave your local machine.

### Code Sample
\`\`\`javascript
const computeRoi = (gain, cost) => ((gain - cost) / cost) * 100;
\`\`\`

> "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra
`);
  const [viewTab, setViewTab] = useState<"html" | "preview">("html");

  // Pure client-side regex Markdown to HTML compiler
  const convertMd = (md: string) => {
    let html = md
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      .replace(/\`\`\`([\s\S]*?)\`\`\`/gim, "<pre><code>$1</code></pre>")
      .replace(/\`([^`]+)\`/gim, "<code>$1</code>")
      .replace(/^\- (.*$)/gim, "<li>$1</li>")
      .replace(/\n$/gim, "<br />");
    return html.trim();
  };

  const htmlOutput = convertMd(markdown);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileCode}
            title="Markdown to Clean HTML Live Converter"
            description="Transform GitHub-flavored Markdown text into semantic, clean HTML code with instant visual previews."
          />
          <ResetButton onReset={() => {
            setMarkdown("# QuickForma Modern Tool Suite\n\nQuickForma provides free, 100% client-side utilities.");
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Markdown Editor</label>
            <textarea
              rows={14}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewTab("html")}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${viewTab === "html" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"}`}
                >
                  HTML Code
                </button>
                <button
                  onClick={() => setViewTab("preview")}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${viewTab === "preview" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"}`}
                >
                  Visual Preview
                </button>
              </div>
              <CopyButton textToCopy={htmlOutput} variant="ghost" />
            </div>

            {viewTab === "html" ? (
              <textarea
                readOnly
                rows={14}
                value={htmlOutput}
                className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800"
              />
            ) : (
              <div
                className="w-full h-72 p-4 bg-slate-50 border border-slate-200 rounded-2xl overflow-y-auto prose prose-sm"
                dangerouslySetInnerHTML={{ __html: htmlOutput }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
