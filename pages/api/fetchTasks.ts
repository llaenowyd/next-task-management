import runCorsMiddleware from '../../api_lib/runCorsMiddleware';

const baseUrl = 'http://localhost:3000';
const endpoint = 'tasks';

async function fetchTasks(req, res) {
  // Run the middleware
  await runCorsMiddleware(req, res);

  // Rest of the API logic
  const response = await fetch(`${baseUrl}/${endpoint}`, {
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
