import React, { useState } from 'react';
import { AlignLeft, Copy, Check, Trash2, Clock, Volume2, Sparkles } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const cleanText = text.trim();
  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const sentences = cleanText ? (cleanText.match(/[^.!?]+[.!?]+/g) || [cleanText]).length : 0;
  const paragraphs = cleanText ? cleanText.split(/\n+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(words / 200);
  const speakingTime = Math.ceil(words / 130);

  const getKeywordDensity = () => {
    if (!cleanText) return [];
    const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'is', 'are', 'was', 'were', 'been']);
    const wordList = cleanText.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
    
    const counts: Record<string, number> = {};
    wordList.forEach(w => counts[w] = (counts[w] || 0) + 1);

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        percent: ((count / (wordList.length || 1)) * 100).toFixed(1)
      }));
  };

  const keywords = getKeywordDensity();

  const transformCase = (type: 'upper' | 'lower' | 'title' | 'sentence' | 'slug') => {
    if (!text) return;
    let result = text;
    switch (type) {
      case 'upper':
        result = text.toUpperCase();
        break;
      case 'lower':
        result = text.toLowerCase();
        break;
      case 'title':
        result = text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        break;
      case 'slug':
        result = text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
        break;
    }
    setText(result);
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <AlignLeft className="w-5 h-5" />
            Word Counter & Text Case Analyzer
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Real-time statistics, keyword density, reading speed & case conversion.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-black text-white dark:bg-white dark:text-black rounded-lg text-xs font-bold transition-all disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          <button
            onClick={() => setText('')}
            disabled={!text}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      {/* Main Metric Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Words', value: words },
          { label: 'Characters', value: charsWithSpaces },
          { label: 'No Spaces', value: charsNoSpaces },
          { label: 'Sentences', value: sentences },
          { label: 'Paragraphs', value: paragraphs },
          { label: 'Reading Time', value: `~${readingTime}m` },
        ].map((m, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center shadow-sm">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 block mb-1">{m.label}</span>
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">{m.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Text Area Input */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Input Text</span>
              <span className="text-xs text-zinc-400">{text.length} total chars</span>
            </div>
            <textarea
              rows={12}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your content here to analyze in real time..."
              className="w-full bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-xl p-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none leading-relaxed resize-none font-medium"
            />
          </div>

          {/* Quick Case Transform Buttons */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider block">Instant Case Transforms</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'UPPERCASE', type: 'upper' },
                { label: 'lowercase', type: 'lower' },
                { label: 'Title Case', type: 'title' },
                { label: 'Sentence case', type: 'sentence' },
                { label: 'slug-kebab-case', type: 'slug' },
              ].map(c => (
                <button
                  key={c.type}
                  onClick={() => transformCase(c.type as any)}
                  className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="lg:col-span-4 space-y-6">
          {/* Keyword Density */}
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Top Keyword Density
            </h3>
            {keywords.length === 0 ? (
              <p className="text-xs text-zinc-400">Type or paste text above to calculate keyword frequency.</p>
            ) : (
              <div className="space-y-2.5">
                {keywords.map((k, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-zinc-50 dark:bg-zinc-800 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    <span className="font-semibold text-zinc-900 dark:text-white">{k.word}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">{k.count}x</span>
                      <span className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-mono text-[10px] rounded font-bold">
                        {k.percent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Speaking vs Reading Stats */}
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Estimated Times</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
                  <Clock className="w-4 h-4" /> Silent Reading
                </span>
                <span className="font-bold text-zinc-900 dark:text-white">~{readingTime} min</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
                  <Volume2 className="w-4 h-4" /> Speech / Presentation
                </span>
                <span className="font-bold text-zinc-900 dark:text-white">~{speakingTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
