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
import Aside from './Aside'


const Layout = ({ children }) => {
    return (
        <div>
        	<HStack spacing = '200px'>
        	<Aside/>
            {children}
            </HStack>
        </div>
    );
};

export default Layout;

