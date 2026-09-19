import React, { useState, useMemo } from 'react';
import { Search, Sparkles, X, SlidersHorizontal, LogOut, Info } from 'lucide-react';
import { PromptItem, Category, CATEGORIES, UserCredentials } from '../types';
import { PromptCard } from './PromptCard';
import { PromptCustomizerModal } from './PromptCustomizerModal';

interface PromptLibraryProps {
  prompts: PromptItem[];
  user: UserCredentials | null;
  onLogout: () => void;
}

export const PromptLibrary: React.FC<PromptLibraryProps> = ({
  prompts,
  user,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activePrompt, setActivePrompt] = useState<PromptItem | null>(null);

  // Real-time filtering
  const filteredPrompts = useMemo(() => {
    return prompts.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.prompt.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [prompts, selectedCategory, searchQuery]);

  const totalCount = prompts.length;
  const filteredCount = filteredPrompts.length;

  return (
    <div id="library-view" className="min-h-screen flex flex-col library-bg">
      <header className="sticky top-0 z-40 w-full bg-[var(--navy)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] shadow-sm">
              <img src="/logo.png" alt="WOWOS Logo" className="h-10 w-auto object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-[0.2em] text-[var(--gold)] uppercase">
                  WOWOS FAST TRACK
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-semibold text-[var(--text)] tracking-tight">
                101 Business Prompts
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--surface)] border border-[var(--border2)] text-[var(--text)] shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
              <span>
                Showing <strong className="text-[var(--gold2)] font-semibold">{filteredCount}</strong> of {totalCount}
              </span>
            </div>

            {user && (
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[var(--border)]">
                <span className="text-xs text-[var(--muted)] max-w-[120px] truncate" title={user.name}>
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={onLogout}
                  title="Lock vault and return to gateway"
                  className="p-1.5 text-[var(--muted)] hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors duration-150 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[var(--surface)]/70 border border-[var(--border)] text-xs text-[var(--muted)]">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[var(--gold)] shrink-0" />
            <span>
              Click on any business prompt below to fill its custom parameters and copy the finalized, ready-to-run prompt.
            </span>
          </div>
          <span className="hidden md:inline-block text-[11px] font-semibold text-[var(--gold2)] uppercase tracking-wider bg-[var(--gold)]/10 px-2 py-0.5 rounded">
            Interactive Prompt Engine
          </span>
        </div>

        <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--muted)]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompt names, business areas, or keywords..."
              className="w-full pl-10 pr-10 py-2.5 bg-[var(--surface)] text-[var(--text)] placeholder-[var(--faint)] text-sm rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-colors duration-150"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] pr-2 font-medium shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Category:</span>
            </div>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--gold)] text-[var(--navy)] shadow-sm'
                      : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--navy3)] border border-[var(--border)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {filteredPrompts.length > 0 ? (
          <div
            className="grid gap-4 sm:gap-5"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
          >
            {filteredPrompts.map((item) => (
              <PromptCard
                key={item.id}
                item={item}
                onSelect={(selected) => setActivePrompt(selected)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-[var(--card)] border border-[var(--border)] rounded-xl">
            <div className="w-12 h-12 mx-auto rounded-full bg-[var(--surface)] flex items-center justify-center text-[var(--muted)] mb-3">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[var(--text)] mb-1">
              No matching business prompt names found
            </h3>
            <p className="text-xs text-[var(--muted)] max-w-sm mx-auto mb-4">
              Try adjusting your search terms or selecting a different category filter.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 bg-[var(--surface)] hover:bg-[var(--navy3)] text-xs text-[var(--gold2)] border border-[var(--border)] rounded-md font-medium transition-colors cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </main>

      {/* MODAL IS RENDERED HERE: Passing the user prop for backend logging */}
      {activePrompt && (
        <PromptCustomizerModal
          prompt={activePrompt}
          user={user}
          onClose={() => setActivePrompt(null)}
        />
      )}

      <footer className="w-full border-t border-[var(--border)] py-6 text-center text-xs text-[var(--faint)]">
        <p>WOWOS Fast Track — 101 Business Prompts • Dark Mode Executive Edition</p>
      </footer>
    </div>
  );
};