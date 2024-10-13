import { useState } from 'react';
import { ClickAwayListener, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarMonth as CalendarMonthIcon, BarChart as BarChartIcon, ExpandLess, ExpandMore, ListAlt as ListAltIcon, DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';

const MainNestedList = ({ section, setOpenSidebar, hideTitle, arrow, sheetType, result }) => {
    const language = useAtomValue(languageAtom);
    const lang = require(`components/Languages/${language}.json`);
    const history = useNavigate();
    const params = useParams(); 
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const types = user.type === 'admin' ? ['financialControl','todoPayments'] : Object.getOwnPropertyNames(user?.permissions?.[section.title] || []).filter(item => item !== 'purchases')
    types.includes('financialControl') && types.push('summary')
    const [openSection, setOpenSection] = useState(false);

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
                    {section.title === 'TRASH' ? <DeleteOutlineIcon style={{paddingLeft:'5px'}} /> : section.title?.slice(0, 3)}
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