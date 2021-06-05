import { drainContent } from './util';

const baseUrl = 'http://localhost:3001';
const apiEndpoint = '/api/signUp';

const signUp = async (username, password) => {
  const res = await fetch(`${baseUrl}${apiEndpoint}`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const content = await drainContent(res);
    throw new Error(content?.message ?? content);
  }
};

export default signUp;
