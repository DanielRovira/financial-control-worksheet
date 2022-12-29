import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { useClickAway } from 'react-use';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

function Sidebarr({ accName }) {
    const sidebar = useRef(null);
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    const { collapseSidebar, collapsed } = useProSidebar();
    useClickAway(sidebar, collapseSidebar);
    return (
        <div style={{ display: 'flex', height: '100%', position: 'absolute' }}>
            <Sidebar
                ref={sidebar}
                // defaultCollapsed
                collapsedWidth='80px'
                backgroundColor='white'
            >
                <IconButton
                    onClick={() => collapseSidebar()}
                    size='large'
                    color='inherit'
                    style={{ margin: '70px 0 0 15px' }}
                >
                    <MenuIcon />
                </IconButton>
                <Menu>
                    {Array.from(sections).map((section) => (
                        <SubMenu label={section.name} key={section.title} title={section.name}>
                            <MenuItem onClick={() => {localStorage.setItem('sheetType', lang.financialControl); !collapsed && collapseSidebar() }} routerLink={<Link to={`/financial-control/${section.title}`} />}>{lang.financialControl}</MenuItem>
                            <MenuItem onClick={() => {localStorage.setItem('sheetType', lang.todoPayments); !collapsed && collapseSidebar() }} routerLink={<Link to={`/financial-todos/${section.title}`} />}>{lang.todoPayments}</MenuItem>
                        </SubMenu>
                    ))}
                </Menu>
                <div style={{height: '100%', maxHeight: '50vh', display: 'flex', alignItems: 'flex-end', paddingLeft: '10px' }}>
                    <h3>{accName}</h3>
                </div>
            </Sidebar>
        </div>
    );
}

export default Sidebarr;