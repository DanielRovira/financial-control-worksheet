import './styles.css'
import { IconButton, List, Divider } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import NestedList from './NestedList';
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';

const Sidebar = ({ sections, openSidebar, setOpenSidebar, sheetType }) => {
    const language = useAtomValue(languageAtom);
    const lang = require(`components/Languages/${language}.json`);
    document.documentElement.style.setProperty('--closeSidebarScrollWidth', openSidebar ? '10px' : '0');
    const user = JSON.parse(localStorage.getItem("user")) || [];

    return (
      <div className='InsideSidebar' variant="permanent" open={openSidebar} >
        <List sx={{ width: openSidebar ? 'var(--sidebarWidth)' : 'var(--closeSidebarWidth)' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
        >
            <div className='InsideSidebarItensContainer'>
                <IconButton  onClick={() => setOpenSidebar(!openSidebar)}>
                    <MenuIcon/>
                </IconButton>

                <span className='InsideSidebarTitle'>{lang.sections}</span>

                {Array.from(sections).filter((section) => section.title !== 'TRASH' && Object.getOwnPropertyNames(user.permissions[section.title]).toString() !== 'purchases').map((section, index) => (
                    <NestedList key={index} section={section} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} sheetType={sheetType} />
                ))}
                <div style={{padding:'10px 5px'}}>
                    <Divider />
                </div>
                {Array.from(sections).filter((section) => section.title === 'TRASH').map((section, index) => (
                    <NestedList key={index} section={section} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} sheetType={sheetType} />
                ))}
            </div>
        </List>
      </div>
  );
}

export default Sidebar