import React, { useState, useEffect } from 'react';
import { ToolMetadata } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';

// Tools
import { InvoiceGenerator } from './components/tools/InvoiceGenerator';
import { QRCodeGenerator } from './components/tools/QRCodeGenerator';
import { WordCounter } from './components/tools/WordCounter';
import { PasswordGenerator } from './components/tools/PasswordGenerator';
import { TipCalculator } from './components/tools/TipCalculator';
import { AgeCalculator } from './components/tools/AgeCalculator';
import { UnitConverter } from './components/tools/UnitConverter';

import { Search, X, ChevronRight, ArrowLeft } from 'lucide-react';

const TOOLS_CATALOG: ToolMetadata[] = [
  {
    id: 'invoice-generator',
    name: 'Instant Invoice Generator',
    category: 'business',
    description: 'Create professional PDF invoices with logo, tax, discounts & itemized billing. 100% free.',
    iconName: 'FileText',
    badge: 'Popular',
    metaTitle: 'Free Instant Invoice Generator | QuickForma',
    metaDescription: 'Create and download professional PDF invoices online with tax, discounts, currency selection and logo support.'
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'utilities',
    description: 'Custom QR codes for URLs, text, Wi-Fi passwords & emails with high-res PNG download.',
    iconName: 'QrCode',
    badge: 'Flagship',
    metaTitle: 'Free High-Res QR Code Generator | QuickForma',
    metaDescription: 'Generate custom QR codes for websites, Wi-Fi networks, text, and emails. Instant PNG download.'
  },
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    category: 'text',
    description: 'Real-time text analyzer for word count, reading speed, keyword density & case conversion.',
    iconName: 'AlignLeft',
    metaTitle: 'Word Counter & Case Converter | QuickForma',
    metaDescription: 'Analyze text word count, character count, sentence length, reading time, and keyword density in real-time.'
  },
  {
    id: 'password-generator',
    name: 'Secure Password Generator',
    category: 'utilities',
    description: 'Generate high-entropy cryptographic passwords with customizable symbols & length.',
    iconName: 'KeyRound',
    badge: 'Private',
    metaTitle: 'Cryptographic Password Generator | QuickForma',
    metaDescription: 'Generate strong, unhackable passwords locally using window.crypto. Zero server data storage.'
  },
  {
    id: 'tip-calculator',
    name: 'Tip & Bill Splitter',
    category: 'finance',
    description: 'Calculate exact tip percentages and split restaurant bills per person instantly.',
    iconName: 'Calculator',
    metaTitle: 'Tip Calculator & Bill Splitter | QuickForma',
    metaDescription: 'Split restaurant bills and calculate exact tip amounts per person with custom percentage presets.'
  },
  {
    id: 'age-calculator',
    name: 'Age & Date Difference',
    category: 'text',
    description: 'Calculate exact age in years, months, days, day born & birthday countdown.',
    iconName: 'Cake',
    metaTitle: 'Age Calculator & Birthday Countdown | QuickForma',
    metaDescription: 'Calculate your exact age in years, months, days, day of the week born, and countdown to your next birthday.'
  },
  {
    id: 'unit-converter',
    name: 'Universal Unit Converter',
    category: 'utilities',
    description: 'Bi-directional conversions for length, weight, temperature, area, volume & data.',
    iconName: 'ArrowLeftRight',
    metaTitle: 'Universal Metric & Imperial Unit Converter | QuickForma',
    metaDescription: 'Convert metric and imperial units for length, weight, temperature, area, volume, and digital storage.'
  }
];

export function App() {
  const [activeToolId, setActiveToolId] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');

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

  const activeTool = TOOLS_CATALOG.find(t => t.id === activeToolId);

  const renderToolComponent = () => {
    switch (activeToolId) {
      case 'invoice-generator':
        return <InvoiceGenerator />;
      case 'qr-code-generator':
        return <QRCodeGenerator />;
      case 'word-counter':
        return <WordCounter />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'tip-calculator':
        return <TipCalculator />;
      case 'age-calculator':
        return <AgeCalculator />;
      case 'unit-converter':
        return <UnitConverter />;
      default:
        return <HomePage tools={TOOLS_CATALOG} onSelectTool={(id) => { setActiveToolId(id); window.scrollTo(0, 0); }} />;
    }
  };

  const filteredModalTools = TOOLS_CATALOG.filter(t =>
    t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-zinc-900">
      <div>
        <Navbar
          activeToolId={activeToolId}
          onSelectTool={(id) => { setActiveToolId(id); window.scrollTo(0, 0); }}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb for tool pages */}
          {activeToolId !== 'home' && (
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6 no-print">
              <button
                onClick={() => setActiveToolId('home')}
                className="hover:text-black flex items-center gap-1 font-semibold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> All Tools
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-800 font-bold">{activeTool?.name}</span>
            </div>
          )}

          {renderToolComponent()}
        </main>
      </div>

      <Footer onSelectTool={(id) => { setActiveToolId(id); window.scrollTo(0, 0); }} />

      {/* Cmd+K Quick Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white border border-zinc-200 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-zinc-200 flex items-center gap-3">
              <Search className="w-4 h-4 text-zinc-900" />
              <input
                type="text"
                autoFocus
                placeholder="Search tools (e.g. invoice, QR, password)..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder-zinc-400 font-medium"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-zinc-100">
              {filteredModalTools.map(t => (
                <div
                  key={t.id}
                  onClick={() => {
                    setActiveToolId(t.id);
                    setIsSearchOpen(false);
                    setSearchFilter('');
                    window.scrollTo(0, 0);
                  }}
                  className="p-3 hover:bg-zinc-100 rounded-xl cursor-pointer flex items-center justify-between group transition-colors"
                >
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 group-hover:text-black">{t.name}</h4>
                    <p className="text-xs text-zinc-500 line-clamp-1">{t.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
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
