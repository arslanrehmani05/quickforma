import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Award,
  Zap,
  Target,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { MindGameContent } from '../../data/content/schemas/mindGameContent';
import { MIND_GAMES_CATALOG } from '../../data/mindGamesCatalog';
import { MindGameId } from '../../types/mindExpanded';

interface GamePilotContentRendererProps {
  content: MindGameContent;
  onSelectGame?: (gameId: MindGameId) => void;
}

export const GamePilotContentRenderer: React.FC<GamePilotContentRendererProps> = ({
  content,
  onSelectGame,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const getLineageBadge = (lineage: string) => {
    switch (lineage) {
      case 'formal_experimental_paradigm':
        return 'Formal Experimental Paradigm (Cognitive Psychology)';
      case 'recreational_logic_deduction':
        return 'Recreational Logic Deduction (Constraint Satisfaction)';
      case 'recreational_arithmetic_heuristic':
        return 'Recreational Arithmetic Heuristic (Numerical Speed)';
      default:
        return 'Cognitive Science Research Construct';
    }
  };

  return (
    <article className="mt-16 pt-12 border-t border-slate-200 space-y-14 max-w-5xl mx-auto">
      {/* 1. Overview & Lineage Header */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full">
            {content.overview.cognitiveFocusBadge}
          </span>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
            {getLineageBadge(content.science.taskLineage)}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Cognitive Science & Task Architecture
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {content.overview.summary}
        </p>

        <div className="pt-2 text-xs text-slate-500">
          <strong>Target Audience:</strong> {content.overview.targetAudience}
        </div>
      </section>

      {/* 2. Mechanics & Rules */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Target className="w-5 h-5 text-indigo-600" />
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Task Mechanics & Rules</h3>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
              Objective
            </span>
            <p className="text-sm text-slate-700 leading-relaxed">{content.mechanics.objective}</p>
          </div>

          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Execution Rules
            </span>
            <div className="space-y-2">
              {content.mechanics.rules.map((rule, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">Condition: {rule.condition}</div>
                  <div className="text-slate-700"><strong>Action:</strong> {rule.requiredAction}</div>
                  <div className="text-rose-600 text-[11px]"><strong>Error Penalty:</strong> {rule.penaltyIfWrong}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-800 uppercase tracking-wider block">Pacing & Structure</span>
              <p className="text-slate-600">{content.mechanics.pacingStructure.description}</p>
              {content.mechanics.pacingStructure.timeLimitSeconds && (
                <span className="text-[11px] font-mono text-indigo-600 block pt-1">
                  Session Timer: {content.mechanics.pacingStructure.timeLimitSeconds} seconds
                </span>
              )}
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-800 uppercase tracking-wider block">Session Completion</span>
              <p className="text-slate-600">{content.mechanics.terminationCondition}</p>
              {content.mechanics.difficultyProgression && (
                <p className="text-slate-600 pt-1"><strong>Progression:</strong> {content.mechanics.difficultyProgression}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Scoring & Recorded Behavioral Metrics */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Award className="w-5 h-5 text-indigo-600" />
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Scoring & Empirical Metrics</h3>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Runtime Behavioral Metrics Recorded
            </span>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <tr>
                    <th className="p-3">Metric Name</th>
                    <th className="p-3">Measurement Unit</th>
                    <th className="p-3">Behavioral Significance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {content.scoring.implementationRecordedMetrics.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-900">{m.metricName}</td>
                      <td className="p-3 font-mono text-indigo-600">{m.unit}</td>
                      <td className="p-3 text-slate-600">{m.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Scoring Mechanism & Formula
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {content.scoring.scoringMechanismDescription}
            </p>
            {content.scoring.scoringFormula && (
              <pre className="font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto whitespace-pre-wrap pt-1">
                {content.scoring.scoringFormula}
              </pre>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Performance Disclaimer:</strong> {content.scoring.scoreDisclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Cognitive Science & Neurobiology */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Brain className="w-5 h-5 text-indigo-600" />
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Cognitive Science & Neurobiology</h3>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
              Underlying Psychological Construct
            </span>
            <h4 className="text-base font-bold text-slate-900">{content.science.researchConstruct}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Implemented Task:</strong> {content.science.implementedTask}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Cognitive Processes Engaged
            </span>
            <div className="flex flex-wrap gap-2">
              {content.science.cognitiveProcessesEngaged.map((proc, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-100 text-indigo-700"
                >
                  {proc}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-800 uppercase tracking-wider block">
              Neurocognitive Mechanism
            </span>
            <p className="text-slate-700 leading-relaxed">{content.science.neurocognitiveMechanism}</p>
          </div>

          {/* Evidence Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-2">
              <span className="font-bold text-emerald-900 uppercase tracking-wider block">
                Replicated Empirical Findings
              </span>
              <ul className="space-y-1.5 text-emerald-800">
                {content.science.evidenceStatus.replicatedFindings.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-2">
              <span className="font-bold text-amber-900 uppercase tracking-wider block">
                Debated Literature Claims
              </span>
              <ul className="space-y-1.5 text-amber-800">
                {content.science.evidenceStatus.mixedOrDebatedClaims.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs space-y-2">
              <span className="font-bold text-rose-900 uppercase tracking-wider block">
                Unsupported Extrapolations
              </span>
              <ul className="space-y-1.5 text-rose-800">
                {content.science.evidenceStatus.unsupportedExtrapolations.map((u, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Transfer & Laboratory Differences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider block">
                Transfer Limitations (Near vs Far)
              </span>
              <p className="text-slate-600 leading-relaxed">
                {content.science.transferLimitations.nearVsFarTransferSummary}
              </p>
              <ul className="space-y-1 text-slate-500 pt-1">
                {content.science.transferLimitations.unsupportedClaims.map((claim, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-rose-500 font-bold">✗</span>
                    <span>{claim}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider block">
                Browser vs Laboratory Implementation
              </span>
              <ul className="space-y-1 text-slate-600">
                {content.science.implementationFidelity.differencesFromLaboratoryProtocol.map((diff, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{diff}</span>
                  </li>
                ))}
              </ul>
              {content.science.implementationFidelity.knownConfounders && (
                <div className="pt-1 text-[11px] text-slate-500">
                  <strong>Known Confounders:</strong>{' '}
                  {content.science.implementationFidelity.knownConfounders.join('; ')}
                </div>
              )}
            </div>
          </div>

          {/* Citations */}
          {content.science.citations && content.science.citations.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Foundational Academic Citations
              </span>
              <div className="space-y-2">
                {content.science.citations.map((cit, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{cit.authors} ({cit.year}).</span>{' '}
                      <span className="italic text-slate-700">"{cit.paperTitle}."</span>{' '}
                      <span className="text-slate-500">{cit.source}.</span>
                    </div>
                    {cit.urlOrDoi && (
                      <a
                        href={cit.urlOrDoi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0"
                      >
                        <span>View Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Strategies */}
      {content.strategies && content.strategies.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Zap className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Task Performance Strategies</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.strategies.map((strat, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">{strat.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{strat.technique}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. FAQs */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-3">
          {content.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Related Games */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <ArrowRight className="w-5 h-5 text-indigo-600" />
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Related Cognitive Challenges</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {content.relatedGameIds.map((relId) => {
            const gameCatalogItem = MIND_GAMES_CATALOG.find((g) => g.id === relId);
            const gameTitle = gameCatalogItem ? gameCatalogItem.title : relId;

            return (
              <button
                key={relId}
                onClick={() => onSelectGame?.(relId as MindGameId)}
                className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group space-y-3"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                    {gameCatalogItem?.category || 'Cognitive'}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                    {gameTitle}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {gameCatalogItem?.description || 'Explore related cognitive drill'}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 pt-2 border-t border-slate-100">
                  <span>Start Challenge</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </article>
  );
};
