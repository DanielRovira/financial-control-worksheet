import * as C from './styles';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Divider, IconButton, Tooltip, ListItemIcon, Menu, MenuItem  } from '@mui/material';
import { AddCircle as AddCircleIcon,
         Archive as ArchiveIcon,
         ArchiveOutlined as ArchiveOutlinedIcon,
         CalendarMonth as CalendarMonthIcon,
         CreditScore as CreditScoreIcon,
         Delete as DeleteIcon,
         DeleteForever as DeleteForeverIcon,
         Difference as DifferenceIcon,
         Download as DownloadIcon,
         DriveFileMove as DriveFileMoveIcon,
         Folder as FolderIcon,
         InfoOutlined as InfoOutlinedIcon,
         MoreVert as MoreVertIcon,
         Menu as MenuIcon,
         RemoveCircle as RemoveCircleIcon,
         RestoreFromTrash  as RestoreFromTrashIcon,
         Unarchive as UnarchiveIcon,
         UnarchiveOutlined as UnarchiveOutlinedIcon } from '@mui/icons-material';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Header = ({ add, setAdd, setDrawer, sheetType, showCalendar, setShowCalendar, checked, setChecked, handleEditSelected, setOperationType, setUndoItem, handleOpenSnackbar, archived, setArchived, syncing, openSidebar, setOpenSidebar }) => {
    const params = useParams();


    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    let section = sections.filter((sec) => sec.title === params.taskTitle)[0];
    const poppersConfig = {modifiers: [{name: "offset", options: {offset: [0, -10]}}]};
    const enterDelay = 500;
    // const disabled = checked.length > 5 ? true : checked.length > 0 ? false : true;
    const disabled = checked.length > 0 ? false : true;

    //MENU
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(null);
    // const open = Boolean(anchorEl);
    const handleClick = (event, id) => {
      setAnchorEl(event.currentTarget);
      setOpen(id)
    };
    
    const handleClose = () => {
      setAnchorEl(null);
      setOpen(null)
    };

    const handleFilterButton = () => {
        setArchived(!archived);
        setChecked([]);
    }

    const handleDeleteButton = () => {
        setUndoItem([]);
        handleEditSelected('del');
        setOperationType('remove');
        // setChecked([]);
        handleOpenSnackbar();
    }

    const handleArchiveButton = () => {
        setUndoItem([]);
        handleEditSelected('archive');
        setOperationType('archive');
        // setChecked([]);
        handleOpenSnackbar();
    }

    const handleMoveButton = (section) => {
        setUndoItem([]);
        handleEditSelected('move', section.title)
        setOperationType('update');
        handleOpenSnackbar();
    }

    const handleMarkAsPaydButton = (section) => {
        setUndoItem([]);
        handleEditSelected('markAsPayd', section.title)
        setOperationType('update');
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
                <IconButton onClick={() => !syncing ? handleEditSelected('duplicate') : undefined} 
                            disabled={disabled}
                            >
                    <DifferenceIcon/>
                    <p>{lang.duplicate}</p>
                </IconButton>
                <IconButton 
                    onClick={(event) => handleClick(event, "move-menu")}
                    disabled={disabled}
                >
                    <DriveFileMoveIcon/>
                    <p>{lang.move}</p>
                </IconButton>
                {/* {sheetType === 'todoPayments' &&
                <IconButton 
                    onClick={(event) => handleClick(event, "situation-menu")}
                    disabled={disabled}
                >
                    <CreditScoreIcon/>
                    <p>{lang.markAsPayd}</p>
                </IconButton>} */}
            </>}
                {params.taskTitle === 'TRASH' && <>
                    <IconButton onClick={() => !syncing ? handleEditSelected('trash') : undefined}
                                disabled={disabled}
                            >
                        <DeleteForeverIcon/>
                        <p>{lang.empityTrash}</p>
                    </IconButton>
                    <IconButton onClick={() => !syncing ? handleEditSelected('del') : undefined}
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
                    <IconButton onClick={(event) => handleClick(event, "more-menu")} style={{border:'0'}}>
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    id="more-menu"
                    anchorEl={anchorEl}
                    open={open === "more-menu"}
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
                <Menu
                    id="move-menu"
                    anchorEl={anchorEl}
                    open={open === "move-menu"}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                >
                    {Array.from(sections).filter((section) => section.title !== 'TRASH' && section.title !== params.taskTitle ).map((section, index) => (
                        <MenuItem key={index} onClick={() => {handleMoveButton(section); handleClose()}}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            {section.name}
                        </MenuItem>
                    ))}
                    <Divider />
                    <MenuItem onClick={() => {handleMarkAsPaydButton(section); handleClose()}}>
                        <ListItemIcon>
                            {sheetType === 'todoPayments'
                            ? <CreditScoreIcon />
                            : <CalendarMonthIcon />
                            }
                        </ListItemIcon>
                        {sheetType === 'todoPayments' ? lang.financialControl : lang.todoPayments}
                    </MenuItem>
                    <MenuItem onClick={() => {!syncing && handleArchiveButton(); handleClose()}}
                                // disabled={disabled}
                    >
                        <ListItemIcon>
                            {archived
                            ? <UnarchiveOutlinedIcon />
                            : <ArchiveOutlinedIcon />
                            }
                        </ListItemIcon>
                        <p>{lang[!archived ? 'archive' : 'unAarchive']}</p>
                    </MenuItem>
                    {Array.from(sections).filter((section) => section.title === 'TRASH' && section.title !== params.taskTitle ).map((section, index) => (
                        <MenuItem key={index} onClick={() => {handleDeleteButton(); handleClose()}}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            {section.name}
                        </MenuItem>
                    ))}
                </Menu>
                {/* <Menu
                    id="situation-menu"
                    anchorEl={anchorEl}
                    open={open === "situation-menu"}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {handleMarkAsPaydButton(section); handleClose()}}>
                        <ListItemIcon>
                            <CheckIcon />
                        </ListItemIcon>
                        {lang.confirm}
                    </MenuItem>
                </Menu> */}
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