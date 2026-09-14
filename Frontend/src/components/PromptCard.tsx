import React from 'react';
import { ArrowRight, Sliders, FileText } from 'lucide-react';
import { PromptItem, CATEGORY_COLORS } from '../types';
import { extractVariables } from '../utils/promptParser';

interface PromptCardProps {
  item: PromptItem;
  onSelect: (item: PromptItem) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ item, onSelect }) => {
  const formattedNumber = `#${item.number.toString().padStart(2, '0')}`;
  const categoryColor = CATEGORY_COLORS[item.category] || 'var(--gold)';
  const variables = extractVariables(item.prompt);
  const variableCount = variables.length;

  return (
    <div
      id={`prompt-card-${item.id}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
      className="group relative flex flex-col justify-between bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-md transition-all duration-200 hover:border-[var(--gold)]/40 hover:shadow-xl hover:-translate-y-1 cursor-pointer select-none text-left focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/50"
    >
      {/* Top Border Accent matching Category Color */}
      <div
        className="h-1 w-full transition-all duration-200 group-hover:h-1.5"
        style={{ backgroundColor: categoryColor }}
      />

      {/* Card Content: Shows only Prompt Name / Title & metadata */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Number & Category Badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span
              id={`prompt-number-${item.id}`}
              className="text-xs font-mono font-bold tracking-wider text-[var(--gold)]"
            >
              {formattedNumber}
            </span>
            <span
              id={`prompt-badge-${item.id}`}
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-colors"
              style={{
                color: categoryColor,
                backgroundColor: `${categoryColor}18`,
                border: `1px solid ${categoryColor}33`,
              }}
            >
              {item.category}
            </span>
          </div>

          {/* Prompt Name (Title) */}
          <h2
            id={`prompt-title-${item.id}`}
            className="text-base sm:text-[17px] font-bold text-[var(--text)] tracking-tight leading-snug group-hover:text-[var(--gold2)] transition-colors duration-150 mb-3"
          >
            {item.title}
          </h2>
        </div>

        {/* Footer: Input variables count and prompt action trigger */}
        <div className="pt-4 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between mt-3 text-xs">
          <div className="flex items-center gap-1.5 text-[var(--muted)]">
            <Sliders className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>
              <strong className="text-[var(--text)] font-semibold">{variableCount}</strong> {variableCount === 1 ? 'input' : 'inputs'} to fill
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--gold)] group-hover:text-[var(--gold2)] transition-all">
            <span>Fill & Copy</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
