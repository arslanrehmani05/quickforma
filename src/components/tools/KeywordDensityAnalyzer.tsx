import React, { useState, useMemo } from "react";
import { Search, Hash, BarChart, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const KeywordDensityAnalyzer: React.FC = () => {
  const [content, setContent] = useState(
    "QuickForma is a standalone suite of client-side business utilities and financial calculators. QuickForma provides financial tools, business tools, and developer utilities with zero-API latency and complete browser privacy. Business calculators help owners forecast cash flow runway and profit margin."
  );
  const [filterStopwords, setFilterStopwords] = useState(true);

  const stopwords = new Set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
    "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't",
    "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have",
    "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him",
    "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't",
    "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor",
    "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out",
    "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some",
    "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there",
    "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to",
    "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
    "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's",
    "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've",
    "your", "yours", "yourself", "yourselves"
  ]);

  const { totalWords, uniqueWords, keywordList } = useMemo(() => {
    const rawWords = content.toLowerCase().match(/\b[a-z0-9_-]+\b/g) || [];
    const total = rawWords.length;

    const filtered = rawWords.filter((w) => w.length > 2 && (!filterStopwords || !stopwords.has(w)));

    const counts: Record<string, number> = {};
    filtered.forEach((w) => {
      counts[w] = (counts[w] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .map(([word, count]) => ({
        word,
        count,
        density: total > 0 ? (count / total) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return { totalWords: total, uniqueWords: Object.keys(counts).length, keywordList: sorted };
  }, [content, filterStopwords]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Search}
            title="Keyword Density & Frequency Counter"
            description="Extract top keyword occurrences, density percentages, and content length for on-page SEO optimization."
          />
          <ResetButton onReset={() => {
            setContent("QuickForma is a standalone suite of client-side business utilities and financial calculators.");
            setFilterStopwords(true);
          }} />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filterStopwords}
              onChange={(e) => setFilterStopwords(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Filter Common English Stopwords (the, and, of, is, with)
          </label>
          <span className="text-xs text-slate-500 font-medium">
            Total Words: <strong className="text-slate-900">{totalWords}</strong> | Unique: <strong className="text-slate-900">{uniqueWords}</strong>
          </span>
        </div>

        <textarea
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste article, blog post, or page copy to analyze keyword density..."
          className="w-full p-4 text-xs font-sans bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white"
        />

        <ResultCard variant="dark" title="Top Keywords & Frequency Density">
          {keywordList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {keywordList.map((item) => (
                <div key={item.word} className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-300 font-bold capitalize text-sm">{item.word}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.count}x</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Density:</span>
                    <span className="text-white font-extrabold text-sm">{item.density.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-slate-400 text-xs">
              Enter content above to generate keyword frequency breakdown.
            </div>
          )}
        </ResultCard>
      </div>
    </div>
  );
};
