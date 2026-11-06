import { describe, it, expect } from "vitest";
import { PILOT_TOOL_CONTENT } from "../../src/data/content/tools/pilotToolContent";
import {
  NumericCalculationExample,
  DocumentExample,
  AnalysisMatrixExample,
} from "../../src/data/content/schemas/toolContent";

/**
 * Independent Calculation Fixtures for QuickForma Educational Content
 *
 * NOTE: These fixtures independently verify the mathematical accuracy,
 * intermediate derivation steps, numerical precision, unit formatting,
 * and interpretation consistency of the EDUCATIONAL WORKED EXAMPLES.
 * They do NOT test, modify, or depend upon client-side UI calculator implementations.
 */

describe("Educational Worked Example Calculation Fixtures", () => {
  // Helper to find tool by ID
  const getTool = (toolId: string) => {
    const tool = PILOT_TOOL_CONTENT.find((t) => t.toolId === toolId);
    if (!tool) throw new Error(`Pilot tool ${toolId} not found in PILOT_TOOL_CONTENT`);
    return tool;
  };

  // =========================================================================
  // 1. FREELANCE HOURLY RATE CALCULATOR
  // =========================================================================
  describe("freelance-hourly-rate-calculator (Calculation Variant)", () => {
    it("independently verifies input parameters, intermediate math, and rate results", () => {
      const tool = getTool("freelance-hourly-rate-calculator");
      const example = tool.workedExample as NumericCalculationExample;

      expect(example.type).toBe("calculation");
      expect(tool.atAGlance.primaryOutputType).toBe("Minimum Billable Hourly Rate ($/hr)");

      // 1. Independent Ground Truth Constants
      const targetTakeHome = 80000; // $80,000 net desired income
      const overhead = 5000; // $5,000 annual business expenses
      const taxRate = 0.25; // 25% effective self-employment & income tax buffer
      const weeklyHours = 40; // 40 hours standard working week
      const vacationWeeks = 4; // 4 weeks unpaid time off
      const adminPercent = 0.20; // 20% non-billable overhead time

      // 2. Step 1: Pre-Tax Business Profit Derivation
      // Profit * (1 - 0.25) = $80,000  =>  Profit = $80,000 / 0.75
      const expectedTaxableProfit = targetTakeHome / (1 - taxRate);
      expect(expectedTaxableProfit).toBeCloseTo(106666.6667, 2);
      expect(example.calculationSteps[0].arithmetic).toContain("$80,000 / (1 - 0.25) = $106,666.67");

      // 3. Step 2: Gross Revenue Needed (Overhead + Taxable Profit)
      const expectedGrossRevenue = overhead + expectedTaxableProfit;
      expect(expectedGrossRevenue).toBeCloseTo(111666.6667, 2);
      expect(example.calculationSteps[1].arithmetic).toContain("$5,000 + $106,666.67 = $111,666.67");

      // 4. Step 3: Available Billable Hours Computation
      const workingWeeks = 52 - vacationWeeks; // 48 weeks
      const totalAvailableHours = workingWeeks * weeklyHours; // 1,920 hours
      const expectedBillableHours = totalAvailableHours * (1 - adminPercent); // 1,536 hours
      expect(expectedBillableHours).toBe(1536.0);
      expect(example.calculationSteps[2].arithmetic).toContain("1,536 billable hrs");

      // 5. Step 4: Final Rate Derivations (Hourly & Daily)
      const expectedHourlyRate = expectedGrossRevenue / expectedBillableHours; // $72.69965...
      const expectedDayRate = expectedHourlyRate * 8; // $581.597...

      expect(expectedHourlyRate).toBeCloseTo(72.70, 2);
      expect(expectedDayRate).toBeCloseTo(581.60, 2);

      // Verify exact formatted strings in primary & secondary results
      expect(example.primaryResult.value).toBe("$72.70 / hr");
      expect(example.primaryResult.label).toBe("Minimum Billable Hourly Rate");

      const dayRateSec = example.secondaryResults?.find((r) => r.label.includes("Day Rate"));
      expect(dayRateSec?.value).toBe("$581.60 / day");

      const grossRevSec = example.secondaryResults?.find((r) => r.label.includes("Gross Annual Revenue"));
      expect(grossRevSec?.value).toBe("$111,666.67");

      const taxLiabilitySec = example.secondaryResults?.find((r) => r.label.includes("Tax Liability"));
      const expectedTax = expectedGrossRevenue - overhead - targetTakeHome;
      expect(expectedTax).toBeCloseTo(26666.67, 2);
      expect(taxLiabilitySec?.value).toBe("$26,666.67");

      // 6. Consistency with written interpretation
      expect(example.interpretation).toContain("$72.70 per hour");
      expect(example.interpretation).toContain("$80,000 in personal take-home income");
    });
  });

  // =========================================================================
  // 2. OEE CALCULATOR
  // =========================================================================
  describe("oee-calculator (Calculation Variant)", () => {
    it("independently verifies availability, performance, quality, and compound OEE", () => {
      const tool = getTool("oee-calculator");
      const example = tool.workedExample as NumericCalculationExample;

      expect(example.type).toBe("calculation");
      expect(tool.atAGlance.primaryOutputType).toBe("Overall Equipment Effectiveness Percentage (0–100%)");

      // 1. Independent Ground Truth Constants
      const plannedShiftHours = 8.0; // 8.0 hours planned shift (480 minutes)
      const plannedMinutes = plannedShiftHours * 60; // 480 minutes
      const unplannedDowntimeMinutes = 48.0; // 48 minutes downtime
      const idealCycleTimeSeconds = 30.0; // 30 seconds per unit (0.5 minutes/unit)
      const totalUnitsProduced = 800; // 800 total parts stamped
      const defectiveUnits = 24; // 24 scrap parts

      // 2. Step 1: Availability Calculation
      const operatingHours = plannedShiftHours - (unplannedDowntimeMinutes / 60); // 7.2 hours (432 minutes)
      const expectedAvailability = operatingHours / plannedShiftHours; // 7.2 / 8.0 = 0.9000 (90%)
      expect(operatingHours).toBe(7.2);
      expect(expectedAvailability).toBe(0.90);
      expect(example.calculationSteps[0].arithmetic).toContain("(7.2 / 8.0) × 100 = 90.00%");

      // 3. Step 2: Performance Calculation
      // Ideal operating time for 800 units = (800 * 30 sec) / 3600 sec/hr = 6.6667 hours (400 minutes)
      const idealHours = (totalUnitsProduced * idealCycleTimeSeconds) / 3600; // 6.66667 hours
      const expectedPerformance = idealHours / operatingHours; // 6.6667 / 7.2 = 0.925925...
      expect(idealHours).toBeCloseTo(6.6667, 4);
      expect(expectedPerformance).toBeCloseTo(0.9259, 4);
      expect(example.calculationSteps[1].arithmetic).toContain("(6.6667 / 7.2) × 100 = 92.59%");

      // 4. Step 3: Quality Calculation
      const goodUnits = totalUnitsProduced - defectiveUnits; // 776 good units
      const expectedQuality = goodUnits / totalUnitsProduced; // 776 / 800 = 0.9700 (97%)
      expect(goodUnits).toBe(776);
      expect(expectedQuality).toBe(0.97);
      expect(example.calculationSteps[2].arithmetic).toContain("(776 / 800) × 100 = 97.00%");

      // 5. Step 4: Compound OEE Index
      const expectedOEE = expectedAvailability * expectedPerformance * expectedQuality; // 0.808333...
      expect(expectedOEE).toBeCloseTo(0.80833, 4);
      expect(example.calculationSteps[3].arithmetic).toContain("80.83%");

      // Verify exact formatted strings in primary & secondary results
      expect(example.primaryResult.value).toBe("80.83%");
      expect(example.primaryResult.label).toBe("Overall Equipment Effectiveness (OEE)");

      const availSec = example.secondaryResults?.find((r) => r.label.includes("Availability"));
      expect(availSec?.value).toBe("90.00%");

      const perfSec = example.secondaryResults?.find((r) => r.label.includes("Performance"));
      expect(perfSec?.value).toBe("92.59%");

      const qualSec = example.secondaryResults?.find((r) => r.label.includes("Quality"));
      expect(qualSec?.value).toBe("97.00%");

      const opTimeSec = example.secondaryResults?.find((r) => r.label.includes("Operating Time"));
      expect(opTimeSec?.value).toBe("7.20 hrs");

      // 6. Consistency with written interpretation
      expect(example.interpretation).toContain("80.83% overall effectiveness");
      expect(example.interpretation).toContain("48 minutes of mechanical downtime");
    });
  });

  // =========================================================================
  // 3. HOMEWORK TIME ESTIMATOR
  // =========================================================================
  describe("homework-time-estimator (Calculation Variant)", () => {
    it("independently verifies course task minutes, Pomodoro intervals, and rest schedule", () => {
      const tool = getTool("homework-time-estimator");
      const example = tool.workedExample as NumericCalculationExample;

      expect(example.type).toBe("calculation");
      expect(tool.atAGlance.primaryOutputType).toBe("Estimated Study Clock Duration (Hours & Pomodoro Blocks)");

      // 1. Independent Ground Truth Task Inputs
      // Chem: 15 pages @ 3 min/page, 12 problems @ 6 min/prob
      const chemMinutes = (15 * 3) + (12 * 6); // 45 + 72 = 117.0 min
      expect(chemMinutes).toBe(117.0);
      expect(example.calculationSteps[0].arithmetic).toContain("45 + 72 = 117.0 min");

      // History: 20 pages @ 3 min/page, 750 words @ 12 words/min
      const historyMinutes = (20 * 3) + (750 / 12); // 60 + 62.5 = 122.5 min
      expect(historyMinutes).toBe(122.5);
      expect(example.calculationSteps[1].arithmetic).toContain("60 + 62.5 = 122.5 min");

      // Calc III: 5 pages @ 3 min/page, 15 problems @ 6 min/prob
      const calcMinutes = (5 * 3) + (15 * 6); // 15 + 90 = 105.0 min
      expect(calcMinutes).toBe(105.0);
      expect(example.calculationSteps[2].arithmetic).toContain("15 + 90 = 105.0 min");

      // 2. Sum of Active Workload
      const totalActiveMinutes = chemMinutes + historyMinutes + calcMinutes; // 344.5 min
      expect(totalActiveMinutes).toBe(344.5);
      const totalActiveHours = totalActiveMinutes / 60; // 5.7416... hrs
      expect(totalActiveHours).toBeCloseTo(5.74, 2);

      // 3. Pomodoro Blocks and Scheduled Rest Intervals
      const pomodoroBlockDuration = 25; // 25 min per Pomodoro
      const expectedBlocks = Math.ceil(totalActiveMinutes / pomodoroBlockDuration); // ceil(13.78) = 14 blocks
      expect(expectedBlocks).toBe(14);

      const restBreakDuration = 5; // 5 min per break between blocks
      const expectedRestMinutes = (expectedBlocks - 1) * restBreakDuration; // 13 * 5 = 65 min
      expect(expectedRestMinutes).toBe(65);

      const totalClockMinutes = totalActiveMinutes + expectedRestMinutes; // 344.5 + 65 = 409.5 min (~410 min)
      const totalClockHours = totalClockMinutes / 60; // 6.825 hrs (~6.8 hrs)
      expect(totalClockHours).toBeCloseTo(6.8, 1);

      // Verify results in primary & secondary results
      expect(example.primaryResult.value).toBe("5.7 hrs (345 min)");
      const blocksSec = example.secondaryResults?.find((r) => r.label.includes("Pomodoros"));
      expect(blocksSec?.value).toBe("14 Blocks");

      const restSec = example.secondaryResults?.find((r) => r.label.includes("Rest Time"));
      expect(restSec?.value).toBe("65 min");

      const clockSec = example.secondaryResults?.find((r) => r.label.includes("Total Clock Time"));
      expect(clockSec?.value).toBe("6.8 hrs (410 min)");

      // 4. Consistency with written interpretation
      expect(example.interpretation).toContain("344.5 minutes of focused study");
      expect(example.interpretation).toContain("14 Pomodoro blocks");
      expect(example.interpretation).toContain("6.8 total clock hours");
    });
  });

  // =========================================================================
  // 4. PROPERTY CAP RATE SENSITIVITY CALCULATOR
  // =========================================================================
  describe("property-cap-rate-sensitivity-calculator (Analysis Matrix Variant)", () => {
    it("independently verifies yield intervals, property valuations, and basis point equity deltas", () => {
      const tool = getTool("property-cap-rate-sensitivity-calculator");
      const example = tool.workedExample as AnalysisMatrixExample;

      expect(example.type).toBe("analysis_matrix");
      expect(tool.atAGlance.primaryOutputType).toBe("Five-Scenario Valuation & Equity Variance Matrix ($)");

      // 1. Ground Truth Inputs
      const noi = 140000; // $140,000 Net Operating Income
      const baselineCapRate = 0.060; // 6.0% baseline yield

      // 2. Scenario Yields & Expected Valuations (Valuation = NOI / CapRate)
      const scenarios = [
        { bpsDelta: -100, rate: 0.050, label: "5.0% (-100 bps Compression)" },
        { bpsDelta: -50,  rate: 0.055, label: "5.5% (-50 bps Compression)" },
        { bpsDelta: 0,    rate: 0.060, label: "6.0% (Baseline Underwriting)" },
        { bpsDelta: 50,   rate: 0.065, label: "6.5% (+50 bps Expansion)" },
        { bpsDelta: 100,  rate: 0.070, label: "7.0% (+100 bps Expansion)" },
      ];

      const baselineValuation = noi / baselineCapRate; // $2,333,333.33...
      expect(Math.round(baselineValuation)).toBe(2333333);

      scenarios.forEach((sc, idx) => {
        const expectedVal = Math.round(noi / sc.rate);
        const expectedDollarDelta = expectedVal - Math.round(baselineValuation);
        const expectedPercentDelta = ((expectedVal - baselineValuation) / baselineValuation) * 100;

        expect(example.matrixDimensions[0].items[idx]).toBe(sc.label);

        const valString = example.matrixDimensions[1].items[idx];
        if (sc.bpsDelta === -100) {
          expect(expectedVal).toBe(2800000);
          expect(expectedDollarDelta).toBe(466667);
          expect(expectedPercentDelta).toBeCloseTo(20.0, 1);
          expect(valString).toContain("$2,800,000");
          expect(valString).toContain("+$466,667");
          expect(valString).toContain("+20.0%");
        } else if (sc.bpsDelta === -50) {
          expect(expectedVal).toBe(2545455);
          expect(expectedDollarDelta).toBe(212122);
          expect(expectedPercentDelta).toBeCloseTo(9.1, 1);
          expect(valString).toContain("$2,545,455");
          expect(valString).toContain("+$212,121");
          expect(valString).toContain("+9.1%");
        } else if (sc.bpsDelta === 0) {
          expect(valString).toContain("$2,333,333 (Baseline Underwritten Value)");
        } else if (sc.bpsDelta === 50) {
          expect(expectedVal).toBe(2153846);
          expect(expectedDollarDelta).toBe(-179487);
          expect(expectedPercentDelta).toBeCloseTo(-7.7, 1);
          expect(valString).toContain("$2,153,846");
          expect(valString).toContain("-$179,487");
          expect(valString).toContain("-7.7%");
        } else if (sc.bpsDelta === 100) {
          expect(expectedVal).toBe(2000000);
          expect(expectedDollarDelta).toBe(-333333);
          expect(expectedPercentDelta).toBeCloseTo(-14.3, 1);
          expect(valString).toContain("$2,000,000");
          expect(valString).toContain("-$333,333");
          expect(valString).toContain("-14.3%");
        }
      });

      // 3. Consistency with written interpretation
      expect(example.interpretation).toContain("$212,121 (+9.1%)");
      expect(example.interpretation).toContain("$179,487 (-7.7%)");
    });
  });

  // =========================================================================
  // 5. INVOICE GENERATOR
  // =========================================================================
  describe("invoice-generator (Document Variant)", () => {
    it("independently verifies line item subtotal, trade discount, sales tax, and grand total", () => {
      const tool = getTool("invoice-generator");
      const example = tool.workedExample as DocumentExample;

      expect(example.type).toBe("document");
      expect(tool.atAGlance.primaryOutputType).toBe("Printable & Downloadable Commercial Invoice (PDF)");

      // 1. Independent Ground Truth Line Items
      const lineItem1 = 1 * 2500.00; // Brand Identity Design: $2,500.00
      const lineItem2 = 40 * 85.00;  // Web Application Development: 40 hrs @ $85/hr = $3,400.00
      const discountPercent = 0.05;  // 5% trade discount
      const salesTaxRate = 0.085;    // 8.5% California municipal sales tax

      // 2. Subtotal
      const expectedSubtotal = lineItem1 + lineItem2; // $5,900.00
      expect(expectedSubtotal).toBe(5900.00);

      // 3. Trade Discount
      const expectedDiscount = expectedSubtotal * discountPercent; // $295.00
      expect(expectedDiscount).toBe(295.00);

      // 4. Taxable Base
      const expectedTaxableBase = expectedSubtotal - expectedDiscount; // $5,605.00
      expect(expectedTaxableBase).toBe(5605.00);

      // 5. Sales Tax Liability
      const expectedTax = expectedTaxableBase * salesTaxRate; // $476.425 -> $476.43
      expect(expectedTax).toBeCloseTo(476.425, 3);
      const roundedTax = Number(expectedTax.toFixed(2));
      expect(roundedTax).toBe(476.43);

      // 6. Grand Total Due
      const expectedGrandTotal = expectedTaxableBase + roundedTax; // $6,081.43
      expect(expectedGrandTotal).toBe(6081.43);

      // Verify clauses in generated document summary
      const clauses = example.generatedDocumentSummary.includedClauses;
      expect(clauses).toContain("Subtotal: $5,900.00");
      expect(clauses).toContain("Trade Discount (5%): -$295.00");
      expect(clauses).toContain("Taxable Base: $5,605.00");
      expect(clauses).toContain("Sales Tax (8.5%): +$476.43");
      expect(clauses).toContain("Grand Total Due: $6,081.43");

      // 7. Consistency with written interpretation
      expect(example.interpretation).toContain("$5,900 of gross billings");
      expect(example.interpretation).toContain("5% contractual discount");
      expect(example.interpretation).toContain("8.5% sales tax");
      expect(example.interpretation).toContain("$6,081.43");
    });
  });
});
