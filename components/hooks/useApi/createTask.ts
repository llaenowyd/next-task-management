import { drainContent } from './util';

const apiEndpoint = '/api/tasks';

const createTask = (accessToken, handle401) => async (title, description) => {
  const res = await fetch(apiEndpoint, {
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
