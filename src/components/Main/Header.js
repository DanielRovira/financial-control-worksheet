import { AppBar, Box, Tab, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Header = ({ isLoggedIn, setIsLoggedIn, setAccName }) => {
    const history = useNavigate();
    const sendLogoutReq = async () => {
        await fetch(`/api/logout`,
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(response => response.json())
    };

    const handleLogout = () => {
        localStorage.clear();
        sendLogoutReq()
            .then(() => setAccName(null))
            .then(() => setIsLoggedIn(false))
            .then(() => history('/'));
    };

    return (
        <div>
            <AppBar position='sticky' style={{ background: 'teal' , filter:'grayscale(50%)' }}>
                <Toolbar>
                {/* <h1>{accName}</h1> */}
                <h1 style={{textAlign: 'center'}} >{lang[localStorage.getItem("sheetType")]}</h1>
                    <Typography variant='h3'></Typography>
                    <Box sx={{ marginLeft: 'auto' }}>
                        {isLoggedIn ? (
                        <Tab
                        onClick={handleLogout}
                        to='/'
                        LinkComponent={Link}
                        label='Logout'
                    />
                    ) : (
                        <>
                        {' '}
                        <Tab to='/' LinkComponent={Link} label='Login' />
                        <Tab to='/signup' LinkComponent={Link} label='Signup' />
                        </>
                    )}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Header;
