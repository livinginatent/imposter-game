import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export type ButtonVariant = 'solid' | 'outline' | 'accent';

const BASE_CLASSES =
  'inline-flex w-full items-center justify-center gap-2 border rounded-none px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] transition-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-40';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  solid: 'border-ink bg-ink text-obsidian enabled:hover:bg-obsidian enabled:hover:text-ink',
  outline: 'border-line bg-transparent text-ink enabled:hover:border-ink',
  accent: 'border-accent bg-transparent text-accent enabled:hover:bg-accent enabled:hover:text-obsidian',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'outline', className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], className)} {...rest} />;
}
