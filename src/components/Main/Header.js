import './styles/Header.css'
import { Avatar, AppBar, Box, Button, Card, ClickAwayListener, Divider, IconButton, Toolbar, Tooltip } from '@mui/material';
import { Menu as MenuIcon, SettingsOutlined as SettingsOutlinedIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Header = ({ sendLogoutReq, isLoggedIn, openSidebar, setOpenSidebar, sheetType }) => {
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const [openPanel, setOpenPanel] = useState(false);
    const [show, setShow] = useState(false)
    const poppersConfig = {modifiers: [{name: "offset", options: {offset: [0, -10]}}]}

    const handleLogout = () => {
        sendLogoutReq();
        setOpenPanel(false);
    };

    const TooltipTitle = (
        <>
            <h2>{`${lang.account} ${process.env.REACT_APP_NAME}`}</h2>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </>
    )
    

    return (
        <>
            {isLoggedIn && (
            <AppBar className='AppBar' position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={() => setOpenSidebar(!openSidebar)} >
                        <MenuIcon />
                    </IconButton>
                    <h1 style={{paddingLeft: '20px'}} >{lang[sheetType]}</h1>
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Tooltip
                            id='AppBarTooltip'
                            disableInteractive
                            title={TooltipTitle}
                            open={!openPanel && show} 
                            disableHoverListener
                            onMouseEnter={() => setShow(true)}
                            onMouseLeave={() => setShow(false)}
                            placement='bottom-end'
                            PopperProps={poppersConfig}
                        >
                            <Avatar onClick={() => (setOpenPanel(!openPanel))} children={user.name[0]} />
                        </Tooltip>
                    </Box>
                </Toolbar>
                { openPanel &&
                <ClickAwayListener onClickAway={() => setTimeout(() => {  
                    setOpenPanel(false)
                }, 5)}>
                    <Card className='Panel'>
                        <div className='userContainer'>
                            <Tooltip disableInteractive title={<h3>{lang.settings}</h3>} PopperProps={poppersConfig}>
                                <IconButton onClick={() => history(`/settings`)}>
                                    <SettingsOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Avatar children={user.name[0]} />
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                        <Divider />
                        <Button onClick={handleLogout} variant='outlined' >{lang.logout}</Button>
                    </Card>
                </ClickAwayListener>}
            </AppBar>
            )}
        </>
    )
};

export default Header
