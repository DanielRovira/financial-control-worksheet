import './styles.css'
import { IconButton, List } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import NestedList from './NestedList';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

 const Sidebar = ({ sections, openSidebar, setOpenSidebar, sheetType }) => {
    document.documentElement.style.setProperty('--closeSidebarScrollWidth', openSidebar ? '10px' : '0');

    return (
      <div className='InsideSidebar' variant="permanent" open={openSidebar} >
        <List sx={{ width: openSidebar ? '210px' : 'var(--closeSidebarWidth)' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
        >
            <div className='InsideSidebarItensContainer'>
                    <IconButton  onClick={() => setOpenSidebar(!openSidebar)}>
                        <MenuIcon/>
                    </IconButton>
                    <text className='InsideSidebarTitle'>{lang.sections}</text>
                {Array.from(sections).filter((section) => section.title !== 'TRASH').map((section, index) => (
                    <NestedList key={index} section={section} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} sheetType={sheetType} />
                ))}
            </div>
        </List>
      </div>
  );
}

export default Sidebar