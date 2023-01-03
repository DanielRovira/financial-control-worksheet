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
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useNavigate } from 'react-router-dom';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

export default function NestedList({ section }) {
    const history = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
    setOpen(!open);
    };

  return (
        <>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {section.title.slice(0, 3)}
        </ListItemIcon>
        <ListItemText primary={section.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      </ClickAwayListener>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}  onClick={() => {history(`/financial-todos/${section.title}`); localStorage.setItem('sheetType', 'financialControl')}}>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary={lang.todoPayments} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {history(`/financial-control/${section.title}`); localStorage.setItem('sheetType', 'financialControl')}}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={lang.financialControl} />
          </ListItemButton>
        </List>
      </Collapse>
      </>
      
  );
}