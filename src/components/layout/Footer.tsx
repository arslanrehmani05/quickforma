import React from 'react';
import { Zap, Lock, Cpu } from 'lucide-react';

interface FooterProps {
  onSelectTool: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTool }) => {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-500 text-xs mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-black flex items-center justify-center text-white font-bold">
                <Zap className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="font-bold text-zinc-900 text-sm">QuickForma</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Standalone utility platform delivering instant, client-side calculated business and productivity tools.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded border border-zinc-200 font-medium">
              <Cpu className="w-3.5 h-3.5" />
              <span>Client-Side Engine • $0 Server Overhead</span>
            </div>
          </div>

          {/* Business & Finance */}
          <div>
            <h4 className="font-semibold text-zinc-900 uppercase text-[11px] tracking-wider mb-2.5">Business & Finance</h4>
            <ul className="space-y-1.5 text-zinc-500">
              <li><button onClick={() => onSelectTool('invoice-generator')} className="hover:text-black transition-colors">Instant Invoice Generator</button></li>
              <li><button onClick={() => onSelectTool('tip-calculator')} className="hover:text-black transition-colors">Tip & Bill Splitter</button></li>
              <li><span className="text-zinc-400 cursor-not-allowed">NDA Generator (Coming Soon)</span></li>
              <li><span className="text-zinc-400 cursor-not-allowed">Receipt Maker (Coming Soon)</span></li>
            </ul>
          </div>

          {/* Utilities */}
          <div>
            <h4 className="font-semibold text-zinc-900 uppercase text-[11px] tracking-wider mb-2.5">Developer & Web Tools</h4>
            <ul className="space-y-1.5 text-zinc-500">
              <li><button onClick={() => onSelectTool('qr-code-generator')} className="hover:text-black transition-colors">QR Code Generator</button></li>
              <li><button onClick={() => onSelectTool('password-generator')} className="hover:text-black transition-colors">Secure Password Generator</button></li>
              <li><button onClick={() => onSelectTool('unit-converter')} className="hover:text-black transition-colors">Universal Unit Converter</button></li>
            </ul>
          </div>

          {/* Text & Date */}
          <div>
            <h4 className="font-semibold text-zinc-900 uppercase text-[11px] tracking-wider mb-2.5">Text & Date Tools</h4>
            <ul className="space-y-1.5 text-zinc-500">
              <li><button onClick={() => onSelectTool('word-counter')} className="hover:text-black transition-colors">Word & Character Counter</button></li>
              <li><button onClick={() => onSelectTool('age-calculator')} className="hover:text-black transition-colors">Age & Date Difference</button></li>
            </ul>
          </div>
        </div>

        <hr className="border-zinc-200" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 text-[11px]">
          <p>© {new Date().getFullYear()} QuickForma Network. All calculations run 100% locally in your web browser.</p>
          <div className="flex items-center gap-4 font-semibold text-zinc-700">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3" /> 100% Data Privacy Guaranteed
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
