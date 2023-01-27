import './styles/Sidebar.css'
import { Drawer, List, ListSubheader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NestedList from './NestedList';
import { FaTrash } from 'react-icons/fa';
// import { useState, useEffect } from 'react';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

 const Sidebar = ({ sections, openSidebar, setOpenSidebar }) => {
    const history = useNavigate();
    // const [sections, setSections] = useState(JSON.parse(localStorage.getItem("sections")) || []);
    document.documentElement.style.setProperty('--closeSidebarScrollWidth', openSidebar ? '10px' : '0');

    return (
      <Drawer className='Sidebar' variant="permanent" open={openSidebar} >
        <List sx={{ width: openSidebar ? '250px' : 'var(--closeSidebarWidth)' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="h1" id="nested-list-subheader" style={{ color: '#3C4043', marginLeft: '-12px', fontSize: '16px', fontWeight: 'bold', display:'flex', justifyContent: 'space-between' }}>
                        {lang.sections}
                        <FaTrash onClick={() => history('/financialControl/TRASH')} />
                    </ListSubheader>
                }
        >
            <div className='ItensContainer'>
                {Array.from(sections).filter((section) => section.title !== 'TRASH').map((section, index) => (
                    <NestedList key={index} section={section} setOpenSidebar={setOpenSidebar}/>
                ))}
            </div>
            <div style={{ position: 'absolute', bottom: '10px', left: '60px' }}>
                <img src={process.env.REACT_APP_LOGO} alt="Logo" style={{ maxWidth: '150px'}} />
            </div>
        </List>
      </Drawer>
  );
}

export default Sidebar