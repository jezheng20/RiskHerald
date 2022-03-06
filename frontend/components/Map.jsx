import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from "react";
import { fetchData } from "../fetchUtils.js";
import opencage from "opencage-api-client";
import threatAss from "../threat_assessments_beautified.json"

const OPENCAGE_API_KEY = "2f2f1fcf0142404dabaf6fac0eb1ba06";

const blue_icon = L.icon({ iconUrl: "/images/marker-icon-blue.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

const red_icon = L.icon({ iconUrl: "/images/marker-icon-red.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

const yellow_icon = L.icon({ iconUrl: "/images/marker-icon-yellow.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

const green_icon = L.icon({ iconUrl: "/images/marker-icon-green.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

const black_icon = L.icon({ iconUrl: "/images/marker-icon-black.png", 
    iconSize: [25,41], iconAnchor: [12,41]});


async function getCoordsOfCity(city) {
    console.log(city)
    await opencage
        .geocode({ q: city + ", Ukraine", key: OPENCAGE_API_KEY })
        .then((data) => {
            if (data.results.length > 0) {
                const place = data.results[0];
                return [place.geometry.lat, place.geometry.lng];
            } else {
                console.log("NOT VALID CITY");
                console.log('Status', data.status.message);
                return [0, 0];
            }
        });
}

function createPopup(position, threat_level, info='') {
    var icon = blue_icon;
    if (threat_level == 'HIGH LEVEL') {
        icon = red_icon;
    } else if (threat_level == 'MED LEVEL') {
        icon = yellow_icon;
    } else if (threat_level == "LOW LEVEL") {
        icon = green_icon;
    } else {
        icon = black_icon;
    }
    return (
        <Marker position={position} icon={icon}>
            <Popup>
                {threat_level}
            </Popup>
        </Marker>
    );
}

const cleanUp = async () => {
    const newData = [];
    for (let i = 0; i < threatAss.length; ++i) {
        const curr = threatAss[i];
        if (curr["Possible location"] != "LOCATION NOT FOUND") {
            newData.push([curr["Possible location"], curr["Threat message"]]);
        }
        // const coords = await getCoordsOfCity(curr["Possible location"]);
        // newData.push([coords, curr["Threat message"]]);
    }
    console.log(newData);
    return newData;
}

//Create sample list of entries
var arr = [];
for (let i = 0; i < 5; i++) {
    var pos = [Math.random()*180-90, Math.random()*360-180];
    var a = createPopup(pos, 'HIGH LEVEL', '');
    arr.push(a);
}

function mapCoords() {
    for(let i = 0; i < list_of_coords.length; i++) {
        createPopup();
    }
}

const Map = () => {
    // {console.log(2)}
    // {console.log(threatAss)}
    const [pos, setPos] = useState([0, 0]);
    const [newData, setNewData] = useState([]);

    if (typeof window !== "undefined") {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((currPos) => {
                setPos([currPos.coords.latitude, currPos.coords.longitude]);
            });
        }
    }

    // useEffect(async () => {
    //     let res = await cleanUp();
    //     let simp = [];
    //     // for (let i = 0; i < res.length; ++i) {
    //     //     if (res[i]
    //     // }
    //     setNewData(res);
    // }, []);

    return (
        <MapContainer center={[49, 32]} zoom={6} scrollWheelZoom={true} style={{height: "100vh", width: "100%"}}>
            {/*console.log(await getCoordsOfCity("Kyiv"))*/}
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* {arr} */}
            {createPopup([50.4501, 30.5234], "HIGH LEVEL")}
            {createPopup([50.301, 30.5234], "HIGH LEVEL")}
            {createPopup([50.504, 30.9], "MED LEVEL")}
            {createPopup([50.4, 30.52], "MED LEVEL")}
            {createPopup([49.9935, 36.2304], "MED LEVEL")}
            {createPopup([49.58, 36.2304], "HIGH LEVEL")}
            {createPopup([43.4130, 34.2993], "MED LEVEL")}
            {createPopup([44, 34.2993], "MED LEVEL")}
            {createPopup([45.9432, 24.9668], "LOW LEVEL")}
            {createPopup([51.1657, 10.4515], "LOW LEVEL")}
            {createPopup(pos, null)}
            {/* {console.log("HEREE")} */}
            {/* {newData.map((pos, threat) => { */}
            {/*     console.log("HIHI"); */}
            {/*     return createPopup(pos, threat); */}
            {/* })} */}

        </MapContainer>
    )
}

export default Map;

// export const getStaticProps = async () => {
//     // const THREAT_ASS_PATH = "../threat_assessments_beautified.json";
//     // const threatAss = JSON.parse(readFileSync(THREAT_ASS_PATH));
//     const API = "http://127.0.0.1:5000/static_json";
//     const res = await fetch(API, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         },
//     });
//     console.log(res);
//     const data = await res.json();
//     const threatAss = data.data;
//     console.log("DATA: ", data);

//     console.log(2);
//     console.log(threatAss);
//     console.log(1);

//     return {
//         props: { threatAss }
//     };
// };
