import React, { useState, useEffect } from 'react';
import { TOOLS_CATALOG } from './data/toolsCatalog';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';

// Legal Pages
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { TermsOfService } from './components/legal/TermsOfService';
import { AboutUs } from './components/legal/AboutUs';
import { ContactUs } from './components/legal/ContactUs';

// Tools (1 Tool = 1 Dedicated Component File)
import { InvoiceGenerator } from './components/tools/InvoiceGenerator';
import { QRCodeGenerator } from './components/tools/QRCodeGenerator';
import { WordCounter } from './components/tools/WordCounter';
import { PasswordGenerator } from './components/tools/PasswordGenerator';
import { TipCalculator } from './components/tools/TipCalculator';
import { AgeCalculator } from './components/tools/AgeCalculator';
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
import { CoverLetterFormatter } from './components/tools/CoverLetterFormatter';
import { BusinessNameGenerator } from './components/tools/BusinessNameGenerator';
import { SloganGenerator } from './components/tools/SloganGenerator';
import { RandomNamePicker } from './components/tools/RandomNamePicker';
import { SlugGenerator } from './components/tools/SlugGenerator';
import { PomodoroTimer } from './components/tools/PomodoroTimer';

import { Search, X, ChevronRight, ArrowLeft } from 'lucide-react';

const LEGAL_PAGES = ['privacy', 'terms', 'about', 'contact'];

const getRouteFromPathname = (pathname: string): string => {
  const cleanPath = pathname.replace(/\/$/, '').trim();
  if (!cleanPath || cleanPath === '/') return 'home';

  if (cleanPath.startsWith('/tools/')) {
    return cleanPath.replace('/tools/', '');
  }

  const slug = cleanPath.replace(/^\//, '');
  if (LEGAL_PAGES.includes(slug)) return slug;

  const foundTool = TOOLS_CATALOG.find(t => t.id === slug);
  if (foundTool) return foundTool.id;

  return 'home';
};

export function App() {
  const [activeView, setActiveView] = useState<string>(() => getRouteFromPathname(window.location.pathname));
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Handle HTML5 History API (popstate) & initial path normalization
  useEffect(() => {
    const handlePopState = () => {
      const route = getRouteFromPathname(window.location.pathname);
      setActiveView(route);
    };

    const initialRoute = getRouteFromPathname(window.location.pathname);
    if (initialRoute !== 'home') {
      const targetPath = LEGAL_PAGES.includes(initialRoute) ? `/${initialRoute}` : `/tools/${initialRoute}`;
      window.history.replaceState({ view: initialRoute }, '', targetPath);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title & meta tags per tool view
  useEffect(() => {
    if (activeView === 'home') {
      document.title = 'QuickForma | Free Client-Side Utility Tools & Business Calculators';
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

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeTool = TOOLS_CATALOG.find(t => t.id === activeView);

  const handleSelectView = (view: string) => {
    setActiveView(view);
    let targetPath = '/';
    if (view !== 'home') {
      targetPath = LEGAL_PAGES.includes(view) ? `/${view}` : `/tools/${view}`;
    }
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveViewComponent = () => {
    switch (activeView) {
      // Legal Compliance Pages
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <TermsOfService />;
      case 'about': return <AboutUs />;
      case 'contact': return <ContactUs />;

      // 50 Dedicated Tool Components
      case 'invoice-generator': return <InvoiceGenerator />;
      case 'qr-code-generator': return <QRCodeGenerator />;
      case 'word-counter': return <WordCounter />;
      case 'password-generator': return <PasswordGenerator />;
      case 'tip-calculator': return <TipCalculator />;
      case 'age-calculator': return <AgeCalculator />;
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
      case 'cover-letter-formatter': return <CoverLetterFormatter />;
      case 'business-name-generator': return <BusinessNameGenerator />;
      case 'slogan-generator': return <SloganGenerator />;
      case 'random-name-picker': return <RandomNamePicker />;
      case 'slug-generator': return <SlugGenerator />;
      case 'pomodoro-timer': return <PomodoroTimer />;

      default:
        return <HomePage tools={TOOLS_CATALOG} onSelectTool={handleSelectView} />;
    }
  };

  const filteredModalTools = TOOLS_CATALOG.filter(t =>
    t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.keywords.some(k => k.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0a0d14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      <div>
        <Navbar
          activeView={activeView}
          onSelectView={handleSelectView}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb Navigation for Tool Pages */}
          {activeView !== 'home' && (
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 no-print">
              <button
                onClick={() => handleSelectView('home')}
                className="hover:text-slate-100 flex items-center gap-1 font-semibold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> All Tools
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-indigo-400 font-bold">{activeTool?.name || activeView}</span>
            </div>
          )}

          {renderActiveViewComponent()}
        </main>
      </div>

      <Footer onSelectView={handleSelectView} />

      {/* Cmd+K Quick Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-800 flex items-center gap-3">
              <Search className="w-4 h-4 text-indigo-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search tools (e.g. invoice, QR, password)..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder-slate-500 font-medium font-mono"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/50">
              {filteredModalTools.map(t => (
                <div
                  key={t.id}
                  onClick={() => {
                    handleSelectView(t.id);
                    setIsSearchOpen(false);
                    setSearchFilter('');
                  }}
                  className="p-3 hover:bg-slate-800/60 rounded-xl cursor-pointer flex items-center justify-between group transition-colors"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-400">{t.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{t.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
