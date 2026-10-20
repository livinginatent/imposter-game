import type { ReactNode } from 'react';

interface ScreenProps {
  readonly eyebrow: ReactNode;
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly children: ReactNode;
}

/** Page frame: a ruled header with the phase tag, then a single centred column. */
export function Screen({ eyebrow, title, description, children }: ScreenProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <header className="flex items-center justify-between border-b border-line px-4 py-4 text-xs uppercase tracking-[0.25em] sm:px-6">
        <span>Imposter</span>
        <span className="font-mono text-ink/60">{eyebrow}</span>
      </header>

      <main className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
        {title && (
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            {description && <p className="text-sm text-balance text-ink/60">{description}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
