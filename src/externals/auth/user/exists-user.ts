import { getUser } from './get-user';

export const existUser = async (): Promise<boolean> => {
  try {
    const user = await getUser();
    return !!user;
  } catch (e) {
    throw e;
  }
};
