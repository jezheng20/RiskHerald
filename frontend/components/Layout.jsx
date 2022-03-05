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
import { FaUser, FaHome, FaLocationArrow } from 'react-icons/fa';
import sidebarBg from './assets/bg1.jpg';
import 'react-pro-sidebar/dist/css/styles.css';
import { HStack, Box, useColorModeValue } from "@chakra-ui/react";
import NextLink from 'next/link';

const Layout = ({ children }) => {
    return (
        <HStack spacing='0px'>
            <ProSidebar
                breakPoint="md"
                >
                <SidebarHeader>
	                <div
	                  style={{
	                    padding: '24px',
	                    fontWeight: 'bold',
	                    fontSize: 14,
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
                    <NextLink href={"/"} passHref>
                        <MenuItem icon={<FaUser />}>Near Me</MenuItem>
                    </NextLink>
                </Menu>
            </ProSidebar>

            {children}
        </HStack>
    );
};

export default Layout;

