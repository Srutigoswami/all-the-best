import React from 'react';
import { useParams } from 'react-router-dom';

const BugDetails: React.FC = () => {
  const { id } = useParams();
  // Fetch bug details from API if needed
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Bug Details</h2>
      <p>Bug ID: {id}</p>
      {/* More details here */}
    </div>
  );
};
export default BugDetails;
