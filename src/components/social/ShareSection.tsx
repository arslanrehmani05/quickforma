import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Linkedin,
  Facebook,
  MessageSquare,
  Mail,
  Send,
  ExternalLink,
} from 'lucide-react';

export interface ShareSectionProps {
  title?: string;
  description?: string;
  url?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  label?: string;
}

export const ShareSection: React.FC<ShareSectionProps> = ({
  title = 'QuickForma — Free Business Tools & Financial Calculators',
  description = 'Instant, 100% free client-side business utilities and financial calculators.',
  url,
  className = '',
  align = 'left',
  label = 'Share this resource:',
}) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return 'https://www.quickforma.com';
  };

  const shareUrl = getShareUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(`${title} — ${description}`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Failed to copy URL to clipboard', err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        // Ignore user cancellation errors
      }
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-[#0A66C2] hover:bg-blue-50 hover:border-blue-200',
    },
    {
      name: 'X (Twitter)',
      icon: ExternalLink,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-[#1877F2] hover:bg-blue-50 hover:border-blue-200',
    },
    {
      name: 'WhatsApp',
      icon: Send,
      href: `https://api.whatsapp.com/send?text=${encodedSummary}`,
      color: 'hover:text-[#25D366] hover:bg-emerald-50 hover:border-emerald-200',
    },
    {
      name: 'Reddit',
      icon: MessageSquare,
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: 'hover:text-[#FF4500] hover:bg-orange-50 hover:border-orange-200',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedSummary}`,
      color: 'hover:text-slate-800 hover:bg-slate-100 hover:border-slate-300',
    },
  ];

  const alignmentClass =
    align === 'center'
      ? 'justify-center text-center'
      : align === 'right'
      ? 'justify-end text-right'
      : 'justify-start text-left';

  return (
    <div className={`no-print py-4 my-2 border-y border-slate-100/80 ${className}`}>
      <div className={`flex flex-wrap items-center gap-3 ${alignmentClass}`}>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider pr-1">
          <Share2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>{label}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Native Web Share API Button if available */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600"
              aria-label="Share using native device dialog"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share...</span>
            </button>
          )}

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
            aria-label="Copy canonical URL to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white animate-in zoom-in-50 duration-150" />
                <span className="font-semibold">Link copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* Social Channel Links */}
          {socialLinks.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 ${platform.color}`}
                aria-label={`Share on ${platform.name}`}
                title={`Share on ${platform.name}`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">{platform.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShareSection;
