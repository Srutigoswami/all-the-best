import React from 'react';

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    {children}
  </div>
);
export default Card;
