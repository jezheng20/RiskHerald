import { useRouter } from 'next/router';
import { Button } from "@chakra-ui/react";
import { fetchData, getPropsServerSide } from "../fetchUtils.js";
import { useState } from "react";

const OPENCAGE_API_KEY = "2f2f1fcf0142404dabaf6fac0eb1ba06";

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
