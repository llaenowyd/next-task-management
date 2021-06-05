import { runCorsMiddleware } from '../../api_lib';

import qs from 'query-string';

const baseUrl = 'http://localhost:3000';
const endpoint = '/tasks';

async function fetchTasks(req, res) {
  await runCorsMiddleware(req, res);

  const queryString = qs.stringify(req.query);

  const search = queryString ? `?${queryString}` : '';

  const response = await fetch(`${baseUrl}${endpoint}${search}`, {
    headers: { ['Authorization']: req.headers.authorization },
  });

  if (!response.ok) {
    res.status(response.status);
    res.json(await response.json());
  } else {
    res.json(await response.json());
  }
}

export default fetchTasks;
