import { drainContent } from './util';

const baseUrl = 'http://localhost:3001';
const apiEndpoint = '/api/signIn';

const signIn = async (username, password) => {
  const res = await fetch(`${baseUrl}${apiEndpoint}`, {
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
