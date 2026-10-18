import React, { useState } from "react";
import { ShieldCheck, Copy, Download, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const RobotsTxtGenerator: React.FC = () => {
  const [sitemapUrl, setSitemapUrl] = useState("https://www.example.com/sitemap.xml");
  const [crawlDelay, setCrawlDelay] = useState("5");
  const [disallowAdmin, setDisallowAdmin] = useState(true);
  const [disallowApi, setDisallowApi] = useState(true);
  const [blockAiBots, setBlockAiBots] = useState(false);

  let robotsContent = `User-agent: *\n`;
  if (disallowAdmin) robotsContent += `Disallow: /admin/\nDisallow: /dashboard/\n`;
  if (disallowApi) robotsContent += `Disallow: /api/\n`;
  robotsContent += `Allow: /\n\n`;

  if (blockAiBots) {
    robotsContent += `User-agent: GPTBot\nDisallow: /\n\nUser-agent: CCBot\nDisallow: /\n\nUser-agent: ChatGPT-User\nDisallow: /\n\nUser-agent: Anthropic-ai\nDisallow: /\n\n`;
  }

  if (crawlDelay && Number(crawlDelay) > 0) {
    robotsContent += `Crawl-delay: ${crawlDelay}\n\n`;
  }

  if (sitemapUrl) {
    robotsContent += `Sitemap: ${sitemapUrl}\n`;
  }

  const downloadRobots = () => {
    const blob = new Blob([robotsContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShieldCheck}
            title="Robots.txt File Generator & SEO Bot Shield"
            description="Generate search-compliant robots.txt crawler directives, disallow paths, sitemap declarations, and AI crawler blocks."
          />
          <ResetButton onReset={() => {
            setSitemapUrl("https://www.example.com/sitemap.xml");
            setCrawlDelay("5");
            setDisallowAdmin(true);
            setDisallowApi(true);
            setBlockAiBots(false);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="XML Sitemap URL" value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} />
          <InputField label="Crawl-Delay (Seconds)" value={crawlDelay} onChange={(e) => setCrawlDelay(e.target.value)} />
        </div>

        <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">Standard Directives</span>
          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
            <input type="checkbox" checked={disallowAdmin} onChange={(e) => setDisallowAdmin(e.target.checked)} />
            Disallow sensitive internal paths (/admin/, /dashboard/)
          </label>
          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
            <input type="checkbox" checked={disallowApi} onChange={(e) => setDisallowApi(e.target.checked)} />
            Disallow backend API endpoints (/api/)
          </label>
          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-indigo-900 font-semibold">
            <input type="checkbox" checked={blockAiBots} onChange={(e) => setBlockAiBots(e.target.checked)} />
            Block AI Scrapers & LLM Training Crawlers (GPTBot, CCBot, Anthropic-ai)
          </label>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Generated robots.txt File</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={robotsContent} variant="secondary" />
              <Button size="sm" variant="primary" onClick={downloadRobots} className="flex items-center gap-1">
                <Download className="w-3.5 h-3.5" /> Download robots.txt
              </Button>
            </div>
          </div>

          <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl border border-slate-800 whitespace-pre-wrap">
            {robotsContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
