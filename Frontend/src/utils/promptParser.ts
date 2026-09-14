export interface PromptVariable {
  raw: string;          // e.g., "[Target Audience]"
  key: string;          // e.g., "Target Audience"
  label: string;        // e.g., "Target Audience"
  placeholder: string;  // e.g., "e.g., B2B SaaS Founders" or default
}

/**
 * Extracts all unique bracketed variables like [Target Audience] from a prompt template.
 */
export function extractVariables(promptText: string): PromptVariable[] {
  const matches = promptText.match(/\[([^\]]+)\]/g);
  if (!matches) return [];

  const seen = new Set<string>();
  const variables: PromptVariable[] = [];

  for (const raw of matches) {
    const inner = raw.slice(1, -1).trim();
    if (seen.has(inner)) continue;
    seen.add(inner);

    let label = inner;
    let placeholder = `Enter ${inner.toLowerCase()}...`;

    // Handle variables containing example text, e.g., "Marketing Channel, e.g., LinkedIn / Meta Ads"
    if (inner.includes(', e.g.,') || inner.includes(', e.g.')) {
      const splitIdx = inner.indexOf(', e.g');
      label = inner.slice(0, splitIdx).trim();
      const egPart = inner.slice(splitIdx + 2).trim();
      placeholder = egPart;
    } else if (inner.includes('e.g.,') || inner.includes('e.g.')) {
      const splitIdx = inner.indexOf('e.g');
      label = inner.slice(0, splitIdx).replace(/[,/]/g, '').trim();
      placeholder = inner.slice(splitIdx).trim();
    }

    variables.push({
      raw,
      key: inner,
      label: label || inner,
      placeholder,
    });
  }

  return variables;
}

/**
 * Replaces placeholders with user-provided values.
 * If a value is provided and non-empty, replaces with the value.
 * If empty, keeps the bracketed placeholder or fallback.
 */
export function buildFilledPrompt(
  promptText: string,
  values: Record<string, string>
): string {
  return promptText.replace(/\[([^\]]+)\]/g, (match, inner) => {
    const key = inner.trim();
    const val = values[key];
    if (val !== undefined && val.trim() !== '') {
      return val.trim();
    }
    return match;
  });
}

/**
 * Generates an HTML preview string with custom styling for filled vs unfilled variables.
 */
export function highlightFilledPrompt(
  promptText: string,
  values: Record<string, string>
): string {
  // Escape HTML first
  const escaped = promptText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  return escaped.replace(/\[([^\]]+)\]/g, (match, inner) => {
    const key = inner.trim();
    const val = values[key];
    if (val !== undefined && val.trim() !== '') {
      const safeVal = val
        .trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<span class="filled-variable-tag">${safeVal}</span>`;
    }
    return `<span class="bracket-highlight">${match}</span>`;
  });
}
