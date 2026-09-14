export type Category = 'All' | 'Marketing' | 'Sales' | 'Delivery' | 'Finance' | 'People' | 'AI';

export type PromptCategory = 'Marketing' | 'Sales' | 'Delivery' | 'Finance' | 'People' | 'AI';

export interface PromptItem {
  id: string;
  number: number;
  category: PromptCategory;
  title: string;
  prompt: string;
}

export interface UserCredentials {
  name: string;
  email: string;
  mobile: string;
}

export const CATEGORY_COLORS: Record<PromptCategory, string> = {
  Marketing: '#E9A820', // Vibrant rose/pink
  Sales: '#10B981',     // Gold / Amber
  Delivery: '#3B82F6',  // Tech Blue
  Finance: '#EC4899',   // Emerald Green
  People: '#8B5CF6',    // Violet/Purple
  AI: '#64748B',        // Cyan
};

export const CATEGORIES: Category[] = [
  'All',
  'Marketing',
  'Sales',
  'Delivery',
  'Finance',
  'People',
  'AI',
];
