import { drainContent } from './util';

const apiEndpoint = '/api/signin';

const signIn = async (username, password) => {
  const res = await fetch(apiEndpoint, {
    headers: {
      ['Content-Type']: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  const content = await drainContent(res);

  if (!res.ok) {
    throw new Error(content?.message ?? content);
  }

  return content?.accessToken;
};

export default signIn;
