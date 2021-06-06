import { proxy } from '../../api_lib';

const endpoint = '/auth/signup';

async function signup(req, res) {
  await proxy(endpoint, req, res);
}

export default signup;
