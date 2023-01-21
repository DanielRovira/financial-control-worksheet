import './Calendar.css';
import './index.css'
import { Box, ClickAwayListener } from '@mui/material';
import Calendar from 'react-calendar'
// const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

export default function FloatingCalendar({ rawData, setShowCalendar, sheetType }) {
    const itens = Array.from(rawData);

    const calc = (list) => {
        const amountExpense = Array.from(list)
            .filter((item) => item.expense)
            .map((transaction) => Number(transaction.amount));
        
        const amountIncome = Array.from(list)
            .filter((item) => !item.expense)
            .map((transaction) => Number(transaction.amount));
        
        const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
        const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);
        const total = (income - expense).toFixed(2);
        
        return {expense, income, total}
    }

    function tileContent({ date, view }) {
        const handleValue = (value) => Number(value).toLocaleString(process.env.REACT_APP_LANG, { style: 'currency', currency: process.env.REACT_APP_CURRENCY });
        const day = Number(date.toLocaleDateString().split('/')[0]);
        const month = Number(date.toLocaleDateString().split('/')[1]);
        const year = Number(date.toLocaleDateString().split('/')[2]);
        const result = sheetType === 'todoPayments' ? 'total' : 'expense';
        if (view === 'decade') {
            let amount = calc(itens.filter((item) => (Number(item.date.split('-')[0]) === year)))[result]
            return <div className='amount'> {amount > 0 ? handleValue(amount):'-'} </div>;
        }
        if (view === 'year') {
            let amount = calc(itens.filter((item) => (Number(item.date.split('-')[1]) === month && Number(item.date.split('-')[0]) === year)))[result]
            return <div className='amount'> {amount > 0 ? handleValue(amount):'-'} </div>;
        }
        if (view === 'month') {
            let amount = calc(itens.filter((item) => (Number(item.date.split('-')[2]) === day && Number(item.date.split('-')[1]) === month && Number(item.date.split('-')[0]) === year)))[result]
            return <div className='amount'> {amount > 0 ? handleValue(amount):'-'} </div>;
        }
      }

  return (
    <ClickAwayListener onClickAway={() => setTimeout(() => {  
        setShowCalendar(false)
    }, 5)}>
        <Box className='Calendar'>
            <Calendar
                tileContent={tileContent}
                calendarType='US'
            />
        </Box>
    </ClickAwayListener>
  );
}