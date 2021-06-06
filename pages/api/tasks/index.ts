import { proxy } from '../../../api_lib';

const endpoint = `/tasks`;

async function proxyTasksEndpoint(req, res) {
  await proxy(endpoint, req, res);
}

export default proxyTasksEndpoint;
