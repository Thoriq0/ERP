import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts';

const monthNames = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'Mei', '06': 'Jun', '07': 'Jul', '08': 'Agu',
  '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Des'
};

const LineChartWarehouse = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    month: monthNames[item.month] || item.month
  }));

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} stackOffset="none" margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="month" />
          {/* <YAxis allowDecimals={false} /> */}
          <Tooltip />
          <Legend />
          
          {/* Inbound Area */}
          <Area
            type="monotone"
            dataKey="inbound"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
            name="Inbound"
          >
            <LabelList dataKey="inbound" position="top" fill="#2f855a" fontSize={12} />
          </Area>

          {/* Outbound Area */}
          <Area
            type="monotone"
            dataKey="outbound"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
            name="Outbound"
          >
            <LabelList dataKey="outbound" position="top" fill="#4c51bf" fontSize={12} />
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartWarehouse;
