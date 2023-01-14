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

export default function NestedList({ section, setOpen, hideTitle, arrow }) {
    const history = useNavigate();
    const [open, setOpenSection] = React.useState(false);

    const handleClick = () => {
        setOpen && setOpen(true);
        setOpenSection(!open);
    };

  return (
        <>
      <ClickAwayListener onClickAway={() => setOpenSection(false)}>
      <ListItemButton onClick={handleClick} title={hideTitle ? '' : section.name}>
        <ListItemIcon>
          {section.title.slice(0, 3)}
        </ListItemIcon>
        <ListItemText primary={section.name} />
        {arrow && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      </ClickAwayListener>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}  onClick={() => {history(`/financial-summary/${section.title}`); setOpen && setOpen(false)}}>
            <ListItemIcon sx={{ color: 'black' }} >
              <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary={lang.summary} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}  onClick={() => {history(`/financial-todos/${section.title}`); setOpen && setOpen(false)}}>
            <ListItemIcon sx={{ color: 'black' }} >
              <CalendarMonthIcon/>
            </ListItemIcon>
            <ListItemText primary={lang.todoPayments} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {history(`/financial-control/${section.title}`); setOpen && setOpen(false)}}>
            <ListItemIcon sx={{ color: 'black' }} >
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={lang.financialControl} />
          </ListItemButton>
        </List>
      </Collapse>
      </>
      
  );
}