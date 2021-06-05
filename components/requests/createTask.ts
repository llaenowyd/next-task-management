import { drainContent } from './util';

const baseUrl = 'http://localhost:3001';
const apiEndpoint = '/api/createTask';

const createTask = async (accessToken, title, description, handle401) => {
  const res = await fetch(`${baseUrl}${apiEndpoint}`, {
    method: 'POST',
    headers: {
      ['Authorization']: `Bearer ${accessToken}`,
      ['Content-Type']: 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });

  const content = await drainContent(res);

  if (!res.ok) {
    if (res.status === 401) {
      handle401();
    } else {
      throw new Error(content?.message ?? content);
    }
  }

  return content;
};

export default createTask;
