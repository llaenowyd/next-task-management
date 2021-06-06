import { proxy } from '../../api_lib';

const endpoint = '/auth/signin';

async function signin(req, res) {
  await proxy(endpoint, req, res);
}

export default signin;
