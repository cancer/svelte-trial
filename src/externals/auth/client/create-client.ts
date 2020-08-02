import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

const createAuthClientCreator = (
  domain: string,
  clientId: string,
  redirectUri: string
): (() => Promise<Auth0Client>) => {
  let client: Auth0Client | null = null;

  return async function createAuthClient() {
    if (client !== null) {
      return client;
    }

    client = await createAuth0Client({
      domain,
      client_id: clientId,
      redirect_uri: redirectUri,
    });

    return client;
  };
};

export const createAuthClient = createAuthClientCreator(
  process.env.AUTH0_DOMAIN,
  process.env.AUTH0_CLIENT_ID,
  `${window.location.origin}/login/callback`
);
