import React, { useState } from "react";
import { Briefcase, Printer, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const ConsultingProposalGenerator: React.FC = () => {
  const [consultantName, setConsultantName] = useState("Vanguard Strategy Partners");
  const [clientCompany, setClientCompany] = useState("Nova Dynamics Corp");
  const [projectTitle, setProjectTitle] = useState("Digital Infrastructure Modernization & Cloud Architecture");
  const [executiveSummary, setExecutiveSummary] = useState("Nova Dynamics seeks to accelerate product velocity, eliminate infrastructure bottlenecks, and transition monolith workloads to decoupled containerized services.");
  const [phase1, setPhase1] = useState("Phase 1: Discovery, Architecture Audit & Security Review (Weeks 1-3)");
  const [phase2, setPhase2] = useState("Phase 2: Cloud Infrastructure Migration & CI/CD Automation (Weeks 4-8)");
  const [phase3, setPhase3] = useState("Phase 3: Production Rollout, Performance Testing & Team Handover (Weeks 9-10)");
  const [totalFee, setTotalFee] = useState<number>(45000);

  const proposalText = `CONSULTING PROJECT PROPOSAL

Prepared For: ${clientCompany}
Prepared By: ${consultantName}
Date: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}

PROJECT TITLE:
${projectTitle}

1. EXECUTIVE SUMMARY & PROBLEM STATEMENT
${executiveSummary}

2. SCOPE OF WORK & PHASES
- ${phase1}
- ${phase2}
- ${phase3}

3. INVESTMENT & COMMERCIAL TERMS
Total Project Fee: $${totalFee.toLocaleString()} USD
Payment Schedule:
- 40% initial deposit upon proposal execution
- 30% milestone payment at completion of Phase 2
- 30% final balance upon delivery and handover

4. ACCEPTANCE & AUTHORIZATION
Client: ___________________________ Date: ____________
Consultant: _______________________ Date: ____________`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Briefcase}
            title="Consulting Proposal & Scope Builder"
            description="Build executive consulting proposals with phased deliverables, milestones, payment schedules, and formal client sign-off."
          />
          <ResetButton onReset={() => {
            setConsultantName("Vanguard Strategy Partners");
            setClientCompany("Nova Dynamics Corp");
            setProjectTitle("Digital Infrastructure Modernization & Cloud Architecture");
            setTotalFee(45000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Consultant / Firm Name" value={consultantName} onChange={(e) => setConsultantName(e.target.value)} />
          <InputField label="Client Organization" value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} />
          <InputField label="Project Title" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
          <InputField label="Total Proposed Fee ($)" type="number" prefix="$" value={totalFee} onChange={(e) => setTotalFee(Number(e.target.value))} />
        </div>

        <InputField label="Executive Summary" value={executiveSummary} onChange={(e) => setExecutiveSummary(e.target.value)} />

        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-700">Scope of Work Phases</h3>
          <InputField label="Phase 1" value={phase1} onChange={(e) => setPhase1(e.target.value)} />
          <InputField label="Phase 2" value={phase2} onChange={(e) => setPhase2(e.target.value)} />
          <InputField label="Phase 3" value={phase3} onChange={(e) => setPhase3(e.target.value)} />
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Proposal Document Preview</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={proposalText} variant="secondary" />
              <Button size="sm" variant="primary" onClick={() => window.print()} className="flex items-center gap-1">
                <Printer className="w-3.5 h-3.5" /> Print Proposal
              </Button>
            </div>
          </div>

          <pre className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-serif text-slate-800 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
            {proposalText}
          </pre>
        </div>
      </div>
    </div>
  );
};
