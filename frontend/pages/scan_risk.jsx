import { fetchData, getPropsServerSide } from "../fetchUtils.js";

const evaluate = ({ }) => {
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
                <h1>Evaluate article</h1>
                <button id='searchButton'>Run</button><input id='searchBar' type='text' placeholder='URL'></input>
            </div>
        </div>
        </>
    );
};

export default evaluate;

export const getServerSideProps = async () => {
    return getPropsServerSide();
};
