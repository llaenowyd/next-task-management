import { proxy } from '../../../../api_lib';

const baseUrl = 'http://localhost:3000';

async function updateTaskStatus(req, res) {
  const { id } = req.query;

  const endpoint = `/tasks/${id}/status`;

  await proxy(baseUrl, endpoint, req, res);
}

export default updateTaskStatus;
