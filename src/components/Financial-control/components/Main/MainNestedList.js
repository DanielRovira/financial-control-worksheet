import { useState } from 'react';
import { ClickAwayListener, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarMonth as CalendarMonthIcon, BarChart as BarChartIcon, ExpandLess, ExpandMore, ListAlt as ListAltIcon, DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const MainNestedList = ({ section, setOpenSidebar, hideTitle, arrow, sheetType, result }) => {
    const history = useNavigate();
    const [openSection, setOpenSection] = useState(false);
    const types = ['summary','todoPayments','financialControl']
    const params = useParams();

    const handleClick = () => {
        setOpenSidebar && setOpenSidebar(true);
        setOpenSection(!openSection);
    };

    const selectedStyle = {
        backgroundColor: 'var(--color0-5)',
        color: 'black'
    }

  return (
    <>
        <ClickAwayListener onClickAway={() => setOpenSection(false)}>
            <ListItemButton onClick={handleClick} title={hideTitle ? '' : section.name}
                            style={{backgroundColor: section.title === params.taskTitle ? 'var(--selected-sidebar)' :  'unset'}}
                >
                <ListItemIcon>
                    {section.title === 'TRASH' ? <DeleteOutlineIcon style={{paddingLeft:'5px'}} /> : section.title.slice(0, 3)}
                </ListItemIcon>
                <ListItemText primary={section.name} />
                <ListItemText primary={Number((result || 0).toString().replace(/,/g, '.')).toLocaleString('pt-BR', { style: 'currency', currency: process.env.REACT_APP_CURRENCY })}
                              style={{textAlign:'right', minWidth: '60px'}} />
                {arrow && (openSection ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
        </ClickAwayListener>
        <Collapse in={openSection} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {(section.title === 'TRASH' ? types.slice(1) : types).map((type) => (
                    <ListItemButton
                        className='innerButton'
                        style={section.title === params.taskTitle && type === sheetType ? selectedStyle :  null}
                        key={type}
                        onClick={() => {history(`/FinancialWorksheet/${type}/${section.title}`); setOpenSidebar && setOpenSidebar(false)}}
                        >
                        <ListItemIcon style={section.title === params.taskTitle && type === sheetType ? selectedStyle :  null}>
                            {type === 'summary' && <BarChartIcon />}
                            {type === 'todoPayments' && <CalendarMonthIcon />}
                            {type === 'financialControl' && <ListAltIcon />}
                        </ListItemIcon>
                        <ListItemText primary={lang[type]} />
                    </ListItemButton>
                 ))}
            </List>
        </Collapse>
    </> 
  );
}

export default MainNestedList