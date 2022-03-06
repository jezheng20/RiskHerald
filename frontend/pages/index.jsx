import { useRouter } from 'next/router';
import { Button } from "@chakra-ui/react";
import { fetchData, getPropsServerSide } from "../fetchUtils.js";
import { useState } from "react";
import opencage from "opencage-api-client";
import Card from "../components/Card"

const OPENCAGE_API_KEY = "2f2f1fcf0142404dabaf6fac0eb1ba06";

async function getCoordsOfCity(city) {
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

const stuff = [
    [[50.4501, 30.5234], "HIGH LEVEL"],
    [ [50.301, 30.5234], "HIGH LEVEL" ],
    [ [49.58, 36.2304], "HIGH LEVEL" ],
    [ [50.504, 30.9], "MED LEVEL" ],
    [ [50.4, 30.52], "MED LEVEL" ],
    [ [49.9935, 36.2304], "MED LEVEL" ],
    [ [43.4130, 34.2993], "MED LEVEL" ],
    [ [44, 34.2993], "MED LEVEL" ],
    [ [45.9432, 24.9668], "LOW LEVEL" ],
    [ [51.1657, 10.4515], "LOW LEVEL" ]
];

function createCard(pos, name, dist)  {
    let link = "https://www.google.com/maps/place/" + pos[0] + "," + pos[1];
    return (
        <Card name={name} link={link} distance={dist}></Card>
    );
}

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return Math.round(12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
}

const newCard = (loc, threat, loc2) => {
    console.log(threat);
    return createCard(loc, threat, distance(loc[0], loc[1], loc2[0], loc2[1]) + "mi");
}

//Create sample list of entries
var arr = [];
for (let i = 0; i < 10; i++) {
    var pos = [Math.random()*180-90, Math.random()*360-180];
    var a = createCard(pos, 'Location '+(i+1));
    arr.push(a);
}

const index = ({ data }) => {
    const router = useRouter();
    const [pos, setPos] = useState([0, 0]);

    const refreshData = () => {
        router.replace(router.asPath);
    }

    if (typeof window !== "undefined") {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((currPos) => {
                setPos([currPos.coords.latitude, currPos.coords.longitude]);
            });
        }
    }

    return (
        <>
        <div className = "indexBack"></div>
        <div className = "indexMain">
            <div style = {{
                    textAlign: "center",
                    marginBottom: "10px",
                    paddingLeft: "30%",
                    width: '70%'
                }}>
                <h1>Nearest Threats</h1>
                <button onclick = {refreshData}>REFRESH</button>
            </div>
            <div className = "scrollBar" style = {{
                    overflow: "scroll",
                    height: "80%",
                }}>
                {stuff.map(([loc, threat]) => {
                    return newCard(loc, threat, pos)
                })
                }
                
                
            </div>
        </div>
        </>
    );
};

export default index;

export const getServerSideProps = async () => {
    return getPropsServerSide();
};
