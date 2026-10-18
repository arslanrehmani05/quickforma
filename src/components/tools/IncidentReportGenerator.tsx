import React, { useState } from "react";
import { AlertTriangle, ShieldAlert, UserCheck, Calendar, FileText, Printer } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const IncidentReportGenerator: React.FC = () => {
  const [reportNumber, setReportNumber] = useState<string>("IR-2026-0042");
  const [companyName, setCompanyName] = useState<string>("Vanthrope Logistics & Warehousing");
  const [incidentDate, setIncidentDate] = useState<string>("2026-10-14");
  const [incidentTime, setIncidentTime] = useState<string>("14:35");
  const [locationFacility, setLocationFacility] = useState<string>("Bay 4 Loading Dock, Facility B");
  const [reporterName, setReporterName] = useState<string>("Marcus Vance (Safety Officer)");
  const [involvedPerson, setInvolvedPerson] = useState<string>("David Keller (Forklift Operator)");
  const [incidentSeverity, setIncidentSeverity] = useState<string>("Moderate / Near-Miss");
  const [incidentDescription, setIncidentDescription] = useState<string>(
    "Forklift #3 experienced hydraulic line pressure loss while lowering a 1,200kg pallet of carton goods. Pallet tilted and rested against secondary pallet rack upright. No personnel injuries sustained. Operator enacted emergency lowering protocol immediately."
  );
  const [immediateAction, setImmediateAction] = useState<string>(
    "Loading bay cordoned off with safety tape. Unit #3 tagged out of service immediately. Maintenance engineering dispatched for hydraulic inspection."
  );
  const [rootCause, setRootCause] = useState<string>(
    "Pre-shift inspection log overlooked hydraulic fluid weeping around main cylinder O-ring seal."
  );
  const [preventativeMeasures, setPreventativeMeasures] = useState<string>(
    "Mandatory double-sign signoff on pre-shift forklift fluid checklists; replace seals across all 6 warehouse reach trucks during upcoming maintenance cycle."
  );

  const reportDoc = `========================================================================
WORKPLACE INCIDENT & SAFETY INVESTIGATION REPORT
Report Number: ${reportNumber}
Organization: ${companyName}
========================================================================

INCIDENT METADATA:
Date of Incident: ${incidentDate} at ${incidentTime}
Facility / Location: ${locationFacility}
Report Filed By: ${reporterName}
Person(s) Involved: ${involvedPerson}
Severity Classification: ${incidentSeverity.toUpperCase()}

1. SUMMARY DESCRIPTION OF INCIDENT:
${incidentDescription}

2. IMMEDIATE ACTIONS TAKEN:
${immediateAction}

3. ROOT CAUSE ANALYSIS:
${rootCause}

4. CORRECTIVE & PREVENTATIVE ACTIONS (CAPA):
${preventativeMeasures}

SIGN-OFF & VERIFICATION:
Reporting Supervisor: ___________________________   Date: ____________
Health & Safety Lead: ___________________________   Date: ____________
Facility General Manager: _______________________   Date: ____________
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShieldAlert}
            title="Workplace Incident & Safety Report Generator"
            description="Standardized OSHA and safety compliance documentation for workplace injuries, equipment failures, and near-miss incidents."
          />
          <ResetButton onReset={() => {
            setReportNumber("IR-2026-0042");
            setCompanyName("Vanthrope Logistics & Warehousing");
            setIncidentDate("2026-10-14");
            setIncidentTime("14:35");
            setLocationFacility("Bay 4 Loading Dock, Facility B");
            setReporterName("Marcus Vance (Safety Officer)");
            setInvolvedPerson("David Keller (Forklift Operator)");
            setIncidentSeverity("Moderate / Near-Miss");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Report Reference ID"
            type="text"
            value={reportNumber}
            onChange={(e) => setReportNumber(e.target.value)}
          />
          <InputField
            label="Company / Facility Name"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <InputField
            label="Incident Date"
            type="date"
            value={incidentDate}
            onChange={(e) => setIncidentDate(e.target.value)}
          />
          <InputField
            label="Incident Time"
            type="time"
            value={incidentTime}
            onChange={(e) => setIncidentTime(e.target.value)}
          />
          <InputField
            label="Exact Location"
            type="text"
            value={locationFacility}
            onChange={(e) => setLocationFacility(e.target.value)}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Severity Level</label>
            <select
              value={incidentSeverity}
              onChange={(e) => setIncidentSeverity(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value="Minor / First Aid Only">Minor / First Aid Only</option>
              <option value="Moderate / Near-Miss">Moderate / Near-Miss</option>
              <option value="Serious / Lost Time Injury">Serious / Lost Time Injury</option>
              <option value="Critical / Property Damage">Critical / Property Damage</option>
            </select>
          </div>
          <InputField
            label="Reporter Name & Title"
            type="text"
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
          />
          <InputField
            label="Involved Parties / Operators"
            type="text"
            value={involvedPerson}
            onChange={(e) => setInvolvedPerson(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">1. Incident Narrative & Details</label>
            <textarea
              rows={3}
              value={incidentDescription}
              onChange={(e) => setIncidentDescription(e.target.value)}
              className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-sans"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">2. Immediate Containment Action Taken</label>
            <textarea
              rows={2}
              value={immediateAction}
              onChange={(e) => setImmediateAction(e.target.value)}
              className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-sans"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">3. Root Cause Analysis</label>
              <textarea
                rows={2}
                value={rootCause}
                onChange={(e) => setRootCause(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">4. Corrective & Preventative Actions (CAPA)</label>
              <textarea
                rows={2}
                value={preventativeMeasures}
                onChange={(e) => setPreventativeMeasures(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-sans"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" /> Formatted Safety Documentation
            </h3>
            <CopyButton textToCopy={reportDoc} />
          </div>
          <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs leading-relaxed max-h-80 overflow-y-auto whitespace-pre-wrap select-all">
            {reportDoc}
          </div>
        </div>
      </div>
    </div>
  );
};
