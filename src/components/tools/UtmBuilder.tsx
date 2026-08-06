import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { Link, Check } from 'lucide-react';

export const UtmBuilder: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState<string>('https://quickforma.com');
  const [source, setSource] = useState<string>('newsletter');
  const [medium, setMedium] = useState<string>('email');
  const [campaign, setCampaign] = useState<string>('summer_sale');
  const [term, setTerm] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const buildUrl = () => {
    if (!baseUrl.trim()) return '';
    try {
      const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`);
      if (source) url.searchParams.set('utm_source', source.trim().toLowerCase().replace(/\s+/g, '_'));
      if (medium) url.searchParams.set('utm_medium', medium.trim().toLowerCase().replace(/\s+/g, '_'));
      if (campaign) url.searchParams.set('utm_campaign', campaign.trim().toLowerCase().replace(/\s+/g, '_'));
      if (term) url.searchParams.set('utm_term', term.trim().toLowerCase().replace(/\s+/g, '_'));
      if (content) url.searchParams.set('utm_content', content.trim().toLowerCase().replace(/\s+/g, '_'));
      return url.toString();
    } catch {
      return '';
    }
  };

  const finalUrl = buildUrl();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <Link className="w-5 h-5" />
            <span>Campaign UTM URL Builder</span>
          </div>
          <ResetButton onReset={() => { setBaseUrl('https://quickforma.com'); setSource('newsletter'); setMedium('email'); setCampaign('summer_sale'); setTerm(''); setContent(''); }} />
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Target Website URL *
            </label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://quickforma.com"
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                UTM Source * (e.g. google, newsletter)
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-xs text-zinc-900 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                UTM Medium * (e.g. cpc, email, banner)
              </label>
              <input
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-xs text-zinc-900 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                UTM Campaign * (e.g. summer_sale)
              </label>
              <input
                type="text"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-xs text-zinc-900 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                UTM Term (Keywords)
              </label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="running_shoes"
                className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-xs text-zinc-900 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                UTM Content (Ad Variant)
              </label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="logolink_cta"
                className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-xs text-zinc-900 font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Output */}
        {finalUrl && (
          <div className="space-y-2 pt-2 border-t border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Generated Campaign URL</span>
              <CopyButton textToCopy={finalUrl} />
            </div>
            <textarea
              readOnly
              value={finalUrl}
              rows={3}
              className="w-full font-mono text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg outline-none text-zinc-900 resize-none break-all"
            />
          </div>
        )}
      </div>
    </div>
  );
};
