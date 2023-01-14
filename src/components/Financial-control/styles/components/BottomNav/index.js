import './index.css'
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

export default function BottomNav({ section, sheetType }) {
  const history = useNavigate();

  return (
    <Box className='BottomNav'>
      <BottomNavigation
        showLabels
        value={lang[sheetType]}
      >
        <BottomNavigationAction value={lang.summary} label={lang.summary} icon={<BarChartIcon />} onClick={() => history(`/financial-summary/${section}`)} />
        <BottomNavigationAction value={lang.todoPayments} label={lang.todoPayments} icon={<CalendarMonthIcon />} onClick={() => history(`/financial-todos/${section}`)} />
        <BottomNavigationAction value={lang.financialControl} label={lang.financialControl} icon={<ListAltIcon />} onClick={() => history(`/financial-control/${section}`)} />
      </BottomNavigation>
    </Box>
  );
}