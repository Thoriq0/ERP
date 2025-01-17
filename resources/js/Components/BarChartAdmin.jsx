import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei'],
        datasets: [
            {
                label: 'Penjualan Toko A',
                data: [150, 200, 180, 220, 300],
                backgroundColor: '#F6B31A',
                barPercentage: 0.6,
                
                
            },
            {
                label: 'Penjualan Toko B',
                data: [180, 250, 160, 210, 280],
                backgroundColor: '#42307D',
                barPercentage: 0.6,
                
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false,  // Hilangkan garis grid di sumbu X
                },
                ticks: {
                    padding: 10,
                },
            },
            y: {
                grid: {
                    display: false,  // Hilangkan garis grid di sumbu Y
                },
                beginAtZero: true,
                ticks: {
                    padding: 20,
                },
            },

        },
    };

  return <Bar data={data} options={options} />;
  
};

export default BarChart;
