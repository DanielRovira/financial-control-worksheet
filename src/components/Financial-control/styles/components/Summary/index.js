import './index.css'
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const Summary = ({ rawData }) => {
    const itens = Array.from(rawData)

    const options = {
    // responsive: true,
    plugins: {
        title: {
            // display: true,
            text: 'Chart.js Bar Chart',
        },
        parsing: {
            xAxisKey: 'category',
            yAxisKey: 'amount'
          }
    },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels: itens.map(row => row.date),
  datasets: [{
    data: itens.map(row => row.amount)
  }],
};
    console.log(itens.map((item) => item.amount))
    return (
        <div className='chartContent'>
            <Bar options={options} data={data} />
        </div>
    );
};
 
export default Summary;
