import './styles/Sidebar.css'
import { Drawer, List } from '@mui/material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContactsIcon from '@mui/icons-material/Contacts';
import { useNavigate } from 'react-router-dom';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

 const Sidebar = ({ openSidebar, setOpenSidebar }) => {
    document.documentElement.style.setProperty('--closeSidebarScrollWidth', openSidebar ? '10px' : '0');
    const history = useNavigate();
    const handleClick = () => {
        setOpenSidebar && setOpenSidebar(false);
    };

    return (
      <Drawer className='Sidebar' variant="permanent" open={openSidebar} >
        <List sx={{ width: openSidebar ? '250px' : 'var(--closeSidebarWidth)' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
        >
            <div className='ItensContainer'>
                <ListItemButton onClick={() => {handleClick(); history('/main')}} title={lang.home}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={lang.home} />
                </ListItemButton>
                <ListItemButton onClick={() => {handleClick(); history('/FinancialWorksheet')}} title={lang.financialControl}>
                    <ListItemIcon>
                        <MonetizationOnIcon/>
                    </ListItemIcon>
                    <ListItemText primary={lang.financialControl} />
                </ListItemButton>
                <ListItemButton onClick={handleClick} title={lang.todos}>
                    <ListItemIcon>
                        <ContactsIcon/>
                    </ListItemIcon>
                    <ListItemText primary={lang.todos} />
                </ListItemButton>
                <ListItemButton onClick={handleClick} title={lang.todos}>
                    <ListItemIcon>
                        <FormatListBulletedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={lang.todos} />
                </ListItemButton>
            </div>
            <div style={{ position: 'absolute', bottom: '10px', left: '60px' }}>
                <img src={`${process.env.REACT_APP_LOGO}.jpg`} alt="Logo" style={{ maxWidth: '150px'}} />
            </div>
        </List>
      </Drawer>
  );
}

export default Sidebar