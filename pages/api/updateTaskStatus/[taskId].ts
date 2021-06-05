import { runCorsMiddleware } from '../../../api_lib';

const baseUrl = 'http://localhost:3000';

async function updateTaskStatus(req, res) {
  await runCorsMiddleware(req, res);

  const { taskId } = req.query;

  const endpoint = `/tasks/${taskId}/status`;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: req.headers,
    method: req.method,
    body: JSON.stringify(req.body),
  });

  const content = await (res.headers?.['Content-Type']?.startsWith(
    'application/json',
  )
    ? response.json()
    : response.text());

  if (!response.ok) {
    res.status(response.status);
  }

  res.json(content);
}

export default updateTaskStatus;
