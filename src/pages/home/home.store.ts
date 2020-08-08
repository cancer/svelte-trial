import { derived, writable } from 'svelte/store';
import type { Book } from '../../domains/book/book';

export const Visibility = {
  All: 'all',
  OnlyIgnored: 'onlyIgnored',
  OnlyNotIgnored: 'onlyNotIgnored',
} as const;

export type VisibilityLiteral = typeof Visibility[keyof typeof Visibility];

export const books = writable<Book[]>([]);
export const bookCount = derived(books, (v) => v.length);

export const visibility = writable<VisibilityLiteral>(Visibility.All);
export const isVisibleAll = derived(visibility, (v) => v === Visibility.All);
export const isVisibleOnlyIgnored = derived(
  visibility,
  (v) => v === Visibility.OnlyIgnored
);
export const isVisibleOnlyNotIgnored = derived(
  visibility,
  (v) => v === Visibility.OnlyNotIgnored
);
