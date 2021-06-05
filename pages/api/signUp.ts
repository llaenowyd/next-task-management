import { runCorsMiddleware } from '../../api_lib';

const baseUrl = 'http://localhost:3000';
const endpoint = '/auth/signup';

async function signUp(req, res) {
  await runCorsMiddleware(req, res);

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    body: req.body,
    headers: { 'Content-Type': 'application/json' },
  });

  res.status(response.status);

  if (response.ok) {
    res.json('');
  } else {
    const content = await response.json();
    res.json(content);
  }
}

export default signUp;
