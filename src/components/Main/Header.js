import './styles/Header.css'
import { Avatar, AppBar, Box, Button, Card, ClickAwayListener, Divider, IconButton, Toolbar, Tooltip } from '@mui/material';
import { Menu as MenuIcon, SettingsOutlined as SettingsOutlinedIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Header = ({ sendLogoutReq, isLoggedIn, openSidebar, setOpenSidebar, sheetType }) => {
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const [openPanel, setOpenPanel] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false)
    const [hovered, setHovered] = useState(false);
    const poppersConfig = {modifiers: [{name: "offset", options: {offset: [0, -10]}}]}

    const handleLogout = () => {
        sendLogoutReq();
        setOpenPanel(false);
    };

    const onTimeout = () => {
        setShowTooltip(true)
      };      

    useEffect(() => {
        const timer = hovered && setTimeout(onTimeout, 800);
        return () => {
          clearTimeout(timer);
          setShowTooltip(false)
        };
      }, [hovered, openPanel]);

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
                <Toolbar sx={{ justifyContent: 'space-between'}}>
                    <IconButton color="inherit" edge="start" onClick={() => setOpenSidebar(!openSidebar)} >
                        <MenuIcon />
                    </IconButton>
                    <h1>{lang[sheetType]}</h1>
                    <Box>
                        <Tooltip
                            id='AppBarTooltip'
                            disableInteractive
                            title={TooltipTitle}
                            open={!openPanel && showTooltip} 
                            disableHoverListener
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            placement='bottom-end'
                            PopperProps={poppersConfig}
                            // enterDelay={800}
                            // enterNextDelay={800}
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
                            <Tooltip
                                disableInteractive
                                title={<h3>{lang.settings}</h3>}
                                PopperProps={poppersConfig}
                                enterDelay={800}
                                enterNextDelay={800}
                            >
                                <IconButton onClick={() => {setOpenPanel(false); history(`/settings`)}}>
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
