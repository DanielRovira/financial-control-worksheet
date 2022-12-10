import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from "react-pro-sidebar";
import { useClickAway } from 'react-use';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import data from '../../config.json'

function Sidebarr() {
    const sidebar = useRef(null);
    const { collapseSidebar } = useProSidebar();

    useClickAway(sidebar, collapseSidebar);
    return (
        <div style={{ display: 'flex', height: '100%', position: 'absolute' }}>
            <Sidebar
                ref={sidebar}
                defaultCollapsed
                collapsedWidth="80px"
                backgroundColor="white"
            >
                <IconButton
                    onClick={() => collapseSidebar()}
                    size="large"
                    color="inherit"
                    style={{ marginTop: '60px' }}
                >
                    <MenuIcon />
                </IconButton>
                <h1>Obras</h1>
                <Menu>
                    {data.sections.map((task) => (
                        <SubMenu label={task.title} key={task.title}>
                            <MenuItem onClick={collapseSidebar} routerLink={<Link to={`/financial-control/${task.title}`} />}>Controle Financeiro</MenuItem>
                            <MenuItem routerLink={<Link to="/" />}>Pagamentos a fazer</MenuItem>
                        </SubMenu>
                    ))}
                </Menu>
            </Sidebar>
        </div>
    );
}

export default Sidebarr;