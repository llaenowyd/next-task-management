import { runCorsMiddleware } from '../../api_lib';

const baseUrl = 'http://localhost:3000';
const endpoint = '/auth/signin';

async function signIn(req, res) {
  await runCorsMiddleware(req, res);

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    body: req.body,
    headers: { 'Content-Type': 'application/json' },
  });

  const content = await response.json();

  if (!response.ok) {
    res.status(response.status);
  }

  res.json(content);
}

export default signIn;
