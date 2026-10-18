import React, { useState } from "react";
import { FileText, ArrowLeftRight, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const YamlJsonConverter: React.FC = () => {
  const [mode, setMode] = useState<"yamlToJson" | "jsonToYaml">("yamlToJson");
  const [inputData, setInputData] = useState(`name: QuickForma Server
version: 1.0.0
port: 8080
database:
  host: localhost
  timeout: 30
tags:
  - analytics
  - enterprise`);

  // Lightweight client-side YAML-to-JSON and JSON-to-YAML engine
  const convertYamlToJson = (yamlStr: string) => {
    try {
      const lines = yamlStr.split("\n");
      const obj: any = {};
      let currentSection: any = obj;
      let sectionKey = "";
      let inArray = false;
      let arrayKey = "";

      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;

        if (rawLine.startsWith("  - ") || line.startsWith("- ")) {
          const val = line.replace(/^-+\s*/, "").trim();
          if (arrayKey && Array.isArray(obj[arrayKey])) {
            obj[arrayKey].push(isNaN(Number(val)) ? val : Number(val));
          }
          continue;
        }

        if (rawLine.startsWith("  ") && sectionKey) {
          const [k, ...vParts] = line.split(":");
          const v = vParts.join(":").trim();
          if (k) {
            obj[sectionKey] = obj[sectionKey] || {};
            obj[sectionKey][k.trim()] = isNaN(Number(v)) ? (v === "true" ? true : v === "false" ? false : v) : Number(v);
          }
          continue;
        }

        const [k, ...vParts] = line.split(":");
        const v = vParts.join(":").trim();
        if (k) {
          const key = k.trim();
          if (!v) {
            sectionKey = key;
            arrayKey = key;
            obj[key] = [];
          } else {
            sectionKey = "";
            obj[key] = isNaN(Number(v)) ? (v === "true" ? true : v === "false" ? false : v) : Number(v);
          }
        }
      }
      return JSON.stringify(obj, null, 2);
    } catch (e: any) {
      return `Error converting YAML: ${e.message}`;
    }
  };

  const convertJsonToYaml = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      const toYaml = (obj: any, indent = 0): string => {
        let yaml = "";
        const spaces = " ".repeat(indent);
        for (const k in obj) {
          const val = obj[k];
          if (Array.isArray(val)) {
            yaml += `${spaces}${k}:\n`;
            for (const item of val) {
              yaml += `${spaces}  - ${item}\n`;
            }
          } else if (typeof val === "object" && val !== null) {
            yaml += `${spaces}${k}:\n${toYaml(val, indent + 2)}`;
          } else {
            yaml += `${spaces}${k}: ${val}\n`;
          }
        }
        return yaml;
      };
      return toYaml(parsed);
    } catch (e: any) {
      return `Error converting JSON: ${e.message}`;
    }
  };

  const outputData = mode === "yamlToJson" ? convertYamlToJson(inputData) : convertJsonToYaml(inputData);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileText}
            title="YAML to JSON & JSON to YAML Converter"
            description="Convert Kubernetes configurations, OpenAPI specs, and cloud configs between YAML and JSON format."
          />
          <ResetButton onReset={() => {
            setMode("yamlToJson");
            setInputData(`name: QuickForma Server\nversion: 1.0.0\nport: 8080\ndatabase:\n  host: localhost\n  timeout: 30\ntags:\n  - analytics\n  - enterprise`);
          }} />
        </div>

        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl max-w-sm">
          <button
            onClick={() => setMode("yamlToJson")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "yamlToJson" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            YAML &rarr; JSON
          </button>
          <button
            onClick={() => {
              setMode("jsonToYaml");
              setInputData(`{\n  "name": "QuickForma Server",\n  "port": 8080,\n  "active": true\n}`);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "jsonToYaml" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            JSON &rarr; YAML
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">{mode === "yamlToJson" ? "YAML Source" : "JSON Source"}</label>
            <textarea
              rows={12}
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">{mode === "yamlToJson" ? "Converted JSON" : "Converted YAML"}</label>
              <CopyButton textToCopy={outputData} variant="ghost" />
            </div>
            <textarea
              readOnly
              rows={12}
              value={outputData}
              className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
