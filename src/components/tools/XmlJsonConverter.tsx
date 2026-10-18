import React, { useState } from "react";
import { FileCode, ArrowLeftRight, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const XmlJsonConverter: React.FC = () => {
  const [mode, setMode] = useState<"xmlToJson" | "jsonToXml">("xmlToJson");
  const [inputData, setInputData] = useState(`<company>
  <name>QuickForma</name>
  <established>2026</established>
  <features>
    <item>Zero-API</item>
    <item>Client-Side</item>
  </features>
</company>`);
  const [error, setError] = useState<string | null>(null);

  const convertXmlToJson = (xmlStr: string) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlStr, "text/xml");
      const parseError = xmlDoc.getElementsByTagName("parsererror");
      if (parseError.length > 0) {
        throw new Error(parseError[0].textContent || "Invalid XML format");
      }

      const domToJson = (node: Node): any => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.nodeValue?.trim() || null;
        }
        const obj: any = {};
        if (node.hasChildNodes()) {
          for (let i = 0; i < node.childNodes.length; i++) {
            const child = node.childNodes[i];
            if (child.nodeType === Node.ELEMENT_NODE) {
              const childName = child.nodeName;
              const childVal = domToJson(child);
              if (obj[childName]) {
                if (!Array.isArray(obj[childName])) {
                  obj[childName] = [obj[childName]];
                }
                obj[childName].push(childVal);
              } else {
                obj[childName] = childVal;
              }
            } else if (child.nodeType === Node.TEXT_NODE && child.nodeValue?.trim()) {
              return child.nodeValue.trim();
            }
          }
        }
        return obj;
      };

      const result = { [xmlDoc.documentElement.nodeName]: domToJson(xmlDoc.documentElement) };
      return JSON.stringify(result, null, 2);
    } catch (e: any) {
      return `Error parsing XML: ${e.message}`;
    }
  };

  const convertJsonToXml = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      const toXml = (obj: any, rootName = "root"): string => {
        let xml = "";
        for (const prop in obj) {
          if (Array.isArray(obj[prop])) {
            for (const item of obj[prop]) {
              xml += `<${prop}>${typeof item === "object" ? toXml(item, "") : item}</${prop}>\n`;
            }
          } else if (typeof obj[prop] === "object" && obj[prop] !== null) {
            xml += `<${prop}>\n${toXml(obj[prop], "")}</${prop}>\n`;
          } else {
            xml += `<${prop}>${obj[prop]}</${prop}>\n`;
          }
        }
        return rootName ? `<${rootName}>\n${xml}</${rootName}>` : xml;
      };
      return toXml(parsed, Object.keys(parsed).length === 1 ? Object.keys(parsed)[0] : "root");
    } catch (e: any) {
      return `Error parsing JSON: ${e.message}`;
    }
  };

  const outputData = mode === "xmlToJson" ? convertXmlToJson(inputData) : convertJsonToXml(inputData);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileCode}
            title="XML to JSON & JSON to XML Converter"
            description="Bi-directional converter with DOM tree parsing, pretty-printing, and instant syntax validation."
          />
          <ResetButton onReset={() => {
            setMode("xmlToJson");
            setInputData(`<company>\n  <name>QuickForma</name>\n  <established>2026</established>\n  <features>\n    <item>Zero-API</item>\n    <item>Client-Side</item>\n  </features>\n</company>`);
          }} />
        </div>

        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl max-w-sm">
          <button
            onClick={() => setMode("xmlToJson")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "xmlToJson" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            XML &rarr; JSON
          </button>
          <button
            onClick={() => {
              setMode("jsonToXml");
              setInputData(`{\n  "company": {\n    "name": "QuickForma",\n    "established": 2026\n  }\n}`);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "jsonToXml" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            JSON &rarr; XML
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">{mode === "xmlToJson" ? "XML Source" : "JSON Source"}</label>
            <textarea
              rows={12}
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">{mode === "xmlToJson" ? "Converted JSON" : "Converted XML"}</label>
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
