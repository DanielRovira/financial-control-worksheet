import './index.css'
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const Summary = ({ rawData }) => {
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

    const months = Array.from({length: 12}, (v, k) => k+1)
    useEffect(() => {
        Array.from(months).map((month) => (
            setByMonth((prev) => ({... prev,
                [month]: {
                    amount: calc(itens.filter((item) => (Number(item.date.split('-')[1]) === month))).expense,
                    month: month
                }
            }))
         ))
         
    }, [rawData]);

    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString(process.env.REACT_APP_LANG, { month: 'long' });
      }

const labels = Array.from(months).map((month) => (
    getMonthName(month).charAt(0).toUpperCase() + getMonthName(month).slice(1)
))

const data = {
  labels: labels,
  datasets: [{
    data: Array.from(months).map((month) => (byMonth[month]?.amount))
  }],
};

const options = {
    layout: {
        padding: {
            left: 80,
            bottom: 60
        }
    },
    scales: {
        x: {
          ticks: {
            color: 'black',
            font: {
              size: 15,
            },
            
        }
    }}}

    return (
        <div className='chartContent'>
            <Bar options={options} data={data} />
        </div>
    );
};
 
export default Summary;