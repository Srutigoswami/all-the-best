import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getBugs } from '../services/api';

const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>({ bySeverity: {}, byStatus: {}, total: 0 });
  const [bugs, setBugs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
  fetch((window as any).VITE_API_BASE_URL || 'http://localhost:4000' + '/api/analytics')
      .then(res => res.json())
      .then(setAnalytics);
    getBugs().then(setBugs);
  }, []);

  const paginatedBugs = bugs.slice((page - 1) * pageSize, page * pageSize);

  const severityData = Object.entries(analytics.bySeverity).map(([key, value]) => ({ name: key, count: value }));

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8">
        <h3 className="text-lg font-semibold mb-2">Bugs by Severity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={severityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Recent Bugs</h3>
        <ul>
          {paginatedBugs.map(bug => (
            <li key={bug.id} className="border-b py-2 flex justify-between">
              <span>{bug.title}</span>
              <span className="text-xs text-gray-500">{bug.status}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-2 gap-2">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-2 py-1 bg-gray-200 rounded">Prev</button>
          <button disabled={page * pageSize >= bugs.length} onClick={() => setPage(page + 1)} className="px-2 py-1 bg-gray-200 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
