import { drainContent } from './util';

const updateTaskStatus = (accessToken, handle401) => async (taskId, status) => {
  const apiEndpoint = `/api/tasks/${taskId}/status`;

  const res = await fetch(apiEndpoint, {
    method: 'PATCH',
    headers: {
      ['Authorization']: `Bearer ${accessToken}`,
      ['Content-Type']: 'application/json',
    },
    body: JSON.stringify({ status }),
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

export default updateTaskStatus;
