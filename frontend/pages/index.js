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
import 'react-pro-sidebar/dist/css/styles.css';

const index = ({ }) => {
    return (
        <ProSidebar breakpoint='sm'>
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
                  }}
                >
                Risk Evaluation
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                  <MenuItem
                    icon={<FaHome />}
                  >Home
                  </MenuItem>
                  <MenuItem icon={<FaLocationArrow />}>Map</MenuItem>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
}; 
export default index;
