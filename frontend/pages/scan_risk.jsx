import { fetchData, getPropsServerSide } from "../fetchUtils.js";

const evaluate = ({ }) => {
    return (
        <div>
            run model on url
        </div>
    );
};

export default evaluate;

export const getServerSideProps = async () => {
    return getPropsServerSide();
};
