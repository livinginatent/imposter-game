export type CategoryId =
  | 'locations'
  | 'occupations'
  | 'objects'
  | 'animals'
  | 'food'
  | 'sports'
  | 'vehicles'
  | 'music'
  | 'nature'
  | 'clothing';

/** A secret word plus a loosely related clue shown to imposters when hints are on. */
export interface SecretWord {
  readonly word: string;
  readonly hint: string;
}

export interface WordCategory {
  readonly id: CategoryId;
  readonly label: string;
  readonly words: readonly SecretWord[];
}
