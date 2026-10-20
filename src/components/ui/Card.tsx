import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('border border-line bg-obsidian p-6 sm:p-8', className)} {...rest} />;
}
