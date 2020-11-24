import url from '../constants/url'
export default async () => {
    let res = await fetch(url + '/api/data').then(data => data.json()).then(data => data)
    let data = res.data
    for (let entry of data.features) {
        await fetch(
            `https://api.mapbox.com/datasets/v1/michaeleliot/${process.env.MapboxDataSetID}/features/${entry.id}?access_token=${process.env.MapboxAccessToken}`,
            {
                method: 'PUT',
                body: JSON.stringify(entry)
            }
        )
    }
    return Promise.resolve({ updated: true });
}