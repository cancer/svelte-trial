import { createAuthClient } from '../client/create-client';
import type { User } from './user';

export const getUser = async (): Promise<User> => {
  const client = await createAuthClient();
  try {
    return await client.getUser();
  } catch (e) {
    throw e;
  }
};
