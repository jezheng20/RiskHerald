import { useRouter } from 'next/router';
import { Button } from "@chakra-ui/react";
import { fetchData, getPropsServerSide } from "../fetchUtils.js";

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

export const getServerSideProps = async () => {
    return getPropsServerSide();
};
