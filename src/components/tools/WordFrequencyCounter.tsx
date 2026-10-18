import React, { useState } from "react";
import { BarChart, Hash, Check, Copy, Layers } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";

export const WordFrequencyCounter: React.FC = () => {
  const sampleText = `Search engine optimization requires understanding keyword density and keyword frequency. When analyzing search queries, keyword distribution across titles and headings determines relevance. Tracking keyword frequency ensures content avoids over-optimization while maintaining strong semantic context.`;

  const [inputText, setInputText] = useState<string>(sampleText);
  const [filterStopWords, setFilterStopWords] = useState<boolean>(true);

  const stopWords = new Set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at",
    "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "could", "did",
    "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have",
    "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into",
    "is", "it", "its", "itself", "me", "more", "most", "my", "myself", "no", "nor", "not", "of", "off", "on",
    "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she",
    "should", "so", "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then",
    "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was",
    "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "with", "would", "you", "your"
  ]);

  const rawWords = inputText
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);

  const totalWords = rawWords.length;
  const counts: { [word: string]: number } = {};

  rawWords.forEach((word) => {
    if (filterStopWords && stopWords.has(word)) return;
    counts[word] = (counts[word] || 0) + 1;
  });

  const sortedPairs = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BarChart}
            title="Word Frequency & Keyword Density Counter"
            description="Analyze keyword frequencies, word repetition counts, and percentage densities to optimize SEO copy and content structure."
          />
          <ResetButton onReset={() => {
            setInputText(sampleText);
            setFilterStopWords(true);
          }} />
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 text-sm">
            <input
              type="checkbox"
              checked={filterStopWords}
              onChange={(e) => setFilterStopWords(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Filter Common Stop Words (the, is, at, which...)
          </label>
          <span className="text-xs font-mono text-slate-600">Total Tokens: <strong>{totalWords}</strong></span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Text to Analyze</label>
          <textarea
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
            placeholder="Paste text here to evaluate frequency..."
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top Keyword Occurrences & Density</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold uppercase">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Keyword / Token</th>
                  <th className="py-2.5 px-3">Count</th>
                  <th className="py-2.5 px-3">Density %</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Relative Frequency Bar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedPairs.map(([word, count]) => {
                  const density = totalWords > 0 ? ((count / totalWords) * 100).toFixed(1) : "0.0";
                  const maxCount = sortedPairs[0] ? sortedPairs[0][1] : 1;
                  const barWidth = Math.round((count / maxCount) * 100);

                  return (
                    <tr key={word} className="hover:bg-slate-50 font-mono">
                      <td className="py-2 px-3 font-semibold text-slate-900">{word}</td>
                      <td className="py-2 px-3 text-indigo-600 font-bold">{count}</td>
                      <td className="py-2 px-3 text-slate-600">{density}%</td>
                      <td className="py-2 px-3">
                        <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${barWidth}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
