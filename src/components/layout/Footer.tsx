import React from 'react';
import { Zap, Shield, Lock } from 'lucide-react';

interface FooterProps {
  onSelectView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectView }) => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-extrabold text-slate-900 text-base">QuickForma</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              QuickForma is a privacy-first web utility tools network. Every tool performs calculations, PDF generations, and conversions 100% inside your browser memory.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Server Uploads • 100% Client-Side</span>
            </div>
          </div>

          {/* Featured Categories */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-3">Financial & Business</h4>
            <ul className="space-y-2 text-slate-500">
              <li><button onClick={() => onSelectView('invoice-generator')} className="hover:text-indigo-600 transition-colors">PDF Invoice Generator</button></li>
              <li><button onClick={() => onSelectView('tip-calculator')} className="hover:text-indigo-600 transition-colors">Tip & Bill Splitter</button></li>
              <li><button onClick={() => onSelectView('freelance-hourly-rate-calculator')} className="hover:text-indigo-600 transition-colors">Freelance Rate Calculator</button></li>
              <li><button onClick={() => onSelectView('break-even-calculator')} className="hover:text-indigo-600 transition-colors">Break-Even Calculator</button></li>
              <li><button onClick={() => onSelectView('roi-calculator')} className="hover:text-indigo-600 transition-colors">ROI Calculator</button></li>
            </ul>
          </div>

          {/* Developer & Tools */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-3">Developer & Web</h4>
            <ul className="space-y-2 text-slate-500">
              <li><button onClick={() => onSelectView('qr-code-generator')} className="hover:text-indigo-600 transition-colors">QR Code Maker</button></li>
              <li><button onClick={() => onSelectView('password-generator')} className="hover:text-indigo-600 transition-colors">Secure Password Generator</button></li>
              <li><button onClick={() => onSelectView('json-formatter-validator')} className="hover:text-indigo-600 transition-colors">JSON Formatter</button></li>
              <li><button onClick={() => onSelectView('unit-converter')} className="hover:text-indigo-600 transition-colors">Multi-Unit Converter</button></li>
              <li><button onClick={() => onSelectView('image-resizer-converter')} className="hover:text-indigo-600 transition-colors">Image Resizer & WebP</button></li>
            </ul>
          </div>

          {/* Legal Compliance Pages */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-3">Company & Legal</h4>
            <ul className="space-y-2 text-slate-500">
              <li><button onClick={() => onSelectView('privacy')} className="hover:text-indigo-600 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onSelectView('terms')} className="hover:text-indigo-600 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => onSelectView('about')} className="hover:text-indigo-600 transition-colors">About Us</button></li>
              <li><button onClick={() => onSelectView('contact')} className="hover:text-indigo-600 transition-colors">Contact Support</button></li>
              <li><button onClick={() => onSelectView('blog:index')} className="hover:text-indigo-600 font-semibold transition-colors">The QuickForma Ledger</button></li>
            </ul>
          </div>
        </div>

        <hr className="border-slate-200" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} QuickForma (`quickforma.com`). All utility tools process 100% in your local browser memory.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" /> Guaranteed Privacy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
