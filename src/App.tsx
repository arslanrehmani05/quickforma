import React, { useState, useEffect } from 'react';
import { StudioPage } from './pages/StudioPage';
import { TOOLS_CATALOG } from './data/toolsCatalog';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { StudentsPage } from './pages/StudentsPage';

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

// Sanity CMS Page Components
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { BlogHubPage } from './pages/BlogHubPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { BusinessPage } from './pages/BusinessPage';

import { Search, X, ChevronRight, ArrowLeft } from 'lucide-react';

const LEGAL_PAGES = ['privacy', 'terms', 'about', 'contact'];

const getRouteFromPathname = (pathname: string): string => {
  const cleanPath = pathname.replace(/\/$/, '').trim();
  if (!cleanPath || cleanPath === '/') return 'home';

  if (cleanPath === '/ledger' || cleanPath === '/blog') {
    return 'blog:index';
  }
  if (cleanPath === '/students') {
    return 'students';
  }
  if (cleanPath === '/business') {
    return 'business';
  }
  if (cleanPath.startsWith('/tools/')) {
    return cleanPath.replace('/tools/', '');
  }
  if (cleanPath.startsWith('/ledger/')) {
    return `blog:${cleanPath.replace('/ledger/', '')}`;
  }
  if (cleanPath.startsWith('/blog/')) {
    return `blog:${cleanPath.replace('/blog/', '')}`;
  }
  if (cleanPath.startsWith('/category/')) {
    return `category:${cleanPath.replace('/category/', '')}`;
  }

  const slug = cleanPath.replace(/^\//, '');
  if (LEGAL_PAGES.includes(slug)) return slug;

  const foundTool = TOOLS_CATALOG.find(t => t.id === slug);
  if (foundTool) return foundTool.id;

  return 'home';
};

const getPathnameFromView = (view: string): string => {
  if (!view || view === 'home') return '/';
  if (view === 'students') return '/students';
  if (view === 'business') return '/business';
  if (LEGAL_PAGES.includes(view)) return `/${view}`;
  if (view === 'blog:index' || view === 'blog' || view === 'ledger') return '/ledger';
  if (view.startsWith('blog:')) return `/ledger/${view.replace('blog:', '')}`;
  if (view.startsWith('category:')) return `/category/${view.replace('category:', '')}`;
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

      default: {
        if (activeView === 'blog:index' || activeView === 'blog') {
          return <BlogHubPage onSelectView={handleSelectView} />;
        }
        if (activeView.startsWith('blog:')) {
          const articleSlug = activeView.replace('blog:', '');
          return <ArticlePage slug={articleSlug} onBack={() => handleSelectView('blog:index')} onSelectView={handleSelectView} />;
        }
        if (activeView.startsWith('category:')) {
          const categorySlug = activeView.replace('category:', '');
          return <CategoryPage slug={categorySlug} onBack={() => handleSelectView('blog:index')} />;
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
          {activeView !== 'home' && (
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 no-print">
              <button
                onClick={() => handleSelectView('home')}
                className="hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 rounded"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> All Tools
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 font-bold">
                {activeView.startsWith('blog:') ? 'Ledger' : (activeTool?.name || activeView)}
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
