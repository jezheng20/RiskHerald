import React, { useState } from 'react';

const LinkCard = (props) => {
    return (
        <div className = "cardBody">
            {props.name}<br/>
            <a href={props.link} style = {{
                fontColor: "blue"}}>View in Map</a><br/>
            {props.distance} km away
        </div>
    );
};

export default LinkCard;

