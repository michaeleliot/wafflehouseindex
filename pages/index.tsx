import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Map from '../components/map';
import fs from 'fs'

export default function Home({ token }) {
  return (
    <div className={styles.container}>
      <Map authToken={token} />
      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
}

export async function getStaticProps(context) {
  const formatData = locations => {
    const newFeaturesList = [];
    for (let location of locations) {
      const { id, lat, lng, name, is_temporarily_closed } = location;
      let status = "Bad"
      if (is_temporarily_closed == null) {
        status = "Good"
      } else if (is_temporarily_closed == 0) {
        status = "Medium"
      }
      newFeaturesList.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [Number(lng), Number(lat)]
        },
        properties: {
          id,
          name: name,
          description: `description for Waffle House #${id}`,
          status,
        }
      });
    }
    return {
      type: "FeatureCollection",
      features: newFeaturesList
    };
  };
  // let results = await fetch(
  //   'https://wafflehouse.locally.com/stores/conversion_data?has_data=true&company_id=117995&map_distance_diag=99999999',
  // ).then((data) => data.json());
  // let waffleHouses = results.markers;
  // let data = formatData(waffleHouses);
  // fs.writeFile('wafflehouse.json', JSON.stringify(data), 'utf8', () => null);

  return {
    props: {
      token: process.env.MapboxAccessToken,
    },
  };
}
