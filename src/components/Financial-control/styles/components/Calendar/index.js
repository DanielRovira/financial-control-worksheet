import './index.css'
import 'react-calendar/dist/Calendar.css';
import React, { useState, useEffect } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import { Calendar, TileContent } from 'react-calendar'
// const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

export default function FloatingCalendar({ rawData, setShowCalendar }) {

    const itens = Array.from(rawData)
    const [byMonth, setByMonth] = useState([]);

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

    const months = Array.from({length: 31}, (v, k) => k+1)
    useEffect(() => {
        Array.from(months).map((month) => (
            setByMonth((prev) => ({ ...prev,
                [month]: {
                    amount: calc(itens.filter((item) => (Number(item.date.split('-')[2]) === month))).expense,
                    month: month
                }
            }))
         ))

    }, [rawData]); // eslint-disable-line react-hooks/exhaustive-deps

    function tileContent({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
          // Check if a date React-Calendar wants to check is on the list of dates to add class to{
        //   date.map((datee) => datee)  
        console.log(Date(Number(date)))
        // console.log(Date(Number(date)).split(' ')[2])
            // console.log(date)
            // console.log(day)
            return ;
        }
      }

  return (
    <ClickAwayListener onClickAway={() => setShowCalendar(false)}>
        <Box className='Calendar'>
            <Calendar
                tileContent={tileContent}
                // value={byMonth.month}
            />
        </Box>
    </ClickAwayListener>
  );
}