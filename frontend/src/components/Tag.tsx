import React from 'react';

const Tag: React.FC<{ label: string; color?: string }> = ({ label, color = 'gray' }) => (
  <span className={`px-2 py-1 rounded text-xs bg-${color}-200 text-${color}-800`}>{label}</span>
);
export default Tag;
