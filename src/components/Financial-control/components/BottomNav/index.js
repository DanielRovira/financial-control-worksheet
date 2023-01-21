import './index.css'
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { BarChart as BarChartIcon, CalendarMonth as CalendarMonthIcon, ListAlt as ListAltIcon } from '@mui/icons-material'
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);

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