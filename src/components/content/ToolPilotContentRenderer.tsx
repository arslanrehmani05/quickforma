import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Calculator,
  Layers,
  FileText,
  Terminal,
  Code2,
  Copy,
  Check,
  Building,
  HelpCircle,
  Gauge,
  BookOpen,
  Receipt,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { ToolContent, ToolWorkedExample } from '../../data/content/schemas/toolContent';
import { TOOLS_CATALOG } from '../../data/toolsCatalog';

interface ToolPilotContentRendererProps {
  content: ToolContent;
  category?: string;
  onSelectView?: (view: string) => void;
}

export const ToolPilotContentRenderer: React.FC<ToolPilotContentRendererProps> = ({
  content,
  category,
  onSelectView,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleCopy = (text: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const renderWorkedExample = (example: ToolWorkedExample) => {
    switch (example.type) {
      case 'calculation':
        return (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                Scenario
              </span>
              <h3 className="text-lg font-bold text-slate-900">{example.scenarioName}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {example.contextDescription}
              </p>
            </div>

            {/* Inputs Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Scenario Inputs & Parameters
              </span>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3">Field Label</th>
                      <th className="p-3">Input Value</th>
                      <th className="p-3">Context / Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {example.inputs.map((inp, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-800">{inp.fieldLabel}</td>
                        <td className="p-3 font-mono font-bold text-indigo-600">{inp.inputValue}</td>
                        <td className="p-3 text-slate-500">{inp.rationale || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculation Steps */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Step-by-Step Mathematical Derivation
              </span>
              <div className="space-y-2.5">
                {example.calculationSteps.map((s) => (
                  <div
                    key={s.step}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 inline-flex items-center justify-center text-[11px] shrink-0">
                        {s.step}
                      </span>
                      <span>{s.explanation}</span>
                    </div>
                    {s.arithmetic && (
                      <div className="pl-7 font-mono text-xs text-indigo-700 bg-indigo-50/50 p-2 rounded-lg border border-indigo-100/60 overflow-x-auto">
                        {s.arithmetic}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Primary & Secondary Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-indigo-600 text-white md:col-span-1 flex flex-col justify-center text-center shadow-sm">
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-1">
                  {example.primaryResult.label}
                </span>
                <span className="text-3xl font-extrabold tracking-tight">
                  {example.primaryResult.value}
                </span>
              </div>

              {example.secondaryResults && example.secondaryResults.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {example.secondaryResults.map((sr, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <span className="text-[11px] text-slate-500 font-medium block">
                        {sr.label}
                      </span>
                      <span className="text-sm font-bold text-slate-900 font-mono mt-0.5 block">
                        {sr.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Evaluation Card */}
            {example.evaluationCard && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
                <span className="font-bold text-amber-900 uppercase tracking-wider block">
                  Benchmark & Efficiency Guidance
                </span>
                {example.evaluationCard.typicalBenchmark && (
                  <p className="text-amber-800">
                    <strong>Typical Benchmark:</strong> {example.evaluationCard.typicalBenchmark}
                  </p>
                )}
                {example.evaluationCard.goodVsSuboptimal && (
                  <p className="text-amber-800">
                    <strong>Optimization Advice:</strong> {example.evaluationCard.goodVsSuboptimal}
                  </p>
                )}
              </div>
            )}

            {/* Interpretation */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{example.interpretation}</p>
            </div>
          </div>
        );

      case 'transformation':
        return (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                Data Transformation Scenario
              </span>
              <h3 className="text-lg font-bold text-slate-900">{example.scenarioName}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {example.contextDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {example.inputPayload.label}
                  </span>
                  <button
                    onClick={() => handleCopy(example.inputPayload.sampleData, 'input-payload')}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    {copiedCode === 'input-payload' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedCode === 'input-payload' ? 'Copied' : 'Copy Input'}
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto whitespace-pre-wrap break-all max-h-60">
                  {example.inputPayload.sampleData}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {example.outputPayload.label}
                  </span>
                  <button
                    onClick={() => handleCopy(example.outputPayload.sampleData, 'output-payload')}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    {copiedCode === 'output-payload' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedCode === 'output-payload' ? 'Copied' : 'Copy Output'}
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 text-indigo-300 font-mono text-xs rounded-xl overflow-x-auto whitespace-pre-wrap break-all max-h-60">
                  {example.outputPayload.sampleData}
                </pre>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Transformation Logic Applied
              </span>
              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                {example.transformationRule}
              </p>
            </div>

            {example.validationSummary && (
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{example.validationSummary}</span>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{example.interpretation}</p>
            </div>
          </div>
        );

      case 'document':
        return (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                Document Generation Scenario
              </span>
              <h3 className="text-lg font-bold text-slate-900">{example.scenarioName}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {example.contextDescription}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Configured Commercial Fields
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {example.configuredFields.map((field, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <span className="text-slate-500 font-semibold block">{field.fieldLabel}</span>
                    <span className="font-bold text-slate-900 block mt-0.5">
                      {field.selectedOptionOrText}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  {example.generatedDocumentSummary.documentTitle}
                </h4>
                <div className="flex gap-1.5 flex-wrap">
                  {example.generatedDocumentSummary.exportFormats.map((fmt, idx) => (
                    <span key={idx} className="text-[10px] font-extrabold uppercase tracking-wider bg-white border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
                {example.generatedDocumentSummary.includedClauses.map((clause, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{clause}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{example.interpretation}</p>
            </div>
          </div>
        );

      case 'analysis_matrix':
        return (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                Sensitivity Matrix Underwriting
              </span>
              <h3 className="text-lg font-bold text-slate-900">{example.scenarioName}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {example.contextDescription}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Multi-Scenario Yield Spread
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {example.matrixDimensions[0].items.map((dimItem, idx) => {
                  const valItem = example.matrixDimensions[1]?.items[idx] || '';
                  const isBaseline = idx === 2;
                  const isCompression = idx < 2;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border text-center text-xs space-y-1 ${
                        isBaseline
                          ? 'bg-indigo-50 border-indigo-300 font-bold'
                          : isCompression
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-rose-50/60 border-rose-200'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-slate-700 block">
                        {dimItem}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900 block font-mono">
                        {valItem.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {valItem.substring(valItem.indexOf('('))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider block">
                Synthesis & Underwriting Guidelines
              </span>
              <p className="text-slate-700">
                <strong>Evaluation Criteria:</strong> {example.evaluationCriteria}
              </p>
              <p className="text-slate-700">
                <strong>Outcome:</strong> {example.synthesisResult.summaryOutcome}
              </p>
              <p className="text-indigo-900 font-semibold">
                <strong>Recommended Action:</strong> {example.synthesisResult.recommendedAction}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{example.interpretation}</p>
            </div>
          </div>
        );

      case 'reference_lookup':
        return (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                Reference Specification Lookup
              </span>
              <h3 className="text-lg font-bold text-slate-900">{example.scenarioName}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {example.contextDescription}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">{example.queryInput.label}</span>
                <span className="text-sm font-bold text-slate-900">{example.queryInput.value}</span>
              </div>
              <div className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold text-center">
                Resolved: {example.resolvedReference.standardName}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Standard Inode & Permission Attributes
              </span>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {example.resolvedReference.properties.map((prop, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-700 w-1/3">{prop.property}</td>
                        <td className="p-3 font-mono font-bold text-slate-900">{prop.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{example.interpretation}</p>
            </div>
          </div>
        );

      case 'diagnostic_audit':
        return (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                Diagnostic Pattern Audit
              </span>
              <h3 className="text-lg font-bold text-slate-900">{example.scenarioName}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {example.contextDescription}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">{example.targetSubject.label}</span>
                <span className="font-mono text-xs font-bold text-slate-900 break-all">{example.targetSubject.inputData}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Aggregate Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  example.aggregateStatus === 'pass'
                    ? 'bg-emerald-100 text-emerald-800'
                    : example.aggregateStatus === 'warning'
                    ? 'bg-amber-100 text-amber-800'
                    : example.aggregateStatus === 'fail'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {example.aggregateStatus}
                </span>
              </div>
            </div>

            {example.summaryMetrics && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {example.summaryMetrics.map((sm, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 font-medium block">{sm.label}</span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 block">{sm.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Inspection Rules & Audit Findings
              </span>
              {example.findings.map((f, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{f.ruleName}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      f.severity === 'pass'
                        ? 'bg-emerald-100 text-emerald-800'
                        : f.severity === 'warning'
                        ? 'bg-amber-100 text-amber-800'
                        : f.severity === 'fail'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {f.severity}
                    </span>
                  </div>
                  <p className="text-slate-600">{f.message}</p>
                </div>
              ))}
            </div>

            {example.remediationAdvice && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                <strong>Remediation Advice:</strong> {example.remediationAdvice}
              </div>
            )}

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{example.interpretation}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-14">
      {/* 2. At a Glance Summary */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Clock className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">At a Glance</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Category</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block uppercase">{category || 'Utility'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center col-span-2 sm:col-span-1 lg:col-span-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Best For</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block line-clamp-2">{content.atAGlance.bestFor}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Time Required</span>
            <span className="text-xs font-bold text-slate-900 mt-1 block">{content.atAGlance.timeRequired}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Privacy</span>
            <span className="text-xs font-bold text-emerald-600 mt-1 block">100% Client-Side</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Cost</span>
            <span className="text-xs font-bold text-indigo-600 mt-1 block">Free Forever ($0)</span>
          </div>
        </div>
      </section>

      {/* 3. Quick Overview */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Quick Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">What It Does</span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{content.overview.whatItDoes}</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Who It's For</span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{content.overview.whoItsFor}</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">When to Use</span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{content.overview.whenToUse}</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Why It Matters</span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{content.overview.whyItMatters}</p>
          </div>
        </div>
        {content.overview.commercialContext && (
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed"><strong>Commercial Context:</strong> {content.overview.commercialContext}</p>
          </div>
        )}
      </section>

      {/* 4. Key Features */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Key Features</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.features.map((feat, idx) => (
            <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. How to Use */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How to Use (Step-by-Step)</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.howToUse.steps.map((st) => (
            <div key={st.stepNumber} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                {st.stepNumber}
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{st.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{st.instruction}</p>
              {st.tip && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
                  <strong>Tip:</strong> {st.tip}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Worked Example */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Calculator className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Worked Real-World Example</h2>
        </div>
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
          {renderWorkedExample(content.workedExample)}
        </div>
      </section>

      {/* 7. How It Works / Methodology / Assumptions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Code2 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How It Works (Methodology & Logic)</h2>
        </div>
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {content.howItWorks.methodologyOverview}
          </p>

          {content.howItWorks.formulaDisplay && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Mathematical Expression
              </span>
              <pre className="font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                {content.howItWorks.formulaDisplay.expression}
              </pre>
              {content.howItWorks.formulaDisplay.variables && (
                <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {content.howItWorks.formulaDisplay.variables.map((v, idx) => (
                    <div key={idx} className="text-slate-300">
                      <strong className="text-indigo-300 font-mono">{v.symbol}</strong>: {v.label} {v.unit ? `(${v.unit})` : ''}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {content.howItWorks.algorithmicSteps && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Algorithmic Execution Sequence
              </span>
              <div className="space-y-2">
                {content.howItWorks.algorithmicSteps.map((s) => (
                  <div key={s.stepNumber} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <strong className="text-slate-900">Step {s.stepNumber}: {s.title}</strong> — {s.logicDescription}
                  </div>
                ))}
              </div>
            </div>
          )}

          {content.howItWorks.standardsReference && (
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
                Standards Compliance: {content.howItWorks.standardsReference.standardBody} · {content.howItWorks.standardsReference.identifier}
              </span>
              <p className="text-slate-700">{content.howItWorks.standardsReference.summary}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {content.howItWorks.assumptions && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider block">
                  Operating Assumptions
                </span>
                <ul className="space-y-1 text-slate-600">
                  {content.howItWorks.assumptions.map((a, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {content.howItWorks.limitations && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider block">
                  Scope & Limitations
                </span>
                <ul className="space-y-1 text-slate-600">
                  {content.howItWorks.limitations.map((l, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
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

      {/* 9. Related Tools */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <ArrowRight className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Related Business Tools</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {content.relatedTools.map((rel) => {
            const catalogItem = TOOLS_CATALOG.find((t) => t.id === rel.toolId);
            const toolTitle = catalogItem ? catalogItem.name : rel.toolId;

            return (
              <button
                key={rel.toolId}
                onClick={() => onSelectView?.(rel.toolId)}
                className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group space-y-3"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                    {catalogItem?.category || 'Utility'}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                    {toolTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {rel.workflowRationale}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 pt-2 border-t border-slate-100">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
