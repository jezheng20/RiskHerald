import { useRouter } from 'next/router';
import { Button } from "@chakra-ui/react";
import { fetchData, getPropsServerSide } from "../fetchUtils.js";
import { useState } from "react";
import opencage from "opencage-api-client";


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
        <div>
            {data.stuff}
            <Button onClick={refreshData}>
                REFRESH
            </Button>
        </div>
    );
};

export default index;

export const getServerSideProps = async () => {
    return getPropsServerSide();
};
