import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Copy,
  Check,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sliders,
  FileText,
} from 'lucide-react';
import { PromptItem, CATEGORY_COLORS, UserCredentials } from '../types';
import {
  extractVariables,
  buildFilledPrompt,
  highlightFilledPrompt,
} from '../utils/promptParser';

interface PromptCustomizerModalProps {
  prompt: PromptItem;
  user: UserCredentials | null;
  onClose: () => void;
}

export const PromptCustomizerModal: React.FC<PromptCustomizerModalProps> = ({
  prompt,
  user,
  onClose,
}) => {
  const variables = useMemo(() => extractVariables(prompt.prompt), [prompt.prompt]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copiedFilled, setCopiedFilled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const categoryColor = CATEGORY_COLORS[prompt.category] || 'var(--gold)';
  const formattedNumber = `#${prompt.number.toString().padStart(2, '0')}`;

  const filledCount = variables.filter(
    (v) => values[v.key] && values[v.key].trim().length > 0
  ).length;
  const allFilled = variables.length > 0 && filledCount === variables.length;
  const progressPercent =
    variables.length > 0 ? Math.round((filledCount / variables.length) * 100) : 100;

  const filledPromptText = useMemo(() => {
    return buildFilledPrompt(prompt.prompt, values);
  }, [prompt.prompt, values]);

  const handleInputChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleClearAll = () => setValues({});

  const copyToClipboard = async (text: string, isFilled: boolean) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      // --- EXPLICIT LOGGING PAYLOAD ---
      if (user) {
        const payload = {
          user: user,
          promptId: prompt.id,
          promptTitle: prompt.title,
          originalTemplate: prompt.prompt, // The template with [brackets]
          filledInputs: values,            // { "describe business": "SaaS", ... }
          finalFilledPrompt: text          // The actual text the user copied
        };

        console.log("📤 Sending log to backend:", payload);

        fetch('/api/prompts/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.error('Silent tracking failed:', err));
      }

      if (isFilled) {
        setCopiedFilled(true);
        setTimeout(() => setCopiedFilled(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy prompt: ', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[var(--card)] border border-[var(--border2)] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto">
        <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: categoryColor }} />

        <div className="px-6 py-4 sm:py-5 border-b border-[var(--border)] flex items-center justify-between gap-4 bg-[var(--navy2)]/60 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] px-2.5 py-1.5 rounded-lg border border-transparent hover:border-[var(--border)] transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Prompts</span>
            </button>
            <div className="h-5 w-[1px] bg-[var(--border)] hidden sm:block shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-mono font-bold text-[var(--gold)]">{formattedNumber}</span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ color: categoryColor, backgroundColor: `${categoryColor}18`, border: `1px solid ${categoryColor}33` }}
                >
                  {prompt.category}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[var(--text)] truncate" title={prompt.title}>
                {prompt.title}
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] rounded-lg transition-colors cursor-pointer shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
          <div className="lg:col-span-6 p-5 sm:p-6 space-y-5 overflow-y-auto bg-[var(--card)]">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="text-sm font-bold text-[var(--text)] tracking-wide uppercase">Fill Prompt Inputs</h3>
              </div>
              <span className="text-xs font-medium text-[var(--muted)]">
                <span className="text-[var(--gold2)] font-bold">{filledCount}</span> of {variables.length} filled
              </span>
            </div>

            <div className="w-full h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold2)] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              {filledCount > 0 && (
                <button onClick={handleClearAll} className="inline-flex items-center gap-1 text-xs text-[var(--muted)] hover:text-rose-400 transition-colors cursor-pointer">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear all</span>
                </button>
              )}
            </div>

            <div className="space-y-4 pt-1">
              {variables.map((variable, idx) => {
                const isFilled = values[variable.key] && values[variable.key].trim().length > 0;
                return (
                  <div key={variable.key} className="p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus-within:border-[var(--gold)] transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-[var(--text)] tracking-wide flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-[var(--navy)] text-[var(--gold)] text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="capitalize">{variable.label}</span>
                      </label>
                      {isFilled ? (
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Filled</span></span>
                      ) : (
                        <span className="text-[11px] text-[var(--faint)]">Required</span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={values[variable.key] || ''}
                      onChange={(e) => handleInputChange(variable.key, e.target.value)}
                      placeholder={variable.placeholder}
                      className="w-full bg-[var(--navy)] text-[var(--text)] placeholder-[var(--faint)] text-sm px-3.5 py-2.5 rounded-lg border border-[rgba(255,255,255,0.06)] focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-colors"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 p-5 sm:p-6 flex flex-col justify-between bg-[var(--navy2)]/40 overflow-y-auto space-y-5">
            <div className="space-y-3 flex-1 flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[var(--gold2)]" />
                  <h3 className="text-sm font-bold text-[var(--text)] tracking-wide uppercase">Live Completed Prompt</h3>
                </div>
                {allFilled ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20"><CheckCircle2 className="w-3.5 h-3.5" />All inputs filled</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--gold2)] font-medium bg-[var(--gold)]/10 px-2.5 py-0.5 rounded-full border border-[var(--gold)]/20"><AlertCircle className="w-3.5 h-3.5" />{variables.length - filledCount} bracket{variables.length - filledCount > 1 ? 's' : ''} remaining</span>
                )}
              </div>

              <div className="flex-1 bg-[var(--surface)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 sm:p-5 text-[13.5px] leading-relaxed text-[#D6DCE7] font-mono-code overflow-y-auto select-text shadow-inner min-h-[220px]">
                <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlightFilledPrompt(prompt.prompt, values) }} />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[var(--muted)] pt-1">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500/80" /><span>Green = Your filled inputs</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[var(--gold2)]/80" /><span>Gold = Bracket placeholders</span></div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] space-y-2.5">
              <button
                onClick={() => copyToClipboard(filledPromptText, true)}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  copiedFilled ? 'bg-emerald-600 text-white shadow-emerald-900/30' : 'bg-[var(--gold)] hover:bg-[var(--gold2)] text-[var(--navy)] active:scale-[0.99] shadow-[var(--gold)]/20'
                }`}
              >
                {copiedFilled ? (
                  <><Check className="w-4 h-4 text-white" /><span>✓ Copied completed prompt to clipboard!</span></>
                ) : (
                  <><Copy className="w-4 h-4 text-[var(--navy)]" /><span>Copy prompt</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};