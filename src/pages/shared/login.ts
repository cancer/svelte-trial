import { createAuthClient } from '../../externals/auth/client/create-client';
import { existUser } from '../../externals/auth/user/exists-user';

export const login = async () => {
  const client = await createAuthClient();

  try {
    if (!(await existUser())) {
      await client.loginWithRedirect();
      return;
    }
  } catch (_) {
    await client.loginWithRedirect();
    return;
  }
};
