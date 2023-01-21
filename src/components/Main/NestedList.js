import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useNavigate } from 'react-router-dom';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

export default function NestedList({ section, setOpenSidebar, hideTitle, arrow }) {
    const history = useNavigate();
    const [openSection, setOpenSection] = React.useState(false);

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
          <ListItemButton sx={{ pl: 4 }}  onClick={() => {history(`/financial-summary/${section.title}`); setOpenSidebar && setOpenSidebar(false)}}>
            <ListItemIcon sx={{ color: '#3C4043' }} >
              <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary={lang.summary} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}  onClick={() => {history(`/financial-todos/${section.title}`); setOpenSidebar && setOpenSidebar(false)}}>
            <ListItemIcon sx={{ color: '#3C4043' }} >
              <CalendarMonthIcon/>
            </ListItemIcon>
            <ListItemText primary={lang.todoPayments} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {history(`/financial-control/${section.title}`); setOpenSidebar && setOpenSidebar(false)}}>
            <ListItemIcon sx={{ color: '#3C4043' }} >
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={lang.financialControl} />
          </ListItemButton>
        </List>
      </Collapse>
      </>
      
  );
}