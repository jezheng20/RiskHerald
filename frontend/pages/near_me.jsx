import { useState } from "react";
import opencage from "opencage-api-client";
import Card from "../components/Card";

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

const near_me = ({ }) => {
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
	            <h1>Shelters near me</h1>
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

export default near_me;
