import React, { useEffect, useState } from 'react';
import { getBugs } from '../services/api';
import Table from '../components/Table';

const BugList: React.FC = () => {
  const [bugs, setBugs] = useState<any[]>([]);
  useEffect(() => {
    getBugs().then(setBugs);
  }, []);
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Bug List</h2>
      <Table data={bugs} />
    </div>
  );
};
export default BugList;
