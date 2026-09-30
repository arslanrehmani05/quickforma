#!/usr/bin/env python3
import os
import re
import sys

TOOLS_DIR = os.path.join(os.path.dirname(__file__), '../src/components/tools')

# Comprehensive mapping of all 113 tool component files to their design-system families
TOOL_FAMILY_MAP = {
  # Simple Numeric Calculators (Family 1)
  'BreakEvenPointCalculator.tsx': 'simple',
  'CpmAdCostCalculator.tsx': 'simple',
  'DiscountCalculator.tsx': 'simple',
  'LoanPayoffCalculator.tsx': 'simple',
  'RoiCalculator.tsx': 'simple',
  'SalesTaxCalculator.tsx': 'simple',
  'SalaryHourlyConverter.tsx': 'simple',
  'CompoundInterestCalculator.tsx': 'simple',
  'MortgageLoanCalculator.tsx': 'simple',
  'MarkupMarginCalculator.tsx': 'simple',
  'CustomerLtvCalculator.tsx': 'simple',
  'EtsyFeeCalculator.tsx': 'simple',
  'PaypalFeeCalculator.tsx': 'simple',
  'ShopifyFeeCalculator.tsx': 'simple',
  'StripeFeeCalculator.tsx': 'simple',
  'FreelanceHourlyRateCalculator.tsx': 'simple',
  'PayrollTaxEstimator.tsx': 'simple',
  'CostPerCreditHourCalculator.tsx': 'simple',
  'StudentLoanPayoffCalculator.tsx': 'simple',
  'RoommateRentSplitCalculator.tsx': 'simple',
  'ReorderPointCalculator.tsx': 'simple',
  'DilutionCalculator.tsx': 'simple',
  'MolarMassCalculator.tsx': 'simple',
  'MolesMolarityCalculator.tsx': 'simple',
  'PhPohCalculator.tsx': 'simple',
  'StoichiometryPercentYieldCalculator.tsx': 'simple',
  'OhmsLawElectricalCalculator.tsx': 'simple',
  'WaveFrequencySpeedCalculator.tsx': 'simple',
  'KinematicsMotionCalculator.tsx': 'simple',
  'ForceFrictionMomentumCalculator.tsx': 'simple',
  'WorkEnergyPowerCalculator.tsx': 'simple',
  'GasLawsCalculator.tsx': 'simple',
  'PythagoreanTheoremCalculator.tsx': 'simple',
  'DistanceMidpointCalculator.tsx': 'simple',
  'CircleCalculator.tsx': 'simple',
  'RatioProportionCalculator.tsx': 'simple',
  'ExponentLogarithmCalculator.tsx': 'simple',
  'ScientificNotationCalculator.tsx': 'simple',
  'SignificantFiguresCalculator.tsx': 'simple',
  'QuadraticFormulaCalculator.tsx': 'simple',
  'LinearEquationCalculator.tsx': 'simple',

  # Multi-Mode Calculators (Family 2)
  'PercentageCalculator.tsx': 'multimode',
  'AverageCalculator.tsx': 'multimode',
  'UnitConverter.tsx': 'multimode',
  'MarksPercentageConverter.tsx': 'multimode',
  'MarksToGpaConverter.tsx': 'multimode',
  'GpaScaleConverter.tsx': 'multimode',
  'CurrencyConverter.tsx': 'multimode',
  'AspectCalculator.tsx': 'multimode',
  'ColorPickerConverter.tsx': 'multimode',
  'TimeZoneConverter.tsx': 'multimode',
  'TrigonometryCalculator.tsx': 'multimode',
  'LawOfSinesCosinesCalculator.tsx': 'multimode',
  'TriangleAreaSolver.tsx': 'multimode',
  'GeometryAreaVolumeCalculator.tsx': 'multimode',
  'DerivativeLimitCalculator.tsx': 'multimode',
  'SequenceSeriesCalculator.tsx': 'multimode',
  'PermutationCombinationCalculator.tsx': 'multimode',
  'ProbabilityCalculator.tsx': 'multimode',
  'ProbabilityDistributionsCalculator.tsx': 'multimode',

  # Document & Legal Generators (Family 3)
  'InvoiceGenerator.tsx': 'document',
  'ReceiptGenerator.tsx': 'document',
  'RentReceiptGenerator.tsx': 'document',
  'BillOfLadingGenerator.tsx': 'document',
  'BillOfSaleGenerator.tsx': 'document',
  'NdaTemplateGenerator.tsx': 'document',
  'FreelanceContractGenerator.tsx': 'document',
  'PromissoryNoteGenerator.tsx': 'document',
  'MeetingMinutesGenerator.tsx': 'document',
  'UtmBuilder.tsx': 'document',

  # Complex Analytical & Academic Dashboards (Family 4)
  'AttendanceCalculator.tsx': 'complex',
  'GpaCalculator.tsx': 'complex',
  'FinalGradeCalculator.tsx': 'complex',
  'CumulativeGpaCalculator.tsx': 'complex',
  'WeightedGradeCalculator.tsx': 'complex',
  'TargetGpaPlannerCalculator.tsx': 'complex',
  'StudentBudgetPlanner.tsx': 'complex',
  'StudyScheduleTimeCalculator.tsx': 'complex',
  'ExamAssignmentCountdown.tsx': 'complex',
  'DescriptiveStatisticsCalculator.tsx': 'complex',
  'ConfidenceIntervalCalculator.tsx': 'complex',
  'HypothesisTestCalculator.tsx': 'complex',
  'ZScoreCalculator.tsx': 'complex',
  'DepreciationCalculator.tsx': 'complex',
  'EoqCalculator.tsx': 'complex',
  'OeeCalculator.tsx': 'complex',
  'VolumetricWeightCalculator.tsx': 'complex',
  'PtoCalculator.tsx': 'complex',
  'FractionCalculator.tsx': 'complex',
  'CitationFormatter.tsx': 'complex',

  # Developer & Technical Utilities (Family 5)
  'JsonFormatterValidator.tsx': 'developer',
  'JwtDecoder.tsx': 'developer',
  'Base64EncoderDecoder.tsx': 'developer',
  'HashGenerator.tsx': 'developer',
  'BarcodeGenerator.tsx': 'developer',
  'QRCodeGenerator.tsx': 'developer',
  'PasswordGenerator.tsx': 'developer',
  'SlugGenerator.tsx': 'developer',
  'UuidGenerator.tsx': 'developer',
  'UrlEncoderDecoder.tsx': 'developer',
  'CssGlassmorphismGenerator.tsx': 'developer',

  # Text & Content Utilities (Family 6)
  'WordCounter.tsx': 'text',
  'CaseConverter.tsx': 'text',
  'AcademicReadabilityAnalyzer.tsx': 'text',
  'EssayPageCountCalculator.tsx': 'text',
  'ReadingPresentationTimeCalculator.tsx': 'text',
  'TextDiffChecker.tsx': 'text',
  'LoremIpsumGenerator.tsx': 'text',
  'BusinessNameGenerator.tsx': 'text',
  'DateDifferenceCalculator.tsx': 'text',
  'PdfPageCounter.tsx': 'text',
  'ImageResizerConverter.tsx': 'text',
  'PomodoroTimer.tsx': 'text',
}

def audit_tool_design_system():
  files = [f for f in os.listdir(TOOLS_DIR) if f.endswith('.tsx')]
  total_tools = len(files)
  
  family_counts = {
    'simple': 0,
    'multimode': 0,
    'document': 0,
    'complex': 0,
    'developer': 0,
    'text': 0,
  }
  
  primitive_usage = {
    'InputField': 0,
    'ResultCard': 0,
    'ToolHeader': 0,
    'ModePillsBar': 0,
    'Button': 0,
  }
  
  unclassified = []
  non_compliant = []

  for filename in files:
    filepath = os.path.join(TOOLS_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
      content = f.read()

    family = TOOL_FAMILY_MAP.get(filename)
    if not family:
      unclassified.append(filename)
      continue
    
    family_counts[family] += 1

    # Check primitive usage
    has_input_field = 'InputField' in content
    has_result_card = 'ResultCard' in content
    has_tool_header = 'ToolHeader' in content
    has_mode_pills = 'ModePillsBar' in content
    has_button = 'Button' in content

    if has_input_field: primitive_usage['InputField'] += 1
    if has_result_card: primitive_usage['ResultCard'] += 1
    if has_tool_header: primitive_usage['ToolHeader'] += 1
    if has_mode_pills: primitive_usage['ModePillsBar'] += 1
    if has_button: primitive_usage['Button'] += 1

    # Compliance checks based on family rules
    reasons = []

    # Check for legacy input labels (uppercase tracking-wider on labels)
    if re.search(r'label[^>]*uppercase\s+tracking-wider', content, re.IGNORECASE):
      reasons.append('Uses legacy UPPERCASE tracking-wider label style')

    # Simple & Multi-Mode calculators MUST use InputField and ResultCard or ModePillsBar
    if family in ['simple', 'multimode']:
      if not has_input_field:
        reasons.append('Simple/MultiMode tool does not use <InputField />')
      if not has_result_card and family == 'simple':
        reasons.append('Simple tool does not use <ResultCard />')
      if family == 'multimode' and not (has_mode_pills or 'Mode' in content):
        reasons.append('MultiMode tool does not use <ModePillsBar />')

    # Tool Header compliance
    if family in ['simple', 'multimode', 'complex'] and not has_tool_header:
      reasons.append('Tool does not use <ToolHeader />')

    if reasons:
      non_compliant.append((filename, family, reasons))

  print("==================================================")
  print("QUICKFORMA TOOL DESIGN SYSTEM AUDIT REPORT")
  print("==================================================")
  print(f"Catalog tools audited: {total_tools}")
  print(f"Unclassified tools: {len(unclassified)}")
  if unclassified:
    print(f"  ⚠️  Unclassified files: {unclassified}")
  print("\nFamily Distribution:")
  for fam, count in family_counts.items():
    print(f"  • {fam.capitalize():<12}: {count} tools")

  print("\nPrimitive Compliance Usage:")
  for prim, count in primitive_usage.items():
    print(f"  • {prim:<12}: {count}/{total_tools} tools")

  print(f"\nLegacy UI / Non-Compliant Tools: {len(non_compliant)}")
  if non_compliant:
    for fname, fam, reasons in non_compliant:
      print(f"  ❌ {fname} [{fam}]: {', '.join(reasons)}")

  print("==================================================")
  if len(non_compliant) == 0 and len(unclassified) == 0:
    print("RESULT: PASS — 100% DESIGN SYSTEM COMPLIANCE ACHIEVED!")
    return 0
  else:
    print(f"RESULT: FAIL — {len(non_compliant)} tools require migration.")
    return 1

if __name__ == '__main__':
  sys.exit(audit_tool_design_system())
