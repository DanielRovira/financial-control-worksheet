import './index.css'
import './Calendar.css';
import React, { useState, useEffect } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import Calendar from 'react-calendar'
// const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

export default function FloatingCalendar({ rawData, setShowCalendar, sheetType }) {
    const itens = Array.from(rawData)
    const [byMonth, setByMonth] = useState([]);
    const months = Array.from({length: 31}, (v, k) => k+1)

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
        Array.from(months).map((month) => (
            setByMonth((prev) => ({ ...prev,
                [month]: {
                    amount: sheetType === 'financialControl'
                    ? calc(itens.filter((item) => (Number(item.date.split('-')[2]) === month))).expense
                    : calc(itens.filter((item) => (Number(item.date.split('-')[2]) === month))).total,
                    month: month
                }
            }))
         ))

    }, [rawData]); // eslint-disable-line react-hooks/exhaustive-deps

    function tileContent({ activeStartDate, date, view }) {
        if (view === 'month') {
            const handleValue = (value) => Number(value).toLocaleString(process.env.REACT_APP_LANG, { style: 'currency', currency: process.env.REACT_APP_CURRENCY })
            const day = byMonth[date.getDate()]
            return <> {handleValue(day?.amount)} </>;
        }
      }
      console.log(byMonth)
  return (
    <ClickAwayListener onClickAway={() => setShowCalendar(false)}>
        <Box className='Calendar'>
            <Calendar
                tileContent={tileContent}
            />
        </Box>
    </ClickAwayListener>
  );
}