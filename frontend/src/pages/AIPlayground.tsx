import React, { useState } from 'react';
import api from '../services/api';

const AIPlayground: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [product, setProduct] = useState('');
  const [component, setComponent] = useState('');
  const [priority, setPriority] = useState('medium');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const payload = { title, description, product, component, priority };

  const handleAI = async (fn: string) => {
    setLoading(true);
    setError('');
    try {
      let res;
      switch (fn) {
        case 'predictSeverity':
          res = await api.post('/api/ai/predict', payload);
          setResult({ severity: res.data.severity });
          break;
        case 'estimateResolutionTime':
          res = await api.post('/api/ai/predict', payload);
          setResult({ estimated_time_hours: res.data.estimated_time_hours });
          break;
        case 'classifyBugType':
          res = await api.post('/api/ai/predict', payload);
          setResult({ bug_type: res.data.bug_type });
          break;
        case 'recommendPriority':
          res = await api.post('/api/ai/priority', payload);
          setResult(res.data);
          break;
        case 'findDuplicates':
          res = await api.post('/api/ai/duplicates', payload);
          setResult(res.data);
          break;
        case 'fullAnalysis':
          res = await api.post('/api/ai/analysis', payload);
          setResult(res.data);
          break;
        default:
          res = await api.post('/api/ai/predict', payload);
          setResult(res.data);
      }
    } catch (err: any) {
      console.error('AI call error:', err);
      setError(err.response?.data?.error || err.message || 'AI call failed');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
  };
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-result.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">AI Playground</h2>
      <div className="space-y-4">
        <input className="border p-2 w-full" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <textarea className="border p-2 w-full" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <input className="border p-2 w-full" value={product} onChange={e => setProduct(e.target.value)} placeholder="Product" />
        <input className="border p-2 w-full" value={component} onChange={e => setComponent(e.target.value)} placeholder="Component" />
        <select className="border p-2 w-full" value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="flex gap-2 flex-wrap">
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleAI('predictSeverity')}>Predict Severity</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleAI('estimateResolutionTime')}>Estimate Time</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={() => handleAI('classifyBugType')}>Classify Type</button>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded" onClick={() => handleAI('recommendPriority')}>Recommend Priority</button>
          <button className="bg-pink-600 text-white px-4 py-2 rounded" onClick={() => handleAI('findDuplicates')}>Find Duplicates</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={() => handleAI('fullAnalysis')}>Full Analysis</button>
        </div>
        {loading && <div className="animate-pulse text-center">Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {result && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded">
            <h3 className="font-bold mb-2">AI Result</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
            <div className="flex gap-2 mt-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleCopy}>Copy JSON</button>
              <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={handleDownload}>Download JSON</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AIPlayground;
