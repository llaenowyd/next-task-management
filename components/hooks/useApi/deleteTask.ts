import { drainContent } from './util';

const baseUrl = 'http://localhost:3001';

const deleteTask = (accessToken, handle401) => async (id) => {
  const apiEndpoint = `/api/tasks/${id}`;

  const res = await fetch(`${baseUrl}${apiEndpoint}`, {
    method: 'DELETE',
    headers: {
      ['Authorization']: `Bearer ${accessToken}`,
      ['Content-Type']: 'application/json',
    },
  });

  const content = await drainContent(res);

  if (!res.ok) {
    if (res.status === 401) {
      handle401();
    } else {
      throw new Error(content?.message ?? content);
    }
  }
};

export default deleteTask;
