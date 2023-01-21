import './styles/Sidebar.css'
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import NestedList from './NestedList';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

export default function MiniDrawer({ openSidebar, setOpenSidebar }) {
    const sections = JSON.parse(localStorage.getItem("sections")) || [];

    return (
      <Drawer className='Sidebar' variant="permanent" open={openSidebar} >
        <List sx={{ width: openSidebar ? '250px' : 'var(--closeSidebarWidth)' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="h1" id="nested-list-subheader" style={{ color: '#3C4043', marginLeft: '-12px', fontSize: '16px', fontWeight: 'bold' }}>
                        {lang.costCenter}
                    </ListSubheader>
                }
        >
            <div className='ItensContainer'>
                {Array.from(sections).map((section, index) => (
                    <NestedList key={index} section={section} setOpenSidebar={setOpenSidebar}/>
                ))}
            </div>
            <div style={{ position: 'absolute', bottom: '20px', left: '60px' }}>
                <img src={process.env.REACT_APP_LOGO} alt="Logo" style={{ maxWidth: '150px'}} />
            </div>
        </List>
      </Drawer>
  );
}