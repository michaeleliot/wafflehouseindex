import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Map from '../components/map';
import React from 'react';
import TopBar from '../components/topbar';
import About from '../components/about';
import fs from 'fs'

export default function Home({ token, data }) {
  const green = data.features.filter(
    (location) => location.properties.status == 'Good',
  ).length;
  const yellow = data.features.filter(
    (location) => location.properties.status == 'Medium',
  ).length;
  const red = data.features.filter(
    (location) => location.properties.status == 'Bad',
  ).length;
  let [route, setRoute] = React.useState('Home');

  return (
    <React.Fragment>
      <Head>
        <title>Waffle House Index</title>
        <meta property="og:title" content="Waffle House Index" key="title" />
      </Head>
      <TopBar set={setRoute} />
      {route == 'Home' ? (
        <div className={styles.container}>
          <h1 className="sm:text-5xl text-3xl">Live Waffle House Index</h1>
          <div className="flex gap-5 justify-between">
            <h5 className="text-2xl text-green-400">Green: {green}</h5>
            <h5 className="text-2xl text-yellow-400">Yellow: {yellow}</h5>
            <h5 className="text-2xl text-red-400">Red: {red}</h5>
          </div>
          <Map authToken={token} />
        </div>
      ) : (
          <About />
        )}
    </React.Fragment>
  );
}

export async function getStaticProps(context) {
  // const formatData = (locations) => {
  //   const newFeaturesList = [];

  //   for (let location of locations) {
  //     const { id, lat, lng, name, is_temporarily_closed, address, city, state } = location;
  //     let status = 'Bad';
  //     if (is_temporarily_closed == null) {
  //       status = 'Good';
  //     } else if (is_temporarily_closed == 0) {
  //       status = 'Medium';
  //     }
  //     newFeaturesList.push({
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [Number(lng), Number(lat)],
  //       },
  //       properties: {
  //         id,
  //         name: name,
  //         location: address + ", " + city + ", " + state,
  //         status,
  //       },
  //     });
  //   }
  //   return {
  //     type: 'FeatureCollection',
  //     features: newFeaturesList,
  //   };
  // };
  // let results = await fetch(
  //   'https://wafflehouse.locally.com/stores/conversion_data?has_data=true&company_id=117995&map_distance_diag=99999999',
  // ).then((data) => data.json());
  // let waffleHouses = results.markers;
  // let data = formatData(waffleHouses);
  // fs.writeFile('wafflehouse.json', JSON.stringify(data), 'utf8', () => null);

  let api = `https://api.mapbox.com/datasets/v1/michaeleliot/${process.env.MapboxDataSetID}/features?access_token=${process.env.MapboxAccessToken}`
  let data = await fetch(api).then(data => data.json())
  console.log(data)
  return {
    props: {
      token: process.env.MapboxAccessToken,
      data,
    },
  };
}
