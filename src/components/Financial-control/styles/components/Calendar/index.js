import './index.css'
import './Calendar.css';
import React, { useState, useEffect } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import Calendar from 'react-calendar'
// const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

export default function FloatingCalendar({ rawData, setShowCalendar, sheetType }) {
    const itens = Array.from(rawData)
    const [byDay, setByDay] = useState([]);
    const days = Array.from({length: 31}, (v, k) => k+1)

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

    useEffect(() => {
        Array.from(days).map((day) => (
            setByDay((prev) => ({ ...prev,
                [day]: {
                    amount: sheetType === 'todoPayments'
                    ? calc(itens.filter((item) => (Number(item.date.split('-')[2]) === day))).total
                    : calc(itens.filter((item) => (Number(item.date.split('-')[2]) === day))).expense
                }
            }))
         ))

    }, [rawData]); // eslint-disable-line react-hooks/exhaustive-deps
    console.log(byDay)
    function tileContent({ activeStartDate, date, view }) {
        if (view === 'month') {
            const handleValue = (value) => Number(value).toLocaleString(process.env.REACT_APP_LANG, { style: 'currency', currency: process.env.REACT_APP_CURRENCY })
            // const handleValue = (value) => Number(value).toLocaleString(process.env.REACT_APP_LANG)
            const day = byDay[date.getDate()]
            return <div className='amount'> {day?.amount > 0 ? handleValue(day?.amount):'-'} </div>;
        }
      }

  return (
    <ClickAwayListener onClickAway={() => setShowCalendar(false)}>
        <Box className='Calendar'>
            <Calendar
                tileContent={tileContent}
                calendarType='US'
            />
        </Box>
    </ClickAwayListener>
  );
}