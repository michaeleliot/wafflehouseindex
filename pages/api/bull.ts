import queue from '../../bull/queue'

export default async (req, res) => {
    res.statusCode = 200;
    let jobs = await queue.getJobCounts().then(res => res)
    queue.add({}, { repeat: { cron: '15 3 * * *' } })
    res.json({ jobs });
};