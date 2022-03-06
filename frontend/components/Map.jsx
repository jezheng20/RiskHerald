import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from "react";
import { fetchData } from "../fetchUtils.js";

const blue_icon = L.icon({ iconUrl: "/images/marker-icon-blue.png", 
  iconSize: [25,41], iconAnchor: [12,41]});

const red_icon = L.icon({ iconUrl: "/images/marker-icon-red.png", 
  iconSize: [25,41], iconAnchor: [12,41]});

const yellow_icon = L.icon({ iconUrl: "/images/marker-icon-yellow.png", 
  iconSize: [25,41], iconAnchor: [12,41]});

const green_icon = L.icon({ iconUrl: "/images/marker-icon-green.png", 
  iconSize: [25,41], iconAnchor: [12,41]});

function getCoordsOfCity(address) {
  //TODO: Use geocoding API to get coords

  return [x,y];
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
  return (
    <Marker position={position} icon={icon}>
      <Popup>
        {threat_level}
      </Popup>
    </Marker>
  )
}

//Create sample list of entries
var arr = [];
for (let i = 0; i < 5; i++) {
  var pos = [Math.random()*180-90, Math.random()*360-180];
  var a = createPopup(pos, 'HIGH LEVEL', '');
  arr.push(a);
}

function mapCoords() {
  let arr
  for(let i = 0; i < list_of_coords.length; i++) {
    createPopup();
  }
}

const Map = () => {
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
