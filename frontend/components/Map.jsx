import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from "react";

const blue_icon = L.icon({ iconUrl: "/images/marker-icon-blue.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

const red_icon = L.icon({ iconUrl: "/images/marker-icon-red.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

const yellow_icon = L.icon({ iconUrl: "/images/marker-icon-yellow.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

const green_icon = L.icon({ iconUrl: "/images/marker-icon-green.png", 
    iconSize: [25,41], iconAnchor: [12,41]});

function getCoordsOfCity(city) {
    //TODO: Use geocoding API to get coords

    return [x,y];
}

function createPopup(position, threat_level, info) {
    var color = 'green';

    //TODO: Use threat level to determine icon (see above)

    return (
        <Marker position={position}>
            <Popup>
                {threat_level}
            </Popup>
        </Marker>
    );
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
            //TODO: Add marker support
        </MapContainer>
    );
};

export default Map;
