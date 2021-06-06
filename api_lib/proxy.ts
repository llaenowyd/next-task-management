import qs from 'query-string';
import runCorsMiddleware from './runCorsMiddleware';

const apiUrl = process.env.API_URL;
const apiHost = process.env.API_HOST;

const proxy = async (endpoint, req, res) => {
  await runCorsMiddleware(req, res);

  let search = '';
  let body;

  if (req.method === 'GET') {
    const queryString = qs.stringify(req.query);

    if (queryString) {
      search = `?${queryString}`;
    }
  } else {
    body = JSON.stringify(req.body);
  }

  const response = await fetch(`${apiUrl}${endpoint}${search}`, {
    headers: { ...req.headers, host: apiHost },
    method: req.method,
    body,
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
};

export default proxy;
