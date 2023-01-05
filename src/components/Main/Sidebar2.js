import * as React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import NestedList from './NestedList';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);
const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width'),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width'),
  overflowX: 'hidden',
  width: '65px'
});

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     ...(open && {
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

export default function MiniDrawer({ open, setOpen }) {
    const sections = JSON.parse(localStorage.getItem("sections")) || [];

    return (
      <Drawer variant="permanent" open={open} sx={{ overflowX: 'hidden' }} >
        <List   sx={{ paddingTop: '70px', width: open ? '250px':'60px', overflow: 'hidden', whiteSpace:'nowrap', transition: '.3s' }}
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
        </List>
        <div style={{ position: 'fixed', bottom: '20px', paddingLeft: '50px' }}>
            <img src="/Logo.jpg" alt="Logo" style={{opacity: open ? '1' : '0', transition: '.5s', maxWidth: '150px'}} />
        </div>
      </Drawer>
  );
}