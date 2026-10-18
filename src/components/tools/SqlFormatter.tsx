import React, { useState } from "react";
import { Database, Copy, Check, Code } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const SqlFormatter: React.FC = () => {
  const [inputSql, setInputSql] = useState(
    "select u.id, u.email, count(o.id) as total_orders, sum(o.amount) as total_revenue from users u left join orders o on u.id = o.user_id where u.created_at >= '2026-01-01' and u.status = 'active' group by u.id, u.email having sum(o.amount) > 1000 order by total_revenue desc limit 50;"
  );
  const [uppercaseKeywords, setUppercaseKeywords] = useState(true);

  const formatSql = (sql: string) => {
    const keywords = [
      "SELECT", "FROM", "WHERE", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "JOIN",
      "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "UNION ALL", "UNION",
      "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE",
      "ALTER TABLE", "DROP TABLE", "ON", "AND", "OR", "AS", "IN", "NOT IN", "EXISTS"
    ];

    let formatted = sql.trim().replace(/\s+/g, " ");

    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, "gi");
      formatted = formatted.replace(regex, (match) => (uppercaseKeywords ? match.toUpperCase() : match.toLowerCase()));
    });

    const majorClauses = ["SELECT", "FROM", "WHERE", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "JOIN", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "SET", "VALUES"];
    majorClauses.forEach((cl) => {
      const regex = new RegExp(`\\s+(${cl})\\s+`, "gi");
      formatted = formatted.replace(regex, `\n$1 `);
    });

    return formatted;
  };

  const outputSql = formatSql(inputSql);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Database}
            title="SQL Query Formatter & Minifier"
            description="Format, indent, and uppercase ANSI SQL, PostgreSQL, and MySQL queries in real time with zero latency."
          />
          <ResetButton onReset={() => {
            setInputSql("select u.id, u.email, count(o.id) as total_orders, sum(o.amount) as total_revenue from users u left join orders o on u.id = o.user_id where u.created_at >= '2026-01-01' and u.status = 'active' group by u.id, u.email having sum(o.amount) > 1000 order by total_revenue desc limit 50;");
            setUppercaseKeywords(true);
          }} />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercaseKeywords}
              onChange={(e) => setUppercaseKeywords(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Uppercase SQL Keywords (SELECT, FROM, WHERE, JOIN)
          </label>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => setInputSql(inputSql.replace(/\s+/g, " ").trim())}>
              Minify to Single Line
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Raw SQL Input</label>
            <textarea
              rows={12}
              value={inputSql}
              onChange={(e) => setInputSql(e.target.value)}
              className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white"
              placeholder="Paste unformatted SQL..."
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Formatted SQL Query</label>
              <CopyButton textToCopy={outputSql} variant="ghost" />
            </div>
            <textarea
              readOnly
              rows={12}
              value={outputSql}
              className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
