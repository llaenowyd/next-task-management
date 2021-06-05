import { proxy } from '../../api_lib';

const baseUrl = 'http://localhost:3000';
const endpoint = '/auth/signin';

async function signin(req, res) {
  await proxy(baseUrl, endpoint, req, res);
}

export default signin;
