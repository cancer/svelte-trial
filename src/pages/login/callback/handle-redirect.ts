import { createAuthClient } from '../../../externals/auth/client/create-client';

export const handleRedirect = async () => {
  try {
    const client = await createAuthClient();
    await client.handleRedirectCallback();
  } catch (e) {
    throw e;
  }
};
