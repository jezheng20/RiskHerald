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
import { FaUser, FaHome, FaLocationArrow, FaSistrix } from 'react-icons/fa';
import sidebarBg from './assets/bg1.jpg';
import 'react-pro-sidebar/dist/css/styles.css';
import { HStack, Box, useColorModeValue } from "@chakra-ui/react";
import NextLink from 'next/link';


const NavBar = () => {
    return (
        <div style={{
            height: '100%',
            width: '200px',
            position: 'fixed',
            zIndex:1,
            top: '0%',
            left: '0',
            backgroundColor: '#111',
            overflowX: 'hidden'
        }}>
        <ProSidebar>
            <SidebarHeader>
	            <div
	                style={{
	                padding: '18px',
	                fontWeight: 'bold',
	                fontSize: 20,
	                letterSpacing: '1px',
	                overflow: 'hidden',
	                textOverflow: 'ellipsis',
	                whiteSpace: 'nowrap',
	                }}>
	            Risk Evaluation
	            </div>
            </SidebarHeader>
            <Menu iconShape="square">
                <NextLink href={"/"} passHref>
                    <MenuItem icon={<FaHome />}>Home</MenuItem>
                </NextLink>
                <NextLink href={"/map"} passHref>
                    <MenuItem icon={<FaLocationArrow />}>Map</MenuItem>
                </NextLink>
                <NextLink href={"/scan_risk"} passHref>
                    <MenuItem icon={<FaSistrix />}>Scan Risk</MenuItem>
                </NextLink>
                <NextLink href={"/near_me"} passHref>
                    <MenuItem icon={<FaUser />}>Near Me</MenuItem>
                </NextLink>
            </Menu>
        </ProSidebar>
        </div>

    );
};

export default NavBar;

