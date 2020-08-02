import type { Book } from '../../../domains/book/book';
import { getToken } from '../../auth/token/get-token';
import { basePath } from '../base-path';

export const booksGetApi = async (): Promise<Book[]> => {
  const token = await getToken();

  try {
    const res = await fetch(`${basePath}/books?authorization=${token}`);
    return res.json();
  } catch (e) {
    throw e;
  }
};
