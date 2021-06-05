import { drainContent } from './util';

const baseUrl = 'http://localhost:3001';
const apiEndpoint = '/api/signup';

const signUp = async (username, password) => {
  const res = await fetch(`${baseUrl}${apiEndpoint}`, {
    headers: {
      ['Content-Type']: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const content = await drainContent(res);
    throw new Error(content?.message ?? content);
  }
};

export default signUp;
