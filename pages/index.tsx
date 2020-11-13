import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Map from '../components/map'
export default function Home(props) {
  return (
    <div className={styles.container}>
      <Map data={props.waffleHouses} authToken={props.token} />
    </div>
  );
}

export async function getStaticProps(context) {
  let results = await fetch("https://wafflehouse.locally.com/stores/conversion_data?has_data=true&company_id=117995&map_distance_diag=99999999").then(data => data.json())
  let waffleHouses = results.markers
  console.log(waffleHouses)
  return {
    props: {
      waffleHouses,
      token: process.env.MapboxAccessToken
    }
  }
}

