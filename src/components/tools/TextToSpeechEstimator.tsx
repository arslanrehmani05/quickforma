import React, { useState } from "react";
import { Mic, Clock, Volume2, HardDrive, FileText } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TextToSpeechEstimator: React.FC = () => {
  const sampleScript = `Welcome to QuickForma, your dedicated platform for professional business utilities and financial calculators. Today we are demonstrating how client-side computing eliminates data privacy risks by keeping all numbers and documents directly inside your local web browser.`;

  const [scriptText, setScriptText] = useState<string>(sampleScript);
  const [speakingRateWpm, setSpeakingRateWpm] = useState<number>(150);

  const wordCount = scriptText.trim() ? scriptText.trim().split(/\s+/).length : 0;
  const charCount = scriptText.length;

  const totalMinutes = wordCount > 0 && speakingRateWpm > 0 ? wordCount / speakingRateWpm : 0;
  const totalSeconds = Math.round(totalMinutes * 60);

  const minutesDisplay = Math.floor(totalSeconds / 60);
  const secondsDisplay = totalSeconds % 60;
  const formattedDuration = `${minutesDisplay}m ${secondsDisplay.toString().padStart(2, "0")}s`;

  // Audio size estimates: MP3 @ 128kbps = 16 KB/sec, WAV @ 44.1kHz 16-bit mono = ~88.2 KB/sec
  const mp3SizeMb = ((totalSeconds * 16) / 1024).toFixed(2);
  const wavSizeMb = ((totalSeconds * 88.2) / 1024).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Mic}
            title="Text-to-Speech & Voiceover Audio Duration Estimator"
            description="Calculate spoken voiceover duration, narration run-time, and estimated audio file sizes based on script word count and pacing."
          />
          <ResetButton onReset={() => {
            setScriptText(sampleScript);
            setSpeakingRateWpm(150);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Narration Pace: <strong className="text-indigo-600">{speakingRateWpm} WPM</strong>
            </label>
            <input
              type="range"
              min={100}
              max={220}
              step={5}
              value={speakingRateWpm}
              onChange={(e) => setSpeakingRateWpm(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-500 font-medium mt-1">
              <span>Slow (110)</span>
              <span>Audiobook (150)</span>
              <span>Fast (190)</span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500">Words:</span> <strong className="text-slate-900 font-mono text-sm">{wordCount}</strong>
            </div>
            <div>
              <span className="text-slate-500">Characters:</span> <strong className="text-slate-900 font-mono text-sm">{charCount}</strong>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Voiceover Script Text</label>
          <textarea
            rows={5}
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
            placeholder="Type or paste voiceover narration script..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard
            variant="light"
            title="Spoken Duration"
            value={formattedDuration}
            subtitle={`${totalSeconds} total runtime seconds`}
          />
          <ResultCard
            variant="light"
            title="Total Script Words"
            value={wordCount.toLocaleString()}
            subtitle="Excludes extra whitespace"
          />
          <ResultCard
            variant="light"
            title="MP3 Size (128 kbps)"
            value={`${mp3SizeMb} MB`}
            subtitle="Standard podcast audio"
          />
          <ResultCard
            variant="light"
            title="WAV Size (Lossless)"
            value={`${wavSizeMb} MB`}
            subtitle="44.1kHz studio broadcast"
          />
        </div>
      </div>
    </div>
  );
};
