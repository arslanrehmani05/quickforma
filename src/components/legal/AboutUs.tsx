import React from 'react';
import { Sparkles, Zap, Shield, Heart } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4 border border-indigo-500/20">
          <Sparkles className="w-4 h-4" />
          <span>Our Mission & Vision</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
          About QuickForma
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          We are on a mission to liberate everyday web utility tools from paywalls, account signups, and bloated subscriptions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
          <Zap className="w-8 h-8 text-amber-400 mb-4" />
          <h3 className="text-slate-100 font-bold text-lg mb-2">Instant Sub-50ms Execution</h3>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every tool on QuickForma runs 100% inside your browser using modern Web APIs. No waiting for server responses, no spinning loaders.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
          <Shield className="w-8 h-8 text-indigo-400 mb-4" />
          <h3 className="text-slate-100 font-bold text-lg mb-2">Uncompromising Privacy</h3>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Your data is your business. We don't save your invoices, password parameters, or PDF files to any database. When you close the tab, your data vanishes.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950 border border-indigo-500/20 text-center">
        <Heart className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-100 mb-3">100% Free Forever</h2>
        <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          QuickForma is supported by non-intrusive banner advertising. We promise to never put basic utilities behind email paywalls or mandatory subscriptions.
        </p>
      </div>
    </div>
  );
};
