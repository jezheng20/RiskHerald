import { fetchData, getPropsServerSide } from "../fetchUtils.js";
import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";

const evaluate = ({ }) => {
    const [input, setInput] = useState("");
    const [data, setData] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const onClick = async () => {
        console.log("HERE")
        const res = await fetch('http://127.0.0.1:5000/threat_ass_demand', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ "input": input })
        });
        let json = await res.json();
        let dt = json.data;
        console.log(dt["Possible times"]);
        setData("Possible attack at " + dt['Possible location'] + (dt["Possible times"] != "TIME NOT FOUND" ? " at " + dt['Possible times'][0] : "") + " with " + dt['Threat message']);
    };

    return (
        <>
            <div className = "indexBack"></div>
            <div className = "indexMain" style={{
                textAlign: 'center'
            }}>
                <div style = {{
                    textAlign: "center",
                    marginBottom: "10px",
                    paddingLeft: "30%",
                    width: '70%'
                }}>
                    <h1>Evaluate article</h1>
                    <Button onClick={onClick} id='searchButton'>Run</Button><Input onChange={handleChange} id='searchBar' type='text' placeholder='Enter URL...'></Input>
                </div>
                <div id="codeConsole">
                    {data}
                </div>
            </div>
        </>
    );
};

export default evaluate;

export const getServerSideProps = async () => {
    return getPropsServerSide();
};
