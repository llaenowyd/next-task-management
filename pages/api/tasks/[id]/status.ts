import { proxy } from '../../../../api_lib';

async function updateTaskStatus(req, res) {
  const { id } = req.query;

  const endpoint = `/tasks/${id}/status`;

  await proxy(endpoint, req, res);
}

export default updateTaskStatus;
