import * as C from './styles';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, IconButton, Tooltip, ListItemIcon, Menu, MenuItem  } from '@mui/material';
import { AddCircle as AddCircleIcon,
         Archive as ArchiveIcon,
         ArchiveOutlined as ArchiveOutlinedIcon,
         CalendarMonth as CalendarMonthIcon,
         Delete as DeleteIcon,
         DeleteForever as DeleteForeverIcon,
         Difference as DifferenceIcon,
        //  FmdBadOutlined as FmdBadOutlinedIcon,
         InfoOutlined as InfoOutlinedIcon,
         MoreVert as MoreVertIcon,
         Menu as MenuIcon,
         RemoveCircle as RemoveCircleIcon,
         RestoreFromTrash  as RestoreFromTrashIcon,
         Download as DownloadIcon,
         Unarchive as UnarchiveIcon,
         UnarchiveOutlined as UnarchiveOutlinedIcon } from '@mui/icons-material';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Header = ({ add, setAdd, setDrawer, sheetType, showCalendar, setShowCalendar, checked, setChecked, handleDeleteSelected, handleSetArchived, handleDuplicateSelected, setOperationType, setUndoItem, handleOpenSnackbar, archived, setArchived, syncing, openSidebar, setOpenSidebar }) => {
    const params = useParams();


    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    let section = sections.filter((sec) => sec.title === params.taskTitle)[0];
    const poppersConfig = {modifiers: [{name: "offset", options: {offset: [0, -10]}}]};
    const enterDelay = 500;
    const disabled = checked.length > 5 ? true : checked.length > 0 ? false : true;

    //MENU
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleFilterButton = () => {
        setArchived(!archived);
        setChecked([]);
    }

    const handleDeleteButton = () => {
        setUndoItem([]);
        handleDeleteSelected('del');
        setOperationType('remove');
        // setChecked([]);
        handleOpenSnackbar();
    }

    const handleArchiveButton = () => {
        setUndoItem([]);
        handleSetArchived();
        setOperationType('archive');
        // setChecked([]);
        handleOpenSnackbar();
    }

    const menuButtonStyle = {
        // display: 'none'
        transform: 'translateX(-50px)',
        width: '0',
        paddingLeft: '0',
        paddingRight: '0',
        color: 'transparent'
    }

    return (
        <>
        <C.Header style={{display:'flex', flexDirection:'row'}}>
            <IconButton  onClick={() => setOpenSidebar(!openSidebar)} style={openSidebar ? menuButtonStyle : null}>
                <MenuIcon/>
            </IconButton>
            <C.Title>{section ? (section.title === 'TRASH' ? lang.trash : section.name) : ''}</C.Title>
        </C.Header>
        {sheetType !== 'summary' && 
        <C.Container>
            <C.Buttons className='leftButtons'>
            {params.taskTitle !== 'TRASH' && sheetType !== 'summary' && <>
                {archived === false && <>
                    <Button  onClick={() => setAdd(!add)} variant="contained" size="small" disableElevation>
                        {!add ? <AddCircleIcon/>
                             : <RemoveCircleIcon/>}
                    <p>{lang.add}</p>
                    </Button>
                </>}
                <IconButton onClick={!syncing ? handleDeleteButton : undefined}
                            disabled={disabled}
                >
                    <DeleteIcon/>
                    <p>{lang.remove}</p>
                </IconButton>
                <IconButton onClick={!syncing ? handleDuplicateSelected : undefined} 
                            disabled={disabled}
                            >
                    <DifferenceIcon/>
                    <p>{lang.duplicate}</p>
                </IconButton>
                <IconButton onClick={!syncing ? handleArchiveButton : undefined}
                            disabled={disabled}
                            >
                    {archived
                    ? <UnarchiveOutlinedIcon />
                    : <ArchiveOutlinedIcon />
                    }
                    <p>{lang[!archived ? 'archive' : 'unAarchive']}</p>
                </IconButton>
            </>}
                {params.taskTitle === 'TRASH' && <>
                    <IconButton onClick={() => !syncing ? handleDeleteSelected('trash', 1) : undefined}
                                disabled={disabled}
                            >
                        <DeleteForeverIcon/>
                        <p>{lang.empityTrash}</p>
                    </IconButton>
                    <IconButton onClick={() => !syncing ? handleDeleteSelected('restore') : undefined}
                                disabled={disabled}
                            >
                        <RestoreFromTrashIcon/>
                        <p>{lang.restore}</p>
                    </IconButton>
                </>}
            </C.Buttons>
            {/* <C.Header>
                <C.Title>{section ? (section.title === 'TRASH' ? lang.trash : section.name) : ''}</C.Title>
            </C.Header> */}
            {params.taskTitle !== 'TRASH' && 
            <C.Buttons className='rightButtons'>
                {/* {sheetType !== 'summary' && <>
                     <IconButton disabled>
                        {syncing
                         ? <><p>{lang.saving}</p><SyncIcon /></>
                         : <><p style={{display: cloudText}}>{lang.saved}</p><CloudDoneOutlinedIcon /></>
                        }
                     </IconButton>
                </>} */}
                {archived === false && <>
                    <IconButton onClick={() => setShowCalendar(!showCalendar)}>
                        <CalendarMonthIcon/>
                        <p>{lang.calendar}</p>
                    </IconButton>
                </>}
                <Tooltip title={<h3>{lang.more}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <IconButton onClick={handleClick} style={{border:'0'}}>
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {setDrawer(true); handleClose()}}>
                        <ListItemIcon>
                            <InfoOutlinedIcon/>
                        </ListItemIcon>
                            Detalhes
                    </MenuItem>
                    <MenuItem onClick={() => {document.getElementById('exportCSV').click(); handleClose()}}>
                        <ListItemIcon>
                            <DownloadIcon/>
                        </ListItemIcon>
                            Baixar planilha
                    </MenuItem>
                    <MenuItem onClick={() => {handleFilterButton(); handleClose()}}>
                        <ListItemIcon>
                            {archived ?
                                <UnarchiveIcon/> :
                                <ArchiveIcon/>
                            }
                        </ListItemIcon>
                            {archived ?
                                lang.notArchived :
                                lang.archived
                            }
                    </MenuItem>
                </Menu>
            </C.Buttons>
            }
        </C.Container>}
        {/* {archived &&
            <C.ArchivedTitle className='archivedTitle'>
                <FmdBadOutlinedIcon color='white'/>
                <p>{lang.archived}</p>
            </C.ArchivedTitle>
        } */}
        </>
    );
};
 
export default Header;