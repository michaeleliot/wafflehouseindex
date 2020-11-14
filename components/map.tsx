import ReactDOM from "react-dom";
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Popup from "./popup";
import styles from '../styles/map.module.css'

//random-points-data

const formatData = locations => {
    const newFeaturesList = [];
    for (let location of locations) {
        const { id, lat, lng, name } = location;
        newFeaturesList.push({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [lng, lat]
            },
            properties: {
                id,
                name: name,
                description: `description for Waffle House #${id}`
            }
        });
    }
    return {
        type: "FeatureCollection",
        features: newFeaturesList
    };
};

const Map = ({ authToken, data }) => {
    mapboxgl.accessToken = authToken;
    const mapContainerRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    // initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-90.5795, 39.8283],
            zoom: 3
        });

        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        map.on("load", () => {
            map.addSource("wafflehouse-data", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: []
                }
            });
            map.getSource("wafflehouse-data").setData(formatData(data));
            map.addLayer({
                id: "wafflehouse-layer",
                source: "wafflehouse-data",
                type: "symbol",
                layout: {
                    // full list of icons here: https://labs.mapbox.com/maki-icons
                    "icon-image": "bakery-15",
                    "icon-padding": 0,
                    "icon-allow-overlap": true,
                },
                paint: {
                    "icon-color": " #ffffff"
                }
            });
        });

        map.on("mouseenter", "wafflehouse-layer", e => {
            if (e.features.length) {
                map.getCanvas().style.cursor = "pointer";
            }
        });

        map.on("mouseleave", "wafflehouse-layer", () => {
            map.getCanvas().style.cursor = "";
        });

        map.on("click", "wafflehouse-layer", e => {
            if (e.features.length) {
                const feature = e.features[0];
                // create popup node
                const popupNode = document.createElement("div");
                ReactDOM.render(<Popup feature={feature} />, popupNode);
                // set popup on map
                popUpRef.current
                    .setLngLat(feature.geometry.coordinates)
                    .setDOMContent(popupNode)
                    .addTo(map);
            }
        });

        // clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <div className={styles.mapcontainer} ref={mapContainerRef} />;
};

export default Map;