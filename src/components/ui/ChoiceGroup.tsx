import { cn } from '@/utils/cn';

export type ChoiceValue = string | number | boolean;

export interface ChoiceOption<T extends ChoiceValue> {
  readonly value: T;
  readonly label: string;
}

export interface ChoiceGroupProps<T extends ChoiceValue> {
  readonly options: readonly ChoiceOption<T>[];
  readonly value: T;
  readonly onChange: (value: T) => void;
  readonly ariaLabel: string;
  /** Pick a divisor of options.length so every row is full and no empty ruled cells show. */
  readonly columns: number;
  readonly className?: string;
}

/** Segmented selector drawn as a 1px-ruled grid. The gap-px + bg-line trick produces the dividers. */
export function ChoiceGroup<T extends ChoiceValue>({
  options,
  value,
  onChange,
  ariaLabel,
  columns,
  className,
}: ChoiceGroupProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn('grid gap-px border border-line bg-line', className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={String(option.value)}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              'px-3 py-3 font-mono text-sm transition-none focus-visible:relative focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent',
              isSelected ? 'bg-ink text-obsidian' : 'bg-obsidian text-ink hover:bg-line',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
