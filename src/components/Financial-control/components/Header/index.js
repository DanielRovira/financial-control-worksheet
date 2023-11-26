import * as C from './styles';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Tooltip, ListItemIcon, Menu, MenuItem  } from '@mui/material';
import { AddCircle as AddCircleIcon,
         Archive as ArchiveIcon,
         ArchiveOutlined as ArchiveOutlinedIcon,
         CalendarMonth as CalendarMonthIcon,
         Delete as DeleteIcon,
         DeleteForever as DeleteForeverIcon,
         Difference as DifferenceIcon,
         FmdBadOutlined as FmdBadOutlinedIcon,
         InfoOutlined as InfoOutlinedIcon,
         Menu as MenuIcon,
         MoreVert as MoreVertIcon,
         RemoveCircle as RemoveCircleIcon,
         RestoreFromTrash  as RestoreFromTrashIcon,
         Download as DownloadIcon,
         Unarchive as UnarchiveIcon,
         UnarchiveOutlined as UnarchiveOutlinedIcon,
         Sync as SyncIcon,
         CloudDoneOutlined as CloudDoneOutlinedIcon } from '@mui/icons-material';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Header = ({ add, setAdd, setDrawer, sheetType, showCalendar, setShowCalendar, checked, setChecked, handleDeleteSelected, handleSetArchived, handleDuplicateSelected, setOperationType, setUndoItem, handleOpenSnackbar, archived, setArchived, syncing, openSidebar, setOpenSidebar }) => {
    const params = useParams();
    const timer = useRef(null);
    const [cloudText, setCloudText] = useState('none');
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

    useEffect(() => {
        return () => {
            clearTimeout(timer.current)
            setCloudText('unset')
            timer.current = setTimeout(() => {
                setCloudText('none')
            }, 4000);
        };
    }, [syncing]);

    return (
        <>
        <C.Container>
            <C.Buttons className='leftButtons'>
                <IconButton  onClick={() => setOpenSidebar(!openSidebar)} style={{marginRight:'5px'}}>
                    <MenuIcon/>
                </IconButton>
            {params.taskTitle !== 'TRASH' && sheetType !== 'summary' && <>
                {archived === false && <>
                    <IconButton  onClick={() => setAdd(!add)}>
                        {!add ? <AddCircleIcon/>
                             : <RemoveCircleIcon/>}
                    <p>{lang.add}</p>
                    </IconButton>
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
                {params.taskTitle === 'TRASH' && checked.length !== 0 && <>
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
            <C.Header>
                <C.Title>{section ? (section.title === 'TRASH' ? lang.trash : section.name) : ''}</C.Title>
            </C.Header>
            {params.taskTitle !== 'TRASH' && 
            <C.Buttons className='rightButtons'>
                {sheetType !== 'summary' && <>
                     <IconButton disabled>
                        {syncing
                         ? <><p>{lang.saving}</p><SyncIcon /></>
                         : <><p style={{display: cloudText}}>{lang.saved}</p><CloudDoneOutlinedIcon /></>
                        }
                     </IconButton>
                </>}
                {archived === false && <>
                    <IconButton onClick={() => setShowCalendar(!showCalendar)}>
                        <CalendarMonthIcon/>
                        <p>{lang.calendar}</p>
                    </IconButton>
                </>}
                <Tooltip title={<h3>{lang.more}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <IconButton onClick={handleClick}>
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
        </C.Container>
        {archived &&
            <C.ArchivedTitle className='archivedTitle'>
                <FmdBadOutlinedIcon color='white'/>
                <p>{lang.archived}</p>
            </C.ArchivedTitle>
        }
        </>
    );
};
 
export default Header;