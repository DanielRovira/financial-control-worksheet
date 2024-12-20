import './index.css'
import EmpityFolder from '../EmpityFolder';
import { useState, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

document.documentElement.style.setProperty('--graphWidth', 'calc((var(--vw, 1vw) * 100) - (var(--closeSidebarWidth) * 2) - 10px)');
// window.addEventListener("resize", function () {
//     let GraphWidth = document.getElementById('Summary')?.offsetWidth
//     document.documentElement.style.setProperty('--GraphWidth', `calc(${GraphWidth}px - 10px)`);
//     console.log(GraphWidth)
// });

const Summary = ({ rawData, setAdd }) => {
    // const toDayYear = new Date().toISOString().substring(0, 4)
    const [byMonth, setByMonth] = useState([]);
    const [years, setYears] = useState([]);
    const itens = Array.from(rawData)
    const [year, setYear] = useState(Number(itens[itens.length-1]?.date.slice(0,4)));
    const months = Array.from({length: 12}, (v, k) => k+1);
    itens.sort(function(a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c-d;
    });

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
                    amount: calc(itens.filter((item) => (Number(item.date.split('-')[1]) === month && Number(item.date.split('-')[0]) === year))).total,
                    month: month
                }
            }))
         ))
         setAdd(false)
        const rangeOfYears = (start, end) => Array(end - start + 1)
            .fill(start)
            .map((year, index) => year + index)
        setYears(rangeOfYears(Number(itens[0].date.split('-')[0]), Number(itens[itens.length-1].date.split('-')[0])))
    }, [rawData, year]); // eslint-disable-line react-hooks/exhaustive-deps

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
    data: Array.from(months).map((month) => (byMonth[month]?.amount)),
    backgroundColor: 'grey'
  }],
};

const options = {
    // animation: false,
    animation: {
        duration: 300
    },
    maintainAspectRatio: false,
    // responsive: true,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    return Intl.NumberFormat(process.env.REACT_APP_LANG, { style: 'currency', currency: process.env.REACT_APP_CURRENCY }).format(context.parsed.y)
                }
            },
            displayColors: false
        },
    },
    layout: {
        padding: {
            top: 20,
            left: 20,
            bottom: 0,
            right: 20,
        },
    },
    scales: {
        x: {
            ticks: {
                color: 'black',
                font: {
                    size: 15,
                },
            }
        },
        y: {
            ticks: {
                callback: function(value, index, values) {
                    return value.toLocaleString(process.env.REACT_APP_LANG,{ style:"currency", currency: process.env.REACT_APP_CURRENCY });
                }
            }
        }
    }
}

if (rawData.length === 0)
    return (
        <EmpityFolder />
    )

else
    return (
        <div className='Summary'>
            <List>
                {Array.from(years).map((yearr, index) => (
                    <ListItem disablePadding key={index}>
                        <ListItemButton onClick={() => setYear(yearr)}
                                        style={yearr === year ? {backgroundColor:'var(--color1)'} : void(0)}
                        >
                            <ListItemText primary={yearr} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <div className='chartContent'>
                <div className='chartSubContent'>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    );
};
 
export default Summary;
