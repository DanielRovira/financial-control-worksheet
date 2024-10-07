import './index.css'
import { useNavigate, useParams } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { BarChart as BarChartIcon, CalendarMonth as CalendarMonthIcon, ListAlt as ListAltIcon } from '@mui/icons-material'
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';

export default function BottomNav({ section, sheetType }) {
  const language = useAtomValue(languageAtom)
  const lang = require(`components/Languages/${language}.json`);
  const history = useNavigate();
  const params = useParams();

  return (
    <Box className='BottomNav'>
      <BottomNavigation
        showLabels
        value={lang[sheetType]}
      >
        {params.taskTitle !== 'TRASH' && <BottomNavigationAction value={lang.summary} icon={<BarChartIcon />} onClick={() => history(`/FinancialWorksheet/summary/${section}`)} />}
        <BottomNavigationAction value={lang.todoPayments} icon={<CalendarMonthIcon />} onClick={() => history(`/FinancialWorksheet/todoPayments/${section}`)} />
        <BottomNavigationAction value={lang.financialControl} icon={<ListAltIcon />} onClick={() => history(`/FinancialWorksheet/financialControl/${section}`)} />
      </BottomNavigation>
    </Box>
  );
}