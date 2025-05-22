import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const monthLabels = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'Mei', '06': 'Jun', '07': 'Jul', '08': 'Agu',
  '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Des',
};

const COLORS = [
  '#8884d8', '#8dd1e1', '#82ca9d', '#ffc658',
  '#ff8042', '#d0ed57', '#a4de6c', '#d88884',
  '#a28dd1', '#84d8b8', '#ffa07a', '#9b59b6',
];

// Format to Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

const PieChartTotalPayment = ({ data }) => {
  const formattedData = data.map(item => ({
    name: monthLabels[item.month],
    value: item.total,
  }));

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={120}
            paddingAngle={3}
            // label={({ name, value }) => `${name}: ${formatRupiah(value)}`}
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatRupiah(value)}
            labelFormatter={(label) => `Bulan: ${label}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartTotalPayment;
