import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const monthLabels = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'Mei', '06': 'Jun', '07': 'Jul', '08': 'Agu',
  '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Des',
};

// Format angka jadi singkat: 1K, 1Jt, 1M
const formatRupiahSingkat = (number) => {
  if (number >= 1_000_000_000) {
    return `Rp ${(number / 1_000_000_000).toFixed(1)}M`;
  } else if (number >= 1_000_000) {
    return `Rp ${(number / 1_000_000).toFixed(1)}Jt`;
  } else if (number >= 1_000) {
    return `Rp ${(number / 1_000).toFixed(1)}Rb`;
  } else {
    return `Rp ${number}`;
  }
};

const LineChartMonthlyPayments = ({ data = [] }) => {
  // Lengkapi semua bulan, meskipun tidak ada data
  const completeData = [...Array(12)].map((_, i) => {
    const monthNum = (i + 1).toString().padStart(2, '0');
    const found = data.find(d => d.month === monthNum);
    return {
      month: monthLabels[monthNum],
      total: found ? found.total : 0,
    };
  });

  // Hitung trend
  const last = completeData[completeData.length - 1]?.total;
  const prev = completeData[completeData.length - 2]?.total;

  let trendLabel = '';
  let trendColor = '';
  let trendIcon = '';

  if (last > prev) {
    trendLabel = 'Naik dibanding bulan lalu';
    trendIcon = '↑';
    trendColor = 'text-green-600';
  } else if (last < prev) {
    trendLabel = 'Turun dibanding bulan lalu';
    trendIcon = '↓';
    trendColor = 'text-red-600';
  } else {
    trendLabel = 'Tetap dibanding bulan lalu';
    trendIcon = '→';
    trendColor = 'text-gray-600';
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={completeData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatRupiahSingkat} />
          <Tooltip formatter={(value) => formatRupiahSingkat(value)} />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#00C49F"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className={`mt-4 text-center font-medium ${trendColor}`}>
        {trendIcon} {trendLabel}
      </p>
    </div>
  );
};

export default LineChartMonthlyPayments;
