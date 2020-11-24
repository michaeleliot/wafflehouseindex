import Queue from 'bull'
import refreshJob from './job'

const refreshQueue = new Queue('refreshQueue', process.env.REDIS_URL);

refreshQueue.process(refreshJob);

export default refreshQueue;