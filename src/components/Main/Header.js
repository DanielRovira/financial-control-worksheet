import './styles/Header.css'
import { Avatar, AppBar, Box, Button, Card, Toolbar } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Header = ({ accName, sendLogoutReq, isLoggedIn, open, setOpen, sheetType }) => {
    const [openPanel, setOpenPanel] = useState(false);

    const handleLogout = () => {
        sendLogoutReq();
        setOpenPanel(false);
    };

    return (
        <>
            {isLoggedIn && (
            <AppBar className='AppBar' position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={() => setOpen(!open)} >
                        <MenuIcon />
                    </IconButton>
                    <h1 style={{paddingLeft: '20px'}} >{lang[sheetType]}</h1>
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Avatar onClick={() => setOpenPanel(!openPanel)} children={accName[0]} />
                    </Box>
                </Toolbar>
                { openPanel &&
                <ClickAwayListener onClickAway={() => setTimeout(() => {  
                    setOpenPanel(false)
                }, 5)}>
                    <Card className='Panel'>
                        <h2>{accName}</h2>
                        <Button onClick={handleLogout}>{lang.logout}</Button>
                    </Card>
                </ClickAwayListener>}
            </AppBar>
            )}
        </>
    )
};

export default Header;
