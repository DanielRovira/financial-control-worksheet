import * as C from './styles';
import { useParams } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Tooltip, ToggleButton  } from '@mui/material';
import { AddCircle as AddCircleIcon, CalendarMonth as CalendarMonthIcon, Delete as DeleteIcon, DeleteForever as DeleteForeverIcon, Difference as DifferenceIcon, EventAvailable as EventAvailableIcon, FilterAlt as FilterAltIcon, InfoOutlined as InfoOutlinedIcon, MoreVert as MoreVertIcon, RemoveCircle as RemoveCircleIcon, RemoveDone as RemoveDoneIcon, RestoreFromTrash  as RestoreFromTrashIcon } from '@mui/icons-material';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Header = ({ add, setAdd, setDrawer, sheetType, showCalendar, setShowCalendar, checked, setChecked, handleDeleteSelected, handleSetArchived, handleDuplicateSelected, filter, setFilter, setOperationType, setUndoItem }) => {
    const params = useParams();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    let section = sections.filter((sec) => sec.title === params.taskTitle)[0];
    const poppersConfig = {modifiers: [{name: "offset", options: {offset: [0, -10]}}]}

    const handleFilterButton = () => {
        setFilter(!filter);
        setChecked([]);
    }

    const handleDeleteButton = () => {
        handleDeleteSelected('del');
        setOperationType('remove');
        setUndoItem([]);
        // setChecked([]);
    }

    const handleDuplicateButton = () => {
        handleDuplicateSelected();
        setOperationType('add');
        setUndoItem([]);
        // setChecked([]);
    }

    const handleArchiveButton = () => {
        handleSetArchived();
        setOperationType('archive');
        setUndoItem([]);
        // setChecked([]);
    }


    return (
        <C.Container>
            <C.Buttons className='leftButtons'>
            {params.taskTitle !== 'TRASH' && <>
                {/* {sheetType === 'todoPayments' &&
                <Tooltip title={<h3>{lang.filter}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <span>
                    <ToggleButton value={0} selected={filter} onClick={handleFilterButton} sx={{height:'40px', width: '40px', marginTop: '4px'}}>
                        <FilterAltIcon fontSize='large'/>
                    </ToggleButton>
                    </span>
                </Tooltip>} */}

                {checked.length !== 0 && <>
                <Tooltip title={checked.length > 5 ? <h3>{lang.limit}</h3> : <h3>{lang.delete}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <span>
                        <IconButton onClick={handleDeleteButton} disabled={checked.length > 5 ? true : false}>
                            <DeleteIcon fontSize='large'/>
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title={checked.length > 5 ? <h3>{lang.limit}</h3> : <h3>{lang.duplicate}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <span>
                        <IconButton onClick={handleDuplicateButton} disabled={checked.length > 5 ? true : false}>
                            <DifferenceIcon fontSize='large'/>
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title={<h3>{lang[!filter ? 'mark' : 'unMark']} {lang.asDone}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <IconButton onClick={handleArchiveButton}>
                        {filter
                        ? <RemoveDoneIcon fontSize='large'/>
                        : <EventAvailableIcon fontSize='large'/>
                        }
                    </IconButton>
                </Tooltip>
                </>}
            </>}
                {params.taskTitle === 'TRASH' &&
                <Tooltip title={<h3>{lang.empityTrash}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <IconButton onClick={() => handleDeleteSelected()}>
                        <DeleteForeverIcon fontSize='large'/>
                    </IconButton>
                </Tooltip>}
                {params.taskTitle === 'TRASH' && checked.length !== 0 &&
                <Tooltip title={<h3>{lang.restore}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <span>
                    <IconButton onClick={() => handleDeleteSelected('restore')} disabled={checked.length > 5 ? true : false}>
                        <RestoreFromTrashIcon fontSize='large'/>
                    </IconButton>
                    </span>
                </Tooltip>}
            </C.Buttons>
            
            <C.Header>
                <C.Title>{section ? (section.title === 'TRASH' ? lang.trash : section.name) : ''}</C.Title>
            </C.Header>
            {params.taskTitle !== 'TRASH' && 
            <C.Buttons className='rightButtons'>
                {sheetType !== 'summary' &&
                <Tooltip title={<h3>{lang.add}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <IconButton  onClick={() => setAdd(!add)}>
                        {!add ? <AddCircleIcon fontSize='large'/>
                             : <RemoveCircleIcon fontSize='large'/>}
                    </IconButton>
                </Tooltip>}
                <Tooltip title={<h3>{lang.calendar}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <IconButton onClick={() => setShowCalendar(!showCalendar)}>
                        <CalendarMonthIcon fontSize='large'/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={<h3>{lang.details}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <IconButton onClick={() => setDrawer(true)}>
                        <InfoOutlinedIcon fontSize='large'/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={<h3>{lang.details}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <IconButton onClick={handleFilterButton}>
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
            </C.Buttons>
            }
        </C.Container>
    );
};
 
export default Header;