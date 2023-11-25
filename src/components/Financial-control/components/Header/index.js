import * as C from './styles';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Tooltip  } from '@mui/material';
import { AddCircle as AddCircleIcon,
         ArchiveOutlined as ArchiveOutlinedIcon,
         CalendarMonth as CalendarMonthIcon,
         Delete as DeleteIcon,
         DeleteForever as DeleteForeverIcon,
         Difference as DifferenceIcon,
         FmdBadOutlined as FmdBadOutlinedIcon,
         InfoOutlined as InfoOutlinedIcon,
         MoreVert as MoreVertIcon,
         RemoveCircle as RemoveCircleIcon,
         RestoreFromTrash  as RestoreFromTrashIcon,
         Download as DownloadIcon,
         UnarchiveOutlined as UnarchiveOutlinedIcon,
         Sync as SyncIcon,
         CloudDoneOutlined as CloudDoneOutlinedIcon } from '@mui/icons-material';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Header = ({ add, setAdd, setDrawer, sheetType, showCalendar, setShowCalendar, checked, setChecked, handleDeleteSelected, handleSetArchived, handleDuplicateSelected, setOperationType, setUndoItem, handleOpenSnackbar, archived, setArchived, syncing }) => {
    const params = useParams();
    const timer = useRef(null);
    const [cloudText, setCloudText] = useState('none')
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    let section = sections.filter((sec) => sec.title === params.taskTitle)[0];
    const poppersConfig = {modifiers: [{name: "offset", options: {offset: [0, -10]}}]}
    const enterDelay = 500

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
            {params.taskTitle !== 'TRASH' && <>
                {/* {sheetType === 'todoPayments' &&
                <Tooltip title={<h3>{lang.filter}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <span>
                    <ToggleButton value={0} selected={archived} onClick={handleFilterButton} sx={{height:'40px', width: '40px', marginTop: '4px'}}>
                        <FilterAltIcon fontSize='large'/>
                    </ToggleButton>
                    </span>
                </Tooltip>} */}

                {checked.length !== 0 && <>
                {archived === false && <>
                    <Tooltip title={checked.length > 5 ? <h3>{lang.limit}</h3> : <h3>{lang.remove}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <span>
                        <IconButton onClick={!syncing && handleDeleteButton}
                        // disabled={checked.length > 5 ? true : false}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title={checked.length > 5 ? <h3>{lang.limit}</h3> : <h3>{lang.duplicate}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <span>
                        <IconButton onClick={!syncing && handleDuplicateSelected} 
                        // disabled={checked.length > 5 ? true : false}
                        >
                            <DifferenceIcon/>
                        </IconButton>
                    </span>
                </Tooltip>
                </>}
                <Tooltip title={<h3>{lang[!archived ? 'archive' : 'unAarchive']}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <IconButton onClick={!syncing && handleArchiveButton}>
                        {archived
                        ? <UnarchiveOutlinedIcon />
                        : <ArchiveOutlinedIcon />
                        }
                    </IconButton>
                </Tooltip>
                </>}
            </>}
                {params.taskTitle === 'TRASH' && checked.length !== 0 && <>
                <Tooltip title={<h3>{lang.empityTrash}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <IconButton onClick={() => !syncing && handleDeleteSelected('trash', 1)}>
                        <DeleteForeverIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={<h3>{lang.restore}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <span>
                    <IconButton onClick={() => !syncing && handleDeleteSelected('restore')}
                    // disabled={checked.length > 5 ? true : false}
                    >
                        <RestoreFromTrashIcon/>
                    </IconButton>
                    </span>
                </Tooltip>
                </>}
                    {
                     <IconButton disabled>
                         {syncing
                         ? <><SyncIcon /><p style={{fontSize: '14px', paddingLeft: '5px'}}>Salvando...</p></>
                         : <><CloudDoneOutlinedIcon /><p style={{fontSize: '14px', paddingLeft: '5px', display: cloudText}}>Documento salvo</p></>
                        }
                     </IconButton>
                    }
            </C.Buttons>
            
            <C.Header>
                <C.Title>{section ? (section.title === 'TRASH' ? lang.trash : section.name) : ''}</C.Title>
            </C.Header>
            {params.taskTitle !== 'TRASH' && 
            <C.Buttons className='rightButtons'>
                {archived === false && <>
                {sheetType !== 'summary' && <>
                <Tooltip title={<h3>{lang.add}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <IconButton  onClick={() => setAdd(!add)}>
                        {!add ? <AddCircleIcon/>
                             : <RemoveCircleIcon/>}
                    </IconButton>
                </Tooltip>
                {/* <Tooltip title={<h3>{lang.download}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <IconButton  onClick={() => document.getElementById('exportCSV').click()}>
                        <DownloadIcon/>
                    </IconButton>
                </Tooltip> */}
                </>}
                <Tooltip title={<h3>{lang.calendar}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <IconButton onClick={() => setShowCalendar(!showCalendar)}>
                        <CalendarMonthIcon/>
                    </IconButton>
                </Tooltip>
                {/* <Tooltip title={<h3>{lang.details}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <IconButton onClick={() => setDrawer(true)}>
                        <InfoOutlinedIcon/>
                    </IconButton>
                </Tooltip> */}
                </>}
                {/* <Tooltip title={<h3>{lang.details}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
                    <IconButton onClick={handleFilterButton}>
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip> */}
                <Tooltip title={<h3>{lang.details}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={enterDelay} enterNextDelay={enterDelay}>
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