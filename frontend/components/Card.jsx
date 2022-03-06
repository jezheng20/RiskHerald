import React, { useState } from 'react';
import { FiAlertTriangle, GiPerson } from "react-icons/fi";

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaUser, FaHome, FaLocationArrow, FaSistrix } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';


const LinkCard = (props) => {
    return (
        <div className = "cardBody">
            {props.name}<br/>
            <a href={props.link} style = {{color: "blue"}}>View in Map</a>
            <div style={{float:'right'}}>Distance: {props.distance}</div>
        </div>
    );
};

export default LinkCard;