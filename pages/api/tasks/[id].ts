import { proxy, runCorsMiddleware } from '../../../api_lib';

const baseUrl = 'http://localhost:3000';

async function proxyTaskEndpoint(req, res) {
  await runCorsMiddleware(req, res);

  const { id } = req.query;

  const endpoint = `/tasks/${id}`;

  await proxy(baseUrl, endpoint, req, res);
}

export default proxyTaskEndpoint;
