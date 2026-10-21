import React, { useState, useEffect } from 'react';
import { StudioPage } from './pages/StudioPage';
import { TOOLS_CATALOG } from './data/toolsCatalog';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { StudentsPage } from './pages/StudentsPage';
import { DeveloperPage } from './pages/DeveloperPage';

// Legal Pages
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { TermsOfService } from './components/legal/TermsOfService';
import { AboutUs } from './components/legal/AboutUs';
import { ContactUs } from './components/legal/ContactUs';
import { ToolSeoWrapper } from './components/seo/ToolSeoWrapper';
import { TOOL_SEO_DATA_MAP } from './data/sampleToolSeoData';

// Tools (1 Tool = 1 Dedicated Component File)
import { InvoiceGenerator } from './components/tools/InvoiceGenerator';
import { QRCodeGenerator } from './components/tools/QRCodeGenerator';
import { WordCounter } from './components/tools/WordCounter';
import { PasswordGenerator } from './components/tools/PasswordGenerator';
import { UnitConverter } from './components/tools/UnitConverter';
import { FreelanceHourlyRateCalculator } from './components/tools/FreelanceHourlyRateCalculator';
import { BreakEvenPointCalculator } from './components/tools/BreakEvenPointCalculator';
import { PayrollTaxEstimator } from './components/tools/PayrollTaxEstimator';
import { RoiCalculator } from './components/tools/RoiCalculator';
import { MortgageLoanCalculator } from './components/tools/MortgageLoanCalculator';
import { MarkupMarginCalculator } from './components/tools/MarkupMarginCalculator';
import { SalaryHourlyConverter } from './components/tools/SalaryHourlyConverter';
import { SalesTaxCalculator } from './components/tools/SalesTaxCalculator';
import { DiscountCalculator } from './components/tools/DiscountCalculator';
import { CompoundInterestCalculator } from './components/tools/CompoundInterestCalculator';
import { LoanPayoffCalculator } from './components/tools/LoanPayoffCalculator';
import { CpmAdCostCalculator } from './components/tools/CpmAdCostCalculator';
import { CustomerLtvCalculator } from './components/tools/CustomerLtvCalculator';
import { ReceiptGenerator } from './components/tools/ReceiptGenerator';
import { NdaTemplateGenerator } from './components/tools/NdaTemplateGenerator';
import { BillOfSaleGenerator } from './components/tools/BillOfSaleGenerator';
import { FreelanceContractGenerator } from './components/tools/FreelanceContractGenerator';
import { MeetingMinutesGenerator } from './components/tools/MeetingMinutesGenerator';
import { RentReceiptGenerator } from './components/tools/RentReceiptGenerator';
import { PromissoryNoteGenerator } from './components/tools/PromissoryNoteGenerator';
import { BillOfLadingGenerator } from './components/tools/BillOfLadingGenerator';
import { CurrencyConverter } from './components/tools/CurrencyConverter';
import { DateDifferenceCalculator } from './components/tools/DateDifferenceCalculator';
import { TimeZoneConverter } from './components/tools/TimeZoneConverter';
import { PdfPageCounter } from './components/tools/PdfPageCounter';
import { AspectCalculator } from './components/tools/AspectCalculator';
import { ColorPickerConverter } from './components/tools/ColorPickerConverter';
import { ImageResizerConverter } from './components/tools/ImageResizerConverter';
import { JsonFormatterValidator } from './components/tools/JsonFormatterValidator';
import { Base64EncoderDecoder } from './components/tools/Base64EncoderDecoder';
import { HashGenerator } from './components/tools/HashGenerator';
import { UrlEncoderDecoder } from './components/tools/UrlEncoderDecoder';
import { CssGlassmorphismGenerator } from './components/tools/CssGlassmorphismGenerator';
import { BarcodeGenerator } from './components/tools/BarcodeGenerator';
import { CaseConverter } from './components/tools/CaseConverter';
import { TextDiffChecker } from './components/tools/TextDiffChecker';
import { LoremIpsumGenerator } from './components/tools/LoremIpsumGenerator';
import { BusinessNameGenerator } from './components/tools/BusinessNameGenerator';
import { SlugGenerator } from './components/tools/SlugGenerator';
import { PomodoroTimer } from './components/tools/PomodoroTimer';
import { GpaCalculator } from './components/tools/GpaCalculator';
import { FinalGradeCalculator } from './components/tools/FinalGradeCalculator';
import { PercentageCalculator } from './components/tools/PercentageCalculator';
import { FractionCalculator } from './components/tools/FractionCalculator';

// 10 New Strategic Tools
import { UuidGenerator } from './components/tools/UuidGenerator';
import { JwtDecoder } from './components/tools/JwtDecoder';
import { ShopifyFeeCalculator } from './components/tools/ShopifyFeeCalculator';
import { StripeFeeCalculator } from './components/tools/StripeFeeCalculator';
import { EoqCalculator } from './components/tools/EoqCalculator';
import { ReorderPointCalculator } from './components/tools/ReorderPointCalculator';
import { OeeCalculator } from './components/tools/OeeCalculator';
import { PtoCalculator } from './components/tools/PtoCalculator';
import { UtmBuilder } from './components/tools/UtmBuilder';

// 4 New Strategic Pillar Tools
import { PaypalFeeCalculator } from './components/tools/PaypalFeeCalculator';
import { EtsyFeeCalculator } from './components/tools/EtsyFeeCalculator';
import { VolumetricWeightCalculator } from './components/tools/VolumetricWeightCalculator';
import { DepreciationCalculator } from './components/tools/DepreciationCalculator';

import { CumulativeGpaCalculator } from './components/tools/CumulativeGpaCalculator';
import { WeightedGradeCalculator } from './components/tools/WeightedGradeCalculator';
import { TargetGpaPlannerCalculator } from './components/tools/TargetGpaPlannerCalculator';
import { AttendanceCalculator } from './components/tools/AttendanceCalculator';
import { MarksPercentageConverter } from './components/tools/MarksPercentageConverter';
import { RatioProportionCalculator } from './components/tools/RatioProportionCalculator';
import { AverageCalculator } from './components/tools/AverageCalculator';
import { ScientificNotationCalculator } from './components/tools/ScientificNotationCalculator';
import { ExponentLogarithmCalculator } from './components/tools/ExponentLogarithmCalculator';
import { LinearEquationCalculator } from './components/tools/LinearEquationCalculator';
import { QuadraticFormulaCalculator } from './components/tools/QuadraticFormulaCalculator';
import { DistanceMidpointCalculator } from './components/tools/DistanceMidpointCalculator';
import { SequenceSeriesCalculator } from './components/tools/SequenceSeriesCalculator';
import { PythagoreanTheoremCalculator } from './components/tools/PythagoreanTheoremCalculator';
import { TriangleAreaSolver } from './components/tools/TriangleAreaSolver';
import { CircleCalculator } from './components/tools/CircleCalculator';
import { GeometryAreaVolumeCalculator } from './components/tools/GeometryAreaVolumeCalculator';
import { TrigonometryCalculator } from './components/tools/TrigonometryCalculator';
import { LawOfSinesCosinesCalculator } from './components/tools/LawOfSinesCosinesCalculator';
import { DerivativeLimitCalculator } from './components/tools/DerivativeLimitCalculator';
import { DescriptiveStatisticsCalculator } from './components/tools/DescriptiveStatisticsCalculator';
import { ZScoreCalculator } from './components/tools/ZScoreCalculator';
import { ProbabilityCalculator } from './components/tools/ProbabilityCalculator';
import { PermutationCombinationCalculator } from './components/tools/PermutationCombinationCalculator';
import { ProbabilityDistributionsCalculator } from './components/tools/ProbabilityDistributionsCalculator';
import { ConfidenceIntervalCalculator } from './components/tools/ConfidenceIntervalCalculator';
import { HypothesisTestCalculator } from './components/tools/HypothesisTestCalculator';
import { MolarMassCalculator } from './components/tools/MolarMassCalculator';
import { MolesMolarityCalculator } from './components/tools/MolesMolarityCalculator';
import { DilutionCalculator } from './components/tools/DilutionCalculator';
import { PhPohCalculator } from './components/tools/PhPohCalculator';
import { StoichiometryPercentYieldCalculator } from './components/tools/StoichiometryPercentYieldCalculator';
import { GasLawsCalculator } from './components/tools/GasLawsCalculator';
import { SignificantFiguresCalculator } from './components/tools/SignificantFiguresCalculator';
import { KinematicsMotionCalculator } from './components/tools/KinematicsMotionCalculator';
import { ForceFrictionMomentumCalculator } from './components/tools/ForceFrictionMomentumCalculator';
import { WorkEnergyPowerCalculator } from './components/tools/WorkEnergyPowerCalculator';
import { OhmsLawElectricalCalculator } from './components/tools/OhmsLawElectricalCalculator';
import { WaveFrequencySpeedCalculator } from './components/tools/WaveFrequencySpeedCalculator';
import { ReadingPresentationTimeCalculator } from './components/tools/ReadingPresentationTimeCalculator';
import { EssayPageCountCalculator } from './components/tools/EssayPageCountCalculator';
import { AcademicReadabilityAnalyzer } from './components/tools/AcademicReadabilityAnalyzer';
import { CitationFormatter } from './components/tools/CitationFormatter';
import { StudyScheduleTimeCalculator } from './components/tools/StudyScheduleTimeCalculator';
import { ExamAssignmentCountdown } from './components/tools/ExamAssignmentCountdown';
import { StudentBudgetPlanner } from './components/tools/StudentBudgetPlanner';
import { CostPerCreditHourCalculator } from './components/tools/CostPerCreditHourCalculator';
import { StudentLoanPayoffCalculator } from './components/tools/StudentLoanPayoffCalculator';
import { RoommateRentSplitCalculator } from './components/tools/RoommateRentSplitCalculator';
import { GpaScaleConverter } from './components/tools/GpaScaleConverter';
import { MarksToGpaConverter } from './components/tools/MarksToGpaConverter';

// Batch 1: 50 Production Tools
import { CashFlowRunwayCalculator } from './components/tools/CashFlowRunwayCalculator';
import { EbitdaCalculator } from './components/tools/EbitdaCalculator';
import { WorkingCapitalCalculator } from './components/tools/WorkingCapitalCalculator';
import { NpvIrrCalculator } from './components/tools/NpvIrrCalculator';
import { CashConversionCycleCalculator } from './components/tools/CashConversionCycleCalculator';
import { CostOfGoodsSoldCalculator } from './components/tools/CostOfGoodsSoldCalculator';
import { SaasNetRetentionRateCalculator } from './components/tools/SaasNetRetentionRateCalculator';
import { PurchaseOrderGenerator } from './components/tools/PurchaseOrderGenerator';
import { QuoteGenerator } from './components/tools/QuoteGenerator';
import { PackingSlipGenerator } from './components/tools/PackingSlipGenerator';
import { RegexTester } from './components/tools/RegexTester';
import { SubnetCalculator } from './components/tools/SubnetCalculator';
import { MetaTagGenerator } from './components/tools/MetaTagGenerator';
import { SchemaMarkupGenerator } from './components/tools/SchemaMarkupGenerator';
import { GoogleSerpPreviewTool } from './components/tools/GoogleSerpPreviewTool';
import { HighSchoolGpaCalculator } from './components/tools/HighSchoolGpaCalculator';
import { CollegeGpaCalculator } from './components/tools/CollegeGpaCalculator';
import { SemesterGradeCalculator } from './components/tools/SemesterGradeCalculator';
import { PrimeFactorizationCalculator } from './components/tools/PrimeFactorizationCalculator';
import { BaseConverter } from './components/tools/BaseConverter';
import { LinearRegressionCalculator } from './components/tools/LinearRegressionCalculator';
import { StandardDeviationCalculator } from './components/tools/StandardDeviationCalculator';
import { SampleSizeCalculator } from './components/tools/SampleSizeCalculator';
import { DensityMassVolumeCalculator } from './components/tools/DensityMassVolumeCalculator';
import { ProjectileMotionCalculator } from './components/tools/ProjectileMotionCalculator';
import { EbayFinalValueFeeCalculator } from './components/tools/EbayFinalValueFeeCalculator';
import { TiktokShopFeeCalculator } from './components/tools/TiktokShopFeeCalculator';
import { CostPerAcquisitionCpaCalculator } from './components/tools/CostPerAcquisitionCpaCalculator';
import { EcommerceConversionRateCalculator } from './components/tools/EcommerceConversionRateCalculator';
import { EcommerceNetProfitMarginCalculator } from './components/tools/EcommerceNetProfitMarginCalculator';
import { SafetyStockCalculator } from './components/tools/SafetyStockCalculator';
import { MachineDowntimeCostCalculator } from './components/tools/MachineDowntimeCostCalculator';
import { CapacityUtilizationCalculator } from './components/tools/CapacityUtilizationCalculator';
import { TaktTimeCalculator } from './components/tools/TaktTimeCalculator';
import { CapRateCalculator } from './components/tools/CapRateCalculator';
import { CashOnCashReturnCalculator } from './components/tools/CashOnCashReturnCalculator';
import { RentalPropertyRoiCalculator } from './components/tools/RentalPropertyRoiCalculator';
import { AmortizationScheduleExtraPayments } from './components/tools/AmortizationScheduleExtraPayments';
import { ShortTermRentalAirbnbCalculator } from './components/tools/ShortTermRentalAirbnbCalculator';
import { CustomerAcquisitionCostCac } from './components/tools/CustomerAcquisitionCostCac';
import { ReturnOnAdSpendRoas } from './components/tools/ReturnOnAdSpendRoas';
import { ClickThroughRateCtrCalculator } from './components/tools/ClickThroughRateCtrCalculator';
import { AbTestSignificanceCalculator } from './components/tools/AbTestSignificanceCalculator';
import { EmployeeTurnoverCostCalculator } from './components/tools/EmployeeTurnoverCostCalculator';
import { TotalCompensationCalculator } from './components/tools/TotalCompensationCalculator';
import { EmployeeCostToEmployerCalculator } from './components/tools/EmployeeCostToEmployerCalculator';
import { ContractorVsEmployeeCostCalculator } from './components/tools/ContractorVsEmployeeCostCalculator';
import { EmergencyFundCalculator } from './components/tools/EmergencyFundCalculator';
import { DebtSnowballAvalancheCalculator } from './components/tools/DebtSnowballAvalancheCalculator';
import { NetWorthCalculator } from './components/tools/NetWorthCalculator';

import { ContributionMarginCalculator } from './components/tools/ContributionMarginCalculator';
import { BibliographyGenerator } from './components/tools/BibliographyGenerator';
import { AmazonFbaCalculator } from './components/tools/AmazonFbaCalculator';
import { TakeHomePayCalculator } from './components/tools/TakeHomePayCalculator';
import { TimeCardHoursCalculator } from './components/tools/TimeCardHoursCalculator';
import { Budget503020Calculator } from './components/tools/Budget503020Calculator';
import { CarLoanPaymentCalculator } from './components/tools/CarLoanPaymentCalculator';
import { RetirementNestEggCalculator } from './components/tools/RetirementNestEggCalculator';
import { PersonalCashFlowSavingsRateCalculator } from './components/tools/PersonalCashFlowSavingsRateCalculator';
import { DebtToIncomeCalculator } from './components/tools/DebtToIncomeCalculator';
import { DscrCalculator } from './components/tools/DscrCalculator';
import { CacPaybackCalculator } from './components/tools/CacPaybackCalculator';
import { WaccCalculator } from './components/tools/WaccCalculator';
import { FreeCashFlowCalculator } from './components/tools/FreeCashFlowCalculator';
import { InventoryHoldingCostCalculator } from './components/tools/InventoryHoldingCostCalculator';
import { PaybackPeriodCalculator } from './components/tools/PaybackPeriodCalculator';
import { SaasMagicNumberCalculator } from './components/tools/SaasMagicNumberCalculator';
import { ChurnRateImpactCalculator } from './components/tools/ChurnRateImpactCalculator';
import { Sba7aLoanCalculator } from './components/tools/Sba7aLoanCalculator';
import { SaasRuleOf40Calculator } from './components/tools/SaasRuleOf40Calculator';
import { AccountsReceivableTurnoverCalculator } from './components/tools/AccountsReceivableTurnoverCalculator';
import { AccountsPayableTurnoverCalculator } from './components/tools/AccountsPayableTurnoverCalculator';
import { CreditCardProcessingSavingsCalculator } from './components/tools/CreditCardProcessingSavingsCalculator';
import { MerchantCashAdvanceCalculator } from './components/tools/MerchantCashAdvanceCalculator';
import { StartupSeedRunwayPlanner } from './components/tools/StartupSeedRunwayPlanner';
import { SalesCommissionCalculator } from './components/tools/SalesCommissionCalculator';
import { OverheadRateCalculator } from './components/tools/OverheadRateCalculator';
import { QuickRatioCalculator } from './components/tools/QuickRatioCalculator';
import { RetainedEarningsCalculator } from './components/tools/RetainedEarningsCalculator';
import { AltmanZScoreCalculator } from './components/tools/AltmanZScoreCalculator';
import { CostBenefitAnalysisCalculator } from './components/tools/CostBenefitAnalysisCalculator';
import { GrossMarginStandaloneCalculator } from './components/tools/GrossMarginStandaloneCalculator';
import { CreditNoteGenerator } from './components/tools/CreditNoteGenerator';
import { ContractorAgreementGenerator } from './components/tools/ContractorAgreementGenerator';
import { OfferLetterGenerator } from './components/tools/OfferLetterGenerator';
import { ExpenseReportGenerator } from './components/tools/ExpenseReportGenerator';
import { ConsultingProposalGenerator } from './components/tools/ConsultingProposalGenerator';
import { BillOfMaterialsGenerator } from './components/tools/BillOfMaterialsGenerator';
import { SqlFormatter } from './components/tools/SqlFormatter';
import { XmlJsonConverter } from './components/tools/XmlJsonConverter';
import { YamlJsonConverter } from './components/tools/YamlJsonConverter';
import { CronExpressionGenerator } from './components/tools/CronExpressionGenerator';
import { UnixTimestampConverter } from './components/tools/UnixTimestampConverter';
import { MarkdownToHtmlConverter } from './components/tools/MarkdownToHtmlConverter';
import { ChmodCalculator } from './components/tools/ChmodCalculator';
import { KeywordDensityAnalyzer } from './components/tools/KeywordDensityAnalyzer';
import { RobotsTxtGenerator } from './components/tools/RobotsTxtGenerator';
import { HeadlineAnalyzer } from './components/tools/HeadlineAnalyzer';
import { CharacterCountLimitTool } from './components/tools/CharacterCountLimitTool';
import { DuplicateLineRemover } from './components/tools/DuplicateLineRemover';
import { MarkdownTableGenerator } from './components/tools/MarkdownTableGenerator';
import { EmailSubjectLineTester } from './components/tools/EmailSubjectLineTester';
import { TextCleanerSanitizer } from './components/tools/TextCleanerSanitizer';
import { CamelSnakeKebabConverter } from './components/tools/CamelSnakeKebabConverter';
import { ReadingEaseScoreCalculator } from './components/tools/ReadingEaseScoreCalculator';
import { MetaDescriptionLengthTool } from './components/tools/MetaDescriptionLengthTool';
import { QuarterToSemesterGpaCalculator } from './components/tools/QuarterToSemesterGpaCalculator';
import { GpaBoostCalculator } from './components/tools/GpaBoostCalculator';
import { GradePointAverageScaleConverter } from './components/tools/GradePointAverageScaleConverter';
import { HonorsApIbGpaCalculator } from './components/tools/HonorsApIbGpaCalculator';
import { TestScorePercentageCalculator } from './components/tools/TestScorePercentageCalculator';
import { CurvedGradeCalculator } from './components/tools/CurvedGradeCalculator';
import { AssignmentWeightCalculator } from './components/tools/AssignmentWeightCalculator';
import { StudyHoursPerCreditCalculator } from './components/tools/StudyHoursPerCreditCalculator';
import { SatActConcordanceCalculator } from './components/tools/SatActConcordanceCalculator';
import { TransferCreditGpaCalculator } from './components/tools/TransferCreditGpaCalculator';
import { IntegralCalculusCalculator } from './components/tools/IntegralCalculusCalculator';
import { MatrixAlgebraCalculator } from './components/tools/MatrixAlgebraCalculator';
import { VectorMathCalculator } from './components/tools/VectorMathCalculator';
import { PolynomialRootsCalculator } from './components/tools/PolynomialRootsCalculator';
import { SystemOfEquationsSolver } from './components/tools/SystemOfEquationsSolver';
import { SlopeInterceptCalculator } from './components/tools/SlopeInterceptCalculator';
import { PercentageChangeStandaloneCalculator } from './components/tools/PercentageChangeStandaloneCalculator';
import { ChiSquareCalculator } from './components/tools/ChiSquareCalculator';
import { AnovaCalculator } from './components/tools/AnovaCalculator';
import { VarianceCalculator } from './components/tools/VarianceCalculator';
import { TTestCalculator } from './components/tools/TTestCalculator';
import { PValueCalculator } from './components/tools/PValueCalculator';
import { CorrelationCoefficientCalculator } from './components/tools/CorrelationCoefficientCalculator';
import { InterquartileRangeCalculator } from './components/tools/InterquartileRangeCalculator';
import { HalfLifeCalculator } from './components/tools/HalfLifeCalculator';
import { EmpiricalFormulaCalculator } from './components/tools/EmpiricalFormulaCalculator';
import { ThermodynamicsGibbsCalculator } from './components/tools/ThermodynamicsGibbsCalculator';
import { SolutionConcentrationConverter } from './components/tools/SolutionConcentrationConverter';
import { GravitationalForceCalculator } from './components/tools/GravitationalForceCalculator';
import { CentripetalForceCalculator } from './components/tools/CentripetalForceCalculator';
import { HeatTransferCalorimetryCalculator } from './components/tools/HeatTransferCalorimetryCalculator';
import { SpacedRepetitionScheduler } from './components/tools/SpacedRepetitionScheduler';
import { PlagiarismSimilarityScoreTool } from './components/tools/PlagiarismSimilarityScoreTool';
import { HomeworkTimeEstimator } from './components/tools/HomeworkTimeEstimator';
import { TypingSpeedWpmCalculator } from './components/tools/TypingSpeedWpmCalculator';
import { WalmartMarketplaceFeeCalculator } from './components/tools/WalmartMarketplaceFeeCalculator';
import { GoogleShoppingRoasCalculator } from './components/tools/GoogleShoppingRoasCalculator';
import { ProductBundlePricingCalculator } from './components/tools/ProductBundlePricingCalculator';
import { InventoryTurnoverRatioCalculator } from './components/tools/InventoryTurnoverRatioCalculator';
import { FreeShippingThresholdCalculator } from './components/tools/FreeShippingThresholdCalculator';
import { DropshippingProfitMarginCalculator } from './components/tools/DropshippingProfitMarginCalculator';
import { AbandonedCartRecoveryRoiCalculator } from './components/tools/AbandonedCartRecoveryRoiCalculator';
import { SkuProfitabilityAnalyzer } from './components/tools/SkuProfitabilityAnalyzer';
import { FulfillmentCostPerOrderCalculator } from './components/tools/FulfillmentCostPerOrderCalculator';

import { CapTableCalculator } from './components/tools/CapTableCalculator';
import { BusinessValuationCalculator } from './components/tools/BusinessValuationCalculator';
import { LeaseVsBuyCalculator } from './components/tools/LeaseVsBuyCalculator';
import { InvoiceFactoringCalculator } from './components/tools/InvoiceFactoringCalculator';
import { OperatingLeverageCalculator } from './components/tools/OperatingLeverageCalculator';
import { NetPromoterScoreRoiCalculator } from './components/tools/NetPromoterScoreRoiCalculator';
import { EquipmentLeaseCalculator } from './components/tools/EquipmentLeaseCalculator';
import { FranchiseFeeRoiCalculator } from './components/tools/FranchiseFeeRoiCalculator';
import { DeferredRevenueCalculator } from './components/tools/DeferredRevenueCalculator';
import { BadDebtAllowanceCalculator } from './components/tools/BadDebtAllowanceCalculator';
import { RevenuePerEmployeeCalculator } from './components/tools/RevenuePerEmployeeCalculator';
import { AssetTurnoverRatioCalculator } from './components/tools/AssetTurnoverRatioCalculator';
import { SolvencyRatioCalculator } from './components/tools/SolvencyRatioCalculator';
import { DupontAnalysisCalculator } from './components/tools/DupontAnalysisCalculator';
import { DividendYieldPayoutCalculator } from './components/tools/DividendYieldPayoutCalculator';
import { EconomicValueAddedCalculator } from './components/tools/EconomicValueAddedCalculator';
import { CapitalBudgetingPaybackCalculator } from './components/tools/CapitalBudgetingPaybackCalculator';
import { MarginalCostRevenueCalculator } from './components/tools/MarginalCostRevenueCalculator';
import { OperatingCashFlowToSalesCalculator } from './components/tools/OperatingCashFlowToSalesCalculator';
import { RuleOfThumbValuationCalculator } from './components/tools/RuleOfThumbValuationCalculator';
import { OperatingExpenseRatioCalculator } from './components/tools/OperatingExpenseRatioCalculator';
import { RoceCalculator } from './components/tools/RoceCalculator';
import { StatementOfWorkGenerator } from './components/tools/StatementOfWorkGenerator';
import { DebitNoteGenerator } from './components/tools/DebitNoteGenerator';
import { ServiceLevelAgreementGenerator } from './components/tools/ServiceLevelAgreementGenerator';
import { TerminationLetterGenerator } from './components/tools/TerminationLetterGenerator';
import { SubcontractorAgreementGenerator } from './components/tools/SubcontractorAgreementGenerator';
import { CommercialLeaseSummaryGenerator } from './components/tools/CommercialLeaseSummaryGenerator';
import { CertificateOfCompletionGenerator } from './components/tools/CertificateOfCompletionGenerator';
import { PrivacyPolicyTemplateGenerator } from './components/tools/PrivacyPolicyTemplateGenerator';
import { TermsOfServiceGenerator } from './components/tools/TermsOfServiceGenerator';
import { IncidentReportGenerator } from './components/tools/IncidentReportGenerator';
import { MemorandumOfUnderstandingGenerator } from './components/tools/MemorandumOfUnderstandingGenerator';
import { HtmlEntityEncoder } from './components/tools/HtmlEntityEncoder';
import { HmacGenerator } from './components/tools/HmacGenerator';
import { CssMinifierUnminifier } from './components/tools/CssMinifierUnminifier';
import { JsBeautifierMinifier } from './components/tools/JsBeautifierMinifier';
import { DnsLookupTool } from './components/tools/DnsLookupTool';
import { IpRangeCalculator } from './components/tools/IpRangeCalculator';
import { SvgPathFormatter } from './components/tools/SvgPathFormatter';
import { HttpHeaderGenerator } from './components/tools/HttpHeaderGenerator';
import { SitemapXmlBuilder } from './components/tools/SitemapXmlBuilder';
import { TextToSpeechEstimator } from './components/tools/TextToSpeechEstimator';
import { AnchorTextRatioPlanner } from './components/tools/AnchorTextRatioPlanner';
import { CanonicalTagGenerator } from './components/tools/CanonicalTagGenerator';
import { ParagraphCounterAnalyzer } from './components/tools/ParagraphCounterAnalyzer';
import { SlugToTitleConverter } from './components/tools/SlugToTitleConverter';
import { WordFrequencyCounter } from './components/tools/WordFrequencyCounter';
import { LoremMarkdownGenerator } from './components/tools/LoremMarkdownGenerator';
import { AltTextAccessibilityChecker } from './components/tools/AltTextAccessibilityChecker';

import { LawSchoolGpaCalculator } from './components/tools/LawSchoolGpaCalculator';
import { MedicalSchoolGpaCalculator } from './components/tools/MedicalSchoolGpaCalculator';
import { NcaaCoreGpaCalculator } from './components/tools/NcaaCoreGpaCalculator';
import { ClassRankPercentileCalculator } from './components/tools/ClassRankPercentileCalculator';
import { PassFailGpaImpactCalculator } from './components/tools/PassFailGpaImpactCalculator';
import { GraduateSchoolGpaCalculator } from './components/tools/GraduateSchoolGpaCalculator';
import { AcademicStandingCalculator } from './components/tools/AcademicStandingCalculator';
import { HighSchoolCreditCalculator } from './components/tools/HighSchoolCreditCalculator';
import { DegreeCompletionCalculator } from './components/tools/DegreeCompletionCalculator';
import { PrerequisiteCoursePlanner } from './components/tools/PrerequisiteCoursePlanner';
import { GedScoreCalculator } from './components/tools/GedScoreCalculator';
import { GreScorePercentileCalculator } from './components/tools/GreScorePercentileCalculator';
import { GmatScoreCalculator } from './components/tools/GmatScoreCalculator';
import { ToeflIeltsScoreConverter } from './components/tools/ToeflIeltsScoreConverter';
import { ClepCreditCalculator } from './components/tools/ClepCreditCalculator';
import { AcademicForgivenessGpaCalculator } from './components/tools/AcademicForgivenessGpaCalculator';
import { StemMajorGpaCalculator } from './components/tools/StemMajorGpaCalculator';
import { BusinessMajorGpaCalculator } from './components/tools/BusinessMajorGpaCalculator';
import { NursingSchoolGpaCalculator } from './components/tools/NursingSchoolGpaCalculator';
import { ComplexNumbersCalculator } from './components/tools/ComplexNumbersCalculator';
import { FactorialCalculator } from './components/tools/FactorialCalculator';
import { LogarithmChangeOfBaseTool } from './components/tools/LogarithmChangeOfBaseTool';
import { EllipseHyperbolaCalculator } from './components/tools/EllipseHyperbolaCalculator';
import { PartialFractionCalculator } from './components/tools/PartialFractionCalculator';
import { PoissonDistributionCalculator } from './components/tools/PoissonDistributionCalculator';
import { ExponentialDistributionCalculator } from './components/tools/ExponentialDistributionCalculator';
import { BayesTheoremCalculator } from './components/tools/BayesTheoremCalculator';
import { BufferSolutionCalculator } from './components/tools/BufferSolutionCalculator';
import { BoilingPointElevationCalculator } from './components/tools/BoilingPointElevationCalculator';
import { ActivationEnergyCalculator } from './components/tools/ActivationEnergyCalculator';
import { CombustionAnalysisCalculator } from './components/tools/CombustionAnalysisCalculator';
import { OxidationNumberCalculator } from './components/tools/OxidationNumberCalculator';
import { EquilibriumConstantCalculator } from './components/tools/EquilibriumConstantCalculator';
import { ElectrolysisFaradayCalculator } from './components/tools/ElectrolysisFaradayCalculator';
import { TorqueRotationalMotionCalculator } from './components/tools/TorqueRotationalMotionCalculator';
import { PendulumHarmonicMotionCalculator } from './components/tools/PendulumHarmonicMotionCalculator';
import { DopplerEffectCalculator } from './components/tools/DopplerEffectCalculator';
import { RefractionSnellsLawCalculator } from './components/tools/RefractionSnellsLawCalculator';
import { CapacitanceRcCircuitCalculator } from './components/tools/CapacitanceRcCircuitCalculator';
import { TransformerVoltageCalculator } from './components/tools/TransformerVoltageCalculator';
import { FluidBuoyancyArchimedesCalculator } from './components/tools/FluidBuoyancyArchimedesCalculator';
import { BernoullisEquationCalculator } from './components/tools/BernoullisEquationCalculator';
import { SpecialRelativityTimeDilationCalculator } from './components/tools/SpecialRelativityTimeDilationCalculator';
import { CornellNotesTemplateGenerator } from './components/tools/CornellNotesTemplateGenerator';
import { ThesisStatementGenerator } from './components/tools/ThesisStatementGenerator';
import { StudyGroupExpenseSplitter } from './components/tools/StudyGroupExpenseSplitter';
import { ExamPrepScorePredictor } from './components/tools/ExamPrepScorePredictor';
import { MercariSellerFeeCalculator } from './components/tools/MercariSellerFeeCalculator';
import { PoshmarkFeeCalculator } from './components/tools/PoshmarkFeeCalculator';
import { ReturnRateProfitImpactCalculator } from './components/tools/ReturnRateProfitImpactCalculator';

import { RoasCalculator } from './components/tools/RoasCalculator';
import { InventoryTurnsDaysSalesCalculator } from './components/tools/InventoryTurnsDaysSalesCalculator';
import { BreakEvenRevenueCalculator } from './components/tools/BreakEvenRevenueCalculator';
import { MiddleSchoolGradeCalculator } from './components/tools/MiddleSchoolGradeCalculator';
import { ShippingContainerLoadCalculator } from './components/tools/ShippingContainerLoadCalculator';
import { MinimumAdvertisedPriceMapCalculator } from './components/tools/MinimumAdvertisedPriceMapCalculator';
import { ChargebackFeeLossCalculator } from './components/tools/ChargebackFeeLossCalculator';
import { KlarnaAfterpayFeeCalculator } from './components/tools/KlarnaAfterpayFeeCalculator';
import { SquarePosProcessingFeeCalculator } from './components/tools/SquarePosProcessingFeeCalculator';
import { KickstarterIndiegogoFeeCalculator } from './components/tools/KickstarterIndiegogoFeeCalculator';
import { AmazonStorageFeeCalculator } from './components/tools/AmazonStorageFeeCalculator';
import { CrossBorderCurrencyConversionFee } from './components/tools/CrossBorderCurrencyConversionFee';
import { ProductPackagingDimensionalCalculator } from './components/tools/ProductPackagingDimensionalCalculator';
import { PrintOnDemandPodMarginCalculator } from './components/tools/PrintOnDemandPodMarginCalculator';
import { InventoryShrinkageLossCalculator } from './components/tools/InventoryShrinkageLossCalculator';
import { AffiliateCommissionPayoutCalculator } from './components/tools/AffiliateCommissionPayoutCalculator';
import { RetailMarkdownClearanceCalculator } from './components/tools/RetailMarkdownClearanceCalculator';
import { WarehouseStorageCbmCalculator } from './components/tools/WarehouseStorageCbmCalculator';
import { SupplierVolumeDiscountBreakEven } from './components/tools/SupplierVolumeDiscountBreakEven';
import { ReStockingFeeCalculator } from './components/tools/ReStockingFeeCalculator';
import { EcommerceCustomerRetentionRevenue } from './components/tools/EcommerceCustomerRetentionRevenue';
import { OmnichannelChannelMarginCompare } from './components/tools/OmnichannelChannelMarginCompare';
import { AmazonRepricingMarginCalculator } from './components/tools/AmazonRepricingMarginCalculator';
import { EcommerceRefundLossRecoveryCalculator } from './components/tools/EcommerceRefundLossRecoveryCalculator';
import { OrderCancellationRateCalculator } from './components/tools/OrderCancellationRateCalculator';
import { MultiChannelInventoryAllocation } from './components/tools/MultiChannelInventoryAllocation';
import { ShopifyPosFeeCalculator } from './components/tools/ShopifyPosFeeCalculator';
import { EtsyListingRenewalCalculator } from './components/tools/EtsyListingRenewalCalculator';
import { WoocommerceProfitCalculator } from './components/tools/WoocommerceProfitCalculator';
import { FirstPassYieldCalculator } from './components/tools/FirstPassYieldCalculator';
import { CycleTimeCalculator } from './components/tools/CycleTimeCalculator';
import { OverallLaborEffectivenessOle } from './components/tools/OverallLaborEffectivenessOle';
import { KanbanCardQuantityCalculator } from './components/tools/KanbanCardQuantityCalculator';
import { BillOfMaterialsCostCalculator } from './components/tools/BillOfMaterialsCostCalculator';
import { MeanTimeBetweenFailuresMtbf } from './components/tools/MeanTimeBetweenFailuresMtbf';
import { ChangeoverTimeSmedCalculator } from './components/tools/ChangeoverTimeSmedCalculator';
import { WorkInProcessWipCalculator } from './components/tools/WorkInProcessWipCalculator';
import { ScrapRatePercentageCalculator } from './components/tools/ScrapRatePercentageCalculator';
import { ManufacturingOverheadAllocation } from './components/tools/ManufacturingOverheadAllocation';
import { StandardCostVarianceCalculator } from './components/tools/StandardCostVarianceCalculator';
import { TpmPlannedMaintenanceScheduler } from './components/tools/TpmPlannedMaintenanceScheduler';
import { ProcessCapabilityCpCpkCalculator } from './components/tools/ProcessCapabilityCpCpkCalculator';
import { DefectDensityPpmCalculator } from './components/tools/DefectDensityPpmCalculator';
import { LineBalancingEfficiencyCalculator } from './components/tools/LineBalancingEfficiencyCalculator';
import { BatchSizeEconomicProduction } from './components/tools/BatchSizeEconomicProduction';
import { WarehouseBinUtilizationCalculator } from './components/tools/WarehouseBinUtilizationCalculator';
import { OrderPickingRouteTimeCalculator } from './components/tools/OrderPickingRouteTimeCalculator';
import { SupplierOnTimeInFullOtif } from './components/tools/SupplierOnTimeInFullOtif';
import { YieldLossPercentageCalculator } from './components/tools/YieldLossPercentageCalculator';
import { EquipmentReplacementCapitalExpenditure } from './components/tools/EquipmentReplacementCapitalExpenditure';

import { LaborEfficiencyVarianceCalculator } from './components/tools/LaborEfficiencyVarianceCalculator';
import { MaterialRequirementsPlanningMrp } from './components/tools/MaterialRequirementsPlanningMrp';
import { Lean5sAuditScoreCalculator } from './components/tools/Lean5sAuditScoreCalculator';
import { ValueStreamMappingLeadTime } from './components/tools/ValueStreamMappingLeadTime';
import { ProductionThroughputRateCalculator } from './components/tools/ProductionThroughputRateCalculator';
import { MaintenanceLaborCostCalculator } from './components/tools/MaintenanceLaborCostCalculator';
import { SparePartsInventorySafetyStock } from './components/tools/SparePartsInventorySafetyStock';
import { WarehouseForkliftFleetCalculator } from './components/tools/WarehouseForkliftFleetCalculator';
import { CrossDockingCostSavingsCalculator } from './components/tools/CrossDockingCostSavingsCalculator';
import { PackagingTareWeightCalculator } from './components/tools/PackagingTareWeightCalculator';
import { FactoryFloorSpaceProductivity } from './components/tools/FactoryFloorSpaceProductivity';
import { EnergyConsumptionCostCalculator } from './components/tools/EnergyConsumptionCostCalculator';
import { ManufacturingLaborRateBurden } from './components/tools/ManufacturingLaborRateBurden';
import { ManufacturingTaktVsCycleTime } from './components/tools/ManufacturingTaktVsCycleTime';
import { IndustrialElectricityPeakDemandCost } from './components/tools/IndustrialElectricityPeakDemandCost';
import { WorkCenterCapacityPlanner } from './components/tools/WorkCenterCapacityPlanner';
import { ChangeoverDowntimeCostCalculator } from './components/tools/ChangeoverDowntimeCostCalculator';
import { ManufacturingYieldVarianceCalculator } from './components/tools/ManufacturingYieldVarianceCalculator';
import { SqcXBarRControlChart } from './components/tools/SqcXBarRControlChart';
import { NioshLiftingEquationCalculator } from './components/tools/NioshLiftingEquationCalculator';
import { OverdueMaintenanceRiskCalculator } from './components/tools/OverdueMaintenanceRiskCalculator';
import { ScrapRecyclingSalvageCalculator } from './components/tools/ScrapRecyclingSalvageCalculator';
import { GrossRentMultiplierGrm } from './components/tools/GrossRentMultiplierGrm';
import { DebtServiceCoverageRatioRealEstate } from './components/tools/DebtServiceCoverageRatioRealEstate';
import { RealEstateAppreciationCalculator } from './components/tools/RealEstateAppreciationCalculator';
import { MortgageRefinanceBreakEvenCalculator } from './components/tools/MortgageRefinanceBreakEvenCalculator';
import { HouseFlippingProfitCalculator } from './components/tools/HouseFlippingProfitCalculator';
import { BrrrrStrategyCalculator } from './components/tools/BrrrrStrategyCalculator';
import { PropertyManagementFeeCalculator } from './components/tools/PropertyManagementFeeCalculator';
import { TenantTurnoverCostCalculator } from './components/tools/TenantTurnoverCostCalculator';
import { CommercialRealEstateLeaseCalculator } from './components/tools/CommercialRealEstateLeaseCalculator';
import { HomeEquityLineOfCreditHeloc } from './components/tools/HomeEquityLineOfCreditHeloc';
import { PriceToRentRatioCalculator } from './components/tools/PriceToRentRatioCalculator';
import { RealEstateCommissionSplitCalculator } from './components/tools/RealEstateCommissionSplitCalculator';
import { TitleInsuranceClosingCostCalculator } from './components/tools/TitleInsuranceClosingCostCalculator';
import { VacancyRateLossCalculator } from './components/tools/VacancyRateLossCalculator';
import { SellerNetSheetCalculator } from './components/tools/SellerNetSheetCalculator';
import { RealEstateEquityMultipleCalculator } from './components/tools/RealEstateEquityMultipleCalculator';
import { PropertyCapRateSensitivityCalculator } from './components/tools/PropertyCapRateSensitivityCalculator';
import { VacationRentalShortTermOccupancy } from './components/tools/VacationRentalShortTermOccupancy';
import { RealEstateDebtYieldCalculator } from './components/tools/RealEstateDebtYieldCalculator';
import { RealEstateIrrCalculator } from './components/tools/RealEstateIrrCalculator';
import { CostPerClickCpcCalculator } from './components/tools/CostPerClickCpcCalculator';
import { CostPerLeadCplCalculator } from './components/tools/CostPerLeadCplCalculator';
import { EmailMarketingRoiCalculator } from './components/tools/EmailMarketingRoiCalculator';
import { ViralKFactorCalculator } from './components/tools/ViralKFactorCalculator';
import { ConversionRateOptimizationCro } from './components/tools/ConversionRateOptimizationCro';
import { InfluencerMarketingRoiCalculator } from './components/tools/InfluencerMarketingRoiCalculator';
import { CustomerChurnRateCalculator } from './components/tools/CustomerChurnRateCalculator';
import { NetPromoterScoreNpsCalculator } from './components/tools/NetPromoterScoreNpsCalculator';

import { MarketingQualifiedLeadMqlConversion } from './components/tools/MarketingQualifiedLeadMqlConversion';
import { ContentMarketingRoiCalculator } from './components/tools/ContentMarketingRoiCalculator';
import { EventSponsorshipRoiCalculator } from './components/tools/EventSponsorshipRoiCalculator';
import { SocialMediaEngagementRateCalculator } from './components/tools/SocialMediaEngagementRateCalculator';
import { PayPerClickPpcBudgetCalculator } from './components/tools/PayPerClickPpcBudgetCalculator';
import { CustomerRetentionRateCalculator } from './components/tools/CustomerRetentionRateCalculator';
import { AffiliateMarketingCommissionCalculator } from './components/tools/AffiliateMarketingCommissionCalculator';
import { AppStoreConversionRateCalculator } from './components/tools/AppStoreConversionRateCalculator';
import { CostPerAcquisitionTargetCalculator } from './components/tools/CostPerAcquisitionTargetCalculator';
import { PodcastAdCpmCalculator } from './components/tools/PodcastAdCpmCalculator';
import { LeadScoringThresholdCalculator } from './components/tools/LeadScoringThresholdCalculator';
import { ExpansionMrrRateCalculator } from './components/tools/ExpansionMrrRateCalculator';
import { HourlyToSalaryCalculator } from './components/tools/HourlyToSalaryCalculator';
import { FmlaLeaveHoursCalculator } from './components/tools/FmlaLeaveHoursCalculator';
import { SeverancePayCalculator } from './components/tools/SeverancePayCalculator';
import { OvertimePayCalculator } from './components/tools/OvertimePayCalculator';
import { CommissionPayoutCalculator } from './components/tools/CommissionPayoutCalculator';
import { FullTimeEquivalentFteCalculator } from './components/tools/FullTimeEquivalentFteCalculator';
import { RelocationCostCalculator } from './components/tools/RelocationCostCalculator';
import { FourZeroOneKEmployerMatchCalculator } from './components/tools/FourZeroOneKEmployerMatchCalculator';
import { PtoPayoutUponTermination } from './components/tools/PtoPayoutUponTermination';
import { EmployeeAbsenceRateCalculator } from './components/tools/EmployeeAbsenceRateCalculator';
import { StockOptionExerciseCalculator } from './components/tools/StockOptionExerciseCalculator';
import { AnnualBonusTaxWithholdingCalculator } from './components/tools/AnnualBonusTaxWithholdingCalculator';
import { ShiftDifferentialPayCalculator } from './components/tools/ShiftDifferentialPayCalculator';
import { RemoteWorkStipendCalculator } from './components/tools/RemoteWorkStipendCalculator';
import { TrainingRoiCalculator } from './components/tools/TrainingRoiCalculator';
import { GlassdoorSalaryBenchmarkCalculator } from './components/tools/GlassdoorSalaryBenchmarkCalculator';
import { InternalPayEquityCalculator } from './components/tools/InternalPayEquityCalculator';
import { EmployeeRetentionRateCalculator } from './components/tools/EmployeeRetentionRateCalculator';
import { RothIraGrowthCalculator } from './components/tools/RothIraGrowthCalculator';
import { SimpleSavingsGoalCalculator } from './components/tools/SimpleSavingsGoalCalculator';
import { CreditCardMinimumPaymentCalculator } from './components/tools/CreditCardMinimumPaymentCalculator';
import { InflationPurchasingPowerCalculator } from './components/tools/InflationPurchasingPowerCalculator';
import { FireFinancialIndependenceCalculator } from './components/tools/FireFinancialIndependenceCalculator';
import { CollegeSavingsFiveTwoNineCalculator } from './components/tools/CollegeSavingsFiveTwoNineCalculator';
import { LifeInsuranceNeedsCalculator } from './components/tools/LifeInsuranceNeedsCalculator';
import { SubscriptionCostAnalyzer } from './components/tools/SubscriptionCostAnalyzer';
import { HsaTripleTaxAdvantageCalculator } from './components/tools/HsaTripleTaxAdvantageCalculator';
import { SideHustleTaxCalculator } from './components/tools/SideHustleTaxCalculator';
import { SaasQuickRatioCalculator } from './components/tools/SaasQuickRatioCalculator';
import { BurnMultipleCalculator } from './components/tools/BurnMultipleCalculator';
import { GrossMarginReturnOnInvestmentGmroi } from './components/tools/GrossMarginReturnOnInvestmentGmroi';
import { AccountsPayableTurnoverRatio } from './components/tools/AccountsPayableTurnoverRatio';
import { AccountsReceivableAgingCalculator } from './components/tools/AccountsReceivableAgingCalculator';
import { CustomerAcquisitionPaybackMonths } from './components/tools/CustomerAcquisitionPaybackMonths';
import { CompoundAnnualGrowthRateCagr } from './components/tools/CompoundAnnualGrowthRateCagr';
import { WorkingCapitalCycleCalculator } from './components/tools/WorkingCapitalCycleCalculator';

// Sanity CMS Page Components
import { BusinessPage } from './pages/BusinessPage';
import { EncyclopediaHubPage } from './pages/EncyclopediaHubPage';
import { EncyclopediaCategoryPage } from './pages/EncyclopediaCategoryPage';
import { EncyclopediaEntryPage } from './pages/EncyclopediaEntryPage';
import { MindPage } from './pages/MindPage';

import { Search, X, ChevronRight, ArrowLeft } from 'lucide-react';

const LEGAL_PAGES = ['privacy', 'terms', 'about', 'contact'];

const getRouteFromPathname = (pathname: string): string => {
  const cleanPath = pathname.replace(/\/$/, '').trim();
  if (!cleanPath || cleanPath === '/') return 'home';

  if (cleanPath === '/encyclopedia') {
    return 'encyclopedia:index';
  }
  if (cleanPath.startsWith('/encyclopedia/category/')) {
    return `encyclopedia:category:${cleanPath.replace('/encyclopedia/category/', '')}`;
  }
  if (cleanPath.startsWith('/encyclopedia/')) {
    return `encyclopedia:entry:${cleanPath.replace('/encyclopedia/', '')}`;
  }

  // Redirect legacy blog & ledger URLs to Encyclopedia Knowledge Hub
  if (
    cleanPath === '/ledger' ||
    cleanPath === '/blog' ||
    cleanPath.startsWith('/ledger/') ||
    cleanPath.startsWith('/blog/') ||
    cleanPath.startsWith('/category/')
  ) {
    return 'encyclopedia:index';
  }

  if (cleanPath === '/mind') {
    return 'mind';
  }
  if (cleanPath === '/students') {
    return 'students';
  }
  if (cleanPath === '/developers' || cleanPath === '/developer') {
    return 'developers';
  }
  if (cleanPath === '/business') {
    return 'business';
  }
  if (cleanPath.startsWith('/tools/')) {
    return cleanPath.replace('/tools/', '');
  }

  const slug = cleanPath.replace(/^\//, '');
  if (LEGAL_PAGES.includes(slug)) return slug;

  const foundTool = TOOLS_CATALOG.find(t => t.id === slug);
  if (foundTool) return foundTool.id;

  return 'home';
};

const getPathnameFromView = (view: string): string => {
  if (!view || view === 'home') return '/';
  if (view === 'mind') return '/mind';
  if (view === 'students') return '/students';
  if (view === 'developers' || view === 'developer') return '/developers';
  if (view === 'business') return '/business';
  if (LEGAL_PAGES.includes(view)) return `/${view}`;
  if (view === 'encyclopedia:index' || view === 'encyclopedia') return '/encyclopedia';
  if (view.startsWith('encyclopedia:category:')) return `/encyclopedia/category/${view.replace('encyclopedia:category:', '')}`;
  if (view.startsWith('encyclopedia:entry:')) return `/encyclopedia/${view.replace('encyclopedia:entry:', '')}`;
  return `/tools/${view}`;
};

export function App() {
  const [activeView, setActiveView] = useState<string>(() => getRouteFromPathname(window.location.pathname));
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Handle HTML5 History API (popstate) & initial path normalization
  useEffect(() => {
    const handlePopState = () => {
      const route = getRouteFromPathname(window.location.pathname);
      setActiveView(route);
    };

    const initialRoute = getRouteFromPathname(window.location.pathname);
    if (initialRoute !== 'home') {
      const targetPath = getPathnameFromView(initialRoute);
      if (window.location.pathname !== targetPath) {
        window.history.replaceState({ view: initialRoute }, '', targetPath);
      }
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title & meta tags per tool view
  useEffect(() => {
    if (activeView === 'home') {
      document.title = 'QuickForma | Free Client-Side Utility Tools & Business Calculators';
    } else if (activeView === 'business') {
      document.title = 'Free Business Utilities & Financial Calculators | QuickForma';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Free client-side tools for businesses, freelancers, and e-commerce operators to calculate ROI, margins, taxes, generate contracts, and manage operations.');
      }
    } else if (activeView === 'students') {
      document.title = 'Free Student Tools & Academic Calculators | QuickForma';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Free tools for students to calculate grades, solve math and science problems, analyze statistics, plan study time, and handle everyday academic work.');
      }
    } else if (activeView === 'developers' || activeView === 'developer') {
      document.title = 'Free Developer Tools & Code Utilities | QuickForma';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Free client-side developer utilities for formatting JSON, testing regex, encoding hashes, decoding JWTs, calculating subnets, and converting data with 100% browser privacy.');
      }
    } else if (activeView === 'mind') {
      document.title = 'QuickForma Mind — Mental Math Challenge';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Train your mental math speed and accuracy with QuickForma Mind 60-second arithmetic sprints.');
      }
    } else if (activeView.startsWith('blog:')) {
      // Document title and meta handled inside BlogPostPage / ArticlePage components
    } else if (LEGAL_PAGES.includes(activeView)) {
      const pageTitle = activeView.charAt(0).toUpperCase() + activeView.slice(1);
      document.title = `${pageTitle} | QuickForma`;
    } else {
      const tool = TOOLS_CATALOG.find(t => t.id === activeView);
      if (tool) {
        document.title = tool.metaTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', tool.metaDescription);
      }
    }
  }, [activeView]);

  const activeTool = TOOLS_CATALOG.find(t => t.id === activeView);

  const handleSelectView = (view: string) => {
    setActiveView(view);
    const targetPath = getPathnameFromView(view);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveViewComponent = () => {
    switch (activeView) {
      // Hub & Legal Pages
      case 'business': return <BusinessPage tools={TOOLS_CATALOG} onSelectTool={handleSelectView} />;
      case 'students': return <StudentsPage tools={TOOLS_CATALOG} onSelectTool={handleSelectView} />;
      case 'developers':
      case 'developer': return <DeveloperPage tools={TOOLS_CATALOG} onSelectTool={handleSelectView} />;
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <TermsOfService />;
      case 'about': return <AboutUs />;
      case 'contact': return <ContactUs />;

      // 50 Dedicated Tool Components
      case 'invoice-generator': return <InvoiceGenerator />;
      case 'qr-code-generator': return <QRCodeGenerator />;
      case 'word-counter': return <WordCounter />;
      case 'password-generator': return <PasswordGenerator />;
      case 'unit-converter': return <UnitConverter />;
      case 'freelance-hourly-rate-calculator': return <FreelanceHourlyRateCalculator />;
      case 'break-even-calculator': return <BreakEvenPointCalculator />;
      case 'payroll-tax-estimator': return <PayrollTaxEstimator />;
      case 'roi-calculator': return <RoiCalculator />;
      case 'mortgage-loan-calculator': return <MortgageLoanCalculator />;
      case 'markup-margin-calculator': return <MarkupMarginCalculator />;
      case 'salary-hourly-converter': return <SalaryHourlyConverter />;
      case 'sales-tax-calculator': return <SalesTaxCalculator />;
      case 'discount-calculator': return <DiscountCalculator />;
      case 'compound-interest-calculator': return <CompoundInterestCalculator />;
      case 'loan-payoff-calculator': return <LoanPayoffCalculator />;
      case 'cpm-ad-cost-calculator': return <CpmAdCostCalculator />;
      case 'customer-ltv-calculator': return <CustomerLtvCalculator />;
      case 'receipt-generator': return <ReceiptGenerator />;
      case 'nda-template-generator': return <NdaTemplateGenerator />;
      case 'bill-of-sale-generator': return <BillOfSaleGenerator />;
      case 'freelance-contract-generator': return <FreelanceContractGenerator />;
      case 'meeting-minutes-generator': return <MeetingMinutesGenerator />;
      case 'rent-receipt-generator': return <RentReceiptGenerator />;
      case 'promissory-note-generator': return <PromissoryNoteGenerator />;
      case 'bill-of-lading-generator': return <BillOfLadingGenerator />;
      case 'currency-converter': return <CurrencyConverter />;
      case 'date-difference-calculator': return <DateDifferenceCalculator />;
      case 'time-zone-converter': return <TimeZoneConverter />;
      case 'pdf-page-counter': return <PdfPageCounter />;
      case 'aspect-ratio-calculator': return <AspectCalculator />;
      case 'color-picker-converter': return <ColorPickerConverter />;
      case 'image-resizer-converter': return <ImageResizerConverter />;
      case 'json-formatter-validator': return <JsonFormatterValidator />;
      case 'base64-encoder-decoder': return <Base64EncoderDecoder />;
      case 'hash-generator': return <HashGenerator />;
      case 'url-encoder-decoder': return <UrlEncoderDecoder />;
      case 'css-glassmorphism-generator': return <CssGlassmorphismGenerator />;
      case 'barcode-generator': return <BarcodeGenerator />;
      case 'case-converter': return <CaseConverter />;
      case 'text-diff-checker': return <TextDiffChecker />;
      case 'lorem-ipsum-generator': return <LoremIpsumGenerator />;
      case 'business-name-generator': return <BusinessNameGenerator />;
      case 'slug-generator': return <SlugGenerator />;
      case 'pomodoro-timer': return <PomodoroTimer />;
      case 'gpa-calculator': return <GpaCalculator />;
      case 'final-grade-calculator': return <FinalGradeCalculator />;
      case 'percentage-calculator': return <PercentageCalculator />;
      case 'fraction-calculator': return <FractionCalculator />;

      // 10 New Strategic Tools
      case 'uuid-generator': return <UuidGenerator />;
      case 'jwt-decoder': return <JwtDecoder />;
      case 'shopify-fee-calculator': return <ShopifyFeeCalculator />;
      case 'stripe-fee-calculator': return <StripeFeeCalculator />;
      case 'eoq-calculator': return <EoqCalculator />;
      case 'reorder-point-calculator': return <ReorderPointCalculator />;
      case 'oee-calculator': return <OeeCalculator />;
      case 'pto-calculator': return <PtoCalculator />;
      case 'utm-builder': return <UtmBuilder />;

      // 4 New Strategic Pillar Tools
      case 'paypal-fee-calculator': return <PaypalFeeCalculator />;
      case 'etsy-fee-calculator': return <EtsyFeeCalculator />;
      case 'volumetric-weight-calculator': return <VolumetricWeightCalculator />;
      case 'depreciation-calculator': return <DepreciationCalculator />;

            case 'cumulative-gpa-calculator': return <CumulativeGpaCalculator />;
      case 'weighted-grade-calculator': return <WeightedGradeCalculator />;
      case 'target-gpa-planner-calculator': return <TargetGpaPlannerCalculator />;
      case 'attendance-calculator': return <AttendanceCalculator />;
      case 'marks-percentage-converter': return <MarksPercentageConverter />;
      case 'ratio-proportion-calculator': return <RatioProportionCalculator />;
      case 'average-calculator': return <AverageCalculator />;
      case 'scientific-notation-calculator': return <ScientificNotationCalculator />;
      case 'exponent-logarithm-calculator': return <ExponentLogarithmCalculator />;
      case 'linear-equation-calculator': return <LinearEquationCalculator />;
      case 'quadratic-formula-calculator': return <QuadraticFormulaCalculator />;
      case 'distance-midpoint-calculator': return <DistanceMidpointCalculator />;
      case 'sequence-series-calculator': return <SequenceSeriesCalculator />;
      case 'pythagorean-theorem-calculator': return <PythagoreanTheoremCalculator />;
      case 'triangle-area-solver': return <TriangleAreaSolver />;
      case 'circle-calculator': return <CircleCalculator />;
      case 'geometry-area-volume-calculator': return <GeometryAreaVolumeCalculator />;
      case 'trigonometry-calculator': return <TrigonometryCalculator />;
      case 'law-of-sines-cosines-calculator': return <LawOfSinesCosinesCalculator />;
      case 'derivative-limit-calculator': return <DerivativeLimitCalculator />;
      case 'descriptive-statistics-calculator': return <DescriptiveStatisticsCalculator />;
      case 'z-score-calculator': return <ZScoreCalculator />;
      case 'probability-calculator': return <ProbabilityCalculator />;
      case 'permutation-combination-calculator': return <PermutationCombinationCalculator />;
      case 'probability-distributions-calculator': return <ProbabilityDistributionsCalculator />;
      case 'confidence-interval-calculator': return <ConfidenceIntervalCalculator />;
      case 'hypothesis-test-calculator': return <HypothesisTestCalculator />;
      case 'molar-mass-calculator': return <MolarMassCalculator />;
      case 'moles-molarity-calculator': return <MolesMolarityCalculator />;
      case 'dilution-calculator': return <DilutionCalculator />;
      case 'ph-poh-calculator': return <PhPohCalculator />;
      case 'stoichiometry-percent-yield-calculator': return <StoichiometryPercentYieldCalculator />;
      case 'gas-laws-calculator': return <GasLawsCalculator />;
      case 'significant-figures-calculator': return <SignificantFiguresCalculator />;
      case 'kinematics-motion-calculator': return <KinematicsMotionCalculator />;
      case 'force-friction-momentum-calculator': return <ForceFrictionMomentumCalculator />;
      case 'work-energy-power-calculator': return <WorkEnergyPowerCalculator />;
      case 'ohms-law-electrical-calculator': return <OhmsLawElectricalCalculator />;
      case 'wave-frequency-speed-calculator': return <WaveFrequencySpeedCalculator />;
      case 'reading-presentation-time-calculator': return <ReadingPresentationTimeCalculator />;
      case 'essay-page-count-calculator': return <EssayPageCountCalculator />;
      case 'academic-readability-analyzer': return <AcademicReadabilityAnalyzer />;
      case 'citation-formatter': return <CitationFormatter />;
      case 'study-schedule-time-calculator': return <StudyScheduleTimeCalculator />;
      case 'exam-assignment-countdown': return <ExamAssignmentCountdown />;
      case 'student-budget-planner': return <StudentBudgetPlanner />;
      case 'cost-per-credit-hour-calculator': return <CostPerCreditHourCalculator />;
      case 'student-loan-payoff-calculator': return <StudentLoanPayoffCalculator />;
      case 'roommate-rent-split-calculator': return <RoommateRentSplitCalculator />;
      case 'gpa-scale-converter': return <GpaScaleConverter />;
      case 'marks-to-gpa-converter': return <MarksToGpaConverter />;

      // Batch 1: 50 Production Tools
      case 'cash-flow-runway-calculator': return <CashFlowRunwayCalculator />;
      case 'ebitda-calculator': return <EbitdaCalculator />;
      case 'working-capital-calculator': return <WorkingCapitalCalculator />;
      case 'npv-irr-calculator': return <NpvIrrCalculator />;
      case 'cash-conversion-cycle-calculator': return <CashConversionCycleCalculator />;
      case 'cost-of-goods-sold-calculator': return <CostOfGoodsSoldCalculator />;
      case 'saas-net-retention-rate-calculator': return <SaasNetRetentionRateCalculator />;
      case 'purchase-order-generator': return <PurchaseOrderGenerator />;
      case 'quote-generator': return <QuoteGenerator />;
      case 'packing-slip-generator': return <PackingSlipGenerator />;
      case 'regex-tester': return <RegexTester />;
      case 'subnet-calculator': return <SubnetCalculator />;
      case 'meta-tag-generator': return <MetaTagGenerator />;
      case 'schema-markup-generator': return <SchemaMarkupGenerator />;
      case 'google-serp-preview-tool': return <GoogleSerpPreviewTool />;
      case 'high-school-gpa-calculator': return <HighSchoolGpaCalculator />;
      case 'college-gpa-calculator': return <CollegeGpaCalculator />;
      case 'semester-grade-calculator': return <SemesterGradeCalculator />;
      case 'prime-factorization-calculator': return <PrimeFactorizationCalculator />;
      case 'base-converter': return <BaseConverter />;
      case 'linear-regression-calculator': return <LinearRegressionCalculator />;
      case 'standard-deviation-calculator': return <StandardDeviationCalculator />;
      case 'sample-size-calculator': return <SampleSizeCalculator />;
      case 'density-mass-volume-calculator': return <DensityMassVolumeCalculator />;
      case 'projectile-motion-calculator': return <ProjectileMotionCalculator />;
      case 'ebay-final-value-fee-calculator': return <EbayFinalValueFeeCalculator />;
      case 'tiktok-shop-fee-calculator': return <TiktokShopFeeCalculator />;
      case 'cost-per-acquisition-cpa-calculator': return <CostPerAcquisitionCpaCalculator />;
      case 'ecommerce-conversion-rate-calculator': return <EcommerceConversionRateCalculator />;
      case 'ecommerce-net-profit-margin-calculator': return <EcommerceNetProfitMarginCalculator />;
      case 'safety-stock-calculator': return <SafetyStockCalculator />;
      case 'machine-downtime-cost-calculator': return <MachineDowntimeCostCalculator />;
      case 'capacity-utilization-calculator': return <CapacityUtilizationCalculator />;
      case 'takt-time-calculator': return <TaktTimeCalculator />;
      case 'cap-rate-calculator': return <CapRateCalculator />;
      case 'cash-on-cash-return-calculator': return <CashOnCashReturnCalculator />;
      case 'rental-property-roi-calculator': return <RentalPropertyRoiCalculator />;
      case 'amortization-schedule-extra-payments': return <AmortizationScheduleExtraPayments />;
      case 'short-term-rental-airbnb-calculator': return <ShortTermRentalAirbnbCalculator />;
      case 'customer-acquisition-cost-cac': return <CustomerAcquisitionCostCac />;
      case 'return-on-ad-spend-roas': return <ReturnOnAdSpendRoas />;
      case 'click-through-rate-ctr-calculator': return <ClickThroughRateCtrCalculator />;
      case 'ab-test-significance-calculator': return <AbTestSignificanceCalculator />;
      case 'employee-turnover-cost-calculator': return <EmployeeTurnoverCostCalculator />;
      case 'total-compensation-calculator': return <TotalCompensationCalculator />;
      case 'employee-cost-to-employer-calculator': return <EmployeeCostToEmployerCalculator />;
      case 'contractor-vs-employee-cost-calculator': return <ContractorVsEmployeeCostCalculator />;
      case 'emergency-fund-calculator': return <EmergencyFundCalculator />;
      case 'debt-snowball-avalanche-calculator': return <DebtSnowballAvalancheCalculator />;
      case 'net-worth-calculator': return <NetWorthCalculator />;
      case 'contribution-margin-calculator': return <ContributionMarginCalculator />;
      case 'bibliography-generator': return <BibliographyGenerator />;
      case 'amazon-fba-calculator': return <AmazonFbaCalculator />;
      case 'take-home-pay-paycheck-calculator': return <TakeHomePayCalculator />;
      case 'time-card-hours-calculator': return <TimeCardHoursCalculator />;
      case 'budget-50-30-20-calculator': return <Budget503020Calculator />;
      case 'car-loan-payment-calculator': return <CarLoanPaymentCalculator />;
      case 'retirement-nest-egg-calculator': return <RetirementNestEggCalculator />;
      case 'personal-cash-flow-savings-rate': return <PersonalCashFlowSavingsRateCalculator />;
      case 'debt-to-income-dti-ratio-calculator': return <DebtToIncomeCalculator />;
      case 'dscr-calculator': return <DscrCalculator />;
      case 'cac-payback-calculator': return <CacPaybackCalculator />;
      case 'wacc-calculator': return <WaccCalculator />;
      case 'free-cash-flow-calculator': return <FreeCashFlowCalculator />;
      case 'inventory-holding-cost-calculator': return <InventoryHoldingCostCalculator />;
      case 'payback-period-calculator': return <PaybackPeriodCalculator />;
      case 'saas-magic-number-calculator': return <SaasMagicNumberCalculator />;
      case 'churn-rate-impact-calculator': return <ChurnRateImpactCalculator />;
      case 'sba-7a-loan-calculator': return <Sba7aLoanCalculator />;
      case 'saas-rule-of-40-calculator': return <SaasRuleOf40Calculator />;
      case 'accounts-receivable-turnover-calculator': return <AccountsReceivableTurnoverCalculator />;
      case 'accounts-payable-turnover-calculator': return <AccountsPayableTurnoverCalculator />;
      case 'credit-card-processing-savings-calculator': return <CreditCardProcessingSavingsCalculator />;
      case 'merchant-cash-advance-calculator': return <MerchantCashAdvanceCalculator />;
      case 'startup-seed-runway-planner': return <StartupSeedRunwayPlanner />;
      case 'sales-commission-calculator': return <SalesCommissionCalculator />;
      case 'overhead-rate-calculator': return <OverheadRateCalculator />;
      case 'quick-ratio-acid-test-calculator': return <QuickRatioCalculator />;
      case 'retained-earnings-calculator': return <RetainedEarningsCalculator />;
      case 'altman-z-score-calculator': return <AltmanZScoreCalculator />;
      case 'cost-benefit-analysis-calculator': return <CostBenefitAnalysisCalculator />;
      case 'gross-margin-standalone-calculator': return <GrossMarginStandaloneCalculator />;
      case 'credit-note-generator': return <CreditNoteGenerator />;
      case 'contractor-agreement-generator': return <ContractorAgreementGenerator />;
      case 'offer-letter-generator': return <OfferLetterGenerator />;
      case 'expense-report-generator': return <ExpenseReportGenerator />;
      case 'consulting-proposal-generator': return <ConsultingProposalGenerator />;
      case 'bill-of-materials-generator': return <BillOfMaterialsGenerator />;
      case 'sql-formatter': return <SqlFormatter />;
      case 'xml-json-converter': return <XmlJsonConverter />;
      case 'yaml-json-converter': return <YamlJsonConverter />;
      case 'cron-expression-generator': return <CronExpressionGenerator />;
      case 'unix-timestamp-converter': return <UnixTimestampConverter />;
      case 'markdown-to-html-converter': return <MarkdownToHtmlConverter />;
      case 'chmod-calculator': return <ChmodCalculator />;
      case 'keyword-density-analyzer': return <KeywordDensityAnalyzer />;
      case 'robots-txt-generator': return <RobotsTxtGenerator />;
      case 'headline-analyzer': return <HeadlineAnalyzer />;
      case 'character-count-limit-tool': return <CharacterCountLimitTool />;
      case 'duplicate-line-remover': return <DuplicateLineRemover />;
case 'markdown-table-generator': return <MarkdownTableGenerator />;
      case 'email-subject-line-tester': return <EmailSubjectLineTester />;
      case 'text-cleaner-sanitizer': return <TextCleanerSanitizer />;
      case 'camel-snake-kebab-converter': return <CamelSnakeKebabConverter />;
      case 'reading-ease-score-calculator': return <ReadingEaseScoreCalculator />;
      case 'meta-description-length-tool': return <MetaDescriptionLengthTool />;
      case 'quarter-to-semester-gpa-calculator': return <QuarterToSemesterGpaCalculator />;
      case 'gpa-boost-calculator': return <GpaBoostCalculator />;
      case 'grade-point-average-scale-converter': return <GradePointAverageScaleConverter />;
      case 'honors-ap-ib-gpa-calculator': return <HonorsApIbGpaCalculator />;
      case 'test-score-percentage-calculator': return <TestScorePercentageCalculator />;
      case 'curved-grade-calculator': return <CurvedGradeCalculator />;
      case 'assignment-weight-calculator': return <AssignmentWeightCalculator />;
      case 'study-hours-per-credit-calculator': return <StudyHoursPerCreditCalculator />;
      case 'sat-act-concordance-calculator': return <SatActConcordanceCalculator />;
      case 'transfer-credit-gpa-calculator': return <TransferCreditGpaCalculator />;
      case 'integral-calculus-calculator': return <IntegralCalculusCalculator />;
      case 'matrix-algebra-calculator': return <MatrixAlgebraCalculator />;
      case 'vector-math-calculator': return <VectorMathCalculator />;
      case 'polynomial-roots-calculator': return <PolynomialRootsCalculator />;
      case 'system-of-equations-solver': return <SystemOfEquationsSolver />;
      case 'slope-intercept-calculator': return <SlopeInterceptCalculator />;
      case 'percentage-change-standalone-calculator': return <PercentageChangeStandaloneCalculator />;
      case 'chi-square-calculator': return <ChiSquareCalculator />;
      case 'anova-calculator': return <AnovaCalculator />;
      case 'variance-calculator': return <VarianceCalculator />;
      case 't-test-calculator': return <TTestCalculator />;
      case 'p-value-calculator': return <PValueCalculator />;
      case 'correlation-coefficient-calculator': return <CorrelationCoefficientCalculator />;
      case 'interquartile-range-calculator': return <InterquartileRangeCalculator />;
      case 'half-life-calculator': return <HalfLifeCalculator />;
      case 'empirical-formula-calculator': return <EmpiricalFormulaCalculator />;
      case 'thermodynamics-gibbs-calculator': return <ThermodynamicsGibbsCalculator />;
      case 'solution-concentration-converter': return <SolutionConcentrationConverter />;
      case 'gravitational-force-calculator': return <GravitationalForceCalculator />;
      case 'centripetal-force-calculator': return <CentripetalForceCalculator />;
      case 'heat-transfer-calorimetry-calculator': return <HeatTransferCalorimetryCalculator />;
      case 'spaced-repetition-scheduler': return <SpacedRepetitionScheduler />;
      case 'plagiarism-similarity-score-tool': return <PlagiarismSimilarityScoreTool />;
      case 'homework-time-estimator': return <HomeworkTimeEstimator />;
      case 'typing-speed-wpm-calculator': return <TypingSpeedWpmCalculator />;
      case 'walmart-marketplace-fee-calculator': return <WalmartMarketplaceFeeCalculator />;
      case 'google-shopping-roas-calculator': return <GoogleShoppingRoasCalculator />;
      case 'product-bundle-pricing-calculator': return <ProductBundlePricingCalculator />;
      case 'inventory-turnover-ratio-calculator': return <InventoryTurnoverRatioCalculator />;
      case 'free-shipping-threshold-calculator': return <FreeShippingThresholdCalculator />;
      case 'dropshipping-profit-margin-calculator': return <DropshippingProfitMarginCalculator />;
      case 'abandoned-cart-recovery-roi-calculator': return <AbandonedCartRecoveryRoiCalculator />;
      case 'sku-profitability-analyzer': return <SkuProfitabilityAnalyzer />;
      case 'fulfillment-cost-per-order-calculator': return <FulfillmentCostPerOrderCalculator />;

      case 'cap-table-calculator': return <CapTableCalculator />;
      case 'business-valuation-calculator': return <BusinessValuationCalculator />;
      case 'lease-vs-buy-calculator': return <LeaseVsBuyCalculator />;
      case 'invoice-factoring-calculator': return <InvoiceFactoringCalculator />;
      case 'operating-leverage-calculator': return <OperatingLeverageCalculator />;
      case 'net-promoter-score-roi-calculator': return <NetPromoterScoreRoiCalculator />;
      case 'equipment-lease-calculator': return <EquipmentLeaseCalculator />;
      case 'franchise-fee-roi-calculator': return <FranchiseFeeRoiCalculator />;
      case 'deferred-revenue-calculator': return <DeferredRevenueCalculator />;
      case 'bad-debt-allowance-calculator': return <BadDebtAllowanceCalculator />;
      case 'revenue-per-employee-calculator': return <RevenuePerEmployeeCalculator />;
      case 'asset-turnover-ratio-calculator': return <AssetTurnoverRatioCalculator />;
      case 'solvency-ratio-calculator': return <SolvencyRatioCalculator />;
      case 'dupont-analysis-calculator': return <DupontAnalysisCalculator />;
      case 'dividend-yield-payout-calculator': return <DividendYieldPayoutCalculator />;
      case 'economic-value-added-calculator': return <EconomicValueAddedCalculator />;
      case 'capital-budgeting-payback-calculator': return <CapitalBudgetingPaybackCalculator />;
      case 'marginal-cost-revenue-calculator': return <MarginalCostRevenueCalculator />;
      case 'operating-cash-flow-to-sales-calculator': return <OperatingCashFlowToSalesCalculator />;
      case 'rule-of-thumb-valuation-calculator': return <RuleOfThumbValuationCalculator />;
      case 'operating-expense-ratio-calculator': return <OperatingExpenseRatioCalculator />;
      case 'roce-calculator': return <RoceCalculator />;
      case 'statement-of-work-generator': return <StatementOfWorkGenerator />;
      case 'debit-note-generator': return <DebitNoteGenerator />;
      case 'service-level-agreement-generator': return <ServiceLevelAgreementGenerator />;
      case 'termination-letter-generator': return <TerminationLetterGenerator />;
      case 'subcontractor-agreement-generator': return <SubcontractorAgreementGenerator />;
      case 'commercial-lease-summary-generator': return <CommercialLeaseSummaryGenerator />;
      case 'certificate-of-completion-generator': return <CertificateOfCompletionGenerator />;
      case 'privacy-policy-template-generator': return <PrivacyPolicyTemplateGenerator />;
      case 'terms-of-service-generator': return <TermsOfServiceGenerator />;
      case 'incident-report-generator': return <IncidentReportGenerator />;
      case 'memorandum-of-understanding-generator': return <MemorandumOfUnderstandingGenerator />;
      case 'html-entity-encoder': return <HtmlEntityEncoder />;
      case 'hmac-generator': return <HmacGenerator />;
      case 'css-minifier-unminifier': return <CssMinifierUnminifier />;
      case 'js-beautifier-minifier': return <JsBeautifierMinifier />;
      case 'dns-lookup-tool': return <DnsLookupTool />;
      case 'ip-range-calculator': return <IpRangeCalculator />;
      case 'svg-path-formatter': return <SvgPathFormatter />;
      case 'http-header-generator': return <HttpHeaderGenerator />;
      case 'sitemap-xml-builder': return <SitemapXmlBuilder />;
      case 'text-to-speech-estimator': return <TextToSpeechEstimator />;
      case 'anchor-text-ratio-planner': return <AnchorTextRatioPlanner />;
      case 'canonical-tag-generator': return <CanonicalTagGenerator />;
      case 'paragraph-counter-analyzer': return <ParagraphCounterAnalyzer />;
      case 'slug-to-title-converter': return <SlugToTitleConverter />;
      case 'word-frequency-counter': return <WordFrequencyCounter />;
      case 'lorem-markdown-generator': return <LoremMarkdownGenerator />;
      case 'alt-text-accessibility-checker': return <AltTextAccessibilityChecker />;

      case 'law-school-gpa-calculator': return <LawSchoolGpaCalculator />;
      case 'medical-school-gpa-calculator': return <MedicalSchoolGpaCalculator />;
      case 'ncaa-core-gpa-calculator': return <NcaaCoreGpaCalculator />;
      case 'class-rank-percentile-calculator': return <ClassRankPercentileCalculator />;
      case 'pass-fail-gpa-impact-calculator': return <PassFailGpaImpactCalculator />;
      case 'graduate-school-gpa-calculator': return <GraduateSchoolGpaCalculator />;
      case 'academic-standing-calculator': return <AcademicStandingCalculator />;
      case 'high-school-credit-calculator': return <HighSchoolCreditCalculator />;
      case 'degree-completion-calculator': return <DegreeCompletionCalculator />;
      case 'prerequisite-course-planner': return <PrerequisiteCoursePlanner />;
      case 'ged-score-calculator': return <GedScoreCalculator />;
      case 'gre-score-percentile-calculator': return <GreScorePercentileCalculator />;
      case 'gmat-score-calculator': return <GmatScoreCalculator />;
      case 'toefl-ielts-score-converter': return <ToeflIeltsScoreConverter />;
      case 'clep-credit-calculator': return <ClepCreditCalculator />;
      case 'academic-forgiveness-gpa-calculator': return <AcademicForgivenessGpaCalculator />;
      case 'stem-major-gpa-calculator': return <StemMajorGpaCalculator />;
      case 'business-major-gpa-calculator': return <BusinessMajorGpaCalculator />;
      case 'nursing-school-gpa-calculator': return <NursingSchoolGpaCalculator />;
      case 'complex-numbers-calculator': return <ComplexNumbersCalculator />;
      case 'factorial-calculator': return <FactorialCalculator />;
      case 'logarithm-change-of-base-tool': return <LogarithmChangeOfBaseTool />;
      case 'ellipse-hyperbola-calculator': return <EllipseHyperbolaCalculator />;
      case 'partial-fraction-calculator': return <PartialFractionCalculator />;
      case 'poisson-distribution-calculator': return <PoissonDistributionCalculator />;
      case 'exponential-distribution-calculator': return <ExponentialDistributionCalculator />;
      case 'bayes-theorem-calculator': return <BayesTheoremCalculator />;
      case 'buffer-solution-calculator': return <BufferSolutionCalculator />;
      case 'boiling-point-elevation-calculator': return <BoilingPointElevationCalculator />;
      case 'activation-energy-calculator': return <ActivationEnergyCalculator />;
      case 'combustion-analysis-calculator': return <CombustionAnalysisCalculator />;
      case 'oxidation-number-calculator': return <OxidationNumberCalculator />;
      case 'equilibrium-constant-calculator': return <EquilibriumConstantCalculator />;
      case 'electrolysis-faraday-calculator': return <ElectrolysisFaradayCalculator />;
      case 'torque-rotational-motion-calculator': return <TorqueRotationalMotionCalculator />;
      case 'pendulum-harmonic-motion-calculator': return <PendulumHarmonicMotionCalculator />;
      case 'doppler-effect-calculator': return <DopplerEffectCalculator />;
      case 'refraction-snells-law-calculator': return <RefractionSnellsLawCalculator />;
      case 'capacitance-rc-circuit-calculator': return <CapacitanceRcCircuitCalculator />;
      case 'transformer-voltage-calculator': return <TransformerVoltageCalculator />;
      case 'fluid-buoyancy-archimedes-calculator': return <FluidBuoyancyArchimedesCalculator />;
      case 'bernoullis-equation-calculator': return <BernoullisEquationCalculator />;
      case 'special-relativity-time-dilation-calculator': return <SpecialRelativityTimeDilationCalculator />;
      case 'cornell-notes-template-generator': return <CornellNotesTemplateGenerator />;
      case 'thesis-statement-generator': return <ThesisStatementGenerator />;
      case 'study-group-expense-splitter': return <StudyGroupExpenseSplitter />;
      case 'exam-prep-score-predictor': return <ExamPrepScorePredictor />;
      case 'mercari-seller-fee-calculator': return <MercariSellerFeeCalculator />;
      case 'poshmark-fee-calculator': return <PoshmarkFeeCalculator />;
      case 'return-rate-profit-impact-calculator': return <ReturnRateProfitImpactCalculator />;

      case 'roas-calculator': return <RoasCalculator />;
      case 'inventory-turns-days-sales-calculator': return <InventoryTurnsDaysSalesCalculator />;
      case 'break-even-revenue-calculator': return <BreakEvenRevenueCalculator />;
      case 'middle-school-grade-calculator': return <MiddleSchoolGradeCalculator />;
      case 'shipping-container-load-calculator': return <ShippingContainerLoadCalculator />;
      case 'minimum-advertised-price-map-calculator': return <MinimumAdvertisedPriceMapCalculator />;
      case 'chargeback-fee-loss-calculator': return <ChargebackFeeLossCalculator />;
      case 'klarna-afterpay-fee-calculator': return <KlarnaAfterpayFeeCalculator />;
      case 'square-pos-processing-fee-calculator': return <SquarePosProcessingFeeCalculator />;
      case 'kickstarter-indiegogo-fee-calculator': return <KickstarterIndiegogoFeeCalculator />;
      case 'amazon-storage-fee-calculator': return <AmazonStorageFeeCalculator />;
      case 'cross-border-currency-conversion-fee': return <CrossBorderCurrencyConversionFee />;
      case 'product-packaging-dimensional-calculator': return <ProductPackagingDimensionalCalculator />;
      case 'print-on-demand-pod-margin-calculator': return <PrintOnDemandPodMarginCalculator />;
      case 'inventory-shrinkage-loss-calculator': return <InventoryShrinkageLossCalculator />;
      case 'affiliate-commission-payout-calculator': return <AffiliateCommissionPayoutCalculator />;
      case 'retail-markdown-clearance-calculator': return <RetailMarkdownClearanceCalculator />;
      case 'warehouse-storage-cbm-calculator': return <WarehouseStorageCbmCalculator />;
      case 'supplier-volume-discount-break-even': return <SupplierVolumeDiscountBreakEven />;
      case 're-stocking-fee-calculator': return <ReStockingFeeCalculator />;
      case 'ecommerce-customer-retention-revenue': return <EcommerceCustomerRetentionRevenue />;
      case 'omnichannel-channel-margin-compare': return <OmnichannelChannelMarginCompare />;
      case 'amazon-repricing-margin-calculator': return <AmazonRepricingMarginCalculator />;
      case 'ecommerce-refund-loss-recovery-calculator': return <EcommerceRefundLossRecoveryCalculator />;
      case 'order-cancellation-rate-calculator': return <OrderCancellationRateCalculator />;
      case 'multi-channel-inventory-allocation': return <MultiChannelInventoryAllocation />;
      case 'shopify-pos-fee-calculator': return <ShopifyPosFeeCalculator />;
      case 'etsy-listing-renewal-calculator': return <EtsyListingRenewalCalculator />;
      case 'woocommerce-profit-calculator': return <WoocommerceProfitCalculator />;
      case 'first-pass-yield-calculator': return <FirstPassYieldCalculator />;
      case 'cycle-time-calculator': return <CycleTimeCalculator />;
      case 'overall-labor-effectiveness-ole': return <OverallLaborEffectivenessOle />;
      case 'kanban-card-quantity-calculator': return <KanbanCardQuantityCalculator />;
      case 'bill-of-materials-cost-calculator': return <BillOfMaterialsCostCalculator />;
      case 'mean-time-between-failures-mtbf': return <MeanTimeBetweenFailuresMtbf />;
      case 'changeover-time-smed-calculator': return <ChangeoverTimeSmedCalculator />;
      case 'work-in-process-wip-calculator': return <WorkInProcessWipCalculator />;
      case 'scrap-rate-percentage-calculator': return <ScrapRatePercentageCalculator />;
      case 'manufacturing-overhead-allocation': return <ManufacturingOverheadAllocation />;
      case 'standard-cost-variance-calculator': return <StandardCostVarianceCalculator />;
      case 'tpm-planned-maintenance-scheduler': return <TpmPlannedMaintenanceScheduler />;
      case 'process-capability-cp-cpk-calculator': return <ProcessCapabilityCpCpkCalculator />;
      case 'defect-density-ppm-calculator': return <DefectDensityPpmCalculator />;
      case 'line-balancing-efficiency-calculator': return <LineBalancingEfficiencyCalculator />;
      case 'batch-size-economic-production': return <BatchSizeEconomicProduction />;
      case 'warehouse-bin-utilization-calculator': return <WarehouseBinUtilizationCalculator />;
      case 'order-picking-route-time-calculator': return <OrderPickingRouteTimeCalculator />;
      case 'supplier-on-time-in-full-otif': return <SupplierOnTimeInFullOtif />;
      case 'yield-loss-percentage-calculator': return <YieldLossPercentageCalculator />;
      case 'equipment-replacement-capital-expenditure': return <EquipmentReplacementCapitalExpenditure />;

      case 'labor-efficiency-variance-calculator': return <LaborEfficiencyVarianceCalculator />;
      case 'material-requirements-planning-mrp': return <MaterialRequirementsPlanningMrp />;
      case 'lean-5s-audit-score-calculator': return <Lean5sAuditScoreCalculator />;
      case 'value-stream-mapping-lead-time': return <ValueStreamMappingLeadTime />;
      case 'production-throughput-rate-calculator': return <ProductionThroughputRateCalculator />;
      case 'maintenance-labor-cost-calculator': return <MaintenanceLaborCostCalculator />;
      case 'spare-parts-inventory-safety-stock': return <SparePartsInventorySafetyStock />;
      case 'warehouse-forklift-fleet-calculator': return <WarehouseForkliftFleetCalculator />;
      case 'cross-docking-cost-savings-calculator': return <CrossDockingCostSavingsCalculator />;
      case 'packaging-tare-weight-calculator': return <PackagingTareWeightCalculator />;
      case 'factory-floor-space-productivity': return <FactoryFloorSpaceProductivity />;
      case 'energy-consumption-cost-calculator': return <EnergyConsumptionCostCalculator />;
      case 'manufacturing-labor-rate-burden': return <ManufacturingLaborRateBurden />;
      case 'manufacturing-takt-vs-cycle-time': return <ManufacturingTaktVsCycleTime />;
      case 'industrial-electricity-peak-demand-cost': return <IndustrialElectricityPeakDemandCost />;
      case 'work-center-capacity-planner': return <WorkCenterCapacityPlanner />;
      case 'changeover-downtime-cost-calculator': return <ChangeoverDowntimeCostCalculator />;
      case 'manufacturing-yield-variance-calculator': return <ManufacturingYieldVarianceCalculator />;
      case 'sqc-x-bar-r-control-chart': return <SqcXBarRControlChart />;
      case 'niosh-lifting-equation-calculator': return <NioshLiftingEquationCalculator />;
      case 'overdue-maintenance-risk-calculator': return <OverdueMaintenanceRiskCalculator />;
      case 'scrap-recycling-salvage-calculator': return <ScrapRecyclingSalvageCalculator />;
      case 'gross-rent-multiplier-grm': return <GrossRentMultiplierGrm />;
      case 'debt-service-coverage-ratio-real-estate': return <DebtServiceCoverageRatioRealEstate />;
      case 'real-estate-appreciation-calculator': return <RealEstateAppreciationCalculator />;
      case 'mortgage-refinance-break-even-calculator': return <MortgageRefinanceBreakEvenCalculator />;
      case 'house-flipping-profit-calculator': return <HouseFlippingProfitCalculator />;
      case 'brrrr-strategy-calculator': return <BrrrrStrategyCalculator />;
      case 'property-management-fee-calculator': return <PropertyManagementFeeCalculator />;
      case 'tenant-turnover-cost-calculator': return <TenantTurnoverCostCalculator />;
      case 'commercial-real-estate-lease-calculator': return <CommercialRealEstateLeaseCalculator />;
      case 'home-equity-line-of-credit-heloc': return <HomeEquityLineOfCreditHeloc />;
      case 'price-to-rent-ratio-calculator': return <PriceToRentRatioCalculator />;
      case 'real-estate-commission-split-calculator': return <RealEstateCommissionSplitCalculator />;
      case 'title-insurance-closing-cost-calculator': return <TitleInsuranceClosingCostCalculator />;
      case 'vacancy-rate-loss-calculator': return <VacancyRateLossCalculator />;
      case 'seller-net-sheet-calculator': return <SellerNetSheetCalculator />;
      case 'real-estate-equity-multiple-calculator': return <RealEstateEquityMultipleCalculator />;
      case 'property-cap-rate-sensitivity-calculator': return <PropertyCapRateSensitivityCalculator />;
      case 'vacation-rental-short-term-occupancy': return <VacationRentalShortTermOccupancy />;
      case 'real-estate-debt-yield-calculator': return <RealEstateDebtYieldCalculator />;
      case 'real-estate-irr-calculator': return <RealEstateIrrCalculator />;
      case 'cost-per-click-cpc-calculator': return <CostPerClickCpcCalculator />;
      case 'cost-per-lead-cpl-calculator': return <CostPerLeadCplCalculator />;
      case 'email-marketing-roi-calculator': return <EmailMarketingRoiCalculator />;
      case 'viral-k-factor-calculator': return <ViralKFactorCalculator />;
      case 'conversion-rate-optimization-cro': return <ConversionRateOptimizationCro />;
      case 'influencer-marketing-roi-calculator': return <InfluencerMarketingRoiCalculator />;
      case 'customer-churn-rate-calculator': return <CustomerChurnRateCalculator />;
      case 'net-promoter-score-nps-calculator': return <NetPromoterScoreNpsCalculator />;

      case 'marketing-qualified-lead-mql-conversion': return <MarketingQualifiedLeadMqlConversion />;
      case 'content-marketing-roi-calculator': return <ContentMarketingRoiCalculator />;
      case 'event-sponsorship-roi-calculator': return <EventSponsorshipRoiCalculator />;
      case 'social-media-engagement-rate-calculator': return <SocialMediaEngagementRateCalculator />;
      case 'pay-per-click-ppc-budget-calculator': return <PayPerClickPpcBudgetCalculator />;
      case 'customer-retention-rate-calculator': return <CustomerRetentionRateCalculator />;
      case 'affiliate-marketing-commission-calculator': return <AffiliateMarketingCommissionCalculator />;
      case 'app-store-conversion-rate-calculator': return <AppStoreConversionRateCalculator />;
      case 'cost-per-acquisition-target-calculator': return <CostPerAcquisitionTargetCalculator />;
      case 'podcast-ad-cpm-calculator': return <PodcastAdCpmCalculator />;
      case 'lead-scoring-threshold-calculator': return <LeadScoringThresholdCalculator />;
      case 'expansion-mrr-rate-calculator': return <ExpansionMrrRateCalculator />;
      case 'hourly-to-salary-calculator': return <HourlyToSalaryCalculator />;
      case 'fmla-leave-hours-calculator': return <FmlaLeaveHoursCalculator />;
      case 'severance-pay-calculator': return <SeverancePayCalculator />;
      case 'overtime-pay-calculator': return <OvertimePayCalculator />;
      case 'commission-payout-calculator': return <CommissionPayoutCalculator />;
      case 'full-time-equivalent-fte-calculator': return <FullTimeEquivalentFteCalculator />;
      case 'relocation-cost-calculator': return <RelocationCostCalculator />;
      case '401k-employer-match-calculator': return <FourZeroOneKEmployerMatchCalculator />;
      case 'pto-payout-upon-termination': return <PtoPayoutUponTermination />;
      case 'employee-absence-rate-calculator': return <EmployeeAbsenceRateCalculator />;
      case 'stock-option-exercise-calculator': return <StockOptionExerciseCalculator />;
      case 'annual-bonus-tax-withholding-calculator': return <AnnualBonusTaxWithholdingCalculator />;
      case 'shift-differential-pay-calculator': return <ShiftDifferentialPayCalculator />;
      case 'remote-work-stipend-calculator': return <RemoteWorkStipendCalculator />;
      case 'training-roi-calculator': return <TrainingRoiCalculator />;
      case 'glassdoor-salary-benchmark-calculator': return <GlassdoorSalaryBenchmarkCalculator />;
      case 'internal-pay-equity-calculator': return <InternalPayEquityCalculator />;
      case 'employee-retention-rate-calculator': return <EmployeeRetentionRateCalculator />;
      case 'roth-ira-growth-calculator': return <RothIraGrowthCalculator />;
      case 'simple-savings-goal-calculator': return <SimpleSavingsGoalCalculator />;
      case 'credit-card-minimum-payment-calculator': return <CreditCardMinimumPaymentCalculator />;
      case 'inflation-purchasing-power-calculator': return <InflationPurchasingPowerCalculator />;
      case 'fire-financial-independence-calculator': return <FireFinancialIndependenceCalculator />;
      case 'college-savings-529-calculator': return <CollegeSavingsFiveTwoNineCalculator />;
      case 'life-insurance-needs-calculator': return <LifeInsuranceNeedsCalculator />;
      case 'subscription-cost-analyzer': return <SubscriptionCostAnalyzer />;
      case 'hsa-triple-tax-advantage-calculator': return <HsaTripleTaxAdvantageCalculator />;
      case 'side-hustle-tax-calculator': return <SideHustleTaxCalculator />;
      case 'saas-quick-ratio-calculator': return <SaasQuickRatioCalculator />;
      case 'burn-multiple-calculator': return <BurnMultipleCalculator />;
      case 'gross-margin-return-on-investment-gmroi': return <GrossMarginReturnOnInvestmentGmroi />;
      case 'accounts-payable-turnover-ratio': return <AccountsPayableTurnoverRatio />;
      case 'accounts-receivable-aging-calculator': return <AccountsReceivableAgingCalculator />;
      case 'customer-acquisition-payback-months': return <CustomerAcquisitionPaybackMonths />;
      case 'compound-annual-growth-rate-cagr': return <CompoundAnnualGrowthRateCagr />;
      case 'working-capital-cycle-calculator': return <WorkingCapitalCycleCalculator />;

      default: {
        if (activeView === 'mind') {
          return <MindPage onSelectView={handleSelectView} />;
        }
        if (activeView === 'encyclopedia:index' || activeView === 'encyclopedia') {
          return <EncyclopediaHubPage onSelectView={handleSelectView} />;
        }
        if (activeView.startsWith('encyclopedia:category:')) {
          const catSlug = activeView.replace('encyclopedia:category:', '');
          return (
            <EncyclopediaCategoryPage
              slug={catSlug}
              onBack={() => handleSelectView('encyclopedia:index')}
              onSelectView={handleSelectView}
            />
          );
        }
        if (activeView.startsWith('encyclopedia:entry:')) {
          const entrySlug = activeView.replace('encyclopedia:entry:', '');
          return (
            <EncyclopediaEntryPage
              slug={entrySlug}
              onBack={() => handleSelectView('encyclopedia:index')}
              onSelectView={handleSelectView}
            />
          );
        }
        return <HomePage tools={TOOLS_CATALOG} onSelectTool={handleSelectView} />;
      }
    }
  };

  const filteredModalTools = TOOLS_CATALOG.filter(t =>
    t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.keywords.some(k => k.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  // Keyboard shortcut Cmd+K / Ctrl+K & Modal Keyboard Nav (Arrow keys, Enter, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
        setSelectedIndex(0);
      } else if (isSearchOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsSearchOpen(false);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev < filteredModalTools.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredModalTools.length - 1));
        } else if (e.key === 'Enter' && filteredModalTools[selectedIndex]) {
          e.preventDefault();
          handleSelectView(filteredModalTools[selectedIndex].id);
          setIsSearchOpen(false);
          setSearchFilter('');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, selectedIndex, filteredModalTools]);

  // Reset selected index when search filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchFilter]);

  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/studio')) {
    return <StudioPage />;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white antialiased">
        <Navbar
          activeView={activeView}
          onSelectView={handleSelectView}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb Navigation for Tool Pages */}
          {activeTool && (
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 no-print">
              <button
                onClick={() => handleSelectView('home')}
                className="hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 rounded"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> All Tools
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 font-bold">
                {activeTool.name}
              </span>
            </div>
          )}

          {activeTool ? (
            <div className="space-y-12">
              {renderActiveViewComponent()}
              {/* Ensure 100% of tool pages render the Authority Page Template v2.0 */}
              <ToolSeoWrapper
                seoData={TOOL_SEO_DATA_MAP[activeView]}
                toolName={activeTool.name}
                category={activeTool.category}
                toolId={activeTool.id}
                onSelectView={handleSelectView}
              />
            </div>
          ) : (
            renderActiveViewComponent()
          )}

        </main>
      </div>

      <Footer onSelectView={handleSelectView} />

      {/* Cmd+K Quick Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="bg-white border border-slate-200 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <Search className="w-4 h-4 text-indigo-600 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search tools (e.g. invoice, QR, password)..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder-slate-400 font-medium font-sans"
              />
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">ESC</span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg focus-visible:ring-2 focus-visible:ring-indigo-600"
                aria-label="Close Search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100">
              {filteredModalTools.length > 0 ? (
                filteredModalTools.map((t, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        handleSelectView(t.id);
                        setIsSearchOpen(false);
                        setSearchFilter('');
                      }}
                      className={`p-3 rounded-xl cursor-pointer flex items-center justify-between group transition-colors ${
                        isSelected ? 'bg-indigo-50/80 border border-indigo-100' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-bold ${isSelected ? 'text-indigo-600' : 'text-slate-900 group-hover:text-indigo-600'}`}>
                            {t.name}
                          </h4>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                            {t.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{t.description}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-all ${isSelected ? 'text-indigo-600 translate-x-1' : 'text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1'}`} />
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-500 space-y-1">
                  <p className="text-sm font-semibold">No tools found matching "{searchFilter}"</p>
                  <p className="text-xs text-slate-400">Try searching for "invoice", "qr", "tax", "calculator", or "converter"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
