import { AppBar, Box, Tab, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Header = ({ isLoggedIn, setIsLoggedIn, setAccName, open, setOpen, sheetType }) => {
    const history = useNavigate();
    const sendLogoutReq = async () => {
        await fetch(`/api/logout`,
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(response => response.json())
        .catch(error => {
            setIsLoggedIn(false); history('/');
        })
    };

    const handleLogout = () => {
        localStorage.clear();
        sendLogoutReq()
            .then(() => setAccName(null))
            .then(() => setIsLoggedIn(false))
            .then(() => history('/'));
    };

    return (
        <>
            {isLoggedIn && (
            <AppBar position='fixed' style={{ background: 'teal' , filter:'grayscale(50%)' }} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={() => setOpen(!open)} >
                        <MenuIcon />
                    </IconButton>
                    <h1 style={{paddingLeft: '20px'}} >{lang[sheetType]}</h1>
                    <Box sx={{ marginLeft: 'auto' }}>
                        
                            <Tab
                            onClick={handleLogout}
                            to='/'
                            LinkComponent={Link}
                            label='Logout'
                            />
                    </Box>
                </Toolbar>
            </AppBar>
            )}
        </>
    )
};

export default Header;
