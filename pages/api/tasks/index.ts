import { proxy } from '../../../api_lib';

const baseUrl = 'http://localhost:3000';
const endpoint = `/tasks`;

async function proxyTasksEndpoint(req, res) {
  await proxy(baseUrl, endpoint, req, res);
}

export default proxyTasksEndpoint;
