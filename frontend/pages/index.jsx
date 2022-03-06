import { useRouter } from 'next/router';
import { Button } from "@chakra-ui/react";

const index = ({ data }) => {
    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
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

const fetchData = async () => {
    const API = "http://127.0.0.1:5000/";
    const res = await fetch(API, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
    });
    const data = await res.json();
    return data;
};

export const getServerSideProps = async () => {
    const data = await fetchData();
    return {
        props: {
            data
        }
    }
};
