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

function createCard(pos, name)  {
    let link = "https://www.google.com/maps/place/" + pos[0] + "," + pos[1];
    return (
        <Card name={name} link={link} distance={Math.round(Math.random()*2300)/100}></Card>
    );
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
                {arr}
            </div>
        </div>
        </>
    );
};

export default index;

export const getServerSideProps = async () => {
    return getPropsServerSide();
};
