import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// 👇 Helper untuk bikin label bulan-tahun (mundur dari data terakhir)
const generateMonthLabels = (lastMonth, lastYear, total) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const labels = [];

    for (let i = total - 1; i >= 0; i--) {
        const date = new Date(lastYear, lastMonth, 1); // lastMonth 0-based
        date.setMonth(date.getMonth() - i); // mundur i bulan
        const label = `${months[date.getMonth()]} ${date.getFullYear()}`;
        labels.push(label);
    }

    return labels;
};

const BarChartAdmin = ({ dataExpenses, lastMonth, lastYear }) => {
    const [range, setRange] = useState(12);

    const lastIndex = dataExpenses.length;
    const firstIndex = Math.max(0, lastIndex - range);

    const displayedExpenses = dataExpenses.slice(firstIndex, lastIndex);

    // ⏬ Ini penting: generate labels mundur dari bulan terakhir
    const currentLabels = generateMonthLabels(lastMonth, lastYear, dataExpenses.length);
    const displayedLabels = currentLabels.slice(firstIndex, lastIndex);

    const avg = useMemo(() => {
        if (displayedExpenses.length === 0) return 0;
        return displayedExpenses.reduce((a, b) => a + b, 0) / displayedExpenses.length;
    }, [displayedExpenses]);

    const avg12 = useMemo(() => {
        if (dataExpenses.length === 0) return 0;
        return dataExpenses.reduce((a, b) => a + b, 0) / dataExpenses.length;
    }, [dataExpenses]);

    const diff = avg - avg12;
    const percent = avg12 > 0 ? ((diff / avg12) * 100).toFixed(1) : 0;

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: { display: false },
                ticks: { padding: 10 },
            },
            y: {
                grid: { display: false },
                beginAtZero: true,
                ticks: {
                    padding: 20,
                    callback: (value) => `Rp ${value.toLocaleString('id-ID')}`,
                },
            },
        },
    };

    const data = {
        labels: displayedLabels,
        datasets: [
            {
                label: 'Pengeluaran',
                data: displayedExpenses,
                backgroundColor: '#F6B31A',
                barPercentage: 0.6,
                borderRadius: 8,
            },
        ],
    };

    return (
        <div>
            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4">
                {[12, 6, 3, 1].map((val) => (
                    <button
                        key={val}
                        onClick={() => setRange(val)}
                        className={`px-3 py-1 rounded-full border ${
                            range === val ? 'bg-[#F6B31A] text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        {val} Bulan
                    </button>
                ))}
            </div>

            <Bar data={data} options={options} />

            {/* Summary */}
            <div className="mt-6 flex items-center gap-3">
                <span className="font-semibold">📊 Rata-rata: </span>
                <span>Rp {Math.round(avg).toLocaleString('id-ID')}</span>

                {range === 12 ? null : (
                    <div className={`flex items-center gap-1 ${diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {diff >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        <span>{Math.abs(percent)}% dari 12 bulan</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BarChartAdmin;
