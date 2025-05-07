import './styles/Header.css'
import { Avatar, AppBar, Box, Button, Card, ClickAwayListener, Divider, IconButton, MenuItem, Select, Toolbar, Tooltip } from '@mui/material';
import { SettingsOutlined as SettingsOutlinedIcon, Apps as AppsIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai'
import { languageAtom, stringToColor } from 'components/global'

const Header = ({ sendLogoutReq, isLoggedIn, openSidebar, setOpenSidebar }) => {
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const [openPanel, setOpenPanel] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false)
    const [hovered, setHovered] = useState(false);
    const [language, setLanguage] = useAtom(languageAtom);
    const lang = require(`components/Languages/${language}.json`);
    const poppersConfig = {modifiers: [{name: "offset", options: {offset: [0, -10]}}]}
    const languages = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'it-IT']
    // document.documentElement.style.setProperty('--avatarColor', stringToColor(user.name || ''));

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

      const handleChangeLanguage = (event) => {
        localStorage.setItem('language', JSON.stringify(event.target.value));
        setLanguage(event.target.value)
      }

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
                <Toolbar variant="dense" sx={{ justifyContent: 'space-between'}}>
                    <IconButton color="inherit" edge="start" onClick={() => setOpenSidebar(!openSidebar)} >
                        <AppsIcon style={{fontSize:'28px'}} />
                    </IconButton>
                        {/* <img src={`${process.env.REACT_APP_LOGO}.jpg`} alt="Logo" onClick={() => history(`/main`)} style={{ maxHeight: '40px', marginLeft:'10px'}} /> */}
                        <h1>{process.env.REACT_APP_NAME}</h1>
                    <Box>
                        {process.env.REACT_APP_MULTI_LANGUAGE === "true" &&
                        <Select
                            variant="standard"
                            value={language}
                            label="Language"
                            onChange={handleChangeLanguage}
                        >
                            {Array.from(languages || []).map((language, index) => <MenuItem key={index} value={language}><img src={`https://flagicons.lipis.dev/flags/4x3/${language.slice(3,5).toLocaleLowerCase()}.svg`} style={{width: '25px', margin: 'auto'}} alt='Country flag' /></MenuItem>)}
                        </Select>}
                        <Tooltip
                            disableInteractive
                            title={<h3>{lang.settings}</h3>}
                            PopperProps={poppersConfig}
                            enterDelay={500}
                            enterNextDelay={500}
                            className='OutterSettingsButton'
                        >
                            <IconButton color="inherit" onClick={() => {setOpenPanel(false); history(`/settings`)}}>
                                <SettingsOutlinedIcon />
                            </IconButton>
                        </Tooltip>
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
                        >
                            <IconButton onClick={() => (setOpenPanel(!openPanel))} >
                                <Avatar children={user?.name?.[0] || ''} sx={{backgroundColor: stringToColor(user.name || '')}} />
                            </IconButton>
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
                                className='InnerSettingsButton'
                            >
                                <IconButton onClick={() => {setOpenPanel(false); history(`/settings`)}}>
                                    <SettingsOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Avatar children={user?.name?.[0] || ''} sx={{backgroundColor: stringToColor(user.name || '')}} />
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
