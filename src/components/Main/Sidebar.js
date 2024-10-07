import './styles/Sidebar.css'
import { Drawer, List } from '@mui/material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContactsIcon from '@mui/icons-material/Contacts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';


const Sidebar = ({ openSidebar, setOpenSidebar, mainSheetType, setMainSheetType }) => {
     const language = useAtomValue(languageAtom);
     const lang = require(`components/Languages/${language}.json`);
    document.documentElement.style.setProperty('--closeSidebarScrollWidth', openSidebar ? '10px' : '0');
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || [];

    const handleClick = () => {
        setOpenSidebar && setOpenSidebar(false);
    };

    const selectedStyle = {
        borderLeft: '3px solid var(--navbar-color)',
        paddingLeft: '2px',
        color: 'var(--navbar-color)',
    }

    return (
      <Drawer className='Sidebar' variant="permanent" open={openSidebar} >
        <List sx={{ width: openSidebar ? 'var(--sidebarWidth)' : 'var(--closeSidebarWidth)' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
        >
            <div className='ItensContainer'>
                <ListItemButton onClick={() => {handleClick(); setMainSheetType('Main'); history('/main')}} title={lang.home} style={{backgroundColor: mainSheetType === 'Main'  ? 'var(--selected-sidebar)' :  'unset'}} >
                    <ListItemIcon style={mainSheetType === 'Main' ? selectedStyle : null} >
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={lang.home} />
                </ListItemButton>
                {Object.entries(user['permissions'] || []).map(perm => (perm[1])).map(each => (Object.hasOwn(each, 'todoPayments' || 'financialControl'))).includes(true) &&
                    <ListItemButton onClick={() => {handleClick(); setMainSheetType('FinancialWorksheet'); history('/FinancialWorksheet')}} title={lang.FinancialWorksheet} style={{backgroundColor: mainSheetType === 'FinancialWorksheet'  ? 'var(--selected-sidebar)' :  'unset'}}>
                    <ListItemIcon style={mainSheetType === 'FinancialWorksheet' ? selectedStyle : null} >
                        <MonetizationOnIcon/>
                    </ListItemIcon>
                    <ListItemText primary={lang.finances} />
                </ListItemButton>}
                <ListItemButton onClick={() => {handleClick(); setMainSheetType('TaskList'); history('/TaskList')}} title={lang.todos} style={{backgroundColor: mainSheetType === 'TaskList'  ? 'var(--selected-sidebar)' :  'unset'}}>
                    <ListItemIcon style={mainSheetType === 'TaskList' ? selectedStyle : null} >
                        <FormatListBulletedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={lang.todos} />
                </ListItemButton>
                {/* <ListItemButton onClick={() => {handleClick(); setMainSheetType('Contacts'); history('/Contacts')}} title={lang.contacts} style={{backgroundColor: mainSheetType === 'Contacts'  ? 'var(--selected-sidebar)' :  'unset'}}>
                    <ListItemIcon style={mainSheetType === 'Contacts' ? selectedStyle : null} >
                        <ContactsIcon/>
                    </ListItemIcon>
                    <ListItemText primary={lang.contacts} />
                </ListItemButton> */}
                {Object.entries(user['permissions'] || []).map(perm => (perm[1])).map(each => (Object.hasOwn(each, 'purchases'))).includes(true) &&
                    <ListItemButton onClick={() => {handleClick(); setMainSheetType('PurchaseRequests'); history('/PurchaseRequests')}} title={lang.PurchaseRequests} style={{backgroundColor: mainSheetType === 'PurchaseRequests'  ? 'var(--selected-sidebar)' :  'unset'}}>
                    <ListItemIcon style={mainSheetType === 'PurchaseRequests' ? selectedStyle : null} >
                        <ShoppingCartIcon/>
                    </ListItemIcon>
                    <ListItemText primary={lang.purchases} />
                </ListItemButton>}
            </div>
            <div style={{ position: 'absolute', bottom: '10px', left: '40px' }}>
                <img src={`${process.env.REACT_APP_LOGO}.jpg`} alt="Logo" style={{ maxWidth: '150px'}} />
            </div>
        </List>
      </Drawer>
  );
}

export default Sidebar