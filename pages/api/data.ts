// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  res.statusCode = 200;
  //Pull in the data
  //Go through each data point see if it has updated in mapbox
  // If it has push it. If it doesn't exist create it
  const formatData = (locations) => {
    const newFeaturesList = [];
    for (let location of locations) {
      const {
        id,
        lat,
        lng,
        name,
        is_temporarily_closed,
        address,
        city,
        state,
      } = location;
      let status = 'Bad';
      if (is_temporarily_closed == null) {
        status = 'Good';
      } else if (is_temporarily_closed == 0) {
        status = 'Medium';
      }
      newFeaturesList.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [Number(lng), Number(lat)],
        },
        properties: {
          id,
          name: name,
          location: address + ', ' + city + ', ' + state,
          status,
        },
      });
    }
    return {
      type: 'FeatureCollection',
      features: newFeaturesList,
    };
  };
  let results = await fetch(
    'https://wafflehouse.locally.com/stores/conversion_data?has_data=true&company_id=117995&map_distance_diag=99999999',
  ).then((data) => data.json());
  let waffleHouses = results.markers;
  let data = formatData(waffleHouses);
  res.json({ data });
};
