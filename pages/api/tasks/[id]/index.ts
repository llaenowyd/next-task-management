import { proxy } from '../../../../api_lib';

const baseUrl = 'http://localhost:3000';

async function proxyTaskEndpoint(req, res) {
  const { id } = req.query;

  const endpoint = `/tasks/${id}`;

  await proxy(endpoint, req, res);
}

export default proxyTaskEndpoint;
