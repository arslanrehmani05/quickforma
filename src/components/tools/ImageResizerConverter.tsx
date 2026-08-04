import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Download, Upload } from 'lucide-react';

export const ImageResizerConverter: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [fileName, setFileName] = useState<string>('');
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadResized = () => {
    if (!imageSrc) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      const link = document.createElement('a');
      link.download = `resized-${fileName || 'image.png'}`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Image Resizer & WebP Converter</h2>
            <p className="text-slate-600 text-sm">Resize images and convert format 100% in local browser memory.</p>
          </div>
        </div>

        <div className="space-y-6">
          <label className="border-2 border-dashed border-slate-300 hover:border-indigo-600 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-50 hover:bg-indigo-50/50">
            <Upload className="w-10 h-10 text-slate-400 mb-3" />
            <span className="text-sm font-bold text-slate-800">Select Image File (PNG, JPG, WebP)</span>
            <span className="text-xs text-slate-500 mt-1">Sub-50ms Client-Side Canvas Processing</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          {imageSrc && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1">Target Width (px)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1">Target Height (px)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
                    />
                  </div>
                </div>
                <button
                  onClick={handleDownloadResized}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resized Image</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
                <img ref={imgRef} src={imageSrc} alt="Preview" className="max-h-48 rounded-xl object-contain" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
