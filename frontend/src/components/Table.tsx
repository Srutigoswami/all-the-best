import React from 'react';

const Table: React.FC<{ data: any[] }> = ({ data }) => (
  <table className="min-w-full bg-white dark:bg-gray-800">
    <thead>
      <tr>
        {data.length > 0 && Object.keys(data[0]).map(key => (
          <th key={key} className="py-2 px-4 border-b">{key}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i} className="hover:bg-gray-100 dark:hover:bg-gray-700">
          {Object.values(row).map((val, j) => (
            <td key={j} className="py-2 px-4 border-b">{String(val)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
export default Table;
