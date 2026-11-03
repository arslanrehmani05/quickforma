import { describe, it, expect } from "vitest";
import {
  DiagnosticAuditExampleZodSchema,
  getDeterministicAggregateStatus,
} from "../../src/data/content/schemas/toolContent.zod";
import { DiagnosticSeverity, DiagnosticAggregateStatus } from "../../src/data/content/schemas/toolContent";

describe("Diagnostic Aggregate Status Truth Table & Semantic Invariants", () => {
  const baseAudit = {
    type: "diagnostic_audit" as const,
    scenarioName: "Automated Accessibility & Contrast Audit",
    contextDescription: "Evaluation of primary design system tokens against WCAG 2.1 standards.",
    targetSubject: {
      label: "Brand Theme Palette",
      inputData: "Primary: #6366F1, Background: #FFFFFF",
    },
    interpretation: "Sufficient contrast ensures readable text for low-vision users across all UI viewports.",
  };

  /**
   * The 15 non-empty power-set combinations of {pass, fail, warning, info}
   * and their exact deterministic aggregate status mapping:
   */
  const TRUTH_TABLE_CASES: Array<{
    severities: DiagnosticSeverity[];
    expectedStatus: DiagnosticAggregateStatus;
    invalidStatuses: DiagnosticAggregateStatus[];
  }> = [
    // 1. Pure info
    { severities: ["info"], expectedStatus: "informational", invalidStatuses: ["pass", "fail", "warning", "mixed"] },
    // 2-3. Pure pass (with or without info)
    { severities: ["pass"], expectedStatus: "pass", invalidStatuses: ["fail", "warning", "mixed", "informational"] },
    { severities: ["pass", "info"], expectedStatus: "pass", invalidStatuses: ["fail", "warning", "mixed", "informational"] },
    // 4-5. Pure warning (with or without info)
    { severities: ["warning"], expectedStatus: "warning", invalidStatuses: ["pass", "fail", "mixed", "informational"] },
    { severities: ["warning", "info"], expectedStatus: "warning", invalidStatuses: ["pass", "fail", "mixed", "informational"] },
    // 6-7. Pure fail (with or without info)
    { severities: ["fail"], expectedStatus: "fail", invalidStatuses: ["pass", "warning", "mixed", "informational"] },
    { severities: ["fail", "info"], expectedStatus: "fail", invalidStatuses: ["pass", "warning", "mixed", "informational"] },
    // 8-15. Mixed (any combination containing >=2 of {pass, warning, fail})
    { severities: ["pass", "warning"], expectedStatus: "mixed", invalidStatuses: ["pass", "fail", "warning", "informational"] },
    { severities: ["pass", "warning", "info"], expectedStatus: "mixed", invalidStatuses: ["pass", "fail", "warning", "informational"] },
    { severities: ["pass", "fail"], expectedStatus: "mixed", invalidStatuses: ["pass", "fail", "warning", "informational"] },
    { severities: ["pass", "fail", "info"], expectedStatus: "mixed", invalidStatuses: ["pass", "fail", "warning", "informational"] },
    { severities: ["warning", "fail"], expectedStatus: "mixed", invalidStatuses: ["pass", "fail", "warning", "informational"] },
    { severities: ["warning", "fail", "info"], expectedStatus: "mixed", invalidStatuses: ["pass", "fail", "warning", "informational"] },
    { severities: ["pass", "warning", "fail"], expectedStatus: "mixed", invalidStatuses: ["pass", "fail", "warning", "informational"] },
    { severities: ["pass", "warning", "fail", "info"], expectedStatus: "mixed", invalidStatuses: ["pass", "fail", "warning", "informational"] },
  ];

  it("strictly rejects an empty findings array (findings: [])", () => {
    const emptyFindingsPayload = {
      ...baseAudit,
      aggregateStatus: "informational" as const,
      findings: [],
    };
    const result = DiagnosticAuditExampleZodSchema.safeParse(emptyFindingsPayload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/Array must contain at least 1 element/);
    }
  });

  it("exhaustively maps all 15 non-empty severity combinations to exactly ONE deterministic aggregate status", () => {
    expect(TRUTH_TABLE_CASES.length).toBe(15);

    for (const testCase of TRUTH_TABLE_CASES) {
      const severitySet = new Set<DiagnosticSeverity>(testCase.severities);
      const computed = getDeterministicAggregateStatus(severitySet);
      expect(computed).toBe(testCase.expectedStatus);
    }
  });

  it("validates that DiagnosticAuditExampleZodSchema accepts the deterministic aggregate status", () => {
    for (const testCase of TRUTH_TABLE_CASES) {
      const auditPayload = {
        ...baseAudit,
        aggregateStatus: testCase.expectedStatus,
        findings: testCase.severities.map((sev, idx) => ({
          ruleName: `Rule ${idx + 1} (${sev})`,
          severity: sev,
          message: `Finding message for ${sev}`,
        })),
        remediationAdvice: ["fail", "warning", "mixed"].includes(testCase.expectedStatus)
          ? "Apply appropriate corrective remediation to resolve finding."
          : undefined,
      };

      const parsed = DiagnosticAuditExampleZodSchema.safeParse(auditPayload);
      expect(parsed.success).toBe(true);
    }
  });

  it("strictly rejects any contradictory aggregate status for mixed substantive findings", () => {
    // Specifically test {fail, pass} which previously allowed both 'mixed' and 'fail'
    const findingsWithPassAndFail = [
      { ruleName: "Rule 1", severity: "pass" as const, message: "Valid syntax" },
      { ruleName: "Rule 2", severity: "fail" as const, message: "Expired token" },
    ];

    // Must accept "mixed"
    const validMixed = {
      ...baseAudit,
      aggregateStatus: "mixed" as const,
      findings: findingsWithPassAndFail,
      remediationAdvice: "Renew auth credentials immediately.",
    };
    expect(DiagnosticAuditExampleZodSchema.safeParse(validMixed).success).toBe(true);

    // Must REJECT "fail" as contradictory (because both pass and fail are present)
    const invalidFail = {
      ...baseAudit,
      aggregateStatus: "fail" as const,
      findings: findingsWithPassAndFail,
      remediationAdvice: "Renew auth credentials immediately.",
    };
    const failResult = DiagnosticAuditExampleZodSchema.safeParse(invalidFail);
    expect(failResult.success).toBe(false);
    if (!failResult.success) {
      expect(failResult.error.issues[0].message).toMatch(
        /aggregateStatus must match the exact deterministic status dictated by finding severities/
      );
    }

    // Must REJECT "pass" as contradictory
    const invalidPass = {
      ...baseAudit,
      aggregateStatus: "pass" as const,
      findings: findingsWithPassAndFail,
    };
    const passResult = DiagnosticAuditExampleZodSchema.safeParse(invalidPass);
    expect(passResult.success).toBe(false);
  });

  it("strictly rejects contradictory statuses across all test cases", () => {
    for (const testCase of TRUTH_TABLE_CASES) {
      for (const invalidStatus of testCase.invalidStatuses) {
        const auditPayload = {
          ...baseAudit,
          aggregateStatus: invalidStatus,
          findings: testCase.severities.map((sev, idx) => ({
            ruleName: `Rule ${idx + 1} (${sev})`,
            severity: sev,
            message: `Finding message for ${sev}`,
          })),
          remediationAdvice: "Sample remediation text for test validation.",
        };

        const result = DiagnosticAuditExampleZodSchema.safeParse(auditPayload);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toMatch(
            /aggregateStatus must match the exact deterministic status dictated by finding severities/
          );
        }
      }
    }
  });

  it("enforces that remediationAdvice is required when findings contain 'fail'", () => {
    const failFindings = [
      { ruleName: "Syntax", severity: "fail" as const, message: "Fatal error detected" },
    ];

    // 1. Missing remediation advice
    const dataWithoutRemediation = {
      ...baseAudit,
      aggregateStatus: "fail" as const,
      findings: failFindings,
    };
    expect(() => DiagnosticAuditExampleZodSchema.parse(dataWithoutRemediation)).toThrow(
      /remediationAdvice is required/
    );

    // 2. Whitespace-only remediation advice
    const dataWithWhitespace = {
      ...baseAudit,
      aggregateStatus: "fail" as const,
      findings: failFindings,
      remediationAdvice: "              ",
    };
    expect(() => DiagnosticAuditExampleZodSchema.parse(dataWithWhitespace)).toThrow(
      /remediationAdvice is required/
    );

    // 3. Meaningful remediation advice is accepted
    const validFailData = {
      ...baseAudit,
      aggregateStatus: "fail" as const,
      findings: failFindings,
      remediationAdvice: "Refactor character class to prevent catastrophic backtracking.",
    };
    expect(() => DiagnosticAuditExampleZodSchema.parse(validFailData)).not.toThrow();
  });

  it("enforces that remediationAdvice is required when findings contain 'warning'", () => {
    const warningFindings = [
      { ruleName: "Lint", severity: "warning" as const, message: "Non-critical performance warning" },
    ];

    // 1. Missing remediation advice
    const dataWithoutRemediation = {
      ...baseAudit,
      aggregateStatus: "warning" as const,
      findings: warningFindings,
    };
    expect(() => DiagnosticAuditExampleZodSchema.parse(dataWithoutRemediation)).toThrow(
      /remediationAdvice is required/
    );

    // 2. Whitespace-only remediation advice
    const dataWithWhitespace = {
      ...baseAudit,
      aggregateStatus: "warning" as const,
      findings: warningFindings,
      remediationAdvice: "          ",
    };
    expect(() => DiagnosticAuditExampleZodSchema.parse(dataWithWhitespace)).toThrow(
      /remediationAdvice is required/
    );

    // 3. Meaningful remediation advice is accepted
    const validWarningData = {
      ...baseAudit,
      aggregateStatus: "warning" as const,
      findings: warningFindings,
      remediationAdvice: "Optimize regular expression with possessive quantifier.",
    };
    expect(() => DiagnosticAuditExampleZodSchema.parse(validWarningData)).not.toThrow();
  });

  it("enforces that remediationAdvice is required on mixed findings with fail or warning", () => {
    const mixedFindings = [
      { ruleName: "Rule 1", severity: "pass" as const, message: "Valid syntax" },
      { ruleName: "Rule 2", severity: "fail" as const, message: "Token expired" },
    ];

    const dataWithoutRemediation = {
      ...baseAudit,
      aggregateStatus: "mixed" as const,
      findings: mixedFindings,
    };
    expect(() => DiagnosticAuditExampleZodSchema.parse(dataWithoutRemediation)).toThrow(
      /remediationAdvice is required/
    );

    const dataWithWhitespace = {
      ...baseAudit,
      aggregateStatus: "mixed" as const,
      findings: mixedFindings,
      remediationAdvice: "   \t   \n   ",
    };
    expect(() => DiagnosticAuditExampleZodSchema.parse(dataWithWhitespace)).toThrow(
      /remediationAdvice is required/
    );
  });

  it("allows remediationAdvice to be omitted on clean pass or informational results", () => {
    const passDataWithoutRemediation = {
      ...baseAudit,
      aggregateStatus: "pass" as const,
      findings: [
        { ruleName: "Syntax", severity: "pass" as const, message: "All rules valid" },
      ],
    };
    expect(() => DiagnosticAuditExampleZodSchema.parse(passDataWithoutRemediation)).not.toThrow();

    const infoDataWithoutRemediation = {
      ...baseAudit,
      aggregateStatus: "informational" as const,
      findings: [
        { ruleName: "Meta", severity: "info" as const, message: "Engine v2 active" },
      ],
    };
    expect(() => DiagnosticAuditExampleZodSchema.parse(infoDataWithoutRemediation)).not.toThrow();
  });
});
