import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';

const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28', '#FF6384', '#36A2EB'];

const monthLabels = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'Mei', '06': 'Jun', '07': 'Jul', '08': 'Agu',
  '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Des',
};

const formatRupiah = (number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);

const PieChartTotalPayment = ({ data = [] }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  if (!Array.isArray(data)) {
    return <p>Loading chart...</p>;
  }

  // Filter data sesuai bulan yang dipilih
  const filteredData = selectedMonth
    ? data.filter((item) => item.month === selectedMonth)
    : data;

  const formattedData = filteredData.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  const total = formattedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full h-full">
      {/* Dropdown Filter Bulan */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Pilih Bulan:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="">Semua Bulan</option>
          {Object.entries(monthLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      {formattedData.length > 0 ? (
        <div className="w-full h-80">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={formattedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {/* <Label
                  value={`Total: ${formatRupiah(total)}`}
                  position="center"
                  className="font-bold"
                /> */}
                {formattedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatRupiah(value)}
                labelFormatter={(label) => `Kategori: ${label}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20">Belum terdapat data untuk bulan ini.</p>
      )} 
      <div className='text-center text-gray-500'>
        <p>Total : {formatRupiah(total)}</p>
      </div>
    </div>
   
  );
};

export default PieChartTotalPayment;
