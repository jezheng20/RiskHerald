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
import { HStack } from "@chakra-ui/react";
import NextLink from 'next/link';

const Layout = ({ children }) => {
    // const intl = useIntl();
    return (
        <HStack>
            <ProSidebar
                breakPoint="md"
            >
                <Menu iconShape="square">
                    <NextLink href={"/"} passHref>
                        <MenuItem icon={<FaGem />}>Home</MenuItem>
                    </NextLink>
                    <NextLink href={"/map"} passHref>
                        <MenuItem>Map</MenuItem>
                    </NextLink>
                </Menu>
            </ProSidebar>
            {children}
        </HStack>
    );
};

export default Layout;

