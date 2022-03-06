import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from "react";
import { fetchData } from "../fetchUtils.js";

const OPENCAGE_API_KEY = "2f2f1fcf0142404dabaf6fac0eb1ba06";

const blue_icon = L.icon({ iconUrl: "/images/marker-icon-blue.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

const red_icon = L.icon({ iconUrl: "/images/marker-icon-red.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

const yellow_icon = L.icon({ iconUrl: "/images/marker-icon-yellow.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

const green_icon = L.icon({ iconUrl: "/images/marker-icon-green.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

async function getCoordsOfCity(address) {
    await opencage
        .geocode({ q: city, key: OPENCAGE_API_KEY })
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
    } else {
        icon = green_icon;
    }
    ++id;
    return (
        <Marker position={position} icon={icon}>
            <Popup>
                {threat_level}
            </Popup>
        </Marker>
    );
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
    const [pos, setPos] = useState([0, 0]);

    if (typeof window !== "undefined") {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((currPos) => {
                setPos([currPos.coords.latitude, currPos.coords.longitude]);
            });
        }
    }
    return (
        <MapContainer center={[49, 32]} zoom={6} scrollWheelZoom={true} style={{height: "100vh", width: "100%"}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {arr}
        </MapContainer>
    )
}

export default Map;
