import { drainContent } from './util';

const baseUrl = 'http://localhost:3001';

const updateTaskStatus = async (accessToken, taskId, status, handle401) => {
  const apiEndpoint = `/api/tasks/${taskId}/status`;

  const res = await fetch(`${baseUrl}${apiEndpoint}`, {
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
