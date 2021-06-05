import Cors from 'cors';
import runMiddleware from './runMiddleware';

// Initializing the runCorsMiddleware middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

const runCorsMiddleware = (req, res) => runMiddleware(req, res, cors);

export default runCorsMiddleware;
