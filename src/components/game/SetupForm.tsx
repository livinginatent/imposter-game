import { Button } from '@/components/ui/Button';
import { ChoiceGroup, type ChoiceOption } from '@/components/ui/ChoiceGroup';
import { FormField } from '@/components/ui/FormField';
import { Screen } from '@/components/ui/Screen';
import { IMPOSTER_COUNT, PLAYER_COUNT } from '@/data/constants';
import { WORD_CATEGORIES } from '@/data/words';
import { RANDOM_CATEGORY, type CategorySelection, type GameConfig } from '@/types/game';
import { createRange } from '@/utils/range';

const PLAYER_OPTIONS: readonly ChoiceOption<number>[] = createRange(PLAYER_COUNT.MIN, PLAYER_COUNT.MAX).map(
  (count) => ({ value: count, label: String(count) }),
);

const CATEGORY_OPTIONS: readonly ChoiceOption<CategorySelection>[] = WORD_CATEGORIES.map(({ id, label }) => ({
  value: id,
  label,
}));

const RANDOM_OPTIONS: readonly ChoiceOption<CategorySelection>[] = [{ value: RANDOM_CATEGORY, label: 'Random' }];

const HINT_OPTIONS: readonly ChoiceOption<boolean>[] = [
  { value: false, label: 'Off' },
  { value: true, label: 'On' },
];

interface SetupFormProps {
  readonly config: GameConfig;
  readonly maxImposters: number;
  readonly onPlayerCountChange: (count: number) => void;
  readonly onImposterCountChange: (count: number) => void;
  readonly onCategoryChange: (categoryId: CategorySelection) => void;
  readonly onHintChange: (isHintEnabled: boolean) => void;
  readonly onStart: () => void;
}

export function SetupForm({
  config,
  maxImposters,
  onPlayerCountChange,
  onImposterCountChange,
  onCategoryChange,
  onHintChange,
  onStart,
}: SetupFormProps) {
  const imposterOptions: ChoiceOption<number>[] = createRange(IMPOSTER_COUNT.MIN, maxImposters).map(
    (count) => ({ value: count, label: String(count) }),
  );

  return (
    <Screen
      eyebrow="SETUP"
      title="Play Imposter"
      description="Free party word game. No download, no sign-up."
    >
      <FormField label="Players" aside={`${config.playerCount} / ${PLAYER_COUNT.MAX}`}>
        <ChoiceGroup
          ariaLabel="Player count"
          options={PLAYER_OPTIONS}
          value={config.playerCount}
          onChange={onPlayerCountChange}
          columns={5}
        />
      </FormField>

      <FormField label="Imposters" aside={`max ${maxImposters}`}>
        <ChoiceGroup
          ariaLabel="Imposter count"
          options={imposterOptions}
          value={config.imposterCount}
          onChange={onImposterCountChange}
          columns={imposterOptions.length}
        />
      </FormField>

      <FormField label="Category" aside={`${WORD_CATEGORIES.length} categories`}>
        <ChoiceGroup
          ariaLabel="Word category"
          options={CATEGORY_OPTIONS}
          value={config.categoryId}
          onChange={onCategoryChange}
          columns={2}
        />
        <ChoiceGroup
          ariaLabel="Random category"
          options={RANDOM_OPTIONS}
          value={config.categoryId}
          onChange={onCategoryChange}
          columns={1}
        />
      </FormField>

      <FormField label="Imposter hint" aside="a related clue">
        <ChoiceGroup
          ariaLabel="Imposter hint"
          options={HINT_OPTIONS}
          value={config.isHintEnabled}
          onChange={onHintChange}
          columns={2}
        />
      </FormField>

      {/* Sticky so Start stays reachable on short phones; scoped to the setup frame, not the page copy below. */}
      <div className="sticky bottom-0 -mx-4 mt-auto flex flex-col gap-3 bg-obsidian px-4 py-4 sm:-mx-6 sm:px-6">
        <p className="text-center font-mono text-xs text-ink/60">
          {config.playerCount} players / {config.imposterCount} imposter{config.imposterCount === 1 ? '' : 's'} / hint{' '}
          {config.isHintEnabled ? 'on' : 'off'}
        </p>
        <Button variant="solid" onClick={onStart}>
          Start Game
        </Button>
      </div>
    </Screen>
  );
}
