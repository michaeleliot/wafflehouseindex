import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Map from '../components/map';
import React from 'react';
import TopBar from '../components/topbar';
import About from '../components/about';
import url from '../constants/url';

export default function Home({ token, data }) {
  console.log(data);
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

export async function getServerSideProps() {
  let res = await fetch(url + '/api/data')
    .then((data) => data.json())
    .then((data) => data);
  let data = res.data;
  return {
    props: {
      token: process.env.MapboxAccessToken,
      data,
    },
  };
}
