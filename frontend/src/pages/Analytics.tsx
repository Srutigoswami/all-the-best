import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Critical', count: 2 },
  { name: 'High', count: 5 },
  { name: 'Medium', count: 8 },
  { name: 'Low', count: 3 },
];

const Analytics: React.FC = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Analytics</h2>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Analytics;
