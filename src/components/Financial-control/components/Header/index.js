import * as C from './styles';
import { useParams } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { AddCircle as AddCircleIcon, CalendarMonth as CalendarMonthIcon, InfoOutlined as InfoOutlinedIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Header = ({ add, setAdd, setDrawer, sheetType, showCalendar, setShowCalendar }) => {
    const params = useParams();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    let section = sections.filter((sec) => sec.title === params.taskTitle)[0];
    const poppersConfig = {modifiers: [{name: "offset", options: {offset: [0, -10]}}]}

    return (
        <C.Container>
            <C.Header>
                <C.Title>{section ? section.name : ''}</C.Title>
            </C.Header>
            <C.Buttons>
                {sheetType !== 'summary' &&
                <Tooltip title={<h3>{lang.add}</h3>} disableInteractive PopperProps={poppersConfig}>
                    <IconButton  onClick={() => setAdd(!add)}>
                        {!add ? <AddCircleIcon fontSize='large'/>
                             : <RemoveCircleIcon fontSize='large'/>}
                    </IconButton>
                </Tooltip>}
                <Tooltip title={<h3>{lang.calendar}</h3>} disableInteractive PopperProps={poppersConfig}>
                    <IconButton onClick={() => setShowCalendar(!showCalendar)}>
                        <CalendarMonthIcon fontSize='large'/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={<h3>{lang.details}</h3>} disableInteractive PopperProps={poppersConfig}>
                    <IconButton onClick={() => setDrawer(true)}>
                        <InfoOutlinedIcon fontSize='large'/>
                    </IconButton>
                </Tooltip>
            </C.Buttons>
        </C.Container>
    );
};
 
export default Header;