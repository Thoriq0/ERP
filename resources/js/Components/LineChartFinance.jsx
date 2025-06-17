import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registrasi komponen Chart.js untuk Line Chart
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = () => {
    const data = {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        datasets: [
            {
                label: 'Penjualan Toko A',
                data: [150, 200, 180, 220, 300],
                borderColor: '#F6B31A',
                backgroundColor: 'rgba(246, 179, 26, 0.2)',
                tension: 0.4,  // Untuk garis lebih halus (curve)
                fill: true,    // Area di bawah garis diwarnai
                pointRadius: 5,  // Ukuran titik data
                pointBackgroundColor: '#F6B31A',
            },
            {
                label: 'Penjualan Toko B',
                data: [180, 250, 160, 210, 280],
                borderColor: '#42307D',
                backgroundColor: 'rgba(66, 48, 125, 0.2)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: '#42307D',
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    padding: 10,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                beginAtZero: true,
                ticks: {
                    padding: 20,
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
