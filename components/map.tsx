import ReactDOM from "react-dom";
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Popup from "./popup";
import styles from '../styles/map.module.css'
//random-points-data

const Map = ({ authToken }) => {
    mapboxgl.accessToken = authToken;
    const mapContainerRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
    let [feature, setFeature] = React.useState(null)

    // initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-85.5795, 35.8283],
            zoom: 4
        });

        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        map.on("load", () => {
            map.loadImage('marker.png', function (error, image) {
                if (error) throw error;
                map.addImage('marker', image, { 'sdf': true });
                map.addSource("wafflehouse-data", {
                    'type': 'vector',
                    'url': 'mapbox://michaeleliot.ckhlo20gn05yj29mm432d2smz-3i5ip'
                });
                map.addLayer({
                    id: "wafflehouse-layer",
                    source: "wafflehouse-data",
                    'source-layer': "wafflehouse",
                    type: "symbol",
                    layout: {
                        "icon-image": "marker",
                        "icon-padding": 0,
                        "icon-allow-overlap": true,
                    },
                    paint: {
                        "icon-color": [
                            "match",
                            ['get', 'status'],
                            'Good', "#68d391",
                            'Medium', "#f6e05e",
                            "Bad", "#fc8181",
                            "#FFFFFF"
                        ]
                    }
                });
            })
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
                console.log(feature)
                setFeature(feature)
                // // create popup node
                // const popupNode = document.createElement("div");
                // ReactDOM.render(<Popup feature={feature} />, popupNode);
                // // set popup on map
                // let coordinates = [feature.geometry.coordinates[0], feature.geometry.coordinates[1]]
                // popUpRef.current
                //     .setLngLat(coordinates)
                //     .setDOMContent(popupNode)
                //     .addTo(map);
            }
        });

        // clean up on unmount
        return () => map.remove();
    }, []);

    return (
        <div>
            <div> {feature != null ? feature.properties.name + ", " + feature.properties.location : "Select a waffle house to see details!"} </div>
            <div className={styles.mapcontainer} ref={mapContainerRef} />
        </div>
    )
};

export default Map;