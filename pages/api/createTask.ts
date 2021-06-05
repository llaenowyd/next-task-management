import { proxy, runCorsMiddleware } from '../../api_lib';

const baseUrl = 'http://localhost:3000';
const endpoint = `/tasks`;

async function createTask(req, res) {
  await runCorsMiddleware(req, res);
  await proxy(baseUrl, endpoint, req, res);
}

export default createTask;
