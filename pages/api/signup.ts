import { proxy } from '../../api_lib';

const baseUrl = 'http://localhost:3000';
const endpoint = '/auth/signup';

async function signup(req, res) {
  await proxy(baseUrl, endpoint, req, res);
}

export default signup;
