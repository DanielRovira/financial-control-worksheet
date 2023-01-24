import './styles/List.css'
import { useState } from 'react';
import { ClickAwayListener, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CalendarMonth as CalendarMonthIcon, BarChart as BarChartIcon, ExpandLess, ExpandMore, ListAlt as ListAltIcon } from '@mui/icons-material';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const NestedList = ({ section, setOpenSidebar, hideTitle, arrow }) => {
    const history = useNavigate();
    const [openSection, setOpenSection] = useState(false);
    const types = ['summary','todoPayments','financialControl']

    const handleClick = () => {
        setOpenSidebar && setOpenSidebar(true);
        setOpenSection(!openSection);
    };

  return (
        <>
      <ClickAwayListener onClickAway={() => setOpenSection(false)}>
      <ListItemButton onClick={handleClick} title={hideTitle ? '' : section.name}>
        <ListItemIcon>
          {section.title.slice(0, 3)}
        </ListItemIcon>
        <ListItemText primary={section.name} />
        {arrow && (openSection ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      </ClickAwayListener>
      <Collapse in={openSection} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {types.map((type) => (
                <ListItemButton onClick={() => {history(`/${type}/${section.title}`); setOpenSidebar && setOpenSidebar(false)}}>
                    <ListItemIcon>
                        {type === 'summary' && <BarChartIcon />}
                        {type === 'todoPayments' && <CalendarMonthIcon />}
                        {type === 'financialControl' && <ListAltIcon />}
                    </ListItemIcon>
                    <ListItemText primary={lang[type]} />
                </ListItemButton>
             ))
            }
          {/* <ListItemButton onClick={() => {history(`/financial-summary/${section.title}`); setOpenSidebar && setOpenSidebar(false)}}>
            <ListItemIcon>
              <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary={lang.summary} />
          </ListItemButton>
          <ListItemButton onClick={() => {history(`/financial-todos/${section.title}`); setOpenSidebar && setOpenSidebar(false)}}>
            <ListItemIcon>
              <CalendarMonthIcon/>
            </ListItemIcon>
            <ListItemText primary={lang.todoPayments} />
          </ListItemButton>
          <ListItemButton onClick={() => {history(`/financial-control/${section.title}`); setOpenSidebar && setOpenSidebar(false)}}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={lang.financialControl} />
          </ListItemButton> */}
        </List>
      </Collapse>
      </>
      
  );
}

export default NestedList