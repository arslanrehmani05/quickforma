import React, { useState } from "react";
import { Feather, FileCheck, Check, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const ThesisStatementGenerator: React.FC = () => {
  const [essayTopic, setEssayTopic] = useState<string>("Client-Side Web Architecture in Business Applications");
  const [primaryClaim, setPrimaryClaim] = useState<string>("provides superior enterprise data privacy and eliminates operational cloud hosting costs");
  const [opposingView, setOpposingView] = useState<string>("some engineers argue serverless cloud functions offer simpler developer ergonomics");
  const [evidence1, setEvidence1] = useState<string>("executing computation inside user browser memory");
  const [evidence2, setEvidence2] = useState<string>("guaranteeing zero telemetry crosses third-party networks");
  const [evidence3, setEvidence3] = useState<string>("enabling deterministic offline operational capabilities");

  const thesisText = `Although ${opposingView}, ${essayTopic} ${primaryClaim} because it relies on ${evidence1}, ${evidence2}, and ${evidence3}.`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Feather}
            title="Academic Essay Thesis Statement Builder"
            description="Construct defensible, evidence-backed argumentative thesis statements with counterarguments and supporting prongs."
          />
          <ResetButton onReset={() => {
            setEssayTopic("Client-Side Web Architecture in Business Applications");
            setPrimaryClaim("provides superior enterprise data privacy and eliminates operational cloud hosting costs");
            setOpposingView("some engineers argue serverless cloud functions offer simpler developer ergonomics");
            setEvidence1("executing computation inside user browser memory");
            setEvidence2("guaranteeing zero telemetry crosses third-party networks");
            setEvidence3("enabling deterministic offline operational capabilities");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Specific Paper Topic"
            type="text"
            value={essayTopic}
            onChange={(e) => setEssayTopic(e.target.value)}
          />
          <InputField
            label="Primary Thesis Claim / Argument"
            type="text"
            value={primaryClaim}
            onChange={(e) => setPrimaryClaim(e.target.value)}
          />
        </div>

        <InputField
          label="Counterargument / Opposing Viewpoint"
          type="text"
          value={opposingView}
          onChange={(e) => setOpposingView(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Supporting Evidence #1"
            type="text"
            value={evidence1}
            onChange={(e) => setEvidence1(e.target.value)}
          />
          <InputField
            label="Supporting Evidence #2"
            type="text"
            value={evidence2}
            onChange={(e) => setEvidence2(e.target.value)}
          />
          <InputField
            label="Supporting Evidence #3"
            type="text"
            value={evidence3}
            onChange={(e) => setEvidence3(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-indigo-600" /> Synthesized Thesis Statement
            </h3>
            <CopyButton textToCopy={thesisText} />
          </div>
          <div className="p-4 bg-slate-900 text-indigo-200 rounded-2xl font-sans text-sm sm:text-base leading-relaxed select-all">
            "{thesisText}"
          </div>
        </div>
      </div>
    </div>
  );
};
