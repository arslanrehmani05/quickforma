import React, { useState } from "react";
import { BookOpen, Copy, Check, FileText } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const BibliographyGenerator: React.FC = () => {
  const [sourceType, setSourceType] = useState<"book" | "website" | "journal">("book");
  const [authorLast, setAuthorLast] = useState("Kahneman");
  const [authorFirst, setAuthorFirst] = useState("Daniel");
  const [title, setTitle] = useState("Thinking, Fast and Slow");
  const [publisher, setPublisher] = useState("Farrar, Straus and Giroux");
  const [year, setYear] = useState("2011");
  const [url, setUrl] = useState("https://www.example.com/thinking-fast-slow");
  const [volume, setVolume] = useState("12");
  const [issue, setIssue] = useState("3");
  const [pages, setPages] = useState("145-160");

  const authorInit = authorFirst.trim() ? `${authorFirst.trim()[0]}.` : "";

  // APA 7th
  let apa = "";
  if (sourceType === "book") {
    apa = `${authorLast}, ${authorInit} (${year}). *${title}*. ${publisher}.`;
  } else if (sourceType === "website") {
    apa = `${authorLast}, ${authorInit} (${year}). *${title}*. ${publisher}. ${url}`;
  } else {
    apa = `${authorLast}, ${authorInit} (${year}). ${title}. *${publisher}*, ${volume}(${issue}), ${pages}.`;
  }

  // MLA 9th
  let mla = "";
  if (sourceType === "book") {
    mla = `${authorLast}, ${authorFirst}. *${title}*. ${publisher}, ${year}.`;
  } else if (sourceType === "website") {
    mla = `${authorLast}, ${authorFirst}. "${title}." *${publisher}*, ${year}, ${url}.`;
  } else {
    mla = `${authorLast}, ${authorFirst}. "${title}." *${publisher}*, vol. ${volume}, no. ${issue}, ${year}, pp. ${pages}.`;
  }

  // Chicago 17th
  let chicago = "";
  if (sourceType === "book") {
    chicago = `${authorLast}, ${authorFirst}. *${title}*. New York: ${publisher}, ${year}.`;
  } else if (sourceType === "website") {
    chicago = `${authorLast}, ${authorFirst}. "${title}." ${publisher}. ${year}. ${url}.`;
  } else {
    chicago = `${authorLast}, ${authorFirst}. "${title}." *${publisher}* ${volume}, no. ${issue} (${year}): ${pages}.`;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BookOpen}
            title="Academic Citation & Bibliography Builder"
            description="Generate verified citations in APA 7th, MLA 9th, and Chicago Manual of Style formats instantly."
          />
          <ResetButton onReset={() => {
            setSourceType("book");
            setAuthorLast("Kahneman");
            setAuthorFirst("Daniel");
            setTitle("Thinking, Fast and Slow");
            setPublisher("Farrar, Straus and Giroux");
            setYear("2011");
          }} />
        </div>

        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl max-w-sm">
          {(["book", "website", "journal"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSourceType(t)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                sourceType === t ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Author Last Name" value={authorLast} onChange={(e) => setAuthorLast(e.target.value)} />
          <InputField label="Author First Name" value={authorFirst} onChange={(e) => setAuthorFirst(e.target.value)} />
          <InputField label="Title of Work / Article" value={title} onChange={(e) => setTitle(e.target.value)} />
          <InputField label={sourceType === "website" ? "Website Name" : sourceType === "journal" ? "Journal Name" : "Publisher"} value={publisher} onChange={(e) => setPublisher(e.target.value)} />
          <InputField label="Year of Publication" value={year} onChange={(e) => setYear(e.target.value)} />
          {sourceType === "website" && (
            <InputField label="URL / Web Address" value={url} onChange={(e) => setUrl(e.target.value)} />
          )}
          {sourceType === "journal" && (
            <>
              <InputField label="Volume" value={volume} onChange={(e) => setVolume(e.target.value)} />
              <InputField label="Issue Number" value={issue} onChange={(e) => setIssue(e.target.value)} />
              <InputField label="Page Range (e.g. 10-25)" value={pages} onChange={(e) => setPages(e.target.value)} />
            </>
          )}
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-indigo-600" /> Formatted Academic Citations
          </h3>

          <div className="space-y-3">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">APA 7th Edition</span>
                <p className="text-sm text-slate-800 mt-2 font-serif">{apa}</p>
              </div>
              <CopyButton textToCopy={apa.replace(/\*/g, "")} variant="secondary" />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">MLA 9th Edition</span>
                <p className="text-sm text-slate-800 mt-2 font-serif">{mla}</p>
              </div>
              <CopyButton textToCopy={mla.replace(/\*/g, "")} variant="secondary" />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">Chicago 17th Edition</span>
                <p className="text-sm text-slate-800 mt-2 font-serif">{chicago}</p>
              </div>
              <CopyButton textToCopy={chicago.replace(/\*/g, "")} variant="secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
