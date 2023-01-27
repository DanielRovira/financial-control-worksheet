import * as C from './styles';
import { useParams } from 'react-router-dom';
import { IconButton, Tooltip, ToggleButton  } from '@mui/material';
import { AddCircle as AddCircleIcon, CalendarMonth as CalendarMonthIcon, Delete as DeleteIcon, EventAvailable as EventAvailableIcon, FilterAlt as FilterAltIcon, InfoOutlined as InfoOutlinedIcon, RemoveCircle as RemoveCircleIcon, RemoveDone as RemoveDoneIcon  } from '@mui/icons-material';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Header = ({ add, setAdd, setDrawer, sheetType, showCalendar, setShowCalendar, checked, setChecked, handleDeleteAll, handleSetArchived, filter, setFilter }) => {
    const params = useParams();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    let section = sections.filter((sec) => sec.title === params.taskTitle)[0];
    const poppersConfig = {modifiers: [{name: "offset", options: {offset: [0, -10]}}]}

    return (
        <C.Container>
            {params.taskTitle !== 'TRASH' && <>
            <C.Buttons className='leftButtons'>
            {sheetType === 'todoPayments' &&
                <Tooltip title={<h3>{lang.filter}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <ToggleButton selected={filter} onClick={() => {setFilter(!filter); setChecked([])}} sx={{height:'40px', width: '40px', marginTop: '5px'}}>
                        <FilterAltIcon fontSize='large'/>
                    </ToggleButton>
            </Tooltip>}
            {checked.length !== 0 && <>
                <Tooltip title={checked.length > 5 ? <h3>{lang.limit}</h3> : <h3>{lang.delete}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <span>
                        <IconButton onClick={handleDeleteAll} disabled={checked.length > 5 ? true : false}>
                            <DeleteIcon fontSize='large'/>
                        </IconButton>
                    </span>
                </Tooltip>
                {sheetType === 'todoPayments' &&
                    <Tooltip title={<h3>{lang[!filter ? 'mark' : 'unMark']} {lang.asDone}</h3>} disableInteractive PopperProps={poppersConfig} enterDelay={800} enterNextDelay={800}>
                    <IconButton onClick={handleSetArchived}>
                        {filter
                        ? <RemoveDoneIcon fontSize='large'/>
                        : <EventAvailableIcon fontSize='large'/>
                        }
                    </IconButton>
                </Tooltip>}
                </>}
            </C.Buttons>
            </>}
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
            </C.Buttons>
            }
        </C.Container>
    );
};
 
export default Header;