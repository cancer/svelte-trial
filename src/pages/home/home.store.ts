import { derived, readable, writable } from 'svelte/store';
import type { Book } from '../../domains/book/book';

export const data = {
  visibility: 'all' as const,
};

export type Visibility = 'all' | 'onlyIgnored' | 'onlyNotIgnored';

export const books = writable<Book[]>([]);
export const bookCount = derived(books, (v) => v.length);

export const visibility = writable<Visibility>(data.visibility);
export const isVisibleAll = derived(visibility, (v) => v === 'all');
export const isVisibleOnlyIgnored = derived(
  visibility,
  (v) => v === 'onlyIgnored'
);
export const isVisibleOnlyNotIgnored = derived(
  visibility,
  (v) => v === 'onlyNotIgnored'
);
