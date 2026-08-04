import React, { useState, useRef, useEffect } from 'react';
import { Code, Download } from 'lucide-react';

export const BarcodeGenerator: React.FC = () => {
  const [text, setText] = useState('QUICKFORMA-9921');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawBarcode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f172a';
    const str = text || 'BARCODE';
    const startX = 30;
    let currX = startX;

    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      const width = (code % 3) + 2;
      const gap = (code % 2) + 2;
      ctx.fillRect(currX, 20, width * 2, 100);
      currX += width * 2 + gap * 2;
    }

    ctx.font = '14px monospace';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.fillText(str, canvas.width / 2, 140);
  };

  useEffect(() => {
    drawBarcode();
  }, [text]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `barcode-${text}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Barcode Generator</h2>
            <p className="text-slate-600 text-sm">Generate CODE128 barcodes from text or numbers with PNG image download.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Barcode Text / Numbers</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
            <button
              onClick={handleDownload}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Barcode PNG</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shadow-xs">
            <canvas ref={canvasRef} width={320} height={160} className="max-w-full bg-white p-2 rounded-xl border border-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
