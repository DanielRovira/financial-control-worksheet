import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import NestedList from './NestedList';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

export default function MiniDrawer({ open, setOpen }) {
    const sections = JSON.parse(localStorage.getItem("sections")) || [];

    return (
      <Drawer variant="permanent" open={open} >
        <List sx={{ height: '100vh', overflow: 'hidden', paddingTop: '70px', width: open ? '250px' : '65px', whiteSpace:'nowrap', transition: '.3s' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" style={{ color: 'black', marginLeft: '-12px', fontSize: '20px', fontWeight: 'bold' }}>
                        {lang.costCenter}
                    </ListSubheader>
                }
        >
            {Array.from(sections).map((section, index) => (
                <NestedList key={index} section={section} setOpen={setOpen}/>
            ))}
        <div style={{ position: 'absolute', bottom: '20px', paddingLeft: '58px' }}>
            <img src="/Logo.jpg" alt="Logo" style={{ maxWidth: '150px'}} />
        </div>
        </List>
      </Drawer>
  );
}