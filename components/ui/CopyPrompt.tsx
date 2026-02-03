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
      <div className="bg-gray-800/80 border border-orci-cyan/30 rounded-xl p-4 pr-12">
        <code className="text-orci-cyan text-sm md:text-base block whitespace-pre-wrap leading-relaxed" dir="ltr">
          {prompt}
        </code>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-3 left-3 p-2 bg-orci-cyan/20 hover:bg-orci-cyan/40 border border-orci-cyan/50 rounded-lg transition-all duration-200"
        title="העתק פרומפט"
      >
        {copied ? (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-orci-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
