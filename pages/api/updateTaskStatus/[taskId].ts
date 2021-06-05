import { proxy, runCorsMiddleware } from '../../../api_lib';

const baseUrl = 'http://localhost:3000';

async function updateTaskStatus(req, res) {
  await runCorsMiddleware(req, res);

  const { taskId } = req.query;

  const endpoint = `/tasks/${taskId}/status`;

  await proxy(baseUrl, endpoint, req, res);
}

export default updateTaskStatus;
