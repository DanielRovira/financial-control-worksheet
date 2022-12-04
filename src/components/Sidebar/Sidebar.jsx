import React, { useRef } from "react";
import {Link} from 'react-router-dom';
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from "react-pro-sidebar";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useClickAway} from 'react-use';


const Sidebarr = () => {
    const sidebar = useRef(null);
    const { collapseSidebar } = useProSidebar();

    const sections = [

        {
            title: "SES SJM",
        },
        {
            title: "PARNAMIRIM",
        },
        {
            title: "BREJO",
        },
        {
            title: "CAICÓ",
        }
    ]
    useClickAway(sidebar, collapseSidebar)
    return (
        <div style={{ display: 'flex', height: '100%', position: 'absolute' }}>
            <Sidebar
            ref={sidebar}
                defaultCollapsed
                collapsedWidth="50px"
                backgroundColor="white"
            >
                <IconButton
                    onClick={() => collapseSidebar()}
                    size="large"
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <h1>Obras</h1>
                <Menu>
                {sections.map((task) => (
                    <SubMenu label={task.title}>
                        <MenuItem onClick={collapseSidebar} routerLink={<Link to="/financial-control-worksheet" />}>Controle Financeiro</MenuItem>
                        <MenuItem routerLink={<Link to="/" />}>Pagamentos a fazer</MenuItem>
                    </SubMenu>
                     ))}
                </Menu>
            </Sidebar>
        </div>
    );
  };

export default Sidebarr;