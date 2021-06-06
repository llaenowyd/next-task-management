import { drainContent } from './util';

const deleteTask = (accessToken, handle401) => async (id) => {
  const apiEndpoint = `/api/tasks/${id}`;

  const res = await fetch(apiEndpoint, {
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
