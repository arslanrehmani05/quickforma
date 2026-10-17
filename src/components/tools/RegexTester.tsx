import React, { useState, useMemo } from "react";
import { Code2, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState("([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})");
  const [flags, setFlags] = useState("gm");
  const [testText, setTestText] = useState("Contact us at support@quickforma.com or billing@example.org for enterprise accounts.");
  const [copied, setCopied] = useState(false);

  const { matches, error, valid } = useMemo(() => {
    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: Array<{ match: string; index: number; groups: string[] }> = [];
      let m: RegExpExecArray | null;

      if (!flags.includes("g")) {
        const single = regex.exec(testText);
        if (single) {
          allMatches.push({ match: single[0], index: single.index, groups: Array.from(single).slice(1) });
        }
      } else {
        let count = 0;
        while ((m = regex.exec(testText)) !== null && count < 200) {
          allMatches.push({ match: m[0], index: m.index, groups: Array.from(m).slice(1) });
          if (m.index === regex.lastIndex) regex.lastIndex++;
          count++;
        }
      }
      return { matches: allMatches, error: null, valid: true };
    } catch (err: any) {
      return { matches: [], error: err.message, valid: false };
    }
  }, [pattern, flags, testText]);

  const copyRegex = () => {
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Code2}
            title="Regex Matcher, Visualizer & Cheatsheet"
            description="Test regular expressions in real-time with syntax validation, capture groups, and flag controls."
          />
          <ResetButton onReset={() => {
            setPattern("([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})");
            setFlags("gm");
            setTestText("Contact us at support@quickforma.com or billing@example.org for enterprise accounts.");
          }} />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-3">
              <InputField
                label="Regular Expression Pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                isMono
                error={error || undefined}
                prefix="/"
                suffix={`/${flags}`}
              />
            </div>
            <div>
              <InputField
                label="Regex Flags"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                isMono
                helpText="g, i, m, s, u"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Test String Payload</label>
            <textarea
              rows={4}
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-900 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10"
            />
          </div>

          <ResultCard variant="dark" title="Pattern Match Results">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">
                  Total Matches: <strong className="text-white">{matches.length}</strong>
                </span>
                <button onClick={copyRegex} className="text-xs bg-white/10 hover:bg-white/20 text-indigo-300 px-2.5 py-1 rounded-lg flex items-center gap-1 font-mono">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Pattern
                </button>
              </div>

              {error ? (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs">
                  Syntax Error: {error}
                </div>
              ) : matches.length === 0 ? (
                <div className="p-4 rounded-xl bg-white/5 text-center text-xs text-slate-400">
                  No pattern matches found in test string.
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {matches.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-1">
                      <div className="flex justify-between text-indigo-300">
                        <span>Match #{idx + 1} at pos {m.index}:</span>
                        <span className="text-white font-bold">{m.match}</span>
                      </div>
                      {m.groups.length > 0 && (
                        <div className="pl-3 border-l border-indigo-500/30 text-[11px] text-slate-400">
                          {m.groups.map((g, gi) => (
                            <div key={gi}>Group {gi + 1}: <span className="text-emerald-300">{g}</span></div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ResultCard>
        </div>
      </div>
    </div>
  );
};
