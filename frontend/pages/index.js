import React from 'react';
import { useIntl } from 'react-intl';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
// import sidebarBg from './assets/bg2.jpg';
import 'react-pro-sidebar/dist/css/styles.css';

const index = ({ }) => {
    // const intl = useIntl();
    return (
        <ProSidebar
            breakPoint="md"
        >
            <Menu iconShape="square">
                <MenuItem icon={<FaGem />}>Home</MenuItem>
                <MenuItem>Map</MenuItem>
            </Menu>
        </ProSidebar>
    );
};

export default index;
