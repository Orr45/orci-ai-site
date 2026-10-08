'use client';

import { useState } from 'react';

interface CopyPromptProps {
  prompt: string;
}

export function CopyPrompt({ prompt }: CopyPromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="my-6 relative">
      <div
        className="rounded-2xl p-4 pl-16"
        style={{ background: 'var(--surface-alt)', border: '1px solid var(--accent-line)' }}
      >
        <code className="text-sm md:text-base block whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--accent)' }} dir="auto">
          {prompt}
        </code>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-3 left-3 w-10 h-10 flex items-center justify-center rounded-full transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        style={{ background: 'var(--cyan)', color: 'var(--olive)', border: '2px solid var(--olive)' }}
        title="העתק פרומפט"
        aria-label={copied ? 'הפרומפט הועתק' : 'העתק פרומפט'}
      >
        {copied ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
