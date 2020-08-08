import { booksGetApi } from '../../externals/api/books/get';
import { books } from './home.store';

export const fetchBooks = async (): Promise<void> => {
  const res = await booksGetApi();
  books.set(res);
};
