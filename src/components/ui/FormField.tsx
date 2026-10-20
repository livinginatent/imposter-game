import type { ReactNode } from 'react';

interface FormFieldProps {
  readonly label: string;
  readonly aside?: ReactNode;
  readonly children: ReactNode;
}

export function FormField({ label, aside, children }: FormFieldProps) {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.25em] text-ink/60">{label}</p>
        {aside && <p className="font-mono text-xs text-ink/60">{aside}</p>}
      </header>
      {children}
    </section>
  );
}
